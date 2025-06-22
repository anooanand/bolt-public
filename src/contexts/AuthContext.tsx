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

  // Optimized admin status check with caching
  const checkAdminStatus = useCallback(async (user: User, retries = 2) => {
    // Check cache first
    const cacheKey = `admin_status_${user.id}`;
    const cached = sessionStorage.getItem(cacheKey);
    if (cached) {
      const { isAdmin: cachedAdmin, timestamp } = JSON.parse(cached);
      // Cache for 5 minutes
      if (Date.now() - timestamp < 5 * 60 * 1000) {
        setIsAdmin(cachedAdmin);
        return cachedAdmin;
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
      sessionStorage.setItem(cacheKey, JSON.stringify({
        isAdmin: adminStatus,
        timestamp: Date.now()
      }));
      
      return adminStatus;
    } catch (error) {
      console.error('Admin status check failed:', error);
      setIsAdmin(false);
      return false;
    }
  }, []);

  // Optimized email verification check
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

  // Optimized payment status check
  const checkPaymentStatus = useCallback(async (user: User) => {
    try {
      // Check local storage for temporary access first
      const paymentDate = localStorage.getItem('payment_date');
      const paymentPlan = localStorage.getItem('payment_plan');
      
      if (paymentDate && paymentPlan) {
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
      }

      // Check database for permanent access
      const { data, error } = await supabase
        .from('user_profiles')
        .select('subscription_status, subscription_end_date')
        .eq('user_id', user.id)
        .single();

      if (error) {
        console.log('Payment check error (non-critical):', error.message);
        setPaymentCompleted(false);
        return false;
      }

      const hasValidSubscription = data?.subscription_status === 'active' ||
                                  (data?.subscription_end_date && new Date(data.subscription_end_date) > new Date());
      
      setPaymentCompleted(hasValidSubscription);
      return hasValidSubscription;
    } catch (error) {
      console.error('Payment status check failed:', error);
      setPaymentCompleted(false);
      return false;
    }
  }, []);

  // Optimized auth refresh
  const refreshAuth = useCallback(async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Session refresh error:', error);
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
        await Promise.all([
          checkAdminStatus(session.user),
          checkEmailVerification(session.user),
          checkPaymentStatus(session.user)
        ]);
      } else {
        setUser(null);
        setIsAdmin(false);
        setEmailVerified(false);
        setPaymentCompleted(false);
      }
    } catch (error) {
      console.error('Auth refresh failed:', error);
      setUser(null);
      setIsAdmin(false);
      setEmailVerified(false);
      setPaymentCompleted(false);
    } finally {
      setLoading(false);
    }
  }, [checkAdminStatus, checkEmailVerification, checkPaymentStatus]);

  // Optimized sign out
  const authSignOut = useCallback(async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setIsAdmin(false);
      setEmailVerified(false);
      setPaymentCompleted(false);
      
      // Clear caches
      sessionStorage.clear();
      localStorage.removeItem('payment_date');
      localStorage.removeItem('payment_plan');
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  }, []);

  // Initialize auth state
  useEffect(() => {
    console.log('🚀 Initializing AuthProvider...');
    
    let mounted = true;
    
    const initializeAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (!mounted) return;
        
        if (error) {
          console.error('Initial session error:', error);
          setLoading(false);
          return;
        }

        if (session?.user) {
          console.log('🔄 Auth state change detected: SIGNED_IN');
          setUser(session.user);
          
          // Run checks in parallel
          await Promise.all([
            checkAdminStatus(session.user),
            checkEmailVerification(session.user),
            checkPaymentStatus(session.user)
          ]);
        } else {
          console.log('🔄 Auth state change detected: SIGNED_OUT');
          setUser(null);
          setIsAdmin(false);
          setEmailVerified(false);
          setPaymentCompleted(false);
        }
      } catch (error) {
        console.error('Auth initialization failed:', error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;
      
      console.log('🔄 Auth state change:', event);
      
      if (session?.user) {
        setUser(session.user);
        
        // Run checks in parallel
        await Promise.all([
          checkAdminStatus(session.user),
          checkEmailVerification(session.user),
          checkPaymentStatus(session.user)
        ]);
      } else {
        setUser(null);
        setIsAdmin(false);
        setEmailVerified(false);
        setPaymentCompleted(false);
      }
      
      setLoading(false);
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
    authSignOut
  }), [user, isAdmin, loading, verificationStatus, refreshAuth, emailVerified, paymentCompleted, authSignOut]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

