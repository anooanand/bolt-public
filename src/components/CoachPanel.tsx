import React, { useState, useEffect, useCallback } from 'react';
import { MessageSquare, Sparkles, ChevronDown, ChevronUp, ThumbsUp, Lightbulb, HelpCircle, Target } from 'lucide-react';
import { getWritingFeedback } from '../lib/openai';

interface CoachPanelProps {
  content: string;
  textType: string;
  assistanceLevel: string;
}

export function CoachPanel({ content, textType, assistanceLevel }: CoachPanelProps) {
  const [structuredFeedback, setStructuredFeedback] = useState<any>(null);
  const [feedbackHistory, setFeedbackHistory] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [question, setQuestion] = useState('');
  const [showPrompts, setShowPrompts] = useState(false);

  const commonPrompts = [
    "How can I make my introduction more engaging?",
    "Can you give me some stronger verbs to use?",
    "How can I show my character's feelings instead of telling?",
    "What kind of details would make my story more vivid?",
    "How do I write a satisfying conclusion?",
    "How can I improve my sentence flow?"
  ];

  const fetchFeedback = useCallback(async () => {
    if (content.trim().length >= 50 && content !== lastProcessedContent) {
      setIsLoading(true);
      const response = await getWritingFeedback(content, textType, assistanceLevel, feedbackHistory);
      if (response && response.feedbackItems) {
        setStructuredFeedback(response);
        setFeedbackHistory(prevHistory => [...prevHistory, ...response.feedbackItems]);
      }
      setIsLoading(false);
    }
  }, [content, textType, assistanceLevel, feedbackHistory]);

  const handleQuestionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim()) {
      setIsLoading(true);
      const response = await getWritingFeedback(
        `Question about my ${textType} writing: ${question}\n\nCurrent text: ${content}`,
        textType,
        assistanceLevel,
        feedbackHistory
      );
      
      if (response) {
        setStructuredFeedback(response);
        setFeedbackHistory(prevHistory => [...prevHistory, ...response.feedbackItems]);
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

  const getFeedbackItemStyle = (type: string) => {
    switch (type) {
      case 'praise':
        return { 
          icon: <ThumbsUp className="h-5 w-5 text-green-600 dark:text-green-400 mr-2 shrink-0" />,
          bgColor: 'bg-green-50 dark:bg-green-900/30',
          textColor: 'text-green-800 dark:text-green-200'
        };
      case 'suggestion':
        return { 
          icon: <Lightbulb className="h-5 w-5 text-amber-600 dark:text-amber-400 mr-2 shrink-0" />,
          bgColor: 'bg-amber-50 dark:bg-amber-900/30',
          textColor: 'text-amber-800 dark:text-amber-200'
        };
      case 'question':
        return { 
          icon: <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2 shrink-0" />,
          bgColor: 'bg-blue-50 dark:bg-blue-900/30',
          textColor: 'text-blue-800 dark:text-blue-200'
        };
      case 'challenge':
        return { 
          icon: <Target className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-2 shrink-0" />,
          bgColor: 'bg-purple-50 dark:bg-purple-900/30',
          textColor: 'text-purple-800 dark:text-purple-200'
        };
      default:
        return { 
          icon: <Sparkles className="h-5 w-5 text-gray-600 dark:text-gray-400 mr-2 shrink-0" />,
          bgColor: 'bg-gray-50 dark:bg-gray-800',
          textColor: 'text-gray-800 dark:text-gray-200'
        };
    }
  };

  return (
    <div className="h-full bg-white dark:bg-gray-900 rounded-lg shadow-sm flex flex-col">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Writing Coach</h2>
          </div>
          {isLoading && (
            <div className="text-sm text-blue-600 dark:text-blue-400 animate-pulse">Thinking...</div>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {structuredFeedback?.overallComment && (
          <div className="mb-4 p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg">
            <p className="text-indigo-700 dark:text-indigo-200">{structuredFeedback.overallComment}</p>
          </div>
        )}

        {structuredFeedback?.feedbackItems?.map((item: any, index: number) => {
          const style = getFeedbackItemStyle(item.type);
          return (
            <div key={index} className={`rounded-lg p-3 ${style.bgColor} ${style.textColor} flex`}>
              <div>{style.icon}</div>
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
      </div>

      <form onSubmit={handleQuestionSubmit} className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 space-y-3">
        <button
          type="button"
          onClick={() => setShowPrompts(!showPrompts)}
          className="w-full flex items-center justify-between px-3 py-2 bg-blue-50 dark:bg-blue-900/30 rounded-md text-sm font-medium text-blue-800 dark:text-blue-200 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
        >
          <span>Common Writing Questions</span>
          {showPrompts ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>

        {showPrompts && (
          <div className="space-y-1 pl-2 bg-white dark:bg-gray-900 rounded-md p-2 border border-gray-100 dark:border-gray-700">
            {commonPrompts.map((prompt, index) => (
              <button
                type="button"
                key={index}
                onClick={() => handlePromptClick(prompt)}
                className="w-full text-left text-sm px-3 py-1.5 rounded text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
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
            className="flex-1 rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
          />
          <button
            type="submit"
            disabled={isLoading || !question.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
          >
            Ask
          </button>
        </div>
      </form>
    </div>
  );
}