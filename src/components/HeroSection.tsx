import React from 'react';
import { Sparkles, ArrowRight, Star, Users, CheckCircle, Zap } from 'lucide-react';

interface HeroSectionProps {
  onStartWriting: () => void;
  onTryDemo: () => void;
}

export function HeroSection({ onStartWriting, onTryDemo }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white to-indigo-50 dark:from-gray-900 dark:to-gray-800 pt-32 pb-24">
      <div className="absolute inset-0 bg-grid opacity-30"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-50/50 to-white dark:via-indigo-900/20 dark:to-gray-900"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center glass-card rounded-full px-6 py-2 mb-8 shadow-lg hover-lift">
            <Star className="w-5 h-5 text-yellow-500 mr-2" />
            <span className="text-sm font-medium gradient-text">
              Trusted by 10,000+ NSW Students
            </span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight text-shadow">
            <span className="gradient-text">Master Writing</span>
            <br />
            <span className="text-gray-900 dark:text-white">with AI Guidance</span>
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Elevate your writing skills with personalized AI feedback, structured practice, and real-time coaching designed specifically for NSW Selective exams.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-16">
            <button 
              onClick={onStartWriting}
              className="gradient-border glass-card px-8 py-4 text-lg font-semibold hover-lift button-glow flex items-center justify-center group bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Start Writing Now
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
            
            <button 
              onClick={onTryDemo}
              className="glass-card text-gray-900 dark:text-white border border-gray-200/50 dark:border-gray-700/50 rounded-xl px-8 py-4 text-lg font-semibold hover-lift flex items-center justify-center"
            >
              <Zap className="w-5 h-5 mr-2 text-yellow-500" />
              Try Interactive Demo
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="glass-card rounded-2xl p-8 hover-lift card-shine">
              <div className="flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-indigo-500" />
              </div>
              <div className="text-4xl font-bold gradient-text mb-2">10k+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Active Students</div>
            </div>
            
            <div className="glass-card rounded-2xl p-8 hover-lift card-shine">
              <div className="flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
              <div className="text-4xl font-bold gradient-text mb-2">95%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Success Rate</div>
            </div>
            
            <div className="glass-card rounded-2xl p-8 hover-lift card-shine">
              <div className="flex items-center justify-center mb-4">
                <Sparkles className="w-8 h-8 text-purple-500" />
              </div>
              <div className="text-4xl font-bold gradient-text mb-2">50k+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Essays Improved</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}