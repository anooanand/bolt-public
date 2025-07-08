import React, { useState } from 'react';
import { X, BookOpen, Lightbulb, MessageSquare, Target, Star, Rocket, Sparkles } from 'lucide-react';
import { ChatInterface } from './ChatInterface';

interface HelpCenterProps {
  onClose?: () => void;
}

export function HelpCenter({ onClose }: HelpCenterProps) {
  const [activeTab, setActiveTab] = useState<'chat' | 'guides' | 'tips'>('chat');

  // Sample initial messages for the chat
  const initialMessages = [
    {
      id: '1',
      text: "Hi there! I'm your writing buddy. How can I help you today?",
      sender: 'assistant',
      timestamp: new Date()
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border-4 border-blue-300 dark:border-blue-700">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 p-6 border-b-4 border-blue-300 dark:border-blue-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-4 shadow-lg">
                <Sparkles className="h-6 w-6 text-white" />
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
        <div className="bg-white dark:bg-gray-800 p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab('chat')}
              className={`px-4 py-2 rounded-xl font-bold text-base transition-all duration-300 ${
                activeTab === 'chat'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md transform scale-105'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <div className="flex items-center">
                <MessageSquare className="w-5 h-5 mr-2" />
                Chat with AI
              </div>
            </button>
            <button
              onClick={() => setActiveTab('guides')}
              className={`px-4 py-2 rounded-xl font-bold text-base transition-all duration-300 ${
                activeTab === 'guides'
                  ? 'bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-md transform scale-105'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <div className="flex items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                Writing Guides
              </div>
            </button>
            <button
              onClick={() => setActiveTab('tips')}
              className={`px-4 py-2 rounded-xl font-bold text-base transition-all duration-300 ${
                activeTab === 'tips'
                  ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-md transform scale-105'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <div className="flex items-center">
                <Lightbulb className="w-5 h-5 mr-2" />
                Quick Tips
              </div>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 200px)' }}>
          {activeTab === 'chat' && (
            <ChatInterface initialMessages={initialMessages} />
          )}

          {activeTab === 'guides' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <BookOpen className="w-6 h-6 text-green-500 mr-2" />
                Writing Guides
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-2xl border-2 border-blue-200 dark:border-blue-800">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                      <Rocket className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="font-bold text-blue-800 dark:text-blue-300">Story Writing</h4>
                  </div>
                  <p className="text-blue-700 dark:text-blue-300 mb-3">
                    Learn how to create exciting stories with interesting characters and adventures!
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Star className="w-4 h-4 text-blue-500 mt-1 mr-2" />
                      <span className="text-blue-700 dark:text-blue-300">Start with a fun beginning that grabs attention</span>
                    </li>
                    <li className="flex items-start">
                      <Star className="w-4 h-4 text-blue-500 mt-1 mr-2" />
                      <span className="text-blue-700 dark:text-blue-300">Create interesting characters with personalities</span>
                    </li>
                    <li className="flex items-start">
                      <Star className="w-4 h-4 text-blue-500 mt-1 mr-2" />
                      <span className="text-blue-700 dark:text-blue-300">Add a problem that needs to be solved</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 rounded-2xl border-2 border-green-200 dark:border-green-800">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-3">
                      <Target className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="font-bold text-green-800 dark:text-green-300">Persuasive Writing</h4>
                  </div>
                  <p className="text-green-700 dark:text-green-300 mb-3">
                    Learn how to convince others with your writing!
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Star className="w-4 h-4 text-green-500 mt-1 mr-2" />
                      <span className="text-green-700 dark:text-green-300">Start with a strong opinion</span>
                    </li>
                    <li className="flex items-start">
                      <Star className="w-4 h-4 text-green-500 mt-1 mr-2" />
                      <span className="text-green-700 dark:text-green-300">Give reasons why you think that way</span>
                    </li>
                    <li className="flex items-start">
                      <Star className="w-4 h-4 text-green-500 mt-1 mr-2" />
                      <span className="text-green-700 dark:text-green-300">End with a strong conclusion</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tips' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <Lightbulb className="w-6 h-6 text-yellow-500 mr-2" />
                Quick Writing Tips
              </h3>
              
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 p-4 rounded-2xl border-2 border-yellow-200 dark:border-yellow-800">
                  <div className="flex items-center mb-2">
                    <Star className="w-5 h-5 text-yellow-500 mr-2" />
                    <h4 className="font-bold text-yellow-800 dark:text-yellow-300">Use Descriptive Words</h4>
                  </div>
                  <p className="text-yellow-700 dark:text-yellow-300">
                    Instead of saying "The dog was big", try "The enormous dog towered over the fence"!
                  </p>
                </div>
                
                <div className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-4 rounded-2xl border-2 border-purple-200 dark:border-purple-800">
                  <div className="flex items-center mb-2">
                    <Star className="w-5 h-5 text-purple-500 mr-2" />
                    <h4 className="font-bold text-purple-800 dark:text-purple-300">Start with a Hook</h4>
                  </div>
                  <p className="text-purple-700 dark:text-purple-300">
                    Begin your story with something exciting to grab your reader's attention!
                  </p>
                </div>
                
                <div className="bg-gradient-to-r from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20 p-4 rounded-2xl border-2 border-pink-200 dark:border-pink-800">
                  <div className="flex items-center mb-2">
                    <Star className="w-5 h-5 text-pink-500 mr-2" />
                    <h4 className="font-bold text-pink-800 dark:text-pink-300">Show, Don't Tell</h4>
                  </div>
                  <p className="text-pink-700 dark:text-pink-300">
                    Instead of saying "She was sad", try "Tears rolled down her cheeks as she looked at the broken toy."
                  </p>
                </div>
                
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-2xl border-2 border-blue-200 dark:border-blue-800">
                  <div className="flex items-center mb-2">
                    <Star className="w-5 h-5 text-blue-500 mr-2" />
                    <h4 className="font-bold text-blue-800 dark:text-blue-300">Read Your Writing Out Loud</h4>
                  </div>
                  <p className="text-blue-700 dark:text-blue-300">
                    Reading your story out loud helps you find mistakes and see if it sounds good!
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HelpCenter;