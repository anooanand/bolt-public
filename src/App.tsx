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

// Add simple navigation components
import { SimpleNavBar } from './components/SimpleNavBar';
import { SimpleHomePage } from './components/SimpleHomePage';
import { Dashboard } from './components/Dashboard';
import { AuthModal } from './components/AuthModal';

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

  // Simple navigation state
  const [currentPage, setCurrentPage] = useState<'home' | 'write' | 'learn' | 'dashboard'>('home');
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

  return (
    <AuthProvider>
      <ThemeProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          {/* Simple Navigation */}
          <SimpleNavBar 
            currentPage={currentPage} 
            onNavigate={setCurrentPage}
            onShowAuth={() => setShowAuthModal(true)}
          />

          {/* Home Page */}
          {currentPage === 'home' && (
            <SimpleHomePage 
              onNavigate={setCurrentPage}
              onStartWriting={() => setCurrentPage('write')}
              onStartLearning={() => setCurrentPage('learn')}
            />
          )}

          {/* Dashboard */}
          {currentPage === 'dashboard' && (
            <Dashboard onNavigate={setCurrentPage} />
          )}

          {/* Your Original Writing Interface */}
          {currentPage === 'write' && (
            <div className="flex flex-col h-screen">
              <EnhancedHeader 
                appState={appState}
                updateAppState={updateAppState}
                onPageChange={setCurrentPage}
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
              onPageChange={setCurrentPage}
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

          {/* Help Center Modal */}
          {showHelpCenter && (
            <HelpCenter onClose={() => setShowHelpCenter(false)} />
          )}

          {/* Auth Modal */}
          {showAuthModal && (
            <AuthModal 
              onClose={() => setShowAuthModal(false)}
              onNavigate={setCurrentPage}
            />
          )}
        </div>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;

