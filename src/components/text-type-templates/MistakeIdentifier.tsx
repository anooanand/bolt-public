import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, Target, Star, Sparkles, Zap, Gift } from 'lucide-react';
import { identifyCommonMistakes } from '../../lib/openai';
import AIErrorHandler from '../../utils/errorHandling';
import { promptConfig } from '../../config/prompts';

interface MistakeIdentifierProps {
  content: string;
  textType: string;
}

interface MistakeData {
  category: string;
  issue: string;
  example: string;
  impact: string;
  correction: string;
  preventionTip: string;
}

interface MistakeAnalysis {
  overallAssessment: string;
  mistakesIdentified: MistakeData[];
  patternAnalysis: string;
  priorityFixes: string[];
  positiveElements: string[];
}

export function MistakeIdentifier({ content, textType }: MistakeIdentifierProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mistakeData, setMistakeData] = useState<MistakeAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeMistakes = async () => {
    if (isLoading || content.trim().length < 50) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await identifyCommonMistakes(content, textType);
      setMistakeData(data);
    } catch (err) {
      const aiError = AIErrorHandler.handleError(err, 'mistake analysis');
      console.error('Error analyzing mistakes:', aiError.userFriendlyMessage);
      setError(aiError.userFriendlyMessage);
      
      // Provide fallback analysis
      const fallbackAnalysis: MistakeAnalysis = {
        overallAssessment: `Your ${textType} writing shows good effort! While I can't provide detailed analysis right now, keep practicing the key elements of ${textType} writing.`,
        mistakesIdentified: [],
        patternAnalysis: `Focus on the main features of ${textType} writing: clear structure, appropriate vocabulary, and engaging content for your NSW Selective preparation.`,
        priorityFixes: [
          `Review the key requirements for ${textType} writing`,
          'Check your spelling and grammar carefully',
          'Make sure your writing has a clear beginning, middle, and end',
          'Use varied sentence structures to make your writing more interesting'
        ],
        positiveElements: [
          'You\'re practicing regularly, which is great!',
          'Your writing shows understanding of the task',
          'Keep working on developing your ideas',
          'You\'re building important writing skills'
        ]
      };
      setMistakeData(fallbackAnalysis);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
    if (!mistakeData && content.trim().length >= 50) {
      analyzeMistakes();
    }
  };

  // Function to get color based on category
  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'content':
        return 'bg-blue-100 text-blue-800';
      case 'structure':
        return 'bg-purple-100 text-purple-800';
      case 'vocabulary':
        return 'bg-green-100 text-green-800';
      case 'sentences':
        return 'bg-yellow-100 text-yellow-800';
      case 'punctuation':
        return 'bg-orange-100 text-orange-800';
      case 'spelling':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleOpen}
        className="flex items-center px-4 py-2 text-sm font-bold rounded-xl border-3 border-green-300 bg-gradient-to-r from-green-100 to-green-200 text-green-700 hover:from-green-200 hover:to-green-300 transition-all duration-300 transform hover:scale-105 shadow-md"
      >
        <Target className="w-5 h-5 mr-2" />
        Check My Work
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto backdrop-blur-sm" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gradient-to-br from-green-500/50 to-teal-500/50 transition-opacity" aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-3xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full border-4 border-green-300 dark:border-green-700">
              <div className="bg-gradient-to-r from-green-100 to-teal-100 dark:from-green-900/30 dark:to-teal-900/30 px-6 pt-5 pb-4 sm:p-8">
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mr-4 shadow-lg">
                      <Target className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl leading-6 font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-600 dark:from-green-400 dark:to-teal-400" id="modal-title">
                      Let's Check Your {textType} Writing!
                    </h3>
                  </div>
                  <button
                    type="button"
                    className="bg-white dark:bg-gray-700 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 p-2 shadow-md hover:shadow-lg transform hover:scale-110 transition-all duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {isLoading ? (
                  <div className="mt-4 flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                    <p className="ml-3 text-indigo-600">Analyzing your writing for common mistakes...</p>
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
                          {mistakeData && (
                            <p className="mt-1">Don't worry! I've provided some helpful guidance below.</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : content.trim().length < 50 ? (
                  <div className="mt-4 bg-yellow-50 p-4 rounded-md">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <AlertTriangle className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-yellow-800">Not enough content</h3>
                        <div className="mt-2 text-sm text-yellow-700">
                          <p>Please write at least 50 characters before analyzing for common mistakes.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : mistakeData ? (
                  <div className="mt-4">
                    <div className="bg-indigo-50 p-4 rounded-md mb-6">
                      <p className="text-indigo-800">{mistakeData.overallAssessment}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-md font-medium text-gray-900 mb-3">Identified Mistakes</h4>
                        {mistakeData.mistakesIdentified.length > 0 ? (
                          <div className="space-y-4">
                            {mistakeData.mistakesIdentified.map((mistake, index) => (
                              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                                <div className={`px-4 py-2 ${getCategoryColor(mistake.category)}`}>
                                  <div className="flex justify-between items-center">
                                    <span className="font-medium">{mistake.category}</span>
                                    <span className="text-xs px-2 py-1 rounded-full bg-white bg-opacity-50">
                                      {index < 3 ? 'High Priority' : 'Medium Priority'}
                                    </span>
                                  </div>
                                </div>
                                <div className="p-4 bg-white">
                                  <p className="text-sm font-medium text-gray-700 mb-2">Issue:</p>
                                  <p className="text-sm text-gray-600 mb-3">{mistake.issue}</p>
                                  
                                  <p className="text-sm font-medium text-gray-700 mb-2">Example from your writing:</p>
                                  <div className="bg-gray-50 p-2 rounded text-sm text-gray-600 mb-3 italic">
                                    "{mistake.example}"
                                  </div>
                                  
                                  <p className="text-sm font-medium text-gray-700 mb-2">How to fix it:</p>
                                  <p className="text-sm text-gray-600 mb-3">{mistake.correction}</p>
                                  
                                  <div className="bg-green-50 p-2 rounded">
                                    <p className="text-sm font-medium text-green-700 mb-1">Prevention tip:</p>
                                    <p className="text-sm text-green-600">{mistake.preventionTip}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="bg-green-50 p-4 rounded-md">
                            <div className="flex">
                              <div className="flex-shrink-0">
                                <CheckCircle className="h-5 w-5 text-green-400" aria-hidden="true" />
                              </div>
                              <div className="ml-3">
                                <h3 className="text-sm font-medium text-green-800">No major mistakes found</h3>
                                <div className="mt-2 text-sm text-green-700">
                                  <p>Great job! Your writing doesn't contain any obvious common mistakes.</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      <div>
                        <h4 className="text-md font-medium text-gray-900 mb-3">Analysis & Recommendations</h4>
                        
                        <div className="bg-gray-50 p-4 rounded-md mb-4">
                          <p className="text-sm font-medium text-gray-700 mb-2">Pattern Analysis:</p>
                          <p className="text-sm text-gray-600">{mistakeData.patternAnalysis}</p>
                        </div>
                        
                        <div className="bg-yellow-50 p-4 rounded-md mb-4">
                          <p className="text-sm font-medium text-yellow-700 mb-2">Priority Fixes:</p>
                          <ol className="list-decimal list-inside text-sm text-yellow-600 space-y-1">
                            {mistakeData.priorityFixes.map((fix, index) => (
                              <li key={index}>{fix}</li>
                            ))}
                          </ol>
                        </div>
                        
                        <div className="bg-green-50 p-4 rounded-md">
                          <p className="text-sm font-medium text-green-700 mb-2">What You're Doing Well:</p>
                          <ul className="list-disc list-inside text-sm text-green-600 space-y-1">
                            {mistakeData.positiveElements.map((element, index) => (
                              <li key={index}>{element}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="mt-4 flex flex-col items-center justify-center h-64 text-gray-500">
                    <AlertTriangle className="h-12 w-12 mb-4" />
                    <p>Click the button below to analyze your writing</p>
                    <p className="text-sm mt-2">for common mistakes in {textType} writing.</p>
                    <button
                      onClick={analyzeMistakes}
                      className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Analyze My Writing
                    </button>
                  </div>
                )}
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
