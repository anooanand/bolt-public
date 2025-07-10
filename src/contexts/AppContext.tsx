import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

import { NavBar } from '../components/NavBar';
import { HeroSection } from '../components/HeroSection';
import { FeaturesSection } from '../components/FeaturesSection';
import { ToolsSection } from '../components/ToolsSection';
import { WritingTypesSection } from '../components/WritingTypesSection';
import { Footer } from '../components/Footer';
import { PaymentSuccessPage } from '../components/PaymentSuccessPage';
import { PricingPage } from '../components/PricingPage';
import { Dashboard } from '../components/Dashboard';
import { AuthModal } from '../components/AuthModal';
import { FAQPage } from '../components/FAQPage';
import { AboutPage } from '../components/AboutPage';
import { SettingsPage } from '../components/SettingsPage';
import { DemoPage } from '../components/DemoPage';

// Writing components
import { SplitScreen } from '../components/SplitScreen';
import { WritingArea } from '../components/WritingArea';
import { TabbedCoachPanel } from '../components/TabbedCoachPanel';
import { LearningPage } from '../components/LearningPage';
import { ExamSimulationMode } from '../components/ExamSimulationMode';
import { SupportiveFeatures } from '../components/SupportiveFeatures';
import { HelpCenter } from '../components/HelpCenter';
import { EssayFeedbackPage } from '../components/EssayFeedbackPage';
import { EnhancedHeader } from '../components/EnhancedHeader';
import { SpecializedCoaching } from '../components/text-type-templates/SpecializedCoaching';
import { BrainstormingTools } from '../components/BrainstormingTools';
import { WritingAccessCheck } from '../components/WritingAccessCheck';
import { WritingToolbar } from '../components/WritingToolbar';
import { PlanningToolModal } from '../components/PlanningToolModal';
import { EmailVerificationHandler } from '../components/EmailVerificationHandler';
import { FloatingChatWindow } from '../components/FloatingChatWindow';
import { CheckCircle } from 'lucide-react';
import { AdminButton } from '../components/AdminButton';

// Type definitions
export interface Writing {
  id: string;
  user_id: string;
  title: string;
  content: string;
  text_type: string;
  created_at: string;
  updated_at: string;
  word_count?: number;
  status?: 'draft' | 'completed' | 'submitted';
}

export interface Feedback {
  id: string;
  writing_id: string;
  user_id: string;
  feedback_text: string;
  feedback_type: 'grammar' | 'structure' | 'content' | 'style' | 'overall';
  created_at: string;
  rating?: number;
}

export interface UserProgress {
  id: string;
  user_id: string;
  lesson_id: string;
  completed: boolean;
  score?: number;
  completed_at?: string;
  time_spent?: number;
}

// App Context interface
interface AppContextType {
  // Writing state
  content: string;
  setContent: (content: string) => void;
  textType: string;
  setTextType: (type: string) => void;
  assistanceLevel: string;
  setAssistanceLevel: (level: string) => void;
  timerStarted: boolean;
  setTimerStarted: (started: boolean) => void;
  selectedText: string;
  setSelectedText: (text: string) => void;
  
  // UI state
  activePage: string;
  setActivePage: (page: string) => void;
  showExamMode: boolean;
  setShowExamMode: (show: boolean) => void;
  showHelpCenter: boolean;
  setShowHelpCenter: (show: boolean) => void;
  showPlanningTool: boolean;
  setShowPlanningTool: (show: boolean) => void;
  
  // Navigation
  handleNavigation: (page: string) => void;
  
  // Popup flow
  popupFlowCompleted: boolean;
  setPopupFlowCompleted: (completed: boolean) => void;
}

// Create the context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Custom hook to use the app context
export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

