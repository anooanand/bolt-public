import React, { useState } from 'react';
import { X, Lightbulb, Star, Sparkles } from 'lucide-react';

interface Tip {
  id: string;
  text: string;
  icon: React.ReactNode;
  color: string;
}

interface ChatTipsProps {
  onClose?: () => void;
}

export function ChatTips({ onClose }: ChatTipsProps) {
  const [tips, setTips] = useState<Tip[]>([
    {
      id: '1',
      text: "Try using descriptive words to make your story more exciting!",
      icon: <Sparkles className="h-5 w-5" />,
      color: "bg-gradient-to-r from-blue-500 to-purple-500"
    },
    {
      id: '2',
      text: "Remember to include a beginning, middle, and end in your story.",
      icon: <Star className="h-5 w-5" />,
      color: "bg-gradient-to-r from-green-500 to-teal-500"
    },
    {
      id: '3',
      text: "Use dialogue to show what your characters are saying and thinking!",
      icon: <Lightbulb className="h-5 w-5" />,
      color: "bg-gradient-to-r from-yellow-500 to-orange-500"
    },
    {
      id: '4',
      text: "Try to show how your characters feel instead of just telling.",
      icon: <Sparkles className="h-5 w-5" />,
      color: "bg-gradient-to-r from-pink-500 to-red-500"
    },
    {
      id: '5',
      text: "Don't forget to give your story an exciting title!",
      icon: <Star className="h-5 w-5" />,
      color: "bg-gradient-to-r from-purple-500 to-indigo-500"
    }
  ]);

  const handleRemoveTip = (id: string) => {
    setTips(tips.filter(tip => tip.id !== id));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border-4 border-yellow-300 dark:border-yellow-700 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 p-4 border-b-4 border-yellow-300 dark:border-yellow-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mr-3 shadow-md">
              <Lightbulb className="h-5 w-5 text-white" />
            </div>
            <h3 className="font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600 dark:from-yellow-400 dark:to-orange-400">
              Writing Tips
            </h3>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors bg-white dark:bg-gray-700 p-2 rounded-full shadow-md hover:shadow-lg transform hover:scale-110 transition-all duration-300"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
      
      {/* Tips Container with Scrolling */}
      <div className="h-64 overflow-y-auto p-4 bg-gradient-to-b from-yellow-50 to-orange-50 dark:from-yellow-900/10 dark:to-orange-900/10">
        {tips.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <Lightbulb className="h-12 w-12 text-yellow-400 mb-3" />
            <p className="text-gray-500 dark:text-gray-400 font-medium">
              All tips have been cleared! Refresh to see more tips.
            </p>
          </div>
        ) : (
          tips.map((tip) => (
            <div 
              key={tip.id} 
              className="relative mb-4 bg-white dark:bg-gray-700 rounded-2xl p-4 shadow-md border-2 border-yellow-200 dark:border-yellow-800"
            >
              {/* Close Button */}
              <button 
                onClick={() => handleRemoveTip(tip.id)}
                className="absolute -top-2 -right-2 w-8 h-8 flex items-center justify-center rounded-full shadow-md transition-all duration-300 transform hover:scale-110 bg-red-500 text-white hover:bg-red-600 border-2 border-white z-10"
                aria-label="Remove tip"
              >
                <X className="h-5 w-5" />
              </button>
              
              {/* Tip Content */}
              <div className="flex items-start">
                <div className={`w-8 h-8 ${tip.color} rounded-full flex items-center justify-center mr-3 text-white shadow-md`}>
                  {tip.icon}
                </div>
                <p className="text-gray-800 dark:text-white">{tip.text}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}