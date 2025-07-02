// File: src/components/EnhancedWritingArea.tsx
// Copy this entire file and replace your existing EnhancedWritingArea.tsx

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { generatePrompt, getSynonyms, rephraseSentence } from '../lib/openai';
import { AlertCircle } from 'lucide-react';
import { InlineSuggestionPopup } from './InlineSuggestionPopup';
import { AutoSave } from './AutoSave';
import './responsive.css';

interface EnhancedWritingAreaProps {
  content: string;
  onChange: (content: string) => void;
  textType: string;
  onTimerStart: (started: boolean) => void;
  onSubmit: () => void;
}

interface Issue {
  id: string;
  type: 'grammar' | 'spelling' | 'style' | 'vocabulary';
  text: string;
  start: number;
  end: number;
  suggestion: string;
  explanation: string;
}

export function EnhancedWritingArea({ 
  content, 
  onChange, 
  textType, 
  onTimerStart, 
  onSubmit 
}: EnhancedWritingAreaProps) {
  const [prompt, setPrompt] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [showCustomPrompt, setShowCustomPrompt] = useState<boolean>(false);
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const [issues, setIssues] = useState<Issue[]>([]);
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [popupPosition, setPopupPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showPromptButtons, setShowPromptButtons] = useState<boolean>(true);
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Start timer when prompt is set
  useEffect(() => {
    if (prompt) {
      onTimerStart(true);
      setShowPromptButtons(false);
    }
  }, [prompt, onTimerStart]);

  // Handle prompt generation
  const handleGeneratePrompt = async () => {
    setIsGenerating(true);
    try {
      const newPrompt = await generatePrompt(textType);
      if (newPrompt) {
        setPrompt(newPrompt);
        setShowCustomPrompt(false);
      }
    } catch (error) {
      console.error('Error generating prompt:', error);
      // Fallback prompt
      setPrompt(`Write a ${textType} about a topic that interests you.`);
    } finally {
      setIsGenerating(false);
    }
  };

  // Handle custom prompt submission
  const handleCustomPromptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customPrompt.trim()) {
      setPrompt(customPrompt);
      setShowCustomPrompt(false);
    }
  };

  // Handle content changes
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    onChange(newContent);
  };

  // Handle essay submission
  const handleSubmitEssay = () => {
    onSubmit();
  };

  // Handle text selection for suggestions
  const handleTextSelection = useCallback(async () => {
    if (!textareaRef.current) return;

    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    if (start === end) {
      setSelectedIssue(null);
      return;
    }

    const selectedText = content.substring(start, end);
    if (selectedText.trim().length === 0) return;

    // Calculate popup position
    const rect = textarea.getBoundingClientRect();
    const textBeforeSelection = content.substring(0, start);
    const lines = textBeforeSelection.split('\n');
    const lineHeight = 20; // Approximate line height
    const charWidth = 8; // Approximate character width
    
    const y = rect.top + (lines.length - 1) * lineHeight + 30;
    const x = rect.left + (lines[lines.length - 1]?.length || 0) * charWidth;

    setPopupPosition({ x, y });
    setIsLoadingSuggestions(true);

    try {
      // Get suggestions for the selected text
      const synonyms = await getSynonyms(selectedText);
      const rephrase = await rephraseSentence(selectedText);
      
      const mockIssue: Issue = {
        id: `suggestion-${Date.now()}`,
        type: 'vocabulary',
        text: selectedText,
        start,
        end,
        suggestion: synonyms.join(', ') || rephrase,
        explanation: 'Here are some alternative words or phrases you could use.'
      };

      setSelectedIssue(mockIssue);
    } catch (error) {
      console.error('Error getting suggestions:', error);
    } finally {
      setIsLoadingSuggestions(false);
    }
  }, [content]);

  // Apply suggestion to text
  const applySuggestion = useCallback((suggestion: string, start: number, end: number) => {
    const newContent = content.substring(0, start) + suggestion + content.substring(end);
    onChange(newContent);
    setSelectedIssue(null);
  }, [content, onChange]);

  // Handle paraphrase request
  const handleParaphrase = useCallback(async () => {
    if (!selectedIssue) return;
    
    setIsLoadingSuggestions(true);
    try {
      const rephrase = await rephraseSentence(selectedIssue.text);
      setSelectedIssue({
        ...selectedIssue,
        suggestion: rephrase,
        explanation: 'Here is a rephrased version of your text.'
      });
    } catch (error) {
      console.error('Error rephrasing:', error);
    } finally {
      setIsLoadingSuggestions(false);
    }
  }, [selectedIssue]);

  // Handle thesaurus request
  const handleThesaurus = useCallback(async () => {
    if (!selectedIssue) return;
    
    setIsLoadingSuggestions(true);
    try {
      const synonyms = await getSynonyms(selectedIssue.text);
      setSelectedIssue({
        ...selectedIssue,
        suggestion: synonyms.join(', '),
        explanation: 'Here are some synonyms for the selected word.'
      });
    } catch (error) {
      console.error('Error getting synonyms:', error);
    } finally {
      setIsLoadingSuggestions(false);
    }
  }, [selectedIssue]);

  const noTypeSelected = !textType;

  return (
    <div ref={containerRef} className="h-full flex flex-col bg-white rounded-lg shadow-sm writing-area-container">
      {/* Header Section */}
      <div className="p-4 border-b space-y-4 content-spacing">
        <div className="flex flex-wrap justify-between items-center gap-2">
          <h2 className="text-lg font-medium text-gray-900 capitalize">
            {textType ? `${textType} Writing` : 'Writing Area'}
          </h2>
        </div>

        {/* Prompt Buttons */}
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
              {isGenerating ? 'Generating...' : 'Generate New Prompt'}
            </button>
          </div>
        )}

        {/* Custom Prompt Form */}
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

        {/* Display Current Prompt */}
        {prompt && !showCustomPrompt && !noTypeSelected && (
          <div className="bg-blue-50 p-4 rounded-md">
            <h3 className="font-medium text-blue-900 mb-2">Writing Prompt:</h3>
            <p className="text-blue-800">{prompt}</p>
          </div>
        )}
      </div>

      {/* Writing Area */}
      <div className="flex-1 p-4 overflow-y-auto relative">
        <textarea
          ref={textareaRef}
          value={content}
          onChange={handleContentChange}
          onMouseUp={handleTextSelection}
          onKeyUp={handleTextSelection}
          disabled={noTypeSelected || !prompt}
          className="w-full h-96 p-4 text-gray-900 resize-none focus:outline-none border rounded-md disabled:bg-gray-100 writing-textarea"
          placeholder={
            noTypeSelected
              ? 'Select a writing type to begin...'
              : !prompt
              ? 'Choose or enter a prompt to start writing...'
              : 'Begin writing here... (Select text to get suggestions)'
          }
        />

        {/* Inline Suggestion Popup */}
        {selectedIssue && (
          <InlineSuggestionPopup
            original={selectedIssue.text}
            suggestion={selectedIssue.suggestion}
            explanation={selectedIssue.explanation}
            position={popupPosition}
            onApply={applySuggestion}
            onParaphrase={handleParaphrase}
            onThesaurus={handleThesaurus}
            onClose={() => setSelectedIssue(null)}
            start={selectedIssue.start}
            end={selectedIssue.end}
            isLoading={isLoadingSuggestions}
          />
        )}
      </div>

      {/* Footer Section */}
      <div className="p-4 border-t bg-gray-50 content-spacing flex justify-between items-center">
        <div className="text-sm text-gray-500">
          Word count: {content.split(/\s+/).filter(Boolean).length}
        </div>
        <div className="flex gap-4 items-center">
          <AutoSave 
            content={content} 
            textType={textType}
            onRestore={(restoredContent, restoredType) => {
              onChange(restoredContent);
              // You might want to also update the text type if needed
            }}
          />
          <button
            onClick={handleSubmitEssay}
            disabled={!content.trim()}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 text-sm font-medium touch-friendly-button"
          >
            Submit Essay
          </button>
        </div>
      </div>
    </div>
  );
}

