import React, { useState } from 'react';
import {
  Download, Save, Gift, HelpCircle
} from 'lucide-react';

interface WritingToolbarProps {
  content: string;
  textType: string;
  onShowHelpCenter: () => void;
  onShowPlanningTool: () => void;
  onTimerStart: () => void;
  onStartNewEssay: () => void;
}

export function WritingToolbar({
  content,
  textType,
  onShowHelpCenter,
  onShowPlanningTool,
  onTimerStart,
  onStartNewEssay
}: WritingToolbarProps) {
  const handleSaveDocument = () => {
    // Save document to localStorage
    const saveData = {
      content,
      textType,
      timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('saved_document', JSON.stringify(saveData));
    
    // Show a toast or notification
    alert('Document saved successfully!');
  };

  const handleExportDocument = () => {
    // Create a blob with the content
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    // Create a download link and click it
    const a = document.createElement('a');
    a.href = url;
    a.download = `${textType || 'document'}_${new Date().toLocaleDateString().replace(/\//g, '-')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-wrap gap-3 p-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 rounded-md">
      <div className="flex-grow"></div>
      
      <button
        onClick={onStartNewEssay}
        className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition-all duration-300 shadow-sm"
        title="Start New Essay"
      >
        <Gift className="h-5 w-5 mr-2" />
        New Story
      </button>
      
      <button
        onClick={handleSaveDocument}
        className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-all duration-300 shadow-sm"
        title="Save Document"
      >
        <Save className="h-5 w-5 mr-2" />
        Save
      </button>
      
      <button
        onClick={handleExportDocument}
        className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-all duration-300 shadow-sm"
        title="Export Document"
      >
        <Download className="h-5 w-5 mr-2" />
        Export
      </button>
      
      <button
        onClick={onShowHelpCenter}
        className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-all duration-300 shadow-sm help-button"
        title="Help Center"
      >
        <HelpCircle className="h-5 w-5 mr-2" />
        Help
      </button>
    </div>
  );
}
