import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

import { NavBar } from './NavBar';
import { HeroSection } from './HeroSection';
import { FeaturesSection } from './FeaturesSection';
import { ToolsSection } from './ToolsSection';
import { WritingTypesSection } from './WritingTypesSection';
import { Footer } from './Footer';
import { PaymentSuccessPage } from './PaymentSuccessPage';
import { PricingPage } from './PricingPage';
import { Dashboard } from './Dashboard';
import { KidDashboard } from './KidDashboard';
import { AuthModal } from './AuthModal';
import { FAQPage } from './FAQPage';
import { AboutPage } from './AboutPage';
import { SettingsPage } from './SettingsPage';
import { DemoPage } from './DemoPage';

// Writing components
import { SplitScreen } from './SplitScreen';
import { WritingArea } from './WritingArea';
import { TabbedCoachPanel } from './TabbedCoachPanel';
import { LearningPage } from './LearningPage';
import { ExamSimulationMode } from './ExamSimulationMode';
import { SupportiveFeatures } from './SupportiveFeatures';
import { HelpCenter } from './HelpCenter';
import { EssayFeedbackPage } from './EssayFeedbackPage';
import { EnhancedHeader } from './EnhancedHeader';
import { SpecializedCoaching } from './text-type-templates/SpecializedCoaching';
import { BrainstormingTools } from './BrainstormingTools';
import { WritingAccessCheck } from './WritingAccessCheck';
import { WritingToolbar } from './WritingToolbar';
import { PlanningToolModal } from './PlanningToolModal';
import { EmailVerificationHandler } from './EmailVerificationHandler';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { AdminButton } from './AdminButton';

// Kid-friendly error messages
const KID_FRIENDLY_MESSAGES = {
  loading: "Getting everything ready for you! 🌟",
  authError: "Oops! Something went wrong. Let's try that again! 😊",
  networkError: "Looks like the internet is being slow. Let's wait a moment! 🌐",
  generalError: "Don't worry! We're fixing this right away! 🔧"
};

