import React, { useState, useEffect } from 'react';
import { ImprovedHeader } from './ImprovedHeader';
import { ImprovedWritingArea } from './ImprovedWritingArea';
import { ImprovedCoachPanel } from './ImprovedCoachPanel';
import { ParaphrasePanel } from '../components/ParaphrasePanel';
import { PanelSwitcher } from './PanelSwitcher';
import './improved-theme.css';

interface ImprovedWritingLayoutProps {
  content: string;
  onChange: (content: string) => void;
  textType: string;
  onTextTypeChange: (type: string) => void;
  assistanceLevel: string;
  onAssistanceLevelChange: (level: string) => void;
  onTimerStart: () => void;
  onSubmit: () => void;
  selectedText?: string;
  onNavigate?: (page: string) => void;
}

export function ImprovedWritingLayout({
  content,
  onChange,
  textType,
  onTextTypeChange,
  assistanceLevel,
  onAssistanceLevelChange,
  onTimerStart,
  onSubmit,
  selectedText = '',
  onNavigate
}: ImprovedWritingLayoutProps) {
  const [activePanel, setActivePanel] = useState<'coach' | 'paraphrase'>('coach');
  const [timeRemaining, setTimeRemaining] = useState(45);
  const [currentStep, setCurrentStep] = useState(1);
  const [prompt, setPrompt] = useState('');

  // Timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  // Update step based on content length
  useEffect(() => {
    const wordCount = content.trim().split(/\s+/).filter(word => word.length > 0).length;
    
    if (wordCount === 0) {
      setCurrentStep(1);
    } else if (wordCount < 50) {
      setCurrentStep(2);
    } else if (wordCount < 150) {
      setCurrentStep(3);
    } else {
      setCurrentStep(4);
    }
  }, [content]);

  // Handle text selection for paraphrase panel
  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection();
      if (selection && selection.toString().trim().length > 0) {
        setActivePanel('paraphrase');
      }
    };

    document.addEventListener('selectionchange', handleSelectionChange);
    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
    };
  }, []);

  const handlePanelChange = (panel: 'coach' | 'paraphrase') => {
    setActivePanel(panel);
  };

  const handlePromptChange = (newPrompt: string) => {
    setPrompt(newPrompt);
  };

  return (
    <div className="improved-writing-layout">
      <ImprovedHeader
        textType={textType}
        assistanceLevel={assistanceLevel}
        onTextTypeChange={onTextTypeChange}
        onAssistanceLevelChange={onAssistanceLevelChange}
        onTimerStart={onTimerStart}
        timeRemaining={timeRemaining}
        currentStep={currentStep}
        totalSteps={4}
      />
      
      <div className="main-content">
        <div className="writing-section">
          <ImprovedWritingArea
            content={content}
            onChange={onChange}
            textType={textType}
            onTimerStart={onTimerStart}
            onSubmit={onSubmit}
            prompt={prompt}
            onPromptChange={handlePromptChange}
          />
        </div>
        
        <div className="sidebar-section">
          {activePanel === 'coach' ? (
            <ImprovedCoachPanel
              content={content}
              textType={textType}
              assistanceLevel={assistanceLevel}
            />
          ) : (
            <ParaphrasePanel
              selectedText={selectedText}
              onNavigate={onNavigate || (() => {})}
            />
          )}
        </div>
      </div>
      
      <PanelSwitcher
        activePanel={activePanel}
        onPanelChange={handlePanelChange}
      />

      <style jsx>{`
        .improved-writing-layout {
          display: flex;
          flex-direction: column;
          height: 100vh;
          background: var(--primary-gradient);
          background-attachment: fixed;
          overflow: hidden;
        }

        .main-content {
          flex: 1;
          display: flex;
          gap: var(--space-sm);
          padding: var(--space-sm);
          height: calc(100vh - 120px);
          overflow: hidden;
        }

        .writing-section {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        .sidebar-section {
          width: 400px;
          display: flex;
          flex-direction: column;
          flex-shrink: 0;
        }

        @media (max-width: 1024px) {
          .main-content {
            flex-direction: column;
            height: auto;
            min-height: calc(100vh - 120px);
          }
          
          .sidebar-section {
            width: 100%;
            height: 300px;
            order: -1;
          }
          
          .writing-section {
            height: calc(100vh - 420px);
            min-height: 400px;
          }
        }

        @media (max-width: 768px) {
          .main-content {
            padding: var(--space-xs);
            gap: var(--space-xs);
          }
          
          .sidebar-section {
            height: 250px;
          }
          
          .writing-section {
            height: calc(100vh - 370px);
            min-height: 350px;
          }
        }
      `}</style>
    </div>
  );
}

