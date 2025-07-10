import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { isEmailVerified, hasAnyAccess, getUserAccessStatus } from '../lib/supabase';
import { 
  Mail, 
  CheckCircle, 
  Clock, 
  FileText, 
  PenTool, 
  BarChart3, 
  Settings, 
  X,
  Star,
  BookOpen,
  Zap,
  Heart,
  Trophy,
  Sparkles,
  Smile,
  Target,
  Gift
} from 'lucide-react';

interface DashboardProps {
  user?: any;
  emailVerified?: boolean;
  paymentCompleted?: boolean;
  onNavigate?: (page: string) => void;
  onSignOut?: () => void;
}

export function Dashboard({
  user: propUser,
  emailVerified: propEmailVerified,
  paymentCompleted: propPaymentCompleted,
  onNavigate,
  onSignOut
}: DashboardProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isVerified, setIsVerified] = useState(false);
  const [accessType, setAccessType] = useState<'none' | 'temporary' | 'permanent'>('none');
  const [tempAccessUntil, setTempAccessUntil] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userAccessData, setUserAccessData] = useState<any>(null);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);

  // Use prop user if provided, otherwise use context user
  const currentUser = propUser || user;

  useEffect(() => {
    const checkVerificationStatus = async () => {
      if (currentUser) {
        console.log('🔍 Dashboard: Checking verification status for user:', currentUser.id);
        setIsLoading(true);
        
        try {
          // Get detailed user access status from database
          const accessData = await getUserAccessStatus(currentUser.id);
          setUserAccessData(accessData);
          
          if (accessData) {
            console.log('📊 User access data:', accessData);
            
            // Check if user has permanent access (payment verified or manual override)
            if (accessData.payment_verified || accessData.manual_override || accessData.has_access) {
              setIsVerified(true);
              setAccessType('permanent');
              
              // Check if this is the first time showing the welcome message
              const hasSeenWelcome = localStorage.getItem(`welcome_shown_${currentUser.id}`);
              if (!hasSeenWelcome) {
                setShowWelcomeMessage(true);
                localStorage.setItem(`welcome_shown_${currentUser.id}`, 'true');
              }
              
              console.log('✅ Dashboard: Permanent access confirmed - payment verified:', accessData.payment_verified);
              setIsLoading(false);
              return;
            }
            
            // Check if user has valid temporary access
            if (accessData.temp_access_until) {
              const tempDate = new Date(accessData.temp_access_until);
              if (tempDate > new Date()) {
                setIsVerified(true);
                setAccessType('temporary');
                setTempAccessUntil(accessData.temp_access_until);
                console.log('✅ Dashboard: Temporary access valid until:', tempDate);
                setIsLoading(false);
                return;
              }
            }
          }
          
          // Fallback: Check for temporary access in localStorage
          const tempAccess = localStorage.getItem('temp_access_granted');
          const tempUntil = localStorage.getItem('temp_access_until');
          
          if (tempAccess === 'true' && tempUntil) {
            const tempDate = new Date(tempUntil);
            if (tempDate > new Date()) {
              setIsVerified(true);
              setAccessType('temporary');
              setTempAccessUntil(tempUntil);
              console.log('✅ Dashboard: Temporary access from localStorage valid until:', tempDate);
              setIsLoading(false);
              return;
            }
          }
          
          // No access found
          setIsVerified(false);
          setAccessType('none');
          console.log('❌ Dashboard: No valid access found');
          
        } catch (error) {
          console.error('❌ Dashboard: Error checking verification status:', error);
          setIsVerified(false);
          setAccessType('none');
        }
        
        setIsLoading(false);
      } else {
        console.log('❌ Dashboard: No user found');
        setIsLoading(false);
      }
    };

    checkVerificationStatus();
  }, [currentUser]);

  const handleNavigation = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
    } else {
      navigate(`/${page}`);
    }
  };

  const handleSignOut = () => {
    if (onSignOut) {
      onSignOut();
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading your space...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Please Sign In</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">You need to be signed in to access your space.</p>
          <button
            onClick={() => handleNavigation('home')}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Message */}
        {showWelcomeMessage && (
          <div className="mb-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg p-6 text-white relative">
            <button
              onClick={() => setShowWelcomeMessage(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-200"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-3">
              <Sparkles className="w-8 h-8" />
              <div>
                <h3 className="text-xl font-bold">Welcome to Your Writing Space! 🎉</h3>
                <p className="text-green-100 mt-1">
                  You now have full access to all premium features. Start your writing journey!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome to Your Space! 🏠
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Hi {currentUser.email?.split('@')[0]}! Ready to create amazing writing today?
          </p>
        </div>

        {/* Access Status */}
        <div className="mb-8">
          {accessType === 'permanent' ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 dark:bg-green-900/20 dark:border-green-800">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                <div>
                  <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">
                    Premium Access Active ✨
                  </h3>
                  <p className="text-green-600 dark:text-green-300">
                    You have full access to all writing features and tools!
                  </p>
                </div>
              </div>
            </div>
          ) : accessType === 'temporary' ? (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 dark:bg-yellow-900/20 dark:border-yellow-800">
              <div className="flex items-center space-x-3">
                <Clock className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                <div>
                  <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200">
                    Trial Access Active ⏰
                  </h3>
                  <p className="text-yellow-600 dark:text-yellow-300">
                    Your trial access expires on {tempAccessUntil ? new Date(tempAccessUntil).toLocaleDateString() : 'soon'}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 dark:bg-blue-900/20 dark:border-blue-800">
              <div className="flex items-center space-x-3">
                <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <div>
                  <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200">
                    Get Started! 🚀
                  </h3>
                  <p className="text-blue-600 dark:text-blue-300">
                    Upgrade to premium to unlock all writing features and tools.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div 
            onClick={() => handleNavigation('writing')}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <PenTool className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Start Writing</h3>
                <p className="text-gray-600 dark:text-gray-400">Begin your writing journey</p>
              </div>
            </div>
          </div>

          <div 
            onClick={() => handleNavigation('learning')}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Learning Hub</h3>
                <p className="text-gray-600 dark:text-gray-400">Improve your skills</p>
              </div>
            </div>
          </div>

          <div 
            onClick={() => handleNavigation('essay-feedback')}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Essay Feedback</h3>
                <p className="text-gray-600 dark:text-gray-400">Get detailed analysis</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Writing Progress */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
              Your Progress
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Essays Written</span>
                <span className="font-semibold text-gray-900 dark:text-white">0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Words Written</span>
                <span className="font-semibold text-gray-900 dark:text-white">0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Lessons Completed</span>
                <span className="font-semibold text-gray-900 dark:text-white">0</span>
              </div>
            </div>
          </div>

          {/* Quick Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Settings className="w-5 h-5 mr-2 text-gray-500" />
              Quick Settings
            </h3>
            <div className="space-y-3">
              <button
                onClick={() => handleNavigation('settings')}
                className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Account Settings
              </button>
              <button
                onClick={() => handleNavigation('pricing')}
                className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Upgrade Plan
              </button>
              <button
                onClick={handleSignOut}
                className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-red-600 dark:text-red-400"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

