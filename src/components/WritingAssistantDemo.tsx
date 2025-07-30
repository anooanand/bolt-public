import React, { useState, useCallback, useEffect } from 'react';
import { 
  FileText, 
  MessageSquare, 
  Settings, 
  Download, 
  Upload,
  Save,
  RefreshCw,
  Eye,
  Code,
  Play,
  BookOpen,
  Target,
  Lightbulb,
  CheckCircle
} from 'lucide-react';
import { InteractiveTextEditor } from './InteractiveTextEditor';
import { EnhancedCoachPanel } from './EnhancedCoachPanel';

// Types for the demo application
interface DemoSettings {
  textType: string;
  enableRealTimeHighlighting: boolean;
  enableGrammarCheck: boolean;
  enableVocabularyEnhancement: boolean;
  theme: 'light' | 'dark';
}

interface WritingSession {
  id: string;
  title: string;
  content: string;
  textType: string;
  createdAt: Date;
  lastModified: Date;
  wordCount: number;
}

// Mock AI service for demo purposes
class MockAIService {
  static async getFeedback(content: string): Promise<any> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const words = content.trim().split(/\s+/).filter(w => w.length > 0);
    const wordCount = words.length;
    
    // Generate mock feedback based on content
    const feedbackItems = [];
    const corrections = [];
    const vocabularyEnhancements = [];
    const grammarErrors = [];
    
    // Mock strengths
    if (wordCount > 50) {
      feedbackItems.push({
        type: 'praise',
        text: 'Great job developing your ideas with specific details!',
        exampleFromText: content.substring(0, Math.min(50, content.length)),
        area: 'Content Development',
        position: { start: 0, end: Math.min(50, content.length) }
      });
    }
    
    // Mock improvements
    if (content.includes('very')) {
      const veryIndex = content.indexOf('very');
      feedbackItems.push({
        type: 'improvement',
        text: 'Consider using more specific adjectives instead of "very"',
        exampleFromText: 'very',
        suggestionForImprovement: 'extremely, incredibly, remarkably',
        area: 'Vocabulary',
        position: { start: veryIndex, end: veryIndex + 4 }
      });
    }
    
    // Mock grammar errors
    if (content.includes('there house')) {
      const errorIndex = content.indexOf('there house');
      grammarErrors.push({
        start: errorIndex,
        end: errorIndex + 5,
        message: 'Use "their" for possession',
        type: 'grammar',
        suggestions: ['their']
      });
    }
    
    // Mock vocabulary enhancements
    if (content.includes('good')) {
      const goodIndex = content.indexOf('good');
      vocabularyEnhancements.push({
        original: 'good',
        suggestion: 'excellent',
        position: { start: goodIndex, end: goodIndex + 4 }
      });
    }
    
    return {
      feedbackItems,
      corrections,
      vocabularyEnhancements,
      grammarErrors,
      overallScore: Math.min(10, Math.max(6, Math.floor(wordCount / 50) + 6)),
      criteriaScores: {
        ideas: Math.min(10, Math.max(6, Math.floor(wordCount / 40) + 6)),
        structure: Math.min(10, Math.max(6, Math.floor(wordCount / 60) + 6)),
        language: Math.min(10, Math.max(6, Math.floor(wordCount / 45) + 6)),
        accuracy: Math.min(10, Math.max(7, 10 - grammarErrors.length))
      },
      strengths: [
        'Clear expression of ideas',
        'Good use of examples',
        'Engaging writing style'
      ],
      areasForImprovement: [
        'Vary sentence structure',
        'Use more sophisticated vocabulary',
        'Improve paragraph transitions'
      ]
    };
  }
}

