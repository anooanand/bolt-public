import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase, isEmailVerified } from '../lib/supabase';
import { CheckCircle, XCircle, Loader, AlertTriangle } from 'lucide-react';

export function EmailVerificationHandler() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'expired' | 'already_verified'>('loading');
  const [errorMessage, setErrorMessage] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let mounted = true;

    const processVerification = async () => {
      if (!mounted) return;

      try {
        console.log('=== EMAIL VERIFICATION HANDLER STARTED ===');
        console.log('Current URL:', window.location.href);
        
        // FIRST: Get current user session
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError) {
          console.error('❌ Error getting user:', userError);
          if (mounted) {
            setStatus('error');
            setErrorMessage('Unable to verify user session. Please try signing in again.');
          }
          return;
        }

        if (!user) {
          console.log('❌ No user session found');
          if (mounted) {
            setStatus('error');
            setErrorMessage('No user session found. Please sign in again.');
          }
          return;
        }

        console.log('✅ User session found:', user.email);
        setUserEmail(user.email || '');

        // SECOND: Check if user is already verified
        console.log('🔍 Checking if user is already verified...');
        console.log('User email_confirmed_at:', user.email_confirmed_at);
        console.log('User metadata email_verified:', user.user_metadata?.email_verified);
        
        // Check multiple verification sources
        const isAlreadyVerified = user.email_confirmed_at != null || 
                                 user.user_metadata?.email_verified === true ||
                                 await isEmailVerified(user.id);
        
        if (isAlreadyVerified) {
          console.log('✅ User is already verified, redirecting...');
          
          if (mounted) {
            setStatus('already_verified');
            
            // Update user_access_status to ensure consistency
            await supabase
              .from('user_access_status')
              .upsert({
                id: user.id,
                email: user.email,
                email_verified: true,
                updated_at: new Date().toISOString()
              }, { onConflict: 'id' });
            
            // Redirect after a short delay
            setTimeout(() => {
              if (mounted) {
                navigate('/pricing');
              }
            }, 2000);
          }
          return;
        }
        
        // THIRD: Parse URL for errors
        const searchParams = new URLSearchParams(location.search);
        const hashParams = new URLSearchParams(location.hash.substring(1));
        
        const errorCode = searchParams.get('error_code') || hashParams.get('error_code');
        const errorDescription = searchParams.get('error_description') || hashParams.get('error_description');
        const error = searchParams.get('error') || hashParams.get('error');
        
        if (errorCode || error) {
          console.error(`❌ Error in verification URL: ${errorCode || error} - ${errorDescription}`);
          
          if (mounted) {
            if (errorCode === 'otp_expired' || error === 'access_denied') {
              setStatus('expired');
              setErrorMessage('Your verification link has expired. Please request a new verification email.');
            } else {
              setStatus('error');
              setErrorMessage(errorDescription || 'Verification link is invalid or has expired');
            }
          }
          return;
        }

        // FOURTH: Process the verification callback
        console.log('🔄 Processing verification callback...');
        
        // Get the current session to see if verification was successful
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('❌ Session error:', sessionError);
          if (mounted) {
            setStatus('error');
            setErrorMessage('Error verifying session. Please try signing in again.');
          }
          return;
        }
        
        if (session && session.user) {
          console.log('✅ Email verification successful:', session.user.email);
          
          // Update user_access_status
          await supabase
            .from('user_access_status')
            .upsert({
              id: session.user.id,
              email: session.user.email,
              email_verified: true,
              updated_at: new Date().toISOString()
            }, { onConflict: 'id' });
          
          if (mounted) {
            setUserEmail(session.user.email || '');
            setStatus('success');
            
            // Redirect after showing success message
            setTimeout(() => {
              if (mounted) {
                navigate('/pricing');
              }
            }, 3000);
          }
        } else {
          console.error('❌ No session found after verification');
          
          if (mounted) {
            setStatus('error');
            setErrorMessage('Verification completed but no session found. Please try signing in manually.');
          }
        }
        
      } catch (error: any) {
        console.error('❌ Unexpected error in verification handler:', error);
        
        if (mounted) {
          setStatus('error');
          setErrorMessage('An unexpected error occurred during verification. Please try signing in manually.');
        }
      }
    };

    processVerification();

    return () => {
      mounted = false;
    };
  }, [navigate, location.search, location.hash]);

  const handleResendVerification = async () => {
    try {
      const email = localStorage.getItem('userEmail') || userEmail;
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

  const handleContinueAnyway = () => {
    // For users who are already verified but stuck on this screen
    navigate('/pricing');
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
              This should only take a moment
            </p>
          </>
        )}

        {status === 'already_verified' && (
          <>
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Already Verified! 🎉
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              Welcome back, {userEmail}!
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Your email is already verified. Redirecting you to continue...
            </p>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Redirecting to pricing page...
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
                onClick={handleContinueAnyway}
                className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Continue Anyway (If Already Verified)
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
                onClick={handleContinueAnyway}
                className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Continue to Pricing (If Already Verified)
              </button>
              <button
                onClick={handleResendVerification}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Resend Verification Email
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

