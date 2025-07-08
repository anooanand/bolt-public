import React from 'react';

interface PracticeTipsProps {}

export const PracticeTips: React.FC<PracticeTipsProps> = () => {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Practice Tips
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Follow these tips to make the most of your practice sessions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Time Management */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 shadow-md">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-full">
                <svg className="w-8 h-8 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-center text-gray-800 dark:text-white mb-2">
              Time Management
            </h3>
            <p className="text-center text-gray-600 dark:text-gray-300">
              Practice with the timer to improve your speed
            </p>
          </div>

          {/* Regular Practice */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 shadow-md">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-full">
                <svg className="w-8 h-8 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-center text-gray-800 dark:text-white mb-2">
              Regular Practice
            </h3>
            <p className="text-center text-gray-600 dark:text-gray-300">
              Set a consistent practice schedule
            </p>
          </div>

          {/* Self-Review */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 shadow-md">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-full">
                <svg className="w-8 h-8 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-center text-gray-800 dark:text-white mb-2">
              Self-Review
            </h3>
            <p className="text-center text-gray-600 dark:text-gray-300">
              Review your work after each session
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PracticeTips;