// Main Demo Component
export const WritingAssistantDemo: React.FC = () => {
  // State management
  const [content, setContent] = useState('');
  const [settings, setSettings] = useState<DemoSettings>({
    textType: 'narrative',
    enableRealTimeHighlighting: true,
    enableGrammarCheck: true,
    enableVocabularyEnhancement: true,
    theme: 'light'
  });
  const [currentSession, setCurrentSession] = useState<WritingSession | null>(null);
  const [savedSessions, setSavedSessions] = useState<WritingSession[]>([]);
  const [activeTab, setActiveTab] = useState<'editor' | 'coach' | 'settings' | 'code'>('editor');
  const [showDemo, setShowDemo] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  
  // Initialize demo session
  useEffect(() => {
    const demoSession: WritingSession = {
      id: 'demo-session',
      title: 'My Amazing Story',
      content: 'Once upon a time, in a very magical forest, there lived a brave young adventurer. The forest was good and full of mysteries waiting to be discovered. There house was hidden deep among the ancient trees...',
      textType: 'narrative',
      createdAt: new Date(),
      lastModified: new Date(),
      wordCount: 0
    };
    
    setCurrentSession(demoSession);
    setContent(demoSession.content);
    setSavedSessions([demoSession]);
  }, []);
  
  // Handle content changes
  const handleContentChange = useCallback((newContent: string) => {
    setContent(newContent);
    
    if (currentSession) {
      const updatedSession = {
        ...currentSession,
        content: newContent,
        lastModified: new Date(),
        wordCount: newContent.trim().split(/\s+/).filter(w => w.length > 0).length
      };
      setCurrentSession(updatedSession);
    }
  }, [currentSession]);
  
  // Handle feedback received
  const handleFeedbackReceived = useCallback((feedback: any) => {
    console.log('Feedback received:', feedback);
  }, []);
  
  // Mock AI feedback function for the editor
  const getMockFeedback = useCallback(async (text: string) => {
    return await MockAIService.getFeedback(text);
  }, []);
  
  // Save current session
  const saveSession = useCallback(() => {
    if (currentSession) {
      setIsLoading(true);
      setTimeout(() => {
        setSavedSessions(prev => {
          const existing = prev.find(s => s.id === currentSession.id);
          if (existing) {
            return prev.map(s => s.id === currentSession.id ? currentSession : s);
          }
          return [...prev, currentSession];
        });
        setIsLoading(false);
      }, 500);
    }
  }, [currentSession]);
  
  // Create new session
  const createNewSession = useCallback(() => {
    const newSession: WritingSession = {
      id: `session-${Date.now()}`,
      title: 'New Writing Session',
      content: '',
      textType: settings.textType,
      createdAt: new Date(),
      lastModified: new Date(),
      wordCount: 0
    };
    
    setCurrentSession(newSession);
    setContent('');
  }, [settings.textType]);
  
  // Load session
  const loadSession = useCallback((session: WritingSession) => {
    setCurrentSession(session);
    setContent(session.content);
  }, []);
  
  // Export session
  const exportSession = useCallback(() => {
    if (currentSession) {
      const dataStr = JSON.stringify(currentSession, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      
      const exportFileDefaultName = `${currentSession.title.replace(/\s+/g, '_')}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
    }
  }, [currentSession]);
  
  // Demo features showcase
  const demoFeatures = [
    {
      icon: <Target className="h-5 w-5" />,
      title: "Real-time Highlighting",
      description: "See grammar, spelling, and style suggestions highlighted as you type"
    },
    {
      icon: <MessageSquare className="h-5 w-5" />,
      title: "Intelligent Coaching",
      description: "AI coach analyzes your questions and provides contextual guidance"
    },
    {
      icon: <Lightbulb className="h-5 w-5" />,
      title: "Vocabulary Enhancement",
      description: "Get suggestions for stronger, more sophisticated word choices"
    },
    {
      icon: <CheckCircle className="h-5 w-5" />,
      title: "Structured Feedback",
      description: "Receive comprehensive feedback combining multiple AI operations"
    }
  ];
  
  return (
    <div className={`min-h-screen ${settings.theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header */}
      <header className={`${settings.theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <h1 className="text-xl font-bold">Interactive Writing Assistant Demo</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              {currentSession && (
                <div className="text-sm text-gray-600">
                  {currentSession.wordCount} words • {currentSession.title}
                </div>
              )}
              
              <button
                onClick={saveSession}
                disabled={isLoading}
                className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {isLoading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                <span>Save</span>
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Demo Introduction */}
      {showDemo && (
        <div className={`${settings.theme === 'dark' ? 'bg-blue-900 border-blue-700' : 'bg-blue-50 border-blue-200'} border-b`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-blue-800 mb-2">
                  Welcome to the Interactive Text Editor Demo!
                </h2>
                <p className="text-blue-700 mb-4">
                  This demo showcases the two main priorities: an interactive text editor with programmatic highlighting 
                  and enhanced frontend-backend integration for sophisticated AI coaching.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {demoFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-white bg-opacity-50 rounded-lg">
                      <div className="text-blue-600">{feature.icon}</div>
                      <div>
                        <h3 className="font-medium text-blue-800">{feature.title}</h3>
                        <p className="text-sm text-blue-600">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <button
                onClick={() => setShowDemo(false)}
                className="ml-4 text-blue-600 hover:text-blue-800"
              >
                ×
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Navigation Tabs */}
      <div className={`${settings.theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'editor', label: 'Text Editor', icon: <FileText className="h-4 w-4" /> },
              { id: 'coach', label: 'AI Coach', icon: <MessageSquare className="h-4 w-4" /> },
              { id: 'settings', label: 'Settings', icon: <Settings className="h-4 w-4" /> },
              { id: 'code', label: 'View Code', icon: <Code className="h-4 w-4" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'editor' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Interactive Text Editor</h2>
              <div className="flex items-center space-x-4">
                <select
                  value={settings.textType}
                  onChange={(e) => setSettings(prev => ({ ...prev, textType: e.target.value }))}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="narrative">Narrative</option>
                  <option value="persuasive">Persuasive</option>
                  <option value="expository">Expository</option>
                  <option value="descriptive">Descriptive</option>
                </select>
                
                <button
                  onClick={createNewSession}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  New Session
                </button>
              </div>
            </div>
            
            <InteractiveTextEditor
              content={content}
              onChange={handleContentChange}
              textType={settings.textType}
              onGetFeedback={getMockFeedback}
              enableRealTimeHighlighting={settings.enableRealTimeHighlighting}
              enableGrammarCheck={settings.enableGrammarCheck}
              enableVocabularyEnhancement={settings.enableVocabularyEnhancement}
              className="w-full"
            />
          </div>
        )}
        
        {activeTab === 'coach' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Enhanced AI Coach Panel</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <EnhancedCoachPanel
                  content={content}
                  textType={settings.textType}
                  onContentChange={handleContentChange}
                  onFeedbackReceived={handleFeedbackReceived}
                  className="h-96"
                />
              </div>
              
              <div className="space-y-4">
                <div className={`p-4 rounded-lg ${settings.theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
                  <h3 className="font-semibold mb-2">Current Session</h3>
                  {currentSession && (
                    <div className="space-y-2 text-sm">
                      <div>Title: {currentSession.title}</div>
                      <div>Type: {currentSession.textType}</div>
                      <div>Words: {currentSession.wordCount}</div>
                      <div>Modified: {currentSession.lastModified.toLocaleTimeString()}</div>
                    </div>
                  )}
                </div>
                
                <div className={`p-4 rounded-lg ${settings.theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
                  <h3 className="font-semibold mb-2">Saved Sessions</h3>
                  <div className="space-y-2">
                    {savedSessions.map((session) => (
                      <button
                        key={session.id}
                        onClick={() => loadSession(session)}
                        className={`w-full text-left p-2 rounded text-sm hover:bg-gray-200 ${
                          currentSession?.id === session.id ? 'bg-blue-100' : ''
                        }`}
                      >
                        <div className="font-medium">{session.title}</div>
                        <div className="text-gray-600">{session.wordCount} words</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Settings</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={`p-6 rounded-lg ${settings.theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border`}>
                <h3 className="font-semibold mb-4">Editor Settings</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Real-time Highlighting</label>
                    <input
                      type="checkbox"
                      checked={settings.enableRealTimeHighlighting}
                      onChange={(e) => setSettings(prev => ({ ...prev, enableRealTimeHighlighting: e.target.checked }))}
                      className="rounded"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Grammar Check</label>
                    <input
                      type="checkbox"
                      checked={settings.enableGrammarCheck}
                      onChange={(e) => setSettings(prev => ({ ...prev, enableGrammarCheck: e.target.checked }))}
                      className="rounded"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Vocabulary Enhancement</label>
                    <input
                      type="checkbox"
                      checked={settings.enableVocabularyEnhancement}
                      onChange={(e) => setSettings(prev => ({ ...prev, enableVocabularyEnhancement: e.target.checked }))}
                      className="rounded"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Theme</label>
                    <select
                      value={settings.theme}
                      onChange={(e) => setSettings(prev => ({ ...prev, theme: e.target.value as 'light' | 'dark' }))}
                      className="px-3 py-1 border border-gray-300 rounded"
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className={`p-6 rounded-lg ${settings.theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border`}>
                <h3 className="font-semibold mb-4">Session Management</h3>
                
                <div className="space-y-4">
                  <button
                    onClick={exportSession}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <Download className="h-4 w-4" />
                    <span>Export Session</span>
                  </button>
                  
                  <button
                    onClick={createNewSession}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    <FileText className="h-4 w-4" />
                    <span>New Session</span>
                  </button>
                  
                  <div className="text-sm text-gray-600">
                    <p>Sessions are automatically saved as you type.</p>
                    <p>Export to save your work permanently.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'code' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Implementation Code</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className={`p-4 rounded-lg ${settings.theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
                <h3 className="font-semibold mb-2">Interactive Text Editor</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Complete implementation with real-time highlighting, character position parsing, and interactive tooltips.
                </p>
                <div className="space-y-2">
                  <div className="text-sm">
                    <strong>File:</strong> InteractiveTextEditor.tsx
                  </div>
                  <div className="text-sm">
                    <strong>Features:</strong> Real-time highlighting, Grammar checking, Vocabulary enhancement, Interactive tooltips
                  </div>
                  <div className="text-sm">
                    <strong>Dependencies:</strong> React, Lucide icons, TypeScript
                  </div>
                </div>
              </div>
              
              <div className={`p-4 rounded-lg ${settings.theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
                <h3 className="font-semibold mb-2">Enhanced Coach Panel</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Sophisticated AI coaching with context management and multiple operation integration.
                </p>
                <div className="space-y-2">
                  <div className="text-sm">
                    <strong>File:</strong> EnhancedCoachPanel.tsx
                  </div>
                  <div className="text-sm">
                    <strong>Features:</strong> Input analysis, Context management, Multi-operation AI responses, Conversation history
                  </div>
                  <div className="text-sm">
                    <strong>Dependencies:</strong> React, Lucide icons, TypeScript
                  </div>
                </div>
              </div>
              
              <div className={`p-4 rounded-lg ${settings.theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
                <h3 className="font-semibold mb-2">Backend AI Service</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Python Flask service with OpenAI integration for sophisticated AI operations.
                </p>
                <div className="space-y-2">
                  <div className="text-sm">
                    <strong>File:</strong> AIOperationsService.py
                  </div>
                  <div className="text-sm">
                    <strong>Features:</strong> Multiple AI operations, Position validation, Context analysis, Error handling
                  </div>
                  <div className="text-sm">
                    <strong>Dependencies:</strong> Flask, OpenAI, CORS
                  </div>
                </div>
              </div>
              
              <div className={`p-4 rounded-lg ${settings.theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
                <h3 className="font-semibold mb-2">Demo Application</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Complete demo showcasing all features with session management and settings.
                </p>
                <div className="space-y-2">
                  <div className="text-sm">
                    <strong>File:</strong> WritingAssistantDemo.tsx
                  </div>
                  <div className="text-sm">
                    <strong>Features:</strong> Session management, Settings panel, Mock AI service, Export functionality
                  </div>
                  <div className="text-sm">
                    <strong>Dependencies:</strong> React, Lucide icons, TypeScript
                  </div>
                </div>
              </div>
            </div>
            
            <div className={`p-6 rounded-lg ${settings.theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border`}>
              <h3 className="font-semibold mb-4">Quick Start Guide</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <strong>1. Frontend Setup:</strong>
                  <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                    <li>Copy InteractiveTextEditor.tsx to your React project</li>
                    <li>Copy EnhancedCoachPanel.tsx to your React project</li>
                    <li>Install dependencies: lucide-react, react, typescript</li>
                    <li>Import and use the components in your application</li>
                  </ul>
                </div>
                
                <div>
                  <strong>2. Backend Setup:</strong>
                  <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                    <li>Copy AIOperationsService.py to your backend</li>
                    <li>Install dependencies: flask, openai, flask-cors</li>
                    <li>Set OPENAI_API_KEY environment variable</li>
                    <li>Run the Flask service on port 5000</li>
                  </ul>
                </div>
                
                <div>
                  <strong>3. Integration:</strong>
                  <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                    <li>Update API endpoints in frontend components</li>
                    <li>Configure CORS for your domain</li>
                    <li>Test the highlighting and coaching features</li>
                    <li>Customize prompts and feedback for your use case</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default WritingAssistantDemo;
