import React from 'react';
import { useState, useEffect } from 'react';

// Enhanced NSW Criteria Tracker component that works with the new backend feedback
export function EnhancedNSWCriteriaTracker({ feedbackData, essay }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Progress bar component with enhanced styling
  function ProgressBar({ value, max, label, color = 'blue' }) {
    const percentage = (value / max) * 100;
    
    const getColorClasses = (color, percentage) => {
      const baseColors = {
        blue: 'bg-blue-500',
        green: 'bg-green-500',
        yellow: 'bg-yellow-500',
        red: 'bg-red-500',
        purple: 'bg-purple-500'
      };
      
      if (percentage >= 80) return 'bg-green-500';
      if (percentage >= 60) return baseColors[color] || 'bg-blue-500';
      if (percentage >= 40) return 'bg-yellow-500';
      return 'bg-red-500';
    };
    
    return (
      <div className="mb-4">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{value}/{max}</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
          <div 
            className={`h-3 rounded-full transition-all duration-300 ${getColorClasses(color, percentage)}`} 
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {percentage.toFixed(0)}%
        </div>
      </div>
    );
  }

  // Criterion detail component
  function CriterionDetail({ criterion, data, color }) {
    const [showDetails, setShowDetails] = useState(false);
    
    return (
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-4">
        <div 
          className="cursor-pointer flex justify-between items-center"
          onClick={() => setShowDetails(!showDetails)}
        >
          <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{criterion}</h4>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {data.score}/{data.maxScore}
            </span>
            <svg 
              className={`w-5 h-5 transform transition-transform ${showDetails ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        
        <ProgressBar 
          value={data.score} 
          max={data.maxScore} 
          label="" 
          color={color}
        />
        
        {showDetails && (
          <div className="mt-4 space-y-3">
            {data.strengths && data.strengths.length > 0 && (
              <div>
                <h5 className="font-medium text-green-700 dark:text-green-400 mb-2">✓ Strengths:</h5>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
                  {data.strengths.map((strength, index) => (
                    <li key={index}>{strength}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {data.improvements && data.improvements.length > 0 && (
              <div>
                <h5 className="font-medium text-orange-700 dark:text-orange-400 mb-2">⚠ Areas for Improvement:</h5>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
                  {data.improvements.map((improvement, index) => (
                    <li key={index}>{improvement}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {data.suggestions && data.suggestions.length > 0 && (
              <div>
                <h5 className="font-medium text-blue-700 dark:text-blue-400 mb-2">💡 Suggestions:</h5>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
                  {data.suggestions.map((suggestion, index) => (
                    <li key={index}>{suggestion}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {data.nextSteps && data.nextSteps.length > 0 && (
              <div>
                <h5 className="font-medium text-purple-700 dark:text-purple-400 mb-2">🎯 Next Steps:</h5>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
                  {data.nextSteps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  // Calculate total score if feedbackData is available
  const calculateTotalScore = () => {
    if (!feedbackData || !feedbackData.criteriaFeedback) return 0;
    
    const criteria = feedbackData.criteriaFeedback;
    return (
      criteria.ideasAndContent.score +
      criteria.textStructureAndOrganization.score +
      criteria.languageFeaturesAndVocabulary.score +
      criteria.spellingPunctuationGrammar.score
    );
  };

  const totalScore = calculateTotalScore();
  const maxTotalScore = 40; // 10 points per criterion

  if (!feedbackData || !feedbackData.criteriaFeedback) {
    return (
      <div className="nsw-criteria-panel p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          NSW Selective Writing Criteria
        </h3>
        <div className="text-center py-8">
          <div className="text-gray-500 dark:text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Submit your writing to get detailed NSW Selective exam criteria feedback
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="nsw-criteria-panel p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          NSW Selective Writing Criteria
        </h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
        >
          {isExpanded ? 'Collapse All' : 'Expand All'}
        </button>
      </div>

      {/* Overall Comment */}
      {feedbackData.overallComment && (
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-2">Overall Assessment:</h4>
          <p className="text-blue-700 dark:text-blue-400 text-sm">{feedbackData.overallComment}</p>
        </div>
      )}

      {/* Total Score */}
      <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <span className="font-medium text-gray-900 dark:text-gray-100">Total Score:</span>
          <span className="font-bold text-2xl text-indigo-700 dark:text-indigo-400">{totalScore}/{maxTotalScore}</span>
        </div>
        <ProgressBar value={totalScore} max={maxTotalScore} label="" color="purple" />
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {((totalScore / maxTotalScore) * 100).toFixed(0)}% - {
            totalScore >= 32 ? 'Excellent' :
            totalScore >= 24 ? 'Good' :
            totalScore >= 16 ? 'Satisfactory' : 'Needs Improvement'
          }
        </div>
      </div>

      {/* Individual Criteria */}
      <div className="space-y-4">
        <CriterionDetail
          criterion="Ideas and Content (30%)"
          data={feedbackData.criteriaFeedback.ideasAndContent}
          color="green"
        />
        
        <CriterionDetail
          criterion="Text Structure and Organization (25%)"
          data={feedbackData.criteriaFeedback.textStructureAndOrganization}
          color="blue"
        />
        
        <CriterionDetail
          criterion="Language Features and Vocabulary (25%)"
          data={feedbackData.criteriaFeedback.languageFeaturesAndVocabulary}
          color="purple"
        />
        
        <CriterionDetail
          criterion="Spelling, Punctuation, and Grammar (20%)"
          data={feedbackData.criteriaFeedback.spellingPunctuationGrammar}
          color="red"
        />
      </div>

      {/* Priority Focus */}
      {feedbackData.priorityFocus && feedbackData.priorityFocus.length > 0 && (
        <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <h4 className="font-medium text-yellow-800 dark:text-yellow-300 mb-2">🎯 Priority Focus:</h4>
          <ul className="list-disc list-inside space-y-1 text-yellow-700 dark:text-yellow-400 text-sm">
            {feedbackData.priorityFocus.map((focus, index) => (
              <li key={index}>{focus}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Exam Strategies */}
      {feedbackData.examStrategies && feedbackData.examStrategies.length > 0 && (
        <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <h4 className="font-medium text-green-800 dark:text-green-300 mb-2">📚 Exam Strategies:</h4>
          <ul className="list-disc list-inside space-y-1 text-green-700 dark:text-green-400 text-sm">
            {feedbackData.examStrategies.map((strategy, index) => (
              <li key={index}>{strategy}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Interactive Questions */}
      {feedbackData.interactiveQuestions && feedbackData.interactiveQuestions.length > 0 && (
        <div className="mt-4 p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg">
          <h4 className="font-medium text-purple-800 dark:text-purple-300 mb-2">🤔 Think About This:</h4>
          <ul className="list-disc list-inside space-y-1 text-purple-700 dark:text-purple-400 text-sm">
            {feedbackData.interactiveQuestions.map((question, index) => (
              <li key={index}>{question}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Revision Suggestions */}
      {feedbackData.revisionSuggestions && feedbackData.revisionSuggestions.length > 0 && (
        <div className="mt-4 p-4 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg">
          <h4 className="font-medium text-indigo-800 dark:text-indigo-300 mb-2">✏️ Revision Suggestions:</h4>
          <ul className="list-disc list-inside space-y-1 text-indigo-700 dark:text-indigo-400 text-sm">
            {feedbackData.revisionSuggestions.map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default EnhancedNSWCriteriaTracker;
