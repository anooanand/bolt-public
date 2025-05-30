import React, { useState, useEffect } from 'react';
import { NavBar } from './components/NavBar';
import { HeroSection } from './components/HeroSection';
import { FeaturesSection } from './components/FeaturesSection';
import { WritingModesSection } from './components/WritingModesSection';
import { ToolsSection } from './components/ToolsSection';
import { WritingTypesSection } from './components/WritingTypesSection';
import { SplitScreen } from './components/SplitScreen';
import { WritingArea } from './components/WritingArea';
import { CoachPanel } from './components/CoachPanel';
import { ParaphrasePanel } from './components/ParaphrasePanel';
import { LearningPage } from './components/LearningPage';
import { ExamSimulationMode } from './components/ExamSimulationMode';
import { SupportiveFeatures } from './components/SupportiveFeatures';
import { HelpCenter } from './components/HelpCenter';
import { EssayFeedbackPage } from './components/EssayFeedbackPage';
import { EnhancedHeader } from './components/EnhancedHeader';
import { SpecializedCoaching } from './components/text-type-templates/SpecializedCoaching';
import { AboutPage } from './components/AboutPage';
import { FAQPage } from './components/FAQPage';
import { NSWSelectiveExamSimulator } from './components/NSWSelectiveExamSimulator';
import { EssayScorer } from './components/EssayScorer';
import { NSWSelectiveWritingTypes } from './components/NSWSelectiveWritingTypes';
import { PracticeTips } from './components/PracticeTips';
import { ThemeProvider } from './lib/ThemeContext';

// Add CSS for the redesign styles
import './redesign.css';

