import React, { useState } from 'react';
import { Mail, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface EmailVerificationReminderProps {
  email: string;
  onVerified?: () => void;
}

export function EmailVerificationReminder({ email, onVerified }: EmailVerificationReminderProps) {
  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  const handleResendVerification = async () => {
    setIsResending(true);
    setError(null);
    setResendSuccess(false);
    
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      });
      
      if (error) {
        setError(error.message);
      } else {
        setResendSuccess(true);
        // Reset success message after 5 seconds
        setTimeout(() => setResendSuccess(false), 5000);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to resend verification email');
    } finally {
      setIsResending(false);
    }
  };

  const handleCheckVerification = async () => {
    setIsChecking(true);
    setError(null);
    
    try {
      // Refresh the session to check if email has been verified
      const { data, error } = await supabase.auth.refreshSession();
      
      if (error) {
        setError(error.message);
        setIsChecking(false);
        return;
      }
      
      if (data.session?.user?.email_confirmed_at) {
        // Email has been verified
        if (onVerified) {
          onVerified();
        }
      } else {
        // Try to manually verify the user's email
        try {
          // Force a sign out and sign in to refresh the session completely
          await supabase.auth.signOut();
          
          // Show a message to the user
          alert("Please sign in again to complete the verification process.");
          
          // Reload the page to force a new sign in
          window.location.reload();
        } catch (signOutError) {
          console.error('Error during sign out:', signOutError);
          setError('Email not yet verified. Please try signing out and signing in again.');
          setIsChecking(false);
        }
      }
    } catch (err: any) {
      setError(err.message || 'Failed to check verification status');
      setIsChecking(false);
    }
  };

  return (
    <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-6">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        </div>
        <div className="ml-3">
          <h3 className="text-lg font-medium text-blue-800 dark:text-blue-300">
            Verify Your Email Address
          </h3>
          <div className="mt-2 text-sm text-blue-700 dark:text-blue-400">
            <p>
              We've sent a verification email to <strong>{email}</strong>. 
              Please check your inbox and click the verification link to activate your account.
            </p>
            <p className="mt-2">
              After verifying your email, you'll need to complete payment to access all premium features.
            </p>
            
            {error && (
              <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-md">
                <div className="flex">
                  <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" />
                  <p className="text-sm">{error}</p>
                </div>
              </div>
            )}
            
            {resendSuccess && (
              <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-md">
                <div className="flex">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <p className="text-sm">Verification email sent successfully!</p>
                </div>
              </div>
            )}
            
            <div className="mt-4 flex flex-wrap gap-3">
              <button
                onClick={handleResendVerification}
                disabled={isResending}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {isResending ? (
                  <>
                    <RefreshCw className="animate-spin -ml-1 mr-2 h-4 w-4" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Mail className="mr-2 h-4 w-4" />
                    Resend Verification Email
                  </>
                )}
              </button>
              
              <button
                onClick={handleCheckVerification}
                disabled={isChecking}
                className="inline-flex items-center px-4 py-2 border border-blue-300 text-sm font-medium rounded-md shadow-sm text-blue-700 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {isChecking ? (
                  <>
                    <RefreshCw className="animate-spin -ml-1 mr-2 h-4 w-4" />
                    Checking...
                  </>
                ) : (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    I've Verified My Email
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}