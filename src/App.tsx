import React, { useState, useEffect } from 'react';
import { ThemeContext } from './lib/ThemeContext';
import { getCurrentUser, confirmPayment, hasCompletedPayment, supabase } from './lib/supabase';
import { User } from '@supabase/supabase-js';

// Components
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

// Key for storing temporary access timestamp in localStorage
const TEMP_ACCESS_KEY = 'bolt_temp_access_until';
// Temporary access duration in milliseconds (10 minutes)
const TEMP_ACCESS_DURATION = 10 * 60 * 1000;

const PaymentSuccess = () => {
  const [countdown, setCountdown] = useState(5);
  const [processingPayment, setProcessingPayment] = useState(true);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const planType = urlParams.get('plan') || 'base';

    const updatePayment = async () => {
      try {
        // Set temporary access timestamp (current time + 10 minutes)
        const tempAccessUntil = Date.now() + TEMP_ACCESS_DURATION;
        localStorage.setItem(TEMP_ACCESS_KEY, tempAccessUntil.toString());
        console.log("Temporary access granted until:", new Date(tempAccessUntil).toLocaleTimeString());
        
        // Confirm payment and update user metadata (continue in background)
        confirmPayment(planType)
          .then(async () => {
            // Force refresh of the user session to get updated metadata
            await supabase.auth.refreshSession();
            
            // Double-check that payment is confirmed in metadata
            const { data: { user } } = await supabase.auth.getUser();
            console.log("User metadata after payment:", user?.user_metadata);
          })
          .catch(error => {
            console.error('Background payment confirmation failed:', error);
            // Keep temporary access active even if this fails
          });
        
        // Don't wait for payment confirmation to complete
        setProcessingPayment(false);

        const timer = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              // Use absolute path and clear any query parameters
              window.location.href = '/dashboard';
              return 0;
            }
            return prev - 1;
          });
        }, 1000);

        return () => clearInterval(timer);
      } catch (error) {
        console.error('Failed to process payment:', error);
        setProcessingPayment(false);
      }
    };

    updatePayment();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 text-center">
        {processingPayment ? (
          <>
            <div className="w-16 h-16 mx-auto mb-6">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Processing Payment</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Please wait while we confirm your payment...
            </p>
          </>
        ) : (
          <>
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Payment Successful!</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Thank you for your purchase. Your account has been activated and you now have full access to all features.
            </p>
            <p className="text-gray-500 dark:text-gray-400">
              Redirecting to dashboard in {countdown} seconds...
            </p>
          </>
        )}
      </div>
    </div>
  );
};

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [activePage, setActivePage] = useState('home');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [hasTemporaryAccess, setHasTemporaryAccess] = useState(false);
  const [temporaryAccessRemaining, setTemporaryAccessRemaining] = useState<number | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);

  const urlParams = new URLSearchParams(window.location.search);
  const paymentSuccess = urlParams.get('payment_success') === 'true';

  // Check if user has temporary access
  const checkTemporaryAccess = () => {
    const tempAccessUntil = localStorage.getItem(TEMP_ACCESS_KEY);
    if (!tempAccessUntil) return false;
    
    const expiryTime = parseInt(tempAccessUntil, 10);
    const now = Date.now();
    
    // Calculate remaining time in minutes
    const remainingMs = expiryTime - now;
    const remainingMinutes = Math.max(0, Math.ceil(remainingMs / 60000));
    setTemporaryAccessRemaining(remainingMinutes);
    
    // Return true if current time is before expiry
    return now < expiryTime;
  };

  // Function to refresh user data and payment status
  const refreshUserData = async () => {
    try {
      // Force refresh the session to get latest metadata
      await supabase.auth.refreshSession();
      
      // Get updated user data
      const currentUser = await getCurrentUser();
      setUser(currentUser);

      if (currentUser) {
        // Check payment status with fresh data
        const completed = await hasCompletedPayment();
        console.log("Payment completed status:", completed);
        setPaymentCompleted(completed);
        
        // If payment is confirmed, clear temporary access
        if (completed) {
          localStorage.removeItem(TEMP_ACCESS_KEY);
          setHasTemporaryAccess(false);
          setTemporaryAccessRemaining(null);
        } else {
          // Check for temporary access if payment not confirmed
          const tempAccess = checkTemporaryAccess();
          setHasTemporaryAccess(tempAccess);
        }
      }
    } catch (error) {
      console.error('Error refreshing user data:', error);
      // Don't set auth error here as it's not a critical operation
    } finally {
      // Ensure loading state is updated even if there's an error
      setIsLoading(false);
    }
  };

  // Effect to check temporary access periodically
  useEffect(() => {
    // Only run this effect if user is logged in but payment is not completed
    if (!user || paymentCompleted) return;
    
    // Check temporary access immediately
    const tempAccess = checkTemporaryAccess();
    setHasTemporaryAccess(tempAccess);
    
    // Set up interval to check temporary access every minute
    const interval = setInterval(() => {
      const stillHasAccess = checkTemporaryAccess();
      setHasTemporaryAccess(stillHasAccess);
      
      // If temporary access has expired, refresh user data to check if payment was confirmed
      if (!stillHasAccess) {
        refreshUserData();
      }
    }, 60000); // Check every minute
    
    return () => clearInterval(interval);
  }, [user, paymentCompleted]);

  useEffect(() => {
    // Theme preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || savedTheme === 'light') {
      setTheme(savedTheme);
    }
    document.documentElement.classList.toggle('dark', theme === 'dark');

    // Authentication check
    const checkAuth = async () => {
      try {
        // Force refresh the session to get latest metadata
        await supabase.auth.refreshSession();
        
        const currentUser = await getCurrentUser();
        setUser(currentUser);

        // ✅ Check and redirect after signup if flag exists
        const redirectTarget = localStorage.getItem('redirect_after_signup');
        if (currentUser && redirectTarget) {
          localStorage.removeItem('redirect_after_signup');
          setActivePage(redirectTarget);
        }

        if (currentUser) {
          // Check payment status with fresh data
          const completed = await hasCompletedPayment();
          console.log("Initial payment completed status:", completed);
          setPaymentCompleted(completed);
          
          // If payment is not completed, check for temporary access
          if (!completed) {
            const tempAccess = checkTemporaryAccess();
            setHasTemporaryAccess(tempAccess);
          }
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        setAuthError('Failed to authenticate. Please try refreshing the page.');
      } finally {
        // Always set isLoading to false after auth check completes or fails
        // This ensures the app doesn't get stuck in loading state
        setIsLoading(false);
      }
    };

    // Add a timeout to ensure loading state is cleared even if auth check hangs
    const authTimeout = setTimeout(() => {
      setIsLoading(false);
      console.warn('Auth check timed out - forcing app to load anyway');
    }, 10000); // 10 second timeout

    checkAuth().finally(() => {
      // Clear the timeout if auth check completes normally
      clearTimeout(authTimeout);
    });
    
    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async () => {
      try {
        await refreshUserData();
      } catch (error) {
        console.error('Error in auth state change handler:', error);
        // Ensure loading state is updated even if there's an error
        setIsLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
      clearTimeout(authTimeout);
    };
  }, [theme]);

  // Refresh user data when activePage changes to dashboard
  useEffect(() => {
    if (activePage === 'dashboard') {
      refreshUserData();
    }
  }, [activePage]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const handleNavigate = (page: string) => {
    setActivePage(page);
    window.scrollTo(0, 0);
    
    // Refresh user data when navigating to dashboard
    if (page === 'dashboard') {
      refreshUserData();
    }
  };

  const handleSignInClick = () => {
    setAuthMode('signin');
    setShowAuthModal(true);
  };

  const handleSignUpClick = () => {
    setAuthMode('signup');
    setShowAuthModal(true);
  };

  const handleAuthSuccess = async () => {
    await refreshUserData();
    
    if (user && (paymentCompleted || hasTemporaryAccess)) {
      handleNavigate('dashboard');
    }
  };

  const handleStartWriting = () => {
    if (user) {
      handleNavigate('dashboard');
    } else {
      handleSignUpClick();
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (paymentSuccess) {
    return <PaymentSuccess />;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        {authError && (
          <div className="bg-red-50 dark:bg-red-900/30 border-l-4 border-red-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
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
            </div>
          </div>
        )}

        <NavBar 
          onNavigate={handleNavigate} 
          activePage={activePage} 
          user={user} 
          onSignInClick={handleSignInClick}
          onSignUpClick={handleSignUpClick}
        />

        <div className="pt-16">
          {activePage === 'home' && (
            <>
              <HeroSection onGetStarted={handleSignUpClick} onStartWriting={handleStartWriting} />
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

          {activePage === 'dashboard' && user && (paymentCompleted || hasTemporaryAccess) && (
            <>
              {hasTemporaryAccess && !paymentCompleted && (
                <div className="bg-yellow-50 dark:bg-yellow-900/30 border-l-4 border-yellow-400 p-4 mb-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700 dark:text-yellow-200">
                        You have temporary access for {temporaryAccessRemaining} {temporaryAccessRemaining === 1 ? 'minute' : 'minutes'}. 
                        <a href="/pricing" className="font-medium underline text-yellow-700 dark:text-yellow-100 hover:text-yellow-600">
                          Complete your subscription
                        </a> to maintain access.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              <WritingArea user={user} />
            </>
          )}

          {activePage === 'dashboard' && user && !paymentCompleted && !hasTemporaryAccess && (
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center max-w-md p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Complete Your Subscription</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Your account has been created, but you need to complete your subscription to access all features.
                </p>
                <button 
                  onClick={() => handleNavigate('pricing')}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  View Plans
                </button>
              </div>
            </div>
          )}

          {activePage === 'dashboard' && !user && (
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Please sign in to access your dashboard</h2>
                <button 
                  onClick={handleSignInClick}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
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
          key={authMode}
        />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
