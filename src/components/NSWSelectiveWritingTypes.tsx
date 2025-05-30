import React from 'react';

interface NSWSelectiveWritingTypesProps {
  onSelectType: (type: string) => void;
}

export const NSWSelectiveWritingTypes: React.FC<NSWSelectiveWritingTypesProps> = ({ onSelectType }) => {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 mb-4">
            NSW Selective Writing Types
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Master all the text types that may appear in the NSW Selective exam with specialized guidance for each.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Narrative Writing */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Narrative Writing</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Create engaging stories with strong plots, vivid descriptions, and memorable characters.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-indigo-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span className="text-gray-700 dark:text-gray-300">Story Mountain framework</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-indigo-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span className="text-gray-700 dark:text-gray-300">Character development</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-indigo-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span className="text-gray-700 dark:text-gray-300">Descriptive techniques</span>
              </li>
            </ul>
          </div>

          {/* Persuasive Writing */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Persuasive Writing</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Master the PEEL method to construct powerful arguments that convince your readers.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-indigo-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span className="text-gray-700 dark:text-gray-300">Strong thesis statements</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-indigo-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span className="text-gray-700 dark:text-gray-300">Evidence-based arguments</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-indigo-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span className="text-gray-700 dark:text-gray-300">Persuasive techniques</span>
              </li>
            </ul>
          </div>

          {/* Informative Writing */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Informative Writing</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Explain complex topics clearly and effectively with structured information.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-indigo-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span className="text-gray-700 dark:text-gray-300">Clear explanations</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-indigo-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span className="text-gray-700 dark:text-gray-300">Logical organization</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-indigo-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span className="text-gray-700 dark:text-gray-300">Supporting examples</span>
              </li>
            </ul>
          </div>

          {/* Reflective Writing */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Reflective Writing</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Share personal experiences and insights with meaningful reflection.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-indigo-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span className="text-gray-700 dark:text-gray-300">Personal insights</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-indigo-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span className="text-gray-700 dark:text-gray-300">Critical thinking</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-indigo-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span className="text-gray-700 dark:text-gray-300">Learning outcomes</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => onSelectType('any')}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium rounded-md shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1"
          >
            Start Your Writing Journey
          </button>
        </div>
      </div>
    </section>
  );
};

export default NSWSelectiveWritingTypes;
