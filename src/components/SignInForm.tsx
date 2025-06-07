import React, { useState } from 'react';
import { Mail, Lock, Loader, AlertCircle } from 'lucide-react';
import { signIn } from '../lib/supabase';
import { requestPasswordReset } from '../lib/supabase';

interface SignInFormProps {
  onSuccess: (user: any) => void; // Updated to accept user parameter
  onSignUpClick: () => void;
}

export function SignInForm({ onSuccess, onSignUpClick }: SignInFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [showResetForm, setShowResetForm] = useState(false);
  const [resetEmail, setResetEmail] = useState('');

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const result = await signIn(email, password);
      
      if (result.error) {
        setError(result.error.message);
        setIsLoading(false);
        return;
      }
      
      if (!result.user) {
        setError('Sign in failed: No user data returned');
        setIsLoading(false);
        return;
      }
      
      // Store user email in localStorage
      localStorage.setItem('userEmail', email);
      
      console.log('Sign in successful, calling onSuccess with user:', result.user);
      
      // Call success callback with the user object
      onSuccess(result.user);
      
    } catch (err: any) {
      console.error('Unexpected error during sign in:', err);
      setError(`An unexpected error occurred: ${err.message || 'Unknown error'}`);
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!resetEmail) {
      setError('Please enter your email address');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const result = await requestPasswordReset(resetEmail);
      
      if (!result.success) {
        setError(result.error?.message || 'Failed to send reset email');
        setIsLoading(false);
        return;
      }
      
      setResetSent(true);
      setIsLoading(false);
      
    } catch (err: any) {
      console.error('Unexpected error during password reset:', err);
      setError(`An unexpected error occurred: ${err.message || 'Unknown error'}`);
      setIsLoading(false);
    }
  };

  if (showResetForm) {
    return (
      <div className="w-full max-w-md mx-auto">
        <form onSubmit={handleResetPassword} className="space-y-6">
          <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">Reset Password</h2>
          
          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-md text-sm flex items-start">
              <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}
          
          {resetSent && (
            <div className="p-3 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-md text-sm">
              Password reset email sent. Please check your inbox.
            </div>
          )}
          
          <div>
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="resetEmail">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                id="resetEmail"
                type="email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>
          
          <div>
            <button
              type="submit"
              disabled={isLoading || resetSent}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <Loader className="animate-spin -ml-1 mr-2 h-5 w-5" />
                  Sending...
                </>
              ) : resetSent ? (
                'Email Sent'
              ) : (
                'Send Reset Link'
              )}
            </button>
            
            <button
              type="button"
              onClick={() => setShowResetForm(false)}
              className="mt-4 text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 text-center w-full"
            >
              Back to Sign In
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSignIn} className="space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">Sign In</h2>
        
        {error && (
          <div className="p-3 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-md text-sm flex items-start">
            <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
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
            />
          </div>
        </div>
        
        <div>
          <div className="flex items-center justify-between">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <button
              type="button"
              onClick={() => setShowResetForm(true)}
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300"
            >
              Forgot password?
            </button>
          </div>
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
            />
          </div>
        </div>
        
        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <Loader className="animate-spin -ml-1 mr-2 h-5 w-5" />
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>
          
          <button
            type="button"
            onClick={onSignUpClick}
            className="mt-4 text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 text-center w-full"
          >
            Don't have an account? Sign up
          </button>
        </div>
      </form>
    </div>
  );
}

