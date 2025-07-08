import React from 'react';
import { X, Star } from 'lucide-react';

interface ChatBubbleProps {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  onRemove: (id: string) => void;
}

export function ChatBubble({ id, text, sender, timestamp, onRemove }: ChatBubbleProps) {
  return (
    <div 
      className={`relative mb-4 max-w-[85%] ${
        sender === 'user' 
          ? 'ml-auto bg-blue-500 text-white rounded-t-2xl rounded-bl-2xl' 
          : 'mr-auto bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded-t-2xl rounded-br-2xl border-2 border-purple-200 dark:border-purple-800'
      } p-4 shadow-md`}
    >
      {/* Close Button - Improved visibility */}
      <button 
        onClick={() => onRemove(id)}
        className="absolute -top-2 -right-2 w-8 h-8 flex items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 border-2 border-white shadow-md transition-all duration-300 transform hover:scale-110 z-10"
        aria-label="Remove message"
      >
        <X className="h-5 w-5" />
      </button>
      
      {/* Message Content */}
      <p className="break-words">{text}</p>
      
      {/* Message Footer */}
      <div className={`text-xs mt-2 ${
        sender === 'user' 
          ? 'text-blue-200' 
          : 'text-gray-400 dark:text-gray-500'
      }`}>
        {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        {sender === 'assistant' && (
          <span className="ml-2 inline-flex items-center">
            <Star className="h-3 w-3 text-yellow-500 mr-1" />
            Writing Buddy
          </span>
        )}
      </div>
    </div>
  );
}