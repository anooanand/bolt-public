import React, { useState, useEffect } from 'react';
import { supabase, isEmailVerified } from '../lib/supabase';
import { Loader, Lock } from 'lucide-react';

interface WritingAccessCheckProps {
  children: React.ReactNode;
  onNavigate: (page: string) => void;
}

export function WritingAccessCheck({ children, onNavigate }: WritingAccessCheckProps) {
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [emailVerified, setEmailVerified] = useState(false);

  // Local function to check temporary access
  const checkTemporaryAccess = async (): Promise<boolean> => {
    try {
      // Check localStorage first for immediate response
      const tempAccess = localStorage.getItem('temp_access_granted');
      const tempUntil = localStorage.getItem('temp_access_until');
      
      if (tempAccess === 'true' && tempUntil) {
        const tempDate = new Date(tempUntil);
        if (tempDate > new Date()) {
          console.log('✅ 24-hour temporary access valid until:', tempDate);
          return true;
        } else {
          // Temporary access expired, clean up
          localStorage.removeItem('temp_access_granted');
          localStorage.removeItem('temp_access_until');
          localStorage.removeItem('temp_access_plan');
          console.log('⏰ Temporary access expired');
        }
      }
      
      // Check database for temporary access
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return false;
      
      const { data: accessData } = await supabase
        .from('user_access_status')
        .select('temp_access_until, has_access')
        .eq('id', user.id)
        .single();
      
      if (accessData?.temp_access_until) {
        const tempDate = new Date(accessData.temp_access_until);
        if (tempDate > new Date()) {
          console.log('✅ Database temporary access valid until:', tempDate);
          return true;
        }
      }
      
      return false;
    } catch (error) {
      console.error('❌ Error checking temporary access:', error);
      return false;
    }
  };

  // Local function to check payment completion
  const checkPaymentCompletion = async (): Promise<boolean> => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return false;
      
      // Check user_profiles for payment verification
      const { data: profile } = await supabase
        .from('user_profiles')
        .select('payment_verified, subscription_status, manual_override')
        .eq('user_id', user.id)
        .single();
      
      if (profile?.payment_verified === true || 
          profile?.subscription_status === 'active' ||
          profile?.manual_override === true) {
        console.log('✅ Payment verified or manual override');
        return true;
      }
      
      // Check user_access_status for access
      const { data: accessData } = await supabase
        .from('user_access_status')
        .select('has_access, payment_verified')
        .eq('id', user.id)
        .single();
      
      if (accessData?.has_access === true || accessData?.payment_verified === true) {
        console.log('✅ Access confirmed via user_access_status');
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('❌ Error checking payment completion:', error);
      return false;
    }
  };

  useEffect(() => {
    const checkAccess = async () => {
      setIsLoading(true);
      
      try {
        // Check if email is verified
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          setHasAccess(false);
          setEmailVerified(false);
          setIsLoading(false);
          return;
        }

        const emailVerificationResult = await isEmailVerified(user.id);
        setEmailVerified(emailVerificationResult);
        
        if (!emailVerificationResult) {
          console.log('❌ Email not verified');
          setHasAccess(false);
          setIsLoading(false);
          return;
        }
        
        // First check for temporary access (24-hour immediate access)
        const tempAccess = await checkTemporaryAccess();
        
        if (tempAccess) {
          console.log('✅ User has 24-hour temporary access');
          setHasAccess(true);
          setIsLoading(false);
          return;
        }
        
        // Then check for permanent access
        const paymentCompleted = await checkPaymentCompletion();
        console.log('Payment completion check result:', paymentCompleted);
        setHasAccess(paymentCompleted);
        
      } catch (error) {
        console.error('❌ Error checking access:', error);
        setHasAccess(false);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAccess();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4 h-full">
        <Loader className="h-6 w-6 text-blue-600 animate-spin" />
        <span className="ml-2 text-sm text-gray-600">Checking access...</span>
      </div>
    );
  }

  if (hasAccess === false) {
    return (
      <div className="flex flex-col items-center justify-center p-4 h-full bg-gray-50 dark:bg-gray-800 rounded-lg">
        <Lock className="h-8 w-8 text-gray-400 mb-2" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
          {!emailVerified ? 'Email Verification Required' : 'Premium Feature'}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 text-center">
          {!emailVerified 
            ? 'Please verify your email address to access this feature'
            : 'This feature requires a subscription. Get 24-hour immediate access after payment!'}
        </p>
        <button
          onClick={() => onNavigate(!emailVerified ? 'dashboard' : 'pricing')}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
        >
          {!emailVerified ? 'Go to Dashboard' : 'View Plans'}
        </button>
      </div>
    );
  }

  // User has access, render the children
  return <>{children}</>;
}

