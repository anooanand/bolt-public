import React, { useState } from 'react';
import { 
  BookOpen, 
  Clock, 
  Lightbulb, 
  HelpCircle, 
  Award, 
  PenTool,
  Sparkles,
  Download,
  Save,
  Share2
} from 'lucide-react';
import { TextTypeGuide } from './text-type-templates/TextTypeGuide';
import { EnhancedTimer } from './text-type-templates/EnhancedTimer';
import { ModelResponsesLibrary } from './text-type-templates/ModelResponsesLibrary';
import { AlignedFeedback } from './text-type-templates/AlignedFeedback';
import { VocabularyEnhancer } from './text-type-templates/VocabularyEnhancer';
import { MistakeIdentifier } from './text-type-templates/MistakeIdentifier';

interface WritingToolbarProps {
  content: string;
  textType: string;
  onShowHelpCenter: () => void;
  onShowPlanningTool: () => void;
  onTimerStart: () => void;
}

export function WritingToolbar({ 
  content, 
  textType, 
  onShowHelpCenter,
  onShowPlanningTool,
  onTimerStart
}: WritingToolbarProps) {
  const [showVocabularyTool, setShowVocabularyTool] = useState(false);
  const [showModelResponses, setShowModelResponses] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showMistakeIdentifier, setShowMistakeIdentifier] = useState(false);

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
    <div className="flex flex-wrap gap-2 p-2 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <button
        onClick={onShowPlanningTool}
        className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
        title="Planning Tool"
      >
        <PenTool className="h-4 w-4 mr-1.5" />
        Plan
      </button>
      
      <button
        onClick={() => setShowModelResponses(true)}
        className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
        title="Model Responses"
      >
        <Award className="h-4 w-4 mr-1.5" />
        Examples
      </button>
      
      <EnhancedTimer onStart={onTimerStart} />
      
      <button
        onClick={() => setShowVocabularyTool(true)}
        className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
        title="Vocabulary Helper"
      >
        <Lightbulb className="h-4 w-4 mr-1.5" />
        Vocabulary
      </button>
      
      <button
        onClick={() => setShowMistakeIdentifier(true)}
        className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
        title="Check for Mistakes"
      >
        <Sparkles className="h-4 w-4 mr-1.5" />
        Check
      </button>
      
      <button
        onClick={() => setShowFeedback(true)}
        className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
        title="Get Feedback"
      >
        <BookOpen className="h-4 w-4 mr-1.5" />
        Feedback
      </button>
      
      <div className="flex-grow"></div>
      
      <button
        onClick={handleSaveDocument}
        className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
        title="Save Document"
      >
        <Save className="h-4 w-4 mr-1.5" />
        Save
      </button>
      
      <button
        onClick={handleExportDocument}
        className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
        title="Export Document"
      >
        <Download className="h-4 w-4 mr-1.5" />
        Export
      </button>
      
      <button
        onClick={onShowHelpCenter}
        className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 help-button"
        title="Help Center"
      >
        <HelpCircle className="h-4 w-4 mr-1.5" />
        Help
      </button>
      
      {/* Modals */}
      {showModelResponses && (
        <ModelResponsesLibrary 
          textType={textType} 
        />
      )}
      
      {showVocabularyTool && (
        <VocabularyEnhancer 
          textType={textType} 
          content={content} 
        />
      )}
      
      {showFeedback && (
        <AlignedFeedback 
          content={content} 
          textType={textType} 
        />
      )}
      
      {showMistakeIdentifier && (
        <MistakeIdentifier 
          content={content} 
          textType={textType} 
        />
      )}
    </div>
  );
}

