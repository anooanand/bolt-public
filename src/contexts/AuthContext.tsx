import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  verificationStatus: 'pending' | 'verified' | 'failed';
  refreshAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAdmin: false,
  loading: true,
  verificationStatus: 'pending',
  refreshAuth: async () => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Type alias for operation function
type OperationFunction<T> = () => Promise<T>;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'verified' | 'failed'>('pending');

  const checkAdminStatus = async (user: User, retries = 3) => {
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
        
        console.error('Error checking admin status:', error);
        setIsAdmin(false);
        return;
      }

      setIsAdmin(data?.role === 'admin');
    } catch (error) {
      console.error('Error checking admin status:', error);
      setIsAdmin(false);
    }
  };

  // ENHANCED: Network-aware retry mechanism
  const networkAwareRetry = async <T>(
    operation: OperationFunction<T>,
    maxRetries = 5,
    operationName = 'operation'
  ): Promise<T | null> => {
    let lastError;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`${operationName} - attempt ${attempt}/${maxRetries}`);
        return await operation();
      } catch (error: any) {
        lastError = error;
        
        // Check if it's a retryable error
        const isRetryable = 
          error.message?.includes('timeout') ||
          error.message?.includes('network') ||
          error.code === 'NETWORK_ERROR' ||
          error.status >= 500;
        
        if (isRetryable && attempt < maxRetries) {
          const delay = Math.min(1000 * Math.pow(2, attempt), 10000); // Max 10s
          console.log(`${operationName} failed, retrying in ${delay}ms...`, error.message);
          await new Promise(resolve => setTimeout(resolve, delay));
          continue;
        }
        
        // If it's not retryable or we've exhausted retries, break
        break;
      }
    }
    
    console.error(`${operationName} failed after ${maxRetries} attempts:`, lastError);
    return null;
  };

  // ENHANCED: Auth state checker with multiple verification points
  const checkAuthState = async (retryCount = 0) => {
    const maxRetries = 5;
    
    try {
      console.log(`🔍 Checking auth state (attempt ${retryCount + 1}/${maxRetries + 1})`);
      
      // ENHANCED: Get session with timeout protection
      const sessionResult = await networkAwareRetry(
        () => supabase.auth.getSession(),
        3,
        'getSession'
      );

      if (!sessionResult) {
        if (retryCount < maxRetries) {
          console.log(`Session fetch failed, retrying in ${(retryCount + 1) * 2000}ms...`);
          setTimeout(() => checkAuthState(retryCount + 1), (retryCount + 1) * 2000);
          return;
        } else {
          console.error('Failed to get session after maximum retries');
          setLoading(false);
          setVerificationStatus('failed');
          return;
        }
      }

      const { session, error } = sessionResult;
      
      if (error) {
        console.error('Session error:', error);
        if (retryCount < maxRetries) {
          setTimeout(() => checkAuthState(retryCount + 1), (retryCount + 1) * 2000);
          return;
        } else {
          setLoading(false);
          setVerificationStatus('failed');
          return;
        }
      }

      if (session?.user) {
        // ENHANCED: Double-check with fresh user data
        const userResult = await networkAwareRetry(
          () => supabase.auth.getUser(),
          3,
          'getUser'
        );

        if (userResult && !userResult.error) {
          const freshUser = userResult.data.user;
          
          // ENHANCED: Check verification status
          if (freshUser?.email_confirmed_at) {
            console.log('✅ User email verified:', freshUser.email);
            setUser(freshUser);
            setVerificationStatus('verified');
            await checkAdminStatus(freshUser);
          } else {
            console.log('⚠️ User email not yet verified:', freshUser?.email);
            setUser(freshUser);
            setVerificationStatus('pending');
            // Still check admin status for unverified users
            await checkAdminStatus(freshUser);
          }
        } else {
          // Fall back to session user if fresh user fetch fails
          console.warn('Fresh user fetch failed, using session user');
          setUser(session.user);
          
          if (session.user.email_confirmed_at) {
            setVerificationStatus('verified');
          } else {
            setVerificationStatus('pending');
          }
          
          await checkAdminStatus(session.user);
        }
      } else {
        console.log('No active session');
        setUser(null);
        setIsAdmin(false);
        setVerificationStatus('pending');
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Unexpected error in auth state check:', error);
      
      if (retryCount < maxRetries) {
        console.log(`Retrying auth state check (${retryCount + 1}/${maxRetries})...`);
        setTimeout(() => checkAuthState(retryCount + 1), (retryCount + 1) * 2000);
      } else {
        console.error('Auth state check failed after maximum retries');
        setLoading(false);
        setVerificationStatus('failed');
      }
    }
  };

  // ENHANCED: Manual auth refresh function
  const refreshAuth = async () => {
    console.log('🔄 Manual auth refresh triggered');
    setLoading(true);
    await checkAuthState(0);
  };

  useEffect(() => {
    let mounted = true;
    let authSubscription: any;

    const initializeAuth = async () => {
      if (!mounted) return;
      
      console.log('🚀 Initializing AuthProvider...');
      await checkAuthState(0);
    };

    initializeAuth();

    // ENHANCED: Auth state change listener with improved handling
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;
        
        console.log('🔄 Auth state change detected:', event, {
          hasUser: !!session?.user,
          userEmail: session?.user?.email,
          emailConfirmed: !!session?.user?.email_confirmed_at
        });
        
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          // ENHANCED: Add delay to allow for potential state propagation
          setTimeout(async () => {
            if (!mounted) return;
            
            try {
              // Always fetch fresh user data on sign-in events
              const { data: userData, error } = await supabase.auth.getUser();
              
              if (error) {
                console.error('Error fetching user after auth change:', error);
                // Fall back to session user
                if (session?.user) {
                  setUser(session.user);
                  setVerificationStatus(session.user.email_confirmed_at ? 'verified' : 'pending');
                  await checkAdminStatus(session.user);
                }
                return;
              }

              const freshUser = userData.user;
              
              if (freshUser?.email_confirmed_at) {
                console.log('✅ User verified via auth state change:', freshUser.email);
                setUser(freshUser);
                setVerificationStatus('verified');
                await checkAdminStatus(freshUser);
              } else if (freshUser) {
                console.log('⚠️ User not yet verified via auth state change:', freshUser.email);
                setUser(freshUser);
                setVerificationStatus('pending');
                await checkAdminStatus(freshUser);
              }
            } catch (error) {
              console.error('Error in auth state change handler:', error);
            }
          }, 1500); // 1.5 second delay for state propagation
        }
        
        if (event === 'SIGNED_OUT') {
          console.log('👋 User signed out');
          setUser(null);
          setIsAdmin(false);
          setVerificationStatus('pending');
        }
        
        // Handle password recovery and user updates
        if (event === 'PASSWORD_RECOVERY' || event === 'USER_UPDATED') {
          if (session?.user) {
            setUser(session.user);
            setVerificationStatus(session.user.email_confirmed_at ? 'verified' : 'pending');
            await checkAdminStatus(session.user);
          }
        }
        
        setLoading(false);
      }
    );

    authSubscription = subscription;

    // Cleanup
    return () => {
      mounted = false;
      if (authSubscription) {
        authSubscription.unsubscribe();
      }
    };
  }, []);

  // ENHANCED: Debug logging for development
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('👤 Auth State:', {
        user: user?.email || 'none',
        isAdmin,
        loading,
        verificationStatus,
        emailConfirmed: !!user?.email_confirmed_at
      });
    }
  }, [user, isAdmin, loading, verificationStatus]);

  const value = {
    user,
    isAdmin,
    loading,
    verificationStatus,
    refreshAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};