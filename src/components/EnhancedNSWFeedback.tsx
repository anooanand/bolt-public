import React from 'react';
import { Award, Target, TrendingUp, CheckCircle, AlertCircle, Star } from 'lucide-react';
import openai from '../lib/openai';

// NSW text type guides for enhanced OpenAI prompts
const NSW_TEXT_TYPE_GUIDES = {
  narrative: {
    structure: "Clear beginning, middle, and end with well-developed characters and setting",
    language: "Descriptive language, dialogue, and sensory details",
    focus: "Plot development, character growth, and engaging storytelling"
  },
  persuasive: {
    structure: "Introduction with clear position, supporting arguments with evidence, and strong conclusion",
    language: "Persuasive devices, emotive language, and rhetorical questions",
    focus: "Logical arguments, addressing counterpoints, and call to action"
  },
  expository: {
    structure: "Introduction, informative paragraphs with facts, and summarizing conclusion",
    language: "Clear, precise language with technical terms where appropriate",
    focus: "Factual information, explanations, and educational content"
  },
  reflective: {
    structure: "Introduction to experience, analysis of feelings/thoughts, and conclusion with lessons learned",
    language: "Personal voice, thoughtful analysis, and introspective tone",
    focus: "Personal growth, insights, and meaningful reflection"
  },
  descriptive: {
    structure: "Introduction to subject, detailed description paragraphs, and concluding impression",
    language: "Vivid imagery, sensory details, and figurative language",
    focus: "Creating a clear picture in the reader's mind through detailed observation"
  }
};

// Band color mapping for visual display
const getBandColor = (band) => {
  const colors = {
    6: 'bg-emerald-500 text-white border-emerald-600',
    5: 'bg-blue-500 text-white border-blue-600',
    4: 'bg-green-500 text-white border-green-600',
    3: 'bg-yellow-500 text-white border-yellow-600',
    2: 'bg-orange-500 text-white border-orange-600',
    1: 'bg-red-500 text-white border-red-600'
  };
  return colors[band] || colors[1];
};

// Band progress bar color
const getBandProgressColor = (band) => {
  const colors = {
    6: 'bg-emerald-400',
    5: 'bg-blue-400',
    4: 'bg-green-400',
    3: 'bg-yellow-400',
    2: 'bg-orange-400',
    1: 'bg-red-400'
  };
  return colors[band] || colors[1];
};

