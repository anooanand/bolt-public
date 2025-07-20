import React, { useState, useEffect, useRef } from 'react';
import {
  Save,
  Download,
  FileText,
  BarChart3,
  RefreshCw,
  Clock,
  Target,
  Zap,
  Eye,
  PlusCircle
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { WritingTypeSelectionModal } from './WritingTypeSelectionModal';
import { PromptOptionsModal } from './PromptOptionsModal'; // ADD THIS IMPORT
import { EnhancedNSWCriteriaTracker } from './EnhancedNSWCriteriaTracker';
import { getNSWSelectiveFeedback } from '../lib/openai';
import { TextHighlighter } from './TextHighlighter';
import { VocabularyBuilder } from './VocabularyBuilder';
import { SentenceAnalyzer } from './SentenceAnalyzer';

interface WritingStudioProps {
  onNavigate: (page: string) => void;
}

interface WritingStats {
  wordCount: number;
  characterCount: number;
  paragraphCount: number;
  readingTime: number;
}

interface AIAnalysis {
  score: number;
  strengths: string[];
  improvements: string[];
  suggestions: string[];
}

export const WritingStudio: React.FC<WritingStudioProps> = ({ onNavigate }) => {
  const { user, isPaidUser } = useAuth();
  const [content, setContent] = useState<string>('');
  const [title, setTitle] = useState<string>('Untitled Document');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [showAnalysis, setShowAnalysis] = useState<boolean>(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [showWritingTypeModal, setShowWritingTypeModal] = useState<boolean>(false);
  
  // ADD THIS STATE FOR PROMPT OPTIONS MODAL
  const [showPromptOptionsModal, setShowPromptOptionsModal] = useState<boolean>(false);
  const [selectedWritingType, setSelectedWritingType] = useState<string>(''); // To store the selected writing type

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [stats, setStats] = useState<WritingStats>({
    wordCount: 0,
    characterCount: 0,
    paragraphCount: 0,
    readingTime: 0
  });

  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysis>({
    score: 0,
    strengths: [],
    improvements: [],
    suggestions: []
  });

  const [nswFeedback, setNswFeedback] = useState<any>(null);

  useEffect(() => {
    const words = content.trim().split(/\s+/).filter(word => word.length > 0);
    const paragraphs = content.split('\n\n').filter(p => p.trim().length > 0);
    
    setStats({
      wordCount: words.length,
      characterCount: content.length,
      paragraphCount: paragraphs.length,
      readingTime: Math.ceil(words.length / 200)
    });
  }, [content]);

  useEffect(() => {
    if (content.length > 0) {
      const timer = setTimeout(() => {
        handleSave();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [content, title]);

  const handleSave = () => {
    const document = {
      id: Date.now().toString(),
      title,
      content,
      lastModified: new Date().toISOString(),
      wordCount: stats.wordCount
    };
    
    const savedDocs = JSON.parse(localStorage.getItem('savedDocuments') || '[]');
    const existingIndex = savedDocs.findIndex((doc: any) => doc.title === title);
    
    if (existingIndex >= 0) {
      savedDocs[existingIndex] = document;
    } else {
      savedDocs.unshift(document);
    }
    
    localStorage.setItem('savedDocuments', JSON.stringify(savedDocs.slice(0, 10)));
    setLastSaved(new Date());
  };

  const handleAnalyze = async () => {
    if (!isPaidUser && stats.wordCount > 100) {
      alert('Upgrade to Pro to analyze longer documents');
      return;
    }

    setIsAnalyzing(true);
    setNswFeedback(null);
    
    try {
      const feedback = await getNSWSelectiveFeedback(
        content, 
        'narrative',
        'medium', 
        []
      );
      setNswFeedback(feedback);
      setShowAnalysis(true);
    } catch (error) {
      console.error('Error getting NSW Selective feedback:', error);
      const mockAnalysis: AIAnalysis = {
        score: Math.floor(Math.random() * 20) + 80,
        strengths: [
          'Clear thesis statement',
          'Good use of evidence',
          'Logical paragraph structure',
          'Engaging introduction'
        ].slice(0, Math.floor(Math.random() * 3) + 2),
        improvements: [
          'Consider varying sentence length',
          'Add more transitional phrases',
          'Strengthen the conclusion',
          'Include more specific examples'
        ].slice(0, Math.floor(Math.random() * 3) + 1),
        suggestions: [
          'Try using more descriptive adjectives',
          'Consider adding a counterargument',
          'Break up longer paragraphs',
          'Add a compelling hook to the introduction'
        ].slice(0, Math.floor(Math.random() * 3) + 2)
      };
      setAiAnalysis(mockAnalysis);
      setShowAnalysis(true);
    }
    setIsAnalyzing(false);
  };

  const handleExport = () => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleStartNewEssay = () => {
    setContent('');
    setTitle('Untitled Document');
    setShowAnalysis(false);
    setLastSaved(null);
    setNswFeedback(null);
    
    localStorage.removeItem('writingContent');
    localStorage.removeItem('selectedWritingType');
    
    setShowWritingTypeModal(true);
  };

  // MODIFY THIS FUNCTION
  const handleWritingTypeSelect = (type: string) => {
    setSelectedWritingType(type); // Store the selected type
    setShowWritingTypeModal(false); // Close the writing type modal
    setShowPromptOptionsModal(true); // Open the prompt options modal
  };

  // ADD THESE NEW FUNCTIONS
  const handleGeneratePrompt = () => {
    console.log('Generating prompt for:', selectedWritingType);
    setShowPromptOptionsModal(false);
    // Here you would typically call an API to generate a prompt based on selectedWritingType
    // For now, we'll just navigate to the writing area
    if (onNavigate) {
      onNavigate('writing');
    } else {
      window.location.href = '/writing'; // Fallback for direct navigation
    }
  };

  const handleCustomPrompt = () => {
    console.log('Using custom prompt for:', selectedWritingType);
    setShowPromptOptionsModal(false);
    // Here you might open another modal for custom prompt input, or just navigate
    if (onNavigate) {
      onNavigate('writing');
    } else {
      window.location.href = '/writing'; // Fallback for direct navigation
    }
  };

  const quickActions = [
    {
      label: 'Paraphrase',
      icon: RefreshCw,
      action: () => onNavigate('paraphrase'),
      description: 'Rephrase selected text'
    },
    {
      label: 'Practice',
      icon: Target,
      action: () => onNavigate('exam'),
      description: 'Exam practice',
      isPro: true
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-full px-2 py-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-2xl font-bold bg-transparent border-none outline-none text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 rounded px-2 py-1"
              placeholder="Document Title"
            />
            <div className="flex items-center space-x-4">
              {lastSaved && (
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Saved {lastSaved.toLocaleTimeString()}
                </span>
              )}
              <button
                onClick={handleStartNewEssay}
                className="flex items-center px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <PlusCircle className="w-4 h-4 mr-2" />
                Start New Essay
              </button>
              <button
                onClick={handleSave}
                className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Save className="w-4 h-4 mr-2" />
                Save
              </button>
              <button
                onClick={handleExport}
                className="flex items-center px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center">
              <FileText className="w-4 h-4 mr-1" />
              {stats.wordCount} words
            </div>
            <div className="flex items-center">
              <Eye className="w-4 h-4 mr-1" />
              {stats.characterCount} characters
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {stats.readingTime} min read
            </div>
            <div className="flex items-center">
              <BarChart3 className="w-4 h-4 mr-1" />
              {stats.paragraphCount} paragraphs
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Editor */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <div className="p-6">
                <textarea
                  ref={textareaRef}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Start writing your masterpiece..."
                  className="w-full h-96 p-4 border border-gray-200 dark:border-gray-700 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  style={{ minHeight: '800px' }}
                />
              </div>
              <div className="enhanced-features space-y-4 mt-4">
                <TextHighlighter 
                  text={content} 
                  highlights={[]} 
                  onHighlightClick={(highlight) => console.log('Highlight clicked:', highlight)}
                />
                <VocabularyBuilder 
                  textType="general" 
                  currentContent={content}
                  onWordSelect={(word) => console.log('Word selected:', word)}
                />
                <SentenceAnalyzer 
                  content={content} 
                  textType="general"
                  onSuggestionApply={(original, suggestion) => {
                    const newContent = content.replace(original, suggestion);
                    setContent(newContent);
                  }}
                />
              </div>
              {/* Editor Actions */}
              <div className="border-t border-gray-200 dark:border-gray-700 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {quickActions.map((action) => {
                      const Icon = action.icon;
                      const isLocked = action.isPro && !isPaidUser;
                      
                      return (
                        <button
                          key={action.label}
                          onClick={isLocked ? undefined : action.action}
                          disabled={isLocked}
                          className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                            isLocked
                              ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                          }`}
                          title={action.description}
                        >
                          <Icon className="w-4 h-4 mr-2" />
                          {action.label}
                          {isLocked && (
                            <span className="ml-2 text-xs bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-1 rounded">
                              Pro
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                  
                  <button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing || content.length < 50}
                    className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                  >
                    {isAnalyzing ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    ) : (
                      <Zap className="w-4 h-4 mr-2" />
                    )}
                    {isAnalyzing ? 'Analyzing...' : 'AI Analysis'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Writing Stats */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Writing Stats
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Words</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {stats.wordCount}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Characters</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {stats.characterCount}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Paragraphs</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {stats.paragraphCount}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Reading Time</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {stats.readingTime} min
                  </span>
                </div>
              </div>
            </div>

            {/* AI Analysis Results (Conditional Rendering for NSW Feedback) */}
            {showAnalysis && nswFeedback ? (
              <EnhancedNSWCriteriaTracker 
                feedbackData={nswFeedback} 
                essay={content} 
              />
            ) : showAnalysis && aiAnalysis ? (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  AI Analysis
                </h3>
                
                {/* Score */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600 dark:text-gray-400">Overall Score</span>
                    <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {aiAnalysis.score}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${aiAnalysis.score}%` }}
                    ></div>
                  </div>
                </div>

                {/* Strengths */}
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    Strengths
                  </h4>
                  <ul className="space-y-1">
                    {aiAnalysis.strengths.map((strength, index) => (
                      <li key={index} className="text-sm text-green-600 dark:text-green-400">
                        • {strength}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Improvements */}
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    Areas for Improvement
                  </h4>
                  <ul className="space-y-1">
                    {aiAnalysis.improvements.map((improvement, index) => (
                      <li key={index} className="text-sm text-orange-600 dark:text-orange-400">
                        • {improvement}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Suggestions */}
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    Suggestions
                  </h4>
                  <ul className="space-y-1">
                    {aiAnalysis.suggestions.map((suggestion, index) => (
                      <li key={index} className="text-sm text-blue-600 dark:text-blue-400">
                        • {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : null}

            {/* Upgrade Prompt for Free Users */}
            {!isPaidUser && (
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900 dark:to-purple-900 rounded-lg p-6 border border-blue-200 dark:border-blue-700">
                <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  Unlock Pro Features
                </h3>
                <p className="text-sm text-blue-700 dark:text-blue-300 mb-4">
                  Get unlimited AI analysis, advanced writing tools, and more!
                </p>
                <button
                  onClick={() => onNavigate('pricing')}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Upgrade Now
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Writing Type Selection Modal */}
      <WritingTypeSelectionModal
        isOpen={showWritingTypeModal}
        onClose={() => setShowWritingTypeModal(false)}
        onSelectType={handleWritingTypeSelect}
      />

      {/* ADDED Prompt Options Modal */}
      <PromptOptionsModal
        isOpen={showPromptOptionsModal}
        onClose={() => setShowPromptOptionsModal(false)}
        onGeneratePrompt={handleGeneratePrompt}
        onCustomPrompt={handleCustomPrompt}
        textType={selectedWritingType} // Pass the selected writing type to the modal
      />
    </div>
  );
};