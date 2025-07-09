import React, { useState, useEffect } from 'react';
import { Save, Clock, FileText, AlertCircle, Zap, Star, Sparkles } from 'lucide-react';
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
    const words = content && content.trim() ? content.trim().split(/\s+/).filter(Boolean) : [];
    setWordCount(words.length);
    setCharacterCount(content ? content.length : 0);
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
    if (content && content.trim().length > 0) {
      const timer = setTimeout(() => {
        setLastSaved(new Date());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [content]);

  return (
    <div className="flex flex-wrap justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 text-sm">
      <div className="flex items-center space-x-4 text-gray-700 dark:text-gray-300">
        <div className="flex items-center">
          <FileText className="w-4 h-4 mr-2 text-indigo-500" />
          <span className="font-medium">{wordCount} words</span>
          
          {showWordCountWarning && (
            <div className="ml-2">
              <div className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded text-xs font-medium inline-flex items-center">
                <AlertCircle className="w-3 h-3 mr-1 flex-shrink-0" />
                {wordCount < 100 ? 'Write more!' : 'Almost there!'}
              </div>
            </div>
          )}
        </div>
        
        <div className="flex items-center">
          <Zap className="w-4 h-4 mr-2 text-indigo-500" />
          <span className="font-medium">{characterCount} characters</span>
        </div>
        
        <div className="flex items-center">
          <Clock className="w-4 h-4 mr-2 text-indigo-500" />
          <span className="font-medium">{readingTime} min read</span>
          {readingTime >= 3 && (
            <div className="ml-2">
              <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-medium inline-flex items-center">
                <Star className="w-3 h-3 mr-1 flex-shrink-0" />
                Great job!
              </span>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex items-center">
        <AutoSave 
          content={content} 
          textType={textType}
          onRestore={onRestore}
        />
        
        {lastSaved && (
          <div className="flex items-center ml-4">
            <Save className="w-4 h-4 mr-2 text-indigo-500" />
            <span className="font-medium text-gray-700">Saved at: {lastSaved.toLocaleTimeString()}</span>
          </div>
        )}
      </div>
    </div>
  );
}