import React, { useState, useEffect, useRef, useCallback } from 'react';
import { generatePrompt, getSynonyms, rephraseSentence, evaluateEssay, getWritingFeedback, identifyCommonMistakes, getTextTypeVocabulary, getSpecializedTextTypeFeedback, getWritingStructure } from '../lib/openai';
import { dbOperations } from '../lib/database';
import { useApp } from '../contexts/AppContext';
import { 
  AlertCircle, 
  ChevronLeft, 
  ChevronRight, 
  Save, 
  FileText, 
  Clock, 
  RefreshCw, 
  BookOpen, 
  Star, 
  Trophy, 
  Heart, 
  Sparkles,
  CheckCircle,
  PenTool,
  Target,
  Lightbulb,
  X,
  ChevronDown
} from 'lucide-react';
import { KidFriendlyErrorHandler, KidFriendlyErrorDisplay } from '../utils/kidFriendlyErrorHandler.tsx';
import { WritingStatusBar } from './WritingStatusBar';
import { WritingToolbar } from './WritingToolbar';
import { ParaphrasePanel } from './ParaphrasePanel';
import './responsive.css';
import './kid-friendly-theme.css';

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

interface ToolGroup {
  id: string;
  title: string;
  description: string;
  tools: Tool[];
  icon: React.ComponentType;
  priority: 'primary' | 'secondary' | 'advanced';
}

interface Tool {
  id: string;
  label: string;
  kidFriendlyLabel: string;
  description: string;
  icon: React.ComponentType;
  action: () => void;
  helpText: string;
}

