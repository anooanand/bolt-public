import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Save, Clock, Lightbulb, CheckSquare, Users, MapPin, Zap, Target, BookOpen, Edit3 } from 'lucide-react';

interface StructuredPlanningSectionProps {
  textType: string;
  onSavePlan: (plan: any) => void;
  isExpanded?: boolean;
  onToggle?: () => void;
}

interface PlanningStep {
  id: string;
  title: string;
  prompt: string;
  placeholder: string;
  icon: React.ReactNode;
}

export function StructuredPlanningSection({ 
  textType, 
  onSavePlan, 
  isExpanded = false, 
  onToggle 
}: StructuredPlanningSectionProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [showTimer, setShowTimer] = useState(false);
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (timerActive) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          setTimerActive(false);
          alert("Planning time is up! Time to start writing.");
        }
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerActive, minutes, seconds]);

  // Planning steps for different text types
  const planningSteps: Record<string, PlanningStep[]> = {
    narrative: [
      {
        id: 'characters',
        title: 'Characters',
        prompt: 'Who are your main characters? Describe their personalities, motivations, and relationships.',
        placeholder: 'e.g., Sarah - a brave 12-year-old who loves adventure; her younger brother Tom - cautious but loyal...',
        icon: <Users className="w-5 h-5" />
      },
      {
        id: 'setting',
        title: 'Setting',
        prompt: 'Where and when does your story take place? Describe the time, place, and atmosphere.',
        placeholder: 'e.g., A mysterious old mansion on a stormy night in 1920s England...',
        icon: <MapPin className="w-5 h-5" />
      },
      {
        id: 'conflict',
        title: 'Main Conflict',
        prompt: 'What is the main problem or conflict in your story? What challenges will your characters face?',
        placeholder: 'e.g., The children discover a hidden treasure map but must solve ancient riddles while avoiding dangerous traps...',
        icon: <Zap className="w-5 h-5" />
      },
      {
        id: 'plot',
        title: 'Plot Structure',
        prompt: 'How will your story unfold? Plan the beginning, middle, and end.',
        placeholder: 'Beginning: Discovery of the map\nMiddle: Solving riddles and facing challenges\nEnd: Finding the treasure and learning about courage...',
        icon: <BookOpen className="w-5 h-5" />
      },
      {
        id: 'resolution',
        title: 'Resolution',
        prompt: 'How will the story resolve? What will your characters learn or achieve?',
        placeholder: 'e.g., The children find the treasure but realize the real treasure was working together and being brave...',
        icon: <Target className="w-5 h-5" />
      }
    ],
    persuasive: [
      {
        id: 'position',
        title: 'Your Position',
        prompt: 'What is your main argument or position? State it clearly and confidently.',
        placeholder: 'e.g., Schools should start later in the morning because...',
        icon: <Target className="w-5 h-5" />
      },
      {
        id: 'audience',
        title: 'Target Audience',
        prompt: 'Who are you trying to persuade? What do they care about?',
        placeholder: 'e.g., School principals and parents who care about student wellbeing and academic performance...',
        icon: <Users className="w-5 h-5" />
      },
      {
        id: 'evidence',
        title: 'Supporting Evidence',
        prompt: 'What evidence, facts, or examples support your argument?',
        placeholder: 'e.g., Research shows teenagers need 9 hours of sleep; later start times improve test scores; reduces tardiness...',
        icon: <BookOpen className="w-5 h-5" />
      },
      {
        id: 'counterarguments',
        title: 'Counterarguments',
        prompt: 'What might opponents say? How will you address their concerns?',
        placeholder: 'e.g., "It would disrupt parent schedules" - but student health is more important, and many parents support this change...',
        icon: <Zap className="w-5 h-5" />
      },
      {
        id: 'call_to_action',
        title: 'Call to Action',
        prompt: 'What specific action do you want your audience to take?',
        placeholder: 'e.g., Vote to change school start times to 9:00 AM beginning next semester...',
        icon: <Edit3 className="w-5 h-5" />
      }
    ],
    expository: [
      {
        id: 'topic',
        title: 'Main Topic',
        prompt: 'What is your main topic or thesis? What will you explain or inform about?',
        placeholder: 'e.g., The process of photosynthesis and its importance to life on Earth...',
        icon: <Target className="w-5 h-5" />
      },
      {
        id: 'key_points',
        title: 'Key Points',
        prompt: 'What are the main points you will cover? List 3-4 key ideas.',
        placeholder: 'e.g., 1. What photosynthesis is 2. How it works 3. Why it\'s important 4. Environmental impact...',
        icon: <CheckSquare className="w-5 h-5" />
      },
      {
        id: 'organization',
        title: 'Organization',
        prompt: 'How will you organize your information? (chronological, cause-effect, compare-contrast, etc.)',
        placeholder: 'e.g., Process order - step by step explanation of how photosynthesis works...',
        icon: <BookOpen className="w-5 h-5" />
      },
      {
        id: 'examples',
        title: 'Examples & Evidence',
        prompt: 'What specific examples, facts, or details will you include?',
        placeholder: 'e.g., Chlorophyll absorbs light, oxygen is released, plants in rainforests produce 20% of Earth\'s oxygen...',
        icon: <Lightbulb className="w-5 h-5" />
      },
      {
        id: 'conclusion',
        title: 'Conclusion',
        prompt: 'How will you conclude? What key message do you want readers to remember?',
        placeholder: 'e.g., Photosynthesis is essential for all life - we must protect plants and forests...',
        icon: <Edit3 className="w-5 h-5" />
      }
    ],
    recount: [
      {
        id: 'event',
        title: 'Main Event',
        prompt: 'What event are you recounting? Provide a brief overview.',
        placeholder: 'e.g., My first day at a new school when I moved to a different city...',
        icon: <Target className="w-5 h-5" />
      },
      {
        id: 'when_where',
        title: 'When & Where',
        prompt: 'When and where did this event take place? Be specific.',
        placeholder: 'e.g., September 5th, 2023, at Riverside High School in Melbourne...',
        icon: <MapPin className="w-5 h-5" />
      },
      {
        id: 'people',
        title: 'People Involved',
        prompt: 'Who was involved in this event? Describe the key people.',
        placeholder: 'e.g., Me, my new teacher Mrs. Johnson, my classmate Alex who became my first friend...',
        icon: <Users className="w-5 h-5" />
      },
      {
        id: 'sequence',
        title: 'Sequence of Events',
        prompt: 'What happened first, then, next? Plan the chronological order.',
        placeholder: 'First: Arrived nervous and early\nThen: Met the teacher\nNext: Introduced to class\nFinally: Made a friend...',
        icon: <BookOpen className="w-5 h-5" />
      },
      {
        id: 'significance',
        title: 'Why It Matters',
        prompt: 'Why was this event significant? What did you learn or how did it affect you?',
        placeholder: 'e.g., I learned that new beginnings can be exciting, not just scary. It taught me to be open to new friendships...',
        icon: <Lightbulb className="w-5 h-5" />
      }
    ]
  };

  const currentSteps = planningSteps[textType.toLowerCase()] || planningSteps.narrative;

  const handleResponseChange = (stepId: string, value: string) => {
    setResponses(prev => ({
      ...prev,
      [stepId]: value
    }));
  };

  const nextStep = () => {
    if (currentStep < currentSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const savePlan = () => {
    const plan = {
      textType,
      responses,
      completedSteps: currentSteps.map(step => ({
        ...step,
        response: responses[step.id] || ''
      })),
      timestamp: new Date().toISOString()
    };
    onSavePlan(plan);
  };

  const startTimer = () => setTimerActive(true);
  const pauseTimer = () => setTimerActive(false);
  const resetTimer = () => {
    setTimerActive(false);
    setMinutes(5);
    setSeconds(0);
  };

  if (!isExpanded) {
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm mb-4">
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <div className="flex items-center">
            <Lightbulb className="w-5 h-5 text-yellow-500 mr-3" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Planning Section
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Step-by-step guided planning for {textType} writing
              </p>
            </div>
          </div>
          <ChevronDown className="w-5 h-5 text-gray-500" />
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm mb-4">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <Lightbulb className="w-5 h-5 text-yellow-500 mr-3" />
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Planning Section - {textType}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Step {currentStep + 1} of {currentSteps.length}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowTimer(!showTimer)}
            className="flex items-center px-3 py-1.5 text-sm font-medium rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <Clock className="h-4 w-4 mr-1.5" />
            Timer
          </button>
          <button
            onClick={onToggle}
            className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
          >
            <ChevronUp className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Timer */}
      {showTimer && (
        <div className="px-4 pt-4">
          <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-md">
            <div className="flex items-center justify-between">
              <div className="text-blue-800 dark:text-blue-300 font-medium">
                Planning Timer: {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </div>
              <div className="flex space-x-2">
                {!timerActive ? (
                  <button
                    onClick={startTimer}
                    className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Start
                  </button>
                ) : (
                  <button
                    onClick={pauseTimer}
                    className="px-2 py-1 text-xs bg-yellow-600 text-white rounded hover:bg-yellow-700"
                  >
                    Pause
                  </button>
                )}
                <button
                  onClick={resetTimer}
                  className="px-2 py-1 text-xs bg-gray-600 text-white rounded hover:bg-gray-700"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Progress Bar */}
      <div className="px-4 pb-4">
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / currentSteps.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Current Step */}
      <div className="px-4 pb-4">
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <div className="flex items-center mb-3">
            <div className="text-blue-500 mr-3">
              {currentSteps[currentStep].icon}
            </div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              {currentSteps[currentStep].title}
            </h4>
          </div>
          
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            {currentSteps[currentStep].prompt}
          </p>
          
          <textarea
            value={responses[currentSteps[currentStep].id] || ''}
            onChange={(e) => handleResponseChange(currentSteps[currentStep].id, e.target.value)}
            placeholder={currentSteps[currentStep].placeholder}
            className="w-full h-32 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between p-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={prevStep}
          disabled={currentStep === 0}
          className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        
        <div className="flex space-x-2">
          {currentSteps.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentStep(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentStep
                  ? 'bg-blue-500'
                  : index < currentStep
                  ? 'bg-green-500'
                  : 'bg-gray-300 dark:bg-gray-600'
              }`}
            />
          ))}
        </div>
        
        {currentStep === currentSteps.length - 1 ? (
          <button
            onClick={savePlan}
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Plan
          </button>
        ) : (
          <button
            onClick={nextStep}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
