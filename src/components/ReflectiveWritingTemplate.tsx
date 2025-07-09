import React, { useState, useEffect } from 'react';
import { Clock, Play, Pause, RotateCcw, Heart, Lightbulb, Eye, CheckCircle, Send, ThoughtBubble } from 'lucide-react';

interface ReflectiveWritingTemplateProps {
  content: string;
  onChange: (content: string) => void;
  onTimerStart: (shouldStart: boolean) => void;
  onSubmit: () => void;
}

interface TemplateData {
  planning: string;
  experience: string;
  feelings: string;
  thoughts: string;
  learning: string;
  future: string;
}

export function ReflectiveWritingTemplate({ content, onChange, onTimerStart, onSubmit }: ReflectiveWritingTemplateProps) {
  const [templateData, setTemplateData] = useState<TemplateData>({
    planning: '',
    experience: '',
    feelings: '',
    thoughts: '',
    learning: '',
    future: ''
  });
  
  // Planning timer (5 minutes)
  const [planningMinutes, setPlanningMinutes] = useState(5);
  const [planningSeconds, setPlanningSeconds] = useState(0);
  const [isPlanningTimerActive, setIsPlanningTimerActive] = useState(false);
  const [isPlanningTimerCompleted, setIsPlanningTimerCompleted] = useState(false);
  
  // Writing timer (25 minutes)
  const [writingMinutes, setWritingMinutes] = useState(25);
  const [writingSecondsState, setWritingSecondsState] = useState(0);
  const [isWritingTimerActive, setIsWritingTimerActive] = useState(false);
  const [isWritingTimerCompleted, setIsWritingTimerCompleted] = useState(false);
  
  const [showWritingArea, setShowWritingArea] = useState(false);

  // Load saved template data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('reflectiveTemplateData');
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
    localStorage.setItem('reflectiveTemplateData', JSON.stringify(templateData));
  }, [templateData]);

  // Planning timer functionality
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isPlanningTimerActive && !isPlanningTimerCompleted) {
      interval = setInterval(() => {
        if (planningSeconds > 0) {
          setPlanningSeconds(planningSeconds - 1);
        } else if (planningMinutes > 0) {
          setPlanningMinutes(planningMinutes - 1);
          setPlanningSeconds(59);
        } else {
          setIsPlanningTimerActive(false);
          setIsPlanningTimerCompleted(true);
          // Show notification
          if (Notification.permission === 'granted') {
            new Notification('Planning time is up!', {
              body: 'Time to fill in your reflective writing template!',
              icon: '/favicon.ico'
            });
          }
        }
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlanningTimerActive, planningMinutes, planningSeconds, isPlanningTimerCompleted]);

  // Writing timer functionality
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isWritingTimerActive && !isWritingTimerCompleted) {
      interval = setInterval(() => {
        if (writingSecondsState > 0) {
          setWritingSecondsState(writingSecondsState - 1);
        } else if (writingMinutes > 0) {
          setWritingMinutes(writingMinutes - 1);
          setWritingSecondsState(59);
        } else {
          setIsWritingTimerActive(false);
          setIsWritingTimerCompleted(true);
          onTimerStart(false);
          // Show notification
          if (Notification.permission === 'granted') {
            new Notification('Writing time is up!', {
              body: 'Great job on your reflective writing!',
              icon: '/favicon.ico'
            });
          }
        }
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isWritingTimerActive, writingMinutes, writingSecondsState, isWritingTimerCompleted, onTimerStart]);

  // Request notification permission on component mount
  useEffect(() => {
    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  const handleTemplateChange = (field: keyof TemplateData, value: string) => {
    setTemplateData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const startPlanningTimer = () => {
    setIsPlanningTimerActive(true);
  };

  const pausePlanningTimer = () => {
    setIsPlanningTimerActive(false);
  };

  const resetPlanningTimer = () => {
    setIsPlanningTimerActive(false);
    setPlanningMinutes(5);
    setPlanningSeconds(0);
    setIsPlanningTimerCompleted(false);
  };

  const startWritingTimer = () => {
    setIsWritingTimerActive(true);
    onTimerStart(true);
  };

  const pauseWritingTimer = () => {
    setIsWritingTimerActive(false);
  };

  const resetWritingTimer = () => {
    setIsWritingTimerActive(false);
    setWritingMinutes(25);
    setWritingSecondsState(0);
    setIsWritingTimerCompleted(false);
  };

  const generateEssayFromTemplate = () => {
    const { experience, feelings, thoughts, learning, future } = templateData;
    
    let generatedEssay = '';
    
    if (experience.trim()) {
      generatedEssay += `Experience: ${experience}\n\n`;
    }
    
    if (feelings.trim()) {
      generatedEssay += `Feelings: ${feelings}\n\n`;
    }
    
    if (thoughts.trim()) {
      generatedEssay += `Thoughts: ${thoughts}\n\n`;
    }
    
    if (learning.trim()) {
      generatedEssay += `What I Learned: ${learning}\n\n`;
    }
    
    if (future.trim()) {
      generatedEssay += `Future Applications: ${future}\n\n`;
    }
    
    generatedEssay += '--- Start writing your reflective essay below ---\n\n';
    
    onChange(generatedEssay);
    setShowWritingArea(true);
  };

  const toggleWritingArea = () => {
    setShowWritingArea(!showWritingArea);
  };

  const countWords = (text: string): number => {
    if (!text || text.trim().length === 0) return 0;
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  const isTemplateComplete = templateData.experience.trim() && 
                            templateData.feelings.trim() && 
                            templateData.thoughts.trim() && 
                            templateData.learning.trim();

  // Feeling words for reflective writing
  const feelingWords = [
    'excited', 'nervous', 'proud', 'confused', 'surprised',
    'disappointed', 'grateful', 'frustrated', 'curious', 'confident',
    'worried', 'amazed', 'relieved', 'inspired', 'challenged'
  ];

  // Reflection starters
  const reflectionStarters = [
    'I realized that...',
    'This experience taught me...',
    'I was surprised to discover...',
    'Looking back, I understand...',
    'Next time, I would...'
  ];

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-800">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
        <div className="flex items-center">
          <Eye className="w-6 h-6 text-purple-600 dark:text-purple-400 mr-3" />
          <div>
            <h2 className="text-xl font-bold text-purple-900 dark:text-purple-100">Reflective Writing Template</h2>
            <p className="text-sm text-purple-700 dark:text-purple-300">Think deeply about your experiences and what you learned!</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        {!showWritingArea ? (
          /* Template Planning Interface */
          <div className="h-full overflow-y-auto p-6">
            <div className="max-w-3xl mx-auto space-y-6">
              
              {/* Planning Timer (5 minutes) */}
              <div className="flex justify-center">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md border border-blue-200 dark:border-blue-700">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <span className="text-sm font-medium text-blue-900 dark:text-blue-100">Planning Timer:</span>
                      <span className="text-lg font-mono font-bold text-blue-900 dark:text-blue-100">
                        {String(planningMinutes).padStart(2, '0')}:{String(planningSeconds).padStart(2, '0')}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      {!isPlanningTimerActive ? (
                        <button
                          onClick={startPlanningTimer}
                          disabled={isPlanningTimerCompleted}
                          className="flex items-center px-2 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                          <Play className="w-3 h-3 mr-1" />
                          Start
                        </button>
                      ) : (
                        <button
                          onClick={pausePlanningTimer}
                          className="flex items-center px-2 py-1 text-xs bg-yellow-600 text-white rounded hover:bg-yellow-700"
                        >
                          <Pause className="w-3 h-3 mr-1" />
                          Pause
                        </button>
                      )}
                      <button
                        onClick={resetPlanningTimer}
                        className="flex items-center px-2 py-1 text-xs bg-gray-600 text-white rounded hover:bg-gray-700"
                      >
                        <RotateCcw className="w-3 h-3 mr-1" />
                        Reset
                      </button>
                    </div>
                    {isPlanningTimerCompleted && (
                      <div className="text-xs text-green-600 dark:text-green-400 font-medium">
                        ✓ Planning complete!
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Planning Box */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-700">
                <div className="flex items-center mb-3">
                  <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
                  <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">Planning Notes (5 minutes)</h3>
                </div>
                <textarea
                  value={templateData.planning}
                  onChange={(e) => handleTemplateChange('planning', e.target.value)}
                  className="w-full h-24 p-3 border border-blue-300 dark:border-blue-600 rounded-md resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                  placeholder="Think about a meaningful experience, what happened, how you felt, and what you learned from it..."
                />
                <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
                  Use this space to recall details and organize your thoughts about the experience.
                </p>
              </div>

              {/* Template Boxes - Vertical Layout */}
              <div className="space-y-6">
                {/* Experience */}
                <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-4 border border-indigo-200 dark:border-indigo-700">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white font-bold text-sm">1</span>
                    </div>
                    <h3 className="text-lg font-semibold text-indigo-900 dark:text-indigo-100">The Experience</h3>
                  </div>
                  <textarea
                    value={templateData.experience}
                    onChange={(e) => handleTemplateChange('experience', e.target.value)}
                    className="w-full h-32 p-3 border border-indigo-300 dark:border-indigo-600 rounded-md resize-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-white"
                    placeholder="What happened? Describe the experience in detail. When and where did it occur? Who was involved?"
                  />
                  <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-2">
                    Tell the story of what happened. Include important details that help explain the experience.
                  </p>
                </div>

                {/* Feelings */}
                <div className="bg-pink-50 dark:bg-pink-900/20 rounded-lg p-4 border border-pink-200 dark:border-pink-700">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white font-bold text-sm">2</span>
                    </div>
                    <h3 className="text-lg font-semibold text-pink-900 dark:text-pink-100">Feelings & Emotions</h3>
                  </div>
                  <textarea
                    value={templateData.feelings}
                    onChange={(e) => handleTemplateChange('feelings', e.target.value)}
                    className="w-full h-32 p-3 border border-pink-300 dark:border-pink-600 rounded-md resize-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-800 dark:text-white"
                    placeholder="How did you feel during and after this experience? What emotions did you have?"
                  />
                  <p className="text-xs text-pink-600 dark:text-pink-400 mt-2">
                    Be honest about your emotions. How did your feelings change throughout the experience?
                  </p>
                  
                  {/* Feeling Words Helper */}
                  <div className="mt-3 p-2 bg-pink-100 dark:bg-pink-800/30 rounded border">
                    <div className="flex items-center mb-2">
                      <Heart className="w-4 h-4 text-pink-600 dark:text-pink-400 mr-1" />
                      <span className="text-xs font-medium text-pink-800 dark:text-pink-200">Feeling Words:</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {feelingWords.map((word, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            const currentText = templateData.feelings;
                            const newText = currentText + (currentText ? ' ' : '') + word;
                            handleTemplateChange('feelings', newText);
                          }}
                          className="px-2 py-1 text-xs bg-pink-200 dark:bg-pink-700 text-pink-800 dark:text-pink-200 rounded hover:bg-pink-300 dark:hover:bg-pink-600"
                        >
                          {word}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Thoughts */}
                <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 border border-orange-200 dark:border-orange-700">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white font-bold text-sm">3</span>
                    </div>
                    <h3 className="text-lg font-semibold text-orange-900 dark:text-orange-100">Thoughts & Analysis</h3>
                  </div>
                  <textarea
                    value={templateData.thoughts}
                    onChange={(e) => handleTemplateChange('thoughts', e.target.value)}
                    className="w-full h-32 p-3 border border-orange-300 dark:border-orange-600 rounded-md resize-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-800 dark:text-white"
                    placeholder="What were you thinking during this experience? How do you understand it now? What does it mean to you?"
                  />
                  <p className="text-xs text-orange-600 dark:text-orange-400 mt-2">
                    Analyze the experience. What were your thoughts then versus now?
                  </p>
                </div>

                {/* Learning */}
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-700">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white font-bold text-sm">4</span>
                    </div>
                    <h3 className="text-lg font-semibold text-green-900 dark:text-green-100">What I Learned</h3>
                  </div>
                  <textarea
                    value={templateData.learning}
                    onChange={(e) => handleTemplateChange('learning', e.target.value)}
                    className="w-full h-32 p-3 border border-green-300 dark:border-green-600 rounded-md resize-none focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-800 dark:text-white"
                    placeholder="What did you learn from this experience? How did it change you? What insights did you gain?"
                  />
                  <p className="text-xs text-green-600 dark:text-green-400 mt-2">
                    Focus on the lessons learned and how the experience helped you grow.
                  </p>
                  
                  {/* Reflection Starters Helper */}
                  <div className="mt-3 p-2 bg-green-100 dark:bg-green-800/30 rounded border">
                    <div className="flex items-center mb-2">
                      <Lightbulb className="w-4 h-4 text-green-600 dark:text-green-400 mr-1" />
                      <span className="text-xs font-medium text-green-800 dark:text-green-200">Reflection Starters:</span>
                    </div>
                    <div className="space-y-1">
                      {reflectionStarters.map((starter, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            const currentText = templateData.learning;
                            const newText = currentText + (currentText ? '\n' : '') + starter;
                            handleTemplateChange('learning', newText);
                          }}
                          className="block w-full text-left px-2 py-1 text-xs bg-green-200 dark:bg-green-700 text-green-800 dark:text-green-200 rounded hover:bg-green-300 dark:hover:bg-green-600"
                        >
                          {starter}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Future Applications */}
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-700">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white font-bold text-sm">5</span>
                    </div>
                    <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100">Future Applications</h3>
                  </div>
                  <textarea
                    value={templateData.future}
                    onChange={(e) => handleTemplateChange('future', e.target.value)}
                    className="w-full h-32 p-3 border border-purple-300 dark:border-purple-600 rounded-md resize-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-800 dark:text-white"
                    placeholder="How will you use what you learned? What will you do differently next time? How will this experience guide your future decisions?"
                  />
                  <p className="text-xs text-purple-600 dark:text-purple-400 mt-2">
                    Connect your learning to the future. How will this experience help you in similar situations?
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center space-x-4 pt-6">
                <button
                  onClick={generateEssayFromTemplate}
                  disabled={!isTemplateComplete}
                  className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all ${
                    isTemplateComplete
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <Eye className="w-5 h-5 mr-2" />
                  Start Writing Your Reflection
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
                  {/* Writing Timer */}
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-md border border-green-200 dark:border-green-700">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-5 h-5 text-green-600 dark:text-green-400" />
                      <span className="text-sm font-medium text-green-900 dark:text-green-100">Writing Timer:</span>
                      <span className="text-lg font-mono font-bold text-green-900 dark:text-green-100">
                        {String(writingMinutes).padStart(2, '0')}:{String(writingSecondsState).padStart(2, '0')}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1 mt-2">
                      {!isWritingTimerActive ? (
                        <button
                          onClick={startWritingTimer}
                          disabled={isWritingTimerCompleted}
                          className="flex items-center px-2 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                          <Play className="w-3 h-3 mr-1" />
                          Start
                        </button>
                      ) : (
                        <button
                          onClick={pauseWritingTimer}
                          className="flex items-center px-2 py-1 text-xs bg-yellow-600 text-white rounded hover:bg-yellow-700"
                        >
                          <Pause className="w-3 h-3 mr-1" />
                          Pause
                        </button>
                      )}
                      <button
                        onClick={resetWritingTimer}
                        className="flex items-center px-2 py-1 text-xs bg-gray-600 text-white rounded hover:bg-gray-700"
                      >
                        <RotateCcw className="w-3 h-3 mr-1" />
                        Reset
                      </button>
                    </div>
                    {isWritingTimerCompleted && (
                      <div className="text-xs text-green-600 dark:text-green-400 mt-1 font-medium">
                        ✓ Writing time complete!
                      </div>
                    )}
                  </div>
                  
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
                      <Send className="w-4 h-4 mr-2" />
                      Submit Reflection
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex-1 p-4">
              <textarea
                value={content}
                onChange={(e) => onChange(e.target.value)}
                className="w-full h-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-800 dark:text-white"
                placeholder="Start writing your reflective essay here..."
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
