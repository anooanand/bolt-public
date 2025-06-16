import React, { useState, useEffect } from 'react';
import { X, Save, Clock, Lightbulb, CheckSquare } from 'lucide-react';
import { PlanningTool } from './text-type-templates/PlanningTool';

interface PlanningToolModalProps {
  isOpen: boolean;
  onClose: () => void;
  textType: string;
  onSavePlan: (plan: any) => void;
}

export function PlanningToolModal({ 
  isOpen, 
  onClose, 
  textType, 
  onSavePlan 
}: PlanningToolModalProps) {
  const [showTimer, setShowTimer] = useState(false);
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

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

  const startTimer = () => {
    setTimerActive(true);
  };

  const pauseTimer = () => {
    setTimerActive(false);
  };

  const resetTimer = () => {
    setTimerActive(false);
    setMinutes(5);
    setSeconds(0);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        
        <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Planning Tool</h2>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowTimer(!showTimer)}
                className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <Clock className="h-4 w-4 mr-1.5" />
                {showTimer ? 'Hide Timer' : 'Show Timer'}
              </button>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>
          
          {showTimer && (
            <div className="px-6 pt-4">
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
                <div className="mt-2 text-xs text-blue-600 dark:text-blue-400">
                  Recommendation: Spend 5 minutes planning before you start writing
                </div>
              </div>
            </div>
          )}
          
          <div className="px-6 py-4 max-h-[70vh] overflow-y-auto">
            <PlanningTool textType={textType} onSavePlan={onSavePlan} />
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 mr-3"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onSavePlan({
                  // Sample plan data
                  mainIdeas: ['Introduction', 'Main arguments', 'Conclusion'],
                  structure: [
                    { section: 'Introduction', content: 'Set up the topic and state position' },
                    { section: 'Body Paragraph 1', content: 'First main argument with evidence' },
                    { section: 'Body Paragraph 2', content: 'Second main argument with evidence' },
                    { section: 'Body Paragraph 3', content: 'Third main argument with evidence' },
                    { section: 'Conclusion', content: 'Restate position and summarize arguments' }
                  ],
                  keyPoints: ['Use persuasive language', 'Include evidence', 'Address counterarguments'],
                  vocabulary: ['Consequently', 'Furthermore', 'Undoubtedly', 'Compelling']
                });
                onClose();
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <Save className="inline-block h-4 w-4 mr-2" />
              Save Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}