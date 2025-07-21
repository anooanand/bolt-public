// FIXED WritingArea.tsx - Properly handles the modal sequence: My Space > Write Story > Select Writing Type > Prompt > Writing Area

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
  
  // FIXED: Modal state management for proper sequence
  const [showWritingTypeModal, setShowWritingTypeModal] = useState(false);
  const [showPromptOptionsModal, setShowPromptOptionsModal] = useState(false);
  const [showCustomPromptModal, setShowCustomPromptModal] = useState(false);
  const [selectedWritingType, setSelectedWritingType] = useState('');
  const [showEvaluationModal, setShowEvaluationModal] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [showWritingInterface, setShowWritingInterface] = useState(false);
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const highlightLayerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // FIXED: Initialize based on navigation flow from Dashboard
  useEffect(() => {
    console.log('🔄 WritingArea: Initializing component...');
    console.log('📊 Props - textType:', textType);
    console.log('📊 State - selectedWritingType:', selectedWritingType);
    
    const savedContent = localStorage.getItem('writingContent');
    const savedWritingType = localStorage.getItem('selectedWritingType');
    const navigationSource = localStorage.getItem('navigationSource');
    const promptType = localStorage.getItem('promptType');

    console.log('💾 Saved data:', { 
      savedContent: savedContent?.length || 0, 
      savedWritingType, 
      navigationSource, 
      promptType 
    });

    // Restore saved content
    if (savedContent && savedContent !== content) {
      console.log('📝 Restoring saved content');
      onChange(savedContent);
    }

    // Handle initialization based on navigation source
    if (navigationSource === 'dashboard') {
      console.log('🚀 Dashboard navigation detected');
      
      if (savedWritingType && promptType) {
        // Complete flow from Dashboard: writing type and prompt type are set
        console.log('✅ Complete flow detected - showing writing interface');
        setSelectedWritingType(savedWritingType);
        if (onTextTypeChange) {
          onTextTypeChange(savedWritingType);
        }
        
        // Handle prompt based on type
        if (promptType === 'generated') {
          handleGeneratePromptFromDashboard(savedWritingType);
        } else if (promptType === 'custom') {
          setShowCustomPromptModal(true);
        }
        
        setIsInitialized(true);
      } else if (savedWritingType && !promptType) {
        // Partial flow: writing type set but no prompt type
        console.log('⚠️ Partial flow - showing prompt options');
        setSelectedWritingType(savedWritingType);
        if (onTextTypeChange) {
          onTextTypeChange(savedWritingType);
        }
        setShowPromptOptionsModal(true);
        setIsInitialized(true);
      } else {
        // No writing type from Dashboard - show writing type modal
        console.log('❓ No writing type - showing writing type modal');
        setShowWritingTypeModal(true);
        setIsInitialized(true);
      }
    } else {
      // Direct navigation to /writing - start from beginning
      console.log('🔗 Direct navigation - starting from writing type selection');
      setShowWritingTypeModal(true);
      setIsInitialized(true);
    }
  }, [textType, onChange, onTextTypeChange]);

  // Handle prompt generation from Dashboard flow
  const handleGeneratePromptFromDashboard = async (writingType: string) => {
    console.log('🎯 Generating prompt from Dashboard flow for:', writingType);
    setIsGenerating(true);
    
    try {
      const generatedPrompt = await generatePrompt(writingType);
      console.log('✅ Prompt generated successfully');
      setPrompt(generatedPrompt);
      localStorage.setItem(`${writingType}_prompt`, generatedPrompt);
      
      if (onPromptGenerated) {
        onPromptGenerated(generatedPrompt);
      }
      
      // Show writing interface
      setShowWritingInterface(true);
      
      if (onPopupCompleted) {
        onPopupCompleted();
      }
    } catch (error) {
      console.error('❌ Error generating prompt:', error);
      // Fallback to a default prompt
      const fallbackPrompt = `Write a ${writingType} piece that showcases your creativity and writing skills.`;
      setPrompt(fallbackPrompt);
      localStorage.setItem(`${writingType}_prompt`, fallbackPrompt);
      
      if (onPromptGenerated) {
        onPromptGenerated(fallbackPrompt);
      }
      
      setShowWritingInterface(true);
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    if (prompt) {
      onTimerStart(true);
    }
  }, [prompt, onTimerStart]);

  // Load saved prompt
  useEffect(() => {
    const currentTextType = textType || selectedWritingType;
    if (currentTextType && !prompt) {
      console.log('🔍 Looking for saved prompt for type:', currentTextType);
      const savedPrompt = localStorage.getItem(`${currentTextType}_prompt`);
      if (savedPrompt) {
        console.log('📝 Loading saved prompt');
        setPrompt(savedPrompt);
        if (onPromptGenerated) {
          onPromptGenerated(savedPrompt);
        }
        setShowWritingInterface(true);
      }
    }
  }, [selectedWritingType, textType, onPromptGenerated, prompt]);

  // Pass prompt to parent
  useEffect(() => {
    if (prompt && onPromptGenerated) {
      onPromptGenerated(prompt);
    }
  }, [prompt, onPromptGenerated]);

  // Persist content with debouncing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (content !== localStorage.getItem('writingContent')) {
        localStorage.setItem('writingContent', content);
        console.log('💾 Content saved to localStorage');
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [content]);

  // Persist writing type
  useEffect(() => {
    if (selectedWritingType && selectedWritingType !== localStorage.getItem('selectedWritingType')) {
      localStorage.setItem('selectedWritingType', selectedWritingType);
      console.log('💾 Writing type saved to localStorage:', selectedWritingType);
    }
  }, [selectedWritingType]);

  // FIXED: Handle writing type selection (Step 2)
  const handleWritingTypeSelect = (type: string) => {
    console.log('📝 WritingArea: Step 2 - Writing type selected:', type);
    setSelectedWritingType(type);
    localStorage.setItem('selectedWritingType', type);
    setShowWritingTypeModal(false);
    setShowPromptOptionsModal(true);
    
    if (onTextTypeChange) {
      onTextTypeChange(type);
    }
  };

  // FIXED: Handle prompt generation (Step 3)
  const handleGeneratePrompt = async () => {
    console.log('🎯 WritingArea: Step 3 - Generating prompt for:', selectedWritingType);
    setShowPromptOptionsModal(false);
    setIsGenerating(true);
    
    try {
      const generatedPrompt = await generatePrompt(selectedWritingType);
      console.log('✅ Prompt generated successfully');
      setPrompt(generatedPrompt);
      localStorage.setItem(`${selectedWritingType}_prompt`, generatedPrompt);
      localStorage.setItem('promptType', 'generated');
      
      if (onPromptGenerated) {
        onPromptGenerated(generatedPrompt);
      }
      
      // Show writing interface (Step 4)
      setShowWritingInterface(true);
      
      if (onPopupCompleted) {
        onPopupCompleted();
      }
    } catch (error) {
      console.error('❌ Error generating prompt:', error);
      const fallbackPrompt = `Write a ${selectedWritingType} piece that showcases your creativity and writing skills.`;
      setPrompt(fallbackPrompt);
      localStorage.setItem(`${selectedWritingType}_prompt`, fallbackPrompt);
      localStorage.setItem('promptType', 'generated');
      
      if (onPromptGenerated) {
        onPromptGenerated(fallbackPrompt);
      }
      
      setShowWritingInterface(true);
    } finally {
      setIsGenerating(false);
    }
  };

  // FIXED: Handle custom prompt (Step 3)
  const handleCustomPrompt = () => {
    console.log('✏️ WritingArea: Step 3 - Using custom prompt for:', selectedWritingType);
    setShowPromptOptionsModal(false);
    setShowCustomPromptModal(true);
  };

  // FIXED: Handle custom prompt submission (Step 4)
  const handleCustomPromptSubmit = (customPrompt: string) => {
    console.log('✅ WritingArea: Step 4 - Custom prompt submitted');
    setPrompt(customPrompt);
    localStorage.setItem(`${selectedWritingType}_prompt`, customPrompt);
    localStorage.setItem('promptType', 'custom');
    setShowCustomPromptModal(false);
    
    if (onPromptGenerated) {
      onPromptGenerated(customPrompt);
    }
    
    // Show writing interface (Step 4)
    setShowWritingInterface(true);
    
    if (onPopupCompleted) {
      onPopupCompleted();
    }
  };

  const analyzeText = useCallback((text: string) => {
    const newIssues: WritingIssue[] = [];
    
    // Common spelling mistakes
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

    // Grammar patterns
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

  // FIXED: Render writing template when ready
  const renderWritingTemplate = () => {
    const currentType = textType || selectedWritingType;
    
    if (!currentType || !prompt) {
      return null;
    }

    console.log('🎨 Rendering template for type:', currentType);

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
          <div className="writing-template-container bg-white rounded-lg shadow-lg p-6 h-full">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {currentType} Writing
              </h3>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                <p className="text-blue-800 font-medium">{prompt}</p>
              </div>
            </div>
            
            <div className="relative flex-1">
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

  // Show loading state during initialization
  if (!isInitialized) {
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
    <div className="writing-area-container relative h-full">
      {/* FIXED: Show writing interface only when ready */}
      {showWritingInterface && (textType || selectedWritingType) && prompt && (
        <div className="writing-template-wrapper h-full">
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

      {/* FIXED: Modal Components for proper sequence */}
      {/* Step 2: Writing Type Selection Modal */}
      <WritingTypeSelectionModal
        isOpen={showWritingTypeModal}
        onClose={() => setShowWritingTypeModal(false)}
        onSelectType={handleWritingTypeSelect}
      />

      {/* Step 3: Prompt Options Modal */}
      <PromptOptionsModal
        isOpen={showPromptOptionsModal}
        onClose={() => setShowPromptOptionsModal(false)}
        onGeneratePrompt={handleGeneratePrompt}
        onCustomPrompt={handleCustomPrompt}
        textType={selectedWritingType}
      />

      {/* Step 3b: Custom Prompt Modal */}
      <CustomPromptModal
        isOpen={showCustomPromptModal}
        onClose={() => setShowCustomPromptModal(false)}
        onSubmit={handleCustomPromptSubmit}
        textType={selectedWritingType}
      />

      {/* Essay Evaluation Modal */}
      <EssayEvaluationModal
        isOpen={showEvaluationModal}
        onClose={() => setShowEvaluationModal(false)}
        content={content}
        textType={textType || selectedWritingType}
      />
    </div>
  );
}