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
        
        // Get current session
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('Error getting session:', sessionError);
          return;
        }
        
        if (sessionData?.session) {
          setSession(sessionData.session);
          setUser(sessionData.session.user);
          
          // Check payment status
          const paymentStatus = await checkPaymentStatus();
          setPaymentCompleted(paymentStatus);
          
          // Check admin status
          await checkAdminStatus(sessionData.session.user);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
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
        const paymentStatus = await checkPaymentStatus();
        setPaymentCompleted(paymentStatus);
        
        // Check admin status
        await checkAdminStatus(session.user);
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
      if (user.user_metadata?.payment_verified === true) {
        return true;
      }
      
      // Then check database
      const { data, error } = await supabase
        .from('user_profiles')
        .select('payment_verified, payment_status')
        .eq('id', user.id)
        .single();
      
      if (error) {
        console.error('Error checking payment status:', error);
        return false;
      }
      
      // Also check for temporary access
      const tempAccessUntil = user.user_metadata?.temp_access_until || data?.temp_access_until;
      if (tempAccessUntil) {
        const expiryDate = new Date(tempAccessUntil);
        if (expiryDate > new Date()) {
          return true;
        }
      }
      
      return data?.payment_verified === true || data?.payment_status === 'verified';
    } catch (error) {
      console.error('Error checking payment status:', error);
      return false;
    }
  };

  // Check if user is admin
  const checkAdminStatus = async (user: User): Promise<void> => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('role')
        .eq('id', user.id)
        .single();
      
      if (error) {
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
      const { data: existingUsers } = await supabase
        .from('user_profiles')
        .select('email')
        .eq('email', email)
        .limit(1);
      
      if (existingUsers && existingUsers.length > 0) {
        return { emailExists: true };
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