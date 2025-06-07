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
  const [pendingPaymentPlan, setPendingPaymentPlan] = useState<string | null>(null);
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  const [debugInfo, setDebugInfo] = useState<any>({});

  // Add debug logging function
  const logDebug = (message: string, data?: any) => {
    console.log(`[DEBUG] ${message}`, data || '');
    setDebugInfo(prev => ({
      ...prev,
      [Date.now()]: { message, data }
    }));
  };

  useEffect(() => {
    logDebug("Environment variables check:");
    logDebug("SUPABASE_URL available:", !!import.meta.env.VITE_SUPABASE_URL);
    logDebug("SUPABASE_ANON_KEY available:", !!import.meta.env.VITE_SUPABASE_ANON_KEY);

    // Check for payment success in URL parameters first
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      
      // Check for both parameter formats (payment_success and paymentSuccess)
      const paymentSuccess = urlParams.get('paymentSuccess') || urlParams.get('payment_success');
      
      // Check for both parameter formats (plan and planType)
      const planType = urlParams.get('planType') || urlParams.get('plan');
      
      logDebug("URL Parameters:", { paymentSuccess, planType });
      logDebug("All URL parameters:", Object.fromEntries(urlParams.entries()));
      
      if (paymentSuccess === 'true' && planType) {
        console.log("Payment success detected:", { paymentSuccess, planType });
        setPendingPaymentPlan(planType);
        setShowPaymentSuccess(true);

        const userEmail = urlParams.get('email') || localStorage.getItem('userEmail');
        if (userEmail) {
          console.log("[DEBUG] User email stored in localStorage:", userEmail);
          localStorage.setItem('userEmail', userEmail);
        }

        const attemptAutoRedirect = async () => {
          const currentUser = await getCurrentUser();
          if (currentUser) {
            console.log("[DEBUG] Auto-redirect: user is already signed in, calling handleAuthSuccess");
            await handleAuthSuccess(currentUser);
          } else {
            console.log("[DEBUG] Auto-redirect: user not signed in, showing auth modal");
            setShowAuthModal(true);
            setAuthMode('signin');
          }
        };

        attemptAutoRedirect();

        window.history.replaceState({}, document.title, window.location.pathname);
      }
    }

    const checkAuth = async () => {
      try {
        logDebug("Starting auth check");
        const currentUser = await getCurrentUser();
        setUser(currentUser);
        logDebug("Current user:", currentUser?.email || 'None');

        if (currentUser && pendingPaymentPlan) {
          logDebug("User found with pending payment plan, confirming payment");
          try {
            await confirmPayment(pendingPaymentPlan);
            const completed = await hasCompletedPayment();
            setPaymentCompleted(completed);
            logDebug("Payment confirmation completed:", completed);

            if (completed) {
              setTimeout(() => {
                setActivePage('dashboard');
                setPendingPaymentPlan(null);
                setShowPaymentSuccess(false);
                window.history.replaceState({}, document.title, window.location.pathname);
                alert(`Welcome! Your ${pendingPaymentPlan} plan is now active. Enjoy your writing assistant!`);
              }, 1000);
            }
          } catch (error) {
            console.error("Error confirming payment:", error);
            alert("There was an error confirming your payment. Please contact support.");
          }
        } else if (currentUser) {
          const completed = await hasCompletedPayment();
          setPaymentCompleted(completed);
          logDebug("Payment status for existing user:", completed);

          if (completed) {
            // User already has payment, go to dashboard
            logDebug("User has completed payment, redirecting to dashboard");
            setActivePage('dashboard');
            setShowPaymentSuccess(false);
          }
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        setAuthError('Failed to authenticate. Please try refreshing the page.');
      }
    };

    const checkAuthWithRetry = async (retries = 2) => {
      for (let attempt = 0; attempt <= retries; attempt++) {
        try {
          logDebug(`Auth check attempt ${attempt + 1}/${retries + 1}`);
          await checkAuth();
          logDebug(`Auth check successful on attempt ${attempt + 1}`);
          setIsLoading(false);
          return;
        } catch (error) {
          if (attempt < retries) {
            const delay = (attempt + 1) * 3000;
            logDebug(`Retrying in ${delay / 1000} seconds...`);
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
      console.log("[DEBUG] Auth state change:", event, session?.user?.email);
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);

        if (event === 'SIGNED_IN' && pendingPaymentPlan) {
          try {
            await confirmPayment(pendingPaymentPlan);
            const { data: refreshData, error: refreshError } = await supabase.auth.refreshSession();
            if (refreshError) throw refreshError;

            const refreshedUser = await getCurrentUser();
            setUser(refreshedUser);
            setPaymentCompleted(true);

            setTimeout(() => {
              setActivePage('dashboard');
              setPendingPaymentPlan(null);
              setShowPaymentSuccess(false);
              window.history.replaceState({}, document.title, window.location.pathname);
              alert(`Welcome! Your ${pendingPaymentPlan} plan is now active. Enjoy your writing assistant!`);
              setShowAuthModal(false);
            }, 2000);
          } catch (error) {
            console.error("[DEBUG] Error confirming payment after sign in:", error);
            alert("There was an error confirming your payment. Please contact support.");
          }
        } else if (event === 'SIGNED_IN') {
          const { data: refreshData, error: refreshError } = await supabase.auth.refreshSession();
          if (!refreshError) {
            const refreshedUser = await getCurrentUser();
            setUser(refreshedUser);
          }

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
        alert("There was an error processing your authentication. Please try again or contact support.");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [theme, pendingPaymentPlan]);

  const handleSignUpClick = () => {
    logDebug("Sign up button clicked");
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
    logDebug("Sign in button clicked");
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

  const handleAuthSuccess = async (user: any) => {
    console.log("[DEBUG] Auth success handler called with user:", user?.email);

    try {
      setUser(user);
      console.log("[DEBUG] User state set directly with received user object");

      if (pendingPaymentPlan) {
        console.log("[DEBUG] Found pending payment plan:", pendingPaymentPlan);
        try {
          console.log("[DEBUG] Attempting to confirm payment for plan:", pendingPaymentPlan);
          await confirmPayment(pendingPaymentPlan);
          console.log("[DEBUG] Payment confirmation successful");

          const { data: refreshData, error: refreshError } = await supabase.auth.refreshSession();
          if (refreshError) throw refreshError;

          const refreshedUser = await getCurrentUser();
          setUser(refreshedUser);
          setPaymentCompleted(true);
          console.log("[DEBUG] Payment completed state set to true");

          setTimeout(() => {
            setActivePage('dashboard');
            setPendingPaymentPlan(null);
            setShowPaymentSuccess(false);
            window.history.replaceState({}, document.title, window.location.pathname);
            alert(`Welcome! Your ${pendingPaymentPlan} plan is now active. Enjoy your writing assistant!`);
          }, 2000);
        } catch (error) {
          console.error("[DEBUG] Error confirming payment:", error);
          alert("There was an error confirming your payment. Please contact support.");
        }
      } else {
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

  // Show payment success page if we have pending payment but no user
  if (showPaymentSuccess && pendingPaymentPlan && !user && !isLoading) {
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
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
          <NavBar 
            onNavigate={setActivePage} 
            activePage={activePage} 
            user={user} 
            onSignInClick={handleSignInClick}
            onSignUpClick={handleSignUpClick}
          />

          <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] pt-16">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
                <p className="text-gray-600 mb-6">
                  Your payment for the <strong>{pendingPaymentPlan.replace(/-/g, ' ')}</strong> plan has been processed successfully. 
                  Please sign in to access your writing dashboard.
                </p>
              </div>
              
              <button
                onClick={handleSignInClick}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 mb-4"
              >
                Sign In to Continue
              </button>
              
              <p className="text-sm text-gray-500">
                Don't have an account?{' '}
                <button
                  onClick={handleSignUpClick}
                  className="text-purple-600 hover:text-purple-700 font-medium"
                >
                  Sign up here
                </button>
              </p>
            </div>
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
              <HeroSection 
                onGetStarted={handleSignUpClick} 
                onStartWriting={() => {
                  if (user && paymentCompleted) {
                    setActivePage('dashboard');
                  } else {
                    setActivePage('pricing');
                  }
                }} 
              />
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
          
          {/* Debug info panel - only visible in development */}
          {import.meta.env.DEV && (
            <div className="fixed bottom-0 right-0 bg-black bg-opacity-80 text-white p-4 max-w-md max-h-64 overflow-auto text-xs">
              <h3 className="font-bold mb-2">Debug Info:</h3>
              <div>
                <p>User: {user ? user.email : 'Not logged in'}</p>
                <p>Payment Completed: {paymentCompleted ? 'Yes' : 'No'}</p>
                <p>Pending Plan: {pendingPaymentPlan || 'None'}</p>
                <p>Active Page: {activePage}</p>
                <p>Show Auth Modal: {showAuthModal ? 'Yes' : 'No'}</p>
                <p>Auth Mode: {authMode}</p>
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