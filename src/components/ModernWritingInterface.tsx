import React, { useState, useRef, useEffect } from 'react';
import { 
  Save, 
  Download, 
  HelpCircle, 
  Bold, 
  Italic, 
  Underline,
  ChevronLeft,
  ChevronRight,
  Bot,
  FileText,
  BookOpen,
  Lightbulb,
  CheckCircle,
  Circle,
  Sparkles,
  PanelRightClose,
  PanelRightOpen
} from 'lucide-react';

interface TemplateStep {
  id: string;
  title: string;
  description: string;
  placeholder: string;
  color: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface ModernWritingInterfaceProps {
  content: string;
  onChange: (content: string) => void;
  textType: string;
  onTimerStart: (shouldStart: boolean) => void;
  onSubmit: () => void;
  onTextTypeChange?: (textType: string) => void;
  onPopupCompleted?: () => void;
}

const TEMPLATE_STEPS: TemplateStep[] = [
  {
    id: 'planning',
    title: 'Planning Notes',
    description: 'Brainstorm and organize your thoughts',
    placeholder: 'Jot down your initial ideas, themes, or inspiration for your narrative...',
    color: 'bg-blue-50 border-blue-200',
    icon: Lightbulb
  },
  {
    id: 'setting',
    title: 'Setting',
    description: 'Describe the world of your story',
    placeholder: 'Where and when does your story take place? Describe the location, time period, atmosphere...',
    color: 'bg-green-50 border-green-200',
    icon: FileText
  },
  {
    id: 'characters',
    title: 'Characters',
    description: 'Develop your main characters',
    placeholder: 'Who are the main characters? Describe their personalities, appearance, relationships...',
    color: 'bg-orange-50 border-orange-200',
    icon: BookOpen
  },
  {
    id: 'plot',
    title: 'Plot Structure',
    description: 'Outline your story structure',
    placeholder: 'What happens in your story? Outline the beginning, middle, and end...',
    color: 'bg-purple-50 border-purple-200',
    icon: FileText
  }
];

export function ModernWritingInterface({ 
  content, 
  onChange, 
  textType, 
  onTimerStart, 
  onSubmit, 
  onTextTypeChange, 
  onPopupCompleted 
}: ModernWritingInterfaceProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [templateData, setTemplateData] = useState<Record<string, string>>({});
  const [wordCount, setWordCount] = useState(0);
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(true);
  const [activeMode, setActiveMode] = useState<'template' | 'ai' | 'resources'>('template');
  const [documentTitle, setDocumentTitle] = useState('Untitled Story');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const writingAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const words = content.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
  }, [content]);

  const handleTemplateDataChange = (stepId: string, value: string) => {
    setTemplateData(prev => ({
      ...prev,
      [stepId]: value
    }));
  };

  const nextStep = () => {
    if (currentStep < TEMPLATE_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentTemplateStep = TEMPLATE_STEPS[currentStep];
  const Icon = currentTemplateStep.icon;

  const aiSuggestions = [
    "Try starting with a compelling opening line that hooks the reader",
    "Consider adding sensory details to make your setting more vivid",
    "Develop your character's motivation - what do they want?",
    "Show, don't tell - use actions and dialogue to reveal character traits"
  ];

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setIsEditingTitle(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="h-15 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-semibold text-gray-900">Writing Adventure</span>
          </div>
          <div className="text-sm text-gray-500">›</div>
          <div className="text-sm text-gray-500">My Space</div>
          <div className="text-sm text-gray-500">›</div>
          <div className="text-sm text-gray-600">Write</div>
        </div>

        <div className="flex-1 max-w-md mx-8">
          {isEditingTitle ? (
            <input
              type="text"
              value={documentTitle}
              onChange={(e) => setDocumentTitle(e.target.value)}
              onBlur={() => setIsEditingTitle(false)}
              onKeyDown={handleKeyDown}
              className="w-full text-lg font-medium text-center bg-transparent border-none outline-none focus:bg-white focus:border focus:border-blue-300 focus:rounded px-2 py-1"
              autoFocus
            />
          ) : (
            <h1 
              className="text-lg font-medium text-center cursor-pointer hover:bg-gray-100 rounded px-2 py-1 transition-colors"
              onClick={() => setIsEditingTitle(true)}
            >
              {documentTitle}
            </h1>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
            <Save className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
            <Download className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
            <HelpCircle className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Writing Environment */}
        <div className={`flex-1 flex flex-col transition-all duration-300 ${isRightPanelOpen ? 'mr-96' : 'mr-0'}`}>
          {/* Writing Toolbar */}
          <div className="h-12 bg-white border-b border-gray-200 flex items-center justify-between px-4">
            <div className="flex items-center space-x-1">
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors">
                <Bold className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors">
                <Italic className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors">
                <Underline className="w-4 h-4" />
              </button>
              <div className="w-px h-6 bg-gray-300 mx-2"></div>
              <button 
                className={`p-2 rounded transition-colors ${activeMode === 'ai' ? 'text-purple-600 bg-purple-100' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
                onClick={() => setActiveMode(activeMode === 'ai' ? 'template' : 'ai')}
              >
                <Bot className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span>{wordCount} words</span>
              <button 
                className="p-1 hover:bg-gray-100 rounded transition-colors"
                onClick={() => setIsRightPanelOpen(!isRightPanelOpen)}
              >
                {isRightPanelOpen ? <PanelRightClose className="w-4 h-4" /> : <PanelRightOpen className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Main Writing Area */}
          <div className="flex-1 p-6 bg-white">
            <textarea
              ref={writingAreaRef}
              value={content}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Start writing your story here..."
              className="w-full h-full resize-none border-none outline-none text-gray-900 text-base leading-relaxed font-serif"
              style={{ fontFamily: 'Georgia, serif' }}
            />
          </div>

          {/* Status Bar */}
          <div className="h-8 bg-gray-50 border-t border-gray-200 flex items-center justify-between px-4 text-xs text-gray-500">
            <div className="flex items-center space-x-4">
              <span>Auto-saved 2 minutes ago</span>
              <span>•</span>
              <span>Template: Narrative Writing</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Ready</span>
            </div>
          </div>
        </div>

        {/* Right Panel - AI Coach Integration */}
        {isRightPanelOpen && (
          <div className="w-96 bg-white border-l border-gray-200 flex flex-col fixed right-0 top-15 bottom-0 shadow-lg">
            {/* Panel Header */}
            <div className="h-12 border-b border-gray-200 flex items-center px-4">
              <div className="flex space-x-1">
                <button 
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${activeMode === 'template' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900'}`}
                  onClick={() => setActiveMode('template')}
                >
                  Template
                </button>
                <button 
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${activeMode === 'ai' ? 'bg-purple-100 text-purple-700' : 'text-gray-600 hover:text-gray-900'}`}
                  onClick={() => setActiveMode('ai')}
                >
                  AI Coach
                </button>
                <button 
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${activeMode === 'resources' ? 'bg-green-100 text-green-700' : 'text-gray-600 hover:text-gray-900'}`}
                  onClick={() => setActiveMode('resources')}
                >
                  Resources
                </button>
              </div>
            </div>

            {/* Panel Content */}
            <div className="flex-1 overflow-y-auto">
              {activeMode === 'template' && (
                <div className="p-4">
                  {/* Step Indicator */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Step {currentStep + 1} of {TEMPLATE_STEPS.length}</span>
                      <span className="text-xs text-gray-500">{Math.round(((currentStep + 1) / TEMPLATE_STEPS.length) * 100)}% complete</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${((currentStep + 1) / TEMPLATE_STEPS.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Current Step */}
                  <div className={`border-2 rounded-lg p-4 ${currentTemplateStep.color}`}>
                    <div className="flex items-center space-x-2 mb-3">
                      <Icon className="w-5 h-5 text-gray-700" />
                      <h3 className="font-semibold text-gray-900">{currentTemplateStep.title}</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">{currentTemplateStep.description}</p>
                    <textarea
                      value={templateData[currentTemplateStep.id] || ''}
                      onChange={(e) => handleTemplateDataChange(currentTemplateStep.id, e.target.value)}
                      placeholder={currentTemplateStep.placeholder}
                      className="w-full h-32 p-3 border border-gray-300 rounded-md resize-none text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Navigation */}
                  <div className="flex justify-between mt-6">
                    <button 
                      onClick={prevStep}
                      disabled={currentStep === 0}
                      className="flex items-center space-x-1 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Previous</span>
                    </button>
                    <button 
                      onClick={nextStep}
                      disabled={currentStep === TEMPLATE_STEPS.length - 1}
                      className="flex items-center space-x-1 px-4 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <span>Next</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Quick Overview */}
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Template Progress</h4>
                    <div className="space-y-2">
                      {TEMPLATE_STEPS.map((step, index) => (
                        <div 
                          key={step.id}
                          className={`flex items-center space-x-2 text-sm cursor-pointer p-2 rounded transition-colors ${
                            index === currentStep ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
                          }`}
                          onClick={() => setCurrentStep(index)}
                        >
                          {templateData[step.id] ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <Circle className="w-4 h-4 text-gray-400" />
                          )}
                          <span>{step.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeMode === 'ai' && (
                <div className="p-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <Bot className="w-5 h-5 text-purple-600" />
                    <h3 className="font-semibold text-gray-900">AI Writing Coach</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <h4 className="font-medium text-purple-900 mb-2">Writing Tips</h4>
                      <div className="space-y-2">
                        {aiSuggestions.map((suggestion, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <Lightbulb className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-purple-800">{suggestion}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-medium text-blue-900 mb-2">Word Magic</h4>
                      <p className="text-sm text-blue-800 mb-3">Write 50 more words to get help (0/50)</p>
                      <div className="w-full bg-blue-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full w-0"></div>
                      </div>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-medium text-green-900 mb-2">Quick Actions</h4>
                      <div className="space-y-2">
                        <button className="w-full text-left p-2 text-sm text-green-800 hover:bg-green-100 rounded transition-colors">
                          ✨ Improve this sentence
                        </button>
                        <button className="w-full text-left p-2 text-sm text-green-800 hover:bg-green-100 rounded transition-colors">
                          📝 Suggest next paragraph
                        </button>
                        <button className="w-full text-left p-2 text-sm text-green-800 hover:bg-green-100 rounded transition-colors">
                          🎯 Check grammar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeMode === 'resources' && (
                <div className="p-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <BookOpen className="w-5 h-5 text-green-600" />
                    <h3 className="font-semibold text-gray-900">Writing Resources</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">Example Stories</h4>
                      <div className="space-y-2">
                        <button className="w-full text-left p-2 text-sm text-gray-700 hover:bg-gray-50 rounded transition-colors">
                          📖 Adventure in the Forest
                        </button>
                        <button className="w-full text-left p-2 text-sm text-gray-700 hover:bg-gray-50 rounded transition-colors">
                          🏰 The Mysterious Castle
                        </button>
                        <button className="w-full text-left p-2 text-sm text-gray-700 hover:bg-gray-50 rounded transition-colors">
                          🌟 A Day at the Beach
                        </button>
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">Writing Guides</h4>
                      <div className="space-y-2">
                        <button className="w-full text-left p-2 text-sm text-gray-700 hover:bg-gray-50 rounded transition-colors">
                          📚 Character Development
                        </button>
                        <button className="w-full text-left p-2 text-sm text-gray-700 hover:bg-gray-50 rounded transition-colors">
                          🎭 Dialogue Writing
                        </button>
                        <button className="w-full text-left p-2 text-sm text-gray-700 hover:bg-gray-50 rounded transition-colors">
                          🌍 Setting Description
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