// App Provider component (NO useLocation here - this runs outside Router)
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user, loading, paymentCompleted, emailVerified, authSignOut } = useAuth();
  const [activePage, setActivePage] = useState('home');

  // Writing state
  const [content, setContent] = useState('');
  const [textType, setTextType] = useState('');
  const [assistanceLevel, setAssistanceLevel] = useState('detailed');
  const [timerStarted, setTimerStarted] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [showExamMode, setShowExamMode] = useState(false);
  const [showHelpCenter, setShowHelpCenter] = useState(false);
  const [showPlanningTool, setShowPlanningTool] = useState(false);
  
  // New state for popup flow completion
  const [popupFlowCompleted, setPopupFlowCompleted] = useState(false); 
  const [hasSignedIn, setHasSignedIn] = useState(false);

  // IMPROVED: Handle sign-in behavior with better session management
  useEffect(() => {
    if (user && !hasSignedIn) {
      // User just signed in
      console.log('✅ User signed in:', user.email);
      setHasSignedIn(true);
      
      // Clear content and reset state for fresh start
      setContent('');
      setTextType('');
      setPopupFlowCompleted(false);
      
      // Clear localStorage to ensure fresh start
      localStorage.removeItem('writingContent');
      localStorage.removeItem('selectedWritingType');
      
      // IMPROVED: Navigate to appropriate page based on user status
      if (emailVerified && paymentCompleted) {
        console.log('✅ User has full access, navigating to writing');
        setActivePage('writing');
      } else if (emailVerified && !paymentCompleted) {
        console.log('⚠️ User needs payment, navigating to pricing');
        setActivePage('pricing');
      } else if (!emailVerified) {
        console.log('⚠️ User needs email verification, navigating to dashboard');
        setActivePage('dashboard');
      }
    } else if (!user && hasSignedIn) {
      // User signed out
      console.log('👋 User signed out');
      setHasSignedIn(false);
      setActivePage('home');
    }
  }, [user, hasSignedIn, emailVerified, paymentCompleted]);

  // Check for payment success in URL on mount (moved to LocationHandler component)
  // Text selection logic for writing area
  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection();
      if (selection && selection.toString().trim().length > 0) {
        setSelectedText(selection.toString());
      }
    };

    document.addEventListener('selectionchange', handleSelectionChange);
    return () => document.removeEventListener('selectionchange', handleSelectionChange);
  }, []);

  // IMPROVED: Better navigation handling with proper access checks
  const handleNavigation = async (page: string) => {
    console.log('Navigation requested to:', page);
    
    // Special handling for dashboard - redirect based on verification and payment status
    if (page === 'dashboard' && user) {
      if (!emailVerified) {
        console.log('Navigating to dashboard for email verification');
        setActivePage('dashboard'); // Show email verification reminder
      } else if (paymentCompleted) {
        console.log('User has full access, redirecting to writing');
        setActivePage('writing'); // Full access
      } else {
        console.log('User needs payment, redirecting to pricing');
        setActivePage('pricing'); // Need to complete payment
      }
    } else if (page === 'writing' && user) {
      // Check access before allowing writing page
      if (!emailVerified) {
        console.log('Email not verified, redirecting to dashboard');
        setActivePage('dashboard');
      } else if (!paymentCompleted) {
        console.log('Payment not completed, redirecting to pricing');
        setActivePage('pricing');
      } else {
        console.log('Full access granted, navigating to writing');
        setActivePage('writing');
      }
    } else {
      setActivePage(page);
    }
  };

  // Context value
  const contextValue: AppContextType = {
    content,
    setContent,
    textType,
    setTextType,
    assistanceLevel,
    setAssistanceLevel,
    timerStarted,
    setTimerStarted,
    selectedText,
    setSelectedText,
    activePage,
    setActivePage,
    showExamMode,
    setShowExamMode,
    showHelpCenter,
    setShowHelpCenter,
    showPlanningTool,
    setShowPlanningTool,
    handleNavigation,
    popupFlowCompleted,
    setPopupFlowCompleted,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

// Location Handler component (handles useLocation inside Router context)
const LocationHandler: React.FC = () => {
  const location = useLocation();
  const { setActivePage } = useApp();

  // Set active page based on current path
  useEffect(() => {
    const path = location.pathname.substring(1) || 'home';
    if (path !== 'auth/callback') { // Don't change active page during auth callback
      setActivePage(path);
    }
  }, [location.pathname, setActivePage]);

  // Check for payment success in URL on mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const paymentSuccess = urlParams.get('paymentSuccess') === 'true' || urlParams.get('payment_success') === 'true';
    const planType = urlParams.get('planType') || urlParams.get('plan');
    const userEmail = urlParams.get('email');
    
    if (paymentSuccess && planType) {
      console.log('[DEBUG] Payment success detected for plan:', planType);
      
      // Store payment info
      if (userEmail) {
        localStorage.setItem('userEmail', userEmail);
      }
      localStorage.setItem('payment_plan', planType);
      localStorage.setItem('payment_date', new Date().toISOString());
      
      // Clear URL parameters
      window.history.replaceState({}, document.title, window.location.pathname);
      
      setActivePage('payment-success');
    }
  }, [setActivePage]);

  return null; // This component doesn't render anything
};

