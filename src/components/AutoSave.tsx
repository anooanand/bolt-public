import React, { useEffect, useState } from 'react';
import { Save, CheckCircle, AlertCircle } from 'lucide-react';

interface AutoSaveProps {
  content: string;
  textType: string;
  onRestore?: (content: string, textType: string) => void;
}

export function AutoSave({ content, textType, onRestore }: AutoSaveProps) {
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [showNotification, setShowNotification] = useState(false);
  const [hasSavedContent, setHasSavedContent] = useState(false);

  // Auto-save content every 30 seconds if there's content to save
  useEffect(() => {
    if (content && content.trim().length > 0) {
      const autoSaveInterval = setInterval(() => {
        if (content.trim().length > 0) {
          saveContent();
        }
      }, 30000); // 30 seconds

      return () => clearInterval(autoSaveInterval);
    }
  }, [content, textType]);

  // Check for saved content on component mount
  useEffect(() => {
    checkForSavedContent();
  }, []);

  // Handle manual save with Ctrl+S
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault(); // Prevent browser save dialog
        saveContent();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [content, textType]);

  // Hide notification after 3 seconds
  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showNotification]);

  // Save content to localStorage
  const saveContent = () => {
    if (!content || content.trim().length === 0) return;

    try {
      setSaveStatus('saving');
      
      // Create a save object with content, text type, and timestamp
      const saveData = {
        content,
        textType,
        timestamp: new Date().toISOString()
      };
      
      // Save to localStorage
      localStorage.setItem('nsw_selective_essay_save', JSON.stringify(saveData));
      
      // Update state
      setLastSaved(new Date());
      setSaveStatus('saved');
      setShowNotification(true);
      setHasSavedContent(true);
    } catch (error) {
      console.error('Error saving content:', error);
      setSaveStatus('error');
      setShowNotification(true);
    }
  };

  // Check if there's saved content in localStorage
  const checkForSavedContent = () => {
    try {
      const savedData = localStorage.getItem('nsw_selective_essay_save');
      if (savedData) {
        const { content, textType, timestamp } = JSON.parse(savedData);
        if (content && content.trim().length > 0) {
          setHasSavedContent(true);
          setLastSaved(new Date(timestamp));
        }
      }
    } catch (error) {
      console.error('Error checking for saved content:', error);
    }
  };

  // Restore saved content
  const restoreSavedContent = () => {
    try {
      const savedData = localStorage.getItem('nsw_selective_essay_save');
      if (savedData && onRestore) {
        const { content, textType } = JSON.parse(savedData);
        onRestore(content, textType);
        setShowNotification(true);
        setSaveStatus('saved');
      }
    } catch (error) {
      console.error('Error restoring content:', error);
      setSaveStatus('error');
      setShowNotification(true);
    }
  };

  // Format the last saved time
  const formatLastSaved = () => {
    if (!lastSaved) return 'Not saved yet';
    
    const now = new Date();
    const diffMs = now.getTime() - lastSaved.getTime();
    const diffMins = Math.round(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins === 1) return '1 minute ago';
    if (diffMins < 60) return `${diffMins} minutes ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours === 1) return '1 hour ago';
    if (diffHours < 24) return `${diffHours} hours ago`;
    
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays === 1) return 'Yesterday';
    return `${diffDays} days ago`;
  };

  return (
    <div className="relative">
      {/* Auto-save indicator */}
      <div className="flex items-center text-sm text-gray-500 mb-2">
        <Save className="h-4 w-4 mr-1" />
        <span>
          {lastSaved ? `Last saved: ${formatLastSaved()}` : 'Auto-save enabled'}
        </span>
        
        <button
          onClick={saveContent}
          className="ml-2 px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-md text-gray-700"
          aria-label="Save now"
          title="Save now (Ctrl+S)"
        >
          Save now
        </button>
        
        {hasSavedContent && (!content || content.trim().length === 0) && onRestore && (
          <button
            onClick={restoreSavedContent}
            className="ml-2 px-2 py-1 text-xs bg-blue-100 hover:bg-blue-200 rounded-md text-blue-700"
            aria-label="Restore saved content"
            title="Restore your last saved work"
          >
            Restore saved work
          </button>
        )}
      </div>
      
      {/* Save notification */}
      {showNotification && (
        <div 
          className={`fixed bottom-4 right-4 px-4 py-3 rounded-md shadow-md flex items-center z-50 ${
            saveStatus === 'saved' 
              ? 'bg-green-100 text-green-800' 
              : saveStatus === 'error'
                ? 'bg-red-100 text-red-800'
                : 'bg-blue-100 text-blue-800'
          }`}
        >
          {saveStatus === 'saved' ? (
            <>
              <CheckCircle className="h-5 w-5 mr-2" />
              <span>Your work has been saved</span>
            </>
          ) : saveStatus === 'error' ? (
            <>
              <AlertCircle className="h-5 w-5 mr-2" />
              <span>Error saving your work</span>
            </>
          ) : (
            <>
              <Save className="h-5 w-5 mr-2" />
              <span>Saving your work...</span>
            </>
          )}
        </div>
      )}
    </div>
  );
}
