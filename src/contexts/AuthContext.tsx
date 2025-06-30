import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';

// Define the AuthContext interface
interface AuthContextType {
  user: User | null;
  loading: boolean;
  emailVerified: boolean;
  paymentCompleted: boolean;
  authSignIn: (email: string, password: string) => Promise<{ data: any; error: any }>;
  authSignUp: (email: string, password: string) => Promise<{ data: any; error: any }>;
  authSignOut: () => Promise<void>;
  forceRefreshVerification: () => void;
}

// Create the AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [emailVerified, setEmailVerified] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  // Helper function to determine payment completion status
  const isPaymentCompleted = (profile: any) => {
    return (
      profile.payment_verified === true ||
      profile.payment_status === 'completed' ||
      profile.subscription_status === 'active' ||
      profile.manual_override === true
    );
  };

  const checkUserAndStatus = useCallback(async () => {
    try {
      setLoading(true);
      const { data: { user: supabaseUser } } = await supabase.auth.getUser();
      setUser(supabaseUser);

      if (supabaseUser) {
        let isEmailVerified = false;
        
        // Primary check: Supabase auth email_confirmed_at
        if (supabaseUser.email_confirmed_at) {
          isEmailVerified = true;
          console.log('✅ Email verified via auth.users');
        }
        
        // Secondary check: user_access_status table (with fallback)
        if (!isEmailVerified) {
          try {
            const { data: accessStatus, error: accessError } = await supabase
              .from('user_access_status')
              .select('email_verified')
              .eq('id', supabaseUser.id)
              .single();
            
            if (accessError) {
              console.warn('Could not check user_access_status:', accessError);
            } else if (accessStatus?.email_verified) {
              isEmailVerified = true;
              console.log('✅ Email verified via user_access_status');
            }
          } catch (accessError) {
            console.error('Error checking user_access_status:', accessError); // Changed to error
          }
        }
        
        setEmailVerified(isEmailVerified);

        // Check payment status from user_profiles, always using 'id'
        try {
          const { data: profile, error } = await supabase
            .from('user_profiles')
            .select('payment_verified, payment_status, manual_override, subscription_status')
            .eq('id', supabaseUser.id) // Standardize to 'id'
            .single();

          if (error) {
            console.warn('Error fetching user profile:', error); // Changed to warn
            setPaymentCompleted(false);
          } else if (profile) {
            setPaymentCompleted(isPaymentCompleted(profile));
            console.log(`Payment status: ${isPaymentCompleted(profile) ? '✅ Completed' : '❌ Not completed'}`);
          } else {
            setPaymentCompleted(false);
            console.log('❌ User profile not found.');
          }
        } catch (profileError) {
          console.error('Error checking payment status:', profileError); // Changed to error
          setPaymentCompleted(false);
        }
      } else {
        setEmailVerified(false);
        setPaymentCompleted(false);
      }
    } catch (error) {
      console.error('Error in checkUserAndStatus:', error); // Changed to error
      setUser(null);
      setEmailVerified(false);
      setPaymentCompleted(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkUserAndStatus();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('Auth state change:', _event);
      checkUserAndStatus();
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [checkUserAndStatus]);

  const forceRefreshVerification = useCallback(() => {
    console.log('Force refreshing verification status...');
    checkUserAndStatus();
  }, [checkUserAndStatus]);

  const authSignIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        return { data: null, error };
      }
      
      return { data, error: null };
    } catch (error) {
      console.error('Sign in error:', error); // Added error logging
      return { data: null, error };
    }
  };

  const authSignUp = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (error) {
        return { data: null, error };
      }
      
      return { data, error: null };
    } catch (error) {
      console.error('Sign up error:', error); // Added error logging
      return { data: null, error };
    }
  };

  const authSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Sign out error:', error);
      }
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    emailVerified,
    paymentCompleted,
    authSignIn,
    authSignUp,
    authSignOut,
    forceRefreshVerification
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};


