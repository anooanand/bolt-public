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

  // FIXED: Emergency reset function with complete state cleanup
  const emergencyReset = () => {
    console.log("[DEBUG] Performing emergency reset");
    
    // Clear all localStorage
    if (typeof window !== 'undefined') {
      localStorage.clear();
    }
    
    // Reset all state immediately
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

  // FIXED: Improved payment success URL handling with better parsing
  const checkPaymentSuccessFromURL = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const paymentSuccess = urlParams.get('paymentSuccess') || urlParams.get('payment_success');
    const planType = urlParams.get('planType') || urlParams.get('plan');

    console.log("[DEBUG] Checking URL params:", { paymentSuccess, planType });

    if (paymentSuccess === 'true' && planType) {
      console.log(`[DEBUG] Payment success detected for plan: ${planType}`);
      setPendingPaymentPlan(planType);
      
      // Clear URL parameters immediately to prevent loops
      if (typeof window !== 'undefined') {
        const newUrl = window.location.pathname;
        window.history.replaceState({}, document.title, newUrl);
      }
      
      return { success: true, plan: planType };
    }
    
    return { success: false, plan: null };
  };

  // FIXED: Robust payment confirmation with database sync retry
  const confirmPaymentWithDatabaseSync = async (planType: string) => {
    try {
      console.log("[DEBUG] Confirming payment with database sync for plan:", planType);
      
      const userEmail = localStorage.getItem('userEmail');
      if (!userEmail) {
        throw new Error("No user email found");
      }

      // FIXED: Set payment confirmation in localStorage immediately
      localStorage.setItem('payment_confirmed', 'true');
      localStorage.setItem('payment_plan', planType);
      localStorage.setItem('payment_date', new Date().toISOString());
      localStorage.setItem('subscription_status', 'active');

      console.log("[DEBUG] Payment confirmed locally for user:", userEmail, "plan:", planType);

      // FIXED: Aggressive database sync with multiple attempts
      let syncSuccess = false;
      for (let attempt = 1; attempt <= 5; attempt++) {
        try {
          console.log(`[DEBUG] Database sync attempt ${attempt}/5`);
          
          // Get current session with short timeout
          const { data: { session }, error: sessionError } = await Promise.race([
            supabase.auth.getSession(),
            new Promise((_, reject) => 
              setTimeout(() => reject(new Error('Session timeout')), 1000)
            )
          ]) as any;
          
          if (sessionError || !session?.user) {
            console.warn(`[DEBUG] No session for sync attempt ${attempt}`);
            await new Promise(resolve => setTimeout(resolve, 500)); // Wait before retry
            continue;
          }

          // Update user metadata with payment info
          const { error: updateError } = await Promise.race([
            supabase.auth.updateUser({
              data: {
                payment_confirmed: true,
                plan_type: planType,
                payment_date: new Date().toISOString(),
                subscription_status: 'active',
                last_payment_sync: new Date().toISOString()
              }
            }),
            new Promise((_, reject) => 
              setTimeout(() => reject(new Error('Update timeout')), 2000)
            )
          ]) as any;

          if (updateError) {
            console.warn(`[DEBUG] Database sync attempt ${attempt} failed:`, updateError);
            await new Promise(resolve => setTimeout(resolve, 1000)); // Wait before retry
            continue;
          }

          console.log(`[DEBUG] Database sync successful on attempt ${attempt}`);
          syncSuccess = true;
          break;
        } catch (error) {
          console.warn(`[DEBUG] Database sync attempt ${attempt} error:`, error);
          if (attempt < 5) {
            await new Promise(resolve => setTimeout(resolve, 1000)); // Wait before retry
          }
        }
      }

      if (!syncSuccess) {
        console.warn("[DEBUG] All database sync attempts failed - using local storage only");
      }

      return {
        success: true,
        user: { email: userEmail },
        plan: planType,
        paymentDate: new Date().toISOString(),
        databaseSynced: syncSuccess
      };
    } catch (error) {
      console.error("[DEBUG] Error confirming payment:", error);
      throw error;
    }
  };

  // FIXED: Enhanced payment status check with database verification
  const checkPaymentStatus = async (user: any) => {
    try {
      console.log("[DEBUG] Checking payment status for user:", user?.email);

      const userEmail = user?.email || localStorage.getItem('userEmail');
      if (!userEmail) {
        console.log("[DEBUG] No user email available");
        return false;
      }

      // FIXED: Check localStorage first for immediate response
      const localPaymentStatus = localStorage.getItem('payment_confirmed');
      const localUserEmail = localStorage.getItem('userEmail');
      
      if (localPaymentStatus === 'true' && localUserEmail === userEmail) {
        console.log("[DEBUG] Local payment status: confirmed for", userEmail);
        
        // FIXED: Verify with database in background (non-blocking)
        if (user?.user_metadata) {
          const dbPaymentStatus = user.user_metadata.payment_confirmed === true;
          console.log("[DEBUG] Database payment status:", dbPaymentStatus);
          
          if (!dbPaymentStatus) {
            console.log("[DEBUG] Local and database payment status mismatch - syncing...");
            // Try to sync the payment status to database
            confirmPaymentWithDatabaseSync(localStorage.getItem('payment_plan') || 'base-plan')
              .catch(error => console.warn("[DEBUG] Background sync failed:", error));
          }
        }
        
        return true;
      }

      // FIXED: Check database if local storage doesn't have payment info
      if (user?.user_metadata) {
        const dbPaymentStatus = user.user_metadata.payment_confirmed === true;
        console.log("[DEBUG] Database payment status:", dbPaymentStatus);
        
        if (dbPaymentStatus) {
          // Update local storage to match database
          localStorage.setItem('payment_confirmed', 'true');
          localStorage.setItem('userEmail', userEmail);
          localStorage.setItem('payment_plan', user.user_metadata.plan_type || 'base-plan');
          return true;
        }
      }

      console.log("[DEBUG] No payment confirmation found");
      return false;
    } catch (error) {
      console.error("[DEBUG] Error checking payment status:", error);
      
      // Fallback to local storage
      const localPaymentStatus = localStorage.getItem('payment_confirmed');
      const localUserEmail = localStorage.getItem('userEmail');
      return localPaymentStatus === 'true' && localUserEmail === (user?.email || '');
    }
  };

  // FIXED: Improved authentication success handler
  const handleAuthSuccess = async (user: any) => {
    console.log("[DEBUG] Auth success handler called with user:", user?.email);

    try {
      setUser(user);
      setShowAuthModal(false);
      setShowPaymentSuccess(false);
      setAuthError(null);

      if (pendingPaymentPlan) {
        console.log("[DEBUG] Processing pending payment plan:", pendingPaymentPlan);
        
        const paymentResult = await confirmPaymentWithDatabaseSync(pendingPaymentPlan);
        
        if (paymentResult.success) {
          setPaymentCompleted(true);
          setActivePage('dashboard');
          setPendingPaymentPlan(null);
          
          console.log("[DEBUG] Payment confirmed, redirecting to dashboard");
          
          setTimeout(() => {
            alert(`Welcome! Your ${pendingPaymentPlan} plan is now active. ${paymentResult.databaseSynced ? 'Database updated successfully.' : 'Local confirmation saved.'}`);
          }, 500);
        } else {
          console.error("[DEBUG] Payment confirmation failed");
          alert("There was an error confirming your payment. Please contact support.");
          setActivePage('pricing');
        }
      } else {
        console.log("[DEBUG] No pending payment plan, checking existing payment status");
        
        const hasPayment = await checkPaymentStatus(user);
        setPaymentCompleted(hasPayment);
        
        if (hasPayment) {
          console.log("[DEBUG] User has completed payment -> dashboard");
          setActivePage('dashboard');
        } else {
          console.log("[DEBUG] User has NOT completed payment -> pricing page");
          setActivePage('pricing');
        }
      }
    } catch (error) {
      console.error("[DEBUG] Error in auth success handler:", error);
      setAuthError("There was an error processing your authentication. Please try again.");
    }
  };

  const handleNavigation = (page: string) => {
    console.log("[DEBUG] Navigation to page:", page);
    setActivePage(page);
  };

  const handleForceSignOut = async () => {
    try {
      console.log("[DEBUG] Force sign out initiated");
      await forceSignOut();
    } catch (error) {
      console.error("[DEBUG] Error during force sign out:", error);
      emergencyReset();
    }
  };

  // FIXED: Robust auth initialization with better error handling
  const initializeAuthState = async () => {
    try {
      console.log("[DEBUG] Initializing auth state");
      setIsLoading(true);

      // Check payment success from URL first
      const paymentResult = checkPaymentSuccessFromURL();
      
      // FIXED: Reasonable timeout (1 second) with emergency reset
      const timeoutId = setTimeout(() => {
        console.log("[DEBUG] Auth initialization timed out, using emergency reset");
        emergencyReset();
      }, 1000);

      try {
        // Get session with timeout
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
          
          if (paymentResult.success) {
            console.log("[DEBUG] Session error but payment success detected, showing payment success page");
            setShowPaymentSuccess(true);
            setIsLoading(false);
            setSessionChecked(true);
            return;
          } else {
            emergencyReset();
            return;
          }
        }

        if (sessionData?.session?.user) {
          console.log('[DEBUG] Session found, setting user');
          const currentUser = sessionData.session.user;
          setUser(currentUser);
          
          if (paymentResult.success && paymentResult.plan) {
            console.log("[DEBUG] Processing payment success for authenticated user");
            
            const paymentConfirmResult = await confirmPaymentWithDatabaseSync(paymentResult.plan);
            
            if (paymentConfirmResult.success) {
              setPaymentCompleted(true);
              setActivePage('dashboard');
              console.log("[DEBUG] Payment processed successfully, showing dashboard");
              
              setTimeout(() => {
                alert(`Welcome! Your ${paymentResult.plan} plan is now active. ${paymentConfirmResult.databaseSynced ? 'Database updated successfully.' : 'Local confirmation saved.'}`);
              }, 1000);
            } else {
              console.error("[DEBUG] Error processing payment");
              setActivePage('pricing');
            }
          } else {
            const hasPayment = await checkPaymentStatus(currentUser);
            setPaymentCompleted(hasPayment);
            
            if (hasPayment) {
              console.log("[DEBUG] User has payment -> dashboard");
              setActivePage('dashboard');
            } else {
              console.log("[DEBUG] User has NO payment -> pricing page");
              setActivePage('pricing');
            }
          }
        } else {
          console.log('[DEBUG] No session found');
          setUser(null);
          
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
    const initTimeout = setTimeout(() => {
      console.log("[DEBUG] useEffect timeout - forcing emergency reset");
      emergencyReset();
    }, 2000);

    initializeAuthState().finally(() => {
      clearTimeout(initTimeout);
    });

    // FIXED: Enhanced auth state change handler
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("[DEBUG] Auth state change:", event, session?.user?.email);

      try {
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          const currentUser = session?.user || null;
          setUser(currentUser);

          if (currentUser && event === 'SIGNED_IN') {
            const paymentResult = checkPaymentSuccessFromURL();
            
            if (paymentResult.success && paymentResult.plan) {
              console.log("[DEBUG] Processing payment for newly signed in user");
              
              const paymentConfirmResult = await confirmPaymentWithDatabaseSync(paymentResult.plan);
              
              if (paymentConfirmResult.success) {
                setPaymentCompleted(true);
                setActivePage('dashboard');
                setPendingPaymentPlan(null);
                setShowPaymentSuccess(false);
                
                setTimeout(() => {
                  alert(`Welcome! Your ${paymentResult.plan} plan is now active. ${paymentConfirmResult.databaseSynced ? 'Database updated successfully.' : 'Local confirmation saved.'}`);
                }, 500);
              } else {
                console.error("[DEBUG] Payment confirmation failed in auth state change");
                setActivePage('pricing');
              }
            } else if (pendingPaymentPlan) {
              const paymentConfirmResult = await confirmPaymentWithDatabaseSync(pendingPaymentPlan);
              
              if (paymentConfirmResult.success) {
                setPaymentCompleted(true);
                setActivePage('dashboard');
                setPendingPaymentPlan(null);
                setShowPaymentSuccess(false);
                
                setTimeout(() => {
                  alert(`Welcome! Your ${pendingPaymentPlan} plan is now active. ${paymentConfirmResult.databaseSynced ? 'Database updated successfully.' : 'Local confirmation saved.'}`);
                }, 500);
              } else {
                console.error("[DEBUG] Pending payment confirmation failed in auth state change");
                setActivePage('pricing');
              }
            } else {
              const hasPayment = await checkPaymentStatus(currentUser);
              setPaymentCompleted(hasPayment);
              
              if (hasPayment) {
                console.log("[DEBUG] Existing user with payment -> dashboard");
                setActivePage('dashboard');
              } else {
                console.log("[DEBUG] User without payment -> pricing page");
                setActivePage('pricing');
              }
            }
          }
        } else if (event === 'SIGNED_OUT') {
          console.log("[DEBUG] User signed out");
          setUser(null);
          setPaymentCompleted(false);
          setActivePage('home');
          // FIXED: Don't clear localStorage on sign out to preserve payment status
          // localStorage.clear(); // Removed this line
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

  // FIXED: Better error display with clear actions
  if (authError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md w-full text-center">
          <h2 className="text-xl font-bold text-red-700 mb-2">Authentication Error</h2>
          <p className="text-red-600 mb-4">{authError}</p>
          <div className="space-y-2">
            <button 
              onClick={() => setAuthError(null)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
            >
              Try Again
            </button>
            <button 
              onClick={emergencyReset}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md"
            >
              Reset Application
            </button>
          </div>
        </div>
      </div>
    );
  }

  // FIXED: Improved loading screen with faster timeout
  if (isLoading || !sessionChecked) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mb-4"></div>
        <p className="text-gray-600 mb-4">Loading...</p>
        
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

      {/* FIXED: Ensure AuthModal doesn't block dashboard interactions */}
      {showAuthModal && (
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onSuccess={handleAuthSuccess}
          initialMode={authModalMode}
        />
      )}
    </ThemeProvider>
  );
}

export default App;

