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
  onTimerStart
 hideTextTypeSelector
}: EnhancedHeaderProps) {
  return (
    <div className="mb-4 px-4 py-3 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 border-b-4 border-blue-300 dark:border-blue-700 rounded-t-xl shadow-md">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 relative">
        <div className="flex items-center relative">
          <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-md mr-3">
            <Rocket className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            Writing Adventure! <span className="text-lg">✨</span>
          </h1>
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse hidden sm:flex">
            <Sparkles className="w-3 h-3 text-white" />
          </div>
        </div>

        <div className="flex space-x-4">
          {!hideTextTypeSelector && (
            <select
              value={textType}
              onChange={(e) => onTextTypeChange(e.target.value)}
              className="block rounded-xl border-3 border-blue-300 py-2 pl-4 pr-10 text-gray-900 dark:text-gray-100 dark:bg-gray-700 focus:ring-4 focus:ring-blue-200 focus:border-blue-500 text-base font-medium shadow-sm transition-all duration-200 hover:border-blue-400"
            >
              <option value="">📝 Choose your story type...</option>
              <option value="narrative">🚀 Adventure Story</option>
              <option value="persuasive">🔊 Convince Others</option>
              <option value="expository">📚 Explain & Teach</option>
              <option value="reflective">✨ My Thoughts & Feelings</option>
              <option value="descriptive">🎨 Describe with Details</option>
              <option value="recount">📆 Tell What Happened</option>
              <option value="discursive">🤔 Explore Different Ideas</option>
              <option value="news report">📰 News Reporter</option>
              <option value="letter">✉️ Write a Letter</option>
              <option value="diary entry">📔 Dear Diary</option>
              <option value="speech">🎤 Give a Speech</option>
            </select>
          )}

          <div className="relative">
            <select
              value={assistanceLevel}
              onChange={(e) => onAssistanceLevelChange(e.target.value)}
              className="block rounded-xl border-3 border-purple-300 py-2 pl-4 pr-10 text-gray-900 dark:text-gray-100 dark:bg-gray-700 focus:ring-4 focus:ring-purple-200 focus:border-purple-500 text-base font-medium shadow-sm transition-all duration-200 hover:border-purple-400"
            >
              <option value="detailed">🌟 Lots of Help</option>
              <option value="moderate">⭐ Some Help</option>
              <option value="minimal">✨ Just a Little Help</option>
            </select>
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-purple-400 rounded-full flex items-center justify-center animate-pulse">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}