// AppContent component (the main app component)
function AppContent() {
  const { user, loading, paymentCompleted, emailVerified, authSignOut } = useAuth();
  const {
    activePage,
    setActivePage,
    content,
    setContent,
    textType,
    setTextType,
    assistanceLevel,
    setAssistanceLevel,
    timerStarted,
    setTimerStarted,
    selectedText,
    showExamMode,
    setShowExamMode,
    showHelpCenter,
    setShowHelpCenter,
    showPlanningTool,
    setShowPlanningTool,
    handleNavigation,
    popupFlowCompleted,
    setPopupFlowCompleted,
  } = useApp();

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup'>('signin');
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  const [pendingPaymentPlan, setPendingPaymentPlan] = useState<string | null>(null);

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    if (pendingPaymentPlan) {
      setActivePage('payment-success');
      setShowPaymentSuccess(true);
    } else {
      // Let the useEffect handle navigation based on user status
      console.log('Auth success, letting useEffect handle navigation');
    }
  };

  const handleForceSignOut = async () => {
    try {
      console.log('🔄 AppContent: Starting force sign out...');
      
      // Reset all local state first
      setActivePage('home');
      setShowAuthModal(false);
      setShowPaymentSuccess(false);
      setPendingPaymentPlan(null);
      setContent('');
      setTextType('');
      setPopupFlowCompleted(false);
      
      console.log('✅ AppContent: Local state reset completed');
      
      // Then attempt auth sign out
      await authSignOut();
      console.log('✅ AppContent: Auth sign out completed');
      
    } catch (error) {
      console.error('AppContent: Error during sign out:', error);
      
      // Force reset even if sign out fails
      setActivePage('home');
      setShowAuthModal(false);
      setShowPaymentSuccess(false);
      setPendingPaymentPlan(null);
      
      // Clear localStorage as fallback
      localStorage.clear();
      
      console.log('⚠️ AppContent: Forced local state reset due to sign out error');
    }
  };

  const handleGetStarted = async () => {
    if (user) {
      if (!emailVerified) {
        console.log('Get started: Email not verified, showing dashboard');
        setActivePage('dashboard'); // Show email verification reminder
      } else if (paymentCompleted) {
        console.log('Get started: Full access, showing writing');
        setActivePage('writing'); // Full access
      } else {
        console.log('Get started: Payment needed, showing pricing');
        setActivePage('pricing'); // Need to complete payment
      }
    } else {
      console.log('Get started: No user, showing auth modal');
      setAuthModalMode('signup');
      setShowAuthModal(true);
    }
  };

  const handleSignIn = () => {
    setAuthModalMode('signin');
    setShowAuthModal(true);
  };

  const handleSignUp = () => {
    setAuthModalMode('signup');
    setShowAuthModal(true);
  };

  // IMPROVED: Show loading state while auth is being checked
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return (
          <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            <NavBar 
              onNavigate={handleNavigation}
              onSignIn={handleSignIn}
              onSignUp={handleSignUp}
              onSignOut={handleForceSignOut}
              user={user}
            />
            <HeroSection onGetStarted={handleGetStarted} />
            <FeaturesSection />
            <ToolsSection />
            <WritingTypesSection onNavigate={handleNavigation} />
            <Footer />
            <AdminButton onNavigate={handleNavigation} />
          </div>
        );

      case 'pricing':
        return (
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <NavBar 
              onNavigate={handleNavigation}
              onSignIn={handleSignIn}
              onSignUp={handleSignUp}
              onSignOut={handleForceSignOut}
              user={user}
            />
            <PricingPage onNavigate={handleNavigation} />
            <Footer />
          </div>
        );

      case 'dashboard':
        return (
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <NavBar 
              onNavigate={handleNavigation}
              onSignIn={handleSignIn}
              onSignUp={handleSignUp}
              onSignOut={handleForceSignOut}
              user={user}
            />
            <Dashboard onNavigate={handleNavigation} />
            <Footer />
          </div>
        );

      case 'writing':
        return (
          <WritingAccessCheck onNavigate={handleNavigation}>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
              <EnhancedHeader 
                onNavigate={handleNavigation}
                onSignOut={handleForceSignOut}
                user={user}
                emailVerified={emailVerified}
                paymentCompleted={paymentCompleted}
              />
              
              <SplitScreen
                leftPanel={
                  <WritingArea
                    content={content}
                    setContent={setContent}
                    textType={textType}
                    setTextType={setTextType}
                    assistanceLevel={assistanceLevel}
                    timerStarted={timerStarted}
                    setTimerStarted={setTimerStarted}
                    onNavigate={handleNavigation}
                    popupFlowCompleted={popupFlowCompleted}
                    setPopupFlowCompleted={setPopupFlowCompleted}
                  />
                }
                rightPanel={
                  <TabbedCoachPanel
                    content={content}
                    textType={textType}
                    assistanceLevel={assistanceLevel}
                    setAssistanceLevel={setAssistanceLevel}
                    selectedText={selectedText}
                    onNavigate={handleNavigation}
                  />
                }
              />
              
              <WritingToolbar
                onExamMode={() => setShowExamMode(true)}
                onHelpCenter={() => setShowHelpCenter(true)}
                onPlanningTool={() => setShowPlanningTool(true)}
              />
              
              <FloatingChatWindow />
            </div>
          </WritingAccessCheck>
        );

      case 'learning':
        return (
          <WritingAccessCheck onNavigate={handleNavigation}>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
              <NavBar 
                onNavigate={handleNavigation}
                onSignIn={handleSignIn}
                onSignUp={handleSignUp}
                onSignOut={handleForceSignOut}
                user={user}
              />
              <LearningPage onNavigate={handleNavigation} />
              <Footer />
            </div>
          </WritingAccessCheck>
        );

      case 'payment-success':
        return (
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <NavBar 
              onNavigate={handleNavigation}
              onSignIn={handleSignIn}
              onSignUp={handleSignUp}
              onSignOut={handleForceSignOut}
              user={user}
            />
            <PaymentSuccessPage 
              onNavigate={handleNavigation}
              planType={pendingPaymentPlan}
            />
            <Footer />
          </div>
        );

      case 'faq':
        return (
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <NavBar 
              onNavigate={handleNavigation}
              onSignIn={handleSignIn}
              onSignUp={handleSignUp}
              onSignOut={handleForceSignOut}
              user={user}
            />
            <FAQPage />
            <Footer />
          </div>
        );

      case 'about':
        return (
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <NavBar 
              onNavigate={handleNavigation}
              onSignIn={handleSignIn}
              onSignUp={handleSignUp}
              onSignOut={handleForceSignOut}
              user={user}
            />
            <AboutPage />
            <Footer />
          </div>
        );

      case 'settings':
        return (
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <NavBar 
              onNavigate={handleNavigation}
              onSignIn={handleSignIn}
              onSignUp={handleSignUp}
              onSignOut={handleForceSignOut}
              user={user}
            />
            <SettingsPage onNavigate={handleNavigation} />
            <Footer />
          </div>
        );

      case 'demo':
        return (
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <NavBar 
              onNavigate={handleNavigation}
              onSignIn={handleSignIn}
              onSignUp={handleSignUp}
              onSignOut={handleForceSignOut}
              user={user}
            />
            <DemoPage />
            <Footer />
          </div>
        );

      case 'essay-feedback':
        return (
          <WritingAccessCheck onNavigate={handleNavigation}>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
              <NavBar 
                onNavigate={handleNavigation}
                onSignIn={handleSignIn}
                onSignUp={handleSignUp}
                onSignOut={handleForceSignOut}
                user={user}
              />
              <EssayFeedbackPage onNavigate={handleNavigation} />
              <Footer />
            </div>
          </WritingAccessCheck>
        );

      default:
        return (
          <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            <NavBar 
              onNavigate={handleNavigation}
              onSignIn={handleSignIn}
              onSignUp={handleSignUp}
              onSignOut={handleForceSignOut}
              user={user}
            />
            <HeroSection onGetStarted={handleGetStarted} />
            <FeaturesSection />
            <ToolsSection />
            <WritingTypesSection onNavigate={handleNavigation} />
            <Footer />
            <AdminButton onNavigate={handleNavigation} />
          </div>
        );
    }
  };

  return (
    <div className="App">
      <LocationHandler />
      <EmailVerificationHandler />
      
      {renderPage()}

      {/* Modals */}
      {showAuthModal && (
        <AuthModal
          mode={authModalMode}
          onClose={() => setShowAuthModal(false)}
          onSuccess={handleAuthSuccess}
          onSwitchMode={(mode) => setAuthModalMode(mode)}
        />
      )}

      {showExamMode && (
        <ExamSimulationMode
          onClose={() => setShowExamMode(false)}
          onNavigate={handleNavigation}
        />
      )}

      {showHelpCenter && (
        <HelpCenter
          onClose={() => setShowHelpCenter(false)}
          onNavigate={handleNavigation}
        />
      )}

      {showPlanningTool && (
        <PlanningToolModal
          onClose={() => setShowPlanningTool(false)}
          textType={textType}
          onContentGenerated={(content) => {
            setContent(content);
            setShowPlanningTool(false);
          }}
        />
      )}
    </div>
  );
}

export default AppContent;
