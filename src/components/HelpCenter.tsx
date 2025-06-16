import React, { useState } from 'react';
import { X, Search, BookOpen, Lightbulb, MessageSquare, FileText, ExternalLink } from 'lucide-react';

interface HelpCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HelpCenter({ isOpen, onClose }: HelpCenterProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'guides' | 'faq' | 'contact'>('guides');

  if (!isOpen) return null;

  const guides = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      description: 'Learn the basics of using the writing assistant',
      icon: BookOpen
    },
    {
      id: 'writing-types',
      title: 'Writing Types Guide',
      description: 'Understand different writing types and their requirements',
      icon: FileText
    },
    {
      id: 'ai-features',
      title: 'AI Features Explained',
      description: 'How to get the most out of AI assistance',
      icon: Lightbulb
    },
    {
      id: 'exam-prep',
      title: 'Exam Preparation',
      description: 'Tips for NSW Selective exam preparation',
      icon: FileText
    }
  ];

  const faqs = [
    {
      question: 'How do I get started with a new document?',
      answer: 'Select a writing type from the dropdown menu, then either generate a prompt or enter your own. Once you have a prompt, you can start writing in the main text area.'
    },
    {
      question: 'What is the difference between assistance levels?',
      answer: 'Detailed assistance provides comprehensive guidance and suggestions. Moderate guidance offers balanced support, while minimal support provides only essential feedback, allowing more independence.'
    },
    {
      question: 'How does the paraphrase tool work?',
      answer: 'Select text in your writing area to activate the paraphrase tool. Choose a paraphrasing style, then click "Paraphrase" to generate alternative ways to express your selected text.'
    },
    {
      question: 'Can I save my work?',
      answer: 'Yes, your work is automatically saved as you write. You can also manually save by clicking the "Save" button in the writing interface.'
    },
    {
      question: 'How do I get feedback on my writing?',
      answer: 'The AI coach provides real-time feedback as you write. For comprehensive feedback, click "Submit Essay" when you\'re finished to receive a detailed evaluation.'
    }
  ];

  const filteredGuides = searchQuery
    ? guides.filter(guide => 
        guide.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        guide.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : guides;

  const filteredFaqs = searchQuery
    ? faqs.filter(faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqs;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              onClick={onClose}
              className="bg-white dark:bg-transparent rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="sr-only">Close</span>
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white" id="modal-title">
                  Help Center
                </h3>
                
                <div className="mt-4 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Search for help..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="mt-4 border-b border-gray-200 dark:border-gray-700">
                  <nav className="-mb-px flex space-x-8">
                    <button
                      onClick={() => setActiveTab('guides')}
                      className={`
                        whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                        ${activeTab === 'guides'
                          ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                        }
                      `}
                    >
                      Guides
                    </button>
                    <button
                      onClick={() => setActiveTab('faq')}
                      className={`
                        whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                        ${activeTab === 'faq'
                          ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                        }
                      `}
                    >
                      FAQ
                    </button>
                    <button
                      onClick={() => setActiveTab('contact')}
                      className={`
                        whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                        ${activeTab === 'contact'
                          ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                        }
                      `}
                    >
                      Contact Support
                    </button>
                  </nav>
                </div>

                <div className="mt-4">
                  {activeTab === 'guides' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {filteredGuides.length > 0 ? (
                        filteredGuides.map((guide) => {
                          const Icon = guide.icon;
                          return (
                            <div key={guide.id} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer">
                              <div className="flex items-start">
                                <div className="flex-shrink-0">
                                  <div className="h-10 w-10 rounded-md bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                                    <Icon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                                  </div>
                                </div>
                                <div className="ml-4">
                                  <h4 className="text-lg font-medium text-gray-900 dark:text-white">{guide.title}</h4>
                                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{guide.description}</p>
                                  <div className="mt-2">
                                    <a href="#" className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 flex items-center">
                                      Read guide
                                      <ExternalLink className="ml-1 h-4 w-4" />
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div className="col-span-2 text-center py-8">
                          <p className="text-gray-500 dark:text-gray-400">No guides found matching your search.</p>
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === 'faq' && (
                    <div className="space-y-4">
                      {filteredFaqs.length > 0 ? (
                        filteredFaqs.map((faq, index) => (
                          <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                            <h4 className="text-md font-medium text-gray-900 dark:text-white">{faq.question}</h4>
                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{faq.answer}</p>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-gray-500 dark:text-gray-400">No FAQs found matching your search.</p>
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === 'contact' && (
                    <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                      <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Contact Support</h4>
                      <form className="space-y-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Your Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            className="block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-600 dark:text-white"
                            placeholder="Enter your name"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Email Address
                          </label>
                          <input
                            type="email"
                            id="email"
                            className="block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-600 dark:text-white"
                            placeholder="Enter your email"
                          />
                        </div>
                        <div>
                          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Subject
                          </label>
                          <input
                            type="text"
                            id="subject"
                            className="block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-600 dark:text-white"
                            placeholder="What is your question about?"
                          />
                        </div>
                        <div>
                          <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Message
                          </label>
                          <textarea
                            id="message"
                            rows={4}
                            className="block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-600 dark:text-white"
                            placeholder="Describe your issue or question in detail"
                          />
                        </div>
                        <div className="flex justify-end">
                          <button
                            type="submit"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Send Message
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
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