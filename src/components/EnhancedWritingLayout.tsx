import React, { useState, useEffect } from 'react';
import { WritingArea } from './WritingArea';
import { TabbedCoachPanel } from './TabbedCoachPanel';
import { Lightbulb, Type, Save, Settings, Sparkles, Users, Target, Star, CheckCircle, PanelRightClose, PanelRightOpen, Plus, Download, HelpCircle, Bot } from 'lucide-react';
import './layout-fix.css';
import './full-width-fix.css';
import './new-layout.css';
import './space-optimization.css'; // <--- ADD THIS LINE

interface EnhancedWritingLayoutProps {
  content: string;
  onChange: (content: string) => void;
  textType: string;
  assistanceLevel: string;
  selectedText: string;
  onTimerStart: (shouldStart: boolean) => void;
  onSubmit: () => void;
  onTextTypeChange?: (textType: string) => void;
  onPopupCompleted?: () => void;
  onNavigate?: (page: string) => void;
  onShowHelpCenter?: () => void;
  onStartNewEssay?: () => void;
}

interface TemplateData {
  setting: string;
  characters: string;
  plot: string;
  theme: string;
}

export function EnhancedWritingLayout({
  content,
  onChange,
  textType,
  assistanceLevel,
  selectedText,
  onTimerStart,
  onSubmit,
  onTextTypeChange,
  onPopupCompleted,
  onNavigate,
  onShowHelpCenter,
  onStartNewEssay
}: EnhancedWritingLayoutProps) {
  const [showWritingBuddy, setShowWritingBuddy] = useState(true);
  const [wordCount, setWordCount] = useState(0);
  const [characterCount, setCharacterCount] = useState(0);
  const [writingStreak, setWritingStreak] = useState(3);
  const [timeSpent, setTimeSpent] = useState(0);
  
  // State to store the generated prompt from WritingArea
  const [generatedPrompt, setGeneratedPrompt] = useState('');

  // Get writing prompt based on text type (fallback for when no generated prompt exists)
  const getWritingPrompt = () => {
    // Use generated prompt if available, otherwise use static prompts
    if (generatedPrompt) {
      return generatedPrompt;
    }
    
    const prompts = {
      'narrative': 'Write a compelling narrative story that engages your reader from beginning to end. Include vivid descriptions, interesting characters, and a clear plot structure.',
      'persuasive': 'Write a persuasive piece that convinces your reader of your viewpoint. Use strong arguments, evidence, and persuasive techniques.',
      'expository': 'Write an informative piece that explains a topic clearly and thoroughly. Use facts, examples, and logical organization.',
      'recount': 'Write a recount of an event or experience. Include details about what happened, when, where, and why it was significant.',
      'reflective': 'Write a reflective piece about your thoughts, feelings, and experiences. Show personal growth and insight.',
      'descriptive': 'Write a descriptive piece that paints a vivid picture with words. Use sensory details and figurative language.',
      'discursive': 'Write a discursive piece that explores different perspectives on a topic. Present balanced arguments and analysis.',
      'news report': 'Write a news report that informs readers about current events. Use the 5 W\'s and H (Who, What, When, Where, Why, How).',
      'letter': 'Write a letter that communicates effectively with your intended audience. Use appropriate tone and format.',
      'diary entry': 'Write a diary entry that captures your personal thoughts and experiences. Be authentic and reflective.',
      'speech': 'Write a speech that engages and and persuades your audience. Use rhetorical devices and clear structure.',
      'default': 'Write a well-structured piece that demonstrates your writing skills. Focus on clear expression, good organization, and engaging content.'
    };
    
    return prompts[textType as keyof typeof prompts] || prompts.default;
  };

  // Callback to receive generated prompt from WritingArea
  const handlePromptGenerated = (prompt: string) => {
    setGeneratedPrompt(prompt);
  };

  // Calculate word and character count
  useEffect(() => {
    const words = content.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
    setCharacterCount(content.length);
  }, [content]);

  // Timer for tracking writing time
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const toggleWritingBuddy = () => {
    setShowWritingBuddy(!showWritingBuddy);
  };

  const handleNewStory = () => {
    if (onStartNewEssay) {
      onStartNewEssay();
    } else {
      onChange('');
      // Clear generated prompt when starting new story
      setGeneratedPrompt('');
      if (onNavigate) {
        onNavigate('dashboard');
      }
    }
  };

  const handleSave = () => {
    // Save functionality
    localStorage.setItem('writingContent', content);
  };

  const handleExport = () => {
    // Export functionality
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `writing-${textType}-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleHelp = () => {
    if (onShowHelpCenter) {
      onShowHelpCenter();
    } else if (onNavigate) {
      onNavigate('help');
    }
  };

  return (
    <div className="enhanced-writing-layout space-optimized bg-gray-50 overflow-hidden min-h-0 h-full flex flex-row">
      {/* Left Side - Writing Area with Toolbar and Prompt - 70% width */}
      <div className="writing-left-section flex-1 flex flex-col min-h-0" style={{ flex: '0 0 70%' }}>
        {/* Writing Prompt at Top - OPTIMIZED SPACING */}
        {(textType && (generatedPrompt || getWritingPrompt())) && (
          <div className="writing-prompt-container bg-gradient-to-r from-blue-50 to-purple-50 border-b border-blue-200 shadow-lg flex-shrink-0">
            <div className="px-4 py-3">
              <div className="flex items-center space-x-3 mb-2">
                <Sparkles className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-blue-800 text-base">Your Writing Prompt</h3>
              </div>
              {/* OPTIMIZED PROMPT STYLING */}
              <div className="bg-white rounded-lg p-3 border border-blue-200">
                <p className="text-gray-800 leading-relaxed text-base font-medium">
                  {getWritingPrompt()}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Compact Toolbar - OPTIMIZED SPACING */}
        <div className="bg-white border-b border-gray-200 p-1 shadow-sm flex-shrink-0">
          <div className="px-3 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {/* Action Buttons - Compact */}
              <button
                onClick={handleNewStory}
                className="toolbar-button flex items-center space-x-1 px-2 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-xs"
              >
                <Plus className="w-3 h-3" />
                <span>New</span>
              </button>
              
              <button
                onClick={handleSave}
                className="toolbar-button flex items-center space-x-1 px-2 py-1 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-xs"
              >
                <Save className="w-3 h-3" />
                <span>Save</span>
              </button>
              
              <button
                onClick={handleExport}
                className="toolbar-button flex items-center space-x-1 px-2 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-xs"
              >
                <Download className="w-3 h-3" />
                <span>Export</span>
              </button>
              
              <button
                onClick={handleHelp}
                className="toolbar-button flex items-center space-x-1 px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-xs"
              >
                <HelpCircle className="w-3 h-3" />
                <span>Help</span>
              </button>

              {/* Show Writing Buddy Button when hidden */}
              {!showWritingBuddy && (
                <button
                  onClick={toggleWritingBuddy}
                  className="toolbar-button flex items-center space-x-1 px-2 py-1 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-xs"
                >
                  <Bot className="w-3 h-3" />
                  <span>Writing Buddy</span>
                </button>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              {/* Word Count - Compact */}
              <div className="flex items-center space-x-1 text-xs text-gray-600">
                <Type className="w-3 h-3" />
                <span className="font-medium">{wordCount} words</span>
              </div>

              {/* Writing Stats - Compact */}
              <div className="flex items-center space-x-1 text-xs">
                <div className="writing-stats bg-green-100 px-2 py-0.5 rounded-full">
                  <span className="font-medium">{Math.round(timeSpent / 60)} min</span>
                </div>
                <div className="writing-stats bg-purple-100 px-2 py-0.5 rounded-full">
                  <span className="font-medium">{writingStreak} day streak</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Writing Area - Full height */}
        <div className="writing-textarea-wrapper flex-1 min-h-0">
          <div className="h-full">
            <WritingArea
              content={content}
              onChange={onChange}
              textType={textType}
              onTimerStart={onTimerStart}
              onSubmit={onSubmit}
              onTextTypeChange={onTextTypeChange}
              onPopupCompleted={onPopupCompleted}
              onPromptGenerated={handlePromptGenerated}
            />
          </div>
        </div>
      </div>

      {/* Right Sidebar - Writing Buddy Panel - 30% width */}
      {showWritingBuddy && (
        <div className="writing-buddy-panel bg-white border-l border-gray-200 flex flex-col min-h-0" style={{ flex: '0 0 30%', minWidth: '300px' }}>
          {/* Writing Buddy Header - OPTIMIZED */}
          <div className="writing-buddy-header bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 border-b border-gray-200 flex-shrink-0 p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bot className="w-4 h-4 text-purple-600" />
                <h3 className="font-semibold text-purple-800 text-sm">Writing Buddy</h3>
              </div>
              <button
                onClick={toggleWritingBuddy}
                className="p-1 hover:bg-purple-200 rounded-lg transition-colors"
              >
                <PanelRightClose className="w-4 h-4 text-purple-600" />
              </button>
            </div>
          </div>

          {/* Chat Panel Content - Full height */}
          <div className="flex-1 overflow-hidden">
            <TabbedCoachPanel
              content={content}
              textType={textType}
              assistanceLevel={assistanceLevel}
              selectedText={selectedText}
              onNavigate={onNavigate}
              wordCount={wordCount}
            />
          </div>
        </div>
      )}
    </div>
  );
}