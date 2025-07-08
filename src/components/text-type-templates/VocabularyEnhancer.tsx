import React, { useState } from 'react';
import { BookOpen, Lightbulb, AlertTriangle, Sparkles, Wand, Star, Zap, Gift } from 'lucide-react';
import { getTextTypeVocabulary } from '../../lib/openai';
import AIErrorHandler from '../../utils/errorHandling';
import { vocabularyEnhancements } from '../../config/prompts';

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
    
    setIsLoading(true);
    setError(null);
    
    // Validate content length
    if (!content || content.trim().length < 50) {
      setError('Please write at least 50 characters before requesting vocabulary suggestions.');
      setIsLoading(false);
      return;
    }
    
    try {
      const data = await getTextTypeVocabulary(textType, content.substring(0, 500));
      setVocabularyData(data);
    } catch (err) {
      const aiError = AIErrorHandler.handleError(err, 'vocabulary enhancement');
      console.error('Error loading vocabulary:', aiError.userFriendlyMessage);
      setError(aiError.userFriendlyMessage);
      
      // Use fallback vocabulary from configuration
      const fallbackVocab = vocabularyEnhancements[textType.toLowerCase() as keyof typeof vocabularyEnhancements] || vocabularyEnhancements.good;
      const fallbackData: VocabularyData = {
        textType: textType,
        categories: [
          {
            name: `${textType} Vocabulary`,
            words: fallbackVocab,
            examples: [
              `Try using these words to make your ${textType} writing more engaging.`,
              `These vocabulary choices will help strengthen your writing for NSW Selective standards.`
            ]
          },
          {
            name: 'General Enhancement Words',
            words: ['excellent', 'remarkable', 'significant', 'compelling', 'fascinating'],
            examples: [
              'Use these words to add sophistication to your writing.',
              'These words show advanced vocabulary skills.'
            ]
          }
        ],
        phrasesAndExpressions: [
          'In addition to this...',
          'Furthermore, it is important to note...',
          'As a result of this...',
          'On the other hand...',
          'In conclusion...',
          'Most importantly...'
        ],
        transitionWords: [
          'However', 'Therefore', 'Moreover', 'Nevertheless', 'Consequently', 
          'Furthermore', 'Additionally', 'Meanwhile', 'Subsequently', 'Finally'
        ]
      };
      setVocabularyData(fallbackData);
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

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleOpen}
        className="flex items-center px-4 py-2 text-sm font-bold rounded-xl border-3 border-yellow-300 bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-700 hover:from-yellow-200 hover:to-yellow-300 transition-all duration-300 transform hover:scale-105 shadow-md"
      >
        <Wand className="w-5 h-5 mr-2" />
        Magic Words
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto backdrop-blur-sm" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gradient-to-br from-yellow-500/50 to-orange-500/50 transition-opacity" aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-3xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full border-4 border-yellow-300 dark:border-yellow-700">
              <div className="bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 px-6 pt-5 pb-4 sm:p-8">
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mr-4 shadow-lg">
                      <Wand className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl leading-6 font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600 dark:from-yellow-400 dark:to-orange-400" id="modal-title">
                      Magic Words for {textType} Writing
                    </h3>
                  </div>
                  <button
                    type="button"
                    className="bg-white dark:bg-gray-700 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 p-2 shadow-md hover:shadow-lg transform hover:scale-110 transition-all duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="mt-4">
                  <div className="border-b-4 border-yellow-200 dark:border-yellow-800">
                    <nav className="-mb-px flex space-x-8 justify-center" aria-label="Tabs">
                      <button
                        onClick={( ) => setActiveTab('categories')}
                        className={`${
                          activeTab === 'categories'
                            ? 'border-yellow-500 text-yellow-700 dark:text-yellow-300 bg-yellow-50 dark:bg-yellow-900/30'
                            : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300 dark:text-gray-300 dark:hover:text-gray-100'
                        } whitespace-nowrap py-4 px-6 border-b-4 font-bold text-base rounded-t-xl transition-all duration-300 flex items-center`}
                      >
                        <Star className="w-5 h-5 mr-2 text-yellow-500" />
                        Word Treasure Chest
                      </button>
                      <button
                        onClick={() => setActiveTab('phrases')}
                        className={`${
                          activeTab === 'phrases'
                            ? 'border-yellow-500 text-yellow-700 dark:text-yellow-300 bg-yellow-50 dark:bg-yellow-900/30'
                            : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300 dark:text-gray-300 dark:hover:text-gray-100'
                        } whitespace-nowrap py-4 px-6 border-b-4 font-bold text-base rounded-t-xl transition-all duration-300 flex items-center`}
                      >
                        <Sparkles className="w-5 h-5 mr-2 text-purple-500" />
                        Magic Phrases
                      </button>
                      <button
                        onClick={() => setActiveTab('transitions')}
                        className={`${
                          activeTab === 'transitions'
                            ? 'border-yellow-500 text-yellow-700 dark:text-yellow-300 bg-yellow-50 dark:bg-yellow-900/30'
                            : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300 dark:text-gray-300 dark:hover:text-gray-100'
                        } whitespace-nowrap py-4 px-6 border-b-4 font-bold text-base rounded-t-xl transition-all duration-300 flex items-center`}
                      >
                        <Zap className="w-5 h-5 mr-2 text-blue-500" />
                        Connector Words
                      </button>
                    </nav>
                  </div>

                  {isLoading ? (
                    <div className="mt-4 flex justify-center items-center h-64">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                      <p className="ml-3 text-indigo-600">Loading vocabulary suggestions...</p>
                    </div>
                  ) : error ? (
                    <div className="mt-4 bg-amber-50 p-4 rounded-md">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <AlertTriangle className="h-5 w-5 text-amber-400" aria-hidden="true" />
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-amber-800">Notice</h3>
                          <div className="mt-2 text-sm text-amber-700">
                            <p>{error}</p>
                            {vocabularyData && (
                              <p className="mt-1">Don't worry! I've provided some helpful vocabulary suggestions below.</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}

                  {vocabularyData ? (
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
                                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 cursor-pointer hover:bg-indigo-200 transition-colors"
                                    onClick={() => copyToClipboard(word)}
                                    title="Click to copy"
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
                                className="bg-white p-2 rounded text-sm text-gray-700 cursor-pointer hover:bg-indigo-100 transition-colors"
                                onClick={() => copyToClipboard(phrase)}
                                title="Click to copy"
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
                                className="bg-white p-2 rounded text-sm text-gray-700 cursor-pointer hover:bg-indigo-100 transition-colors"
                                onClick={() => copyToClipboard(word)}
                                title="Click to copy"
                              >
                                {word}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : !isLoading && (
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
