import React, { useState, useEffect } from 'react';
import { BookOpen, ChevronDown, ChevronUp, HelpCircle, Lightbulb, Target, Users, MapPin, Zap, Sparkles, Clock, Star, CheckCircle, ChevronRight } from 'lucide-react';

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

interface WritingAssistantState {
  selectedQuestion: string;
  customQuestion: string;
  suggestions: string[];
  isLoading: boolean;
}

export function NarrativeWritingTemplateRedesigned({ content, onChange, onTimerStart, onSubmit }: NarrativeWritingTemplateRedesignedProps) {
  const [templateData, setTemplateData] = useState<TemplateData>({
    planning: '',
    setting: '',
    characters: '',
    plot: '',
    theme: ''
  });
  
  const [showWritingArea, setShowWritingArea] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    planning: true,
    setting: false,
    characters: false,
    plot: false,
    theme: false
  });
  
  const [writingAssistant, setWritingAssistant] = useState<WritingAssistantState>({
    selectedQuestion: '',
    customQuestion: '',
    suggestions: [],
    isLoading: false
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const predefinedQuestions = [
    "What makes my main character unique and relatable?",
    "How can I create a vivid and engaging setting?",
    "What conflict will drive my story forward?",
    "How should I start my narrative to hook readers?",
    "What emotions do I want readers to feel?",
    "How can I show character development throughout the story?",
    "What sensory details will bring my story to life?",
    "How can I create effective dialogue?",
    "What theme or message do I want to convey?",
    "How should I structure my plot for maximum impact?"
  ];

  const writingSteps = [
    { id: 1, title: "Setting", icon: MapPin, color: "emerald", description: "Where and when your story unfolds" },
    { id: 2, title: "Characters", icon: Users, color: "amber", description: "The people who bring your story to life" },
    { id: 3, title: "Plot", icon: Target, color: "blue", description: "The sequence of events in your story" },
    { id: 4, title: "Theme", icon: Star, color: "purple", description: "The deeper meaning or message" }
  ];

  // Load saved template data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('narrativeTemplateDataRedesigned');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setTemplateData(parsed);
        updateCompletedSteps(parsed);
      } catch (error) {
        console.error('Error loading saved template data:', error);
      }
    }
  }, []);

  // Save template data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('narrativeTemplateDataRedesigned', JSON.stringify(templateData));
    updateCompletedSteps(templateData);
  }, [templateData]);

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

  const generateStoryFromTemplate = () => {
    const { setting, characters, plot, theme } = templateData;
    
    let generatedStory = '# My Narrative Story\n\n';
    
    if (setting.trim()) {
      generatedStory += `**Setting:** ${setting}\n\n`;
    }
    
    if (characters.trim()) {
      generatedStory += `**Characters:** ${characters}\n\n`;
    }
    
    if (plot.trim()) {
      generatedStory += `**Plot Outline:** ${plot}\n\n`;
    }
    
    if (theme.trim()) {
      generatedStory += `**Theme:** ${theme}\n\n`;
    }
    
    generatedStory += '---\n\n**Start writing your narrative below:**\n\n';
    
    onChange(generatedStory);
    setShowWritingArea(true);
    onTimerStart(true);
  };

  const toggleWritingArea = () => {
    setShowWritingArea(!showWritingArea);
    if (!showWritingArea) {
      onTimerStart(true);
    }
  };

  const getProgressPercentage = () => {
    return Math.round((completedSteps.length / writingSteps.length) * 100);
  };

  return (
    <div className="narrative-template-container p-4 space-y-4">
      {/* Writing Prompt Section - Added at the top */}
      <div className="writing-prompt-section bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-4 rounded-lg border border-indigo-200 dark:border-indigo-800">
        <div className="flex items-center space-x-2 mb-3">
          <Sparkles className="h-5 w-5 text-indigo-600" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Writing Prompt</h3>
        </div>
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-3 border border-indigo-200 dark:border-indigo-700">
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            Write a narrative story that takes your readers on an emotional journey. Consider the setting, characters, and plot that will bring your story to life. Use vivid descriptions and engaging dialogue to create a compelling narrative.
          </p>
        </div>
      </div>

      {/* Compact Header */}
      <div className="template-header bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-3 rounded-lg border border-purple-200 dark:border-purple-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-5 w-5 text-purple-600" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Narrative Writing Studio</h2>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-500">Template Progress</div>
            <div className="text-sm font-semibold text-purple-600">{getProgressPercentage()}%</div>
          </div>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Create compelling stories with guided planning and NSW-aligned structure
        </p>
      </div>

      {/* Compact Step Navigation */}
      <div className="step-navigation flex items-center space-x-2 bg-gray-50 dark:bg-gray-800 rounded-lg p-2">
        {writingSteps.map((step, index) => (
          <React.Fragment key={step.id}>
            <button
              onClick={() => setCurrentStep(step.id)}
              className={`step-item flex items-center space-x-1 px-2 py-1 rounded text-xs font-medium transition-all ${
                currentStep === step.id
                  ? 'bg-purple-600 text-white'
                  : completedSteps.includes(step.id)
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
              }`}
            >
              {completedSteps.includes(step.id) ? (
                <CheckCircle className="h-3 w-3" />
              ) : (
                <step.icon className="h-3 w-3" />
              )}
              <span className="hidden sm:inline">{step.title}</span>
              <span className="sm:hidden">{step.id}</span>
            </button>
            {index < writingSteps.length - 1 && (
              <ChevronRight className="h-3 w-3 text-gray-400" />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-2">
        <button
          onClick={toggleWritingArea}
          className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg text-sm font-medium hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors"
        >
          <Clock className="h-4 w-4" />
          <span>Start Writing Your Story</span>
        </button>
        <button
          onClick={generateStoryFromTemplate}
          className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-lg text-sm font-medium hover:bg-orange-200 dark:hover:bg-orange-900/50 transition-colors"
        >
          <Lightbulb className="h-4 w-4" />
          <span>Skip Template & Write Freely</span>
        </button>
      </div>

      {/* Collapsible Planning Section */}
      <div className="collapsible-section">
        <div 
          className="collapsible-header cursor-pointer"
          onClick={() => toggleSection('planning')}
        >
          <div className="flex items-center space-x-2">
            <Lightbulb className="h-4 w-4 text-blue-600" />
            <h3 className="text-sm font-medium">Initial Brainstorming</h3>
          </div>
          {expandedSections.planning ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </div>
        {expandedSections.planning && (
          <div className="collapsible-content">
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
              Capture your creative spark and initial ideas
            </p>
            <textarea
              value={templateData.planning}
              onChange={(e) => handleTemplateChange('planning', e.target.value)}
              placeholder="What's your story idea? Jot down any inspiration, themes, or concepts that come to mind..."
              className="w-full h-20 p-2 text-sm border border-gray-200 dark:border-gray-600 rounded-md resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
            <div className="mt-2 text-xs text-blue-600 dark:text-blue-400">
              💡 Don't worry about structure yet - just let your creativity flow!
            </div>
          </div>
        )}
      </div>

      {/* Current Step Content */}
      {writingSteps.map((step) => (
        currentStep === step.id && (
          <div key={step.id} className="collapsible-section border-2 border-green-200 dark:border-green-800">
            <div className="collapsible-header bg-green-50 dark:bg-green-900/20">
              <div className="flex items-center space-x-2">
                <step.icon className="h-4 w-4 text-green-600" />
                <h3 className="text-sm font-medium">Step {step.id}: {step.title}</h3>
              </div>
            </div>
            <div className="collapsible-content">
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                {step.description}
              </p>
              <textarea
                value={templateData[step.title.toLowerCase() as keyof TemplateData]}
                onChange={(e) => handleTemplateChange(step.title.toLowerCase() as keyof TemplateData, e.target.value)}
                placeholder={`Describe the ${step.title.toLowerCase()} of your story...`}
                className="w-full h-24 p-2 text-sm border border-gray-200 dark:border-gray-600 rounded-md resize-none focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
        )
      ))}

      {/* Writing Area */}
      {showWritingArea && (
        <div className="writing-area bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium">Your Story</h3>
            <button
              onClick={() => setShowWritingArea(false)}
              className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              Minimize
            </button>
          </div>
          <textarea
            value={content}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Start writing your narrative story here..."
            className="w-full h-40 p-2 text-sm border border-gray-200 dark:border-gray-600 rounded-md resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
        </div>
      )}
    </div>
  );
}