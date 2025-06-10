import React, { useEffect, useState } from 'react';
import { ThemeProvider } from './lib/ThemeContext';
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

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [activePage, setActivePage] = useState('home');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup'>('signin');
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  const [pendingPaymentPlan, setPendingPaymentPlan] = useState<string | null>(null);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sessionChecked, setSessionChecked] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // FIXED: Added emergency reset function
  const emergencyReset = () => {
    console.log("[DEBUG] Performing emergency reset");
    
    // Clear all auth-related localStorage items
    if (typeof window !== 'undefined') {
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('supabase.') || key.includes('auth') || key === 'userEmail') {
          localStorage.removeItem(key);
        }
      });
    }
    
    // Reset state
    setUser(null);
    setActivePage('home');
    setShowAuthModal(false);
    setShowPaymentSuccess(false);
    setPendingPaymentPlan(null);
    setPaymentCompleted(false);
    setIsLoading(false);
    setSessionChecked(true);
    setAuthError(null);
    
    // Force page reload
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  // FIXED: Simplified authentication success handler
  const handleAuthSuccess = async (user: any) => {
    console.log("[DEBUG] Auth success handler called with user:", user?.email);

    try {
      setUser(user);
      setShowAuthModal(false); // Close modal immediately

      // FIXED: Simple navigation logic
      if (pendingPaymentPlan) {
        console.log("[DEBUG] Found pending payment plan:", pendingPaymentPlan);
        try {
          await confirmPayment(pendingPaymentPlan);
          setPaymentCompleted(true);
          setActivePage('dashboard');
          setPendingPaymentPlan(null);
          setShowPaymentSuccess(false);
          
          // Clear URL parameters
          if (typeof window !== 'undefined') {
            window.history.replaceState({}, document.title, window.location.pathname);
          }
          
          // Show success message
          setTimeout(() => {
            alert(`Welcome! Your ${pendingPaymentPlan} plan is now active. Enjoy your writing assistant!`);
          }, 500);
        } catch (error) {
          console.error("[DEBUG] Error confirming payment:", error);
          alert("There was an error confirming your payment. Please contact support.");
          setActivePage('pricing');
        }
      } else {
        console.log("[DEBUG] No pending payment plan, checking payment status");
        try {
          const completed = await hasCompletedPayment();
          setPaymentCompleted(completed);
          setActivePage(completed ? 'dashboard' : 'pricing');
        } catch (error) {
          console.error("[DEBUG] Error checking payment status:", error);
          setActivePage('pricing');
        }
      }
    } catch (error) {
      console.error("[DEBUG] Error in auth success handler:", error);
      setShowAuthModal(false);
      setAuthError("There was an error processing your request. Please try again or contact support.");
    }
  };

  const handleNavigation = (page: string) => {
    console.log("[DEBUG] Navigation to page:", page);
    setActivePage(page);
  };

  // FIXED: Added force sign out button to NavBar
  const handleForceSignOut = async () => {
    try {
      await forceSignOut();
      // The forceSignOut function will handle the page reload
    } catch (error) {
      console.error("[DEBUG] Error during force sign out:", error);
      emergencyReset();
    }
  };

  // FIXED: Simplified auth state initialization
  const initializeAuthState = async () => {
    try {
      console.log("[DEBUG] Initializing auth state");
      setIsLoading(true);

      // FIXED: Shorter timeout (3 seconds)
      const timeoutId = setTimeout(() => {
        console.log("[DEBUG] Auth initialization timed out, forcing reset");
        emergencyReset();
      }, 3000);

      try {
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        
        // Clear the timeout since we got a response
        clearTimeout(timeoutId);

        if (sessionError) {
          console.error('[DEBUG] Error getting session:', sessionError);
          setIsLoading(false);
          setSessionChecked(true);
          return;
        }

        if (sessionData.session?.user) {
          console.log('[DEBUG] Session found, setting user');
          const currentUser = sessionData.session.user;
          setUser(currentUser);
          
          try {
            const completed = await hasCompletedPayment();
            setPaymentCompleted(completed);
            console.log('[DEBUG] Payment completed:', completed);
            setActivePage(completed ? 'dashboard' : 'pricing');
          } catch (paymentError) {
            console.error('[DEBUG] Error checking payment status:', paymentError);
            setActivePage('pricing');
          }
        } else {
          console.log('[DEBUG] No session found');
          setUser(null);
        }

        // Check for payment success in URL
        const urlParams = new URLSearchParams(window.location.search);
        const paymentSuccess = urlParams.get('payment_success');
        const plan = urlParams.get('plan');

        if (paymentSuccess && plan) {
          console.log(`[DEBUG] Payment success detected for plan: ${plan}`);
          setShowPaymentSuccess(true);
          setPendingPaymentPlan(plan);
        }

        setSessionChecked(true);
        setIsLoading(false);
      } catch (error) {
        // Clear the timeout if there's an error
        clearTimeout(timeoutId);
        throw error;
      }
    } catch (error) {
      console.error('[DEBUG] Error initializing auth state:', error);
      setAuthError("There was an error loading your session. Please try refreshing the page.");
      setIsLoading(false);
      setSessionChecked(true);
    }
  };

  useEffect(() => {
    initializeAuthState();

    // FIXED: Simplified auth state change handler
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("[DEBUG] Auth state change:", event, session?.user?.email);

      try {
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          const currentUser = session?.user || null;
          setUser(currentUser);

          if (currentUser && event === 'SIGNED_IN') {
            // Handle payment confirmation if needed
            if (pendingPaymentPlan) {
              try {
                await confirmPayment(pendingPaymentPlan);
                setPaymentCompleted(true);
                setActivePage('dashboard');
                setPendingPaymentPlan(null);
                setShowPaymentSuccess(false);
                
                if (typeof window !== 'undefined') {
                  window.history.replaceState({}, document.title, window.location.pathname);
                }
                
                setTimeout(() => {
                  alert(`Welcome! Your ${pendingPaymentPlan} plan is now active. Enjoy your writing assistant!`);
                }, 500);
              } catch (error) {
                console.error("[DEBUG] Error confirming payment in auth state change:", error);
                setActivePage('pricing');
              }
            } else {
              // Check payment status and navigate accordingly
              try {
                const completed = await hasCompletedPayment();
                setPaymentCompleted(completed);
                setActivePage(completed ? 'dashboard' : 'pricing');
              } catch (error) {
                console.error("[DEBUG] Error checking payment status in auth state change:", error);
                setActivePage('pricing');
              }
            }
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setPaymentCompleted(false);
          setActivePage('home');
        }
      } catch (error) {
        console.error('[DEBUG] Error in auth state change handler:', error);
        setAuthError("There was an error processing your authentication. Please try signing in again.");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [pendingPaymentPlan]);

  // FIXED: Added error display and emergency reset button
  if (authError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md w-full text-center">
          <h2 className="text-xl font-bold text-red-700 mb-2">Authentication Error</h2>
          <p className="text-red-600 mb-4">{authError}</p>
          <button 
            onClick={emergencyReset}
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md"
          >
            Reset Authentication State
          </button>
        </div>
      </div>
    );
  }

  if (isLoading || !sessionChecked) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mb-4"></div>
        <p className="text-gray-600">Loading...</p>
        
        {/* FIXED: Added emergency reset button that appears after 2 seconds */}
        <div className="mt-8">
          <p className="text-sm text-gray-500 mb-2">Taking too long to load?</p>
          <button 
            onClick={emergencyReset}
            className="bg-red-600 hover:bg-red-700 text-white text-sm py-1 px-3 rounded-md"
          >
            Emergency Reset
          </button>
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <NavBar
        onNavigate={handleNavigation}
        activePage={activePage}
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
          <Dashboard user={user} />
        ) : (
          <>
            <HeroSection />
            <FeaturesSection />
            <ToolsSection />
            <WritingTypesSection />
          </>
        )}
        <Footer />
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
        initialMode={authModalMode}
      />
    </ThemeProvider>
  );
}

export default App;

