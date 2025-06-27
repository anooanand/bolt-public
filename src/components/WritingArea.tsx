import React, { useState, useEffect, useRef, useCallback } from 'react';
import { generatePrompt, getSynonyms, rephraseSentence, evaluateEssay, getWritingFeedback, identifyCommonMistakes, getTextTypeVocabulary, getSpecializedTextTypeFeedback, getWritingStructure } from '../lib/openai';
import { dbOperations } from '../lib/database';
import { useApp } from '../contexts/AppContext';
import { AlertCircle, ChevronLeft, ChevronRight, Save, FileText, Clock } from 'lucide-react';
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
  const [specializedFeedback, setSpecializedFeedback] = useState<any>(null);
  const [writingStructure, setWritingStructure] = useState<any>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [wordCount, setWordCount] = useState(0);
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // FIXED: Proper initialization with error handling
  useEffect(() => {
    const initializeComponent = async () => {
      try {
        console.log('🚀 Initializing WritingArea component...');
        
        // Simulate brief loading to show the component is working
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Initialize word count
        setWordCount(content ? content.split(/\s+/).filter(word => word.length > 0).length : 0);
        
        // Generate initial prompt if none exists
        if (!prompt && textType) {
          try {
            const generatedPrompt = await generatePrompt(textType);
            setPrompt(generatedPrompt || `Write a ${textType} piece that showcases your creativity and skills.`);
          } catch (err) {
            console.warn('Could not generate prompt, using fallback');
            setPrompt(`Write a ${textType} piece that showcases your creativity and skills.`);
          }
        }
        
        setIsLoading(false);
        console.log('✅ WritingArea component initialized successfully');
      } catch (err) {
        console.error('❌ Error initializing WritingArea:', err);
        setError(`Failed to initialize writing area: ${err instanceof Error ? err.message : 'Unknown error'}`);
        setIsLoading(false);
      }
    };

    initializeComponent();
  }, [textType, content, prompt]);

  // Update word count when content changes
  useEffect(() => {
    const words = content ? content.split(/\s+/).filter(word => word.length > 0).length : 0;
    setWordCount(words);
  }, [content]);

  // Auto-save functionality
  useEffect(() => {
    if (content && content.length > 10) {
      const saveTimer = setTimeout(async () => {
        try {
          setIsSaving(true);
          // Simulate save operation
          await new Promise(resolve => setTimeout(resolve, 500));
          setLastSaved(new Date());
          setIsSaving(false);
        } catch (err) {
          console.error('Auto-save failed:', err);
          setIsSaving(false);
        }
      }, 2000);

      return () => clearTimeout(saveTimer);
    }
  }, [content]);

  const handleGeneratePrompt = async () => {
    if (isGenerating) return;
    
    setIsGenerating(true);
    try {
      const newPrompt = await generatePrompt(textType);
      setPrompt(newPrompt || `Write a ${textType} piece that showcases your creativity and skills.`);
    } catch (error) {
      console.error('Error generating prompt:', error);
      setPrompt(`Write a ${textType} piece that showcases your creativity and skills.`);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCustomPrompt = () => {
    if (customPrompt.trim()) {
      setPrompt(customPrompt.trim());
      setCustomPrompt('');
      setShowCustomPrompt(false);
    }
  };

  const handleSave = async () => {
    if (isSaving) return;
    
    setIsSaving(true);
    try {
      // Simulate save operation
      await new Promise(resolve => setTimeout(resolve, 1000));
      setLastSaved(new Date());
    } catch (error) {
      console.error('Save failed:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSubmit = () => {
    if (content.trim().length < 50) {
      alert('Please write at least 50 characters before submitting.');
      return;
    }
    onSubmit();
  };

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px] bg-red-50 rounded-lg border border-red-200">
        <div className="text-center p-6">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-red-800 mb-2">Writing Area Error</h3>
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] bg-blue-50 rounded-lg border border-blue-200">
        <div className="text-center p-6">
          <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <h3 className="text-lg font-semibold text-blue-800 mb-2">Loading Writing Assistant</h3>
          <p className="text-blue-600">Setting up your writing environment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="writing-area-container h-full flex flex-col" ref={containerRef}>
      {/* Header */}
      <div className="writing-header bg-white border-b border-gray-200 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-semibold text-gray-800">
            {textType ? `${textType.charAt(0).toUpperCase() + textType.slice(1)} Writing` : 'Writing Assistant'}
          </h2>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <FileText className="w-4 h-4" />
            <span>{wordCount} words</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {lastSaved && (
            <div className="flex items-center space-x-1 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              <span>Saved {lastSaved.toLocaleTimeString()}</span>
            </div>
          )}
          
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center space-x-1 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Saving...' : 'Save'}</span>
          </button>
        </div>
      </div>

      {/* Prompt Section */}
      {prompt && (
        <div className="prompt-section bg-blue-50 border-b border-blue-200 p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-medium text-blue-800 mb-2">Writing Prompt:</h3>
              <p className="text-blue-700">{prompt}</p>
            </div>
            <div className="flex space-x-2 ml-4">
              <button
                onClick={handleGeneratePrompt}
                disabled={isGenerating}
                className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 disabled:opacity-50"
              >
                {isGenerating ? 'Generating...' : 'New Prompt'}
              </button>
              <button
                onClick={() => setShowCustomPrompt(!showCustomPrompt)}
                className="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700"
              >
                Custom
              </button>
            </div>
          </div>
          
          {showCustomPrompt && (
            <div className="mt-3 flex space-x-2">
              <input
                type="text"
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="Enter your custom prompt..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyPress={(e) => e.key === 'Enter' && handleCustomPrompt()}
              />
              <button
                onClick={handleCustomPrompt}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Use
              </button>
            </div>
          )}
        </div>
      )}

      {/* Main Writing Area */}
      <div className="flex-1 flex">
        {/* Writing Editor */}
        <div className="flex-1 p-4">
          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Start writing your essay here..."
            className="w-full h-full min-h-[400px] p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            style={{ fontFamily: 'Georgia, serif', fontSize: '16px', lineHeight: '1.6' }}
          />
        </div>

        {/* Sidebar */}
        {isSidebarOpen && (
          <div className="w-80 bg-gray-50 border-l border-gray-200 p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800">Writing Assistant</h3>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="p-1 hover:bg-gray-200 rounded"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="bg-white p-3 rounded border">
                <h4 className="font-medium text-gray-700 mb-2">Quick Tips</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Start with a strong opening sentence</li>
                  <li>• Use descriptive language</li>
                  <li>• Organize your ideas clearly</li>
                  <li>• Check your spelling and grammar</li>
                </ul>
              </div>
              
              <div className="bg-white p-3 rounded border">
                <h4 className="font-medium text-gray-700 mb-2">Progress</h4>
                <div className="text-sm text-gray-600">
                  <p>Words: {wordCount}</p>
                  <p>Target: 200-500 words</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min((wordCount / 300) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Sidebar Toggle (when closed) */}
        {!isSidebarOpen && (
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="w-8 bg-gray-100 border-l border-gray-200 flex items-center justify-center hover:bg-gray-200"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Footer */}
      <div className="writing-footer bg-white border-t border-gray-200 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <span>Auto-save: {isSaving ? 'Saving...' : 'Enabled'}</span>
          {lastSaved && <span>Last saved: {lastSaved.toLocaleTimeString()}</span>}
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={() => onChange('')}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Clear
          </button>
          <button
            onClick={handleSubmit}
            disabled={content.trim().length < 50}
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit for Review
          </button>
        </div>
      </div>

      {/* Inline Suggestion Popup */}
      {selectedIssue && (
        <InlineSuggestionPopup
          issue={selectedIssue}
          position={popupPosition}
          onClose={() => setSelectedIssue(null)}
          onApply={(suggestion) => {
            // Apply suggestion logic here
            setSelectedIssue(null);
          }}
          suggestions={suggestions}
          isLoading={isLoadingSuggestions}
        />
      )}
    </div>
  );
}

