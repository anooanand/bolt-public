import React, { useState, useEffect } from 'react';

// Safe component imports with fallbacks
let getCurrentUser, signOut, confirmPayment;
try {
  const supabaseModule = require('./lib/supabase');
  getCurrentUser = supabaseModule.getCurrentUser || (() => Promise.resolve(null));
  signOut = supabaseModule.signOut || (() => Promise.resolve());
  confirmPayment = supabaseModule.confirmPayment || (() => Promise.resolve());
} catch (e) {
  console.warn('Supabase module not found, using fallbacks');
  getCurrentUser = () => Promise.resolve(null);
  signOut = () => Promise.resolve();
  confirmPayment = () => Promise.resolve();
}

// Safe component imports with fallbacks
let AuthModal, PricingPage, WritingArea;
try {
  AuthModal = require('./components/AuthModal').default || (() => <div>AuthModal component missing</div>);
} catch (e) {
  AuthModal = () => <div>AuthModal component missing</div>;
}

try {
  PricingPage = require('./components/PricingPage').default || (() => <div>PricingPage component missing</div>);
} catch (e) {
  PricingPage = () => <div>PricingPage component missing</div>;
}

try {
  WritingArea = require('./components/WritingArea').default || (() => <div>WritingArea component missing</div>);
} catch (e) {
  WritingArea = () => <div>WritingArea component missing</div>;
}

// Original homepage sections with fallbacks
let HeroSection, FeaturesSection, ToolsSection, WritingTypesSection, WritingModesSection, HowItWorks;

