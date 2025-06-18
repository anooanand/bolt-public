import React, { useState, useEffect, useRef } from 'react';
import { generatePrompt, getSynonyms, rephraseSentence, evaluateEssay } from '../lib/openai';
import { dbOperations } from '../lib/database';
import { useApp } from '../contexts/AppContext';
import { AlertCircle } from 'lucide-react';
import { InlineSuggestionPopup } from './InlineSuggestionPopup';
import { WritingStatusBar } from './WritingStatusBar';
import './responsive.css';

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
          message: `Consider using a more descriptive word to make your writing more engaging.`,
          suggestion: improvements
        });
      }
    });

    // Check for repeated words
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    const wordCounts: { [key: string]: number } = {};
    words.forEach((word, index) => {
      if (word.length > 3) { // Only check words longer than 3 letters
        if (wordCounts[word]) {
          if (index - wordCounts[word] < 30) { // Check if words are close together
            const start = text.toLowerCase().indexOf(word, index);
            const suggestions = vocabularyPatterns[word as keyof typeof vocabularyPatterns];
            if (suggestions) {
              newIssues.push({
                start,
                end: start + word.length,
                type: 'style',
                message: `This word appears multiple times nearby. Try using a different word for variety.`,
                suggestion: suggestions
              });
            }
          }
        }
        wordCounts[word] = index;
      }
    });

    setIssues(newIssues);
  }, []);

  // Auto-save functionality
  useEffect(() => {
    if (content.trim() && textType && state.user) {
      const saveTimer = setTimeout(async () => {
        setIsSaving(true);
        try {
          const wordCount = content.split(' ').filter(word => word.trim()).length;
          const title = content.split('\n')[0].substring(0, 50) || `${textType} Writing`;
          
          const { data, error } = await dbOperations.writings.createWriting({
            title,
            content,
            text_type: textType,
            word_count: wordCount
          });
          
          if (data && !error) {
            addWriting(data);
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
  }, [content, textType, state.user, addWriting]);

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
    }
  };

  const handleApplySuggestion = (suggestion: string, start: number, end: number) => {
    const newContent = content.slice(0, start) + suggestion + content.slice(end);
    onChange(newContent);
    setSelectedIssue(null);
    setSuggestions([]);
  };

  const handleParaphrase = async () => {
    if (selectedIssue) {
      setIsLoadingSuggestions(true);
      try {
        const text = content.slice(selectedIssue.start, selectedIssue.end);
        const alternatives = await rephraseSentence(text);
        setSuggestions(alternatives.split(',').map(s => s.trim()));
      } catch (error) {
        console.error('Error getting alternatives:', error);
      } finally {
        setIsLoadingSuggestions(false);
      }
    }
  };

  const handleThesaurus = async () => {
    if (selectedIssue) {
      setIsLoadingSuggestions(true);
      try {
        const word = content.slice(selectedIssue.start, selectedIssue.end).toLowerCase();
        const synonyms = await getSynonyms(word);
        setSuggestions(synonyms);
      } catch (error) {
        console.error('Error getting synonyms:', error);
      } finally {
        setIsLoadingSuggestions(false);
      }
    }
  };

  const getHighlightStyle = (type: WritingIssue['type']) => {
    switch (type) {
      case 'spelling':
        return 'bg-red-100 border-b-2 border-red-400';
      case 'grammar':
        return 'bg-yellow-100 border-b-2 border-yellow-400';
      case 'vocabulary':
        return 'bg-green-100 border-b-2 border-green-400';
      case 'structure':
        return 'bg-purple-100 border-b-2 border-purple-400';
      case 'style':
        return 'bg-orange-100 border-b-2 border-orange-400';
      default:
        return '';
    }
  };

  const handleGeneratePrompt = async () => {
    setIsGenerating(true);
    const newPrompt = await generatePrompt(textType);
    if (newPrompt) {
      setPrompt(newPrompt);
      // Save prompt to localStorage
      if (textType) {
        localStorage.setItem(`${textType}_prompt`, newPrompt);
      }
      setShowCustomPrompt(false);
    }
    setIsGenerating(false);
  };

  const handleCustomPromptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customPrompt.trim()) {
      setPrompt(customPrompt);
      // Save prompt to localStorage
      if (textType) {
        localStorage.setItem(`${textType}_prompt`, customPrompt);
      }
      setShowCustomPrompt(false);
    }
  };

  const handleRestoreContent = (restoredContent: string, restoredTextType: string) => {
    onChange(restoredContent);
    if (restoredTextType) {
      // You would need to lift this state up or use a context
      // For now, we'll just log it
      console.log('Restored text type:', restoredTextType);
    }
  };

  const noTypeSelected = !textType;

  return (
    <div ref={containerRef} className="h-full flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow-sm writing-area-container">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 space-y-4 content-spacing">
        <div className="flex flex-wrap justify-between items-center gap-2">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white capitalize">
            {textType ? `${textType} Writing` : 'Select Writing Type'}
          </h2>
          {noTypeSelected ? (
            <div className="flex items-center text-amber-600 dark:text-amber-400 text-sm">
              <AlertCircle className="w-4 h-4 mr-2" />
              Please select a writing type first
            </div>
          ) : showPromptButtons && (
            <div className="flex flex-wrap space-x-2 gap-2">
              <button
                onClick={() => setShowCustomPrompt(true)}
                disabled={noTypeSelected}
                className="px-4 py-2 bg-blue-600 text-white border border-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium touch-friendly-button"
              >
                I have my own prompt
              </button>
              <button
                onClick={handleGeneratePrompt}
                disabled={isGenerating || noTypeSelected}
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium touch-friendly-button"
              >
                Generate New Prompt
              </button>
            </div>
          )}
        </div>

        {showCustomPrompt && !noTypeSelected && (
          <form onSubmit={handleCustomPromptSubmit} className="space-y-2">
            <textarea
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="Enter your own writing prompt..."
              className="w-full p-2 border rounded-md text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              rows={3}
            />
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setShowCustomPrompt(false)}
                className="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!customPrompt.trim()}
                className="px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 text-sm font-medium touch-friendly-button"
              >
                Set Prompt
              </button>
            </div>
          </form>
        )}

        {prompt && !showCustomPrompt && !noTypeSelected && (
          <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-md">
            <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Writing Prompt:</h3>
            <p className="text-blue-800 dark:text-blue-200">{prompt}</p>
          </div>
        )}
      </div>

      <div className="relative flex-1 overflow-hidden writing-area-enhanced">
        <textarea
          ref={textareaRef}
          value={content}
          onChange={handleContentChange}
          onScroll={handleScroll}
          disabled={noTypeSelected || !prompt}
          className="absolute inset-0 w-full h-full p-4 text-gray-900 dark:text-white resize-none focus:outline-none disabled:bg-gray-100 dark:disabled:bg-gray-700 disabled:cursor-not-allowed overflow-y-auto writing-textarea"
          placeholder={noTypeSelected ? "Select a writing type to begin..." : !prompt ? "Choose or enter a prompt to start writing..." : "Begin writing here..."}
          style={{ 
            caretColor: 'black',
            color: 'transparent',
            background: 'transparent',
            fontSize: '16px',
            lineHeight: '1.6'
          }}
        />
        <div 
          ref={overlayRef}
          className="absolute inset-0 pointer-events-none p-4 text-gray-900 dark:text-white overflow-y-hidden"
          style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word', fontSize: '16px', lineHeight: '1.6' }}
        >
          {content.split('').map((char, index) => {
            const issue = issues.find(i => index >= i.start && index < i.end);
            return (
              <span
                key={index}
                className={issue ? `${getHighlightStyle(issue.type)} relative group cursor-pointer` : ''}
                onClick={issue ? (e) => handleIssueClick(issue, e) : undefined}
                style={{ pointerEvents: issue ? 'auto' : 'none' }}
              >
                {char}
              </span>
            );
          })}
        </div>

        {selectedIssue && (
          <InlineSuggestionPopup
            original={content.slice(selectedIssue.start, selectedIssue.end)}
            suggestion={suggestions.length > 0 ? suggestions.join(', ') : selectedIssue.suggestion}
            explanation={selectedIssue.message}
            position={popupPosition}
            onApply={handleApplySuggestion}
            onParaphrase={handleParaphrase}
            onThesaurus={handleThesaurus}
            onClose={() => {
              setSelectedIssue(null);
              setSuggestions([]);
            }}
            start={selectedIssue.start}
            end={selectedIssue.end}
            isLoading={isLoadingSuggestions}
            isDarkMode={document.documentElement.classList.contains('dark')}
          />
        )}
      </div>

      <WritingStatusBar 
        content={content} 
        textType={textType}
        onRestore={handleRestoreContent}
      />
    </div>
  );
}