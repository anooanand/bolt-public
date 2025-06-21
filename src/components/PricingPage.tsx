import React, { useState, useEffect } from 'react';
import { ArrowRight, Check, Star } from 'lucide-react';
import { isEmailVerified, supabase } from '../lib/supabase';
import { hasCompletedPayment } from '../lib/supabase';
import { createCheckoutSession } from '../lib/stripe';
import { products } from '../stripe-config';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export function PricingPage() {
  const { user } = useAuth();
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isPaidUser, setIsPaidUser] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [emailVerified, setEmailVerified] = useState(false);
  const [verificationLoading, setVerificationLoading] = useState(true);
  const navigate = useNavigate();
  
  // Enhanced email verification check
  const checkEmailVerification = async () => {
    try {
      setVerificationLoading(true);
      console.log('🔍 Pricing page: Checking email verification...');
      
      // Get user email
      const email = localStorage.getItem('userEmail') || '';
      setUserEmail(email);
      
      // Check verification status using enhanced function
      const verified = await isEmailVerified();
      console.log('📧 Pricing page: Email verification result:', verified);
      
      setEmailVerified(verified);
    } catch (error) {
      console.error('Error checking email verification:', error);
      setEmailVerified(false);
    } finally {
      setVerificationLoading(false);
    }
  };

  const handleManualVerificationCheck = async () => {
    console.log('🔄 Manual verification check triggered from pricing page');
    await checkEmailVerification();
  };
  
  // Get user email and check access status on component mount
  useEffect(() => {
    const checkAccessStatus = async () => {
      setIsLoading(true);
      
      // Check for permanent access
      const paymentCompleted = await hasCompletedPayment();
      setIsPaidUser(paymentCompleted);
      
      // Get email from localStorage
      const email = localStorage.getItem('userEmail');
      setUserEmail(email);
      
      // If no email is found, check if there's a session cookie
      if (!email && supabase) {
        try {
          const { data } = await supabase.auth.getSession();
          if (data.session?.user?.email) {
            localStorage.setItem('userEmail', data.session.user.email);
            setUserEmail(data.session.user.email);
          }
        } catch (error) {
          console.error('Error checking session:', error);
        }
      }
      
      // Check email verification
      await checkEmailVerification();
      
      setIsLoading(false);
    };
    
    checkAccessStatus();
  }, []);
  
  const handleSubscribe = async (product: typeof products[0]) => {
    setErrorMessage(null); // Clear previous errors
    try {
      // Check if user is logged in
      if (!user) {
        navigate('/'); // Redirect to home page to sign in
        return;
      }
      
      // Check if email is verified
      if (!emailVerified) {
        setErrorMessage('Please verify your email address before subscribing.');
        return;
      }
      
      // Set processing state for this product
      setIsProcessing(product.id);
      
      console.log('Creating checkout session for product:', product);
      
      // Create checkout session
      const checkoutUrl = await createCheckoutSession(product.priceId, product.mode as 'subscription' | 'payment');
      
      console.log('Checkout URL:', checkoutUrl);
      
      // Redirect to checkout
      window.location.href = checkoutUrl;
    } catch (error: any) {
      console.error('Error creating checkout session:', error);
      setErrorMessage(error.message || 'Failed to create checkout session. Please try again.');
    } finally {
      setIsProcessing(null);
    }
  };

  const handleContactSales = () => {
    navigate('/contact'); // Assuming a contact page exists or will be created
  };

  if (isLoading || verificationLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading pricing...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="py-16 bg-white dark:bg-gray-900" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            All plans include a 3-day free trial. Cancel anytime.
          </p>
          
          {userEmail && (
            <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-md inline-block">
               Signed in as: {userEmail}
            </div>
          )}
          
          {isPaidUser && (
            <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-md inline-block">
               You have an active subscription
            </div>
          )}
          
          {/* Enhanced verification status display */}
          {emailVerified ? (
            <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-md inline-block">
              ✅ Email verified - Ready to subscribe!
            </div>
          ) : (
            <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded-md inline-block">
              <div className="mb-2">
                ⚠️ Please verify your email before subscribing
              </div>
              <button 
                onClick={handleManualVerificationCheck}
                className="text-sm bg-yellow-200 dark:bg-yellow-800 hover:bg-yellow-300 dark:hover:bg-yellow-700 px-3 py-1 rounded transition-colors"
              >
                I've Verified My Email - Check Again
              </button>
              <p className="text-xs mt-2 opacity-75">
                If you've already clicked the verification link in your email, 
                click the button above to refresh your verification status.
              </p>
            </div>
          )}

          {errorMessage && (
            <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-md inline-block">
              {errorMessage}
            </div>
          )}
          
          <div className="mt-8 inline-flex items-center p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                billingPeriod === 'monthly'
                  ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod('yearly')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                billingPeriod === 'yearly'
                  ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              Yearly <span className="text-green-500 font-normal">Save 20%</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div 
              key={product.id}
              className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border ${
                product.popular 
                  ? 'border-indigo-200 dark:border-indigo-800 ring-2 ring-indigo-500 dark:ring-indigo-400' 
                  : 'border-gray-200 dark:border-gray-700'
              } overflow-hidden h-full flex flex-col`}
            >
              {product.popular && (
                <div className="bg-indigo-500 text-white text-center py-1.5 text-sm font-medium">
                  Most Popular
                </div>
              )}
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{product.name}</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">{product.description}</p>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">
                    {product.price}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 ml-2">
                    /month
                  </span>
                </div>
                
                <button
                  onClick={() => handleSubscribe(product)}
                  disabled={isPaidUser || isProcessing !== null || !user || !emailVerified}
                  className={`w-full py-3 px-4 rounded-md ${
                    isPaidUser
                      ? 'bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-400 cursor-not-allowed'
                      : isProcessing === product.id
                      ? 'bg-indigo-400 text-white cursor-wait'
                      : !user 
                      ? 'bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-400 cursor-not-allowed'
                      : !emailVerified
                      ? 'bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-400 cursor-not-allowed'
                      : product.popular
                        ? 'bg-indigo-600 hover:bg-indigo-700 text-white hover:shadow-lg'
                        : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white'
                  } font-medium flex items-center justify-center transition-all duration-200`}
                >
                  {isPaidUser ? 'Current Plan' : 
                   isProcessing === product.id ? 'Processing...' :
                   !user ? 'Sign In to Subscribe' :
                   !emailVerified ? 'Verify Email First' :
                   'Subscribe Now'}
                  {!isPaidUser && isProcessing !== product.id && user && emailVerified && <ArrowRight className="ml-2 w-4 h-4" />}
                </button>
              </div>
              
              <div className="p-6 bg-gray-50 dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 flex-grow">
                <h4 className="font-medium text-gray-900 dark:text-white mb-4">What's included:</h4>
                <ul className="space-y-3">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                      <span className="text-gray-600 dark:text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="p-6 bg-gray-50 dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center">
                  <div className="flex mr-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">5.0 (100+ reviews)</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Need a custom plan for your school?</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            We offer special pricing for schools and educational institutions. Contact us to learn more about our school plans.
          </p>
          <button 
            onClick={handleContactSales}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md transition-colors"
          >
            Contact Sales
          </button>
        </div>

        {/* Debug Info (remove in production) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <h4 className="font-bold mb-2">Debug Information:</h4>
            <p>Email: {userEmail}</p>
            <p>Email Verified: {emailVerified ? 'Yes' : 'No'}</p>
            <p>User Object: {user ? 'Present' : 'Missing'}</p>
            <p>Loading: {isLoading ? 'Yes' : 'No'}</p>
            <button 
              onClick={handleManualVerificationCheck}
              className="mt-2 px-3 py-1 bg-blue-500 text-white rounded text-sm"
            >
              Refresh Verification Status
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

// Also export as PricingPageWithFixedVerification for backward compatibility
export const PricingPageWithFixedVerification = PricingPage;

