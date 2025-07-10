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
import { ModernWritingInterface } from './ModernWritingInterface';
import { LearningPage } from './LearningPage';
import { ExamSimulationMode } from './ExamSimulationMode';
import { SupportiveFeatures } from './SupportiveFeatures';
import { HelpCenter } from './HelpCenter';
import { EssayFeedbackPage } from './EssayFeedbackPage';
import { SpecializedCoaching } from './text-type-templates/SpecializedCoaching';
import { BrainstormingTools } from './BrainstormingTools';
import { WritingAccessCheck } from './WritingAccessCheck';
import { PlanningToolModal } from './PlanningToolModal';
import { EmailVerificationHandler } from './EmailVerificationHandler';
import { CheckCircle } from 'lucide-react';
import { AdminButton } from './AdminButton';

// Import the modern interface styles
import '../styles/modern-writing-interface.css';

function AppContentWithModernInterface() {
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
    }
  }, []);

  // Update page based on route
  useEffect(() => {
    const path = location.pathname;
    if (path === '/') {
      setActivePage('home');
    } else if (path === '/writing') {
      setActivePage('writing');
    } else if (path === '/dashboard') {
      setActivePage('dashboard');
    } else if (path === '/pricing') {
      setActivePage('pricing');
    } else if (path === '/faq') {
      setActivePage('faq');
    } else if (path === '/about') {
      setActivePage('about');
    } else if (path === '/demo') {
      setActivePage('demo');
    } else if (path === '/learning') {
      setActivePage('learning');
    } else if (path === '/exam') {
      setActivePage('exam');
    } else if (path === '/supportive-features') {
      setActivePage('supportive-features');
    } else if (path === '/help-center') {
      setActivePage('help-center');
    } else if (path === '/essay-feedback') {
      setActivePage('essay-feedback');
    } else if (path === '/specialized-coaching') {
      setActivePage('specialized-coaching');
    } else if (path === '/brainstorming-tools') {
      setActivePage('brainstorming-tools');
    } else if (path === '/settings') {
      setActivePage('settings');
    }
  }, [location]);

  const handleNavigation = (page: string) => {
    setActivePage(page);
  };

  // Updated handleAuthSuccess to navigate to dashboard and reload page
  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    setActivePage('dashboard');
    window.location.href = '/dashboard';
  };

  const handleForceSignOut = async () => {
    try {
      await authSignOut();
      setActivePage('home');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleSubmit = () => {
    console.log('Submitting essay:', content);
  };

  const handleTextTypeChange = (newTextType: string) => {
    setTextType(newTextType);
  };

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
      <NavBar 
        activePage={activePage} 
        onNavigate={handleNavigation}
        onSignInClick={() => {
          setAuthModalMode('signin');
          setShowAuthModal(true);
        }}
        onSignUpClick={() => {
          setAuthModalMode('signup');
          setShowAuthModal(true);
        }}
      />
      
      <AdminButton />
      
      {showPaymentSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md mx-4 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
            <p className="text-gray-600 mb-6">
              Welcome to your {pendingPaymentPlan} plan! You now have access to all premium features.
            </p>
            <button
              onClick={() => {
                setShowPaymentSuccess(false);
                setPendingPaymentPlan(null);
                handleNavigation('writing');
              }}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Start Writing
            </button>
          </div>
        </div>
      )}

      <Routes>
        <Route path="/" element={
          <>
            <HeroSection onNavigate={handleNavigation} />
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
            <div className="modern-writing-interface relative">
              <ModernWritingInterface
                content={content}
                onChange={setContent}
                textType={textType}
                onTimerStart={setTimerStarted}
                onSubmit={handleSubmit}
                onTextTypeChange={handleTextTypeChange}
                onPopupCompleted={handlePopupCompleted}
              />
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
      
      {showHelpCenter && (
        <HelpCenter onClose={() => setShowHelpCenter(false)} />
      )}
      
      {showPlanningTool && (
        <PlanningToolModal 
          onClose={() => setShowPlanningTool(false)}
          textType={textType}
        />
      )}
    </div>
  );
}

export default AppContentWithModernInterface;
