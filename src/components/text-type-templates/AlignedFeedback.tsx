import React, { useEffect, useState } from 'react';
import { CheckCircle, AlertCircle, HelpCircle } from 'lucide-react';
import { evaluateEssay } from '../../lib/openai';

interface AlignedFeedbackProps {
  content: string;
  textType: string;
}

interface CategoryScore {
  score: number;
  percentage: number;
  feedback: string;
}

interface NSWFeedbackResponse {
  overallComment: string;
  overallScore: {
    total: number;
    percentage: number;
  };
  categoryScores: {
    content: CategoryScore;
    form: CategoryScore;
    vocabulary: CategoryScore;
    sentences: CategoryScore;
    punctuation: CategoryScore;
    spelling: CategoryScore;
  };
  strengths: string[];
  areasForImprovement: string[];
  specificExamples: Array<{
    text: string;
    comment: string;
    category: string;
  }>;
  improvementSuggestions: Array<{
    category: string;
    suggestion: string;
  }>;
  progressTracking: {
    currentLevel: string;
    nextSteps: string[];
  };
}

export function AlignedFeedback({ content, textType }: AlignedFeedbackProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [feedbackData, setFeedbackData] = useState<NSWFeedbackResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [previousScores, setPreviousScores] = useState<{date: string; scores: {[key: string]: number}}[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch feedback data using the evaluateEssay function
  useEffect(() => {
    if (isOpen && content.trim().length > 50) {
      setIsLoading(true);
      setError(null);
      
      // Call the evaluateEssay function from openai.ts
      evaluateEssay(content, textType)
        .then(response => {
          setFeedbackData(response);
          
          // Store this feedback in localStorage for progress tracking
          const now = new Date();
          const dateString = now.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
          
          // Get previous scores from localStorage
          const storedScores = localStorage.getItem('nswFeedbackScores');
          let previousScores = storedScores ? JSON.parse(storedScores) : [];
          
          // Add current scores
          const currentScores = {
            date: dateString,
            scores: {
              'Content': response.categoryScores.content.score,
              'Form (Structure & Organisation)': response.categoryScores.form.score,
              'Vocabulary & Style': response.categoryScores.vocabulary.score,
              'Sentences': response.categoryScores.sentences.score,
              'Punctuation': response.categoryScores.punctuation.score,
              'Spelling': response.categoryScores.spelling.score
            }
          };
          
          // Add to beginning of array (most recent first)
          previousScores.unshift(currentScores);
          
          // Keep only the last 5 entries
          previousScores = previousScores.slice(0, 5);
          
          // Save back to localStorage
          localStorage.setItem('nswFeedbackScores', JSON.stringify(previousScores));
          
          // Set for display
          setPreviousScores(previousScores.slice(1)); // Exclude current score
          
          setIsLoading(false);
        })
        .catch(err => {
          console.error('Error getting NSW Selective feedback:', err);
          setError('Unable to generate feedback at this time. Please try again later.');
          setIsLoading(false);
        });
    }
  }, [isOpen, content, textType]);

  // Function to get color based on score percentage
  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-blue-600';
    if (percentage >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  // Function to get progress bar color based on score percentage
  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 60) return 'bg-blue-500';
    if (percentage >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  // Function to check if score has improved
  const hasImproved = (category: string, currentScore: number) => {
    if (previousScores.length === 0) return false;
    const lastScore = previousScores[0].scores[category] || 0;
    return currentScore > lastScore;
  };

  // Convert category scores to array for rendering
  const getCategoryArrays = () => {
    if (!feedbackData) return { contentCategories: [], mechanicsCategories: [] };
    
    const contentCategories = [
      { 
        name: 'Content', 
        score: feedbackData.categoryScores.content.score, 
        maxScore: 5,
        percentage: feedbackData.categoryScores.content.percentage,
        feedback: feedbackData.categoryScores.content.feedback,
        suggestions: feedbackData.improvementSuggestions
          .filter(s => s.category === 'content')
          .map(s => s.suggestion)
      },
      { 
        name: 'Form (Structure & Organisation)', 
        score: feedbackData.categoryScores.form.score, 
        maxScore: 5,
        percentage: feedbackData.categoryScores.form.percentage,
        feedback: feedbackData.categoryScores.form.feedback,
        suggestions: feedbackData.improvementSuggestions
          .filter(s => s.category === 'form')
          .map(s => s.suggestion)
      },
      { 
        name: 'Vocabulary & Style', 
        score: feedbackData.categoryScores.vocabulary.score, 
        maxScore: 5,
        percentage: feedbackData.categoryScores.vocabulary.percentage,
        feedback: feedbackData.categoryScores.vocabulary.feedback,
        suggestions: feedbackData.improvementSuggestions
          .filter(s => s.category === 'vocabulary')
          .map(s => s.suggestion)
      }
    ];
    
    const mechanicsCategories = [
      { 
        name: 'Sentences', 
        score: feedbackData.categoryScores.sentences.score, 
        maxScore: 4,
        percentage: feedbackData.categoryScores.sentences.percentage,
        feedback: feedbackData.categoryScores.sentences.feedback,
        suggestions: feedbackData.improvementSuggestions
          .filter(s => s.category === 'sentences')
          .map(s => s.suggestion)
      },
      { 
        name: 'Punctuation', 
        score: feedbackData.categoryScores.punctuation.score, 
        maxScore: 3,
        percentage: feedbackData.categoryScores.punctuation.percentage,
        feedback: feedbackData.categoryScores.punctuation.feedback,
        suggestions: feedbackData.improvementSuggestions
          .filter(s => s.category === 'punctuation')
          .map(s => s.suggestion)
      },
      { 
        name: 'Spelling', 
        score: feedbackData.categoryScores.spelling.score, 
        maxScore: 3,
        percentage: feedbackData.categoryScores.spelling.percentage,
        feedback: feedbackData.categoryScores.spelling.feedback,
        suggestions: feedbackData.improvementSuggestions
          .filter(s => s.category === 'spelling')
          .map(s => s.suggestion)
      }
    ];
    
    return { contentCategories, mechanicsCategories };
  };

  const { contentCategories, mechanicsCategories } = getCategoryArrays();

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <CheckCircle className="w-4 h-4 mr-2" />
        NSW Criteria Feedback
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
                    NSW Selective Exam Writing Feedback
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
                    <p className="ml-3 text-indigo-600">Analyzing your writing...</p>
                  </div>
                ) : error ? (
                  <div className="mt-4 bg-red-50 p-4 rounded-md">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <AlertCircle className="h-5 w-5 text-red-400" aria-hidden="true" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800">Error</h3>
                        <div className="mt-2 text-sm text-red-700">
                          <p>{error}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : feedbackData ? (
                  <div className="mt-4">
                    <div className="bg-indigo-50 p-4 rounded-md mb-6">
                      <p className="text-indigo-800">{feedbackData.overallComment}</p>
                      <div className="mt-3 flex items-center">
                        <div className="text-2xl font-bold mr-3 flex items-center">
                          <span className={getScoreColor(feedbackData.overallScore.percentage)}>{feedbackData.overallScore.total}</span>
                          <span className="text-gray-500 text-lg font-normal">/25</span>
                        </div>
                        <div className="flex-grow h-4 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${getProgressColor(feedbackData.overallScore.percentage)}`} 
                            style={{ width: `${feedbackData.overallScore.percentage}%` }}
                          ></div>
                        </div>
                        <div className="ml-3 text-lg font-medium">
                          <span className={getScoreColor(feedbackData.overallScore.percentage)}>{feedbackData.overallScore.percentage}%</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-md font-medium text-gray-900 mb-3">Content, Form, and Vocabulary/Style (15 marks)</h4>
                        {contentCategories.map((category, index) => (
                          <div key={index} className="mb-4">
                            <div className="flex justify-between items-center mb-1">
                              <div className="flex items-center">
                                <span className="text-sm font-medium text-gray-700">{category.name}</span>
                                {hasImproved(category.name, category.score) && (
                                  <span className="ml-2 text-xs text-green-600 flex items-center">
                                    <svg className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                                    </svg>
                                    Improved
                                  </span>
                                )}
                              </div>
                              <span className="text-sm font-medium">
                                <span className={getScoreColor(category.percentage)}>
                                  {category.score}
                                </span>
                                /{category.maxScore}
                              </span>
                            </div>
                            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className={getProgressColor(category.percentage)} 
                                style={{ width: `${category.percentage}%`, height: '100%' }}
                              ></div>
                            </div>
                            <p className="mt-1 text-xs text-gray-600">{category.feedback}</p>
                            {category.suggestions.length > 0 && (
                              <ul className="mt-1 text-xs text-gray-600 list-disc list-inside">
                                {category.suggestions.map((suggestion, i) => (
                                  <li key={i}>{suggestion}</li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                      </div>

                      <div>
                        <h4 className="text-md font-medium text-gray-900 mb-3">Sentences, Punctuation, and Spelling (10 marks)</h4>
                        {mechanicsCategories.map((category, index) => (
                          <div key={index} className="mb-4">
                            <div className="flex justify-between items-center mb-1">
                              <div className="flex items-center">
                                <span className="text-sm font-medium text-gray-700">{category.name}</span>
                                {hasImproved(category.name, category.score) && (
                                  <span className="ml-2 text-xs text-green-600 flex items-center">
                                    <svg className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                                    </svg>
                                    Improved
                                  </span>
                                )}
                              </div>
                              <span className="text-sm font-medium">
                                <span className={getScoreColor(category.percentage)}>
                                  {category.score}
                                </span>
                                /{category.maxScore}
                              </span>
                            </div>
                            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className={getProgressColor(category.percentage)} 
                                style={{ width: `${category.percentage}%`, height: '100%' }}
                              ></div>
                            </div>
                            <p className="mt-1 text-xs text-gray-600">{category.feedback}</p>
                            {category.suggestions.length > 0 && (
                              <ul className="mt-1 text-xs text-gray-600 list-disc list-inside">
                                {category.suggestions.map((suggestion, i) => (
                                  <li key={i}>{suggestion}</li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-green-50 p-4 rounded-md">
                        <h4 className="text-md font-medium text-green-800 flex items-center mb-2">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Strengths
                        </h4>
                        <ul className="list-disc list-inside text-sm text-green-700">
                          {feedbackData.strengths.map((strength, index) => (
                            <li key={index}>{strength}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-yellow-50 p-4 rounded-md">
                        <h4 className="text-md font-medium text-yellow-800 flex items-center mb-2">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          Areas for Improvement
                        </h4>
                        <ul className="list-disc list-inside text-sm text-yellow-700">
                          {feedbackData.areasForImprovement.map((area, index) => (
                            <li key={index}>{area}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {feedbackData.specificExamples.length > 0 && (
                      <div className="mt-6">
                        <h4 className="text-md font-medium text-gray-900 mb-3">Specific Examples</h4>
                        <div className="bg-gray-50 p-4 rounded-md">
                          {feedbackData.specificExamples.map((example, index) => (
                            <div key={index} className="mb-3 last:mb-0">
                              <p className="text-sm italic text-gray-600">"{example.text}"</p>
                              <p className="text-sm text-gray-800 mt-1">
                                <span className="font-medium">{example.category}: </span>
                                {example.comment}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="mt-6">
                      <h4 className="text-md font-medium text-gray-900 mb-3">Progress Tracking</h4>
                      <div className="bg-blue-50 p-4 rounded-md">
                        <p className="text-sm text-blue-800">
                          <span className="font-medium">Current Level: </span>
                          {feedbackData.progressTracking.currentLevel}
                        </p>
                        <h5 className="text-sm font-medium text-blue-800 mt-2 mb-1">Next Steps:</h5>
                        <ul className="list-disc list-inside text-sm text-blue-700">
                          {feedbackData.progressTracking.nextSteps.map((step, index) => (
                            <li key={index}>{step}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="mt-4 flex justify-center items-center h-64">
                    <div className="text-center">
                      <HelpCircle className="h-12 w-12 text-gray-400 mx-auto" />
                      <p className="mt-2 text-gray-500">Write at least 50 characters to receive feedback</p>
                    </div>
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