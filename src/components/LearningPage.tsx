import React, { useState } from 'react';
import { EnhancedLearningPlan } from './EnhancedLearningPlan';
import { ProgressDashboard } from './ProgressDashboard';
import { useLearning } from '../contexts/LearningContext';

interface LearningPageProps {
  state?: {
    content: string;
    textType: string;
    assistanceLevel: string;
    timerStarted: boolean;
  };
  onStateChange?: (updates: Partial<typeof LearningPageProps.prototype.state>) => void;
  onNavigateToWriting?: () => void;
}

export function LearningPage({ state, onStateChange, onNavigateToWriting }: LearningPageProps) {
  const [activeView, setActiveView] = useState<'plan' | 'progress'>('plan');
  const { progress } = useLearning();
  
  // Default state values if not provided
  const textType = state?.textType || '';
  const assistanceLevel = state?.assistanceLevel || 'detailed';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center space-x-3">
              <div className="flex items-center text-blue-600 mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3Z"></path>
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">NSW Selective Essay Coach</h1>
                <p className="text-gray-600 mt-1">Master essay writing with our structured learning system</p>
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="flex items-center space-x-6 bg-white rounded-lg p-4 shadow-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{progress.completedLessons.length}</div>
                <div className="text-xs text-gray-500">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{progress.currentStreak}</div>
                <div className="text-xs text-gray-500">Day Streak</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{progress.totalPoints}</div>
                <div className="text-xs text-gray-500">Points</div>
              </div>
            </div>
          </div>
          
          {/* Navigation Tabs */}
          <div className="flex border-b border-gray-200 mt-6">
            <button
              className={`py-3 px-6 font-medium text-sm transition-colors ${
                activeView === 'plan'
                  ? 'bg-blue-50 border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setActiveView('plan')}
            >
              📚 Learning Plan
            </button>
            <button
              className={`py-3 px-6 font-medium text-sm transition-colors ${
                activeView === 'progress'
                  ? 'bg-blue-50 border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setActiveView('progress')}
            >
              📊 Progress Dashboard
            </button>
            <button
              className={`py-3 px-6 font-medium text-sm ml-auto ${
                'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
              onClick={onNavigateToWriting}
            >
              ✏️ Writing Mode
            </button>
          </div>

          {/* Settings Bar */}
          {onStateChange && (
            <div className="flex flex-wrap gap-4 mt-4 items-center">
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">Writing Type:</label>
                <select
                  value={textType}
                  onChange={(e) => onStateChange({ textType: e.target.value })}
                  className="rounded-md border-gray-300 py-1.5 pl-3 pr-10 text-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                >
                  <option value="">Select writing type...</option>
                  <option value="narrative">Narrative</option>
                  <option value="persuasive">Persuasive</option>
                  <option value="expository">Expository / Informative</option>
                  <option value="reflective">Reflective</option>
                  <option value="descriptive">Descriptive</option>
                  <option value="recount">Recount</option>
                  <option value="discursive">Discursive</option>
                  <option value="news">News Report</option>
                  <option value="letter">Letter</option>
                  <option value="diary">Diary Entry</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">Assistance Level:</label>
                <select
                  value={assistanceLevel}
                  onChange={(e) => onStateChange({ assistanceLevel: e.target.value })}
                  className="rounded-md border-gray-300 py-1.5 pl-3 pr-10 text-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                >
                  <option value="detailed">Detailed Assistance</option>
                  <option value="moderate">Moderate Guidance</option>
                  <option value="minimal">Minimal Support</option>
                </select>
              </div>
            </div>
          )}
        </header>

        {/* Main Content */}
        <main>
          {activeView === 'plan' ? (
            <EnhancedLearningPlan />
          ) : (
            <ProgressDashboard progressData={progress} />
          )}
        </main>
      </div>
    </div>
  );
}