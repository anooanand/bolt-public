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

  // Helper function to create user profile if it doesn't exist
  const ensureUserProfile = async (user: User) => {
    try {
      // First, check if profile exists
      const { data: existingProfile, error: fetchError } = await supabase
        .from('user_profiles')
        .select('id')
        .eq('id', user.id)
        .single();

      if (fetchError && fetchError.code === 'PGRST116') {
        // Profile doesn't exist, create it
        console.log('Creating user profile for:', user.email);
        const { error: createError } = await supabase
          .from('user_profiles')
          .insert({
            id: user.id,
            email: user.email,
            payment_verified: false,
            payment_status: 'pending',
            subscription_status: 'inactive',
            created_at: new Date().toISOString()
          });

        if (createError) {
          console.error('Error creating user profile:', createError);
        } else {
          console.log('✅ User profile created successfully');
        }
      } else if (existingProfile) {
        console.log('✅ User profile already exists');
      }

      // Also ensure user_access_status record exists
      const { data: existingAccess, error: accessFetchError } = await supabase
        .from('user_access_status')
        .select('id')
        .eq('id', user.id)
        .single();

      if (accessFetchError && accessFetchError.code === 'PGRST116') {
        // Access status doesn't exist, create it
        console.log('Creating user access status for:', user.email);
        const { error: createAccessError } = await supabase
          .from('user_access_status')
          .insert({
            id: user.id,
            email: user.email,
            email_verified: !!user.email_confirmed_at,
            payment_verified: false,
            has_access: false,
            access_type: 'No access'
          });

        if (createAccessError) {
          console.error('Error creating user access status:', createAccessError);
        } else {
          console.log('✅ User access status created successfully');
        }
      }
    } catch (error) {
      console.error('Error ensuring user profile:', error);
    }
  };

  // Helper function to determine payment completion status
  const isPaymentCompleted = (profile: any) => {
    return (
      profile?.payment_verified === true ||
      profile?.payment_status === 'completed' ||
      profile?.subscription_status === 'active' ||
      profile?.manual_override === true
    );
  };

  const checkUserAndStatus = useCallback(async () => {
    try {
      setLoading(true);
      const { data: { user: supabaseUser } } = await supabase.auth.getUser();
      setUser(supabaseUser);

      if (supabaseUser) {
        // Ensure user profile exists
        await ensureUserProfile(supabaseUser);

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
            console.error('Error checking user_access_status:', accessError);
          }
        }
        
        setEmailVerified(isEmailVerified);

        // Check payment status from user_profiles with better error handling
        try {
          const { data: profile, error } = await supabase
            .from('user_profiles')
            .select('payment_verified, payment_status, manual_override, subscription_status')
            .eq('id', supabaseUser.id)
            .single();

          if (error) {
            if (error.code === 'PGRST116') {
              // Profile doesn't exist, we already tried to create it above
              console.warn('User profile still not found after creation attempt');
              setPaymentCompleted(false);
            } else {
              console.warn('Error fetching user profile:', error);
              setPaymentCompleted(false);
            }
          } else if (profile) {
            setPaymentCompleted(isPaymentCompleted(profile));
            console.log(`Payment status: ${isPaymentCompleted(profile) ? '✅ Completed' : '❌ Not completed'}`);
          } else {
            setPaymentCompleted(false);
            console.log('❌ User profile not found.');
          }
        } catch (profileError) {
          console.error('Error checking payment status:', profileError);
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
      console.error('Sign in error:', error);
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
      
      // If signup is successful, the user profile will be created in checkUserAndStatus
      return { data, error: null };
    } catch (error) {
      console.error('Sign up error:', error);
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

