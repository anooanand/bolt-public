import React, { useState, useEffect, useRef, useCallback } from 'react';
import { generatePrompt, getSynonyms, rephraseSentence, evaluateEssay } from '../lib/openai';
import { dbOperations } from '../lib/database';
import { useApp } from '../contexts/AppContext';
import { AlertCircle, Send } from 'lucide-react';
import { InlineSuggestionPopup } from './InlineSuggestionPopup';
import { WritingStatusBar } from './WritingStatusBar';
import { WritingTypeSelectionModal } from './WritingTypeSelectionModal';
import { PromptOptionsModal } from './PromptOptionsModal';
import { CustomPromptModal } from './CustomPromptModal';
import { EssayEvaluationModal } from './EssayEvaluationModal';
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

export function FixedWritingArea({ content, onChange, textType, onTimerStart, onSubmit }: WritingAreaProps) {
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
  const [showHighlights, setShowHighlights] = useState(true);
  const [showSpellCheck, setShowSpellCheck] = useState(true);
  
  // New state for popup management
  const [showWritingTypeModal, setShowWritingTypeModal] = useState(false);
  const [showPromptOptionsModal, setShowPromptOptionsModal] = useState(false);
  const [showCustomPromptModal, setShowCustomPromptModal] = useState(false);
  const [selectedWritingType, setSelectedWritingType] = useState('');
  const [hasInitialized, setHasInitialized] = useState(false);
  const [showEvaluationModal, setShowEvaluationModal] = useState(false);
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const highlightLayerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize popup flow when component mounts or when textType is empty
  useEffect(() => {
    const savedContent = localStorage.getItem('writingContent');
    const savedWritingType = localStorage.getItem('selectedWritingType');

    if (savedContent) {
      onChange(savedContent);
    }
    if (savedWritingType) {
      setSelectedWritingType(savedWritingType);
    }

    if (!hasInitialized && !textType && !selectedWritingType && !savedContent && !savedWritingType) {
      setShowWritingTypeModal(true);
      setHasInitialized(true);
    }
  }, [textType, hasInitialized, selectedWritingType, onChange]);

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

  // Persist content and selectedWritingType to localStorage
  useEffect(() => {
    localStorage.setItem('writingContent', content);
  }, [content]);

  useEffect(() => {
    localStorage.setItem('selectedWritingType', selectedWritingType);
  }, [selectedWritingType]);

  const analyzeText = useCallback((text: string) => {
    if (!showSpellCheck) return;
    
    const newIssues: WritingIssue[] = [];
    
    // Enhanced spelling mistakes patterns
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
      'theyre': "they're",
      'definately': 'definitely',
      'neccessary': 'necessary',
      'embarass': 'embarrass',
      'begining': 'beginning',
      'wierd': 'weird',
      'freind': 'friend',
      'beleive': 'believe',
      'acheive': 'achieve',
      'goverment': 'government',
      'enviroment': 'environment',
      'tommorrow': 'tomorrow',
      'untill': 'until',
      'wich': 'which',
      'thier': 'their',
      'becuase': 'because',
      'diffrent': 'different',
      'intresting': 'interesting',
      'explaination': 'explanation'
    };

    // Grammar patterns (only incorrect grammar)
    const grammarPatterns = {
      'i am': 'I am',
      'i have': 'I have',
      'i will': 'I will',
      'i was': 'I was',
      'i can': 'I can',
      'i would': 'I would',
      'i could': 'I could',
      'i should': 'I should'
    };

    // Enhanced vocabulary improvements with multiple suggestions
    const vocabularyPatterns = {
      'good': 'excellent, outstanding, remarkable, superb, exceptional',
      'bad': 'poor, inadequate, unsatisfactory, terrible, awful',
      'said': 'exclaimed, declared, announced, stated, mentioned',
      'nice': 'pleasant, delightful, charming, wonderful, lovely',
      'big': 'enormous, massive, substantial, huge, gigantic',
      'small': 'tiny, minute, compact, minuscule, petite',
      'happy': 'joyful, delighted, cheerful, ecstatic, elated',
      'sad': 'unhappy, gloomy, melancholy, sorrowful, dejected',
      'walk': 'stroll, amble, wander, stride, march',
      'run': 'dash, sprint, race, hurry, rush',
      'look': 'gaze, stare, observe, examine, glance',
      'went': 'traveled, journeyed, ventured, proceeded, departed',
      'saw': 'noticed, observed, spotted, witnessed, glimpsed',
      'got': 'received, obtained, acquired, gained, secured',
      'make': 'create, produce, construct, build, craft',
      'think': 'believe, consider, ponder, contemplate, reflect',
      'started': 'began, commenced, initiated, launched, embarked',
      'very': 'extremely, incredibly, remarkably, exceptionally',
      'really': 'truly, genuinely, absolutely, certainly',
      'thing': 'object, item, element, aspect, matter',
      'stuff': 'items, materials, belongings, things, objects'
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
          message: `Spelling error: "${incorrect}" should be "${correct}"`,
          suggestion: correct
        });
      }
    });

    // Check grammar
    Object.entries(grammarPatterns).forEach(([incorrect, correct]) => {
      const regex = new RegExp(`\\b${incorrect}\\b`, 'g');
      let match;
      while ((match = regex.exec(text)) !== null) {
        newIssues.push({
          start: match.index,
          end: match.index + incorrect.length,
          type: 'grammar',
          message: `Grammar: "${incorrect}" should be capitalized as "${correct}"`,
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
          message: `Consider using a more descriptive word instead of "${basic}"`,
          suggestion: improvements
        });
      }
    });

    // Check for repeated words
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    const wordPositions: { [key: string]: number[] } = {};
    
    words.forEach((word, index) => {
      if (word.length > 3) {
        if (!wordPositions[word]) {
          wordPositions[word] = [];
        }
        wordPositions[word].push(index);
      }
    });

    Object.entries(wordPositions).forEach(([word, positions]) => {
      if (positions.length > 1) {
        for (let i = 1; i < positions.length; i++) {
          if (positions[i] - positions[i-1] < 20) { // Words within 20 words of each other
            const wordStart = text.toLowerCase().indexOf(word, text.toLowerCase().indexOf(word) + 1);
            if (wordStart !== -1) {
              const suggestions = vocabularyPatterns[word as keyof typeof vocabularyPatterns];
              if (suggestions) {
                newIssues.push({
                  start: wordStart,
                  end: wordStart + word.length,
                  type: 'style',
                  message: `This word appears multiple times nearby. Try using a different word for variety.`,
                  suggestion: suggestions
                });
              }
            }
          }
        }
      }
    });

    setIssues(newIssues);
  }, [showSpellCheck]);

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
    if (highlightLayerRef.current) {
      highlightLayerRef.current.scrollTop = e.currentTarget.scrollTop;
    }
  };

  const handleIssueClick = (issue: WritingIssue, wordElement: HTMLElement) => {
    const rect = wordElement.getBoundingClientRect();
    const containerRect = containerRef.current?.getBoundingClientRect();
    
    if (containerRect) {
      let x = rect.left - containerRect.left;
      let y = rect.top - containerRect.top + rect.height + 5;

      // Ensure popup stays within container bounds
      const maxX = containerRect.width - 300;
      if (x > maxX) x = maxX;
      if (x < 0) x = 0;

      const maxY = containerRect.height - 200;
      if (y > maxY) y = rect.top - containerRect.top - 220;

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

  const renderContentWithHighlights = () => {
    if (!content || !showSpellCheck || !showHighlights) {
      return content;
    }

    const elements: JSX.Element[] = [];
    let lastIndex = 0;

    // Sort issues by start position
    const sortedIssues = [...issues].sort((a, b) => a.start - b.start);

    sortedIssues.forEach((issue, index) => {
      // Add text before the issue
      if (issue.start > lastIndex) {
        elements.push(
          <span key={`text-${index}`}>
            {content.slice(lastIndex, issue.start)}
          </span>
        );
      }

      // Add the highlighted issue
      const issueText = content.slice(issue.start, issue.end);
      const issueId = `issue-${issue.start}-${issue.end}`;
      
      elements.push(
        <span
          key={issueId}
          className={`inline-block cursor-pointer rounded px-1 ${getHighlightClass(issue.type)}`}
          onClick={(e) => handleIssueClick(issue, e.currentTarget)}
          title={issue.message}
        >
          {issueText}
        </span>
      );

      lastIndex = issue.end;
    });

    // Add remaining text
    if (lastIndex < content.length) {
      elements.push(
        <span key="text-end">
          {content.slice(lastIndex)}
        </span>
      );
    }

    return elements;
  };

  const getHighlightClass = (type: WritingIssue['type']) => {
    switch (type) {
      case 'spelling':
        return 'bg-red-100 border-b-2 border-red-400 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'grammar':
        return 'bg-yellow-100 border-b-2 border-yellow-400 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'vocabulary':
        return 'bg-green-100 border-b-2 border-green-400 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'structure':
        return 'bg-purple-100 border-b-2 border-purple-400 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      case 'style':
        return 'bg-orange-100 border-b-2 border-orange-400 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
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

  const handleSubmitEssay = () => {
    setShowEvaluationModal(true);
  };

  const noTypeSelected = !selectedWritingType;
  const currentTextType = selectedWritingType || textType;

  return (
    <div ref={containerRef} className="h-full flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow-sm writing-area-container">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 space-y-4 content-spacing">
        <div className="flex flex-wrap justify-between items-center gap-2">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white capitalize">
            {currentTextType ? `${currentTextType} Writing` : (
              <button
                onClick={() => setShowWritingTypeModal(true)}
                className="text-blue-600 hover:underline"
              >
                Select Writing Type
              </button>
            )}
          </h2>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={showSpellCheck}
                onChange={(e) => setShowSpellCheck(e.target.checked)}
                className="rounded"
              />
              <span className="text-gray-700 dark:text-gray-300">Spell Check</span>
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={showHighlights}
                onChange={(e) => setShowHighlights(e.target.checked)}
                className="rounded"
              />
              <span className="text-gray-700 dark:text-gray-300">Highlights</span>
            </label>
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
        </div>

        {prompt && !noTypeSelected && (
          <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-md">
            <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Writing Prompt:</h3>
            <p className="text-blue-800 dark:text-blue-200">{prompt}</p>
          </div>
        )}

        {showSpellCheck && issues.length > 0 && (
          <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Found {issues.length} suggestion{issues.length !== 1 ? 's' : ''}:
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="inline-flex items-center px-2 py-1 bg-red-100 text-red-800 rounded dark:bg-red-900/30 dark:text-red-300">
                <span className="w-2 h-2 bg-red-400 rounded-full mr-1"></span>
                Spelling ({issues.filter(i => i.type === 'spelling').length})
              </span>
              <span className="inline-flex items-center px-2 py-1 bg-yellow-100 text-yellow-800 rounded dark:bg-yellow-900/30 dark:text-yellow-300">
                <span className="w-2 h-2 bg-yellow-400 rounded-full mr-1"></span>
                Grammar ({issues.filter(i => i.type === 'grammar').length})
              </span>
              <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 rounded dark:bg-green-900/30 dark:text-green-300">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-1"></span>
                Vocabulary ({issues.filter(i => i.type === 'vocabulary').length})
              </span>
              <span className="inline-flex items-center px-2 py-1 bg-orange-100 text-orange-800 rounded dark:bg-orange-900/30 dark:text-orange-300">
                <span className="w-2 h-2 bg-orange-400 rounded-full mr-1"></span>
                Style ({issues.filter(i => i.type === 'style').length})
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="relative flex-1 overflow-hidden writing-area-enhanced">
        {showSpellCheck && showHighlights ? (
          <div 
            ref={highlightLayerRef}
            className="absolute inset-0 p-4 overflow-y-auto pointer-events-none"
            style={{ 
              fontSize: '16px', 
              lineHeight: '1.6',
              fontFamily: 'inherit',
              whiteSpace: 'pre-wrap',
              wordWrap: 'break-word'
            }}
          >
            <div 
              className="min-h-full text-gray-900 dark:text-white"
              style={{ pointerEvents: 'auto' }}
            >
              {content ? renderContentWithHighlights() : (
                <span className="text-gray-400 dark:text-gray-500">
                  {noTypeSelected ? "Select a writing type to begin..." : 
                   !prompt ? "Choose or enter a prompt to start writing..." : 
                   "Begin writing here..."}
                </span>
              )}
            </div>
          </div>
        ) : null}
        
        <textarea
          ref={textareaRef}
          value={content}
          onChange={handleContentChange}
          onScroll={handleScroll}
          disabled={noTypeSelected || !prompt}
          className={`absolute inset-0 w-full h-full p-4 text-gray-900 dark:text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 dark:disabled:bg-gray-700 disabled:cursor-not-allowed overflow-y-auto writing-textarea ${
            showSpellCheck && showHighlights ? 'bg-transparent text-transparent caret-black dark:caret-white' : 'bg-white dark:bg-gray-800'
          }`}
          placeholder={noTypeSelected ? "Select a writing type to begin..." : !prompt ? "Choose or enter a prompt to start writing..." : "Begin writing here..."}
          style={{ 
            fontSize: '16px',
            lineHeight: '1.6',
            fontFamily: 'inherit'
          }}
        />

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

      {/* Submit Button */}
      {content.trim() && content.split(' ').filter(word => word.trim()).length >= 50 && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={handleSubmitEssay}
            className="w-full flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            <Send className="w-4 h-4 mr-2" />
            Submit for Evaluation
          </button>
        </div>
      )}

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

      <EssayEvaluationModal
        isOpen={showEvaluationModal}
        onClose={() => setShowEvaluationModal(false)}
        content={content}
        textType={currentTextType}
      />
    </div>
  );
}

