import React, { useState, useEffect } from 'react';
import { Save, Clock, FileText, AlertCircle } from 'lucide-react';
import { AutoSave } from './AutoSave';

interface WritingStatusBarProps {
  content: string;
  textType: string;
  onRestore?: (content: string, textType: string) => void;
}

export function WritingStatusBar({ content, textType, onRestore }: WritingStatusBarProps) {
  const [wordCount, setWordCount] = useState(0);
  const [characterCount, setCharacterCount] = useState(0);
  const [readingTime, setReadingTime] = useState(0);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [showWordCountWarning, setShowWordCountWarning] = useState(false);

  // Calculate statistics
  useEffect(() => {
    const words = content.trim().split(/\s+/).filter(Boolean);
    setWordCount(words.length);
    setCharacterCount(content.length);
    setReadingTime(Math.ceil(words.length / 200)); // Average reading speed
    
    // Show warning if word count is too low or too high
    if (words.length > 0) {
      setShowWordCountWarning(words.length < 100 || words.length > 500);
    } else {
      setShowWordCountWarning(false);
    }
  }, [content]);

  // Simulate auto-save
  useEffect(() => {
    if (content.trim().length > 0) {
      const timer = setTimeout(() => {
        setLastSaved(new Date());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [content]);

  return (
    <div className="flex flex-wrap justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 text-sm">
      <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-300">
        <div className="flex items-center">
          <FileText className="w-4 h-4 mr-1" />
          <span>{wordCount} words</span>
          
          {showWordCountWarning && (
            <div className="ml-2 flex items-center text-amber-600 dark:text-amber-400">
              <AlertCircle className="w-4 h-4 mr-1" />
              <span className="text-xs">
                {wordCount < 100 ? 'Consider writing more' : 'Approaching word limit'}
              </span>
            </div>
          )}
        </div>
        
        <div className="flex items-center">
          <span>{characterCount} characters</span>
        </div>
        
        <div className="flex items-center">
          <Clock className="w-4 h-4 mr-1" />
          <span>{readingTime} min read</span>
        </div>
      </div>
      
      <div className="flex items-center">
        <AutoSave 
          content={content} 
          textType={textType}
          onRestore={onRestore}
        />
        
        {lastSaved && (
          <div className="flex items-center text-gray-500 dark:text-gray-400 ml-4">
            <Save className="w-4 h-4 mr-1" />
            <span>Last saved: {lastSaved.toLocaleTimeString()}</span>
          </div>
        )}
      </div>
    </div>
  );
}