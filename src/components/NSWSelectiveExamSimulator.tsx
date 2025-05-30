import React from 'react';
import { CheckCircle, Clock, Target, Brain, Info } from 'lucide-react';

interface NSWSelectiveExamSimulatorProps {
  onStartPractice: () => void;
}

export const NSWSelectiveExamSimulator: React.FC<NSWSelectiveExamSimulatorProps> = ({ onStartPractice }) => {
  return (
    <section className="py-24 relative overflow-hidden simulator-section">
      <div className="absolute inset-0 bg-grid opacity-30"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center glass-card rounded-full px-6 py-2 mb-6 shadow-lg hover-lift">
            <Target className="w-5 h-5 text-white mr-2" />
            <span className="text-sm font-medium text-white">
              Exam Preparation
            </span>
          </div>
          
          <h2 className="text-4xl font-bold mb-4 text-white">
            NSW Selective Exam Simulator
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Practice under real exam conditions with our advanced simulation tool
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="glass-card rounded-2xl p-8 hover-lift card-shine">
            <div className="flex items-center mb-6">
              <div className="bg-indigo-100 dark:bg-indigo-900/30 p-4 rounded-xl mr-4">
                <Clock className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Authentic Experience
              </h3>
            </div>
            
            <div className="space-y-4">
              <div className="glass-card bg-white/50 dark:bg-gray-800/50 p-4 rounded-xl">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Timed Writing</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  30-minute writing sessions matching actual exam conditions
                </p>
              </div>
              
              <div className="glass-card bg-white/50 dark:bg-gray-800/50 p-4 rounded-xl">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Real Prompts</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Practice with prompts based on previous NSW Selective exams
                </p>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-8 hover-lift card-shine">
            <div className="flex items-center mb-6">
              <div className="bg-purple-100 dark:bg-purple-900/30 p-4 rounded-xl mr-4">
                <Brain className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Smart Feedback
              </h3>
            </div>
            
            <div className="space-y-4">
              <div className="glass-card bg-white/50 dark:bg-gray-800/50 p-4 rounded-xl">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">AI Analysis</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Get instant feedback aligned with NSW marking criteria
                </p>
              </div>
              
              <div className="glass-card bg-white/50 dark:bg-gray-800/50 p-4 rounded-xl">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Progress Tracking</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Monitor your improvement with detailed analytics
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-8 max-w-3xl mx-auto mb-12">
          <div className="flex items-center mb-6">
            <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-xl mr-4">
              <Info className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Pro Tips</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Maximize your exam preparation with these strategies
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="glass-card bg-white/50 dark:bg-gray-800/50 p-4 rounded-xl">
              <div className="flex items-center mb-2">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                <h4 className="font-medium text-gray-900 dark:text-white">Time Management</h4>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Practice allocating time for planning, writing, and reviewing
              </p>
            </div>
            
            <div className="glass-card bg-white/50 dark:bg-gray-800/50 p-4 rounded-xl">
              <div className="flex items-center mb-2">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                <h4 className="font-medium text-gray-900 dark:text-white">Regular Practice</h4>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Complete at least one practice exam per week
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={onStartPractice}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-medium hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          >
            <Clock className="w-5 h-5 mr-2" />
            Start Practice Exam
          </button>
        </div>
      </div>
    </section>
  );
};

export default NSWSelectiveExamSimulator;