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

  const checkUserAndStatus = useCallback(async () => {
    try {
      setLoading(true);
      const { data: { user: supabaseUser } } = await supabase.auth.getUser();
      setUser(supabaseUser);

      if (supabaseUser) {
        // Enhanced email verification check with better error handling
        let isEmailVerified = false;
        
        // First check: Supabase auth email_confirmed_at
        if (supabaseUser.email_confirmed_at) {
          isEmailVerified = true;
          console.log('✅ Email verified via auth.users');
        }
        
        // Second check: user_access_status table (with fallback)
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
            console.warn('Error checking user_access_status:', accessError);
          }
        }
        
        setEmailVerified(isEmailVerified);

        // Check payment status with correct column names and better error handling
        try {
          const { data: profile, error } = await supabase
            .from('user_profiles')
            .select('payment_verified, payment_status, manual_override, subscription_status')
            .eq('user_id', supabaseUser.id)
            .single();

          if (error) {
            // If error is "PGRST116" (no rows), try with 'id' field instead
            if (error.code === 'PGRST116') {
              console.log('🔄 No profile found with user_id, trying with id field...');
              try {
                const { data: profileById, error: errorById } = await supabase
                  .from('user_profiles')
                  .select('payment_verified, payment_status, manual_override, subscription_status')
                  .eq('id', supabaseUser.id)
                  .single();
                
                if (errorById) {
                  console.warn('Error fetching user profile by id:', errorById);
                  setPaymentCompleted(false);
                } else if (profileById && (
                  profileById.payment_verified === true || 
                  profileById.payment_status === 'completed' ||
                  profileById.subscription_status === 'active' ||
                  profileById.manual_override === true
                )) {
                  setPaymentCompleted(true);
                  console.log('✅ Payment completed via user_profiles (by id)');
                } else {
                  setPaymentCompleted(false);
                  console.log('❌ Payment not completed (by id)');
                }
              } catch (profileByIdError) {
                console.warn('Error checking payment status by id:', profileByIdError);
                setPaymentCompleted(false);
              }
            } else {
              console.warn('Error fetching user profile:', error);
              setPaymentCompleted(false);
            }
          } else if (profile && (
            profile.payment_verified === true || 
            profile.payment_status === 'completed' ||
            profile.subscription_status === 'active' ||
            profile.manual_override === true
          )) {
            setPaymentCompleted(true);
            console.log('✅ Payment completed via user_profiles');
          } else {
            setPaymentCompleted(false);
            console.log('❌ Payment not completed');
          }
        } catch (profileError) {
          console.warn('Error checking payment status:', profileError);
          setPaymentCompleted(false);
        }
      } else {
        setEmailVerified(false);
        setPaymentCompleted(false);
      }
    } catch (error) {
      console.error('Error in checkUserAndStatus:', error);
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
      // Re-check user and status on auth state changes
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

