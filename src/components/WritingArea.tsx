// src/components/WritingArea.tsx
import React, { useEffect, useState } from 'react';

interface WritingAreaProps {
  textType?: string;
  onTextTypeChange?: (type: string) => void;
  onPromptGenerated?: (prompt: string) => void;
  onPopupCompleted?: () => void;
}

const WritingArea: React.FC<WritingAreaProps> = ({
  textType,
  onTextTypeChange,
  onPromptGenerated,
  onPopupCompleted,
}) => {
  const [selectedWritingType, setSelectedWritingType] = useState<string>('');
  const [prompt, setPrompt] = useState<string>('');
  const [popupFlowCompleted, setPopupFlowCompleted] = useState<boolean>(false);
  const [showWritingTypeModal, setShowWritingTypeModal] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);

    const savedWritingType = localStorage.getItem('writingType') || '';
    const navigationSource = localStorage.getItem('navigationSource');
    const isDashboardFlow = navigationSource === 'dashboard';

    if (isDashboardFlow && savedWritingType && isMounted) {
      setSelectedWritingType(savedWritingType);
      if (onTextTypeChange) {
        onTextTypeChange(savedWritingType);
      }

      const savedPrompt = localStorage.getItem(`${savedWritingType}_prompt`);
      if (savedPrompt) {
        setPrompt(savedPrompt);
        if (onPromptGenerated) {
          onPromptGenerated(savedPrompt);
        }
      } else {
        const generatePromptForDashboardFlow = async () => {
          try {
            const newPrompt = await generatePrompt(savedWritingType);
            if (newPrompt && isMounted) {
              setPrompt(newPrompt);
              localStorage.setItem(`${savedWritingType}_prompt`, newPrompt);
              if (onPromptGenerated) {
                onPromptGenerated(newPrompt);
              }
            }
          } catch (error) {
            console.error('Error generating prompt for Dashboard flow:', error);
          }
        };
        generatePromptForDashboardFlow();
      }

      setPopupFlowCompleted(true);
      if (onPopupCompleted) {
        onPopupCompleted();
      }

      localStorage.removeItem('navigationSource');
    } else if (
      !textType &&
      !savedWritingType &&
      !popupFlowCompleted &&
      isMounted &&
      !prompt &&
      !isDashboardFlow
    ) {
      setShowWritingTypeModal(true);
    }
  }, [
    textType,
    onTextTypeChange,
    onPromptGenerated,
    onPopupCompleted,
    popupFlowCompleted,
    prompt,
    isMounted,
  ]);

  // Mock implementation for demonstration — replace with real function
  const generatePrompt = async (type: string): Promise<string> => {
    return Promise.resolve(`Auto-generated prompt for ${type}`);
  };

  return (
    <div className="writing-area">
      {showWritingTypeModal && <div className="modal">Please select your writing type.</div>}
      <div>
        <h3>Selected Writing Type: {selectedWritingType}</h3>
        <p>Prompt: {prompt}</p>
        {/* Your main writing area content goes here */}
      </div>
    </div>
  );
};

export default WritingArea;
