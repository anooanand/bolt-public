import React, { useState, useEffect } from 'react';
import { BookOpen, ChevronDown, ChevronUp, Lightbulb, Target, Users, MapPin, Star, CheckCircle, ChevronRight, Settings, BarChart3, Brain, MessageSquare, Sparkles, Clock } from 'lucide-react';

interface NarrativeWritingTemplateRedesignedProps {
  content: string;
  onChange: (content: string) => void;
  onTimerStart: (shouldStart: boolean) => void;
  onSubmit: () => void;
}

interface TemplateData {
  planning: string;
  setting: string;
  characters: string;
  plot: string;
  theme: string;
}

export function NarrativeWritingTemplateRedesigned({ content, onChange, onTimerStart, onSubmit }: NarrativeWritingTemplateRedesignedProps) {
  const [templateData, setTemplateData] = useState<TemplateData>({
    planning: '',
    setting: '',
    characters: '',
    plot: '',
    theme: ''
  });
  
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [expandedSections, setExpandedSections] = useState({
    planning: true,
    setting: false,
    characters: false,
    plot: false,
    theme: false
  });

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
    setTemplateData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const getProgressPercentage = () => {
    return Math.round((completedSteps.length / writingSteps.length) * 100);
  };

  const getStepProgress = (stepId: number) => {
    const progressValues = { 1: 100, 2: 75, 3: 50, 4: 25 };
    return progressValues[stepId as keyof typeof progressValues] || 0;
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar - AI Writing Coach and NSW Writing Coach */}
      <div className="w-80 bg-white border-r border-gray-200 p-6 overflow-y-auto">
        {/* AI Writing Coach */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-3">
            <Brain className="h-5 w-5 text-purple-600" />
            <h3 className="font-medium">AI Writing Coach</h3>
          </div>
          <p className="text-sm text-gray-600">NSW-aligned guidance and support</p>
        </div>

        {/* NSW Writing Coach */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-3">
            <MessageSquare className="h-5 w-5 text-purple-600" />
            <h3 className="font-medium">NSW Writing Coach</h3>
          </div>
          
          <div className="space-y-3">
            <div className="text-sm text-gray-600">Quick Questions</div>
            <select className="w-full p-2 border border-gray-200 rounded-lg text-sm">
              <option>Choose a question...</option>
              <option>How to develop characters?</option>
              <option>What makes a good setting?</option>
              <option>How to create conflict?</option>
            </select>
            
            <div className="text-sm text-gray-600">Or ask your own question</div>
            <textarea 
              placeholder="Type your question here..."
              className="w-full h-20 p-2 border border-gray-200 rounded-lg text-sm resize-none"
            />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 overflow-y-auto">
        {/* Header */}
        <div className="bg-white rounded-lg p-6 mb-6 shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <BookOpen className="h-6 w-6 text-purple-600" />
              <h1 className="text-xl font-semibold text-gray-900">Narrative Writing Studio</h1>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Template Progress</div>
              <div className="text-2xl font-bold text-gray-900">{getProgressPercentage()}%</div>
            </div>
          </div>
          <p className="text-gray-600 mb-4">
            Create compelling stories with guided planning and NSW-aligned structure
          </p>

          {/* Step Navigation */}
          <div className="flex items-center space-x-2 mb-6">
            {writingSteps.map((step, index) => (
              <React.Fragment key={step.id}>
                <button
                  onClick={() => setCurrentStep(step.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    currentStep === step.id
                      ? 'bg-gray-900 text-white'
                      : completedSteps.includes(step.id)
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {completedSteps.includes(step.id) ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <step.icon className="h-4 w-4" />
                  )}
                  <span>{step.title}</span>
                </button>
                {index < writingSteps.length - 1 && (
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button
              onClick={() => onTimerStart(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              <span>Start Writing Your Story</span>
            </button>
            <button
              onClick={() => onChange('')}
              className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              <Lightbulb className="h-4 w-4" />
              <span>Skip Template & Write Freely</span>
            </button>
          </div>
        </div>

        {/* Brainstorming Section */}
        <div className="bg-white rounded-lg p-6 mb-6 shadow-sm border">
          <div 
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleSection('planning')}
          >
            <div className="flex items-center space-x-2">
              <Lightbulb className="h-5 w-5 text-blue-600" />
              <h3 className="text-lg font-medium">Initial Brainstorming</h3>
            </div>
            {expandedSections.planning ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </div>
          {expandedSections.planning && (
            <div className="mt-4">
              <p className="text-gray-600 mb-3">
                Capture your creative spark and initial ideas
              </p>
              <textarea
                value={templateData.planning}
                onChange={(e) => handleTemplateChange('planning', e.target.value)}
                placeholder="What's your story idea? Jot down any inspiration, themes, or concepts that come to mind..."
                className="w-full h-24 p-3 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="mt-3 text-sm text-blue-600">
                💡 Don't worry about structure yet - just let your creativity flow!
              </div>
            </div>
          )}
        </div>

        {/* Current Step Content */}
        {writingSteps.map((step) => (
          currentStep === step.id && (
            <div key={step.id} className="bg-white rounded-lg p-6 shadow-sm border border-green-200">
              <div className="flex items-center space-x-2 mb-4">
                <step.icon className="h-5 w-5 text-green-600" />
                <h3 className="text-lg font-medium">Step {step.id}: {step.title}</h3>
              </div>
              <p className="text-gray-600 mb-4">{step.description}</p>
              <textarea
                value={templateData[step.title.toLowerCase() as keyof TemplateData]}
                onChange={(e) => handleTemplateChange(step.title.toLowerCase() as keyof TemplateData, e.target.value)}
                placeholder={`Describe where and when your story takes place. Include details about the location, time period, weather, atmosphere, and any important background information...`}
                className="w-full h-32 p-3 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          )
        ))}
      </div>

      {/* Right Sidebar - Writing Buddy and Writing Progress */}
      <div className="w-80 bg-white border-l border-gray-200 p-6 overflow-y-auto">
        {/* Writing Progress */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-3">
            <BarChart3 className="h-5 w-5 text-green-600" />
            <h3 className="font-medium">Writing Progress</h3>
          </div>
          
          <div className="space-y-3">
            <div className="text-sm text-gray-600">Template Completion: {getProgressPercentage()}%</div>
            
            {writingSteps.map((step) => (
              <div key={step.id} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{step.title}</span>
                  <span className="font-medium">{getStepProgress(step.id)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gray-900 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${getStepProgress(step.id)}%` }}
                  ></div>
                </div>
              </div>
            ))}
            
            <div className="mt-4 text-sm text-green-600">
              Complete 3 more sections to unlock writing mode
            </div>
          </div>
        </div>

        {/* Writing Buddy Section */}
        <div className="mb-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-purple-800">Writing Buddy</h3>
            <div className="flex space-x-1">
              <button className="text-purple-600 hover:text-purple-800">&gt;</button>
              <button className="text-purple-600 hover:text-purple-800">X</button>
            </div>
          </div>
          <div className="flex space-x-2 mb-4">
            <button className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium">
              <Sparkles className="h-4 w-4" />
              <span>Writing Buddy</span>
            </button>
            <button className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">
              <Clock className="h-4 w-4" />
              <span>Word Magic</span>
            </button>
          </div>
          <div className="text-sm text-gray-700 mb-3">
            Write 38 more words to get help (12/50)
          </div>
          <select className="w-full p-2 border border-gray-200 rounded-lg text-sm mb-4">
            <option>Lots of Help</option>
            <option>Some Help</option>
            <option>No Help</option>
          </select>
          <div className="text-sm text-gray-700 mb-2">
            Questions to Ask Your Writing Buddy
          </div>
          <select className="w-full p-2 border border-gray-200 rounded-lg text-sm">
            <option>Choose a question...</option>
            <option>How to improve my vocabulary?</option>
            <option>How to structure my essay?</option>
          </select>
        </div>
      </div>
    </div>
  );
}
