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

    const checkAuth = async () => {
      try {
        await supabase.auth.refreshSession();
        const currentUser = await getCurrentUser();
        setUser(currentUser);

        // IMPROVED REDIRECT HANDLING
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

  // IMPROVED SUCCESS HANDLER
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

