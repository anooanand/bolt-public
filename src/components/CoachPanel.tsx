import React, { useState, useEffect, useCallback } from 'react';
import { MessageSquare, Sparkles, ChevronDown, ChevronUp, ThumbsUp, Lightbulb, HelpCircle, Target, AlertCircle } from 'lucide-react';
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
        return { icon: <ThumbsUp className="h-5 w-5 text-green-600 mr-2 shrink-0" />, bgColor: 'bg-green-50', textColor: 'text-green-800' };
      case 'suggestion':
        return { icon: <Lightbulb className="h-5 w-5 text-amber-600 mr-2 shrink-0" />, bgColor: 'bg-amber-50', textColor: 'text-amber-800' };
      case 'question':
        return { icon: <HelpCircle className="h-5 w-5 text-blue-600 mr-2 shrink-0" />, bgColor: 'bg-blue-50', textColor: 'text-blue-800' };
      case 'challenge':
        return { icon: <Target className="h-5 w-5 text-purple-600 mr-2 shrink-0" />, bgColor: 'bg-purple-50', textColor: 'text-purple-800' };
      default:
        return { icon: <Sparkles className="h-5 w-5 text-gray-600 mr-2 shrink-0" />, bgColor: 'bg-gray-50', textColor: 'text-gray-800' };
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
      return `Write ${wordsNeeded} more word${wordsNeeded !== 1 ? 's' : ''} to get AI feedback (${currentWordCount}/50)`;
    } else if (currentWordCount < 200) {
      return `Good start! Aim for ${targetWordCount} words for NSW Selective standards (${currentWordCount}/${targetWordCount})`;
    } else if (isNearTarget) {
      return `Excellent length for NSW Selective! Focus on quality (${currentWordCount}/${targetWordCount})`;
    } else if (isOverTarget) {
      return `Consider editing for conciseness. NSW Selective values quality over quantity (${currentWordCount}/${targetWordCount})`;
    }
    return `Current word count: ${currentWordCount}/${targetWordCount}`;
  };

  const getWordCountColor = () => {
    if (currentWordCount < 50) return 'text-gray-600 dark:text-gray-400';
    if (currentWordCount < 200) return 'text-blue-600 dark:text-blue-400';
    if (isNearTarget) return 'text-green-600 dark:text-green-400';
    if (isOverTarget) return 'text-amber-600 dark:text-amber-400';
    return 'text-gray-600 dark:text-gray-400';
  };

  return (
    <div className="h-full flex flex-col">
      {/* Word count indicator */}
      <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
        <div className={`text-sm flex items-center ${getWordCountColor()}`}>
          <Sparkles className="w-4 h-4 mr-2" />
          {getWordCountMessage()}
        </div>
      </div>

      {/* Error indicator */}
      {error && (
        <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
          <div className="text-sm text-amber-600 dark:text-amber-400 flex items-center">
            <AlertCircle className="w-4 h-4 mr-2" />
            {error}
          </div>
        </div>
      )}

      {/* Loading indicator */}
      {isLoading && (
        <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
          <div className="text-sm text-blue-600 dark:text-blue-400 flex items-center">
            <div className="loading-spinner mr-2"></div>
            Thinking...
          </div>
        </div>
      )}

      <div className="coach-panel-content space-y-3">
        {structuredFeedback?.overallComment && (
          <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-lg text-sm">
            <p className="font-medium">A quick thought:</p>
            <p>{structuredFeedback.overallComment}</p>
          </div>
        )}

        {structuredFeedback?.feedbackItems?.map((item, index) => {
          const { icon, bgColor, textColor } = getFeedbackItemStyle(item.type);
          return (
            <div key={index} className={`feedback-item feedback-item-${item.type} flex`}>
              <div>{icon}</div>
              <div className="flex-grow">
                <p className="font-semibold capitalize">{item.area}</p>
                <p className="mt-1">{item.text}</p>
                {item.exampleFromText && (
                  <p className="mt-1 text-xs italic border-l-2 border-current pl-2 ml-2 opacity-80">
                    For example, in your text: "{item.exampleFromText}"
                  </p>
                )}
                {item.suggestionForImprovement && (
                  <p className="mt-1 text-xs border-l-2 border-current pl-2 ml-2 opacity-80">
                    <span className="font-medium">Try this:</span> {item.suggestionForImprovement}
                  </p>
                )}
              </div>
            </div>
          );
        })}

        {structuredFeedback?.feedbackItems?.length === 0 && currentWordCount >= 50 && !isLoading && (
          <div className="p-3 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-lg text-sm text-center">
            <Sparkles className="w-6 h-6 mx-auto mb-2 opacity-50" />
            <p>AI Coach is analyzing your writing...</p>
            <p className="text-xs mt-1">This may take a moment</p>
          </div>
        )}

        {structuredFeedback?.focusForNextTime && structuredFeedback.focusForNextTime.length > 0 && (
          <div className="p-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm">
            <p className="font-medium">Keep in mind for next time:</p>
            <ul className="list-disc list-inside mt-1">
              {structuredFeedback.focusForNextTime.map((focus, idx) => (
                <li key={idx}>{focus}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <form onSubmit={handleQuestionSubmit} className="coach-panel-footer space-y-3">
        <button
          type="button"
          onClick={() => setShowPrompts(!showPrompts)}
          className="w-full flex items-center justify-between px-3 py-2 bg-blue-50 dark:bg-blue-900/30 rounded-md text-sm font-medium text-blue-800 dark:text-blue-200 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
        >
          <span>NSW Selective Writing Questions</span>
          {showPrompts ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>

        {showPrompts && (
          <div className="space-y-1 bg-white dark:bg-gray-800 rounded-md p-2 border border-gray-100 dark:border-gray-600">
            {commonPrompts.map((prompt, index) => (
              <button
                type="button"
                key={index}
                onClick={() => handlePromptClick(prompt)}
                className="w-full text-left text-sm px-3 py-1.5 rounded text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>
        )}

        <div className="flex space-x-2">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask your coach a question..."
            className="flex-1 form-input"
          />
          <button
            type="submit"
            disabled={isLoading || !question.trim()}
            className="bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed touch-friendly-button"
          >
            Ask
          </button>
        </div>
      </form>
    </div>
  );
}
