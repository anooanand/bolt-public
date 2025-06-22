import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AppProvider } from './contexts/AppContext';
import { useAuth } from './contexts/AuthContext';

// Lazy load components for better performance
const NavBar = lazy(() => import('./components/NavBar').then(module => ({ default: module.NavBar })));
const HeroSection = lazy(() => import('./components/HeroSection').then(module => ({ default: module.HeroSection })));
const FeaturesSection = lazy(() => import('./components/FeaturesSection').then(module => ({ default: module.FeaturesSection })));
const ToolsSection = lazy(() => import('./components/ToolsSection').then(module => ({ default: module.ToolsSection })));
const WritingTypesSection = lazy(() => import('./components/WritingTypesSection').then(module => ({ default: module.WritingTypesSection })));
const Footer = lazy(() => import('./components/Footer').then(module => ({ default: module.Footer })));
const PaymentSuccessPage = lazy(() => import('./components/PaymentSuccessPage').then(module => ({ default: module.PaymentSuccessPage })));
const PricingPage = lazy(() => import('./components/PricingPage').then(module => ({ default: module.PricingPage })));
const Dashboard = lazy(() => import('./components/Dashboard').then(module => ({ default: module.Dashboard })));
const AuthModal = lazy(() => import('./components/AuthModal').then(module => ({ default: module.AuthModal })));
const FAQPage = lazy(() => import('./components/FAQPage').then(module => ({ default: module.FAQPage })));
const AboutPage = lazy(() => import('./components/AboutPage').then(module => ({ default: module.AboutPage })));
const SettingsPage = lazy(() => import('./components/SettingsPage').then(module => ({ default: module.SettingsPage })));
const DemoPage = lazy(() => import('./components/DemoPage').then(module => ({ default: module.DemoPage })));

// Writing components - lazy loaded
const SplitScreen = lazy(() => import('./components/SplitScreen').then(module => ({ default: module.SplitScreen })));
const WritingArea = lazy(() => import('./components/WritingArea').then(module => ({ default: module.WritingArea })));
const CoachPanel = lazy(() => import('./components/CoachPanel').then(module => ({ default: module.CoachPanel })));
const ParaphrasePanel = lazy(() => import('./components/ParaphrasePanel').then(module => ({ default: module.ParaphrasePanel })));
const LearningPage = lazy(() => import('./components/LearningPage').then(module => ({ default: module.LearningPage })));
const ExamSimulationMode = lazy(() => import('./components/ExamSimulationMode').then(module => ({ default: module.ExamSimulationMode })));
const SupportiveFeatures = lazy(() => import('./components/SupportiveFeatures').then(module => ({ default: module.SupportiveFeatures })));
const HelpCenter = lazy(() => import('./components/HelpCenter').then(module => ({ default: module.HelpCenter })));
const EssayFeedbackPage = lazy(() => import('./components/EssayFeedbackPage').then(module => ({ default: module.EssayFeedbackPage })));
const EnhancedHeader = lazy(() => import('./components/EnhancedHeader').then(module => ({ default: module.EnhancedHeader })));
const SpecializedCoaching = lazy(() => import('./components/text-type-templates/SpecializedCoaching').then(module => ({ default: module.SpecializedCoaching })));
const BrainstormingTools = lazy(() => import('./components/BrainstormingTools').then(module => ({ default: module.BrainstormingTools })));
const WritingAccessCheck = lazy(() => import('./components/WritingAccessCheck').then(module => ({ default: module.WritingAccessCheck })));
const WritingToolbar = lazy(() => import('./components/WritingToolbar').then(module => ({ default: module.WritingToolbar })));
const PlanningToolModal = lazy(() => import('./components/PlanningToolModal').then(module => ({ default: module.PlanningToolModal })));
const EmailVerificationReminder = lazy(() => import('./components/EmailVerificationReminder').then(module => ({ default: module.EmailVerificationReminder })));
const EmailVerificationHandler = lazy(() => import('./components/EmailVerificationHandler').then(module => ({ default: module.EmailVerificationHandler })));

// Loading component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
      <p className="text-gray-600 dark:text-gray-400">Loading...</p>
    </div>
  </div>
);

