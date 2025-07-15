import React, { useState, useEffect } from 'react';
import { WritingArea } from './WritingArea';
import { TabbedCoachPanel } from './TabbedCoachPanel';
import { Lightbulb, Type, Save, Settings, Sparkles, Users, Target, Star, CheckCircle, PanelRightClose, PanelRightOpen, Plus, Download, HelpCircle, Bot } from 'lucide-react';
import './layout-fix.css';
import './full-width-fix.css';
import './new-layout.css';

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
  const [templateData, setTemplateData] = useState<TemplateData>({
    setting: '',
    characters: '',
    plot: '',
    theme: ''
  });
  
  const [showPlanning, setShowPlanning] = useState(false);
  const [showWritingBuddy, setShowWritingBuddy] = useState(true);
  const [wordCount, setWordCount] = useState(0);
  const [characterCount, setCharacterCount] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
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
      'speech': 'Write a speech that engages and persuades your audience. Use rhetorical devices and clear structure.',
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

  const toggleWritingBuddy = () => {
    setShowWritingBuddy(!showWritingBuddy);
  };

  const handleNewStory = () => {
    if (onStartNewEssay) {
      onStartNewEssay();
    } else {
      onChange('');
      setTemplateData({
        setting: '',
        characters: '',
        plot: '',
        theme: ''
      });
      setCompletedSteps([]);
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
    localStorage.setItem('writingTemplateData', JSON.stringify(templateData));
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
      onNavigate('help-center');
    }
  };

  return (
    <div className="enhanced-writing-layout bg-gray-50 overflow-hidden min-h-0 h-full flex flex-row">
      {/* Left Side - Writing Area with Toolbar and Prompt - 65% width */}
      <div className="writing-left-section flex-1 flex flex-col min-h-0" style={{ flex: '0 0 65%' }}>
        {/* Writing Prompt at Top - BOLD AND PROMINENT */}
        {(textType && (generatedPrompt || getWritingPrompt())) && (
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-blue-200 p-4 shadow-lg flex-shrink-0">
            <div className="px-0">
              <div className="flex items-center space-x-3 mb-3 px-4">
                <Sparkles className="w-6 h-6 text-blue-600" />
                <h3 className="font-bold text-blue-800 text-lg">Your Writing Prompt</h3>
              </div>
              {/* ENHANCED PROMPT STYLING - BOLD AND PROMINENT */}
              <div className="bg-white rounded-lg p-4 border-l-4 border-blue-600 shadow-md mx-4">
                <p className="text-gray-800 leading-relaxed text-lg font-semibold">
                  {getWritingPrompt()}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Compact Toolbar - Above writing area, left aligned */}
        <div className="bg-white border-b border-gray-200 p-2 shadow-sm flex-shrink-0">
          <div className="px-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {/* Planning Toggle */}
              <div className="flex items-center space-x-2">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showPlanning}
                    onChange={togglePlanning}
                    className="sr-only"
                  />
                  <div className={`relative inline-flex h-4 w-8 items-center rounded-full transition-colors ${
                    showPlanning ? 'bg-blue-600' : 'bg-gray-300'
                  }`}>
                    <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                      showPlanning ? 'translate-x-4' : 'translate-x-0.5'
                    }`} />
                  </div>
                  <span className="ml-2 text-xs font-medium text-gray-700">Planning</span>
                </label>
              </div>

              {/* Action Buttons - Moved to left */}
              <button
                onClick={handleNewStory}
                className="flex items-center space-x-1 px-2 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-xs"
              >
                <Plus className="w-3 h-3" />
                <span>New</span>
              </button>
              
              <button
                onClick={handleSave}
                className="flex items-center space-x-1 px-2 py-1 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-xs"
              >
                <Save className="w-3 h-3" />
                <span>Save</span>
              </button>
              
              <button
                onClick={handleExport}
                className="flex items-center space-x-1 px-2 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-xs"
              >
                <Download className="w-3 h-3" />
                <span>Export</span>
              </button>
              
              <button
                onClick={handleHelp}
                className="flex items-center space-x-1 px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-xs"
              >
                <HelpCircle className="w-3 h-3" />
                <span>Help</span>
              </button>

              {/* Show Writing Buddy Button when hidden */}
              {!showWritingBuddy && (
                <button
                  onClick={toggleWritingBuddy}
                  className="flex items-center space-x-1 px-2 py-1 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-xs"
                >
                  <Bot className="w-3 h-3" />
                  <span>Writing Buddy</span>
                </button>
              )}
            </div>
            
            <div className="flex items-center space-x-3">
              {/* Word Count */}
              <div className="flex items-center space-x-1 text-xs text-gray-600">
                <Type className="w-3 h-3" />
                <span className="font-medium">{wordCount} words</span>
              </div>

              {/* Writing Stats */}
              <div className="flex items-center space-x-2 text-xs">
                <div className="bg-green-100 px-2 py-0.5 rounded-full">
                  <span className="font-medium">{Math.round(timeSpent / 60)} min</span>
                </div>
                <div className="bg-purple-100 px-2 py-0.5 rounded-full">
                  <span className="font-medium">{writingStreak} day streak</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Planning Section (Collapsible) - FIXED HEIGHT WITH SCROLLING */}
        {showPlanning && (
          <div className="bg-white border-b border-gray-200 shadow-sm flex-shrink-0" style={{ maxHeight: '200px' }}>
            <div className="px-0 h-full overflow-y-auto p-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 px-4">
                {writingSteps.map((step) => (
                  <div key={step.id} className="space-y-1 w-full md:w-1/2">
                    <div className="flex items-center space-x-2">
                      {completedSteps.includes(step.id) ? (
                        <CheckCircle className="w-3 h-3 text-green-600" />
                      ) : (
                        <step.icon className="w-3 h-3 text-gray-400" />
                      )}
                      <label className="font-medium text-gray-700 text-xs">{step.title}</label>
                    </div>
                    <textarea
                      value={templateData[step.field]}
                      onChange={(e) => handleTemplateChange(step.field, e.target.value)}
                      placeholder={step.description}
                      className="w-full h-12 p-2 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

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

      {/* Right Sidebar - Writing Buddy Panel - 25% width */}
      {showWritingBuddy && (
        <div className="writing-buddy-panel bg-white border-l border-gray-200 flex flex-col min-h-0" style={{ flex: '0 0 25%', minWidth: '300px' }}>
          {/* Writing Buddy Header */}
          <div className="writing-buddy-header bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 p-3 border-b border-gray-200 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bot className="w-5 h-5 text-purple-600" />
                <h3 className="font-semibold text-purple-800">Writing Buddy</h3>
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
