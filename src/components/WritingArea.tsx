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

interface WritingAreaProps {
  content: string;
  onChange: (content: string) => void;
  textType: string;
  onTimerStart: (shouldStart: boolean) => void;
  onSubmit: () => void;
  onTextTypeChange?: (textType: string) => void;
  onPopupCompleted?: () => void;
}

interface WritingIssue {
  start: number;
  end: number;
  type: 'spelling' | 'grammar' | 'vocabulary' | 'structure' | 'style';
  message: string;
  suggestion: string;
}

export function WritingArea({ content, onChange, textType, onTimerStart, onSubmit, onTextTypeChange, onPopupCompleted }: WritingAreaProps) {
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
      if (onTextTypeChange) {
        onTextTypeChange(savedWritingType);
      }
    }
    
    // Initialize the writing type selection flow
    if (!textType && !selectedWritingType) {
      setShowWritingTypeModal(true);
    }
  }, [textType, selectedWritingType, onChange, onTextTypeChange]);

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
      }
    }
  }, [selectedWritingType, textType]);

  // Persist content and selectedWritingType to localStorage
  useEffect(() => {
    localStorage.setItem('writingContent', content);
  }, [content]);

  useEffect(() => {
    localStorage.setItem('selectedWritingType', selectedWritingType);
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
          message: `Consider using a more descriptive word instead of "${basic}".`,
          suggestion: improvements.split(', ')[0] // Use first suggestion as primary
        });
      }
    });

    setIssues(newIssues);
  }, []);

  useEffect(() => {
    if (content) {
      const timeoutId = setTimeout(() => {
        analyzeText(content);
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [content, analyzeText]);

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
    } finally {
      setIsSaving(false);
    }
  }, [content, textType, selectedWritingType, prompt, isSaving]);

  useEffect(() => {
    const interval = setInterval(saveContent, 30000);
    return () => clearInterval(interval);
  }, [saveContent]);

  const countWords = (text: string): number => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const handleTextareaClick = (e: React.MouseEvent<HTMLTextAreaElement>) => {
    const textarea = e.currentTarget;
    const rect = textarea.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
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
  };

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
    }
    setIsGenerating(false);
    
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
    setShowCustomPromptModal(false);
    
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
    <div ref={containerRef} className="writing-area-container h-full flex flex-col p-0">
      {/* Writing Template - Removed margin and padding */}
      {currentTextType && (
        <div className="writing-template-section">
          {renderWritingTemplate()}
        </div>
      )}

      {/* Prompt Display - Removed margin and padding */}
      {prompt && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-none border-0 p-2">
          <div className="flex items-start gap-2">
            <div className="p-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-md">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-base text-gray-900 dark:text-white mb-1">
                Your Writing Prompt
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                {prompt}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Writing Area - Maximized space usage */}
      <div className="writing-main-section flex-1">
        <div className="relative h-full">
          {/* Highlight Layer */}
          <div
            ref={highlightLayerRef}
            className="absolute inset-0 pointer-events-none z-10 p-2 font-mono text-transparent whitespace-pre-wrap break-words"
            style={{
              fontSize: '16px',
              lineHeight: '24px',
              fontFamily: 'inherit'
            }}
          >
            {renderHighlightedText()}
          </div>

          {/* Textarea - Removed padding and border radius */}
          <textarea
            ref={textareaRef}
            value={content}
            onChange={handleTextareaChange}
            onClick={handleTextareaClick}
            placeholder={prompt ? "Start writing your response here..." : "Select a writing type to get started..."}
            className="w-full h-full border-0 bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none focus:outline-none focus:ring-0 relative z-20"
            style={{
              fontSize: '16px',
              lineHeight: '24px',
              fontFamily: 'inherit',
              background: 'transparent',
              padding: '8px' // Minimal padding for text inside textarea
            }}
            disabled={!prompt}
          />
        </div>

        {/* Inline Suggestion Popup */}
        {selectedIssue && (
          <InlineSuggestionPopup
            issue={selectedIssue}
            position={popupPosition}
            suggestions={suggestions}
            isLoading={isLoadingSuggestions}
            onApplySuggestion={handleApplySuggestion}
            onClose={() => setSelectedIssue(null)}
            onParaphrase={handleParaphrase}
            onThesaurus={handleThesaurus}
          />
        )}
      </div>

      {/* Status Bar - Compact */}
      <div className="status-section py-1 px-2">
        <WritingStatusBar
          content={content}
          textType={currentTextType}
        />
      </div>

      {/* Submit Button - Compact */}
      <div className="submit-section pt-2 px-2">
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
