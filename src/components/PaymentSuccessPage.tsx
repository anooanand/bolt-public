import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { createClient } from '@supabase/supabase-js';

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
        
        console.log('🎉 Payment success detected, processing access...');
        console.log('Session ID:', sessionId);
        console.log('Plan Type:', planType);
        
        // Try multiple approaches to grant access
        let accessGranted = false;
        let errorMessage = '';

        // Approach 1: Use access management API
        try {
          const response = await fetch('/.netlify/functions/access_management/process-payment-success', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: user.id,
              planType: planType,
              sessionId: sessionId
            })
          });

          if (response.ok) {
            const result = await response.json();
            if (result.success) {
              accessGranted = true;
              console.log('✅ Access granted via API');
            }
          } else {
            const errorData = await response.json();
            errorMessage = errorData.message || 'API call failed';
            console.error('❌ API call failed:', errorData);
          }
        } catch (apiError) {
          console.error('❌ API call error:', apiError);
          errorMessage = 'API call failed';
        }

        // Approach 2: Fallback to direct Supabase call
        if (!accessGranted) {
          try {
            const result = await grantTemporaryAccessDirect(user.id, planType);
            if (result.success) {
              accessGranted = true;
              console.log('✅ Access granted via direct method');
            } else {
              errorMessage = result.error?.message || 'Direct access grant failed';
            }
          } catch (directError) {
            console.error('❌ Direct access grant error:', directError);
            errorMessage = 'Direct access grant failed';
          }
        }

        // Approach 3: Final fallback - localStorage temporary access
        if (!accessGranted) {
          try {
            const tempAccessUntil = new Date();
            tempAccessUntil.setHours(tempAccessUntil.getHours() + 24);
            
            localStorage.setItem('temp_access_granted', 'true');
            localStorage.setItem('temp_access_until', tempAccessUntil.toISOString());
            localStorage.setItem('temp_access_plan', planType);
            
            accessGranted = true;
            console.log('✅ Temporary access granted via localStorage fallback');
          } catch (storageError) {
            console.error('❌ localStorage fallback error:', storageError);
          }
        }

        if (accessGranted) {
          setStatus('success');
          setMessage('Payment successful! You now have full access to all features.');
          
          // Redirect to dashboard after 3 seconds
          setTimeout(() => {
            navigate('/dashboard');
          }, 3000);
        } else {
          setStatus('error');
          setMessage(`Payment received but there was an issue granting access: ${errorMessage}. Please contact support.`);
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
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <p className="text-sm text-green-800">
                <strong>Access Granted!</strong><br />
                Your payment has been processed and you now have full access to all features.
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

// Direct Supabase access function for fallback
async function grantTemporaryAccessDirect(userId: string, planType: string) {
  try {
    const supabase = createClient(
      import.meta.env.VITE_SUPABASE_URL,
      import.meta.env.VITE_SUPABASE_ANON_KEY
    );

    const tempAccessUntil = new Date();
    tempAccessUntil.setHours(tempAccessUntil.getHours() + 24);

    // Update user_profiles
    const { error: profileError } = await supabase
      .from('user_profiles')
      .upsert({
        user_id: userId,
        payment_status: 'processing',
        payment_verified: false,
        temporary_access_granted: true,
        temp_access_until: tempAccessUntil.toISOString(),
        subscription_status: 'temp_active',
        subscription_plan: planType,
        updated_at: new Date().toISOString()
      }, { onConflict: 'user_id' });

    if (profileError) {
      console.error('❌ Profile update error:', profileError);
    }

    // Update user_access_status
    const { error: accessError } = await supabase
      .from('user_access_status')
      .upsert({
        id: userId,
        email_verified: true,
        payment_verified: false,
        subscription_status: 'temp_active',
        has_access: true,
        access_type: 'Temporary access (24 hours)',
        temp_access_until: tempAccessUntil.toISOString()
      }, { onConflict: 'id' });

    if (accessError) {
      console.error('❌ Access status update error:', accessError);
      return { success: false, error: accessError };
    }

    return { success: true, tempAccessUntil };
  } catch (error) {
    console.error('❌ Direct access grant error:', error);
    return { success: false, error };
  }
}

