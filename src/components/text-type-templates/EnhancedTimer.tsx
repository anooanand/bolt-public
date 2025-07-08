import React from 'react';
import { BookOpen, Clock, AlertCircle, Zap, Star } from 'lucide-react';

interface EnhancedTimerProps {
  onStart: () => void;
  onPause?: () => void;
  onReset?: () => void;
}

export function EnhancedTimer({ onStart, onPause, onReset }: EnhancedTimerProps) {
  const [timeLeft, setTimeLeft] = React.useState(30 * 60); // 30 minutes in seconds
  const [active, setActive] = React.useState(false);
  const [showTimelineModal, setShowTimelineModal] = React.useState(false);
  const [phase, setPhase] = React.useState<'planning' | 'writing' | 'editing'>('planning');

  React.useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (active && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => {
          const newTime = time - 1;
          
          // Set phase based on time remaining
          if (newTime <= 5 * 60) {
            if (phase !== 'editing') {
              setPhase('editing');
              showNotification('Time to start editing and proofreading!');
            }
          } else if (newTime <= 25 * 60) {
            if (phase !== 'writing') {
              setPhase('writing');
              showNotification('Time to start writing your main content!');
            }
          }
          
          // Show notifications at specific time points
          if (newTime === 20 * 60) { // 20 minutes left
            showNotification('10 minutes have passed. You should be well into your writing now.');
          } else if (newTime === 10 * 60) { // 10 minutes left
            showNotification('10 minutes remaining. Start wrapping up your main points.');
          } else if (newTime === 5 * 60) { // 5 minutes left
            showNotification('5 minutes remaining. Time to edit and proofread!');
          } else if (newTime === 60) { // 1 minute left
            showNotification('1 minute remaining. Final check!');
          }
          
          return newTime;
        });
      }, 1000);
    } else if (timeLeft === 0) {
      setActive(false);
      showNotification('Time is up! Your 30 minutes have ended.');
      if (onPause) onPause();
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [active, timeLeft, phase, onPause]);

  const showNotification = (message: string) => {
    // Create and show a notification
    if (Notification.permission === 'granted') {
      new Notification('NSW Selective Writing Coach', {
        body: message,
        icon: '/favicon.ico'
      });
    }
    
    // Also show an on-screen notification
    const notification = document.createElement('div');
    notification.className = 'fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-md shadow-lg z-50 animate-bounce';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.classList.add('opacity-0', 'transition-opacity', 'duration-500');
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 500);
    }, 5000);
  };

  const handleToggle = () => {
    const newActive = !active;
    setActive(newActive);
    
    if (newActive) {
      if (onStart) onStart();
      if (timeLeft === 30 * 60) {
        showNotification('Timer started! You have 5 minutes for planning.');
      } else {
        showNotification('Timer resumed!');
      }
    } else {
      if (onPause) onPause();
      showNotification('Timer paused.');
    }
  };

  const handleReset = () => {
    setActive(false);
    setTimeLeft(30 * 60);
    setPhase('planning');
    if (onReset) onReset();
    showNotification('Timer reset to 30 minutes.');
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const getTimerColor = () => {
    if (timeLeft > 25 * 60) {
        return 'border-green-300 bg-gradient-to-r from-green-100 to-green-200 text-green-700';
    } else if (timeLeft <= 5 * 60) {
        return 'border-red-300 bg-gradient-to-r from-red-100 to-red-200 text-red-700';
    } else if (timeLeft <= 5 * 60) {
        return 'bg-red-50 border-red-300 text-red-700'; // Less than 5 minutes
    } else if (timeLeft <= 10 * 60) {
        return 'border-gray-300 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700';
    } else {
        return 'border-blue-300 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700';
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleToggle}
        className={`inline-flex items-center space-x-2 px-4 py-2 text-sm font-bold rounded-xl border-3 ${
          active 
            ? `${getTimerColor()} shadow-md transform scale-105` 
            : 'border-red-300 bg-gradient-to-r from-red-100 to-red-200 text-red-700 hover:from-red-200 hover:to-red-300'
        } transition-all duration-300 hover:scale-105 shadow-md`}
      >
        <Clock className="h-5 w-5 mr-2" />
        <span>
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </span>
        {active && seconds <= 30 && (
          <Zap className="h-4 w-4 ml-1 text-yellow-500 animate-pulse" />
        )}
      </button>
      
      {active && (
        <div className="absolute right-0 mt-2 flex space-x-2">
          <button
            onClick={handleReset}
            className="text-xs bg-gradient-to-r from-gray-200 to-gray-300 text-gray-700 px-3 py-1 rounded-lg font-bold hover:from-gray-300 hover:to-gray-400 transition-all duration-300 shadow-sm"
            title="Reset Timer"
          >
            Reset
          </button>
          <button
            onClick={() => setShowTimelineModal(true)}
            className="text-xs bg-gradient-to-r from-blue-200 to-blue-300 text-blue-700 px-3 py-1 rounded-lg font-bold hover:from-blue-300 hover:to-blue-400 transition-all duration-300 shadow-sm"
            title="Show Timeline"
          >
            <span className="flex items-center">
              <Star className="h-3 w-3 mr-1" />
              Timeline
            </span>
          </button>
        </div>
      )}
      
      {showTimelineModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      Exam Time Management
                    </h3>
                    <div className="mt-4">
                      <p className="text-sm text-gray-500 mb-4">
                        The NSW Selective exam gives you 30 minutes for the writing task. Here's how to use your time effectively:
                      </p>
                      
                      <div className="relative pt-1">
                        <div className="flex mb-2 items-center justify-between">
                          <div>
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-blue-200 text-blue-800">
                              Planning (5 min)
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-xs font-semibold inline-block text-blue-800">
                              0-5 minutes
                            </span>
                          </div>
                        </div>
                        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                          <div style={{ width: "17%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"></div>
                        </div>
                        <ul className="text-xs text-gray-600 ml-2 mb-4">
                          <li>• Understand the task and writing type</li>
                          <li>• Brainstorm main ideas</li>
                          <li>• Create a quick outline</li>
                          <li>• Plan your beginning, middle, and end</li>
                        </ul>
                      </div>
                      
                      <div className="relative pt-1">
                        <div className="flex mb-2 items-center justify-between">
                          <div>
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-green-200 text-green-800">
                              Writing (20 min)
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-xs font-semibold inline-block text-green-800">
                              5-25 minutes
                            </span>
                          </div>
                        </div>
                        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                          <div style={{ width: "66%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"></div>
                        </div>
                        <ul className="text-xs text-gray-600 ml-2 mb-4">
                          <li>• Write your introduction (2-3 min)</li>
                          <li>• Develop your main content (15 min)</li>
                          <li>• Write your conclusion (2-3 min)</li>
                          <li>• Focus on quality over quantity</li>
                        </ul>
                      </div>
                      
                      <div className="relative pt-1">
                        <div className="flex mb-2 items-center justify-between">
                          <div>
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-red-200 text-red-800">
                              Editing (5 min)
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-xs font-semibold inline-block text-red-800">
                              25-30 minutes
                            </span>
                          </div>
                        </div>
                        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                          <div style={{ width: "17%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"></div>
                        </div>
                        <ul className="text-xs text-gray-600 ml-2">
                          <li>• Check for spelling and grammar errors</li>
                          <li>• Ensure your writing makes sense</li>
                          <li>• Add or improve descriptive language</li>
                          <li>• Make sure your conclusion connects to your introduction</li>
                        </ul>
                      </div>
                      
                      <div className="mt-4 flex items-center">
                        <AlertCircle className="h-4 w-4 text-yellow-500 mr-1" />
                        <p className="text-xs text-yellow-700">
                          Your current phase: <span className="font-bold capitalize">{phase}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setShowTimelineModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
