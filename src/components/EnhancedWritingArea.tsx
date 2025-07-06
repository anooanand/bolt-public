// EnhancedWritingArea.tsx (Full Fixed Version)
import React, { useState, useEffect, useCallback } from 'react';
import { generatePrompt, getSynonyms, rephraseSentence, checkGrammarAndSpelling, analyzeSentenceStructure, enhanceVocabulary } from '../lib/openai';
import { AlertCircle } from 'lucide-react';
import { InlineSuggestionPopup } from './InlineSuggestionPopup';
import { AutoSave } from './AutoSave';
import './responsive.css';

export function EnhancedWritingArea({ content, onChange, textType, onTimerStart, onSubmit }) {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showCustomPrompt, setShowCustomPrompt] = useState(false);
  const [customPrompt, setCustomPrompt] = useState('');
  const [issues, setIssues] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showPromptButtons, setShowPromptButtons] = useState(true);
  const [grammarFeedback, setGrammarFeedback] = useState([]);
  const [sentenceFeedback, setSentenceFeedback] = useState([]);
  const [vocabularyFeedback, setVocabularyFeedback] = useState([]);
  const textareaRef = React.useRef(null);
  const overlayRef = React.useRef(null);
  const containerRef = React.useRef(null);

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

  const handleCustomPromptSubmit = (e) => {
    e.preventDefault();
    if (customPrompt.trim()) {
      setPrompt(customPrompt);
      setShowCustomPrompt(false);
    }
  };

  const handleContentChange = (e) => {
    const newContent = e.target.value;
    onChange(newContent);
  };

  const handleSubmitEssay = () => {
    onSubmit();
  };

  const handleAnalyzeEssay = useCallback(async () => {
    if (!content.trim()) return;

    // Grammar and Spelling
    const grammarResult = await checkGrammarAndSpelling(content);
    setGrammarFeedback(grammarResult.corrections || []);

    // Sentence Structure and Variety
    const sentenceResult = await analyzeSentenceStructure(content);
    setSentenceFeedback(sentenceResult.analysis || []);

    // Vocabulary Enhancement
    const vocabularyResult = await enhanceVocabulary(content);
    setVocabularyFeedback(vocabularyResult.suggestions || []);
  }, [content]);

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
                className="px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 text-sm font-medium"
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
          onChange={handleContentChange}
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
          Word count: {content.split(/\s+/).filter(Boolean).length}
        </div>
        <div className="flex gap-4">
          <button
            onClick={handleAnalyzeEssay}
            disabled={!content.trim()}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 text-sm font-medium"
          >
            Analyze Essay
          </button>
          <AutoSave content={content} textType={textType} />
          <button
            onClick={handleSubmitEssay}
            disabled={!content.trim()}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 text-sm font-medium"
          >
            Submit Essay
          </button>
        </div>
      </div>

      {/* Display Feedback Sections */}
      {grammarFeedback.length > 0 && (
        <div className="p-4 border-t bg-white mt-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Grammar and Spelling Feedback:</h3>
          {grammarFeedback.map((issue, index) => (
            <p key={index} className="text-sm text-gray-700 mb-1">
              <span className="font-semibold capitalize">{issue.type}:</span> "{issue.text}" - Suggestion: {issue.suggestion}
            </p>
          ))}
        </div>
      )}

      {sentenceFeedback.length > 0 && (
        <div className="p-4 border-t bg-white mt-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Sentence Structure Feedback:</h3>
          {sentenceFeedback.map((issue, index) => (
            <p key={index} className="text-sm text-gray-700 mb-1">
              <span className="font-semibold capitalize">{issue.type.replace(/_/g, ' ')}:</span> "{issue.sentence}" - Suggestion: {issue.suggestion}
            </p>
          ))}
        </div>
      )}

      {vocabularyFeedback.length > 0 && (
        <div className="p-4 border-t bg-white mt-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Vocabulary Enhancement Suggestions:</h3>
          {vocabularyFeedback.map((suggestion, index) => (
            <p key={index} className="text-sm text-gray-700 mb-1">
              <span className="font-semibold">"{suggestion.word}"</span> - Consider: {suggestion.suggestion}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}


