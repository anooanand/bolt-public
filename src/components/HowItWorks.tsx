import React from 'react';
import { Sparkles, Brain, MessageSquare, TrendingUp, CheckCircle2, ArrowRight } from 'lucide-react';

export function HowItWorks() {
  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-white to-indigo-50/30 dark:from-gray-900 dark:to-gray-800">
      <div className="absolute inset-0 bg-grid opacity-30"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center glass-card rounded-full px-6 py-2 mb-6 shadow-lg hover-lift">
            <Brain className="w-5 h-5 text-indigo-500 mr-2" />
            <span className="text-sm font-medium gradient-text">
              How InstaChat AI Works
            </span>
          </div>
          
          <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            AI-Powered Writing Support
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Our AI-powered platform guides students step-by-step, helping them master key writing formats required for NSW Selective School exams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="glass-card rounded-2xl p-8 hover-lift card-shine">
            <div className="flex items-center mb-6">
              <div className="bg-indigo-100 dark:bg-indigo-900/30 p-4 rounded-xl mr-4">
                <MessageSquare className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Step-by-Step Writing Support
              </h3>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              The AI guides students through each section using an interactive, structured approach based on NSW syllabus expectations.
            </p>
            
            <div className="glass-card bg-white/50 dark:bg-gray-800/50 p-4 rounded-xl mb-4">
              <p className="text-gray-700 dark:text-gray-300 italic">
                "What is your main argument? Why do you believe this is true?"
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-start">
                <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                <span className="text-gray-600 dark:text-gray-300 text-sm">
                  Interactive prompts guide your thinking
                </span>
              </div>
              <div className="flex items-start">
                <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                <span className="text-gray-600 dark:text-gray-300 text-sm">
                  Structured approach based on NSW criteria
                </span>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-8 hover-lift card-shine">
            <div className="flex items-center mb-6">
              <div className="bg-purple-100 dark:bg-purple-900/30 p-4 rounded-xl mr-4">
                <Sparkles className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Real-Time AI Feedback
              </h3>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="glass-card bg-white/50 dark:bg-gray-800/50 p-4 rounded-xl">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Instant Corrections</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Grammar & spelling corrections, sentence structure improvements
                </p>
              </div>
              
              <div className="glass-card bg-white/50 dark:bg-gray-800/50 p-4 rounded-xl">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Writing Techniques</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Persuasive & narrative techniques, style improvements
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="glass-card rounded-2xl p-8 hover-lift card-shine">
            <div className="flex items-center mb-6">
              <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-xl mr-4">
                <TrendingUp className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Student Success Data
              </h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="glass-card bg-white/50 dark:bg-gray-800/50 p-4 rounded-xl text-center">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">82%</div>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Writing Score Improvement</p>
              </div>
              
              <div className="glass-card bg-white/50 dark:bg-gray-800/50 p-4 rounded-xl text-center">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">94%</div>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Student Confidence</p>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-8 hover-lift card-shine">
            <div className="flex items-center mb-6">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-xl mr-4">
                <Brain className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Feature Comparison
              </h3>
            </div>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between glass-card bg-white/50 dark:bg-gray-800/50 p-3 rounded-xl">
                <span className="text-gray-700 dark:text-gray-300 text-sm">Step-by-step writing guidance</span>
                <div className="flex items-center">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mr-4" />
                  <ArrowRight className="w-5 h-5 text-red-500 rotate-45" />
                </div>
              </div>
              
              <div className="flex items-center justify-between glass-card bg-white/50 dark:bg-gray-800/50 p-3 rounded-xl">
                <span className="text-gray-700 dark:text-gray-300 text-sm">Follows NSW writing criteria</span>
                <div className="flex items-center">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mr-4" />
                  <ArrowRight className="w-5 h-5 text-red-500 rotate-45" />
                </div>
              </div>
              
              <div className="flex items-center justify-between glass-card bg-white/50 dark:bg-gray-800/50 p-3 rounded-xl">
                <span className="text-gray-700 dark:text-gray-300 text-sm">Interactive AI coaching</span>
                <div className="flex items-center">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mr-4" />
                  <ArrowRight className="w-5 h-5 text-red-500 rotate-45" />
                </div>
              </div>
            </div>
            
            <div className="glass-card bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl">
              <p className="text-amber-800 dark:text-amber-200 text-sm">
                Unlike generic AI chatbots, InstaChat AI teaches students how to write better, rather than just generating answers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}