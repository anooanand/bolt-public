// FIXED WritingArea.tsx - Enhanced modal handling and navigation support

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
  
  // Enhanced state for popup management
  const [showWritingTypeModal, setShowWritingTypeModal] = useState(false);
  const [showPromptOptionsModal, setShowPromptOptionsModal] = useState(false);
  const [showCustomPromptModal, setShowCustomPromptModal] = useState(false);
  const [selectedWritingType, setSelectedWritingType] = useState('');
  const [showEvaluationModal, setShowEvaluationModal] = useState(false);
  const [modalInitialized, setModalInitialized] = useState(false);
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const highlightLayerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // ENHANCED: Initialize popup flow when component mounts or when textType is empty
  useEffect(() => {
    console.log('🔄 WritingArea: Initializing component...');
    console.log('📊 Current textType:', textType);
    console.log('📊 Modal initialized:', modalInitialized);
    
    const savedContent = localStorage.getItem('writingContent');
    const savedWritingType = localStorage.getItem('selectedWritingType');
    const navigationSource = localStorage.getItem('navigationSource');
    const promptType = localStorage.getItem('promptType');

    console.log('💾 Saved content length:', savedContent?.length || 0);
    console.log('💾 Saved writing type:', savedWritingType);
    console.log('💾 Navigation source:', navigationSource);
    console.log('💾 Prompt type:', promptType);

    // Restore saved content
    if (savedContent && savedContent !== content) {
      console.log('📝 Restoring saved content');
      onChange(savedContent);
    }
    
    // Handle writing type initialization
    if (savedWritingType && savedWritingType !== selectedWritingType) {
      console.log('📝 Setting writing type from localStorage:', savedWritingType);
      setSelectedWritingType(savedWritingType);
      if (onTextTypeChange) {
        onTextTypeChange(savedWritingType);
      }
    }
    
    // FIXED: Initialize modal flow based on navigation context
    if (!modalInitialized) {
      console.log('🚀 Initializing modal flow...');
      
      if (navigationSource === 'dashboard' && savedWritingType) {
        // User came from dashboard with a selected writing type
        console.log('✅ Dashboard navigation detected with writing type:', savedWritingType);
        setSelectedWritingType(savedWritingType);
        if (onTextTypeChange) {
          onTextTypeChange(savedWritingType);
        }
        
        // Check if we need to show prompt options or go straight to writing
        if (promptType === 'generated' || promptType === 'custom') {
          console.log('✅ Prompt type specified, proceeding to writing interface');
          // User has already made their choice, proceed to writing
          setModalInitialized(true);
          if (onPopupCompleted) {
            onPopupCompleted();
          }
        } else {
          console.log('❓ No prompt type, showing prompt options modal');
          setShowPromptOptionsModal(true);
        }
      } else if (!textType && !savedWritingType) {
        // No writing type selected, show writing type modal
        console.log('❓ No writing type selected, showing writing type modal');
        setShowWritingTypeModal(true);
      } else {
        // Writing type is available, mark as initialized
        console.log('✅ Writing type available, marking as initialized');
        setModalInitialized(true);
        if (onPopupCompleted) {
          onPopupCompleted();
        }
      }
      
      setModalInitialized(true);
    }
  }, [textType, selectedWritingType, onChange, onTextTypeChange, onPopupCompleted, modalInitialized, content]);

  useEffect(() => {
    if (prompt) {
      onTimerStart(true);
    }
  }, [prompt, onTimerStart]);

  // ENHANCED: Load saved prompt from localStorage with better error handling
  useEffect(() => {
    const currentTextType = textType || selectedWritingType;
    if (currentTextType) {
      console.log('🔍 Looking for saved prompt for type:', currentTextType);
      const savedPrompt = localStorage.getItem(`${currentTextType}_prompt`);
      if (savedPrompt && savedPrompt !== prompt) {
        console.log('📝 Loading saved prompt:', savedPrompt.substring(0, 100) + '...');
        setPrompt(savedPrompt);
        // Pass the loaded prompt to parent
        if (onPromptGenerated) {
          onPromptGenerated(savedPrompt);
        }
      }
    }
  }, [selectedWritingType, textType, onPromptGenerated, prompt]);

  // Pass prompt to parent whenever it changes
  useEffect(() => {
    if (prompt && onPromptGenerated) {
      onPromptGenerated(prompt);
    }
  }, [prompt, onPromptGenerated]);

  // ENHANCED: Persist content and selectedWritingType to localStorage with debouncing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (content !== localStorage.getItem('writingContent')) {
        localStorage.setItem('writingContent', content);
        console.log('💾 Content saved to localStorage');
      }
    }, 500); // Debounce saves

    return () => clearTimeout(timeoutId);
  }, [content]);

  useEffect(() => {
    if (selectedWritingType && selectedWritingType !== localStorage.getItem('selectedWritingType')) {
      localStorage.setItem('selectedWritingType', selectedWritingType);
      console.log('💾 Writing type saved to localStorage:', selectedWritingType);
    }
  }, [selectedWritingType]);

  // ENHANCED: Handle writing type selection from modal
  const handleWritingTypeSelect = (type: string) => {
    console.log('📝 Writing type selected:', type);
    setSelectedWritingType(type);
    localStorage.setItem('selectedWritingType', type);
    setShowWritingTypeModal(false);
    setShowPromptOptionsModal(true);
    
    if (onTextTypeChange) {
      onTextTypeChange(type);
    }
  };

  // ENHANCED: Handle prompt generation
  const handleGeneratePrompt = async () => {
    console.log('🎯 Generating prompt for:', selectedWritingType);
    setShowPromptOptionsModal(false);
    setIsGenerating(true);
    
    try {
      const generatedPrompt = await generatePrompt(selectedWritingType);
      console.log('✅ Prompt generated:', generatedPrompt.substring(0, 100) + '...');
      setPrompt(generatedPrompt);
      localStorage.setItem(`${selectedWritingType}_prompt`, generatedPrompt);
      
      if (onPromptGenerated) {
        onPromptGenerated(generatedPrompt);
      }
      
      if (onPopupCompleted) {
        onPopupCompleted();
      }
    } catch (error) {
      console.error('❌ Error generating prompt:', error);
      // Fallback to a default prompt
      const fallbackPrompt = `Write a ${selectedWritingType} piece that showcases your creativity and writing skills.`;
      setPrompt(fallbackPrompt);
      localStorage.setItem(`${selectedWritingType}_prompt`, fallbackPrompt);
    } finally {
      setIsGenerating(false);
    }
  };

  // ENHANCED: Handle custom prompt
  const handleCustomPrompt = () => {
    console.log('✏️ Using custom prompt for:', selectedWritingType);
    setShowPromptOptionsModal(false);
    setShowCustomPromptModal(true);
  };

  // ENHANCED: Handle custom prompt submission
  const handleCustomPromptSubmit = (customPrompt: string) => {
    console.log('✅ Custom prompt submitted:', customPrompt.substring(0, 100) + '...');
    setPrompt(customPrompt);
    localStorage.setItem(`${selectedWritingType}_prompt`, customPrompt);
    setShowCustomPromptModal(false);
    
    if (onPromptGenerated) {
      onPromptGenerated(customPrompt);
    }
    
    if (onPopupCompleted) {
      onPopupCompleted();
    }
  };

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
      'was ran': 'was run',
      'have went': 'have gone',
      'should of': 'should have',
      'could of': 'could have',
      'would of': 'would have',
      'me and': 'I and',
      'between you and I': 'between you and me'
    };

    // Check spelling
    Object.entries(spellingPatterns).forEach(([incorrect, correct]) => {
      const regex = new RegExp(`\\b${incorrect}\\b`, 'gi');
      let match;
      while ((match = regex.exec(text)) !== null) {
        newIssues.push({
          start: match.index,
          end: match.index + match[0].length,
          type: 'spelling',
          message: `"${match[0]}" might be misspelled`,
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
          end: match.index + match[0].length,
          type: 'grammar',
          message: `Grammar issue: "${match[0]}"`,
          suggestion: correct
        });
      }
    });

    setIssues(newIssues);
  }, []);

  useEffect(() => {
    if (content.length > 0) {
      const timeoutId = setTimeout(() => {
        analyzeText(content);
      }, 1000);
      return () => clearTimeout(timeoutId);
    } else {
      setIssues([]);
    }
  }, [content, analyzeText]);

  const handleTextClick = (event: React.MouseEvent<HTMLTextAreaElement>) => {
    const textarea = event.currentTarget;
    const clickPosition = textarea.selectionStart;
    
    const clickedIssue = issues.find(issue => 
      clickPosition >= issue.start && clickPosition <= issue.end
    );
    
    if (clickedIssue) {
      setSelectedIssue(clickedIssue);
      const rect = textarea.getBoundingClientRect();
      setPopupPosition({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      });
    } else {
      setSelectedIssue(null);
    }
  };

  const applySuggestion = (suggestion: string) => {
    if (selectedIssue) {
      const newContent = 
        content.substring(0, selectedIssue.start) + 
        suggestion + 
        content.substring(selectedIssue.end);
      onChange(newContent);
      setSelectedIssue(null);
    }
  };

  const getSynonymSuggestions = async (word: string) => {
    setIsLoadingSuggestions(true);
    try {
      const synonyms = await getSynonyms(word);
      setSuggestions(synonyms);
    } catch (error) {
      console.error('Error getting synonyms:', error);
      setSuggestions([]);
    } finally {
      setIsLoadingSuggestions(false);
    }
  };

  const renderTextWithHighlights = () => {
    if (!showHighlights || issues.length === 0) {
      return content;
    }

    let result = '';
    let lastIndex = 0;

    issues.forEach((issue, index) => {
      result += content.substring(lastIndex, issue.start);
      
      const issueText = content.substring(issue.start, issue.end);
      const colorClass = {
        spelling: 'bg-red-200',
        grammar: 'bg-yellow-200',
        vocabulary: 'bg-blue-200',
        structure: 'bg-green-200',
        style: 'bg-purple-200'
      }[issue.type];
      
      result += `<span class="${colorClass} cursor-pointer" data-issue-index="${index}">${issueText}</span>`;
      lastIndex = issue.end;
    });

    result += content.substring(lastIndex);
    return result;
  };

  const renderWritingTemplate = () => {
    const currentType = textType || selectedWritingType;
    
    if (!currentType || !prompt) {
      return null;
    }

    const templateProps = {
      content,
      onChange,
      prompt,
      onSubmit
    };

    switch (currentType.toLowerCase()) {
      case 'narrative':
        return <NarrativeWritingTemplateRedesigned {...templateProps} />;
      case 'persuasive':
        return <PersuasiveWritingTemplate {...templateProps} />;
      case 'expository':
        return <ExpositoryWritingTemplate {...templateProps} />;
      case 'reflective':
        return <ReflectiveWritingTemplate {...templateProps} />;
      case 'descriptive':
        return <DescriptiveWritingTemplate {...templateProps} />;
      case 'recount':
        return <RecountWritingTemplate {...templateProps} />;
      case 'discursive':
        return <DiscursiveWritingTemplate {...templateProps} />;
      case 'news report':
        return <NewsReportWritingTemplate {...templateProps} />;
      case 'letter':
        return <LetterWritingTemplate {...templateProps} />;
      case 'diary entry':
        return <DiaryWritingTemplate {...templateProps} />;
      case 'speech':
        return <SpeechWritingTemplate {...templateProps} />;
      default:
        return (
          <div className="writing-template-container bg-white rounded-lg shadow-lg p-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {currentType} Writing
              </h3>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                <p className="text-blue-800 font-medium">{prompt}</p>
              </div>
            </div>
            
            <div className="relative">
              <textarea
                ref={textareaRef}
                value={content}
                onChange={(e) => onChange(e.target.value)}
                onClick={handleTextClick}
                placeholder={`Start writing your ${currentType} here...`}
                className="w-full h-96 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              
              {selectedIssue && (
                <InlineSuggestionPopup
                  issue={selectedIssue}
                  position={popupPosition}
                  onApplySuggestion={applySuggestion}
                  onClose={() => setSelectedIssue(null)}
                  onGetSynonyms={getSynonymSuggestions}
                  suggestions={suggestions}
                  isLoadingSuggestions={isLoadingSuggestions}
                />
              )}
            </div>
            
            <WritingStatusBar
              wordCount={content.trim().split(/\s+/).filter(word => word.length > 0).length}
              characterCount={content.length}
              issuesCount={issues.length}
              showHighlights={showHighlights}
              onToggleHighlights={() => setShowHighlights(!showHighlights)}
              lastSaved={lastSaved}
              isSaving={isSaving}
            />
          </div>
        );
    }
  };

  // ENHANCED: Show loading state while initializing
  if (!modalInitialized && !showWritingTypeModal && !showPromptOptionsModal) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Setting up your writing space...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="writing-area-container relative">
      {/* Show template if everything is ready */}
      {modalInitialized && (textType || selectedWritingType) && (
        <div className="writing-template-wrapper">
          {renderWritingTemplate()}
        </div>
      )}

      {/* Show generating state */}
      {isGenerating && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 text-center">
            <Sparkles className="h-12 w-12 text-blue-600 mx-auto mb-4 animate-spin" />
            <h3 className="text-xl font-semibold mb-2">Creating your prompt...</h3>
            <p className="text-gray-600">This will just take a moment!</p>
          </div>
        </div>
      )}

      {/* MODAL COMPONENTS */}
      <WritingTypeSelectionModal
        isOpen={showWritingTypeModal}
        onClose={() => setShowWritingTypeModal(false)}
        onSelectType={handleWritingTypeSelect}
      />

      <PromptOptionsModal
        isOpen={showPromptOptionsModal}
        onClose={() => setShowPromptOptionsModal(false)}
        onGeneratePrompt={handleGeneratePrompt}
        onCustomPrompt={handleCustomPrompt}
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
        textType={textType || selectedWritingType}
      />
    </div>
  );
}
