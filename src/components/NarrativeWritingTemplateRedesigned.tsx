import React, { useState, useEffect, useCallback } from 'react';
import { Lightbulb, Type, Save, Settings, Sparkles, ChevronDown, ChevronUp, Users, Target, Star, CheckCircle, Bot, Zap, BookOpen, PenTool } from 'lucide-react';
import { EnhancedWritingEditorWithHighlighting } from './EnhancedWritingEditor';
import { getNSWSelectiveFeedback } from '../lib/openai';

interface NarrativeWritingTemplateRedesignedProps {
  content: string;
  onChange: (content: string) => void;
  prompt?: string;
  onPromptChange?: (prompt: string) => void;
  onTimerStart?: (shouldStart: boolean) => void;
  onSubmit?: () => void;
}

interface TemplateData {
  setting: string;
  characters: string;
  plot: string;
  theme: string;
}

interface WritingSupport {
  level: 'full' | 'guided' | 'collaborative';
  showSentenceStarters: boolean;
  showStoryBranches: boolean;
}

export function NarrativeWritingTemplateRedesigned({ 
  content, 
  onChange, 
  prompt,
  onPromptChange,
  onTimerStart,
  onSubmit
}: NarrativeWritingTemplateRedesignedProps) {
  const [templateData, setTemplateData] = useState<TemplateData>({
    setting: '',
    characters: '',
    plot: '',
    theme: ''
  });
  
  const [showPlanning, setShowPlanning] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [characterCount, setCharacterCount] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  
  // NARRATIVE ENHANCEMENT: Add support levels for reluctant writers
  const [writingSupport, setWritingSupport] = useState<WritingSupport>({
    level: 'full',
    showSentenceStarters: false,
    showStoryBranches: false
  });
  
  // NARRATIVE ENHANCEMENT: Story progression tracking
  const [storyProgress, setStoryProgress] = useState({
    beginning: '',
    middle: '',
    end: '',
    currentSection: 'beginning' as 'beginning' | 'middle' | 'end'
  });
  
  // NARRATIVE ENHANCEMENT: Collaborative writing state
  const [collaborativeMode, setCollaborativeMode] = useState(false);
  const [aiTurn, setAiTurn] = useState(false);
  const [storyHistory, setStoryHistory] = useState<string[]>([]);

  // NARRATIVE ENHANCEMENT: Sentence starters for different story sections
  const sentenceStarters = {
    beginning: [
      "Once upon a time, in a place where...",
      "It was a dark and stormy night when...",
      "Sarah had never expected that her ordinary Tuesday would...",
      "The mysterious package arrived just as...",
      "In the heart of the ancient forest, there lived..."
    ],
    middle: [
      "Suddenly, everything changed when...",
      "But then, something unexpected happened...",
      "As the adventure continued, they discovered...",
      "The plot thickened when...",
      "Just when things seemed hopeless..."
    ],
    end: [
      "Finally, after all their struggles...",
      "In the end, they learned that...",
      "As the sun set on their adventure...",
      "Looking back, they realized...",
      "And so, their story came to a close when..."
    ]
  };

  // NARRATIVE ENHANCEMENT: Story branch options for choose-your-own-adventure style
  const storyBranches = {
    character: [
      "A brave young explorer",
      "A shy but clever student", 
      "A magical creature in disguise",
      "A time-traveling scientist"
    ],
    setting: [
      "An enchanted forest",
      "A futuristic space station",
      "A mysterious old mansion",
      "A bustling marketplace"
    ],
    conflict: [
      "A treasure that's been lost for centuries",
      "A friend who needs rescuing",
      "A mystery that needs solving",
      "A challenge that tests their courage"
    ]
  };

  // NARRATIVE ENHANCEMENT: Collaborative writing with AI
  const handleCollaborativeWriting = useCallback(async () => {
    if (!collaborativeMode) return;
    
    try {
      setAiTurn(true);
      
      // Get the current story context
      const storyContext = storyHistory.join(' ') + ' ' + content;
      
      // Generate next sentence from AI (simplified - would use actual OpenAI API)
      const aiSentence = await generateAISentence(storyContext);
      
      if (aiSentence) {
        const newContent = content + (content.endsWith(' ') ? '' : ' ') + aiSentence;
        onChange(newContent);
        setStoryHistory(prev => [...prev, aiSentence]);
      }
      
    } catch (error) {
      console.error('Collaborative writing error:', error);
    } finally {
      setAiTurn(false);
    }
  }, [collaborativeMode, content, storyHistory, onChange]);

  // NARRATIVE ENHANCEMENT: Generate AI sentence for collaboration
  const generateAISentence = async (context: string): Promise<string> => {
    // This would integrate with the actual OpenAI API
    // For now, return a placeholder
    const sampleSentences = [
      "The wind whispered secrets through the trees.",
      "A strange glow emanated from the ancient doorway.",
      "She took a deep breath and stepped forward courageously.",
      "The mysterious figure turned around slowly.",
      "Everything seemed different in the moonlight."
    ];
    
    return sampleSentences[Math.floor(Math.random() * sampleSentences.length)];
  };

  // NARRATIVE ENHANCEMENT: Handle support level changes
  const handleSupportLevelChange = useCallback((level: WritingSupport['level']) => {
    setWritingSupport(prev => ({
      ...prev,
      level,
      showSentenceStarters: level === 'guided',
      showStoryBranches: level === 'guided'
    }));
    
    setCollaborativeMode(level === 'collaborative');
  }, []);

  // NARRATIVE ENHANCEMENT: Insert sentence starter
  const insertSentenceStarter = useCallback((starter: string) => {
    const newContent = content + (content.length > 0 ? ' ' : '') + starter + ' ';
    onChange(newContent);
  }, [content, onChange]);

  // Calculate word and character count
  useEffect(() => {
    const words = content.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
    setCharacterCount(content.length);
    
    // NARRATIVE ENHANCEMENT: Track story progression
    let currentSection: 'beginning' | 'middle' | 'end' = 'beginning';
    if (words.length > 100) currentSection = 'middle';
    if (words.length > 200) currentSection = 'end';
    
    setStoryProgress(prev => ({
      ...prev,
      currentSection,
      [currentSection]: content
    }));
  }, [content]);

  const writingSteps = [
    { id: 1, title: "Setting", icon: Settings, description: "Where and when your story unfolds", field: 'setting' as keyof TemplateData },
    { id: 2, title: "Characters", icon: Users, description: "The people who bring your story to life", field: 'characters' as keyof TemplateData },
    { id: 3, title: "Plot", icon: Target, description: "The sequence of events in your story", field: 'plot' as keyof TemplateData },
    { id: 4, title: "Theme", icon: Star, description: "The deeper meaning or message", field: 'theme' as keyof TemplateData }
  ];

  const updateCompletedSteps = (data: TemplateData) => {
    const completed: number[] = [];
    if (data.setting.trim()) completed.push(1);
    if (data.characters.trim()) completed.push(2);
    if (data.plot.trim()) completed.push(3);
    if (data.theme.trim()) completed.push(4);
    setCompletedSteps(completed);
  };

  const handleTemplateChange = (field: keyof TemplateData, value: string) => {
    const newData = {
      ...templateData,
      [field]: value
    };
    setTemplateData(newData);
    updateCompletedSteps(newData);
  };

  const getProgressPercentage = () => {
    return Math.round((completedSteps.length / writingSteps.length) * 100);
  };

  const togglePlanning = () => {
    setShowPlanning(!showPlanning);
  };

  // AI Feedback function for the enhanced editor
  const handleGetFeedback = async (content: string) => {
    try {
      return await getNSWSelectiveFeedback(content, 'narrative', 'detailed', []);
    } catch (error) {
      console.error('Error getting NSW Selective feedback:', error);
      return null;
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* NARRATIVE ENHANCEMENT: Enhanced Writing Toolbar */}
        <div className="bg-white border-b border-gray-200 p-4 shadow-sm">
          <div className="max-w-4xl mx-auto space-y-4">
            {/* First Row: Planning and Stats */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                {/* Planning Toggle */}
                <div className="flex items-center space-x-3">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showPlanning}
                      onChange={togglePlanning}
                      className="sr-only"
                    />
                    <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      showPlanning ? 'bg-blue-600' : 'bg-gray-300'
                    }`}>
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        showPlanning ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </div>
                    <span className="ml-2 text-sm font-medium text-gray-700">
                      {showPlanning ? 'Hide Planning' : 'Show Planning'}
                    </span>
                  </label>
                </div>

                {/* Word Count and Story Progress */}
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Type className="w-4 h-4" />
                    <span className="font-medium">{wordCount} words</span>
                    <span>•</span>
                    <span>{characterCount} characters</span>
                  </div>
                  
                  {/* NARRATIVE ENHANCEMENT: Story section indicator */}
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-4 h-4" />
                    <span className="font-medium text-purple-600 capitalize">
                      {storyProgress.currentSection}
                    </span>
                  </div>
                </div>

                {/* Progress (if planning is shown) */}
                {showPlanning && (
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <span>Planning Progress:</span>
                    <span className="font-medium text-blue-600">{getProgressPercentage()}%</span>
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="flex items-center space-x-2 px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
                  <Save className="w-4 h-4" />
                  <span>Auto-save</span>
                </button>
              </div>
            </div>

            {/* NARRATIVE ENHANCEMENT: Second Row - Writing Support Options */}
            <div className="flex items-center justify-between border-t pt-4">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700">Writing Support:</span>
                
                {/* Support Level Buttons */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleSupportLevelChange('full')}
                    className={`px-3 py-1 text-xs rounded-full transition-colors ${
                      writingSupport.level === 'full'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    <PenTool className="w-3 h-3 inline mr-1" />
                    Full Writing
                  </button>
                  <button
                    onClick={() => handleSupportLevelChange('guided')}
                    className={`px-3 py-1 text-xs rounded-full transition-colors ${
                      writingSupport.level === 'guided'
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    <Lightbulb className="w-3 h-3 inline mr-1" />
                    Guided
                  </button>
                  <button
                    onClick={() => handleSupportLevelChange('collaborative')}
                    className={`px-3 py-1 text-xs rounded-full transition-colors ${
                      writingSupport.level === 'collaborative'
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    <Bot className="w-3 h-3 inline mr-1" />
                    Collaborative
                  </button>
                </div>
              </div>

              {/* Collaborative Mode Controls */}
              {collaborativeMode && (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleCollaborativeWriting}
                    disabled={aiTurn}
                    className="flex items-center space-x-2 px-3 py-1 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors disabled:opacity-50"
                  >
                    {aiTurn ? (
                      <>
                        <Zap className="w-4 h-4 animate-pulse" />
                        <span>AI Writing...</span>
                      </>
                    ) : (
                      <>
                        <Bot className="w-4 h-4" />
                        <span>AI Turn</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Planning Section (Collapsible) */}
        {showPlanning && (
          <div className="bg-white border-b border-gray-200 p-4 shadow-sm">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {writingSteps.map((step) => (
                  <div key={step.id} className="space-y-2">
                    <div className="flex items-center space-x-2">
                      {completedSteps.includes(step.id) ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <step.icon className="w-5 h-5 text-gray-400" />
                      )}
                      <label className="font-medium text-gray-700">{step.title}</label>
                    </div>
                    <textarea
                      value={templateData[step.field]}
                      onChange={(e) => handleTemplateChange(step.field, e.target.value)}
                      placeholder={step.description}
                      className="w-full h-20 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* NARRATIVE ENHANCEMENT: Sentence Starters and Story Branches (for guided mode) */}
        {writingSupport.showSentenceStarters && (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-200 p-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center space-x-2 mb-3">
                <Lightbulb className="w-5 h-5 text-green-600" />
                <h3 className="font-medium text-green-800">
                  Sentence Starters for {storyProgress.currentSection}
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {sentenceStarters[storyProgress.currentSection].map((starter, index) => (
                  <button
                    key={index}
                    onClick={() => insertSentenceStarter(starter)}
                    className="text-left p-3 bg-white border border-green-200 rounded-lg hover:bg-green-50 hover:border-green-300 transition-colors text-sm"
                  >
                    "{starter}"
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* NARRATIVE ENHANCEMENT: Story Branches (for guided mode) */}
        {writingSupport.showStoryBranches && (
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-200 p-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center space-x-2 mb-3">
                <Star className="w-5 h-5 text-purple-600" />
                <h3 className="font-medium text-purple-800">Story Elements to Choose From</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(storyBranches).map(([category, options]) => (
                  <div key={category} className="space-y-2">
                    <h4 className="font-medium text-purple-700 capitalize">{category}:</h4>
                    <div className="space-y-1">
                      {options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => insertSentenceStarter(option)}
                          className="block w-full text-left p-2 bg-white border border-purple-200 rounded hover:bg-purple-50 hover:border-purple-300 transition-colors text-sm"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Main Writing Area - Enhanced with AI Grammar Checking and Interactive Highlighting */}
        <div className="flex-1 p-6 bg-white">
          <div className="max-w-4xl mx-auto h-full">
            <EnhancedWritingEditorWithHighlighting
              content={content}
              onChange={onChange}
              placeholder={
                collaborativeMode 
                  ? "Start your story and I'll help you continue it! Write a sentence and then click 'AI Turn' for collaborative writing... ✨"
                  : writingSupport.level === 'guided'
                  ? "Use the sentence starters above to help you begin, or start writing your own amazing story... ✨"
                  : "Start writing your amazing story here! Let your creativity flow and bring your ideas to life... ✨"
              }
              className="w-full h-full"
              textType="narrative"
              onGetFeedback={handleGetFeedback}
              style={{ 
                fontFamily: 'Georgia, serif',
                minHeight: showPlanning ? '400px' : '500px'
              }}
            />
          </div>
        </div>

        {/* NARRATIVE ENHANCEMENT: Enhanced Writing Tips with Support Level Context */}
        {wordCount < 50 && (
          <div className="bg-blue-50 border-t border-blue-200 p-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center space-x-2 text-blue-700">
                <Lightbulb className="w-4 h-4" />
                <span className="font-medium">
                  {writingSupport.level === 'collaborative' ? 'Collaborative Writing Tip:' :
                   writingSupport.level === 'guided' ? 'Guided Writing Tip:' : 'Writing Tip:'}
                </span>
              </div>
              <p className="text-blue-600 text-sm mt-1">
                {writingSupport.level === 'collaborative' 
                  ? "Start with a sentence or two, then click 'AI Turn' to let me help continue your story. We'll take turns building an amazing narrative together!"
                  : writingSupport.level === 'guided'
                  ? "Use the sentence starters above to help you begin, or try the story elements to spark your imagination. Remember, every great story starts with a single word!"
                  : "Start with a strong opening that grabs your reader's attention. Don't worry about making it perfect - you can always revise it later!"
                }
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}