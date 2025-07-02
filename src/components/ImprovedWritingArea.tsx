// ImprovedWritingArea.tsx (Simplified Version)
import React, { useState, useRef, useEffect } from 'react';
import { generatePrompt } from '../lib/openai';
import { AlertCircle } from 'lucide-react';
import { AutoSave } from './AutoSave';
import './responsive.css';

interface ImprovedWritingAreaProps {
  content: string;
  onChange: (content: string) => void;
  textType: string;
  onTimerStart: (started: boolean) => void;
  onSubmit: () => void;
}

interface WritingStats {
  wordCount: number;
  characterCount: number;
  paragraphCount: number;
  readingTime: number;
}

export function ImprovedWritingArea({ 
  content, 
  onChange, 
  textType, 
  onTimerStart, 
  onSubmit 
}: ImprovedWritingAreaProps) {
  const [prompt, setPrompt] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [showCustomPrompt, setShowCustomPrompt] = useState<boolean>(false);
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const [showPromptButtons, setShowPromptButtons] = useState<boolean>(true);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [stats, setStats] = useState<WritingStats>({
    wordCount: 0,
    characterCount: 0,
    paragraphCount: 0,
    readingTime: 0
  });

  // Calculate writing statistics
  useEffect(() => {
    const words = content.trim().split(/\s+/).filter(word => word.length > 0);
    const paragraphs = content.split('\n\n').filter(p => p.trim().length > 0);
    
    setStats({
      wordCount: words.length,
      characterCount: content.length,
      paragraphCount: paragraphs.length,
      readingTime: Math.ceil(words.length / 200)
    });
  }, [content]);

  // Auto-save functionality
  useEffect(() => {
    if (content.length > 0) {
      const timer = setTimeout(() => {
        setLastSaved(new Date());
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [content]);

  useEffect(() => {
    if (prompt) {
      onTimerStart(true);
      setShowPromptButtons(false);
    }
  }, [prompt, onTimerStart]);

  const handleGeneratePrompt = async () => {
    setIsGenerating(true);
    const newPrompt = await generatePrompt(textType);
    if (newPrompt) {
      setPrompt(newPrompt);
      setShowCustomPrompt(false);
    }
    setIsGenerating(false);
  };

  const handleCustomPromptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customPrompt.trim()) {
      setPrompt(customPrompt);
      setShowCustomPrompt(false);
    }
  };

  const noTypeSelected = !textType;

  return (
    <div className="h-full flex flex-col bg-white rounded-lg shadow-sm writing-area-container">
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
              {isGenerating ? 'Generating...' : 'Generate New Prompt'}
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
          value={content}
          onChange={(e) => onChange(e.target.value)}
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

      <div className="p-4 border-t bg-gray-50 content-spacing">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Word count: {stats.wordCount}
            </div>
            <AutoSave 
              content={content} 
              textType={textType}
            />
          </div>

          <div className="flex justify-between items-center">
            <div className="flex flex-wrap gap-2 text-xs">
              <span>Characters: {stats.characterCount}</span>
              <span>Paragraphs: {stats.paragraphCount}</span>
              <span>Reading time: {stats.readingTime} min</span>
            </div>
            
            <button
              onClick={onSubmit}
              disabled={!content.trim()}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium touch-friendly-button"
            >
              Submit Essay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

