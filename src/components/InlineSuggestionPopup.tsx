// File: src/components/InlineSuggestionPopup.tsx
// Copy this entire file and replace your existing InlineSuggestionPopup.tsx

import React, { useEffect, useRef } from 'react';

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
  isLoading?: boolean;
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
  isLoading = false,
}: InlineSuggestionPopupProps) {
  const popupRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close popup
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  // Handle escape key to close popup
  useEffect(() => {
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [onClose]);

  // Split suggestions if they're in comma-separated format
  const suggestions = suggestion.split(',').map(s => s.trim()).filter(s => s.length > 0);

  // Ensure popup stays within viewport
  const adjustedPosition = {
    x: Math.min(position.x, window.innerWidth - 320), // 320px is max popup width
    y: Math.min(position.y, window.innerHeight - 200), // 200px is approximate popup height
  };

  return (
    <div
      ref={popupRef}
      className="absolute z-50 bg-white rounded-lg shadow-xl border border-gray-200 p-4 max-w-[300px] min-w-[250px] animate-in fade-in-0 zoom-in-95 duration-200"
      style={{
        top: `${adjustedPosition.y}px`,
        left: `${adjustedPosition.x}px`,
      }}
    >
      <div className="space-y-3">
        {/* Original text */}
        <div className="text-sm">
          <span className="text-gray-500 font-medium">Original: </span>
          <span className="font-medium text-gray-900 bg-yellow-100 px-1 rounded">
            {original}
          </span>
        </div>

        {/* Suggestions */}
        <div className="text-sm space-y-2">
          <span className="text-gray-500 font-medium">Suggestions: </span>
          <div className="space-y-1">
            {suggestions.length > 0 ? (
              suggestions.map((s, i) => (
                <div key={i} className="ml-2">
                  <button
                    onClick={() => onApply(s, start, end)}
                    className="text-blue-600 hover:text-blue-800 hover:underline font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-left w-full"
                    disabled={isLoading}
                  >
                    • {s}
                  </button>
                </div>
              ))
            ) : (
              <div className="ml-2 text-gray-400 italic">
                {isLoading ? 'Loading suggestions...' : 'No suggestions available'}
              </div>
            )}
          </div>
        </div>

        {/* Explanation */}
        {explanation && (
          <div className="text-xs text-gray-600 border-t border-gray-100 pt-2">
            <span className="font-medium">Why: </span>
            {explanation}
          </div>
        )}

        {/* Action buttons */}
        <div className="flex flex-wrap gap-2 border-t border-gray-100 pt-3">
          <button
            onClick={onParaphrase}
            disabled={isLoading}
            className="text-xs px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
            title="Get a rephrased version"
          >
            <span>🔄</span>
            {isLoading ? 'Loading...' : 'Rephrase'}
          </button>
          
          <button
            onClick={onThesaurus}
            disabled={isLoading}
            className="text-xs px-3 py-1.5 bg-purple-50 text-purple-700 hover:bg-purple-100 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
            title="Find synonyms"
          >
            <span>📚</span>
            {isLoading ? 'Loading...' : 'Synonyms'}
          </button>
          
          <button
            onClick={onClose}
            disabled={isLoading}
            className="text-xs px-3 py-1.5 bg-gray-50 text-gray-700 hover:bg-gray-100 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
            title="Close suggestions"
          >
            <span>❌</span>
            Close
          </button>
        </div>

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex items-center justify-center py-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-xs text-gray-500">Getting suggestions...</span>
          </div>
        )}
      </div>
    </div>
  );
}

