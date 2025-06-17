import React, { useState, useEffect } from 'react';
import { CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { confirmPayment, getCurrentUser, supabase } from '../lib/supabase';

interface PaymentSuccessPageProps {
  plan: string;
  onSuccess: (user: any) => void;
  onSignInRequired: (email: string, plan: string) => void;
}

export function PaymentSuccessPage({ plan, onSuccess, onSignInRequired }: PaymentSuccessPageProps) {
  const [status, setStatus] = useState<'processing' | 'success' | 'signin_required' | 'error'>('processing');
  const [message, setMessage] = useState('Processing your payment...');
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);

  useEffect(() => {
    const processPayment = async () => {
      try {
        console.log("[DEBUG] PaymentSuccessPage: Processing payment for plan:", plan);
        
        const email = localStorage.getItem('userEmail');
        setUserEmail(email);
        console.log("[DEBUG] PaymentSuccessPage: Found email in localStorage:", email);

        if (!email) {
          console.error("[DEBUG] PaymentSuccessPage: No user email found");
          setStatus('error');
          setMessage('No user email found. Please contact support.');
          return;
        }

        // FIXED: Use timeout wrapper for session check
        const sessionPromise = supabase.auth.getSession();
        const sessionResult = await Promise.race([
          sessionPromise,
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Session check timeout')), 3000)
          )
        ]);

        const { data: { session }, error: sessionError } = sessionResult as any;

        if (sessionError) {
          console.error("[DEBUG] PaymentSuccessPage: Session error:", sessionError);
          setStatus('signin_required');
          setMessage('Please sign in to complete your subscription setup.');
          return;
        }

        if (session?.user) {
          console.log("[DEBUG] PaymentSuccessPage: User session found, confirming payment");
          setMessage('Confirming your payment...');
          
          try {
            await confirmPayment(plan);
            console.log("[DEBUG] PaymentSuccessPage: Payment confirmed successfully");

            // Set temporary access (24 hours)
            localStorage.setItem('temp_access_until', new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString());
            
            setStatus('success');
            setMessage(`Welcome! Your ${plan.replace('-', ' ')} plan is now active. You have temporary access for the next 24 hours while we process your payment.`);
            
            // FIXED: Clear URL parameters immediately
            if (typeof window !== 'undefined') {
              window.history.replaceState({}, document.title, window.location.pathname);
            }

            // FIXED: Shorter delay before redirect
            setTimeout(() => {
              console.log("[DEBUG] PaymentSuccessPage: Calling onSuccess callback");
              onSuccess(session.user);
            }, 1500);
          } catch (paymentError) {
            console.error("[DEBUG] PaymentSuccessPage: Error confirming payment:", paymentError);
            setStatus('error');
            setMessage('There was an error confirming your payment. Please contact support.');
          }
        } else {
          console.log("[DEBUG] PaymentSuccessPage: No user session, requiring sign in");
          setStatus('signin_required');
          setMessage('Please sign in to complete your subscription setup.');
        }

      } catch (error) {
        console.error('[DEBUG] PaymentSuccessPage: Error processing payment:', error);
        setStatus('signin_required');
        setMessage('Please sign in to complete your subscription setup.');
      }
    };

    // FIXED: Add timeout for the entire process
    const processTimeout = setTimeout(() => {
      console.log("[DEBUG] PaymentSuccessPage: Process timeout, requiring sign in");
      setStatus('signin_required');
      setMessage('Please sign in to complete your subscription setup.');
    }, 5000);

    processPayment().finally(() => {
      clearTimeout(processTimeout);
    });
  }, [plan, onSuccess]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userEmail || !password) return;

    setIsSigningIn(true);
    try {
      console.log("[DEBUG] PaymentSuccessPage: Attempting sign in for:", userEmail);
      const { error } = await supabase.auth.signInWithPassword({ email: userEmail, password });
      
      if (error) {
        console.error("[DEBUG] PaymentSuccessPage: Sign in error:", error);
        throw error;
      }
      
      console.log("[DEBUG] PaymentSuccessPage: Sign in successful");
      setMessage("Signing in and processing payment...");
      
      // Wait for user session to be fully established and user object updated
      setTimeout(async () => {
        try {
          await confirmPayment(plan);
          console.log("[DEBUG] PaymentSuccessPage: Payment confirmed after sign in");
          
          // Set temporary access (24 hours)
          localStorage.setItem("temp_access_until", new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString());
          
          setStatus("success");
          setMessage(`Welcome! Your ${plan.replace("-", " ")} plan is now active. You have temporary access for the next 24 hours while we process your payment.`);
          
          // Get the current user and call success callback
          const { data: { user } } = await supabase.auth.getUser();
          if (user) {
            onSuccess(user);
          }
        } catch (paymentError) {
          console.error("[DEBUG] PaymentSuccessPage: Error confirming payment after sign in:", paymentError);
          setStatus("error");
          setMessage("Payment confirmation failed. Please contact support.");
        }
      }, 2000); // Add a 2-second delay
    } catch (err: any) {
      console.error('[DEBUG] PaymentSuccessPage: Sign-in error:', err);
      setMessage(`Sign-in failed: ${err.message || 'Please check your password or try again.'}`);
    } finally {
      setIsSigningIn(false);
    }
  };

  const renderSignInForm = () => (
    <form onSubmit={handleSignIn} className="mt-6 space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
        <input
          type="email"
          value={userEmail || ''}
          onChange={(e) => setUserEmail(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
          placeholder="Enter your password"
          required
        />
      </div>
      <button
        type="submit"
        disabled={isSigningIn}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-md transition-colors flex items-center justify-center"
      >
        {isSigningIn ? (
          <>
            <Loader className="animate-spin -ml-1 mr-2 h-5 w-5" />
            Signing in...
          </>
        ) : (
          'Sign In to Complete Setup'
        )}
      </button>
      <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-4">
        This will activate your {plan.replace('-', ' ')} subscription
      </p>
    </form>
  );

  const getStatusIcon = () => {
    switch (status) {
      case 'processing': return <Loader className="w-16 h-16 text-blue-500 animate-spin" />;
      case 'success': return <CheckCircle className="w-16 h-16 text-green-500" />;
      case 'signin_required': return <AlertCircle className="w-16 h-16 text-yellow-500" />;
      case 'error': return <AlertCircle className="w-16 h-16 text-red-500" />;
      default: return <Loader className="w-16 h-16 text-blue-500 animate-spin" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'processing': return 'text-blue-600';
      case 'success': return 'text-green-600';
      case 'signin_required': return 'text-yellow-600';
      case 'error': return 'text-red-600';
      default: return 'text-blue-600';
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6 flex justify-center">{getStatusIcon()}</div>
        <h1 className={`text-2xl font-bold mb-4 ${getStatusColor()}`}>
          {status === 'processing' && 'Processing Payment'}
          {status === 'success' && 'Payment Successful!'}
          {status === 'signin_required' && 'Complete Your Setup'}
          {status === 'error' && 'Setup Error'}
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">{message}</p>
        {userEmail && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Account: {userEmail}</p>
        )}
        {status === 'signin_required' && renderSignInForm()}
        {status === 'error' && (
          <div className="space-y-3">
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-md transition-colors"
            >
              Try Again
            </button>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              If the problem persists, please contact support with your payment details.
            </p>
          </div>
        )}
        {status === 'success' && (
          <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-md p-4">
            <p className="text-sm text-green-700 dark:text-green-300">
              Redirecting to your dashboard...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}