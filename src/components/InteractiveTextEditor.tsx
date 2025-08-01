import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { AlertCircle, CheckCircle, Lightbulb, Loader2, Star, Target, Zap, Settings, Eye, EyeOff } from 'lucide-react';

// Types for the enhanced text editor
interface TextPosition {
  start: number;
  end: number;
}

interface HighlightRange extends TextPosition {
  id: string;
  type: 'grammar' | 'spelling' | 'style' | 'vocabulary' | 'strength' | 'suggestion' | 'improvement';
  message: string;
  suggestions?: string[];
  category?: string;
  severity?: 'low' | 'medium' | 'high';
  context?: string;
}

interface AIFeedbackResponse {
  feedbackItems?: Array<{
    type: 'praise' | 'suggestion' | 'improvement';
    text: string;
    exampleFromText?: string;
    suggestionForImprovement?: string;
    area?: string;
    position?: TextPosition;
  }>;
  corrections?: Array<{
    original: string;
    suggestion: string;
    explanation?: string;
    position?: TextPosition;
  }>;
  vocabularyEnhancements?: Array<{
    original: string;
    suggestion: string;
    position?: TextPosition;
  }>;
  grammarErrors?: Array<{
    start: number;
    end: number;
    message: string;
    type: string;
    suggestions: string[];
  }>;
  overallScore?: number;
  criteriaScores?: {
    ideas: number;
    structure: number;
    language: number;
    accuracy: number;
  };
}

interface InteractiveTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  className?: string;
  textType?: string;
  onGetFeedback?: (content: string) => Promise<AIFeedbackResponse>;
  enableRealTimeHighlighting?: boolean;
  enableGrammarCheck?: boolean;
  enableVocabularyEnhancement?: boolean;
}

interface TooltipProps {
  highlight: HighlightRange;
  position: { x: number; y: number };
  onClose: () => void;
  onApplySuggestion?: (suggestion: string) => void;
}

