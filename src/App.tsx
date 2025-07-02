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
import { EnhancedWritingArea } from './components/EnhancedWritingArea';
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
import { EmailVerificationReminder } from './components/EmailVerificationReminder';
import { EmailVerificationHandler } from './components/EmailVerificationHandler';
import { CheckCircle } from 'lucide-react';

function App() {
  const { user, loading, paymentCompleted, emailVerified, authSignOut, forceRefreshVerification } = useAuth();
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

  // IMPROVED: Enhanced email verification token detection with better error handling
  useEffect(() => {
    const urlHash = window.location.hash;
    const urlSearch = window.location.search;
    
    // Enhanced email verification token detection with better logging
    let hasVerificationTokens = false;
    let tokenSource = '';
    
    if (urlHash) {
      const hashParams = new URLSearchParams(urlHash.substring(1));
      const accessToken = hashParams.get('access_token');
      const refreshToken = hashParams.get('refresh_token');
      const tokenType = hashParams.get('token_type');
      
      if (accessToken && refreshToken && tokenType === 'bearer') {
        hasVerificationTokens = true;
        tokenSource = 'hash';
        console.log('🔑 Email verification tokens detected in URL hash');
      }
    }
    
    if (!hasVerificationTokens && urlSearch) {
      const searchParams = new URLSearchParams(urlSearch);
      const accessToken = searchParams.get('access_token');
      const refreshToken = searchParams.get('refresh_token');
      
      if (accessToken && refreshToken) {
        hasVerificationTokens = true;
        tokenSource = 'search';
        console.log('🔑 Email verification tokens detected in URL search');
      }
    }
    
    // Check for error parameters that indicate failed verification
    const errorCode = new URLSearchParams(urlSearch).get('error_code') || 
                     (urlHash ? new URLSearchParams(urlHash.substring(1)).get('error_code') : null);
    const errorDescription = new URLSearchParams(urlSearch).get('error_description') || 
                           (urlHash ? new URLSearchParams(urlHash.substring(1)).get('error_description') : null);
    
    if (hasVerificationTokens || errorCode) {
      console.log(`🚀 Redirecting to email verification handler (source: ${tokenSource || 'error'})`);
      
      // Preserve all URL parameters and hash for the verification handler
      const fullParams = window.location.hash + window.location.search;
      
      // Use replace to avoid back button issues
      window.location.replace('/auth/callback' + fullParams);
      return;
    }
    
    // Continue with payment success detection if no verification tokens
    const urlParams = new URLSearchParams(window.location.search);
    const paymentSuccess = urlParams.get('paymentSuccess') === 'true' || 
                          urlParams.get('payment_success') === 'true' ||
                          urlParams.get('success') === 'true';
    const sessionId = urlParams.get('session_id');
    const planType = urlParams.get('planType') || urlParams.get('plan') || 'premium_plan';
    const userEmail = urlParams.get('email');
    
    if (paymentSuccess || sessionId) {
      console.log('🎉 Payment success detected for plan:', planType);
      
      // Store payment info for 24-hour temporary access
      if (userEmail) {
        localStorage.setItem('userEmail', userEmail);
      }
      localStorage.setItem('payment_plan', planType);
      localStorage.setItem('payment_date', new Date().toISOString());
      
      // Clear URL parameters immediately to prevent reprocessing
      const newUrl = window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
      
      // Handle payment success based on user state
      if (user) {
        // User is logged in - force refresh verification and redirect to dashboard
        console.log('🔄 User logged in, refreshing verification...');
        
        // Force refresh verification after a short delay
        setTimeout(() => {
          if (forceRefreshVerification) {
            forceRefreshVerification();
          }
        }, 1000);
        
        // Show success page briefly then redirect to dashboard
        setShowPaymentSuccess(true);
        setPendingPaymentPlan(planType);
        setActivePage('payment-success');
        
        // Auto-redirect to dashboard after 3 seconds
        setTimeout(() => {
          setShowPaymentSuccess(false);
          setActivePage('dashboard');
        }, 3000);
        
      } else {
        // User not logged in - show payment success page
        setShowPaymentSuccess(true);
        setPendingPaymentPlan(planType);
        setActivePage('payment-success');
      }
    }
  }, [user, forceRefreshVerification]);

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
      // Clear payment-related localStorage items
      localStorage.removeItem('payment_date');
      localStorage.removeItem('payment_plan');
      localStorage.removeItem('userEmail');
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

  // ENHANCED: Better loading state with payment success handling
  if (loading && !showPaymentSuccess) {
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
                {/* ORIGINAL BEAUTIFUL HOME PAGE - RESTORED */}
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
                
                {/* FIXED: Added the missing /app route for writing functionality */}
                <Route path="/app" element={
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
                              <EnhancedWritingArea 
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
                              <EnhancedWritingArea 
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
                } />

                {/* Learning and other routes */}
                <Route path="/learning" element={
                  <LearningPage onNavigate={handleNavigation} />
                } />
                
                {/* ENHANCED: Better payment success page handling */}
                <Route path="/payment-success" element={
                  <PaymentSuccessPage 
                    planType={pendingPaymentPlan || 'premium_plan'}
                    onContinue={() => {
                      setShowPaymentSuccess(false);
                      if (user) {
                        setActivePage('dashboard');
                      } else {
                        setActivePage('home');
                      }
                    }}
                  />
                } />
                
                <Route path="/feedback" element={
                  <EssayFeedbackPage 
                    content={content}
                    textType={textType}
                    onBack={() => setActivePage('writing')}
                    onNewEssay={() => {
                      setContent('');
                      setActivePage('writing');
                    }}
                  />
                } />

                <Route path="/auth/callback" element={
                  <EmailVerificationHandler />
                } />
              </Routes>
            </div>
            
            <Footer />

            {/* Modals */}
            {showAuthModal && (
              <AuthModal
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
                onSuccess={handleAuthSuccess}
                initialMode={authModalMode}
                onNavigate={handleNavigation}
              />
            )}

            {showHelpCenter && (
              <HelpCenter onClose={() => setShowHelpCenter(false)} />
            )}

            {showPlanningTool && (
              <PlanningToolModal
                isOpen={showPlanningTool}
                onClose={() => setShowPlanningTool(false)}
                onSavePlan={handleSavePlan}
                content={content}
                textType={textType}
                onRestoreContent={handleRestoreContent}
              />
            )}

            {/* ENHANCED: Email Verification Reminder with better handling */}
            {user && !emailVerified && activePage === 'dashboard' && (
              <EmailVerificationReminder 
                email={user.email || ''}
                onVerified={() => {
                  // Force refresh verification instead of full page reload
                  if (forceRefreshVerification) {
                    forceRefreshVerification();
                  }
                }}
              />
            )}
          </div>
        </Router>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;

