import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Save, Clock, Target, Sparkles, Heart, Star, Zap } from 'lucide-react';
import { WritingTypeSelector } from './WritingTypeSelector';
import { FunPromptGenerator } from './FunPromptGenerator';
import { WritingCoach } from './WritingCoach';
import { GamificationState } from './GamificationSystem';

interface KidFriendlyWritingAreaProps {
  content: string;
  onChange: (content: string) => void;
  textType: string;
  onTextTypeChange: (type: string) => void;
  gamificationState: GamificationState;
  onGamificationUpdate: (state: GamificationState) => void;
  onTimerStart?: (shouldStart: boolean) => void;
  onSubmit?: () => void;
}

interface WritingStats {
  wordCount: number;
  characterCount: number;
  paragraphCount: number;
  sentenceCount: number;
  readingTime: number;
}

export function KidFriendlyWritingArea({
  content,
  onChange,
  textType,
  onTextTypeChange,
  gamificationState,
  onGamificationUpdate,
  onTimerStart,
  onSubmit
}: KidFriendlyWritingAreaProps) {
  const [prompt, setPrompt] = useState('');
  const [showPromptSelector, setShowPromptSelector] = useState(!textType);
  const [showWritingArea, setShowWritingArea] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [writingStats, setWritingStats] = useState<WritingStats>({
    wordCount: 0,
    characterCount: 0,
    paragraphCount: 0,
    sentenceCount: 0,
    readingTime: 0
  });
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationMessage, setCelebrationMessage] = useState('');
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const saveTimeoutRef = useRef<NodeJS.Timeout>();

  // Calculate writing statistics
  const calculateStats = useCallback((text: string): WritingStats => {
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    const characters = text.length;
    const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0);
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const readingTime = Math.ceil(words.length / 200); // Average reading speed

    return {
      wordCount: words.length,
      characterCount: characters,
      paragraphCount: paragraphs.length,
      sentenceCount: sentences.length,
      readingTime: readingTime
    };
  }, []);

  // Update stats when content changes
  useEffect(() => {
    const stats = calculateStats(content);
    setWritingStats(stats);

    // Award points for milestones
    if (stats.wordCount > 0 && stats.wordCount % 50 === 0 && stats.wordCount !== writingStats.wordCount) {
      awardPoints(10, `Writing ${stats.wordCount} words`);
    }
  }, [content, calculateStats, writingStats.wordCount]);

  // Auto-save functionality
  useEffect(() => {
    if (content.length > 0) {
      setIsSaving(true);
      
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }

      saveTimeoutRef.current = setTimeout(() => {
        // Simulate saving to localStorage
        localStorage.setItem(`writing_${textType}`, content);
        localStorage.setItem(`prompt_${textType}`, prompt);
        setLastSaved(new Date());
        setIsSaving(false);
      }, 2000);
    }

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [content, textType, prompt]);

  // Load saved content
  useEffect(() => {
    if (textType) {
      const savedContent = localStorage.getItem(`writing_${textType}`);
      const savedPrompt = localStorage.getItem(`prompt_${textType}`);
      
      if (savedContent && savedContent !== content) {
        onChange(savedContent);
      }
      if (savedPrompt && savedPrompt !== prompt) {
        setPrompt(savedPrompt);
      }
    }
  }, [textType]);

  // Award points function
  const awardPoints = (points: number, reason: string) => {
    const newState = {
      ...gamificationState,
      totalPoints: gamificationState.totalPoints + points,
      wordsWritten: gamificationState.wordsWritten + (reason.includes('words') ? 50 : 0)
    };
    
    onGamificationUpdate(newState);
    
    setCelebrationMessage(`+${points} points for ${reason}! 🌟`);
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 2000);
  };

  // Handle text type selection
  const handleTextTypeSelect = (type: string) => {
    onTextTypeChange(type);
    setShowPromptSelector(false);
    setShowWritingArea(true);
  };

  // Handle prompt generation
  const handlePromptGenerated = (newPrompt: string) => {
    setPrompt(newPrompt);
    setShowWritingArea(true);
    onTimerStart?.(true);
  };

  // Handle custom prompt
  const handleCustomPrompt = (customPrompt: string) => {
    setPrompt(customPrompt);
    setShowWritingArea(true);
    onTimerStart?.(true);
  };

  // Handle content change
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    onChange(newContent);
  };

  // Get word count color based on target
  const getWordCountColor = () => {
    if (writingStats.wordCount < 50) return 'text-neutral-500';
    if (writingStats.wordCount < 100) return 'text-sunshine-600';
    if (writingStats.wordCount < 200) return 'text-success-600';
    return 'text-magic-600';
  };

  // Get encouragement message based on progress
  const getEncouragementMessage = () => {
    if (writingStats.wordCount === 0) return "Start typing to begin your amazing story! ✨";
    if (writingStats.wordCount < 25) return "Great start! Keep those creative ideas flowing! 🌟";
    if (writingStats.wordCount < 50) return "You're doing fantastic! Your story is taking shape! 🚀";
    if (writingStats.wordCount < 100) return "Wow! You're really getting into it! Keep going! 💪";
    if (writingStats.wordCount < 150) return "Amazing progress! You're becoming a writing superstar! ⭐";
    return "Incredible! You've written so much! You're a true writing champion! 🏆";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-magic-50">
      {/* Celebration popup */}
      {showCelebration && (
        <div className="fixed top-4 right-4 z-50 bg-gradient-to-r from-success-400 to-primary-400 text-white px-6 py-3 rounded-kid-lg shadow-bounce animate-celebrate">
          <div className="flex items-center space-x-2">
            <Star className="h-5 w-5 fill-current" />
            <span className="font-display font-bold">{celebrationMessage}</span>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Step 1: Text Type Selection */}
        {!textType && (
          <div className="mb-8">
            <WritingTypeSelector
              selectedType={textType}
              onTypeSelect={handleTextTypeSelect}
            />
          </div>
        )}

        {/* Step 2: Prompt Selection */}
        {textType && !prompt && (
          <div className="mb-8">
            <FunPromptGenerator
              textType={textType}
              onPromptGenerated={handlePromptGenerated}
              onCustomPrompt={handleCustomPrompt}
            />
          </div>
        )}

        {/* Step 3: Writing Interface */}
        {textType && prompt && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main writing area */}
            <div className="lg:col-span-2 space-y-6">
              {/* Writing stats bar */}
              <div className="bg-white rounded-kid-lg p-4 shadow-fun border-2 border-primary-100">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-kid-lg font-display font-bold text-neutral-800">
                    Your Writing Progress 📊
                  </h3>
                  <div className="flex items-center space-x-2">
                    {isSaving ? (
                      <div className="flex items-center space-x-2 text-sky-600">
                        <div className="w-4 h-4 border-2 border-sky-600 border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-kid-sm font-body">Saving...</span>
                      </div>
                    ) : lastSaved ? (
                      <div className="flex items-center space-x-2 text-success-600">
                        <Save className="h-4 w-4" />
                        <span className="text-kid-sm font-body">
                          Saved {lastSaved.toLocaleTimeString()}
                        </span>
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-primary-50 rounded-kid">
                    <div className={`text-kid-xl font-bold ${getWordCountColor()} mb-1`}>
                      {writingStats.wordCount}
                    </div>
                    <div className="text-kid-xs font-body text-neutral-600">Words</div>
                  </div>
                  <div className="text-center p-3 bg-success-50 rounded-kid">
                    <div className="text-kid-xl font-bold text-success-600 mb-1">
                      {writingStats.sentenceCount}
                    </div>
                    <div className="text-kid-xs font-body text-neutral-600">Sentences</div>
                  </div>
                  <div className="text-center p-3 bg-magic-50 rounded-kid">
                    <div className="text-kid-xl font-bold text-magic-600 mb-1">
                      {writingStats.paragraphCount}
                    </div>
                    <div className="text-kid-xs font-body text-neutral-600">Paragraphs</div>
                  </div>
                  <div className="text-center p-3 bg-sunshine-50 rounded-kid">
                    <div className="text-kid-xl font-bold text-sunshine-600 mb-1">
                      {writingStats.readingTime}
                    </div>
                    <div className="text-kid-xs font-body text-neutral-600">Min Read</div>
                  </div>
                </div>

                {/* Progress encouragement */}
                <div className="mt-4 p-3 bg-gradient-to-r from-primary-50 to-magic-50 rounded-kid border border-primary-200">
                  <div className="flex items-center space-x-3">
                    <Heart className="h-5 w-5 text-fun-500 fill-current animate-pulse" />
                    <span className="text-kid-base font-body text-neutral-700">
                      {getEncouragementMessage()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Current prompt display */}
              <div className="bg-gradient-to-r from-primary-400 to-magic-400 rounded-kid-lg p-6 text-white shadow-bounce">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-kid-lg font-display font-bold mb-2">
                      Your Writing Challenge:
                    </h3>
                    <p className="text-kid-base font-body leading-relaxed opacity-95">
                      {prompt}
                    </p>
                  </div>
                  <button
                    onClick={() => setPrompt('')}
                    className="flex-shrink-0 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
                    title="Change prompt"
                  >
                    <Zap className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Writing area */}
              <div className="bg-white rounded-kid-lg shadow-fun border-2 border-primary-100 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-kid-lg font-display font-bold text-neutral-800">
                      Start Writing Your Masterpiece! ✍️
                    </h3>
                    <div className="flex items-center space-x-2">
                      <Target className="h-5 w-5 text-primary-500" />
                      <span className="text-kid-sm font-body text-neutral-600">
                        Goal: 100+ words
                      </span>
                    </div>
                  </div>

                  <textarea
                    ref={textareaRef}
                    value={content}
                    onChange={handleContentChange}
                    placeholder="Once upon a time... or maybe your story starts differently! Let your imagination run wild and start typing your amazing ideas here! 🌟"
                    className="
                      w-full h-96 p-4 border-2 border-neutral-200 rounded-kid
                      text-kid-base font-body leading-relaxed resize-none
                      focus:border-primary-400 focus:ring-2 focus:ring-primary-200 focus:outline-none
                      transition-colors placeholder-neutral-400
                    "
                    style={{
                      backgroundImage: `
                        linear-gradient(transparent 0px, transparent 23px, #e5e7eb 24px),
                        linear-gradient(90deg, #f3f4f6 0px, #f3f4f6 40px, transparent 40px)
                      `,
                      backgroundSize: '100% 24px, 100% 24px',
                      lineHeight: '24px',
                      paddingLeft: '50px'
                    }}
                  />

                  {/* Word count warning/encouragement */}
                  {writingStats.wordCount > 0 && (
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {writingStats.wordCount < 100 ? (
                          <div className="flex items-center space-x-2 text-sunshine-600">
                            <Clock className="h-4 w-4" />
                            <span className="text-kid-sm font-body">
                              {100 - writingStats.wordCount} more words to reach your goal!
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2 text-success-600">
                            <Star className="h-4 w-4 fill-current" />
                            <span className="text-kid-sm font-body">
                              Amazing! You've reached your goal! Keep going! 🎉
                            </span>
                          </div>
                        )}
                      </div>

                      {writingStats.wordCount >= 50 && (
                        <button
                          onClick={onSubmit}
                          className="
                            bg-gradient-to-r from-success-400 to-primary-400
                            text-white font-display font-bold text-kid-sm
                            px-4 py-2 rounded-kid shadow-success
                            hover:scale-105 active:scale-95 transition-all duration-300
                            flex items-center space-x-2
                          "
                        >
                          <Heart className="h-4 w-4 fill-current" />
                          <span>I'm Done! 🎉</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar with coach and tools */}
            <div className="space-y-6">
              <WritingCoach
                content={content}
                textType={textType}
                wordCount={writingStats.wordCount}
                onEncouragement={() => awardPoints(5, 'getting encouragement')}
              />

              {/* Quick tools */}
              <div className="bg-white rounded-kid-lg p-4 shadow-fun border-2 border-magic-100">
                <h3 className="text-kid-lg font-display font-bold text-neutral-800 mb-4">
                  Writing Tools 🛠️
                </h3>
                <div className="space-y-3">
                  <button className="w-full bg-gradient-to-r from-magic-100 to-fun-100 hover:from-magic-200 hover:to-fun-200 border-2 border-magic-200 rounded-kid p-3 text-left transition-colors group">
                    <div className="flex items-center space-x-3">
                      <Sparkles className="h-5 w-5 text-magic-600 group-hover:scale-110 transition-transform" />
                      <div>
                        <div className="text-kid-base font-display font-bold text-neutral-800">
                          Word Helper
                        </div>
                        <div className="text-kid-sm font-body text-neutral-600">
                          Find better words
                        </div>
                      </div>
                    </div>
                  </button>

                  <button className="w-full bg-gradient-to-r from-success-100 to-sky-100 hover:from-success-200 hover:to-sky-200 border-2 border-success-200 rounded-kid p-3 text-left transition-colors group">
                    <div className="flex items-center space-x-3">
                      <Target className="h-5 w-5 text-success-600 group-hover:scale-110 transition-transform" />
                      <div>
                        <div className="text-kid-base font-display font-bold text-neutral-800">
                          Story Planner
                        </div>
                        <div className="text-kid-sm font-body text-neutral-600">
                          Organize your ideas
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

