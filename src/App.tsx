import React, { useState, useEffect } from 'react';
import { getCurrentUser, signOut, confirmPayment } from './lib/supabase';
import AuthModal from './components/AuthModal';
import PricingPage from './components/PricingPage';
import WritingArea from './components/WritingArea';
import HomePage from './components/HomePage';

// Define types for better TypeScript support
interface User {
  id: string;
  email?: string;
  user_metadata?: {
    payment_confirmed?: boolean;
    signup_completed?: boolean;
    plan_type?: string;
    subscription_status?: string;
    payment_date?: string;
  };
}

type PageType = 'home' | 'features' | 'about' | 'pricing' | 'faq' | 'dashboard';
type AuthMode = 'signin' | 'signup';

function App(): JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<AuthMode>('signin');
  const [activePage, setActivePage] = useState<PageType>('home');
  const [paymentCompleted, setPaymentCompleted] = useState<boolean>(false);
  const [pendingPaymentPlan, setPendingPaymentPlan] = useState<string | null>(null);

  useEffect(() => {
    checkAuthStatus();
    
    // Check for payment success in URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const paymentSuccess = urlParams.get('payment_success');
    const planType = urlParams.get('plan');
    
    if (paymentSuccess === 'true' && planType) {
      console.log("Payment success detected:", { paymentSuccess, planType });
      
      // Store the plan type for after authentication
      setPendingPaymentPlan(planType);
      
      // Handle payment success
      setTimeout(() => {
        handlePaymentSuccess(planType);
      }, 1000);
    }
  }, []);

  const checkAuthStatus = async (): Promise<void> => {
    try {
      console.log("Auth check attempt 1/3");
      const currentUser = await getCurrentUser();
      console.log("Auth check successful on attempt 1");
      
      if (currentUser) {
        setUser(currentUser);
        
        // Check payment status
        const paymentConfirmed = currentUser.user_metadata?.payment_confirmed || 
                               currentUser.user_metadata?.signup_completed ||
                               false;
        
        console.log("Payment status check:", { paymentConfirmed });
        
        if (paymentConfirmed) {
          setPaymentCompleted(true);
          setActivePage('dashboard');
        } else {
          console.log("User authenticated but no payment - should be on pricing");
          setActivePage('pricing');
        }
      } else {
        console.log("No authenticated user found");
        setActivePage('home');
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      setActivePage('home');
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = async (planType: string): Promise<void> => {
    console.log("Processing payment success for plan:", planType);
    
    // Get user email from localStorage (stored during signup/signin)
    const userEmail = typeof window !== 'undefined' ? localStorage.getItem('userEmail') : null;
    console.log("User email from localStorage:", userEmail);
    
    if (!userEmail) {
      console.log("No user email found - need to establish user session");
      // Show sign-in modal to establish user session
      setAuthMode('signin');
      setShowAuthModal(true);
      return;
    }

    // Check if user is already authenticated
    const currentUser = await getCurrentUser();
    if (currentUser) {
      console.log("User already authenticated, confirming payment");
      try {
        await confirmPayment(planType);
        setPaymentCompleted(true);
        setActivePage('dashboard');
        setPendingPaymentPlan(null);
        
        // Clean up URL parameters
        if (typeof window !== 'undefined') {
          window.history.replaceState({}, document.title, window.location.pathname);
        }
        
        alert(`Welcome! Your ${planType} plan is now active. Enjoy your writing assistant!`);
      } catch (error) {
        console.error("Error confirming payment:", error);
        alert("There was an error activating your subscription. Please contact support.");
      }
    } else {
      console.log("No active session - need to establish user session");
      // Show sign-in modal
      setAuthMode('signin');
      setShowAuthModal(true);
    }
  };

  const handleAuthSuccess = async (): Promise<void> => {
    console.log("Auth success - refreshing user state");
    
    const refreshedUser = await getCurrentUser();
    setUser(refreshedUser);
    
    // Check if there's a pending payment to confirm
    if (pendingPaymentPlan) {
      console.log("Found pending payment plan:", pendingPaymentPlan);
      
      try {
        console.log("Confirming payment for user after authentication");
        await confirmPayment(pendingPaymentPlan);
        
        // Update payment status
        setPaymentCompleted(true);
        
        // Navigate to dashboard
        setActivePage('dashboard');
        
        // Clear pending payment
        setPendingPaymentPlan(null);
        
        // Clean up URL parameters
        if (typeof window !== 'undefined') {
          window.history.replaceState({}, document.title, window.location.pathname);
        }
        
        // Show success message
        alert(`Welcome! Your ${pendingPaymentPlan} plan is now active. Enjoy your writing assistant!`);
        
        return;
      } catch (error) {
        console.error("Error confirming payment after authentication:", error);
        alert("There was an error activating your subscription. Please contact support.");
      }
    }
    
    // Check for payment success URL parameters again (in case they were missed)
    const urlParams = new URLSearchParams(window.location.search);
    const paymentSuccess = urlParams.get('payment_success');
    const planType = urlParams.get('plan');
    
    if (paymentSuccess === 'true' && planType) {
      console.log("Found payment success parameters after auth:", { paymentSuccess, planType });
      try {
        await confirmPayment(planType);
        setPaymentCompleted(true);
        setActivePage('dashboard');
        
        // Clean up URL parameters
        if (typeof window !== 'undefined') {
          window.history.replaceState({}, document.title, window.location.pathname);
        }
        
        alert(`Welcome! Your ${planType} plan is now active. Enjoy your writing assistant!`);
        return;
      } catch (error) {
        console.error("Error confirming payment from URL params:", error);
      }
    }
    
    // Check payment status from user metadata
    const paymentConfirmed = refreshedUser?.user_metadata?.payment_confirmed || 
                           refreshedUser?.user_metadata?.signup_completed ||
                           false;
    
    console.log("Payment status after auth:", { paymentConfirmed });
    
    if (paymentConfirmed) {
      setPaymentCompleted(true);
      setActivePage('dashboard');
    } else {
      console.log("No payment found after authentication - redirecting to pricing");
      setActivePage('pricing');
    }
    
    setShowAuthModal(false);
  };

  const handleSignOut = async (): Promise<void> => {
    try {
      await signOut();
      setUser(null);
      setPaymentCompleted(false);
      setActivePage('home');
      setPendingPaymentPlan(null);
      
      // Clear any stored user data
      if (typeof window !== 'undefined') {
        localStorage.removeItem('userEmail');
        
        // Clean up URL parameters
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handlePaymentComplete = async (planType: string): Promise<void> => {
    console.log("Payment completed for plan:", planType);
    
    try {
      // Confirm payment in the system
      await confirmPayment(planType);
      
      // Update state
      setPaymentCompleted(true);
      setActivePage('dashboard');
      
      // Show success message
      alert(`Welcome! Your ${planType} plan is now active. Enjoy your writing assistant!`);
    } catch (error) {
      console.error("Error confirming payment:", error);
      alert("There was an error activating your subscription. Please contact support.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show sign-in required page if we have pending payment but no user
  if (pendingPaymentPlan && !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
        <nav className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Bolt Writing Assistant
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => {
                    setAuthMode('signin');
                    setShowAuthModal(true);
                  }}
                  className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium border border-gray-300 hover:border-purple-300"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    setAuthMode('signup');
                    setShowAuthModal(true);
                  }}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </nav>

        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
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
              onClick={() => {
                setAuthMode('signin');
                setShowAuthModal(true);
              }}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200"
            >
              Sign In to Continue
            </button>
            
            <p className="text-sm text-gray-500 mt-4">
              Don't have an account?{' '}
              <button
                onClick={() => {
                  setAuthMode('signup');
                  setShowAuthModal(true);
                }}
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                Sign up here
              </button>
            </p>
          </div>
        </div>

        {showAuthModal && (
          <AuthModal
            mode={authMode}
            onClose={() => setShowAuthModal(false)}
            onSuccess={handleAuthSuccess}
            onSwitchMode={(mode: AuthMode) => setAuthMode(mode)}
          />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Bolt Writing Assistant
              </h1>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <button
                  onClick={() => setActivePage('home')}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    activePage === 'home'
                      ? 'text-purple-600 bg-purple-50'
                      : 'text-gray-700 hover:text-purple-600'
                  }`}
                >
                  Home
                </button>
                <button
                  onClick={() => setActivePage('features')}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    activePage === 'features'
                      ? 'text-purple-600 bg-purple-50'
                      : 'text-gray-700 hover:text-purple-600'
                  }`}
                >
                  Features
                </button>
                <button
                  onClick={() => setActivePage('about')}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    activePage === 'about'
                      ? 'text-purple-600 bg-purple-50'
                      : 'text-gray-700 hover:text-purple-600'
                  }`}
                >
                  About
                </button>
                <button
                  onClick={() => setActivePage('pricing')}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    activePage === 'pricing'
                      ? 'text-purple-600 bg-purple-50'
                      : 'text-gray-700 hover:text-purple-600'
                  }`}
                >
                  Pricing
                </button>
                <button
                  onClick={() => setActivePage('faq')}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    activePage === 'faq'
                      ? 'text-purple-600 bg-purple-50'
                      : 'text-gray-700 hover:text-purple-600'
                  }`}
                >
                  FAQ
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  {paymentCompleted && (
                    <button
                      onClick={() => setActivePage('dashboard')}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                    >
                      Dashboard
                    </button>
                  )}
                  <span className="text-gray-700 text-sm">
                    {user.email}
                  </span>
                  <button
                    onClick={handleSignOut}
                    className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setAuthMode('signin');
                      setShowAuthModal(true);
                    }}
                    className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium border border-gray-300 hover:border-purple-300"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => {
                      setAuthMode('signup');
                      setShowAuthModal(true);
                    }}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        {activePage === 'home' && <HomePage />}
        {activePage === 'pricing' && (
          <PricingPage 
            user={user} 
            onPaymentComplete={handlePaymentComplete}
          />
        )}
        {activePage === 'dashboard' && paymentCompleted && (
          <WritingArea user={user} />
        )}
        {activePage === 'features' && (
          <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-center mb-8">Features</h1>
            <p className="text-center text-gray-600">Features page content coming soon...</p>
          </div>
        )}
        {activePage === 'about' && (
          <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-center mb-8">About</h1>
            <p className="text-center text-gray-600">About page content coming soon...</p>
          </div>
        )}
        {activePage === 'faq' && (
          <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-center mb-8">FAQ</h1>
            <p className="text-center text-gray-600">FAQ page content coming soon...</p>
          </div>
        )}
      </main>

      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal
          mode={authMode}
          onClose={() => setShowAuthModal(false)}
          onSuccess={handleAuthSuccess}
          onSwitchMode={(mode: AuthMode) => setAuthMode(mode)}
        />
      )}
    </div>
  );
}

export default App;

