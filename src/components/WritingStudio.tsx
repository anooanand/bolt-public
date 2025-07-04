import React, { useState, useRef, useEffect } from 'react';
import { 
  Save, 
  Download, 
  FileText, 
  BarChart3, 
  Lightbulb, 
  RefreshCw,
  Clock,
  Target,
  TrendingUp,
  BookOpen,
  Zap,
  Eye
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { WritingArea } from './WritingArea';
import { WritingToolbar } from './WritingToolbar';
import { CoachPanel } from './CoachPanel';

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
  const [textType, setTextType] = useState<string>('essay');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [showAnalysis, setShowAnalysis] = useState<boolean>(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [timerStarted, setTimerStarted] = useState<boolean>(false);
  const [showCoachPanel, setShowCoachPanel] = useState<boolean>(true);

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

  // Calculate writing statistics
  useEffect(() => {
    const words = content.trim().split(/\s+/).filter(word => word.length > 0);
    const paragraphs = content.split('\n\n').filter(p => p.trim().length > 0);
    
    setStats({
      wordCount: words.length,
      characterCount: content.length,
      paragraphCount: paragraphs.length,
      readingTime: Math.ceil(words.length / 200) // Average reading speed
    });
  }, [content]);

  // Auto-save functionality
  useEffect(() => {
    if (content.length > 0) {
      const timer = setTimeout(() => {
        handleSave();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [content, title]);

  const handleSave = () => {
    // Simulate saving to localStorage or database
    const document = {
      id: Date.now().toString(),
      title,
      content,
      textType,
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
    
    localStorage.setItem('savedDocuments', JSON.stringify(savedDocs.slice(0, 10))); // Keep last 10
    setLastSaved(new Date());
  };

  const handleAnalyze = async () => {
    if (!isPaidUser && stats.wordCount > 100) {
      alert('Upgrade to Pro to analyze longer documents');
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const mockAnalysis: AIAnalysis = {
        score: Math.floor(Math.random() * 20) + 80, // 80-100
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
      setIsAnalyzing(false);
    }, 2000);
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

  const handleTimerStart = (shouldStart: boolean) => {
    setTimerStarted(shouldStart);
  };

  const handleSubmit = () => {
    onNavigate('feedback');
  };

  const quickActions = [
    {
      label: 'Paraphrase',
      icon: RefreshCw,
      action: () => onNavigate('paraphrase'),
      description: 'Rephrase selected text'
    },
    {
      label: 'Brainstorm',
      icon: Lightbulb,
      action: () => onNavigate('brainstorm'),
      description: 'Generate ideas'
    },
    {
      label: 'Learn',
      icon: BookOpen,
      action: () => onNavigate('learn'),
      description: 'Writing tutorials',
      isPro: true
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

        {/* Writing Toolbar */}
        <WritingToolbar 
          textType={textType}
          onTextTypeChange={setTextType}
          onToggleCoach={() => setShowCoachPanel(!showCoachPanel)}
          showCoachPanel={showCoachPanel}
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
          {/* Main Editor with Enhanced WritingArea */}
          <div className={showCoachPanel ? "lg:col-span-3" : "lg:col-span-4"}>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <WritingArea
                content={content}
                onChange={setContent}
                textType={textType}
                onTimerStart={handleTimerStart}
                onSubmit={handleSubmit}
              />
              
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

          {/* Coach Panel */}
          {showCoachPanel && (
            <div className="lg:col-span-1">
              <CoachPanel 
                content={content}
                textType={textType}
                onNavigate={onNavigate}
              />
            </div>
          )}
        </div>

        {/* AI Analysis Panel */}
        {showAnalysis && (
          <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                AI Analysis Results
              </h3>
              <button
                onClick={() => setShowAnalysis(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                ×
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {aiAnalysis.score}%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Overall Score
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                  Strengths
                </h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  {aiAnalysis.strengths.map((strength, index) => (
                    <li key={index}>• {strength}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                  Improvements
                </h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  {aiAnalysis.improvements.map((improvement, index) => (
                    <li key={index}>• {improvement}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

