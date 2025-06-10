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

  // FIXED: Emergency reset function with immediate state reset
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
    
    // Reset state immediately
    setUser(null);
    setActivePage('home');
    setShowAuthModal(false);
    setShowPaymentSuccess(false);
    setPendingPaymentPlan(null);
    setPaymentCompleted(false);
    setIsLoading(false);
    setSessionChecked(true);
    setAuthError(null);
  };

  // FIXED: Improved payment success URL handling
  const checkPaymentSuccessFromURL = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const paymentSuccess = urlParams.get('paymentSuccess') || urlParams.get('payment_success');
    const planType = urlParams.get('planType') || urlParams.get('plan');

    console.log("[DEBUG] Checking URL params:", { paymentSuccess, planType });

    if (paymentSuccess === 'true' && planType) {
      console.log(`[DEBUG] Payment success detected for plan: ${planType}`);
      setPendingPaymentPlan(planType);
      
      // Clear URL parameters immediately
      if (typeof window !== 'undefined') {
        const newUrl = window.location.pathname;
        window.history.replaceState({}, document.title, newUrl);
      }
      
      return { success: true, plan: planType };
    }
    
    return { success: false, plan: null };
  };

  // FIXED: Simplified authentication success handler with immediate dashboard redirect
  const handleAuthSuccess = async (user: any) => {
    console.log("[DEBUG] Auth success handler called with user:", user?.email);

    try {
      setUser(user);
      setShowAuthModal(false);
      setShowPaymentSuccess(false);

      if (pendingPaymentPlan) {
        console.log("[DEBUG] Processing pending payment plan:", pendingPaymentPlan);
        try {
          await confirmPayment(pendingPaymentPlan);
          setPaymentCompleted(true);
          setActivePage('dashboard');
          setPendingPaymentPlan(null);
          
          console.log("[DEBUG] Payment confirmed, redirecting to dashboard");
          
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
          console.log("[DEBUG] Payment status checked:", completed, "-> redirecting to:", completed ? 'dashboard' : 'pricing');
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

  const handleForceSignOut = async () => {
    try {
      await forceSignOut();
    } catch (error) {
      console.error("[DEBUG] Error during force sign out:", error);
      emergencyReset();
    }
  };

  // FIXED: Improved auth initialization with payment URL handling
  const initializeAuthState = async () => {
    try {
      console.log("[DEBUG] Initializing auth state");
      setIsLoading(true);

      // FIXED: Check payment success from URL first
      const paymentResult = checkPaymentSuccessFromURL();
      
      // FIXED: Very short timeout (1 second) to prevent hanging
      const timeoutId = setTimeout(() => {
        console.log("[DEBUG] Auth initialization timed out after 1 second, using emergency reset");
        emergencyReset();
      }, 1000);

      try {
        // FIXED: Race condition - if this takes too long, timeout wins
        const sessionPromise = supabase.auth.getSession();
        const result = await Promise.race([
          sessionPromise,
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Session check timeout')), 800)
          )
        ]);

        clearTimeout(timeoutId);

        const { data: sessionData, error: sessionError } = result as any;

        if (sessionError) {
          console.error('[DEBUG] Error getting session:', sessionError);
          // Don't reset immediately if we have payment success
          if (!paymentResult.success) {
            emergencyReset();
            return;
          }
        }

        if (sessionData?.session?.user) {
          console.log('[DEBUG] Session found, setting user');
          const currentUser = sessionData.session.user;
          setUser(currentUser);
          
          // FIXED: If payment success detected, handle it immediately
          if (paymentResult.success && paymentResult.plan) {
            console.log("[DEBUG] Processing payment success for authenticated user");
            try {
              await confirmPayment(paymentResult.plan);
              setPaymentCompleted(true);
              setActivePage('dashboard');
              console.log("[DEBUG] Payment processed successfully, showing dashboard");
              
              setTimeout(() => {
                alert(`Welcome! Your ${paymentResult.plan} plan is now active. Enjoy your writing assistant!`);
              }, 1000);
            } catch (error) {
              console.error("[DEBUG] Error processing payment:", error);
              setActivePage('pricing');
            }
          } else {
            // Normal flow - check payment status
            try {
              const completed = await hasCompletedPayment();
              setPaymentCompleted(completed);
              console.log('[DEBUG] Payment completed:', completed);
              setActivePage(completed ? 'dashboard' : 'pricing');
            } catch (paymentError) {
              console.error('[DEBUG] Error checking payment status:', paymentError);
              setActivePage('pricing');
            }
          }
        } else {
          console.log('[DEBUG] No session found');
          setUser(null);
          
          // If payment success but no user, show payment success page
          if (paymentResult.success) {
            console.log("[DEBUG] Payment success but no user session, showing payment success page");
            setShowPaymentSuccess(true);
          }
        }

        setSessionChecked(true);
        setIsLoading(false);
      } catch (error) {
        clearTimeout(timeoutId);
        console.error('[DEBUG] Session check failed:', error);
        
        // If payment success, don't reset - show payment success page
        if (paymentResult.success) {
          console.log("[DEBUG] Session failed but payment success detected, showing payment success page");
          setShowPaymentSuccess(true);
          setIsLoading(false);
          setSessionChecked(true);
        } else {
          emergencyReset();
        }
      }
    } catch (error) {
      console.error('[DEBUG] Error initializing auth state:', error);
      emergencyReset();
    }
  };

  useEffect(() => {
    // FIXED: Immediate initialization with fallback
    const initTimeout = setTimeout(() => {
      console.log("[DEBUG] useEffect timeout - forcing emergency reset");
      emergencyReset();
    }, 2000);

    initializeAuthState().finally(() => {
      clearTimeout(initTimeout);
    });

    // FIXED: Simplified auth state change handler
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("[DEBUG] Auth state change:", event, session?.user?.email);

      try {
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          const currentUser = session?.user || null;
          setUser(currentUser);

          if (currentUser && event === 'SIGNED_IN') {
            // Check if we have pending payment from URL
            const paymentResult = checkPaymentSuccessFromURL();
            
            if (paymentResult.success && paymentResult.plan) {
              console.log("[DEBUG] Processing payment for newly signed in user");
              try {
                await confirmPayment(paymentResult.plan);
                setPaymentCompleted(true);
                setActivePage('dashboard');
                setPendingPaymentPlan(null);
                setShowPaymentSuccess(false);
                
                setTimeout(() => {
                  alert(`Welcome! Your ${paymentResult.plan} plan is now active. Enjoy your writing assistant!`);
                }, 500);
              } catch (error) {
                console.error("[DEBUG] Error confirming payment in auth state change:", error);
                setActivePage('pricing');
              }
            } else if (pendingPaymentPlan) {
              try {
                await confirmPayment(pendingPaymentPlan);
                setPaymentCompleted(true);
                setActivePage('dashboard');
                setPendingPaymentPlan(null);
                setShowPaymentSuccess(false);
                
                setTimeout(() => {
                  alert(`Welcome! Your ${pendingPaymentPlan} plan is now active. Enjoy your writing assistant!`);
                }, 500);
              } catch (error) {
                console.error("[DEBUG] Error confirming payment in auth state change:", error);
                setActivePage('pricing');
              }
            } else {
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
      clearTimeout(initTimeout);
      subscription.unsubscribe();
    };
  }, [pendingPaymentPlan]);

  // FIXED: Show error with immediate reset option
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

  // FIXED: Much shorter loading timeout with immediate reset option
  if (isLoading || !sessionChecked) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mb-4"></div>
        <p className="text-gray-600 mb-4">Loading...</p>
        
        {/* FIXED: Show reset button immediately */}
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-2">Taking too long?</p>
          <button 
            onClick={emergencyReset}
            className="bg-red-600 hover:bg-red-700 text-white text-sm py-2 px-4 rounded-md"
          >
            Skip Loading & Continue
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

