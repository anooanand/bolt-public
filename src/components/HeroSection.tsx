import React from 'react';
import { ArrowRight, Star, Zap } from 'lucide-react';

interface HeroSectionProps {
  onGetStarted: () => void;
}

export function HeroSection({ onGetStarted }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-indigo-50 dark:from-gray-900 dark:to-gray-800 pt-20 pb-16 md:pt-32 md:pb-24">
      <div className="absolute inset-0 bg-grid opacity-30"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-50/50 to-white dark:via-indigo-900/20 dark:to-gray-900"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">Boost Your Child's Selective Exam </span>
            <span className="bg-gradient-to-r from-purple-600 to-rose-500 text-transparent bg-clip-text">Score</span>
            <br />
            <span className="text-gray-900 dark:text-white">with AI-Powered Writing Practice</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Master narrative, persuasive, and creative writing with personalized AI guidance. Join thousands of students preparing for NSW Selective exams.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
            <button 
              onClick={onGetStarted}
              className="px-8 py-4 text-lg font-semibold rounded-md bg-indigo-600 hover:bg-indigo-700 text-white transition-all duration-200 flex items-center justify-center"
            >
              View Pricing
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            
            <button 
              onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 text-lg font-semibold rounded-md border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 flex items-center justify-center"
            >
              See How It Works
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