function App() {
  // State for the main application
  const [content, setContent] = useState('');
  const [textType, setTextType] = useState('');
  const [assistanceLevel, setAssistanceLevel] = useState('detailed');
  const [timerStarted, setTimerStarted] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [activePanel, setActivePanel] = useState<'coach' | 'paraphrase'>('coach');
  const [currentPage, setCurrentPage] = useState<'home' | 'writing' | 'learning' | 'feedback' | 'resources' | 'practice' | 'about' | 'faq' | 'pricing' | 'signup' | 'signin'>('home');
  const [showExamMode, setShowExamMode] = useState(false);
  const [showHelpCenter, setShowHelpCenter] = useState(false);

  // Handle navigation from navbar
  const handleNavigation = (page: string) => {
    setCurrentPage(page as any);
  };

  // Handle starting writing from hero section
  const handleStartWriting = () => {
    setCurrentPage('writing');
  };

  // Handle trying demo from hero section
  const handleTryDemo = () => {
    setCurrentPage('writing');
    setTextType('narrative');
    setContent('The old clock on the wall had stopped ticking exactly at midnight. ');
  };

  // Handle feature selection
  const handleTryFeature = (feature: string) => {
    switch (feature) {
      case 'ai-feedback':
        setCurrentPage('writing');
        setActivePanel('coach');
        break;
      case 'templates':
        setCurrentPage('resources');
        break;
      case 'practice':
        setShowExamMode(true);
        break;
    }
  };

  // Handle writing mode selection
  const handleSelectMode = (mode: string) => {
    switch (mode) {
      case 'writing':
        setCurrentPage('writing');
        break;
      case 'learning':
        setCurrentPage('learning');
        break;
      case 'exam':
        setShowExamMode(true);
        break;
    }
  };

  // Handle tool opening
  const handleOpenTool = (tool: string) => {
    // Map tools to their respective components or pages
    switch (tool) {
      case 'text-type-guide':
        setCurrentPage('writing');
        // Show text type guide modal
        const textTypeGuideEvent = new CustomEvent('show-text-type-guide');
        window.dispatchEvent(textTypeGuideEvent);
        break;
      case 'planning-tool':
        setCurrentPage('writing');
        // Show planning tool would be triggered here
        break;
      case 'model-responses':
        setCurrentPage('resources');
        break;
      case 'vocabulary-helper':
        setCurrentPage('resources');
        break;
    }
  };

  // Handle writing type selection
  const handleSelectType = (type: string) => {
    setTextType(type);
    setCurrentPage('writing');
  };

  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection();
      if (selection && selection.toString().trim().length > 0) {
        setSelectedText(selection.toString());
        setActivePanel('paraphrase');
      }
    };

    document.addEventListener('selectionchange', handleSelectionChange);
    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
    };
  }, []);

  const appState = {
    content,
    textType,
    assistanceLevel,
    timerStarted
  };

  const updateAppState = (updates: Partial<typeof appState>) => {
    if ('content' in updates) setContent(updates.content || '');
    if ('textType' in updates) setTextType(updates.textType || '');
    if ('assistanceLevel' in updates) setAssistanceLevel(updates.assistanceLevel || 'detailed');
    if ('timerStarted' in updates) setTimerStarted(!!updates.timerStarted);
  };

  const handleRestoreContent = (savedContent: string, savedTextType: string) => {
    setContent(savedContent);
    setTextType(savedTextType);
  };

  const handleSubmitEssay = () => {
    setCurrentPage('feedback');
  };

  // Render exam simulation mode
  if (showExamMode) {
    return (
      <ThemeProvider>
        <ExamSimulationMode onExit={() => setShowExamMode(false)} />
      </ThemeProvider>
    );
  }

  // Render about page
  if (currentPage === 'about') {
    return (
      <ThemeProvider>
        <NavBar onNavigate={handleNavigation} activePage={currentPage} />
        <div className="pt-16">
          <AboutPage />
        </div>
      </ThemeProvider>
    );
  }

  // Render FAQ page
  if (currentPage === 'faq') {
    return (
      <ThemeProvider>
        <NavBar onNavigate={handleNavigation} activePage={currentPage} />
        <div className="pt-16">
          <FAQPage />
        </div>
      </ThemeProvider>
    );
  }

  // Render feedback page
  if (currentPage === 'feedback') {
    return (
      <ThemeProvider>
        <NavBar onNavigate={handleNavigation} activePage={currentPage} />
        <div className="pt-16">
          <EssayFeedbackPage
            content={content}
            textType={textType}
            onBack={() => setCurrentPage('writing')}
          />
        </div>
      </ThemeProvider>
    );
  }

  // Render learning page
  if (currentPage === 'learning') {
    return (
      <ThemeProvider>
        <NavBar onNavigate={handleNavigation} activePage={currentPage} />
        <div className="pt-16">
          <SupportiveFeatures
            content={content}
            textType={textType}
            onRestoreContent={handleRestoreContent}
          >
            <LearningPage 
              state={appState}
              onStateChange={updateAppState}
              onNavigateToWriting={() => setCurrentPage('writing')}
            />
          </SupportiveFeatures>
        </div>
      </ThemeProvider>
    );
  }

  // Render writing page
  if (currentPage === 'writing') {
    return (
      <ThemeProvider>
        <NavBar onNavigate={handleNavigation} activePage={currentPage} />
        <div className="pt-16">
          <SupportiveFeatures
            content={content}
            textType={textType}
            onRestoreContent={handleRestoreContent}
          >
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
              <div className="max-w-7xl mx-auto">
                <header className="mb-4">
                  <EnhancedHeader
                    textType={textType}
                    assistanceLevel={assistanceLevel}
                    onTextTypeChange={setTextType}
                    onAssistanceLevelChange={setAssistanceLevel}
                    onTimerStart={() => setTimerStarted(true)}
                  />
                  
                  <div className="mt-3 mb-3">
                    <SpecializedCoaching textType={textType} content={content} />
                  </div>
                </header>

                <SplitScreen
                  left={
                    <WritingArea
                      content={content}
                      onChange={setContent}
                      textType={textType}
                      onTimerStart={setTimerStarted}
                      onSubmit={handleSubmitEssay}
                    />
                  }
                  right={
                    <div className="h-full flex flex-col">
                      <div className="flex border-b">
                        <button
                          className={`flex-1 py-2 text-center text-sm font-medium ${
                            activePanel === 'coach'
                              ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-500'
                              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800'
                          }`}
                          onClick={() => setActivePanel('coach')}
                          data-panel="coach"
                        >
                          Coach
                        </button>
                        <button
                          className={`flex-1 py-2 text-center text-sm font-medium ${
                            activePanel === 'paraphrase'
                              ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-500'
                              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800'
                          }`}
                          onClick={() => setActivePanel('paraphrase')}
                          data-panel="paraphrase"
                        >
                          Paraphrase
                        </button>
                      </div>
                      
                      <div className="flex-1 overflow-hidden">
                        {activePanel === 'coach' ? (
                          <CoachPanel
                            content={content}
                            textType={textType}
                            assistanceLevel={assistanceLevel}
                          />
                        ) : (
                          <ParaphrasePanel
                            selectedText={selectedText}
                            onApplyParaphrase={(replacement, start, end) => {
                              const newContent = content.substring(0, start) + replacement + content.substring(end);
                              setContent(newContent);
                            }}
                          />
                        )}
                      </div>
                    </div>
                  }
                />
              </div>
            </div>
          </SupportiveFeatures>
        </div>
      </ThemeProvider>
    );
  }

  // Render home page (default)
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <NavBar onNavigate={handleNavigation} activePage={currentPage} />
        <HeroSection onStartWriting={handleStartWriting} onTryDemo={handleTryDemo} />
        <FeaturesSection onTryFeature={handleTryFeature} />
        <WritingTypesSection onSelectType={handleSelectType} />
        <NSWSelectiveExamSimulator onStartPractice={() => setShowExamMode(true)} />
        <EssayScorer onStartScoring={handleSubmitEssay} />
        <PracticeTips />
        <NSWSelectiveWritingTypes onSelectType={handleSelectType} />
        <WritingModesSection onSelectMode={handleSelectMode} />
        <ToolsSection onOpenTool={handleOpenTool} />
        
        {showHelpCenter && (
          <HelpCenter 
            isOpen={showHelpCenter} 
            onClose={() => setShowHelpCenter(false)} 
          />
        )}
        
        {/* Floating action button for help */}
        <div 
          className="floating-action-btn"
          onClick={() => setShowHelpCenter(true)}
        >
          <i className="fas fa-question"></i>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
