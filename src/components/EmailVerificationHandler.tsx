import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { CheckCircle, XCircle, Loader } from 'lucide-react';

export function EmailVerificationHandler() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    let authSubscription: any;

    const processVerification = async () => {
      try {
        console.log('=== EMAIL VERIFICATION HANDLER STARTED ===');
        console.log('Current URL:', window.location.href);
        
        // Method 1: Listen for auth state changes (most reliable)
        authSubscription = supabase.auth.onAuthStateChange(async (event, session) => {
          if (!mounted) return;
          
          console.log('🔄 Auth state change in verification handler:', event);
          console.log('📧 Session user:', session?.user?.email);
          
          if (event === 'SIGNED_IN' && session?.user) {
            console.log('✅ SUCCESS: User signed in during verification:', session.user.email);
            setUserEmail(session.user.email || '');
            setStatus('success');
            
            // Redirect after 2 seconds
            setTimeout(() => {
              if (mounted) {
                console.log('🚀 Redirecting to pricing...');
                navigate('/pricing');
              }
            }, 2000);
          }
        });

        // Method 2: Check current session (backup)
        setTimeout(async () => {
          if (!mounted || status !== 'loading') return;
          
          try {
            const { data, error } = await supabase.auth.getSession();
            console.log('🔍 Session check result:', { 
              hasSession: !!data.session, 
              email: data.session?.user?.email,
              error: error?.message 
            });
            
            if (data.session?.user && mounted) {
              console.log('✅ SUCCESS: Found existing session:', data.session.user.email);
              setUserEmail(data.session.user.email || '');
              setStatus('success');
              
              setTimeout(() => {
                if (mounted) {
                  console.log('🚀 Redirecting to pricing...');
                  navigate('/pricing');
                }
              }, 2000);
            }
          } catch (err) {
            console.error('❌ Session check error:', err);
          }
        }, 1000);

        // Method 3: Timeout fallback
        setTimeout(() => {
          if (!mounted || status !== 'loading') return;
          
          console.log('⏰ Verification timeout - checking one more time...');
          
          supabase.auth.getSession().then(({ data, error }) => {
            if (data.session?.user && mounted) {
              console.log('✅ LATE SUCCESS: Found session on timeout check:', data.session.user.email);
              setUserEmail(data.session.user.email || '');
              setStatus('success');
              
              setTimeout(() => {
                if (mounted) {
                  navigate('/pricing');
                }
              }, 1000);
            } else if (mounted) {
              console.log('❌ TIMEOUT: No session found after 8 seconds');
              setStatus('error');
              setErrorMessage('Verification timeout. Please try signing in manually.');
            }
          });
        }, 8000);

      } catch (error: any) {
        console.error('❌ Unexpected error in verification handler:', error);
        if (mounted) {
          setStatus('error');
          setErrorMessage('An unexpected error occurred.');
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
  }, [navigate, status]);

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
