import React, { useEffect, useState } from 'react';
import { ThemeContext } from './lib/ThemeContext';
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

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [activePage, setActivePage] = useState('home');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  const [pendingPaymentPlan, setPendingPaymentPlan] = useState<string | null>(null);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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

          const { error: refreshError } = await supabase.auth.refreshSession();
          if (refreshError) throw refreshError;

          const refreshedUser = await getCurrentUser();
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

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);

        const urlParams = new URLSearchParams(window.location.search);
        const paymentSuccess = urlParams.get('payment_success');
        const plan = urlParams.get('plan');

        if (paymentSuccess && plan) {
          setShowPaymentSuccess(true);
          setPendingPaymentPlan(plan);
        }

        if (currentUser) {
          const completed = await hasCompletedPayment();
          setPaymentCompleted(completed);
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
    console.log("[DEBUG] Auth state change:", event, session?.user?.email);
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);

      if (event === 'SIGNED_IN' && pendingPaymentPlan) {
        await confirmPayment(pendingPaymentPlan);
        await supabase.auth.refreshSession();
        const refreshedUser = await getCurrentUser();
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
      } else if (event === 'SIGNED_IN') {
        await supabase.auth.refreshSession();
        const refreshedUser = await getCurrentUser();
        setUser(refreshedUser);

        const completed = await hasCompletedPayment();
        setPaymentCompleted(completed);

        setTimeout(() => {
          setActivePage(completed ? 'dashboard' : 'pricing');
          setShowAuthModal(false);
        }, 1500);
      }

      setIsLoading(false);
    } catch (error) {
      console.error('[DEBUG] Error in auth state change handler:', error);
      setIsLoading(false);
    }
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ThemeContext.Provider value={{}}>
        <NavBar onAuthSuccess={handleAuthSuccess} showAuthModal={showAuthModal} setShowAuthModal={setShowAuthModal} />
        {showPaymentSuccess ? (
          <PaymentSuccessPage
            plan={pendingPaymentPlan || 'unknown'}
            onSuccess={handleAuthSuccess}
            onSignInRequired={(email, plan) => {
              localStorage.setItem('userEmail', email);
              setPendingPaymentPlan(plan);
              setShowAuthModal(true);
            }}
          />
        ) : activePage === 'pricing' ? (
          <PricingPage />
        ) : (
          <>
            <HeroSection />
            <FeaturesSection />
            <ToolsSection />
            <WritingTypesSection />
          </>
        )}
        <Footer />
      </ThemeContext.Provider>
    </>
  );
}

export default App;

