import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { handleEmailVerificationCallback, supabase } from '../lib/supabase';
import { CheckCircle, XCircle, Loader } from 'lucide-react';

export function EmailVerificationHandler() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const processVerification = async () => {
      try {
        // Get the full URL including hash
        const fullUrl = window.location.href;
        
        // Process the verification
        const result = await handleEmailVerificationCallback(fullUrl);
        
        if (result.success) {
          // Force session refresh after successful verification
          await supabase.auth.refreshSession();
          setStatus('success');
          // Redirect to pricing page after a short delay
          setTimeout(() => {
            navigate('/pricing');
          }, 3000);
        } else {
          setStatus('error');
          setErrorMessage(result.error?.message || 'Verification failed');
        }
      } catch (error: any) {
        console.error('Error processing verification:', error);
        setStatus('error');
        setErrorMessage(error.message || 'An unexpected error occurred');
      }
    };

    processVerification();
  }, [navigate, location]);

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
          </>
        )}

        {status === 'success' && (
          <>
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Email Verified!
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Your email has been successfully verified. You're now ready to complete your subscription setup.
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
              Verification Failed
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {errorMessage || 'We could not verify your email address. Please try again.'}
            </p>
            <button
              onClick={() => navigate('/dashboard')}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Go to Dashboard
            </button>
          </>
        )}
      </div>
    </div>
  );
}