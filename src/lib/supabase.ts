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
    detectSessionInUrl: true
  }
});

// Simplified user management functions
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
          temp_access_until: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours temp access
        }
      }
    });
    
    if (error) {
      // Check if error is because user already exists
      if (error.message?.includes('already registered') || error.message?.includes('already exists')) {
        return { emailExists: true, error, success: false };
      }
      throw error;
    }
    
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

// Fixed sign out function - prevents infinite loops
let isSigningOut = false;

export async function signOut() {
  if (isSigningOut) {
    console.log('Sign out already in progress, skipping...');
    return { success: true };
  }
  
  try {
    isSigningOut = true;
    console.log('Executing signOut function...');
    
    // First clear local storage
    localStorage.removeItem('payment_plan');
    localStorage.removeItem('payment_date');
    localStorage.removeItem('temp_access_until');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('payment_status');
    localStorage.removeItem('user_plan');
    
    // Then sign out from Supabase
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error('Sign out error from Supabase:', error);
      // Continue even if API call fails
    }
    
    console.log('Sign out completed successfully');
    
    return { success: true };
  } catch (error) {
    console.error('Sign out error:', error);
    // Still clear local data even if API call fails
    localStorage.clear();
    return { success: true };
  } finally {
    // Reset the flag after a delay to prevent rapid repeated calls
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

// Check if email is verified - now includes manual override check
export async function isEmailVerified(): Promise<boolean> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;
    
    // Check if email_confirmed_at exists and is not null
    if (user.email_confirmed_at != null) {
      return true;
    }
    
    // Check for manual override in user_profiles table
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('manual_override')
        .eq('id', user.id)
        .single();
      
      if (!error && data?.manual_override === true) {
        return true;
      }
    } catch (error) {
      console.warn('Error checking manual override for email verification:', error);
    }
    
    return false;
  } catch (error) {
    console.error('Error checking email verification:', error);
    return false;
  }
}

// Fixed payment status check with proper error handling and manual override support
export async function hasCompletedPayment(): Promise<boolean> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;
    
    // First check if email is verified (including manual override)
    const emailVerified = await isEmailVerified();
    if (!emailVerified) {
      return false;
    }
    
    // Check user metadata for payment status
    if (user.user_metadata?.payment_confirmed === true) {
      return true;
    }
    
    // Check database with proper error handling
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('payment_verified, payment_status, manual_override')
        .eq('id', user.id)
        .single();
      
      if (error) {
        console.warn('Database query error in hasCompletedPayment:', error);
        
        // Fallback to localStorage only if database is completely unavailable
        const paymentStatus = localStorage.getItem('payment_status');
        return paymentStatus === 'paid' || paymentStatus === 'verified';
      }
      
      // Check for manual override first - this takes precedence
      if (data?.manual_override === true) {
        return true;
      }
      
      // Check regular payment verification
      return data?.payment_verified === true || data?.payment_status === 'verified';
      
    } catch (error) {
      console.error('Error checking payment status:', error);
      
      // Fallback to localStorage if database query fails
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
    
    // First check if email is verified (including manual override)
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
        
        // Check localStorage as fallback
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
      
      // Check both temp_access_until and temporary_access_expires fields
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
    // First check if email is verified
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
    
    // Also update user_profiles table
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
      // Continue even if profile update fails
    }
    
    // Update local storage for immediate UI updates
    localStorage.setItem('payment_status', 'paid');
    localStorage.setItem('user_plan', planType);
    
    return { success: true, data };
  } catch (error) {
    console.error('Error confirming payment:', error);
    throw error;
  }
}

// Fixed force sign out function
let isForceSigningOut = false;

export async function forceSignOut() {
  if (isForceSigningOut) {
    console.log('Force sign out already in progress, skipping...');
    return true;
  }
  
  try {
    isForceSigningOut = true;
    console.log('Executing forceSignOut function...');
    
    // First clear local storage
    localStorage.removeItem('payment_plan');
    localStorage.removeItem('payment_date');
    localStorage.removeItem('temp_access_until');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('payment_status');
    localStorage.removeItem('user_plan');
    
    // Then sign out from Supabase
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
    // Reset the flag after a delay
    setTimeout(() => {
      isForceSigningOut = false;
    }, 2000);
  }
}

// Handle email verification callback
export async function handleEmailVerificationCallback(url: string) {
  try {
    console.log('Processing verification URL:', url);
    
    // Extract hash parameters from URL
    const hashParams = new URLSearchParams(url.split('#')[1]);
    const accessToken = hashParams.get('access_token');
    const refreshToken = hashParams.get('refresh_token');
    
    console.log('Extracted tokens:', { 
      accessToken: accessToken ? 'present' : 'missing', 
      refreshToken: refreshToken ? 'present' : 'missing' 
    });
    
    if (!accessToken || !refreshToken) {
      throw new Error('Invalid verification URL - missing tokens');
    }
    
    // Set the session manually
    const { data, error } = await supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken
    });
    
    if (error) {
      console.error('Error setting session:', error);
      throw error;
    }
    
    console.log('Session set successfully, user:', data.user?.email);
    
    // Verify the session was set correctly
    const { data: sessionData } = await supabase.auth.getSession();
    console.log('Session verification:', { 
      hasSession: !!sessionData.session,
      email: sessionData.session?.user?.email,
      emailVerified: !!sessionData.session?.user?.email_confirmed_at
    });
    
    return { success: true, user: data.user };
  } catch (error) {
    console.error('Error handling email verification:', error);
    return { success: false, error };
  }
}

// Manual verification function for admin use
export async function manuallyVerifyUser(email: string) {
  try {
    const { data, error } = await supabase.rpc('manually_verify_user', {
      p_email: email,
      p_admin_notes: 'Manual verification via admin tool'
    });
    
    if (error) throw error;
    
    return { success: true, data };
  } catch (error) {
    console.error('Error manually verifying user:', error);
    return { success: false, error };
  }
}

export default {
  supabase,
  getCurrentUser,
  signUp,
  signIn,
  signOut,
  requestPasswordReset,
  hasCompletedPayment,
  hasTemporaryAccess,
  confirmPayment,
  forceSignOut,
  isEmailVerified,
  handleEmailVerificationCallback,
  manuallyVerifyUser
};

