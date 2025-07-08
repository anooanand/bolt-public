import React, { useState, useEffect } from 'react';
import { ArrowRight, Check, Star } from 'lucide-react';
import { supabase } from '../lib/supabase'; // Removed isEmailVerified import
import { createCheckoutSession } from '../lib/stripe';
import { products } from '../stripe-config';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export function PricingPage() {
  const { user, emailVerified, paymentCompleted, forceRefreshVerification } = useAuth(); // Get emailVerified and paymentCompleted from AuthContext
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isCheckingVerification, setIsCheckingVerification] = useState(false);

  // Local function to check payment status (can be removed if AuthContext handles all)
  const checkPaymentStatus = async (userId: string): Promise<boolean> => {
    try {
      // Check for temporary access first
      const tempAccess = localStorage.getItem('temp_access_granted');
      const tempUntil = localStorage.getItem('temp_access_until');
      
      if (tempAccess === 'true' && tempUntil) {
        const tempDate = new Date(tempUntil);
        if (tempDate > new Date()) {
          console.log('✅ User has valid 24-hour temporary access');
          return true; // Has valid temporary access
        }
      }
      
      // Check database for payment verification
      const { data } = await supabase
        .from('user_profiles')
        .select('payment_verified, subscription_status, manual_override')
        .eq('id', userId) // Use 'id' consistently
        .single();
      
      return data?.payment_verified === true || 
             data?.subscription_status === 'active' ||
             data?.manual_override === true;
    } catch (error) {
      console.error('Error checking payment status:', error);
      return false;
    }
  };

  useEffect(() => {
    // No need to re-check email verification here, it's handled by AuthContext
    // Just set loading state based on AuthContext's loading
    if (!user) {
      setIsLoading(false);
      return;
    }

    // If AuthContext is still loading, keep PricingPage loading
    if (typeof emailVerified === 'undefined' || typeof paymentCompleted === 'undefined') {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }

  }, [user, emailVerified, paymentCompleted]); // Depend on AuthContext states

  const handleSubscribe = async (priceId: string) => {
    if (!user) {
      alert('Please sign in to subscribe');
      return;
    }

    if (!emailVerified) {
      alert('Please verify your email address before subscribing');
      return;
    }

    try {
      console.log('🚀 Creating checkout session for price:', priceId);
      const { url } = await createCheckoutSession(priceId, user.id);
      
      if (url) {
        console.log('✅ Redirecting to Stripe checkout:', url);
        window.location.href = url;
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (error) {
      console.error('❌ Error creating checkout session:', error);
      alert('Failed to create checkout session. Please try again.');
    }
  };

  const getVerificationStatus = () => {
    if (!user) {
      return { message: 'Please sign in to continue', color: 'text-gray-600', bgColor: 'bg-gray-100' };
    }
    
    if (!emailVerified) {
      return { 
        message: 'Please verify your email address before subscribing', 
        color: 'text-blue-600', 
        bgColor: 'bg-blue-50' 
      };
    }
    
    if (paymentCompleted) {
      return { 
        message: '✅ Email verified and payment completed!', 
        color: 'text-green-600', 
        bgColor: 'bg-green-50' 
      };
    }
    
    return { 
      message: '✅ Email verified - Ready to subscribe!', 
      color: 'text-green-600', 
      bgColor: 'bg-green-50' 
    };
  };

  const status = getVerificationStatus();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">Loading pricing information...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Unlock your writing potential with our comprehensive writing preparation tools
          </p>
        </div>

        {/* User Status */}
        {user && (
          <div className="max-w-2xl mx-auto mb-8">
            <div className={`${status.bgColor} border border-gray-200 rounded-lg p-4 text-center`}>
              <p className={`${status.color} font-medium`}>
                Signed in as: {user.email}
              </p>
              <p className={`${status.color} text-sm mt-1`}>
                {status.message}
              </p>
              {!emailVerified && (
                <button
                  onClick={forceRefreshVerification} // Use forceRefreshVerification from AuthContext
                  disabled={isCheckingVerification}
                  className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 text-sm"
                >
                  {isCheckingVerification ? 'Checking...' : 'Recheck Status'}
                </button>
              )}
            </div>
          </div>
        )}

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300 ${
                index === 1 ? 'ring-4 ring-blue-500 ring-opacity-50' : ''
              }`}
            >
              {index === 1 && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center py-2 text-sm font-semibold">
                  Most Popular
                </div>
              )}
              
              <div className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-center mb-4">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">
                      {product.price}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400 ml-2">
                      /{product.interval}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    {product.description}
                  </p>
                </div>

                <ul className="space-y-4 mb-8">
                  {product.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleSubscribe(product.priceId)}
                  disabled={!user || !emailVerified}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center ${
                    !user || !emailVerified
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : index === 1
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl'
                      : 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100'
                  }`}
                >
                  {!user ? 'Sign In to Subscribe' : !emailVerified ? 'Verify Email First' : 'Get Started'}
                  {user && emailVerified && <ArrowRight className="ml-2 h-5 w-5" />}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Everything You Need to Succeed
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: '📝', title: 'AI Writing Coach', desc: 'Get instant feedback on your essays' },
              { icon: '📊', title: 'Progress Tracking', desc: 'Monitor your improvement over time' },
              { icon: '🎯', title: 'Targeted Practice', desc: 'Focus on your weak areas' },
              { icon: '⭐', title: 'Expert Tips', desc: 'Learn from IELTS professionals' }
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Also export as PricingPageWithFixedVerification for backward compatibility
export const PricingPageWithFixedVerification = PricingPage;


