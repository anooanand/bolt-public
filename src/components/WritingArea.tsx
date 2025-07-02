import React, { useState, useEffect, useRef, useCallback } from 'react';
import { generatePrompt, getSynonyms, rephraseSentence, evaluateEssay, getWritingFeedback, identifyCommonMistakes, getTextTypeVocabulary, getSpecializedTextTypeFeedback, getWritingStructure } from '../lib/openai';
import { dbOperations } from '../lib/database';
import { useApp } from '../contexts/AppContext';
import { AlertCircle, MessageSquare, BookOpen, PenTool } from 'lucide-react';
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
  const [writingFeedback, setWritingFeedback] = useState<any>(null);
  const [commonMistakes, setCommonMistakes] = useState<any>(null);
  const [vocabularySuggestions, setVocabularySuggestions] = useState<any>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentContent = content || '';

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
    
    // Simplified spelling patterns
    const spellingPatterns = {
      'recieve': 'receive',
      'seperate': 'separate',
      'alot': 'a lot',
      'cant': "can't",
      'dont': "don't",
      'youre': "you're",
      'theyre': "they're"
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
          message: `Spelling: "${correct}"`,
          suggestion: correct
        });
      }
    });

    setIssues(newIssues);
  }, []);

  // Auto-save functionality
  useEffect(() => {
    if (currentContent.trim() && textType && state.user) {
      const saveTimer = setTimeout(async () => {
        setIsSaving(true);
        try {
          const wordCount = currentContent.split(' ').filter(word => word.trim()).length;
          const title = currentContent.split('\n')[0].substring(0, 50) || `${textType} Writing`;
          
          const { data, error } = await dbOperations.writings.createWriting({
            title,
            content: currentContent,
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
      }, 30000);

      return () => clearTimeout(saveTimer);
    }
  }, [currentContent, textType, state.user, addWriting]);

  useEffect(() => {
    if (currentContent && currentContent.trim()) {
      analyzeText(currentContent);
    }
  }, [currentContent, analyzeText]);

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
    const newContent = currentContent.slice(0, start) + suggestion + currentContent.slice(end);
    onChange(newContent);
    setSelectedIssue(null);
    setSuggestions([]);
  };

  const handleParaphrase = async () => {
    if (selectedIssue) {
      setIsLoadingSuggestions(true);
      try {
        const text = currentContent.slice(selectedIssue.start, selectedIssue.end);
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
        const word = currentContent.slice(selectedIssue.start, selectedIssue.end).toLowerCase();
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
      default:
        return '';
    }
  };

  const handleGeneratePrompt = async () => {
    setIsGenerating(true);
    const newPrompt = await generatePrompt(textType);
    if (newPrompt) {
      setPrompt(newPrompt);
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
      if (textType) {
        localStorage.setItem(`${textType}_prompt`, customPrompt);
      }
      setShowCustomPrompt(false);
    }
  };

  const handleGetWritingFeedback = async () => {
    if (!currentContent.trim() || !textType) return;
    setIsLoadingSuggestions(true);
    try {
      const feedback = await getWritingFeedback(currentContent, textType, 'Year 5-6', []);
      setWritingFeedback(feedback);
    } catch (error) {
      console.error('Error getting writing feedback:', error);
    } finally {
      setIsLoadingSuggestions(false);
    }
  };

  const handleIdentifyCommonMistakes = async () => {
    if (!currentContent.trim() || !textType) return;
    setIsLoadingSuggestions(true);
    try {
      const mistakes = await identifyCommonMistakes(currentContent, textType);
      setCommonMistakes(mistakes);
    } catch (error) {
      console.error('Error identifying common mistakes:', error);
    } finally {
      setIsLoadingSuggestions(false);
    }
  };

  const handleGetTextTypeVocabulary = async () => {
    if (!textType) return;
    setIsLoadingSuggestions(true);
    try {
      const vocabulary = await getTextTypeVocabulary(textType, currentContent.substring(0, 500));
      setVocabularySuggestions(vocabulary);
    } catch (error) {
      console.error('Error getting text type vocabulary:', error);
    } finally {
      setIsLoadingSuggestions(false);
    }
  };

  const noTypeSelected = !textType;

  return (
    <div ref={containerRef} className="h-full flex bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      {/* Main Writing Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">
              {textType ? `${textType} Writing` : 'Select Writing Type'}
            </h2>
            {noTypeSelected && (
              <div className="flex items-center text-amber-600 dark:text-amber-400 text-sm">
                <AlertCircle className="w-4 h-4 mr-2" />
                Please select a writing type first
              </div>
            )}
          </div>

          {showPromptButtons && !noTypeSelected && (
            <div className="flex space-x-2 mb-4">
              <button
                onClick={() => setShowCustomPrompt(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
              >
                Custom Prompt
              </button>
              <button
                onClick={handleGeneratePrompt}
                disabled={isGenerating}
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 text-sm"
              >
                Generate Prompt
              </button>
            </div>
          )}

          {showCustomPrompt && (
            <form onSubmit={handleCustomPromptSubmit} className="flex space-x-2 mb-4">
              <input
                type="text"
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="Enter your prompt"
                className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm">
                Set
              </button>
            </form>
          )}

          {prompt && (
            <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-md text-blue-800 dark:text-blue-200 text-sm">
              <strong>Prompt:</strong> {prompt}
            </div>
          )}
        </div>

        {/* Writing Area */}
        <div className="flex-1 relative p-4">
          <textarea
            ref={textareaRef}
            className="w-full h-full p-4 text-lg bg-transparent z-10 relative resize-none outline-none text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={currentContent}
            onChange={handleContentChange}
            onScroll={handleScroll}
            placeholder="Start writing here..."
            disabled={noTypeSelected}
          />
          
          {/* Overlay for highlighting issues */}
          <div
            ref={overlayRef}
            className="absolute inset-4 p-4 text-lg pointer-events-none overflow-y-auto"
            style={{ zIndex: 5 }}
            aria-hidden="true"
          >
            {issues.length > 0 && currentContent.split(/(\b\w+\b|\s+|\S)/g).map((part, i) => {
              const charIndex = currentContent.indexOf(part, currentContent.split(/(\b\w+\b|\s+|\S)/g).slice(0, i).join('').length);
              const issue = issues.find(issue => charIndex >= issue.start && charIndex < issue.end);
              return issue ? (
                <span
                  key={i}
                  className={`relative cursor-pointer pointer-events-auto ${getHighlightStyle(issue.type)}`}
                  onClick={(e) => handleIssueClick(issue, e)}
                >
                  {part}
                </span>
              ) : (
                <span key={i}>{part}</span>
              );
            })}
          </div>

          {selectedIssue && (
            <InlineSuggestionPopup
              issue={selectedIssue}
              position={popupPosition}
              onClose={() => setSelectedIssue(null)}
              onApply={handleApplySuggestion}
              onParaphrase={handleParaphrase}
              onThesaurus={handleThesaurus}
              isLoadingSuggestions={isLoadingSuggestions}
              suggestions={suggestions}
            />
          )}
        </div>

        <WritingStatusBar
          wordCount={currentContent.split(' ').filter(word => word.trim()).length}
          charCount={currentContent.length}
          lastSaved={lastSaved}
          isSaving={isSaving}
          issuesCount={issues.length}
          onSubmit={onSubmit}
        />
      </div>

      {/* Simple Sidebar */}
      <div className="w-64 bg-gray-50 dark:bg-gray-700 border-l border-gray-200 dark:border-gray-700 p-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Tools</h3>
        <div className="space-y-2">
          <button
            onClick={handleGetWritingFeedback}
            disabled={isLoadingSuggestions || noTypeSelected}
            className="w-full flex items-center p-3 bg-white dark:bg-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-100 disabled:opacity-50"
          >
            <MessageSquare className="w-4 h-4 mr-2" /> Get Feedback
          </button>
          <button
            onClick={handleIdentifyCommonMistakes}
            disabled={isLoadingSuggestions || noTypeSelected}
            className="w-full flex items-center p-3 bg-white dark:bg-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-100 disabled:opacity-50"
          >
            <PenTool className="w-4 h-4 mr-2" /> Check Mistakes
          </button>
          <button
            onClick={handleGetTextTypeVocabulary}
            disabled={isLoadingSuggestions || noTypeSelected}
            className="w-full flex items-center p-3 bg-white dark:bg-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-100 disabled:opacity-50"
          >
            <BookOpen className="w-4 h-4 mr-2" /> Vocabulary
          </button>
        </div>

        {isLoadingSuggestions && (
          <p className="text-gray-600 dark:text-gray-400 mt-4">Loading...</p>
        )}

        {writingFeedback && (
          <div className="mt-4 p-3 bg-white dark:bg-gray-800 rounded-md">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Feedback:</h4>
            <p className="text-gray-700 dark:text-gray-300 text-sm">{writingFeedback}</p>
          </div>
        )}

        {commonMistakes && (
          <div className="mt-4 p-3 bg-white dark:bg-gray-800 rounded-md">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Mistakes:</h4>
            <p className="text-gray-700 dark:text-gray-300 text-sm">{commonMistakes}</p>
          </div>
        )}

        {vocabularySuggestions && (
          <div className="mt-4 p-3 bg-white dark:bg-gray-800 rounded-md">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Vocabulary:</h4>
            <p className="text-gray-700 dark:text-gray-300 text-sm">{vocabularySuggestions}</p>
          </div>
        )}
      </div>
    </div>
  );
}

