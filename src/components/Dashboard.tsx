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
            } else {
              // Clean up expired temporary access
              localStorage.removeItem('temp_access_granted');
              localStorage.removeItem('temp_access_until');
              localStorage.removeItem('temp_access_plan');
            }
          }
          
          // Check basic email verification
          const verified = isEmailVerified(currentUser);
          setIsVerified(verified);
          setAccessType('none');
          console.log('📊 Dashboard: Only email verification result:', verified);
          
        } catch (error) {
          console.error('❌ Error checking verification status:', error);
          setIsVerified(false);
          setAccessType('none');
        }
        
        setIsLoading(false);
      }
    };

    checkVerificationStatus();
  }, [currentUser]);

  const handleManualRefresh = async () => {
    if (currentUser) {
      setIsLoading(true);
      try {
        // Refresh user access status from database
        const accessData = await getUserAccessStatus(currentUser.id);
        setUserAccessData(accessData);
        
        if (accessData && (accessData.payment_verified || accessData.manual_override || accessData.has_access)) {
          setIsVerified(true);
          setAccessType('permanent');
          
          // Check if this is the first time showing the welcome message after manual refresh
          const hasSeenWelcome = localStorage.getItem(`welcome_shown_${currentUser.id}`);
          if (!hasSeenWelcome) {
            setShowWelcomeMessage(true);
            localStorage.setItem(`welcome_shown_${currentUser.id}`, 'true');
          }
          
          console.log('✅ Refresh: Permanent access confirmed');
        } else if (accessData && accessData.temp_access_until) {
          const tempDate = new Date(accessData.temp_access_until);
          if (tempDate > new Date()) {
            setIsVerified(true);
            setAccessType('temporary');
            setTempAccessUntil(accessData.temp_access_until);
            console.log('✅ Refresh: Temporary access confirmed');
          } else {
            setIsVerified(false);
            setAccessType('none');
          }
        } else {
          const verified = isEmailVerified(currentUser);
          setIsVerified(verified);
          setAccessType('none');
        }
      } catch (error) {
        console.error('❌ Error refreshing status:', error);
      }
      setIsLoading(false);
    }
  };

  const handleStartWriting = () => {
    console.log('🚀 Dashboard: Navigating to writing area...');
    if (onNavigate) {
      onNavigate('writing');
    } else {
      navigate('/writing');
    }
  };

  const handlePracticeExam = () => {
    console.log('🚀 Dashboard: Navigating to practice exam...');
    if (onNavigate) {
      onNavigate('exam');
    } else {
      navigate('/exam');
    }
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getTimeRemaining = (dateString: string) => {
    const now = new Date();
    const target = new Date(dateString);
    const diff = target.getTime() - now.getTime();
    
    if (diff <= 0) return 'Expired';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
      return `${hours}h ${minutes}m remaining`;
    } else {
      return `${minutes}m remaining`;
    }
  };

  const handleDismissWelcome = () => {
    setShowWelcomeMessage(false);
  };

  // Get user's first name from email
  const getUserName = () => {
    if (currentUser?.email) {
      const emailPart = currentUser.email.split('@')[0];
      // Capitalize first letter
      return emailPart.charAt(0).toUpperCase() + emailPart.slice(1);
    }
    return 'Friend';
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center bg-white rounded-3xl p-12 shadow-xl max-w-md mx-4">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <BookOpen className="h-10 w-10 text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Oops!</h2>
          <p className="text-gray-600 text-lg">You need to sign in first to start your writing adventure!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Kid-Friendly Header with Mascot */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mr-4 shadow-lg">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Hi there, {getUserName()}! 🌟
              </h1>
              <p className="text-xl text-gray-700 mt-1">Let's write something awesome today!</p>
            </div>
          </div>
        </div>

        {/* Celebration Welcome Message for Premium Users */}
        {showWelcomeMessage && accessType === 'permanent' && (
          <div className="bg-gradient-to-r from-green-100 via-blue-100 to-purple-100 border-2 border-green-300 rounded-3xl p-8 mb-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-200 rounded-full -mr-16 -mt-16 opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-pink-200 rounded-full -ml-12 -mb-12 opacity-50"></div>
            
            <button
              onClick={handleDismissWelcome}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 bg-white rounded-full p-2 shadow-md"
            >
              <X className="h-5 w-5" />
            </button>
            
            <div className="flex items-center relative z-10">
              <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center mr-6 shadow-lg">
                <Trophy className="h-10 w-10 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-3xl font-bold text-green-900 mb-3">🎉 Hooray! You're All Set!</h3>
                <p className="text-green-800 mb-4 text-lg">
                  Welcome to your writing adventure! You now have access to all the cool features:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-green-700 mb-6">
                  <div className="flex items-center bg-white bg-opacity-50 rounded-lg p-3">
                    <Zap className="h-5 w-5 text-green-600 mr-3" />
                    <span className="font-medium">Smart Writing Helper</span>
                  </div>
                  <div className="flex items-center bg-white bg-opacity-50 rounded-lg p-3">
                    <Target className="h-5 w-5 text-green-600 mr-3" />
                    <span className="font-medium">Fun Practice Tests</span>
                  </div>
                  <div className="flex items-center bg-white bg-opacity-50 rounded-lg p-3">
                    <Heart className="h-5 w-5 text-green-600 mr-3" />
                    <span className="font-medium">Helpful Feedback</span>
                  </div>
                  <div className="flex items-center bg-white bg-opacity-50 rounded-lg p-3">
                    <Star className="h-5 w-5 text-green-600 mr-3" />
                    <span className="font-medium">Progress Tracking</span>
                  </div>
                </div>
                <button
                  onClick={handleStartWriting}
                  className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-2xl hover:from-green-600 hover:to-blue-600 transition-all duration-300 font-bold text-lg shadow-lg transform hover:scale-105"
                >
                  🚀 Start Writing Now!
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Simplified Status Messages */}
        {isLoading ? (
          <div className="bg-white border-2 border-blue-200 rounded-3xl p-8 mb-8 shadow-lg">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600 mr-4"></div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Getting things ready...</h3>
                <p className="text-gray-600 text-lg">Just a moment while we set up your writing space!</p>
              </div>
            </div>
          </div>
        ) : accessType === 'temporary' ? (
          <div className="bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-yellow-300 rounded-3xl p-8 mb-8 shadow-lg">
            <div className="flex items-center">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mr-6 shadow-lg">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-yellow-900 mb-2">Almost ready! ⏰</h3>
                <p className="text-yellow-800 text-lg mb-3">
                  You can start writing now while we finish setting up your account!
                </p>
                <p className="text-yellow-700 font-medium">
                  Time left: <strong>{getTimeRemaining(tempAccessUntil!)}</strong>
                </p>
              </div>
            </div>
            <div className="mt-6">
              <button 
                onClick={handleManualRefresh}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-3 rounded-2xl hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 font-bold shadow-lg"
              >
                Check if I'm Ready!
              </button>
            </div>
          </div>
        ) : accessType === 'none' ? (
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 border-2 border-blue-300 rounded-3xl p-8 mb-8 shadow-lg">
            <div className="flex items-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center mr-6 shadow-lg">
                <Mail className="h-8 w-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-blue-900 mb-2">One more step! 📧</h3>
                <p className="text-blue-800 text-lg mb-3">
                  We sent you a special email! Please check your inbox and click the magic link.
                </p>
                <p className="text-blue-700">
                  Email: <strong>{currentUser?.email}</strong>
                </p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <button 
                onClick={handleManualRefresh}
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-2xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 font-bold shadow-lg"
              >
                I clicked the link!
              </button>
              <button className="bg-gray-200 text-gray-800 px-6 py-3 rounded-2xl hover:bg-gray-300 transition-all duration-300 font-bold shadow-lg">
                Send it again
              </button>
            </div>
          </div>
        ) : null}

        {/* Kid-Friendly Progress Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          
          {/* Writing Streak */}
          <div className="bg-white rounded-3xl shadow-lg p-6 border-2 border-orange-200 hover:border-orange-300 transition-all duration-300 hover:shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-400 rounded-2xl flex items-center justify-center">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div className="flex space-x-1">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
              </div>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">Writing Streak</h3>
            <p className="text-3xl font-bold text-orange-600 mb-2">3 days</p>
            <p className="text-sm text-gray-600">Keep it up! 🔥</p>
          </div>
          
          {/* Stories Created */}
          <div className="bg-white rounded-3xl shadow-lg p-6 border-2 border-blue-200 hover:border-blue-300 transition-all duration-300 hover:shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <Gift className="h-6 w-6 text-blue-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">Stories Created</h3>
            <p className="text-3xl font-bold text-blue-600 mb-2">5</p>
            <p className="text-sm text-gray-600">Amazing work! 📚</p>
          </div>
          
          {/* Words Adventure */}
          <div className="bg-white rounded-3xl shadow-lg p-6 border-2 border-green-200 hover:border-green-300 transition-all duration-300 hover:shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-teal-400 rounded-2xl flex items-center justify-center">
                <PenTool className="h-6 w-6 text-white" />
              </div>
              <div className="text-right">
                <div className="w-16 h-2 bg-green-200 rounded-full">
                  <div className="w-12 h-2 bg-green-500 rounded-full"></div>
                </div>
              </div>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">Words Written</h3>
            <p className="text-3xl font-bold text-green-600 mb-2">1,250</p>
            <p className="text-sm text-gray-600">You're on fire! ✨</p>
          </div>
          
          {/* Fun Level */}
          <div className="bg-white rounded-3xl shadow-lg p-6 border-2 border-purple-200 hover:border-purple-300 transition-all duration-300 hover:shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center">
                <Smile className="h-6 w-6 text-white" />
              </div>
              <div className="flex space-x-1">
                <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                <div className="w-3 h-3 bg-purple-300 rounded-full"></div>
              </div>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">Fun Level</h3>
            <p className="text-3xl font-bold text-purple-600 mb-2">Super!</p>
            <p className="text-sm text-gray-600">Keep having fun! 🎉</p>
          </div>
        </div>

        {/* Big Action Buttons */}
        <div className="bg-white rounded-3xl shadow-xl mb-8 overflow-hidden border-2 border-gray-100">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 px-8 py-6">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <Sparkles className="h-7 w-7 mr-3" />
              What would you like to do?
            </h2>
          </div>
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Start Writing Button */}
              <div 
                className="group bg-gradient-to-br from-blue-50 to-purple-50 border-3 border-blue-200 rounded-3xl p-8 hover:border-blue-300 hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105" 
                onClick={handleStartWriting}
              >
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <PenTool className="h-8 w-8 text-white" />
                  </div>
                  <div className="ml-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Start Writing!</h3>
                    <p className="text-gray-600 text-lg">Create amazing stories with help from your AI friend</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">✨ AI Helper</span>
                    <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">📝 Stories</span>
                  </div>
                  {accessType === 'none' && (
                    <div className="bg-yellow-100 border border-yellow-300 rounded-2xl px-4 py-2">
                      <p className="text-sm text-yellow-800 font-medium">Almost ready!</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Practice Exam Button */}
              <div 
                className="group bg-gradient-to-br from-green-50 to-teal-50 border-3 border-green-200 rounded-3xl p-8 hover:border-green-300 hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105" 
                onClick={handlePracticeExam}
              >
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-3xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <Target className="h-8 w-8 text-white" />
                  </div>
                  <div className="ml-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Practice Fun!</h3>
                    <p className="text-gray-600 text-lg">Take fun practice tests and improve your skills</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">🎯 Practice</span>
                    <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm font-medium">🏆 Skills</span>
                  </div>
                  {accessType === 'none' && (
                    <div className="bg-yellow-100 border border-yellow-300 rounded-2xl px-4 py-2">
                      <p className="text-sm text-yellow-800 font-medium">Almost ready!</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* My Writing Adventures */}
        <div className="bg-white rounded-3xl shadow-xl border-2 border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-orange-400 to-pink-400 px-8 py-6">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <BookOpen className="h-7 w-7 mr-3" />
              My Writing Adventures
            </h2>
          </div>
          <div className="p-8">
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gradient-to-r from-orange-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="h-12 w-12 text-orange-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready for your first adventure?</h3>
              <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
                Start writing your first story and it will appear here! You can see all your amazing work and track your progress.
              </p>
              <button 
                onClick={handleStartWriting}
                className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-8 py-4 rounded-2xl hover:from-orange-600 hover:to-pink-600 transition-all duration-300 font-bold text-lg shadow-lg transform hover:scale-105"
              >
                🚀 Start My First Story!
              </button>
            </div>
          </div>
        </div>

        {/* Encouragement Section */}
        <div className="mt-8 text-center">
          <div className="bg-gradient-to-r from-yellow-100 via-pink-100 to-purple-100 rounded-3xl p-8 border-2 border-yellow-200">
            <div className="flex items-center justify-center mb-4">
              <Heart className="h-8 w-8 text-pink-500 mr-2" />
              <Star className="h-6 w-6 text-yellow-500 fill-current" />
              <Heart className="h-8 w-8 text-pink-500 ml-2" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">You're doing great!</h3>
            <p className="text-gray-700 text-lg max-w-2xl mx-auto">
              Every great writer started with their first word. Keep practicing, stay curious, and remember - 
              every story you write makes you a better writer! 🌟
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
