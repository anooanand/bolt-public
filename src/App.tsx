import React, { useState, useEffect } from 'react';
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

function App() {
  const [content, setContent] = useState('');
  const [textType, setTextType] = useState('');
  const [assistanceLevel, setAssistanceLevel] = useState('detailed');
  const [timerStarted, setTimerStarted] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [activePanel, setActivePanel] = useState<'coach' | 'paraphrase'>('coach');
  const [currentPage, setCurrentPage] = useState<'writing' | 'learning' | 'feedback'>('writing');
  const [showExamMode, setShowExamMode] = useState(false);
  const [showHelpCenter, setShowHelpCenter] = useState(false);

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

  if (showExamMode) {
    return <ExamSimulationMode onExit={() => setShowExamMode(false)} />;
  }

  if (currentPage === 'feedback') {
    return (
      <EssayFeedbackPage
        content={content}
        textType={textType}
        onBack={() => setCurrentPage('writing')}
      />
    );
  }

  if (currentPage === 'learning') {
    return (
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
    );
  }

  return (
    <SupportiveFeatures
      content={content}
      textType={textType}
      onRestoreContent={handleRestoreContent}
    >
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-7xl mx-auto">
          <header className="mb-4">
            {/* Only use EnhancedHeader for selectors */}
            <EnhancedHeader
              textType={textType}
              assistanceLevel={assistanceLevel}
              onTextTypeChange={setTextType}
              onAssistanceLevelChange={setAssistanceLevel}
              onTimerStart={() => setTimerStarted(true)}
            />
            
            {/* Add the SpecializedCoaching component here */}
            <div className="mt-3 mb-3">
              <SpecializedCoaching textType={textType} content={content} />
            </div>
            
            <div className="flex border-b border-gray-200 mt-4">
              <button
                className={`py-2 px-4 font-medium text-sm ${
                  currentPage === 'writing' 
                    ? 'bg-indigo-50 border-b-2 border-indigo-500 text-indigo-600' 
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setCurrentPage('writing')}
                data-mode="writing"
              >
                Writing Mode
              </button>
              <button
                className={`py-2 px-4 font-medium text-sm ${
                  currentPage === 'learning' 
                    ? 'bg-indigo-50 border-b-2 border-indigo-500 text-indigo-600' 
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setCurrentPage('learning')}
                data-mode="learning"
              >
                Deeper Learning
              </button>
              <button
                className={`py-2 px-4 font-medium text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-50`}
                onClick={() => setShowExamMode(true)}
              >
                Exam Mode
              </button>
              <div className="flex-1"></div>
              <button
                className={`py-2 px-4 font-medium text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-50`}
                onClick={() => setShowHelpCenter(true)}
              >
                Help
              </button>
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
                        ? 'bg-indigo-50 text-indigo-600 border-b-2 border-indigo-500'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => setActivePanel('coach')}
                    data-panel="coach"
                  >
                    Coach
                  </button>
                  <button
                    className={`flex-1 py-2 text-center text-sm font-medium ${
                      activePanel === 'paraphrase'
                        ? 'bg-indigo-50 text-indigo-600 border-b-2 border-indigo-500'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
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

      {showHelpCenter && (
        <HelpCenter 
          isOpen={showHelpCenter} 
          onClose={() => setShowHelpCenter(false)} 
        />
      )}
    </SupportiveFeatures>
  );
}

export default App;
