import React, { useState, useCallback, useMemo } from 'react';
import { Lightbulb, CheckCircle, AlertCircle, Info } from 'lucide-react';

interface HighlightedText {
  start: number;
  end: number;
  type: 'strength' | 'improvement' | 'suggestion';
  feedback: string;
  suggestion?: string;
  category?: string;
}

interface TextHighlighterProps {
  text: string;
  highlights: HighlightedText[];
  onHighlightClick: (highlight: HighlightedText) => void;
  className?: string;
}

interface SuggestionBubbleProps {
  highlight: HighlightedText;
  position: { x: number; y: number };
  onClose: () => void;
  onAccept?: (suggestion: string) => void;
}

const SuggestionBubble: React.FC<SuggestionBubbleProps> = ({ 
  highlight, 
  position, 
  onClose, 
  onAccept 
}) => {
  const getIcon = () => {
    switch (highlight.type) {
      case 'strength':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'improvement':
        return <AlertCircle className="h-4 w-4 text-amber-500" />;
      case 'suggestion':
        return <Lightbulb className="h-4 w-4 text-blue-500" />;
      default:
        return <Info className="h-4 w-4 text-gray-500" />;
    }
  };

  const getBubbleStyle = () => {
    switch (highlight.type) {
      case 'strength':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'improvement':
        return 'bg-amber-50 border-amber-200 text-amber-800';
      case 'suggestion':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  return (
    <div
      className={`absolute z-50 max-w-sm p-4 rounded-lg border shadow-lg ${getBubbleStyle()}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translateY(-100%)'
      }}
    >
      <div className="flex items-start space-x-2 mb-2">
        {getIcon()}
        <div className="flex-1">
          <div className="text-xs font-medium mb-1">
            {highlight.category || highlight.type.charAt(0).toUpperCase() + highlight.type.slice(1)}
          </div>
          <p className="text-sm">{highlight.feedback}</p>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 text-sm"
        >
          ×
        </button>
      </div>
      
      {highlight.suggestion && (
        <div className="mt-3 p-2 bg-white bg-opacity-50 rounded border-l-4 border-current">
          <p className="text-xs font-medium mb-1">Suggested improvement:</p>
          <p className="text-sm italic">"{highlight.suggestion}"</p>
          {onAccept && (
            <button
              onClick={() => onAccept(highlight.suggestion!)}
              className="mt-2 px-3 py-1 text-xs bg-white rounded border hover:bg-gray-50 transition-colors"
            >
              Apply Suggestion
            </button>
          )}
        </div>
      )}
      
      {/* Arrow pointing down */}
      <div 
        className={`absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent ${
          highlight.type === 'strength' ? 'border-t-green-200' :
          highlight.type === 'improvement' ? 'border-t-amber-200' :
          highlight.type === 'suggestion' ? 'border-t-blue-200' :
          'border-t-gray-200'
        }`}
      />
    </div>
  );
};

export const TextHighlighter: React.FC<TextHighlighterProps> = ({
  text,
  highlights,
  onHighlightClick,
  className = ''
}) => {
  const [activeBubble, setActiveBubble] = useState<{
    highlight: HighlightedText;
    position: { x: number; y: number };
  } | null>(null);

  // Sort highlights by start position to handle overlaps
  const sortedHighlights = useMemo(() => {
    return [...highlights].sort((a, b) => a.start - b.start);
  }, [highlights]);

  // Create text segments with highlighting
  const createHighlightedText = useCallback(() => {
    if (sortedHighlights.length === 0) {
      return [{ text, isHighlighted: false, highlight: null }];
    }

    const segments: Array<{
      text: string;
      isHighlighted: boolean;
      highlight: HighlightedText | null;
    }> = [];

    let currentIndex = 0;

    sortedHighlights.forEach((highlight) => {
      // Add text before highlight
      if (currentIndex < highlight.start) {
        segments.push({
          text: text.slice(currentIndex, highlight.start),
          isHighlighted: false,
          highlight: null
        });
      }

      // Add highlighted text
      segments.push({
        text: text.slice(highlight.start, highlight.end),
        isHighlighted: true,
        highlight
      });

      currentIndex = Math.max(currentIndex, highlight.end);
    });

    // Add remaining text
    if (currentIndex < text.length) {
      segments.push({
        text: text.slice(currentIndex),
        isHighlighted: false,
        highlight: null
      });
    }

    return segments;
  }, [text, sortedHighlights]);

  const handleHighlightClick = (
    event: React.MouseEvent,
    highlight: HighlightedText
  ) => {
    event.preventDefault();
    
    const rect = event.currentTarget.getBoundingClientRect();
    const position = {
      x: rect.left + rect.width / 2,
      y: rect.top
    };

    setActiveBubble({ highlight, position });
    onHighlightClick(highlight);
  };

  const getHighlightStyle = (type: HighlightedText['type']) => {
    const baseStyle = 'cursor-pointer transition-all duration-200 hover:shadow-sm';
    
    switch (type) {
      case 'strength':
        return `${baseStyle} bg-green-200 hover:bg-green-300 text-green-900`;
      case 'improvement':
        return `${baseStyle} bg-amber-200 hover:bg-amber-300 text-amber-900`;
      case 'suggestion':
        return `${baseStyle} bg-blue-200 hover:bg-blue-300 text-blue-900`;
      default:
        return `${baseStyle} bg-gray-200 hover:bg-gray-300 text-gray-900`;
    }
  };

  const segments = createHighlightedText();

  return (
    <div className={`relative ${className}`}>
      <div className="whitespace-pre-wrap leading-relaxed">
        {segments.map((segment, index) => (
          <span key={index}>
            {segment.isHighlighted && segment.highlight ? (
              <span
                className={getHighlightStyle(segment.highlight.type)}
                onClick={(e) => handleHighlightClick(e, segment.highlight!)}
                title={segment.highlight.feedback}
              >
                {segment.text}
              </span>
            ) : (
              segment.text
            )}
          </span>
        ))}
      </div>

      {/* Suggestion Bubble */}
      {activeBubble && (
        <SuggestionBubble
          highlight={activeBubble.highlight}
          position={activeBubble.position}
          onClose={() => setActiveBubble(null)}
          onAccept={(suggestion) => {
            // Handle suggestion acceptance
            console.log('Accepting suggestion:', suggestion);
            setActiveBubble(null);
          }}
        />
      )}
    </div>
  );
};

// Hook for generating highlights from AI feedback
export const useTextHighlights = (
  text: string,
  feedbackData: any
): HighlightedText[] => {
  return useMemo(() => {
    if (!feedbackData || !text) return [];

    const highlights: HighlightedText[] = [];

    // Process feedback items to create highlights
    if (feedbackData.feedbackItems) {
      feedbackData.feedbackItems.forEach((item: any) => {
        if (item.exampleFromText) {
          const startIndex = text.indexOf(item.exampleFromText);
          if (startIndex !== -1) {
            highlights.push({
              start: startIndex,
              end: startIndex + item.exampleFromText.length,
              type: item.type === 'praise' ? 'strength' : 
                    item.type === 'suggestion' ? 'suggestion' : 'improvement',
              feedback: item.text,
              suggestion: item.suggestionForImprovement,
              category: item.area
            });
          }
        }
      });
    }

    // Process grammar and spelling corrections
    if (feedbackData.corrections) {
      feedbackData.corrections.forEach((correction: any) => {
        if (correction.original) {
          const startIndex = text.indexOf(correction.original);
          if (startIndex !== -1) {
            highlights.push({
              start: startIndex,
              end: startIndex + correction.original.length,
              type: 'improvement',
              feedback: correction.explanation || 'Grammar or spelling correction needed',
              suggestion: correction.suggestion,
              category: 'Grammar & Spelling'
            });
          }
        }
      });
    }

    // Process vocabulary suggestions
    if (feedbackData.vocabularyEnhancements) {
      feedbackData.vocabularyEnhancements.forEach((enhancement: any) => {
        if (enhancement.original) {
          const startIndex = text.indexOf(enhancement.original);
          if (startIndex !== -1) {
            highlights.push({
              start: startIndex,
              end: startIndex + enhancement.original.length,
              type: 'suggestion',
              feedback: `Consider using a stronger word: "${enhancement.suggestion}"`,
              suggestion: enhancement.suggestion,
              category: 'Vocabulary Enhancement'
            });
          }
        }
      });
    }

    return highlights;
  }, [text, feedbackData]);
};

export default TextHighlighter;
