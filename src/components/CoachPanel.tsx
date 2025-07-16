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
  const [isChatLoading, setIsChatLoading] = useState(false);
  const chatMessagesEndRef = useRef<HTMLDivElement>(null);

  // New state for help dropdown
  const [selectedHelpType, setSelectedHelpType] = useState('');

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
    setChatInput(promptText);
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

  const getWordCountColor = () => {
    if (currentWordCount < 50) return 'text-gray-700 dark:text-gray-400';
    if (currentWordCount < 200) return 'text-blue-700 dark:text-blue-400';
    if (currentWordCount >= 200 && currentWordCount <= 300) return 'text-green-700 dark:text-green-400';
    if (currentWordCount > 300) return 'text-amber-700 dark:text-amber-400';
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

  const handleHelpTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedHelpType(e.target.value);
    if (e.target.value) {
      setChatInput(e.target.value);
    }
  };

  return (
    <div className="h-full flex flex-col" style={{ height: '100%', maxHeight: '100%' }}>
      {/* Simplified header with dropdown */}
      <div className="px-4 py-2 border-b-2 border-purple-200 dark:border-purple-800 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">I need</span>
            <select
              value={selectedHelpType}
              onChange={handleHelpTypeChange}
              className="text-sm rounded-lg border border-purple-300 py-1 px-2 text-gray-900 dark:text-gray-100 dark:bg-gray-700 focus:ring-2 focus:ring-purple-200 focus:border-purple-500 font-medium"
            >
              <option value="">Select help type...</option>
              <option value="🌟 Lots of help with my writing">🌟 Lots of help</option>
              <option value="⭐ Some help with specific areas">⭐ Some help</option>
              <option value="✨ Just a little guidance">✨ Little help</option>
            </select>
          </div>
          
          <select
            value={localAssistanceLevel}
            onChange={handleAssistanceLevelChange}
            className="text-xs rounded-lg border border-purple-300 py-1 px-2 text-gray-900 dark:text-gray-100 dark:bg-gray-700 focus:ring-2 focus:ring-purple-200 focus:border-purple-500 font-medium"
          >
            <option value="detailed">🌟 Lots of Help</option>
            <option value="moderate">⭐ Some Help</option>
            <option value="minimal">✨ Just a Little Help</option>
          </select>
        </div>
      </div>

      {/* Error indicator */}
      {error && (
        <div className="px-4 py-2 border-b border-amber-200 dark:border-amber-800 bg-gradient-to-r from-amber-50 to-red-50 dark:from-amber-900/20 dark:to-red-900/20 flex-shrink-0">
          <div className="text-sm text-amber-700 dark:text-amber-400 flex items-center font-medium">
            <AlertCircle className="w-4 h-4 mr-2" />
            {error}
          </div>
        </div>
      )}

      {/* Loading indicator */}
      {isLoading && (
        <div className="px-4 py-2 border-b border-blue-200 dark:border-blue-800 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 flex-shrink-0">
          <div className="text-sm text-blue-700 dark:text-blue-400 flex items-center font-medium">
            <div className="loading-spinner mr-2"></div>
            Thinking about your story...
          </div>
        </div>
      )}

      {/* Single Chat Interface */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3 min-h-0" style={{ maxHeight: 'calc(100% - 120px)' }}>
          {chatMessages.length === 0 && (
            <div className="text-center py-4">
              <Bot className="w-10 h-10 mx-auto mb-3 text-purple-400" />
              <p className="text-gray-500 dark:text-gray-400 text-base font-medium">
                Hi! I'm your Writing Buddy! 👋
              </p>
              <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">
                Ask me anything about your writing!
              </p>
            </div>
          )}
          
          {/* Show feedback items as chat messages */}
          {structuredFeedback?.overallComment && !isOverallCommentHidden && (
            <div className="flex justify-start">
              <div className="max-w-xs lg:max-w-md bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/30 dark:to-blue-900/30 text-indigo-700 dark:text-indigo-300 rounded-2xl px-4 py-3 border border-indigo-200 dark:border-indigo-800 relative">
                <button 
                  onClick={handleHideOverallComment}
                  className="absolute top-1 right-1 p-1 rounded-full bg-white dark:bg-gray-700 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors cursor-pointer"
                  aria-label="Close feedback"
                >
                  <X className="w-3 h-3" />
                </button>
                <div className="flex items-center mb-1">
                  <Bot className="w-4 h-4 mr-2 text-purple-500" />
                  <span className="text-xs font-medium text-purple-600 dark:text-purple-400">Writing Buddy</span>
                </div>
                <p className="text-sm leading-relaxed">{structuredFeedback.overallComment}</p>
              </div>
            </div>
          )}

          {structuredFeedback?.feedbackItems?.filter((_, index) => !hiddenFeedbackItems.includes(index)).map((item, index) => {
            const originalIndex = structuredFeedback.feedbackItems.findIndex(i => i === item);
            return (
              <div key={originalIndex} className="flex justify-start">
                <div className="max-w-xs lg:max-w-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-2xl px-4 py-3 relative">
                  <button 
                    onClick={() => handleHideFeedbackItem(originalIndex)}
                    className="absolute top-1 right-1 p-1 rounded-full bg-white dark:bg-gray-600 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors cursor-pointer"
                    aria-label="Close feedback"
                  >
                    <X className="w-3 h-3" />
                  </button>
                  <div className="flex items-center mb-1">
                    <Bot className="w-4 h-4 mr-2 text-purple-500" />
                    <span className="text-xs font-medium text-purple-600 dark:text-purple-400">Writing Buddy</span>
                  </div>
                  <p className="text-sm font-medium capitalize mb-1">{item.area}</p>
                  <p className="text-sm leading-relaxed">{item.text}</p>
                  {item.exampleFromText && (
                    <p className="text-xs italic mt-2 p-2 bg-white dark:bg-gray-600 rounded-lg">
                      <span className="font-medium">From your story:</span> "{item.exampleFromText}"
                    </p>
                  )}
                  {item.suggestionForImprovement && (
                    <p className="text-xs mt-2 p-2 bg-white dark:bg-gray-600 rounded-lg">
                      <span className="font-medium">Try this:</span> {item.suggestionForImprovement}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
          
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

        {/* Chat Input */}
        <div className="border-t border-purple-200 dark:border-purple-700 p-3 flex-shrink-0 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20" style={{ minHeight: '120px' }}>
          <form onSubmit={handleChatSubmit} className="space-y-3">
            <div className="flex space-x-2">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask me anything about your writing..."
                  className="w-full px-4 py-3 border border-purple-300 dark:border-purple-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-200 focus:border-purple-500 text-sm font-medium"
                  disabled={isChatLoading}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <MessageSquare className="w-4 h-4 text-purple-400" />
                </div>
              </div>
              <button
                type="submit"
                disabled={isChatLoading || !chatInput.trim()}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-3 rounded-xl transition-all duration-200 flex-shrink-0 font-medium"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            
            {/* Suggested prompts toggle */}
            <div className="text-center">
              <button
                type="button"
                onClick={() => setShowPrompts(!showPrompts)}
                className="text-sm text-purple-700 dark:text-purple-300 hover:text-purple-900 dark:hover:text-purple-100 transition-colors font-medium bg-white dark:bg-gray-800 px-3 py-1 rounded-full border border-purple-200 dark:border-purple-600"
              >
                {showPrompts ? 'Hide suggestions' : 'Show suggested questions'}
              </button>
            </div>
          </form>
        </div>

        {/* Suggested prompts */}
        {showPrompts && (
          <div className="border-t border-gray-200 dark:border-gray-700 p-3 flex-shrink-0 bg-white dark:bg-gray-800">
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {commonPrompts.slice(0, 6).map((prompt, index) => (
                <button
                  type="button"
                  key={index}
                  onClick={() => handlePromptClick(prompt)}
                  className="w-full text-left text-sm px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-all duration-300 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
