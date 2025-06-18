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
        data: {
          payment_status: 'pending',
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
    
    // After successful signup, create a user profile manually
    // This is a fallback in case the database trigger doesn't work
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

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    
    // Clear payment-related data
    localStorage.removeItem('payment_status');
    localStorage.removeItem('user_plan');
    
    return { success: true };
  } catch (error) {
    console.error('Sign out error:', error);
    // Still clear local data even if API call fails
    localStorage.clear();
    return { success: true };
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

// Simplified payment status check with better error handling
export async function hasCompletedPayment(): Promise<boolean> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;
    
    // Check user metadata for payment status
    if (user.user_metadata?.payment_confirmed === true) {
      return true;
    }
    
    // Check database with timeout and error handling
    const timeoutPromise = new Promise<{data: null, error: Error}>((_, reject) => 
      setTimeout(() => reject(new Error('Payment check timeout')), 5000)
    );
    
    try {
      const dbPromise = supabase
        .from('user_profiles')
        .select('payment_verified, payment_status, temp_access_until')
        .eq('user_id', user.id)
        .single();
      
      const { data, error } = await Promise.race([dbPromise, timeoutPromise]) as any;
      
      if (error) {
        console.warn('Database query error:', error);
        
        // Try with id instead of user_id
        try {
          const { data: idData, error: idError } = await supabase
            .from('user_profiles')
            .select('payment_verified, payment_status, temp_access_until')
            .eq('id', user.id)
            .single();
            
          if (!idError && idData) {
            // Check for temporary access
            if (idData.temp_access_until) {
              const expiryDate = new Date(idData.temp_access_until);
              if (expiryDate > new Date()) {
                return true;
              }
            }
            
            return idData.payment_verified === true || idData.payment_status === 'verified';
          }
        } catch (idCheckError) {
          console.warn('ID-based profile check failed:', idCheckError);
        }
        
        // Fallback to localStorage if database query fails
        const paymentStatus = localStorage.getItem('payment_status');
        if (paymentStatus === 'paid' || paymentStatus === 'verified') {
          return true;
        }
        
        return false;
      }
      
      // Check for temporary access
      const tempAccessUntil = user.user_metadata?.temp_access_until || data?.temp_access_until;
      if (tempAccessUntil) {
        const expiryDate = new Date(tempAccessUntil);
        if (expiryDate > new Date()) {
          return true;
        }
      }
      
      return data?.payment_verified === true || data?.payment_status === 'verified';
    } catch (error) {
      console.warn('Payment check error:', error);
      
      // Fallback to localStorage if database query fails
      const paymentStatus = localStorage.getItem('payment_status');
      if (paymentStatus === 'paid' || paymentStatus === 'verified') {
        return true;
      }
      
      return false;
    }
  } catch (error) {
    console.error('Error checking payment status:', error);
    return false;
  }
}

export async function hasTemporaryAccess(): Promise<boolean> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;
    
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
      // First try with user_id
      let { data, error } = await supabase
        .from('user_profiles')
        .select('temp_access_until')
        .eq('user_id', user.id)
        .single();
      
      if (error) {
        // Try with id instead
        const result = await supabase
          .from('user_profiles')
          .select('temp_access_until')
          .eq('id', user.id)
          .single();
          
        data = result.data;
        error = result.error;
        
        if (error) {
          throw error;
        }
      }
      
      if (data?.temp_access_until) {
        const expiryDate = new Date(data.temp_access_until);
        if (expiryDate > new Date()) {
          return true;
        }
      }
    } catch (error) {
      console.warn('Error checking temporary access in database:', error);
    }
    
    // Check localStorage as fallback
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
      // First try with user_id
      let { error: profileError } = await supabase
        .from('user_profiles')
        .update({
          payment_verified: true,
          payment_status: 'verified',
          subscription_status: 'paid',
          subscription_plan: planType,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', data.user.id);
        
      if (profileError) {
        // Try with id instead
        await supabase
          .from('user_profiles')
          .update({
            payment_verified: true,
            payment_status: 'verified',
            subscription_status: 'paid',
            subscription_plan: planType,
            updated_at: new Date().toISOString()
          })
          .eq('id', data.user.id);
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

export async function forceSignOut() {
  try {
    await supabase.auth.signOut();
    localStorage.clear();
    return true;
  } catch (error) {
    console.error('Force sign out error:', error);
    localStorage.clear();
    return true;
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
  forceSignOut
};