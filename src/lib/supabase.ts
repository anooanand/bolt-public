import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Ensure that the environment variables are defined
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL and Anon Key are required!');
}

// Create and export the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to check if email is verified
export async function isEmailVerified(user?: any): Promise<boolean> {
  try {
    // If user is provided, check directly
    if (user) {
      return user?.email_confirmed_at !== undefined && user?.email_confirmed_at !== null;
    }
    
    // Otherwise, get the current user and check
    const { data: { user: currentUser } } = await supabase.auth.getUser();
    if (!currentUser) {
      return false;
    }
    
    // Check email confirmation from auth
    if (currentUser.email_confirmed_at) {
      return true;
    }
    
    // Fallback: Check from user_access_status
    try {
      const { data, error } = await supabase
        .from('user_access_status')
        .select('email_verified')
        .eq('email', currentUser.email)
        .single();
        
      if (!error && data && data.email_verified) {
        return true;
      }
    } catch (error) {
      console.warn('Error checking email verification from user_access_status:', error);
    }
    
    return false;
  } catch (error) {
    console.error('Error in isEmailVerified:', error);
    return false;
  }
}

// FIXED: Updated function to properly check user access from database
export async function hasAnyAccess(userId: string): Promise<boolean> {
  try {
    // Query the user_access_status table to check payment verification
    const { data, error } = await supabase
      .from('user_access_status')
      .select('payment_verified, has_access, temp_access_until, manual_override')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error checking user access:', error);
      return false;
    }

    if (!data) {
      return false;
    }

    // Check if user has permanent access (payment verified or manual override)
    if (data.payment_verified || data.manual_override || data.has_access) {
      return true;
    }

    // Check if user has valid temporary access
    if (data.temp_access_until) {
      const tempAccessDate = new Date(data.temp_access_until);
      const now = new Date();
      return tempAccessDate > now;
    }

    return false;
  } catch (error) {
    console.error('Error in hasAnyAccess:', error);
    return false;
  }
}

// FIXED: New function to get detailed user access status
export async function getUserAccessStatus(userId: string) {
  try {
    const { data, error } = await supabase
      .from('user_access_status')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error getting user access status:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in getUserAccessStatus:', error);
    return null;
  }
}

// IMPROVED: Enhanced payment completion check
export async function hasCompletedPayment(): Promise<boolean> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return false;
    }

    // Check user_profiles table first
    const { data: profile, error: profileError } = await supabase
      .from('user_profiles')
      .select('payment_verified, payment_status, subscription_status, manual_override, temp_access_until')
      .eq('email', user.email)
      .single();

    if (!profileError && profile) {
      // Check multiple indicators of payment completion
      const hasVerifiedPayment = profile.payment_verified === true;
      const hasVerifiedStatus = profile.payment_status === 'verified';
      const hasActiveSubscription = profile.subscription_status === 'active';
      const hasManualOverride = profile.manual_override === true;
      
      // Check temporary access
      const hasTempAccess = profile.temp_access_until && 
        new Date(profile.temp_access_until) > new Date();
      
      if (hasVerifiedPayment || hasVerifiedStatus || hasActiveSubscription || 
          hasManualOverride || hasTempAccess) {
        return true;
      }
    }

    // Fallback: Check user_access_status
    const { data: accessStatus, error: accessError } = await supabase
      .from('user_access_status')
      .select('payment_verified, has_access, temp_access_until')
      .eq('email', user.email)
      .single();

    if (!accessError && accessStatus) {
      const hasAccessViaStatus = accessStatus.has_access || 
        accessStatus.payment_verified ||
        (accessStatus.temp_access_until && new Date(accessStatus.temp_access_until) > new Date());
      
      if (hasAccessViaStatus) {
        return true;
      }
    }

    // Final fallback: Check localStorage for temporary access
    try {
      const paymentDate = localStorage.getItem('payment_date');
      const paymentPlan = localStorage.getItem('payment_plan');
      
      if (paymentDate && paymentPlan) {
        const paymentTime = new Date(paymentDate).getTime();
        const now = Date.now();
        const hoursSincePayment = (now - paymentTime) / (1000 * 60 * 60);
        
        // 24-hour temporary access
        return hoursSincePayment < 24;
      }
    } catch (error) {
      console.warn('Error checking temporary access:', error);
    }

    return false;
  } catch (error) {
    console.error('Error in hasCompletedPayment:', error);
    return false;
  }
}

// IMPROVED: Enhanced temporary access check
export async function hasTemporaryAccess(): Promise<boolean> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return false;
    }

    // Check database for temporary access
    const { data: profile, error: profileError } = await supabase
      .from('user_profiles')
      .select('temp_access_until')
      .eq('email', user.email)
      .single();

    if (!profileError && profile?.temp_access_until) {
      const tempAccessDate = new Date(profile.temp_access_until);
      const now = new Date();
      if (tempAccessDate > now) {
        return true;
      }
    }

    // Check localStorage for temporary access
    try {
      const paymentDate = localStorage.getItem('payment_date');
      const paymentPlan = localStorage.getItem('payment_plan');
      
      if (paymentDate && paymentPlan) {
        const paymentTime = new Date(paymentDate).getTime();
        const now = Date.now();
        const hoursSincePayment = (now - paymentTime) / (1000 * 60 * 60);
        
        // 24-hour temporary access
        return hoursSincePayment < 24;
      }
    } catch (error) {
      console.warn('Error checking localStorage temporary access:', error);
    }

    return false;
  } catch (error) {
    console.error('Error in hasTemporaryAccess:', error);
    return false;
  }
}

// IMPROVED: Sign in function with better error handling
export async function signIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Sign in error:', error);
      return { user: null, error };
    }

    if (!data.user) {
      return { user: null, error: { message: 'No user data returned' } };
    }

    console.log('Sign in successful for:', data.user.email);
    return { user: data.user, error: null };
  } catch (error) {
    console.error('Unexpected sign in error:', error);
    return { user: null, error };
  }
}

// IMPROVED: Password reset function
export async function requestPasswordReset(email: string) {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      console.error('Password reset error:', error);
      return { success: false, error };
    }

    return { success: true, error: null };
  } catch (error) {
    console.error('Unexpected password reset error:', error);
    return { success: false, error };
  }
}

// Export default for compatibility
export default supabase;