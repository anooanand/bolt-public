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
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20 pt-20 pb-16 md:pt-32 md:pb-24">
      <div className="absolute inset-0 bg-grid opacity-40"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/50 to-white dark:via-blue-900/20 dark:to-gray-900"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-16 h-16 bg-yellow-300 rounded-full opacity-20 animate-float"></div>
      <div className="absolute top-40 right-20 w-24 h-24 bg-purple-300 rounded-full opacity-20 animate-float" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-blue-300 rounded-full opacity-20 animate-float" style={{animationDelay: '2s'}}></div>
      <div className="absolute bottom-40 right-1/3 w-12 h-12 bg-green-300 rounded-full opacity-20 animate-float" style={{animationDelay: '1.5s'}}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight font-display">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-transparent bg-clip-text">Become a Super Writer </span>
            <span className="relative">
              <span className="bg-gradient-to-r from-pink-600 to-yellow-500 text-transparent bg-clip-text">Today!</span>
              <span className="absolute -top-6 -right-6 text-3xl animate-bounce">✨</span>
            </span>
            <br />
            <span className="text-gray-900 dark:text-white">with Your AI Writing Buddy</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed font-medium">
            Create amazing stories, learn cool writing tricks, and have fun with your AI writing buddy! Perfect for NSW Selective exam practice.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-8">
            <button 
              onClick={onGetStarted}
              className="px-10 py-5 text-xl font-bold rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105 border-4 border-white"
            >
              Start Your Adventure!
              <ArrowRight className="ml-3 w-6 h-6" />
            </button>
            
            <button 
              onClick={handleTryDemo}
              className="px-10 py-5 text-xl font-bold rounded-2xl bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105 border-4 border-white"
            >
              Try It For Free!
              <Zap className="ml-3 w-6 h-6" />
            </button>
          </div>
          
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-gray-700 dark:text-gray-300">
            <div className="flex items-center bg-white bg-opacity-70 px-4 py-2 rounded-full shadow-md">
              <div className="flex mr-3">
                {[1, 2, 3, 4, 5].map(star => (
                  <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="font-bold">5.0 (100+ happy kids!)</span>
            </div>
            <span className="hidden sm:inline-block">•</span>
            <div className="flex items-center bg-white bg-opacity-70 px-4 py-2 rounded-full shadow-md">
              <Zap className="w-5 h-5 text-purple-500 mr-2" />
              <span className="font-bold">Used by 10,000+ students</span>
            </div>
            <span className="hidden sm:inline-block">•</span>
            <div className="flex items-center bg-white bg-opacity-70 px-4 py-2 rounded-full shadow-md">
              <span className="font-bold">3-day free trial</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}