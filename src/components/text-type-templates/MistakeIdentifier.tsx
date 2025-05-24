import React, { useState } from 'react';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import { identifyCommonMistakes } from '../../lib/openai';

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
      console.error('Error analyzing mistakes:', err);
      setError('Failed to analyze writing for common mistakes. Please try again later.');
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
        className="flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <AlertTriangle className="w-4 h-4 mr-2" />
        Check Common Mistakes
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                    Common Mistakes Analysis for {textType} Writing
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

                {isLoading ? (
                  <div className="mt-4 flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                    <p className="ml-3 text-indigo-600">Analyzing your writing for common mistakes...</p>
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
                                  <p>Great job! Your writing doesn't contain any common mistakes.</p>
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