import React, { useState, useEffect } from 'react';
import { Mail, Lock, Loader } from 'lucide-react';
import { signUp } from '../lib/supabase';

interface SimpleSignUpProps {
  onSignInClick: () => void;
  onSignUpSuccess?: (user: any) => void;
}

// Changed from "export default function" to "export function" to match import style
export function SimpleSignUp({ onSignInClick, onSignUpSuccess }: SimpleSignUpProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<{connected: boolean, message: string} | null>(null);

  // Test connection to Netlify Function on component mount
  useEffect(() => {
    const testConnection = async () => {
      try {
        const response = await fetch('/.netlify/functions/auth-proxy', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            action: 'ping'
          })
        });
        
        if (response.ok) {
          setConnectionStatus({
            connected: true,
            message: "Connected to authentication service"
          });
        } else {
          setConnectionStatus({
            connected: false,
            message: "Connected to server but authentication service returned an error"
          });
        }
      } catch (err) {
        console.error("Connection test failed:", err);
        setConnectionStatus({
          connected: false,
          message: "Could not connect to authentication service. Please try again later."
        });
      }
    };
    
    testConnection();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      console.log("Starting signup process...");
      const result = await signUp(email, password);
      
      if (result.success) {
        console.log("Signup successful!");
        // Clear the form
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        // Show success message
        setConnectionStatus({
          connected: true,
          message: "Account created successfully! Redirecting..."
        });
        // Call the success handler
        if (onSignUpSuccess) {
          onSignUpSuccess(result.user);
        }
        // Close the modal or redirect after a short delay
        setTimeout(() => {
          // This will trigger the parent component to close the modal or redirect
          if (onSignUpSuccess) {
            onSignUpSuccess(result.user);
          }
        }, 2000);
      } else if (result.emailExists) {
        setError('This email is already registered. Please sign in instead.');
      } else if (result.error) {
        throw result.error;
      }
    } catch (err: any) {
      console.error("Signup failed:", err);
      
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
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">Create Account</h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-md text-sm">
            {error}
          </div>
        )}
        
        {connectionStatus && (
          <div className={`mb-4 p-3 rounded-md text-sm ${
            connectionStatus.connected 
              ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300' 
              : 'bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
          }`}>
            {connectionStatus.message}
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
            className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 text-center"
          >
            Already have an account? Sign in
          </button>
        </div>
      </form>
    </div>
  );
}
