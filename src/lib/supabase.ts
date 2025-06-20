// FINAL CORRECTED: Clean Supabase configuration with proper verification logic
import { createClient } from '@supabase/supabase-js';

// Environment variables validation
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '', {
  auth: {
    storage: localStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce'
  }
});

// FIXED: Simplified and reliable user management functions
export async function getCurrentUser() {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

export async function signUp(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
        data: {
          payment_status: 'pending',
          email_confirmed: false,
          temp_access_until: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
        }
      }
    });
    
    if (error) {
      if (error.message?.includes('already registered') || error.message?.includes('already exists')) {
        return { emailExists: true, error, success: false };
      }
      throw error;
    }
    
    localStorage.setItem('userEmail', email);
    
    // Create user profile ONLY after auth success
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

        // Create user_access_status record
        const { error: accessError } = await supabase
          .from('user_access_status')
          .upsert({
            id: data.user.id,
            email: email,
            email_verified: false, // Will be updated after verification
            payment_verified: false,
            manual_override: false,
            subscription_status: 'free',
            temp_access_until: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
            has_access: true,
            access_type: 'Temporary access'
          });

        if (accessError) {
          console.warn('Error creating user access status:', accessError);
        }
      }
    } catch (profileError) {
      console.warn('Error in profile creation fallback:', profileError);
    }
    
    return { data, success: true, user: data.user };
  } catch (error) {
    console.error('Sign up error:', error);
    return { error, success: false };
  }
}

export async function signIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw error;
    
    localStorage.setItem('userEmail', email);
    
    return data;
  } catch (error) {
    console.error('Sign in error:', error);
    throw error;
  }
}

let isSigningOut = false;

export async function signOut() {
  if (isSigningOut) {
    console.log('Sign out already in progress, skipping...');
    return { success: true };
  }
  
  try {
    isSigningOut = true;
    console.log('Executing signOut function...');
    
    // Clear local storage first
    localStorage.removeItem('payment_plan');
    localStorage.removeItem('payment_date');
    localStorage.removeItem('temp_access_until');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('payment_status');
    localStorage.removeItem('user_plan');
    
    // Sign out from Supabase
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error('Sign out error from Supabase:', error);
    }
    
    console.log('Sign out completed successfully');
    return { success: true };
  } catch (error) {
    console.error('Sign out error:', error);
    localStorage.clear();
    return { success: true };
  } finally {
    setTimeout(() => {
      isSigningOut = false;
    }, 1000);
  }
}

export async function requestPasswordReset(email: string) {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Password reset error:', error);
    return { success: false, error };
  }
}

// FIXED: Enhanced email verification check that handles missing auth users
export async function isEmailVerified(): Promise<boolean> {
  try {
    console.log('🔍 Checking email verification status...');
    
    // Primary check: Get user from auth.users
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error) {
      console.log('❌ Auth error:', error);
      // Fallback to checking user_access_status if auth fails
      return await checkVerificationFallback();
    }
    
    if (!user) {
      console.log('❌ No auth user found, checking fallback...');
      // Fallback to checking user_access_status
      return await checkVerificationFallback();
    }
    
    console.log('👤 Auth user found:', user.email);
    console.log('📧 email_confirmed_at:', user.email_confirmed_at);
    console.log('✅ confirmed_at:', user.confirmed_at);
    
    // Primary verification checks
    if (user.email_confirmed_at) {
      console.log('✅ Email verified via email_confirmed_at');
      return true;
    }
    
    if (user.confirmed_at) {
      console.log('✅ Email verified via confirmed_at');
      return true;
    }
    
    if (user.user_metadata?.email_verified === true) {
      console.log('✅ Email verified via user_metadata');
      return true;
    }
    
    // If auth user exists but not verified, check database fallback
    console.log('⚠️ Auth user not verified, checking database fallback...');
    return await checkVerificationFallback();
    
  } catch (error) {
    console.error('Error checking email verification:', error);
    // On any error, try fallback
    return await checkVerificationFallback();
  }
}

