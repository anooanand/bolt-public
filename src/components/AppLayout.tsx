import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '../contexts/ThemeContext';
import { AppProvider } from '../contexts/AppContext';
import { useAuth } from '../contexts/AuthContext';
import { CheckCircle } from 'lucide-react';

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
import { CoachPanel } from './CoachPanel';
import { ParaphrasePanel } from './ParaphrasePanel';
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
import { EmailVerificationReminder } from './EmailVerificationReminder';

function AppLayout() {
  const { user, isLoading, paymentCompleted, emailVerified, authSignOut } = useAuth();
  const [activePage, setActivePage] = useState('home');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup'>('signin');
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  const [pendingPaymentPlan, setPendingPaymentPlan] = useState<string | null>(null);

  // Writing state
  const [content, setContent] = useState('');
  const [textType, setTextType] = useState('');
  const [assistanceLevel, setAssistanceLevel] = useState('detailed');
  const [timerStarted, setTimerStarted] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [showExamMode, setShowExamMode] = useState(false);
  const [showHelpCenter, setShowHelpCenter] = useState(false);
  const [showPlanningTool, setShowPlanningTool] = useState(false);

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

  // Text selection logic for writing area
  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection();
      if (selection && selection.toString().trim().length > 0) {
        setSelectedText(selection.toString());
      }
    };

    document.addEventListener('selectionchange', handleSelectionChange);
    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
    };
  }, []);

  const handleAuthSuccess = async (user: any) => {
    setShowAuthModal(false);
    
    // Clear writing content and localStorage when signing in
    if (authModalMode === 'signin') {
      setContent('');
      setTextType('');
      localStorage.removeItem('writingContent');
      localStorage.removeItem('selectedWritingType');
      
      // Clear any saved prompts
      const writingTypes = ['narrative', 'persuasive', 'expository', 'reflective', 'descriptive', 'recount', 'discursive', 'news report', 'letter', 'diary entry'];
      writingTypes.forEach(type => {
        localStorage.removeItem(`${type}_prompt`);
      });
    }
    
    // After successful signup, redirect to dashboard to show email verification message
    if (authModalMode === 'signup') {
      setActivePage('dashboard');
    } else {
      // For signin, check email verification and payment status
      if (!emailVerified) {
        setActivePage('dashboard'); // Show email verification reminder
      } else if (paymentCompleted) {
        setActivePage('writing'); // Full access
      } else {
        setActivePage('pricing'); // Need to complete payment
      }
    }
  };

  const handleForceSignOut = async () => {
    try {
      await authSignOut();
      setActivePage('home');
      localStorage.clear();
    } catch (error) {
      console.error('Error during sign out:', error);
      // Force reset even if sign out fails
      setActivePage('home');
      localStorage.clear();
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
        setActivePage('dashboard'); // Show email verification reminder
      } else if (paymentCompleted) {
        setActivePage('writing'); // Full access
      } else {
        setActivePage('pricing'); // Need to complete payment
      }
    } else {
      setAuthModalMode('signup');
      setShowAuthModal(true);
    }
  };

  const handleStartWriting = () => {
    setActivePage('writing');
  };

  // Writing app state management
  const appState = {
    content,
    textType,
    assistanceLevel,
    timerStarted
  };

  const updateAppState = (updates: Partial<typeof appState>) => {
    if ('content' in updates) setContent(updates.content || '');
    if ('textType' in updates) setTextType(updates.textType || '');
    if ('assistanceLevel' in updates) setAssistanceLevel(updates.assistanceLevel || 'detailed');
    if ('timerStarted' in updates) setTimerStarted(updates.timerStarted || false);
  };

  const handleSubmit = () => {
    setActivePage('feedback');
  };

  const handleStartExam = () => {
    setShowExamMode(true);
  };

  const handleSavePlan = (planData: any) => {
    localStorage.setItem('writing_plan', JSON.stringify(planData));
    setShowPlanningTool(false);
    alert('Plan saved successfully!');
  };

  const handleRestoreContent = (restoredContent: string) => {
    setContent(restoredContent);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400 mb-4">Loading Writing Assistant...</p>
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <AppProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
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
            
            <div className="mt-16">
              <Routes>
                <Route path="/" element={
                  <>
                    <HeroSection onGetStarted={handleGetStarted} />
                    <FeaturesSection />
                    <ToolsSection onOpenTool={handleNavigation} />
                    <WritingTypesSection />
                  </>
                } />
                <Route path="/demo" element={<DemoPage />} />
                <Route path="/features" element={
                  <div>
                    <FeaturesSection />
                    <ToolsSection onOpenTool={() => {}} />
                    <WritingTypesSection />
                  </div>
                } />
                <Route path="/pricing" element={<PricingPage />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/dashboard" element={
                  user ? (
                    <Dashboard 
                      user={user} 
                      onNavigate={handleNavigation} 
                      emailVerified={emailVerified}
                      paymentCompleted={paymentCompleted}
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
                        <>
                          <div className="flex-1 container mx-auto px-4">
                            <SplitScreen>
                              <WritingArea 
                                content={content}
                                onChange={setContent}
                                textType={textType}
                                onTimerStart={setTimerStarted}
                                onSubmit={handleSubmit}
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
                        </>
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
                <Route path="/auth/callback" element={
                  <EmailVerificationSuccess onContinue={() => handleNavigation('pricing')} />
                } />
              </Routes>
            </div>

            <Footer />

            <AuthModal
              isOpen={showAuthModal}
              onClose={() => setShowAuthModal(false)}
              onSuccess={handleAuthSuccess}
              initialMode={authModalMode}
              onNavigate={handleNavigation}
            />

            <PlanningToolModal
              isOpen={showPlanningTool}
              onClose={() => setShowPlanningTool(false)}
              onSavePlan={handleSavePlan}
              content={content}
              textType={textType}
              onRestoreContent={handleRestoreContent}
            />
          </div>
        </Router>
      </AppProvider>
    </ThemeProvider>
  );
}

// Email verification success component
function EmailVerificationSuccess({ onContinue }: { onContinue: () => void }) {
  useEffect(() => {
    // Short delay before redirecting
    const timer = setTimeout(() => {
      onContinue();
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [onContinue]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Email Verified!
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Your email has been successfully verified. You're now ready to complete your subscription setup.
        </p>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Redirecting to pricing page...
        </p>
      </div>
    </div>
  );
}

export default AppLayout;

