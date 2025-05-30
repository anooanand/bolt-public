import React from 'react';
import { PenTool, MessageSquare, BookOpen, Brain, FileText, Edit } from 'lucide-react';

interface WritingTypesSectionProps {
  onSelectType: (type: string) => void;
}

export function WritingTypesSection({ onSelectType }: WritingTypesSectionProps) {
  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-white to-indigo-50/30 dark:from-gray-900 dark:to-gray-800">
      <div className="absolute inset-0 bg-grid opacity-30"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center glass-card rounded-full px-6 py-2 mb-6 shadow-lg hover-lift">
            <PenTool className="w-5 h-5 text-indigo-500 mr-2" />
            <span className="text-sm font-medium gradient-text">
              NSW Selective Writing Types
            </span>
          </div>
          
          <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Master Every Writing Style
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Comprehensive coverage of all writing types with AI-powered guidance tailored to each style.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="glass-card rounded-2xl p-8 hover-lift card-shine">
            <div className="flex items-center mb-6">
              <div className="bg-indigo-100 dark:bg-indigo-900/30 p-4 rounded-xl mr-4">
                <Edit className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Narrative & Creative Writing
              </h3>
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="glass-card bg-white/50 dark:bg-gray-800/50 p-4 rounded-xl">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Narrative Writing</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Create engaging stories with compelling plots and vivid characters.
                </p>
              </div>
              
              <div className="glass-card bg-white/50 dark:bg-gray-800/50 p-4 rounded-xl">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Creative Writing</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Express your imagination through unique and original stories.
                </p>
              </div>
            </div>

            <button
              onClick={() => onSelectType('narrative')}
              className="w-full py-3 px-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-medium hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 hover:shadow-lg"
            >
              Start Writing
            </button>
          </div>

          <div className="glass-card rounded-2xl p-8 hover-lift card-shine">
            <div className="flex items-center mb-6">
              <div className="bg-purple-100 dark:bg-purple-900/30 p-4 rounded-xl mr-4">
                <MessageSquare className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Persuasive & Argumentative
              </h3>
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="glass-card bg-white/50 dark:bg-gray-800/50 p-4 rounded-xl">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Persuasive Writing</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Develop strong arguments with compelling evidence and reasoning.
                </p>
              </div>
              
              <div className="glass-card bg-white/50 dark:bg-gray-800/50 p-4 rounded-xl">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Discursive Writing</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Explore different viewpoints on complex topics objectively.
                </p>
              </div>
            </div>

            <button
              onClick={() => onSelectType('persuasive')}
              className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-medium hover:from-purple-600 hover:to-pink-700 transition-all duration-300 hover:shadow-lg"
            >
              Start Writing
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-card rounded-2xl p-8 hover-lift card-shine">
            <div className="flex items-center mb-6">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-xl mr-4">
                <BookOpen className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Informative & Analytical
              </h3>
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="glass-card bg-white/50 dark:bg-gray-800/50 p-4 rounded-xl">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Expository Writing</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Explain complex topics clearly and effectively.
                </p>
              </div>
              
              <div className="glass-card bg-white/50 dark:bg-gray-800/50 p-4 rounded-xl">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Analytical Writing</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Break down and analyze topics in detail.
                </p>
              </div>
            </div>

            <button
              onClick={() => onSelectType('expository')}
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-cyan-700 transition-all duration-300 hover:shadow-lg"
            >
              Start Writing
            </button>
          </div>

          <div className="glass-card rounded-2xl p-8 hover-lift card-shine">
            <div className="flex items-center mb-6">
              <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-xl mr-4">
                <FileText className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Descriptive & Reflective
              </h3>
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="glass-card bg-white/50 dark:bg-gray-800/50 p-4 rounded-xl">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Descriptive Writing</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Paint vivid pictures with words using sensory details.
                </p>
              </div>
              
              <div className="glass-card bg-white/50 dark:bg-gray-800/50 p-4 rounded-xl">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Reflective Writing</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Share personal insights and experiences thoughtfully.
                </p>
              </div>
            </div>

            <button
              onClick={() => onSelectType('descriptive')}
              className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-medium hover:from-green-600 hover:to-emerald-700 transition-all duration-300 hover:shadow-lg"
            >
              Start Writing
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}