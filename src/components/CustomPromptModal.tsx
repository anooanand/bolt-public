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
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-lg w-full border-4 border-blue-300 dark:border-blue-700">
        <div className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 p-6 border-b-4 border-blue-300 dark:border-blue-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-4 shadow-lg">
                <Wand className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                Create Your Own Prompt
              </h2>
            </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors bg-white dark:bg-gray-700 p-2 rounded-full shadow-md hover:shadow-lg transform hover:scale-110 transition-all duration-300"
          >
            <X className="w-6 h-6" />
          </button>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg">
            What would you like to write about for your <span className="font-bold text-blue-600 dark:text-blue-400">{textType}</span> story?
          </p>
          
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={`Enter your ${textType} writing prompt here...`}
            className="w-full p-4 border-3 border-blue-300 dark:border-blue-700 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 dark:bg-gray-700 dark:text-white resize-none shadow-inner text-lg"
            rows={5}
            required
          />
          
          <div className="mt-6 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 p-4 rounded-xl border-2 border-yellow-200 dark:border-yellow-800 mb-6">
            <div className="flex items-start">
              <Star className="w-5 h-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                Write a prompt that will help you create an amazing {textType} story! Be specific about what you want to write about.
              </p>
            </div>
          </div>
          
          <div className="flex justify-end space-x-4 mt-6">
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
