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
  // ENHANCED: Added error state and retry functionality
  authError: string | null;
  retryAuth: () => Promise<void>;
  clearAuthError: () => void;
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
  // ENHANCED: Added error state management
  const [authError, setAuthError] = useState<string | null>(null);

  // ENHANCED: Clear auth error function
  const clearAuthError = useCallback(() => {
    setAuthError(null);
  }, []);

  // Optimized admin status check with caching and better error handling
  const checkAdminStatus = useCallback(async (user: User, retries = 2) => {
    // Check cache first
    const cacheKey = `admin_status_${user.id}`;
    const cached = sessionStorage.getItem(cacheKey);
    if (cached) {
      try {
        const { isAdmin: cachedAdmin, timestamp } = JSON.parse(cached);
        // Cache for 5 minutes
        if (Date.now() - timestamp < 5 * 60 * 1000) {
          setIsAdmin(cachedAdmin);
          return cachedAdmin;
        }
      } catch (error) {
        // Clear invalid cache
        sessionStorage.removeItem(cacheKey);
      }
    }

    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('role')
        .eq('user_id', user.id)
        .single();

      if (error) {
        // Retry on network errors
        if ((error.code === 'PGRST301' || error.message.includes('timeout')) && retries > 0) {
          console.log(`Retrying admin status check (${retries} attempts left)...`);
          await new Promise(resolve => setTimeout(resolve, 1000));
          return checkAdminStatus(user, retries - 1);
        }
        
        console.log('Admin check error (non-critical):', error.message);
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
        console.warn('Failed to cache admin status:', error);
      }
      
      return adminStatus;
    } catch (error) {
      console.error('Admin status check failed:', error);
      setIsAdmin(false);
      return false;
    }
  }, []);

  // Optimized email verification check with better error handling
  const checkEmailVerification = useCallback(async (user: User) => {
    try {
      // Check if email is confirmed in auth
      if (user.email_confirmed_at) {
        setEmailVerified(true);
        setVerificationStatus('verified');
        return true;
      }

      // Fallback: check user metadata
      if (user.user_metadata?.email_verified) {
        setEmailVerified(true);
        setVerificationStatus('verified');
        return true;
      }

      setEmailVerified(false);
      setVerificationStatus('pending');
      return false;
    } catch (error) {
      console.error('Email verification check failed:', error);
      setEmailVerified(false);
      setVerificationStatus('failed');
      return false;
    }
  }, []);

  // Optimized payment status check with better error handling
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
            console.log('✅ Temporary payment access valid');
            setPaymentCompleted(true);
            return true;
          } else {
            // Clean up expired temporary access
            localStorage.removeItem('payment_date');
            localStorage.removeItem('payment_plan');
          }
        } catch (error) {
          console.warn('Invalid payment date in localStorage:', error);
          localStorage.removeItem('payment_date');
          localStorage.removeItem('payment_plan');
        }
      }

      // Check database for permanent access
      const { data, error } = await supabase
        .from('user_profiles')
        .select('subscription_status, subscription_end_date, payment_verified, current_period_end')
        .eq('user_id', user.id)
        .single();

      if (error) {
        console.log('Payment check error (non-critical):', error.message);
        setPaymentCompleted(false);
        return false;
      }

      // ENHANCED: More comprehensive payment status check
      const hasValidSubscription = data?.subscription_status === 'active' ||
                                  data?.payment_verified === true ||
                                  (data?.subscription_end_date && new Date(data.subscription_end_date) > new Date()) ||
                                  (data?.current_period_end && new Date(data.current_period_end) > new Date());
      
      setPaymentCompleted(hasValidSubscription);
      return hasValidSubscription;
    } catch (error) {
      console.error('Payment status check failed:', error);
      setPaymentCompleted(false);
      return false;
    }
  }, []);

  // Optimized auth refresh with better error handling
  const refreshAuth = useCallback(async () => {
    try {
      setAuthError(null); // Clear any previous errors
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Session refresh error:', error);
        setAuthError(`Session error: ${error.message}`);
        setUser(null);
        setIsAdmin(false);
        setEmailVerified(false);
        setPaymentCompleted(false);
        setLoading(false);
        return;
      }

      if (session?.user) {
        setUser(session.user);
        
        // Run checks in parallel for better performance
        try {
          await Promise.all([
            checkAdminStatus(session.user),
            checkEmailVerification(session.user),
            checkPaymentStatus(session.user)
          ]);
        } catch (error) {
          console.error('Error during user status checks:', error);
          setAuthError('Failed to load user status');
        }
      } else {
        setUser(null);
        setIsAdmin(false);
        setEmailVerified(false);
        setPaymentCompleted(false);
      }
    } catch (error) {
      console.error('Auth refresh failed:', error);
      setAuthError(`Authentication failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setUser(null);
      setIsAdmin(false);
      setEmailVerified(false);
      setPaymentCompleted(false);
    } finally {
      setLoading(false);
    }
  }, [checkAdminStatus, checkEmailVerification, checkPaymentStatus]);

  // ENHANCED: Retry auth function
  const retryAuth = useCallback(async () => {
    setLoading(true);
    setAuthError(null);
    await refreshAuth();
  }, [refreshAuth]);

  // ENHANCED: Improved sign out with better cleanup and error handling
  const authSignOut = useCallback(async () => {
    try {
      setAuthError(null);
      console.log('🚪 Initiating sign out...');
      
      // Sign out from Supabase
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Supabase sign out error:', error);
        setAuthError(`Sign out failed: ${error.message}`);
        throw error;
      }
      
      // Clear all state
      setUser(null);
      setIsAdmin(false);
      setEmailVerified(false);
      setPaymentCompleted(false);
      setVerificationStatus('pending');
      
      // ENHANCED: More thorough cache cleanup
      try {
        sessionStorage.clear();
        localStorage.removeItem('payment_date');
        localStorage.removeItem('payment_plan');
        localStorage.removeItem('userEmail');
        // Clear any other auth-related localStorage items
        Object.keys(localStorage).forEach(key => {
          if (key.startsWith('auth_') || key.startsWith('user_') || key.startsWith('admin_')) {
            localStorage.removeItem(key);
          }
        });
      } catch (error) {
        console.warn('Error clearing storage:', error);
      }
      
      console.log('✅ Sign out completed successfully');
    } catch (error) {
      console.error('Sign out error:', error);
      // Even if sign out fails, clear local state to prevent stuck sessions
      setUser(null);
      setIsAdmin(false);
      setEmailVerified(false);
      setPaymentCompleted(false);
      setVerificationStatus('pending');
      
      try {
        sessionStorage.clear();
        localStorage.clear();
      } catch (storageError) {
        console.warn('Error clearing storage during failed logout:', storageError);
      }
      
      throw error;
    }
  }, []);

  // Initialize auth state with better error handling
  useEffect(() => {
    console.log('🚀 Initializing AuthProvider...');
    
    let mounted = true;
    
    const initializeAuth = async () => {
      try {
        setAuthError(null);
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (!mounted) return;
        
        if (error) {
          console.error('Initial session error:', error);
          setAuthError(`Initialization error: ${error.message}`);
          setLoading(false);
          return;
        }

        if (session?.user) {
          console.log('🔄 Auth state change detected: SIGNED_IN');
          setUser(session.user);
          
          // Run checks in parallel
          try {
            await Promise.all([
              checkAdminStatus(session.user),
              checkEmailVerification(session.user),
              checkPaymentStatus(session.user)
            ]);
          } catch (error) {
            console.error('Error during initial user status checks:', error);
            setAuthError('Failed to load user status');
          }
        } else {
          console.log('🔄 Auth state change detected: SIGNED_OUT');
          setUser(null);
          setIsAdmin(false);
          setEmailVerified(false);
          setPaymentCompleted(false);
        }
      } catch (error) {
        console.error('Auth initialization failed:', error);
        setAuthError(`Initialization failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    initializeAuth();

    // Listen for auth changes with better error handling
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;
      
      console.log('🔄 Auth state change:', event);
      
      try {
        setAuthError(null);
        
        if (session?.user) {
          setUser(session.user);
          
          // Run checks in parallel
          try {
            await Promise.all([
              checkAdminStatus(session.user),
              checkEmailVerification(session.user),
              checkPaymentStatus(session.user)
            ]);
          } catch (error) {
            console.error('Error during auth state change checks:', error);
            setAuthError('Failed to update user status');
          }
        } else {
          setUser(null);
          setIsAdmin(false);
          setEmailVerified(false);
          setPaymentCompleted(false);
        }
      } catch (error) {
        console.error('Error handling auth state change:', error);
        setAuthError(`Auth state change error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      } finally {
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [checkAdminStatus, checkEmailVerification, checkPaymentStatus]);

  // Memoize context value to prevent unnecessary re-renders
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
    clearAuthError
  }), [user, isAdmin, loading, verificationStatus, refreshAuth, emailVerified, paymentCompleted, authSignOut, authError, retryAuth, clearAuthError]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

