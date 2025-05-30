import React, { useState, useEffect, useCallback, useRef } from 'react';
import { generatePrompt, getSynonyms, rephraseSentence, evaluateEssay } from '../lib/openai';
import { AlertCircle, Send, Maximize2, Minimize2, Volume2, Moon, Sun, BarChart2 } from 'lucide-react';
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
  const [isDarkMode, setIsDarkMode] = useState(false);
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

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
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
      className={`${isFullscreen ? 'fixed inset-0 z-50' : 'h-full'} flex flex-col bg-white rounded-lg shadow-sm writing-area-container transition-all duration-300 ${isDarkMode ? 'dark-mode' : ''}`}
      style={{
        backgroundColor: isDarkMode ? '#1a1a1a' : 'white',
        color: isDarkMode ? '#e0e0e0' : 'inherit'
      }}
    >
      <div className={`p-4 border-b space-y-4 content-spacing ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex flex-wrap justify-between items-center gap-2">
          <h2 className={`text-lg font-medium capitalize ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
            {textType ? `${textType} Writing` : 'Select Writing Type'}
          </h2>
          
          <div className="flex items-center space-x-2">
            <div className="flex items-center mr-2">
              <button 
                onClick={() => changeFontSize(-1)}
                className={`p-1 rounded-md ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}
                title="Decrease font size"
              >
                A-
              </button>
              <span className={`mx-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{fontSize}px</span>
              <button 
                onClick={() => changeFontSize(1)}
                className={`p-1 rounded-md ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}
                title="Increase font size"
              >
                A+
              </button>
            </div>
            
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-md ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}
              title={isDarkMode ? "Light mode" : "Dark mode"}
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            
            <button
              onClick={toggleFullscreen}
              className={`p-2 rounded-md ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}
              title={isFullscreen ? "Exit fullscreen" : "Fullscreen mode"}
            >
              {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
            </button>
          </div>
        </div>

        {!textType ? (
          <div className="flex items-center text-amber-600 text-sm">
            <AlertCircle className="w-4 h-4 mr-2" />
            Please select a writing type first
          </div>
        ) : showPromptButtons && (
          <div className="flex flex-wrap space-x-2 gap-2">
            <button
              onClick={() => setShowCustomPrompt(true)}
              className={`px-4 py-2 border rounded-md text-sm font-medium touch-friendly-button ${
                isDarkMode 
                  ? 'bg-blue-800 text-white border-blue-700 hover:bg-blue-700' 
                  : 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700'
              }`}
            >
              I have my own prompt
            </button>
            <button
              onClick={handleGeneratePrompt}
              disabled={isGenerating}
              className={`px-4 py-2 rounded-md text-sm font-medium touch-friendly-button ${
                isDarkMode 
                  ? 'bg-purple-800 text-white hover:bg-purple-700 disabled:opacity-50' 
                  : 'bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50'
              } disabled:cursor-not-allowed`}
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
              className={`w-full p-2 rounded-md text-sm ${
                isDarkMode 
                  ? 'bg-gray-800 text-gray-200 border-gray-700' 
                  : 'bg-white text-gray-900 border border-gray-300'
              }`}
              rows={3}
            />
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setShowCustomPrompt(false)}
                className={`px-3 py-1.5 text-sm ${
                  isDarkMode ? 'text-gray-300 hover:text-gray-100' : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!customPrompt.trim()}
                className={`px-3 py-1.5 rounded-md text-sm font-medium touch-friendly-button ${
                  isDarkMode 
                    ? 'bg-blue-800 text-white hover:bg-blue-700 disabled:opacity-50' 
                    : 'bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50'
                } disabled:cursor-not-allowed`}
              >
                Set Prompt
              </button>
            </div>
          </form>
        )}

        {prompt && !showCustomPrompt && textType && (
          <div className={`p-4 rounded-md ${isDarkMode ? 'bg-blue-900' : 'bg-blue-50'}`}>
            <h3 className={`font-medium mb-2 ${isDarkMode ? 'text-blue-200' : 'text-blue-900'}`}>Writing Prompt:</h3>
            <p className={isDarkMode ? 'text-blue-100' : 'text-blue-800'}>{prompt}</p>
          </div>
        )}
      </div>

      <div className="flex-1 p-4">
        <textarea
          ref={textareaRef}
          value={content}
          onChange={handleContentChange}
          disabled={!canWrite}
          className={`w-full h-full p-4 text-gray-900 resize-none focus:outline-none border rounded-md ${
            isDarkMode 
              ? 'bg-gray-800 text-gray-200 disabled:bg-gray-900 disabled:text-gray-500' 
              : 'bg-white disabled:bg-gray-50 disabled:text-gray-400'
          } disabled:cursor-not-allowed`}
          placeholder={!textType 
            ? "Select a writing type to begin..." 
            : "Begin writing here..."}
          style={{ fontSize: `${fontSize}px` }}
        />
      </div>

      <div className={`p-4 border-t ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'} content-spacing`}>
        <div className="flex justify-between items-center">
          <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
            Word count: {wordCount} / {wordCountGoal}
          </div>
          <div className="flex items-center space-x-4">
            <AutoSave content={content} textType={textType} />
            {content.trim().length > 50 && (
              <button
                onClick={handleSubmitEssay}
                className={`flex items-center px-4 py-2 rounded-md text-white text-sm font-medium ${
                  isDarkMode ? 'bg-green-700 hover:bg-green-600' : 'bg-green-600 hover:bg-green-700'
                }`}
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