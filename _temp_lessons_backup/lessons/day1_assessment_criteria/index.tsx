import React, { useState } from 'react';
import { OverviewTab } from './OverviewTab';
import { ActivitiesTab } from './ActivitiesTab';
import { PracticeTab } from './PracticeTab';
import { SupportTab } from './SupportTab';

export default function Day1AssessmentCriteria() {
  const [activeTab, setActiveTab] = useState('overview');
  const [completedActivities, setCompletedActivities] = useState<string[]>([]);

  const toggleActivityCompletion = (activity: string) => {
    setCompletedActivities(prev => 
      prev.includes(activity) 
        ? prev.filter(a => a !== activity)
        : [...prev, activity]
    );
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-6 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">
            Day 1: Understanding Writing Assessment Criteria
          </h2>
          <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            Day 1 of 30
          </div>
        </div>
        <p className="text-gray-600">
          Today we'll explore how the NSW Selective School exam evaluates your writing. Understanding these criteria will help you focus your practice and improve your scores!
        </p>
      </div>

      <div className="border-b">
        <nav className="flex">
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'overview' 
                ? 'border-b-2 border-indigo-500 text-indigo-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'activities' 
                ? 'border-b-2 border-indigo-500 text-indigo-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('activities')}
          >
            Activities
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'practice' 
                ? 'border-b-2 border-indigo-500 text-indigo-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('practice')}
          >
            Practice Task
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'support' 
                ? 'border-b-2 border-indigo-500 text-indigo-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('support')}
          >
            Extra Help
          </button>
        </nav>
      </div>

      <div className="p-6">
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'activities' && (
          <ActivitiesTab 
            completedActivities={completedActivities}
            toggleActivityCompletion={toggleActivityCompletion}
          />
        )}
        {activeTab === 'practice' && <PracticeTab />}
        {activeTab === 'support' && <SupportTab />}
      </div>
    </div>
  );
}