function App() {
  const { user, isLoading, paymentCompleted, emailVerified, authSignOut } = useAuth();
  const [activePage, setActivePage] = useState('home');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup'>('signin');
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  const [pendingPaymentPlan, setPendingPaymentPlan] = useState<string | null>(null);

  // Writing state - moved to context or reduced
  const [content, setContent] = useState('');
  const [textType, setTextType] = useState('');
  const [assistanceLevel, setAssistanceLevel] = useState('detailed');
  const [timerStarted, setTimerStarted] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [activePanel, setActivePanel] = useState<'coach' | 'paraphrase'>('coach');
  const [showExamMode, setShowExamMode] = useState(false);
  const [showHelpCenter, setShowHelpCenter] = useState(false);
  const [showPlanningTool, setShowPlanningTool] = useState(false);

  // Optimized payment success check
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const paymentSuccess = urlParams.get('paymentSuccess') === 'true' || 
                          urlParams.get('payment_success') === 'true' ||
                          urlParams.get('success') === 'true';
    const sessionId = urlParams.get('session_id');
    const planType = urlParams.get('planType') || urlParams.get('plan') || 'base_plan';
    const userEmail = urlParams.get('email');
    
    if (paymentSuccess || sessionId) {
      console.log('🚀 Payment success detected for plan:', planType);
      
      // Store payment info for 24-hour temporary access
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

  // Optimized text selection - debounced
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const handleSelectionChange = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const selection = window.getSelection();
        if (selection && selection.toString().trim().length > 0) {
          setSelectedText(selection.toString());
          setActivePanel('paraphrase');
        }
      }, 100); // Debounce for 100ms
    };

    document.addEventListener('selectionchange', handleSelectionChange);
    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
      clearTimeout(timeoutId);
    };
  }, []);

  const handleAuthSuccess = async (user: any) => {
    setShowAuthModal(false);
    
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
    handleNavigation("writing");
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

  const handlePanelChange = (panel: 'coach' | 'paraphrase') => {
    setActivePanel(panel);
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
    return <LoadingSpinner />;
  }

  return (
    <ThemeProvider>
      <AppProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Suspense fallback={<LoadingSpinner />}>
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
            </Suspense>
            
            <div className="mt-16">
              <Routes>
                {/* ORIGINAL BEAUTIFUL HOME PAGE - RESTORED */}
                <Route path="/" element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <HeroSection onGetStarted={handleGetStarted} />
                    <FeaturesSection />
                    <ToolsSection onOpenTool={handleNavigation} />
                    <WritingTypesSection />
                  </Suspense>
                } />
                <Route path="/demo" element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <DemoPage />
                  </Suspense>
                } />
                <Route path="/features" element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <div>
                      <FeaturesSection />
                      <ToolsSection onOpenTool={() => {}} />
                      <WritingTypesSection />
                    </div>
                  </Suspense>
                } />
                <Route path="/pricing" element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <PricingPage />
                  </Suspense>
                } />
                <Route path="/faq" element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <FAQPage />
                  </Suspense>
                } />
                <Route path="/about" element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <AboutPage />
                  </Suspense>
                } />
                <Route path="/dashboard" element={
                  user ? (
                    <Suspense fallback={<LoadingSpinner />}>
                      <Dashboard 
                        user={user} 
                        onNavigate={handleNavigation} 
                        emailVerified={emailVerified}
                        paymentCompleted={paymentCompleted}
                      />
                    </Suspense>
                  ) : (
                    <Navigate to="/" />
                  )
                } />
                <Route path="/settings" element={
                  user ? (
                    <Suspense fallback={<LoadingSpinner />}>
                      <SettingsPage onBack={() => setActivePage('dashboard')} />
                    </Suspense>
                  ) : (
                    <Navigate to="/" />
                  )
                } />
                
                {/* Writing routes with lazy loading */}
                <Route path="/app" element={
                  <Suspense fallback={<LoadingSpinner />}>
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
                                {activePanel === 'coach' ? (
                                  <CoachPanel 
                                    content={content}
                                    textType={textType}
                                    assistanceLevel={assistanceLevel}
                                  />
                                ) : (
                                  <ParaphrasePanel 
                                    selectedText={selectedText}
                                    onNavigate={handleNavigation}
                                  />
                                )}
                              </SplitScreen>
                            </div>
                            
                            {/* Panel Switcher */}
                            <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-2 flex justify-center items-center space-x-4">
                              <button
                                onClick={() => setActivePanel('coach')}
                                className={`px-4 py-2 rounded-md text-sm font-medium ${
                                  activePanel === 'coach' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                                }`}
                              >
                                Coach
                              </button>
                              <button
                                onClick={() => setActivePanel('paraphrase')}
                                className={`px-4 py-2 rounded-md text-sm font-medium ${
                                  activePanel === 'paraphrase' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                                }`}
                              >
                                Paraphrase
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </WritingAccessCheck>
                  </Suspense>
                } />
                
                <Route path="/writing" element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <WritingAccessCheck onNavigate={handleNavigation}>
                      {/* Same content as /app route */}
                      <div className="flex flex-col h-screen">
                        {/* Writing interface content */}
                      </div>
                    </WritingAccessCheck>
                  </Suspense>
                } />
                
                {/* Other routes */}
              </Routes>
            </div>
            
            <Suspense fallback={null}>
              <Footer />
            </Suspense>

            {/* Modals */}
            {showAuthModal && (
              <Suspense fallback={null}>
                <AuthModal
                  mode={authModalMode}
                  onClose={() => setShowAuthModal(false)}
                  onSuccess={handleAuthSuccess}
                />
              </Suspense>
            )}

            {showHelpCenter && (
              <Suspense fallback={null}>
                <HelpCenter onClose={() => setShowHelpCenter(false)} />
              </Suspense>
            )}

            {showPlanningTool && (
              <Suspense fallback={null}>
                <PlanningToolModal
                  onClose={() => setShowPlanningTool(false)}
                  onSave={handleSavePlan}
                />
              </Suspense>
            )}
          </div>
        </Router>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;

