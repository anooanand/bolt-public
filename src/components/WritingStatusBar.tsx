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
    <div className="flex flex-wrap justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 text-sm">
      <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-300">
        <div className="flex items-center">
          <FileText className="w-4 h-4 mr-1.5 text-gray-500" />
          <span className="font-medium">{wordCount} words</span>
          
          {showWordCountWarning && (
            <div className="ml-2 flex items-center text-amber-600">
              <div className="bg-amber-50 text-amber-600 px-1.5 py-0.5 rounded text-xs font-medium flex items-center">
                <AlertCircle className="w-3 h-3 mr-0.5" />
                {wordCount < 100 ? 'Write more!' : 'Almost there!'}
              </div>
            </div>
          )}
        </div>
        
        <div className="flex items-center">
          <Zap className="w-4 h-4 mr-1.5 text-gray-500" />
          <span className="font-medium">{characterCount} characters</span>
        </div>
        
        <div className="flex items-center">
          <Clock className="w-4 h-4 mr-1.5 text-gray-500" />
          <span className="font-medium">{readingTime} min read</span>
          {readingTime >= 3 && (
            <div className="ml-2">
              <span className="bg-green-50 text-green-600 px-1.5 py-0.5 rounded text-xs font-medium flex items-center">
                <Star className="w-3 h-3 mr-0.5" />
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
          <div className="flex items-center ml-4 text-gray-500">
            <Save className="w-4 h-4 mr-1.5" />
            <span className="font-medium">Saved at: {lastSaved.toLocaleTimeString()}</span>
          </div>
        )}
      </div>
    </div>
  );
}