// ADDED: Fallback verification check using user_access_status table
async function checkVerificationFallback(): Promise<boolean> {
  try {
    console.log('🔄 Checking verification via user_access_status fallback...');
    
    // Get current user email from localStorage or session
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
      console.log('❌ No user email found in localStorage');
      return false;
    }
    
    console.log('📧 Checking verification for email:', userEmail);
    
    // Check user_access_status table
    const { data: accessStatus, error: accessError } = await supabase
      .from('user_access_status')
      .select('email_verified, manual_override')
      .eq('email', userEmail)
      .single();
    
    if (accessError) {
      console.warn('Error checking user_access_status:', accessError);
      
      // Final fallback: check user_profiles
      const { data: profile, error: profileError } = await supabase
        .from('user_profiles')
        .select('email, manual_override')
        .eq('email', userEmail)
        .single();
      
      if (profileError) {
        console.error('Error checking user_profiles:', profileError);
        return false;
      }
      
      if (profile?.manual_override === true) {
        console.log('✅ Email verified via user_profiles manual_override');
        return true;
      }
      
      console.log('❌ No verification found in fallback checks');
      return false;
    }
    
    if (accessStatus?.email_verified === true) {
      console.log('✅ Email verified via user_access_status');
      return true;
    }
    
    if (accessStatus?.manual_override === true) {
      console.log('✅ Email verified via user_access_status manual_override');
      return true;
    }
    
    console.log('❌ Email not verified in user_access_status');
    return false;
    
  } catch (error) {
    console.error('Error in verification fallback:', error);
    return false;
  }
}

// FIXED: Simplified payment status check
export async function hasCompletedPayment(): Promise<boolean> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;
    
    // First check if email is verified
    const emailVerified = await isEmailVerified();
    if (!emailVerified) {
      return false;
    }
    
    // Check user metadata for payment status
    if (user.user_metadata?.payment_confirmed === true) {
      return true;
    }
    
    // Check database
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('payment_verified, payment_status, manual_override')
        .eq('id', user.id)
        .single();
      
      if (error) {
        console.warn('Database query error in hasCompletedPayment:', error);
        const paymentStatus = localStorage.getItem('payment_status');
        return paymentStatus === 'paid' || paymentStatus === 'verified';
      }
      
      // Manual override takes precedence
      if (data?.manual_override === true) {
        return true;
      }
      
      return data?.payment_verified === true || data?.payment_status === 'verified';
      
    } catch (error) {
      console.error('Error checking payment status:', error);
      const paymentStatus = localStorage.getItem('payment_status');
      return paymentStatus === 'paid' || paymentStatus === 'verified';
    }
  } catch (error) {
    console.error('Error in hasCompletedPayment:', error);
    return false;
  }
}

export async function hasTemporaryAccess(): Promise<boolean> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;
    
    // First check if email is verified
    const emailVerified = await isEmailVerified();
    if (!emailVerified) {
      return false;
    }
    
    // Check user metadata for temporary access
    const tempAccessUntil = user.user_metadata?.temp_access_until;
    if (tempAccessUntil) {
      const expiryDate = new Date(tempAccessUntil);
      if (expiryDate > new Date()) {
        return true;
      }
    }
    
    // Check database
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('temp_access_until, temporary_access_expires, manual_override')
        .eq('id', user.id)
        .single();
      
      if (error) {
        console.warn('Error checking temporary access in database:', error);
        const localTempAccess = localStorage.getItem('temp_access_until');
        if (localTempAccess) {
          const expiryDate = new Date(localTempAccess);
          return expiryDate > new Date();
        }
        return false;
      }
      
      // Manual override grants indefinite access
      if (data?.manual_override === true) {
        return true;
      }
      
      // Check both temp access fields
      if (data?.temp_access_until) {
        const expiryDate = new Date(data.temp_access_until);
        if (expiryDate > new Date()) {
          return true;
        }
      }
      
      if (data?.temporary_access_expires) {
        const expiryDate = new Date(data.temporary_access_expires);
        if (expiryDate > new Date()) {
          return true;
        }
      }
      
    } catch (error) {
      console.warn('Error checking temporary access in database:', error);
    }
    
    // Check localStorage as final fallback
    const localTempAccess = localStorage.getItem('temp_access_until');
    if (localTempAccess) {
      const expiryDate = new Date(localTempAccess);
      if (expiryDate > new Date()) {
        return true;
      }
    }
    
    return false;
  } catch (error) {
    console.error('Error checking temporary access:', error);
    return false;
  }
}