// Enhanced feedback component with band-level scoring display
export function EnhancedNSWFeedback({ essay, textType }) {
  const [feedback, setFeedback] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  
  const getFeedback = async () => {
    setLoading(true);
    try {
      // Call the actual AI feedback function from openai.ts
      const result = await openai.getNSWSelectiveFeedback(essay, textType);
      setFeedback(result);
    } catch (error) {
      console.error("Error getting feedback:", error);
    } finally {
      setLoading(false);
    }
  };
  
  React.useEffect(() => {
    if (essay && essay.trim().length > 50) {
      getFeedback();
    }
  }, [essay, textType]);
  
  if (loading) {
    return (
      <div className="p-8 text-center bg-white rounded-lg shadow-lg">
        <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
        <div className="text-lg font-medium text-gray-700">Analyzing your writing with NSW Selective criteria...</div>
        <div className="text-sm text-gray-500 mt-2">This may take a few moments</div>
      </div>
    );
  }
  
  if (!feedback) {
    return null;
  }
  
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header with Overall Band Score */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">NSW Selective Writing Assessment Report</h2>
            <p className="text-blue-100">Comprehensive evaluation based on official NSW criteria</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-blue-100 mb-1">Text Type</div>
            <div className="text-lg font-semibold capitalize">{textType}</div>
          </div>
        </div>
      </div>

      {/* Overall Score Section */}
      <div className="p-6 bg-gray-50 border-b">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Overall Band */}
          <div className="text-center">
            <div className="mb-3">
              <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full text-2xl font-bold ${getBandColor(feedback.overallBand)}`}>
                Band {feedback.overallBand}
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">Overall Band Level</h3>
            <p className="text-sm text-gray-600">{feedback.bandDescription}</p>
          </div>

          {/* Total Score */}
          <div className="text-center">
            <div className="mb-3">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 text-blue-800 text-xl font-bold border-2 border-blue-200">
                {feedback.totalScore}/30
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">Total Score</h3>
            <p className="text-sm text-gray-600">NSW Selective Standard</p>
          </div>

          {/* Performance Level */}
          <div className="text-center">
            <div className="mb-3">
              <Award className={`w-12 h-12 mx-auto ${feedback.overallBand >= 5 ? 'text-emerald-500' : feedback.overallBand >= 3 ? 'text-yellow-500' : 'text-orange-500'}`} />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">Performance</h3>
            <p className="text-sm text-gray-600">{feedback.bandDetails}</p>
          </div>
        </div>
      </div>

      {/* Overall Comment */}
      {feedback.overallComment && (
        <div className="p-6 bg-blue-50 border-b">
          <div className="flex items-start">
            <CheckCircle className="w-6 h-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-blue-800 mb-2">Overall Assessment</h4>
              <p className="text-blue-700 leading-relaxed">{feedback.overallComment}</p>
            </div>
          </div>
        </div>
      )}

      {/* Criteria Breakdown */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
          <Target className="w-6 h-6 mr-2 text-blue-600" />
          Detailed Criteria Assessment
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {feedback.criteriaFeedback && Object.entries(feedback.criteriaFeedback).map(([criterion, data]) => (
            <div key={criterion} className="bg-gray-50 rounded-lg p-5 border border-gray-200">
              {/* Criterion Header */}
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-gray-800 text-lg">
                  {criterion.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </h4>
                <div className="flex items-center space-x-2">
                  <div className={`px-3 py-1 rounded-full text-sm font-bold ${getBandColor(data.band)}`}>
                    Band {data.band}
                  </div>
                  <div className="text-lg font-bold text-gray-700">
                    {data.score}/{data.maxScore}
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${getBandProgressColor(data.band)}`}
                    style={{ width: `${(data.score / data.maxScore) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Strengths */}
              {data.strengths && data.strengths.length > 0 && (
                <div className="mb-3">
                  <h5 className="font-medium text-green-700 mb-2 flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    Strengths
                  </h5>
                  <ul className="space-y-1">
                    {data.strengths.map((item, index) => (
                      <li key={index} className="text-green-600 text-sm flex items-start">
                        <CheckCircle className="w-3 h-3 mr-2 mt-1 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Improvements */}
              {data.improvements && data.improvements.length > 0 && (
                <div className="mb-3">
                  <h5 className="font-medium text-amber-700 mb-2 flex items-center">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    Areas for Improvement
                  </h5>
                  <ul className="space-y-1">
                    {data.improvements.map((item, index) => (
                      <li key={index} className="text-amber-600 text-sm flex items-start">
                        <AlertCircle className="w-3 h-3 mr-2 mt-1 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Suggestions */}
              {data.suggestions && data.suggestions.length > 0 && (
                <div>
                  <h5 className="font-medium text-blue-700 mb-2">Specific Suggestions</h5>
                  <ul className="space-y-1">
                    {data.suggestions.map((item, index) => (
                      <li key={index} className="text-blue-600 text-sm flex items-start">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 mt-2 flex-shrink-0"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Action Items Section */}
      <div className="p-6 bg-gray-50 border-t">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Priority Focus */}
          {feedback.priorityFocus && feedback.priorityFocus.length > 0 && (
            <div className="bg-red-50 rounded-lg p-4 border border-red-200">
              <h4 className="font-semibold text-red-800 mb-3 flex items-center">
                <Target className="w-5 h-5 mr-2" />
                Priority Focus Areas
              </h4>
              <ul className="space-y-2">
                {feedback.priorityFocus.map((item, index) => (
                  <li key={index} className="text-red-700 text-sm font-medium">
                    {index + 1}. {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Exam Strategies */}
          {feedback.examStrategies && feedback.examStrategies.length > 0 && (
            <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
              <h4 className="font-semibold text-purple-800 mb-3 flex items-center">
                <Award className="w-5 h-5 mr-2" />
                Exam Strategies
              </h4>
              <ul className="space-y-2">
                {feedback.examStrategies.map((item, index) => (
                  <li key={index} className="text-purple-700 text-sm">
                    • {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Interactive Questions */}
        {feedback.interactiveQuestions && feedback.interactiveQuestions.length > 0 && (
          <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-3">Questions for Reflection</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {feedback.interactiveQuestions.map((question, index) => (
                <div key={index} className="text-blue-700 text-sm bg-white p-3 rounded border">
                  {question}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Revision Tasks */}
        {feedback.revisionSuggestions && feedback.revisionSuggestions.length > 0 && (
          <div className="mt-6 bg-green-50 rounded-lg p-4 border border-green-200">
            <h4 className="font-semibold text-green-800 mb-3">Next Steps - Revision Tasks</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {feedback.revisionSuggestions.map((task, index) => (
                <div key={index} className="text-green-700 text-sm bg-white p-3 rounded border flex items-start">
                  <div className="w-6 h-6 bg-green-100 text-green-800 rounded-full flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0 mt-0.5">
                    {index + 1}
                  </div>
                  {task}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 bg-gray-100 text-center text-sm text-gray-600">
        <p>This assessment is based on NSW Selective School writing criteria. Keep practicing to improve your band level!</p>
      </div>
    </div>
  );
}
