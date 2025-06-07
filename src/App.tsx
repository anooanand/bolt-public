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
  const [sessionChecked, setSessionChecked] = useState(false); // FIXED: Added state to track session check

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

          // FIXED: Ensure session is refreshed after payment confirmation
          const { data: sessionData, error: refreshError } = await supabase.auth.refreshSession();
          if (refreshError) throw refreshError;

          // FIXED: Get user from session data directly if available
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

  // FIXED: Added function to initialize auth state
  const initializeAuthState = async () => {
    try {
      console.log("[DEBUG] Initializing auth state");
      setIsLoading(true);
      
      // FIXED: First check if we have a session
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        console.error('[DEBUG] Error getting session:', sessionError);
        setIsLoading(false);
        setSessionChecked(true);
        return;
      }
      
      // If we have a session, get the user
      if (sessionData.session) {
        console.log('[DEBUG] Session found, getting user');
        const currentUser = sessionData.session.user;
        setUser(currentUser);
        
        const completed = await hasCompletedPayment();
        setPaymentCompleted(completed);
      } else {
        console.log('[DEBUG] No session found');
        setUser(null);
      }
      
      // Check URL parameters for payment success
      const urlParams = new URLSearchParams(window.location.search);
      const paymentSuccess = urlParams.get('payment_success');
      const plan = urlParams.get('plan');

      if (paymentSuccess && plan) {
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
    // FIXED: Initialize auth state
    initializeAuthState();
    
    // FIXED: Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("[DEBUG] Auth state change:", event, session?.user?.email);
      
      try {
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          // Use the user from the session directly
          const currentUser = session?.user || null;
          setUser(currentUser);
          
          if (event === 'SIGNED_IN' && pendingPaymentPlan && currentUser) {
            await confirmPayment(pendingPaymentPlan);
            
            // Refresh session after payment confirmation
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
          } else if (event === 'SIGNED_IN' && currentUser) {
            // Refresh session
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
    
    // Clean up subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, [pendingPaymentPlan]); // FIXED: Added pendingPaymentPlan as dependency

  // FIXED: Show loading state until session is checked
  if (isLoading || !sessionChecked) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
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