export async function confirmPayment(planType: string) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      throw new Error('No user found');
    }
    
    const emailVerified = await isEmailVerified();
    if (!emailVerified) {
      throw new Error('Email not verified');
    }
    
    // Update user metadata
    const { data, error } = await supabase.auth.updateUser({
      data: {
        payment_confirmed: true,
        plan_type: planType,
        payment_date: new Date().toISOString(),
      }
    });
    
    if (error) throw error;
    
    // Update user_profiles table
    try {
      const { error: profileError } = await supabase
        .from('user_profiles')
        .update({
          payment_verified: true,
          payment_status: 'verified',
          subscription_status: 'active',
          subscription_plan: planType,
          updated_at: new Date().toISOString()
        })
        .eq('id', data.user.id);
        
      if (profileError) {
        console.warn('Error updating user profile:', profileError);
      }
    } catch (profileError) {
      console.warn('Error updating user profile:', profileError);
    }
    
    // Update local storage
    localStorage.setItem('payment_status', 'paid');
    localStorage.setItem('user_plan', planType);
    
    return { success: true, data };
  } catch (error) {
    console.error('Error confirming payment:', error);
    throw error;
  }
}

// FIXED: Enhanced email verification callback handler
export async function handleEmailVerificationCallback(): Promise<{ success: boolean; user?: any; error?: any }> {
  try {
    console.log('🔄 Processing email verification callback...');
    
    // Check for errors in URL first
    const urlParams = new URLSearchParams(window.location.search);
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    
    const errorCode = urlParams.get('error_code') || hashParams.get('error_code');
    const errorDescription = urlParams.get('error_description') || hashParams.get('error_description');
    const error = urlParams.get('error') || hashParams.get('error');
    
    if (errorCode || error) {
      console.error('❌ Error in verification URL:', errorCode || error, errorDescription);
      return { 
        success: false, 
        error: { 
          code: errorCode || error, 
          message: errorDescription || 'Verification link is invalid or has expired' 
        } 
      };
    }
    
    // Get current session
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError) {
      console.error('❌ Session error during verification:', sessionError);
      return { success: false, error: sessionError };
    }
    
    if (sessionData?.session?.user) {
      const user = sessionData.session.user;
      console.log('✅ User session found during verification:', user.email);
      
      // Update verification status in all relevant tables
      try {
        // Update user_profiles
        await supabase
          .from('user_profiles')
          .update({
            updated_at: new Date().toISOString()
          })
          .eq('user_id', user.id);
        
        // Update user_access_status
        await supabase
          .from('user_access_status')
          .update({
            email_verified: true
          })
          .eq('id', user.id);
        
        console.log('✅ Verification status updated in database');
      } catch (error) {
        console.warn('Error updating verification status:', error);
      }
      
      return { success: true, user };
    }
    
    // If no session, try to refresh
    console.log('🔄 No session found, attempting to refresh...');
    const { data: refreshData, error: refreshError } = await supabase.auth.refreshSession();
    
    if (refreshError) {
      console.error('❌ Refresh session error:', refreshError);
      return { success: false, error: refreshError };
    }
    
    if (refreshData?.session?.user) {
      console.log('✅ Session refreshed successfully');
      return { success: true, user: refreshData.session.user };
    }
    
    console.log('❌ No valid session found after refresh');
    return { success: false, error: { message: 'No valid session found' } };
    
  } catch (error) {
    console.error('❌ Unexpected error in verification handler:', error);
    return { success: false, error };
  }
}

