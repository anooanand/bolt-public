import React, { useEffect, useState } from 'react';
import { ThemeProvider } from './lib/ThemeContext';
import { getCurrentUser, confirmPayment, hasCompletedPayment, supabase } from './lib/supabase';
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

  const handleAuthSuccess = async (user: any) => {
    console.log("[DEBUG] Auth success handler called with user:", user?.email);

    try {
      setUser(user);

      if (pendingPaymentPlan) {
        console.log("[DEBUG] Found pending payment plan:", pendingPaymentPlan);
        try {
          console.log("[DEBUG] Attempting to confirm payment for plan:", pendingPaymentPlan);
          await confirmPayment(pendingPaymentPlan);
          console.log("[DEBUG] Payment confirmation successful");

          const { data: sessionData, error: refreshError } = await supabase.auth.refreshSession();
          if (refreshError) throw refreshError;

          const refreshedUser = sessionData?.session?.user || await getCurrentUser();
          setUser(refreshedUser);
          setPaymentCompleted(true);

          setTimeout(() => {
            setActivePage('dashboard');
            setPendingPaymentPlan(null);
            setShowPaymentSuccess(false);
            if (typeof window !== 'undefined') {
              window.history.replaceState({}, document.title, window.location.pathname);
            }
            alert(`Welcome! Your ${pendingPaymentPlan} plan is now active. Enjoy your writing assistant!`);
          }, 2000);
        } catch (error) {
          console.error("[DEBUG] Error confirming payment:", error);
          alert("There was an error confirming your payment. Please contact support.");
        }
      } else {
        console.log("[DEBUG] No pending payment plan, checking payment status");
        const completed = await hasCompletedPayment();
        setPaymentCompleted(completed);

        setTimeout(() => {
          setActivePage(completed ? 'dashboard' : 'pricing');
        }, 1500);
      }

      setShowAuthModal(false);
    } catch (error) {
      console.error("[DEBUG] Error in auth success handler:", error);
      setShowAuthModal(false);
      alert("There was an error processing your request. Please try again or contact support.");
    }
  };

  const handleNavigation = (page: string) => {
    setActivePage(page);
  };

  const initializeAuthState = async () => {
    try {
      console.log("[DEBUG] Initializing auth state");
      setIsLoading(true);

      const timeoutId = setTimeout(() => {
        console.log("[DEBUG] Auth initialization timed out, forcing reset");
        setIsLoading(false);
        setSessionChecked(true);

        if (typeof window !== 'undefined') {
          Object.keys(localStorage).forEach(key => {
            if (key.startsWith('supabase.') || key.includes('auth')) {
              localStorage.removeItem(key);
            }
          });

          if (process.env.NODE_ENV === 'production') {
            window.location.reload();
          } else {
            console.warn('[DEBUG] Skipping reload in development');
          }
        }
      }, 10000);

      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      clearTimeout(timeoutId);

      if (sessionError) {
        console.error('[DEBUG] Error getting session:', sessionError);
        setIsLoading(false);
        setSessionChecked(true);
        return;
      }

      if (sessionData.session) {
        console.log('[DEBUG] Session found, getting user');
        const currentUser = sessionData.session.user;
        if (currentUser?.email) setUser(currentUser);

        const completed = await hasCompletedPayment();
        setPaymentCompleted(completed);
        setActivePage(completed ? 'dashboard' : 'pricing');
      } else {
        console.log('[DEBUG] No session found');
        setUser(null);
      }

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
      console.error('[DEBUG] Error initializing auth state:', error);
      setIsLoading(false);
      setSessionChecked(true);
    }
  };

  useEffect(() => {
    initializeAuthState();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("[DEBUG] Auth state change:", event, session?.user?.email);

      try {
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          const currentUser = session?.user || null;
          setUser(currentUser);

          if (event === 'SIGNED_IN' && pendingPaymentPlan && currentUser) {
            await confirmPayment(pendingPaymentPlan);
            const { data: refreshData, error: refreshError } = await supabase.auth.refreshSession();
            if (refreshError) throw refreshError;

            const refreshedUser = refreshData?.session?.user || await getCurrentUser();
            setUser(refreshedUser);
            setPaymentCompleted(true);

            setTimeout(() => {
              setActivePage('dashboard');
              setPendingPaymentPlan(null);
              setShowPaymentSuccess(false);
              if (typeof window !== 'undefined') {
                window.history.replaceState({}, document.title, window.location.pathname);
              }
              alert(`Welcome! Your ${pendingPaymentPlan} plan is now active. Enjoy your writing assistant!`);
              setShowAuthModal(false);
            }, 2000);
          } else if (currentUser) {
            const { data: refreshData, error: refreshError } = await supabase.auth.refreshSession();
            if (refreshError) throw refreshError;

            const refreshedUser = refreshData?.session?.user || await getCurrentUser();
            setUser(refreshedUser);

            const completed = await hasCompletedPayment();
            setPaymentCompleted(completed);

            setTimeout(() => {
              setActivePage(completed ? 'dashboard' : 'pricing');
              setShowAuthModal(false);
            }, 1500);
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setPaymentCompleted(false);
          setActivePage('home');
        }
      } catch (error) {
        console.error('[DEBUG] Error in auth state change handler:', error);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [pendingPaymentPlan]);

  if (isLoading || !sessionChecked) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
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
