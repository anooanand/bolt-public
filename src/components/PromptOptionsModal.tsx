import React from 'react';
import { X, Sparkles, Edit3, Wand, Star, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  if (!isOpen) return null;

  // FIXED: Let parent component handle the flow instead of navigating directly
  const handleGeneratePrompt = () => {
    console.log('🎯 PromptOptionsModal: Generate prompt clicked for:', textType);
    
    // Store the choice for the parent component to handle
    localStorage.setItem('promptType', 'generated');
    localStorage.setItem('selectedWritingType', textType);
    
    // Call the parent's callback to handle prompt generation
    onGeneratePrompt();
  };

  const handleCustomPrompt = () => {
    console.log('✏️ PromptOptionsModal: Custom prompt clicked for:', textType);
    
    // Store the choice for the parent component to handle
    localStorage.setItem('promptType', 'custom');
    localStorage.setItem('selectedWritingType', textType);
    
    // Call the parent's callback to handle custom prompt
    onCustomPrompt();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-md w-full border-4 border-blue-300 dark:border-blue-700">
        <div className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 p-6 border-b-4 border-blue-300 dark:border-blue-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-4 shadow-lg">
                <Wand className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                Choose Your Prompt
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
        
        <div className="p-6">
          <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg text-center font-medium">
            How would you like to get your <span className="font-bold text-blue-600 dark:text-blue-400">{textType}</span> writing prompt?
          </p>
          
          <div className="space-y-6">
            <button
              onClick={handleGeneratePrompt}
              className="w-full flex items-center p-6 border-4 border-purple-200 dark:border-purple-800 rounded-2xl hover:border-purple-400 dark:hover:border-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-all duration-300 text-left group transform hover:scale-105 hover:shadow-xl"
            >
              <div className="flex-shrink-0 mr-6">
                <div className="p-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl group-hover:from-purple-500 group-hover:to-pink-500 transition-colors shadow-md">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Magic Prompt Generator ✨
                </h3>
                <p className="text-base text-gray-700 dark:text-gray-300">
                  Let our AI create an awesome {textType} prompt just for you! Perfect for getting started quickly.
                </p>
              </div>
            </button>

            <button
              onClick={handleCustomPrompt}
              className="w-full flex items-center p-6 border-4 border-blue-200 dark:border-blue-800 rounded-2xl hover:border-blue-400 dark:hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all duration-300 text-left group transform hover:scale-105 hover:shadow-xl"
            >
              <div className="flex-shrink-0 mr-6">
                <div className="p-4 bg-gradient-to-r from-blue-400 to-teal-400 rounded-2xl group-hover:from-blue-500 group-hover:to-teal-500 transition-colors shadow-md">
                  <Edit3 className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Use My Own Idea 🎨
                </h3>
                <p className="text-base text-gray-700 dark:text-gray-300">
                  Type in your own {textType} writing prompt or topic. Great for when you have a specific idea!
                </p>
              </div>
            </button>
          </div>
          
          <div className="mt-8 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 p-4 rounded-xl border-2 border-yellow-200 dark:border-yellow-800">
            <div className="flex items-start">
              <Star className="w-5 h-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                A good prompt will help you write an amazing {textType} story! Choose the option that sounds most exciting to you. Remember, there's no wrong choice - both will lead to great writing adventures!
              </p>
            </div>
          </div>
          
          {/* DEBUG INFO - Remove in production */}
          <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg text-xs text-gray-600 dark:text-gray-400">
            <p>🔍 Debug Info:</p>
            <p>Text Type: {textType}</p>
            <p>Navigation Source: {localStorage.getItem('navigationSource') || 'unknown'}</p>
            <p>Modal Timestamp: {localStorage.getItem('modalTimestamp') || 'none'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}