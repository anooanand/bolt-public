import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { CheckCircle, XCircle, Loader, RefreshCw } from 'lucide-react';

export function EmailVerificationHandler() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'processing'>('loading');
  const [message, setMessage] = useState('Verifying your email...');
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    
    const processEmailVerification = async () => {
      if (!isMounted) return;
      
      try {
        console.log('🔥 EMAIL VERIFICATION HANDLER STARTED');
        setStatus('processing');
        setMessage('Processing verification...');
        
        // Get URL parameters from both hash and search
        const urlHash = window.location.hash;
        const urlSearch = window.location.search;
        
        console.log('📍 URL Hash:', urlHash);
        console.log('📍 URL Search:', urlSearch);
        
        // Parse tokens from hash (Supabase typically uses hash)
        let accessToken = null;
        let refreshToken = null;
        let tokenType = null;
        
        if (urlHash) {
          const hashParams = new URLSearchParams(urlHash.substring(1));
          accessToken = hashParams.get('access_token');
          refreshToken = hashParams.get('refresh_token');
          tokenType = hashParams.get('token_type');
        }
        
        // Also check search params as fallback
        if (!accessToken && urlSearch) {
          const searchParams = new URLSearchParams(urlSearch);
          accessToken = searchParams.get('access_token');
          refreshToken = searchParams.get('refresh_token');
          tokenType = searchParams.get('token_type');
        }
        
        console.log('🔑 Tokens found:', { 
          access: accessToken ? 'YES' : 'NO', 
          refresh: refreshToken ? 'YES' : 'NO',
          type: tokenType
        });
        
        if (accessToken && refreshToken) {
          console.log('🚀 Setting session with tokens...');
          
          const { data: sessionData, error: sessionError } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken
          });

          if (sessionError) {
            console.error('❌ Session error:', sessionError);
            if (isMounted) {
              setStatus('error');
              setMessage(`Session error: ${sessionError.message}`);
            }
            return;
          }

          if (sessionData?.user) {
            console.log('✅ Session established for:', sessionData.user.email);
            
            // Update database immediately
            const { error: dbError } = await supabase
              .from('user_access_status')
              .upsert({
                id: sessionData.user.id,
                email: sessionData.user.email,
                email_verified: true,
                updated_at: new Date().toISOString()
              }, { onConflict: 'id' });

            if (dbError) {
              console.warn('⚠️ Database update warning:', dbError);
            } else {
              console.log('✅ Database updated successfully');
            }

            if (isMounted) {
              setStatus('success');
              setMessage(`Welcome ${sessionData.user.email}! Email verified successfully.`);
              
              // Clean the URL immediately
              window.history.replaceState({}, document.title, '/auth/callback');
              
              // Redirect to pricing after success
              setTimeout(() => {
                if (isMounted) {
                  navigate('/pricing', { replace: true });
                }
              }, 1500);
            }
            return;
          }
        }

        // Check for error parameters
        const errorCode = new URLSearchParams(urlSearch).get('error_code') || 
                         new URLSearchParams(urlHash.substring(1)).get('error_code');
        const errorDescription = new URLSearchParams(urlSearch).get('error_description') || 
                               new URLSearchParams(urlHash.substring(1)).get('error_description');
        
        if (errorCode) {
          console.log('❌ Error in URL:', errorCode, errorDescription);
          if (isMounted) {
            setStatus('error');
            setMessage(`Verification failed: ${errorDescription || errorCode}`);
          }
          return;
        }

        // Alternative: Check if user is already authenticated
        console.log('🔍 Checking existing session...');
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError) {
          console.error('❌ User check error:', userError);
          if (isMounted) {
            setStatus('error');
            setMessage('Unable to verify session. Please try signing in again.');
          }
          return;
        }

        if (user) {
          console.log('👤 Found existing user:', user.email);
          
          if (user.email_confirmed_at) {
            console.log('✅ User already verified');
            if (isMounted) {
              setStatus('success');
              setMessage('Email already verified! Redirecting...');
              setTimeout(() => {
                if (isMounted) {
                  navigate('/pricing', { replace: true });
                }
              }, 1000);
            }
            return;
          }
        }

        // If we get here, verification failed
        console.log('❌ No valid tokens or session found');
        if (isMounted) {
          setStatus('error');
          setMessage('No verification tokens found. Please check your email and click the verification link again.');
        }
        
      } catch (error: any) {
        console.error('💥 Verification process error:', error);
        if (isMounted) {
          setStatus('error');
          setMessage(`Verification failed: ${error.message || 'Unknown error'}`);
        }
      }
    };

    // Start processing immediately
    processEmailVerification();
    
    return () => {
      isMounted = false;
    };
  }, []); // Empty dependency array - run only once

  const handleManualRetry = async () => {
    setIsProcessing(true);
    setStatus('loading');
    setMessage('Retrying verification...');
    
    // Force reload the page to restart the process
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  const handleSkipVerification = () => {
    navigate('/pricing', { replace: true });
  };

  const handleGoHome = () => {
    navigate('/', { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-lg w-full bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 text-center border border-gray-200 dark:border-gray-700">
        
        {(status === 'loading' || status === 'processing') && (
          <>
            <div className="relative">
              <Loader className="h-16 w-16 text-blue-600 animate-spin mx-auto mb-6" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 bg-blue-600 rounded-full animate-pulse"></div>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
              {status === 'processing' ? 'Processing...' : 'Verifying Email'}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
              {message}
            </p>
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
              Verification Complete! 🎉
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
              {message}
            </p>
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-6">
              <p className="text-green-800 dark:text-green-200 text-sm">
                Redirecting to pricing page...
              </p>
            </div>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="w-20 h-20 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-6">
              <XCircle className="h-12 w-12 text-red-600 dark:text-red-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
              Verification Issue
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
              {message}
            </p>
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
              <p className="text-red-800 dark:text-red-200 text-sm">
                Don't worry! You can try again or continue anyway.
              </p>
            </div>
            <div className="space-y-3">
              <button
                onClick={handleManualRetry}
                disabled={isProcessing}
                className="w-full flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <RefreshCw className={`w-5 h-5 mr-2 ${isProcessing ? 'animate-spin' : ''}`} />
                {isProcessing ? 'Retrying...' : 'Try Again'}
              </button>
              <button
                onClick={handleSkipVerification}
                className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Continue to Pricing
              </button>
              <button
                onClick={handleGoHome}
                className="w-full px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Back to Home
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

