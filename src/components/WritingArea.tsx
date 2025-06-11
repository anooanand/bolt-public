import React, { useState, useEffect, useCallback } from 'react';
import { MessageSquare, Sparkles, ChevronDown, ChevronUp, ThumbsUp, Lightbulb, HelpCircle, Target } from 'lucide-react';
import { getWritingFeedback } from '../lib/openai';

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

  const fetchFeedback = useCallback(async (currentContent: string, currentTextType: string, currentAssistanceLevel: string, currentFeedbackHistory: FeedbackItem[]) => {
    // Only process if content has meaningfully changed and meets minimum length
    if (currentContent.trim().length >= 50 && currentContent !== lastProcessedContent) {
      setIsLoading(true);
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
      setIsLoading(false);
    }
  }, [lastProcessedContent]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchFeedback(content, textType, assistanceLevel, feedbackHistory);
    }, 3000); // Increased to 3 seconds

    return () => clearTimeout(debounceTimer);
  }, [content, textType, assistanceLevel, feedbackHistory, fetchFeedback]);

  const handleQuestionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim()) {
      setIsLoading(true);
      const userQueryText = `Question about my ${textType} writing: ${question}\n\nCurrent text: ${content}`;
      const response = await getWritingFeedback(userQueryText, textType, assistanceLevel, feedbackHistory);
      
      if (response && response.feedbackItems) {
        const questionFeedbackItem: FeedbackItem = {
            type: 'question',
            area: 'User Question',
            text: `You asked: ${question}`
        };
        const answerItems = response.feedbackItems.map(item => ({...item, area: `Answer to: ${question}`}));
        
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
      setQuestion('');
      setIsLoading(false);
      setShowPrompts(false);
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

  return (
    <div className="h-full bg-white rounded-lg shadow-sm flex flex-col">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-5 w-5 text-blue-600" />
            <h2 className="text-lg font-medium text-gray-900">Writing Coach</h2>
          </div>
          {isLoading && (
            <div className="text-sm text-blue-600 animate-pulse">Thinking...</div>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {structuredFeedback?.overallComment && (
          <div className="mb-4 p-3 bg-indigo-50 text-indigo-700 rounded-lg text-sm">
            <p className="font-medium">A quick thought:</p>
            <p>{structuredFeedback.overallComment}</p>
          </div>
        )}

        {structuredFeedback?.feedbackItems?.map((item, index) => {
          const { icon, bgColor, textColor } = getFeedbackItemStyle(item.type);
          return (
            <div key={index} className={`rounded-lg p-3 ${bgColor} ${textColor} text-sm flex`}>
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

        {structuredFeedback?.focusForNextTime && structuredFeedback.focusForNextTime.length > 0 && (
          <div className="mt-4 p-3 bg-gray-100 text-gray-700 rounded-lg text-sm">
            <p className="font-medium">Keep in mind for next time:</p>
            <ul className="list-disc list-inside mt-1">
              {structuredFeedback.focusForNextTime.map((focus, idx) => (
                <li key={idx}>{focus}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <form onSubmit={handleQuestionSubmit} className="p-4 border-t bg-gray-50 space-y-3">
        <button
          type="button"
          onClick={() => setShowPrompts(!showPrompts)}
          className="w-full flex items-center justify-between px-3 py-2 bg-blue-50 rounded-md text-sm font-medium text-blue-800 hover:bg-blue-100 transition-colors"
        >
          <span>Common Writing Questions</span>
          {showPrompts ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>

        {showPrompts && (
          <div className="space-y-1 pl-2 bg-white rounded-md p-2 border border-gray-100">
            {commonPrompts.map((prompt, index) => (
              <button
                type="button"
                key={index}
                onClick={() => handlePromptClick(prompt)}
                className="w-full text-left text-sm px-3 py-1.5 rounded text-gray-700 hover:bg-gray-100 transition-colors"
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
            className="flex-1 rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
          />
          <button
            type="submit"
            disabled={isLoading || !question.trim()}
            className="px-4 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
          >
            Ask
          </button>
        </div>
      </form>
    </div>
  );
}
