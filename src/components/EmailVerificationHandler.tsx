import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase, handleEmailVerificationCallback } from '../lib/supabase';
import { CheckCircle, XCircle, Loader } from 'lucide-react';

export function EmailVerificationHandler() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let mounted = true;
    let authSubscription: any;

    const processVerification = async () => {
      try {
        console.log('=== EMAIL VERIFICATION HANDLER STARTED ===');
        console.log('Current URL:', window.location.href);
        
        // Parse error parameters from URL if present
        const searchParams = new URLSearchParams(location.search);
        const errorCode = searchParams.get('error_code');
        const errorDescription = searchParams.get('error_description');
        
        if (errorCode) {
          console.error(`Error in verification: ${errorCode} - ${errorDescription}`);
          setStatus('error');
          setErrorMessage(errorDescription || 'Verification link is invalid or has expired');
          return;
        }

        // Call the dedicated verification handler function
        const result = await handleEmailVerificationCallback();
        
        if (result.success && result.user) {
          console.log('✅ Email verification successful:', result.user.email);
          setUserEmail(result.user.email || '');
          setStatus('success');
          
          // Redirect after 2 seconds
          setTimeout(() => {
            if (mounted) {
              navigate('/pricing');
            }
          }, 2000);
        } else {
          console.error('❌ Email verification failed:', result.error);
          setStatus('error');
          setErrorMessage(result.error?.message || 'Verification failed. Please try signing in manually.');
        }
      } catch (error: any) {
        console.error('❌ Unexpected error in verification handler:', error);
        if (mounted) {
          setStatus('error');
          setErrorMessage('An unexpected error occurred during verification.');
        }
      }
    };

    processVerification();

    // Cleanup
    return () => {
      mounted = false;
      if (authSubscription?.data?.subscription) {
        authSubscription.data.subscription.unsubscribe();
      }
    };
  }, [navigate, location.search]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
        {status === 'loading' && (
          <>
            <Loader className="h-12 w-12 text-blue-600 animate-spin mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Verifying Your Email
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Please wait while we verify your email address...
            </p>
            <p className="text-xs text-gray-500 mt-2">
              This may take a few moments
            </p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Email Verified Successfully! 🎉
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              Welcome, {userEmail}!
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Your email has been verified. You're now ready to complete your subscription setup.
            </p>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Redirecting to pricing page...
            </p>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <XCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Verification Issue
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {errorMessage || 'There was an issue with verification. You may already be signed in.'}
            </p>
            <div className="space-y-3">
              <button
                onClick={() => navigate('/pricing')}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Continue to Pricing
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                className="w-full px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              >
                Go to Dashboard
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}