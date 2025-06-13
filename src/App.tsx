import React, { useState, useEffect } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';

// Keep your original writing components
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
import { BrainstormingTools } from './components/BrainstormingTools';

// Navigation components
import { NavBar } from './components/NavBar';
import { HomePage } from './components/HomePage';
import { Dashboard } from './components/Dashboard';
import { AuthModal } from './components/AuthModal';
import { PricingPage } from './components/PricingPage';

function App() {
  // Your original writing state
  const [content, setContent] = useState('');
  const [textType, setTextType] = useState('');
  const [assistanceLevel, setAssistanceLevel] = useState('detailed');
  const [timerStarted, setTimerStarted] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [activePanel, setActivePanel] = useState<'coach' | 'paraphrase'>('coach');
  const [showExamMode, setShowExamMode] = useState(false);
  const [showHelpCenter, setShowHelpCenter] = useState(false);

  // Navigation state
  const [currentPage, setCurrentPage] = useState<'home' | 'write' | 'learn' | 'dashboard' | 'pricing' | 'auth' | 'demo' | 'feedback'>('home');
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Your original text selection logic
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

  // Your original app state management
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
    if ('timerStarted' in updates) setTimerStarted(updates.timerStarted || false);
  };

  const handleSubmit = () => {
    setCurrentPage('feedback');
  };

  const handleStartExam = () => {
    setShowExamMode(true);
    setCurrentPage('write');
  };

  const handleNavigate = (page: string) => {
    if (page === 'auth') {
      setShowAuthModal(true);
    } else {
      setCurrentPage(page as any);
      setShowAuthModal(false);
    }
  };

  return (
    <AuthProvider>
      <ThemeProvider>
        <div className="min-h-screen">
          {/* Navigation */}
          <NavBar 
            currentPage={currentPage} 
            onNavigate={handleNavigate}
          />

          {/* Home Page - Restored Original Design */}
          {currentPage === 'home' && (
            <HomePage onNavigate={handleNavigate} />
          )}

          {/* Dashboard */}
          {currentPage === 'dashboard' && (
            <Dashboard onNavigate={handleNavigate} />
          )}

          {/* Pricing Page */}
          {currentPage === 'pricing' && (
            <PricingPage onNavigate={handleNavigate} />
          )}

          {/* Your Original Writing Interface */}
          {currentPage === 'write' && (
            <div className="flex flex-col h-screen">
              <EnhancedHeader 
                appState={appState}
                updateAppState={updateAppState}
                onPageChange={handleNavigate}
                onStartExam={handleStartExam}
                onShowHelpCenter={() => setShowHelpCenter(true)}
              />
              
              {showExamMode ? (
                <ExamSimulationMode 
                  onExit={() => setShowExamMode(false)}
                  appState={appState}
                  updateAppState={updateAppState}
                />
              ) : (
                <SplitScreen>
                  <WritingArea 
                    content={content}
                    onChange={setContent}
                    textType={textType}
                    onTimerStart={setTimerStarted}
                    onSubmit={handleSubmit}
                  />
                  <div className="flex flex-col h-full">
                    {activePanel === 'coach' && (
                      <CoachPanel 
                        content={content}
                        textType={textType}
                        assistanceLevel={assistanceLevel}
                      />
                    )}
                    {activePanel === 'paraphrase' && (
                      <ParaphrasePanel selectedText={selectedText} />
                    )}
                  </div>
                </SplitScreen>
              )}
            </div>
          )}

          {/* Your Original Learning Page */}
          {currentPage === 'learn' && (
            <LearningPage 
              onPageChange={handleNavigate}
              appState={appState}
              updateAppState={updateAppState}
            />
          )}

          {/* Feedback Page */}
          {currentPage === 'feedback' && (
            <EssayFeedbackPage 
              content={content}
              textType={textType}
              onBack={() => setCurrentPage('write')}
            />
          )}

          {/* Demo Page - redirect to write for now */}
          {currentPage === 'demo' && (
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-4">Demo Coming Soon</h2>
                <button
                  onClick={() => setCurrentPage('write')}
                  className="gradient-button"
                >
                  Try Writing Tool Instead
                </button>
              </div>
            </div>
          )}

          {/* Help Center Modal */}
          {showHelpCenter && (
            <HelpCenter onClose={() => setShowHelpCenter(false)} />
          )}

          {/* Auth Modal */}
          {showAuthModal && (
            <AuthModal 
              onClose={() => setShowAuthModal(false)}
              onNavigate={handleNavigate}
            />
          )}
        </div>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;

