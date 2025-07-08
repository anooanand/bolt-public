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
    <div className="flex flex-wrap gap-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-b-4 border-blue-200 dark:border-blue-800 rounded-xl shadow-inner">
      <button
        onClick={onShowPlanningTool}
        className="inline-flex items-center px-4 py-2 text-sm font-bold rounded-xl border-3 border-blue-300 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 hover:from-blue-200 hover:to-blue-300 transition-all duration-300 transform hover:scale-105 shadow-md"
        title="Planning Tool"
      >
        <Rocket className="h-5 w-5 mr-2" />
        Plan My Story
      </button>
      
      <button
        onClick={() => setShowModelResponses(true)}
        className="inline-flex items-center px-4 py-2 text-sm font-bold rounded-xl border-3 border-purple-300 bg-gradient-to-r from-purple-100 to-purple-200 text-purple-700 hover:from-purple-200 hover:to-purple-300 transition-all duration-300 transform hover:scale-105 shadow-md"
        title="Model Responses"
      >
        <Star className="h-5 w-5 mr-2" />
        See Examples
      </button>
      
      <div className="relative">
        <EnhancedTimer onStart={onTimerStart} />
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-400 rounded-full flex items-center justify-center animate-pulse">
          <Sparkles className="w-3 h-3 text-white" />
        </div>
      </div>
      
      <button
        onClick={() => setShowVocabularyTool(true)}
        className="inline-flex items-center px-4 py-2 text-sm font-bold rounded-xl border-3 border-yellow-300 bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-700 hover:from-yellow-200 hover:to-yellow-300 transition-all duration-300 transform hover:scale-105 shadow-md"
        title="Vocabulary Helper"
      >
        <Wand className="h-5 w-5 mr-2" />
        Magic Words
      </button>
      
      <button
        onClick={() => setShowMistakeIdentifier(true)}
        className="inline-flex items-center px-4 py-2 text-sm font-bold rounded-xl border-3 border-green-300 bg-gradient-to-r from-green-100 to-green-200 text-green-700 hover:from-green-200 hover:to-green-300 transition-all duration-300 transform hover:scale-105 shadow-md"
        title="Check for Mistakes"
      >
        <Target className="h-5 w-5 mr-2" />
        Check My Work
      </button>
      
      <button
        onClick={() => setShowFeedback(true)}
        className="inline-flex items-center px-4 py-2 text-sm font-bold rounded-xl border-3 border-pink-300 bg-gradient-to-r from-pink-100 to-pink-200 text-pink-700 hover:from-pink-200 hover:to-pink-300 transition-all duration-300 transform hover:scale-105 shadow-md"
        title="Get Feedback"
      >
        <Zap className="h-5 w-5 mr-2" />
        Get Feedback
      </button>
      
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
