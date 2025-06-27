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
  authError: string | null;
  retryAuth: () => Promise<void>;
  clearAuthError: () => void;
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
  
  const [verificationProgress, setVerificationProgress] = useState({
    emailChecked: false,
    paymentChecked: false,
    adminChecked: false,
  });

  const [isVerifying, setIsVerifying] = useState(false);
  const [lastVerificationTime, setLastVerificationTime] = useState<number>(0);

  const clearAuthError = useCallback(() => {
    setAuthError(null);
  }, []);

  const resetVerificationProgress = useCallback(() => {
    setVerificationProgress({
      emailChecked: false,
      paymentChecked: false,
      adminChecked: false,
    });
  }, []);

  // ENHANCED: Quieter email verification check
  const checkEmailVerification = useCallback(async (user: User) => {
    try {
      if (user.email_confirmed_at) {
        setEmailVerified(true);
        return true;
      }

      if (user.user_metadata?.email_verified) {
        setEmailVerified(true);
        return true;
      }

      setEmailVerified(false);
      return false;
    } catch (error) {
      console.error('❌ Email verification check failed:', error);
      setEmailVerified(false);
      throw error;
    } finally {
      setVerificationProgress(prev => ({ ...prev, emailChecked: true }));
    }
  }, []);

  // ENHANCED: Quieter payment status check with better caching
  const checkPaymentStatus = useCallback(async (user: User) => {
    try {
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
            setPaymentCompleted(true);
            return true;
          } else {
            // Clean up expired temporary access
            localStorage.removeItem('payment_date');
            localStorage.removeItem('payment_plan');
          }
        } catch (error) {
          localStorage.removeItem('payment_date');
          localStorage.removeItem('payment_plan');
        }
      }

      // ENHANCED: Single database check with better error handling
      const { data, error } = await supabase
        .from('user_profiles')
        .select('subscription_status, current_period_end, payment_verified, temp_access_until')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        // Only log critical errors, not missing records
        if (error.code !== 'PGRST116') {
          console.warn('Payment check warning:', error.message);
        }
        setPaymentCompleted(false);
        return false;
      }

      // ENHANCED: Comprehensive payment status check
      const hasValidSubscription = data?.subscription_status === 'active' ||
                                  data?.payment_verified === true ||
                                  (data?.current_period_end && new Date(data.current_period_end) > new Date()) ||
                                  (data?.temp_access_until && new Date(data.temp_access_until) > new Date());
      
      setPaymentCompleted(hasValidSubscription);
      return hasValidSubscription;

    } catch (error) {
      console.error('❌ Payment status check failed:', error);
      setPaymentCompleted(false);
      throw error;
    } finally {
      setVerificationProgress(prev => ({ ...prev, paymentChecked: true }));
    }
  }, []);

  // ENHANCED: Quieter admin status check
  const checkAdminStatus = useCallback(async (user: User) => {
    try {
      // Check cache first
      const cacheKey = `admin_status_${user.id}`;
      const cached = sessionStorage.getItem(cacheKey);
      if (cached) {
        try {
          const { isAdmin: cachedAdmin, timestamp } = JSON.parse(cached);
          // Cache for 10 minutes
          if (Date.now() - timestamp < 10 * 60 * 1000) {
            setIsAdmin(cachedAdmin);
            return cachedAdmin;
          }
        } catch (error) {
          sessionStorage.removeItem(cacheKey);
        }
      }

      const { data, error } = await supabase
        .from('user_profiles')
        .select('role')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        // Non-critical error, default to false
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
        // Ignore cache errors
      }
      
      return adminStatus;

    } catch (error) {
      setIsAdmin(false);
      return false;
    } finally {
      setVerificationProgress(prev => ({ ...prev, adminChecked: true }));
    }
  }, []);

  // ENHANCED: Throttled verification process (reduce frequency)
  const runVerificationChecks = useCallback(async (user: User) => {
    if (isVerifying) {
      return;
    }

    // ENHANCED: Throttle verification checks (max once per 60 seconds)
    const now = Date.now();
    if (now - lastVerificationTime < 60000) {
      return;
    }

    setIsVerifying(true);
    resetVerificationProgress();
    setAuthError(null);

    try {
      // Run checks sequentially
      const emailResult = await checkEmailVerification(user);
      const paymentResult = await checkPaymentStatus(user);
      const adminResult = await checkAdminStatus(user);

      // Update overall verification status
      if (emailResult && paymentResult) {
        setVerificationStatus('verified');
      } else if (emailResult || paymentResult) {
        setVerificationStatus('pending');
      } else {
        setVerificationStatus('pending');
      }

      setLastVerificationTime(Date.now());

    } catch (error) {
      console.error('❌ Verification checks failed:', error);
      setVerificationStatus('failed');
      setAuthError(`Verification failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsVerifying(false);
    }
  }, [isVerifying, lastVerificationTime, resetVerificationProgress, checkEmailVerification, checkPaymentStatus, checkAdminStatus]);

  // ENHANCED: Force refresh verification
  const forceRefreshVerification = useCallback(async () => {
    if (!user) return;
    
    // Clear caches
    const cacheKey = `admin_status_${user.id}`;
    sessionStorage.removeItem(cacheKey);
    
    // Reset throttling
    setLastVerificationTime(0);
    
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
        
        // ENHANCED: Throttle verification checks
        const now = Date.now();
        if (now - lastVerificationTime > 30000) {
          await runVerificationChecks(session.user);
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

  const retryAuth = useCallback(async () => {
    setLoading(true);
    setAuthError(null);
    await refreshAuth();
  }, [refreshAuth]);

  const authSignOut = useCallback(async () => {
    try {
      setAuthError(null);
      
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
      
      // Clear caches
      try {
        Object.keys(sessionStorage).forEach(key => {
          if (key.startsWith('admin_status_') || key.startsWith('auth_') || key.startsWith('user_')) {
            sessionStorage.removeItem(key);
          }
        });
        
        const itemsToRemove = [
          'payment_date',
          'payment_plan',
          'userEmail',
          'auth_token',
          'user_preferences'
        ];
        itemsToRemove.forEach(item => localStorage.removeItem(item));
      } catch (error) {
        console.warn('⚠️ Error during cache cleanup:', error);
      }
      
    } catch (error) {
      console.error('❌ Sign out error:', error);
      // Clear local state even if sign out fails
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
  }, [resetVerificationProgress]);

  // Initialize auth state
  useEffect(() => {
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
        console.error('❌ Auth initialization failed:', error);
        setAuthError(`Initialization failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;
      
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

