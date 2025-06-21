// COMPLETE FILE: src/components/PaymentSuccessPage.tsx
// Copy-paste this entire file into bolt.new (NEW FILE)

import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { grantTemporaryAccess } from '../lib/supabase';

export function PaymentSuccessPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');
  const [message, setMessage] = useState('Processing your payment...');

  useEffect(() => {
    const processPaymentSuccess = async () => {
      try {
        if (!user) {
          setStatus('error');
          setMessage('User not found. Please sign in again.');
          return;
        }

        // Get payment details from URL parameters
        const sessionId = searchParams.get('session_id');
        const planType = searchParams.get('plan') || 'base_plan';
        
        console.log('🎉 Payment success detected, granting temporary access...');
        console.log('Session ID:', sessionId);
        console.log('Plan Type:', planType);
        
        // Grant immediate 24-hour temporary access
        const result = await grantTemporaryAccess(user.id, planType);
        
        if (result.success) {
          setStatus('success');
          setMessage('Payment successful! You now have full access for 24 hours while we confirm your payment.');
          
          // Redirect to dashboard after 3 seconds
          setTimeout(() => {
            navigate('/dashboard');
          }, 3000);
        } else {
          setStatus('error');
          setMessage('Payment received but there was an issue granting access. Please contact support.');
        }
        
      } catch (error) {
        console.error('❌ Error processing payment success:', error);
        setStatus('error');
        setMessage('There was an error processing your payment. Please contact support.');
      }
    };

    processPaymentSuccess();
  }, [user, searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        {status === 'processing' && (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Processing Payment</h2>
            <p className="text-gray-600">{message}</p>
          </>
        )}
        
        {status === 'success' && (
          <>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-green-900 mb-2">Payment Successful!</h2>
            <p className="text-green-700 mb-4">{message}</p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
              <p className="text-sm text-yellow-800">
                <strong>24-Hour Access Granted!</strong><br />
                Your payment is being processed in the background. You have immediate access to all features.
              </p>
            </div>
            <p className="text-sm text-gray-600">Redirecting to dashboard...</p>
          </>
        )}
        
        {status === 'error' && (
          <>
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-red-900 mb-2">Payment Issue</h2>
            <p className="text-red-700 mb-4">{message}</p>
            <div className="space-y-2">
              <button 
                onClick={() => navigate('/dashboard')}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
              >
                Go to Dashboard
              </button>
              <button 
                onClick={() => navigate('/pricing')}
                className="w-full bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition-colors"
              >
                Try Payment Again
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

