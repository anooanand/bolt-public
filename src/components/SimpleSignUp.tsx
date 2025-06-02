import React, { useState } from 'react';
import { Mail, Lock, Loader } from 'lucide-react';
import { signUp } from '../lib/supabase'; // Import the shared signUp function

interface SimpleSignUpProps {
  onSuccess: () => void;
  onSignInClick: () => void;
}

export function SimpleSignUp({ onSuccess, onSignInClick }: SimpleSignUpProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [debugInfo, setDebugInfo] = useState<string | null>(null);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setDebugInfo(null);
    
    // Basic validation
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setIsLoading(true);
    setDebugInfo('Starting signup process...');
    
    try {
      // Use the shared signUp function from supabase.ts
      const data = await signUp(email, password);
      
      setDebugInfo(prev => `${prev}\nSignup API call completed.`);
      
      if (!data || !data.user) {
        setError('Signup failed: No user data returned');
        setDebugInfo(prev => `${prev}\nNo user data returned`);
        return;
      }
      
      setDebugInfo(prev => `${prev}\nUser created successfully. ID: ${data.user?.id.substring(0, 5)}...`);
      
      // Store email in localStorage
      localStorage.setItem('userEmail', email);
      
      // Set redirect target to pricing page
      localStorage.setItem('redirect_after_signup', 'pricing');
      
      // Call success callback
      onSuccess();
      
    } catch (err: any) {
      console.error('Unexpected error during signup:', err);
      setError(`An unexpected error occurred: ${err.message || 'Unknown error'}`);
      setDebugInfo(prev => `${prev}\nCaught exception: ${err.message || 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSignUp} className="space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">Create Your Account</h2>
        
        {error && (
          <div className="p-3 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-md text-sm">
            {error}
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
            />
          </div>
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
            />
          </div>
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
                Creating account...
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
