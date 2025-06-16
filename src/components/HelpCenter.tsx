import React, { useState } from 'react';
import { X, Search, MessageSquare, BookOpen, FileText, Settings, ExternalLink } from 'lucide-react';

interface HelpCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

export function HelpCenter({ isOpen, onClose }: HelpCenterProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'faq' | 'guides' | 'contact'>('faq');

  const faqItems: FAQItem[] = [
    {
      question: 'How do I get started with writing?',
      answer: (
        <div>
          <p className="mb-2">To start writing:</p>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Select a writing type from the dropdown menu</li>
            <li>Choose a prompt or generate one</li>
            <li>Begin writing in the text area</li>
            <li>Use the AI coach for real-time feedback</li>
          </ol>
        </div>
      )
    },
    {
      question: 'What writing types are supported?',
      answer: (
        <div>
          <p className="mb-2">We support all major writing types required for the NSW Selective exam:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Narrative (creative stories)</li>
            <li>Persuasive (arguments and opinions)</li>
            <li>Expository/Informative (explaining topics)</li>
            <li>Descriptive (detailed descriptions)</li>
            <li>Reflective (personal experiences and insights)</li>
            <li>And more specialized formats like letters, diary entries, etc.</li>
          </ul>
        </div>
      )
    },
    {
      question: 'How does the AI coach work?',
      answer: (
        <div>
          <p>The AI coach analyzes your writing in real-time and provides:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Suggestions for improvement</li>
            <li>Feedback on structure, vocabulary, and grammar</li>
            <li>Answers to your specific questions about writing</li>
            <li>Guidance tailored to your selected writing type</li>
          </ul>
          <p className="mt-2">The coach adapts to your assistance level (detailed, moderate, or minimal) to provide appropriate support.</p>
        </div>
      )
    },
    {
      question: 'What is the paraphrase tool?',
      answer: (
        <div>
          <p className="mb-2">The paraphrase tool helps you rewrite selected text in different styles:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Select text in your writing area</li>
            <li>The paraphrase panel will automatically open</li>
            <li>Choose a paraphrasing style (standard, formal, casual, etc.)</li>
            <li>Click "Paraphrase" to generate alternatives</li>
            <li>Apply the changes to your writing</li>
          </ul>
        </div>
      )
    },
    {
      question: 'How do I use the timer?',
      answer: (
        <div>
          <p>The timer helps you practice writing under exam conditions:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Click the timer button in the toolbar</li>
            <li>Start the timer when you're ready to begin writing</li>
            <li>The timer will count down from 30 minutes (standard exam time)</li>
            <li>You'll receive notifications at key intervals</li>
            <li>Use the "Timeline" feature to see recommended time allocation</li>
          </ul>
        </div>
      )
    },
    {
      question: 'Can I use this for school assignments?',
      answer: "Yes! While our platform is optimized for NSW Selective School exam preparation, the writing skills you'll develop are valuable for all academic writing. Just be sure to follow your school's guidelines regarding the use of AI tools."
    },
    {
      question: 'How do I cancel my subscription?',
      answer: (
        <div>
          <p>To cancel your subscription:</p>
          <ol className="list-decimal pl-5 space-y-1 mt-2">
            <li>Go to your Dashboard</li>
            <li>Click on "Subscription Status"</li>
            <li>Select "Manage Subscription"</li>
            <li>Follow the prompts to cancel</li>
          </ol>
          <p className="mt-2">You'll continue to have access until the end of your current billing period.</p>
        </div>
      )
    },
    {
      question: 'Is my writing data secure?',
      answer: (
        <div>
          <p>Yes, we take data security seriously:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>All writing data is encrypted and stored securely</li>
            <li>We do not share your writing with third parties</li>
            <li>Your data is used only to provide feedback and improve the platform</li>
            <li>You can delete your data at any time from your account settings</li>
          </ul>
        </div>
      )
    }
  ];

  const filteredFAQs = searchQuery
    ? faqItems.filter(item =>
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (typeof item.answer === 'string' && item.answer.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : faqItems;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        
        <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Help Center</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="px-6 py-4">
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search for help topics..."
              />
            </div>
            
            <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab('faq')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'faq'
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <MessageSquare className="inline-block h-4 w-4 mr-2" />
                  FAQ
                </button>
                <button
                  onClick={() => setActiveTab('guides')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'guides'
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <BookOpen className="inline-block h-4 w-4 mr-2" />
                  Writing Guides
                </button>
                <button
                  onClick={() => setActiveTab('contact')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'contact'
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <MessageSquare className="inline-block h-4 w-4 mr-2" />
                  Contact Support
                </button>
              </nav>
            </div>
            
            <div className="max-h-96 overflow-y-auto">
              {activeTab === 'faq' && (
                <div className="space-y-6">
                  {searchQuery && filteredFAQs.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500 dark:text-gray-400">No results found for "{searchQuery}"</p>
                    </div>
                  ) : (
                    filteredFAQs.map((item, index) => (
                      <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{item.question}</h3>
                        <div className="text-gray-600 dark:text-gray-300">
                          {item.answer}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
              
              {activeTab === 'guides' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Narrative Writing</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-3">
                      Learn how to craft engaging stories with well-developed characters and plots.
                    </p>
                    <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline flex items-center">
                      View Guide
                      <ExternalLink className="h-4 w-4 ml-1" />
                    </a>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Persuasive Writing</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-3">
                      Master the art of constructing compelling arguments and persuasive techniques.
                    </p>
                    <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline flex items-center">
                      View Guide
                      <ExternalLink className="h-4 w-4 ml-1" />
                    </a>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Exam Strategies</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-3">
                      Essential strategies for success in the NSW Selective School exam.
                    </p>
                    <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline flex items-center">
                      View Guide
                      <ExternalLink className="h-4 w-4 ml-1" />
                    </a>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Using the Platform</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-3">
                      Get the most out of all the features and tools available.
                    </p>
                    <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline flex items-center">
                      View Guide
                      <ExternalLink className="h-4 w-4 ml-1" />
                    </a>
                  </div>
                </div>
              )}
              
              {activeTab === 'contact' && (
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Contact Support</h3>
                  
                  <form className="space-y-4">
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Subject
                      </label>
                      <select
                        id="subject"
                        className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      >
                        <option>Technical Issue</option>
                        <option>Account Question</option>
                        <option>Billing Inquiry</option>
                        <option>Feature Request</option>
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
                        className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        placeholder="Describe your issue or question..."
                      />
                    </div>
                    
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      >
                        Send Message
                      </button>
                    </div>
                  </form>
                  
                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Other ways to get help:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <MessageSquare className="h-4 w-4 text-gray-400 mr-2" />
                        Email: support@instachatai.co
                      </li>
                      <li className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <FileText className="h-4 w-4 text-gray-400 mr-2" />
                        Knowledge Base: <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline ml-1">help.instachatai.co</a>
                      </li>
                      <li className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <Settings className="h-4 w-4 text-gray-400 mr-2" />
                        Live Chat: Available 9am-5pm AEST weekdays
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 flex justify-between items-center">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <span className="font-medium">Keyboard Shortcuts:</span> Alt+H (Help), Alt+C (Coach), Alt+P (Paraphrase)
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-500"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}