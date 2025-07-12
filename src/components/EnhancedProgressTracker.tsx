import React, { useState, useEffect } from 'react';
import { CheckCircle, Star, Trophy, Target, Clock, Zap } from 'lucide-react';

interface ProgressTrackerProps {
  currentStep: string;
  completedSteps: string[];
  totalSteps: number;
  wordCount: number;
  timeSpent: number;
  writingStreak: number;
}

export function EnhancedProgressTracker({
  currentStep,
  completedSteps,
  totalSteps,
  wordCount,
  timeSpent,
  writingStreak
}: ProgressTrackerProps) {
  const [showCelebration, setShowCelebration] = useState(false);
  const progressPercentage = (completedSteps.length / totalSteps) * 100;

  // Trigger celebration when reaching milestones
  useEffect(() => {
    if (progressPercentage === 25 || progressPercentage === 50 || progressPercentage === 75 || progressPercentage === 100) {
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 3000);
    }
  }, [progressPercentage]);

  const milestones = [
    { percentage: 25, icon: Star, color: 'text-yellow-500', label: 'Great Start!' },
    { percentage: 50, icon: Target, color: 'text-blue-500', label: 'Halfway There!' },
    { percentage: 75, icon: Zap, color: 'text-purple-500', label: 'Almost Done!' },
    { percentage: 100, icon: Trophy, color: 'text-green-500', label: 'Amazing Work!' }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">📊 Writing Progress</h3>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 text-orange-500">
            <Zap className="w-4 h-4" />
            <span className="text-sm font-bold">{writingStreak} day streak!</span>
          </div>
        </div>
      </div>

      {/* Circular Progress Indicator */}
      <div className="relative flex items-center justify-center mb-6">
        <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-gray-200 dark:text-gray-700"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="url(#progressGradient)"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={`${progressPercentage * 2.51} 251`}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="50%" stopColor="#d946ef" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-800 dark:text-gray-200">
              {Math.round(progressPercentage)}%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Complete</div>
          </div>
        </div>
      </div>

      {/* Milestone Indicators */}
      <div className="flex justify-between mb-6">
        {milestones.map((milestone) => {
          const Icon = milestone.icon;
          const isReached = progressPercentage >= milestone.percentage;
          return (
            <div key={milestone.percentage} className="flex flex-col items-center">
              <div className={`p-3 rounded-full ${isReached ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gray-200 dark:bg-gray-700'} transition-all duration-500`}>
                <Icon className={`w-5 h-5 ${isReached ? 'text-white' : 'text-gray-400'}`} />
              </div>
              <div className="text-xs mt-2 text-center">
                <div className="font-medium">{milestone.percentage}%</div>
                {isReached && (
                  <div className={`${milestone.color} text-xs font-bold animate-pulse`}>
                    {milestone.label}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Step Progress */}
      <div className="space-y-3 mb-6">
        <h4 className="font-semibold text-gray-700 dark:text-gray-300">Template Progress:</h4>
        {['Setting', 'Characters', 'Plot', 'Theme'].map((step, index) => {
          const isCompleted = completedSteps.includes(step);
          const isCurrent = currentStep === step;
          return (
            <div key={step} className="flex items-center space-x-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                isCompleted ? 'bg-green-500' : isCurrent ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
              }`}>
                {isCompleted ? (
                  <CheckCircle className="w-4 h-4 text-white" />
                ) : (
                  <span className="text-xs font-bold text-white">{index + 1}</span>
                )}
              </div>
              <span className={`font-medium ${isCompleted ? 'text-green-600 dark:text-green-400' : isCurrent ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500'}`}>
                {step}
              </span>
              {isCompleted && (
                <span className="text-xs text-green-500 font-medium">✓ Complete</span>
              )}
            </div>
          );
        })}
      </div>

      {/* Writing Stats */}
      <div className="grid grid-cols-2 gap-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{wordCount}</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Words Written</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{Math.round(timeSpent / 60)}</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Minutes Writing</div>
        </div>
      </div>

      {/* Celebration Animation */}
      {showCelebration && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-2xl z-10">
          <div className="text-center text-white animate-bounce">
            <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-400" />
            <div className="text-2xl font-bold">Milestone Reached!</div>
            <div className="text-lg">Keep up the amazing work! 🎉</div>
          </div>
        </div>
      )}
    </div>
  );
}

