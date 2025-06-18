import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  paymentCompleted: boolean;
  isAdmin: boolean;
  signIn: (email: string, password: string) => Promise<{ user?: User; error?: any }>;
  signUp: (email: string, password: string) => Promise<{ user?: User; error?: any; emailExists?: boolean }>;
  authSignOut: () => Promise<void>;
  refreshSession: () => Promise<void>;
  checkPaymentStatus: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setIsLoading(true);
        
        // Set a timeout to prevent infinite loading
        const timeoutId = setTimeout(() => {
          console.warn('Auth initialization timeout - proceeding without auth');
          setIsLoading(false);
        }, 10000); // 10 second timeout
        
        // Get current session
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        
        // Clear timeout if we get a response
        clearTimeout(timeoutId);
        
        if (sessionError) {
          console.error('Error getting session:', sessionError);
          // Don't block the app if Supabase is unavailable
          setIsLoading(false);
          return;
        }
        
        if (sessionData?.session) {
          setSession(sessionData.session);
          setUser(sessionData.session.user);
          
          // Check payment status
          try {
            const paymentStatus = await checkPaymentStatus();
            setPaymentCompleted(paymentStatus);
          } catch (error) {
            console.error('Error checking payment status:', error);
            // Continue without payment verification if service is down
          }
          
          // Check admin status
          try {
            await checkAdminStatus(sessionData.session.user);
          } catch (error) {
            console.error('Error checking admin status:', error);
            // Continue without admin verification if service is down
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        // Don't block the app if there are network issues
      } finally {
        setIsLoading(false);
      }
    };
    
    initializeAuth();
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event);
      
      if (session) {
        setSession(session);
        setUser(session.user);
        
        // Check payment status
        try {
          const paymentStatus = await checkPaymentStatus();
          setPaymentCompleted(paymentStatus);
        } catch (error) {
          console.error('Error checking payment status on auth change:', error);
        }
        
        // Check admin status
        try {
          await checkAdminStatus(session.user);
        } catch (error) {
          console.error('Error checking admin status on auth change:', error);
        }
      } else {
        setSession(null);
        setUser(null);
        setPaymentCompleted(false);
        setIsAdmin(false);
      }
    });
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Check if user has completed payment
  const checkPaymentStatus = async (): Promise<boolean> => {
    try {
      if (!user) return false;
      
      // First check user metadata
      if (user.user_metadata?.payment_confirmed === true) {
        return true;
      }
      
      // Check localStorage for temporary access
      const tempAccessUntil = localStorage.getItem('temp_access_until');
      if (tempAccessUntil) {
        const expiryDate = new Date(tempAccessUntil);
        if (expiryDate > new Date()) {
          return true;
        }
      }
      
      // Then check database with timeout
      try {
        const timeoutPromise = new Promise<{data: null, error: Error}>((_, reject) => 
          setTimeout(() => reject(new Error('Payment check timeout')), 5000)
        );
        
        const dbPromise = supabase
          .from('user_profiles')
          .select('payment_verified, payment_status, temp_access_until')
          .eq('user_id', user.id)
          .single();
        
        const { data, error } = await Promise.race([dbPromise, timeoutPromise]) as any;
        
        if (error) {
          console.warn('Database payment check error:', error);
          
          // Fallback to localStorage
          const paymentStatus = localStorage.getItem('payment_status');
          return paymentStatus === 'paid' || paymentStatus === 'verified';
        }
        
        // Check for temporary access
        if (data?.temp_access_until) {
          const expiryDate = new Date(data.temp_access_until);
          if (expiryDate > new Date()) {
            return true;
          }
        }
        
        return data?.payment_verified === true || data?.payment_status === 'verified';
      } catch (error) {
        console.warn('Payment status check failed, using fallback:', error);
        
        // Fallback to localStorage
        const paymentStatus = localStorage.getItem('payment_status');
        return paymentStatus === 'paid' || paymentStatus === 'verified';
      }
    } catch (error) {
      console.error('Error in checkPaymentStatus:', error);
      return false;
    }
  };

  // Check if user is admin
  const checkAdminStatus = async (user: User): Promise<void> => {
    try {
      // Add timeout for admin check
      const adminCheckPromise = new Promise<void>(async (resolve, reject) => {
        try {
          const { data, error } = await supabase
            .from('user_profiles')
            .select('role')
            .eq('user_id', user.id)
            .single();
          
          if (error) {
            console.warn('Admin check database error:', error);
            setIsAdmin(false);
          } else {
            setIsAdmin(data?.role === 'admin');
          }
          resolve();
        } catch (error) {
          reject(error);
        }
      });
      
      const timeoutPromise = new Promise<void>((_, reject) => {
        setTimeout(() => reject(new Error('Admin check timeout')), 5000);
      });
      
      await Promise.race([adminCheckPromise, timeoutPromise]);
    } catch (error) {
      console.error('Error checking admin status:', error);
      setIsAdmin(false);
    }
  };

  // Sign in with email and password
  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      return { user: data.user };
    } catch (error) {
      console.error('Sign in error:', error);
      return { error };
    }
  };

  // Sign up with email and password
  const signUp = async (email: string, password: string) => {
    try {
      // First check if email already exists
      try {
        const { data: existingUsers, error: queryError } = await supabase
          .from('user_profiles')
          .select('email')
          .eq('email', email)
          .limit(1);
        
        if (queryError) {
          console.warn('Error checking existing users:', queryError);
          // Continue with signup even if check fails
        } else if (existingUsers && existingUsers.length > 0) {
          return { emailExists: true };
        }
      } catch (checkError) {
        console.warn('Error checking existing users:', checkError);
        // Continue with signup even if check fails
      }
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            payment_status: 'pending',
            temp_access_until: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours temp access
          }
        }
      });
      
      if (error) throw error;
      
      // Store email in localStorage for payment flow
      localStorage.setItem('userEmail', email);
      
      return { user: data.user };
    } catch (error) {
      console.error('Sign up error:', error);
      return { error };
    }
  };

  // Sign out
  const authSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      // Clear local storage
      localStorage.removeItem('payment_plan');
      localStorage.removeItem('payment_date');
      localStorage.removeItem('temp_access_until');
      
      setUser(null);
      setSession(null);
      setPaymentCompleted(false);
      setIsAdmin(false);
    } catch (error) {
      console.error('Sign out error:', error);
      // Force reset state even if API call fails
      setUser(null);
      setSession(null);
      setPaymentCompleted(false);
      setIsAdmin(false);
    }
  };

  // Refresh session
  const refreshSession = async () => {
    try {
      const { data, error } = await supabase.auth.refreshSession();
      if (error) throw error;
      
      if (data.session) {
        setSession(data.session);
        setUser(data.session.user);
        
        // Re-check payment status
        const paymentStatus = await checkPaymentStatus();
        setPaymentCompleted(paymentStatus);
      }
    } catch (error) {
      console.error('Session refresh error:', error);
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    paymentCompleted,
    isAdmin,
    signIn,
    signUp,
    authSignOut,
    refreshSession,
    checkPaymentStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};