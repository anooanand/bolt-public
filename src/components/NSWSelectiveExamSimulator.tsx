import React from 'react';

interface NSWSelectiveExamSimulatorProps {
  onStartPractice: () => void;
}

export const NSWSelectiveExamSimulator: React.FC<NSWSelectiveExamSimulatorProps> = ({ onStartPractice }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden my-12">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full mr-4">
            <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">
            NSW Selective Exam Simulator
          </h3>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Practice under real exam conditions with our advanced simulation tool
        </p>

        <div className="space-y-6 mb-6">
          <div className="flex items-start">
            <div className="flex-shrink-0 mt-1">
              <svg className="w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h4 className="text-lg font-medium text-gray-800 dark:text-white">Authentic Experience</h4>
              <p className="text-gray-600 dark:text-gray-300">Simulates real NSW Selective exam conditions and timing</p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex-shrink-0 mt-1">
              <svg className="w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h4 className="text-lg font-medium text-gray-800 dark:text-white">Real-Time Feedback</h4>
              <p className="text-gray-600 dark:text-gray-300">Get instant feedback aligned with NSW marking criteria</p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex-shrink-0 mt-1">
              <svg className="w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h4 className="text-lg font-medium text-gray-800 dark:text-white">Progress Tracking</h4>
              <p className="text-gray-600 dark:text-gray-300">Monitor your improvement over time with detailed analytics</p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex-shrink-0 mt-1">
              <svg className="w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h4 className="text-lg font-medium text-gray-800 dark:text-white">Exam Strategies</h4>
              <p className="text-gray-600 dark:text-gray-300">Learn time management and exam techniques</p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h4 className="text-sm font-medium text-green-800 dark:text-green-300">Pro Tip:</h4>
              <p className="text-sm text-green-700 dark:text-green-400">
                Regular practice under exam conditions is proven to improve performance and reduce test anxiety.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={onStartPractice}
            className="inline-block px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1"
          >
            Start Practice Exam
          </button>
        </div>
      </div>
    </div>
  );
};

export default NSWSelectiveExamSimulator;