import React, { useState, useRef, useEffect, useCallback } from 'react';
import { generatePrompt, getSynonyms, rephraseSentence, evaluateEssay } from '../lib/openai';
import { dbOperations } from '../lib/database';
import { useApp } from '../contexts/AppContext';
import { AlertCircle, Send, Sparkles } from 'lucide-react';
import { InlineSuggestionPopup } from './InlineSuggestionPopup';
import { WritingStatusBar } from './WritingStatusBar';
import { WritingTypeSelectionModal } from './WritingTypeSelectionModal';
import { PromptOptionsModal } from './PromptOptionsModal';
import { CustomPromptModal } from './CustomPromptModal';
import { EssayEvaluationModal } from './EssayEvaluationModal';
import { NarrativeWritingTemplateRedesigned } from './NarrativeWritingTemplateRedesigned';
import { PersuasiveWritingTemplate } from './PersuasiveWritingTemplate';
import { ExpositoryWritingTemplate } from './ExpositoryWritingTemplate';
import { ReflectiveWritingTemplate } from './ReflectiveWritingTemplate';
import { DescriptiveWritingTemplate } from './DescriptiveWritingTemplate';
import { RecountWritingTemplate } from './RecountWritingTemplate';
import { DiscursiveWritingTemplate } from './DiscursiveWritingTemplate';
import { NewsReportWritingTemplate } from './NewsReportWritingTemplate';
import { LetterWritingTemplate } from './LetterWritingTemplate';
import { DiaryWritingTemplate } from './DiaryWritingTemplate';
import { SpeechWritingTemplate } from './SpeechWritingTemplate';
import './responsive.css';
import './layout-fix.css';
import './full-width-fix.css';

interface WritingAreaProps {
  content: string;
  onChange: (content: string) => void;
  textType: string;
  onTimerStart: (shouldStart: boolean) => void;
  onSubmit: () => void;
  onTextTypeChange?: (textType: string) => void;
  onPopupCompleted?: () => void;
  onPromptGenerated?: (prompt: string) => void;
}

interface WritingIssue {
  start: number;
  end: number;
  type: 'spelling' | 'grammar' | 'vocabulary' | 'structure' | 'style';
  message: string;
  suggestion: string;
}

