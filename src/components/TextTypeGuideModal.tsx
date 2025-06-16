import React, { useState } from 'react';
import { X } from 'lucide-react';

interface TextTypeGuideModalProps {
  onClose: () => void;
}

export function TextTypeGuideModal({ onClose }: TextTypeGuideModalProps) {
  const [selectedType, setSelectedType] = useState<string>('narrative');

  const textTypes = {
    narrative: {
      title: 'Narrative Writing',
      description: 'A narrative tells a story with characters, plot, and setting.',
      structure: [
        { heading: 'Orientation', content: 'Introduce characters, setting, and establish the situation' },
        { heading: 'Complication', content: 'Present a problem or conflict that drives the story' },
        { heading: 'Rising Action', content: 'Show how the problem develops and intensifies' },
        { heading: 'Climax', content: 'The turning point where the conflict reaches its peak' },
        { heading: 'Resolution', content: 'Show how the problem is resolved and what changes' }
      ],
      keyFeatures: [
        'Strong characters with clear motivations',
        'Vivid setting descriptions',
        'Clear plot development',
        'Engaging dialogue',
        'Descriptive language and imagery',
        'Show, don\'t tell emotions and reactions'
      ],
      examples: [
        'The old clock on the wall had stopped ticking exactly at midnight...',
        'Sarah\'s heart raced as she reached for the mysterious envelope...',
        'The ancient door creaked open, revealing a room untouched for decades...'
      ]
    },
    persuasive: {
      title: 'Persuasive Writing',
      description: 'Persuasive writing aims to convince the reader of a particular viewpoint.',
      structure: [
        { heading: 'Introduction', content: 'State your position clearly and preview main arguments' },
        { heading: 'Body Paragraph 1', content: 'Present your strongest argument with evidence' },
        { heading: 'Body Paragraph 2', content: 'Present your second argument with evidence' },
        { heading: 'Body Paragraph 3', content: 'Present your third argument with evidence' },
        { heading: 'Counter-arguments', content: 'Address opposing viewpoints' },
        { heading: 'Conclusion', content: 'Restate position and summarize main points' }
      ],
      keyFeatures: [
        'Clear position statement',
        'Logical arguments with evidence',
        'Persuasive language devices',
        'Addressing counter-arguments',
        'Strong concluding statement',
        'Formal tone and language'
      ],
      examples: [
        'School uniforms should be abolished because...',
        'Homework plays a vital role in education by...',
        'The benefits of regular exercise far outweigh...'
      ]
    },
    expository: {
      title: 'Expository Writing',
      description: 'Expository writing explains or informs about a topic clearly and accurately.',
      structure: [
        { heading: 'Introduction', content: 'Define topic and state main points to be covered' },
        { heading: 'Background', content: 'Provide context and essential information' },
        { heading: 'Main Point 1', content: 'Explain first main aspect with examples' },
        { heading: 'Main Point 2', content: 'Explain second main aspect with examples' },
        { heading: 'Main Point 3', content: 'Explain third main aspect with examples' },
        { heading: 'Conclusion', content: 'Summarize main points and reinforce importance' }
      ],
      keyFeatures: [
        'Clear explanations',
        'Factual information',
        'Logical organization',
        'Technical vocabulary',
        'Objective tone',
        'Examples and illustrations'
      ],
      examples: [
        'The water cycle consists of four main stages...',
        'Renewable energy sources include solar, wind...',
        'The human digestive system works through...'
      ]
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        
        <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              onClick={onClose}
              className="bg-white dark:bg-gray-800 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="sr-only">Close</span>
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white" id="modal-title">
                  NSW Selective Writing Guide
                </h3>
                
                <div className="mt-4 border-b border-gray-200 dark:border-gray-700">
                  <nav className="-mb-px flex space-x-8">
                    {Object.keys(textTypes).map((type) => (
                      <button
                        key={type}
                        onClick={() => setSelectedType(type)}
                        className={`
                          whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                          ${selectedType === type
                            ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
                          }
                        `}
                      >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </button>
                    ))}
                  </nav>
                </div>

                <div className="mt-4">
                  <div className="prose dark:prose-invert max-w-none">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {textTypes[selectedType as keyof typeof textTypes].title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      {textTypes[selectedType as keyof typeof textTypes].description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Structure</h3>
                        <div className="space-y-3">
                          {textTypes[selectedType as keyof typeof textTypes].structure.map((section, index) => (
                            <div key={index} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                              <h4 className="font-medium text-gray-800 dark:text-gray-200">{section.heading}</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-300">{section.content}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Key Features</h3>
                        <ul className="space-y-2">
                          {textTypes[selectedType as keyof typeof textTypes].keyFeatures.map((feature, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-green-500 dark:text-green-400 mr-2">•</span>
                              <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                            </li>
                          ))}
                        </ul>

                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mt-6 mb-3">Example Openings</h3>
                        <div className="space-y-2">
                          {textTypes[selectedType as keyof typeof textTypes].examples.map((example, index) => (
                            <div key={index} className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-md">
                              <p className="text-blue-800 dark:text-blue-300 italic">"{example}"</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}