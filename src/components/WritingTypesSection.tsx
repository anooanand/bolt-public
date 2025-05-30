import React from 'react';

interface WritingTypeCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  locked?: boolean;
  onSelect: () => void;
}

const WritingTypeCard: React.FC<WritingTypeCardProps> = ({ title, description, icon, locked = false, onSelect }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-4">
      <div className="flex items-start mb-2">
        <div className="mr-3 text-indigo-600 dark:text-indigo-400">
          {icon}
        </div>
        <h3 className="text-lg font-medium text-gray-800 dark:text-white flex items-center">
          {title}
          {locked && (
            <svg className="ml-2 w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
          )}
        </h3>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{description}</p>
      <button
        onClick={onSelect}
        className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
      >
        Sign In to Start
      </button>
    </div>
  );
};

interface WritingTypesSectionProps {
  onSelectType: (type: string) => void;
}

export const WritingTypesSection: React.FC<WritingTypesSectionProps> = ({ onSelectType }) => {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 mb-4">
            Writing Types for NSW Selective Exam
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Choose from our comprehensive range of writing styles with AI-powered guidance
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Storytelling & Creative Writing */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-full mr-4">
                  <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                  Storytelling & Creative Writing
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Master the art of creative storytelling and narrative techniques
              </p>

              <div className="space-y-4">
                <WritingTypeCard
                  title="Narrative Writing"
                  description="Write engaging stories with compelling plots and characters"
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  }
                  onSelect={() => onSelectType('narrative')}
                />

                <WritingTypeCard
                  title="Imaginative Writing"
                  description="Create fantastical stories and unique worlds"
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  }
                  onSelect={() => onSelectType('imaginative')}
                />

                <WritingTypeCard
                  title="Recount Writing"
                  description="Share personal or historical experiences effectively"
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  }
                  onSelect={() => onSelectType('recount')}
                />
              </div>
            </div>
          </div>

          {/* Argument & Debate Writing */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full mr-4">
                  <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                  Argument & Debate Writing
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Learn to craft compelling arguments and balanced discussions
              </p>

              <div className="space-y-4">
                <WritingTypeCard
                  title="Persuasive Writing"
                  description="Convince readers with strong arguments and evidence"
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  }
                  onSelect={() => onSelectType('persuasive')}
                />

                <WritingTypeCard
                  title="Discursive Writing"
                  description="Explore different viewpoints on complex topics"
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  }
                  onSelect={() => onSelectType('discursive')}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Informative & Reflective Writing */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full mr-4">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                  Informative & Reflective Writing
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Develop clear explanations and thoughtful reflections
              </p>

              <div className="space-y-4">
                <WritingTypeCard
                  title="Expository Writing"
                  description="Explain concepts clearly and factually"
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  }
                  onSelect={() => onSelectType('expository')}
                />

                <WritingTypeCard
                  title="Reflective Writing"
                  description="Share personal insights and learning experiences"
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  }
                  onSelect={() => onSelectType('reflective')}
                />
              </div>
            </div>
          </div>

          {/* Descriptive & Expressive Writing */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-full mr-4">
                  <svg className="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                  Descriptive & Expressive Writing
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Paint vivid pictures with words and express emotions
              </p>

              <div className="space-y-4">
                <WritingTypeCard
                  title="Descriptive Writing"
                  description="Create vivid imagery using sensory details"
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                  }
                  onSelect={() => onSelectType('descriptive')}
                />

                <WritingTypeCard
                  title="Diary Entry Writing"
                  description="Express personal thoughts and feelings effectively"
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  }
                  onSelect={() => onSelectType('diary')}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            All essay types are aligned with NSW Selective exam requirements
          </p>
          <button
            onClick={() => onSelectType('any')}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium rounded-md shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1"
          >
            Sign In to Start Writing
          </button>
        </div>
      </div>
    </section>
  );
};

export default WritingTypesSection;
