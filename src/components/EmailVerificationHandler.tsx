import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { CheckCircle, XCircle, Loader, RefreshCcw, AlertCircle, UserX, Mail } from 'lucide-react';

export function EmailVerificationHandler() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'processing' | 'user_not_found'>('loading');
  const [message, setMessage] = useState('Verifying your email...');
  const [isProcessing, setIsProcessing] = useState(false);
  const [debugInfo, setDebugInfo] = useState<string[]>([]);
  const [userEmail, setUserEmail] = useState<string>('');
  const navigate = useNavigate();

  // Add debug logging function
  const addDebugInfo = (info: string) => {
    console.log(info);
    setDebugInfo(prev => [...prev, `${new Date().toLocaleTimeString()}: ${info}`]);
  };

  useEffect(() => {
    let isMounted = true;
    let timeoutId: NodeJS.Timeout;
    
    const processEmailVerification = async () => {
      if (!isMounted) return;
      
      try {
        addDebugInfo('🔥 EMAIL VERIFICATION HANDLER STARTED');
        setStatus('processing');
        setMessage('Processing verification...');
        
        const urlHash = window.location.hash;
        const urlSearch = window.location.search;
        
        addDebugInfo(`📍 URL Hash: ${urlHash}`);
        addDebugInfo(`📍 URL Search: ${urlSearch}`);
        
        let accessToken = null;
        let refreshToken = null;
        let tokenType = null;
        
        // Parse tokens from URL hash first
        if (urlHash) {
          const hashParams = new URLSearchParams(urlHash.substring(1));
          accessToken = hashParams.get('access_token');
          refreshToken = hashParams.get('refresh_token');
          tokenType = hashParams.get('token_type');
        }
        
        // Fallback to URL search params
        if (!accessToken && urlSearch) {
          const searchParams = new URLSearchParams(urlSearch);
          accessToken = searchParams.get('access_token');
          refreshToken = searchParams.get('refresh_token');
          tokenType = searchParams.get('token_type');
        }
        
        addDebugInfo(`🔑 Tokens found: access=${accessToken ? 'YES' : 'NO'}, refresh=${refreshToken ? 'YES' : 'NO'}, type=${tokenType}`);
        
        // Extract email from JWT token for better error messaging
        if (accessToken) {
          try {
            const payload = JSON.parse(atob(accessToken.split('.')[1]));
            setUserEmail(payload.email || '');
            addDebugInfo(`📧 Email from token: ${payload.email || 'not found'}`);
          } catch (e) {
            addDebugInfo('⚠️ Could not decode JWT token');
          }
        }
        
        if (accessToken && refreshToken) {
          addDebugInfo('🚀 Setting session with tokens...');
          setMessage('Establishing secure session...');
          
          const { data: sessionData, error: sessionError } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken
          });

          if (sessionError) {
            addDebugInfo(`❌ Session error: ${sessionError.message}`);
            
            // Handle specific "user does not exist" error
            if (sessionError.message.includes('User from sub claim in JWT does not exist')) {
              if (isMounted) {
                setStatus('user_not_found');
                setMessage('Your account was not found in our system. This usually happens when the account was removed.');
              }
              return;
            }
            
            // Handle token expiration
            if (sessionError.message.includes('expired') || sessionError.message.includes('Invalid JWT')) {
              if (isMounted) {
                setStatus('error');
                setMessage('Your verification link has expired. Please request a new verification email.');
              }
              return;
            }
            
            // Handle other session errors
            if (isMounted) {
              setStatus('error');
              setMessage(`Session error: ${sessionError.message}`);
            }
            return;
          }

          if (sessionData?.user) {
            addDebugInfo(`✅ Session established for: ${sessionData.user.email}`);
            setMessage('Updating verification status...');
            
            // Update database immediately to reflect email verification status
            try {
              const { error: dbError } = await supabase
                .from('user_access_status')
                .upsert({
                  id: sessionData.user.id,
                  email: sessionData.user.email,
                  email_verified: true,
                  updated_at: new Date().toISOString()
                }, { onConflict: 'id' });

              if (dbError) {
                addDebugInfo(`⚠️ Database update error for user_access_status: ${dbError.message}`);
              } else {
                addDebugInfo('✅ Database updated successfully for user_access_status');
              }
            } catch (dbError: any) {
              addDebugInfo(`⚠️ Database update exception: ${dbError.message}`);
            }

            if (isMounted) {
              setStatus('success');
              setMessage(`Welcome ${sessionData.user.email}! Email verified successfully.`);
              
              // Clean the URL immediately
              window.history.replaceState({}, document.title, '/auth/callback');
              
              // Set a timeout for redirect with longer delay for better UX
              timeoutId = setTimeout(() => {
                if (isMounted) {
                  addDebugInfo('🔄 Redirecting to pricing page...');
                  navigate('/pricing', { replace: true });
                }
              }, 2000);
            }
            return;
          }
        }

        // Check for error parameters
        const errorCode = new URLSearchParams(urlSearch).get('error_code') || 
                         (urlHash ? new URLSearchParams(urlHash.substring(1)).get('error_code') : null);
        const errorDescription = new URLSearchParams(urlSearch).get('error_description') || 
                               (urlHash ? new URLSearchParams(urlHash.substring(1)).get('error_description') : null);
        
        if (errorCode) {
          addDebugInfo(`❌ Error in URL parameters: ${errorCode} - ${errorDescription}`);
          if (isMounted) {
            setStatus('error');
            setMessage(`Verification failed: ${errorDescription || errorCode}`);
          }
          return;
        }

        // Alternative: Check if user is already authenticated
        addDebugInfo('🔍 Checking existing session...');
        setMessage('Checking authentication status...');
        
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError) {
          addDebugInfo(`❌ User check error: ${userError.message}`);
          if (isMounted) {
            setStatus('error');
            setMessage('Unable to verify session. Please try signing in again.');
          }
          return;
        }

        if (user) {
          addDebugInfo(`👤 Found existing user: ${user.email}`);
          
          if (user.email_confirmed_at) {
            addDebugInfo('✅ User already verified');
            if (isMounted) {
              setStatus('success');
              setMessage('Email already verified! Redirecting...');
              timeoutId = setTimeout(() => {
                if (isMounted) {
                  navigate('/pricing', { replace: true });
                }
              }, 1500);
            }
            return;
          }
        }

        // If we get here, verification failed
        addDebugInfo('❌ No valid tokens or session found, or email not confirmed.');
        if (isMounted) {
          setStatus('error');
          setMessage('No verification tokens found or email not confirmed. Please check your email and click the verification link again.');
        }
        
      } catch (error: any) {
        addDebugInfo(`💥 Verification process error: ${error.message}`);
        if (isMounted) {
          setStatus('error');
          setMessage(`Verification failed: ${error.message || 'Unknown error'}`);
        }
      }
    };

    // Start verification process
    processEmailVerification();
    
    return () => {
      isMounted = false;
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [navigate]);

  const handleManualRetry = async () => {
    setIsProcessing(true);
    setStatus('loading');
    setMessage('Retrying verification...');
    setDebugInfo([]);
    
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  const handleSignUpAgain = () => {
    addDebugInfo('🔄 User chose to sign up again');
    navigate('/', { replace: true });
  };

  const handleSkipVerification = () => {
    addDebugInfo('🔄 User chose to skip verification');
    navigate('/pricing', { replace: true });
  };

  const handleGoHome = () => {
    addDebugInfo('🏠 User chose to go home');
    navigate('/', { replace: true });
  };

  const toggleDebugInfo = () => {
    const debugElement = document.getElementById('debug-info');
    if (debugElement) {
      debugElement.style.display = debugElement.style.display === 'none' ? 'block' : 'none';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-lg w-full bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 text-center border border-gray-200 dark:border-gray-700">
        
        {(status === 'loading' || status === 'processing') && (
          <>
            <div className="relative mb-6">
              <Loader className="h-16 w-16 text-blue-600 animate-spin mx-auto" />
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
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 mb-4">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
            <p className="text-xs text-gray-400">This usually takes just a few seconds...</p>
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
                Redirecting to pricing page in a moment...
              </p>
            </div>
          </>
        )}

        {status === 'user_not_found' && (
          <>
            <div className="w-20 h-20 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-6">
              <UserX className="h-12 w-12 text-orange-600 dark:text-orange-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
              Account Not Found
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
              {message}
            </p>
            {userEmail && (
              <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4 mb-6">
                <p className="text-orange-800 dark:text-orange-200 text-sm mb-2">
                  <strong>Email:</strong> {userEmail}
                </p>
                <p className="text-orange-800 dark:text-orange-200 text-sm">
                  Your account may have been removed from our system. Please sign up again to create a new account.
                </p>
              </div>
            )}
            <div className="space-y-3 mb-4">
              <button
                onClick={handleSignUpAgain}
                className="w-full flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Mail className="w-5 h-5 mr-2" />
                Sign Up Again
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
            <div className="space-y-3 mb-4">
              <button
                onClick={handleManualRetry}
                disabled={isProcessing}
                className="w-full flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <RefreshCcw className={`w-5 h-5 mr-2 ${isProcessing ? 'animate-spin' : ''}`} />
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
            
            {/* Debug Information Toggle */}
            <button
              onClick={toggleDebugInfo}
              className="text-xs text-gray-400 hover:text-gray-600 flex items-center justify-center mx-auto"
            >
              <AlertCircle className="w-3 h-3 mr-1" />
              Show Debug Info
            </button>
          </>
        )}
        
        {/* Debug Information Panel */}
        <div id="debug-info" style={{ display: 'none' }} className="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg text-left text-xs">
          <h4 className="font-semibold mb-2">Debug Information:</h4>
          <div className="max-h-40 overflow-y-auto space-y-1">
            {debugInfo.map((info, index) => (
              <div key={index} className="text-gray-600 dark:text-gray-300 font-mono">
                {info}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

