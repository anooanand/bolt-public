import React, { useState, useEffect, useRef } from 'react';
import { Mail, Lock, Loader, CheckCircle } from 'lucide-react';
import { signUp } from '../lib/supabase';

interface SimpleSignUpProps {
  onSignInClick: () => void;
  onSignUpSuccess?: (user: any) => void;
}

export function SimpleSignUp({ onSignInClick, onSignUpSuccess }: SimpleSignUpProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isMounted.current) {
      console.log("Form submitted before component mounted, ignoring.");
      return;
    }
    
    setError('');
    
    // Validate passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    // Validate password strength
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    
    setIsLoading(true);
    
    try {
      console.log("Starting signup process for:", email);
      const result = await signUp(email, password);
      
      console.log("Signup result:", result);
      
      // Store email in localStorage for later use
      localStorage.setItem('userEmail', email);
      
      // FIXED: Show success state first
      setIsSuccess(true);
      setIsLoading(false);
      
      // FIXED: Wait a moment to show success, then call callback
      setTimeout(() => {
        if (isMounted.current && onSignUpSuccess) {
          console.log("Signup successful! Calling onSignUpSuccess callback");
          onSignUpSuccess(result.user || result);
        }
      }, 1000); // Show success for 1 second
      
    } catch (err: any) {
      console.error("Signup failed:", err);
      setIsLoading(false);
      
      if (err && typeof err === 'object') {
        if (err.message?.includes('already registered') || err.message?.includes('already exists')) {
          setError('This email is already registered. Please sign in instead.');
        } else if (err.message?.includes('network') || err.message?.includes('connect')) {
          setError('Network error: Please check your internet connection and try again.');
        } else {
          setError(err.message || 'An unexpected error occurred');
        }
        
        // Log detailed error for debugging
        console.error('Signup error details:', err);
      } else {
        setError('An unexpected error occurred');
        console.error('Unknown signup error:', err);
      }
    }
  };

  // FIXED: Show success state
  if (isSuccess) {
    return (
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
          <div className="text-center">
            <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
            <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Account Created!</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Welcome! Your account has been successfully created.
            </p>
            <div className="animate-pulse text-sm text-gray-500 dark:text-gray-400">
              Redirecting to pricing...
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">Create Account</h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-md text-sm">
            {error}
          </div>
        )}
        
        <div className="mb-4">
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
              disabled={isLoading}
            />
          </div>
        </div>
        
        <div className="mb-4">
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
              disabled={isLoading}
            />
          </div>
        </div>
        
        <div className="mb-6">
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
              disabled={isLoading}
            />
          </div>
        </div>
        
        <div className="flex flex-col gap-4">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <Loader className="animate-spin -ml-1 mr-2 h-5 w-5" />
                Creating account...
              </>
            ) : (
              'Sign Up'
            )}
          </button>
          
          <button
            type="button"
            onClick={onSignInClick}
            disabled={isLoading}
            className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 text-center disabled:opacity-50"
          >
            Already have an account? Sign in
          </button>
        </div>
      </form>
    </div>
  );
}

