import React, { useEffect } from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

interface PaymentSuccessPageProps {
  planType?: string;
  onContinue?: () => void; // Make onContinue optional as we'll handle navigation internally
}

export const PaymentSuccessPage: React.FC<PaymentSuccessPageProps> = ({
  planType,
}) => {
  const { forceRefreshVerification, user } = useAuth();
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Force refresh verification after payment success
    const refreshTimer = setTimeout(() => {
      if (forceRefreshVerification) {
        forceRefreshVerification();
      }
      // Directly navigate to dashboard after a short delay
      navigate('/dashboard');
    }, 2000); // 2-second delay before redirecting

    return () => clearTimeout(refreshTimer);
  }, [forceRefreshVerification, navigate]);

  // ENHANCED: Better click handler with debugging
  const handleContinueClick = () => {
    console.log('🔄 Continue to Dashboard clicked');
    navigate('/dashboard'); // Ensure button also navigates to dashboard
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

        {/* ENHANCED: Better button with explicit click handler and debugging */}
        <button
          onClick={handleContinueClick}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          type="button"
        >
          <span>Continue to Dashboard</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        {/* ENHANCED: Debug info (remove in production) */}
        <div className="mt-4 text-xs text-gray-500">
          <p>User: {user ? 'Logged in' : 'Not logged in'}</p>
          <p>Plan: {planType || 'Unknown'}</p>
        </div>
      </div>
    </div>
  );
};
