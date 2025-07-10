import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Lock, Mail, CreditCard, CheckCircle } from 'lucide-react';

interface WritingAccessCheckProps {
  children: React.ReactNode;
  onNavigate: (page: string) => void;
}

export const WritingAccessCheck: React.FC<WritingAccessCheckProps> = ({ 
  children, 
  onNavigate 
}) => {
  const { 
    user, 
    emailVerified, 
    paymentCompleted, 
    loading,
    verificationStatus 
  } = useAuth();

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Checking access...</p>
        </div>
      </div>
    );
  }

  // Check if user is logged in
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
          <Lock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Sign In Required
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Please sign in to access the writing tools.
          </p>
          <button
            onClick={() => onNavigate('home')}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Sign In
          </button>
        </div>
      </div>
    );
  }

  // Enhanced temporary payment access check (24-hour grace period)
  const hasTemporaryAccess = () => {
    try {
      const paymentDate = localStorage.getItem('payment_date');
      const paymentPlan = localStorage.getItem('payment_plan');
      
      if (paymentDate && paymentPlan) {
        const paymentTime = new Date(paymentDate).getTime();
        const now = Date.now();
        const hoursSincePayment = (now - paymentTime) / (1000 * 60 * 60);
        
        // 24-hour temporary access
        return hoursSincePayment < 24;
      }
      return false;
    } catch (error) {
      console.error('Error checking temporary access:', error);
      return false;
    }
  };

  // Comprehensive access check - compatible with both database designs
  const hasWritingAccess = emailVerified && (paymentCompleted || hasTemporaryAccess());

  // Check email verification
  if (!emailVerified) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
          <Mail className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Email Verification Required
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Please verify your email address to access the writing tools.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => onNavigate('dashboard')}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go to Dashboard
            </button>
            <button
              onClick={() => onNavigate('home')}
              className="w-full bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 py-2 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Check payment status (with enhanced temporary access consideration)
  if (!hasWritingAccess) {
    const temporaryAccess = hasTemporaryAccess();
    
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
          <CreditCard className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {temporaryAccess ? 'Temporary Access Expired' : 'Payment Required'}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {temporaryAccess 
              ? 'Your temporary access has expired. Please complete payment to continue.'
              : 'Please complete payment to access the writing tools.'
            }
          </p>
          
          {/* Enhanced status indicators */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6 text-left">
            <div className="flex items-center space-x-2 mb-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Email verified</span>
            </div>
            <div className="flex items-center space-x-2">
              <CreditCard className="w-4 h-4 text-red-500" />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Payment {temporaryAccess ? 'expired' : 'required'}
              </span>
            </div>
            {temporaryAccess && (
              <div className="flex items-center space-x-2 mt-2">
                <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Temporary access available
                </span>
              </div>
            )}
          </div>
          
          <div className="space-y-3">
            <button
              onClick={() => onNavigate('pricing')}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
            >
              View Pricing Plans
            </button>
            <button
              onClick={() => onNavigate('dashboard')}
              className="w-full bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 py-2 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  // User has full access - render the writing tools with enhanced feedback
  return (
    <div className="relative">
      {/* Enhanced success indicator for temporary access */}
      {hasTemporaryAccess() && !paymentCompleted && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <CheckCircle className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                You have temporary access to the writing tools. Complete payment for permanent access.
              </p>
              <button
                onClick={() => onNavigate('pricing')}
                className="mt-2 text-sm text-yellow-800 dark:text-yellow-200 underline hover:text-yellow-900 dark:hover:text-yellow-100"
              >
                Upgrade now →
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Render the writing interface */}
      {children}
    </div>
  );
};

