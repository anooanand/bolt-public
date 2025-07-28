import React, { useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Target, BookOpen, Lightbulb, Star, Trophy, Sparkles, Heart, Gift, Award } from 'lucide-react';
import { EnhancedNSWFeedback } from './EnhancedNSWFeedback';

interface EssayEvaluationModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: string;
  textType: string;
}

export function EssayEvaluationModal({ isOpen, onClose, content, textType }: EssayEvaluationModalProps) {
  const [showNSWReport, setShowNSWReport] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && content.trim()) {
      setIsLoading(true);
      // Simulate loading time for better UX
      setTimeout(() => {
        setIsLoading(false);
        setShowNSWReport(true);
      }, 1500);
    }
  }, [isOpen, content, textType]);

  const wordCount = content.trim().split(/\s+/).filter(word => word.length > 0).length;
  const targetLength = wordCount >= 200 && wordCount <= 300 ? "Ideal" : 
                      wordCount < 200 ? "Too Short" : "Too Long";

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-6xl w-full max-h-[95vh] overflow-y-auto border-4 border-blue-300 dark:border-blue-700">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 p-6 border-b-4 border-blue-300 dark:border-blue-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-4 shadow-lg">
                <Award className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                  NSW Selective Writing Assessment
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Official band-level scoring and detailed feedback
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors bg-white dark:bg-gray-700 p-2 rounded-full shadow-md hover:shadow-lg transform hover:scale-110 transition-all duration-300"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="relative">
                <div className="animate-spin rounded-full h-20 w-20 border-4 border-blue-200 border-t-blue-600 mb-6"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Award className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-3">
                Analyzing Your Writing...
              </span>
              <p className="text-gray-600 dark:text-gray-300 text-center max-w-md text-lg">
                Our NSW Selective expert is carefully reviewing your {textType} writing using official assessment criteria
              </p>
              <div className="mt-6 flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
                  Ideas & Content (30%)
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-1 text-blue-500" />
                  Structure & Organization (25%)
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-1 text-purple-500" />
                  Language & Vocabulary (25%)
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-1 text-orange-500" />
                  Grammar & Spelling (20%)
                </div>
              </div>
            </div>
          ) : showNSWReport ? (
            <div className="space-y-6">
              {/* Quick Stats Before Report */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 p-4 rounded-xl border-2 border-blue-300 dark:border-blue-700 shadow-md">
                  <div className="flex items-center mb-2">
                    <BookOpen className="w-5 h-5 text-blue-600 mr-2" />
                    <span className="font-semibold text-blue-800 dark:text-blue-200">Word Count</span>
                  </div>
                  <div className="text-center">
                    <span className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                      {wordCount}
                    </span>
                    <div className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                      {targetLength === 'Ideal' && (
                        <span className="flex items-center justify-center">
                          <Star className="w-4 h-4 text-yellow-500 mr-1" /> 
                          Perfect length!
                        </span>
                      )}
                      {targetLength === 'Too Short' && (
                        <span className="flex items-center justify-center">
                          <AlertCircle className="w-4 h-4 text-amber-500 mr-1" /> 
                          Try adding more details
                        </span>
                      )}
                      {targetLength === 'Too Long' && (
                        <span className="flex items-center justify-center">
                          <AlertCircle className="w-4 h-4 text-amber-500 mr-1" /> 
                          Consider being more concise
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 p-4 rounded-xl border-2 border-green-300 dark:border-green-700 shadow-md">
                  <div className="flex items-center mb-2">
                    <Target className="w-5 h-5 text-green-600 mr-2" />
                    <span className="font-semibold text-green-800 dark:text-green-200">Text Type</span>
                  </div>
                  <div className="text-center">
                    <span className="text-xl font-bold text-green-700 dark:text-green-300 capitalize">
                      {textType}
                    </span>
                    <div className="text-sm text-green-600 dark:text-green-400 mt-1">
                      NSW Selective Format
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 p-4 rounded-xl border-2 border-purple-300 dark:border-purple-700 shadow-md">
                  <div className="flex items-center mb-2">
                    <Award className="w-5 h-5 text-purple-600 mr-2" />
                    <span className="font-semibold text-purple-800 dark:text-purple-200">Assessment</span>
                  </div>
                  <div className="text-center">
                    <span className="text-xl font-bold text-purple-700 dark:text-purple-300">
                      Band Scoring
                    </span>
                    <div className="text-sm text-purple-600 dark:text-purple-400 mt-1">
                      Official NSW Criteria
                    </div>
                  </div>
                </div>
              </div>

              {/* NSW Feedback Report */}
              <EnhancedNSWFeedback essay={content} textType={textType} />

              {/* Additional Tips Section */}
              <div className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-6 rounded-xl border-2 border-indigo-200 dark:border-indigo-700">
                <h3 className="text-xl font-bold text-indigo-800 dark:text-indigo-200 mb-4 flex items-center">
                  <Lightbulb className="w-6 h-6 mr-2 text-yellow-500" />
                  NSW Selective Exam Tips
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-indigo-200 dark:border-indigo-700">
                    <h4 className="font-semibold text-indigo-700 dark:text-indigo-300 mb-2">Time Management</h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                      <li>• Spend 5 minutes planning your writing</li>
                      <li>• Write for 20 minutes</li>
                      <li>• Save 5 minutes for checking and editing</li>
                    </ul>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-indigo-200 dark:border-indigo-700">
                    <h4 className="font-semibold text-indigo-700 dark:text-indigo-300 mb-2">Band 5-6 Strategies</h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                      <li>• Use sophisticated vocabulary</li>
                      <li>• Vary your sentence structures</li>
                      <li>• Include specific examples and details</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-10 h-10 text-blue-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                Ready for NSW Assessment
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-lg mb-6 max-w-md mx-auto">
                Your {textType} writing will be evaluated using official NSW Selective criteria
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Assessment based on NSW Department of Education criteria
          </div>
          <div className="flex space-x-3">
            {showNSWReport && (
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
              >
                Print Report
              </button>
            )}
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 font-semibold shadow-lg"
            >
              Close Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
