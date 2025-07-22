import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { isEmailVerified, hasAnyAccess, getUserAccessStatus } from '../lib/supabase';
import { WritingTypeSelectionModal } from './WritingTypeSelectionModal';
import { PromptOptionsModal } from './PromptOptionsModal';
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
  Gift,
  Flame,
  TrendingUp,
  Award,
  Rocket,
  Crown,
  Gem,
  Wand2,
  Palette,
  Music,
  Camera,
  Gamepad2
} from 'lucide-react';

interface DashboardProps {
  user?: any;
  emailVerified?: boolean;
  paymentCompleted?: boolean;
  onNavigate?: (page: string) => void;
  onSignOut?: () => void;
}

export function Dashboard({ user: propUser, emailVerified: propEmailVerified, paymentCompleted: propPaymentCompleted, onNavigate, onSignOut }: DashboardProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isVerified, setIsVerified] = useState(false);
  const [accessType, setAccessType] = useState<'none' | 'temporary' | 'permanent'>('none');
  const [tempAccessUntil, setTempAccessUntil] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userAccessData, setUserAccessData] = useState<any>(null);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);
  
  // FIXED: Modal states for proper sequence
  const [showWritingTypeModal, setShowWritingTypeModal] = useState(false);
  const [showPromptOptionsModal, setShowPromptOptionsModal] = useState(false);
  const [selectedWritingType, setSelectedWritingType] = useState<string>('');

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

  // FIXED: Step 1 - "Write Story" button opens writing type selection modal
  const handleStartWriting = () => {
    console.log('🚀 Dashboard: Starting writing flow...');
    
    // Clear any existing navigation data to ensure fresh start
    localStorage.removeItem('selectedWritingType');
    localStorage.removeItem('promptType');
    localStorage.removeItem('navigationSource');
    localStorage.removeItem('writingContent');
    
    // Set navigation source to track the flow
    localStorage.setItem('navigationSource', 'dashboard');
    
    // Show the writing type selection modal (Step 2)
    setShowWritingTypeModal(true);
  };

  // FIXED: Step 2 - Handle writing type selection, then show prompt options
  const handleWritingTypeSelect = (type: string) => {
    console.log('📝 Dashboard: Writing type selected:', type);
    
    // Store the selected writing type
    setSelectedWritingType(type);
    localStorage.setItem('selectedWritingType', type);
    
    // Close writing type modal and open prompt options modal (Step 3)
    setShowWritingTypeModal(false);
    setShowPromptOptionsModal(true);
  };

  // FIXED: Step 3 - Handle prompt generation, then navigate to writing area
  const handleGeneratePrompt = () => {
    console.log('🎯 Dashboard: Generating prompt for:', selectedWritingType);
    
    // Store the prompt type
    localStorage.setItem('promptType', 'generated');
    
    // Close prompt options modal
    setShowPromptOptionsModal(false);
    
    // Navigate to writing page (Step 4 - Writing Area)
    console.log('📍 Dashboard: Navigating to writing area...');
    
    // FIXED: Use React Router navigate directly for consistent navigation
    try {
      navigate('/writing');
      console.log('✅ Dashboard: Navigation to /writing initiated');
    } catch (error) {
      console.error('❌ Dashboard: Navigation error:', error);
      // Fallback to onNavigate if available
      if (onNavigate) {
        console.log('📍 Dashboard: Using onNavigate fallback');
        onNavigate('writing');
      } else {
        console.log('📍 Dashboard: Using window.location fallback');
        window.location.href = '/writing';
      }
    }
  };

  // FIXED: Step 3 - Handle custom prompt, then navigate to writing area
  const handleCustomPrompt = () => {
    console.log('✏️ Dashboard: Using custom prompt for:', selectedWritingType);
    
    // Store the prompt type
    localStorage.setItem('promptType', 'custom');
    
    // Close prompt options modal
    setShowPromptOptionsModal(false);
    
    // Navigate to writing page (Step 4 - Writing Area)
    console.log('📍 Dashboard: Navigating to writing area...');
    
    // FIXED: Use React Router navigate directly for consistent navigation
    try {
      navigate('/writing');
      console.log('✅ Dashboard: Navigation to /writing initiated');
    } catch (error) {
      console.error('❌ Dashboard: Navigation error:', error);
      // Fallback to onNavigate if available
      if (onNavigate) {
        console.log('📍 Dashboard: Using onNavigate fallback');
        onNavigate('writing');
      } else {
        console.log('📍 Dashboard: Using window.location fallback');
        window.location.href = '/writing';
      }
    }
  };

  const handlePracticeExam = () => {
    console.log('🚀 Dashboard: Navigating to practice exam...');
    try {
      navigate('/exam');
    } catch (error) {
      console.error('❌ Dashboard: Exam navigation error:', error);
      if (onNavigate) {
        onNavigate('exam');
      } else {
        window.location.href = '/exam';
      }
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
      // Capitalize first letter and handle dots
      const namePart = emailPart.split('.')[0];
      return namePart.charAt(0).toUpperCase() + namePart.slice(1);
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-pink-200 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-purple-200 rounded-full opacity-15 animate-pulse"></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-green-200 rounded-full opacity-25 animate-bounce"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        
        {/* Enhanced Header with Animated Mascot */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 rounded-full flex items-center justify-center mr-6 shadow-2xl transform hover:scale-110 transition-all duration-300 animate-pulse">
                <Sparkles className="h-10 w-10 text-white animate-spin" style={{ animationDuration: '3s' }} />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                <Crown className="h-4 w-4 text-white" />
              </div>
            </div>
            <div className="text-left">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                Hi there, {getUserName()}! 🌟
              </h1>
              <p className="text-2xl text-gray-700 font-medium bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                Let's write something awesome today!
              </p>
            </div>
          </div>
        </div>

        {/* Enhanced Welcome Message for Premium Users */}
        {showWelcomeMessage && accessType === 'permanent' && (
          <div className="bg-gradient-to-r from-green-100 via-blue-100 to-purple-100 border-4 border-green-300 rounded-3xl p-8 mb-8 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-40 h-40 bg-yellow-200 rounded-full -mr-20 -mt-20 opacity-30 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-pink-200 rounded-full -ml-16 -mb-16 opacity-40 animate-bounce"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-purple-200 to-blue-200 rounded-full opacity-10 animate-spin" style={{ animationDuration: '20s' }}></div>
            
            <button
              onClick={handleDismissWelcome}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300"
            >
              <X className="h-6 w-6" />
            </button>
            
            <div className="flex items-center relative z-10">
              <div className="w-24 h-24 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 rounded-full flex items-center justify-center mr-8 shadow-2xl animate-bounce">
                <Trophy className="h-12 w-12 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-4xl font-bold text-green-900 mb-4 flex items-center">
                  🎉 Hooray! You're All Set! 
                  <Gem className="h-8 w-8 text-yellow-500 ml-3 animate-pulse" />
                </h3>
                <p className="text-green-800 mb-6 text-xl font-medium">
                  Welcome to your writing adventure! You now have access to all the cool features:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-green-700 mb-8">
                  <div className="flex items-center bg-white bg-opacity-70 rounded-2xl p-4 shadow-lg transform hover:scale-105 transition-all duration-300">
                    <Zap className="h-6 w-6 text-green-600 mr-4" />
                    <span className="font-bold text-lg">Smart Writing Helper</span>
                  </div>
                  <div className="flex items-center bg-white bg-opacity-70 rounded-2xl p-4 shadow-lg transform hover:scale-105 transition-all duration-300">
                    <Target className="h-6 w-6 text-green-600 mr-4" />
                    <span className="font-bold text-lg">Fun Practice Tests</span>
                  </div>
                  <div className="flex items-center bg-white bg-opacity-70 rounded-2xl p-4 shadow-lg transform hover:scale-105 transition-all duration-300">
                    <Heart className="h-6 w-6 text-green-600 mr-4" />
                    <span className="font-bold text-lg">Helpful Feedback</span>
                  </div>
                  <div className="flex items-center bg-white bg-opacity-70 rounded-2xl p-4 shadow-lg transform hover:scale-105 transition-all duration-300">
                    <Star className="h-6 w-6 text-green-600 mr-4" />
                    <span className="font-bold text-lg">Progress Tracking</span>
                  </div>
                </div>
                <button
                  onClick={handleStartWriting}
                  className="bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 text-white px-10 py-5 rounded-3xl hover:from-green-600 hover:via-blue-600 hover:to-purple-600 transition-all duration-300 font-bold text-xl shadow-2xl transform hover:scale-110 flex items-center"
                >
                  <Rocket className="h-6 w-6 mr-3" />
                  🚀 Start Writing Now!
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Status Messages */}
        {isLoading ? (
          <div className="bg-white border-4 border-blue-200 rounded-3xl p-8 mb-8 shadow-2xl">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mr-6"></div>
              <div className="text-center">
                <h3 className="text-3xl font-bold text-gray-900 mb-3">Getting things ready...</h3>
                <p className="text-gray-600 text-xl">Just a moment while we set up your writing space!</p>
              </div>
            </div>
          </div>
        ) : accessType === 'temporary' ? (
          <div className="bg-gradient-to-r from-yellow-100 to-orange-100 border-4 border-yellow-300 rounded-3xl p-8 mb-8 shadow-2xl">
            <div className="flex items-center">
              <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mr-8 shadow-2xl animate-pulse">
                <Clock className="h-10 w-10 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-3xl font-bold text-yellow-900 mb-3">Almost ready! ⏰</h3>
                <p className="text-yellow-800 text-xl mb-4 font-medium">
                  You can start writing now while we finish setting up your account!
                </p>
                <p className="text-yellow-700 font-bold text-lg">
                  Time left: <strong className="text-2xl">{getTimeRemaining(tempAccessUntil!)}</strong>
                </p>
              </div>
            </div>
            <div className="mt-8">
              <button 
                onClick={handleManualRefresh}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-4 rounded-3xl hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 font-bold text-lg shadow-2xl transform hover:scale-105"
              >
                Check if I'm Ready!
              </button>
            </div>
          </div>
        ) : accessType === 'none' ? (
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 border-4 border-blue-300 rounded-3xl p-8 mb-8 shadow-2xl">
            <div className="flex items-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center mr-8 shadow-2xl animate-bounce">
                <Mail className="h-10 w-10 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-3xl font-bold text-blue-900 mb-3">One more step! 📧</h3>
                <p className="text-blue-800 text-xl mb-4 font-medium">
                  We sent you a special email! Please check your inbox and click the magic link.
                </p>
                <p className="text-blue-700 text-lg">
                  Email: <strong className="text-xl">{currentUser?.email}</strong>
                </p>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <button 
                onClick={handleManualRefresh}
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-3xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 font-bold text-lg shadow-2xl transform hover:scale-105"
              >
                I clicked the link!
              </button>
              <button className="bg-gray-200 text-gray-800 px-8 py-4 rounded-3xl hover:bg-gray-300 transition-all duration-300 font-bold text-lg shadow-2xl transform hover:scale-105">
                Send it again
              </button>
            </div>
          </div>
        ) : null}

        {/* Enhanced Progress Cards with Better Visual Design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Writing Streak Card */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 border-4 border-orange-200 hover:border-orange-400 transition-all duration-300 hover:shadow-3xl transform hover:scale-105 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-orange-100 rounded-full -mr-10 -mt-10 opacity-50"></div>
            <div className="flex items-center justify-between mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-red-400 rounded-3xl flex items-center justify-center shadow-xl">
                <Flame className="h-8 w-8 text-white" />
              </div>
              <div className="flex space-x-1">
                <Star className="h-6 w-6 text-yellow-400 fill-current animate-pulse" />
                <Star className="h-6 w-6 text-yellow-400 fill-current animate-pulse" style={{ animationDelay: '0.2s' }} />
                <Star className="h-6 w-6 text-yellow-400 fill-current animate-pulse" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Writing Streak</h3>
            <p className="text-4xl font-bold text-orange-600 mb-3">3 days</p>
            <p className="text-sm text-gray-600 font-medium">Keep it up! 🔥</p>
          </div>
          
          {/* Stories Created Card */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 border-4 border-blue-200 hover:border-blue-400 transition-all duration-300 hover:shadow-3xl transform hover:scale-105 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-blue-100 rounded-full -mr-10 -mt-10 opacity-50"></div>
            <div className="flex items-center justify-between mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-400 rounded-3xl flex items-center justify-center shadow-xl">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <Gift className="h-8 w-8 text-blue-400 animate-bounce" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Stories Created</h3>
            <p className="text-4xl font-bold text-blue-600 mb-3">5</p>
            <p className="text-sm text-gray-600 font-medium">Amazing work! 📚</p>
          </div>
          
          {/* Words Written Card */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 border-4 border-green-200 hover:border-green-400 transition-all duration-300 hover:shadow-3xl transform hover:scale-105 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-green-100 rounded-full -mr-10 -mt-10 opacity-50"></div>
            <div className="flex items-center justify-between mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-teal-400 rounded-3xl flex items-center justify-center shadow-xl">
                <PenTool className="h-8 w-8 text-white" />
              </div>
              <div className="text-right">
                <div className="w-20 h-3 bg-green-200 rounded-full">
                  <div className="w-16 h-3 bg-green-500 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Words Written</h3>
            <p className="text-4xl font-bold text-green-600 mb-3">1,250</p>
            <p className="text-sm text-gray-600 font-medium">You're on fire! ✨</p>
          </div>
          
          {/* Fun Level Card */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 border-4 border-purple-200 hover:border-purple-400 transition-all duration-300 hover:shadow-3xl transform hover:scale-105 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-purple-100 rounded-full -mr-10 -mt-10 opacity-50"></div>
            <div className="flex items-center justify-between mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-3xl flex items-center justify-center shadow-xl">
                <Smile className="h-8 w-8 text-white" />
              </div>
              <div className="flex space-x-2">
                <div className="w-4 h-4 bg-purple-400 rounded-full animate-bounce"></div>
                <div className="w-4 h-4 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-4 h-4 bg-purple-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Fun Level</h3>
            <p className="text-4xl font-bold text-purple-600 mb-3">Super!</p>
            <p className="text-sm text-gray-600 font-medium">Keep having fun! 🎉</p>
          </div>
        </div>

        {/* Enhanced Action Buttons Section */}
        <div className="bg-white rounded-3xl shadow-2xl mb-12 overflow-hidden border-4 border-gray-100">
          <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 px-10 py-8">
            <h2 className="text-3xl font-bold text-white flex items-center">
              <Wand2 className="h-8 w-8 mr-4 animate-pulse" />
              What would you like to do?
            </h2>
          </div>
          <div className="p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              
              {/* FIXED: Start Writing Button - Opens modal sequence */}
              <div 
                className="group bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 border-4 border-blue-200 rounded-3xl p-10 hover:border-blue-400 hover:shadow-3xl transition-all duration-300 cursor-pointer transform hover:scale-105 relative overflow-hidden" 
                onClick={handleStartWriting}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-full -mr-16 -mt-16 opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                <div className="flex items-center mb-8 relative z-10">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl flex items-center justify-center shadow-2xl group-hover:shadow-3xl transition-all duration-300 transform group-hover:scale-110">
                    <PenTool className="h-10 w-10 text-white" />
                  </div>
                  <div className="ml-8">
                    <h3 className="text-3xl font-bold text-gray-900 mb-3">Write Story!</h3>
                    <p className="text-gray-600 text-xl font-medium">Create amazing stories with help from your AI friend</p>
                  </div>
                </div>
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex space-x-3">
                    <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-bold flex items-center">
                      <Sparkles className="h-4 w-4 mr-2" />
                      ✨ AI Helper
                    </span>
                    <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-bold flex items-center">
                      <BookOpen className="h-4 w-4 mr-2" />
                      📝 Stories
                    </span>
                  </div>
                  {accessType === 'none' && (
                    <div className="bg-yellow-100 border-2 border-yellow-300 rounded-2xl px-6 py-3">
                      <p className="text-sm text-yellow-800 font-bold">Almost ready!</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Enhanced Practice Exam Button */}
              <div 
                className="group bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 border-4 border-green-200 rounded-3xl p-10 hover:border-green-400 hover:shadow-3xl transition-all duration-300 cursor-pointer transform hover:scale-105 relative overflow-hidden" 
                onClick={handlePracticeExam}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-100 rounded-full -mr-16 -mt-16 opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                <div className="flex items-center mb-8 relative z-10">
                  <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-teal-500 rounded-3xl flex items-center justify-center shadow-2xl group-hover:shadow-3xl transition-all duration-300 transform group-hover:scale-110">
                    <Target className="h-10 w-10 text-white" />
                  </div>
                  <div className="ml-8">
                    <h3 className="text-3xl font-bold text-gray-900 mb-3">Practice Fun!</h3>
                    <p className="text-gray-600 text-xl font-medium">Take fun practice tests and improve your skills</p>
                  </div>
                </div>
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex space-x-3">
                    <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-bold flex items-center">
                      <Target className="h-4 w-4 mr-2" />
                      🎯 Practice
                    </span>
                    <span className="bg-teal-100 text-teal-800 px-4 py-2 rounded-full text-sm font-bold flex items-center">
                      <Trophy className="h-4 w-4 mr-2" />
                      🏆 Skills
                    </span>
                  </div>
                  {accessType === 'none' && (
                    <div className="bg-yellow-100 border-2 border-yellow-300 rounded-2xl px-6 py-3">
                      <p className="text-sm text-yellow-800 font-bold">Almost ready!</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Writing Adventures Section */}
        <div className="bg-white rounded-3xl shadow-2xl border-4 border-gray-100 overflow-hidden mb-12">
          <div className="bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 px-10 py-8">
            <h2 className="text-3xl font-bold text-white flex items-center">
              <BookOpen className="h-8 w-8 mr-4" />
              My Writing Adventures
            </h2>
          </div>
          <div className="p-10">
            <div className="text-center py-16">
              <div className="w-32 h-32 bg-gradient-to-r from-orange-100 via-pink-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
                <Sparkles className="h-16 w-16 text-orange-500 animate-pulse" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Ready for your first adventure?</h3>
              <p className="text-gray-600 text-xl mb-10 max-w-2xl mx-auto font-medium">
                Start writing your first story and it will appear here! You can see all your amazing work and track your progress.
              </p>
              <button 
                onClick={handleStartWriting}
                className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 text-white px-12 py-6 rounded-3xl hover:from-orange-600 hover:via-pink-600 hover:to-purple-600 transition-all duration-300 font-bold text-xl shadow-2xl transform hover:scale-110 flex items-center mx-auto"
              >
                <Rocket className="h-8 w-8 mr-4" />
                🚀 Start My First Story!
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Encouragement Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-yellow-100 via-pink-100 to-purple-100 rounded-3xl p-10 border-4 border-yellow-200 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200 opacity-20 animate-pulse"></div>
            <div className="flex items-center justify-center mb-6 relative z-10">
              <Heart className="h-10 w-10 text-pink-500 mr-3 animate-pulse" />
              <Star className="h-8 w-8 text-yellow-500 fill-current animate-bounce" />
              <Heart className="h-10 w-10 text-pink-500 ml-3 animate-pulse" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4 relative z-10">You're doing great!</h3>
            <p className="text-gray-700 text-xl max-w-3xl mx-auto font-medium relative z-10">
              Every great writer started with their first word. Keep practicing, stay curious, and remember - 
              every story you write makes you a better writer! 🌟
            </p>
          </div>
        </div>
      </div>

      {/* FIXED: Modal Components for proper sequence */}
      {/* Step 2: Writing Type Selection Modal */}
      <WritingTypeSelectionModal
        isOpen={showWritingTypeModal}
        onClose={() => setShowWritingTypeModal(false)}
        onSelectType={handleWritingTypeSelect}
      />

      {/* Step 3: Prompt Options Modal */}
      <PromptOptionsModal
        isOpen={showPromptOptionsModal}
        onClose={() => setShowPromptOptionsModal(false)}
        onGeneratePrompt={handleGeneratePrompt}
        onCustomPrompt={handleCustomPrompt}
        textType={selectedWritingType}
      />
    </div>
  );
}
