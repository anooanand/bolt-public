import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { CheckCircle, XCircle, Loader } from 'lucide-react';

export function EmailVerificationHandler() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Verifying your email...');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        console.log('🚀 Fast email verification started');
        
        // Extract tokens from URL hash
        const hashParams = new URLSearchParams(location.hash.substring(1));
        const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token');
        
        if (accessToken && refreshToken) {
          console.log('🔑 Setting session...');
          
          // Set the session
          const { data, error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken
          });

          if (error) {
            console.error('❌ Session error:', error);
            setStatus('error');
            setMessage('Verification failed. Please try again.');
            return;
          }

          if (data.user) {
            console.log('✅ Email verified for:', data.user.email);
            
            // Quick database update
            try {
              await supabase
                .from('user_access_status')
                .upsert({
                  id: data.user.id,
                  email: data.user.email,
                  email_verified: true,
                  updated_at: new Date().toISOString()
                }, { onConflict: 'id' });
            } catch (dbError) {
              console.warn('Database update failed, but verification succeeded');
            }

            setStatus('success');
            setMessage('Email verified successfully!');
            
            // Clean URL and redirect quickly
            window.history.replaceState({}, document.title, window.location.pathname);
            
            setTimeout(() => {
              navigate('/pricing');
            }, 1500); // Faster redirect
            
            return;
          }
        }

        // Check if user is already signed in
        const { data: { user } } = await supabase.auth.getUser();
        if (user?.email_confirmed_at) {
          console.log('✅ User already verified');
          setStatus('success');
          setMessage('Email already verified!');
          setTimeout(() => navigate('/pricing'), 1000);
          return;
        }

        // If no tokens or user, show error
        setStatus('error');
        setMessage('Invalid verification link. Please try again.');
        
      } catch (error) {
        console.error('❌ Verification error:', error);
        setStatus('error');
        setMessage('Verification failed. Please try again.');
      }
    };

    // Start verification immediately
    verifyEmail();
  }, [location.hash, navigate]);

  const handleRetry = () => {
    window.location.reload();
  };

  const handleContinue = () => {
    navigate('/pricing');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
        
        {status === 'loading' && (
          <>
            <Loader className="h-12 w-12 text-blue-600 animate-spin mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Verifying Email
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {message}
            </p>
            <div className="text-sm text-gray-500">
              This should be quick...
            </div>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Success! 🎉
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {message}
            </p>
            <div className="text-sm text-gray-500">
              Redirecting to pricing...
            </div>
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
              {message}
            </p>
            <div className="space-y-3">
              <button
                onClick={handleRetry}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Try Again
              </button>
              <button
                onClick={handleContinue}
                className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Continue Anyway
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

