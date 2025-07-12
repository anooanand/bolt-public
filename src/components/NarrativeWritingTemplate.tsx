import React, { useState, useEffect } from 'react';
import { BookOpen, ChevronDown, ChevronUp, HelpCircle, Lightbulb, Target, Users, MapPin, Zap, Sparkles } from 'lucide-react';

interface NarrativeWritingTemplateProps {
  content: string;
  onChange: (content: string) => void;
  onTimerStart: (shouldStart: boolean) => void;
  onSubmit: () => void;
}

interface TemplateData {
  planning: string;
  setting: string;
  characters: string;
}

interface WritingAssistantState {
  selectedQuestion: string;
  customQuestion: string;
  suggestions: string[];
  isLoading: boolean;
}

export function NarrativeWritingTemplate({ content, onChange, onTimerStart, onSubmit }: NarrativeWritingTemplateProps) {
  const [templateData, setTemplateData] = useState<TemplateData>({
    planning: '',
    setting: '',
    characters: ''
  });
  
  const [showWritingArea, setShowWritingArea] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    planning: true,
    setting: true,
    characters: true
  });
  
  const [writingAssistant, setWritingAssistant] = useState<WritingAssistantState>({
    selectedQuestion: '',
    customQuestion: '',
    suggestions: [],
    isLoading: false
  });

  const predefinedQuestions = [
    "What makes my main character unique?",
    "How can I make my setting more vivid?",
    "What conflict will drive my story forward?",
    "How should I start my narrative?",
    "What emotions do I want readers to feel?",
    "How can I show character development?",
    "What details will bring my story to life?"
  ];

  // Load saved template data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('narrativeTemplateData');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setTemplateData(parsed);
      } catch (error) {
        console.error('Error loading saved template data:', error);
      }
    }
  }, []);

  // Save template data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('narrativeTemplateData', JSON.stringify(templateData));
  }, [templateData]);

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
    const { setting, characters } = templateData;
    
    let generatedStory = '';
    
    if (setting.trim()) {
      generatedStory += `Setting: ${setting}\n\n`;
    }
    
    if (characters.trim()) {
      generatedStory += `Characters: ${characters}\n\n`;
    }
    
    generatedStory += '--- Start writing your narrative below ---\n\n';
    
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
    
    // Simulate API call for suggestions
    setTimeout(() => {
      const mockSuggestions = [
        "Consider adding sensory details to make your scene more immersive",
        "Think about your character's motivation and what drives them",
        "Use dialogue to reveal character personality and advance the plot",
        "Create tension through conflict between characters or internal struggles"
      ];
      
      setWritingAssistant(prev => ({
        ...prev,
        suggestions: mockSuggestions,
        isLoading: false
      }));
    }, 1500);
  };

  const countWords = (text: string): number => {
    if (!text || text.trim().length === 0) return 0;
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  const getCompletionPercentage = (): number => {
    const fields = [templateData.setting, templateData.characters];
    const completedFields = fields.filter(field => field.trim().length > 0).length;
    return Math.round((completedFields / fields.length) * 100);
  };

  const isTemplateComplete = templateData.setting.trim() && templateData.characters.trim();

  return (
    <div className="h-full flex bg-gray-50">
      {/* Main Content Area - 70% */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-purple-50">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Narrative Writing Template</h1>
                  <p className="text-gray-600 mt-1">Create compelling stories with structured planning</p>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center space-x-4 mt-6">
              <button
                onClick={generateStoryFromTemplate}
                disabled={!isTemplateComplete}
                className={`flex items-center px-8 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg ${
                  isTemplateComplete
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-indigo-200'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                }`}
              >
                <Target className="w-5 h-5 mr-2" />
                Start Writing Your Story
              </button>
              
              <button
                onClick={toggleWritingArea}
                className="flex items-center px-6 py-3 bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-700 rounded-xl font-medium transition-all hover:shadow-md"
              >
                <Zap className="w-5 h-5 mr-2" />
                Skip Template & Write Freely
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-hidden">
          {!showWritingArea ? (
            /* Template Planning Interface */
            <div className="h-full overflow-y-auto">
              <div className="max-w-4xl mx-auto p-6 space-y-8">
                {/* Writing Prompt Section - Moved to top */}
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-200 overflow-hidden shadow-sm">
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center mr-4">
                        <Sparkles className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-indigo-900">Writing Prompt</h3>
                        <p className="text-indigo-700 text-sm">Your creative inspiration starts here</p>
                      </div>
                    </div>
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-indigo-200">
                      <p className="text-gray-700 leading-relaxed">
                        Write a narrative story that takes your readers on an emotional journey. Consider the setting, characters, and plot that will bring your story to life. Use vivid descriptions and engaging dialogue to create a compelling narrative.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Planning Notes */}
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-200 overflow-hidden shadow-sm">
                  <div 
                    className="p-6 cursor-pointer hover:bg-blue-100/50 transition-colors"
                    onClick={() => toggleSection('planning')}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center mr-4">
                          <Lightbulb className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-blue-900">Planning Notes</h3>
                          <p className="text-blue-700 text-sm">Brainstorm your initial ideas and inspiration</p>
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
                        placeholder="Jot down your initial ideas, themes, or inspiration for your narrative..."
                      />
                      <p className="text-sm text-blue-600 mt-3 flex items-center">
                        <HelpCircle className="w-4 h-4 mr-1" />
                        Use this space to capture your creative spark before diving into the details
                      </p>
                    </div>
                  )}
                </div>

                {/* Setting */}
                <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl border border-emerald-200 overflow-hidden shadow-sm">
                  <div 
                    className="p-6 cursor-pointer hover:bg-emerald-100/50 transition-colors"
                    onClick={() => toggleSection('setting')}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                          <span className="text-white font-bold text-lg">1</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-5 h-5 text-emerald-600 mr-2" />
                          <div>
                            <h3 className="text-xl font-semibold text-emerald-900">Setting</h3>
                            <p className="text-emerald-700 text-sm">Where and when your story unfolds</p>
                          </div>
                        </div>
                      </div>
                      {expandedSections.setting ? 
                        <ChevronUp className="w-5 h-5 text-emerald-600" /> : 
                        <ChevronDown className="w-5 h-5 text-emerald-600" />
                      }
                    </div>
                  </div>
                  
                  {expandedSections.setting && (
                    <div className="px-6 pb-6">
                      <textarea
                        value={templateData.setting}
                        onChange={(e) => handleTemplateChange('setting', e.target.value)}
                        className="w-full h-40 p-4 border border-emerald-200 rounded-xl resize-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white/80 backdrop-blur-sm transition-all"
                        placeholder="Where and when does your story take place? Describe the location, time period, atmosphere..."
                      />
                      <p className="text-sm text-emerald-600 mt-3 flex items-center">
                        <HelpCircle className="w-4 h-4 mr-1" />
                        Include sensory details: what can be seen, heard, smelled, felt, or tasted?
                      </p>
                    </div>
                  )}
                </div>

                {/* Characters */}
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-200 overflow-hidden shadow-sm">
                  <div 
                    className="p-6 cursor-pointer hover:bg-amber-100/50 transition-colors"
                    onClick={() => toggleSection('characters')}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                          <span className="text-white font-bold text-lg">2</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="w-5 h-5 text-amber-600 mr-2" />
                          <div>
                            <h3 className="text-xl font-semibold text-amber-900">Characters</h3>
                            <p className="text-amber-700 text-sm">The people who bring your story to life</p>
                          </div>
                        </div>
                      </div>
                      {expandedSections.characters ? 
                        <ChevronUp className="w-5 h-5 text-amber-600" /> : 
                        <ChevronDown className="w-5 h-5 text-amber-600" />
                      }
                    </div>
                  </div>
                  
                  {expandedSections.characters && (
                    <div className="px-6 pb-6">
                      <textarea
                        value={templateData.characters}
                        onChange={(e) => handleTemplateChange('characters', e.target.value)}
                        className="w-full h-40 p-4 border border-amber-200 rounded-xl resize-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white/80 backdrop-blur-sm transition-all"
                        placeholder="Who are the main characters? Describe their personalities, appearance, relationships..."
                      />
                      <p className="text-sm text-amber-600 mt-3 flex items-center">
                        <HelpCircle className="w-4 h-4 mr-1" />
                        Think about their goals, fears, and what makes them unique
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* Writing Area */
            <div className="h-full flex flex-col">
              {/* Writing Controls */}
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                  <button
                    onClick={toggleWritingArea}
                    className="flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-all"
                  >
                    ← Back to Template
                  </button>
                  
                  <div className="flex items-center space-x-6">
                    <span className="text-sm text-gray-600">
                      Words: <span className="font-semibold text-gray-900">{countWords(content)}</span>
                    </span>
                    <button
                      onClick={onSubmit}
                      disabled={countWords(content) < 50}
                      className={`flex items-center px-6 py-2 rounded-lg font-medium transition-all ${
                        countWords(content) >= 50
                          ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
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
                    placeholder="Start writing your narrative here..."
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

      {/* Sidebar - Writing Assistant - 30% */}
      <div className="w-96 bg-white border-l border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-indigo-50">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center">
            <Lightbulb className="w-5 h-5 text-purple-600 mr-2" />
            Writing Assistant
          </h2>
          <p className="text-sm text-gray-600 mt-1">Get help and track your progress</p>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Progress Tracking */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
            <h3 className="font-semibold text-green-900 mb-3 flex items-center">
              <Target className="w-4 h-4 mr-2" />
              Template Progress
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-green-700">Completion</span>
                <span className="text-sm font-semibold text-green-900">{getCompletionPercentage()}%</span>
              </div>
              <div className="w-full bg-green-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${getCompletionPercentage()}%` }}
                ></div>
              </div>
              <div className="text-xs text-green-600">
                {isTemplateComplete ? 
                  "✓ Ready to start writing!" : 
                  "Complete the template sections to unlock writing mode"
                }
              </div>
            </div>
          </div>

          {/* Writing Buddy */}
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-4 border border-purple-200">
            <h3 className="font-semibold text-purple-900 mb-4 flex items-center">
              <HelpCircle className="w-4 h-4 mr-2" />
              Writing Buddy
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
                  placeholder="Ask me anything about your writing..."
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
                {writingAssistant.isLoading ? 'Getting Suggestions...' : 'Get Suggestions'}
              </button>

              {writingAssistant.suggestions.length > 0 && (
                <div className="mt-4 p-3 bg-white rounded-lg border border-purple-200">
                  <h4 className="font-medium text-purple-900 mb-2">Suggestions:</h4>
                  <ul className="space-y-2">
                    {writingAssistant.suggestions.map((suggestion, index) => (
                      <li key={index} className="text-sm text-purple-700 flex items-start">
                        <span className="text-purple-500 mr-2">•</span>
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Word Magic */}
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-4 border border-orange-200">
            <h3 className="font-semibold text-orange-900 mb-3 flex items-center">
              <Zap className="w-4 h-4 mr-2" />
              Word Magic
            </h3>
            <p className="text-sm text-orange-700 mb-3">
              Enhance your vocabulary and writing style
            </p>
            <button className="w-full py-2 px-4 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-lg font-medium transition-all text-sm">
              Discover Power Words
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}