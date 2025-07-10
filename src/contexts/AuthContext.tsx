// File: src/contexts/AuthContext.tsx

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

  // IMPROVED: Helper function to create user profile with proper schema
  const ensureUserProfile = async (user: User) => {
    try {
      // Check if profile exists by email (matches webhook behavior)
      const { data: existingProfile, error: fetchError } = await supabase
        .from('user_profiles')
        .select('id, email, payment_verified, payment_status')
        .eq('email', user.email)
        .single();

      if (fetchError && fetchError.code === 'PGRST116') {
        // Profile doesn't exist, create it
        console.log('Creating user profile for:', user.email);
        const { error: createError } = await supabase
          .from('user_profiles')
          .insert({
            id: user.id, // Use auth user ID
            email: user.email,
            payment_verified: false,
            payment_status: 'pending',
            subscription_status: 'free',
            role: 'user',
            created_at: new Date().toISOString()
            // REMOVED: user_id field (doesn't exist in database)
          });

        if (createError) {
          console.error('Error creating user profile:', createError);
        } else {
          console.log('✅ User profile created successfully');
        }
      } else if (existingProfile) {
        console.log('✅ User profile already exists');
        
        // Update the profile with the correct user ID if it's missing or different
        if (existingProfile.id !== user.id) {
          console.log('Updating user profile ID mapping...');
          const { error: updateError } = await supabase
            .from('user_profiles')
            .update({ 
              id: user.id, 
              updated_at: new Date().toISOString() 
            })
            .eq('email', user.email);
          
          if (updateError) {
            console.error('Error updating user profile ID:', updateError);
          } else {
            console.log('✅ Updated user profile ID mapping');
          }
        }
      }

      // IMPROVED: Handle user_access_status more carefully (might be a view)
      try {
        const { data: existingAccess, error: accessFetchError } = await supabase
          .from('user_access_status')
          .select('id, email, email_verified')
          .eq('email', user.email)
          .single();

        if (accessFetchError && accessFetchError.code === 'PGRST116') {
          // Try to create access status record (only if it's a real table)
          console.log('Attempting to create user access status for:', user.email);
          const { error: createAccessError } = await supabase
            .from('user_access_status')
            .insert({
              id: user.id,
              email: user.email,
              email_verified: !!user.email_confirmed_at,
              payment_verified: false,
              has_access: false,
              access_type: 'No access',
              subscription_status: 'free',
              manual_override: false
            });

          if (createAccessError) {
            console.warn('Could not create user access status (might be a view):', createAccessError);
            // Don't throw - might be a view
          } else {
            console.log('✅ User access status created successfully');
          }
        }
      } catch (accessError) {
        console.warn('Could not manipulate user_access_status (likely a view):', accessError);
      }
    } catch (error) {
      console.error('Error ensuring user profile:', error);
    }
  };

  // IMPROVED: Comprehensive payment completion check
  const isPaymentCompleted = (profile: any) => {
    // Check multiple indicators of payment completion
    const hasVerifiedPayment = profile?.payment_verified === true;
    const hasVerifiedStatus = profile?.payment_status === 'verified';
    const hasActiveSubscription = profile?.subscription_status === 'active';
    const hasManualOverride = profile?.manual_override === true;
    
    // Check temporary access
    const hasTempAccess = profile?.temp_access_until && 
      new Date(profile.temp_access_until) > new Date();
    
    // Log the check for debugging
    console.log('Payment completion check:', {
      hasVerifiedPayment,
      hasVerifiedStatus,
      hasActiveSubscription,
      hasManualOverride,
      hasTempAccess,
      temp_access_until: profile?.temp_access_until
    });
    
    return hasVerifiedPayment || hasVerifiedStatus || hasActiveSubscription || 
           hasManualOverride || hasTempAccess;
  };

  // IMPROVED: Robust user status checking with better error handling
  const checkUserAndStatus = useCallback(async () => {
    try {
      setLoading(true);
      
      // Get current user from Supabase
      const { data: { user: supabaseUser }, error: userError } = await supabase.auth.getUser();
      
      if (userError) {
        console.error('Error getting user:', userError);
        setUser(null);
        setEmailVerified(false);
        setPaymentCompleted(false);
        return;
      }
      
      setUser(supabaseUser);

      if (supabaseUser) {
        // Ensure user profile exists
        await ensureUserProfile(supabaseUser);

        // Check email verification
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
              .eq('email', supabaseUser.email)
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

        // IMPROVED: Check payment status with multiple fallbacks and better error handling
        let paymentStatus = false;
        
        try {
          // Primary check: user_profiles table (by email to match webhook)
          const { data: profile, error: profileError } = await supabase
            .from("user_profiles")
            .select(`
              payment_verified, 
              payment_status, 
              manual_override, 
              subscription_status, 
              temp_access_until,
              plan_type,
              current_period_end
            `)
            .eq("email", supabaseUser.email)
            .single();

          if (profileError) {
            if (profileError.code === 'PGRST116') {
              console.warn('User profile not found by email:', supabaseUser.email);
            } else {
              console.warn('Error fetching user profile:', profileError);
            }
          } else if (profile) {
            paymentStatus = isPaymentCompleted(profile);
            console.log(`Payment status: ${paymentStatus ? '✅ Completed' : '❌ Not completed'}`);
            console.log('Profile data:', profile);
          }

          // Secondary check: user_access_status (if available and primary check failed)
          if (!paymentStatus) {
            try {
              const { data: accessStatus, error: accessError } = await supabase
                .from('user_access_status')
                .select('has_access, payment_verified, temp_access_until')
                .eq('email', supabaseUser.email)
                .single();
              
              if (!accessError && accessStatus) {
                const hasAccessViaStatus = accessStatus.has_access || 
                  accessStatus.payment_verified ||
                  (accessStatus.temp_access_until && new Date(accessStatus.temp_access_until) > new Date());
                
                if (hasAccessViaStatus) {
                  paymentStatus = true;
                  console.log('✅ Payment verified via user_access_status');
                }
              }
            } catch (accessError) {
              console.warn('Could not check user_access_status for payment:', accessError);
            }
          }

          // Tertiary check: localStorage temporary access (24-hour grace period)
          if (!paymentStatus) {
            try {
              const paymentDate = localStorage.getItem('payment_date');
              const paymentPlan = localStorage.getItem('payment_plan');
              
              if (paymentDate && paymentPlan) {
                const paymentTime = new Date(paymentDate).getTime();
                const now = Date.now();
                const hoursSincePayment = (now - paymentTime) / (1000 * 60 * 60);
                
                // 24-hour temporary access
                if (hoursSincePayment < 24) {
                  paymentStatus = true;
                  console.log('✅ Temporary access granted via localStorage');
                }
              }
            } catch (error) {
              console.warn('Error checking temporary access:', error);
            }
          }

        } catch (profileError) {
          console.error('Error checking payment status:', profileError);
        }
        
        setPaymentCompleted(paymentStatus);
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

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state change:', event, session?.user?.email);
      
      // Add a small delay to allow database operations to complete
      if (event === 'SIGNED_IN' && session?.user) {
        setTimeout(() => {
          checkUserAndStatus();
        }, 1000);
      } else {
        checkUserAndStatus();
      }
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
      
      // Add a small delay to allow session to be established
      if (data.user) {
        setTimeout(() => {
          checkUserAndStatus();
        }, 500);
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
      
      return { data, error: null };
    } catch (error) {
      console.error('Sign up error:', error);
      return { data: null, error };
    }
  };

  const authSignOut = async () => {
    try {
      console.log('Starting sign out process...');
      setLoading(true);
      
      // Clear local state first
      setUser(null);
      setEmailVerified(false);
      setPaymentCompleted(false);
      
      // Clear any stored data
      localStorage.removeItem('draft_content');
      localStorage.removeItem('draft_text_type');
      localStorage.removeItem('draft_timestamp');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('payment_plan');
      localStorage.removeItem('payment_date');
      
      // Sign out from Supabase
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Supabase sign out error:', error);
        // Don't throw error, continue with local cleanup
      } else {
        console.log('✅ Successfully signed out from Supabase');
      }
      
      // Force refresh auth state
      await checkUserAndStatus();
      
    } catch (error) {
      console.error('Sign out error:', error);
      // Even if there's an error, ensure local state is cleared
      setUser(null);
      setEmailVerified(false);
      setPaymentCompleted(false);
    } finally {
      setLoading(false);
      console.log('Sign out process completed');
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