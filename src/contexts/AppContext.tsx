import React, { useState, useEffect, useContext, createContext } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
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

interface AppContextType {
  activePage: string;
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
  showAuthModal: boolean;
  setShowAuthModal: React.Dispatch<React.SetStateAction<boolean>>;
  authModalMode: 'signin' | 'signup';
  setAuthModalMode: React.Dispatch<React.SetStateAction<'signin' | 'signup'>>;
  showPaymentSuccess: boolean;
  setShowPaymentSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  pendingPaymentPlan: string | null;
  setPendingPaymentPlan: React.Dispatch<React.SetStateAction<string | null>>;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  textType: string;
  setTextType: React.Dispatch<React.SetStateAction<string>>;
  assistanceLevel: string;
  setAssistanceLevel: React.Dispatch<React.SetStateAction<string>>;
  timerStarted: boolean;
  setTimerStarted: React.Dispatch<React.SetStateAction<boolean>>;
  selectedText: string;
  setSelectedText: React.Dispatch<React.SetStateAction<string>>;
  showExamMode: boolean;
  setShowExamMode: React.Dispatch<React.SetStateAction<boolean>>;
  showHelpCenter: boolean;
  setShowHelpCenter: React.Dispatch<React.SetStateAction<boolean>>;
  showPlanningTool: boolean;
  setShowPlanningTool: React.Dispatch<React.SetStateAction<boolean>>;
  popupFlowCompleted: boolean;
  setPopupFlowCompleted: React.Dispatch<React.SetStateAction<boolean>>;
  hasSignedIn: boolean;
  setHasSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
  handleNavigation: (page: string) => void;
  handleGetStarted: () => void;
  handleSignIn: () => void;
  handleSignUp: () => void;
  handleForceSignOut: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading, paymentCompleted, emailVerified, authSignOut } = useAuth();
  const location = useLocation();
  
  // State management
  const [activePage, setActivePage] = useState('home');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup'>('signin');
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  const [pendingPaymentPlan, setPendingPaymentPlan] = useState<string | null>(null);
  const [content, setContent] = useState('');
  const [textType, setTextType] = useState('');
  const [assistanceLevel, setAssistanceLevel] = useState('detailed');
  const [timerStarted, setTimerStarted] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [showExamMode, setShowExamMode] = useState(false);
  const [showHelpCenter, setShowHelpCenter] = useState(false);
  const [showPlanningTool, setShowPlanningTool] = useState(false);
  const [popupFlowCompleted, setPopupFlowCompleted] = useState(false);
  const [hasSignedIn, setHasSignedIn] = useState(false);

  // Set active page based on current path
  useEffect(() => {
    const path = location.pathname.substring(1) || 'home';
    if (path !== 'auth/callback') {
      setActivePage(path);
    }
  }, [location.pathname]);

  // Check for payment success in URL on mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const paymentSuccess = urlParams.get('paymentSuccess') === 'true' || urlParams.get('payment_success') === 'true';
    const planType = urlParams.get('planType') || urlParams.get('plan');
    const userEmail = urlParams.get('email');
    
    if (paymentSuccess && planType) {
      console.log('[DEBUG] Payment success detected for plan:', planType);
      
      if (userEmail) {
        localStorage.setItem('userEmail', userEmail);
      }
      localStorage.setItem('payment_plan', planType);
      localStorage.setItem('payment_date', new Date().toISOString());
      
      window.history.replaceState({}, document.title, window.location.pathname);
      setActivePage('payment-success');
    }
  }, []);

  // Handle sign-in behavior
  useEffect(() => {
    if (user && !hasSignedIn) {
      console.log('✅ User signed in:', user.email);
      setHasSignedIn(true);
      
      setContent('');
      setTextType('');
      setPopupFlowCompleted(false);
      
      localStorage.removeItem('writingContent');
      localStorage.removeItem('selectedWritingType');
      
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
      console.log('👋 User signed out');
      setHasSignedIn(false);
      setActivePage('home');
    }
  }, [user, hasSignedIn, emailVerified, paymentCompleted]);

  // Text selection logic
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

  // Navigation handler
  const handleNavigation = async (page: string) => {
    console.log('🧭 [AppContent] Navigation requested to:', page);
    
    if (page === 'dashboard' && user) {
      if (!emailVerified) {
        console.log('Navigating to dashboard for email verification');
        setActivePage('dashboard');
      } else if (paymentCompleted) {
        console.log('User has full access, redirecting to writing');
        setActivePage('writing');
      } else {
        console.log('User needs payment, redirecting to pricing');
        setActivePage('pricing');
      }
    } else if (page === 'writing' && user) {
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

  const handleGetStarted = async () => {
    console.log('🚀 [AppContent] Get Started clicked');
    if (user) {
      if (!emailVerified) {
        console.log('Get started: Email not verified, showing dashboard');
        setActivePage('dashboard');
      } else if (paymentCompleted) {
        console.log('Get started: Full access, showing writing');
        setActivePage('writing');
      } else {
        console.log('Get started: Payment needed, showing pricing');
        setActivePage('pricing');
      }
    } else {
      console.log('Get started: No user, showing auth modal');
      setAuthModalMode('signup');
      setShowAuthModal(true);
    }
  };

  // FIXED: Enhanced Sign In handler with comprehensive debugging
  const handleSignIn = () => {
    console.log('🔑 [AppContent] Sign In function called!');
    console.log('🔑 [AppContent] Setting auth modal mode to signin');
    console.log('🔑 [AppContent] Current showAuthModal state:', showAuthModal);
    
    setAuthModalMode('signin');
    setShowAuthModal(true);
    
    console.log('🔑 [AppContent] Auth modal should now be visible');
    console.log('🔑 [AppContent] New state - authModalMode: signin, showAuthModal: true');
  };

  // FIXED: Enhanced Sign Up handler
  const handleSignUp = () => {
    console.log('📝 [AppContent] Sign Up function called!');
    console.log('📝 [AppContent] Setting auth modal mode to signup');
    
    setAuthModalMode('signup');
    setShowAuthModal(true);
    
    console.log('📝 [AppContent] Auth modal should now be visible');
    console.log('📝 [AppContent] New state - authModalMode: signup, showAuthModal: true');
  };

  const handleForceSignOut = async () => {
    try {
      console.log('🔄 [AppContent] Starting force sign out...');
      
      setActivePage('home');
      setShowAuthModal(false);
      setShowPaymentSuccess(false);
      setPendingPaymentPlan(null);
      setContent('');
      setTextType('');
      setPopupFlowCompleted(false);
      
      console.log('✅ [AppContent] Local state reset completed');
      
      await authSignOut();
      console.log('✅ [AppContent] Auth sign out completed');
      
    } catch (error) {
      console.error('[AppContent] Error during sign out:', error);
      
      setActivePage('home');
      setShowAuthModal(false);
      setShowPaymentSuccess(false);
      setPendingPaymentPlan(null);
      
      localStorage.clear();
      
      console.log('⚠️ [AppContent] Forced local state reset due to sign out error');
    }
  };

  // Context value with all functions
  const contextValue: AppContextType = {
    activePage,
    setActivePage,
    showAuthModal,
    setShowAuthModal,
    authModalMode,
    setAuthModalMode,
    showPaymentSuccess,
    setShowPaymentSuccess,
    pendingPaymentPlan,
    setPendingPaymentPlan,
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
    showExamMode,
    setShowExamMode,
    showHelpCenter,
    setShowHelpCenter,
    showPlanningTool,
    setShowPlanningTool,
    popupFlowCompleted,
    setPopupFlowCompleted,
    hasSignedIn,
    setHasSignedIn,
    handleNavigation,
    handleGetStarted,
    handleSignIn,
    handleSignUp,
    handleForceSignOut,
  };

  // Debug context value on mount
  useEffect(() => {
    console.log('🔧 [AppContent] Context value created with functions:', {
      handleNavigation: typeof handleNavigation,
      handleSignIn: typeof handleSignIn,
      handleSignUp: typeof handleSignUp,
      handleForceSignOut: typeof handleForceSignOut,
    });
  }, []);

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

// Main AppContent component that uses the context
function AppContent() {
  const { user, loading, paymentCompleted, emailVerified } = useAuth();
  const {
    activePage,
    showAuthModal,
    authModalMode,
    setShowAuthModal,
    setAuthModalMode,
    showExamMode,
    setShowExamMode,
    showHelpCenter,
    setShowHelpCenter,
    showPlanningTool,
    setShowPlanningTool,
    content,
    setContent,
    textType,
    setTextType,
    assistanceLevel,
    setAssistanceLevel,
    timerStarted,
    setTimerStarted,
    selectedText,
    popupFlowCompleted,
    setPopupFlowCompleted,
    handleNavigation,
    handleGetStarted,
    handleSignIn,
    handleSignUp,
    handleForceSignOut,
  } = useApp();

  // Debug the functions received from context
  useEffect(() => {
    console.log('🔧 [AppContent Component] Functions from context:', {
      handleNavigation: typeof handleNavigation,
      handleSignIn: typeof handleSignIn,
      handleSignUp: typeof handleSignUp,
      handleForceSignOut: typeof handleForceSignOut,
    });
  }, [handleNavigation, handleSignIn, handleSignUp, handleForceSignOut]);

  const handleAuthSuccess = () => {
    console.log('🎉 [AppContent] Auth success!');
    setShowAuthModal(false);
  };

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
            <PaymentSuccessPage onNavigate={handleNavigation} />
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
      <EmailVerificationHandler />
      
      {renderPage()}

      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal
          mode={authModalMode}
          onClose={() => {
            console.log('❌ [AppContent] Closing auth modal');
            setShowAuthModal(false);
          }}
          onSuccess={handleAuthSuccess}
          onSwitchMode={(mode) => {
            console.log('🔄 [AppContent] Switching auth mode to:', mode);
            setAuthModalMode(mode);
          }}
        />
      )}

      {/* Other Modals */}
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
