import React from 'react';
import { PenTool, BookOpen, Target, Sparkles, ArrowRight, CheckCircle } from 'lucide-react';

interface SimpleHomePageProps {
  onNavigate: (page: 'home' | 'write' | 'learn' | 'dashboard') => void;
  onStartWriting: () => void;
  onStartLearning: () => void;
}

export const SimpleHomePage: React.FC<SimpleHomePageProps> = ({ 
  onNavigate, 
  onStartWriting, 
  onStartLearning 
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Master Your
            <span className="text-blue-600 dark:text-blue-400"> Writing Skills</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Advanced AI-powered writing assistant designed specifically for NSW Selective School preparation. 
            Get real-time feedback, practice with authentic prompts, and improve your writing with expert guidance.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onStartWriting}
              className="flex items-center justify-center px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium"
            >
              <PenTool className="w-5 h-5 mr-2" />
              Start Writing Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
            
            <button
              onClick={onStartLearning}
              className="flex items-center justify-center px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-300 dark:hover:border-blue-500 transition-colors text-lg font-medium"
            >
              <BookOpen className="w-5 h-5 mr-2" />
              Explore Lessons
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Everything You Need to Excel
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Comprehensive tools designed for NSW Selective School writing success
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* AI Writing Coach */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              AI Writing Coach
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Get instant, personalized feedback on your writing with our advanced AI coach that understands NSW marking criteria.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Real-time grammar and style suggestions
              </li>
              <li className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Vocabulary enhancement recommendations
              </li>
              <li className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Structure and flow analysis
              </li>
            </ul>
          </div>

          {/* Exam Preparation */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Exam Preparation
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Practice with authentic NSW Selective exam prompts and conditions to build confidence and skills.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Timed writing practice sessions
              </li>
              <li className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Authentic exam prompts and scenarios
              </li>
              <li className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Performance tracking and analytics
              </li>
            </ul>
          </div>

          {/* Learning Resources */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Learning Resources
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Comprehensive curriculum with lessons, examples, and practice exercises tailored for NSW students.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                24-day structured learning program
              </li>
              <li className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Interactive exercises and activities
              </li>
              <li className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Progress tracking and achievements
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-blue-600 dark:bg-blue-700 rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Improve Your Writing?
          </h2>
          <p className="text-blue-100 mb-6 text-lg">
            Join thousands of students who have improved their writing skills with our AI-powered platform.
          </p>
          <button
            onClick={onStartWriting}
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-50 transition-colors text-lg font-medium"
          >
            <PenTool className="w-5 h-5 mr-2" />
            Get Started Today
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

