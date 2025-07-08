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
import { CheckCircle } from 'lucide-react';
import { AdminButton } from './AdminButton';

function AppContent() {
  const { user, isLoading, paymentCompleted, emailVerified, authSignOut } = useAuth();
  const [activePage, setActivePage] = useState('home');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup'>('signin');
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  const [pendingPaymentPlan, setPendingPaymentPlan] = useState<string | null>(null);
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
  
  // New state for popup flow completion
  const [popupFlowCompleted, setPopupFlowCompleted] = useState(false); 
  const [hasSignedIn, setHasSignedIn] = useState(false);

  // Handle sign-in behavior - clear content and show modal when user signs in
  useEffect(() => {
    if (user && !hasSignedIn) {
      // User just signed in
      setHasSignedIn(true);
      
      // Clear content and reset state
      setContent('');
      setTextType('');
      setPopupFlowCompleted(false);
      
      // Clear localStorage to ensure fresh start
      localStorage.removeItem('writingContent');
      localStorage.removeItem('selectedWritingType');
      
      // If we're on the writing page, this will trigger the writing type modal
      if (activePage === 'writing') {
        // The WritingArea component will handle showing the modal
      }
    } else if (!user && hasSignedIn) {
      // User signed out
      setHasSignedIn(false);
    }
  }, [user, hasSignedIn, activePage]);

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
      
      setShowPaymentSuccess(true);
      setPendingPaymentPlan(planType);
      setActivePage('payment-success');
    }
  }, []);

  // Set active page based on current path
  useEffect(() => {
    const path = location.pathname.substring(1) || 'home';
    if (path !== 'auth/callback') { // Don't change active page during auth callback
      setActivePage(path);
    }
  }, [location.pathname]);

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

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    if (pendingPaymentPlan) {
      setActivePage('payment-success');
      setShowPaymentSuccess(true);
    } else {
      setActivePage('dashboard');
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

  const handleNavigation = async (page: string) => {
    // Special handling for dashboard - redirect based on verification and payment status
    if (page === 'dashboard' && user) {
      if (!emailVerified) {
        setActivePage('dashboard'); // Show email verification reminder
      } else if (paymentCompleted) {
        setActivePage('writing'); // Full access
      } else {
        setActivePage('pricing'); // Need to complete payment
      }
    } else {
      setActivePage(page);
    }
    setShowAuthModal(false);
  };

  const handleGetStarted = async () => {
    if (user) {
      if (!emailVerified) {
        navigate('/dashboard'); // Show email verification reminder
      } else if (paymentCompleted) {
        navigate('/writing'); // Full access
      } else {
        navigate('/pricing'); // Need to complete payment
      }
    } else {
      setAuthModalMode('signup');
      setShowAuthModal(true);
    }
  };

  const handleSubmit = () => {
    console.log('Writing submitted:', { content, textType });
  };

  // Handle text type change from WritingArea popup
  const handleTextTypeChange = (newTextType: string) => {
    setTextType(newTextType);
    console.log('Text type changed to:', newTextType);
  };

  // Handle popup flow completion
  const handlePopupCompleted = () => {
    setPopupFlowCompleted(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
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
              <Dashboard 
                onNavigate={handleNavigation}
                onSignOut={handleForceSignOut}
              />
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
                  hideTextTypeSelector={popupFlowCompleted}
                />
                
                <WritingToolbar 
                  content={content}
                  textType={textType}
                  onShowHelpCenter={() => setShowHelpCenter(true)}
                  onShowPlanningTool={() => setShowPlanningTool(true)}
                  onTimerStart={() => setTimerStarted(true)}
                  onStartNewEssay={() => {
                    setContent('');
                    setTextType('');
                    setPopupFlowCompleted(false);
                    // Clear localStorage to ensure fresh start
                    localStorage.removeItem('writingContent');
                    localStorage.removeItem('selectedWritingType');
                  }}
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
                        onPopupCompleted={handlePopupCompleted}
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
          <Route path="/exam" element={<ExamSimulationMode onExit={() => setActivePage('writing')} />} />
          <Route path="/supportive-features" element={<SupportiveFeatures />} />
          <Route path="/help-center" element={<HelpCenter />} />
          <Route path="/essay-feedback" element={<EssayFeedbackPage />} />
          <Route path="/specialized-coaching" element={<SpecializedCoaching />} />
          <Route path="/brainstorming-tools" element={<BrainstormingTools />} />
          <Route path="/email-verification" element={<EmailVerificationHandler />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        <Footer />

        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          mode={authModalMode}
          onAuthSuccess={handleAuthSuccess}
        />

        {showPaymentSuccess && (
          <PaymentSuccessPage
            onClose={() => setShowPaymentSuccess(false)}
            planType={pendingPaymentPlan || 'unknown'}
          />
        )}
      </div>
      <AdminButton />
    </div>
  );
}

export default AppContent;
