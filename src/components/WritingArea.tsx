import React, { useState, useEffect, useCallback } from 'react';
import { MessageSquare, Sparkles, ChevronDown, ChevronUp, ThumbsUp, Lightbulb, HelpCircle, Target, AlertCircle, Star, Zap, Gift, Heart } from 'lucide-react';
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

export function CoachPanel({ content, textType, assistanceLevel }: CoachPanelProps) {
export function WritingArea({ content, textType, assistanceLevel }: CoachPanelProps) {
  const [structuredFeedback, setStructuredFeedback] = useState<StructuredFeedback | null>(null);
  const [feedbackHistory, setFeedbackHistory] = useState<FeedbackItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [question, setQuestion] = useState('');
  const [showPrompts, setShowPrompts] = useState(false);
  const [lastProcessedContent, setLastProcessedContent] = useState('');
  const [error, setError] = useState<string | null>(null);

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
      fetchFeedback(content, textType, assistanceLevel, feedbackHistory);
    }, 2000);

    return () => clearTimeout(debounceTimer);
  }, [content, textType, assistanceLevel, feedbackHistory, fetchFeedback]);

  const handleQuestionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim()) {
      setIsLoading(true);
      setError(null);
      console.log('[DEBUG] Processing user question:', question);
      
      try {
        const userQueryText = `Question about my ${textType} writing: ${question}\n\nCurrent text: ${content}`;
        const response = await getWritingFeedback(userQueryText, textType, assistanceLevel, feedbackHistory);
        
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

  const handlePromptClick = (promptText: string) => {
    setQuestion(promptText);
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
    } else if (currentWordCount < 200) {
      return `Great start! Try to write about ${targetWordCount} words (${currentWordCount}/${targetWordCount})`;
    } else if (isNearTarget) {
      return `Perfect length! Your story is just right! (${currentWordCount}/${targetWordCount})`;
    } else if (isOverTarget) {
      return `Wow, you wrote a lot! Maybe check if it's too long? (${currentWordCount}/${targetWordCount})`;
    }
    return `Words so far: ${currentWordCount}/${targetWordCount}`;
  };

  const getWordCountColor = () => {
    if (currentWordCount < 50) return 'text-gray-700 dark:text-gray-400';
    if (currentWordCount < 200) return 'text-blue-700 dark:text-blue-400';
    if (isNearTarget) return 'text-green-700 dark:text-green-400';
    if (isOverTarget) return 'text-amber-700 dark:text-amber-400';
    return 'text-gray-700 dark:text-gray-400';
  };

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-800">
      {/* Word count indicator */}
      <div className="px-3 py-2 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
        <div className={`text-sm flex items-center font-medium ${getWordCountColor()}`}>
          <Sparkles className="w-4 h-4 mr-1.5" />
          {getWordCountMessage()}
          {isNearTarget && <Star className="w-4 h-4 ml-1.5 text-yellow-500 fill-current" />}
        </div>
      </div>

      {/* Error indicator */}
      {error && (
        <div className="px-3 py-2 border-b border-amber-100 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20">
          <div className="text-sm text-amber-700 dark:text-amber-400 flex items-center font-medium">
            <AlertCircle className="w-4 h-4 mr-1.5" />
            {error}
          </div>
        </div>
      )}

      {/* Loading indicator */}
      {isLoading && (
        <div className="px-3 py-2 border-b border-blue-100 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20">
          <div className="text-sm text-blue-700 dark:text-blue-400 flex items-center font-medium">
            <div className="loading-spinner mr-3"></div>
            Analyzing your writing...
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {structuredFeedback?.overallComment && (
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-md text-sm border border-blue-100 dark:border-blue-800">
            <p className="font-medium mb-1">Overall Feedback:</p>
            <p>{structuredFeedback.overallComment}</p>
          </div>
        )}

        {structuredFeedback?.feedbackItems?.map((item, index) => {
          const { icon, bgColor, textColor } = getFeedbackItemStyle(item.type);
          return (
            <div key={index} className={`p-4 border-l-2 border-${item.type === 'praise' ? 'green' : item.type === 'suggestion' ? 'amber' : item.type === 'question' ? 'blue' : 'purple'}-500 bg-${item.type === 'praise' ? 'green' : item.type === 'suggestion' ? 'amber' : item.type === 'question' ? 'blue' : 'purple'}-50 dark:bg-${item.type === 'praise' ? 'green' : item.type === 'suggestion' ? 'amber' : item.type === 'question' ? 'blue' : 'purple'}-900/20 rounded-md mb-4 flex`}>
              <div>{icon}</div>
              <div className="flex-grow">
                <p className="font-medium text-base capitalize">{item.area}</p>
                <p className="mt-1 text-sm">{item.text}</p>
                {item.exampleFromText && (
                  <p className="mt-2 text-xs italic border-l-2 border-current pl-2 ml-2 bg-white bg-opacity-30 p-1.5 rounded">
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

        {structuredFeedback?.feedbackItems?.length === 0 && currentWordCount >= 50 && !isLoading && (
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

        {structuredFeedback?.focusForNextTime && structuredFeedback.focusForNextTime.length > 0 && (
          <div className="p-5 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 text-gray-700 dark:text-gray-300 rounded-2xl text-base border-2 border-blue-200 dark:border-blue-800 shadow-md">
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

      <form onSubmit={handleQuestionSubmit} className="coach-panel-footer space-y-4">
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
          <div className="space-y-2 bg-white dark:bg-gray-800 rounded-xl p-4 border-2 border-blue-100 dark:border-blue-800 shadow-inner">
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

        <div className="flex space-x-3">
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
        </div>
      </form>
    </div>
  );
}
