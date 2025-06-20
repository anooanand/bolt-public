import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase, hasCompletedPayment, isEmailVerified, signOut, forceSignOut } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  paymentCompleted: boolean;
  emailVerified: boolean;
  isAdmin: boolean;
  signIn: (email: string, password: string) => Promise<{ user?: User; error?: any }>;
  signUp: (email: string, password: string) => Promise<{ user?: User; error?: any; emailExists?: boolean }>;
  authSignOut: () => Promise<void>;
  refreshSession: () => Promise<void>;
  checkPaymentStatus: () => Promise<boolean>;
  checkEmailVerification: () => Promise<boolean>;
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
  const [isLoading, setIsLoading] = useState(true);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  
  // Use refs to prevent multiple simultaneous auth checks
  const isCheckingAuth = useRef(false);
  const isSigningOut = useRef(false);
  const initializationComplete = useRef(false);

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      if (isCheckingAuth.current || initializationComplete.current) {
        return;
      }
      
      try {
        isCheckingAuth.current = true;
        setIsLoading(true);
        
        console.log('Starting auth initialization...');
        
        // Set a timeout to prevent infinite loading
        const timeoutId = setTimeout(() => {
          console.warn('Auth initialization timeout - proceeding without auth');
          setIsLoading(false);
          initializationComplete.current = true;
          isCheckingAuth.current = false;
        }, 8000); // Reduced timeout to 8 seconds
        
        // Get current session
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        
        // Clear timeout if we get a response
        clearTimeout(timeoutId);
        
        if (sessionError) {
          console.error('Error getting session:', sessionError);
          setIsLoading(false);
          initializationComplete.current = true;
          isCheckingAuth.current = false;
          return;
        }
        
        if (sessionData?.session) {
          console.log('Session found, setting user:', sessionData.session.user.email);
          setUser(sessionData.session.user);
          
          // Check verification and payment status
          await updateUserStatus(sessionData.session.user);
        } else {
          console.log('No session found');
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setIsLoading(false);
        initializationComplete.current = true;
        isCheckingAuth.current = false;
      }
    };
    
    initializeAuth();
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event);
      
      // Prevent processing during sign out to avoid loops
      if (isSigningOut.current && event === 'SIGNED_OUT') {
        console.log('Ignoring SIGNED_OUT event during sign out process');
        return;
      }
      
      if (session && event === 'SIGNED_IN') {
        console.log('User signed in:', session.user.email);
        setUser(session.user);
        
        // Update user status
        await updateUserStatus(session.user);
      } else if (event === 'SIGNED_OUT') {
        console.log('User signed out');
        setUser(null);
        setPaymentCompleted(false);
        setEmailVerified(false);
        setIsAdmin(false);
      }
    });
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Helper function to update user status
  const updateUserStatus = async (user: User) => {
    try {
      // Check email verification status
      const verified = await checkEmailVerification();
      setEmailVerified(verified);
      console.log('Email verification status:', verified);
      
      // Only check payment status if email is verified
      if (verified) {
        try {
          const paymentStatus = await checkPaymentStatus();
          setPaymentCompleted(paymentStatus);
          console.log('Payment status:', paymentStatus);
        } catch (error) {
          console.error('Error checking payment status:', error);
          // Don't fail the entire auth process if payment check fails
        }
      }
      
      // Check admin status
      try {
        await checkAdminStatus(user);
      } catch (error) {
        console.error('Error checking admin status:', error);
        // Don't fail the entire auth process if admin check fails
      }
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };

  // Check if email is verified
  const checkEmailVerification = async (): Promise<boolean> => {
    try {
      const verified = await isEmailVerified();
      return verified;
    } catch (error) {
      console.error('Error checking email verification:', error);
      return false;
    }
  };

  // Check if user has completed payment
  const checkPaymentStatus = async (): Promise<boolean> => {
    try {
      const completed = await hasCompletedPayment();
      return completed;
    } catch (error) {
      console.error('Error checking payment status:', error);
      return false;
    }
  };

  // Check if user is admin
  const checkAdminStatus = async (user: User): Promise<void> => {
    try {
      // Use a shorter timeout for admin check
      const adminCheckPromise = new Promise<void>(async (resolve, reject) => {
        try {
          const { data, error } = await supabase
            .from('user_profiles')
            .select('role')
            .eq('id', user.id)
            .single();
          
          if (error) {
            console.warn('Admin check failed:', error);
            setIsAdmin(false);
            resolve();
            return;
          }
          
          setIsAdmin(data?.role === 'admin');
          resolve();
        } catch (error) {
          reject(error);
        }
      });
      
      const timeoutPromise = new Promise<void>((_, reject) => {
        setTimeout(() => reject(new Error('Admin check timeout')), 3000);
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
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            payment_status: 'pending',
            email_confirmed: false,
            temp_access_until: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours temp access
          }
        }
      });
      
      if (error) throw error;
      
      // Store email in localStorage for payment flow
      localStorage.setItem('userEmail', email);
      
      // Manually create user profile as a fallback
      try {
        if (data.user) {
          const { error: profileError } = await supabase
            .from('user_profiles')
            .upsert({
              id: data.user.id,
              user_id: data.user.id,
              email: email,
              role: 'user',
              payment_status: 'pending',
              subscription_status: 'free',
              temp_access_until: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            });
            
          if (profileError) {
            console.warn('Error creating user profile:', profileError);
          }
        }
      } catch (profileError) {
        console.warn('Error in profile creation fallback:', profileError);
        // Continue even if profile creation fails
      }
      
      return { user: data.user };
    } catch (error) {
      console.error('Sign up error:', error);
      return { error };
    }
  };

  // Fixed sign out function with loop prevention
  const authSignOut = async () => {
    if (isSigningOut.current) {
      console.log('Sign out already in progress, skipping...');
      return;
    }
    
    try {
      isSigningOut.current = true;
      console.log('Starting sign out process...');
      
      // Call the sign out function
      await signOut();
      
      // Reset state immediately
      setUser(null);
      setPaymentCompleted(false);
      setEmailVerified(false);
      setIsAdmin(false);
      
      console.log('Sign out complete');
    } catch (error) {
      console.error('Sign out error:', error);
      // Force reset state even if API call fails
      setUser(null);
      setPaymentCompleted(false);
      setEmailVerified(false);
      setIsAdmin(false);
    } finally {
      // Reset the sign out flag after a delay
      setTimeout(() => {
        isSigningOut.current = false;
      }, 2000);
    }
  };

  // Refresh session
  const refreshSession = async () => {
    try {
      const { data, error } = await supabase.auth.refreshSession();
      if (error) throw error;
      
      if (data.session) {
        setUser(data.session.user);
        
        // Re-check verification and payment status
        await updateUserStatus(data.session.user);
      }
    } catch (error) {
      console.error('Session refresh error:', error);
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    paymentCompleted,
    emailVerified,
    isAdmin,
    signIn,
    signUp,
    authSignOut,
    refreshSession,
    checkPaymentStatus,
    checkEmailVerification
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

