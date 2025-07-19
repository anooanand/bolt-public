import React from 'react';
import openai from '../lib/openai'; // Import the openai utility

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

// Enhanced feedback component with color-coded highlights
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
      <div className="p-4 text-center">
        <div className="animate-pulse">Analyzing your writing...</div>
      </div>
    );
  }
  
  if (!feedback) {
    return null;
  }
  
  return (
    <div className="mt-6 p-4 bg-white rounded-lg shadow-sm">
      <h3 className="text-lg font-medium text-gray-900 mb-4">NSW Selective Writing Feedback</h3>
      
      <div className="space-y-4">
        {feedback.overallComment && (
          <div className="p-3 bg-blue-50 rounded-md border border-blue-200">
            <h4 className="font-medium text-blue-800 mb-2">Overall Feedback</h4>
            <p className="text-blue-700">{feedback.overallComment}</p>
          </div>
        )}

        {feedback.criteriaFeedback && Object.entries(feedback.criteriaFeedback).map(([criterion, data]) => (
          <div key={criterion} className="p-3 bg-gray-50 rounded-md border border-gray-200">
            <h4 className="font-medium text-gray-800 mb-2">{criterion.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} ({data.score}/{data.maxScore})</h4>
            {data.strengths && data.strengths.length > 0 && (
              <div className="mb-2">
                <h5 className="font-medium text-green-700">Strengths:</h5>
                <ul className="list-disc pl-5 text-green-600 space-y-1">
                  {data.strengths.map((item, index) => <li key={index}>{item}</li>)}
                </ul>
              </div>
            )}
            {data.improvements && data.improvements.length > 0 && (
              <div className="mb-2">
                <h5 className="font-medium text-amber-700">Areas for Improvement:</h5>
                <ul className="list-disc pl-5 text-amber-600 space-y-1">
                  {data.improvements.map((item, index) => <li key={index}>{item}</li>)}
                </ul>
              </div>
            )}
            {data.suggestions && data.suggestions.length > 0 && (
              <div>
                <h5 className="font-medium text-blue-700">Suggestions:</h5>
                <ul className="list-disc pl-5 text-blue-600 space-y-1">
                  {data.suggestions.map((item, index) => <li key={index}>{item}</li>)}
                </ul>
              </div>
            )}
          </div>
        ))}

        {feedback.priorityFocus && feedback.priorityFocus.length > 0 && (
          <div className="p-3 bg-red-50 rounded-md border border-red-200">
            <h4 className="font-medium text-red-800 mb-2">Priority Focus for Next Time</h4>
            <ul className="list-disc pl-5 text-red-700 space-y-1">
              {feedback.priorityFocus.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
          </div>
        )}

        {feedback.interactiveQuestions && feedback.interactiveQuestions.length > 0 && (
          <div className="p-3 bg-purple-50 rounded-md border border-purple-200">
            <h4 className="font-medium text-purple-800 mb-2">Questions for Reflection</h4>
            <ul className="list-disc pl-5 text-purple-700 space-y-1">
              {feedback.interactiveQuestions.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
          </div>
        )}

        {feedback.revisionSuggestions && feedback.revisionSuggestions.length > 0 && (
          <div className="p-3 bg-green-50 rounded-md border border-green-200">
            <h4 className="font-medium text-green-800 mb-2">Specific Revision Tasks</h4>
            <ul className="list-disc pl-5 text-green-700 space-y-1">
              {feedback.revisionSuggestions.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
          </div>
        )}

      </div>
    </div>
  );
}

