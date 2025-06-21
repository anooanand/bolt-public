// FIXED: Dashboard component with proper verification logic
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
import { hasCompletedPayment, isEmailVerified } from '../lib/supabase';
import { EmailVerificationReminder } from './EmailVerificationReminder';

interface DashboardProps {
  user: any;
  onNavigate: (page: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ 
  user, 
  onNavigate
}) => {
  const [userStats, setUserStats] = useState({
    documentsCreated: 0,
    wordsWritten: 0,
    timeSpent: '0h',
    averageScore: 0
  });
  const [recentDocuments, setRecentDocuments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [emailVerified, setEmailVerified] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [verificationLoading, setVerificationLoading] = useState(true);

  // Enhanced verification check
  const checkVerificationStatus = async () => {
    try {
      setVerificationLoading(true);
      console.log('🔍 Dashboard: Checking verification status...');
      
      // Check email verification using enhanced function
      const emailVerifiedResult = await isEmailVerified();
      console.log('📧 Dashboard: Email verification result:', emailVerifiedResult);
      setEmailVerified(emailVerifiedResult);
      
      // Check payment status
      const paymentResult = await hasCompletedPayment();
      console.log('💳 Dashboard: Payment verification result:', paymentResult);
      setPaymentCompleted(paymentResult);
      
    } catch (error) {
      console.error('Error checking verification status:', error);
      setEmailVerified(false);
      setPaymentCompleted(false);
    } finally {
      setVerificationLoading(false);
    }
  };

  useEffect(() => {
    const loadDashboardData = async () => {
      setIsLoading(true);
      
      try {
        // Check verification status first
        await checkVerificationStatus();
        
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
    
    if (user) {
      loadDashboardData();
    }
  }, [user]);

  const handleManualVerificationCheck = async () => {
    console.log('🔄 Manual verification check triggered from dashboard');
    await checkVerificationStatus();
  };

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

  if (isLoading || verificationLoading) {
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

        {/* Enhanced Email Verification Status */}
        {user && !emailVerified && (
          <div className="mb-8 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mr-3" />
                <div>
                  <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200">
                    Verify Your Email Address
                  </h3>
                  <p className="text-yellow-700 dark:text-yellow-300">
                    We've sent a verification email to {user.email}. Please check your inbox and click the verification link to activate your account.
                  </p>
                  <p className="text-sm text-yellow-600 dark:text-yellow-400 mt-1">
                    After verifying your email, you'll need to complete payment to access all premium features.
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={handleManualVerificationCheck}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
                >
                  I've Verified My Email
                </button>
                <button
                  onClick={() => {/* Add resend email logic */}}
                  className="bg-transparent border border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
                >
                  Resend Email
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Payment Status Banner */}
        {emailVerified && !paymentCompleted && (
          <div className="mb-8 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900 dark:to-blue-900 border border-green-200 dark:border-green-700 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mr-3" />
                <div>
                  <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">
                    Email Verified! Complete Your Subscription
                  </h3>
                  <p className="text-green-700 dark:text-green-300">
                    Great! Your email is verified. Complete payment to unlock all premium features and start your writing journey.
                  </p>
                </div>
              </div>
              <button
                onClick={() => onNavigate('pricing')}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Subscribe Now
              </button>
            </div>
          </div>
        )}

        {/* Success Banner for Fully Verified Users */}
        {emailVerified && paymentCompleted && (
          <div className="mb-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900 dark:to-purple-900 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-3" />
              <div>
                <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200">
                  All Set! Welcome to Premium
                </h3>
                <p className="text-blue-700 dark:text-blue-300">
                  Your account is fully verified and your subscription is active. Enjoy all premium features!
                </p>
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

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action) => {
              const Icon = action.icon;
              const isDisabled = (action.requiresVerification && !emailVerified) || 
                               (action.requiresPayment && !paymentCompleted);
              
              return (
                <div
                  key={action.id}
                  className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border transition-all duration-200 ${
                    isDisabled 
                      ? 'opacity-50 cursor-not-allowed border-gray-200 dark:border-gray-700' 
                      : 'hover:shadow-md cursor-pointer border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600'
                  }`}
                  onClick={isDisabled ? undefined : action.action}
                >
                  <div className={`p-3 rounded-lg mb-4 ${action.color} ${isDisabled ? 'opacity-50' : ''}`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {action.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    {action.description}
                  </p>
                  {isDisabled && (
                    <div className="text-xs text-yellow-600 dark:text-yellow-400">
                      {!emailVerified ? 'Email verification required' : 'Payment required'}
                    </div>
                  )}
                  {!isDisabled && (
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Documents */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Recent Documents</h2>
            <button
              onClick={() => onNavigate('writing')}
              disabled={!emailVerified || !paymentCompleted}
              className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                emailVerified && paymentCompleted
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
              }`}
            >
              <Plus className="w-4 h-4 mr-2" />
              New Document
            </button>
          </div>
          
          {recentDocuments.length > 0 ? (
            <div className="space-y-4">
              {recentDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                >
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg mr-4">
                      <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{doc.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {doc.type} • {doc.wordCount} words • {doc.lastModified}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex items-center mr-4">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {doc.score}%
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No documents yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Start writing your first document to see it here.
              </p>
              <button
                onClick={() => onNavigate('writing')}
                disabled={!emailVerified || !paymentCompleted}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  emailVerified && paymentCompleted
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                }`}
              >
                Create Your First Document
              </button>
            </div>
          )}
        </div>

        {/* Debug Info (development only) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <h4 className="font-bold mb-2">Debug Information:</h4>
            <p>User: {user?.email}</p>
            <p>Email Verified: {emailVerified ? 'Yes' : 'No'}</p>
            <p>Payment Completed: {paymentCompleted ? 'Yes' : 'No'}</p>
            <p>Verification Loading: {verificationLoading ? 'Yes' : 'No'}</p>
            <button 
              onClick={handleManualVerificationCheck}
              className="mt-2 px-3 py-1 bg-blue-500 text-white rounded text-sm"
            >
              Refresh Status
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

