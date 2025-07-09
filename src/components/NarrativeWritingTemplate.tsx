import React, { useState, useEffect } from 'react';
import { BookOpen } from 'lucide-react';

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
  plot: string;
  resolution: string;
}

export function NarrativeWritingTemplate({ content, onChange, onTimerStart, onSubmit }: NarrativeWritingTemplateProps) {
  const [templateData, setTemplateData] = useState<TemplateData>({
    planning: '',
    setting: '',
    characters: '',
    plot: '',
    resolution: ''
  });
  
  const [showWritingArea, setShowWritingArea] = useState(false);

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

  const generateStoryFromTemplate = () => {
    const { setting, characters, plot, resolution } = templateData;
    
    let generatedStory = '';
    
    if (setting.trim()) {
      generatedStory += `Setting: ${setting}\n\n`;
    }
    
    if (characters.trim()) {
      generatedStory += `Characters: ${characters}\n\n`;
    }
    
    if (plot.trim()) {
      generatedStory += `Plot: ${plot}\n\n`;
    }
    
    if (resolution.trim()) {
      generatedStory += `Resolution: ${resolution}\n\n`;
    }
    
    generatedStory += '--- Start writing your narrative below ---\n\n';
    
    onChange(generatedStory);
    setShowWritingArea(true);
  };

  const toggleWritingArea = () => {
    setShowWritingArea(!showWritingArea);
  };

  const countWords = (text: string): number => {
    if (!text || text.trim().length === 0) return 0;
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  const isTemplateComplete = templateData.setting.trim() && 
                            templateData.characters.trim() && 
                            templateData.plot.trim() && 
                            templateData.resolution.trim();

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-800">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <BookOpen className="w-6 h-6 text-purple-600 dark:text-purple-400 mr-3" />
            <div>
              <h2 className="text-xl font-bold text-purple-900 dark:text-purple-100">Narrative Writing Template</h2>
              <p className="text-sm text-purple-700 dark:text-purple-300">Plan your story before you write!</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={generateStoryFromTemplate}
              disabled={!isTemplateComplete}
              className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all ${
                isTemplateComplete
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <BookOpen className="w-5 h-5 mr-2" />
              Start Writing Your Story
            </button>
            
            <button
              onClick={toggleWritingArea}
              className="flex items-center px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-all"
            >
              Skip Template & Write Freely
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        {!showWritingArea ? (
          /* Template Planning Interface */
          <div className="h-full overflow-y-auto p-6">
            <div className="max-w-3xl mx-auto space-y-6">
              {/* Planning Box */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-700">
                <div className="flex items-center mb-3">
                  <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">Planning Notes</h3>
                </div>
                <textarea
                  value={templateData.planning}
                  onChange={(e) => handleTemplateChange('planning', e.target.value)}
                  className="w-full h-24 p-3 border border-blue-300 dark:border-blue-600 rounded-md resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                  placeholder="Jot down your initial ideas, themes, or inspiration for your narrative..."
                />
                <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
                  Use this space to brainstorm and organize your thoughts before filling in the template below.
                </p>
              </div>

              {/* Template Boxes - Vertical Layout */}
              <div className="space-y-6">
                {/* Setting */}
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-700">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white font-bold text-sm">1</span>
                    </div>
                    <h3 className="text-lg font-semibold text-green-900 dark:text-green-100">Setting</h3>
                  </div>
                  <textarea
                    value={templateData.setting}
                    onChange={(e) => handleTemplateChange('setting', e.target.value)}
                    className="w-full h-32 p-3 border border-green-300 dark:border-green-600 rounded-md resize-none focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-800 dark:text-white"
                    placeholder="Where and when does your story take place? Describe the location, time period, atmosphere..."
                  />
                  <p className="text-xs text-green-600 dark:text-green-400 mt-2">
                    Include details about place, time, weather, mood, and atmosphere.
                  </p>
                </div>

                {/* Characters */}
                <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 border border-orange-200 dark:border-orange-700">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white font-bold text-sm">2</span>
                    </div>
                    <h3 className="text-lg font-semibold text-orange-900 dark:text-orange-100">Characters</h3>
                  </div>
                  <textarea
                    value={templateData.characters}
                    onChange={(e) => handleTemplateChange('characters', e.target.value)}
                    className="w-full h-32 p-3 border border-orange-300 dark:border-orange-600 rounded-md resize-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-800 dark:text-white"
                    placeholder="Who are the main characters? Describe their personalities, appearance, relationships..."
                  />
                  <p className="text-xs text-orange-600 dark:text-orange-400 mt-2">
                    Include main character, supporting characters, their traits and motivations.
                  </p>
                </div>

                {/* Plot */}
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-700">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white font-bold text-sm">3</span>
                    </div>
                    <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100">Plot</h3>
                  </div>
                  <textarea
                    value={templateData.plot}
                    onChange={(e) => handleTemplateChange('plot', e.target.value)}
                    className="w-full h-32 p-3 border border-purple-300 dark:border-purple-600 rounded-md resize-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-800 dark:text-white"
                    placeholder="What happens in your story? Describe the main events, conflict, rising action, climax..."
                  />
                  <p className="text-xs text-purple-600 dark:text-purple-400 mt-2">
                    Include the problem/conflict, main events, and turning points.
                  </p>
                </div>

                {/* Resolution */}
                <div className="bg-pink-50 dark:bg-pink-900/20 rounded-lg p-4 border border-pink-200 dark:border-pink-700">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white font-bold text-sm">4</span>
                    </div>
                    <h3 className="text-lg font-semibold text-pink-900 dark:text-pink-100">Resolution</h3>
                  </div>
                  <textarea
                    value={templateData.resolution}
                    onChange={(e) => handleTemplateChange('resolution', e.target.value)}
                    className="w-full h-32 p-3 border border-pink-300 dark:border-pink-600 rounded-md resize-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-800 dark:text-white"
                    placeholder="How does your story end? How is the conflict resolved? What happens to the characters?"
                  />
                  <p className="text-xs text-pink-600 dark:text-pink-400 mt-2">
                    Include how the problem is solved and what happens to the characters.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Writing Area */
          <div className="h-full flex flex-col">
            {/* Writing Timer (25 minutes) */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
              <div className="flex items-center justify-between">
                <button
                  onClick={toggleWritingArea}
                  className="flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-all"
                >
                  ← Back to Template
                </button>
                
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Words: {countWords(content)}
                  </span>
                  <button
                    onClick={onSubmit}
                    disabled={countWords(content) < 50}
                    className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all ${
                      countWords(content) >= 50
                        ? 'bg-green-600 hover:bg-green-700 text-white'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Submit Story
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex-1 p-4">
              <textarea
                value={content}
                onChange={(e) => onChange(e.target.value)}
                className="w-full h-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-800 dark:text-white"
                placeholder="Start writing your narrative here..."
                style={{ 
                  fontSize: '16px',
                  lineHeight: '1.6',
                  fontFamily: 'inherit'
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
