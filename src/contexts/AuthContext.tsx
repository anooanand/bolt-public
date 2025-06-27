import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  verificationStatus: 'pending' | 'verified' | 'failed';
  refreshAuth: () => Promise<void>;
  emailVerified: boolean;
  paymentCompleted: boolean;
  authSignOut: () => Promise<void>;
  // ENHANCED: Improved error state and retry functionality
  authError: string | null;
  retryAuth: () => Promise<void>;
  clearAuthError: () => void;
  // ENHANCED: New verification utilities
  forceRefreshVerification: () => Promise<void>;
  verificationProgress: {
    emailChecked: boolean;
    paymentChecked: boolean;
    adminChecked: boolean;
  };
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAdmin: false,
  loading: true,
  verificationStatus: 'pending',
  refreshAuth: async () => {},
  emailVerified: false,
  paymentCompleted: false,
  authSignOut: async () => {},
  authError: null,
  retryAuth: async () => {},
  clearAuthError: () => {},
  forceRefreshVerification: async () => {},
  verificationProgress: {
    emailChecked: false,
    paymentChecked: false,
    adminChecked: false,
  },
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'verified' | 'failed'>('pending');
  const [emailVerified, setEmailVerified] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  
  // ENHANCED: Track verification progress
  const [verificationProgress, setVerificationProgress] = useState({
    emailChecked: false,
    paymentChecked: false,
    adminChecked: false,
  });

  // ENHANCED: Verification state management
  const [isVerifying, setIsVerifying] = useState(false);
  const [lastVerificationTime, setLastVerificationTime] = useState<number>(0);

  // ENHANCED: Clear auth error function
  const clearAuthError = useCallback(() => {
    setAuthError(null);
  }, []);

  // ENHANCED: Reset verification progress
  const resetVerificationProgress = useCallback(() => {
    setVerificationProgress({
      emailChecked: false,
      paymentChecked: false,
      adminChecked: false,
    });
  }, []);

  // ENHANCED: Sequential verification checks to prevent race conditions
  const checkEmailVerification = useCallback(async (user: User) => {
    try {
      console.log('🔍 Checking email verification...');
      
      // Check if email is confirmed in auth
      if (user.email_confirmed_at) {
        setEmailVerified(true);
        console.log('✅ Email verified via email_confirmed_at');
        return true;
      }

      // Fallback: check user metadata
      if (user.user_metadata?.email_verified) {
        setEmailVerified(true);
        console.log('✅ Email verified via user_metadata');
        return true;
      }

      setEmailVerified(false);
      console.log('⏳ Email verification pending');
      return false;
    } catch (error) {
      console.error('❌ Email verification check failed:', error);
      setEmailVerified(false);
      throw error;
    } finally {
      setVerificationProgress(prev => ({ ...prev, emailChecked: true }));
    }
  }, []);

  // ENHANCED: Payment status check with better error handling and caching
  const checkPaymentStatus = useCallback(async (user: User) => {
    try {
      console.log('🔍 Checking payment status...');
      
      // Check local storage for temporary access first
      const paymentDate = localStorage.getItem('payment_date');
      const paymentPlan = localStorage.getItem('payment_plan');
      
      if (paymentDate && paymentPlan) {
        try {
          const paymentTime = new Date(paymentDate).getTime();
          const now = Date.now();
          const hoursSincePayment = (now - paymentTime) / (1000 * 60 * 60);
          
          // 24-hour temporary access
          if (hoursSincePayment < 24) {
            console.log('✅ Temporary payment access valid');
            setPaymentCompleted(true);
            return true;
          } else {
            // Clean up expired temporary access
            localStorage.removeItem('payment_date');
            localStorage.removeItem('payment_plan');
            console.log('🧹 Cleaned up expired temporary access');
          }
        } catch (error) {
          console.warn('⚠️ Invalid payment date in localStorage:', error);
          localStorage.removeItem('payment_date');
          localStorage.removeItem('payment_plan');
        }
      }

      // ENHANCED: Check database with retry logic
      let attempts = 0;
      const maxAttempts = 3;
      
      while (attempts < maxAttempts) {
        try {
          const { data, error } = await supabase
            .from('user_profiles')
            .select('subscription_status, subscription_end_date, payment_verified, current_period_end, temp_access_until')
            .eq('user_id', user.id)
            .single();

          if (error && error.code !== 'PGRST116') {
            if (attempts < maxAttempts - 1) {
              attempts++;
              console.log(`⏳ Retrying payment check (attempt ${attempts}/${maxAttempts})...`);
              await new Promise(resolve => setTimeout(resolve, 1000));
              continue;
            }
            throw error;
          }

          // ENHANCED: More comprehensive payment status check
          const hasValidSubscription = data?.subscription_status === 'active' ||
                                      data?.payment_verified === true ||
                                      (data?.subscription_end_date && new Date(data.subscription_end_date) > new Date()) ||
                                      (data?.current_period_end && new Date(data.current_period_end) > new Date()) ||
                                      (data?.temp_access_until && new Date(data.temp_access_until) > new Date());
          
          setPaymentCompleted(hasValidSubscription);
          console.log(`${hasValidSubscription ? '✅' : '⏳'} Payment status: ${hasValidSubscription ? 'verified' : 'pending'}`);
          return hasValidSubscription;

        } catch (error) {
          if (attempts < maxAttempts - 1) {
            attempts++;
            console.log(`⏳ Retrying payment check due to error (attempt ${attempts}/${maxAttempts})...`);
            await new Promise(resolve => setTimeout(resolve, 1000));
            continue;
          }
          throw error;
        }
      }

      setPaymentCompleted(false);
      return false;
    } catch (error) {
      console.error('❌ Payment status check failed:', error);
      setPaymentCompleted(false);
      throw error;
    } finally {
      setVerificationProgress(prev => ({ ...prev, paymentChecked: true }));
    }
  }, []);

  // ENHANCED: Admin status check with improved caching
  const checkAdminStatus = useCallback(async (user: User) => {
    try {
      console.log('🔍 Checking admin status...');
      
      // Check cache first with user-specific key
      const cacheKey = `admin_status_${user.id}`;
      const cached = sessionStorage.getItem(cacheKey);
      if (cached) {
        try {
          const { isAdmin: cachedAdmin, timestamp } = JSON.parse(cached);
          // Cache for 10 minutes
          if (Date.now() - timestamp < 10 * 60 * 1000) {
            setIsAdmin(cachedAdmin);
            console.log(`✅ Admin status from cache: ${cachedAdmin}`);
            return cachedAdmin;
          }
        } catch (error) {
          // Clear invalid cache
          sessionStorage.removeItem(cacheKey);
        }
      }

      // ENHANCED: Database check with retry logic
      let attempts = 0;
      const maxAttempts = 3;
      
      while (attempts < maxAttempts) {
        try {
          const { data, error } = await supabase
            .from('user_profiles')
            .select('role')
            .eq('user_id', user.id)
            .single();

          if (error && error.code !== 'PGRST116') {
            if (attempts < maxAttempts - 1) {
              attempts++;
              console.log(`⏳ Retrying admin check (attempt ${attempts}/${maxAttempts})...`);
              await new Promise(resolve => setTimeout(resolve, 1000));
              continue;
            }
            // Non-critical error, default to false
            console.log('⚠️ Admin check error (non-critical):', error.message);
            setIsAdmin(false);
            return false;
          }

          const adminStatus = data?.role === 'admin';
          setIsAdmin(adminStatus);
          
          // Cache the result
          try {
            sessionStorage.setItem(cacheKey, JSON.stringify({
              isAdmin: adminStatus,
              timestamp: Date.now()
            }));
          } catch (error) {
            console.warn('⚠️ Failed to cache admin status:', error);
          }
          
          console.log(`✅ Admin status: ${adminStatus}`);
          return adminStatus;

        } catch (error) {
          if (attempts < maxAttempts - 1) {
            attempts++;
            console.log(`⏳ Retrying admin check due to error (attempt ${attempts}/${maxAttempts})...`);
            await new Promise(resolve => setTimeout(resolve, 1000));
            continue;
          }
          throw error;
        }
      }

      setIsAdmin(false);
      return false;
    } catch (error) {
      console.error('❌ Admin status check failed:', error);
      setIsAdmin(false);
      return false;
    } finally {
      setVerificationProgress(prev => ({ ...prev, adminChecked: true }));
    }
  }, []);

  // ENHANCED: Sequential verification process
  const runVerificationChecks = useCallback(async (user: User) => {
    if (isVerifying) {
      console.log('⏳ Verification already in progress, skipping...');
      return;
    }

    setIsVerifying(true);
    resetVerificationProgress();
    setAuthError(null);

    try {
      console.log('🚀 Starting verification checks...');
      
      // Run checks sequentially to avoid race conditions
      const emailResult = await checkEmailVerification(user);
      const paymentResult = await checkPaymentStatus(user);
      const adminResult = await checkAdminStatus(user);

      // Update overall verification status
      if (emailResult && paymentResult) {
        setVerificationStatus('verified');
        console.log('✅ All verifications completed successfully');
      } else if (emailResult || paymentResult) {
        setVerificationStatus('pending');
        console.log('⏳ Partial verification completed');
      } else {
        setVerificationStatus('pending');
        console.log('⏳ Verification pending');
      }

      setLastVerificationTime(Date.now());

    } catch (error) {
      console.error('❌ Verification checks failed:', error);
      setVerificationStatus('failed');
      setAuthError(`Verification failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsVerifying(false);
    }
  }, [isVerifying, resetVerificationProgress, checkEmailVerification, checkPaymentStatus, checkAdminStatus]);

  // ENHANCED: Force refresh verification
  const forceRefreshVerification = useCallback(async () => {
    if (!user) return;
    
    console.log('🔄 Force refreshing verification...');
    
    // Clear caches
    const cacheKey = `admin_status_${user.id}`;
    sessionStorage.removeItem(cacheKey);
    
    await runVerificationChecks(user);
  }, [user, runVerificationChecks]);

  // ENHANCED: Optimized auth refresh with throttling
  const refreshAuth = useCallback(async () => {
    try {
      setAuthError(null);
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('❌ Session refresh error:', error);
        setAuthError(`Session error: ${error.message}`);
        setUser(null);
        setIsAdmin(false);
        setEmailVerified(false);
        setPaymentCompleted(false);
        setVerificationStatus('failed');
        setLoading(false);
        return;
      }

      if (session?.user) {
        setUser(session.user);
        
        // ENHANCED: Throttle verification checks (max once per 30 seconds)
        const now = Date.now();
        if (now - lastVerificationTime > 30000) {
          await runVerificationChecks(session.user);
        } else {
          console.log('⏳ Verification throttled, using cached results');
        }
      } else {
        setUser(null);
        setIsAdmin(false);
        setEmailVerified(false);
        setPaymentCompleted(false);
        setVerificationStatus('pending');
        resetVerificationProgress();
      }
    } catch (error) {
      console.error('❌ Auth refresh failed:', error);
      setAuthError(`Authentication failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setUser(null);
      setIsAdmin(false);
      setEmailVerified(false);
      setPaymentCompleted(false);
      setVerificationStatus('failed');
    } finally {
      setLoading(false);
    }
  }, [lastVerificationTime, runVerificationChecks, resetVerificationProgress]);

  // ENHANCED: Retry auth function
  const retryAuth = useCallback(async () => {
    setLoading(true);
    setAuthError(null);
    await refreshAuth();
  }, [refreshAuth]);

  // ENHANCED: Improved sign out with comprehensive cleanup
  const authSignOut = useCallback(async () => {
    try {
      setAuthError(null);
      console.log('🚪 Initiating sign out...');
      
      // Sign out from Supabase
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('❌ Supabase sign out error:', error);
        setAuthError(`Sign out failed: ${error.message}`);
        throw error;
      }
      
      // Clear all state
      setUser(null);
      setIsAdmin(false);
      setEmailVerified(false);
      setPaymentCompleted(false);
      setVerificationStatus('pending');
      resetVerificationProgress();
      setLastVerificationTime(0);
      
      // ENHANCED: Comprehensive cache cleanup
      try {
        // Clear session storage
        Object.keys(sessionStorage).forEach(key => {
          if (key.startsWith('admin_status_') || key.startsWith('auth_') || key.startsWith('user_')) {
            sessionStorage.removeItem(key);
          }
        });
        
        // Clear specific localStorage items
        const itemsToRemove = [
          'payment_date',
          'payment_plan',
          'userEmail',
          'auth_token',
          'user_preferences'
        ];
        itemsToRemove.forEach(item => localStorage.removeItem(item));
        
        console.log('🧹 Cache cleanup completed');
      } catch (error) {
        console.warn('⚠️ Error during cache cleanup:', error);
      }
      
      console.log('✅ Sign out completed successfully');
    } catch (error) {
      console.error('❌ Sign out error:', error);
      // Even if sign out fails, clear local state to prevent stuck sessions
      setUser(null);
      setIsAdmin(false);
      setEmailVerified(false);
      setPaymentCompleted(false);
      setVerificationStatus('pending');
      resetVerificationProgress();
      
      try {
        sessionStorage.clear();
        localStorage.clear();
      } catch (storageError) {
        console.warn('⚠️ Error clearing storage during failed logout:', storageError);
      }
      
      throw error;
    }
  }, [resetVerificationProgress, clearAuthError]);

  // ENHANCED: Initialize auth state with better error handling
  useEffect(() => {
    console.log('🚀 Initializing AuthProvider...');
    
    let mounted = true;
    
    const initializeAuth = async () => {
      try {
        setAuthError(null);
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (!mounted) return;
        
        if (error) {
          console.error('❌ Initial session error:', error);
          setAuthError(`Initialization error: ${error.message}`);
          setLoading(false);
          return;
        }

        if (session?.user) {
          console.log('🔄 Auth state change detected: SIGNED_IN');
          setUser(session.user);
          await runVerificationChecks(session.user);
        } else {
          console.log('🔄 Auth state change detected: SIGNED_OUT');
          setUser(null);
          setIsAdmin(false);
          setEmailVerified(false);
          setPaymentCompleted(false);
          setVerificationStatus('pending');
          resetVerificationProgress();
        }
      } catch (error) {
        console.error('❌ Auth initialization failed:', error);
        setAuthError(`Initialization failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    initializeAuth();

    // ENHANCED: Listen for auth changes with better error handling
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;
      
      console.log('🔄 Auth state change:', event);
      
      try {
        setAuthError(null);
        
        if (session?.user) {
          setUser(session.user);
          await runVerificationChecks(session.user);
        } else {
          setUser(null);
          setIsAdmin(false);
          setEmailVerified(false);
          setPaymentCompleted(false);
          setVerificationStatus('pending');
          resetVerificationProgress();
        }
      } catch (error) {
        console.error('❌ Error handling auth state change:', error);
        setAuthError(`Auth state change error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      } finally {
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [runVerificationChecks, resetVerificationProgress]);

  // ENHANCED: Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    user,
    isAdmin,
    loading,
    verificationStatus,
    refreshAuth,
    emailVerified,
    paymentCompleted,
    authSignOut,
    authError,
    retryAuth,
    clearAuthError,
    forceRefreshVerification,
    verificationProgress
  }), [
    user,
    isAdmin,
    loading,
    verificationStatus,
    refreshAuth,
    emailVerified,
    paymentCompleted,
    authSignOut,
    authError,
    retryAuth,
    clearAuthError,
    forceRefreshVerification,
    verificationProgress
  ]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

