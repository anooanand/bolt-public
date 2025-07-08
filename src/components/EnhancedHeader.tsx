import React, { useState } from 'react';
import { PenTool, BookOpen, Clock, Settings, HelpCircle, Lightbulb, Award, Sparkles, Rocket } from 'lucide-react';

interface EnhancedHeaderProps {
  textType: string;
  assistanceLevel: string;
  onTextTypeChange: (textType: string) => void;
  onAssistanceLevelChange: (level: string) => void;
  onTimerStart: () => void;
  hideTextTypeSelector?: boolean;
}

export function EnhancedHeader({
  textType,
  assistanceLevel,
  onTextTypeChange,
  onAssistanceLevelChange,
  onTimerStart,
  hideTextTypeSelector
}: EnhancedHeaderProps) {
  // Handle text type change
  const handleTextTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newTextType = e.target.value;
    onTextTypeChange(newTextType);
    
    // Save to localStorage for persistence
    localStorage.setItem('selectedWritingType', newTextType);
  };

  return (
    <div className="mb-4 px-4 py-3 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 shadow-sm">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0">
        <div className="flex items-center">
          <div className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-md mr-3">
            <Rocket className="w-4 h-4 text-white" />
          </div>
          <h1 className="text-lg font-semibold text-gray-800 dark:text-white">
            Writing Assistant
          </h1>
        </div>

        <div className="flex space-x-4">
          {!hideTextTypeSelector && (
            <select
              value={textType}
              onChange={handleTextTypeChange}
              className="block rounded-md border border-gray-200 py-1.5 pl-3 pr-10 text-gray-700 dark:text-gray-100 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm font-medium shadow-sm transition-all duration-200"
            >
              <option value="">Choose writing type...</option>
              <option value="narrative">Narrative</option>
              <option value="persuasive">Persuasive</option>
              <option value="expository">Expository / Informative</option>
              <option value="reflective">Reflective</option>
              <option value="descriptive">Descriptive</option>
              <option value="recount">Recount</option>
              <option value="discursive">Discursive</option>
              <option value="news report">News Report</option>
              <option value="letter">Letter</option>
              <option value="diary entry">Diary Entry</option>
              <option value="speech">Speech</option>
            </select>
          )}

          <select
            value={assistanceLevel}
            onChange={(e) => onAssistanceLevelChange(e.target.value)}
            className="block rounded-md border border-gray-200 py-1.5 pl-3 pr-10 text-gray-700 dark:text-gray-100 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm font-medium shadow-sm transition-all duration-200"
          >
            <option value="detailed">Detailed Assistance</option>
            <option value="moderate">Moderate Guidance</option>
            <option value="minimal">Minimal Support</option>
          </select>
        </div>
      </div>
    </div>
  );
}