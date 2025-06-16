import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { getCurrentUser, confirmPayment, hasCompletedPayment, supabase, forceSignOut } from './lib/supabase';
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

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [activePage, setActivePage] = useState('home'); // Always start with home
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup'>('signin');
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  const [pendingPaymentPlan, setPendingPaymentPlan] = useState<string | null>(null);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sessionChecked, setSessionChecked] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Writing state
  const [content, setContent] = useState('');
  const [textType, setTextType] = useState('');
  const [assistanceLevel, setAssistanceLevel] = useState('detailed');
  const [timerStarted, setTimerStarted] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [activePanel, setActivePanel] = useState<'coach' | 'paraphrase'>('coach');
  const [showExamMode, setShowExamMode] = useState(false);
  const [showHelpCenter, setShowHelpCenter] = useState(false);

  // Emergency reset function
  const emergencyReset = () => {
    console.log("[DEBUG] Performing emergency reset");
    
    if (typeof window !== 'undefined') {
      localStorage.clear();
    }
    
    setUser(null);
    setActivePage('home'); // Always reset to home
    setShowAuthModal(false);
    setShowPaymentSuccess(false);
    setPendingPaymentPlan(null);
    setPaymentCompleted(false);
    setIsLoading(false);
    setSessionChecked(true);
    setAuthError(null);
  };

  // Safe payment status check with timeout
  const checkPaymentStatusSafely = async (user: User): Promise<boolean> => {
    try {
      console.log('[DEBUG] Checking payment status for user:', user.email);
      
      // Create a promise that times out after 3 seconds
      const timeoutPromise = new Promise<boolean>((_, reject) => {
        setTimeout(() => reject(new Error('Payment check timeout')), 3000);
      });
      
      const paymentPromise = hasCompletedPayment();
      
      // Race between payment check and timeout
      const completed = await Promise.race([paymentPromise, timeoutPromise]);
      console.log('[DEBUG] Payment status:', completed);
      return completed;
    } catch (error) {
      console.warn('[DEBUG] Payment status check failed, using fallback:', error);
      // Fallback: assume no payment completed
      return false;
    }
  };

  // Initialize auth state with better error handling
  const initializeAuthState = async () => {
    try {
      setIsLoading(true);
      
      // Shorter timeout for initial load
      const timeoutId = setTimeout(() => {
        console.log('[DEBUG] Auth initialization timeout, staying on home page');
        setIsLoading(false);
        setSessionChecked(true);
        setActivePage('home'); // Ensure we stay on home page
      }, 3000); // Reduced from 5000 to 3000

      try {
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        clearTimeout(timeoutId);

        if (sessionError) {
          console.error('[DEBUG] Session error:', sessionError);
          setUser(null);
          setActivePage('home'); // Stay on home page
          setIsLoading(false);
          setSessionChecked(true);
          return;
        }

        if (sessionData?.session?.user) {
          console.log('[DEBUG] Session found for user:', sessionData.session.user.email);
          const currentUser = sessionData.session.user;
          
          if (currentUser?.email) {
            setUser(currentUser);
            
            // Only check payment status if user explicitly navigates to dashboard
            // Don't auto-redirect on app load
            const completed = await checkPaymentStatusSafely(currentUser);
            setPaymentCompleted(completed);
            
            // Stay on home page by default, don't auto-redirect
            console.log('[DEBUG] User authenticated, staying on home page');
          } else {
            console.warn('[DEBUG] Session found but user has no email');
            setUser(null);
          }
        } else {
          console.log('[DEBUG] No session found, staying on home page');
          setUser(null);
        }

        // Check for payment success URL params
        const urlParams = new URLSearchParams(window.location.search);
        const paymentSuccess = urlParams.get('payment_success');
        const plan = urlParams.get('plan');

        if (paymentSuccess && plan) {
          console.log(`[DEBUG] Payment success detected for plan: ${plan}`);
          setShowPaymentSuccess(true);
          setPendingPaymentPlan(plan);
          setActivePage('payment-success');
        } else {
          // Ensure we stay on home page if no payment success
          setActivePage('home');
        }

        setSessionChecked(true);
        setIsLoading(false);
      } catch (error) {
        clearTimeout(timeoutId);
        console.error('[DEBUG] Error in auth initialization:', error);
        // On any error, stay on home page
        setActivePage('home');
        setIsLoading(false);
        setSessionChecked(true);
      }
    } catch (error) {
      console.error('[DEBUG] Critical error initializing auth state:', error);
      setAuthError("There was an error loading your session. Please try refreshing the page.");
      setActivePage('home'); // Stay on home page even with errors
      setIsLoading(false);
      setSessionChecked(true);
    }
  };

  useEffect(() => {
    initializeAuthState();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('[DEBUG] Auth state changed:', event, session?.user?.email);
      
      if (event === 'SIGNED_IN' && session?.user) {
        setUser(session.user);
        setShowAuthModal(false);
        
        // After successful signup, redirect to pricing
        if (authModalMode === 'signup') {
          setActivePage('pricing');
        } else {
          // For signin, check payment status and redirect accordingly
          try {
            const completed = await checkPaymentStatusSafely(session.user);
            setPaymentCompleted(completed);
            setActivePage(completed ? 'dashboard' : 'pricing');
          } catch (error) {
            console.error('Error checking payment status after signin:', error);
            setActivePage('pricing');
          }
        }
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setPaymentCompleted(false);
        setActivePage('home'); // Always go back to home after signout
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
    
    // After successful signup, redirect to pricing
    if (authModalMode === 'signup') {
      setActivePage('pricing');
    } else {
      // For signin, check payment status
      try {
        const completed = await checkPaymentStatusSafely(user);
        setPaymentCompleted(completed);
        setActivePage(completed ? 'dashboard' : 'pricing');
      } catch (error) {
        console.error('Error checking payment status:', error);
        setActivePage('pricing');
      }
    }
  };

  const handleForceSignOut = async () => {
    try {
      await forceSignOut();
      emergencyReset();
    } catch (error) {
      console.error('Error during force sign out:', error);
      emergencyReset();
    }
  };

  const handleNavigation = (page: string) => {
    // If navigating to dashboard, check payment status first
    if (page === 'dashboard' && user) {
      checkPaymentStatusSafely(user).then(completed => {
        setPaymentCompleted(completed);
        setActivePage(completed ? 'dashboard' : 'pricing');
      }).catch(() => {
        setActivePage('pricing');
      });
    } else {
      setActivePage(page);
    }
    setShowAuthModal(false);
  };

  const handleGetStarted = () => {
    if (user) {
      // Check payment status when user clicks get started
      checkPaymentStatusSafely(user).then(completed => {
        setPaymentCompleted(completed);
        setActivePage(completed ? 'dashboard' : 'pricing');
      }).catch(() => {
        setActivePage('pricing');
      });
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
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
          
          {activePage !== 'writing' && activePage !== 'feedback' && activePage !== 'learn' && (
            <Footer />
          )}
        </div>

        {/* Help Center Modal */}
        <HelpCenter 
          isOpen={showHelpCenter}
          onClose={() => setShowHelpCenter(false)} 
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