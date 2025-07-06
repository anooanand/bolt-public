import React, { useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Target, BookOpen, Lightbulb } from 'lucide-react';
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Essay Evaluation - {textType}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <span className="ml-4 text-lg text-gray-600 dark:text-gray-300">
                Evaluating your essay...
              </span>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <p className="text-red-600 dark:text-red-400 text-lg">{error}</p>
              <button
                onClick={evaluateEssayContent}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Try Again
              </button>
            </div>
          ) : evaluation ? (
            <div className="space-y-6">
              {/* Overall Score */}
              <div className={`p-6 rounded-lg ${getScoreBackground(evaluation.overallScore)}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Overall Score
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      NSW Selective Writing Standards
                    </p>
                  </div>
                  <div className="text-right">
                    <div className={`text-4xl font-bold ${getScoreColor(evaluation.overallScore)}`}>
                      {evaluation.overallScore}/10
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      {evaluation.gradeLevel}
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                  <div className="flex items-center">
                    <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
                    <span className="font-medium text-gray-900 dark:text-white">Word Count</span>
                  </div>
                  <div className="mt-1">
                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {evaluation.wordCount}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-300 ml-2">
                      ({evaluation.targetLength})
                    </span>
                  </div>
                </div>

                <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" />
                    <span className="font-medium text-gray-900 dark:text-white">Strengths</span>
                  </div>
                  <div className="mt-1">
                    <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {evaluation.strengths.length}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-300 ml-2">
                      identified
                    </span>
                  </div>
                </div>

                <div className="bg-amber-50 dark:bg-amber-900/30 p-4 rounded-lg">
                  <div className="flex items-center">
                    <Target className="w-5 h-5 text-amber-600 dark:text-amber-400 mr-2" />
                    <span className="font-medium text-gray-900 dark:text-white">Focus Areas</span>
                  </div>
                  <div className="mt-1">
                    <span className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                      {evaluation.areasForImprovement.length}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-300 ml-2">
                      to improve
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

