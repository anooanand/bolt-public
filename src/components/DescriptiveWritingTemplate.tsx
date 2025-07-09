import React, { useState, useEffect } from 'react';
import { Clock, Play, Pause, RotateCcw, Eye, Palette, Sparkles, CheckCircle, Send, Sliders } from 'lucide-react';

interface DescriptiveWritingTemplateProps {
  content: string;
  onChange: (content: string) => void;
  onTimerStart: (shouldStart: boolean) => void;
  onSubmit: () => void;
}

interface TemplateData {
  planning: string;
  subject: string;
  sight: string;
  sound: string;
  smell: string;
  touch: string;
  taste: string;
  figurativeLanguage: string;
}

export function DescriptiveWritingTemplate({ content, onChange, onTimerStart, onSubmit }: DescriptiveWritingTemplateProps) {
  const [templateData, setTemplateData] = useState<TemplateData>({
    planning: '',
    subject: '',
    sight: '',
    sound: '',
    smell: '',
    touch: '',
    taste: '',
    figurativeLanguage: ''
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
  const [showSensorySliders, setShowSensorySliders] = useState(false);

  // Load saved template data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('descriptiveTemplateData');
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
    localStorage.setItem('descriptiveTemplateData', JSON.stringify(templateData));
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
              body: 'Time to fill in your descriptive writing template!',
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
              body: 'Great job on your descriptive writing!',
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
    const { subject, sight, sound, smell, touch, taste, figurativeLanguage } = templateData;
    
    let generatedEssay = '';
    
    if (subject.trim()) {
      generatedEssay += `Subject: ${subject}\n\n`;
    }
    
    if (sight.trim()) {
      generatedEssay += `What I See: ${sight}\n\n`;
    }
    
    if (sound.trim()) {
      generatedEssay += `What I Hear: ${sound}\n\n`;
    }
    
    if (smell.trim()) {
      generatedEssay += `What I Smell: ${smell}\n\n`;
    }
    
    if (touch.trim()) {
      generatedEssay += `What I Feel: ${touch}\n\n`;
    }
    
    if (taste.trim()) {
      generatedEssay += `What I Taste: ${taste}\n\n`;
    }
    
    if (figurativeLanguage.trim()) {
      generatedEssay += `Figurative Language: ${figurativeLanguage}\n\n`;
    }
    
    generatedEssay += '--- Start writing your descriptive piece below ---\n\n';
    
    onChange(generatedEssay);
    setShowWritingArea(true);
  };

  const toggleWritingArea = () => {
    setShowWritingArea(!showWritingArea);
  };

  const toggleSensorySliders = () => {
    setShowSensorySliders(!showSensorySliders);
  };

  const countWords = (text: string): number => {
    if (!text || text.trim().length === 0) return 0;
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  const isTemplateComplete = templateData.subject.trim() && 
                            templateData.sight.trim() && 
                            templateData.sound.trim() && 
                            (templateData.smell.trim() || templateData.touch.trim());

  // Descriptive words for different senses
  const descriptiveWords = {
    sight: ['bright', 'dim', 'colorful', 'sparkling', 'shadowy', 'gleaming', 'vivid', 'faded'],
    sound: ['loud', 'quiet', 'melodic', 'harsh', 'gentle', 'thunderous', 'whispered', 'echoing'],
    smell: ['sweet', 'pungent', 'fresh', 'musty', 'fragrant', 'sharp', 'earthy', 'floral'],
    touch: ['smooth', 'rough', 'soft', 'hard', 'warm', 'cold', 'bumpy', 'silky'],
    taste: ['sweet', 'sour', 'bitter', 'salty', 'spicy', 'mild', 'tangy', 'rich']
  };

  // Simile and metaphor starters
  const figurativeStarters = [
    'as bright as...',
    'like a...',
    'as quiet as...',
    'resembled a...',
    'was a...',
    'as soft as...',
    'moved like...',
    'sounded like...'
  ];

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-800">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20">
        <div className="flex items-center">
          <Palette className="w-6 h-6 text-green-600 dark:text-green-400 mr-3" />
          <div>
            <h2 className="text-xl font-bold text-green-900 dark:text-green-100">Descriptive Writing Template</h2>
            <p className="text-sm text-green-700 dark:text-green-300">Paint a picture with words using all your senses!</p>
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
                  placeholder="Think about what you want to describe. Imagine yourself there and notice all the sensory details..."
                />
                <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
                  Use this space to brainstorm and gather sensory details about your subject.
                </p>
              </div>

              {/* Template Boxes - Vertical Layout */}
              <div className="space-y-6">
                {/* Subject */}
                <div className="bg-teal-50 dark:bg-teal-900/20 rounded-lg p-4 border border-teal-200 dark:border-teal-700">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white font-bold text-sm">1</span>
                    </div>
                    <h3 className="text-lg font-semibold text-teal-900 dark:text-teal-100">Subject & Setting</h3>
                  </div>
                  <textarea
                    value={templateData.subject}
                    onChange={(e) => handleTemplateChange('subject', e.target.value)}
                    className="w-full h-32 p-3 border border-teal-300 dark:border-teal-600 rounded-md resize-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-800 dark:text-white"
                    placeholder="What are you describing? A person, place, object, or scene? Set the basic scene for your reader..."
                  />
                  <p className="text-xs text-teal-600 dark:text-teal-400 mt-2">
                    Introduce what you are describing and give your reader a general overview.
                  </p>
                </div>

                {/* Sight */}
                <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border border-yellow-200 dark:border-yellow-700">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center mr-3">
                      <Eye className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-yellow-900 dark:text-yellow-100">What I See (Sight)</h3>
                    <button
                      onClick={toggleSensorySliders}
                      className="ml-auto flex items-center px-3 py-1 text-xs bg-yellow-600 text-white rounded hover:bg-yellow-700"
                    >
                      <Sliders className="w-3 h-3 mr-1" />
                      Sensory Explorer
                    </button>
                  </div>
                  <textarea
                    value={templateData.sight}
                    onChange={(e) => handleTemplateChange('sight', e.target.value)}
                    className="w-full h-32 p-3 border border-yellow-300 dark:border-yellow-600 rounded-md resize-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 dark:bg-gray-800 dark:text-white"
                    placeholder="What do you see? Colors, shapes, sizes, movements, lighting, textures that you can observe..."
                  />
                  <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-2">
                    Describe visual details that help your reader see what you see.
                  </p>
                  
                  {/* Descriptive Words Helper */}
                  {showSensorySliders && (
                    <div className="mt-3 p-2 bg-yellow-100 dark:bg-yellow-800/30 rounded border">
                      <div className="flex items-center mb-2">
                        <Eye className="w-4 h-4 text-yellow-600 dark:text-yellow-400 mr-1" />
                        <span className="text-xs font-medium text-yellow-800 dark:text-yellow-200">Sight Words:</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {descriptiveWords.sight.map((word, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              const currentText = templateData.sight;
                              const newText = currentText + (currentText ? ' ' : '') + word;
                              handleTemplateChange('sight', newText);
                            }}
                            className="px-2 py-1 text-xs bg-yellow-200 dark:bg-yellow-700 text-yellow-800 dark:text-yellow-200 rounded hover:bg-yellow-300 dark:hover:bg-yellow-600"
                          >
                            {word}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Sound */}
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-700">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white font-bold text-sm">👂</span>
                    </div>
                    <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">What I Hear (Sound)</h3>
                  </div>
                  <textarea
                    value={templateData.sound}
                    onChange={(e) => handleTemplateChange('sound', e.target.value)}
                    className="w-full h-32 p-3 border border-blue-300 dark:border-blue-600 rounded-md resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                    placeholder="What sounds do you hear? Loud, quiet, musical, harsh, natural sounds, voices, noises..."
                  />
                  <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
                    Include sounds that add atmosphere and help your reader hear the scene.
                  </p>
                  
                  {showSensorySliders && (
                    <div className="mt-3 p-2 bg-blue-100 dark:bg-blue-800/30 rounded border">
                      <div className="flex items-center mb-2">
                        <span className="text-xs font-medium text-blue-800 dark:text-blue-200">Sound Words:</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {descriptiveWords.sound.map((word, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              const currentText = templateData.sound;
                              const newText = currentText + (currentText ? ' ' : '') + word;
                              handleTemplateChange('sound', newText);
                            }}
                            className="px-2 py-1 text-xs bg-blue-200 dark:bg-blue-700 text-blue-800 dark:text-blue-200 rounded hover:bg-blue-300 dark:hover:bg-blue-600"
                          >
                            {word}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Smell */}
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-700">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white font-bold text-sm">👃</span>
                    </div>
                    <h3 className="text-lg font-semibold text-green-900 dark:text-green-100">What I Smell (Scent)</h3>
                  </div>
                  <textarea
                    value={templateData.smell}
                    onChange={(e) => handleTemplateChange('smell', e.target.value)}
                    className="w-full h-32 p-3 border border-green-300 dark:border-green-600 rounded-md resize-none focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-800 dark:text-white"
                    placeholder="What scents are in the air? Sweet, fresh, musty, floral, food smells, natural odors..."
                  />
                  <p className="text-xs text-green-600 dark:text-green-400 mt-2">
                    Smells can trigger strong memories and emotions in your reader.
                  </p>
                </div>

                {/* Touch */}
                <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 border border-orange-200 dark:border-orange-700">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white font-bold text-sm">✋</span>
                    </div>
                    <h3 className="text-lg font-semibold text-orange-900 dark:text-orange-100">What I Feel (Touch)</h3>
                  </div>
                  <textarea
                    value={templateData.touch}
                    onChange={(e) => handleTemplateChange('touch', e.target.value)}
                    className="w-full h-32 p-3 border border-orange-300 dark:border-orange-600 rounded-md resize-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-800 dark:text-white"
                    placeholder="What textures and temperatures do you feel? Smooth, rough, warm, cold, soft, hard..."
                  />
                  <p className="text-xs text-orange-600 dark:text-orange-400 mt-2">
                    Include physical sensations and textures that add realism to your description.
                  </p>
                </div>

                {/* Taste (Optional) */}
                <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border border-red-200 dark:border-red-700">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white font-bold text-sm">👅</span>
                    </div>
                    <h3 className="text-lg font-semibold text-red-900 dark:text-red-100">What I Taste (Optional)</h3>
                  </div>
                  <textarea
                    value={templateData.taste}
                    onChange={(e) => handleTemplateChange('taste', e.target.value)}
                    className="w-full h-32 p-3 border border-red-300 dark:border-red-600 rounded-md resize-none focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-gray-800 dark:text-white"
                    placeholder="If relevant, what tastes are present? Sweet, salty, bitter, spicy, fresh..."
                  />
                  <p className="text-xs text-red-600 dark:text-red-400 mt-2">
                    Only include taste if it is relevant to what you are describing.
                  </p>
                </div>

                {/* Figurative Language */}
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-700">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-3">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100">Similes & Metaphors</h3>
                  </div>
                  <textarea
                    value={templateData.figurativeLanguage}
                    onChange={(e) => handleTemplateChange('figurativeLanguage', e.target.value)}
                    className="w-full h-32 p-3 border border-purple-300 dark:border-purple-600 rounded-md resize-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-800 dark:text-white"
                    placeholder="Create comparisons to make your description more vivid. Use 'like' or 'as' for similes, direct comparisons for metaphors..."
                  />
                  <p className="text-xs text-purple-600 dark:text-purple-400 mt-2">
                    Use figurative language to create powerful images in your reader's mind.
                  </p>
                  
                  {/* Figurative Language Helper */}
                  <div className="mt-3 p-2 bg-purple-100 dark:bg-purple-800/30 rounded border">
                    <div className="flex items-center mb-2">
                      <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400 mr-1" />
                      <span className="text-xs font-medium text-purple-800 dark:text-purple-200">Comparison Starters:</span>
                    </div>
                    <div className="space-y-1">
                      {figurativeStarters.map((starter, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            const currentText = templateData.figurativeLanguage;
                            const newText = currentText + (currentText ? '\n' : '') + starter;
                            handleTemplateChange('figurativeLanguage', newText);
                          }}
                          className="block w-full text-left px-2 py-1 text-xs bg-purple-200 dark:bg-purple-700 text-purple-800 dark:text-purple-200 rounded hover:bg-purple-300 dark:hover:bg-purple-600"
                        >
                          {starter}
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
                      ? 'bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white shadow-lg'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <Palette className="w-5 h-5 mr-2" />
                  Start Writing Your Description
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
                  className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-all"
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
                      Submit Description
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex-1 p-4">
              <textarea
                value={content}
                onChange={(e) => onChange(e.target.value)}
                className="w-full h-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg resize-none focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-800 dark:text-white"
                placeholder="Start writing your descriptive piece here..."
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

