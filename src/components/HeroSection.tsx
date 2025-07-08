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
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 pt-20 pb-16 md:pt-32 md:pb-24">
      <div className="absolute inset-0 bg-grid opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-50/50 to-white dark:via-gray-900/20 dark:to-gray-900"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-16 h-16 bg-blue-300 rounded-full opacity-10 animate-float"></div>
      <div className="absolute top-40 right-20 w-24 h-24 bg-indigo-300 rounded-full opacity-10 animate-float" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-blue-300 rounded-full opacity-10 animate-float" style={{animationDelay: '2s'}}></div>
      <div className="absolute bottom-40 right-1/3 w-12 h-12 bg-indigo-300 rounded-full opacity-10 animate-float" style={{animationDelay: '1.5s'}}></div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight tracking-tight">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">Become a Better Writer</span>
            <br />
            <span className="text-gray-800 dark:text-white">with AI-Powered Guidance</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Create compelling stories, master essential writing techniques, and prepare effectively for NSW Selective exams with personalized AI assistance.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
            <button 
              onClick={onGetStarted}
              className="px-8 py-4 text-base font-medium rounded-md bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 flex items-center justify-center shadow-md hover:shadow-lg"
            >
              Get Started
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            
            <button 
              onClick={handleTryDemo}
              className="px-8 py-4 text-base font-medium rounded-md bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition-all duration-200 flex items-center justify-center shadow-sm hover:shadow-md"
            >
              Try Demo
              <Zap className="ml-2 w-5 h-5" />
            </button>
          </div>
          
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 text-gray-600 dark:text-gray-300">
            <div className="flex items-center bg-white bg-opacity-60 px-3 py-1.5 rounded-full shadow-sm">
              <div className="flex mr-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="text-sm font-medium">5.0 (100+ reviews)</span>
            </div>
            <span className="hidden sm:inline-block">•</span>
            <div className="flex items-center bg-white bg-opacity-60 px-3 py-1.5 rounded-full shadow-sm">
              <Zap className="w-4 h-4 text-blue-500 mr-2" />
              <span className="text-sm font-medium">Used by 10,000+ students</span>
            </div>
            <span className="hidden sm:inline-block">•</span>
            <div className="flex items-center bg-white bg-opacity-60 px-3 py-1.5 rounded-full shadow-sm">
              <span className="text-sm font-medium">3-day free trial</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}