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
    <div className="flex flex-wrap justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-t-4 border-blue-200 dark:border-blue-800 rounded-b-xl text-sm">
      <div className="flex items-center space-x-6 text-gray-700 dark:text-gray-300">
        <div className="flex items-center bg-white bg-opacity-70 px-3 py-1.5 rounded-full shadow-sm">
          <FileText className="w-5 h-5 mr-2 text-blue-500" />
          <span className="font-bold">{wordCount} words</span>
          
          {showWordCountWarning && (
            <div className="ml-2 flex items-center">
              <div className="bg-amber-100 text-amber-700 px-2 py-1 rounded-full text-xs font-bold flex items-center">
                <AlertCircle className="w-3 h-3 mr-1" />
                {wordCount < 100 ? 'Write more!' : 'Almost there!'}
              </div>
            </div>
          )}
        </div>
        
        <div className="flex items-center bg-white bg-opacity-70 px-3 py-1.5 rounded-full shadow-sm">
          <Zap className="w-5 h-5 mr-2 text-purple-500" />
          <span className="font-bold">{characterCount} characters</span>
        </div>
        
        <div className="flex items-center bg-white bg-opacity-70 px-3 py-1.5 rounded-full shadow-sm">
          <Clock className="w-5 h-5 mr-2 text-green-500" />
          <span className="font-bold">{readingTime} min read</span>
          {readingTime >= 3 && (
            <div className="ml-2">
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold flex items-center">
                <Star className="w-3 h-3 mr-1" />
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
          <div className="flex items-center bg-white bg-opacity-70 px-3 py-1.5 rounded-full shadow-sm ml-4">
            <Save className="w-5 h-5 mr-2 text-blue-500" />
            <span className="font-bold text-gray-700">Saved at: {lastSaved.toLocaleTimeString()}</span>
            <Sparkles className="w-4 h-4 ml-2 text-yellow-500" />
          </div>
        )}
      </div>
    </div>
  );
}