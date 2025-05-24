// SkillDrills.tsx - Interactive skill practice exercises
import React, { useState, useEffect } from 'react';
import { Info, CheckCircle, AlertCircle, HelpCircle } from 'lucide-react';

interface SkillDrillsProps {
  textType: string;
}

interface Skill {
  id: string;
  name: string;
  description: string;
  exercises: Exercise[];
  progress: number; // 0-100
}

interface Exercise {
  id: string;
  instruction: string;
  example: string;
  hints: string[];
  possibleAnswers?: string[]; // For multiple choice or matching exercises
}

export function SkillDrills({ textType }: SkillDrillsProps) {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [currentExercise, setCurrentExercise] = useState<Exercise | null>(null);
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'hint' | 'error'; message: string } | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inPracticeMode, setInPracticeMode] = useState(false);

  // Load skills based on writing type
  useEffect(() => {
    if (!textType) return;
    
    setIsLoading(true);
    
    // In a real implementation, this would fetch from an API
    // For now, we'll use mock data based on the writing type
    setTimeout(() => {
      setSkills(getMockSkills(textType));
      setIsLoading(false);
    }, 1000);
  }, [textType]);

  const getMockSkills = (type: string): Skill[] => {
    // Different skills based on writing type
    if (type === 'narrative') {
      return [
        {
          id: 'characters',
          name: 'Creating Engaging Characters',
          description: 'Learn how to create memorable characters with distinct personalities, motivations, and traits.',
          progress: 25,
          exercises: [
            {
              id: 'char1',
              instruction: 'Add character traits to make this description more vivid:',
              example: 'The old man walked down the street.',
              hints: ['Consider physical appearance', 'Think about how they move', 'Add a unique habit or mannerism']
            },
            {
              id: 'char2',
              instruction: 'Rewrite this to show the character\'s personality through actions:',
              example: 'Sarah was very nervous about the test.',
              hints: ['What physical signs show nervousness?', 'How might her voice sound?', 'What nervous habits might she have?']
            }
          ]
        },
        {
          id: 'setting',
          name: 'Setting the Scene',
          description: 'Practice creating vivid settings that engage the reader\'s senses and establish mood.',
          progress: 50,
          exercises: [
            {
              id: 'setting1',
              instruction: 'Add sensory details to this setting description:',
              example: 'It was a cold winter morning in the forest.',
              hints: ['What might you hear?', 'What might you smell?', 'How does the air feel on your skin?']
            }
          ]
        },
        {
          id: 'show-dont-tell',
          name: 'Show, Don\'t Tell',
          description: 'Learn to show emotions and situations through descriptive details rather than simply stating them.',
          progress: 10,
          exercises: [
            {
              id: 'sdt1',
              instruction: 'Rewrite this sentence to show the emotion rather than telling it:',
              example: 'The boy was very happy about his new bike.',
              hints: ['What physical signs show happiness?', 'What might he do with the bike?', 'How might his voice sound?']
            }
          ]
        }
      ];
    } else if (type === 'persuasive') {
      return [
        {
          id: 'arguments',
          name: 'Creating Strong Arguments',
          description: 'Learn to construct logical, compelling arguments supported by evidence.',
          progress: 30,
          exercises: [
            {
              id: 'arg1',
              instruction: 'Strengthen this argument by adding specific evidence:',
              example: 'School uniforms are good for students.',
              hints: ['What specific benefits do uniforms provide?', 'Can you cite any examples or studies?', 'Consider addressing a counterargument']
            }
          ]
        },
        {
          id: 'persuasive-language',
          name: 'Persuasive Language Techniques',
          description: 'Practice using rhetorical devices and persuasive language to influence your reader.',
          progress: 15,
          exercises: [
            {
              id: 'pl1',
              instruction: 'Add a rhetorical question to make this statement more persuasive:',
              example: 'We need to reduce plastic waste in our oceans.',
              hints: ['Ask something that makes the reader reflect', 'Consider the consequences of inaction', 'Appeal to the reader\'s values']
            }
          ]
        }
      ];
    } else {
      // Default skills for other writing types
      return [
        {
          id: 'structure',
          name: 'Effective Structure',
          description: 'Learn to organize your writing with clear beginnings, middles, and endings.',
          progress: 40,
          exercises: [
            {
              id: 'struct1',
              instruction: 'Write a strong opening sentence for this topic:',
              example: 'A topic about climate change',
              hints: ['Consider starting with a surprising fact', 'You could ask a thought-provoking question', 'Try beginning with a relevant quote']
            }
          ]
        },
        {
          id: 'vocabulary',
          name: 'Expanding Vocabulary',
          description: 'Enhance your writing by using more precise and varied word choices.',
          progress: 60,
          exercises: [
            {
              id: 'vocab1',
              instruction: 'Replace the underlined word with a more specific and vivid alternative:',
              example: 'The dog walked across the yard.',
              hints: ['How is the dog moving?', 'Is it moving quickly or slowly?', 'Consider the dog\'s mood or purpose']
            }
          ]
        }
      ];
    }
  };

  const handleSkillSelect = (skill: Skill) => {
    setSelectedSkill(skill);
    setInPracticeMode(false);
    setCurrentExercise(null);
    setExerciseIndex(0);
    setUserAnswer('');
    setFeedback(null);
    setShowHint(false);
  };

  const startPractice = () => {
    if (selectedSkill && selectedSkill.exercises.length > 0) {
      setCurrentExercise(selectedSkill.exercises[0]);
      setExerciseIndex(0);
      setInPracticeMode(true);
      setUserAnswer('');
      setFeedback(null);
      setShowHint(false);
    }
  };

  const handleSubmitAnswer = () => {
    if (!userAnswer.trim()) {
      setFeedback({
        type: 'error',
        message: 'Please enter your answer before submitting.'
      });
      return;
    }

    // In a real implementation, this would use AI to evaluate the answer
    // For now, we'll provide generic positive feedback
    setFeedback({
      type: 'success',
      message: 'Great job! Your answer shows creativity and understanding of the concept.'
    });
    
    // Update progress (in a real implementation, this would be more sophisticated)
    setSkills(prevSkills => 
      prevSkills.map(skill => 
        skill.id === selectedSkill?.id 
          ? { ...skill, progress: Math.min(100, skill.progress + 10) } 
          : skill
      )
    );
  };

  const handleNextExercise = () => {
    if (selectedSkill && currentExercise) {
      const nextIndex = exerciseIndex + 1;
      if (nextIndex < selectedSkill.exercises.length) {
        setCurrentExercise(selectedSkill.exercises[nextIndex]);
        setExerciseIndex(nextIndex);
        setUserAnswer('');
        setFeedback(null);
        setShowHint(false);
      } else {
        // End of exercises for this skill
        setInPracticeMode(false);
        setFeedback({
          type: 'success',
          message: 'You\'ve completed all exercises for this skill!'
        });
      }
    }
  };

  const handleShowHint = () => {
    setShowHint(true);
  };

  if (!textType) {
    return (
      <div className="text-center py-12">
        <div className="text-amber-600 mb-4">
          <Info className="h-12 w-12 mx-auto" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Please Select a Writing Type</h3>
        <p className="text-gray-600">
          Choose a writing type from the dropdown menu to see relevant skill drills.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-gray-600">Loading skill drills...</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {textType.charAt(0).toUpperCase() + textType.slice(1)} Writing Skills
      </h2>
      
      {inPracticeMode && currentExercise ? (
        <div className="bg-white rounded-lg border p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              {selectedSkill?.name}: Practice
            </h3>
            <div className="text-sm text-gray-500">
              Exercise {exerciseIndex + 1} of {selectedSkill?.exercises.length}
            </div>
          </div>
          
          <div className="mb-6">
            <p className="font-medium text-gray-700 mb-2">Instructions:</p>
            <p className="text-gray-600 mb-4">{currentExercise.instruction}</p>
            
            <div className="bg-gray-50 p-4 rounded-md mb-4">
              <p className="text-gray-800">{currentExercise.example}</p>
            </div>
          </div>
          
          <div className="mb-6">
            <label htmlFor="answer" className="block font-medium text-gray-700 mb-2">
              Your Answer:
            </label>
            <textarea
              id="answer"
              rows={4}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Type your answer here..."
            />
          </div>
          
          {feedback && (
            <div className={`p-4 rounded-md mb-6 ${
              feedback.type === 'success' ? 'bg-green-50 text-green-800' :
              feedback.type === 'hint' ? 'bg-blue-50 text-blue-800' :
              'bg-red-50 text-red-800'
            }`}>
              <div className="flex items-start">
                {feedback.type === 'success' && <CheckCircle className="h-5 w-5 mr-2 shrink-0" />}
                {feedback.type === 'hint' && <HelpCircle className="h-5 w-5 mr-2 shrink-0" />}
                {feedback.type === 'error' && <AlertCircle className="h-5 w-5 mr-2 shrink-0" />}
                <p>{feedback.message}</p>
              </div>
            </div>
          )}
          
          {showHint && currentExercise.hints.length > 0 && (
            <div className="bg-blue-50 p-4 rounded-md mb-6">
              <p className="font-medium text-blue-800 mb-2">Hints:</p>
              <ul className="list-disc pl-5 text-blue-700 space-y-1">
                {currentExercise.hints.map((hint, index) => (
                  <li key={index}>{hint}</li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="flex justify-between">
            <div>
              <button
                onClick={() => setInPracticeMode(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 text-sm font-medium"
              >
                Back to Skills
              </button>
              {!showHint && (
                <button
                  onClick={handleShowHint}
                  className="ml-2 px-4 py-2 border border-blue-300 rounded-md text-blue-700 hover:bg-blue-50 text-sm font-medium"
                >
                  Hint
                </button>
              )}
            </div>
            
            <div>
              {feedback?.type === 'success' ? (
                <button
                  onClick={handleNextExercise}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium"
                >
                  Next Exercise
                </button>
              ) : (
                <button
                  onClick={handleSubmitAnswer}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium"
                >
                  Check Answer
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <>
          {selectedSkill ? (
            <div className="bg-white rounded-lg border p-6 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">{selectedSkill.name}</h3>
                <button
                  onClick={() => setSelectedSkill(null)}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Back to all skills
                </button>
              </div>
              
              <p className="text-gray-600 mb-6">{selectedSkill.description}</p>
              
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Your progress</span>
                  <span className="text-sm text-gray-500">{selectedSkill.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full" 
                    style={{ width: `${selectedSkill.progress}%` }}
                  ></div>
                </div>
              </div>
              
              <button
                onClick={startPractice}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium"
              >
                Start Practice
              </button>
            </div>
          ) : (
            <div>
              <p className="text-gray-600 mb-6">Choose a skill to practice:</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {skills.map((skill) => (
                  <div 
                    key={skill.id}
                    className="bg-white rounded-lg border p-4 hover:border-blue-300 hover:shadow-sm cursor-pointer transition-all"
                    onClick={() => handleSkillSelect(skill)}
                  >
                    <h3 className="font-medium text-gray-900 mb-2">{skill.name}</h3>
                    <p className="text-gray-600 text-sm mb-3">{skill.description}</p>
                    
                    <div className="flex justify-between items-center text-xs text-gray-500 mb-1">
                      <span>Progress</span>
                      <span>{skill.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className="bg-blue-600 h-1.5 rounded-full" 
                        style={{ width: `${skill.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
