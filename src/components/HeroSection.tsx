import React, { useState } from 'react';

interface HeroSectionProps {
  onStartWriting: () => void;
  onTryDemo: () => void;
}

export function HeroSection({ onStartWriting, onTryDemo }: HeroSectionProps) {
  const [essayContent, setEssayContent] = useState('');
  
  return (
    <section className="hero-section pt-32 pb-20 bg-gradient-to-br from-indigo-50 via-white to-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Master Essay Writing for
              <span className="brand-gradient"> NSW Selective Exams</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              An AI-powered coaching platform designed specifically to help students excel in the writing section of the NSW Selective School entrance exams.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                className="btn-primary rounded-lg text-lg py-3 px-8 font-medium"
                onClick={onStartWriting}
              >
                Start Writing Now
              </button>
              <button 
                className="bg-white text-indigo-600 border border-indigo-600 rounded-lg text-lg py-3 px-8 font-medium hover:bg-indigo-50 transition-colors"
                onClick={onTryDemo}
              >
                Try Demo
              </button>
            </div>
            <div className="mt-8 flex items-center text-sm text-gray-500">
              <i className="fas fa-check-circle text-green-500 mr-2"></i>
              <span>No registration required to get started</span>
              <i className="fas fa-check-circle text-green-500 mx-2"></i>
              <span>Connected to OpenAI</span>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-emerald-300 rounded-3xl opacity-10 transform rotate-6">
            </div>
            <div className="bg-white shadow-xl rounded-3xl p-6 relative z-10">
              <div className="flex justify-between items-center mb-4 bg-indigo-50 p-3 rounded-lg">
                <div className="flex items-center">
                  <i className="fas fa-pencil-alt text-indigo-600 mr-3"></i>
                  <span className="font-medium">Narrative Essay</span>
                </div>
                <span className="text-sm text-indigo-600 bg-indigo-100 py-1 px-3 rounded-full">30:00</span>
              </div>
              <div className="mb-4 bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>Prompt:</strong> Write a creative story that begins with the sentence: "The old clock on the wall had stopped ticking exactly at midnight."
                </p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg mb-4 min-h-[100px]">
                <p className="text-gray-600 italic">
                  {essayContent || "Your essay will appear here as you type..."}
                </p>
              </div>
              <div className="flex justify-between">
                <div className="text-sm text-gray-500">
                  <i className="fas fa-chart-bar text-indigo-500 mr-1"></i>
                  Word count: <span className="font-medium">{essayContent ? essayContent.split(/\s+/).filter(Boolean).length : 0}</span>
                </div>
                <div className="flex gap-2">
                  <button className="text-gray-600 hover:text-indigo-600 bg-gray-100 hover:bg-indigo-50 p-2 rounded-lg transition-colors">
                    <i className="fas fa-save"></i>
                  </button>
                  <div className="tooltip">
                    <button className="text-white bg-indigo-600 p-2 rounded-lg hover:bg-indigo-700 transition-colors">
                      <i className="fas fa-magic"></i>
                    </button>
                    <span className="tooltiptext">Get AI feedback on your essay</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
