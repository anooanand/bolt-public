import React, { useState, useEffect } from 'react';
import { BookOpen, X } from 'lucide-react';

interface InlineSuggestionPopupProps {
  original: string;
  suggestion: string;
  explanation: string;
  position: { x: number; y: number };
  onApply: (suggestion: string, start: number, end: number) => void;
  onParaphrase: () => void;
  onThesaurus: () => void;
  onClose: () => void;
  start: number;
  end: number;
  isLoading: boolean;
  isDarkMode?: boolean;
}

export function InlineSuggestionPopup({
  original,
  suggestion,
  explanation,
  position,
  onApply,
  onParaphrase,
  onThesaurus,
  onClose,
  start,
  end,
  isLoading,
  isDarkMode = false
}: InlineSuggestionPopupProps) {
  const [selectedSuggestion, setSelectedSuggestion] = useState('');
  
  useEffect(() => {
    // If there are multiple suggestions (comma-separated), default to the first one
    if (suggestion.includes(',')) {
      setSelectedSuggestion(suggestion.split(',')[0].trim());
    } else {
      setSelectedSuggestion(suggestion);
    }
  }, [suggestion]);

  const handleApply = () => {
    onApply(selectedSuggestion, start, end);
  };

  const handleSuggestionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSuggestion(e.target.value);
  };

  const suggestions = suggestion.includes(',') 
    ? suggestion.split(',').map(s => s.trim()) 
    : [suggestion];

  return (
    <div 
      className={`absolute z-10 w-72 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800'} overflow-hidden`}
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
        maxWidth: '90vw'
      }}
    >
      <div className={`p-3 ${isDarkMode ? 'bg-gray-700' : 'bg-blue-50'} flex justify-between items-center`}>
        <h3 className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-blue-800'}`}>Writing Suggestion</h3>
        <button 
          onClick={onClose}
          className={`rounded-full p-1 ${isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-blue-100'}`}
        >
          <X size={16} className={isDarkMode ? 'text-gray-300' : 'text-blue-600'} />
        </button>
      </div>
      
      <div className="p-3 space-y-3">
        <div>
          <p className={`text-xs mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Original:</p>
          <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{original}</p>
        </div>
        
        <div>
          <p className={`text-xs mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Suggestion:</p>
          {suggestions.length > 1 ? (
            <select
              value={selectedSuggestion}
              onChange={handleSuggestionChange}
              className={`w-full p-1.5 text-sm rounded border ${
                isDarkMode 
                  ? 'bg-gray-700 text-gray-200 border-gray-600' 
                  : 'bg-white text-gray-800 border-gray-300'
              }`}
            >
              {suggestions.map((s, i) => (
                <option key={i} value={s}>{s}</option>
              ))}
            </select>
          ) : (
            <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{suggestion}</p>
          )}
        </div>
        
        <div>
          <p className={`text-xs mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Explanation:</p>
          <p className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{explanation}</p>
        </div>
        
        <div className="flex space-x-2 pt-1">
          <button
            onClick={handleApply}
            className={`flex-1 py-1.5 text-xs font-medium rounded ${
              isDarkMode 
                ? 'bg-blue-700 text-white hover:bg-blue-600' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            Apply
          </button>
          
          <button
            onClick={onParaphrase}
            disabled={isLoading}
            className={`flex-1 py-1.5 text-xs font-medium rounded ${
              isDarkMode 
                ? 'bg-gray-700 text-gray-200 hover:bg-gray-600 disabled:opacity-50' 
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:opacity-50'
            }`}
          >
            {isLoading ? 'Loading...' : 'Rephrase'}
          </button>
          
          <button
            onClick={onThesaurus}
            disabled={isLoading}
            className={`flex-1 py-1.5 text-xs font-medium rounded ${
              isDarkMode 
                ? 'bg-gray-700 text-gray-200 hover:bg-gray-600 disabled:opacity-50' 
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:opacity-50'
            }`}
          >
            {isLoading ? 'Loading...' : 'Synonyms'}
          </button>
        </div>
      </div>
    </div>
  );
}
