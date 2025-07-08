import React, { useState, useEffect } from 'react';
import { InteractiveQuiz } from './InteractiveQuiz';

interface LessonActivity {
  id: string;
  type: 'reading' | 'exercise' | 'quiz' | 'writing' | 'discussion';
  title: string;
  content: any;
  estimatedTime: number;
  points: number;
}

interface LessonProps {
  day: number;
  title: string;
  description: string;
  learningObjectives: string[];
  activities: LessonActivity[];
  onComplete: (score: number) => void;
}

export function EnhancedLessonTemplate({ 
  day, 
  title, 
  description, 
  learningObjectives, 
  activities, 
  onComplete 
}: LessonProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [completedActivities, setCompletedActivities] = useState<string[]>([]);
  const [activityScores, setActivityScores] = useState<{ [key: string]: number }>({});
  const [lessonStartTime, setLessonStartTime] = useState<Date>(new Date());
  const [timeSpent, setTimeSpent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeSpent(Math.floor((new Date().getTime() - lessonStartTime.getTime()) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [lessonStartTime]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleActivityComplete = (activityId: string, score?: number) => {
    setCompletedActivities(prev => [...new Set([...prev, activityId])]);
    if (score !== undefined) {
      setActivityScores(prev => ({ ...prev, [activityId]: score }));
    }
  };

  const getOverallProgress = () => {
    return Math.round((completedActivities.length / activities.length) * 100);
  };

  const getOverallScore = () => {
    const scores = Object.values(activityScores);
    if (scores.length === 0) return 0;
    return Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length);
  };

  const handleLessonComplete = () => {
    const finalScore = getOverallScore();
    onComplete(finalScore);
  };

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Learning Objectives */}
      <div className="bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">📚 What You'll Learn Today</h3>
        <ul className="space-y-2">
          {learningObjectives.map((objective, index) => (
            <li key={index} className="flex items-start space-x-3">
              <span className="bg-blue-200 text-blue-800 w-6 h-6 rounded-full inline-flex items-center justify-center text-sm font-medium mt-0.5">
                {index + 1}
              </span>
              <span className="text-blue-800">{objective}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Lesson Structure */}
      <div className="bg-white rounded-lg border shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">📋 Lesson Structure</h3>
        <div className="space-y-3">
          {activities.map((activity, index) => {
            const isCompleted = completedActivities.includes(activity.id);
            const score = activityScores[activity.id];
            
            return (
              <div
                key={activity.id}
                className={`flex items-center justify-between p-3 rounded-lg border ${
                  isCompleted ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isCompleted ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {isCompleted ? '✓' : index + 1}
                  </div>
                  <div>
                    <div className="font-medium">{activity.title}</div>
                    <div className="text-sm text-gray-600">
                      {activity.type} • {activity.estimatedTime} min • {activity.points} pts
                    </div>
                  </div>
                </div>
                {score && (
                  <div className={`px-2 py-1 rounded text-sm font-medium ${
                    score >= 90 ? 'bg-green-100 text-green-800' :
                    score >= 80 ? 'bg-blue-100 text-blue-800' :
                    score >= 70 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {score}%
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Tips */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">Study Tips for Today</h3>
            <div className="mt-2 text-sm text-yellow-700">
              <ul className="list-disc list-inside space-y-1">
                <li>Take breaks every 20-30 minutes to maintain focus</li>
                <li>Complete activities in order for the best learning experience</li>
                <li>Don't rush - understanding is more important than speed</li>
                <li>Ask questions in the discussion section if you need help</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderActivitiesTab = () => (
    <div className="space-y-6">
      {activities.map((activity, index) => {
        const isCompleted = completedActivities.includes(activity.id);
        
        return (
          <div key={activity.id} className="bg-white rounded-lg border shadow-sm overflow-hidden">
            <div className={`p-4 ${isCompleted ? 'bg-green-50' : 'bg-gray-50'} border-b`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isCompleted ? 'bg-green-200 text-green-800' : 'bg-blue-200 text-blue-800'
                  }`}>
                    {isCompleted ? '✓' : index + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold">{activity.title}</h3>
                    <div className="text-sm text-gray-600">
                      {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)} • 
                      {activity.estimatedTime} minutes • {activity.points} points
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {activityScores[activity.id] && (
                    <span className={`px-2 py-1 rounded text-sm font-medium ${
                      activityScores[activity.id] >= 90 ? 'bg-green-100 text-green-800' :
                      activityScores[activity.id] >= 80 ? 'bg-blue-100 text-blue-800' :
                      activityScores[activity.id] >= 70 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {activityScores[activity.id]}%
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            <div className="p-6">
              {renderActivityContent(activity)}
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderActivityContent = (activity: LessonActivity) => {
    switch (activity.type) {
      case 'quiz':
        return (
          <InteractiveQuiz
            questions={activity.content}
            title={activity.title}
            onComplete={(score, totalPoints) => {
              const percentage = Math.round((score / totalPoints) * 100);
              handleActivityComplete(activity.id, percentage);
            }}
          />
        );
      
      case 'reading':
        return (
          <div className="prose max-w-none">
            <div dangerouslySetInnerHTML={{ __html: activity.content }} />
            <button
              onClick={() => handleActivityComplete(activity.id)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Mark as Read
            </button>
          </div>
        );
      
      case 'exercise':
        return (
          <div>
            <div className="mb-4">
              <h4 className="font-medium mb-2">Exercise Instructions:</h4>
              <p className="text-gray-700">{activity.content.instructions}</p>
            </div>
            <div className="space-y-4">
              {activity.content.tasks?.map((task: any, index: number) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="font-medium mb-2">Task {index + 1}:</div>
                  <p>{task.question}</p>
                  <textarea
                    className="w-full mt-2 p-3 border rounded-lg"
                    rows={4}
                    placeholder="Write your answer here..."
                  />
                </div>
              ))}
            </div>
            <button
              onClick={() => handleActivityComplete(activity.id, 100)}
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Submit Exercise
            </button>
          </div>
        );
      
      case 'writing':
        return (
          <div>
            <div className="mb-4">
              <h4 className="font-medium mb-2">Writing Prompt:</h4>
              <p className="text-gray-700 bg-blue-50 p-4 rounded-lg">{activity.content.prompt}</p>
            </div>
            <textarea
              className="w-full p-4 border rounded-lg"
              rows={10}
              placeholder="Start writing your response here..."
            />
            <div className="mt-4 flex justify-between items-center">
              <div className="text-sm text-gray-600">
                Word count: 0 | Target: {activity.content.wordCount || 300} words
              </div>
              <button
                onClick={() => handleActivityComplete(activity.id, 100)}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Submit Writing
              </button>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="p-4 bg-gray-100 rounded-lg">
            <p>Activity content not implemented for type: {activity.type}</p>
            <button
              onClick={() => handleActivityComplete(activity.id)}
              className="mt-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
              Mark Complete
            </button>
          </div>
        );
    }
  };

  const renderProgressTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{getOverallProgress()}%</div>
          <div className="text-sm text-blue-800">Lesson Progress</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-green-600">{getOverallScore()}%</div>
          <div className="text-sm text-green-800">Average Score</div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-purple-600">{formatTime(timeSpent)}</div>
          <div className="text-sm text-purple-800">Time Spent</div>
        </div>
      </div>

      {getOverallProgress() === 100 && (
        <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-6 rounded-lg">
          <div className="text-center">
            <div className="text-4xl mb-2">🎉</div>
            <h3 className="text-xl font-bold mb-2">Lesson Complete!</h3>
            <p className="mb-4">
              Great job completing Day {day}! You scored {getOverallScore()}% overall.
            </p>
            <button
              onClick={handleLessonComplete}
              className="px-6 py-2 bg-white text-green-600 rounded-lg font-medium hover:bg-gray-100"
            >
              Finish Lesson
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const tabs = [
    { id: 'overview', name: 'Overview', icon: '📋' },
    { id: 'activities', name: 'Activities', icon: '✏️' },
    { id: 'progress', name: 'Progress', icon: '📊' }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg p-6">
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="bg-white bg-opacity-20 px-2 py-1 rounded text-sm">
                Day {day}
              </span>
              <span className="text-sm opacity-90">
                {formatTime(timeSpent)} elapsed
              </span>
            </div>
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="opacity-90 mt-1">{description}</p>
          </div>
          <div className="text-right">
            <div className="text-sm opacity-90">Progress</div>
            <div className="text-2xl font-bold">{getOverallProgress()}%</div>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="mt-4">
          <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
            <div 
              className="bg-white h-2 rounded-full transition-all duration-300"
              style={{ width: `${getOverallProgress()}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b">
        <nav className="flex">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600 bg-blue-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-b-lg p-6">
        {activeTab === 'overview' && renderOverviewTab()}
        {activeTab === 'activities' && renderActivitiesTab()}
        {activeTab === 'progress' && renderProgressTab()}
      </div>
    </div>
  );
}

// Sample lesson data
export const sampleLessonData = {
  day: 1,
  title: "Understanding Writing Assessment Criteria",
  description: "Learn how the NSW Selective School exam evaluates your writing",
  learningObjectives: [
    "Understand the four main assessment criteria",
    "Learn how to self-assess your writing",
    "Identify strengths and areas for improvement",
    "Create a personal improvement checklist"
  ],
  activities: [
    {
      id: 'reading-1',
      type: 'reading' as const,
      title: 'Introduction to Assessment Criteria',
      content: '<h3>The Four Assessment Criteria</h3><p>Your writing is evaluated based on four key areas...</p>',
      estimatedTime: 15,
      points: 10
    },
    {
      id: 'quiz-1',
      type: 'quiz' as const,
      title: 'Knowledge Check Quiz',
      content: [
        {
          id: "q1",
          question: "Which criterion carries the highest weight?",
          options: ["Ideas & Content (30%)", "Structure (25%)", "Language (25%)", "Grammar (20%)"],
          correctAnswer: 0,
          explanation: "Ideas & Content is weighted at 30% because original thinking is most valued.",
          points: 10
        }
      ],
      estimatedTime: 10,
      points: 20
    }
  ]
};