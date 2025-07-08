import React from 'react';
import { CheckCircle, Clock, Target, Brain, Info } from 'lucide-react';

interface NSWSelectiveExamSimulatorProps {
  onStartPractice: () => void;
}

export const NSWSelectiveExamSimulator: React.FC<NSWSelectiveExamSimulatorProps> = ({ onStartPractice }) => {
  return (
    <section className="py-12 relative overflow-hidden bg-gradient-to-b from-white to-indigo-50/30 dark:from-gray-900 dark:to-gray-800">
      <div className="absolute inset-0 bg-grid opacity-30"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-8">
          <div className="inline-flex items-center glass-card rounded-full px-6 py-2 mb-4 shadow-lg hover-lift">
            <Target className="w-5 h-5 text-indigo-500 mr-2" />
            <span className="text-sm font-medium gradient-text">
              Exam Preparation
            </span>
          </div>
          
          <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
            NSW Selective Exam Simulator
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Practice under real exam conditions with our advanced simulation tool
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="glass-card rounded-xl p-6 hover-lift card-shine">
            <div className="flex items-center mb-4">
              <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-lg mr-3">
                <Clock className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Timed Writing
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              30-minute writing sessions matching actual exam conditions with real prompts based on previous exams
            </p>
          </div>

          <div className="glass-card rounded-xl p-6 hover-lift card-shine">
            <div className="flex items-center mb-4">
              <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg mr-3">
                <Brain className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Smart Feedback
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Get instant AI-powered feedback aligned with NSW marking criteria and detailed performance analytics
            </p>
          </div>

          <div className="glass-card rounded-xl p-6 hover-lift card-shine">
            <div className="flex items-center mb-4">
              <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg mr-3">
                <Info className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Pro Tips
              </h3>
            </div>
            <div className="space-y-2">
              <div className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 shrink-0" />
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Practice time management for planning, writing, and reviewing
                </p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 shrink-0" />
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Complete regular practice exams for consistent improvement
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={onStartPractice}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-medium hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
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