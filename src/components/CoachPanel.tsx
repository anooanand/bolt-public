import React, { useState, useEffect, useCallback } from 'react';
import { MessageSquare, Sparkles, ChevronDown, ChevronUp, ThumbsUp, Lightbulb, HelpCircle, Target } from 'lucide-react';
import { getWritingFeedback } from '../lib/openai';
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

  const commonPrompts = [
    "How can I make my introduction more engaging?",
    "Can you give me some stronger verbs to use?",
    "How can I show my character's feelings instead of telling?",
    "What kind of details would make my story more vivid?",
    "How do I write a satisfying conclusion?",
    "How can I improve my sentence flow?"
  ];

  // Helper function to count words in text
  const countWords = useCallback((text: string): number => {
    if (!text || text.trim().length === 0) return 0;
    // Split by whitespace and filter out empty strings
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  }, []);

  const fetchFeedback = useCallback(async (currentContent: string, currentTextType: string, currentAssistanceLevel: string, currentFeedbackHistory: FeedbackItem[]) => {
    const wordCount = countWords(currentContent);
    
    // Only process if content has meaningfully changed and meets minimum word count (50 words)
    if (wordCount >= 50 && currentContent !== lastProcessedContent) {
      console.log(`[DEBUG] Triggering AI feedback - Word count: ${wordCount}, Content length: ${currentContent.length}`);
      setIsLoading(true);
      
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
        console.error('[DEBUG] Error fetching AI feedback:', error);
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
    }, 2000); // Reduced to 2 seconds for faster response

    return () => clearTimeout(debounceTimer);
  }, [content, textType, assistanceLevel, feedbackHistory, fetchFeedback]);

  const handleQuestionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim()) {
      setIsLoading(true);
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
        console.error('[DEBUG] Error processing user question:', error);
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

  return (
    <div className="h-full flex flex-col">
      {/* Word count indicator */}
      {currentWordCount < 50 && (
        <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
          <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
            <Sparkles className="w-4 h-4 mr-2" />
            Write {wordsNeeded} more word{wordsNeeded !== 1 ? 's' : ''} to get AI feedback ({currentWordCount}/50)
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
          <span>Common Writing Questions</span>
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