// Interactive tooltip component for displaying feedback
const InteractiveTooltip: React.FC<TooltipProps> = ({
  highlight,
  position,
  onClose,
  onApplySuggestion
}) => {
  const getIcon = () => {
    switch (highlight.type) {
      case 'strength':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'improvement':
      case 'grammar':
      case 'spelling':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'suggestion':
      case 'vocabulary':
        return <Lightbulb className="h-4 w-4 text-blue-500" />;
      case 'style':
        return <Star className="h-4 w-4 text-purple-500" />;
      default:
        return <Target className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTooltipStyle = () => {
    switch (highlight.type) {
      case 'strength':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'improvement':
      case 'grammar':
      case 'spelling':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'suggestion':
      case 'vocabulary':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'style':
        return 'bg-purple-50 border-purple-200 text-purple-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getSeverityBadge = () => {
    if (!highlight.severity) return null;

    const severityColors = {
      low: 'bg-yellow-100 text-yellow-800',
      medium: 'bg-orange-100 text-orange-800',
      high: 'bg-red-100 text-red-800'
    };

    return (
      <span className={`px-2 py-1 text-xs rounded-full ${severityColors[highlight.severity]}`}>
        {highlight.severity}
      </span>
    );
  };

  return (
    <div
      className={`absolute z-50 max-w-sm p-4 rounded-lg border shadow-lg ${getTooltipStyle()}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translateY(-100%)'
      }}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center space-x-2">
          {getIcon()}
          <div className="flex items-center space-x-2">
            <span className="text-xs font-medium">
              {highlight.category || highlight.type.charAt(0).toUpperCase() + highlight.type.slice(1)}
            </span>
            {getSeverityBadge()}
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 text-lg leading-none"
        >
          ×
        </button>
      </div>

      <p className="text-sm mb-3">{highlight.message}</p>

      {highlight.suggestions && highlight.suggestions.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-medium">Suggestions:</p>
          {highlight.suggestions.map((suggestion, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-white bg-opacity-50 rounded border">
              <span className="text-sm italic">"{suggestion}"</span>
              {onApplySuggestion && (
                <button
                  onClick={() => onApplySuggestion(suggestion)}
                  className="ml-2 px-2 py-1 text-xs bg-white rounded border hover:bg-gray-50 transition-colors"
                >
                  Apply
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {highlight.context && (
        <div className="mt-3 p-2 bg-white bg-opacity-30 rounded text-xs">
          <span className="font-medium">Context: </span>
          <span className="italic">{highlight.context}</span>
        </div>
      )}

      {/* Arrow pointing down */}
      <div
        className={`absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent ${
          highlight.type === 'strength' ? 'border-t-green-200' :
          highlight.type === 'improvement' || highlight.type === 'grammar' || highlight.type === 'spelling' ? 'border-t-red-200' :
          highlight.type === 'suggestion' || highlight.type === 'vocabulary' ? 'border-t-blue-200' :
          highlight.type === 'style' ? 'border-t-purple-200' :
          'border-t-gray-200'
        }`}
      />
    </div>
  );
};

// Main Interactive Text Editor Component
export const InteractiveTextEditor: React.FC<InteractiveTextEditorProps> = ({
  content,
  onChange,
  placeholder = "Start writing your amazing story here! Let your creativity flow and bring your ideas to life... ✨",
  className = "",
  textType = "narrative",
  onGetFeedback,
  enableRealTimeHighlighting = true,
  enableGrammarCheck = true,
  enableVocabularyEnhancement = true
}) => {
  // State management
  const [highlights, setHighlights] = useState<HighlightRange[]>([]);
  const [activeTooltip, setActiveTooltip] = useState<{
    highlight: HighlightRange;
    position: { x: number; y: number };
  } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showHighlights, setShowHighlights] = useState(true);
  const [highlightTypes, setHighlightTypes] = useState({
    grammar: true,
    spelling: true,
    style: true,
    vocabulary: true,
    strength: true,
    suggestion: true,
    improvement: true
  });

  // Refs
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const processingTimeoutRef = useRef<NodeJS.Timeout>();

  // Generate unique ID for highlights
  const generateHighlightId = useCallback(() => {
    return `highlight_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  // Parse character positions from AI feedback response
  const parseHighlightsFromFeedback = useCallback((feedback: AIFeedbackResponse): HighlightRange[] => {
    const newHighlights: HighlightRange[] = [];

    // Process feedback items
    if (feedback.feedbackItems) {
      feedback.feedbackItems.forEach((item) => {
        if (item.exampleFromText && item.position) {
          newHighlights.push({
            id: generateHighlightId(),
            start: item.position.start,
            end: item.position.end,
            type: item.type === 'praise' ? 'strength' :
                  item.type === 'suggestion' ? 'suggestion' : 'improvement',
            message: item.text,
            suggestions: item.suggestionForImprovement ? [item.suggestionForImprovement] : undefined,
            category: item.area,
            severity: item.type === 'improvement' ? 'medium' : 'low'
          });
        } else if (item.exampleFromText) {
          // Fallback: find text position if not provided
          const startIndex = content.indexOf(item.exampleFromText);
          if (startIndex !== -1) {
            newHighlights.push({
              id: generateHighlightId(),
              start: startIndex,
              end: startIndex + item.exampleFromText.length,
              type: item.type === 'praise' ? 'strength' :
                    item.type === 'suggestion' ? 'suggestion' : 'improvement',
              message: item.text,
              suggestions: item.suggestionForImprovement ? [item.suggestionForImprovement] : undefined,
              category: item.area,
              severity: item.type === 'improvement' ? 'medium' : 'low'
            });
          }
        }
      });
    }

    // Process grammar errors
    if (feedback.grammarErrors) {
      feedback.grammarErrors.forEach((error) => {
        newHighlights.push({
          id: generateHighlightId(),
          start: error.start,
          end: error.end,
          type: 'grammar',
          message: error.message,
          suggestions: error.suggestions,
          category: 'Grammar',
          severity: 'high'
        });
      });
    }

    // Process corrections
    if (feedback.corrections) {
      feedback.corrections.forEach((correction) => {
        if (correction.position) {
          newHighlights.push({
            id: generateHighlightId(),
            start: correction.position.start,
            end: correction.position.end,
            type: 'spelling',
            message: correction.explanation || 'Spelling correction suggested',
            suggestions: [correction.suggestion],
            category: 'Spelling',
            severity: 'high'
          });
        } else {
          // Fallback: find text position
          const startIndex = content.indexOf(correction.original);
          if (startIndex !== -1) {
            newHighlights.push({
              id: generateHighlightId(),
              start: startIndex,
              end: startIndex + correction.original.length,
              type: 'spelling',
              message: correction.explanation || 'Spelling correction suggested',
              suggestions: [correction.suggestion],
              category: 'Spelling',
              severity: 'high'
            });
          }
        }
      });
    }

    // Process vocabulary enhancements
    if (feedback.vocabularyEnhancements) {
      feedback.vocabularyEnhancements.forEach((enhancement) => {
        if (enhancement.position) {
          newHighlights.push({
            id: generateHighlightId(),
            start: enhancement.position.start,
            end: enhancement.position.end,
            type: 'vocabulary',
            message: `Consider using a stronger word: "${enhancement.suggestion}"`, 
            suggestions: [enhancement.suggestion],
            category: 'Vocabulary Enhancement',
            severity: 'low'
          });
        } else {
          // Fallback: find text position
          const startIndex = content.indexOf(enhancement.original);
          if (startIndex !== -1) {
            newHighlights.push({
              id: generateHighlightId(),
              start: startIndex,
              end: startIndex + enhancement.original.length,
              type: 'vocabulary',
              message: `Consider using a stronger word: "${enhancement.suggestion}"`, 
              suggestions: [enhancement.suggestion],
              category: 'Vocabulary Enhancement',
              severity: 'low'
            });
          }
        }
      });
    }

    return newHighlights;
  }, [content, generateHighlightId]);

  // Get AI feedback with debouncing
  const getFeedbackWithDebounce = useCallback(async (text: string) => {
    if (!text.trim() || text.length < 1) return; // For grammar check (1 character)

    const words = text.trim().split(/\s+/).filter(w => w.length > 0);
    if (words.length < 5) return; // For AI feedback (5 words)

    setIsProcessing(true);

    try {
      if (onGetFeedback) {
        const feedback = await onGetFeedback(text);
        const newHighlights = parseHighlightsFromFeedback(feedback);
        setHighlights(newHighlights);
      } else {
        // Fallback to direct API call
        const response = await fetch('/netlify/functions/ai-operations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            action: 'checkGrammarForEditor',
            text: text,
            textType: textType,
            includePositions: true // Request character positions
          }),
        });

        if (response.ok) {
          const feedback = await response.json();
          const newHighlights = parseHighlightsFromFeedback(feedback);
          setHighlights(newHighlights);
        }
      }
    } catch (error) {
      console.error('Error getting AI feedback:', error);
    } finally {
      setIsProcessing(false);
    }
  }, [onGetFeedback, textType, parseHighlightsFromFeedback]);

  // Real-time highlighting with debouncing
  useEffect(() => {
    if (!enableRealTimeHighlighting) return;

    if (processingTimeoutRef.current) {
      clearTimeout(processingTimeoutRef.current);
    }

    processingTimeoutRef.current = setTimeout(() => {
      getFeedbackWithDebounce(content);
    }, 1500); // Debounce for 1.5 seconds

    return () => {
      if (processingTimeoutRef.current) {
        clearTimeout(processingTimeoutRef.current);
      }
    };
  }, [content, enableRealTimeHighlighting, getFeedbackWithDebounce]);

  // Filter highlights based on enabled types
  const filteredHighlights = useMemo(() => {
    return highlights.filter(highlight =>
      showHighlights && highlightTypes[highlight.type]
    );
  }, [highlights, showHighlights, highlightTypes]);

  // Create highlighted text segments
  const createHighlightedSegments = useCallback(() => {
    if (filteredHighlights.length === 0) {
      return [{ text: content, isHighlighted: false, highlight: null }];
    }

    const segments: Array<{
      text: string;
      isHighlighted: boolean;
      highlight: HighlightRange | null;
    }> = [];

    // Sort highlights by start position
    const sortedHighlights = [...filteredHighlights].sort((a, b) => a.start - b.start);

    let currentIndex = 0;

    sortedHighlights.forEach((highlight) => {
      // Add text before highlight
      if (currentIndex < highlight.start) {
        segments.push({
          text: content.slice(currentIndex, highlight.start),
          isHighlighted: false,
          highlight: null
        });
      }

      // Add highlighted text
      segments.push({
        text: content.slice(highlight.start, highlight.end),
        isHighlighted: true,
        highlight
      });

      currentIndex = Math.max(currentIndex, highlight.end);
    });

    // Add remaining text
    if (currentIndex < content.length) {
      segments.push({
        text: content.slice(currentIndex),
        isHighlighted: false,
        highlight: null
      });
    }

    return segments;
  }, [content, filteredHighlights]);

  // Handle text change
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
    setActiveTooltip(null); // Close tooltip when text changes
  };

  // Handle highlight click
  const handleHighlightClick = (
    event: React.MouseEvent,
    highlight: HighlightRange
  ) => {
    event.preventDefault();

    const rect = event.currentTarget.getBoundingClientRect();
    const position = {
      x: rect.left + rect.width / 2,
      y: rect.top
    };

    setActiveTooltip({ highlight, position });
  };

  // Apply suggestion
  const applySuggestion = useCallback((highlight: HighlightRange, suggestion: string) => {
    const before = content.slice(0, highlight.start);
    const after = content.slice(highlight.end);
    const newContent = before + suggestion + after;

    onChange(newContent);
    setActiveTooltip(null);

    // Remove the applied highlight
    setHighlights(prevHighlights => prevHighlights.filter(h => h.id !== highlight.id));
  }, [content, onChange]);

  // Calculate position for tooltip
  const getTooltipPosition = useCallback(() => {
    if (!activeTooltip || !textareaRef.current) return { x: 0, y: 0 };

    const textareaRect = textareaRef.current.getBoundingClientRect();
    const highlightStart = activeTooltip.highlight.start;
    const highlightEnd = activeTooltip.highlight.end;

    // Create a temporary span to measure the position of the highlighted text
    const tempSpan = document.createElement('span');
    tempSpan.textContent = content.substring(highlightStart, highlightEnd);
    tempSpan.style.position = 'absolute';
    tempSpan.style.visibility = 'hidden';
    tempSpan.style.left = `${textareaRect.left + textareaRef.current.scrollLeft}px`;
    tempSpan.style.top = `${textareaRect.top + textareaRef.current.scrollTop}px`;
    tempSpan.style.whiteSpace = 'pre-wrap';
    tempSpan.style.font = window.getComputedStyle(textareaRef.current).font;
    document.body.appendChild(tempSpan);

    const spanRect = tempSpan.getBoundingClientRect();
    document.body.removeChild(tempSpan);

    return {
      x: spanRect.left + spanRect.width / 2,
      y: spanRect.top
    };
  }, [activeTooltip, content]);

  const tooltipPosition = getTooltipPosition();

  return (
    <div className="relative w-full h-full">
      <div
        ref={overlayRef}
        className="absolute inset-0 p-4 font-sans text-lg leading-relaxed resize-none overflow-hidden pointer-events-none whitespace-pre-wrap break-words"
        style={{
          // This ensures the overlay text aligns perfectly with the textarea text
          font: textareaRef.current ? window.getComputedStyle(textareaRef.current).font : 'inherit',
          padding: textareaRef.current ? window.getComputedStyle(textareaRef.current).padding : '1rem',
          lineHeight: textareaRef.current ? window.getComputedStyle(textareaRef.current).lineHeight : 'inherit',
          boxSizing: 'border-box',
          zIndex: 1,
        }}
      >
        {createHighlightedSegments().map((segment, index) => (
          <span
            key={index}
            className={segment.isHighlighted ? `relative cursor-pointer ${segment.highlight?.type === 'strength' ? 'bg-green-200 opacity-70' : 'bg-red-200 opacity-70'}` : ''}
            onClick={segment.isHighlighted ? (e) => handleHighlightClick(e, segment.highlight!) : undefined}
          >
            {segment.text}
          </span>
        ))}
      </div>
      <textarea
        ref={textareaRef}
        className={`w-full h-full p-4 font-sans text-lg leading-relaxed bg-transparent z-10 relative resize-none focus:outline-none ${className}`}
        placeholder={placeholder}
        value={content}
        onChange={handleTextChange}
        spellCheck="false" // Disable native spell check to rely on AI
      />

      {activeTooltip && (
        <InteractiveTooltip
          highlight={activeTooltip.highlight}
          position={tooltipPosition}
          onClose={() => setActiveTooltip(null)}
          onApplySuggestion={(suggestion) => applySuggestion(activeTooltip.highlight, suggestion)}
        />
      )}

      {isProcessing && (
        <div className="absolute bottom-4 left-4 flex items-center text-blue-500">
          <Loader2 className="animate-spin mr-2" size={16} />
          <span className="text-sm">Processing feedback...</span>
        </div>
      )}

      <div className="absolute top-4 right-4 flex space-x-2">
        <button
          onClick={() => setShowHighlights(!showHighlights)}
          className={`p-2 rounded-full shadow-md ${showHighlights ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          title="Toggle Highlights"
        >
          {showHighlights ? <Eye size={20} /> : <EyeOff size={20} />}
        </button>
        {/* Add more controls for specific highlight types if needed */}
      </div>
    </div>
  );
};