export function KidFriendlyWritingArea({ content, onChange, textType, onTimerStart, onSubmit }: WritingAreaProps) {
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
  const [error, setError] = useState<any>(null);
  const [wordCount, setWordCount] = useState(0);
  const [showParaphrasePanel, setShowParaphrasePanel] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [showHelpCenter, setShowHelpCenter] = useState(false);
  const [showPlanningTool, setShowPlanningTool] = useState(false);
  const [encouragementMessage, setEncouragementMessage] = useState<string>('');
  const [showVocabularyTool, setShowVocabularyTool] = useState(false);
  const [showModelResponses, setShowModelResponses] = useState(false);
  const [celebrationMode, setCelebrationMode] = useState(false);
  const [achievements, setAchievements] = useState<string[]>([]);
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Kid-friendly error handling
  const handleError = (errorType: string, originalError: string) => {
    const kidFriendlyError = KidFriendlyErrorHandler.handleError(errorType, { wordCount, textType });
    setError(kidFriendlyError);
    
    if (kidFriendlyError.type === 'encouragement') {
      setEncouragementMessage(kidFriendlyError.message);
      setTimeout(() => setEncouragementMessage(''), kidFriendlyError.duration || 5000);
    }
  };

  // Enhanced prompt generation with kid-friendly themes
  const generateKidFriendlyPrompt = async (textType: string) => {
    const kidFriendlyPrompts = {
      'narrative': [
        "Write about a day when you discovered something magical in your backyard!",
        "Tell the story of a friendship between a child and an unusual pet.",
        "Describe an adventure that starts when you find a mysterious key.",
        "Write about a time when you had to be brave and help someone.",
        "Create a story about a character who can talk to animals.",
        "Write about finding a secret door in your school that leads somewhere amazing."
      ],
      'persuasive': [
        "Convince your principal why students should have longer lunch breaks.",
        "Write a letter persuading your family to adopt a pet.",
        "Argue why kids should be allowed to design their own school uniforms.",
        "Persuade your teacher that homework should be more creative and fun.",
        "Convince your parents to let you stay up later on weekends.",
        "Argue why every classroom should have a reading corner with bean bags."
      ],
      'expository': [
        "Explain how to be a good friend to someone who is new to your school.",
        "Describe the steps to create something you're really good at making.",
        "Explain why reading is like going on adventures without leaving your room.",
        "Describe how teamwork helps people accomplish amazing things.",
        "Explain what makes a great teacher and why.",
        "Describe the process of learning something new and challenging."
      ]
    };
    
    const prompts = kidFriendlyPrompts[textType] || kidFriendlyPrompts['narrative'];
    return prompts[Math.floor(Math.random() * prompts.length)];
  };

  // Kid-friendly tool groups
  const kidFriendlyToolGroups: ToolGroup[] = [
    {
      id: 'writing-helpers',
      title: 'Writing Helpers',
      description: 'Tools to make your writing even better!',
      priority: 'primary',
      icon: PenTool,
      tools: [
        {
          id: 'check-writing',
          label: 'Check',
          kidFriendlyLabel: 'Check My Writing',
          description: 'Let me help you make your writing shine!',
          icon: CheckCircle,
          action: () => handleCheckWriting(),
          helpText: 'I\'ll look for ways to make your writing even better and give you helpful suggestions!'
        },
        {
          id: 'vocabulary',
          label: 'Vocabulary',
          kidFriendlyLabel: 'Find Better Words',
          description: 'Discover amazing words to make your writing more exciting!',
          icon: BookOpen,
          action: () => setShowVocabularyTool(true),
          helpText: 'Click on any word in your writing, and I\'ll suggest some cool alternatives!'
        },
        {
          id: 'examples',
          label: 'Examples',
          kidFriendlyLabel: 'See Examples',
          description: 'Look at examples to spark your creativity!',
          icon: Lightbulb,
          action: () => setShowModelResponses(true),
          helpText: 'Check out some example writing to get ideas for your own story!'
        }
      ]
    },
    {
      id: 'planning-tools',
      title: 'Planning & Ideas',
      description: 'Get organized and brainstorm amazing ideas!',
      priority: 'secondary',
      icon: Target,
      tools: [
        {
          id: 'planning',
          label: 'Plan',
          kidFriendlyLabel: 'Plan My Writing',
          description: 'Let\'s organize your thoughts before you start!',
          icon: FileText,
          action: () => setShowPlanningTool(true),
          helpText: 'Planning helps you organize your ideas so your writing flows perfectly!'
        },
        {
          id: 'new-prompt',
          label: 'New Prompt',
          kidFriendlyLabel: 'Get New Ideas',
          description: 'Need a fresh idea? I\'ve got lots of creative prompts!',
          icon: Sparkles,
          action: () => handleGeneratePrompt(),
          helpText: 'If you\'re stuck, I can give you a brand new writing idea to try!'
        }
      ]
    }
  ];

  // Enhanced toolbar rendering with progressive disclosure
  const renderToolGroup = (group: ToolGroup) => {
    const [isExpanded, setIsExpanded] = useState(group.priority === 'primary');
    
    return (
      <div key={group.id} className="tool-group mb-4">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors touch-target"
        >
          <div className="flex items-center">
            <group.icon className="w-5 h-5 text-blue-600 mr-2" />
            <span className="font-medium text-blue-900">{group.title}</span>
          </div>
          <ChevronDown className={`w-4 h-4 text-blue-600 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        </button>
        {isExpanded && (
          <div className="mt-2 space-y-2">
            <p className="text-sm text-gray-600 px-3">{group.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {group.tools.map(tool => (
                <ToolButton key={tool.id} tool={tool} />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const ToolButton: React.FC<{ tool: Tool }> = ({ tool }) => {
    const [showTooltip, setShowTooltip] = useState(false);
    
    return (
      <div className="relative">
        <button
          onClick={tool.action}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className="kid-button-primary w-full flex items-center justify-center p-3 text-sm"
        >
          <tool.icon className="w-4 h-4 mr-2" />
          <span>{tool.kidFriendlyLabel}</span>
        </button>
        
        {showTooltip && (
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg whitespace-nowrap z-10">
            {tool.helpText}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
          </div>
        )}
      </div>
    );
  };

  // Achievement system
  const checkAchievements = useCallback(() => {
    const newAchievements = [];
    
    if (wordCount >= 50 && !achievements.includes('first-words')) {
      newAchievements.push('first-words');
      triggerCelebration('🎉 Amazing! You wrote your first 50 words!');
    }
    
    if (wordCount >= 100 && !achievements.includes('word-warrior')) {
      newAchievements.push('word-warrior');
      triggerCelebration('⭐ Fantastic! You\'re a Word Warrior with 100+ words!');
    }
    
    if (wordCount >= 200 && !achievements.includes('story-master')) {
      newAchievements.push('story-master');
      triggerCelebration('🏆 Incredible! You\'re a Story Master with 200+ words!');
    }
    
    if (newAchievements.length > 0) {
      setAchievements(prev => [...prev, ...newAchievements]);
    }
  }, [wordCount, achievements]);

  const triggerCelebration = (message: string) => {
    setEncouragementMessage(message);
    setCelebrationMode(true);
    setTimeout(() => {
      setCelebrationMode(false);
      setEncouragementMessage('');
    }, 3000);
  };

  // Initialize component
  useEffect(() => {
    const initializeComponent = async () => {
      try {
        console.log('🚀 Initializing Kid-Friendly WritingArea component...');
        
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setWordCount(content ? content.split(/\s+/).filter(word => word.length > 0).length : 0);
        
        if (!prompt && textType) {
          try {
            const generatedPrompt = await generateKidFriendlyPrompt(textType);
            setPrompt(generatedPrompt);
          } catch (err) {
            console.warn('Could not generate prompt, using fallback');
            setPrompt(`Write an amazing ${textType} that shows off your creativity!`);
          }
        }
        
        setIsLoading(false);
        console.log('✅ Kid-Friendly WritingArea component initialized successfully');
      } catch (err) {
        console.error('❌ Error initializing WritingArea:', err);
        handleError('INITIALIZATION_ERROR', err instanceof Error ? err.message : 'Unknown error');
        setIsLoading(false);
      }
    };

    initializeComponent();
  }, [textType, content, prompt]);

  // Update word count and check achievements
  useEffect(() => {
    const words = content ? content.split(/\s+/).filter(word => word.length > 0).length : 0;
    setWordCount(words);
    checkAchievements();
  }, [content, checkAchievements]);

  // Auto-save functionality
  useEffect(() => {
    if (content && content.length > 10) {
      const saveTimer = setTimeout(async () => {
        try {
          setIsSaving(true);
          await new Promise(resolve => setTimeout(resolve, 500));
          setLastSaved(new Date());
          setIsSaving(false);
        } catch (err) {
          console.error('Auto-save failed:', err);
          handleError('SAVE_FAILED', err instanceof Error ? err.message : 'Save failed');
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
      const newPrompt = await generateKidFriendlyPrompt(textType);
      setPrompt(newPrompt);
      setEncouragementMessage('🎨 Here\'s a fresh new idea for you to explore!');
      setTimeout(() => setEncouragementMessage(''), 3000);
    } catch (error) {
      console.error('Error generating prompt:', error);
      handleError('AI_GENERATION_FAILED', error instanceof Error ? error.message : 'Generation failed');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCustomPrompt = () => {
    if (customPrompt.trim()) {
      setPrompt(customPrompt.trim());
      setCustomPrompt('');
      setShowCustomPrompt(false);
      setEncouragementMessage('✨ Great choice! Your custom prompt is ready to inspire you!');
      setTimeout(() => setEncouragementMessage(''), 3000);
    }
  };

  const handleSave = async () => {
    if (isSaving) return;
    
    setIsSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setLastSaved(new Date());
      setEncouragementMessage('💾 Your amazing work has been saved safely!');
      setTimeout(() => setEncouragementMessage(''), 2000);
    } catch (error) {
      console.error('Save failed:', error);
      handleError('SAVE_FAILED', error instanceof Error ? error.message : 'Save failed');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSubmit = () => {
    if (content.trim().length < 50) {
      handleError('CONTENT_TOO_SHORT', 'Content too short');
      return;
    }
    
    setEncouragementMessage('🎉 Congratulations! You\'ve completed your writing piece!');
    triggerCelebration('🏆 Amazing work! Your writing is complete!');
    setTimeout(() => {
      onSubmit();
    }, 2000);
  };

  const handleCheckWriting = async () => {
    if (content.length < 20) {
      handleError('CONTENT_TOO_SHORT', 'Need more content to check');
      return;
    }
    
    setEncouragementMessage('🔍 Let me take a look at your wonderful writing!');
    // Simulate checking process
    setTimeout(() => {
      setEncouragementMessage('✨ Your writing looks great! Keep up the excellent work!');
      setTimeout(() => setEncouragementMessage(''), 3000);
    }, 2000);
  };

  const handleTextSelection = () => {
    if (textareaRef.current) {
      const start = textareaRef.current.selectionStart;
      const end = textareaRef.current.selectionEnd;
      const selected = content.substring(start, end);
      
      if (selected.trim().length > 0) {
        setSelectedText(selected);
      }
    }
  };

  const handleParaphraseClick = () => {
    handleTextSelection();
    setShowParaphrasePanel(true);
  };

  const handleApplyParaphrase = (paraphrasedText: string) => {
    if (textareaRef.current && selectedText) {
      const start = textareaRef.current.selectionStart;
      const end = textareaRef.current.selectionEnd;
      const newContent = content.substring(0, start) + paraphrasedText + content.substring(end);
      onChange(newContent);
      setShowParaphrasePanel(false);
      setSelectedText('');
      setEncouragementMessage('🔄 Great job improving your writing!');
      setTimeout(() => setEncouragementMessage(''), 2000);
    }
  };

  // Error state
  if (error && error.type !== 'encouragement') {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <KidFriendlyErrorDisplay 
          error={error} 
          onDismiss={() => setError(null)} 
        />
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border border-blue-200">
        <div className="text-center p-6">
          <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <h3 className="text-xl font-bold text-blue-800 mb-2">🚀 Getting Ready for You!</h3>
          <p className="text-blue-600">Setting up your amazing writing adventure...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`writing-area-container h-full flex flex-col ${celebrationMode ? 'celebration-mode' : ''}`} ref={containerRef}>
      {/* Encouragement Message */}
      {encouragementMessage && (
        <div className="encouragement-message">
          {encouragementMessage}
        </div>
      )}

      {/* Error Display */}
      {error && (
        <KidFriendlyErrorDisplay 
          error={error} 
          onDismiss={() => setError(null)} 
        />
      )}

      {/* Header */}
      <div className="writing-header bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 flex items-center justify-between rounded-t-lg">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <PenTool className="w-6 h-6" />
            <h2 className="text-xl font-bold">
              {textType ? `${textType.charAt(0).toUpperCase() + textType.slice(1)} Writing Studio` : 'Writing Studio'}
            </h2>
          </div>
          <div className="flex items-center space-x-2 bg-white bg-opacity-20 rounded-full px-3 py-1">
            <FileText className="w-4 h-4" />
            <span className="font-medium">{wordCount} words</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {achievements.length > 0 && (
            <div className="flex items-center space-x-1 bg-yellow-400 text-yellow-900 rounded-full px-3 py-1">
              <Trophy className="w-4 h-4" />
              <span className="font-medium">{achievements.length}</span>
            </div>
          )}
          
          {lastSaved && (
            <div className="flex items-center space-x-1 text-sm bg-white bg-opacity-20 rounded-full px-3 py-1">
              <Clock className="w-4 h-4" />
              <span>Saved {lastSaved.toLocaleTimeString()}</span>
            </div>
          )}
          
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="kid-button-primary bg-white text-blue-600 hover:bg-gray-100"
          >
            <Save className="w-4 h-4 mr-1" />
            <span>{isSaving ? 'Saving...' : 'Save'}</span>
          </button>
        </div>
      </div>

      {/* Kid-Friendly Toolbar */}
      <div className="kid-toolbar bg-white border-b border-gray-200 p-4">
        {kidFriendlyToolGroups.map(group => renderToolGroup(group))}
      </div>

      {/* Prompt Section */}
      {prompt && (
        <div className="prompt-section bg-gradient-to-r from-green-50 to-blue-50 border-b border-green-200 p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center mb-2">
                <Lightbulb className="w-5 h-5 text-green-600 mr-2" />
                <h3 className="font-bold text-green-800">Your Writing Adventure:</h3>
              </div>
              <p className="text-green-700 text-lg leading-relaxed">{prompt}</p>
            </div>
            <div className="flex space-x-2 ml-4">
              <button
                onClick={handleGeneratePrompt}
                disabled={isGenerating}
                className="kid-button-primary bg-green-600 hover:bg-green-700"
              >
                <Sparkles className="w-4 h-4 mr-1" />
                {isGenerating ? 'Thinking...' : 'New Idea'}
              </button>
              <button
                onClick={() => setShowCustomPrompt(!showCustomPrompt)}
                className="kid-button-primary bg-purple-600 hover:bg-purple-700"
              >
                <PenTool className="w-4 h-4 mr-1" />
                My Idea
              </button>
            </div>
          </div>
          
          {showCustomPrompt && (
            <div className="mt-4 p-4 bg-white rounded-lg border border-green-200">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What would you like to write about?
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  placeholder="Tell me your amazing idea..."
                  className="kid-input-field flex-1"
                  onKeyPress={(e) => e.key === 'Enter' && handleCustomPrompt()}
                />
                <button
                  onClick={handleCustomPrompt}
                  className="kid-button-primary bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Use This!
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Main Writing Area */}
      <div className="flex-1 flex writing-area-mobile">
        {/* Writing Editor */}
        <div className="flex-1 p-4">
          <div className="relative">
            {/* Paraphrase Button (shows when text is selected) */}
            {selectedText && (
              <div className="absolute top-2 right-2 z-10">
                <button
                  onClick={handleParaphraseClick}
                  className="kid-button-primary bg-blue-600 hover:bg-blue-700"
                >
                  <RefreshCw className="w-4 h-4 mr-1" />
                  Make It Better
                </button>
              </div>
            )}
            
            <textarea
              ref={textareaRef}
              value={content}
              onChange={(e) => onChange(e.target.value)}
              onMouseUp={handleTextSelection}
              onKeyUp={handleTextSelection}
              placeholder="Start writing your amazing story here! ✨"
              className="writing-textarea-mobile"
              style={{ 
                fontFamily: 'Georgia, serif', 
                fontSize: '18px', 
                lineHeight: '1.8',
                background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'
              }}
            />
          </div>
        </div>

        {/* Enhanced Sidebar */}
        {isSidebarOpen && (
          <div className="w-80 bg-gradient-to-b from-gray-50 to-white border-l border-gray-200 p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Heart className="w-5 h-5 text-red-500 mr-2" />
                <h3 className="font-bold text-gray-800">Writing Helper</h3>
              </div>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="p-1 hover:bg-gray-200 rounded touch-target"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-4">
              {/* Progress Section */}
              <div className="bg-white p-4 rounded-lg border shadow-sm">
                <div className="flex items-center mb-3">
                  <Trophy className="w-5 h-5 text-yellow-500 mr-2" />
                  <h4 className="font-bold text-gray-700">Your Progress</h4>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Words written:</span>
                      <span className="font-bold text-blue-600">{wordCount}</span>
                    </div>
                    <div className="progress-bar-container">
                      <div 
                        className="progress-bar-fill"
                        style={{ width: `${Math.min((wordCount / 200) * 100, 100)}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Target: 200 words</p>
                  </div>
                  
                  {achievements.length > 0 && (
                    <div>
                      <h5 className="font-medium text-gray-700 mb-2">🏆 Achievements:</h5>
                      <div className="flex flex-wrap gap-1">
                        {achievements.map((achievement, index) => (
                          <span 
                            key={index}
                            className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium"
                          >
                            ⭐ {achievement.replace('-', ' ')}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Writing Tips */}
              <div className="bg-white p-4 rounded-lg border shadow-sm">
                <div className="flex items-center mb-3">
                  <Lightbulb className="w-5 h-5 text-blue-500 mr-2" />
                  <h4 className="font-bold text-gray-700">Writing Tips</h4>
                </div>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Start with an exciting opening sentence
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Use descriptive words to paint pictures
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Organize your ideas in paragraphs
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Read your work out loud to check flow
                  </li>
                </ul>
              </div>

              {/* Encouragement Section */}
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-lg border">
                <div className="flex items-center mb-2">
                  <Star className="w-5 h-5 text-purple-500 mr-2" />
                  <h4 className="font-bold text-purple-800">You're Doing Great!</h4>
                </div>
                <p className="text-sm text-purple-700">
                  Every word you write makes you a better writer. Keep going - your creativity is amazing! 🌟
                </p>
              </div>
            </div>
          </div>
        )}
        
        {/* Sidebar Toggle (when closed) */}
        {!isSidebarOpen && (
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="w-12 bg-gradient-to-b from-gray-100 to-gray-200 border-l border-gray-200 flex items-center justify-center hover:from-gray-200 hover:to-gray-300 touch-target"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Footer */}
      <div className="writing-footer bg-gradient-to-r from-gray-50 to-white border-t border-gray-200 p-4 flex items-center justify-between rounded-b-lg">
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <div className={`w-2 h-2 rounded-full ${isSaving ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'}`}></div>
            <span>Auto-save: {isSaving ? 'Saving your work...' : 'All saved!'}</span>
          </div>
          {lastSaved && <span>Last saved: {lastSaved.toLocaleTimeString()}</span>}
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to start over? This will clear all your writing.')) {
                onChange('');
                setEncouragementMessage('🆕 Fresh start! Ready for your next amazing story!');
                setTimeout(() => setEncouragementMessage(''), 2000);
              }
            }}
            className="kid-button-primary bg-gray-600 hover:bg-gray-700"
          >
            Start Over
          </button>
          
          <button
            onClick={handleSubmit}
            disabled={content.trim().length < 50}
            className="kid-button-primary bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <CheckCircle className="w-4 h-4 mr-1" />
            I'm Done! 🎉
          </button>
        </div>
      </div>

      {/* Paraphrase Panel */}
      {showParaphrasePanel && (
        <ParaphrasePanel
          selectedText={selectedText}
          onApply={handleApplyParaphrase}
          onClose={() => setShowParaphrasePanel(false)}
        />
      )}
    </div>
  );
}


// Export alias for backward compatibility
export const WritingArea = KidFriendlyWritingArea;

