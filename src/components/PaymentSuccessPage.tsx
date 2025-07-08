import React, { useEffect } from 'react';
import { CheckCircle, ArrowRight, Star, Sparkles, Gift, Heart } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

interface PaymentSuccessPageProps {
  planType?: string;
  onClose?: () => void;
  onContinue?: () => void; // Make onContinue optional as we'll handle navigation internally
}

export const PaymentSuccessPage: React.FC<PaymentSuccessPageProps> = ({
  planType,
  onClose
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
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 text-center border-4 border-green-300 dark:border-green-700 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-green-200 rounded-full -ml-16 -mt-16 opacity-50"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-blue-200 rounded-full -mr-20 -mb-20 opacity-50"></div>
        
        <div className="relative">
          <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          
          <div className="absolute -top-2 -right-2 animate-bounce">
            <Star className="w-8 h-8 text-yellow-400 fill-current" />
          </div>
          
          <div className="absolute top-12 -left-2 animate-pulse">
            <Sparkles className="w-6 h-6 text-purple-400" />
          </div>
        </div>

          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-400 dark:to-blue-400 mb-4">
            Woohoo! You Did It! 🎉
          </h1>

          <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg">
            Your <span className="font-bold text-blue-600 dark:text-blue-400">{planType || 'premium'}</span> plan is ready!
            You can now use all the cool writing tools for the next 30 days.
          </p>

          <div className="bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 rounded-2xl p-6 mb-8 border-2 border-green-200 dark:border-green-800 shadow-md">
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center bg-white bg-opacity-70 p-3 rounded-xl">
                <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
                <span className="text-green-800 dark:text-green-200 font-bold">Email all set up!</span>
              </div>
              <div className="flex items-center bg-white bg-opacity-70 p-3 rounded-xl">
                <Gift className="h-6 w-6 text-blue-500 mr-3" />
                <span className="text-blue-800 dark:text-blue-200 font-bold">Payment all done!</span>
              </div>
              <div className="flex items-center bg-white bg-opacity-70 p-3 rounded-xl">
                <Star className="h-6 w-6 text-purple-500 mr-3" />
                <span className="text-purple-800 dark:text-purple-200 font-bold">All cool tools unlocked!</span>
              </div>
            </div>
          </div>

        {/* ENHANCED: Better button with explicit click handler and debugging */}
        <button
          onClick={handleContinueClick}
          className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white py-4 px-8 rounded-2xl hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center justify-center space-x-3 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-offset-2 shadow-lg hover:shadow-xl transform hover:scale-105 text-lg font-bold"
          type="button"
        >
          <span>Let's Start Writing!</span>
          <ArrowRight className="w-6 h-6" />
        </button>

        <div className="mt-6 flex justify-center">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 font-medium flex items-center"
          >
            <Heart className="w-5 h-5 mr-2 text-pink-500" />
            Close this message
          </button>
        </div>
      </div>
    </div>
  );
};
