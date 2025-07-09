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
    <div className="flex flex-wrap gap-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-b-4 border-blue-200 dark:border-blue-800 rounded-xl shadow-inner">
      <div className="flex-grow"></div>
      
      <button
        onClick={onStartNewEssay}
        className="inline-flex items-center px-4 py-2 text-sm font-bold rounded-xl bg-gradient-to-r from-green-500 to-teal-500 text-white hover:from-green-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-105 shadow-md"
        title="Start New Essay"
      >
        <Gift className="h-5 w-5 mr-2" />
        New Story
      </button>
      
      <button
        onClick={handleSaveDocument}
        className="inline-flex items-center px-4 py-2 text-sm font-bold rounded-xl border-3 border-orange-300 bg-gradient-to-r from-orange-100 to-orange-200 text-orange-700 hover:from-orange-200 hover:to-orange-300 transition-all duration-300 transform hover:scale-105 shadow-md"
        title="Save Document"
      >
        <Save className="h-5 w-5 mr-2" />
        Save
      </button>
      
      <button
        onClick={handleExportDocument}
        className="inline-flex items-center px-4 py-2 text-sm font-bold rounded-xl border-3 border-indigo-300 bg-gradient-to-r from-indigo-100 to-indigo-200 text-indigo-700 hover:from-indigo-200 hover:to-indigo-300 transition-all duration-300 transform hover:scale-105 shadow-md"
        title="Export Document"
      >
        <Download className="h-5 w-5 mr-2" />
        Export
      </button>
      
      <button
        onClick={onShowHelpCenter}
        className="inline-flex items-center px-4 py-2 text-sm font-bold rounded-xl border-3 border-red-300 bg-gradient-to-r from-red-100 to-red-200 text-red-700 hover:from-red-200 hover:to-red-300 transition-all duration-300 transform hover:scale-105 shadow-md help-button"
        title="Help Center"
      >
        <HelpCircle className="h-5 w-5 mr-2" />
        Help
      </button>
    </div>
  );
}
