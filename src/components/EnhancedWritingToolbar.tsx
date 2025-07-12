import React, { useState } from 'react';
import { Bold, Italic, List, Type, Target, Clock, Save, Eye, Mic, Volume2 } from 'lucide-react';

interface WritingToolbarProps {
  wordCount: number;
  characterCount: number;
  readingTime: number;
  writingGoal: number;
  onFormatting: (format: string) => void;
  onSave: () => void;
  onReadAloud: () => void;
  lastSaved?: Date | null;
}

export function EnhancedWritingToolbar({
  wordCount,
  characterCount,
  readingTime,
  writingGoal,
  onFormatting,
  onSave,
  onReadAloud,
  lastSaved
}: WritingToolbarProps) {
  const [isReading, setIsReading] = useState(false);

  const handleReadAloud = () => {
    setIsReading(!isReading);
    onReadAloud();
  };

  return (
    <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-b border-purple-200 dark:border-purple-700 rounded-t-xl">
      {/* Main Toolbar */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center space-x-2">
          {/* Formatting Buttons */}
          <div className="flex items-center space-x-1 bg-white dark:bg-gray-800 rounded-lg p-1 shadow-sm">
            <button
              onClick={() => onFormatting('bold')}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-105"
              title="Bold (Ctrl+B)"
            >
              <Bold className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            </button>
            <button
              onClick={() => onFormatting('italic')}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-105"
              title="Italic (Ctrl+I)"
            >
              <Italic className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            </button>
            <button
              onClick={() => onFormatting('list')}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-105"
              title="Bullet List"
            >
              <List className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            </button>
          </div>

          {/* Accessibility Tools */}
          <div className="flex items-center space-x-1 bg-white dark:bg-gray-800 rounded-lg p-1 shadow-sm">
            <button
              onClick={handleReadAloud}
              className={`p-2 rounded-lg transition-all duration-200 hover:scale-105 ${
                isReading 
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300'
              }`}
              title="Read Aloud"
            >
              {isReading ? <Volume2 className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>
            <button
              onClick={onSave}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-105"
              title="Save (Ctrl+S)"
            >
              <Save className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </div>
        
        {/* Writing Stats */}
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-1 bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow-sm">
            <Type className="w-4 h-4 text-blue-500" />
            <span className="font-medium">{wordCount} words</span>
          </div>
          <div className="flex items-center space-x-1 bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow-sm">
            <Target className="w-4 h-4 text-green-500" />
            <span className="font-medium">{characterCount} chars</span>
          </div>
          <div className="flex items-center space-x-1 bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow-sm">
            <Clock className="w-4 h-4 text-purple-500" />
            <span className="font-medium">{readingTime} min read</span>
          </div>
        </div>
      </div>

      {/* Progress Bar for Writing Goal */}
      <div className="px-3 pb-3">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="font-medium text-gray-700 dark:text-gray-300 flex items-center space-x-1">
              <Target className="w-4 h-4 text-blue-500" />
              <span>Writing Goal Progress</span>
            </span>
            <span className="text-blue-600 dark:text-blue-400 font-bold">
              {Math.round((wordCount / writingGoal) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-500 ease-out relative"
              style={{ width: `${Math.min((wordCount / writingGoal) * 100, 100)}%` }}
            >
              {wordCount >= writingGoal && (
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 animate-pulse" />
              )}
            </div>
          </div>
          <div className="flex items-center justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
            <span>0 words</span>
            <span className="font-medium">{writingGoal} words (goal)</span>
          </div>
          {wordCount >= writingGoal && (
            <div className="mt-2 text-center">
              <div className="inline-flex items-center space-x-1 text-green-600 dark:text-green-400 text-sm font-medium animate-pulse">
                <span>🎉</span>
                <span>Goal achieved! Keep writing to unlock more features!</span>
                <span>🎉</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Auto-save Status */}
      {lastSaved && (
        <div className="px-3 pb-2">
          <div className="flex items-center justify-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
            <Save className="w-3 h-3 text-green-500" />
            <span>Auto-saved at {lastSaved.toLocaleTimeString()}</span>
          </div>
        </div>
      )}
    </div>
  );
}

