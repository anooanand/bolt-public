import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { getCurrentUser, confirmPayment, hasCompletedPayment, supabase, signOut } from './lib/supabase';
import { User } from '@supabase/supabase-js';

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
  const [user, setUser] = useState<User | null>(null);
  const [activePage, setActivePage] = useState('home');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup'>('signin');
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  const [pendingPaymentPlan, setPendingPaymentPlan] = useState<string | null>(null);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  // Simplified initialization
  const initializeApp = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Check for payment success in URL first
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
        setIsLoading(false);
        return;
      }
      
      // Get current user session
      const currentUser = await getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
        
        // Check payment status
        const paymentStatus = await hasCompletedPayment();
        setPaymentCompleted(paymentStatus);
        
        console.log('[DEBUG] User session restored:', currentUser.email, 'Payment status:', paymentStatus);
      }
      
      // Always start on home page unless handling payment success
      setActivePage('home');
      
    } catch (error) {
      console.error('Error initializing app:', error);
      setError('Failed to load application. Please refresh the page.');
    } finally {
      setIsLoading(false);
    }
  };

  // Initialize app on mount
  useEffect(() => {
    initializeApp();
  }, []);

  // Set up auth state listener
  useEffect(() => {
    if (!supabase) return;

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('[DEBUG] Auth state changed:', event, session?.user?.email);
      
      if (event === 'SIGNED_IN' && session?.user) {
        setUser(session.user);
        setShowAuthModal(false);
        setError(null);
        
        // Check payment status
        try {
          const paymentStatus = await hasCompletedPayment();
          setPaymentCompleted(paymentStatus);
          
          // Navigate based on context and payment status
          if (authModalMode === 'signup') {
            setActivePage('pricing');
          } else {
            setActivePage(paymentStatus ? 'dashboard' : 'pricing');
          }
        } catch (error) {
          console.error('Error checking payment status after sign in:', error);
          setActivePage('pricing');
        }
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setPaymentCompleted(false);
        setActivePage('home');
        setError(null);
      }
    });

    return () => subscription.unsubscribe();
  }, [authModalMode]);

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

  const handleAuthSuccess = async (user: User) => {
    setUser(user);
    setShowAuthModal(false);
    setError(null);
    
    try {
      const paymentStatus = await hasCompletedPayment();
      setPaymentCompleted(paymentStatus);
      
      if (authModalMode === 'signup') {
        setActivePage('pricing');
      } else {
        setActivePage(paymentStatus ? 'dashboard' : 'pricing');
      }
    } catch (error) {
      console.error('Error checking payment status:', error);
      setActivePage('pricing');
    }
  };

  const handleForceSignOut = async () => {
    try {
      await signOut();
      setUser(null);
      setPaymentCompleted(false);
      setActivePage('home');
      setError(null);
      localStorage.clear();
    } catch (error) {
      console.error('Error during sign out:', error);
      // Force reset even if sign out fails
      setUser(null);
      setPaymentCompleted(false);
      setActivePage('home');
      localStorage.clear();
    }
  };

  const handleNavigation = async (page: string) => {
    // Special handling for dashboard - check payment status
    if (page === 'dashboard' && user) {
      try {
        const paymentStatus = await hasCompletedPayment();
        setPaymentCompleted(paymentStatus);
        setActivePage(paymentStatus ? 'dashboard' : 'pricing');
      } catch (error) {
        console.error('Error checking payment for dashboard:', error);
        setActivePage('pricing');
      }
    } else {
      setActivePage(page);
    }
    setShowAuthModal(false);
  };

  const handleGetStarted = async () => {
    if (user) {
      try {
        const paymentStatus = await hasCompletedPayment();
        setPaymentCompleted(paymentStatus);
        setActivePage(paymentStatus ? 'dashboard' : 'pricing');
      } catch (error) {
        console.error('Error checking payment status:', error);
        setActivePage('pricing');
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

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400 mb-4">Loading Writing Assistant...</p>
          {/* Emergency skip button for debugging */}
          <button 
            onClick={() => {
              console.log('[DEBUG] User manually skipped loading');
              setIsLoading(false);
              setActivePage('home');
            }}
            className="mt-4 text-sm text-indigo-600 hover:text-indigo-800 underline"
          >
            Skip loading and continue
          </button>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center max-w-md">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Something went wrong
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
          <div className="space-x-2">
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Reload Page
            </button>
            <button
              onClick={() => {
                setError(null);
                setActivePage('home');
              }}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              Continue Anyway
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider>
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
          {showPaymentSuccess ? (
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
          ) : activePage === 'pricing' ? (
            <PricingPage />
          ) : activePage === 'dashboard' ? (
            <Dashboard user={user} onNavigate={handleNavigation} />
          ) : activePage === 'settings' ? (
            <SettingsPage onBack={() => setActivePage('dashboard')} />
          ) : activePage === 'faq' ? (
            <FAQPage />
          ) : activePage === 'about' ? (
            <AboutPage />
          ) : activePage === 'features' ? (
            <div>
              <FeaturesSection />
              <ToolsSection onOpenTool={() => {}} />
              <WritingTypesSection />
            </div>
          ) : activePage === 'writing' ? (
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
                    <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-2 flex justify-center">
                      <div className="inline-flex rounded-md shadow-sm" role="group">
                        <button
                          type="button"
                          onClick={() => handlePanelChange('coach')}
                          data-panel="coach"
                          className={`px-4 py-2 text-sm font-medium ${
                            activePanel === 'coach'
                              ? 'bg-indigo-600 text-white'
                              : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
                          } border border-gray-200 dark:border-gray-600 rounded-l-lg`}
                        >
                          Writing Coach
                        </button>
                        <button
                          type="button"
                          onClick={() => handlePanelChange('paraphrase')}
                          data-panel="paraphrase"
                          className={`px-4 py-2 text-sm font-medium ${
                            activePanel === 'paraphrase'
                              ? 'bg-indigo-600 text-white'
                              : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
                          } border border-gray-200 dark:border-gray-600 rounded-r-lg`}
                        >
                          Paraphrase Tool
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </WritingAccessCheck>
          ) : activePage === 'learn' ? (
            <LearningPage 
              state={appState}
              onStateChange={updateAppState}
              onNavigateToWriting={() => setActivePage('writing')}
            />
          ) : activePage === 'feedback' ? (
            <EssayFeedbackPage 
              content={content}
              textType={textType}
              onBack={() => setActivePage('writing')}
            />
          ) : (
            <>
              <HeroSection 
                onGetStarted={handleGetStarted}
                onStartWriting={handleStartWriting}
              />
              <FeaturesSection />
              <ToolsSection onOpenTool={() => {}} />
              <WritingTypesSection />
            </>
          )}
          
          {activePage !== 'writing' && activePage !== 'feedback' && activePage !== 'learn' && activePage !== 'settings' && (
            <Footer onNavigate={handleNavigation} />
          )}
        </div>

        {/* Help Center Modal */}
        <HelpCenter 
          isOpen={showHelpCenter}
          onClose={() => setShowHelpCenter(false)} 
        />

        {/* Planning Tool Modal */}
        <PlanningToolModal
          isOpen={showPlanningTool}
          onClose={() => setShowPlanningTool(false)}
          textType={textType}
          onSavePlan={handleSavePlan}
        />

        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onSuccess={handleAuthSuccess}
          initialMode={authModalMode}
          onNavigate={handleNavigation}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;