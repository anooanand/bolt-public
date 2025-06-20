import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase, handleEmailVerificationCallback } from '../lib/supabase';
import { CheckCircle, XCircle, Loader, AlertTriangle } from 'lucide-react';

export function EmailVerificationHandler() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'expired'>('loading');
  const [errorMessage, setErrorMessage] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [attemptCount, setAttemptCount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let mounted = true;
    let authSubscription: any;

    const processVerification = async (retries = 5) => {
      if (!mounted) return;

      try {
        console.log('=== EMAIL VERIFICATION HANDLER STARTED ===');
        console.log('Current URL:', window.location.href);
        console.log(`Attempt ${6 - retries} of 5`);
        
        setAttemptCount(6 - retries);
        
        // Parse error parameters from URL if present
        const searchParams = new URLSearchParams(location.search);
        const hashParams = new URLSearchParams(location.hash.substring(1));
        
        // Check both search params and hash params for errors
        const errorCode = searchParams.get('error_code') || hashParams.get('error_code');
        const errorDescription = searchParams.get('error_description') || hashParams.get('error_description');
        const error = searchParams.get('error') || hashParams.get('error');
        
        if (errorCode || error) {
          console.error(`Error in verification: ${errorCode || error} - ${errorDescription}`);
          
          if (errorCode === 'otp_expired' || error === 'access_denied') {
            if (mounted) {
              setStatus('expired');
              setErrorMessage('Your verification link has expired. Please request a new verification email.');
            }
          } else {
            if (mounted) {
              setStatus('error');
              setErrorMessage(errorDescription || 'Verification link is invalid or has expired');
            }
          }
          return;
        }

        // ENHANCED: Call the dedicated verification handler function with timeout handling
        const verificationPromise = handleEmailVerificationCallback();
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Verification timeout')), 15000)
        );

        const result = await Promise.race([verificationPromise, timeoutPromise]) as any;
        
        if (result.success && result.user) {
          console.log('✅ Email verification successful:', result.user.email);
          
          // ENHANCED: Multiple verification attempts with exponential backoff
          let emailVerified = false;
          const maxVerificationAttempts = 10;
          let verificationAttempt = 0;

          while (!emailVerified && verificationAttempt < maxVerificationAttempts && mounted) {
            verificationAttempt++;
            
            // Exponential backoff: 500ms, 1s, 2s, 4s, 8s, then cap at 10s
            const delay = Math.min(500 * Math.pow(2, verificationAttempt - 1), 10000);
            await new Promise(resolve => setTimeout(resolve, delay));
            
            if (!mounted) return;
            
            try {
              // ENHANCED: Get fresh user data to check verification status
              const { data: userData, error: userError } = await supabase.auth.getUser();
              
              if (userError) {
                console.warn(`User fetch attempt ${verificationAttempt} failed:`, userError);
                continue;
              }

              if (userData.user?.email_confirmed_at) {
                console.log(`✅ Email verification confirmed on attempt ${verificationAttempt}`);
                emailVerified = true;
                
                if (mounted) {
                  setUserEmail(userData.user.email || '');
                  setStatus('success');
                }
                
                // ENHANCED: Ensure session is fully synchronized
                const { data: { session: updatedSession }, error: sessionError } = await supabase.auth.getSession();
                if (sessionError) {
                  console.error('Error fetching updated session:', sessionError);
                } else if (updatedSession?.user?.email_confirmed_at) {
                  console.log('✅ Session confirmed_at updated successfully');
                } else {
                  console.warn('⚠️ Session confirmed_at not yet updated, but user verification confirmed');
                }

                // ENHANCED: Redirect with additional delay to ensure state propagation
                setTimeout(() => {
                  if (mounted) {
                    console.log('🔄 Redirecting to pricing page...');
                    navigate('/pricing');
                  }
                }, 3000);
                
                break;
              } else {
                console.log(`Verification attempt ${verificationAttempt}/${maxVerificationAttempts}: email not yet confirmed`);
              }
            } catch (error) {
              console.warn(`Verification check attempt ${verificationAttempt} failed:`, error);
            }
          }

          if (!emailVerified && mounted) {
            console.error('❌ Email verification timeout after maximum attempts');
            setStatus('error');
            setErrorMessage('Email verification is taking longer than expected. Please try signing in manually or contact support.');
          }
          
        } else {
          console.error('❌ Email verification failed:', result.error);
          
          if (result.error?.code === 'otp_expired') {
            if (mounted) {
              setStatus('expired');
              setErrorMessage('Your verification link has expired. Please request a new verification email.');
            }
          } else {
            if (mounted) {
              setStatus('error');
              setErrorMessage(result.error?.message || 'Verification failed. Please try signing in manually.');
            }
          }
        }
      } catch (error: any) {
        console.error('❌ Unexpected error in verification handler:', error);
        
        // ENHANCED: Retry logic with better error handling
        if (error.message === 'Verification timeout' && retries > 0) {
          console.log(`⏰ Verification timeout, retrying (${retries} attempts left)...`);
          if (mounted) {
            setTimeout(() => processVerification(retries - 1), 2000);
          }
        } else if (error.name === 'NetworkError' && retries > 0) {
          console.log(`🌐 Network error, retrying (${retries} attempts left)...`);
          if (mounted) {
            setTimeout(() => processVerification(retries - 1), 3000);
          }
        } else if (retries > 0) {
          console.log(`🔄 General error, retrying (${retries} attempts left)...`);
          if (mounted) {
            setTimeout(() => processVerification(retries - 1), 1000);
          }
        } else if (mounted) {
          setStatus('error');
          setErrorMessage('An unexpected error occurred during verification after multiple attempts. Please try signing in manually.');
        }
      }
    };

    // ENHANCED: Add auth state change listener for additional verification detection
    const { data: authData } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;
      
      console.log('🔄 Auth state change detected:', event);
      
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        // Additional delay to allow for state propagation
        setTimeout(async () => {
          if (!mounted) return;
          
          try {
            const { data: userData } = await supabase.auth.getUser();
            if (userData.user?.email_confirmed_at && status === 'loading') {
              console.log('✅ Email verification detected via auth state change');
              setUserEmail(userData.user.email || '');
              setStatus('success');
              
              setTimeout(() => {
                if (mounted) {
                  navigate('/pricing');
                }
              }, 2000);
            }
          } catch (error) {
            console.error('Error in auth state change handler:', error);
          }
        }, 1500);
      }
    });

    authSubscription = authData;
    processVerification();

    // Cleanup
    return () => {
      mounted = false;
      if (authSubscription?.subscription) {
        authSubscription.subscription.unsubscribe();
      }
    };
  }, [navigate, location.search, location.hash]);

  const handleResendVerification = async () => {
    try {
      const email = localStorage.getItem('userEmail');
      if (!email) {
        alert('No email found. Please sign up again.');
        navigate('/');
        return;
      }

      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      });

      if (error) {
        console.error('Error resending verification:', error);
        alert('Failed to resend verification email. Please try again.');
      } else {
        alert('Verification email sent! Please check your inbox.');
      }
    } catch (error) {
      console.error('Error resending verification:', error);
      alert('Failed to resend verification email. Please try again.');
    }
  };

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
              This may take a few moments (Attempt {attemptCount}/5)
            </p>
            <div className="mt-4 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(attemptCount / 5) * 100}%` }}
              ></div>
            </div>
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

        {status === 'expired' && (
          <>
            <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Verification Link Expired
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {errorMessage}
            </p>
            <div className="space-y-3">
              <button
                onClick={handleResendVerification}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Resend Verification Email
              </button>
              <button
                onClick={() => navigate('/')}
                className="w-full px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              >
                Back to Home
              </button>
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
              {errorMessage || 'There was an issue with verification. You may already be signed in.'}
            </p>
            <div className="space-y-3">
              <button
                onClick={handleResendVerification}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Resend Verification Email
              </button>
              <button
                onClick={() => navigate('/pricing')}
                className="w-full px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              >
                Continue to Pricing
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                className="w-full px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
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
