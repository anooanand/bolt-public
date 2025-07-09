import React from 'react';
import { X, Sparkles, Edit3, Wand, Star, Zap } from 'lucide-react';

interface PromptOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGeneratePrompt: () => void;
  onCustomPrompt: () => void;
  textType: string;
}

export function PromptOptionsModal({ 
  isOpen, 
  onClose, 
  onGeneratePrompt, 
  onCustomPrompt, 
  textType 
}: PromptOptionsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full border border-gray-200 dark:border-gray-700">
        <div className="bg-indigo-50 dark:bg-indigo-900/10 p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-indigo-600 rounded-md flex items-center justify-center mr-4">
                <Wand className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Choose Your Prompt
              </h2>
            </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors bg-white dark:bg-gray-700 p-2 rounded-md"
          >
            <X className="w-6 h-6" />
          </button>
          </div>
        </div>
        
        <div className="p-6">
          <p className="text-gray-700 dark:text-gray-300 mb-6 text-base">
            How would you like to get your <span className="font-bold text-blue-600 dark:text-blue-400">{textType}</span> writing prompt?
          </p>
          
          <div className="space-y-6">
            <button
              onClick={onGeneratePrompt}
              className="w-full flex items-center p-4 border border-indigo-200 dark:border-indigo-800 rounded-lg hover:border-indigo-400 dark:hover:border-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/10 transition-all duration-300 text-left"
            >
              <div className="flex-shrink-0 mr-4">
                <div className="p-3 bg-indigo-100 dark:bg-indigo-800 rounded-md">
                  <Sparkles className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                  AI Prompt Generator
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Let our AI create a {textType} prompt tailored for you
                </p>
              </div>
            </button>

            <button
              onClick={onCustomPrompt}
              className="w-full flex items-center p-4 border border-indigo-200 dark:border-indigo-800 rounded-lg hover:border-indigo-400 dark:hover:border-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/10 transition-all duration-300 text-left"
            >
              <div className="flex-shrink-0 mr-4">
                <div className="p-3 bg-indigo-100 dark:bg-indigo-800 rounded-md">
                  <Edit3 className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                  Create Your Own Prompt
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Write your own {textType} prompt or topic
                </p>
              </div>
            </button>
          </div>
          
          <div className="mt-6 bg-yellow-50 dark:bg-yellow-900/10 p-4 rounded-md border border-yellow-200 dark:border-yellow-700">
            <div className="flex items-start">
              <Star className="w-4 h-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-yellow-700 dark:text-yellow-300">
                A good prompt will help you write a better {textType}. Choose one that interests you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
