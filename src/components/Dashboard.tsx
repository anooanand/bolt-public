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
  CheckCircle,
  Mail
} from 'lucide-react';
import { hasCompletedPayment } from '../lib/supabase';
import { EmailVerificationReminder } from './EmailVerificationReminder';

interface DashboardProps {
  user: any;
  onNavigate: (page: string) => void;
  emailVerified: boolean;
  paymentCompleted: boolean;
}

export const Dashboard: React.FC<DashboardProps> = ({ 
  user, 
  onNavigate, 
  emailVerified,
  paymentCompleted
}) => {
  const [userStats, setUserStats] = useState({
    documentsCreated: 0,
    wordsWritten: 0,
    timeSpent: '0h',
    averageScore: 0
  });
  const [recentDocuments, setRecentDocuments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      setIsLoading(true);
      
      try {
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
        console.error('Error loading dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadDashboardData();
  }, [user]);

  const quickActions = [
    {
      id: 'write',
      title: 'Start Writing',
      description: 'Create a new document with AI assistance',
      icon: PenTool,
      color: 'bg-blue-500',
      action: () => onNavigate('writing'),
      requiresVerification: true,
      requiresPayment: true
    },
    {
      id: 'exam',
      title: 'Practice Exam',
      description: 'Take a NSW Selective practice test',
      icon: Target,
      color: 'bg-green-500',
      action: () => onNavigate('exam'),
      requiresVerification: true,
      requiresPayment: true
    },
    {
      id: 'learn',
      title: 'Learning Modules',
      description: 'Continue your writing education',
      icon: BookOpen,
      color: 'bg-purple-500',
      action: () => onNavigate('learn'),
      requiresVerification: true,
      requiresPayment: true
    },
    {
      id: 'collaborate',
      title: 'Collaborate',
      description: 'Share work and get feedback',
      icon: Users,
      color: 'bg-orange-500',
      action: () => onNavigate('collaborate'),
      requiresVerification: true,
      requiresPayment: true
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, {user?.email?.split('@')[0] || 'Writer'}!
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Ready to continue your writing journey?
          </p>
        </div>

        {/* Email Verification Reminder */}
        {user && !emailVerified && (
          <EmailVerificationReminder 
            email={user.email || ''} 
            onVerified={() => window.location.reload()}
          />
        )}

        {/* Payment Status Banner */}
        {emailVerified && !paymentCompleted && (
          <div className="mb-8 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900 dark:to-orange-900 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200">
                  Complete Your Subscription
                </h3>
                <p className="text-yellow-700 dark:text-yellow-300">
                  Your email is verified! Complete payment to unlock all premium features.
                </p>
              </div>
              <button
                onClick={() => onNavigate('pricing')}
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Subscribe Now
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
                const isLocked = (action.requiresVerification && !emailVerified) || 
                                (action.requiresPayment && !paymentCompleted);
                
                return (
                  <div
                    key={action.id}
                    className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border ${
                      isLocked ? 'opacity-75' : 'hover:shadow-md transition-shadow cursor-pointer'
                    }`}
                    onClick={isLocked ? undefined : action.action}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center">
                          <div className={`p-3 ${action.color} rounded-lg mr-3`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {action.title}
                          </h3>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 mt-2">
                          {action.description}
                        </p>
                      </div>
                      {isLocked && (
                        <div className="ml-4">
                          {!emailVerified ? (
                            <span className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-xs px-2 py-1 rounded flex items-center">
                              <Mail className="w-3 h-3 mr-1" />
                              Verify Email
                            </span>
                          ) : (
                            <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs px-2 py-1 rounded">
                              Subscribe
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    
                    {isLocked ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onNavigate(!emailVerified ? 'dashboard' : 'pricing');
                        }}
                        className="w-full py-2 px-4 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 text-sm font-medium"
                      >
                        {!emailVerified ? 'Verify Email First' : 'Subscribe to Access'}
                      </button>
                    ) : (
                      <button
                        onClick={action.action}
                        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium"
                      >
                        Get Started
                      </button>
                    )}
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
                    disabled={!emailVerified || !paymentCompleted}
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
                        onClick={() => emailVerified && paymentCompleted ? onNavigate('writing') : null}
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
                      disabled={!emailVerified || !paymentCompleted}
                    >
                      Create Your First Document
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Account Status */}
          <div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Account Status
              </h2>
              
              {/* Email Verification Status */}
              <div className={`bg-${emailVerified ? 'green' : 'yellow'}-50 dark:bg-${emailVerified ? 'green' : 'yellow'}-900/30 p-4 rounded-lg mb-4`}>
                <div className="flex items-center">
                  {emailVerified ? (
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  ) : (
                    <Mail className="w-5 h-5 text-yellow-500 mr-2" />
                  )}
                  <span className={`font-medium text-${emailVerified ? 'green' : 'yellow'}-800 dark:text-${emailVerified ? 'green' : 'yellow'}-200`}>
                    {emailVerified ? 'Email Verified' : 'Email Verification Required'}
                  </span>
                </div>
                <p className={`mt-2 text-sm text-${emailVerified ? 'green' : 'yellow'}-700 dark:text-${emailVerified ? 'green' : 'yellow'}-300`}>
                  {emailVerified 
                    ? 'Your email has been verified successfully.' 
                    : 'Please check your inbox and verify your email address.'}
                </p>
              </div>
              
              {/* Payment Status */}
              <div className={`bg-${paymentCompleted ? 'green' : 'purple'}-50 dark:bg-${paymentCompleted ? 'green' : 'purple'}-900/30 p-4 rounded-lg mb-4`}>
                <div className="flex items-center">
                  {paymentCompleted ? (
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-purple-500 mr-2" />
                  )}
                  <span className={`font-medium text-${paymentCompleted ? 'green' : 'purple'}-800 dark:text-${paymentCompleted ? 'green' : 'purple'}-200`}>
                    {paymentCompleted ? 'Payment Complete' : 'Payment Required'}
                  </span>
                </div>
                <p className={`mt-2 text-sm text-${paymentCompleted ? 'green' : 'purple'}-700 dark:text-${paymentCompleted ? 'green' : 'purple'}-300`}>
                  {paymentCompleted 
                    ? 'You have full access to all premium features.' 
                    : emailVerified 
                      ? 'Complete payment to unlock all premium features.' 
                      : 'Verify your email first, then complete payment.'}
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Email</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {user?.email}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Plan</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {paymentCompleted ? 
                      localStorage.getItem('payment_plan')?.replace('-', ' ') || 'Premium' : 
                      'Free'}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Status</span>
                  <span className={`font-medium ${
                    paymentCompleted ? 'text-green-600 dark:text-green-400' : 
                    'text-yellow-600 dark:text-yellow-400'
                  }`}>
                    {paymentCompleted ? 'Active' : 'Inactive'}
                  </span>
                </div>
                
                {paymentCompleted && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Next Payment</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
              
              {!paymentCompleted && emailVerified && (
                <button
                  onClick={() => onNavigate('pricing')}
                  className="w-full mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Subscribe Now
                </button>
              )}
              
              {!emailVerified && (
                <button
                  onClick={() => window.location.reload()}
                  className="w-full mt-6 px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700"
                >
                  Check Verification Status
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