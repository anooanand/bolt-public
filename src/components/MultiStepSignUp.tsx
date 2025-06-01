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

const PaymentSuccess = () => {
  const [countdown, setCountdown] = useState(5);
  const [processingPayment, setProcessingPayment] = useState(true);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const planType = urlParams.get('plan') || 'base';

    const updatePayment = async () => {
      try {
        // Confirm payment and update user metadata
        await confirmPayment(planType);
        
        // Force refresh of the user session to get updated metadata
        await supabase.auth.refreshSession();
        
        // Double-check that payment is confirmed in metadata
        const { data: { user } } = await supabase.auth.getUser();
        console.log("User metadata after payment:", user?.user_metadata);
        
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
        console.error('Failed to confirm payment:', error);
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

  const urlParams = new URLSearchParams(window.location.search);
  const paymentSuccess = urlParams.get('payment_success') === 'true';

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
      }
    } catch (error) {
      console.error('Error refreshing user data:', error);
    }
  };

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
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
    
    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async () => {
      await refreshUserData();
    });

    return () => {
      subscription.unsubscribe();
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
    
    if (user && paymentCompleted) {
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

          {activePage === 'dashboard' && user && paymentCompleted && (
            <WritingArea user={user} />
          )}

          {activePage === 'dashboard' && user && !paymentCompleted && (
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

const PaymentSuccess = () => {
  const [countdown, setCountdown] = useState(5);
  const [processingPayment, setProcessingPayment] = useState(true);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const planType = urlParams.get('plan') || 'base';

    const updatePayment = async () => {
      try {
        // Confirm payment and update user metadata
        await confirmPayment(planType);
        
        // Force refresh of the user session to get updated metadata
        await supabase.auth.refreshSession();
        
        // Double-check that payment is confirmed in metadata
        const { data: { user } } = await supabase.auth.getUser();
        console.log("User metadata after payment:", user?.user_metadata);
        
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
        console.error('Failed to confirm payment:', error);
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

  const urlParams = new URLSearchParams(window.location.search);
  const paymentSuccess = urlParams.get('payment_success') === 'true';

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
      }
    } catch (error) {
      console.error('Error refreshing user data:', error);
    }
  };

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
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
    
    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async () => {
      await refreshUserData();
    });

    return () => {
      subscription.unsubscribe();
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
    
    if (user && paymentCompleted) {
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

          {activePage === 'dashboard' && user && paymentCompleted && (
            <WritingArea user={user} />
          )}

          {activePage === 'dashboard' && user && !paymentCompleted && (
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
