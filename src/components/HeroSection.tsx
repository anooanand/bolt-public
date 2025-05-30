import React from 'react';
import { Sparkles, ArrowRight, Star } from 'lucide-react';

interface HeroSectionProps {
  onStartWriting: () => void;
  onTryDemo: () => void;
}

export function HeroSection({ onStartWriting, onTryDemo }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-white dark:bg-gray-900 pt-32 pb-24">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center glass-effect rounded-full px-4 py-2 mb-8 shadow-lg">
            <Star className="w-5 h-5 text-yellow-500 mr-2" />
            <span className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-pink-500">
              #1 AI Writing Coach for NSW Selective Exams
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="gradient-text">Master Writing Skills</span>
            <br />
            <span className="text-gray-900 dark:text-white">with AI Guidance</span>
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
            Join thousands of students preparing for NSW Selective exams with personalized AI feedback, structured practice, and real-time coaching.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <button 
              onClick={onStartWriting}
              className="gradient-bg text-white rounded-xl px-8 py-4 text-lg font-semibold hover-lift button-glow flex items-center justify-center group"
            >
              Start Writing Now
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
            
            <button 
              onClick={onTryDemo}
              className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-xl px-8 py-4 text-lg font-semibold hover-lift"
            >
              Try Demo
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="glass-effect rounded-2xl p-6 hover-lift">
              <div className="text-3xl font-bold gradient-text mb-2">10k+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Active Students</div>
            </div>
            <div className="glass-effect rounded-2xl p-6 hover-lift">
              <div className="text-3xl font-bold gradient-text mb-2">95%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Success Rate</div>
            </div>
            <div className="glass-effect rounded-2xl p-6 hover-lift">
              <div className="text-3xl font-bold gradient-text mb-2">50k+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Essays Improved</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}