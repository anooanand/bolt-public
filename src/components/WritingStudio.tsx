import React, { useState, useEffect, useRef, useCallback } from 'react';
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
import { PromptOptionsModal } from './PromptOptionsModal';
import { EnhancedNSWCriteriaTracker } from './EnhancedNSWCriteriaTracker';
import { getNSWSelectiveFeedback } from '../lib/openai';
import { TextHighlighter } from './TextHighlighter';
import { VocabularyBuilder } from './VocabularyBuilder';
import { SentenceAnalyzer } from './SentenceAnalyzer';
import { InteractiveTextEditor } from './InteractiveTextEditor'; // Updated import

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
  const [showPromptOptionsModal, setShowPromptOptionsModal] = useState<boolean>(false);
  const [selectedWritingType, setSelectedWritingType] = useState<string>('');
  const [saveError, setSaveError] = useState<string | null>(null);

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

  // Enhanced stats calculation with error handling
  useEffect(() => {
    try {
      const words = content.trim().split(/\s+/).filter(word => word.length > 0);
      const paragraphs = content.split('\n\n').filter(p => p.trim().length > 0);
      
      setStats({
        wordCount: content.trim() ? words.length : 0,
        characterCount: content.length,
        paragraphCount: content.trim() ? Math.max(paragraphs.length, 1) : 0,
        readingTime: Math.ceil(words.length / 200) || 0
      });
    } catch (error) {
      console.error('Error calculating stats:', error);
      // Fallback to basic stats
      setStats({
        wordCount: 0,
        characterCount: content.length,
        paragraphCount: 0,
        readingTime: 0
      });
    }
  }, [content]);

  // Enhanced auto-save with error handling
  useEffect(() => {
    if (content.length > 0) {
      const timer = setTimeout(() => {
        handleSave();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [content, title]);

  const handleSave = useCallback(() => {
    try {
      const document = {
        id: Date.now().toString(),
        title,
        content,
        lastModified: new Date().toISOString(),
        wordCount: stats.wordCount
      };

      // Save to localStorage with error handling
      try {
        localStorage.setItem('currentDocument', JSON.stringify(document));
        localStorage.setItem('writingContent', content);
        localStorage.setItem('documentTitle', title);
        setLastSaved(new Date());
        setSaveError(null);
      } catch (storageError) {
        console.error('Storage error:', storageError);
        setSaveError('Failed to save document. Storage may be full.');
      }
    } catch (error) {
      console.error('Save error:', error);
      setSaveError('Failed to save document.');
    }
  }, [title, content, stats.wordCount]);

  const handleAnalyze = async () => {
    if (content.length < 50) {
      return;
    }

    setIsAnalyzing(true);
    
    try {
      if (isPaidUser) {
        // Try to get real AI feedback
        try {
          const feedback = await getNSWSelectiveFeedback(
            content,
            selectedWritingType || 'narrative',
            'detailed',
            []
          );
          setNswFeedback(feedback);
          
          // Convert NSW feedback to analysis format
          const analysis: AIAnalysis = {
            score: feedback.overallScore || 0,
            strengths: feedback.strengths || [],
            improvements: feedback.areasForImprovement || [],
            suggestions: feedback.feedbackItems?.map((item: any) => item.text) || []
          };
          setAiAnalysis(analysis);
        } catch (apiError) {
          console.error('AI analysis error:', apiError);
          // Fallback to mock analysis
          const mockAnalysis = generateMockAnalysis();
          setAiAnalysis(mockAnalysis);
        }
      } else {
        // Mock analysis for free users
        const mockAnalysis = generateMockAnalysis();
        setAiAnalysis(mockAnalysis);
      }
      setShowAnalysis(true);
    } catch (error) {
      console.error('Analysis error:', error);
      // Show error to user but don't break the UI
      setSaveError('Analysis failed. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const generateMockAnalysis = (): AIAnalysis => {
    return {
      score: Math.floor(Math.random() * 30) + 70,
      strengths: [
        'Strong opening paragraph',
        'Good use of descriptive language',
        'Clear narrative structure',
        'Engaging dialogue'
      ].slice(0, Math.floor(Math.random() * 3) + 2),
      improvements: [
        'Vary sentence length more',
        'Add more sensory details',
        'Strengthen character development',
        'Improve transitions between paragraphs'
      ].slice(0, Math.floor(Math.random() * 3) + 1),
      suggestions: [
        'Consider adding a counterargument',
        'Break up longer paragraphs',
        'Add a compelling hook to the introduction'
      ].slice(0, Math.floor(Math.random() * 3) + 2)
    };
  };

  const handleExport = useCallback(() => {
    try {
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${title}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export error:', error);
      setSaveError('Failed to export document.');
    }
  }, [content, title]);

  const handleStartNewEssay = useCallback(() => {
    try {
      setContent('');
      setTitle('Untitled Document');
      setShowAnalysis(false);
      setLastSaved(null);
      setNswFeedback(null);
      setSaveError(null);
      
      // Clear localStorage with error handling
      try {
        localStorage.removeItem('writingContent');
        localStorage.removeItem('selectedWritingType');
        localStorage.removeItem('currentDocument');
        localStorage.removeItem('documentTitle');
      } catch (storageError) {
        console.error('Storage clear error:', storageError);
      }
      
      setShowWritingTypeModal(true);
    } catch (error) {
      console.error('New essay error:', error);
    }
  }, []);

  const handleWritingTypeSelect = useCallback((type: string) => {
    setSelectedWritingType(type);
    setShowWritingTypeModal(false);
    setShowPromptOptionsModal(true);
  }, []);

  const handleGeneratePrompt = useCallback(() => {
    console.log('Generating prompt for:', selectedWritingType);
    setShowPromptOptionsModal(false);
    // Here you would typically call an API to generate a prompt based on selectedWritingType
    // For now, we'll just navigate to the writing area
    if (onNavigate) {
      onNavigate('writing');
    }
  }, [selectedWritingType, onNavigate]);

  const handleCustomPrompt = useCallback(() => {
    console.log('Using custom prompt for:', selectedWritingType);
    setShowPromptOptionsModal(false);
    // Navigate to writing area for custom prompt
    if (onNavigate) {
      onNavigate('writing');
    }
  }, [selectedWritingType, onNavigate]);

  // Enhanced content change handler
  const handleContentChange = useCallback((newContent: string) => {
    setContent(newContent);
    // Clear any existing save errors when user starts typing
    if (saveError) {
      setSaveError(null);
    }
  }, [saveError]);

  // Enhanced AI feedback handler for the writing area
  const handleGetFeedback = useCallback(async (text: string) => {
    try {
      if (isPaidUser) {
        const feedback = await getNSWSelectiveFeedback(
          text,
          selectedWritingType || 'narrative',
          'detailed',
          []
        );
        return feedback;
      } else {
        // Return mock feedback for free users
        return {
          feedbackItems: [
            {
              type: 'praise',
              text: 'Good descriptive language',
              exampleFromText: text.substring(0, 50),
              area: 'Language'
            }
          ],
          overallScore: 75
        };
      }
    } catch (error) {
      console.error('Feedback error:', error);
      throw error; // Let the writing area handle the error
    }
  }, [isPaidUser, selectedWritingType]);

  const quickActions = [
    { icon: Target, label: 'Focus Mode', action: () => {}, locked: !isPaidUser },
    { icon: RefreshCw, label: 'Rewrite', action: () => {}, locked: !isPaidUser },
    { icon: Zap, label: 'Enhance', action: () => {}, locked: !isPaidUser }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-2xl font-bold bg-transparent border-none outline-none text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 rounded px-2 py-1"
                placeholder="Document Title"
              />
              {lastSaved && (
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Saved {lastSaved.toLocaleTimeString()}
                </span>
              )}
              {saveError && (
                <span className="text-sm text-red-500">
                  {saveError}
                </span>
              )}
            </div>
            <div className="flex items-center space-x-3">
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
                {/* Quick Actions */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2">
                    {quickActions.map(({ icon: Icon, label, action, locked }) => {
                      const isLocked = locked && !isPaidUser;
                      return (
                        <button
                          key={label}
                          onClick={isLocked ? () => onNavigate('pricing') : action}
                          className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
                            isLocked
                              ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-pointer'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                          }`}
                        >
                          <Icon className="w-4 h-4 mr-2" />
                          {label}
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

                {/* Enhanced Writing Area */}
                <InteractiveTextEditor // Changed from EnhancedWritingEditorWithHighlighting
                  content={content}
                  onChange={handleContentChange}
                  textType={selectedWritingType}
                  onGetFeedback={handleGetFeedback}
                  className="w-full"
                />
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

            {/* AI Analysis Summary */}
            {showAnalysis && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  AI Analysis
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Overall Score</span>
                    <span className="text-2xl font-bold text-blue-600">
                      {aiAnalysis.score}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Strengths
                    </h4>
                    <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400">
                      {aiAnalysis.strengths.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Areas for Improvement
                    </h4>
                    <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400">
                      {aiAnalysis.improvements.map((i, idx) => (
                        <li key={idx}>{i}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Suggestions
                    </h4>
                    <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400">
                      {aiAnalysis.suggestions.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* NSW Criteria Tracker */}
            {nswFeedback && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <EnhancedNSWCriteriaTracker feedback={nswFeedback} />
              </div>
            )}

            {/* Vocabulary Builder */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <VocabularyBuilder content={content} />
            </div>

            {/* Sentence Analyzer */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <SentenceAnalyzer content={content} />
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showWritingTypeModal && (
        <WritingTypeSelectionModal
          onSelect={handleWritingTypeSelect}
          onClose={() => setShowWritingTypeModal(false)}
        />
      )}

      {showPromptOptionsModal && (
        <PromptOptionsModal
          onGeneratePrompt={handleGeneratePrompt}
          onCustomPrompt={handleCustomPrompt}
          onClose={() => setShowPromptOptionsModal(false)}
        />
      )}
    </div>
  );
};
