import React, { useState } from 'react';

interface ProgressData {
  completedLessons: number[];
  totalPoints: number;
  earnedBadges: string[];
  currentStreak: number;
  lessonScores: { [key: number]: number };
  timeSpent: { [key: number]: number };
  weeklyGoals: Goal[];
  skillProgress: SkillProgress[];
}

interface Goal {
  id: string;
  title: string;
  target: number;
  current: number;
  deadline: Date;
  type: 'lessons' | 'points' | 'streak' | 'score';
}

interface SkillProgress {
  skill: string;
  level: number;
  maxLevel: number;
  lessonsCompleted: number;
  averageScore: number;
}

interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  earned: boolean;
  points: number;
}

export function ProgressDashboard({ progressData }: { progressData: ProgressData }) {
  const [activeTab, setActiveTab] = useState<'overview' | 'skills' | 'goals' | 'achievements'>('overview');

  // Calculate statistics
  const getCompletionRate = () => {
    return Math.round((progressData.completedLessons.length / 30) * 100);
  };

  const getAverageScore = () => {
    const scores = Object.values(progressData.lessonScores);
    if (scores.length === 0) return 0;
    return Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length);
  };

  const getTotalTimeSpent = () => {
    return Object.values(progressData.timeSpent).reduce((sum, time) => sum + time, 0);
  };

  const getWeeklyProgress = () => {
    const now = new Date();
    const weekStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay());
    const thisWeekLessons = progressData.completedLessons.filter(lesson => {
      // This is a simplified check - you'd want to store actual completion dates
      return true; // Placeholder
    });
    return thisWeekLessons.length;
  };

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">{getCompletionRate()}%</div>
              <div className="text-sm opacity-90">Course Progress</div>
            </div>
            <div className="text-3xl opacity-80">📈</div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
              <div 
                className="bg-white h-2 rounded-full"
                style={{ width: `${getCompletionRate()}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">{getAverageScore()}%</div>
              <div className="text-sm opacity-90">Average Score</div>
            </div>
            <div className="text-3xl opacity-80">🎯</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">{progressData.currentStreak}</div>
              <div className="text-sm opacity-90">Day Streak</div>
            </div>
            <div className="text-3xl opacity-80">🔥</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">{Math.round(getTotalTimeSpent() / 60)}</div>
              <div className="text-sm opacity-90">Hours Studied</div>
            </div>
            <div className="text-3xl opacity-80">⏰</div>
          </div>
        </div>
      </div>

      {/* Progress Chart */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Learning Journey</h3>
        <div className="grid grid-cols-10 gap-2">
          {Array.from({ length: 30 }, (_, i) => {
            const day = i + 1;
            const isCompleted = progressData.completedLessons.includes(day);
            const score = progressData.lessonScores[day];
            
            return (
              <div
                key={day}
                className={`aspect-square rounded-lg flex items-center justify-center text-xs font-bold ${
                  isCompleted
                    ? score >= 90
                      ? 'bg-green-500 text-white'
                      : score >= 80
                      ? 'bg-blue-500 text-white'
                      : score >= 70
                      ? 'bg-yellow-500 text-white'
                      : 'bg-red-500 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {day}
              </div>
            );
          })}
        </div>
        <div className="flex justify-center space-x-4 mt-4 text-xs">
          <div className="flex items-center"><div className="w-3 h-3 bg-green-500 rounded mr-1"></div>90%+</div>
          <div className="flex items-center"><div className="w-3 h-3 bg-blue-500 rounded mr-1"></div>80-89%</div>
          <div className="flex items-center"><div className="w-3 h-3 bg-yellow-500 rounded mr-1"></div>70-79%</div>
          <div className="flex items-center"><div className="w-3 h-3 bg-red-500 rounded mr-1"></div>&lt;70%</div>
          <div className="flex items-center"><div className="w-3 h-3 bg-gray-200 rounded mr-1"></div>Not completed</div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {progressData.completedLessons.slice(-5).reverse().map((day, index) => {
            const score = progressData.lessonScores[day];
            const timeAgo = `${index + 1} day${index > 0 ? 's' : ''} ago`; // Simplified
            
            return (
              <div key={day} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <div className="font-medium">Completed Day {day}</div>
                    <div className="text-sm text-gray-500">{timeAgo}</div>
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
    </div>
  );

  const renderSkillsTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {progressData.skillProgress.map((skill, index) => (
          <div key={skill.skill} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">{skill.skill}</h3>
              <span className="text-sm text-gray-500">Level {skill.level}/{skill.maxLevel}</span>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Progress</span>
                <span>{Math.round((skill.level / skill.maxLevel) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${(skill.level / skill.maxLevel) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-gray-500">Lessons</div>
                <div className="font-medium">{skill.lessonsCompleted}</div>
              </div>
              <div>
                <div className="text-gray-500">Avg Score</div>
                <div className={`font-medium ${
                  skill.averageScore >= 90 ? 'text-green-600' :
                  skill.averageScore >= 80 ? 'text-blue-600' :
                  skill.averageScore >= 70 ? 'text-yellow-600' :
                  'text-red-600'
                }`}>
                  {skill.averageScore}%
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderGoalsTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Active Goals</h3>
        <div className="space-y-4">
          {progressData.weeklyGoals.map(goal => {
            const progressPercentage = Math.min((goal.current / goal.target) * 100, 100);
            const isCompleted = goal.current >= goal.target;
            
            return (
              <div key={goal.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">{goal.title}</h4>
                  <span className={`px-2 py-1 rounded text-sm ${
                    isCompleted ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {goal.current}/{goal.target}
                  </span>
                </div>
                
                <div className="mb-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        isCompleted ? 'bg-green-500' : 'bg-blue-500'
                      }`}
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="text-sm text-gray-500">
                  Deadline: {goal.deadline.toLocaleDateString()}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderAchievementsTab = () => {
    const allBadges: Badge[] = [
      { id: 'first-step', name: 'First Steps', icon: '🚀', description: 'Started your learning journey', earned: progressData.earnedBadges.includes('first-step'), points: 10 },
      { id: 'foundation-master', name: 'Foundation Master', icon: '🏗️', description: 'Mastered the basics', earned: progressData.earnedBadges.includes('foundation-master'), points: 50 },
      { id: 'story-teller', name: 'Story Teller', icon: '📚', description: 'Narrative writing expert', earned: progressData.earnedBadges.includes('story-teller'), points: 75 },
      { id: 'week-warrior', name: 'Week Warrior', icon: '🔥', description: '7-day streak', earned: progressData.earnedBadges.includes('week-warrior'), points: 25 },
      { id: 'perfectionist', name: 'Perfectionist', icon: '✨', description: 'High achiever', earned: progressData.earnedBadges.includes('perfectionist'), points: 40 }
    ];

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Badges & Achievements</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allBadges.map(badge => (
              <div
                key={badge.id}
                className={`p-4 rounded-lg border-2 transition-all ${
                  badge.earned 
                    ? 'bg-yellow-50 border-yellow-300 shadow-md' 
                    : 'bg-gray-50 border-gray-200 opacity-60'
                }`}
              >
                <div className="text-center">
                  <div className="text-4xl mb-2">{badge.icon}</div>
                  <h4 className="font-semibold mb-1">{badge.name}</h4>
                  <p className="text-sm text-gray-600 mb-2">{badge.description}</p>
                  <div className="text-xs text-gray-500">+{badge.points} points</div>
                  {badge.earned && (
                    <div className="mt-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                      Earned!
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: '📊' },
    { id: 'skills', name: 'Skills', icon: '🎯' },
    { id: 'goals', name: 'Goals', icon: '🏆' },
    { id: 'achievements', name: 'Achievements', icon: '🏅' }
  ] as const;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
          <h2 className="text-2xl font-bold">Your Learning Dashboard</h2>
          <p className="opacity-90">Track your progress and celebrate your achievements</p>
        </div>

        {/* Tab Navigation */}
        <div className="border-b">
          <nav className="flex">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'border-b-2 border-blue-500 text-blue-600 bg-blue-50'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'overview' && renderOverviewTab()}
          {activeTab === 'skills' && renderSkillsTab()}
          {activeTab === 'goals' && renderGoalsTab()}
          {activeTab === 'achievements' && renderAchievementsTab()}
        </div>
      </div>
    </div>
  );
}

// Sample data generator for testing
export const generateSampleProgressData = (): ProgressData => ({
  completedLessons: [1, 2, 3, 4, 5, 6, 7, 8, 12, 13],
  totalPoints: 450,
  earnedBadges: ['first-step', 'foundation-master'],
  currentStreak: 5,
  lessonScores: {
    1: 85,
    2: 92,
    3: 78,
    4: 88,
    5: 95,
    6: 82,
    7: 89,
    8: 91,
    12: 87,
    13: 93
  },
  timeSpent: {
    1: 45,
    2: 52,
    3: 48,
    4: 41,
    5: 58,
    6: 62,
    7: 55,
    8: 49,
    12: 53,
    13: 47
  },
  weeklyGoals: [
    {
      id: 'weekly-lessons',
      title: 'Complete 5 lessons this week',
      target: 5,
      current: 3,
      deadline: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
      type: 'lessons'
    },
    {
      id: 'weekly-points',
      title: 'Earn 200 points this week',
      target: 200,
      current: 150,
      deadline: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
      type: 'points'
    }
  ],
  skillProgress: [
    {
      skill: 'Narrative Writing',
      level: 4,
      maxLevel: 5,
      lessonsCompleted: 6,
      averageScore: 87
    },
    {
      skill: 'Persuasive Writing',
      level: 2,
      maxLevel: 5,
      lessonsCompleted: 2,
      averageScore: 90
    },
    {
      skill: 'Grammar & Punctuation',
      level: 3,
      maxLevel: 5,
      lessonsCompleted: 4,
      averageScore: 84
    },
    {
      skill: 'Vocabulary & Style',
      level: 3,
      maxLevel: 5,
      lessonsCompleted: 5,
      averageScore: 89
    }
  ]
});