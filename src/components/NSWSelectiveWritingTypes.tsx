import React from 'react';

interface NSWSelectiveWritingTypesProps {
  onSelectType: (type: string) => void;
}

export const NSWSelectiveWritingTypes: React.FC<NSWSelectiveWritingTypesProps> = ({ onSelectType }) => {
  const textTypes = [
    {
      name: 'Advertisement',
      description: 'Create compelling advertisements that persuade and inform audiences about products, services, or events.',
      features: ['Catchy headlines', 'Persuasive language', 'Target audience focus', 'Call to action']
    },
    {
      name: 'Advice Sheet',
      description: 'Provide clear, helpful guidance on specific topics with practical tips and recommendations.',
      features: ['Clear instructions', 'Logical organization', 'Helpful tone', 'Practical examples']
    },
    {
      name: 'Diary Entry',
      description: 'Express personal thoughts, feelings, and experiences in a reflective, intimate writing style.',
      features: ['Personal voice', 'Emotional expression', 'Chronological structure', 'Reflective insights']
    },
    {
      name: 'Discussion',
      description: 'Present balanced arguments on important issues, exploring multiple perspectives fairly.',
      features: ['Multiple viewpoints', 'Balanced analysis', 'Evidence-based arguments', 'Logical structure']
    },
    {
      name: 'Guide',
      description: 'Create step-by-step instructions or comprehensive information on specific topics.',
      features: ['Sequential steps', 'Clear explanations', 'Helpful tips', 'User-friendly format']
    },
    {
      name: 'Letter',
      description: 'Communicate effectively through formal or informal correspondence for various purposes.',
      features: ['Appropriate format', 'Clear purpose', 'Suitable tone', 'Proper conventions']
    },
    {
      name: 'Narrative/Creative',
      description: 'Create engaging stories with strong plots, vivid descriptions, and memorable characters.',
      features: ['Story structure', 'Character development', 'Descriptive language', 'Creative elements']
    },
    {
      name: 'News Report',
      description: 'Report factual information about current events in an objective, informative style.',
      features: ['Factual accuracy', 'Objective tone', 'Lead paragraph', 'Who, what, when, where, why']
    },
    {
      name: 'Persuasive',
      description: 'Convince readers of your viewpoint using strong arguments, evidence, and persuasive techniques.',
      features: ['Strong thesis', 'Supporting evidence', 'Persuasive techniques', 'Logical reasoning']
    },
    {
      name: 'Review',
      description: 'Evaluate and critique books, movies, products, or experiences with informed opinions.',
      features: ['Critical analysis', 'Personal opinion', 'Supporting details', 'Recommendation']
    },
    {
      name: 'Speech',
      description: 'Prepare engaging oral presentations that connect with audiences and deliver clear messages.',
      features: ['Audience engagement', 'Clear structure', 'Rhetorical devices', 'Strong conclusion']
    }
  ];

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 mb-4">
            NSW Selective Writing Types
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Master all 11 text types that may appear in the NSW Selective High School Placement Test with specialized guidance for each.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {textTypes.map((textType, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">{textType.name}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                {textType.description}
              </p>
              <ul className="space-y-2 mb-6">
                {textType.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <svg className="w-4 h-4 text-indigo-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => onSelectType(textType.name.toLowerCase().replace('/', '_'))}
                className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium rounded-md shadow-sm transition duration-300 ease-in-out transform hover:-translate-y-1 text-sm"
              >
                Practice {textType.name}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => onSelectType('any')}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium rounded-md shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1"
          >
            Start Your Writing Journey
          </button>
        </div>
      </div>
    </section>
  );
};

export default NSWSelectiveWritingTypes;
