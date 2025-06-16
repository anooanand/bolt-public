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
  BarChart3,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { hasCompletedPayment, hasTemporaryAccess } from '../lib/supabase';

interface DashboardProps {
  user: any;
  onNavigate: (page: string) => void;
}

interface UserStats {
  documentsCreated: number;
  wordsWritten: number;
  timeSpent: string;
  averageScore: number;
}

interface RecentDocument {
  id: string;
  title: string;
  type: string;
  wordCount: number;
  lastModified: string;
  score?: number;
}

export const Dashboard: React.FC<DashboardProps> = ({ user, onNavigate }) => {
  const [userStats, setUserStats] = useState<UserStats>({
    documentsCreated: 0,
    wordsWritten: 0,
    timeSpent: '0h',
    averageScore: 0
  });
  const [recentDocuments, setRecentDocuments] = useState<RecentDocument[]>([]);
  const [isPaidUser, setIsPaidUser] = useState(false);
  const [hasTempAccess, setHasTempAccess] = useState(false);
  const [tempAccessExpiry, setTempAccessExpiry] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAccess = async () => {
      setIsLoading(true);
      
      try {
        // Check for temporary access first
        const tempAccess = await hasTemporaryAccess();
        setHasTempAccess(tempAccess);
        
        if (tempAccess) {
          const expiryDate = new Date(localStorage.getItem('temp_access_until') || '');
          setTempAccessExpiry(expiryDate);
        }
        
        // Check for permanent access
        const paymentCompleted = await hasCompletedPayment();
        setIsPaidUser(paymentCompleted);
        
        // Load mock data for demo
        setUserStats({
          documentsCreated: 3,
          wordsWritten: 1250,
          timeSpent: '2h',
          averageScore: 78
        });
        
        setRecentDocuments([
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
          }
        ]);
      } catch (error) {
        console.error('Error checking access status:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAccess();
  }, [user]);

  const formatTimeRemaining = () => {
    if (!tempAccessExpiry) return '';
    
    const now = new Date();
    const diff = tempAccessExpiry.getTime() - now.getTime();
    
    if (diff <= 0) return 'Expired';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m remaining`;
  };

  const quickActions = [
    {
      id: 'write',
      title: 'Start Writing',
      description: 'Create a new document with AI assistance',
      icon: PenTool,
      color: 'bg-blue-500',
      action: () => onNavigate('writing')
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

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
                {hasTempAccess ? (
                  <>
                    <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200">
                      Temporary Access Active
                    </h3>
                    <p className="text-yellow-700 dark:text-yellow-300">
                      {formatTimeRemaining()} - Full access will be activated soon
                    </p>
                  </>
                ) : (
                  <>
                    <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200">
                      Free Plan
                    </h3>
                    <p className="text-yellow-700 dark:text-yellow-300">
                      Upgrade to unlock all features
                    </p>
                  </>
                )}
              </div>
              <button
                onClick={() => onNavigate('pricing')}
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                {hasTempAccess ? 'View Plan Details' : 'Upgrade Now'}
              </button>
            </div>
          </div>
        )}

        {/* Temporary Access Banner */}
        {hasTempAccess && (
          <div className="mb-8 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-5 w-5 text-blue-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
                  Payment Processing
                </h3>
                <div className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                  <p>
                    Your payment is being processed. You have full access to all features for the next 24 hours.
                    Your account will be automatically upgraded to permanent access once payment processing is complete.
                  </p>
                </div>
              </div>
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
                  {userStats.documentsCreated.toLocaleString()}
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
                const isLocked = action.isPro && !isPaidUser && !hasTempAccess;
                
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
                    onClick={() => onNavigate('writing')}
                    className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    New
                  </button>
                </div>
              </div>
              <div className="p-6">
                {recentDocuments.length > 0 ? (
                  <div className="space-y-4">
                    {recentDocuments.map((doc) => (
                      <div
                        key={doc.id}
                        className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer transition-colors"
                        onClick={() => onNavigate('writing')}
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
                ) : (
                  <div className="text-center py-8">
                    <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 dark:text-gray-400 mb-4">No documents yet</p>
                    <button
                      onClick={() => onNavigate('writing')}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Create Your First Document
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Subscription Status */}
          <div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Subscription Status
              </h2>
              
              {isPaidUser ? (
                <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg mb-4">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    <span className="font-medium text-green-800 dark:text-green-200">Active Subscription</span>
                  </div>
                  <p className="mt-2 text-sm text-green-700 dark:text-green-300">
                    You have full access to all premium features
                  </p>
                </div>
              ) : hasTempAccess ? (
                <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg mb-4">
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-blue-500 mr-2" />
                    <span className="font-medium text-blue-800 dark:text-blue-200">Temporary Access</span>
                  </div>
                  <p className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                    {formatTimeRemaining()} - Your payment is being processed
                  </p>
                </div>
              ) : (
                <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg mb-4">
                  <div className="flex items-center">
                    <AlertTriangle className="w-5 h-5 text-yellow-500 mr-2" />
                    <span className="font-medium text-yellow-800 dark:text-yellow-200">Free Plan</span>
                  </div>
                  <p className="mt-2 text-sm text-yellow-700 dark:text-yellow-300">
                    Upgrade to access premium features
                  </p>
                </div>
              )}
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Plan</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {isPaidUser || hasTempAccess ? 
                      localStorage.getItem('payment_plan')?.replace('-', ' ') || 'Premium' : 
                      'Free'}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Status</span>
                  <span className={`font-medium ${
                    isPaidUser ? 'text-green-600 dark:text-green-400' : 
                    hasTempAccess ? 'text-blue-600 dark:text-blue-400' : 
                    'text-yellow-600 dark:text-yellow-400'
                  }`}>
                    {isPaidUser ? 'Active' : hasTempAccess ? 'Processing' : 'Inactive'}
                  </span>
                </div>
                
                {(hasTempAccess || isPaidUser) && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Next Payment</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
              
              {!isPaidUser && (
                <button
                  onClick={() => onNavigate('pricing')}
                  className="w-full mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  {hasTempAccess ? 'View Plan Details' : 'Upgrade Now'}
                </button>
              )}
            </div>

            {/* Help & Support */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Help & Support
              </h2>
              <div className="space-y-3">
                <button
                  onClick={() => onNavigate('faq')}
                  className="w-full flex items-center px-3 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <BookOpen className="w-4 h-4 mr-3" />
                  View FAQ
                </button>
                <button
                  className="w-full flex items-center px-3 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <Users className="w-4 h-4 mr-3" />
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};