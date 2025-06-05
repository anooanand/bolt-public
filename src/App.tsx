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

    // Check for payment success in URL parameters first
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const paymentSuccess = urlParams.get('payment_success');
      const planType = urlParams.get('plan');
      
      if (paymentSuccess === 'true' && planType) {
        console.log("Payment success detected:", { paymentSuccess, planType });
        setPendingPaymentPlan(planType);
        
        // Store user email if available
        const userEmail = urlParams.get('email') || localStorage.getItem('userEmail');
        if (userEmail) {
          localStorage.setItem('userEmail', userEmail);
        }
      }
    }

    const checkAuth = async () => {
      try {
        await supabase.auth.refreshSession();
        const currentUser = await getCurrentUser();
        setUser(currentUser);

        const redirectTarget = localStorage.getItem('redirect_after_signup');
        if (currentUser && redirectTarget) {
          localStorage.removeItem('redirect_after_signup');
          setActivePage(redirectTarget);
        }

        if (currentUser) {
          const completed = await hasCompletedPayment();
          console.log("Initial payment completed status:", completed);
          setPaymentCompleted(completed);
          
          // If user is authenticated and we have a pending payment, confirm it
          if (pendingPaymentPlan && !completed) {
            console.log("User authenticated with pending payment, confirming...");
            try {
              await confirmPayment(pendingPaymentPlan);
              setPaymentCompleted(true);
              setActivePage('dashboard');
              setPendingPaymentPlan(null);
              
              // Clean up URL
              if (typeof window !== 'undefined') {
                window.history.replaceState({}, document.title, window.location.pathname);
              }
              
              alert(`Welcome! Your ${pendingPaymentPlan} plan is now active. Enjoy your writing assistant!`);
            } catch (error) {
              console.error("Error confirming payment:", error);
            }
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
      console.log("Auth state change:", event, session?.user?.email);
      try {
        await checkAuth();
        
        // Handle auth success with pending payment
        if (event === 'SIGNED_IN' && pendingPaymentPlan) {
          console.log("User signed in with pending payment, confirming...");
          try {
            await confirmPayment(pendingPaymentPlan);
            setPaymentCompleted(true);
            setActivePage('dashboard');
            setPendingPaymentPlan(null);
            
            // Clean up URL
            if (typeof window !== 'undefined') {
              window.history.replaceState({}, document.title, window.location.pathname);
            }
            
            alert(`Welcome! Your ${pendingPaymentPlan} plan is now active. Enjoy your writing assistant!`);
          } catch (error) {
            console.error("Error confirming payment after sign in:", error);
          }
        }
      } catch (error) {
        console.error('Error in auth state change handler:', error);
        setIsLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [theme, pendingPaymentPlan]);

  const handleSignUpClick = () => {
    console.log("Sign up button clicked");
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
    console.log("Sign in button clicked");
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
    
    // Check if we have a pending payment to confirm
    if (pendingPaymentPlan) {
      console.log("Found pending payment plan:", pendingPaymentPlan);
      try {
        await confirmPayment(pendingPaymentPlan);
        setPaymentCompleted(true);
        setActivePage('dashboard');
        setPendingPaymentPlan(null);
        
        // Clean up URL
        if (typeof window !== 'undefined') {
          window.history.replaceState({}, document.title, window.location.pathname);
        }
        
        alert(`Welcome! Your ${pendingPaymentPlan} plan is now active. Enjoy your writing assistant!`);
        setShowAuthModal(false);
        return;
      } catch (error) {
        console.error("Error confirming payment:", error);
      }
    }
    
    // Check regular payment status
    const completed = await hasCompletedPayment();
    setPaymentCompleted(completed);
    
    if (completed) {
      setActivePage('dashboard');
    } else {
      // Redirect to pricing if no payment found
      setActivePage('pricing');
    }
    
    setShowAuthModal(false);
  };

  // Show payment success page if we have pending payment but no user
  if (pendingPaymentPlan && !user && !isLoading) {
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
                  Your payment has been processed successfully. Please sign in to access your writing dashboard.
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

