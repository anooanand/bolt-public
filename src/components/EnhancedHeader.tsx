import React, { useState } from 'react';
import { PenTool, BookOpen, Clock, Settings, HelpCircle, Lightbulb, Award } from 'lucide-react';

interface EnhancedHeaderProps {
  textType: string;
  assistanceLevel: string;
  onTextTypeChange: (textType: string) => void;
  onAssistanceLevelChange: (level: string) => void;
  onTimerStart: () => void;
}

export function EnhancedHeader({
  textType,
  assistanceLevel,
  onTextTypeChange,
  onAssistanceLevelChange,
  onTimerStart
}: EnhancedHeaderProps) {
  return (
    <div className="mb-4 px-4 py-3 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div className="flex items-center">
          <div className="flex items-center text-blue-600 dark:text-blue-400 mr-2">
            <PenTool className="w-5 h-5" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">InstaChat AI Writing Mate</h1>
        </div>

        <div className="flex space-x-4">
          <select
            value={textType}
            onChange={(e) => onTextTypeChange(e.target.value)}
            className="block rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 dark:text-gray-100 dark:bg-gray-700 ring-1 ring-inset ring-gray-300 dark:ring-gray-600 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
          >
            <option value="">Select writing type...</option>
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
          </select>

          <select
            value={assistanceLevel}
            onChange={(e) => onAssistanceLevelChange(e.target.value)}
            className="block rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 dark:text-gray-100 dark:bg-gray-700 ring-1 ring-inset ring-gray-300 dark:ring-gray-600 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
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