try {
  HeroSection = require('./components/HeroSection').HeroSection || (() => (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-indigo-50 pt-20 pb-16 md:pt-32 md:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
              Boost Your Child's Selective Exam Score
            </span>
            <br />
            <span className="text-gray-900">with AI-Powered Writing Practice</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Master narrative, persuasive, and creative writing with personalized AI guidance. Join thousands of students preparing for NSW Selective exams.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
            <button className="px-8 py-4 text-lg font-semibold rounded-md bg-indigo-600 hover:bg-indigo-700 text-white transition-all duration-200">
              View Pricing
            </button>
            <button className="px-8 py-4 text-lg font-semibold rounded-md border border-gray-300 text-gray-900 hover:bg-gray-50 transition-all duration-200">
              Start Writing
            </button>
          </div>
        </div>
      </div>
    </section>
  ));
} catch (e) {
  HeroSection = ({ onGetStarted, onStartWriting }) => (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-indigo-50 pt-20 pb-16 md:pt-32 md:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
              Boost Your Child's Selective Exam Score
            </span>
            <br />
            <span className="text-gray-900">with AI-Powered Writing Practice</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Master narrative, persuasive, and creative writing with personalized AI guidance. Join thousands of students preparing for NSW Selective exams.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
            <button 
              onClick={onGetStarted}
              className="px-8 py-4 text-lg font-semibold rounded-md bg-indigo-600 hover:bg-indigo-700 text-white transition-all duration-200"
            >
              View Pricing
            </button>
            <button 
              onClick={onStartWriting}
              className="px-8 py-4 text-lg font-semibold rounded-md border border-gray-300 text-gray-900 hover:bg-gray-50 transition-all duration-200"
            >
              Start Writing
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// Fallback components for other sections
try {
  FeaturesSection = require('./components/FeaturesSection').FeaturesSection || (() => (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <h3 className="text-xl font-semibold mb-4">AI-Powered Guidance</h3>
            <p className="text-gray-600">Get personalized feedback and suggestions to improve your writing.</p>
          </div>
          <div className="text-center p-6">
            <h3 className="text-xl font-semibold mb-4">NSW Selective Focus</h3>
            <p className="text-gray-600">Specifically designed for NSW Selective exam preparation.</p>
          </div>
          <div className="text-center p-6">
            <h3 className="text-xl font-semibold mb-4">Progress Tracking</h3>
            <p className="text-gray-600">Monitor your improvement with detailed analytics.</p>
          </div>
        </div>
      </div>
    </section>
  ));
} catch (e) {
  FeaturesSection = () => (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <h3 className="text-xl font-semibold mb-4">AI-Powered Guidance</h3>
            <p className="text-gray-600">Get personalized feedback and suggestions to improve your writing.</p>
          </div>
          <div className="text-center p-6">
            <h3 className="text-xl font-semibold mb-4">NSW Selective Focus</h3>
            <p className="text-gray-600">Specifically designed for NSW Selective exam preparation.</p>
          </div>
          <div className="text-center p-6">
            <h3 className="text-xl font-semibold mb-4">Progress Tracking</h3>
            <p className="text-gray-600">Monitor your improvement with detailed analytics.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// Create fallback components for other sections
const createFallbackSection = (title, description) => () => (
  <section className="py-16 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-3xl font-bold mb-6">{title}</h2>
      <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>
    </div>
  </section>
);

try {
  ToolsSection = require('./components/ToolsSection').ToolsSection;
} catch (e) {
  ToolsSection = createFallbackSection("Writing Tools", "Powerful tools to enhance your writing skills and creativity.");
}

try {
  WritingTypesSection = require('./components/WritingTypesSection').WritingTypesSection;
} catch (e) {
  WritingTypesSection = createFallbackSection("Writing Types", "Master different types of writing including narrative, persuasive, and creative writing.");
}

try {
  WritingModesSection = require('./components/WritingModesSection').WritingModesSection;
} catch (e) {
  WritingModesSection = createFallbackSection("Writing Modes", "Practice with various writing modes tailored to your skill level.");
}

try {
  HowItWorks = require('./components/HowItWorks').HowItWorks;
} catch (e) {
  HowItWorks = createFallbackSection("How It Works", "Simple steps to get started with your writing journey and achieve better results.");
}

// HomePage component
function HomePage({ onGetStarted, onStartWriting }) {
  return (
    <div className="min-h-screen">
      <HeroSection onGetStarted={onGetStarted} onStartWriting={onStartWriting} />
      <FeaturesSection />
      <ToolsSection />
      <WritingTypesSection />
      <WritingModesSection />
      <HowItWorks />
    </div>
  );
}

// Simplified interfaces
interface AppUser {
  id: string;
  email?: string;
  user_metadata?: Record<string, any>;
}

type PageType = 'home' | 'features' | 'about' | 'pricing' | 'faq' | 'dashboard';
type AuthMode = 'signin' | 'signup';

function App() {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>('signin');
  const [activePage, setActivePage] = useState<PageType>('home');
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [pendingPaymentPlan, setPendingPaymentPlan] = useState<string | null>(null);

  useEffect(() => {
    checkAuthStatus();
    
    // Check for payment success in URL parameters
    if (typeof window !== 'undefined') {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const paymentSuccess = urlParams.get('payment_success');
        const planType = urlParams.get('plan');
        
        if (paymentSuccess === 'true' && planType) {
          console.log("Payment success detected:", { paymentSuccess, planType });
          setPendingPaymentPlan(planType);
          
          setTimeout(() => {
            handlePaymentSuccess(planType);
          }, 1000);
        }
      } catch (error) {
        console.warn('Error checking URL parameters:', error);
      }
    }
  }, []);

  const checkAuthStatus = async () => {
    try {
      console.log("Auth check attempt");
      const currentUser = await getCurrentUser();
      
      if (currentUser) {
        setUser(currentUser);
        
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

  const handlePaymentSuccess = async (planType: string) => {
    console.log("Processing payment success for plan:", planType);
    
    let userEmail: string | null = null;
    if (typeof window !== 'undefined') {
      try {
        userEmail = localStorage.getItem('userEmail');
      } catch (error) {
        console.warn('Error accessing localStorage:', error);
      }
    }
    
    console.log("User email from localStorage:", userEmail);
    
    if (!userEmail) {
      console.log("No user email found - need to establish user session");
      setAuthMode('signin');
      setShowAuthModal(true);
      return;
    }

    try {
      const currentUser = await getCurrentUser();
      if (currentUser) {
        console.log("User already authenticated, confirming payment");
        try {
          await confirmPayment(planType);
          setPaymentCompleted(true);
          setActivePage('dashboard');
          setPendingPaymentPlan(null);
          
          if (typeof window !== 'undefined') {
            try {
              window.history.replaceState({}, document.title, window.location.pathname);
            } catch (error) {
              console.warn('Error updating browser history:', error);
            }
          }
          
          alert(`Welcome! Your ${planType} plan is now active. Enjoy your writing assistant!`);
        } catch (error) {
          console.error("Error confirming payment:", error);
          alert("There was an error activating your subscription. Please contact support.");
        }
      } else {
        console.log("No active session - need to establish user session");
        setAuthMode('signin');
        setShowAuthModal(true);
      }
    } catch (error) {
      console.error("Error in handlePaymentSuccess:", error);
      setAuthMode('signin');
      setShowAuthModal(true);
    }
  };

  const handleAuthSuccess = async () => {
    console.log("Auth success - refreshing user state");
    
    try {
      const refreshedUser = await getCurrentUser();
      setUser(refreshedUser);
      
      if (pendingPaymentPlan) {
        console.log("Found pending payment plan:", pendingPaymentPlan);
        
        try {
          console.log("Confirming payment for user after authentication");
          await confirmPayment(pendingPaymentPlan);
          
          setPaymentCompleted(true);
          setActivePage('dashboard');
          setPendingPaymentPlan(null);
          
          if (typeof window !== 'undefined') {
            try {
              window.history.replaceState({}, document.title, window.location.pathname);
            } catch (error) {
              console.warn('Error updating browser history:', error);
            }
          }
          
          alert(`Welcome! Your ${pendingPaymentPlan} plan is now active. Enjoy your writing assistant!`);
          setShowAuthModal(false);
          return;
        } catch (error) {
          console.error("Error confirming payment after authentication:", error);
          alert("There was an error activating your subscription. Please contact support.");
        }
      }
      
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
    } catch (error) {
      console.error("Error in handleAuthSuccess:", error);
      setShowAuthModal(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setUser(null);
      setPaymentCompleted(false);
      setActivePage('home');
      setPendingPaymentPlan(null);
      
      if (typeof window !== 'undefined') {
        try {
          localStorage.removeItem('userEmail');
          window.history.replaceState({}, document.title, window.location.pathname);
        } catch (error) {
          console.warn('Error clearing localStorage or updating history:', error);
        }
      }
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handlePaymentComplete = async (planType: string) => {
    console.log("Payment completed for plan:", planType);
    
    try {
      await confirmPayment(planType);
      setPaymentCompleted(true);
      setActivePage('dashboard');
      alert(`Welcome! Your ${planType} plan is now active. Enjoy your writing assistant!`);
    } catch (error) {
      console.error("Error confirming payment:", error);
      alert("There was an error activating your subscription. Please contact support.");
    }
  };

  const handleGetStarted = () => {
    setActivePage('pricing');
  };

  const handleStartWriting = () => {
    if (user && paymentCompleted) {
      setActivePage('dashboard');
    } else {
      setAuthMode('signup');
      setShowAuthModal(true);
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
            onSwitchMode={setAuthMode}
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
                {['home', 'features', 'about', 'pricing', 'faq'].map((page) => (
                  <button
                    key={page}
                    onClick={() => setActivePage(page as PageType)}
                    className={`px-3 py-2 rounded-md text-sm font-medium capitalize ${
                      activePage === page
                        ? 'text-purple-600 bg-purple-50'
                        : 'text-gray-700 hover:text-purple-600'
                    }`}
                  >
                    {page}
                  </button>
                ))}
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
        {activePage === 'home' && (
          <HomePage 
            onGetStarted={handleGetStarted}
            onStartWriting={handleStartWriting}
          />
        )}
        {activePage === 'pricing' && (
          <PricingPage 
            user={user} 
            onPaymentComplete={handlePaymentComplete}
          />
        )}
        {activePage === 'dashboard' && paymentCompleted && (
          <WritingArea user={user} />
        )}
        {['features', 'about', 'faq'].includes(activePage) && (
          <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-center mb-8 capitalize">{activePage}</h1>
            <p className="text-center text-gray-600">{activePage} page content coming soon...</p>
          </div>
        )}
      </main>

      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal
          mode={authMode}
          onClose={() => setShowAuthModal(false)}
          onSuccess={handleAuthSuccess}
          onSwitchMode={setAuthMode}
        />
      )}
    </div>
  );
}

export default App;

