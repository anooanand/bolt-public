import React, { useState } from 'react';
import { X, Check, Wand, Star, Sparkles } from 'lucide-react';

interface CustomPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (prompt: string) => void;
  textType: string;
}

export function CustomPromptModal({ 
  isOpen, 
  onClose, 
  onSubmit, 
  textType 
}: CustomPromptModalProps) {
  const [prompt, setPrompt] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 
    if (prompt.trim()) {
      onSubmit(prompt.trim());
      setPrompt('');
      onClose();
    }
  };

  const handleClose = () => {
    setPrompt('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-lg w-full border border-gray-200 dark:border-gray-700">
        <div className="bg-indigo-50 dark:bg-indigo-900/10 p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-indigo-600 rounded-md flex items-center justify-center mr-4">
                <Wand className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Create Custom Prompt
              </h2>
            </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors bg-white dark:bg-gray-700 p-2 rounded-md"
          >
            <X className="w-6 h-6" />
          </button>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <p className="text-gray-700 dark:text-gray-300 mb-4 text-base">
            What would you like to write about for your <span className="font-medium text-indigo-600 dark:text-indigo-400">{textType}</span>?
          </p>
          
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={`Enter your ${textType} writing prompt here...`}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white resize-none text-base"
            rows={5}
            required
          />
          
          <div className="mt-4 bg-yellow-50 dark:bg-yellow-900/10 p-3 rounded-md border border-yellow-200 dark:border-yellow-700 mb-4">
            <div className="flex items-start">
              <Star className="w-4 h-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-yellow-700 dark:text-yellow-300">
                Be specific about what you want to write about in your {textType}.
              </p>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 mt-4">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!prompt.trim()}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center space-x-2 font-bold shadow-md transform hover:scale-105"
            >
              <Sparkles className="w-5 h-5" />
              <span>Use This Prompt</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
