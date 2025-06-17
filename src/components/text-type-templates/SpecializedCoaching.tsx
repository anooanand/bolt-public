import React from 'react';
import { VocabularyEnhancer } from './VocabularyEnhancer';
import { MistakeIdentifier } from './MistakeIdentifier';

interface SpecializedCoachingProps {
  textType?: string;
  content?: string;
}

export function SpecializedCoaching({ textType = '', content = '' }: SpecializedCoachingProps) {
  const handleGetSpecializedFeedback = async () => {
    if (content.trim().length > 50) {
      try {
        // Call the Netlify function directly
        const response = await fetch('/.netlify/functions/ai-operations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            operation: 'getSpecializedTextTypeFeedback',
            content,
            textType
          }),
        });
        
        if (!response.ok) {
          throw new Error(`API call failed with status: ${response.status}`);
        }
        
        const feedback = await response.json();
        console.log('Specialized feedback:', feedback);
        alert('Specialized feedback for your ' + textType + ' writing has been generated! Check the console for details.');
      } catch (err) {
        console.error('Error getting specialized feedback:', err);
        alert('Unable to generate specialized feedback at this time.');
      }
    } else {
      alert('Please write at least 50 characters before requesting specialized feedback.');
    }
  };

  return (
    <div className="flex space-x-2">
      <VocabularyEnhancer textType={textType} content={content} />
      <MistakeIdentifier textType={textType} content={content} />
      <button
        onClick={handleGetSpecializedFeedback}
        className="flex items-center px-3 py-1.5 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
        Get Specialized Feedback
      </button>
    </div>
   );
}