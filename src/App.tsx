import React, { useState, useEffect } from 'react';
import { ThemeContext } from './lib/ThemeContext';
import { getCurrentUser, confirmPayment, hasCompletedPayment, supabase } from './lib/supabase';
import { User } from '@supabase/supabase-js';

import { NavBar } from './components/NavBar';
import { HeroSection } from './components/HeroSection';
import { FeaturesSection } from './components/FeaturesSection';
import { ToolsSection } from './components/ToolsSection';
import { WritingTypesSection } from './components/WritingTypesSection';
import { WritingModesSection } from './components/WritingModesSection';
import { HowItWorks } from './components/HowItWorks';
import { AboutPage } from './components/AboutPage';
import { FAQPage } from './components/FAQPage';
import { PricingPage } from './components/PricingPage';
import { AuthModal } from './components/AuthModal';
import { SignupPage } from './components/SignupPage';
import { WritingArea } from './components/WritingArea';
import DebugEnv from './components/DebugEnv';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [activePage, setActivePage] = useState('home');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [modalKey, setModalKey] = useState(0);
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  // PAYMENT SUCCESS HANDLER
  const handlePaymentSuccess = async (plan: string) => {
    console.log("Processing payment success for plan:", plan);
    setPaymentProcessing(true);
    
    try {
      // Get user email from localStorage (set during signup/payment)
      const userEmail = localStorage.getItem('userEmail');
      console.log("User email from localStorage:", userEmail);
      
      if (!userEmail) {
        console.error("No user email found - cannot confirm payment");
        alert("Payment successful, but we couldn't find your account. Please contact support.");
        return;
      }
      
      // Try to sign in the user with their email (they should have an account from signup)
      // First, let's check if there's already a session
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        console.log("No active session - need to establish user session");
        
        // For now, we'll create a temporary session by updating the user's payment status
        // In a real implementation, you'd want to use a secure token or have the user sign in
        
        // Alternative approach: Show a success message and ask user to sign in
        const shouldSignIn = confirm(
          `Payment successful for ${plan} plan! Please sign in to access your dashboard.`
        );
        
        if (shouldSignIn) {
          setAuthMode('signin');
          setShowAuthModal(true);
          return;
        }
      }
      
      // If we have a session, confirm the payment
      if (session?.user) {
        console.log("Confirming payment for user:", session.user.email);
        await confirmPayment(plan);
        
        // Update local state
        setUser(session.user);
        setPaymentCompleted(true);
        setActivePage('dashboard');
        
        console.log("Payment confirmed successfully - redirecting to dashboard");
        
        // Clean up URL parameters
        window.history.replaceState({}, document.title, window.location.pathname);
        
        // Show success message
        alert(`Welcome! Your ${plan} plan is now active. Enjoy your writing assistant!`);
      }
      
    } catch (error) {
      console.error("Error processing payment success:", error);
      alert("Payment was successful, but there was an error setting up your account. Please contact support.");
    } finally {
      setPaymentProcessing(false);
    }
  };

  useEffect(() => {
    console.log("Environment variables check:");
    console.log("SUPABASE_URL available:", !!import.meta.env.VITE_SUPABASE_URL);
    console.log("SUPABASE_ANON_KEY available:", !!import.meta.env.VITE_SUPABASE_ANON_KEY);
    if (import.meta.env.VITE_SUPABASE_URL) {
      console.log("SUPABASE_URL prefix:", import.meta.env.VITE_SUPABASE_URL.substring(0, 15) + "...");
    }
    if (import.meta.env.VITE_SUPABASE_ANON_KEY) {
      console.log("SUPABASE_ANON_KEY prefix:", import.meta.env.VITE_SUPABASE_ANON_KEY.substring(0, 15) + "...");
    }

    // CHECK FOR PAYMENT SUCCESS URL PARAMETERS
    const urlParams = new URLSearchParams(window.location.search);
    const paymentSuccess = urlParams.get('payment_success');
    const planType = urlParams.get('plan');
    
    if (paymentSuccess === 'true' && planType) {
      console.log("Payment success detected:", { paymentSuccess, planType });
      
      // Handle payment success
      setTimeout(() => {
        handlePaymentSuccess(planType);
      }, 1000); // Small delay to ensure page is loaded
    }

    const checkAuth = async () => {
      try {
        await supabase.auth.refreshSession();
        const currentUser = await getCurrentUser();
        setUser(currentUser);

        // Handle redirect after signup
        const redirectTarget = localStorage.getItem('redirect_after_signup');
        if (currentUser && redirectTarget) {
          console.log("Found redirect target:", redirectTarget);
          localStorage.removeItem('redirect_after_signup');
          
          if (redirectTarget === 'pricing') {
            console.log("Redirecting to pricing page");
            setActivePage('pricing');
          } else {
            setActivePage(redirectTarget);
          }
        }

        // Check for URL hash-based navigation (for pricing redirect)
        if (window.location.hash === '#pricing') {
          console.log("Hash-based navigation to pricing");
          setActivePage('pricing');
          // Clear the hash
          window.history.replaceState(null, '', window.location.pathname);
        }

        if (currentUser) {
          const completed = await hasCompletedPayment();
          console.log("Initial payment completed status:", completed);
          setPaymentCompleted(completed);
          
          // If user has completed payment, show dashboard
          if (completed && activePage === 'home') {
            setActivePage('dashboard');
          }
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        setAuthError('Failed to authenticate. Please try refreshing the page.');
        throw error;
      }
    };

    const checkAuthWithRetry = async (retries = 2) => {
      for (let attempt = 0; attempt <= retries; attempt++) {
        try {
          console.log(`Auth check attempt ${attempt + 1}/${retries + 1}`);
          await checkAuth();
          console.log(`Auth check successful on attempt ${attempt + 1}`);
          setIsLoading(false);
          return;
        } catch (error) {
          if (attempt < retries) {
            const delay = (attempt + 1) * 3000;
            console.log(`Retrying in ${delay / 1000} seconds...`);
            await new Promise(resolve => setTimeout(resolve, delay));
          } else {
            console.error('All auth check attempts failed');
            setIsLoading(false);
            setAuthError('Authentication service is currently unavailable. Some features may be limited.');
          }
        }
      }
    };

    checkAuthWithRetry();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state change:", event, !!session);
      
      try {
        await checkAuth();
      } catch (error) {
        console.error('Error in auth state change handler:', error);
        setIsLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [theme]);

  const handleSignUpClick = () => {
    if (showAuthModal) {
      setShowAuthModal(false);
      setTimeout(() => {
        setAuthMode('signup');
        setModalKey(prevKey => prevKey + 1);
        setShowAuthModal(true);
      }, 50);
    } else {
      setAuthMode('signup');
      setModalKey(prevKey => prevKey + 1);
      setShowAuthModal(true);
    }
  };

  const handleSignInClick = () => {
    if (showAuthModal) {
      setShowAuthModal(false);
      setTimeout(() => {
        setAuthMode('signin');
        setModalKey(prevKey => prevKey + 1);
        setShowAuthModal(true);
      }, 50);
    } else {
      setAuthMode('signin');
      setModalKey(prevKey => prevKey + 1);
      setShowAuthModal(true);
    }
  };

  const handleAuthSuccess = async () => {
    console.log("Auth success - refreshing user state");
    
    const refreshedUser = await getCurrentUser();
    setUser(refreshedUser);
    
    const completed = await hasCompletedPayment();
    setPaymentCompleted(completed);
    
    // If user has completed payment, go to dashboard
    if (completed) {
      setActivePage('dashboard');
    } else {
      // Otherwise, they should be on pricing page (handled by AuthModal)
      console.log("User authenticated but no payment - should be on pricing");
    }
  };

  // Show loading screen while processing payment
  if (paymentProcessing) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Processing Your Payment
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Please wait while we set up your account...
          </p>
        </div>
      </div>
    );
  }

  return (
    <ThemeContext.Provider value={{
      theme,
      toggleTheme: () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
      }
    }}>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        {authError && (
          <div className="bg-red-50 dark:bg-red-900/30 border-l-4 border-red-400 p-4">
            <p className="text-sm text-red-700 dark:text-red-200">
              {authError}
              <button 
                onClick={() => window.location.reload()} 
                className="ml-2 font-medium underline text-red-700 dark:text-red-100 hover:text-red-600"
              >
                Refresh
              </button>
            </p>
          </div>
        )}

        <NavBar 
          onNavigate={setActivePage} 
          activePage={activePage} 
          user={user} 
          onSignInClick={handleSignInClick}
          onSignUpClick={handleSignUpClick}
        />

        <div className="pt-16">
          {activePage === 'home' && (
            <>
              <HeroSection onGetStarted={() => setShowAuthModal(true)} onStartWriting={() => setActivePage('dashboard')} />
              <DebugEnv />
              <FeaturesSection />
              <ToolsSection />
              <WritingTypesSection />
              <WritingModesSection />
              <HowItWorks />
            </>
          )}

          {activePage === 'about' && <AboutPage />}
          {activePage === 'faq' && <FAQPage />}
          {activePage === 'pricing' && <PricingPage />}
          {activePage === 'signup' && <SignupPage onSignUp={handleSignUpClick} />}
          {activePage === 'dashboard' && user && paymentCompleted && <WritingArea user={user} />}
          
          {/* Show message if user tries to access dashboard without payment */}
          {activePage === 'dashboard' && user && !paymentCompleted && (
            <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
              <div className="text-center max-w-md mx-auto p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Subscription Required
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  You need an active subscription to access the writing dashboard.
                </p>
                <button
                  onClick={() => setActivePage('pricing')}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md"
                >
                  View Pricing Plans
                </button>
              </div>
            </div>
          )}
          
          {/* Show message if no user tries to access dashboard */}
          {activePage === 'dashboard' && !user && (
            <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
              <div className="text-center max-w-md mx-auto p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Sign In Required
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Please sign in to access your writing dashboard.
                </p>
                <button
                  onClick={handleSignInClick}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md"
                >
                  Sign In
                </button>
              </div>
            </div>
          )}
        </div>

        <AuthModal 
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onSuccess={handleAuthSuccess}
          initialMode={authMode}
          key={`auth-modal-${modalKey}-${authMode}`}
        />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;

