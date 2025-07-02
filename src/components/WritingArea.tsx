// WritingArea.tsx (Simplified Version)
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { generatePrompt, getSynonyms, rephraseSentence } from '../lib/openai';
import { AlertCircle } from 'lucide-react';
import { InlineSuggestionPopup } from './InlineSuggestionPopup';
import { AutoSave } from './AutoSave';
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
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showCustomPrompt, setShowCustomPrompt] = useState(false);
  const [customPrompt, setCustomPrompt] = useState('');
  const [issues, setIssues] = useState<WritingIssue[]>([]);
  const [selectedIssue, setSelectedIssue] = useState<WritingIssue | null>(null);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showPromptButtons, setShowPromptButtons] = useState(true);
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentContent = content || '';
  const wordCount = currentContent.split(' ').filter(word => word.trim()).length;

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

  const noTypeSelected = !textType;

  return (
    <div ref={containerRef} className="h-full flex flex-col bg-white rounded-lg shadow-sm writing-area-container">
      <div className="p-4 border-b space-y-4 content-spacing">
        <div className="flex flex-wrap justify-between items-center gap-2">
          <h2 className="text-lg font-medium text-gray-900 capitalize">
            {textType ? `${textType} Writing` : 'Writing Area'}
          </h2>
        </div>

        {!noTypeSelected && showPromptButtons && (
          <div className="flex flex-wrap space-x-2 gap-2">
            <button
              onClick={() => setShowCustomPrompt(true)}
              className="px-4 py-2 bg-blue-600 text-white border border-blue-600 rounded-md hover:bg-blue-700 text-sm font-medium touch-friendly-button"
            >
              I have my own prompt
            </button>
            <button
              onClick={handleGeneratePrompt}
              disabled={isGenerating}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium touch-friendly-button"
            >
              Generate New Prompt
            </button>
          </div>
        )}

        {showCustomPrompt && !noTypeSelected && (
          <form onSubmit={handleCustomPromptSubmit} className="space-y-2">
            <textarea
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="Enter your own writing prompt..."
              className="w-full p-2 border rounded-md text-sm"
              rows={3}
            />
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setShowCustomPrompt(false)}
                className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800"
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
          <div className="bg-blue-50 p-4 rounded-md">
            <h3 className="font-medium text-blue-900 mb-2">Writing Prompt:</h3>
            <p className="text-blue-800">{prompt}</p>
          </div>
        )}
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        <textarea
          ref={textareaRef}
          value={currentContent}
          onChange={handleContentChange}
          onScroll={handleScroll}
          disabled={noTypeSelected || !prompt}
          className="w-full h-96 p-4 text-gray-900 resize-none focus:outline-none border rounded-md disabled:bg-gray-100"
          placeholder={
            noTypeSelected
              ? 'Select a writing type to begin...'
              : !prompt
              ? 'Choose or enter a prompt to start writing...'
              : 'Begin writing here...'
          }
        />
      </div>

      <div className="p-4 border-t bg-gray-50 content-spacing flex justify-between items-center">
        <div className="text-sm text-gray-500">
          Word count: {wordCount}
        </div>
        <div className="flex gap-4">
          <AutoSave content={currentContent} textType={textType} />
          <button
            onClick={onSubmit}
            disabled={!currentContent.trim()}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 text-sm font-medium"
          >
            Submit Essay
          </button>
        </div>
      </div>
    </div>
  );
}

