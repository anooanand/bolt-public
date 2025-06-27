// SIMPLE FIX: Replace your PaymentSuccessPage.tsx with this version
// This uses direct window.location navigation which always works

import React, { useEffect } from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface PaymentSuccessPageProps {
  planType?: string;
  onContinue?: () => void;
}

export const PaymentSuccessPage: React.FC<PaymentSuccessPageProps> = ({ 
  planType, 
  onContinue 
}) => {
  const { forceRefreshVerification, user } = useAuth();

  useEffect(() => {
    // Force refresh verification after payment success
    const refreshTimer = setTimeout(() => {
      if (forceRefreshVerification) {
        forceRefreshVerification();
      }
    }, 2000);

    return () => clearTimeout(refreshTimer);
  }, [forceRefreshVerification]);

  // SIMPLE FIX: Direct navigation that always works
  const handleContinueClick = () => {
    console.log('🔄 Continue to Dashboard clicked');
    
    // Force refresh verification
    if (forceRefreshVerification) {
      forceRefreshVerification();
    }
    
    // Direct navigation - this will always work
    setTimeout(() => {
      window.location.href = '/dashboard';
    }, 500);
  };

  const handleGoToWriting = () => {
    console.log('✍️ Going to Writing');
    
    // Force refresh verification
    if (forceRefreshVerification) {
      forceRefreshVerification();
    }
    
    // Direct navigation to writing
    setTimeout(() => {
      window.location.href = '/writing';
    }, 500);
  };

  const handleGoHome = () => {
    console.log('🏠 Going to Home');
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
        <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Payment Successful!
        </h1>
        
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Your {planType || 'premium'} plan has been activated successfully. 
          You now have full access to all features for the next 30 days.
        </p>
        
        <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-4 mb-6">
          <p className="text-sm text-green-800 dark:text-green-200">
            ✅ Email verified<br/>
            ✅ Payment processed<br/>
            ✅ Full access granted
          </p>
        </div>
        
        {/* SIMPLE NAVIGATION BUTTONS */}
        <div className="space-y-3">
          <button
            onClick={handleContinueClick}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            type="button"
          >
            <span>Continue to Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          
          <button
            onClick={handleGoToWriting}
            className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            type="button"
          >
            <span>Start Writing Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          
          <button
            onClick={handleGoHome}
            className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors text-sm"
          >
            Back to Home
          </button>
        </div>
        
        {/* Debug info */}
        <div className="mt-4 text-xs text-gray-500 bg-gray-100 dark:bg-gray-700 p-2 rounded">
          <p>User: {user ? '✅ Logged in' : '❌ Not logged in'}</p>
          <p>Plan: {planType || 'Unknown'}</p>
          <p>Status: Ready for navigation</p>
        </div>
      </div>
    </div>
  );
};

