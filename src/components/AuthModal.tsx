import React, { useState, useEffect } from 'react';
import { X, Mail, Lock, Eye, EyeOff, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: any) => void;
  initialMode: 'signin' | 'signup';
  onNavigate: (page: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  initialMode,
  onNavigate
}) => {
  const [mode, setMode] = useState<'signin' | 'signup' | 'confirmation'>('signin');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const [confirmationEmail, setConfirmationEmail] = useState<string>('');
  const [verificationChecking, setVerificationChecking] = useState(false);

  // Reset form when modal opens or mode changes
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setError('');
      setSuccess(false);
      
      // Try to get email from localStorage
      const savedEmail = localStorage.getItem('userEmail');
      if (savedEmail) {
        setEmail(savedEmail);
        setConfirmationEmail(savedEmail);
      }
    } else {
      // Reset form when modal closes
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setError('');
      setSuccess(false);
    }
  }, [isOpen, initialMode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'signup') {
        if (password !== confirmPassword) {
          setError('Passwords do not match');
          setLoading(false);
          return;
        }
        
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`
          }
        });
        
        if (error) {
          setError(error.message);
        } else if (data.user) {
          localStorage.setItem('userEmail', email);
          setConfirmationEmail(email);
          setMode('confirmation');
          setSuccess(true);
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) {
          setError(error.message);
        } else if (data.user) {
          localStorage.setItem('userEmail', email);
          setSuccess(true);
          
          // Check if email is verified
          if (data.user.email_confirmed_at) {
            // Email is verified, proceed normally
            setTimeout(() => {
              onSuccess(data.user);
            }, 1500);
          } else {
            // Email is not verified, show confirmation screen
            setConfirmationEmail(email);
            setMode('confirmation');
          }
        }
      }
    } catch (err: any) {
      setError('An unexpected error occurred: ' + (err.message || 'Please try again'));
    } finally {
      setLoading(false);
    }
  };

  const handleResendConfirmation = async () => {
    setLoading(true);
    setError('');
    
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: confirmationEmail,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      });
      
      if (error) {
        setError(error.message);
      } else {
        setSuccess(true);
        // Show temporary success message
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (err: any) {
      setError('Failed to resend confirmation email: ' + (err.message || 'Please try again'));
    } finally {
      setLoading(false);
    }
  };

  const handleVerificationCheck = async () => {
    setVerificationChecking(true);
    setError('');
    
    try {
      // Refresh the session to check if email has been verified
      const { data, error } = await supabase.auth.refreshSession();
      
      if (error) {
        setError(error.message);
        setVerificationChecking(false);
        return;
      }
      
      if (data.session?.user?.email_confirmed_at) {
        // Email has been verified
        setSuccess(true);
        setTimeout(() => {
          onSuccess(data.session!.user);
        }, 1500);
      } else {
        // Try to sign out and sign in again to refresh the session completely
        await supabase.auth.signOut();
        
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
          email: confirmationEmail,
          password,
        });
        
        if (signInError) {
          setError('Failed to refresh session. Please try signing in again.');
        } else if (signInData.user?.email_confirmed_at) {
          // Email is now verified
          setSuccess(true);
          setTimeout(() => {
            onSuccess(signInData.user);
          }, 1500);
        } else {
          setError('Email not yet verified. Please check your inbox and click the verification link.');
        }
      }
    } catch (err: any) {
      setError('Failed to check verification status: ' + (err.message || 'Please try again'));
    } finally {
      setVerificationChecking(false);
    }
  };

  if (!isOpen) return null;

  if (mode === 'confirmation') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full text-center" onClick={e => e.stopPropagation()}>
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Check Your Email
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            We've sent a confirmation link to <strong>{confirmationEmail}</strong>. 
            Please check your inbox and click the verification link to activate your account.
          </p>
          
          {error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-md">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" />
                <p className="text-sm">{error}</p>
              </div>
            </div>
          )}
          
          {success && (
            <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-md">
              <div className="flex">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                <p className="text-sm">Confirmation email sent successfully!</p>
              </div>
            </div>
          )}
          
          <div className="flex flex-col space-y-3">
            <button
              onClick={handleResendConfirmation}
              disabled={loading}
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <Loader className="animate-spin -ml-1 mr-2 h-5 w-5" />
                  Sending...
                </>
              ) : (
                'Resend Confirmation Email'
              )}
            </button>
            
            <button
              onClick={handleVerificationCheck}
              disabled={verificationChecking || !password}
              className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {verificationChecking ? (
                <>
                  <Loader className="animate-spin -ml-1 mr-2 h-5 w-5" />
                  Checking...
                </>
              ) : (
                "I've Verified My Email"
              )}
            </button>
            
            <button
              onClick={() => setMode('signin')}
              className="w-full py-2 px-4 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              Back to Sign In
            </button>
          </div>
          
          <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
            After confirming your email, you'll need to complete payment to access all features.
          </p>
        </div>
      </div>
    );
  }

  if (success && mode === 'signin') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome to Writing Assistant!
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            You've successfully signed in. Redirecting to your dashboard...
          </p>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {mode === 'signin' ? 'Sign In' : 'Create Account'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors z-10"
            type="button"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-md">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" />
                <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
              </div>
            </div>
          )}

          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Enter your password"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Confirm Password Field (Sign Up Only) */}
          {mode === 'signup' && (
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Confirm your password"
                  required
                  minLength={6}
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-2 px-4 rounded-md font-medium transition-colors flex items-center justify-center"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              mode === 'signin' ? 'Sign In' : 'Create Account'
            )}
          </button>

          {/* Mode Toggle */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {mode === 'signin' ? "Don't have an account?" : 'Already have an account?'}
              <button
                type="button"
                onClick={() => {
                  setMode(mode === 'signin' ? 'signup' : 'signin');
                  setError('');
                  setPassword('');
                  setConfirmPassword('');
                }}
                className="ml-1 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
              >
                {mode === 'signin' ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>

          {/* Info Box */}
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-md">
            <div className="flex">
              <Mail className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
              <div>
                <p className="text-xs text-blue-700 dark:text-blue-300">
                  <strong>{mode === 'signin' ? 'Sign In' : 'Sign Up'} Process:</strong>
                </p>
                {mode === 'signin' ? (
                  <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                    Sign in with your email and password to access your account.
                  </p>
                ) : (
                  <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                    1. Create your account<br />
                    2. Verify your email address<br />
                    3. Complete payment to unlock all features
                  </p>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}