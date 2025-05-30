import React, { useState, useEffect, useCallback, useRef } from 'react';
import { generatePrompt, getSynonyms, rephraseSentence, evaluateEssay } from '../lib/openai';
import { AlertCircle, Send, Maximize2, Minimize2, Volume2, BarChart2 } from 'lucide-react';
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

export function WritingArea({ content, onChange, textType, onTimerStart, onSubmit }: WritingAreaProps) {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showCustomPrompt, setShowCustomPrompt] = useState(false);
  const [customPrompt, setCustomPrompt] = useState('');
  const [showPromptButtons, setShowPromptButtons] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [wordCountGoal, setWordCountGoal] = useState(250);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Enable writing when text type is selected
  const canWrite = Boolean(textType);

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

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    onChange(newContent);
  };

  const handleSubmitEssay = () => {
    onSubmit();
  };

  // Toggle fullscreen mode
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }, 100);
  };

  // Handle font size changes
  const changeFontSize = (delta: number) => {
    setFontSize(prevSize => {
      const newSize = prevSize + delta;
      return Math.min(Math.max(newSize, 12), 24);
    });
  };

  // Calculate word count
  const wordCount = content.split(/\s+/).filter(Boolean).length;
  const wordCountProgress = Math.min((wordCount / wordCountGoal) * 100, 100);

  return (
    <div 
      ref={containerRef} 
      className={`${isFullscreen ? 'fixed inset-0 z-50' : 'h-full'} flex flex-col bg-white dark:bg-gray-900 rounded-lg shadow-sm writing-area-container`}
    >
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap justify-between items-center gap-2">
          <h2 className="text-lg font-medium capitalize text-gray-900 dark:text-white">
            {textType ? `${textType} Writing` : 'Select Writing Type'}
          </h2>
          
          <div className="flex items-center space-x-2">
            <div className="flex items-center mr-2">
              <button 
                onClick={() => changeFontSize(-1)}
                className="p-1 rounded-md text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                title="Decrease font size"
              >
                A-
              </button>
              <span className="mx-1 text-gray-600 dark:text-gray-300">{fontSize}px</span>
              <button 
                onClick={() => changeFontSize(1)}
                className="p-1 rounded-md text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                title="Increase font size"
              >
                A+
              </button>
            </div>
            
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-md text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              title={isFullscreen ? "Exit fullscreen" : "Fullscreen mode"}
            >
              {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
            </button>
          </div>
        </div>

        {!textType ? (
          <div className="flex items-center text-amber-500 dark:text-amber-400 text-sm">
            <AlertCircle className="w-4 h-4 mr-2" />
            Please select a writing type first
          </div>
        ) : showPromptButtons && (
          <div className="flex flex-wrap space-x-2 gap-2">
            <button
              onClick={() => setShowCustomPrompt(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium"
            >
              I have my own prompt
            </button>
            <button
              onClick={handleGeneratePrompt}
              disabled={isGenerating}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 text-sm font-medium disabled:cursor-not-allowed"
            >
              Generate New Prompt
            </button>
          </div>
        )}

        {showCustomPrompt && textType && (
          <form onSubmit={handleCustomPromptSubmit} className="space-y-2">
            <textarea
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="Enter your own writing prompt..."
              className="w-full p-2 rounded-md text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
              rows={3}
            />
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setShowCustomPrompt(false)}
                className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!customPrompt.trim()}
                className="px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 text-sm font-medium"
              >
                Set Prompt
              </button>
            </div>
          </form>
        )}

        {prompt && !showCustomPrompt && textType && (
          <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-md">
            <h3 className="font-medium mb-2 text-blue-900 dark:text-blue-100">Writing Prompt:</h3>
            <p className="text-blue-800 dark:text-blue-200">{prompt}</p>
          </div>
        )}
      </div>

      <div className="flex-1 p-4">
        <textarea
          ref={textareaRef}
          value={content}
          onChange={handleContentChange}
          disabled={!canWrite}
          className="w-full h-full p-4 resize-none focus:outline-none border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 disabled:bg-gray-50 dark:disabled:bg-gray-900 disabled:text-gray-400 dark:disabled:text-gray-500 disabled:cursor-not-allowed"
          placeholder={!textType 
            ? "Select a writing type to begin..." 
            : "Begin writing here..."}
          style={{ fontSize: `${fontSize}px` }}
        />
      </div>

      <div className="p-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Word count: {wordCount} / {wordCountGoal}
          </div>
          <div className="flex items-center space-x-4">
            <AutoSave content={content} textType={textType} />
            {content.trim().length > 50 && (
              <button
                onClick={handleSubmitEssay}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm font-medium"
              >
                <Send size={16} className="mr-2" />
                Submit Essay
              </button>
            )}
          </div>
        </div>
        
        <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${wordCountProgress}%` }}
          />
        </div>
      </div>
    </div>
  );
}