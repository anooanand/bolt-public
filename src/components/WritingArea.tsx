import React, { useState, useEffect, useCallback, useRef } from 'react';
import { User } from '@supabase/supabase-js';
import { AlertCircle, Send, Maximize2, Minimize2, Volume2, BarChart2, BookOpen, Clock, Brain, Sparkles } from 'lucide-react';
import { AutoSave } from './AutoSave';
import './responsive.css';

interface WritingAreaProps {
  user: User;
}

export function WritingArea({ user }: WritingAreaProps) {
  const [content, setContent] = useState('');
  const [textType, setTextType] = useState('');
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showCustomPrompt, setShowCustomPrompt] = useState(false);
  const [customPrompt, setCustomPrompt] = useState('');
  const [showPromptButtons, setShowPromptButtons] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [wordCountGoal, setWordCountGoal] = useState(250);
  const [activeTab, setActiveTab] = useState('write');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Enable writing when text type is selected
  const canWrite = Boolean(textType);

  const handleGeneratePrompt = async () => {
    setIsGenerating(true);
    // Simulate prompt generation
    setTimeout(() => {
      const prompts = [
        "Write a persuasive essay arguing whether students should be allowed to use smartphones in school.",
        "Write a narrative about a character who discovers an unexpected talent.",
        "Explain the causes and effects of climate change on our planet.",
        "Write a descriptive piece about a bustling marketplace."
      ];
      setPrompt(prompts[Math.floor(Math.random() * prompts.length)]);
      setIsGenerating(false);
      setShowCustomPrompt(false);
    }, 1000);
  };

  const handleCustomPromptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customPrompt.trim()) {
      setPrompt(customPrompt);
      setShowCustomPrompt(false);
    }
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
  };

  const handleSubmitEssay = () => {
    alert("Essay submitted for feedback!");
  };

  // Toggle fullscreen mode
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }, 100);
  };

  // Handle font size changes
  const changeFontSize = (delta: number) => {
    setFontSize(prevSize => {
      const newSize = prevSize + delta;
      return Math.min(Math.max(newSize, 12), 24);
    });
  };

  // Calculate word count
  const wordCount = content.split(/\s+/).filter(Boolean).length;
  const wordCountProgress = Math.min((wordCount / wordCountGoal) * 100, 100);

  const handleTextTypeSelect = (type: string) => {
    setTextType(type);
  };

  const renderWritingTools = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        <ToolCard 
          icon={<Brain className="w-5 h-5 text-indigo-600" />}
          title="AI Feedback"
          description="Get instant feedback on your writing with AI-powered analysis"
          onClick={() => alert("AI Feedback tool selected")}
        />
        <ToolCard 
          icon={<Sparkles className="w-5 h-5 text-purple-600" />}
          title="Vocabulary Enhancer"
          description="Find better words and phrases to improve your writing"
          onClick={() => alert("Vocabulary Enhancer selected")}
        />
        <ToolCard 
          icon={<Clock className="w-5 h-5 text-amber-600" />}
          title="Timed Practice"
          description="Practice writing under exam conditions with a timer"
          onClick={() => alert("Timed Practice selected")}
        />
        <ToolCard 
          icon={<BookOpen className="w-5 h-5 text-green-600" />}
          title="Text Type Templates"
          description="Access templates for different writing styles"
          onClick={() => alert("Templates selected")}
        />
        <ToolCard 
          icon={<BarChart2 className="w-5 h-5 text-blue-600" />}
          title="Progress Tracker"
          description="Monitor your writing improvement over time"
          onClick={() => alert("Progress Tracker selected")}
        />
        <ToolCard 
          icon={<Send className="w-5 h-5 text-rose-600" />}
          title="Essay Submission"
          description="Submit your essay for detailed feedback"
          onClick={() => alert("Essay Submission selected")}
        />
      </div>
    );
  };

  const renderTextTypeSelector = () => {
    const textTypes = [
      { id: 'persuasive', name: 'Persuasive Essay' },
      { id: 'narrative', name: 'Narrative' },
      { id: 'informative', name: 'Informative Essay' },
      { id: 'descriptive', name: 'Descriptive Writing' },
      { id: 'argumentative', name: 'Argumentative Essay' },
      { id: 'expository', name: 'Expository Essay' },
      { id: 'creative', name: 'Creative Writing' },
      { id: 'analytical', name: 'Analytical Essay' }
    ];

    return (
      <div className="p-4">
        <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">Select Writing Type</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {textTypes.map(type => (
            <button
              key={type.id}
              onClick={() => handleTextTypeSelect(type.id)}
              className={`p-3 rounded-lg border text-left hover:shadow-md transition-all ${
                textType === type.id 
                  ? 'bg-indigo-50 border-indigo-300 dark:bg-indigo-900/30 dark:border-indigo-700' 
                  : 'bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700'
              }`}
            >
              <div className="font-medium text-gray-900 dark:text-white">{type.name}</div>
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('write')}
              className={`py-4 px-6 font-medium text-sm border-b-2 ${
                activeTab === 'write'
                  ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Write
            </button>
            <button
              onClick={() => setActiveTab('tools')}
              className={`py-4 px-6 font-medium text-sm border-b-2 ${
                activeTab === 'tools'
                  ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Tools
            </button>
            <button
              onClick={() => setActiveTab('types')}
              className={`py-4 px-6 font-medium text-sm border-b-2 ${
                activeTab === 'types'
                  ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Writing Types
            </button>
          </nav>
        </div>

        {activeTab === 'write' && (
          <div 
            ref={containerRef} 
            className={`${isFullscreen ? 'fixed inset-0 z-50' : 'h-full'} flex flex-col bg-white dark:bg-gray-900 writing-area-container`}
          >
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex flex-wrap justify-between items-center gap-2">
                <h2 className="text-lg font-medium capitalize text-gray-900 dark:text-white">
                  {textType ? `${textType} Writing` : 'Select Writing Type'}
                </h2>
                
                <div className="flex items-center space-x-2">
                  <div className="flex items-center mr-2">
                    <button 
                      onClick={() => changeFontSize(-1)}
                      className="p-1 rounded-md text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                      title="Decrease font size"
                    >
                      A-
                    </button>
                    <span className="mx-1 text-gray-600 dark:text-gray-300">{fontSize}px</span>
                    <button 
                      onClick={() => changeFontSize(1)}
                      className="p-1 rounded-md text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                      title="Increase font size"
                    >
                      A+
                    </button>
                  </div>
                  
                  <button
                    onClick={toggleFullscreen}
                    className="p-2 rounded-md text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                    title={isFullscreen ? "Exit fullscreen" : "Fullscreen mode"}
                  >
                    {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                  </button>
                </div>
              </div>

              {!textType ? (
                <div className="flex items-center text-amber-500 dark:text-amber-400 text-sm">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  Please select a writing type first
                </div>
              ) : showPromptButtons && (
                <div className="flex flex-wrap space-x-2 gap-2 mt-2">
                  <button
                    onClick={() => setShowCustomPrompt(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium"
                  >
                    I have my own prompt
                  </button>
                  <button
                    onClick={handleGeneratePrompt}
                    disabled={isGenerating}
                    className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 text-sm font-medium disabled:cursor-not-allowed"
                  >
                    Generate New Prompt
                  </button>
                </div>
              )}

              {showCustomPrompt && textType && (
                <form onSubmit={handleCustomPromptSubmit} className="space-y-2 mt-2">
                  <textarea
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    placeholder="Enter your own writing prompt..."
                    className="w-full p-2 rounded-md text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                    rows={3}
                  />
                  <div className="flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={() => setShowCustomPrompt(false)}
                      className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100"
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

              {prompt && !showCustomPrompt && textType && (
                <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-md mt-2">
                  <h3 className="font-medium mb-2 text-blue-900 dark:text-blue-100">Writing Prompt:</h3>
                  <p className="text-blue-800 dark:text-blue-200">{prompt}</p>
                </div>
              )}
            </div>

            <div className="flex-1 p-4">
              <textarea
                ref={textareaRef}
                value={content}
                onChange={handleContentChange}
                disabled={!canWrite}
                className="w-full h-full p-4 resize-none focus:outline-none border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 disabled:bg-gray-50 dark:disabled:bg-gray-900 disabled:text-gray-400 dark:disabled:text-gray-500 disabled:cursor-not-allowed"
                placeholder={!textType 
                  ? "Select a writing type to begin..." 
                  : "Begin writing here..."}
                style={{ fontSize: `${fontSize}px` }}
              />
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Word count: {wordCount} / {wordCountGoal}
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-sm text-green-600 dark:text-green-400">
                    Auto-saving...
                  </div>
                  {content.trim().length > 50 && (
                    <button
                      onClick={handleSubmitEssay}
                      className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm font-medium"
                    >
                      <Send size={16} className="mr-2" />
                      Submit Essay
                    </button>
                  )}
                </div>
              </div>
              
              <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${wordCountProgress}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tools' && renderWritingTools()}
        {activeTab === 'types' && renderTextTypeSelector()}
      </div>
    </div>
  );
}

interface ToolCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}

function ToolCard({ icon, title, description, onClick }: ToolCardProps) {
  return (
    <button
      onClick={onClick}
      className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all text-left flex items-start"
    >
      <div className="mr-3 mt-1">{icon}</div>
      <div>
        <h3 className="font-medium text-gray-900 dark:text-white">{title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
      </div>
    </button>
  );
}
