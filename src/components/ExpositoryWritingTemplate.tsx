import React, { useState, useEffect } from 'react';
import { Clock, Play, Pause, RotateCcw, BookOpen, Lightbulb, FileText, CheckCircle, Send, Info } from 'lucide-react';

interface ExpositoryWritingTemplateProps {
  content: string;
  onChange: (content: string) => void;
  onTimerStart: (shouldStart: boolean) => void;
  onSubmit: () => void;
}

interface TemplateData {
  planning: string;
  topic: string;
  introduction: string;
  mainPoints: string;
  evidence: string;
  conclusion: string;
}

export function ExpositoryWritingTemplate({ content, onChange, onTimerStart, onSubmit }: ExpositoryWritingTemplateProps) {
  const [templateData, setTemplateData] = useState<TemplateData>({
    planning: '',
    topic: '',
    introduction: '',
    mainPoints: '',
    evidence: '',
    conclusion: ''
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
    const savedData = localStorage.getItem('expositoryTemplateData');
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
    localStorage.setItem('expositoryTemplateData', JSON.stringify(templateData));
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
              body: 'Time to fill in your expository writing template!',
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
              body: 'Great job on your expository writing!',
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
    const { topic, introduction, mainPoints, evidence, conclusion } = templateData;
    
    let generatedEssay = '';
    
    if (topic.trim()) {
      generatedEssay += `Topic: ${topic}\n\n`;
    }
    
    if (introduction.trim()) {
      generatedEssay += `Introduction: ${introduction}\n\n`;
    }
    
    if (mainPoints.trim()) {
      generatedEssay += `Main Points: ${mainPoints}\n\n`;
    }
    
    if (evidence.trim()) {
      generatedEssay += `Evidence & Examples: ${evidence}\n\n`;
    }
    
    if (conclusion.trim()) {
      generatedEssay += `Conclusion: ${conclusion}\n\n`;
    }
    
    generatedEssay += '--- Start writing your expository essay below ---\n\n';
    
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

  const isTemplateComplete = templateData.topic.trim() && 
                            templateData.introduction.trim() && 
                            templateData.mainPoints.trim() && 
                            templateData.conclusion.trim();

  // Transition words for expository writing
  const transitionWords = [
    'First', 'Second', 'Third', 'Furthermore', 'Additionally',
    'Moreover', 'In addition', 'For example', 'For instance', 'Therefore',
    'As a result', 'Consequently', 'In conclusion', 'Finally'
  ];

  // Question starters for exploration
  const questionStarters = [
    'What is...?',
    'How does...?',
    'Why is...?',
    'When did...?',
    'Where can...?'
  ];

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-800">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
        <div className="flex items-center">
          <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-3" />
          <div>
            <h2 className="text-xl font-bold text-blue-900 dark:text-blue-100">Expository Writing Template</h2>
            <p className="text-sm text-blue-700 dark:text-blue-300">Explain and inform your reader with clear facts and examples!</p>
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
                  placeholder="Research your topic, gather facts and examples, think about what your reader needs to know..."
                />
                <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
                  Use this space to organize your research and plan how to explain your topic clearly.
                </p>
              </div>

              {/* Template Boxes - Vertical Layout */}
              <div className="space-y-6">
                {/* Topic */}
                <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-4 border border-indigo-200 dark:border-indigo-700">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white font-bold text-sm">1</span>
                    </div>
                    <h3 className="text-lg font-semibold text-indigo-900 dark:text-indigo-100">Topic & Focus</h3>
                  </div>
                  <textarea
                    value={templateData.topic}
                    onChange={(e) => handleTemplateChange('topic', e.target.value)}
                    className="w-full h-32 p-3 border border-indigo-300 dark:border-indigo-600 rounded-md resize-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-white"
                    placeholder="What is your topic? What specific aspect will you explain? What is the main idea you want to teach your reader?"
                  />
                  <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-2">
                    Be specific about what you will explain and why it is important to know.
                  </p>
                  
                  {/* Question Starters Helper */}
                  <div className="mt-3 p-2 bg-indigo-100 dark:bg-indigo-800/30 rounded border">
                    <div className="flex items-center mb-2">
                      <Info className="w-4 h-4 text-indigo-600 dark:text-indigo-400 mr-1" />
                      <span className="text-xs font-medium text-indigo-800 dark:text-indigo-200">Question Starters:</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {questionStarters.map((starter, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            const currentText = templateData.topic;
                            const newText = currentText + (currentText ? ' ' : '') + starter;
                            handleTemplateChange('topic', newText);
                          }}
                          className="px-2 py-1 text-xs bg-indigo-200 dark:bg-indigo-700 text-indigo-800 dark:text-indigo-200 rounded hover:bg-indigo-300 dark:hover:bg-indigo-600"
                        >
                          {starter}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Introduction */}
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-700">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white font-bold text-sm">2</span>
                    </div>
                    <h3 className="text-lg font-semibold text-green-900 dark:text-green-100">Introduction</h3>
                  </div>
                  <textarea
                    value={templateData.introduction}
                    onChange={(e) => handleTemplateChange('introduction', e.target.value)}
                    className="w-full h-32 p-3 border border-green-300 dark:border-green-600 rounded-md resize-none focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-800 dark:text-white"
                    placeholder="How will you introduce your topic? What background information does your reader need? What will you explain in your essay?"
                  />
                  <p className="text-xs text-green-600 dark:text-green-400 mt-2">
                    Hook your reader and give them a preview of what they will learn.
                  </p>
                </div>

                {/* Main Points */}
                <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 border border-orange-200 dark:border-orange-700">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white font-bold text-sm">3</span>
                    </div>
                    <h3 className="text-lg font-semibold text-orange-900 dark:text-orange-100">Main Points</h3>
                  </div>
                  <textarea
                    value={templateData.mainPoints}
                    onChange={(e) => handleTemplateChange('mainPoints', e.target.value)}
                    className="w-full h-32 p-3 border border-orange-300 dark:border-orange-600 rounded-md resize-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-800 dark:text-white"
                    placeholder="What are the main points you want to explain? List 2-3 key ideas that will help your reader understand your topic."
                  />
                  <p className="text-xs text-orange-600 dark:text-orange-400 mt-2">
                    Break down your topic into clear, logical sections that build understanding.
                  </p>
                  
                  {/* Transition Words Helper */}
                  <div className="mt-3 p-2 bg-orange-100 dark:bg-orange-800/30 rounded border">
                    <div className="flex items-center mb-2">
                      <Lightbulb className="w-4 h-4 text-orange-600 dark:text-orange-400 mr-1" />
                      <span className="text-xs font-medium text-orange-800 dark:text-orange-200">Transition Words:</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {transitionWords.map((word, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            const currentText = templateData.mainPoints;
                            const newText = currentText + (currentText ? ' ' : '') + word;
                            handleTemplateChange('mainPoints', newText);
                          }}
                          className="px-2 py-1 text-xs bg-orange-200 dark:bg-orange-700 text-orange-800 dark:text-orange-200 rounded hover:bg-orange-300 dark:hover:bg-orange-600"
                        >
                          {word}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Evidence & Examples */}
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-700">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white font-bold text-sm">4</span>
                    </div>
                    <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100">Evidence & Examples</h3>
                  </div>
                  <textarea
                    value={templateData.evidence}
                    onChange={(e) => handleTemplateChange('evidence', e.target.value)}
                    className="w-full h-32 p-3 border border-purple-300 dark:border-purple-600 rounded-md resize-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-800 dark:text-white"
                    placeholder="What facts, statistics, examples, or expert information support your main points? What evidence will help explain your topic?"
                  />
                  <p className="text-xs text-purple-600 dark:text-purple-400 mt-2">
                    Include specific facts, real examples, and reliable information to support your explanations.
                  </p>
                </div>

                {/* Conclusion */}
                <div className="bg-pink-50 dark:bg-pink-900/20 rounded-lg p-4 border border-pink-200 dark:border-pink-700">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white font-bold text-sm">5</span>
                    </div>
                    <h3 className="text-lg font-semibold text-pink-900 dark:text-pink-100">Conclusion</h3>
                  </div>
                  <textarea
                    value={templateData.conclusion}
                    onChange={(e) => handleTemplateChange('conclusion', e.target.value)}
                    className="w-full h-32 p-3 border border-pink-300 dark:border-pink-600 rounded-md resize-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-800 dark:text-white"
                    placeholder="How will you summarize your main points? What is the most important thing you want your reader to remember?"
                  />
                  <p className="text-xs text-pink-600 dark:text-pink-400 mt-2">
                    Wrap up by restating your main ideas and why this topic is important to understand.
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
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <FileText className="w-5 h-5 mr-2" />
                  Start Writing Your Essay
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
                  className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all"
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
                      Submit Essay
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex-1 p-4">
              <textarea
                value={content}
                onChange={(e) => onChange(e.target.value)}
                className="w-full h-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                placeholder="Start writing your expository essay here..."
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

