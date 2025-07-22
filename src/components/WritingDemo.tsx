import React, { useState, useEffect } from 'react';
import { SplitScreen } from './SplitScreen';
import { WritingArea } from './WritingArea';
import { FloatingChatWindow } from './FloatingChatWindow';
import { EnhancedHeader } from './EnhancedHeader';
import { WritingToolbar } from './WritingToolbar';

export function WritingDemo() {
  const [content, setContent] = useState('');
  const [textType, setTextType] = useState('narrative');
  const [assistanceLevel, setAssistanceLevel] = useState('detailed');
  const [selectedText, setSelectedText] = useState('');
  const [popupFlowCompleted, setPopupFlowCompleted] = useState(true); // Skip popup for demo
  
  // Panel state for attached chat
  const [panelVisible, setPanelVisible] = useState(true);
  const [panelCollapsed, setPanelCollapsed] = useState(false);

  // Text selection logic for writing area
  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection();
      if (selection && selection.toString().trim().length > 0) {
        setSelectedText(selection.toString());
      }
    };

    document.addEventListener('selectionchange', handleSelectionChange);
    return () => document.removeEventListener('selectionchange', handleSelectionChange);
  }, []);

  const handleSubmit = () => {
    console.log('Writing submitted:', { content, textType });
  };

  const handleTextTypeChange = (newTextType: string) => {
    setTextType(newTextType);
    console.log('Text type changed to:', newTextType);
  };

  const handlePopupCompleted = () => {
    setPopupFlowCompleted(true);
  };

  const handleNavigation = (page: string) => {
    console.log('Navigate to:', page);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="flex flex-col h-screen">
        <EnhancedHeader 
          textType={textType}
          assistanceLevel={assistanceLevel}
          onTextTypeChange={setTextType}
          onAssistanceLevelChange={setAssistanceLevel}
          onTimerStart={() => console.log('Timer started')}
          hideTextTypeSelector={popupFlowCompleted}
        />
        
        <WritingToolbar 
          content={content}
          textType={textType}
          onShowHelpCenter={() => console.log('Show help center')}
          onShowPlanningTool={() => console.log('Show planning tool')}
          onTimerStart={() => console.log('Timer started')}
          onStartNewEssay={() => {
            setContent('');
            setTextType('narrative');
            setPopupFlowCompleted(true);
          }}
        />
        
        <div className={`flex-1 container mx-auto px-4 ${
          popupFlowCompleted && panelVisible 
            ? `main-content-with-attached-chat ${panelCollapsed ? 'collapsed' : ''}` 
            : popupFlowCompleted && !panelVisible 
              ? 'main-content-with-attached-chat hidden'
              : ''
        }`}>
          <SplitScreen useFloatingChat={true}>
            <WritingArea 
              content={content}
              onChange={setContent}
              textType={textType}
              onTimerStart={() => console.log('Timer started')}
              onSubmit={handleSubmit}
              onTextTypeChange={handleTextTypeChange}
              onPopupCompleted={handlePopupCompleted}
            />
          </SplitScreen>
          
          {/* Show FloatingChatWindow (now attached panel) */}
          {popupFlowCompleted && (
            <FloatingChatWindow
              content={content}
              textType={textType}
              assistanceLevel={assistanceLevel}
              selectedText={selectedText}
              onNavigate={handleNavigation}
              isVisible={panelVisible}
              isCollapsed={panelCollapsed}
              onVisibilityChange={setPanelVisible}
              onCollapseChange={setPanelCollapsed}
            />
          )}
        </div>
      </div>
    </div>
  );
}