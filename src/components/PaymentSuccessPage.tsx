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

  useEffect(() => {
    const processPayment = async () => {
      try {
        // Get user email from localStorage
        const email = localStorage.getItem('userEmail');
        setUserEmail(email);
        
        if (!email) {
          setStatus('error');
          setMessage('No user email found. Please contact support.');
          return;
        }
        
        // Check if user is already signed in
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          // User is signed in, confirm payment
          setMessage('Confirming your payment...');
          await confirmPayment(plan);
          
          setStatus('success');
          setMessage(`Welcome! Your ${plan.replace('-', ' ')} plan is now active.`);
          
          // Clean up URL parameters
          window.history.replaceState({}, document.title, window.location.pathname);
          
          // Notify parent component
          setTimeout(() => {
            onSuccess(session.user);
          }, 2000);
          
        } else {
          // User needs to sign in
          setStatus('signin_required');
          setMessage('Please sign in to complete your subscription setup.');
        }
        
      } catch (error) {
        console.error('Error processing payment:', error);
        setStatus('error');
        setMessage('There was an error processing your payment. Please contact support.');
      }
    };
    
    processPayment();
  }, [plan, onSuccess]);

  const handleSignIn = () => {
    if (userEmail) {
      onSignInRequired(userEmail, plan);
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'processing':
        return <Loader className="w-16 h-16 text-blue-500 animate-spin" />;
      case 'success':
        return <CheckCircle className="w-16 h-16 text-green-500" />;
      case 'signin_required':
        return <AlertCircle className="w-16 h-16 text-yellow-500" />;
      case 'error':
        return <AlertCircle className="w-16 h-16 text-red-500" />;
      default:
        return <Loader className="w-16 h-16 text-blue-500 animate-spin" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'processing':
        return 'text-blue-600';
      case 'success':
        return 'text-green-600';
      case 'signin_required':
        return 'text-yellow-600';
      case 'error':
        return 'text-red-600';
      default:
        return 'text-blue-600';
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6 flex justify-center">
          {getStatusIcon()}
        </div>
        
        <h1 className={`text-2xl font-bold mb-4 ${getStatusColor()}`}>
          {status === 'processing' && 'Processing Payment'}
          {status === 'success' && 'Payment Successful!'}
          {status === 'signin_required' && 'Sign In Required'}
          {status === 'error' && 'Payment Error'}
        </h1>
        
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          {message}
        </p>
        
        {userEmail && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Account: {userEmail}
          </p>
        )}
        
        {status === 'signin_required' && (
          <button
            onClick={handleSignIn}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-md transition-colors"
          >
            Sign In to Continue
          </button>
        )}
        
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
              You'll be redirected to your dashboard shortly...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

