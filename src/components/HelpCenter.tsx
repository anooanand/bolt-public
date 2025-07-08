import React, { useState } from 'react';
import { X, Search, BookOpen, MessageCircle, FileText, HelpCircle, ExternalLink } from 'lucide-react';

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
      title: 'Getting Started with Writing Assistant',
      description: 'Learn the basics of using the platform',
      icon: <BookOpen className="w-5 h-5 text-blue-500" />,
      category: 'beginner'
    },
    {
      title: 'Understanding NSW Selective Exam Criteria',
      description: 'Learn what examiners look for in your writing',
      icon: <FileText className="w-5 h-5 text-green-500" />,
      category: 'exam'
    },
    {
      title: 'Using AI Feedback Effectively',
      description: 'How to interpret and apply AI suggestions',
      icon: <MessageCircle className="w-5 h-5 text-purple-500" />,
      category: 'advanced'
    },
    {
      title: 'Narrative Writing Techniques',
      description: 'Master storytelling for the exam',
      icon: <FileText className="w-5 h-5 text-orange-500" />,
      category: 'writing'
    },
    {
      title: 'Persuasive Writing Strategies',
      description: 'Convince your reader with strong arguments',
      icon: <FileText className="w-5 h-5 text-red-500" />,
      category: 'writing'
    }
  ];

  const faqs = [
    {
      question: 'How does the AI feedback work?',
      answer: 'Our AI analyzes your writing based on NSW Selective School criteria and provides specific suggestions to improve your content, structure, and language. It highlights strengths and areas for improvement, offering actionable advice tailored to your writing level.'
    },
    {
      question: 'Will the AI write essays for me?',
      answer: 'No, our AI is designed to help you improve your own writing skills, not to write content for you. It provides guidance, feedback, and suggestions, but the writing must be your own work to develop the skills needed for the exam.'
    },
    {
      question: 'How often should I practice writing?',
      answer: 'For optimal results, we recommend practicing 2-3 times per week. Consistent practice with focused feedback is more effective than cramming. Our learning plan is designed to help you build skills progressively over time.'
    },
    {
      question: 'Can I use this for school assignments?',
      answer: 'Yes, the skills you develop using our platform will help with all your writing tasks. However, always check with your teacher about using AI assistance for school assignments, as policies may vary.'
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
    <div className="fixed inset-0 z-50 overflow-hidden bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Help Center</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        {/* Search */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 dark:text-white sm:text-sm"
              placeholder="Search for help topics..."
            />
          </div>
        </div>
        
        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab('guides')}
            className={`flex-1 py-3 px-4 text-sm font-medium ${
              activeTab === 'guides'
                ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            <BookOpen className="inline-block h-4 w-4 mr-2" />
            Guides
          </button>
          <button
            onClick={() => setActiveTab('faq')}
            className={`flex-1 py-3 px-4 text-sm font-medium ${
              activeTab === 'faq'
                ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            <HelpCircle className="inline-block h-4 w-4 mr-2" />
            FAQ
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={`flex-1 py-3 px-4 text-sm font-medium ${
              activeTab === 'contact'
                ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            <MessageCircle className="inline-block h-4 w-4 mr-2" />
            Contact Support
          </button>
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === 'guides' && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Help Guides</h3>
              
              {filteredGuides.length === 0 ? (
                <div className="text-center py-8">
                  <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-500 dark:text-gray-400">No guides found matching "{searchQuery}"</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredGuides.map((guide, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                    >
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          {guide.icon}
                        </div>
                        <div className="ml-3">
                          <h4 className="text-base font-medium text-gray-900 dark:text-white">
                            {guide.title}
                          </h4>
                          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            {guide.description}
                          </p>
                          <div className="mt-2">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              guide.category === 'beginner' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                              guide.category === 'exam' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
                              guide.category === 'advanced' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300' :
                              'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300'
                            }`}>
                              {guide.category.charAt(0).toUpperCase() + guide.category.slice(1)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'faq' && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Frequently Asked Questions</h3>
              
              {filteredFaqs.length === 0 ? (
                <div className="text-center py-8">
                  <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-500 dark:text-gray-400">No FAQs found matching "{searchQuery}"</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredFaqs.map((faq, index) => (
                    <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                      <details className="group">
                        <summary className="flex justify-between items-center p-4 cursor-pointer bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
                          <h4 className="text-base font-medium text-gray-900 dark:text-white">
                            {faq.question}
                          </h4>
                          <div className="ml-2 flex-shrink-0">
                            <svg className="h-5 w-5 text-gray-500 group-open:transform group-open:rotate-180 transition-transform" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </summary>
                        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            {faq.answer}
                          </p>
                        </div>
                      </details>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'contact' && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Contact Support</h3>
              
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg mb-4">
                <p className="text-blue-700 dark:text-blue-300">
                  Our support team is here to help you with any questions or issues you may have.
                </p>
              </div>
              
              <form className="space-y-4">
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Subject
                  </label>
                  <select
                    id="subject"
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md dark:bg-gray-700 dark:text-white"
                  >
                    <option>Technical Issue</option>
                    <option>Billing Question</option>
                    <option>Feature Request</option>
                    <option>Account Help</option>
                    <option>Other</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                    placeholder="Describe your issue or question in detail..."
                  />
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
              
              <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
                <h4 className="text-base font-medium text-gray-900 dark:text-white mb-2">Other Ways to Reach Us</h4>
                <div className="space-y-2">
                  <a
                    href="mailto:support@instachatai.co"
                    className="flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-500"
                  >
                    <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    support@instachatai.co
                  </a>
                  <a
                    href="#"
                    className="flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-500"
                  >
                    <ExternalLink className="h-5 w-5 mr-2" />
                    Knowledge Base
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}