import React, { useState } from 'react';
import { X, Search, BookOpen, MessageSquare, FileText, ExternalLink } from 'lucide-react';

interface HelpCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HelpCenter({ isOpen, onClose }: HelpCenterProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('getting-started');

  if (!isOpen) return null;

  const categories = [
    { id: 'getting-started', name: 'Getting Started', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'writing-tips', name: 'Writing Tips', icon: <FileText className="w-5 h-5" /> },
    { id: 'faq', name: 'FAQ', icon: <MessageSquare className="w-5 h-5" /> },
    { id: 'resources', name: 'Resources', icon: <ExternalLink className="w-5 h-5" /> }
  ];

  const helpContent = {
    'getting-started': [
      {
        title: 'Welcome to InstaChat AI Writing Mate',
        content: 'InstaChat AI Writing Mate is designed to help students prepare for NSW Selective School exams by providing AI-powered writing assistance, feedback, and practice opportunities.'
      },
      {
        title: 'Choosing a Writing Type',
        content: 'Select a writing type from the dropdown menu to begin. We support narrative, persuasive, expository, reflective, descriptive, and more text types commonly found in NSW Selective exams.'
      },
      {
        title: 'Using the Writing Coach',
        content: 'As you write, the AI coach will provide real-time feedback and suggestions to improve your writing. You can also ask specific questions about your writing.'
      },
      {
        title: 'Saving Your Work',
        content: 'Your work is automatically saved as you write. You can also manually save by clicking the "Save" button in the toolbar.'
      }
    ],
    'writing-tips': [
      {
        title: 'Planning Your Writing',
        content: 'Spend 5 minutes planning before you start writing. Use the Planning Tool to organize your ideas and create a clear structure.'
      },
      {
        title: 'Narrative Writing Tips',
        content: 'Include a clear beginning, middle, and end. Develop interesting characters, use descriptive language, and create an engaging plot with conflict and resolution.'
      },
      {
        title: 'Persuasive Writing Tips',
        content: 'State your position clearly, provide strong arguments with evidence, address counterarguments, and end with a compelling conclusion that restates your position.'
      },
      {
        title: 'Improving Vocabulary',
        content: 'Use specific and varied vocabulary. Replace common words like "good," "bad," and "said" with more precise alternatives.'
      }
    ],
    'faq': [
      {
        title: 'Does the AI write essays for me?',
        content: 'No, the AI never writes essays for you. It provides guidance, feedback, and suggestions to help you improve your own writing skills.'
      },
      {
        title: 'How does the AI feedback work?',
        content: 'The AI analyzes your writing for structure, content, language, and mechanics, then provides specific suggestions for improvement based on NSW Selective exam criteria.'
      },
      {
        title: 'Can I use this for school assignments?',
        content: 'Yes, but always check with your teacher first. The platform is designed to help you learn and improve your writing skills, not to do your homework for you.'
      },
      {
        title: 'How do I get the most out of the platform?',
        content: 'Practice regularly, use the feedback to revise your writing, try different text types, and challenge yourself with timed practice sessions.'
      }
    ],
    'resources': [
      {
        title: 'NSW Selective Schools Information',
        content: 'Visit the official NSW Department of Education website for information about Selective Schools and the application process.'
      },
      {
        title: 'Sample Test Papers',
        content: 'Practice with past papers and sample tests to prepare for the exam format and timing.'
      },
      {
        title: 'Writing Guides',
        content: 'Explore our comprehensive guides for each writing type, with examples, templates, and tips.'
      },
      {
        title: 'Video Tutorials',
        content: 'Watch our tutorial videos to learn how to use all the features of the platform effectively.'
      }
    ]
  };

  const filteredContent = searchQuery
    ? Object.values(helpContent)
        .flat()
        .filter(item => 
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
          item.content.toLowerCase().includes(searchQuery.toLowerCase())
        )
    : helpContent[activeCategory as keyof typeof helpContent] || [];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        
        <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex justify-between items-start">
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white" id="modal-title">
                Help Center
              </h3>
              <button
                onClick={onClose}
                className="bg-white dark:bg-gray-800 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="sr-only">Close</span>
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="mt-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Search for help..."
                />
              </div>
            </div>
            
            {!searchQuery && (
              <div className="mt-4 border-b border-gray-200 dark:border-gray-700">
                <nav className="-mb-px flex space-x-8">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`
                        whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center
                        ${activeCategory === category.id
                          ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
                        }
                      `}
                    >
                      <span className="mr-2">{category.icon}</span>
                      {category.name}
                    </button>
                  ))}
                </nav>
              </div>
            )}
            
            <div className="mt-4 max-h-96 overflow-y-auto">
              <div className="space-y-4">
                {searchQuery && <p className="text-sm text-gray-500 dark:text-gray-400">Search results for "{searchQuery}"</p>}
                
                {filteredContent.map((item, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">{item.title}</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{item.content}</p>
                  </div>
                ))}
                
                {filteredContent.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-500 dark:text-gray-400">No results found. Try a different search term.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6">
            <div className="text-center text-sm text-gray-500 dark:text-gray-400">
              <p>Need more help? <a href="#" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500">Contact our support team</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}