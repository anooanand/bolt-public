import React, { useState } from 'react';
import { BookOpen, Lightbulb, AlertTriangle } from 'lucide-react';
import openai from '../../lib/openai';

interface VocabularyEnhancerProps {
  textType: string;
  content: string;
}

interface VocabularyCategory {
  name: string;
  words: string[];
  examples: string[];
}

interface VocabularyData {
  textType: string;
  categories: VocabularyCategory[];
  phrasesAndExpressions: string[];
  transitionWords: string[];
}

export function VocabularyEnhancer({ textType, content }: VocabularyEnhancerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [vocabularyData, setVocabularyData] = useState<VocabularyData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('categories');

  const loadVocabulary = async () => {
    if (isLoading) return;
    
    // Reset states
    setIsLoading(true);
    setError(null);
    
    // Validate content length
    if (!content || content.trim().length < 50) {
      setError('Please write at least 50 characters before requesting vocabulary suggestions.');
      setIsLoading(false);
      return;
    }
    
    try {
      const data = await openai.getTextTypeVocabulary(textType, content.substring(0, 500));
      setVocabularyData(data);
    } catch (err) {
      console.error('Error loading vocabulary:', err);
      setError('Failed to load vocabulary suggestions. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
    if (!vocabularyData) {
      loadVocabulary();
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleOpen}
        className="flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <BookOpen className="w-4 h-4 mr-2" />
        Vocabulary Helper
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                    {textType} Vocabulary Helper
                  </h3>
                  <button
                    type="button"
                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="mt-4">
                  <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                      <button
                        onClick={( ) => setActiveTab('categories')}
                        className={`${
                          activeTab === 'categories'
                            ? 'border-indigo-500 text-indigo-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                      >
                        Word Categories
                      </button>
                      <button
                        onClick={() => setActiveTab('phrases')}
                        className={`${
                          activeTab === 'phrases'
                            ? 'border-indigo-500 text-indigo-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                      >
                        Useful Phrases
                      </button>
                      <button
                        onClick={() => setActiveTab('transitions')}
                        className={`${
                          activeTab === 'transitions'
                            ? 'border-indigo-500 text-indigo-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                      >
                        Transition Words
                      </button>
                    </nav>
                  </div>

                  {isLoading ? (
                    <div className="mt-4 flex justify-center items-center h-64">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                      <p className="ml-3 text-indigo-600">Loading vocabulary suggestions...</p>
                    </div>
                  ) : error ? (
                    <div className="mt-4 bg-red-50 p-4 rounded-md">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <AlertTriangle className="h-5 w-5 text-red-400" aria-hidden="true" />
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-red-800">Error</h3>
                          <div className="mt-2 text-sm text-red-700">
                            <p>{error}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : vocabularyData ? (
                    <div className="mt-4">
                      {activeTab === 'categories' && (
                        <div className="space-y-6">
                          {vocabularyData.categories.map((category, index) => (
                            <div key={index} className="bg-indigo-50 rounded-lg p-4">
                              <h4 className="text-md font-medium text-indigo-800 mb-2">{category.name}</h4>
                              <div className="flex flex-wrap gap-2 mb-3">
                                {category.words.map((word, wordIndex) => (
                                  <span 
                                    key={wordIndex} 
                                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 cursor-pointer hover:bg-indigo-200"
                                    onClick={() => {
                                      navigator.clipboard.writeText(word);
                                      // Could add a toast notification here
                                    }}
                                  >
                                    {word}
                                  </span>
                                ))}
                              </div>
                              <div className="space-y-1">
                                {category.examples.map((example, exampleIndex) => (
                                  <div key={exampleIndex} className="text-sm text-gray-600 bg-white p-2 rounded">
                                    <Lightbulb className="inline-block w-4 h-4 mr-1 text-yellow-500" />
                                    {example}
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {activeTab === 'phrases' && (
                        <div className="mt-4 bg-indigo-50 rounded-lg p-4">
                          <h4 className="text-md font-medium text-indigo-800 mb-3">Useful Phrases and Expressions</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {vocabularyData.phrasesAndExpressions.map((phrase, index) => (
                              <div 
                                key={index} 
                                className="bg-white p-2 rounded text-sm text-gray-700 cursor-pointer hover:bg-indigo-100"
                                onClick={() => {
                                  navigator.clipboard.writeText(phrase);
                                  // Could add a toast notification here
                                }}
                              >
                                {phrase}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {activeTab === 'transitions' && (
                        <div className="mt-4 bg-indigo-50 rounded-lg p-4">
                          <h4 className="text-md font-medium text-indigo-800 mb-3">Transition Words</h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                            {vocabularyData.transitionWords.map((word, index) => (
                              <div 
                                key={index} 
                                className="bg-white p-2 rounded text-sm text-gray-700 cursor-pointer hover:bg-indigo-100"
                                onClick={() => {
                                  navigator.clipboard.writeText(word);
                                  // Could add a toast notification here
                                }}
                              >
                                {word}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="mt-4 flex flex-col items-center justify-center h-64 text-gray-500">
                      <BookOpen className="h-12 w-12 mb-4" />
                      <p>Click the button below to load vocabulary suggestions</p>
                      <p className="text-sm mt-2">tailored to your {textType} writing.</p>
                      <button
                        onClick={loadVocabulary}
                        className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Load Vocabulary Suggestions
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setIsOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
