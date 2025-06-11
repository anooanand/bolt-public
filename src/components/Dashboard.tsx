import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  PenTool, 
  Clock, 
  TrendingUp, 
  Award, 
  Target,
  BookOpen,
  Users,
  Plus,
  ArrowRight,
  Star,
  Calendar,
  BarChart3
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface DashboardProps {
  onNavigate: (page: string) => void;
}

interface UserStats {
  documentsCreated: number;
  wordsWritten: number;
  timeSpent: string;
  averageScore: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  unlocked: boolean;
  progress?: number;
}

interface RecentDocument {
  id: string;
  title: string;
  type: string;
  wordCount: number;
  lastModified: string;
  score?: number;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const { user, isPaidUser } = useAuth();
  const [userStats, setUserStats] = useState<UserStats>({
    documentsCreated: 12,
    wordsWritten: 8450,
    timeSpent: '24h',
    averageScore: 85
  });

  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: 'first-essay',
      title: 'First Essay',
      description: 'Completed your first essay',
      icon: FileText,
      unlocked: true
    },
    {
      id: 'word-master',
      title: 'Word Master',
      description: 'Wrote over 5,000 words',
      icon: PenTool,
      unlocked: true
    },
    {
      id: 'perfect-score',
      title: 'Perfect Score',
      description: 'Achieved a perfect score on an essay',
      icon: Star,
      unlocked: false,
      progress: 85
    },
    {
      id: 'streak-master',
      title: 'Streak Master',
      description: 'Wrote for 7 consecutive days',
      icon: Calendar,
      unlocked: false,
      progress: 60
    }
  ]);

  const [recentDocuments, setRecentDocuments] = useState<RecentDocument[]>([
    {
      id: '1',
      title: 'Persuasive Essay - Climate Change',
      type: 'Persuasive Essay',
      wordCount: 450,
      lastModified: '2 hours ago',
      score: 88
    },
    {
      id: '2',
      title: 'Creative Writing - The Lost City',
      type: 'Creative Writing',
      wordCount: 320,
      lastModified: '1 day ago',
      score: 92
    },
    {
      id: '3',
      title: 'NSW Practice Test Response',
      type: 'Exam Response',
      wordCount: 280,
      lastModified: '3 days ago',
      score: 85
    }
  ]);

  const quickActions = [
    {
      id: 'write',
      title: 'Start Writing',
      description: 'Create a new document with AI assistance',
      icon: PenTool,
      color: 'bg-blue-500',
      action: () => onNavigate('write')
    },
    {
      id: 'exam',
      title: 'Practice Exam',
      description: 'Take a NSW Selective practice test',
      icon: Target,
      color: 'bg-green-500',
      action: () => onNavigate('exam'),
      isPro: true
    },
    {
      id: 'learn',
      title: 'Learning Modules',
      description: 'Continue your writing education',
      icon: BookOpen,
      color: 'bg-purple-500',
      action: () => onNavigate('learn'),
      isPro: true
    },
    {
      id: 'collaborate',
      title: 'Collaborate',
      description: 'Share work and get feedback',
      icon: Users,
      color: 'bg-orange-500',
      action: () => onNavigate('collaborate'),
      isPro: true
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back, {user?.email?.split('@')[0] || 'Writer'}!
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Ready to continue your writing journey?
          </p>
        </div>

        {/* Payment Status Banner */}
        {!isPaidUser && (
          <div className="mb-8 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900 dark:to-orange-900 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200">
                  Free Plan
                </h3>
                <p className="text-yellow-700 dark:text-yellow-300">
                  Upgrade to unlock all features
                </p>
              </div>
              <button
                onClick={() => onNavigate('pricing')}
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Upgrade Now
              </button>
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {userStats.documentsCreated}
                </p>
                <p className="text-gray-600 dark:text-gray-400">Documents</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                <PenTool className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {userStats.wordsWritten.toLocaleString()}
                </p>
                <p className="text-gray-600 dark:text-gray-400">Words Written</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <Clock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {userStats.timeSpent}
                </p>
                <p className="text-gray-600 dark:text-gray-400">Time Spent</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                <TrendingUp className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {userStats.averageScore}%
                </p>
                <p className="text-gray-600 dark:text-gray-400">Avg Score</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {quickActions.map((action) => {
                const Icon = action.icon;
                const isLocked = action.isPro && !isPaidUser;
                
                return (
                  <div
                    key={action.id}
                    className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border-2 border-transparent hover:border-blue-200 dark:hover:border-blue-700 transition-colors ${
                      isLocked ? 'opacity-60' : 'cursor-pointer'
                    }`}
                    onClick={isLocked ? undefined : action.action}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center">
                        <div className={`p-3 ${action.color} rounded-lg`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="ml-4">
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {action.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {action.description}
                          </p>
                        </div>
                      </div>
                      {isLocked && (
                        <span className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-xs px-2 py-1 rounded">
                          Pro
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Recent Documents */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Recent Documents
                  </h2>
                  <button
                    onClick={() => onNavigate('write')}
                    className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    New
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentDocuments.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer transition-colors"
                      onClick={() => onNavigate('write')}
                    >
                      <div className="flex items-center">
                        <FileText className="w-5 h-5 text-gray-400 mr-3" />
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">
                            {doc.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {doc.type} • {doc.wordCount} words • {doc.lastModified}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {doc.score && (
                          <span className="text-sm font-medium text-green-600 dark:text-green-400 mr-2">
                            {doc.score}%
                          </span>
                        )}
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Achievements
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <div className="space-y-4">
                {achievements.map((achievement) => {
                  const Icon = achievement.icon;
                  return (
                    <div
                      key={achievement.id}
                      className={`flex items-center p-3 rounded-lg ${
                        achievement.unlocked
                          ? 'bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700'
                          : 'bg-gray-50 dark:bg-gray-700'
                      }`}
                    >
                      <div
                        className={`p-2 rounded-lg ${
                          achievement.unlocked
                            ? 'bg-green-100 dark:bg-green-800'
                            : 'bg-gray-200 dark:bg-gray-600'
                        }`}
                      >
                        <Icon
                          className={`w-5 h-5 ${
                            achievement.unlocked
                              ? 'text-green-600 dark:text-green-400'
                              : 'text-gray-400'
                          }`}
                        />
                      </div>
                      <div className="ml-3 flex-1">
                        <h3
                          className={`font-medium ${
                            achievement.unlocked
                              ? 'text-green-900 dark:text-green-100'
                              : 'text-gray-900 dark:text-white'
                          }`}
                        >
                          {achievement.title}
                        </h3>
                        <p
                          className={`text-sm ${
                            achievement.unlocked
                              ? 'text-green-700 dark:text-green-300'
                              : 'text-gray-600 dark:text-gray-400'
                          }`}
                        >
                          {achievement.description}
                        </p>
                        {!achievement.unlocked && achievement.progress && (
                          <div className="mt-2">
                            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{ width: `${achievement.progress}%` }}
                              ></div>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              {achievement.progress}% complete
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

