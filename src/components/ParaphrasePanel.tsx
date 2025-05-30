import React, { useState } from 'react';
import { Wand2, Loader2 } from 'lucide-react';
import { generateParaphrases } from '../lib/openai';

interface ParaphrasePanelProps {
  selectedText: string;
  onApplyParaphrase: (replacement: string, start: number, end: number) => void;
}

export function ParaphrasePanel({ selectedText, onApplyParaphrase }: ParaphrasePanelProps) {
  const [suggestions, setSuggestions] = useState<Array<{
    original: string;
    alternatives: string[];
    start: number;
    end: number;
  }>>([]);
  const [isLoading, setIsLoading] = useState(false);

  const generateAlternatives = async () => {
    if (!selectedText?.trim()) {
      setSuggestions([]);
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await generateParaphrases(selectedText);
      if (response && response.suggestions) {
        setSuggestions(response.suggestions);
      }
    } catch (error) {
      console.error('Error generating paraphrases:', error);
    }
    setIsLoading(false);
  };

  return (
    <div className="h-full bg-white dark:bg-gray-900 rounded-lg shadow-sm flex flex-col">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Wand2 className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Paraphrase Assistant</h2>
          </div>
          <button
            onClick={generateAlternatives}
            disabled={!selectedText?.trim() || isLoading}
            className="px-3 py-1.5 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium flex items-center"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Wand2 className="h-4 w-4 mr-2" />
                Generate Alternatives
              </>
            )}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {!selectedText ? (
          <div className="text-center text-gray-500 dark:text-gray-400 mt-8">
            <p>Select some text in your writing</p>
            <p className="text-sm mt-2">to see paraphrasing suggestions.</p>
          </div>
        ) : suggestions.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 mt-8">
            <p>Click "Generate Alternatives"</p>
            <p className="text-sm mt-2">to get paraphrasing suggestions.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {suggestions.map((suggestion, index) => (
              <div key={index} className="bg-purple-50 dark:bg-purple-900/30 rounded-lg p-4">
                <div className="text-sm text-purple-800 dark:text-purple-200 font-medium mb-2">
                  Original:
                </div>
                <div className="text-gray-700 dark:text-gray-300 mb-4 text-sm">
                  {suggestion.original}
                </div>
                <div className="text-sm text-purple-800 dark:text-purple-200 font-medium mb-2">
                  Alternatives:
                </div>
                <div className="space-y-2">
                  {suggestion.alternatives.map((alt, altIndex) => (
                    <div
                      key={altIndex}
                      className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-md p-2"
                    >
                      <div className="text-sm text-gray-700 dark:text-gray-300">{alt}</div>
                      <button
                        onClick={() => onApplyParaphrase(alt, suggestion.start, suggestion.end)}
                        className="text-xs px-2 py-1 text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 font-medium"
                      >
                        Apply
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}