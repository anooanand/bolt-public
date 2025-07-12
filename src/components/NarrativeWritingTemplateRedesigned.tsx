import React, { useState, useEffect } from 'react';
import { BookOpen, ChevronDown, ChevronUp, HelpCircle, Lightbulb, Target, Users, MapPin, Zap, Sparkles, Clock, Star, CheckCircle, Layout, Maximize2 } from 'lucide-react';
import './enhanced-redesign.css';

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
    planning: false,
    setting: true,
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

  const handleGetSuggestions = async () => {
    const question = writingAssistant.customQuestion || writingAssistant.selectedQuestion;
    if (!question.trim()) return;

    setWritingAssistant(prev => ({ ...prev, isLoading: true }));
    
    // Enhanced mock suggestions based on NSW selective writing criteria
    setTimeout(() => {
      const mockSuggestions = [
        "Use the 'show, don't tell' technique to reveal character emotions through actions and dialogue",
        "Include sensory details (sight, sound, smell, touch, taste) to create vivid imagery",
        "Vary your sentence structure - mix short, punchy sentences with longer, descriptive ones",
        "Create tension through conflict, whether it's person vs. person, person vs. nature, or internal conflict",
        "Use dialogue to reveal character personality and advance the plot naturally",
        "Consider the story's pacing - build up to climactic moments with careful timing",
        "Include figurative language like metaphors and similes to enhance your descriptions",
        "Ensure your narrative has a clear beginning, middle, and end with satisfying resolution"
      ];
      
      // Select 3-4 random suggestions
      const selectedSuggestions = mockSuggestions
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.floor(Math.random() * 2) + 3);
      
      setWritingAssistant(prev => ({
        ...prev,
        suggestions: selectedSuggestions,
        isLoading: false
      }));
    }, 1500);
  };

  const countWords = (text: string): number => {
    if (!text || text.trim().length === 0) return 0;
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  const getCompletionPercentage = (): number => {
    const requiredFields = [templateData.setting, templateData.characters, templateData.plot];
    const completedFields = requiredFields.filter(field => field.trim().length > 0).length;
    return Math.round((completedFields / requiredFields.length) * 100);
  };

  const isTemplateComplete = templateData.setting.trim() && templateData.characters.trim() && templateData.plot.trim();

  const getStepColor = (step: typeof writingSteps[0]) => {
    const colors = {
      emerald: {
        bg: 'from-emerald-50 to-green-50',
        border: 'border-emerald-200',
        text: 'text-emerald-900',
        subtext: 'text-emerald-700',
        button: 'bg-gradient-to-br from-emerald-500 to-green-600',
        hover: 'hover:bg-emerald-100/50',
        focus: 'focus:ring-emerald-500 focus:border-emerald-500'
      },
      amber: {
        bg: 'from-amber-50 to-orange-50',
        border: 'border-amber-200',
        text: 'text-amber-900',
        subtext: 'text-amber-700',
        button: 'bg-gradient-to-br from-amber-500 to-orange-600',
        hover: 'hover:bg-amber-100/50',
        focus: 'focus:ring-amber-500 focus:border-amber-500'
      },
      blue: {
        bg: 'from-blue-50 to-cyan-50',
        border: 'border-blue-200',
        text: 'text-blue-900',
        subtext: 'text-blue-700',
        button: 'bg-gradient-to-br from-blue-500 to-cyan-600',
        hover: 'hover:bg-blue-100/50',
        focus: 'focus:ring-blue-500 focus:border-blue-500'
      },
      purple: {
        bg: 'from-purple-50 to-indigo-50',
        border: 'border-purple-200',
        text: 'text-purple-900',
        subtext: 'text-purple-700',
        button: 'bg-gradient-to-br from-purple-500 to-indigo-600',
        hover: 'hover:bg-purple-100/50',
        focus: 'focus:ring-purple-500 focus:border-purple-500'
      }
    };
    return colors[step.color as keyof typeof colors];
  };

  return (
    <div className="h-full flex bg-gray-50 writing-interface">
      {/* Main Content Area - Enhanced with better space utilization */}
      <div className="flex-1 flex flex-col bg-white primary-content">
        {/* Enhanced Header with Modern Design */}
        <div className="spacing-lg border-b border-gray-200 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-600 radius-2xl flex items-center justify-center mr-4 shadow-xl">
                  <BookOpen className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="flex items-center">
                    Narrative Writing Studio
                    <Sparkles className="w-6 h-6 text-purple-500 ml-2" />
                  </h1>
                  <p className="body-medium mt-1">Create compelling stories with guided planning and NSW-aligned structure</p>
                </div>
              </div>
              
              {/* Enhanced Progress Indicator */}
              <div className="text-right">
                <div className="body-small mb-1">Template Progress</div>
                <div className="flex items-center space-x-2">
                  <div className="progress-bar w-24">
                    <div 
                      className="progress-fill"
                      style={{ width: `${getCompletionPercentage()}%` }}
                    ></div>
                  </div>
                  <span className="body-small font-semibold text-gray-900">{getCompletionPercentage()}%</span>
                </div>
              </div>
            </div>
            
            {/* Compact Step Navigation */}
            <div className="flex items-center justify-between mt-6">
              <div className="flex items-center space-x-2">
                {writingSteps.map((step) => (
                  <button
                    key={step.id}
                    onClick={() => {
                      setCurrentStep(step.id);
                      const fieldName = step.title.toLowerCase() as keyof typeof expandedSections;
                      setExpandedSections(prev => ({
                        ...prev,
                        [fieldName]: true
                      }));
                    }}
                    className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      currentStep === step.id 
                        ? 'bg-indigo-600 text-white shadow-lg' 
                        : completedSteps.includes(step.id)
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${
                      completedSteps.includes(step.id) 
                        ? 'bg-green-500 text-white' 
                        : currentStep === step.id 
                          ? 'bg-white text-indigo-600' 
                          : 'bg-gray-300 text-gray-600'
                    }`}>
                      {completedSteps.includes(step.id) ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <span className="text-xs font-bold">{step.id}</span>
                      )}
                    </div>
                    <span className="hidden sm:inline">{step.title}</span>
                    <span className="sm:hidden">{step.id}</span>
                  </button>
                ))}
              </div>
              
              {/* Progress Summary */}
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-600">
                  <span className="font-semibold">{completedSteps.filter(s => s <= 3).length}/3</span> sections complete
                </div>
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${getCompletionPercentage()}%` }}
                  ></div>
                </div>
              </div>
            </div>
            
            {/* Enhanced Action Buttons */}
            <div className="flex items-center gap-md mt-6">
              <button
                onClick={generateStoryFromTemplate}
                disabled={!isTemplateComplete}
                className={`btn-primary interactive-element flex items-center ${
                  isTemplateComplete
                    ? ''
                    : 'opacity-50 cursor-not-allowed'
                }`}
              >
                <Target className="w-5 h-5 mr-2" />
                Start Writing Your Story
                <Sparkles className="w-4 h-4 ml-2" />
              </button>
              
              <button
                onClick={toggleWritingArea}
                className="btn-secondary interactive-element flex items-center"
              >
                <Zap className="w-5 h-5 mr-2" />
                Skip Template & Write Freely
              </button>
              
              <div className="status-info flex items-center">
                <Layout className="w-4 h-4 mr-1" />
                Space Optimized
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-hidden">
          {!showWritingArea ? (
            /* Enhanced Template Planning Interface */
            <div className="h-full overflow-y-auto">
              <div className="max-w-4xl mx-auto p-6 space-y-8">
                {/* Planning Notes */}
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-200 overflow-hidden shadow-sm">
                  <div 
                    className="p-6 cursor-pointer hover:bg-blue-100/50 transition-colors"
                    onClick={() => toggleSection('planning')}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                          <Lightbulb className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-blue-900">Initial Brainstorming</h3>
                          <p className="text-blue-700 text-sm">Capture your creative spark and initial ideas</p>
                        </div>
                      </div>
                      {expandedSections.planning ? 
                        <ChevronUp className="w-5 h-5 text-blue-600" /> : 
                        <ChevronDown className="w-5 h-5 text-blue-600" />
                      }
                    </div>
                  </div>
                  
                  {expandedSections.planning && (
                    <div className="px-6 pb-6">
                      <textarea
                        value={templateData.planning}
                        onChange={(e) => handleTemplateChange('planning', e.target.value)}
                        className="w-full h-32 p-4 border border-blue-200 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/80 backdrop-blur-sm transition-all"
                        placeholder="What's your story idea? Jot down any inspiration, themes, or concepts that come to mind..."
                      />
                      <p className="text-sm text-blue-600 mt-3 flex items-center">
                        <HelpCircle className="w-4 h-4 mr-1" />
                        Don't worry about structure yet - just let your creativity flow!
                      </p>
                    </div>
                  )}
                </div>

                {/* Enhanced Sections for each step */}
                {writingSteps.map((step) => {
                  const colors = getStepColor(step);
                  const fieldName = step.title.toLowerCase() as keyof TemplateData;
                  const isCompleted = completedSteps.includes(step.id);
                  
                  return (
                    <div key={step.id} className={`bg-gradient-to-br ${colors.bg} rounded-2xl border ${colors.border} overflow-hidden shadow-sm ${isCompleted ? 'ring-2 ring-green-300' : ''}`}>
                      <div 
                        className={`p-6 cursor-pointer ${colors.hover} transition-colors`}
                        onClick={() => {
                          toggleSection(fieldName as keyof typeof expandedSections);
                          setCurrentStep(step.id);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className={`w-12 h-12 ${colors.button} rounded-xl flex items-center justify-center mr-4 shadow-lg relative`}>
                              <step.icon className="w-6 h-6 text-white" />
                              {isCompleted && (
                                <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                                  <CheckCircle className="w-3 h-3 text-white" />
                                </div>
                              )}
                            </div>
                            <div className="flex items-center">
                              <div>
                                <h3 className={`text-xl font-semibold ${colors.text} flex items-center`}>
                                  Step {step.id}: {step.title}
                                  {isCompleted && <CheckCircle className="w-5 h-5 text-green-600 ml-2" />}
                                </h3>
                                <p className={`${colors.subtext} text-sm`}>{step.description}</p>
                              </div>
                            </div>
                          </div>
                          {expandedSections[fieldName as keyof typeof expandedSections] ? 
                            <ChevronUp className={`w-5 h-5 ${colors.subtext}`} /> : 
                            <ChevronDown className={`w-5 h-5 ${colors.subtext}`} />
                          }
                        </div>
                      </div>
                      
                      {expandedSections[fieldName as keyof typeof expandedSections] && (
                        <div className="px-6 pb-6">
                          <textarea
                            value={templateData[fieldName]}
                            onChange={(e) => handleTemplateChange(fieldName, e.target.value)}
                            className={`w-full h-40 p-4 border ${colors.border} rounded-xl resize-none focus:ring-2 ${colors.focus} bg-white/80 backdrop-blur-sm transition-all`}
                            placeholder={getPlaceholderText(step.title)}
                          />
                          <p className={`text-sm ${colors.subtext} mt-3 flex items-center`}>
                            <HelpCircle className="w-4 h-4 mr-1" />
                            {getHelpText(step.title)}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Enhanced Writing Area */
            <div className="h-full flex flex-col">
              {/* Writing Controls */}
              <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                  <button
                    onClick={toggleWritingArea}
                    className="flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-all shadow-md"
                  >
                    ← Back to Template
                  </button>
                  
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="text-gray-600">
                        Words: <span className="font-semibold text-gray-900">{countWords(content)}</span>
                      </span>
                      <span className="text-gray-600">
                        Target: <span className="font-semibold text-green-600">200-400 words</span>
                      </span>
                    </div>
                    <button
                      onClick={onSubmit}
                      disabled={countWords(content) < 50}
                      className={`flex items-center px-6 py-2 rounded-lg font-medium transition-all ${
                        countWords(content) >= 50
                          ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      <Target className="w-4 h-4 mr-2" />
                      Submit Story
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 p-6">
                <div className="max-w-4xl mx-auto h-full">
                  <textarea
                    value={content}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full h-full p-6 border border-gray-300 rounded-xl resize-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white shadow-sm"
                    placeholder="Start writing your narrative here... Remember to include vivid descriptions, engaging dialogue, and a clear story structure."
                    style={{ 
                      fontSize: '16px',
                      lineHeight: '1.7',
                      fontFamily: 'inherit'
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Sidebar - Writing Assistant - 30% */}
      <div className="w-96 bg-white border-l border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-indigo-50">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center">
            <Sparkles className="w-5 h-5 text-purple-600 mr-2" />
            AI Writing Coach
          </h2>
          <p className="text-sm text-gray-600 mt-1">NSW-aligned guidance and support</p>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Enhanced Progress Tracking */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
            <h3 className="font-semibold text-green-900 mb-3 flex items-center">
              <Target className="w-4 h-4 mr-2" />
              Writing Progress
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-green-700">Template Completion</span>
                <span className="text-sm font-semibold text-green-900">{getCompletionPercentage()}%</span>
              </div>
              <div className="w-full bg-green-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-500 flex items-center justify-end pr-2"
                  style={{ width: `${getCompletionPercentage()}%` }}
                >
                  {getCompletionPercentage() > 20 && (
                    <span className="text-xs text-white font-semibold">{getCompletionPercentage()}%</span>
                  )}
                </div>
              </div>
              
              {/* Step checklist */}
              <div className="space-y-2 mt-4">
                {writingSteps.map((step) => (
                  <div key={step.id} className="flex items-center text-sm">
                    <div className={`w-4 h-4 rounded-full mr-2 flex items-center justify-center ${
                      completedSteps.includes(step.id) ? 'bg-green-500' : 'bg-gray-200'
                    }`}>
                      {completedSteps.includes(step.id) && (
                        <CheckCircle className="w-3 h-3 text-white" />
                      )}
                    </div>
                    <span className={completedSteps.includes(step.id) ? 'text-green-700 font-medium' : 'text-gray-600'}>
                      {step.title}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="text-xs text-green-600 mt-3 p-2 bg-green-100 rounded-lg">
                {isTemplateComplete ? 
                  "🎉 Excellent! You're ready to start writing your narrative!" : 
                  `Complete ${3 - completedSteps.filter(s => s <= 3).length} more sections to unlock writing mode`
                }
              </div>
            </div>
          </div>

          {/* Enhanced Writing Buddy */}
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-4 border border-purple-200">
            <h3 className="font-semibold text-purple-900 mb-4 flex items-center">
              <HelpCircle className="w-4 h-4 mr-2" />
              NSW Writing Coach
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-purple-700 mb-2">
                  Quick Questions
                </label>
                <select
                  value={writingAssistant.selectedQuestion}
                  onChange={(e) => setWritingAssistant(prev => ({ ...prev, selectedQuestion: e.target.value }))}
                  className="w-full p-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white text-sm"
                >
                  <option value="">Choose a question...</option>
                  {predefinedQuestions.map((question, index) => (
                    <option key={index} value={question}>{question}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-purple-700 mb-2">
                  Or ask your own question
                </label>
                <textarea
                  value={writingAssistant.customQuestion}
                  onChange={(e) => setWritingAssistant(prev => ({ ...prev, customQuestion: e.target.value }))}
                  className="w-full p-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white text-sm resize-none"
                  rows={3}
                  placeholder="Ask me anything about narrative writing techniques, character development, plot structure..."
                />
              </div>

              <button
                onClick={handleGetSuggestions}
                disabled={writingAssistant.isLoading || (!writingAssistant.selectedQuestion && !writingAssistant.customQuestion.trim())}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${
                  writingAssistant.isLoading || (!writingAssistant.selectedQuestion && !writingAssistant.customQuestion.trim())
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg'
                }`}
              >
                {writingAssistant.isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Getting Suggestions...
                  </div>
                ) : (
                  'Get NSW-Aligned Suggestions'
                )}
              </button>

              {writingAssistant.suggestions.length > 0 && (
                <div className="mt-4 p-4 bg-white rounded-lg border border-purple-200 shadow-sm">
                  <h4 className="font-medium text-purple-900 mb-3 flex items-center">
                    <Lightbulb className="w-4 h-4 mr-2" />
                    Writing Suggestions:
                  </h4>
                  <ul className="space-y-3">
                    {writingAssistant.suggestions.map((suggestion, index) => (
                      <li key={index} className="text-sm text-purple-700 flex items-start p-2 bg-purple-50 rounded-lg">
                        <span className="text-purple-500 mr-2 mt-0.5">💡</span>
                        <span>{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Enhanced Word Magic */}
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-4 border border-orange-200">
            <h3 className="font-semibold text-orange-900 mb-3 flex items-center">
              <Zap className="w-4 h-4 mr-2" />
              Vocabulary Enhancer
            </h3>
            <p className="text-sm text-orange-700 mb-3">
              Discover powerful words to elevate your narrative
            </p>
            <div className="space-y-2">
              <button className="w-full py-2 px-4 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-lg font-medium transition-all text-sm">
                Character Descriptors
              </button>
              <button className="w-full py-2 px-4 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white rounded-lg font-medium transition-all text-sm">
                Setting Words
              </button>
              <button className="w-full py-2 px-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white rounded-lg font-medium transition-all text-sm">
                Action Verbs
              </button>
            </div>
          </div>

          {/* Writing Tips */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-3 flex items-center">
              <Star className="w-4 h-4 mr-2" />
              NSW Writing Tips
            </h3>
            <div className="space-y-2 text-sm text-blue-700">
              <div className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Use varied sentence beginnings to create rhythm</span>
              </div>
              <div className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Include dialogue to bring characters to life</span>
              </div>
              <div className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Show emotions through actions, not just words</span>
              </div>
              <div className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>End with a satisfying resolution</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper functions
function getPlaceholderText(stepTitle: string): string {
  switch (stepTitle) {
    case 'Setting':
      return 'Describe where and when your story takes place. Include details about the location, time period, weather, atmosphere, and any important environmental factors that will influence your story...';
    case 'Characters':
      return 'Who are the main characters in your story? Describe their personalities, appearance, relationships, goals, and what makes them unique. Include both protagonists and antagonists...';
    case 'Plot':
      return 'Outline the main events of your story. What happens first? What conflict or problem drives the story forward? How do events build to a climax? How is the conflict resolved?...';
    case 'Theme':
      return 'What deeper meaning or message do you want to convey? What should readers learn or feel after reading your story? This could be about friendship, courage, growing up, or any important life lesson...';
    default:
      return 'Enter your ideas here...';
  }
}

function getHelpText(stepTitle: string): string {
  switch (stepTitle) {
    case 'Setting':
      return 'Use all five senses - what can be seen, heard, smelled, felt, or tasted in this place?';
    case 'Characters':
      return 'Think about their motivations, fears, strengths, and how they change throughout the story';
    case 'Plot':
      return 'Remember: Beginning (setup) → Middle (conflict/rising action) → End (climax/resolution)';
    case 'Theme':
      return 'This is optional but adds depth - what universal truth does your story explore?';
    default:
      return 'Take your time and be creative!';
  }
}