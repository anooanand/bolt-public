import React from 'react';
import { Sparkles, BookOpen, Clock, Brain, MessageSquare, Target, ArrowRight } from 'lucide-react';

interface FeaturesSectionProps {
  onTryFeature: (feature: string) => void;
}

export function FeaturesSection({ onTryFeature }: FeaturesSectionProps) {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/50 to-white dark:from-gray-800/50 dark:to-gray-900"></div>
      <div className="absolute inset-0 bg-grid opacity-30"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center glass-card rounded-full px-6 py-2 mb-6 shadow-lg hover-lift">
            <Sparkles className="w-5 h-5 text-indigo-500 mr-2" />
            <span className="text-sm font-medium gradient-text">
              Powered by Advanced AI
            </span>
          </div>
          
          <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Comprehensive Writing Tools
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Everything you need to master essay writing for the NSW Selective exams in one place.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-card rounded-2xl p-8 hover-lift card-shine">
            <div className="flex items-center mb-6">
              <div className="bg-indigo-100 dark:bg-indigo-900/30 p-4 rounded-xl mr-4">
                <Brain className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">AI-Powered Feedback</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Receive instant, detailed feedback on your writing with specific suggestions to improve content, structure, and style.
            </p>
            <div className="flex justify-between items-center">
              <button 
                onClick={() => onTryFeature('ai-feedback')}
                className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium inline-flex items-center group"
              >
                Try now
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 text-xs px-3 py-1 rounded-full">
                Set A Aligned
              </span>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-8 hover-lift card-shine">
            <div className="flex items-center mb-6">
              <div className="bg-purple-100 dark:bg-purple-900/30 p-4 rounded-xl mr-4">
                <BookOpen className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Text Type Templates</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Access templates for all NSW Selective text types with clear structures, examples, and guided prompts.
            </p>
            <div className="flex justify-between items-center">
              <button 
                onClick={() => onTryFeature('templates')}
                className="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 font-medium inline-flex items-center group"
              >
                Explore templates
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400 text-xs px-3 py-1 rounded-full">
                11 Types
              </span>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-8 hover-lift card-shine">
            <div className="flex items-center mb-6">
              <div className="bg-amber-100 dark:bg-amber-900/30 p-4 rounded-xl mr-4">
                <Clock className="w-8 h-8 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Timed Practice Mode</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Practice under real exam conditions with our 30-minute timer and realistic practice prompts based on past exams.
            </p>
            <div className="flex justify-between items-center">
              <button 
                onClick={() => onTryFeature('practice')}
                className="text-amber-600 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 font-medium inline-flex items-center group"
              >
                Start practice
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400 text-xs px-3 py-1 rounded-full">
                Exam Mode
              </span>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center glass-card rounded-2xl px-8 py-6 shadow-lg hover-lift">
            <Target className="w-6 h-6 text-indigo-500 mr-3" />
            <span className="text-lg font-medium text-gray-900 dark:text-white">
              95% of our students improve their writing scores within 4 weeks
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}