function AppContent() {
  const { user, isLoading, paymentCompleted, emailVerified, authSignOut } = useAuth();
  const [activePage, setActivePage] = useState('home');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup'>('signin');
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  const [pendingPaymentPlan, setPendingPaymentPlan] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const location = useLocation();

  // Writing state
  const [content, setContent] = useState('');
  const [textType, setTextType] = useState('');
  const [assistanceLevel, setAssistanceLevel] = useState('detailed');
  const [timerStarted, setTimerStarted] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [showExamMode, setShowExamMode] = useState(false);
  const [showHelpCenter, setShowHelpCenter] = useState(false);
  const [showPlanningTool, setShowPlanningTool] = useState(false);

  // Simplified payment success detection
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const paymentSuccess = urlParams.get('paymentSuccess') === 'true' || urlParams.get('payment_success') === 'true';
    const planType = urlParams.get('planType') || urlParams.get('plan');
    
    if (paymentSuccess && planType) {
      setPendingPaymentPlan(planType);
      setShowPaymentSuccess(true);
      setActivePage('payment-success');
      
      // Clean URL without affecting navigation
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  // Simplified page routing
  useEffect(() => {
    const path = location.pathname.substring(1) || 'home';
    if (path !== 'auth/callback') {
      setActivePage(path);
    }
  }, [location.pathname]);

  // Text selection for writing area
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

  // Kid-friendly error handler
  const handleError = (error: any, context: string = 'general') => {
    console.error(`Error in ${context}:`, error);
    
    let friendlyMessage = KID_FRIENDLY_MESSAGES.generalError;
    
    if (context === 'auth') {
      friendlyMessage = KID_FRIENDLY_MESSAGES.authError;
    } else if (error?.message?.includes('network') || error?.message?.includes('fetch')) {
      friendlyMessage = KID_FRIENDLY_MESSAGES.networkError;
    }
    
    setErrorMessage(friendlyMessage);
    
    // Auto-clear error after 5 seconds
    setTimeout(() => setErrorMessage(null), 5000);
  };

  // Simplified authentication success handler
  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    setErrorMessage(null);
    
    if (pendingPaymentPlan) {
      setActivePage('payment-success');
      setShowPaymentSuccess(true);
    } else {
      // Direct navigation to writing if user has access, otherwise dashboard
      if (user && paymentCompleted) {
        setActivePage('writing');
      } else {
        setActivePage('dashboard');
      }
    }
  };

  // Simplified sign out handler
  const handleForceSignOut = async () => {
    try {
      // Reset state immediately for better UX
      setActivePage('home');
      setShowAuthModal(false);
      setShowPaymentSuccess(false);
      setPendingPaymentPlan(null);
      setContent('');
      setTextType('');
      setErrorMessage(null);
      
      await authSignOut();
    } catch (error) {
      handleError(error, 'auth');
      
      // Force reset even if sign out fails
      setActivePage('home');
      setShowAuthModal(false);
      localStorage.clear();
    }
  };

  // Streamlined navigation handler
  const handleNavigation = (page: string) => {
    setErrorMessage(null); // Clear any existing errors
    
    // Simplified logic - no complex verification checks
    if (page === 'dashboard' && user) {
      setActivePage('dashboard');
    } else if (page === 'writing' && user && paymentCompleted) {
      setActivePage('writing');
    } else if (page === 'writing' && user && !paymentCompleted) {
      setActivePage('pricing'); // Need payment
    } else if (page === 'writing' && !user) {
      setAuthModalMode('signup');
      setShowAuthModal(true);
      return; // Don't change page yet
    } else {
      setActivePage(page);
    }
    
    setShowAuthModal(false);
  };

  // Simplified get started handler
  const handleGetStarted = () => {
    if (user) {
      if (paymentCompleted) {
        setActivePage('writing');
      } else {
        setActivePage('pricing');
      }
    } else {
      setAuthModalMode('signup');
      setShowAuthModal(true);
    }
  };

  const handleSubmit = () => {
    console.log('Writing submitted:', { content, textType });
  };

  const handleTextTypeChange = (newTextType: string) => {
    setTextType(newTextType);
  };

  // Loading screen with kid-friendly message
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300 text-lg font-medium">
            {KID_FRIENDLY_MESSAGES.loading}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="kid-theme min-h-screen bg-gradient-to-br...">
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Kid-friendly error notification */}
      {errorMessage && (
        <div className="fixed top-4 right-4 z-50 bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded-lg shadow-lg max-w-sm">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-yellow-500 mr-2" />
            <p className="text-yellow-800 font-medium">{errorMessage}</p>
          </div>
        </div>
      )}

      <div className="min-h-screen flex flex-col">
        <Routes>
          <Route path="/" element={
            <>
              <NavBar 
                activePage={activePage}
                onNavigate={handleNavigation}
                user={user}
                onSignInClick={() => {
                  setAuthModalMode('signin');
                  setShowAuthModal(true);
                }}
                onSignUpClick={() => {
                  setAuthModalMode('signup');
                  setShowAuthModal(true);
                }}
                onForceSignOut={handleForceSignOut}
              />
              <HeroSection onGetStarted={handleGetStarted} />
              <FeaturesSection />
              <ToolsSection />
              <WritingTypesSection />
            </>
          } />
          <Route path="/pricing" element={<PricingPage onNavigate={handleNavigation} />} />
          <Route path="/faq" element={<FAQPage onNavigate={handleNavigation} />} />
          <Route path="/about" element={<AboutPage onNavigate={handleNavigation} />} />
          <Route path="/demo" element={<DemoPage onNavigate={handleNavigation} />} />
          <Route path="/dashboard" element={
            user ? (
              user.email && user.email.startsWith("kid") ? (
                <KidDashboard user={user} />
              ) : (
                <Dashboard 
                  onNavigate={handleNavigation}
                  onSignOut={handleForceSignOut}
                />
              )
            ) : (
              <Navigate to="/" />
            )
          } />
          <Route path="/settings" element={
            user ? <SettingsPage onBack={() => setActivePage('dashboard')} /> : <Navigate to="/" />
          } />
          <Route path="/writing" element={
            <WritingAccessCheck onNavigate={handleNavigation}>
              <div className="flex flex-col h-screen">
                <EnhancedHeader 
                  textType={textType}
                  assistanceLevel={assistanceLevel}
                  onTextTypeChange={setTextType}
                  onAssistanceLevelChange={setAssistanceLevel}
                  onTimerStart={() => setTimerStarted(true)}
                  hideTextTypeSelector={false}
                />
                
                <WritingToolbar 
                  content={content}
                  textType={textType}
                  onShowHelpCenter={() => setShowHelpCenter(true)}
                  onShowPlanningTool={() => setShowPlanningTool(true)}
                  onTimerStart={() => setTimerStarted(true)}
                />
                
                {showExamMode ? (
                  <ExamSimulationMode 
                    onExit={() => setShowExamMode(false)}
                  />
                ) : (
                  <div className="flex-1 container mx-auto px-4">
                    <SplitScreen>
                      <WritingArea 
                        content={content}
                        onChange={setContent}
                        textType={textType}
                        onTimerStart={setTimerStarted}
                        onSubmit={handleSubmit}
                        onTextTypeChange={handleTextTypeChange}
                        onPopupCompleted={() => {}} // Removed popup flow complexity
                      />
                      <TabbedCoachPanel 
                        content={content}
                        textType={textType}
                        assistanceLevel={assistanceLevel}
                        selectedText={selectedText}
                        onNavigate={handleNavigation}
                      />
                    </SplitScreen>
                  </div>
                )}
              </div>
            </WritingAccessCheck>
          } />
          <Route path="/learning" element={<LearningPage />} />
          <Route path="/feedback" element={<EssayFeedbackPage />} />
          <Route path="/payment-success" element={
            showPaymentSuccess ? (
              <PaymentSuccessPage
                plan={pendingPaymentPlan || 'unknown'}
                onSuccess={handleAuthSuccess}
                onSignInRequired={(email, plan) => {
                  localStorage.setItem('userEmail', email);
                  setPendingPaymentPlan(plan);
                  setAuthModalMode('signin');
                  setShowAuthModal(true);
                }}
              />
            ) : <Navigate to="/" />
          } />
          <Route path="/auth/callback" element={<EmailVerificationHandler />} />
        </Routes>
      </div>

      <Footer />

      {/* Modals */}
      {showAuthModal && (
        <AuthModal
          mode={authModalMode}
          onClose={() => setShowAuthModal(false)}
          onSuccess={handleAuthSuccess}
          onSwitchMode={(mode) => setAuthModalMode(mode)}
        />
      )}

      {showHelpCenter && (
        <HelpCenter onClose={() => setShowHelpCenter(false)} />
      )}

      {showPlanningTool && (
        <PlanningToolModal 
          onClose={() => setShowPlanningTool(false)}
          textType={textType}
        />
      )}

      <AdminButton />
    </div>
  );
}

export default AppContent;

