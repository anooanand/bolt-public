import React, { useState, useEffect, useRef, useCallback } from 'react';
import { generatePrompt, getSynonyms, rephraseSentence, evaluateEssay } from '../lib/openai';
import { useApp } from '../contexts/AppContext';
import { AlertCircle } from 'lucide-react';
import { InlineSuggestionPopup } from './InlineSuggestionPopup';
import { WritingStatusBar } from './WritingStatusBar';

interface WritingAreaProps {
  content: string;
  onChange: (content: string) => void;
  textType: string;
  onTimerStart: (shouldStart: boolean) => void;
  onSubmit: () => void;
}

interface WritingIssue {
  start: number;
  end: number;
  type: 'spelling' | 'grammar' | 'vocabulary' | 'structure' | 'style';
  message: string;
  suggestion: string;
}

interface SavedWriting {
  id: string;
  title: string;
  content: string;
  textType: string;
  wordCount: number;
  createdAt: string;
  updatedAt: string;
}

export function WritingArea({ content, onChange, textType, onTimerStart, onSubmit }: WritingAreaProps) {
  const { state, addWriting } = useApp();
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showCustomPrompt, setShowCustomPrompt] = useState(false);
  const [customPrompt, setCustomPrompt] = useState('');
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [issues, setIssues] = useState<WritingIssue[]>([]);
  const [selectedIssue, setSelectedIssue] = useState<WritingIssue | null>(null);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showPromptButtons, setShowPromptButtons] = useState(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prompt) {
      onTimerStart(true);
      setShowPromptButtons(false);
    }
  }, [prompt, onTimerStart]);

  // Load saved prompt from localStorage
  useEffect(() => {
    if (textType) {
      const savedPrompt = localStorage.getItem(`${textType}_prompt`);
      if (savedPrompt) {
        setPrompt(savedPrompt);
        setShowPromptButtons(false);
      }
    }
  }, [textType]);

  const analyzeText = useCallback((text: string) => {
    const newIssues: WritingIssue[] = [];
    
    // Common spelling mistakes (only incorrect spellings)
    const spellingPatterns = {
      'softley': 'softly',
      'recieve': 'receive',
      'seperate': 'separate',
      'occured': 'occurred',
      'accomodate': 'accommodate',
      'alot': 'a lot',
      'cant': "can't",
      'dont': "don't",
      'wont': "won't",
      'im': "I'm",
      'ive': "I've",
      'id': "I'd",
      'youre': "you're",
      'theyre': "they're"
    };

    // Grammar patterns (only incorrect grammar)
    const grammarPatterns = {
      'i am': 'I am',
      'i have': 'I have',
      'i will': 'I will',
      'i was': 'I was'
    };

    // Vocabulary improvements with multiple suggestions
    const vocabularyPatterns = {
      'good': 'excellent, outstanding, remarkable',
      'bad': 'poor, inadequate, unsatisfactory',
      'said': 'exclaimed, declared, announced',
      'nice': 'pleasant, delightful, charming',
      'big': 'enormous, massive, substantial',
      'small': 'tiny, minute, compact',
      'happy': 'joyful, delighted, cheerful',
      'sad': 'unhappy, gloomy, melancholy',
      'walk': 'stroll, amble, wander',
      'run': 'dash, sprint, race',
      'look': 'gaze, stare, observe',
      'went': 'traveled, journeyed, ventured',
      'saw': 'noticed, observed, spotted',
      'got': 'received, obtained, acquired',
      'make': 'create, produce, construct',
      'think': 'believe, consider, ponder',
      'started': 'began, commenced, initiated'
    };

    // Check spelling
    Object.entries(spellingPatterns).forEach(([incorrect, correct]) => {
      const regex = new RegExp(`\\b${incorrect}\\b`, 'gi');
      let match;
      while ((match = regex.exec(text)) !== null) {
        newIssues.push({
          start: match.index,
          end: match.index + incorrect.length,
          type: 'spelling',
          message: `This word is misspelled. The correct spelling is "${correct}".`,
          suggestion: correct
        });
      }
    });

    // Check grammar
    Object.entries(grammarPatterns).forEach(([incorrect, correct]) => {
      const regex = new RegExp(`\\b${incorrect}\\b`, 'gi');
      let match;
      while ((match = regex.exec(text)) !== null) {
        newIssues.push({
          start: match.index,
          end: match.index + incorrect.length,
          type: 'grammar',
          message: `This needs proper capitalization.`,
          suggestion: correct
        });
      }
    });

    // Check vocabulary
    Object.entries(vocabularyPatterns).forEach(([basic, improvements]) => {
      const regex = new RegExp(`\\b${basic}\\b`, 'gi');
      let match;
      while ((match = regex.exec(text)) !== null) {
        newIssues.push({
          start: match.index,
          end: match.index + basic.length,
          type: 'vocabulary',
          message: `Consider using a more sophisticated word. Suggestions: ${improvements}`,
          suggestion: improvements.split(', ')[0] // Use first suggestion as primary
        });
      }
    });

    setIssues(newIssues);
  }, []);

  // Local storage save functionality
  const saveToLocalStorage = useCallback((content: string, textType: string) => {
    if (!content.trim() || !textType) return;

    const wordCount = content.split(' ').filter(word => word.trim()).length;
    const title = content.split('\n')[0].substring(0, 50) || `${textType} Writing`;
    
    const writingId = `writing_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const now = new Date().toISOString();
    
    const savedWriting: SavedWriting = {
      id: writingId,
      title,
      content,
      textType,
      wordCount,
      createdAt: now,
      updatedAt: now
    };

    // Get existing writings from localStorage
    const existingWritings = JSON.parse(localStorage.getItem('saved_writings') || '[]');
    
    // Check if this is an update to existing writing (same content start)
    const existingIndex = existingWritings.findIndex((w: SavedWriting) => 
      w.textType === textType && w.title === title
    );
    
    if (existingIndex >= 0) {
      // Update existing writing
      existingWritings[existingIndex] = {
        ...existingWritings[existingIndex],
        content,
        wordCount,
        updatedAt: now
      };
    } else {
      // Add new writing
      existingWritings.push(savedWriting);
    }
    
    // Keep only the last 50 writings to prevent localStorage from getting too large
    if (existingWritings.length > 50) {
      existingWritings.splice(0, existingWritings.length - 50);
    }
    
    localStorage.setItem('saved_writings', JSON.stringify(existingWritings));
    
    // Also save current writing separately for quick access
    localStorage.setItem('current_writing', JSON.stringify(savedWriting));
    
    return savedWriting;
  }, []);

  // Auto-save functionality with local storage
  useEffect(() => {
    if (content.trim() && textType) {
      const saveTimer = setTimeout(async () => {
        setIsSaving(true);
        try {
          const savedWriting = saveToLocalStorage(content, textType);
          if (savedWriting) {
            addWriting(savedWriting);
            setLastSaved(new Date());
          }
        } catch (error) {
          console.error('Auto-save failed:', error);
        } finally {
          setIsSaving(false);
        }
      }, 30000); // Auto-save every 30 seconds

      return () => clearTimeout(saveTimer);
    }
  }, [content, textType, saveToLocalStorage, addWriting]);

  useEffect(() => {
    if (content.trim()) {
      analyzeText(content);
    }
  }, [content, analyzeText]);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    onChange(newContent);
  };

  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    if (overlayRef.current) {
      overlayRef.current.scrollTop = e.currentTarget.scrollTop;
    }
  };

  const handleIssueClick = (issue: WritingIssue, event: React.MouseEvent) => {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const containerRect = containerRef.current?.getBoundingClientRect();
    
    if (containerRect) {
      let x = rect.left - containerRect.left;
      let y = rect.top - containerRect.top + rect.height;

      const maxX = containerRect.width - 300; // 300px is max-width of popup
      if (x > maxX) x = maxX;
      if (x < 0) x = 0;

      // Ensure popup doesn't go below the container
      const maxY = containerRect.height - 200; // Approximate popup height
      if (y > maxY) y = rect.top - containerRect.top - 220; // Show above the word

      setPopupPosition({ x, y });
      setSelectedIssue(issue);
      setSuggestions([]);

      if (issue.type === 'vocabulary') {
        setIsLoadingSuggestions(true);
        // For vocabulary issues, we already have suggestions in the message
        const suggestionText = issue.message.split('Suggestions: ')[1];
        if (suggestionText) {
          setSuggestions(suggestionText.split(', '));
        }
        setIsLoadingSuggestions(false);
      }
    }
  };

  const applySuggestion = (suggestion: string) => {
    if (selectedIssue && textareaRef.current) {
      const textarea = textareaRef.current;
      const start = selectedIssue.start;
      const end = selectedIssue.end;
      
      const newContent = content.substring(0, start) + suggestion + content.substring(end);
      onChange(newContent);
      
      // Update cursor position
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + suggestion.length, start + suggestion.length);
      }, 0);
    }
    setSelectedIssue(null);
  };

  const generatePromptForTextType = async (type: string) => {
    setIsGenerating(true);
    try {
      const newPrompt = await generatePrompt(type);
      setPrompt(newPrompt);
      
      // Save prompt to localStorage
      if (newPrompt) {
        localStorage.setItem(`${textType}_prompt`, newPrompt);
      }
    } catch (error) {
      console.error('Failed to generate prompt:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCustomPromptSubmit = () => {
    if (customPrompt.trim()) {
      setPrompt(customPrompt);
      // Save prompt to localStorage
      if (customPrompt.trim()) {
        localStorage.setItem(`${textType}_prompt`, customPrompt);
      }
      setShowCustomPrompt(false);
      setCustomPrompt('');
    }
  };

  const renderHighlightedText = () => {
    if (!content || issues.length === 0) {
      return <div className="whitespace-pre-wrap break-words">{content}</div>;
    }

    const parts = [];
    let lastIndex = 0;

    // Sort issues by start position
    const sortedIssues = [...issues].sort((a, b) => a.start - b.start);

    sortedIssues.forEach((issue, index) => {
      // Add text before the issue
      if (issue.start > lastIndex) {
        parts.push(
          <span key={`text-${index}`}>
            {content.substring(lastIndex, issue.start)}
          </span>
        );
      }

      // Add the highlighted issue
      const issueText = content.substring(issue.start, issue.end);
      const colorClass = {
        spelling: 'bg-red-200 border-b-2 border-red-400 cursor-pointer hover:bg-red-300',
        grammar: 'bg-yellow-200 border-b-2 border-yellow-400 cursor-pointer hover:bg-yellow-300',
        vocabulary: 'bg-blue-200 border-b-2 border-blue-400 cursor-pointer hover:bg-blue-300',
        structure: 'bg-purple-200 border-b-2 border-purple-400 cursor-pointer hover:bg-purple-300',
        style: 'bg-green-200 border-b-2 border-green-400 cursor-pointer hover:bg-green-300'
      }[issue.type];

      parts.push(
        <span
          key={`issue-${index}`}
          className={colorClass}
          onClick={(e) => handleIssueClick(issue, e)}
          title={issue.message}
        >
          {issueText}
        </span>
      );

      lastIndex = issue.end;
    });

    // Add remaining text
    if (lastIndex < content.length) {
      parts.push(
        <span key="text-end">
          {content.substring(lastIndex)}
        </span>
      );
    }

    return <div className="whitespace-pre-wrap break-words">{parts}</div>;
  };

  const wordCount = content.split(' ').filter(word => word.trim()).length;

  return (
    <div ref={containerRef} className="flex flex-col h-full bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden relative">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">Writing Area</h2>
            <p className="text-blue-100 text-sm">
              {textType ? `${textType} Writing` : 'Select a text type to begin'}
            </p>
          </div>
          <div className="text-right">
            <div className="text-lg font-semibold">{wordCount} words</div>
            {lastSaved && (
              <div className="text-xs text-blue-100">
                Saved {lastSaved.toLocaleTimeString()}
              </div>
            )}
            {isSaving && (
              <div className="text-xs text-yellow-200">
                Saving...
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Prompt Section */}
      {showPromptButtons && textType && (
        <div className="p-4 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-wrap gap-2 mb-3">
            <button
              onClick={() => generatePromptForTextType(textType)}
              disabled={isGenerating}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              {isGenerating ? 'Generating...' : 'Generate Prompt'}
            </button>
            <button
              onClick={() => setShowCustomPrompt(true)}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 text-sm"
            >
              Custom Prompt
            </button>
          </div>

          {showCustomPrompt && (
            <div className="space-y-2">
              <textarea
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="Enter your custom writing prompt..."
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md resize-none dark:bg-gray-700 dark:text-white"
                rows={3}
              />
              <div className="flex gap-2">
                <button
                  onClick={handleCustomPromptSubmit}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
                >
                  Use This Prompt
                </button>
                <button
                  onClick={() => {
                    setShowCustomPrompt(false);
                    setCustomPrompt('');
                  }}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Prompt Display */}
      {prompt && (
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border-b border-blue-200 dark:border-blue-800">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Writing Prompt:</h3>
              <p className="text-blue-700 dark:text-blue-300 text-sm leading-relaxed">{prompt}</p>
            </div>
            <button
              onClick={() => {
                setPrompt('');
                setShowPromptButtons(true);
                localStorage.removeItem(`${textType}_prompt`);
              }}
              className="ml-4 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Writing Area */}
      <div className="flex-1 relative">
        {/* Overlay for highlighting */}
        <div
          ref={overlayRef}
          className="absolute inset-0 p-4 pointer-events-none overflow-auto text-transparent"
          style={{
            fontFamily: 'inherit',
            fontSize: 'inherit',
            lineHeight: 'inherit',
            whiteSpace: 'pre-wrap',
            wordWrap: 'break-word'
          }}
        >
          {renderHighlightedText()}
        </div>

        {/* Actual textarea */}
        <textarea
          ref={textareaRef}
          value={content}
          onChange={handleContentChange}
          onScroll={handleScroll}
          placeholder={prompt ? "Start writing your response here..." : "Select a text type and generate a prompt to begin writing..."}
          className="w-full h-full p-4 border-none outline-none resize-none bg-transparent dark:text-white relative z-10"
          style={{
            fontFamily: 'inherit',
            fontSize: 'inherit',
            lineHeight: 'inherit'
          }}
        />
      </div>

      {/* Status Bar */}
      <WritingStatusBar
        wordCount={wordCount}
        issues={issues}
        lastSaved={lastSaved}
        isSaving={isSaving}
      />

      {/* Inline Suggestion Popup */}
      {selectedIssue && (
        <InlineSuggestionPopup
          issue={selectedIssue}
          position={popupPosition}
          suggestions={suggestions}
          isLoading={isLoadingSuggestions}
          onApplySuggestion={applySuggestion}
          onClose={() => setSelectedIssue(null)}
        />
      )}

      {/* Submit Button */}
      {content.trim() && (
        <div className="p-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onSubmit}
            className="w-full py-3 bg-green-600 text-white rounded-md hover:bg-green-700 font-semibold"
          >
            Submit for Feedback
          </button>
        </div>
      )}
    </div>
  );
}
