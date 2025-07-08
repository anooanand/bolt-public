import React, { useState, useEffect } from 'react';
import { generatePrompt } from '../lib/openai';

interface WritingAreaProps {
  content: string;
  onChange: (content: string) => void;
  textType: string;
  onTimerStart: (shouldStart: boolean) => void;
  onSubmit: () => void;
  onTextTypeChange?: (textType: string) => void;
  onPopupCompleted?: () => void;
}

export function WritingArea({
  content,
  onChange,
  textType,
  onTimerStart,
  onSubmit,
  onTextTypeChange,
  onPopupCompleted
}: WritingAreaProps) {
  const [showWritingTypeModal, setShowWritingTypeModal] = useState(false);
  const [showPromptOptionsModal, setShowPromptOptionsModal] = useState(false);
  const [showCustomPromptModal, setShowCustomPromptModal] = useState(false);
  const [selectedWritingType, setSelectedWritingType] = useState('');
  const [showEvaluationModal, setShowEvaluationModal] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [prompt, setPrompt] = useState('');

  useEffect(() => {
    const savedContent = localStorage.getItem('writingContent');
    const savedWritingType = localStorage.getItem('selectedWritingType');
    if (savedContent) {
      onChange(savedContent);
    }
    if (savedWritingType) {
      setSelectedWritingType(savedWritingType);
    }
    if (!textType && !selectedWritingType && !savedWritingType) {
      setShowWritingTypeModal(true);
    }
  }, [textType, onChange]);

  useEffect(() => {
    if (!textType && !selectedWritingType) {
      setShowWritingTypeModal(true);
    }
  }, [textType, selectedWritingType]);

  const handleWritingTypeSelect = (type: string) => {
    setSelectedWritingType(type);
    setShowWritingTypeModal(false);
    setShowPromptOptionsModal(true);
    if (onTextTypeChange) {
      onTextTypeChange(type);
    }
  };

  const handleGeneratePrompt = async () => {
    setShowPromptOptionsModal(false);
    setIsGenerating(true);
    const newPrompt = await generatePrompt(selectedWritingType);
    if (newPrompt) {
      setPrompt(newPrompt);
      if (selectedWritingType) {
        localStorage.setItem(`${selectedWritingType}_prompt`, newPrompt);
      }
    }
    setIsGenerating(false);
    if (onPopupCompleted) {
      onPopupCompleted();
    }
  };

  const handleCustomPromptOption = () => {
    setShowPromptOptionsModal(false);
    setShowCustomPromptModal(true);
  };

  const handleCustomPromptSubmit = (customPrompt: string) => {
    setPrompt(customPrompt);
    if (selectedWritingType) {
      localStorage.setItem(`${selectedWritingType}_prompt`, customPrompt);
    }
    setShowCustomPromptModal(false);
    if (onPopupCompleted) {
      onPopupCompleted();
    }
  };
}