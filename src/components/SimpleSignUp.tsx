import React, { useState, useEffect } from 'react';
import { Mail, Lock, Loader, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { signUp, signIn } from '../lib/supabase'; // Import both signUp and signIn functions

interface SimpleSignUpProps {
  onSuccess: () => void;
  onSignInClick: () => void;
}

export function SimpleSignUp({ onSuccess, onSignInClick }: SimpleSignUpProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [debugInfo, setDebugInfo] = useState<string | null>(null);
  const [passwordStrength, setPasswordStrength] = useState<'weak' | 'medium' | 'strong' | null>(null);
  const [signupTimer, setSignupTimer] = useState<number>(0);
  const [timerActive, setTimerActive] = useState<boolean>(false);

  // Password strength checker
  useEffect(() => {
    if (!password) {
      setPasswordStrength(null);
      return;
    }
    
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    if (password.length < 8) {
      setPasswordStrength('weak');
    } else if (password.length >= 8 && (hasLetter && hasNumber) || (hasLetter && hasSpecial) || (hasNumber && hasSpecial)) {
      setPasswordStrength('medium');
    } else if (password.length >= 10 && hasLetter && hasNumber && hasSpecial) {
      setPasswordStrength('strong');
    } else {
      setPasswordStrength('medium');
    }
  }, [password]);

  // Timer for signup process
  useEffect(() => {
    let interval: number | undefined;
    
    if (timerActive) {
      interval = window.setInterval(() => {
        setSignupTimer(prev => prev + 1);
        
        // If signup takes more than 20 seconds, show a warning
        if (signupTimer >= 20) {
          setDebugInfo(prev => `${prev}\nSignup is taking longer than expected. This might indicate a network issue.`);
        }
      }, 1000);
    } else {
      setSignupTimer(0);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerActive, signupTimer]);

  // Email validation
  const validateEmail = (email: string): boolean => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setDebugInfo('Starting signup process...');
    setTimerActive(true);
    
    // Enhanced validation
    if (!email) {
      setError('Email is required');
      setTimerActive(false);
      return;
    }
    
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      setTimerActive(false);
      return;
    }
    
    if (!password) {
      setError('Password is required');
      setTimerActive(false);
      return;
    }
    
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      setTimerActive(false);
      return;
    }
    
    if (!/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) {
      setError('Password must include both letters and numbers');
      setTimerActive(false);
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setTimerActive(false);
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Step 1: Sign up the user with enhanced error handling
      setDebugInfo(prev => `${prev}\nAttempting to sign up user...`);
      
      // Add manual timeout for UI feedback
      const signupPromise = signUp(email, password);
      
      // Create a manual timeout promise
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
          reject(new Error("Signup request is taking too long. This might indicate a network issue."));
        }, 30000); // 30 seconds timeout for UI
      });
      
      // Race between the signup and timeout
      const signupResult = await Promise.race([signupPromise, timeoutPromise]) as any;
      
      // Handle various signup result scenarios
      if (signupResult.error) {
        setError(signupResult.error.message);
        setDebugInfo(prev => `${prev}\nError: ${signupResult.error.message}`);
        if (signupResult.error.originalError) {
          setDebugInfo(prev => `${prev}\nOriginal error: ${JSON.stringify(signupResult.error.originalError)}`);
        }
        setIsLoading(false);
        setTimerActive(false);
        return;
      }
      
      if (signupResult.emailConfirmationRequired) {
        setSuccessMessage('Please check your email to confirm your account.');
        setDebugInfo(prev => `${prev}\nEmail confirmation required. Verification email sent.`);
        setIsLoading(false);
        setTimerActive(false);
        return;
      }
      
      if (!signupResult.user) {
        setError('Signup failed: No user data returned');
        setDebugInfo(prev => `${prev}\nNo user data returned from signup`);
        setIsLoading(false);
        setTimerActive(false);
        return;
      }
      
      setDebugInfo(prev => `${prev}\nUser created successfully. ID: ${signupResult.user?.id.substring(0, 5)}...`);
      
      // Step 2: If we don't have a session yet, explicitly sign in the user
      if (!signupResult.session) {
        setDebugInfo(prev => `${prev}\nNo session returned, attempting to sign in user...`);
        const signinResult = await signIn(email, password);
        
        if (signinResult.error) {
          // Non-blocking error - account was created but auto-login failed
          setSuccessMessage('Account created! Please sign in to continue.');
          setDebugInfo(prev => `${prev}\nAuto sign-in failed: ${signinResult.error.message}`);
          setIsLoading(false);
          setTimerActive(false);
          
          // Delay before redirecting to sign-in
          setTimeout(() => {
            onSignInClick();
          }, 2000);
          
          return;
        }
        
        if (!signinResult.user) {
          // Non-blocking error - account was created but auto-login failed
          setSuccessMessage('Account created! Please sign in to continue.');
          setDebugInfo(prev => `${prev}\nAuto sign-in failed: No user returned`);
          setIsLoading(false);
          setTimerActive(false);
          
          // Delay before redirecting to sign-in
          setTimeout(() => {
            onSignInClick();
          }, 2000);
          
          return;
        }
        
        setDebugInfo(prev => `${prev}\nUser signed in successfully`);
      }
      
      // Step 3: Store email and set redirect flag
      localStorage.setItem('userEmail', email);
      localStorage.setItem('redirect_after_signup', 'pricing');
      
      setDebugInfo(prev => `${prev}\nRedirect flag set to 'pricing'`);
      setSuccessMessage('Account created successfully!');
      setTimerActive(false);
      
      // Step 4: Small delay to ensure localStorage is updated before callback
      setTimeout(() => {
        setDebugInfo(prev => `${prev}\nCalling onSuccess callback...`);
        onSuccess();
      }, 1000);
      
    } catch (err: any) {
      console.error('Unexpected error during signup:', err);
      setError(`An unexpected error occurred: ${err.message || 'Unknown error'}`);
      setDebugInfo(prev => `${prev}\nCaught exception: ${err.message || 'Unknown error'}`);
      if (err.stack) {
        console.error('Error stack:', err.stack);
        setDebugInfo(prev => `${prev}\nStack trace: ${err.stack}`);
      }
      setIsLoading(false);
      setTimerActive(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSignUp} className="space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">Create Your Account</h2>
        
        {error && (
          <div className="p-3 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-md text-sm flex items-start">
            <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}
        
        {successMessage && (
          <div className="p-3 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-md text-sm flex items-start">
            <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
            <span>{successMessage}</span>
          </div>
        )}
        
        {debugInfo && (
          <div className="p-3 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-md text-xs font-mono whitespace-pre-wrap">
            {debugInfo}
          </div>
        )}
        
        <div>
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              placeholder="you@example.com"
              required
              aria-describedby="email-validation"
            />
          </div>
          {email && !validateEmail(email) && (
            <p id="email-validation" className="mt-1 text-sm text-red-600 dark:text-red-400">
              Please enter a valid email address
            </p>
          )}
        </div>
        
        <div>
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              placeholder="••••••••"
              required
              aria-describedby="password-strength"
              minLength={8}
            />
          </div>
          {password && (
            <div id="password-strength" className="mt-1">
              <div className="flex items-center">
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div 
                    className={`h-2.5 rounded-full ${
                      passwordStrength === 'weak' ? 'w-1/3 bg-red-500' : 
                      passwordStrength === 'medium' ? 'w-2/3 bg-yellow-500' : 
                      passwordStrength === 'strong' ? 'w-full bg-green-500' : ''
                    }`}
                  ></div>
                </div>
                <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                  {passwordStrength === 'weak' ? 'Weak' : 
                   passwordStrength === 'medium' ? 'Medium' : 
                   passwordStrength === 'strong' ? 'Strong' : ''}
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Password must be at least 8 characters with letters and numbers
              </p>
            </div>
          )}
        </div>
        
        <div>
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              placeholder="••••••••"
              required
            />
          </div>
          {confirmPassword && password !== confirmPassword && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              Passwords do not match
            </p>
          )}
        </div>
        
        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            aria-live="polite"
          >
            {isLoading ? (
              <>
                <Loader className="animate-spin -ml-1 mr-2 h-5 w-5" />
                {timerActive && signupTimer > 10 ? (
                  <span className="flex items-center">
                    Creating account... ({signupTimer}s)
                    <Clock className="ml-1 h-4 w-4" />
                  </span>
                ) : (
                  "Creating account..."
                )}
              </>
            ) : (
              'Sign Up'
            )}
          </button>
          
          <button
            type="button"
            onClick={onSignInClick}
            className="mt-4 text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 text-center w-full"
          >
            Already have an account? Sign in
          </button>
        </div>
      </form>
    </div>
  );
}
