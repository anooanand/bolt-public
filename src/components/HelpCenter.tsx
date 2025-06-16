import React, { useState } from 'react';
import { X, Search, BookOpen, HelpCircle, Mail, ChevronRight } from 'lucide-react';

interface HelpCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HelpCenter({ isOpen, onClose }: HelpCenterProps) {
  const [activeTab, setActiveTab] = useState<'guides' | 'faq' | 'contact'>('guides');
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const guides = [
    {
      title: 'Getting Started with Writing Assistant',
      description: 'Learn the basics of using the platform',
      category: 'beginner'
    },
    {
      title: 'Understanding NSW Selective Exam Requirements',
      description: 'Key information about the writing section',
      category: 'exam'
    },
    {
      title: 'Narrative Writing Guide',
      description: 'How to craft engaging stories',
      category: 'writing'
    },
    {
      title: 'Persuasive Writing Techniques',
      description: 'Convince your reader effectively',
      category: 'writing'
    },
    {
      title: 'Using AI Feedback Effectively',
      description: 'How to interpret and apply suggestions',
      category: 'advanced'
    },
    {
      title: 'Exam Simulation Mode',
      description: 'Practice under realistic conditions',
      category: 'exam'
    }
  ];

  const faqs = [
    {
      question: 'How does the AI writing coach work?',
      answer: 'Our AI writing coach analyzes your writing in real-time, providing feedback on structure, vocabulary, grammar, and style. It\'s designed specifically for NSW Selective School exam preparation, focusing on the criteria that matter most in these assessments.'
    },
    {
      question: 'Will the AI write essays for me?',
      answer: 'No, our AI never writes essays for you. It provides guidance, suggestions, and feedback to help you improve your own writing skills. This approach ensures you develop the skills needed for exam success and beyond.'
    },
    {
      question: 'How accurate is the AI feedback?',
      answer: 'Our AI feedback is calibrated to NSW Selective School marking criteria and has been trained on thousands of student essays. While no AI is perfect, our system provides highly relevant guidance that aligns with what examiners look for.'
    },
    {
      question: 'Can I use this for school assignments?',
      answer: 'Yes! While our platform is optimized for NSW Selective School exam preparation, the writing skills you\'ll develop are valuable for all academic writing. Just be sure to follow your school's guidelines regarding the use of AI tools.'
    },
    {
      question: 'How do I cancel my subscription?',
      answer: 'You can cancel your subscription at any time from your account settings. Your access will continue until the end of your current billing period.'
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
              type="button"
              className="bg-white dark:bg-gray-800 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={onClose}
            >
              <span className="sr-only">Close</span>
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white" id="modal-title">
                  Help Center
                </h3>
                
                <div className="mt-4">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900 dark:text-white"
                      placeholder="Search for help..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="mt-4 border-b border-gray-200 dark:border-gray-700">
                  <nav className="-mb-px flex space-x-8">
                    <button
                      className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === 'guides'
                          ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                      }`}
                      onClick={() => setActiveTab('guides')}
                    >
                      <BookOpen className="inline-block h-4 w-4 mr-2" />
                      Guides
                    </button>
                    <button
                      className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === 'faq'
                          ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                      }`}
                      onClick={() => setActiveTab('faq')}
                    >
                      <HelpCircle className="inline-block h-4 w-4 mr-2" />
                      FAQ
                    </button>
                    <button
                      className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === 'contact'
                          ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                      }`}
                      onClick={() => setActiveTab('contact')}
                    >
                      <Mail className="inline-block h-4 w-4 mr-2" />
                      Contact Support
                    </button>
                  </nav>
                </div>
                
                <div className="mt-4 max-h-96 overflow-y-auto">
                  {activeTab === 'guides' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {filteredGuides.length > 0 ? (
                        filteredGuides.map((guide, index) => (
                          <div 
                            key={index} 
                            className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="text-sm font-medium text-gray-900 dark:text-white">{guide.title}</h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{guide.description}</p>
                              </div>
                              <ChevronRight className="h-4 w-4 text-gray-400" />
                            </div>
                            <div className="mt-2">
                              <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                guide.category === 'beginner' 
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                                  : guide.category === 'writing'
                                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                                  : guide.category === 'exam'
                                  ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
                                  : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                              }`}>
                                {guide.category.charAt(0).toUpperCase() + guide.category.slice(1)}
                              </span>
                            </div>
                          </div>
                        ))
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
                          <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                            <div className="p-4 bg-gray-50 dark:bg-gray-700">
                              <h4 className="text-sm font-medium text-gray-900 dark:text-white">{faq.question}</h4>
                            </div>
                            <div className="p-4 bg-white dark:bg-gray-800">
                              <p className="text-sm text-gray-600 dark:text-gray-300">{faq.answer}</p>
                            </div>
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
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                        Need help with something specific? Send us a message and we'll get back to you as soon as possible.
                      </p>
                      <form className="space-y-4">
                        <div>
                          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Subject
                          </label>
                          <select
                            id="subject"
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          >
                            <option>Technical Issue</option>
                            <option>Billing Question</option>
                            <option>Feature Request</option>
                            <option>Account Help</option>
                            <option>Other</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Message
                          </label>
                          <textarea
                            id="message"
                            rows={4}
                            className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            placeholder="Describe your issue or question..."
                          ></textarea>
                        </div>
                        <div className="flex justify-end">
                          <button
                            type="submit"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
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