import React, { useState, useEffect } from 'react';
import { WritingArea } from './WritingArea';
import { TabbedCoachPanel } from './TabbedCoachPanel';
import { Lightbulb, Type, Save, Settings, Sparkles, Users, Target, Star, CheckCircle, PanelRightClose, PanelRightOpen } from 'lucide-react';

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
  onNavigate
}: EnhancedWritingLayoutProps) {
  const [templateData, setTemplateData] = useState<TemplateData>({
    setting: '',
    characters: '',
    plot: '',
    theme: ''
  });
  
  const [showPlanning, setShowPlanning] = useState(false);
  const [showChatPanel, setShowChatPanel] = useState(true);
  const [wordCount, setWordCount] = useState(0);
  const [characterCount, setCharacterCount] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [writingStreak, setWritingStreak] = useState(3);
  const [timeSpent, setTimeSpent] = useState(0);

  // Get writing prompt based on text type
  const getWritingPrompt = () => {
    const prompts = {
      'narrative': 'Write a compelling narrative story that engages your reader from beginning to end. Include vivid descriptions, interesting characters, and a clear plot structure.',
      'persuasive': 'Write a persuasive piece that convinces your reader of your viewpoint. Use strong arguments, evidence, and persuasive techniques.',
      'expository': 'Write an informative piece that explains a topic clearly and thoroughly. Use facts, examples, and logical organization.',
      'recount': 'Write a recount of an event or experience. Include details about what happened, when, where, and why it was significant.',
      'default': 'Write a well-structured piece that demonstrates your writing skills. Focus on clear expression, good organization, and engaging content.'
    };
    
    return prompts[textType as keyof typeof prompts] || prompts.default;
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

  const toggleChatPanel = () => {
    setShowChatPanel(!showChatPanel);
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Writing Prompt at Top */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-blue-200 p-4 shadow-sm">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center space-x-2 mb-2">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-blue-800">Your Writing Prompt</h3>
          </div>
          <p className="text-gray-700 leading-relaxed text-lg">{getWritingPrompt()}</p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Writing Toolbar */}
        <div className="bg-white border-b border-gray-200 p-4 shadow-sm">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
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

              {/* Word Count */}
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Type className="w-4 h-4" />
                <span className="font-medium">{wordCount} words</span>
                <span>•</span>
                <span>{characterCount} characters</span>
              </div>

              {/* Progress (if planning is shown) */}
              {showPlanning && (
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <span>Planning Progress:</span>
                  <span className="font-medium text-blue-600">{getProgressPercentage()}%</span>
                </div>
              )}

              {/* Writing Stats */}
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1 bg-green-100 px-3 py-1 rounded-full">
                  <span className="font-medium">{Math.round(timeSpent / 60)} min</span>
                </div>
                <div className="flex items-center space-x-1 bg-purple-100 px-3 py-1 rounded-full">
                  <span className="font-medium">{writingStreak} day streak</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {/* Chat Panel Toggle */}
              <button
                onClick={toggleChatPanel}
                className="flex items-center space-x-2 px-3 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
              >
                {showChatPanel ? <PanelRightClose className="w-4 h-4" /> : <PanelRightOpen className="w-4 h-4" />}
                <span>{showChatPanel ? 'Hide Assistant' : 'Show Assistant'}</span>
              </button>

              <button className="flex items-center space-x-2 px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
                <Save className="w-4 h-4" />
                <span>Auto-save</span>
              </button>
            </div>
          </div>
        </div>

        {/* Planning Section (Collapsible) */}
        {showPlanning && (
          <div className="bg-white border-b border-gray-200 p-4 shadow-sm">
            <div className="max-w-6xl mx-auto">
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

        {/* Main Writing Area with Optional Chat Panel */}
        <div className="flex-1 flex overflow-hidden">
          {/* Writing Area - Maximized */}
          <div className={`${showChatPanel ? 'flex-1' : 'w-full'} p-6 bg-white`}>
            <div className="max-w-6xl mx-auto h-full">
              <textarea
                value={content}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Start writing your amazing story here! Let your creativity flow and bring your ideas to life... ✨"
                className="w-full h-full p-6 border-2 border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg leading-relaxed shadow-sm"
                style={{ 
                  fontFamily: 'Georgia, serif',
                  minHeight: showPlanning ? '400px' : '500px'
                }}
              />
            </div>
          </div>

          {/* Right Sidebar - Chat Panel (Optional) */}
          {showChatPanel && (
            <div className="w-96 flex-shrink-0 p-4 bg-white border-l border-gray-200">
              <div className="h-full">
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

        {/* Writing Tips (Bottom) */}
        {wordCount < 50 && (
          <div className="bg-blue-50 border-t border-blue-200 p-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center space-x-2 text-blue-700">
                <Lightbulb className="w-4 h-4" />
                <span className="font-medium">Writing Tip:</span>
              </div>
              <p className="text-blue-600 text-sm mt-1">
                Start with a strong opening that grabs your reader's attention. Don't worry about making it perfect - you can always revise it later!
              </p>
            </div>
          </div>
        )}

        {/* Footer with Submit Button */}
        <div className="bg-white border-t border-gray-200 p-4 shadow-sm">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span>Auto-save enabled</span>
              <span>•</span>
              <span>Last saved: just now</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={onSubmit}
                disabled={wordCount < 50}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  wordCount >= 50
                    ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white hover:shadow-lg hover:scale-105'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Submit for Evaluation ({wordCount} words)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
