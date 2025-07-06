import React, { useState, useEffect, useRef, useCallback } from 'react';
import { generatePrompt, getSynonyms, rephraseSentence, evaluateEssay } from '../lib/openai';
import { dbOperations } from '../lib/database';
import { useApp } from '../contexts/AppContext';
import { AlertCircle } from 'lucide-react';
import { InlineSuggestionPopup } from './InlineSuggestionPopup';
import { WritingStatusBar } from './WritingStatusBar';
import { WritingTypeSelectionModal } from './WritingTypeSelectionModal';
import { PromptOptionsModal } from './PromptOptionsModal';
import { CustomPromptModal } from './CustomPromptModal';
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
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [issues, setIssues] = useState<WritingIssue[]>([]);
  const [selectedIssue, setSelectedIssue] = useState<WritingIssue | null>(null);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  
  // New state for popup management
  const [showWritingTypeModal, setShowWritingTypeModal] = useState(false);
  const [showPromptOptionsModal, setShowPromptOptionsModal] = useState(false);
  const [showCustomPromptModal, setShowCustomPromptModal] = useState(false);
  const [selectedWritingType, setSelectedWritingType] = useState('');
  const [hasInitialized, setHasInitialized] = useState(false);
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize popup flow when component mounts or when textType is empty
  useEffect(() => {
    if (!hasInitialized && !textType) {
      setShowWritingTypeModal(true);
      setHasInitialized(true);
    }
  }, [textType, hasInitialized]);

  useEffect(() => {
    if (prompt) {
      onTimerStart(true);
    }
  }, [prompt, onTimerStart]);

  // Load saved prompt from localStorage
  useEffect(() => {
    if (selectedWritingType) {
      const savedPrompt = localStorage.getItem(`${selectedWritingType}_prompt`);
      if (savedPrompt) {
        setPrompt(savedPrompt);
      }
    }
  }, [selectedWritingType]);

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
    if (content.trim() && selectedWritingType && state.user) {
      const saveTimer = setTimeout(async () => {
        setIsSaving(true);
        try {
          const wordCount = content.split(' ').filter(word => word.trim()).length;
          const title = content.split('\n')[0].substring(0, 50) || `${selectedWritingType} Writing`;
          
          const { data, error } = await dbOperations.writings.createWriting({
            title,
            content,
            text_type: selectedWritingType,
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
  }, [content, selectedWritingType, state.user, addWriting]);

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

  // Handle writing type selection
  const handleWritingTypeSelect = (type: string) => {
    setSelectedWritingType(type);
    setShowWritingTypeModal(false);
    setShowPromptOptionsModal(true);
  };

  // Handle prompt generation
  const handleGeneratePrompt = async () => {
    setShowPromptOptionsModal(false);
    setIsGenerating(true);
    const newPrompt = await generatePrompt(selectedWritingType);
    if (newPrompt) {
      setPrompt(newPrompt);
      // Save prompt to localStorage
      if (selectedWritingType) {
        localStorage.setItem(`${selectedWritingType}_prompt`, newPrompt);
      }
    }
    setIsGenerating(false);
  };

  // Handle custom prompt option
  const handleCustomPromptOption = () => {
    setShowPromptOptionsModal(false);
    setShowCustomPromptModal(true);
  };

  // Handle custom prompt submission
  const handleCustomPromptSubmit = (customPrompt: string) => {
    setPrompt(customPrompt);
    // Save prompt to localStorage
    if (selectedWritingType) {
      localStorage.setItem(`${selectedWritingType}_prompt`, customPrompt);
    }
    setShowCustomPromptModal(false);
  };

  const handleRestoreContent = (restoredContent: string, restoredTextType: string) => {
    onChange(restoredContent);
    if (restoredTextType) {
      setSelectedWritingType(restoredTextType);
    }
  };

  const noTypeSelected = !selectedWritingType;
  const currentTextType = selectedWritingType || textType;

  return (
    <div ref={containerRef} className="h-full flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow-sm writing-area-container">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 space-y-4 content-spacing">
        <div className="flex flex-wrap justify-between items-center gap-2">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white capitalize">
            {currentTextType ? `${currentTextType} Writing` : 'Select Writing Type'}
          </h2>
          {noTypeSelected ? (
            <div className="flex items-center text-amber-600 dark:text-amber-400 text-sm">
              <AlertCircle className="w-4 h-4 mr-2" />
              Please select a writing type first
            </div>
          ) : !prompt && (
            <div className="flex items-center text-blue-600 dark:text-blue-400 text-sm">
              <AlertCircle className="w-4 h-4 mr-2" />
              {isGenerating ? 'Generating prompt...' : 'Choose or enter a prompt to start writing'}
            </div>
          )}
        </div>

        {prompt && !noTypeSelected && (
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
        textType={currentTextType}
        onRestore={handleRestoreContent}
      />

      {/* Popup Modals */}
      <WritingTypeSelectionModal
        isOpen={showWritingTypeModal}
        onClose={() => setShowWritingTypeModal(false)}
        onSelectType={handleWritingTypeSelect}
      />

      <PromptOptionsModal
        isOpen={showPromptOptionsModal}
        onClose={() => setShowPromptOptionsModal(false)}
        onGeneratePrompt={handleGeneratePrompt}
        onCustomPrompt={handleCustomPromptOption}
        textType={selectedWritingType}
      />

      <CustomPromptModal
        isOpen={showCustomPromptModal}
        onClose={() => setShowCustomPromptModal(false)}
        onSubmit={handleCustomPromptSubmit}
        textType={selectedWritingType}
      />
    </div>
  );
}

