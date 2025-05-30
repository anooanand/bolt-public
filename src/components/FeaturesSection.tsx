import React from 'react';
import { Sparkles, BookOpen, Clock, Brain, ArrowRight } from 'lucide-react';

interface FeaturesSectionProps {
  onTryFeature: (feature: string) => void;
}

export function FeaturesSection({ onTryFeature }: FeaturesSectionProps) {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/50 to-white dark:from-gray-800/50 dark:to-gray-900"></div>
      <div className="absolute inset-0 bg-grid opacity-30"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            Comprehensive Writing Tools
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Everything you need to master essay writing for the NSW Selective exams in one place.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="feature-card">
            <div className="flex items-center mb-4">
              <div className="bg-indigo-50 dark:bg-indigo-900/30 p-3 rounded-lg mr-3">
                <Brain className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">AI-Powered Feedback</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
              Receive instant, detailed feedback on your writing with specific suggestions to improve content, structure, and style.
            </p>
            <div className="flex justify-between items-center">
              <button 
                onClick={() => onTryFeature('ai-feedback')}
                className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 text-sm font-medium inline-flex items-center group"
              >
                Try now
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <span className="bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs px-2 py-1 rounded-full">
                Set A Aligned
              </span>
            </div>
          </div>

          <div className="feature-card">
            <div className="flex items-center mb-4">
              <div className="bg-purple-50 dark:bg-purple-900/30 p-3 rounded-lg mr-3">
                <BookOpen className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Text Type Templates</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
              Access templates for all NSW Selective text types with clear structures, examples, and guided prompts.
            </p>
            <div className="flex justify-between items-center">
              <button 
                onClick={() => onTryFeature('templates')}
                className="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 text-sm font-medium inline-flex items-center group"
              >
                Explore templates
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <span className="bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-xs px-2 py-1 rounded-full">
                11 Types
              </span>
            </div>
          </div>

          <div className="feature-card">
            <div className="flex items-center mb-4">
              <div className="bg-amber-50 dark:bg-amber-900/30 p-3 rounded-lg mr-3">
                <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Timed Practice Mode</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
              Practice under real exam conditions with our 30-minute timer and realistic practice prompts based on past exams.
            </p>
            <div className="flex justify-between items-center">
              <button 
                onClick={() => onTryFeature('practice')}
                className="text-amber-600 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 text-sm font-medium inline-flex items-center group"
              >
                Start practice
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <span className="bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-xs px-2 py-1 rounded-full">
                Exam Mode
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}