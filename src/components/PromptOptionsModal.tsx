import React from 'react';
import { X, Sparkles, Edit3 } from 'lucide-react';

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Choose Your Prompt
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6">
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            How would you like to get your {textType} writing prompt?
          </p>
          
          <div className="space-y-4">
            <button
              onClick={onGeneratePrompt}
              className="w-full flex items-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-purple-500 dark:hover:border-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-200 text-left group"
            >
              <div className="flex-shrink-0 mr-4">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-lg group-hover:bg-purple-200 dark:group-hover:bg-purple-800/50 transition-colors">
                  <Sparkles className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  Generate Prompt
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Let AI create a tailored prompt for your {textType} writing
                </p>
              </div>
            </button>

            <button
              onClick={onCustomPrompt}
              className="w-full flex items-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 text-left group"
            >
              <div className="flex-shrink-0 mr-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50 transition-colors">
                  <Edit3 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  I have my own prompt
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Enter your own writing prompt or topic
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}