import React, { useState, useEffect } from 'react';
import { BookOpen, ChevronDown, ChevronUp, Lightbulb, Target, Users, MapPin, Star, CheckCircle, ChevronRight, Settings, BarChart3, Brain, MessageSquare, Sparkles, Clock, Type, Save } from 'lucide-react';

interface NarrativeWritingTemplateRedesignedProps {
  content: string;
  onChange: (content: string) => void;
  prompt?: string;
  onPromptChange?: (prompt: string) => void;
}

interface TemplateData {
  planning: string;
  setting: string;
  characters: string;
  plot: string;
  theme: string;
}

export function NarrativeWritingTemplateRedesigned({ 
  content, 
  onChange, 
  prompt,
  onPromptChange 
}: NarrativeWritingTemplateRedesignedProps) {
  const [templateData, setTemplateData] = useState<TemplateData>({
    planning: '',
    setting: '',
    characters: '',
    plot: '',
    theme: ''
  });
  
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [showTemplate, setShowTemplate] = useState(true);
  const [wordCount, setWordCount] = useState(0);
  const [characterCount, setCharacterCount] = useState(0);

  // Calculate word and character count
  useEffect(() => {
    const words = content.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
    setCharacterCount(content.length);
  }, [content]);

  const writingSteps = [
    { id: 1, title: "Setting", icon: Settings, description: "Where and when your story unfolds" },
    { id: 2, title: "Characters", icon: Users, description: "The people who bring your story to life" },
    { id: 3, title: "Plot", icon: Target, description: "The sequence of events in your story" },
    { id: 4, title: "Theme", icon: Star, description: "The deeper meaning or message" }
  ];

  const updateCompletedSteps = (data: TemplateData) => {
    const completed: number[] = [];
    if (data.setting.trim()) completed.push(1);
    if (data.characters.trim()) completed.push(2);
    if (data.plot.trim()) completed.push(3);
    if (data.theme.trim()) completed.push(4);
    setCompletedSteps(completed);
  };

  const handleTemplateChange = (field: keyof TemplateData, value: string) => {
    const newData = {
      ...templateData,
      [field]: value
    };
    setTemplateData(newData);
    updateCompletedSteps(newData);
  };

  const getProgressPercentage = () => {
    return Math.round((completedSteps.length / writingSteps.length) * 100);
  };

  const toggleTemplateView = () => {
    setShowTemplate(!showTemplate);
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header with Prompt */}
      {prompt && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-blue-200 p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-blue-800">Your Writing Prompt</h3>
          </div>
          <p className="text-gray-700 leading-relaxed">{prompt}</p>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Template Sidebar (Collapsible) */}
        {showTemplate && (
          <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800">Story Planning</h3>
                <button
                  onClick={toggleTemplateView}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Progress */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Template Progress</span>
                  <span className="text-sm font-bold text-blue-600">{getProgressPercentage()}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${getProgressPercentage()}%` }}
                  ></div>
                </div>
              </div>

              {/* Step Navigation */}
              <div className="space-y-2 mb-6">
                {writingSteps.map((step) => (
                  <button
                    key={step.id}
                    onClick={() => setCurrentStep(step.id)}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-all ${
                      currentStep === step.id
                        ? 'bg-blue-100 border-2 border-blue-300'
                        : completedSteps.includes(step.id)
                        ? 'bg-green-50 border border-green-200'
                        : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    {completedSteps.includes(step.id) ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <step.icon className={`w-5 h-5 ${currentStep === step.id ? 'text-blue-600' : 'text-gray-400'}`} />
                    )}
                    <div>
                      <div className={`font-medium ${currentStep === step.id ? 'text-blue-800' : 'text-gray-700'}`}>
                        {step.title}
                      </div>
                      <div className="text-xs text-gray-500">{step.description}</div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Current Step Content */}
              <div className="space-y-4">
                {currentStep === 1 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Setting: Where and when does your story take place?
                    </label>
                    <textarea
                      value={templateData.setting}
                      onChange={(e) => handleTemplateChange('setting', e.target.value)}
                      placeholder="Describe the time, place, and atmosphere of your story..."
                      className="w-full h-24 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                )}

                {currentStep === 2 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Characters: Who are the main people in your story?
                    </label>
                    <textarea
                      value={templateData.characters}
                      onChange={(e) => handleTemplateChange('characters', e.target.value)}
                      placeholder="Describe your main characters, their personalities, and relationships..."
                      className="w-full h-24 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                )}

                {currentStep === 3 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Plot: What happens in your story?
                    </label>
                    <textarea
                      value={templateData.plot}
                      onChange={(e) => handleTemplateChange('plot', e.target.value)}
                      placeholder="Outline the main events, conflict, and resolution of your story..."
                      className="w-full h-24 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                )}

                {currentStep === 4 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Theme: What is the deeper meaning of your story?
                    </label>
                    <textarea
                      value={templateData.theme}
                      onChange={(e) => handleTemplateChange('theme', e.target.value)}
                      placeholder="What message or lesson does your story convey..."
                      className="w-full h-24 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Main Writing Area */}
        <div className="flex-1 flex flex-col">
          {/* Writing Toolbar */}
          <div className="bg-white border-b border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {!showTemplate && (
                  <button
                    onClick={toggleTemplateView}
                    className="flex items-center space-x-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Show Planning</span>
                  </button>
                )}
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Type className="w-4 h-4" />
                  <span>{wordCount} words</span>
                  <span>•</span>
                  <span>{characterCount} characters</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="flex items-center space-x-2 px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
                  <Save className="w-4 h-4" />
                  <span>Auto-save</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Textarea */}
          <div className="flex-1 p-6 bg-white">
            <textarea
              value={content}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Start writing your amazing story here! Use your planning notes as a guide, but let your creativity flow... ✨"
              className="w-full h-full p-4 border-2 border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg leading-relaxed"
              style={{ 
                fontFamily: 'Georgia, serif',
                minHeight: '400px'
              }}
            />
          </div>

          {/* Writing Tips */}
          {wordCount < 50 && (
            <div className="bg-blue-50 border-t border-blue-200 p-4">
              <div className="flex items-center space-x-2 text-blue-700">
                <Lightbulb className="w-4 h-4" />
                <span className="font-medium">Writing Tip:</span>
              </div>
              <p className="text-blue-600 text-sm mt-1">
                Start with a strong opening that grabs your reader's attention. You can always revise it later!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}