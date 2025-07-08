import React, { useState } from 'react';
import { X, MessageSquare, Lightbulb, BookOpen, Star, Sparkles, Rocket, Heart } from 'lucide-react';
import { ChatInterface } from './ChatInterface';
import { ChatTips } from './ChatTips';

interface HelpCenterProps {
  onClose?: () => void;
  isOpen?: boolean;
}

export function HelpCenter({ onClose, isOpen = true }: HelpCenterProps) {
  const [activeTab, setActiveTab] = useState<'chat' | 'tips' | 'guides'>('chat');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border-4 border-blue-300 dark:border-blue-700">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 p-4 border-b-4 border-blue-300 dark:border-blue-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-4 shadow-lg">
                <MessageSquare className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                Help Center
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors bg-white dark:bg-gray-700 p-2 rounded-full shadow-md hover:shadow-lg transform hover:scale-110 transition-all duration-300"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b-4 border-blue-200 dark:border-blue-800">
          <button
            className={`flex-1 py-4 px-6 text-center font-bold text-lg transition-all duration-300 ${
              activeTab === 'chat'
                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-b-4 border-blue-500 dark:border-blue-400'
                : 'text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/10'
            }`}
            onClick={() => setActiveTab('chat')}
          >
            <div className="flex items-center justify-center">
              <MessageSquare className="w-5 h-5 mr-2" />
              Chat
            </div>
          </button>
          <button
            className={`flex-1 py-4 px-6 text-center font-bold text-lg transition-all duration-300 ${
              activeTab === 'tips'
                ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border-b-4 border-yellow-500 dark:border-yellow-400'
                : 'text-gray-600 dark:text-gray-300 hover:bg-yellow-50 dark:hover:bg-yellow-900/10'
            }`}
            onClick={() => setActiveTab('tips')}
          >
            <div className="flex items-center justify-center">
              <Lightbulb className="w-5 h-5 mr-2" />
              Tips
            </div>
          </button>
          <button
            className={`flex-1 py-4 px-6 text-center font-bold text-lg transition-all duration-300 ${
              activeTab === 'guides'
                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-b-4 border-green-500 dark:border-green-400'
                : 'text-gray-600 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/10'
            }`}
            onClick={() => setActiveTab('guides')}
          >
            <div className="flex items-center justify-center">
              <BookOpen className="w-5 h-5 mr-2" />
              Guides
            </div>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[calc(90vh-180px)] overflow-y-auto">
          {activeTab === 'chat' && (
            <div>
              <ChatInterface 
                initialMessages={[
                  {
                    id: '1',
                    text: "Hi there! I'm your writing buddy. How can I help you today?",
                    sender: 'assistant',
                    timestamp: new Date()
                  }
                ]}
              />
            </div>
          )}

          {activeTab === 'tips' && (
            <div>
              <ChatTips />
            </div>
          )}

          {activeTab === 'guides' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <Star className="w-6 h-6 text-yellow-500 mr-2" />
                Writing Guides
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 border-2 border-blue-200 dark:border-blue-800 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-102">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-md">
                      <Rocket className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="ml-4 text-lg font-bold text-gray-900 dark:text-white">
                      Story Structure
                    </h4>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Learn how to structure your story with a clear beginning, middle, and end.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center text-gray-600 dark:text-gray-400">
                      <Sparkles className="w-4 h-4 text-blue-500 mr-2" />
                      <span>Create an exciting opening</span>
                    </li>
                    <li className="flex items-center text-gray-600 dark:text-gray-400">
                      <Sparkles className="w-4 h-4 text-blue-500 mr-2" />
                      <span>Build tension in the middle</span>
                    </li>
                    <li className="flex items-center text-gray-600 dark:text-gray-400">
                      <Sparkles className="w-4 h-4 text-blue-500 mr-2" />
                      <span>Create a satisfying ending</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-2xl p-6 border-2 border-green-200 dark:border-green-800 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-102">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center shadow-md">
                      <Heart className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="ml-4 text-lg font-bold text-gray-900 dark:text-white">
                      Character Creation
                    </h4>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Learn how to create memorable characters that readers will love.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center text-gray-600 dark:text-gray-400">
                      <Sparkles className="w-4 h-4 text-green-500 mr-2" />
                      <span>Give characters unique traits</span>
                    </li>
                    <li className="flex items-center text-gray-600 dark:text-gray-400">
                      <Sparkles className="w-4 h-4 text-green-500 mr-2" />
                      <span>Create interesting backstories</span>
                    </li>
                    <li className="flex items-center text-gray-600 dark:text-gray-400">
                      <Sparkles className="w-4 h-4 text-green-500 mr-2" />
                      <span>Show character growth</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}