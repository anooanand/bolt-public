// FIXED: Pricing page component with proper verification logic
// This should replace the verification logic in your pricing page component

import React, { useState, useEffect } from 'react';
import { isEmailVerified } from '../lib/supabase';

export const PricingPageWithFixedVerification: React.FC = () => {
  const [emailVerified, setEmailVerified] = useState<boolean>(false);
  const [verificationLoading, setVerificationLoading] = useState<boolean>(true);
  const [userEmail, setUserEmail] = useState<string>('');

  useEffect(() => {
    checkEmailVerification();
  }, []);

  const checkEmailVerification = async () => {
    try {
      setVerificationLoading(true);
      console.log('🔍 Pricing page: Checking email verification...');
      
      // Get user email
      const email = localStorage.getItem('userEmail') || '';
      setUserEmail(email);
      
      // Check verification status
      const verified = await isEmailVerified();
      console.log('📧 Pricing page: Email verification result:', verified);
      
      setEmailVerified(verified);
    } catch (error) {
      console.error('Error checking email verification:', error);
      setEmailVerified(false);
    } finally {
      setVerificationLoading(false);
    }
  };

  const handleManualVerificationCheck = async () => {
    console.log('🔄 Manual verification check triggered from pricing page');
    await checkEmailVerification();
  };

  // Show loading state
  if (verificationLoading) {
    return (
      <div className="pricing-container">
        <div className="verification-status">
          <div className="loading-spinner"></div>
          <p>Checking verification status...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pricing-container">
      {/* User Status Display */}
      <div className="user-status">
        <p>Signed in as: <strong>{userEmail}</strong></p>
        
        {/* Verification Status */}
        {emailVerified ? (
          <div className="verification-success">
            ✅ Email verified - Ready to subscribe!
          </div>
        ) : (
          <div className="verification-pending">
            <div className="verification-message">
              ⚠️ Please verify your email before subscribing
            </div>
            <div className="verification-actions">
              <button 
                onClick={handleManualVerificationCheck}
                className="btn-check-verification"
              >
                I've Verified My Email - Check Again
              </button>
              <p className="verification-help">
                If you've already clicked the verification link in your email, 
                click the button above to refresh your verification status.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Pricing Plans */}
      <div className="pricing-plans">
        <div className="plan">
          <h3>Try Out Plan</h3>
          <p className="price">$10.00 /month</p>
          <button 
            className={`btn-subscribe ${!emailVerified ? 'disabled' : ''}`}
            disabled={!emailVerified}
            onClick={() => emailVerified && handleSubscribe('try-out')}
          >
            {emailVerified ? 'Subscribe Now' : 'Verify Email First'}
          </button>
        </div>

        <div className="plan featured">
          <h3>Base Plan</h3>
          <p className="price">$19.00 /month</p>
          <button 
            className={`btn-subscribe ${!emailVerified ? 'disabled' : ''}`}
            disabled={!emailVerified}
            onClick={() => emailVerified && handleSubscribe('base')}
          >
            {emailVerified ? 'Subscribe Now' : 'Verify Email First'}
          </button>
        </div>

        <div className="plan">
          <h3>Essential Plan</h3>
          <p className="price">$29.00 /month</p>
          <button 
            className={`btn-subscribe ${!emailVerified ? 'disabled' : ''}`}
            disabled={!emailVerified}
            onClick={() => emailVerified && handleSubscribe('essential')}
          >
            {emailVerified ? 'Subscribe Now' : 'Verify Email First'}
          </button>
        </div>
      </div>

      {/* Debug Info (remove in production) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="debug-info">
          <h4>Debug Information:</h4>
          <p>Email: {userEmail}</p>
          <p>Verified: {emailVerified ? 'Yes' : 'No'}</p>
          <p>Loading: {verificationLoading ? 'Yes' : 'No'}</p>
          <button onClick={handleManualVerificationCheck}>
            Refresh Verification Status
          </button>
        </div>
      )}
    </div>
  );

  function handleSubscribe(planType: string) {
    if (!emailVerified) {
      alert('Please verify your email first');
      return;
    }
    
    console.log('🚀 Starting subscription for plan:', planType);
    // Your existing subscription logic here
  }
};

// Alternative: Simple verification check function for existing pricing page
export const useEmailVerificationStatus = () => {
  const [emailVerified, setEmailVerified] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const checkVerification = async () => {
    try {
      setLoading(true);
      const verified = await isEmailVerified();
      setEmailVerified(verified);
      return verified;
    } catch (error) {
      console.error('Error checking verification:', error);
      setEmailVerified(false);
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkVerification();
  }, []);

  return {
    emailVerified,
    loading,
    recheckVerification: checkVerification
  };
};

// CSS for the verification states
const verificationStyles = `
.verification-success {
  background: #d4edda;
  color: #155724;
  padding: 12px;
  border-radius: 6px;
  margin-bottom: 20px;
  border: 1px solid #c3e6cb;
}

.verification-pending {
  background: #fff3cd;
  color: #856404;
  padding: 12px;
  border-radius: 6px;
  margin-bottom: 20px;
  border: 1px solid #ffeaa7;
}

.verification-message {
  font-weight: bold;
  margin-bottom: 10px;
}

.verification-actions {
  margin-top: 10px;
}

.btn-check-verification {
  background: #007bff;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 8px;
}

.btn-check-verification:hover {
  background: #0056b3;
}

.verification-help {
  font-size: 0.9em;
  color: #6c757d;
  margin-top: 8px;
}

.btn-subscribe.disabled {
  background: #6c757d;
  cursor: not-allowed;
  opacity: 0.6;
}

.debug-info {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 6px;
  margin-top: 20px;
  border: 1px solid #dee2e6;
}
`;

