import React, { useState, useEffect } from 'react';
import { Clock, Play, Pause, RotateCcw, Scale, Users, MessageSquare, CheckCircle, Send, ArrowLeftRight } from 'lucide-react';

interface DiscursiveWritingTemplateProps {
  content: string;
  onChange: (content: string) => void;
  onTimerStart: (shouldStart: boolean) => void;
  onSubmit: () => void;
}

interface TemplateData {
  planning: string;
  topic: string;
  introduction: string;
  argumentFor: string;
  argumentAgainst: string;
  evidence: string;
  conclusion: string;
}

export function DiscursiveWritingTemplate({ content, onChange, onTimerStart, onSubmit }: DiscursiveWritingTemplateProps) {
  const [templateData, setTemplateData] = useState<TemplateData>({
    planning: '',
    topic: '',
    introduction: '',
    argumentFor: '',
    argumentAgainst: '',
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
    const savedData = localStorage.getItem('discursiveTemplateData');
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
    localStorage.setItem('discursiveTemplateData', JSON.stringify(templateData));
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
              body: 'Time to fill in your discursive writing template!',
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
              body: 'Great job on your discursive writing!',
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
    const { topic, introduction, argumentFor, argumentAgainst, evidence, conclusion } = templateData;
    
    let generatedEssay = '';
    
    if (topic.trim()) {
      generatedEssay += `Topic: ${topic}\n\n`;
    }
    
    if (introduction.trim()) {
      generatedEssay += `Introduction: ${introduction}\n\n`;
    }
    
    if (argumentFor.trim()) {
      generatedEssay += `Arguments For: ${argumentFor}\n\n`;
    }
    
    if (argumentAgainst.trim()) {
      generatedEssay += `Arguments Against: ${argumentAgainst}\n\n`;
    }
    
    if (evidence.trim()) {
      generatedEssay += `Evidence & Examples: ${evidence}\n\n`;
    }
    
    if (conclusion.trim()) {
      generatedEssay += `Conclusion: ${conclusion}\n\n`;
    }
    
    generatedEssay += '--- Start writing your discursive essay below ---\n\n';
    
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
                            templateData.argumentFor.trim() && 
                            templateData.argumentAgainst.trim() && 
                            templateData.conclusion.trim();

  // Transition words for discursive writing
  const transitionWords = [
    'However', 'On the other hand', 'Nevertheless', 'Furthermore', 'Moreover',
    'In contrast', 'Similarly', 'Alternatively', 'Despite this', 'Conversely',
    'In addition', 'Therefore', 'Consequently', 'As a result', 'In conclusion'
  ];

  // Perspective starters
  const perspectiveStarters = [
    'Some people believe that...',
    'It could be argued that...',
    'From one perspective...',
    'Critics might say...',
    'Supporters argue that...',
    'Another viewpoint is...',
    'On the contrary...',
    'While some think...'
  ];

  // Evidence types
  const evidenceTypes = [
    'Statistics show that...',
    'Research indicates...',
    'For example...',
    'Studies have found...',
    'Experts suggest...',
    'Evidence shows...',
    'According to...',
    'Data reveals...'
  ];

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-800">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
        <div className="flex items-center">
          <Scale className="w-6 h-6 text-indigo-600 dark:text-indigo-400 mr-3" />
          <div>
            <h2 className="text-xl font-bold text-indigo-900 dark:text-indigo-100">Discursive Writing Template</h2>
            <p className="text-sm text-indigo-700 dark:text-indigo-300">Explore different perspectives and present balanced arguments!</p>
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
                  placeholder="Think about your topic and different viewpoints. What are the main arguments for and against? What evidence supports each side?"
                />
                <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
                  Use this space to brainstorm different perspectives and gather evidence for both sides.
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
                    <h3 className="text-lg font-semibold text-indigo-900 dark:text-indigo-100">Topic & Issue</h3>
                  </div>
                  <textarea
                    value={templateData.topic}
                    onChange={(e) => handleTemplateChange('topic', e.target.value)}
                    className="w-full h-32 p-3 border border-indigo-300 dark:border-indigo-600 rounded-md resize-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-white"
                    placeholder="What is the topic or issue you want to discuss? What question or debate will you explore?"
                  />
                  <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-2">
                    Choose a topic that has different viewpoints and can be debated from multiple angles.
                  </p>
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
                    placeholder="How will you introduce the topic? What background information is needed? What different viewpoints exist?"
                  />
                  <p className="text-xs text-green-600 dark:text-green-400 mt-2">
                    Introduce the topic and indicate that there are different perspectives to consider.
                  </p>
                </div>

                {/* Arguments For */}
                <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-4 border border-emerald-200 dark:border-emerald-700">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white font-bold text-sm">3</span>
                    </div>
                    <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-100">Arguments For</h3>
                  </div>
                  <textarea
                    value={templateData.argumentFor}
                    onChange={(e) => handleTemplateChange('argumentFor', e.target.value)}
                    className="w-full h-32 p-3 border border-emerald-300 dark:border-emerald-600 rounded-md resize-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-800 dark:text-white"
                    placeholder="What are the main arguments supporting one side of the issue? What reasons and benefits support this viewpoint?"
                  />
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-2">
                    Present the strongest arguments and reasons that support one side of the debate.
                  </p>
                  
                  {/* Perspective Starters Helper */}
                  <div className="mt-3 p-2 bg-emerald-100 dark:bg-emerald-800/30 rounded border">
                    <div className="flex items-center mb-2">
                      <Users className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mr-1" />
                      <span className="text-xs font-medium text-emerald-800 dark:text-emerald-200">Perspective Starters:</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {perspectiveStarters.slice(0, 4).map((starter, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            const currentText = templateData.argumentFor;
                            const newText = currentText + (currentText ? ' ' : '') + starter;
                            handleTemplateChange('argumentFor', newText);
                          }}
                          className="px-2 py-1 text-xs bg-emerald-200 dark:bg-emerald-700 text-emerald-800 dark:text-emerald-200 rounded hover:bg-emerald-300 dark:hover:bg-emerald-600"
                        >
                          {starter}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Arguments Against */}
                <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border border-red-200 dark:border-red-700">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white font-bold text-sm">4</span>
                    </div>
                    <h3 className="text-lg font-semibold text-red-900 dark:text-red-100">Arguments Against</h3>
                  </div>
                  <textarea
                    value={templateData.argumentAgainst}
                    onChange={(e) => handleTemplateChange('argumentAgainst', e.target.value)}
                    className="w-full h-32 p-3 border border-red-300 dark:border-red-600 rounded-md resize-none focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-gray-800 dark:text-white"
                    placeholder="What are the main arguments against this viewpoint? What concerns, problems, or disadvantages exist?"
                  />
                  <p className="text-xs text-red-600 dark:text-red-400 mt-2">
                    Present the opposing arguments and concerns that challenge the first viewpoint.
                  </p>
                  
                  {/* Transition Words Helper */}
                  <div className="mt-3 p-2 bg-red-100 dark:bg-red-800/30 rounded border">
                    <div className="flex items-center mb-2">
                      <ArrowLeftRight className="w-4 h-4 text-red-600 dark:text-red-400 mr-1" />
                      <span className="text-xs font-medium text-red-800 dark:text-red-200">Transition Words:</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {transitionWords.slice(0, 8).map((word, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            const currentText = templateData.argumentAgainst;
                            const newText = currentText + (currentText ? ' ' : '') + word;
                            handleTemplateChange('argumentAgainst', newText);
                          }}
                          className="px-2 py-1 text-xs bg-red-200 dark:bg-red-700 text-red-800 dark:text-red-200 rounded hover:bg-red-300 dark:hover:bg-red-600"
                        >
                          {word}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Evidence & Examples */}
                <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 border border-orange-200 dark:border-orange-700">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white font-bold text-sm">5</span>
                    </div>
                    <h3 className="text-lg font-semibold text-orange-900 dark:text-orange-100">Evidence & Examples</h3>
                  </div>
                  <textarea
                    value={templateData.evidence}
                    onChange={(e) => handleTemplateChange('evidence', e.target.value)}
                    className="w-full h-32 p-3 border border-orange-300 dark:border-orange-600 rounded-md resize-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-800 dark:text-white"
                    placeholder="What evidence, examples, statistics, or expert opinions support both sides? What real-world examples illustrate these arguments?"
                  />
                  <p className="text-xs text-orange-600 dark:text-orange-400 mt-2">
                    Include specific evidence, examples, and facts that support both perspectives.
                  </p>
                  
                  {/* Evidence Types Helper */}
                  <div className="mt-3 p-2 bg-orange-100 dark:bg-orange-800/30 rounded border">
                    <div className="flex items-center mb-2">
                      <MessageSquare className="w-4 h-4 text-orange-600 dark:text-orange-400 mr-1" />
                      <span className="text-xs font-medium text-orange-800 dark:text-orange-200">Evidence Starters:</span>
                    </div>
                    <div className="space-y-1">
                      {evidenceTypes.map((starter, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            const currentText = templateData.evidence;
                            const newText = currentText + (currentText ? '\n' : '') + starter;
                            handleTemplateChange('evidence', newText);
                          }}
                          className="block w-full text-left px-2 py-1 text-xs bg-orange-200 dark:bg-orange-700 text-orange-800 dark:text-orange-200 rounded hover:bg-orange-300 dark:hover:bg-orange-600"
                        >
                          {starter}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Conclusion */}
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-700">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white font-bold text-sm">6</span>
                    </div>
                    <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100">Conclusion</h3>
                  </div>
                  <textarea
                    value={templateData.conclusion}
                    onChange={(e) => handleTemplateChange('conclusion', e.target.value)}
                    className="w-full h-32 p-3 border border-purple-300 dark:border-purple-600 rounded-md resize-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-800 dark:text-white"
                    placeholder="How will you conclude? Summarize the main arguments. What is your balanced view? What should readers consider?"
                  />
                  <p className="text-xs text-purple-600 dark:text-purple-400 mt-2">
                    Provide a balanced conclusion that acknowledges both sides and encourages thoughtful consideration.
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
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <Scale className="w-5 h-5 mr-2" />
                  Start Writing Your Discussion
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
                  className="flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-all"
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
                      Submit Discussion
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex-1 p-4">
              <textarea
                value={content}
                onChange={(e) => onChange(e.target.value)}
                className="w-full h-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg resize-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-white"
                placeholder="Start writing your discursive essay here..."
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

