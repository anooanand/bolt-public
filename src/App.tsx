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

  useEffect(() => {
    // Debug environment variables
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

        const redirectTarget = localStorage.getItem('redirect_after_signup');
        if (currentUser && redirectTarget) {
          localStorage.removeItem('redirect_after_signup');
          setActivePage(redirectTarget);
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

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async () => {
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

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme: () => {
      const newTheme = theme === 'light' ? 'dark' : 'light';
      setTheme(newTheme);
      localStorage.setItem('theme', newTheme);
      document.documentElement.classList.toggle('dark', newTheme === 'dark');
    }}}>
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
          onSignInClick={() => {
            setAuthMode('signin');
            setShowAuthModal(true);
          }}
          onSignUpClick={() => {
            setAuthMode('signup');
            setShowAuthModal(true);
          }}
        />

        <div className="pt-16">
          {activePage === 'home' && (
            <>
              <HeroSection onGetStarted={() => setShowAuthModal(true)} onStartWriting={() => setActivePage('dashboard')} />
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
          {activePage === 'signup' && <SignupPage onSignUp={() => setShowAuthModal(true)} />}
          {activePage === 'dashboard' && user && (paymentCompleted) && <WritingArea user={user} />}
        </div>

        <AuthModal 
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onSuccess={async () => {
            const refreshedUser = await getCurrentUser();
            setUser(refreshedUser);
            const completed = await hasCompletedPayment();
            setPaymentCompleted(completed);
            setActivePage('dashboard');
          }}
          initialMode={authMode}
          key={authMode}
        />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
