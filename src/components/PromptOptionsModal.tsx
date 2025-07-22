// FIXED PromptOptionsModal.tsx - Ensures reliable navigation after prompt selection
// Copy and paste this to replace your existing PromptOptionsModal.tsx

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

  // FIXED: Ensure navigation happens when buttons are clicked with proper event handling
  const handleGeneratePrompt = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('🎯 PromptOptionsModal: Generate prompt clicked for:', textType);
    
    // Store additional navigation context for debugging
    localStorage.setItem('modalAction', 'generate');
    localStorage.setItem('modalTimestamp', Date.now().toString());
    
    // Call the parent handler which should trigger navigation
    onGeneratePrompt();
  };

  const handleCustomPrompt = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('✏️ PromptOptionsModal: Custom prompt clicked for:', textType);
    
    // Store additional navigation context for debugging
    localStorage.setItem('modalAction', 'custom');
    localStorage.setItem('modalTimestamp', Date.now().toString());
    
    // Call the parent handler which should trigger navigation
    onCustomPrompt();
  };

  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('❌ PromptOptionsModal: Closing modal');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-lg w-full border-4 border-blue-300 dark:border-blue-700 relative overflow-hidden">
        
        {/* Floating Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-5 left-5 w-16 h-16 bg-yellow-200 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute top-10 right-10 w-12 h-12 bg-pink-200 rounded-full opacity-30 animate-bounce"></div>
          <div className="absolute bottom-10 left-1/4 w-20 h-20 bg-purple-200 rounded-full opacity-15 animate-pulse"></div>
        </div>

        {/* Enhanced Header */}
        <div className="bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 dark:from-blue-900/30 dark:via-purple-900/30 dark:to-pink-900/30 p-8 border-b-4 border-blue-300 dark:border-blue-700 relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-5 shadow-2xl animate-pulse">
                  <Wand className="h-7 w-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                  <Sparkles className="h-3 w-3 text-white" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 mb-1">
                  Choose Your Prompt! ✨
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                  How do you want to start your {textType} adventure?
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors bg-white dark:bg-gray-700 p-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        {/* Enhanced Content */}
        <div className="p-8 relative z-10">
          <p className="text-gray-700 dark:text-gray-300 mb-8 text-lg text-center font-medium">
            How would you like to get your <span className="font-bold text-blue-600 dark:text-blue-400 text-xl">{textType}</span> writing prompt?
          </p>
          
          <div className="space-y-6">
            {/* Generate Prompt Button */}
            <button
              onClick={handleGeneratePrompt}
              className="w-full flex items-center p-8 border-4 border-purple-200 dark:border-purple-800 rounded-3xl hover:border-purple-400 dark:hover:border-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-all duration-300 text-left group transform hover:scale-105 hover:shadow-2xl relative overflow-hidden"
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500 rounded-full -mr-10 -mt-10"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-pink-500 rounded-full -ml-8 -mb-8"></div>
              </div>

              <div className="flex-shrink-0 mr-8 relative z-10">
                <div className="p-5 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 rounded-3xl group-hover:from-purple-500 group-hover:via-pink-500 group-hover:to-purple-600 transition-colors shadow-xl group-hover:shadow-2xl transform group-hover:scale-110 transition-all duration-300">
                  <Sparkles className="w-10 h-10 text-white animate-pulse" />
                </div>
              </div>
              <div className="flex-1 relative z-10">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                  Magic Prompt Generator ✨
                  <Zap className="h-6 w-6 text-yellow-500 ml-2 animate-pulse" />
                </h3>
                <p className="text-lg text-gray-700 dark:text-gray-300 font-medium">
                  Let our AI create an awesome {textType} prompt just for you! Perfect for getting started quickly.
                </p>
              </div>
            </button>

            {/* Custom Prompt Button */}
            <button
              onClick={handleCustomPrompt}
              className="w-full flex items-center p-8 border-4 border-blue-200 dark:border-blue-800 rounded-3xl hover:border-blue-400 dark:hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all duration-300 text-left group transform hover:scale-105 hover:shadow-2xl relative overflow-hidden"
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500 rounded-full -mr-10 -mt-10"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-teal-500 rounded-full -ml-8 -mb-8"></div>
              </div>

              <div className="flex-shrink-0 mr-8 relative z-10">
                <div className="p-5 bg-gradient-to-r from-blue-400 via-teal-400 to-blue-500 rounded-3xl group-hover:from-blue-500 group-hover:via-teal-500 group-hover:to-blue-600 transition-colors shadow-xl group-hover:shadow-2xl transform group-hover:scale-110 transition-all duration-300">
                  <Edit3 className="w-10 h-10 text-white" />
                </div>
              </div>
              <div className="flex-1 relative z-10">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                  Use My Own Idea 🎨
                  <Star className="h-6 w-6 text-yellow-500 ml-2 animate-pulse" />
                </h3>
                <p className="text-lg text-gray-700 dark:text-gray-300 font-medium">
                  Type in your own {textType} writing prompt or topic. Great for when you have a specific idea!
                </p>
              </div>
            </button>
          </div>
          
          {/* Enhanced Tip Section */}
          <div className="mt-10 bg-gradient-to-r from-yellow-50 via-amber-50 to-orange-50 dark:from-yellow-900/20 dark:via-amber-900/20 dark:to-orange-900/20 p-6 rounded-2xl border-3 border-yellow-200 dark:border-yellow-800 shadow-lg">
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-4">
                <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg">
                  <Star className="w-5 h-5 text-white fill-current" />
                </div>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-yellow-800 dark:text-yellow-300 text-lg mb-2">💡 Writing Tip</h4>
                <p className="text-yellow-700 dark:text-yellow-300 font-medium leading-relaxed">
                  A good prompt will help you write an amazing {textType} story! Choose the option that sounds most exciting to you. 
                  Remember, there's no wrong choice - both will lead to great writing adventures!
                </p>
              </div>
            </div>
          </div>
          
          {/* Debug Information (Remove in production) */}
          <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-xl text-xs text-gray-600 dark:text-gray-400 border-2 border-gray-200 dark:border-gray-600">
            <h5 className="font-bold mb-2">🔧 Debug Info:</h5>
            <p>Text Type: <span className="font-mono">{textType}</span></p>
            <p>Navigation Source: <span className="font-mono">{localStorage.getItem('navigationSource') || 'unknown'}</span></p>
            <p>Modal Timestamp: <span className="font-mono">{new Date().toLocaleTimeString()}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}
