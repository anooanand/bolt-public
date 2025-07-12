import React, { useState, useEffect } from 'react';
import { WritingArea } from './WritingArea';
import { TabbedCoachPanel } from './TabbedCoachPanel';
import { EnhancedProgressTracker } from './EnhancedProgressTracker';
import { EnhancedNavigation } from './EnhancedNavigation';
import { Settings, Maximize2, Minimize2, PanelLeftClose, PanelLeftOpen } from 'lucide-react';

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
  const [currentStep, setCurrentStep] = useState('Setting');
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [writingStreak, setWritingStreak] = useState(3); // Example streak
  const [timeSpent, setTimeSpent] = useState(0);
  const [panelCollapsed, setPanelCollapsed] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const availableSteps = ['Setting', 'Characters', 'Plot', 'Theme'];
  const totalSteps = availableSteps.length;

  // Calculate word count
  const wordCount = content.trim().split(/\s+/).filter(word => word.length > 0).length;

  // Timer for tracking writing time
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Auto-complete steps based on content length
  useEffect(() => {
    const newCompletedSteps = [];
    if (wordCount > 50) newCompletedSteps.push('Setting');
    if (wordCount > 100) newCompletedSteps.push('Characters');
    if (wordCount > 150) newCompletedSteps.push('Plot');
    if (wordCount > 200) newCompletedSteps.push('Theme');
    
    setCompletedSteps(newCompletedSteps);
  }, [wordCount]);

  const handleStepChange = (step: string) => {
    setCurrentStep(step);
  };

  const handleHome = () => {
    if (onNavigate) {
      onNavigate('home');
    }
  };

  return (
    <div className={`h-screen flex flex-col bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20 ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
      {/* Header with Navigation and Controls */}
      <div className="flex-shrink-0 p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Writing Adventure! ✨
            </h1>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setPanelCollapsed(!panelCollapsed)}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
                title={panelCollapsed ? 'Show Panel' : 'Hide Panel'}
              >
                {panelCollapsed ? <PanelLeftOpen className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
                title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Quick Stats */}
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1 bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full">
                <span className="font-medium">{wordCount} words</span>
              </div>
              <div className="flex items-center space-x-1 bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full">
                <span className="font-medium">{Math.round(timeSpent / 60)} min</span>
              </div>
              <div className="flex items-center space-x-1 bg-purple-100 dark:bg-purple-900/30 px-3 py-1 rounded-full">
                <span className="font-medium">{writingStreak} day streak</span>
              </div>
            </div>
            
            <button className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all">
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Navigation and Progress */}
        {!panelCollapsed && (
          <div className="w-80 flex-shrink-0 p-4 space-y-4 overflow-y-auto bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            {/* Enhanced Navigation */}
            <EnhancedNavigation
              currentStep={currentStep}
              availableSteps={availableSteps}
              completedSteps={completedSteps}
              onStepChange={handleStepChange}
              onHome={handleHome}
            />
            
            {/* Enhanced Progress Tracker */}
            <EnhancedProgressTracker
              currentStep={currentStep}
              completedSteps={completedSteps}
              totalSteps={totalSteps}
              wordCount={wordCount}
              timeSpent={timeSpent}
              writingStreak={writingStreak}
            />
          </div>
        )}

        {/* Center - Writing Area */}
        <div className="flex-1 p-4 overflow-hidden">
          <div className="h-full">
            <WritingArea
              content={content}
              onChange={onChange}
              textType={textType}
              onTimerStart={onTimerStart}
              onSubmit={onSubmit}
              onTextTypeChange={onTextTypeChange}
              onPopupCompleted={onPopupCompleted}
            />
          </div>
        </div>

        {/* Right Sidebar - Chat Panel */}
        <div className="w-96 flex-shrink-0 p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
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
      </div>

      {/* Footer with Additional Controls */}
      <div className="flex-shrink-0 p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
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
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
              }`}
            >
              Submit for Evaluation ({wordCount} words)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

