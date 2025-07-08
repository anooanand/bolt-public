import React, { useState } from 'react';
import { 
  BookOpen, Clock, Lightbulb, HelpCircle, Award, PenTool,
  Sparkles, Download, Save, Share2, PlusCircle, Rocket,
  Wand, Target, Zap, Star, Gift 
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
    <div className="flex flex-wrap gap-2 p-3 bg-gray-50 dark:from-gray-900/50 dark:to-gray-800/50 border-b border-gray-100 dark:border-gray-700 shadow-sm">
      <button
        onClick={onShowPlanningTool}
        className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-all duration-200 shadow-sm"
        title="Plan My Story"
      >
        <Rocket className="h-5 w-5 mr-2" />
        Plan My Story
      </button>
      
      <button
        onClick={() => setShowModelResponses(true)}
        className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-all duration-200 shadow-sm"
        title="Model Responses"
      >
        <Star className="h-5 w-5 mr-2" />
        See Examples
      </button>
      
      <div className="relative">
        <EnhancedTimer onStart={onTimerStart} />
      </div>
      
      <button
        onClick={() => setShowVocabularyTool(true)}
        className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-all duration-200 shadow-sm"
        title="Vocabulary Helper"
      >
        <Wand className="h-5 w-5 mr-2" />
        Magic Words
      </button>
      
      <button
        onClick={() => setShowMistakeIdentifier(true)}
        className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-all duration-200 shadow-sm"
        title="Check for Mistakes"
      >
        <Target className="h-5 w-5 mr-2" />
        Check My Work
      </button>
      
      <button
        onClick={() => setShowFeedback(true)}
        className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-all duration-200 shadow-sm"
        title="Get Feedback"
      >
        <Zap className="h-5 w-5 mr-2" />
        Get Feedback
      </button>
      
      <div className="flex-grow"></div>
      
      <button
        onClick={onStartNewEssay}
        className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200 shadow-sm"
        title="Start New Essay"
      >
        <Gift className="h-5 w-5 mr-2" />
        New Story
      </button>
      
      <button
        onClick={handleSaveDocument}
        className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-all duration-200 shadow-sm"
        title="Save Document"
      >
        <Save className="h-5 w-5 mr-2" />
        Save
      </button>
      
      <button
        onClick={handleExportDocument}
        className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-all duration-200 shadow-sm"
        title="Export Document"
      >
        <Download className="h-5 w-5 mr-2" />
        Export
      </button>
      
      <button
        onClick={onShowHelpCenter}
        className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-all duration-200 shadow-sm help-button"
        title="Help Center"
      >
        <HelpCircle className="h-5 w-5 mr-2" />
        Help
      </button>
      
      {/* Modals */}
      {showModelResponses && (
        <ModelResponsesLibrary 
          textType={textType}
          onClose={() => setShowModelResponses(false)}
        />
      )}
      
      {showVocabularyTool && (
        <VocabularyEnhancer 
          textType={textType} 
          content={content} 
          onClose={() => setShowVocabularyTool(false)}
        />
      )}
      
      {showFeedback && (
        <AlignedFeedback 
          content={content} 
          textType={textType} 
          onClose={() => setShowFeedback(false)}
        />
      )}
      
      {showMistakeIdentifier && (
        <MistakeIdentifier 
          content={content} 
          textType={textType} 
          onClose={() => setShowMistakeIdentifier(false)}
        />
      )}
    </div>
  );
}
