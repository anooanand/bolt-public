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
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20 pb-16 md:pt-32 md:pb-24">
      <div className="absolute inset-0 bg-grid opacity-30"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/30 to-white/80 dark:via-gray-800/50 dark:to-gray-900/90"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-16 h-16 bg-yellow-300 rounded-full opacity-20 animate-float"></div>
      <div className="absolute top-40 right-20 w-24 h-24 bg-purple-300 rounded-full opacity-20 animate-float" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-blue-300 rounded-full opacity-20 animate-float" style={{animationDelay: '2s'}}></div>
      <div className="absolute bottom-40 right-1/3 w-12 h-12 bg-green-300 rounded-full opacity-20 animate-float" style={{animationDelay: '1.5s'}}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight font-display">
            <span className="bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 text-transparent bg-clip-text">Become a Super Writer </span>
            <span className="relative">
              <span className="bg-gradient-to-r from-pink-700 to-orange-600 text-transparent bg-clip-text">Today!</span>
              <span className="absolute -top-6 -right-6 text-3xl animate-bounce">✨</span>
            </span>
            <br />
            <span className="text-gray-900 dark:text-white">with Your AI Writing Buddy</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-800 dark:text-gray-200 mb-10 max-w-3xl mx-auto leading-relaxed font-medium">
            Create amazing stories, learn cool writing tricks, and have fun with your AI writing buddy! Perfect for NSW Selective exam practice.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-8">
            <button 
              onClick={onGetStarted}
              className="btn btn-primary btn-xl"
            >
              Start Your Adventure!
              <ArrowRight className="ml-3 w-6 h-6" />
            </button>
            
            <button 
              onClick={handleTryDemo}
              className="btn btn-success btn-xl"
            >
              Try It For Free!
              <Zap className="ml-3 w-6 h-6" />
            </button>
          </div>
          
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-gray-800 dark:text-gray-200">
            <div className="flex items-center bg-white/90 dark:bg-gray-800/90 px-4 py-2 rounded-full shadow-md">
              <div className="flex mr-3">
                {[1, 2, 3, 4, 5].map(star => (
                  <Star key={star} className="w-5 h-5 text-yellow-500 fill-current" />
                ))}
              </div>
              <span className="font-bold text-gray-900 dark:text-gray-100">5.0 (100+ happy kids!)</span>
            </div>
            <span className="hidden sm:inline-block">•</span>
            <div className="flex items-center bg-white/90 dark:bg-gray-800/90 px-4 py-2 rounded-full shadow-md">
              <Zap className="w-5 h-5 text-purple-600 mr-2" />
              <span className="font-bold text-gray-900 dark:text-gray-100">Used by 10,000+ students</span>
            </div>
            <span className="hidden sm:inline-block">•</span>
            <div className="flex items-center bg-white/90 dark:bg-gray-800/90 px-4 py-2 rounded-full shadow-md">
              <span className="font-bold text-gray-900 dark:text-gray-100">3-day free trial</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
