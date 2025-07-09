import React from 'react';
import { ArrowRight, Star, Zap } from 'lucide-react';

interface HeroSectionProps {
  onGetStarted: () => void;
}

export function HeroSection({ onGetStarted }: HeroSectionProps) {
  const handleTryDemo = () => {
    window.location.href = '/demo';
  };

  return (
    <section className="relative overflow-hidden bg-white dark:bg-gray-900 pt-20 pb-16 md:pt-32 md:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="text-indigo-600 dark:text-indigo-400">Become a Better Writer </span>
            <span className="text-gray-900 dark:text-white">with AI Assistance</span>
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Master writing skills with personalized AI guidance. Perfect for NSW Selective exam preparation.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <button 
              onClick={onGetStarted}
              className="px-8 py-4 text-base font-semibold rounded-md bg-indigo-600 hover:bg-indigo-700 text-white transition-all duration-300 flex items-center justify-center space-x-2 shadow-md"
            >
              Get Started
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            
            <button 
              onClick={handleTryDemo}
              className="px-8 py-4 text-base font-semibold rounded-md bg-white border border-indigo-600 text-indigo-600 hover:bg-gray-50 transition-all duration-300 flex items-center justify-center space-x-2 shadow-sm"
            >
              Try Demo
              <Zap className="ml-2 w-5 h-5" />
            </button>
          </div>
          
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 text-gray-600 dark:text-gray-300">
            <div className="flex items-center">
              <Star className="w-5 h-5 text-yellow-400 mr-2" />
              <span className="font-medium">Trusted by 10,000+ students</span>
            </div>
            <div className="h-4 w-px bg-gray-300 dark:bg-gray-700 hidden sm:block"></div>
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-indigo-600 mr-2" />
              <span className="font-medium">3-day free trial</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}