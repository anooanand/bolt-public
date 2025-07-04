import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { useAuth } from '../contexts/AuthContext';

// Placeholder components for missing ones
const WritingAccessCheck: React.FC<{ children: React.ReactNode; onNavigate: (path: string) => void }> = ({ children }) => {
  return <div>{children}</div>;
};

const EnhancedHeader: React.FC<{
  textType: string;
  assistanceLevel: string;
  onTextTypeChange: (type: string) => void;
  onAssistanceLevelChange: (level: string) => void;
  onTimerStart: () => void;
}> = ({ textType, assistanceLevel, onTextTypeChange, onAssistanceLevelChange }) => {
  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Writing Assistant</h1>
        <div className="flex items-center space-x-4">
          <select 
            value={textType} 
            onChange={(e) => onTextTypeChange(e.target.value)}
            className="px-3 py-1 border rounded"
          >
            <option value="Narrative">Narrative</option>
            <option value="Persuasive">Persuasive</option>
            <option value="Informative">Informative</option>
          </select>
          <select 
            value={assistanceLevel} 
            onChange={(e) => onAssistanceLevelChange(e.target.value)}
            className="px-3 py-1 border rounded"
          >
            <option value="Standard">Standard</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
      </div>
    </header>
  );
};

const WritingToolbar: React.FC<{
  content: string;
  textType: string;
  onShowHelpCenter: () => void;
  onShowPlanningTool: () => void;
  onTimerStart: () => void;
}> = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600 p-2">
      <div className="flex items-center space-x-2">
        <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">Help</button>
        <button className="px-3 py-1 bg-green-600 text-white rounded text-sm">Planning</button>
        <button className="px-3 py-1 bg-purple-600 text-white rounded text-sm">Timer</button>
      </div>
    </div>
  );
};

const ExamSimulationMode: React.FC<{ onExit: () => void }> = ({ onExit }) => {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Exam Mode</h2>
        <button onClick={onExit} className="px-4 py-2 bg-red-600 text-white rounded">
          Exit Exam Mode
        </button>
      </div>
    </div>
  );
};

const SplitScreen: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex h-full space-x-4">
      {children}
    </div>
  );
};

const WritingArea: React.FC<{
  content: string;
  onChange: (content: string) => void;
  textType: string;
  onTimerStart: (started: boolean) => void;
  onSubmit: (content: string) => void;
}> = ({ content, onChange, onSubmit }) => {
  return (
    <div className="flex-1">
      <textarea
        value={content}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Start writing here..."
        className="w-full h-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="mt-2">
        <button 
          onClick={() => onSubmit(content)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

const CoachPanel: React.FC<{
  content: string;
  textType: string;
  assistanceLevel: string;
}> = ({ content, textType }) => {
  return (
    <div className="w-1/3 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Writing Coach</h3>
      <div className="space-y-2">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Text Type: {textType}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Word Count: {content.split(' ').filter(word => word.length > 0).length}
        </p>
        <div className="mt-4">
          <h4 className="font-medium mb-2">Suggestions:</h4>
          <ul className="text-sm space-y-1">
            <li>• Consider adding more descriptive language</li>
            <li>• Check paragraph structure</li>
            <li>• Review sentence variety</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const ParaphrasePanel: React.FC<{
  selectedText: string;
  onNavigate: (path: string) => void;
}> = ({ selectedText }) => {
  return (
    <div className="w-1/3 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Paraphrase Tool</h3>
      {selectedText ? (
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Selected text:</p>
          <p className="text-sm bg-white dark:bg-gray-700 p-2 rounded border">
            {selectedText}
          </p>
          <button className="mt-2 px-3 py-1 bg-green-600 text-white rounded text-sm">
            Paraphrase
          </button>
        </div>
      ) : (
        <p className="text-sm text-gray-500">Select text to paraphrase</p>
      )}
    </div>
  );
};

const AppContent: React.FC = () => {
  const [content, setContent] = useState<string>('');
  const [textType, setTextType] = useState<string>("Narrative");
  const [assistanceLevel, setAssistanceLevel] = useState<string>("Standard");
  const [timerStarted, setTimerStarted] = useState<boolean>(false);
  const [showHelpCenter, setShowHelpCenter] = useState<boolean>(false);
  const [showPlanningTool, setShowPlanningTool] = useState<boolean>(false);
  const [showExamMode, setShowExamMode] = useState<boolean>(false);
  const [activePanel, setActivePanel] = useState<"coach" | "paraphrase">("coach");
  const [selectedText, setSelectedText] = useState<string>('');

  const navigate = useNavigate();
  const { user } = useAuth();
  const { state } = useApp();

  useEffect(() => {
    const handleTextSelection = () => {
      setSelectedText(window.getSelection()?.toString() || '');
    };
    document.addEventListener('mouseup', handleTextSelection);
    return () => {
      document.removeEventListener('mouseup', handleTextSelection);
    };
  }, []);

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleSubmit = (finalContent: string) => {
    console.log("Submitted content:", finalContent);
    // Handle submission logic here, e.g., send to backend
  };

  return (
    <WritingAccessCheck onNavigate={handleNavigation}>
      <div className="flex flex-col h-screen">
        <EnhancedHeader 
          textType={textType}
          assistanceLevel={assistanceLevel}
          onTextTypeChange={setTextType}
          onAssistanceLevelChange={setAssistanceLevel}
          onTimerStart={() => setTimerStarted(true)}
        />
        
        <WritingToolbar 
          content={content}
          textType={textType}
          onShowHelpCenter={() => setShowHelpCenter(true)}
          onShowPlanningTool={() => setShowPlanningTool(true)}
          onTimerStart={() => setTimerStarted(true)}
        />
        
        {showExamMode ? (
          <ExamSimulationMode 
            onExit={() => setShowExamMode(false)}
          />
        ) : (
          <>
            <div className="flex-1 container mx-auto px-4">
              <SplitScreen>
                <WritingArea 
                  content={content}
                  onChange={setContent}
                  textType={textType}
                  onTimerStart={setTimerStarted}
                  onSubmit={handleSubmit}
                />
                {activePanel === 'coach' ? (
                  <CoachPanel 
                    content={content}
                    textType={textType}
                    assistanceLevel={assistanceLevel}
                  />
                ) : (
                  <ParaphrasePanel 
                    selectedText={selectedText}
                    onNavigate={handleNavigation}
                  />
                )}
              </SplitScreen>
            </div>
            
            <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-2 flex justify-center items-center space-x-4">
              <button
                onClick={() => setActivePanel('coach')}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  activePanel === 'coach' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Coach
              </button>
              <button
                onClick={() => setActivePanel('paraphrase')}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  activePanel === 'paraphrase' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Paraphrase
              </button>
            </div>
          </>
        )}
      </div>
    </WritingAccessCheck>
  );
};

export default AppContent;

