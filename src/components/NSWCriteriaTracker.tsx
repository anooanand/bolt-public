import React from 'react';
import { useEffect, useState } from 'react';

// Custom hook for NSW scoring
function useNSWScoring(essay) {
  const [setAScore, setSetAScore] = useState({ content: 0, structure: 0, style: 0 });
  const [setBScore, setSetBScore] = useState({ sentences: 0, punctuation: 0, spelling: 0 });
  
  useEffect(() => {
    if (!essay || essay.trim().length === 0) {
      return;
    }
    
    // Simple scoring algorithm based on essay length and complexity
    // In a real implementation, this would use more sophisticated analysis
    const calculateScores = (text) => {
      // Basic metrics
      const wordCount = text.split(/\s+/).filter(Boolean).length;
      const sentenceCount = text.split(/[.!?]+/).filter(Boolean).length;
      const paragraphCount = text.split(/\n\s*\n/).filter(Boolean).length;
      const uniqueWords = new Set(text.toLowerCase().match(/\b[a-z']+\b/g)).size;
      const avgWordLength = text.match(/\b[a-z']+\b/gi)?.reduce((sum, word) => sum + word.length, 0) / wordCount || 0;
      
      // Spelling check (simplified)
      const commonMisspellings = ['recieve', 'seperate', 'definately', 'occured', 'untill', 'accomodate'];
      const spellingErrors = commonMisspellings.reduce((count, word) => {
        const regex = new RegExp(`\\b${word}\\b`, 'gi');
        return count + (text.match(regex)?.length || 0);
      }, 0);
      
      // Punctuation check (simplified)
      const punctuationMarks = text.match(/[,.;:!?'"()[\]{}]/g)?.length || 0;
      const punctuationVariety = new Set(text.match(/[,.;:!?'"()[\]{}]/g)).size;
      
      // Set A scores (out of 5 each)
      const contentScore = Math.min(5, Math.max(1, Math.floor(wordCount / 100) + (uniqueWords / wordCount > 0.6 ? 1 : 0)));
      const structureScore = Math.min(5, Math.max(1, paragraphCount + (paragraphCount > 1 && paragraphCount < wordCount / 50 ? 1 : 0)));
      const styleScore = Math.min(5, Math.max(1, Math.floor(avgWordLength / 1.2) + (uniqueWords / wordCount > 0.7 ? 1 : 0)));
      
      // Set B scores
      const sentencesScore = Math.min(4, Math.max(1, Math.floor(sentenceCount / 5) + (sentenceCount > 0 && wordCount / sentenceCount > 10 ? 1 : 0)));
      const punctuationScore = Math.min(3, Math.max(1, Math.floor(punctuationMarks / 15) + (punctuationVariety > 3 ? 1 : 0)));
      const spellingScore = Math.min(3, Math.max(1, 3 - Math.min(2, spellingErrors)));
      
      return {
        setA: {
          content: contentScore,
          structure: structureScore,
          style: styleScore
        },
        setB: {
          sentences: sentencesScore,
          punctuation: punctuationScore,
          spelling: spellingScore
        }
      };
    };
    
    const scores = calculateScores(essay);
    setSetAScore(scores.setA);
    setSetBScore(scores.setB);
  }, [essay]);
  
  return { setAScore, setBScore };
}

// Progress bar component
function ProgressBar({ value, max, label }) {
  const getScoreColor = (score, max) => {
    const percentage = score / max;
    if (percentage >= 0.8) return 'bg-green-500';
    if (percentage >= 0.6) return 'bg-blue-500';
    if (percentage >= 0.4) return 'bg-yellow-500';
    return 'bg-red-500';
  };
  
  return (
    <div className="mb-3">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm font-medium text-gray-700">{value}/{max}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className={`h-2.5 rounded-full ${getScoreColor(value, max)}`} 
          style={{ width: `${(value / max) * 100}%` }}
        ></div>
      </div>
    </div>
  );
}

// NSW Criteria Tracker component
export function NSWCriteriaTracker({ essay }) {
  const { setAScore, setBScore } = useNSWScoring(essay);
  const setATotal = setAScore.content + setAScore.structure + setAScore.style;
  const setBTotal = setBScore.sentences + setBScore.punctuation + setBScore.spelling;
  const totalScore = setATotal + setBTotal;
  
  return (
    <div className="nsw-criteria-panel">
      <div className="criteria-group mb-6">
        <h4 className="text-md font-medium text-gray-900 mb-3">Set A (Content, Structure, Style) - {setATotal}/15</h4>
        <ProgressBar value={setAScore.content} max={5} label="Content" />
        <ProgressBar value={setAScore.structure} max={5} label="Structure" />
        <ProgressBar value={setAScore.style} max={5} label="Style" />
      </div>
      
      <div className="criteria-group mb-6">
        <h4 className="text-md font-medium text-gray-900 mb-3">Set B (Technical Accuracy) - {setBTotal}/10</h4>
        <ProgressBar value={setBScore.sentences} max={4} label="Sentences" />
        <ProgressBar value={setBScore.punctuation} max={3} label="Punctuation" />
        <ProgressBar value={setBScore.spelling} max={3} label="Spelling" />
      </div>
      
      <div className="total-score p-3 bg-gray-100 rounded-md">
        <div className="flex justify-between items-center">
          <span className="font-medium text-gray-900">Total Score:</span>
          <span className="font-bold text-lg text-indigo-700">{totalScore}/25</span>
        </div>
      </div>
      
      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
        <h5 className="font-medium text-blue-800 mb-2">Feedback:</h5>
        <ul className="space-y-1 text-blue-700 text-sm">
          {setAScore.content < 4 && (
            <li>• Try to include more relevant details and examples in your writing.</li>
          )}
          {setAScore.structure < 4 && (
            <li>• Work on organizing your ideas into clear paragraphs with a beginning, middle, and end.</li>
          )}
          {setAScore.style < 4 && (
            <li>• Use more varied and descriptive vocabulary to make your writing more engaging.</li>
          )}
          {setBScore.sentences < 3 && (
            <li>• Practice writing different types of sentences (simple, compound, complex).</li>
          )}
          {setBScore.punctuation < 2 && (
            <li>• Remember to use a variety of punctuation marks correctly.</li>
          )}
          {setBScore.spelling < 2 && (
            <li>• Check your spelling carefully, especially for commonly misspelled words.</li>
          )}
          {totalScore >= 20 && (
            <li>• Excellent work! Your writing shows strong skills across all criteria.</li>
          )}
        </ul>
      </div>
    </div>
  );
}
