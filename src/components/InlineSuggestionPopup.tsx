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

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  // Split suggestions if they're in "or" format
  const suggestions = suggestion.split(',').map(s => s.trim());

  return (
    <div
      ref={popupRef}
      className="absolute z-20 bg-white rounded-lg shadow-lg border border-gray-200 p-3 max-w-[300px]"
      style={{
        top: `${position.y}px`,
        left: `${position.x}px`,
      }}
    >
      <div className="space-y-2">
        <div className="text-sm">
          <span className="text-gray-500">Original: </span>
          <span className="font-medium">{original}</span>
        </div>
        <div className="text-sm space-y-1">
          <span className="text-gray-500">Suggestions: </span>
          {suggestions.map((s, i) => (
            <div key={i} className="ml-2">
              <button
                onClick={() => onApply(s, start, end)}
                className="text-blue-600 hover:text-blue-800 hover:underline font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {s}
              </button>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-600 border-t border-b border-gray-100 py-2">
          {explanation}
        </p>
        <div className="flex flex-wrap gap-1">
          <button
            onClick={onParaphrase}
            disabled={isLoading}
            className="text-xs px-2 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Loading...' : '🔄 Rephrase'}
          </button>
          <button
            onClick={onThesaurus}
            disabled={isLoading}
            className="text-xs px-2 py-1 bg-purple-50 text-purple-700 hover:bg-purple-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Loading...' : '📚 Find Synonyms'}
          </button>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="text-xs px-2 py-1 bg-gray-50 text-gray-700 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ❌ Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}