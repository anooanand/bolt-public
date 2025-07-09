import React, { useState, useEffect } from 'react';
import { Clock, Play, Pause, RotateCcw, Calendar, MapPin, Users, Zap, CheckCircle, Send, ArrowRight } from 'lucide-react';

interface RecountWritingTemplateProps {
  content: string;
  onChange: (content: string) => void;
  onTimerStart: (shouldStart: boolean) => void;
  onSubmit: () => void;
}

interface TemplateData {
  planning: string;
  orientation: string;
  events: string;
  reorientation: string;
  who: string;
  what: string;
  when: string;
  where: string;
  why: string;
}

export function RecountWritingTemplate({ content, onChange, onTimerStart, onSubmit }: RecountWritingTemplateProps) {
  const [templateData, setTemplateData] = useState<TemplateData>({
    planning: '',
    orientation: '',
    events: '',
    reorientation: '',
    who: '',
    what: '',
    when: '',
    where: '',
    why: ''
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
    const savedData = localStorage.getItem('recountTemplateData');
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
    localStorage.setItem('recountTemplateData', JSON.stringify(templateData));
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
              body: 'Time to fill in your recount writing template!',
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
              body: 'Great job on your recount writing!',
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
    const { orientation, events, reorientation, who, what, when, where, why } = templateData;
    
    let generatedEssay = '';
    
    if (orientation.trim()) {
      generatedEssay += `Orientation: ${orientation}\n\n`;
    }
    
    if (who.trim() || what.trim() || when.trim() || where.trim() || why.trim()) {
      generatedEssay += '5 W\'s:\n';
      if (who.trim()) generatedEssay += `Who: ${who}\n`;
      if (what.trim()) generatedEssay += `What: ${what}\n`;
      if (when.trim()) generatedEssay += `When: ${when}\n`;
      if (where.trim()) generatedEssay += `Where: ${where}\n`;
      if (why.trim()) generatedEssay += `Why: ${why}\n`;
      generatedEssay += '\n';
    }
    
    if (events.trim()) {
      generatedEssay += `Events: ${events}\n\n`;
    }
    
    if (reorientation.trim()) {
      generatedEssay += `Conclusion: ${reorientation}\n\n`;
    }
    
    generatedEssay += '--- Start writing your recount below ---\n\n';
    
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

  const isTemplateComplete = templateData.orientation.trim() && 
                            templateData.events.trim() && 
                            templateData.who.trim() && 
                            templateData.what.trim();

  // Time sequence words for recount writing
  const sequenceWords = [
    'First', 'Then', 'Next', 'After that', 'Later', 'Meanwhile',
    'Soon', 'Eventually', 'Finally', 'In the end', 'Before', 'During'
  ];

  // Past tense verbs for recount writing
  const pastTenseVerbs = [
    'went', 'saw', 'did', 'said', 'came', 'took', 'made', 'got',
    'walked', 'ran', 'played', 'watched', 'listened', 'enjoyed'
  ];

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-800">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20">
        <div className="flex items-center">
          <Calendar className="w-6 h-6 text-amber-600 dark:text-amber-400 mr-3" />
          <div>
            <h2 className="text-xl font-bold text-amber-900 dark:text-amber-100">Recount Writing Template</h2>
            <p className="text-sm text-amber-700 dark:text-amber-300">Tell your reader about something that happened!</p>
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
                  placeholder="Think about an event or experience you want to recount. Remember the details of what happened..."
                />
                <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
                  Use this space to recall the sequence of events and important details.
                </p>
              </div>

              {/* 5 W's Section */}
              <div className="bg-gray-50 dark:bg-gray-900/20 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  The 5 W's - Answer These First!
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Who */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Who was involved?</label>
                    <textarea
                      value={templateData.who}
                      onChange={(e) => handleTemplateChange('who', e.target.value)}
                      className="w-full h-20 p-2 border border-gray-300 dark:border-gray-600 rounded-md resize-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 dark:bg-gray-800 dark:text-white text-sm"
                      placeholder="Who were the people involved?"
                    />
                  </div>

                  {/* What */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">What happened?</label>
                    <textarea
                      value={templateData.what}
                      onChange={(e) => handleTemplateChange('what', e.target.value)}
                      className="w-full h-20 p-2 border border-gray-300 dark:border-gray-600 rounded-md resize-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 dark:bg-gray-800 dark:text-white text-sm"
                      placeholder="What was the main event or activity?"
                    />
                  </div>

                  {/* When */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">When did it happen?</label>
                    <textarea
                      value={templateData.when}
                      onChange={(e) => handleTemplateChange('when', e.target.value)}
                      className="w-full h-20 p-2 border border-gray-300 dark:border-gray-600 rounded-md resize-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 dark:bg-gray-800 dark:text-white text-sm"
                      placeholder="When did this take place? Date, time, season?"
                    />
                  </div>

                  {/* Where */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Where did it happen?</label>
                    <textarea
                      value={templateData.where}
                      onChange={(e) => handleTemplateChange('where', e.target.value)}
                      className="w-full h-20 p-2 border border-gray-300 dark:border-gray-600 rounded-md resize-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 dark:bg-gray-800 dark:text-white text-sm"
                      placeholder="Where did this event take place?"
                    />
                  </div>

                  {/* Why */}
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Why did it happen? (Optional)</label>
                    <textarea
                      value={templateData.why}
                      onChange={(e) => handleTemplateChange('why', e.target.value)}
                      className="w-full h-20 p-2 border border-gray-300 dark:border-gray-600 rounded-md resize-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 dark:bg-gray-800 dark:text-white text-sm"
                      placeholder="Why did this event happen? What was the reason or purpose?"
                    />
                  </div>
                </div>
              </div>

              {/* Template Boxes - Vertical Layout */}
              <div className="space-y-6">
                {/* Orientation */}
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-700">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white font-bold text-sm">1</span>
                    </div>
                    <h3 className="text-lg font-semibold text-green-900 dark:text-green-100">Orientation (Introduction)</h3>
                  </div>
                  <textarea
                    value={templateData.orientation}
                    onChange={(e) => handleTemplateChange('orientation', e.target.value)}
                    className="w-full h-32 p-3 border border-green-300 dark:border-green-600 rounded-md resize-none focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-800 dark:text-white"
                    placeholder="Introduce your recount. Set the scene by telling your reader who, what, when, and where..."
                  />
                  <p className="text-xs text-green-600 dark:text-green-400 mt-2">
                    Start your recount by setting the scene and introducing the main details.
                  </p>
                </div>

                {/* Events */}
                <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 border border-orange-200 dark:border-orange-700">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white font-bold text-sm">2</span>
                    </div>
                    <h3 className="text-lg font-semibold text-orange-900 dark:text-orange-100">Events (What Happened)</h3>
                  </div>
                  <textarea
                    value={templateData.events}
                    onChange={(e) => handleTemplateChange('events', e.target.value)}
                    className="w-full h-32 p-3 border border-orange-300 dark:border-orange-600 rounded-md resize-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-800 dark:text-white"
                    placeholder="Tell the events in the order they happened. Use time words like 'first', 'then', 'next', 'finally'..."
                  />
                  <p className="text-xs text-orange-600 dark:text-orange-400 mt-2">
                    Describe the events in chronological order (the order they happened).
                  </p>
                  
                  {/* Sequence Words Helper */}
                  <div className="mt-3 p-2 bg-orange-100 dark:bg-orange-800/30 rounded border">
                    <div className="flex items-center mb-2">
                      <ArrowRight className="w-4 h-4 text-orange-600 dark:text-orange-400 mr-1" />
                      <span className="text-xs font-medium text-orange-800 dark:text-orange-200">Sequence Words:</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {sequenceWords.map((word, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            const currentText = templateData.events;
                            const newText = currentText + (currentText ? ' ' : '') + word;
                            handleTemplateChange('events', newText);
                          }}
                          className="px-2 py-1 text-xs bg-orange-200 dark:bg-orange-700 text-orange-800 dark:text-orange-200 rounded hover:bg-orange-300 dark:hover:bg-orange-600"
                        >
                          {word}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Past Tense Verbs Helper */}
                  <div className="mt-3 p-2 bg-orange-100 dark:bg-orange-800/30 rounded border">
                    <div className="flex items-center mb-2">
                      <Zap className="w-4 h-4 text-orange-600 dark:text-orange-400 mr-1" />
                      <span className="text-xs font-medium text-orange-800 dark:text-orange-200">Past Tense Verbs:</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {pastTenseVerbs.map((verb, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            const currentText = templateData.events;
                            const newText = currentText + (currentText ? ' ' : '') + verb;
                            handleTemplateChange('events', newText);
                          }}
                          className="px-2 py-1 text-xs bg-orange-200 dark:bg-orange-700 text-orange-800 dark:text-orange-200 rounded hover:bg-orange-300 dark:hover:bg-orange-600"
                        >
                          {verb}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Reorientation */}
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-700">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white font-bold text-sm">3</span>
                    </div>
                    <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100">Reorientation (Conclusion)</h3>
                  </div>
                  <textarea
                    value={templateData.reorientation}
                    onChange={(e) => handleTemplateChange('reorientation', e.target.value)}
                    className="w-full h-32 p-3 border border-purple-300 dark:border-purple-600 rounded-md resize-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-800 dark:text-white"
                    placeholder="How did the event end? What was the result? How did you feel about it? What did you learn?"
                  />
                  <p className="text-xs text-purple-600 dark:text-purple-400 mt-2">
                    Wrap up your recount by sharing the outcome and your thoughts about the experience.
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
                      ? 'bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white shadow-lg'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Start Writing Your Recount
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
                  className="flex items-center px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-all"
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
                      Submit Recount
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex-1 p-4">
              <textarea
                value={content}
                onChange={(e) => onChange(e.target.value)}
                className="w-full h-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg resize-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 dark:bg-gray-800 dark:text-white"
                placeholder="Start writing your recount here..."
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

