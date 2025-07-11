import React, { useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Target, BookOpen, Lightbulb, Star, Trophy, Sparkles, Heart, Gift } from 'lucide-react';
import { evaluateEssay } from '../lib/openai';

interface EssayEvaluationModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: string;
  textType: string;
}

interface EvaluationResult {
  overallScore: number;
  strengths: string[];
  areasForImprovement: string[];
  specificFeedback: {
    structure: string;
    language: string;
    ideas: string;
    mechanics: string;
  };
  nextSteps: string[];
  wordCount: number;
  targetLength: string;
  gradeLevel: string;
}

export function EssayEvaluationModal({ isOpen, onClose, content, textType }: EssayEvaluationModalProps) {
  const [evaluation, setEvaluation] = useState<EvaluationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && content.trim()) {
      evaluateEssayContent();
    }
  }, [isOpen, content, textType]);

  const evaluateEssayContent = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await evaluateEssay(content, textType);
      
      // Calculate additional metrics
      const wordCount = content.trim().split(/\s+/).filter(word => word.length > 0).length;
      const targetLength = wordCount >= 200 && wordCount <= 300 ? "Ideal" : 
                          wordCount < 200 ? "Too Short" : "Too Long";
      const gradeLevel = "Year 6-7 Level";

      setEvaluation({
        ...result,
        wordCount,
        targetLength,
        gradeLevel
      });
    } catch (err) {
      setError('Failed to evaluate essay. Please try again.');
      console.error('Evaluation error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600 dark:text-green-400';
    if (score >= 6) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getScoreBackground = (score: number) => {
    if (score >= 8) return 'bg-green-100 dark:bg-green-900/30';
    if (score >= 6) return 'bg-yellow-100 dark:bg-yellow-900/30';
    return 'bg-red-100 dark:bg-red-900/30';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border-4 border-blue-300 dark:border-blue-700">
        <div className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 p-6 border-b-4 border-blue-300 dark:border-blue-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-4 shadow-lg">
                <Trophy className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                Your Writing Report Card!
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors bg-white dark:bg-gray-700 p-2 rounded-full shadow-md hover:shadow-lg transform hover:scale-110 transition-all duration-300"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-8">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mb-6"></div>
              <span className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                Reading your amazing story...
              </span>
              <p className="text-gray-600 dark:text-gray-300 text-center max-w-md">
                Our friendly AI teacher is looking at your writing and getting ready to give you helpful feedback!
              </p>
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertCircle className="w-10 h-10 text-red-500" />
              </div>
              <h3 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">Oops! Something went wrong</h3>
              <p className="text-gray-700 dark:text-gray-300 text-lg mb-6 max-w-md mx-auto">
                We couldn't read your story right now. Let's try again in a moment!
              </p>
              <button
                onClick={evaluateEssayContent}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 font-bold text-lg shadow-lg transform hover:scale-105"
              >
                Try Again
              </button>
            </div>
          ) : evaluation ? (
            <div className="space-y-6">
              {/* Overall Score */}
              <div className={`p-8 rounded-2xl ${getScoreBackground(evaluation.overallScore)} border-4 border-blue-200 dark:border-blue-800 shadow-lg`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                      <Trophy className="w-7 h-7 text-yellow-500 mr-3" />
                      Your Score
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 text-lg mt-1">
                      Based on NSW Selective Writing
                    </p>
                  </div>
                  <div className="text-right">
                    <div className={`text-5xl font-bold ${getScoreColor(evaluation.overallScore)}`}>
                      {evaluation.overallScore}
                      <span className="text-2xl font-normal text-gray-500">/10</span>
                    </div>
                    <div className="text-base text-gray-600 dark:text-gray-300 mt-1">
                      {evaluation.gradeLevel}
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 p-5 rounded-2xl border-3 border-blue-300 dark:border-blue-700 shadow-md">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3 shadow-md">
                      <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-bold text-lg text-blue-800 dark:text-blue-200">Word Count</span>
                  </div>
                  <div className="text-center">
                    <span className="text-3xl font-bold text-blue-700 dark:text-blue-300">
                      {evaluation.wordCount}
                    </span>
                    <span className="text-base text-blue-600 dark:text-blue-400 ml-2 font-medium">
                      {evaluation.targetLength === 'Ideal' && <span className="flex items-center justify-center mt-1"><Star className="w-5 h-5 text-yellow-500 mr-1" /> Perfect length!</span>}
                      {evaluation.targetLength === 'Too Short' && <span className="flex items-center justify-center mt-1"><AlertCircle className="w-5 h-5 text-amber-500 mr-1" /> A bit short</span>}
                      {evaluation.targetLength === 'Too Long' && <span className="flex items-center justify-center mt-1"><AlertCircle className="w-5 h-5 text-amber-500 mr-1" /> A bit long</span>}
                    </span>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 p-5 rounded-2xl border-3 border-green-300 dark:border-green-700 shadow-md">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-3 shadow-md">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-bold text-lg text-green-800 dark:text-green-200">Strengths</span>
                  </div>
                  <div className="text-center">
                    <span className="text-3xl font-bold text-green-700 dark:text-green-300">
                      {evaluation.strengths.length}
                    </span>
                    <span className="text-base text-green-600 dark:text-green-400 ml-2 font-medium flex items-center justify-center mt-1">
                      <Star className="w-5 h-5 text-yellow-500 mr-1" />
                      Great things!
                    </span>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-amber-100 to-amber-200 dark:from-amber-900/30 dark:to-amber-800/30 p-5 rounded-2xl border-3 border-amber-300 dark:border-amber-700 shadow-md">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center mr-3 shadow-md">
                      <Target className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-bold text-lg text-amber-800 dark:text-amber-200">To Improve</span>
                  </div>
                  <div className="text-center">
                    <span className="text-3xl font-bold text-amber-700 dark:text-amber-300">
                      {evaluation.areasForImprovement.length}
                    </span>
                    <span className="text-base text-amber-600 dark:text-amber-400 ml-2 font-medium flex items-center justify-center mt-1">
                      <Gift className="w-5 h-5 text-purple-500 mr-1" />
                      Next goals
                    </span>
                  </div>
                </div>
              </div>

              {/* Detailed Feedback */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Strengths */}
                <div className="bg-green-50 dark:bg-green-900/30 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-4 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    What You Did Well
                  </h4>
                  <ul className="space-y-2">
                    {evaluation.strengths.map((strength, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-green-700 dark:text-green-300">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Areas for Improvement */}
                <div className="bg-amber-50 dark:bg-amber-900/30 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold text-amber-800 dark:text-amber-200 mb-4 flex items-center">
                    <Target className="w-5 h-5 mr-2" />
                    Areas to Focus On
                  </h4>
                  <ul className="space-y-2">
                    {evaluation.areasForImprovement.map((area, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-amber-700 dark:text-amber-300">{area}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Specific Feedback */}
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Detailed Feedback
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Structure & Organization</h5>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{evaluation.specificFeedback.structure}</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Language & Style</h5>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{evaluation.specificFeedback.language}</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Ideas & Content</h5>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{evaluation.specificFeedback.ideas}</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Grammar & Mechanics</h5>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{evaluation.specificFeedback.mechanics}</p>
                  </div>
                </div>
              </div>

              {/* Next Steps */}
              <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-lg">
                <h4 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-4 flex items-center">
                  <Lightbulb className="w-5 h-5 mr-2" />
                  Next Steps for Improvement
                </h4>
                <ol className="space-y-2">
                  {evaluation.nextSteps.map((step, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3 flex-shrink-0">
                        {index + 1}
                      </div>
                      <span className="text-blue-700 dark:text-blue-300">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          ) : null}
        </div>

        <div className="flex justify-end p-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
