import React, { useState, useEffect, useCallback, useRef } from 'react';
import { MessageSquare, Sparkles, ChevronDown, ChevronUp, ThumbsUp, Lightbulb, HelpCircle, Target, AlertCircle, Star, Zap, Gift, Heart, X, Send, Bot } from 'lucide-react';
import { getWritingFeedback } from '../lib/openai';
import AIErrorHandler from '../utils/errorHandling';
import { promptConfig } from '../config/prompts';
import './improved-layout.css';

interface CoachPanelProps {
  content: string;
  textType: string;
  assistanceLevel: string;
}

interface FeedbackItem {
  type: 'praise' | 'suggestion' | 'question' | 'challenge';
  area: string;
  text: string;
  exampleFromText?: string;
  suggestionForImprovement?: string;
}

interface StructuredFeedback {
  overallComment: string;
  feedbackItems: FeedbackItem[];
  focusForNextTime: string[];
}

interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export function CoachPanel({ content, textType, assistanceLevel }: CoachPanelProps) {
  const [structuredFeedback, setStructuredFeedback] = useState<StructuredFeedback | null>(null);
  const [feedbackHistory, setFeedbackHistory] = useState<FeedbackItem[]>([]);
  const [localAssistanceLevel, setLocalAssistanceLevel] = useState<string>(assistanceLevel);
  const [hiddenFeedbackItems, setHiddenFeedbackItems] = useState<number[]>([]);
  const [isOverallCommentHidden, setIsOverallCommentHidden] = useState(false);
  const [isFocusForNextTimeHidden, setIsFocusForNextTimeHidden] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [question, setQuestion] = useState('');
  const [showPrompts, setShowPrompts] = useState(false);
  const [lastProcessedContent, setLastProcessedContent] = useState('');
  const [error, setError] = useState<string | null>(null);
  
  // Chat functionality state
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isChatMode, setIsChatMode] = useState(false);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const chatMessagesEndRef = useRef<HTMLDivElement>(null);

  const getNSWSelectivePrompts = (textType: string) => {
    const basePrompts = [
      `How can I make my ${textType} more engaging for NSW Selective assessors?`,
      `What vocabulary would strengthen my ${textType} response for selective school standards?`,
      "How can I better incorporate the visual stimulus into my writing?",
      `What specific techniques should I use for ${textType} writing in the NSW Selective test?`,
      "How can I improve my opening sentence to hook the assessors?",
      "What makes a strong conclusion for NSW Selective writing?"
    ];

    const textTypeSpecificPrompts: { [key: string]: string[] } = {
      'advertisement': [
        "How can I create a more compelling headline for my advertisement?",
        "What persuasive techniques work best for NSW Selective advertisement writing?",
        "How do I include an effective call to action in my advertisement?"
      ],
      'advice sheet': [
        "How can I make my advice clearer and more helpful?",
        "What tone should I use for an effective advice sheet?",
        "How do I organize my advice in a logical sequence?"
      ],
      'diary entry': [
        "How can I make my diary entry more personal and reflective?",
        "What emotions should I express in my diary writing?",
        "How do I show character growth in a diary entry?"
      ],
      'discussion': [
        "How do I present balanced arguments in my discussion?",
        "What evidence should I include to support different viewpoints?",
        "How can I structure my discussion for maximum impact?"
      ],
      'guide': [
        "How can I make my instructions clearer and easier to follow?",
        "What format works best for a step-by-step guide?",
        "How do I anticipate what readers might find confusing?"
      ],
      'letter': [
        "What's the appropriate tone for my letter's purpose?",
        "How do I structure a formal letter for NSW Selective standards?",
        "What makes an effective opening and closing for letters?"
      ],
      'narrative': [
        "How can I create more vivid characters in my story?",
        "What techniques make dialogue sound natural and engaging?",
        "How do I build tension and excitement in my narrative?"
      ],
      'narrative/creative': [
        "How can I create more vivid characters in my story?",
        "What techniques make dialogue sound natural and engaging?",
        "How do I build tension and excitement in my narrative?"
      ],
      'news report': [
        "How do I write an effective lead paragraph for my news report?",
        "What makes my news writing objective and factual?",
        "How do I include all the important details (who, what, when, where, why)?"
      ],
      'persuasive': [
        "How can I make my arguments more convincing for NSW assessors?",
        "What evidence will strengthen my persuasive writing?",
        "How do I address counterarguments effectively?"
      ],
      'review': [
        "How do I balance personal opinion with objective analysis?",
        "What criteria should I use to evaluate what I'm reviewing?",
        "How can I make my recommendation clear and justified?"
      ],
      'speech': [
        "How can I make my speech more engaging for the audience?",
        "What rhetorical devices work best in speech writing?",
        "How do I create a memorable opening and powerful conclusion?"
      ]
    };

    const specificPrompts = textTypeSpecificPrompts[textType.toLowerCase()] || [];
    return [...basePrompts, ...specificPrompts];
  };

  const commonPrompts = getNSWSelectivePrompts(textType);

  // Helper function to count words in text
  const countWords = useCallback((text: string): number => {
    if (!text || text.trim().length === 0) return 0;
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  }, []);

  // Scroll to bottom of chat messages
  const scrollToBottom = () => {
    chatMessagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const fetchFeedback = useCallback(async (currentContent: string, currentTextType: string, currentAssistanceLevel: string, currentFeedbackHistory: FeedbackItem[]) => {
    const wordCount = countWords(currentContent);
    
    if (wordCount >= 50 && currentContent !== lastProcessedContent) {
      console.log(`[DEBUG] Triggering AI feedback - Word count: ${wordCount}, Content length: ${currentContent.length}`);
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await getWritingFeedback(currentContent, currentTextType, currentAssistanceLevel, currentFeedbackHistory);
        
        if (response && response.feedbackItems) {
          setStructuredFeedback(response);
          setFeedbackHistory(prevHistory => [...prevHistory, ...response.feedbackItems.filter(item => 
            !prevHistory.some(histItem => histItem.text === item.text && histItem.area === item.area)
          )]);
        } else if (response && response.overallComment) {
          setStructuredFeedback(response as StructuredFeedback);
        }
        
        setLastProcessedContent(currentContent);
        console.log('[DEBUG] AI feedback received and processed successfully');
      } catch (error) {
        const aiError = AIErrorHandler.handleError(error, 'writing feedback');
        console.error('[DEBUG] Error fetching AI feedback:', aiError.userFriendlyMessage);
        setError(aiError.userFriendlyMessage);
        
        // Use fallback feedback
        const fallbackFeedback = AIErrorHandler.createFallbackResponse('feedback', currentTextType);
        setStructuredFeedback(fallbackFeedback as StructuredFeedback);
      } finally {
        setIsLoading(false);
      }
    } else if (wordCount < 50) {
      console.log(`[DEBUG] Not triggering AI feedback - Word count: ${wordCount} (need 50+ words)`);
    }
  }, [lastProcessedContent, countWords]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchFeedback(content, textType, localAssistanceLevel, feedbackHistory);
    }, 2000);

    return () => clearTimeout(debounceTimer);
  }, [content, textType, localAssistanceLevel, feedbackHistory, fetchFeedback]);

  // Update local assistance level when prop changes
  useEffect(() => {
    setLocalAssistanceLevel(assistanceLevel);
  }, [assistanceLevel]);

  const handleQuestionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim()) {
      setIsLoading(true);
      setError(null);
      console.log('[DEBUG] Processing user question:', question);
      
      try {
        const userQueryText = `Question about my ${textType} writing: ${question}\n\nCurrent text: ${content}`;
        const response = await getWritingFeedback(userQueryText, textType, localAssistanceLevel, feedbackHistory);
        
        if (response && response.feedbackItems) {
          const questionFeedbackItem: FeedbackItem = {
              type: 'question',
              area: 'User Question',
              text: `You asked: ${question}`
          };
          const answerItems = response.feedbackItems.map(item => ({...item, area: `Answer To: ${question}`}));
          
          setStructuredFeedback(prevFeedback => ({
              overallComment: response.overallComment || (prevFeedback?.overallComment || ''),
              feedbackItems: [questionFeedbackItem, ...answerItems, ...(prevFeedback?.feedbackItems || [])],
              focusForNextTime: response.focusForNextTime || (prevFeedback?.focusForNextTime || [])
          }));

          setFeedbackHistory(prevHistory => [...prevHistory, questionFeedbackItem, ...answerItems.filter(item => 
              !prevHistory.some(histItem => histItem.text === item.text && histItem.area === item.area)
            )]);

        } else if (response && response.overallComment) {
          setStructuredFeedback(response as StructuredFeedback);
        }
        
        console.log('[DEBUG] User question processed successfully');
      } catch (error) {
        const aiError = AIErrorHandler.handleError(error, 'question processing');
        console.error('[DEBUG] Error processing user question:', aiError.userFriendlyMessage);
        setError(aiError.userFriendlyMessage);
        
        // Provide a helpful fallback response
        const fallbackResponse: FeedbackItem = {
          type: 'suggestion',
          area: 'Coach Response',
          text: `Great question about ${textType} writing! While I can't provide a detailed answer right now, keep practicing and focus on the key elements of ${textType} writing like structure, vocabulary, and engaging your reader.`
        };
        
        setStructuredFeedback(prevFeedback => ({
          overallComment: prevFeedback?.overallComment || promptConfig.fallbackMessages.generalError,
          feedbackItems: [fallbackResponse, ...(prevFeedback?.feedbackItems || [])],
          focusForNextTime: prevFeedback?.focusForNextTime || []
        }));
      } finally {
        setQuestion('');
        setIsLoading(false);
        setShowPrompts(false);
      }
    }
  };

  // Chat functionality
  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (chatInput.trim()) {
      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        text: chatInput.trim(),
        isUser: true,
        timestamp: new Date()
      };

      setChatMessages(prev => [...prev, userMessage]);
      setChatInput('');
      setIsChatLoading(true);

      try {
        const userQueryText = `Question about my ${textType} writing: ${userMessage.text}\n\nCurrent text: ${content}`;
        const response = await getWritingFeedback(userQueryText, textType, localAssistanceLevel, feedbackHistory);
        
        let botResponseText = '';
        if (response && response.feedbackItems && response.feedbackItems.length > 0) {
          botResponseText = response.feedbackItems[0].text;
        } else if (response && response.overallComment) {
          botResponseText = response.overallComment;
        } else {
          botResponseText = `Great question about ${textType} writing! Keep practicing and focus on the key elements like structure, vocabulary, and engaging your reader.`;
        }

        const botMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          text: botResponseText,
          isUser: false,
          timestamp: new Date()
        };

        setChatMessages(prev => [...prev, botMessage]);
      } catch (error) {
        const aiError = AIErrorHandler.handleError(error, 'chat processing');
        const errorMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          text: `I'm having trouble right now, but keep writing! Focus on making your ${textType} clear and engaging.`,
          isUser: false,
          timestamp: new Date()
        };
        setChatMessages(prev => [...prev, errorMessage]);
      } finally {
        setIsChatLoading(false);
      }
    }
  };

  const handlePromptClick = (promptText: string) => {
    if (isChatMode) {
      setChatInput(promptText);
    } else {
      setQuestion(promptText);
    }
    setShowPrompts(false);
  };

  const getFeedbackItemStyle = (type: FeedbackItem['type']) => {
    switch (type) {
      case 'praise':
        return { icon: <Star className="h-6 w-6 text-yellow-500 mr-3 shrink-0" />, bgColor: 'bg-gradient-to-r from-green-50 to-green-100', textColor: 'text-green-800' };
      case 'suggestion':
        return { icon: <Lightbulb className="h-6 w-6 text-amber-500 mr-3 shrink-0" />, bgColor: 'bg-gradient-to-r from-amber-50 to-amber-100', textColor: 'text-amber-800' };
      case 'question':
        return { icon: <HelpCircle className="h-6 w-6 text-blue-500 mr-3 shrink-0" />, bgColor: 'bg-gradient-to-r from-blue-50 to-blue-100', textColor: 'text-blue-800' };
      case 'challenge':
        return { icon: <Zap className="h-6 w-6 text-purple-500 mr-3 shrink-0" />, bgColor: 'bg-gradient-to-r from-purple-50 to-purple-100', textColor: 'text-purple-800' };
      default:
        return { icon: <Gift className="h-6 w-6 text-gray-500 mr-3 shrink-0" />, bgColor: 'bg-gradient-to-r from-gray-50 to-gray-100', textColor: 'text-gray-800' };
    }
  };

  // Calculate current word count for display
  const currentWordCount = countWords(content);
  const wordsNeeded = Math.max(0, 50 - currentWordCount);
  const targetWordCount = 250;
  const isNearTarget = currentWordCount >= 200 && currentWordCount <= 300;
  const isOverTarget = currentWordCount > 300;

  const getWordCountMessage = () => {
    if (currentWordCount < 50) {
      return `Write ${wordsNeeded} more word${wordsNeeded !== 1 ? 's' : ''} to get help (${currentWordCount}/50)`;
    }
    return `Great start! Try to write about ${targetWordCount} words (${currentWordCount}/${targetWordCount})`;
  };

  const getWordCountColor = () => {
    if (currentWordCount < 50) return 'text-gray-700 dark:text-gray-400';
    if (currentWordCount < 200) return 'text-blue-700 dark:text-blue-400';
    if (isNearTarget) return 'text-green-700 dark:text-green-400';
    if (isOverTarget) return 'text-amber-700 dark:text-amber-400';
    return 'text-gray-700 dark:text-gray-400';
  };

  const handleHideFeedbackItem = (index: number) => {
    setHiddenFeedbackItems(prev => [...prev, index]);
  };

  const handleHideOverallComment = () => {
    setIsOverallCommentHidden(true);
  };

  const handleHideFocusForNextTime = () => {
    setIsFocusForNextTimeHidden(true);
  };

  const handleAssistanceLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocalAssistanceLevel(e.target.value);
  };

  return (
    <div className="h-full flex flex-col" style={{ height: '100%', maxHeight: '100%' }}>
      {/* Word count indicator */}
      <div className="px-4 py-3 border-b-4 border-purple-200 dark:border-purple-800 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 flex-shrink-0">
        <div className={`text-base flex items-center font-bold ${getWordCountColor()}`}>
          <Sparkles className="w-5 h-5 mr-2" />
          {getWordCountMessage()}
          {isNearTarget && <Star className="w-5 h-5 ml-2 text-yellow-500 fill-current" />}
        </div>
        
        {/* Assistance Level Selector */}
        <div className="relative">
          <select
            value={localAssistanceLevel}
            onChange={handleAssistanceLevelChange}
            className="block rounded-xl border-3 border-purple-300 py-1 pl-3 pr-8 text-gray-900 dark:text-gray-100 dark:bg-gray-700 focus:ring-2 focus:ring-purple-200 focus:border-purple-500 text-sm font-medium shadow-sm transition-all duration-200 hover:border-purple-400"
          >
            <option value="detailed">🌟 Lots of Help</option>
            <option value="moderate">⭐ Some Help</option>
            <option value="minimal">✨ Just a Little Help</option>
          </select>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-purple-400 rounded-full flex items-center justify-center animate-pulse">
            <Sparkles className="w-2 h-2 text-white" />
          </div>
        </div>
      </div>

      {/* Mode Toggle */}
      <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex-shrink-0">
        <div className="flex space-x-2">
          <button
            onClick={() => setIsChatMode(false)}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
              !isChatMode 
                ? 'bg-purple-500 text-white shadow-md' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            <Sparkles className="w-4 h-4 inline mr-2" />
            Pop-up Questions
          </button>
          <button
            onClick={() => setIsChatMode(true)}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
              isChatMode 
                ? 'bg-purple-500 text-white shadow-md' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            <MessageSquare className="w-4 h-4 inline mr-2" />
            Chat with Buddy
          </button>
        </div>
      </div>

      {/* Error indicator */}
      {error && (
        <div className="px-4 py-3 border-b-4 border-amber-200 dark:border-amber-800 bg-gradient-to-r from-amber-50 to-red-50 dark:from-amber-900/20 dark:to-red-900/20 flex-shrink-0">
          <div className="text-base text-amber-700 dark:text-amber-400 flex items-center font-bold">
            <AlertCircle className="w-5 h-5 mr-2" />
            {error}
          </div>
        </div>
      )}

      {/* Loading indicator */}
      {isLoading && (
        <div className="px-4 py-3 border-b-4 border-blue-200 dark:border-blue-800 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 flex-shrink-0">
          <div className="text-base text-blue-700 dark:text-blue-400 flex items-center font-bold">
            <div className="loading-spinner mr-3"></div>
            Thinking about your story...
          </div>
        </div>
      )}

      {/* Content Area - IMPROVED: Better layout for chat visibility */}
      <div className="flex-1 flex flex-col min-h-0">
        {isChatMode ? (
          /* Chat Mode - IMPROVED: More visible chat input */
          <div className="flex-1 flex flex-col min-h-0">
            {/* Chat Messages - IMPROVED: Reduced height to make room for larger input area */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3 min-h-0" style={{ maxHeight: 'calc(100% - 140px)' }}>
              {chatMessages.length === 0 && (
                <div className="text-center py-6">
                  <Bot className="w-12 h-12 mx-auto mb-4 text-purple-400" />
                  <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">
                    Hi! I'm your Writing Buddy! 👋
                  </p>
                  <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
                    Ask me anything about your writing!
                  </p>
                </div>
              )}
              
              {chatMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                      message.isUser
                        ? 'bg-purple-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                    }`}
                  >
                    {!message.isUser && (
                      <div className="flex items-center mb-1">
                        <Bot className="w-4 h-4 mr-2 text-purple-500" />
                        <span className="text-xs font-medium text-purple-600 dark:text-purple-400">Writing Buddy</span>
                      </div>
                    )}
                    <p className="text-sm leading-relaxed">{message.text}</p>
                  </div>
                </div>
              ))}
              
              {isChatLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-2xl">
                    <div className="flex items-center">
                      <Bot className="w-4 h-4 mr-2 text-purple-500" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatMessagesEndRef} />
            </div>

            {/* Chat Input - IMPROVED: Much more prominent and visible */}
            <div className="border-t-2 border-purple-200 dark:border-purple-700 p-6 flex-shrink-0 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20" style={{ minHeight: '140px' }}>
              <form onSubmit={handleChatSubmit} className="space-y-4">
                <div className="flex space-x-3">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Ask me anything about your writing..."
                      className="w-full px-6 py-4 border-2 border-purple-300 dark:border-purple-600 rounded-2xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-4 focus:ring-purple-200 focus:border-purple-500 text-lg font-medium shadow-lg transition-all duration-200"
                      disabled={isChatLoading}
                      style={{ fontSize: '16px', minHeight: '56px' }}
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <MessageSquare className="w-5 h-5 text-purple-400" />
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={isChatLoading || !chatInput.trim()}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-4 rounded-2xl transition-all duration-200 flex-shrink-0 shadow-lg transform hover:scale-105 font-bold"
                    style={{ minHeight: '56px', minWidth: '56px' }}
                  >
                    <Send className="w-6 h-6" />
                  </button>
                </div>
                
                {/* Suggested prompts toggle - More prominent */}
                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setShowPrompts(!showPrompts)}
                    className="text-base text-purple-700 dark:text-purple-300 hover:text-purple-900 dark:hover:text-purple-100 transition-colors font-medium bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-md border border-purple-200 dark:border-purple-600"
                  >
                    {showPrompts ? 'Hide suggestions' : 'Show suggested questions'}
                  </button>
                </div>
              </form>
            </div>

            {/* Suggested prompts for chat mode - IMPROVED: Better visibility */}
            {showPrompts && (
              <div className="border-t border-gray-200 dark:border-gray-700 p-4 flex-shrink-0 bg-white dark:bg-gray-800 shadow-inner">
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {commonPrompts.slice(0, 6).map((prompt, index) => (
                    <button
                      type="button"
                      key={index}
                      onClick={() => handlePromptClick(prompt)}
                      className="w-full text-left text-sm px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-all duration-300 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 font-medium"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Pop-up Questions Mode - Unchanged */
          <div className="flex-1 flex flex-col min-h-0">
            <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
              {structuredFeedback?.overallComment && !isOverallCommentHidden && (
                <div className="p-5 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/30 dark:to-blue-900/30 text-indigo-700 dark:text-indigo-300 rounded-2xl text-base border-2 border-indigo-200 dark:border-indigo-800 shadow-md relative">
                  <button 
                    onClick={handleHideOverallComment}
                    className="absolute top-2 right-2 p-1 rounded-full bg-white dark:bg-gray-700 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors cursor-pointer"
                    aria-label="Close feedback"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="flex items-start">
                    <Heart className="w-6 h-6 text-indigo-500 mr-3 mt-1 shrink-0" />
                    <div>
                      <p className="font-bold text-lg mb-2">A friendly thought:</p>
                      <p className="leading-relaxed">{structuredFeedback.overallComment}</p>
                    </div>
                  </div>
                </div>
              )}

              {structuredFeedback?.feedbackItems?.filter((_, index) => !hiddenFeedbackItems.includes(index)).map((item, index) => {
                const { icon, bgColor, textColor } = getFeedbackItemStyle(item.type);
                const originalIndex = structuredFeedback.feedbackItems.findIndex(i => i === item);
                return (
                  <div key={originalIndex} className={`feedback-item feedback-item-${item.type} flex transform hover:scale-102 transition-all duration-300 relative`}>
                    <button 
                      onClick={() => handleHideFeedbackItem(originalIndex)}
                      className="absolute top-2 right-2 p-1 rounded-full bg-white dark:bg-gray-700 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors cursor-pointer"
                      aria-label="Close feedback"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div>{icon}</div>
                    <div className="flex-grow relative">
                      <p className="font-bold text-lg capitalize">{item.area}</p>
                      <p className="mt-2 text-base leading-relaxed">{item.text}</p>
                      {item.exampleFromText && (
                        <p className="mt-3 text-sm italic border-l-4 border-current pl-3 ml-2 opacity-90 bg-white bg-opacity-50 p-2 rounded-r-lg">
                          <span className="font-bold">From your story:</span> "{item.exampleFromText}"
                        </p>
                      )}
                      {item.suggestionForImprovement && (
                        <p className="mt-3 text-sm border-l-4 border-current pl-3 ml-2 opacity-90 bg-white bg-opacity-50 p-2 rounded-r-lg">
                          <span className="font-bold">Try this:</span> {item.suggestionForImprovement}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}

              {(!structuredFeedback?.feedbackItems || structuredFeedback.feedbackItems.length === 0 || 
                (structuredFeedback.feedbackItems.length > 0 && hiddenFeedbackItems.length === structuredFeedback.feedbackItems.length)) && 
                currentWordCount >= 50 && !isLoading && (
                <div className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 text-gray-700 dark:text-gray-300 rounded-2xl text-base text-center border-2 border-gray-200 dark:border-gray-700 shadow-md">
                  <Sparkles className="w-10 h-10 mx-auto mb-3 text-gray-400 dark:text-gray-500" />
                  <p className="font-bold text-lg mb-2">Your writing buddy is thinking...</p>
                  <p>Keep writing while I look at your story!</p>
                  <div className="mt-4 flex justify-center space-x-1">
                    <div className="w-3 h-3 bg-gray-300 dark:bg-gray-600 rounded-full animate-bounce"></div>
                    <div className="w-3 h-3 bg-gray-300 dark:bg-gray-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    <div className="w-3 h-3 bg-gray-300 dark:bg-gray-600 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                  </div>
                </div>
              )}

              {structuredFeedback?.focusForNextTime && structuredFeedback.focusForNextTime.length > 0 && !isFocusForNextTimeHidden && (
                <div className="p-5 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 text-gray-700 dark:text-gray-300 rounded-2xl text-base border-2 border-blue-200 dark:border-blue-800 shadow-md relative">
                  <button 
                    onClick={handleHideFocusForNextTime}
                    className="absolute top-2 right-2 p-1 rounded-full bg-white dark:bg-gray-700 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors cursor-pointer"
                    aria-label="Close feedback"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="flex items-start">
                    <Star className="w-6 h-6 text-blue-500 mr-3 mt-1 shrink-0" />
                    <div>
                      <p className="font-bold text-lg mb-2">For next time:</p>
                      <ul className="list-none space-y-2">
                        {structuredFeedback.focusForNextTime.map((focus, idx) => (
                          <li key={idx} className="flex items-start">
                            <div className="w-5 h-5 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-2 mt-0.5 text-blue-600 dark:text-blue-400 font-bold text-xs">
                              {idx + 1}
                            </div>
                            <span>{focus}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer - only show in pop-up questions mode */}
            <div className="border-t border-gray-200 dark:border-gray-700 p-4 space-y-4 flex-shrink-0 bg-white dark:bg-gray-800">
              <button
                type="button"
                onClick={() => setShowPrompts(!showPrompts)}
                className="w-full flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl text-base font-bold text-blue-800 dark:text-blue-200 hover:from-blue-200 hover:to-purple-200 dark:hover:from-blue-800/40 dark:hover:to-purple-800/40 transition-all duration-300 shadow-md transform hover:scale-102 border-2 border-blue-200 dark:border-blue-800"
              >
                <span className="flex items-center">
                  <Star className="w-5 h-5 mr-2 text-yellow-500" />
                  Questions to Ask Your Writing Buddy
                </span>
                {showPrompts ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </button>

              {showPrompts && (
                <div className="space-y-2 bg-white dark:bg-gray-800 rounded-xl p-4 border-2 border-blue-100 dark:border-blue-800 shadow-inner max-h-40 overflow-y-auto">
                  {commonPrompts.map((prompt, index) => (
                    <button
                      type="button"
                      key={index}
                      onClick={() => handlePromptClick(prompt)}
                      className="w-full text-left text-base px-4 py-2 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all duration-300 font-medium"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              )}

              <form onSubmit={handleQuestionSubmit} className="flex space-x-3">
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Ask me anything about your writing..."
                  className="flex-1 form-input rounded-xl border-3 border-yellow-300 dark:border-yellow-800 text-base py-3 px-4 shadow-md focus:border-yellow-400 focus:ring-4 focus:ring-yellow-200"
                />
                <button
                  type="submit"
                  disabled={isLoading || !question.trim()}
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:from-yellow-600 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed touch-friendly-button rounded-xl px-6 py-3 font-bold text-base shadow-md transform hover:scale-105 transition-all duration-300 flex items-center"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Ask Me!
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