export function WritingArea({ content, onChange, textType, onTimerStart, onSubmit, onTextTypeChange, onPopupCompleted, onPromptGenerated }: WritingAreaProps) {
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
  
  // New state for popup management
  const [showWritingTypeModal, setShowWritingTypeModal] = useState(false);
  const [showPromptOptionsModal, setShowPromptOptionsModal] = useState(false);
  const [showCustomPromptModal, setShowCustomPromptModal] = useState(false);
  const [selectedWritingType, setSelectedWritingType] = useState('');
  const [showEvaluationModal, setShowEvaluationModal] = useState(false);
  const [popupFlowCompleted, setPopupFlowCompleted] = useState(false);
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const highlightLayerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const checkTimeoutRef = useRef<NodeJS.Timeout>(); // STABILITY FIX: Add timeout ref
  const clickTimeoutRef = useRef<NodeJS.Timeout>(); // RESPONSIVENESS FIX: Add click timeout ref

  // Initialize popup flow when component mounts - STABILITY FIX
  useEffect(() => {
    let isMounted = true; // Prevent state updates if component unmounts
    
    const initializeComponent = () => {
      if (!isMounted) return;
      
      const savedContent = localStorage.getItem('writingContent');
      const savedWritingType = localStorage.getItem('selectedWritingType');

      if (savedContent && isMounted) {
        onChange(savedContent);
      }
      if (savedWritingType && isMounted) {
        setSelectedWritingType(savedWritingType);
        if (onTextTypeChange) {
          onTextTypeChange(savedWritingType);
        }
        
        // Check if there's already a saved prompt for this writing type
        const savedPrompt = localStorage.getItem(`${savedWritingType}_prompt`);
        if (savedPrompt && isMounted) {
          setPrompt(savedPrompt);
          setPopupFlowCompleted(true);
          if (onPromptGenerated) {
            onPromptGenerated(savedPrompt);
          }
        }
      }
      
      // Only initialize the writing type selection flow if conditions are met
      if (!textType && !savedWritingType && !popupFlowCompleted && isMounted && !prompt) {
        setShowWritingTypeModal(true);
      }
    };

    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(initializeComponent);
    
    return () => {
      isMounted = false; // Cleanup flag
      // RESPONSIVENESS FIX: Cleanup timeouts on unmount
      if (checkTimeoutRef.current) {
        clearTimeout(checkTimeoutRef.current);
      }
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }
    };
  }, []); // Stable dependencies

  useEffect(() => {
    if (prompt) {
      onTimerStart(true);
    }
  }, [prompt, onTimerStart]);

  // Load saved prompt from localStorage
  useEffect(() => {
    if (selectedWritingType || textType) {
      const currentTextType = textType || selectedWritingType;
      const savedPrompt = localStorage.getItem(`${currentTextType}_prompt`);
      if (savedPrompt) {
        setPrompt(savedPrompt);
        // Pass the loaded prompt to parent
        if (onPromptGenerated) {
          onPromptGenerated(savedPrompt);
        }
      }
    }
  }, [selectedWritingType, textType, onPromptGenerated]);

  // Pass prompt to parent whenever it changes
  useEffect(() => {
    if (prompt && onPromptGenerated) {
      onPromptGenerated(prompt);
    }
  }, [prompt, onPromptGenerated]);

  // Persist content and selectedWritingType to localStorage
  useEffect(() => {
    localStorage.setItem('writingContent', content);
  }, [content]);

  useEffect(() => {
    localStorage.setItem('selectedWritingType', selectedWritingType);
  }, [selectedWritingType]);

  // PERFORMANCE FIX: Optimized text analysis with early returns and limits
  const analyzeText = useCallback((text: string) => {
    // Early return for short text to improve performance
    if (text.length < 10) {
      setIssues([]);
      return;
    }
    
    // Limit analysis to prevent performance issues with very long text
    const maxAnalysisLength = 5000;
    const analysisText = text.length > maxAnalysisLength ? text.substring(0, maxAnalysisLength) : text;
    
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

    // Vocabulary improvements with multiple suggestions (limited set for performance)
    const vocabularyPatterns = {
      'good': 'excellent, outstanding, remarkable',
      'bad': 'poor, inadequate, unsatisfactory',
      'said': 'exclaimed, declared, announced',
      'nice': 'pleasant, delightful, charming',
      'big': 'enormous, massive, substantial',
      'small': 'tiny, minute, compact',
      'happy': 'joyful, delighted, cheerful',
      'sad': 'unhappy, gloomy, melancholy'
    };

    // Batch process patterns for better performance
    const processPatterns = (patterns: Record<string, string>, type: WritingIssue['type'], messageTemplate: string) => {
      Object.entries(patterns).forEach(([incorrect, correct]) => {
        const regex = new RegExp(`\\b${incorrect}\\b`, 'gi');
        let match;
        let matchCount = 0;
        
        // Limit matches per pattern to prevent performance issues
        while ((match = regex.exec(analysisText)) !== null && matchCount < 10) {
          newIssues.push({
            start: match.index,
            end: match.index + incorrect.length,
            type,
            message: messageTemplate.replace('{word}', incorrect).replace('{suggestion}', correct),
            suggestion: correct
          });
          matchCount++;
        }
      });
    };

    // Process each type of pattern
    processPatterns(spellingPatterns, 'spelling', 'This word is misspelled. The correct spelling is "{suggestion}".');
    processPatterns(grammarPatterns, 'grammar', 'This needs proper capitalization.');
    
    // Process vocabulary with first suggestion only for performance
    Object.entries(vocabularyPatterns).forEach(([basic, improvements]) => {
      const regex = new RegExp(`\\b${basic}\\b`, 'gi');
      let match;
      let matchCount = 0;
      
      while ((match = regex.exec(analysisText)) !== null && matchCount < 5) {
        newIssues.push({
          start: match.index,
          end: match.index + basic.length,
          type: 'vocabulary',
          message: `Consider using a more descriptive word instead of "${basic}".`,
          suggestion: improvements.split(', ')[0]
        });
        matchCount++;
      }
    });

    // Limit total issues to prevent UI performance problems
    const maxIssues = 50;
    setIssues(newIssues.slice(0, maxIssues));
  }, []);

  // PERFORMANCE FIX: Debounced text analysis to prevent interface freezing
  useEffect(() => {
    if (content) {
      // Clear previous timeout
      if (checkTimeoutRef.current) {
        clearTimeout(checkTimeoutRef.current);
      }
      
      // Debounce text analysis to prevent performance issues
      checkTimeoutRef.current = setTimeout(() => {
        // Only analyze if content is substantial enough
        if (content.length > 10) {
          analyzeText(content);
        }
      }, 1500); // Increased debounce time for better performance
      
      return () => {
        if (checkTimeoutRef.current) {
          clearTimeout(checkTimeoutRef.current);
        }
      };
    }
  }, [content, analyzeText]);

  // STABILITY FIX: Improved save function with proper error handling
  const saveContent = useCallback(async () => {
    if (!content.trim() || isSaving) return;
    
    setIsSaving(true);
    try {
      await dbOperations.saveWriting({
        content,
        textType: textType || selectedWritingType,
        prompt,
        wordCount: countWords(content),
        createdAt: new Date()
      });
      setLastSaved(new Date());
    } catch (error) {
      console.error('Failed to save content:', error);
      // Don't throw error to prevent component crashes
    } finally {
      setIsSaving(false);
    }
  }, [content, textType, selectedWritingType, prompt, isSaving]);

  // STABILITY FIX: Improved auto-save with cleanup
  useEffect(() => {
    const interval = setInterval(saveContent, 30000);
    return () => {
      clearInterval(interval);
      // Cancel any pending save operations
      setIsSaving(false);
    };
  }, [saveContent]);

  const countWords = (text: string): number => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  // RESPONSIVENESS FIX: Optimized text change handler
  const handleTextareaChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    
    // Use requestAnimationFrame for smooth updates
    requestAnimationFrame(() => {
      onChange(newValue);
    });
  }, [onChange]);

  // RESPONSIVENESS FIX: Optimized click handler with debouncing
  const handleTextareaClick = useCallback((e: React.MouseEvent<HTMLTextAreaElement>) => {
    // Debounce click handling to prevent excessive processing
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }
    
    clickTimeoutRef.current = setTimeout(() => {
      const textarea = e.currentTarget;
      const rect = textarea.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Only process if we have issues to check
      if (issues.length === 0) return;
      
      const clickedIssue = issues.find(issue => {
        const start = getTextPosition(textarea, issue.start);
        const end = getTextPosition(textarea, issue.end);
        return x >= start.x && x <= end.x && y >= start.y && y <= end.y;
      });
      
      if (clickedIssue) {
        const containerRect = containerRef.current?.getBoundingClientRect();
        if (containerRect) {
          let popupX = x;
          let popupY = y + 20;

          const maxX = containerRect.width - 300;
          if (popupX > maxX) popupX = maxX;
          if (popupX < 0) popupX = 0;

          const maxY = containerRect.height - 200;
          if (popupY > maxY) popupY = y - 220;

          setPopupPosition({ x: popupX, y: popupY });
          setSelectedIssue(clickedIssue);
          setSuggestions([]);
        }
      }
    }, 100); // Small debounce to prevent excessive processing
  }, [issues]);

  const getTextPosition = (textarea: HTMLTextAreaElement, index: number) => {
    const text = textarea.value;
    const lines = text.substring(0, index).split('\n');
    const lineHeight = 24;
    const charWidth = 8;
    
    return {
      x: lines[lines.length - 1].length * charWidth,
      y: (lines.length - 1) * lineHeight
    };
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

  const renderHighlightedText = () => {
    if (!showHighlights || !content) return null;

    let lastIndex = 0;
    const elements: React.ReactNode[] = [];

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
      elements.push(
        <span
          key={`issue-${index}`}
          className={`writing-highlight writing-highlight-${issue.type}`}
          data-issue-type={issue.type}
          data-message={issue.message}
          data-suggestion={issue.suggestion}
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

  // Handle writing type selection
  const handleWritingTypeSelect = (type: string) => {
    setSelectedWritingType(type);
    localStorage.setItem('selectedWritingType', type);
    
    // Close the writing type modal and show prompt options modal
    setShowWritingTypeModal(false);
    
    // Add a small delay to ensure smooth transition
    setTimeout(() => {
      setShowPromptOptionsModal(true);
    }, 100);
    
    // Call the callback to update parent component
    if (onTextTypeChange) {
      onTextTypeChange(type);
    }
  };

  // Handle prompt generation
  const handleGeneratePrompt = async () => {
    setShowPromptOptionsModal(false);
    setIsGenerating(true);
    
    // Use the current text type (either from props or local state)
    const currentTextType = textType || selectedWritingType;
    const newPrompt = await generatePrompt(currentTextType);
    
    if (newPrompt) {
      setPrompt(newPrompt);
      
      // Save prompt to localStorage using the current text type
      if (currentTextType) {
        localStorage.setItem(`${currentTextType}_prompt`, newPrompt);
      }
      
      // Pass the generated prompt to parent immediately
      if (onPromptGenerated) {
        onPromptGenerated(newPrompt);
      }
    }
    setIsGenerating(false);
    
    // Mark popup flow as completed
    setPopupFlowCompleted(true);
    
    // Call the callback to indicate popup flow is completed
    if (onPopupCompleted) {
      onPopupCompleted();
    }
  };

  // Handle custom prompt option
  const handleCustomPromptOption = () => {
    setShowPromptOptionsModal(false);
    setShowCustomPromptModal(true);
  };

  // Handle custom prompt submission
  const handleCustomPromptSubmit = (customPrompt: string) => {
    setPrompt(customPrompt);
    
    // Use the current text type (either from props or local state)
    const currentTextType = textType || selectedWritingType;
    
    // Save prompt to localStorage using the current text type
    if (currentTextType) {
      localStorage.setItem(`${currentTextType}_prompt`, customPrompt);
    }
    
    // Pass the custom prompt to parent immediately
    if (onPromptGenerated) {
      onPromptGenerated(customPrompt);
    }
    
    setShowCustomPromptModal(false);
    
    // Mark popup flow as completed
    setPopupFlowCompleted(true);
    
    // Call the callback to indicate popup flow is completed
    if (onPopupCompleted) {
      onPopupCompleted();
    }
  };

  const handleEvaluateEssay = () => {
    setShowEvaluationModal(true);
  };

  const renderWritingTemplate = () => {
    const currentTextType = textType || selectedWritingType;
    
    switch (currentTextType) {
      case 'narrative':
        return <NarrativeWritingTemplateRedesigned 
          content={content}
          onChange={onChange}
          onTimerStart={onTimerStart}
          onSubmit={onSubmit}
        />;
      case 'persuasive':
        return <PersuasiveWritingTemplate />;
      case 'expository':
        return <ExpositoryWritingTemplate />;
      case 'reflective':
        return <ReflectiveWritingTemplate />;
      case 'descriptive':
        return <DescriptiveWritingTemplate />;
      case 'recount':
        return <RecountWritingTemplate />;
      case 'discursive':
        return <DiscursiveWritingTemplate />;
      case 'news report':
        return <NewsReportWritingTemplate />;
      case 'letter':
        return <LetterWritingTemplate />;
      case 'diary entry':
        return <DiaryWritingTemplate />;
      case 'speech':
        return <SpeechWritingTemplate />;
      default:
        return null;
    }
  };

  const currentTextType = textType || selectedWritingType;

  return (
    <div ref={containerRef} className="writing-area-container h-full flex flex-col p-0 m-0">
      {/* FIXED: Writing Template Section with Scrolling - Takes remaining space but allows submit button to be visible */}
      {currentTextType && (
        <div className="writing-template-section flex-1 overflow-y-auto min-h-0">
          {renderWritingTemplate()}
        </div>
      )}

      {/* FIXED: Status Bar - Always visible at bottom */}
      <div className="status-section py-1 px-2 flex-shrink-0 bg-white border-t border-gray-200">
        <WritingStatusBar
          content={content}
          textType={currentTextType}
        />
      </div>

      {/* FIXED: Submit Button - Always visible at bottom */}
      <div className="submit-section pt-2 px-2 pb-2 flex-shrink-0 bg-white">
        <div className="flex justify-center">
          <button
            onClick={handleEvaluateEssay}
            disabled={countWords(content) < 50}
            className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:transform-none disabled:cursor-not-allowed flex items-center gap-2"
            title={countWords(content) < 50 ? 'Write at least 50 words to submit for evaluation' : 'Submit your essay for detailed evaluation'}
          >
            <Send className="w-4 h-4" />
            Submit for Evaluation
            <span className="text-xs opacity-80 bg-white/20 px-2 py-0.5 rounded-full">
              {countWords(content)} words
            </span>
          </button>
        </div>
      </div>

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