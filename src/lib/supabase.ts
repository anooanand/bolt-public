// FIXED: Enhanced Supabase configuration with simplified verification logic
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
    
    // Create user profile
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

// COMPLETELY REWRITTEN: Simple and reliable email verification check
export async function isEmailVerified(): Promise<boolean> {
  try {
    console.log('🔍 Checking email verification status...');
    
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) {
      console.log('❌ No user found or error:', error);
      return false;
    }
    
    console.log('👤 User found:', user.email);
    console.log('📧 email_confirmed_at:', user.email_confirmed_at);
    console.log('✅ confirmed_at:', user.confirmed_at);
    
    // Primary check: email_confirmed_at field
    if (user.email_confirmed_at) {
      console.log('✅ Email verified via email_confirmed_at');
      return true;
    }
    
    // Secondary check: confirmed_at field
    if (user.confirmed_at) {
      console.log('✅ Email verified via confirmed_at');
      return true;
    }
    
    // Tertiary check: user metadata
    if (user.user_metadata?.email_verified === true) {
      console.log('✅ Email verified via user_metadata');
      return true;
    }
    
    // Database fallback check
    try {
      const { data, error: dbError } = await supabase
        .from('user_profiles')
        .select('manual_override, email_verified')
        .eq('id', user.id)
        .single();
      
      if (!dbError && data) {
        if (data.manual_override === true) {
          console.log('✅ Email verified via manual_override');
          return true;
        }
        
        if (data.email_verified === true) {
          console.log('✅ Email verified via database email_verified field');
          return true;
        }
      }
    } catch (dbError) {
      console.warn('Database check failed:', dbError);
    }
    
    console.log('❌ Email not verified');
    return false;
  } catch (error) {
    console.error('Error checking email verification:', error);
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

// COMPLETELY REWRITTEN: Simplified email verification callback handler
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
      
      // Mark email as verified in database
      try {
        const { error: updateError } = await supabase
          .from('user_profiles')
          .upsert({
            id: user.id,
            user_id: user.id,
            email: user.email,
            email_verified: true,
            email_verified_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          });
        
        if (updateError) {
          console.warn('Error updating email verification in database:', updateError);
        } else {
          console.log('✅ Email verification updated in database');
        }
      } catch (error) {
        console.warn('Error updating email verification:', error);
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

// Force sign out function
export async function forceSignOut() {
  if (isSigningOut) {
    console.log('Force sign out already in progress, skipping...');
    return true;
  }
  
  try {
    isSigningOut = true;
    console.log('Executing forceSignOut function...');
    
    // Clear local storage
    localStorage.removeItem('payment_plan');
    localStorage.removeItem('payment_date');
    localStorage.removeItem('temp_access_until');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('payment_status');
    localStorage.removeItem('user_plan');
    
    // Sign out from Supabase
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error('Force sign out error from Supabase:', error);
    }
    
    console.log('Force sign out completed');
    return true;
  } catch (error) {
    console.error('Force sign out error:', error);
    localStorage.clear();
    return true;
  } finally {
    setTimeout(() => {
      isSigningOut = false;
    }, 2000);
  }
}

