import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AppProvider } from './contexts/AppContext';
import { useAuth } from './contexts/AuthContext';

import { NavBar } from './components/NavBar';
import { HeroSection } from './components/HeroSection';
import { FeaturesSection } from './components/FeaturesSection';
import { ToolsSection } from './components/ToolsSection';
import { WritingTypesSection } from './components/WritingTypesSection';
import { Footer } from './components/Footer';
import { PaymentSuccessPage } from './components/PaymentSuccessPage';
import { PricingPage } from './components/PricingPage';
import { Dashboard } from './components/Dashboard';
import { AuthModal } from './components/AuthModal';
import { FAQPage } from './components/FAQPage';
import { AboutPage } from './components/AboutPage';
import { SettingsPage } from './components/SettingsPage';
import { DemoPage } from './components/DemoPage';

// Writing components
import { SplitScreen } from './components/SplitScreen';
import { WritingArea } from './components/WritingArea';
import { CoachPanel } from './components/CoachPanel';
import { ParaphrasePanel } from './components/ParaphrasePanel';
import { LearningPage } from './components/LearningPage';
import { ExamSimulationMode } from './components/ExamSimulationMode';
import { SupportiveFeatures } from './components/SupportiveFeatures';
import { HelpCenter } from './components/HelpCenter';
import { EssayFeedbackPage } from './components/EssayFeedbackPage';
import { EnhancedHeader } from './components/EnhancedHeader';
import { SpecializedCoaching } from './components/text-type-templates/SpecializedCoaching';
import { BrainstormingTools } from './components/BrainstormingTools';
import { WritingAccessCheck } from './components/WritingAccessCheck';
import { WritingToolbar } from './components/WritingToolbar';
import { PlanningToolModal } from './components/PlanningToolModal';

function App() {
  const { user, isLoading, paymentCompleted, authSignOut } = useAuth();
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
  const [activePanel, setActivePanel] = useState<'coach' | 'paraphrase'>('coach');
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
        setActivePanel('paraphrase');
      }
    };

    document.addEventListener('selectionchange', handleSelectionChange);
    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
    };
  }, []);

  const handleAuthSuccess = async (user: any) => {
    setShowAuthModal(false);
    
    // Always redirect to pricing after signup to follow the flow: Pricing -> Stripe -> Writing area
    if (authModalMode === 'signup') {
      setActivePage('pricing');
    } else {
      // For signin, check payment status and redirect accordingly
      setActivePage(paymentCompleted ? 'writing' : 'pricing');
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
    // Special handling for dashboard - redirect to writing area if payment completed
    if (page === 'dashboard' && user) {
      setActivePage(paymentCompleted ? 'writing' : 'pricing');
    } else {
      setActivePage(page);
    }
    setShowAuthModal(false);
  };

  const handleGetStarted = async () => {
    if (user) {
      setActivePage(paymentCompleted ? 'writing' : 'pricing');
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
                  user && paymentCompleted ? <Navigate to="/writing" /> : <Navigate to="/pricing" />
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
                              className={`px-4 py-2 rounded-md text-sm font-medium ${activePanel === 'coach' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'}`}
                            >
                              Coach
                            </button>
                            <button
                              onClick={() => setActivePanel('paraphrase')}
                              className={`px-4 py-2 rounded-md text-sm font-medium ${activePanel === 'paraphrase' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'}`}
                            >
                              Paraphrase
                            </button>
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

export default App;