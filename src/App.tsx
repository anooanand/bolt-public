import React, { useState, useEffect } from 'react';
import { ThemeContext } from './lib/ThemeContext';
import { getCurrentUser } from './lib/supabase';
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

// Payment success component
const PaymentSuccess = () => {
  const [countdown, setCountdown] = useState(5);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = '/'; // Redirect to home after countdown
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 text-center">
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

  // Check for payment success URL parameter
  const urlParams = new URLSearchParams(window.location.search);
  const paymentSuccess = urlParams.get('payment_success') === 'true';

  useEffect(() => {
    // Check if user prefers dark mode
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || savedTheme === 'light') {
      setTheme(savedTheme);
    }
    
    // Apply theme to document
    document.documentElement.classList.toggle('dark', theme === 'dark');
    
    // Check authentication status
    const checkAuth = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Error checking auth status:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const handleNavigate = (page: string) => {
    setActivePage(page);
    window.scrollTo(0, 0);
  };

  const handleSignInClick = () => {
    setAuthMode('signin');
    setShowAuthModal(true);
  };

  const handleSignUpClick = () => {
    setAuthMode('signup');
    setShowAuthModal(true);
  };

  const handleAuthSuccess = () => {
    // Refresh user data after successful authentication
    getCurrentUser().then(setUser);
  };

  // Render loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  // Render payment success page if URL parameter is present
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
        
        <div className="pt-16"> {/* Add padding to account for fixed navbar */}
          {activePage === 'home' && (
            <>
              <HeroSection onGetStarted={() => handleNavigate('signup')} />
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
          {activePage === 'signup' && <SignupPage />}
          
          {activePage === 'dashboard' && user && (
            <WritingArea user={user} />
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
        />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
