import React, { useState, useEffect } from 'react';
import { Clock, Play, Pause, RotateCcw, Newspaper, Users, MapPin, Calendar, Zap, CheckCircle, Send, AlertTriangle } from 'lucide-react';

interface NewsReportWritingTemplateProps {
  content: string;
  onChange: (content: string) => void;
  onTimerStart: (shouldStart: boolean) => void;
  onSubmit: () => void;
}

interface TemplateData {
  planning: string;
  headline: string;
  lead: string;
  who: string;
  what: string;
  when: string;
  where: string;
  why: string;
  how: string;
  bodyParagraphs: string;
  quotes: string;
}

export function NewsReportWritingTemplate({ content, onChange, onTimerStart, onSubmit }: NewsReportWritingTemplateProps) {
  const [templateData, setTemplateData] = useState<TemplateData>({
    planning: '',
    headline: '',
    lead: '',
    who: '',
    what: '',
    when: '',
    where: '',
    why: '',
    how: '',
    bodyParagraphs: '',
    quotes: ''
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
    const savedData = localStorage.getItem('newsReportTemplateData');
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
    localStorage.setItem('newsReportTemplateData', JSON.stringify(templateData));
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
              body: 'Time to fill in your news report template!',
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
              body: 'Great job on your news report!',
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
    const { headline, lead, who, what, when, where, why, how, bodyParagraphs, quotes } = templateData;
    
    let generatedEssay = '';
    
    if (headline.trim()) {
      generatedEssay += `HEADLINE: ${headline}\n\n`;
    }
    
    if (lead.trim()) {
      generatedEssay += `LEAD PARAGRAPH: ${lead}\n\n`;
    }
    
    if (who.trim() || what.trim() || when.trim() || where.trim() || why.trim() || how.trim()) {
      generatedEssay += '5 W\'s and H:\n';
      if (who.trim()) generatedEssay += `WHO: ${who}\n`;
      if (what.trim()) generatedEssay += `WHAT: ${what}\n`;
      if (when.trim()) generatedEssay += `WHEN: ${when}\n`;
      if (where.trim()) generatedEssay += `WHERE: ${where}\n`;
      if (why.trim()) generatedEssay += `WHY: ${why}\n`;
      if (how.trim()) generatedEssay += `HOW: ${how}\n`;
      generatedEssay += '\n';
    }
    
    if (bodyParagraphs.trim()) {
      generatedEssay += `BODY PARAGRAPHS: ${bodyParagraphs}\n\n`;
    }
    
    if (quotes.trim()) {
      generatedEssay += `QUOTES: ${quotes}\n\n`;
    }
    
    generatedEssay += '--- Start writing your news report below ---\n\n';
    
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

  const isTemplateComplete = templateData.headline.trim() && 
                            templateData.lead.trim() && 
                            templateData.who.trim() && 
                            templateData.what.trim() && 
                            templateData.when.trim() && 
                            templateData.where.trim();

  // News reporting words and phrases
  const reportingVerbs = [
    'reported', 'announced', 'confirmed', 'revealed', 'stated',
    'declared', 'disclosed', 'explained', 'mentioned', 'noted',
    'indicated', 'suggested', 'claimed', 'alleged', 'witnessed'
  ];

  // Headline starters
  const headlineStarters = [
    'Breaking:', 'Local:', 'School:', 'Community:', 'Emergency:',
    'Update:', 'Exclusive:', 'Investigation:', 'Alert:', 'News:'
  ];

  // Quote attribution phrases
  const quoteAttributions = [
    'according to...',
    'as stated by...',
    'officials said...',
    'witnesses reported...',
    'sources confirm...',
    'experts believe...',
    'authorities announced...',
    'eyewitnesses described...'
  ];

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-800">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20">
        <div className="flex items-center">
          <Newspaper className="w-6 h-6 text-red-600 dark:text-red-400 mr-3" />
          <div>
            <h2 className="text-xl font-bold text-red-900 dark:text-red-100">News Report Writing Template</h2>
            <p className="text-sm text-red-700 dark:text-red-300">Report the facts clearly and objectively like a real journalist!</p>
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
                  placeholder="Gather the facts about your news story. What happened? Who was involved? When and where did it occur?"
                />
                <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
                  Use this space to collect all the important facts and details for your news report.
                </p>
              </div>

              {/* Inverted Pyramid Info */}
              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border border-yellow-200 dark:border-yellow-700">
                <div className="flex items-center mb-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mr-2" />
                  <h3 className="text-lg font-semibold text-yellow-900 dark:text-yellow-100">News Writing Structure</h3>
                </div>
                <div className="text-sm text-yellow-800 dark:text-yellow-200">
                  <p className="mb-2"><strong>Inverted Pyramid:</strong> Put the most important information first!</p>
                  <div className="space-y-1">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-red-500 mr-2"></div>
                      <span>Lead: Most important facts (Who, What, When, Where)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-orange-500 mr-2"></div>
                      <span>Body: Supporting details (Why, How)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-yellow-500 mr-2"></div>
                      <span>End: Background information and quotes</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Template Boxes - Vertical Layout */}
              <div className="space-y-6">
                {/* Headline */}
                <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border border-red-200 dark:border-red-700">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white font-bold text-sm">1</span>
                    </div>
                    <h3 className="text-lg font-semibold text-red-900 dark:text-red-100">Headline</h3>
                  </div>
                  <textarea
                    value={templateData.headline}
                    onChange={(e) => handleTemplateChange('headline', e.target.value)}
                    className="w-full h-20 p-3 border border-red-300 dark:border-red-600 rounded-md resize-none focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-gray-800 dark:text-white"
                    placeholder="Write a clear, attention-grabbing headline that summarizes the main news..."
                  />
                  <p className="text-xs text-red-600 dark:text-red-400 mt-2">
                    Keep it short, clear, and informative. Tell readers what happened in just a few words.
                  </p>
                  
                  {/* Headline Starters Helper */}
                  <div className="mt-3 p-2 bg-red-100 dark:bg-red-800/30 rounded border">
                    <div className="flex items-center mb-2">
                      <Newspaper className="w-4 h-4 text-red-600 dark:text-red-400 mr-1" />
                      <span className="text-xs font-medium text-red-800 dark:text-red-200">Headline Starters:</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {headlineStarters.map((starter, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            const currentText = templateData.headline;
                            const newText = currentText + (currentText ? ' ' : '') + starter;
                            handleTemplateChange('headline', newText);
                          }}
                          className="px-2 py-1 text-xs bg-red-200 dark:bg-red-700 text-red-800 dark:text-red-200 rounded hover:bg-red-300 dark:hover:bg-red-600"
                        >
                          {starter}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Lead Paragraph */}
                <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 border border-orange-200 dark:border-orange-700">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white font-bold text-sm">2</span>
                    </div>
                    <h3 className="text-lg font-semibold text-orange-900 dark:text-orange-100">Lead Paragraph</h3>
                  </div>
                  <textarea
                    value={templateData.lead}
                    onChange={(e) => handleTemplateChange('lead', e.target.value)}
                    className="w-full h-32 p-3 border border-orange-300 dark:border-orange-600 rounded-md resize-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-800 dark:text-white"
                    placeholder="Write the opening paragraph with the most important information. Answer: Who, What, When, Where..."
                  />
                  <p className="text-xs text-orange-600 dark:text-orange-400 mt-2">
                    This is the most important paragraph. Include the key facts that readers need to know first.
                  </p>
                </div>

                {/* 5 W's and H Section */}
                <div className="bg-gray-50 dark:bg-gray-900/20 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    The 5 W's and H - Essential Questions
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Who */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        WHO was involved?
                      </label>
                      <textarea
                        value={templateData.who}
                        onChange={(e) => handleTemplateChange('who', e.target.value)}
                        className="w-full h-20 p-2 border border-gray-300 dark:border-gray-600 rounded-md resize-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-800 dark:text-white text-sm"
                        placeholder="Who are the main people in this story?"
                      />
                    </div>

                    {/* What */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                        <Zap className="w-4 h-4 mr-1" />
                        WHAT happened?
                      </label>
                      <textarea
                        value={templateData.what}
                        onChange={(e) => handleTemplateChange('what', e.target.value)}
                        className="w-full h-20 p-2 border border-gray-300 dark:border-gray-600 rounded-md resize-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-800 dark:text-white text-sm"
                        placeholder="What exactly took place?"
                      />
                    </div>

                    {/* When */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        WHEN did it happen?
                      </label>
                      <textarea
                        value={templateData.when}
                        onChange={(e) => handleTemplateChange('when', e.target.value)}
                        className="w-full h-20 p-2 border border-gray-300 dark:border-gray-600 rounded-md resize-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-800 dark:text-white text-sm"
                        placeholder="What date and time?"
                      />
                    </div>

                    {/* Where */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        WHERE did it happen?
                      </label>
                      <textarea
                        value={templateData.where}
                        onChange={(e) => handleTemplateChange('where', e.target.value)}
                        className="w-full h-20 p-2 border border-gray-300 dark:border-gray-600 rounded-md resize-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-800 dark:text-white text-sm"
                        placeholder="What location or place?"
                      />
                    </div>

                    {/* Why */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">WHY did it happen?</label>
                      <textarea
                        value={templateData.why}
                        onChange={(e) => handleTemplateChange('why', e.target.value)}
                        className="w-full h-20 p-2 border border-gray-300 dark:border-gray-600 rounded-md resize-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-800 dark:text-white text-sm"
                        placeholder="What was the reason or cause?"
                      />
                    </div>

                    {/* How */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">HOW did it happen?</label>
                      <textarea
                        value={templateData.how}
                        onChange={(e) => handleTemplateChange('how', e.target.value)}
                        className="w-full h-20 p-2 border border-gray-300 dark:border-gray-600 rounded-md resize-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-800 dark:text-white text-sm"
                        placeholder="What was the process or method?"
                      />
                    </div>
                  </div>
                </div>

                {/* Body Paragraphs */}
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-700">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white font-bold text-sm">3</span>
                    </div>
                    <h3 className="text-lg font-semibold text-green-900 dark:text-green-100">Body Paragraphs</h3>
                  </div>
                  <textarea
                    value={templateData.bodyParagraphs}
                    onChange={(e) => handleTemplateChange('bodyParagraphs', e.target.value)}
                    className="w-full h-32 p-3 border border-green-300 dark:border-green-600 rounded-md resize-none focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-800 dark:text-white"
                    placeholder="Add supporting details, background information, and additional facts. Organize from most to least important..."
                  />
                  <p className="text-xs text-green-600 dark:text-green-400 mt-2">
                    Include additional details, context, and background information that supports the lead.
                  </p>
                  
                  {/* Reporting Verbs Helper */}
                  <div className="mt-3 p-2 bg-green-100 dark:bg-green-800/30 rounded border">
                    <div className="flex items-center mb-2">
                      <Newspaper className="w-4 h-4 text-green-600 dark:text-green-400 mr-1" />
                      <span className="text-xs font-medium text-green-800 dark:text-green-200">Reporting Verbs:</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {reportingVerbs.map((verb, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            const currentText = templateData.bodyParagraphs;
                            const newText = currentText + (currentText ? ' ' : '') + verb;
                            handleTemplateChange('bodyParagraphs', newText);
                          }}
                          className="px-2 py-1 text-xs bg-green-200 dark:bg-green-700 text-green-800 dark:text-green-200 rounded hover:bg-green-300 dark:hover:bg-green-600"
                        >
                          {verb}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Quotes */}
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-700">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white font-bold text-sm">4</span>
                    </div>
                    <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">Quotes & Statements</h3>
                  </div>
                  <textarea
                    value={templateData.quotes}
                    onChange={(e) => handleTemplateChange('quotes', e.target.value)}
                    className="w-full h-32 p-3 border border-blue-300 dark:border-blue-600 rounded-md resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                    placeholder="Include direct quotes from people involved, witnesses, or officials. Use quotation marks and proper attribution..."
                  />
                  <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
                    Add direct quotes to make your report more credible and engaging. Always attribute quotes properly.
                  </p>
                  
                  {/* Quote Attribution Helper */}
                  <div className="mt-3 p-2 bg-blue-100 dark:bg-blue-800/30 rounded border">
                    <div className="flex items-center mb-2">
                      <Users className="w-4 h-4 text-blue-600 dark:text-blue-400 mr-1" />
                      <span className="text-xs font-medium text-blue-800 dark:text-blue-200">Quote Attribution:</span>
                    </div>
                    <div className="space-y-1">
                      {quoteAttributions.map((attribution, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            const currentText = templateData.quotes;
                            const newText = currentText + (currentText ? '\n' : '') + attribution;
                            handleTemplateChange('quotes', newText);
                          }}
                          className="block w-full text-left px-2 py-1 text-xs bg-blue-200 dark:bg-blue-700 text-blue-800 dark:text-blue-200 rounded hover:bg-blue-300 dark:hover:bg-blue-600"
                        >
                          {attribution}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center space-x-4 pt-6">
                <button
                  onClick={generateEssayFromTemplate}
                  disabled={!isTemplateComplete}
                  className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all ${
                    isTemplateComplete
                      ? 'bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white shadow-lg'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <Newspaper className="w-5 h-5 mr-2" />
                  Start Writing Your News Report
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
                  className="flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-all"
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
                      Submit News Report
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex-1 p-4">
              <textarea
                value={content}
                onChange={(e) => onChange(e.target.value)}
                className="w-full h-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg resize-none focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-gray-800 dark:text-white"
                placeholder="Start writing your news report here..."
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

