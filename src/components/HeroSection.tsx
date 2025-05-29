import React from 'react';

interface HeroSectionProps {
  onStartWriting: () => void;
  onTryDemo: () => void;
}

export function HeroSection({ onStartWriting, onTryDemo }: HeroSectionProps) {
  return (
    <section className="pt-32 pb-20 bg-gradient-to-br from-indigo-50 via-white to-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Boost Your Child's Selective Exam 
            </span>
            <span className="bg-gradient-to-r from-pink-600 via-orange-500 to-red-600 bg-clip-text text-transparent">
              Score
            </span>
          </h1>
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            with AI-Powered Writing Practice
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Master narrative, persuasive, and creative writing with personalized AI guidance. 
            Join thousands of students preparing for NSW Selective exams.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <button 
              className="btn-primary bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-lg py-3 px-8 font-medium"
              onClick={onStartWriting}
            >
              View Pricing
            </button>
            <button 
              className="bg-white text-indigo-600 border border-indigo-600 rounded-lg text-lg py-3 px-8 font-medium hover:bg-indigo-50 transition-colors"
              onClick={onTryDemo}
            >
              See How It Works
            </button>
          </div>
        </div>

        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Writing Types for NSW Selective Exam
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Choose from our comprehensive range of writing styles with AI-powered guidance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Storytelling & Creative Writing */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-indigo-100 hover:shadow-lg transition-all">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-indigo-100 p-3 rounded-full mr-3">
                  <i className="fas fa-feather-alt text-indigo-600 text-xl"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-800">Storytelling & Creative Writing</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Master the art of creative storytelling and narrative techniques
              </p>
              
              <div className="mb-4 border-t border-gray-100 pt-4">
                <div className="mb-3">
                  <h4 className="font-medium text-gray-800 mb-1">Narrative Writing</h4>
                  <p className="text-sm text-gray-600">Write engaging stories with compelling plots and characters</p>
                </div>
                <div className="mb-3">
                  <h4 className="font-medium text-gray-800 mb-1">Imaginative Writing</h4>
                  <p className="text-sm text-gray-600">Create fantastical stories and unique worlds</p>
                </div>
              </div>
              
              <button 
                onClick={onStartWriting}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg font-medium"
              >
                Sign In to Start
              </button>
            </div>
          </div>
          
          {/* Card 2: Argument & Debate Writing */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-purple-100 hover:shadow-lg transition-all">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-purple-100 p-3 rounded-full mr-3">
                  <i className="fas fa-comments text-purple-600 text-xl"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-800">Argument & Debate Writing</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Learn to craft compelling arguments and balanced discussions
              </p>
              
              <div className="mb-4 border-t border-gray-100 pt-4">
                <div className="mb-3">
                  <h4 className="font-medium text-gray-800 mb-1">Persuasive Writing</h4>
                  <p className="text-sm text-gray-600">Convince readers with strong arguments and evidence</p>
                </div>
                <div className="mb-3">
                  <h4 className="font-medium text-gray-800 mb-1">Discursive Writing</h4>
                  <p className="text-sm text-gray-600">Explore different viewpoints on complex topics</p>
                </div>
              </div>
              
              <button 
                onClick={onStartWriting}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg font-medium"
              >
                Sign In to Start
              </button>
            </div>
          </div>
          
          {/* Card 3: Essay Scorer */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-green-100 hover:shadow-lg transition-all">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-green-100 p-3 rounded-full mr-3">
                  <i className="fas fa-check-circle text-green-600 text-xl"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-800">Essay Scorer</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Get detailed feedback and scores based on NSW marking criteria
              </p>
              
              <div className="mb-4 border-t border-gray-100 pt-4">
                <div className="mb-3">
                  <h4 className="font-medium text-gray-800 mb-1">Detailed Analysis</h4>
                  <p className="text-sm text-gray-600">Comprehensive feedback on content, structure, and language</p>
                </div>
                <div className="mb-3">
                  <h4 className="font-medium text-gray-800 mb-1">NSW Criteria</h4>
                  <p className="text-sm text-gray-600">Aligned with Selective School marking standards</p>
                </div>
              </div>
              
              <button 
                onClick={onStartWriting}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium"
              >
                Sign In to Score Essays
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
