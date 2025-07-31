import React, { useState, useEffect } from 'react';
import { Lightbulb, Type, Save, Settings, Sparkles, ChevronDown, ChevronUp, Users, Target, Star, CheckCircle } from 'lucide-react';
import { InteractiveTextEditor } from './InteractiveTextEditor'; // Updated import
import { getNSWSelectiveFeedback } from '../lib/openai';

interface NarrativeWritingTemplateRedesignedProps {
  content: string;
  onChange: (content: string) => void;
  prompt?: string;
  onPromptChange?: (prompt: string) => void;
}

interface TemplateData {
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
    setting: '',
    characters: '',
    plot: '',
    theme: ''
  });
  
  const [showPlanning, setShowPlanning] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [characterCount, setCharacterCount] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  // Calculate word and character count
  useEffect(() => {
    const words = content.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
    setCharacterCount(content.length);
  }, [content]);

  const writingSteps = [
    { id: 1, title: "Setting", icon: Settings, description: "Where and when your story unfolds", field: 'setting' as keyof TemplateData },
    { id: 2, title: "Characters", icon: Users, description: "The people who bring your story to life", field: 'characters' as keyof TemplateData },
    { id: 3, title: "Plot", icon: Target, description: "The sequence of events in your story", field: 'plot' as keyof TemplateData },
    { id: 4, title: "Theme", icon: Star, description: "The deeper meaning or message", field: 'theme' as keyof TemplateData }
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

  const togglePlanning = () => {
    setShowPlanning(!showPlanning);
  };

  // AI Feedback function for the enhanced editor
  const handleGetFeedback = async (content: string) => {
    try {
      return await getNSWSelectiveFeedback(content, 'narrative', 'detailed', []);
    } catch (error) {
      console.error('Error getting NSW Selective feedback:', error);
      return null;
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Writing Toolbar */}
        <div className="bg-white border-b border-gray-200 p-4 shadow-sm">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-6">
              {/* Planning Toggle */}
              <div className="flex items-center space-x-3">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showPlanning}
                    onChange={togglePlanning}
                    className="sr-only"
                  />
                  <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    showPlanning ? 'bg-blue-600' : 'bg-gray-300'
                  }`}>
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      showPlanning ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-700">
                    {showPlanning ? 'Hide Planning' : 'Show Planning'}
                  </span>
                </label>
              </div>

              {/* Word Count */}
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Type className="w-4 h-4" />
                <span className="font-medium">{wordCount} words</span>
                <span>•</span>
                <span>{characterCount} characters</span>
              </div>

              {/* Progress (if planning is shown) */}
              {showPlanning && (
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <span>Planning Progress:</span>
                  <span className="font-medium text-blue-600">{getProgressPercentage()}%</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <button className="flex items-center space-x-2 px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
                <Save className="w-4 h-4" />
                <span>Auto-save</span>
              </button>
            </div>
          </div>
        </div>

        {/* Planning Section (Collapsible) */}
        {showPlanning && (
          <div className="bg-white border-b border-gray-200 p-4 shadow-sm">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {writingSteps.map((step) => (
                  <div key={step.id} className="space-y-2">
                    <div className="flex items-center space-x-2">
                      {completedSteps.includes(step.id) ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <step.icon className="w-5 h-5 text-gray-400" />
                      )}
                      <label className="font-medium text-gray-700">{step.title}</label>
                    </div>
                    <textarea
                      value={templateData[step.field]}
                      onChange={(e) => handleTemplateChange(step.field, e.target.value)}
                      placeholder={step.description}
                      className="w-full h-20 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Main Writing Area - Enhanced with AI Grammar Checking and Interactive Highlighting */}
        <div className="flex-1 p-6 bg-white">
          <div className="max-w-4xl mx-auto h-full">
            <InteractiveTextEditor
              content={content}
              onChange={onChange}
              placeholder="Start writing your amazing story here! Let your creativity flow and bring your ideas to life... ✨"
              className="w-full h-full"
              textType="narrative"
              onGetFeedback={handleGetFeedback}
              // Removed style prop as it's handled internally by InteractiveTextEditor
            />
          </div>
        </div>

        {/* Writing Tips (Bottom) */}
        {wordCount < 50 && (
          <div className="bg-blue-50 border-t border-blue-200 p-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center space-x-2 text-blue-700">
                <Lightbulb className="w-4 h-4" />
                <span className="font-medium">Writing Tip:</span>
              </div>
              <p className="text-blue-600 text-sm mt-1">
                Start with a strong opening that grabs your reader's attention. Don't worry about making it perfect - you can always revise it later!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
