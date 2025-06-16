import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase environment variables - using fallback mode');
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co', 
  supabaseAnonKey || 'placeholder-key', 
  {
    auth: {
      storage: localStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  }
);

// FIXED: Much shorter timeout wrapper
const withTimeout = <T>(promise: Promise<T>, timeoutMs: number = 1000): Promise<T> => {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => 
      setTimeout(() => reject(new Error('Operation timed out')), timeoutMs)
    )
  ]);
};

export async function getCurrentUser() {
  try {
    if (!supabaseUrl || !supabaseAnonKey) {
      console.log('No Supabase config - returning null user');
      return null;
    }

    const { data: sessionData, error: sessionError } = await withTimeout(
      supabase.auth.getSession(),
      800
    );
    
    if (sessionError) {
      console.error('Error getting session:', sessionError);
      return null;
    }

    if (!sessionData.session) {
      console.log('No active session found');
      return null;
    }

    const { data: { user }, error } = await withTimeout(
      supabase.auth.getUser(),
      800
    );

    if (error) {
      console.error('Error getting current user:', error);
      return null;
    }

    return user;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

// Check if user has temporary access
export async function hasTemporaryAccess(): Promise<boolean> {
  const tempAccessUntil = localStorage.getItem('temp_access_until');
  if (!tempAccessUntil) return false;
  
  const expiryDate = new Date(tempAccessUntil);
  return expiryDate > new Date();
}

// Check if user has completed payment
export async function hasCompletedPayment(): Promise<boolean> {
  try {
    // First check if user has temporary access
    const hasTemp = await hasTemporaryAccess();
    if (hasTemp) {
      console.log('[DEBUG] User has temporary access');
      return true;
    }
    
    // FIXED: Check local storage first for immediate response
    const localPaymentStatus = localStorage.getItem('payment_confirmed');
    const localUserEmail = localStorage.getItem('userEmail');
    
    if (localPaymentStatus === 'true' && localUserEmail) {
      console.log('[DEBUG] Local payment status: confirmed for', localUserEmail);
      return true;
    }

    // FIXED: Only check Supabase if local storage doesn't have payment info
    const { data: { session }, error } = await withTimeout(
      supabase.auth.getSession(),
      600
    );
    
    if (error || !session?.user) {
      console.log('[DEBUG] No session or error in hasCompletedPayment:', error);
      return false;
    }

    const user = session.user;
    const paymentConfirmed = user.user_metadata?.payment_confirmed === true;
    
    console.log('[DEBUG] Supabase payment check for user:', user.email, 'payment_confirmed:', paymentConfirmed);
    
    // FIXED: Cache the result in localStorage for faster future checks
    if (paymentConfirmed) {
      localStorage.setItem('payment_confirmed', 'true');
      localStorage.setItem('userEmail', user.email || '');
    }
    
    return paymentConfirmed;
  } catch (error) {
    console.error('[DEBUG] Error checking payment status (using local fallback):', error);
    
    // FIXED: Fallback to local storage if Supabase fails
    const localPaymentStatus = localStorage.getItem('payment_confirmed');
    const localUserEmail = localStorage.getItem('userEmail');
    
    // Check temporary access as a last resort
    const hasTemp = await hasTemporaryAccess();
    if (hasTemp) {
      return true;
    }
    
    return localPaymentStatus === 'true' && !!localUserEmail;
  }
}

export async function signUp(email: string, password: string) {
  try {
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Supabase configuration is missing');
    }

    console.log("Attempting sign up for:", email);

    const { data, error } = await withTimeout(
      supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            payment_confirmed: false,
            subscription_status: 'pending',
            created_at: new Date().toISOString()
          }
        }
      }),
      2500
    );

    if (error) {
      console.error("Sign up failed:", error.message);
      throw error;
    }

    if (data.user) {
      console.log("Sign up successful:", email);
      localStorage.setItem('userEmail', email);
      // FIXED: Explicitly set payment as not confirmed for new users
      localStorage.setItem('payment_confirmed', 'false');
      
      // Set temporary access flag (24 hours)
      localStorage.setItem('temp_access_until', new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString());
      
      return { data, success: true, user: data.user };
    } else {
      throw new Error("Sign up failed: No user data returned");
    }
  } catch (error) {
    console.error("Sign up failed:", error);
    return { error, success: false };
  }
}

export async function signIn(email: string, password: string) {
  try {
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Supabase configuration is missing');
    }

    console.log("Attempting sign in for:", email);

    if (typeof window !== 'undefined') {
      localStorage.setItem('userEmail', email);
    }

    const { data, error } = await withTimeout(
      supabase.auth.signInWithPassword({ email, password }),
      2500
    );

    if (error) {
      console.error("Sign in failed:", error.message);
      return { error };
    }

    if (data.user) {
      console.log("Sign in successful:", email);
      
      // FIXED: Check and cache payment status on sign in
      const paymentConfirmed = data.user.user_metadata?.payment_confirmed === true;
      localStorage.setItem('payment_confirmed', paymentConfirmed ? 'true' : 'false');
      
      // Check for temporary access
      const tempAccessUntil = data.user.user_metadata?.temp_access_until;
      if (tempAccessUntil) {
        localStorage.setItem('temp_access_until', tempAccessUntil);
      }
      
      return data;
    } else {
      throw new Error("Sign in failed: No user data returned");
    }
  } catch (error) {
    console.error("Sign in failed:", error);
    throw error;
  }
}

export async function signOut() {
  try {
    console.log("Attempting sign out");

    if (typeof window !== 'undefined') {
      localStorage.removeItem('userEmail');
      localStorage.removeItem('payment_confirmed');
      localStorage.removeItem('temp_access_until');
    }

    const { error } = await withTimeout(
      supabase.auth.signOut(),
      1500
    );

    if (error) {
      console.error("Sign out failed:", error);
      throw error;
    }

    console.log("Sign out successful");
    return { success: true };
  } catch (error) {
    console.error("Sign out failed:", error);
    // Don't throw on sign out failure - just clear local state
    if (typeof window !== 'undefined') {
      localStorage.clear();
    }
    return { success: true };
  }
}

export async function requestPasswordReset(email: string) {
  try {
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Supabase configuration is missing');
    }

    console.log("Requesting password reset for:", email);

    const { data, error } = await withTimeout(
      supabase.auth.resetPasswordForEmail(email),
      2500
    );
    
    if (error) {
      console.error("Password reset request failed:", error.message);
      throw new Error(error.message);
    }

    console.log("Password reset request successful:", email);
    return { success: true };
  } catch (error) {
    console.error("Password reset request failed:", error);
    throw error;
  }
}

// FIXED: Local storage based payment confirmation (no Supabase API calls)
export async function confirmPayment(planType: string) {
  try {
    console.log("[DEBUG] Confirming payment for plan:", planType);

    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
      throw new Error("No user email found in localStorage");
    }

    // FIXED: Set payment confirmation in localStorage immediately
    localStorage.setItem('payment_confirmed', 'true');
    localStorage.setItem('payment_plan', planType);
    localStorage.setItem('payment_date', new Date().toISOString());
    localStorage.setItem('subscription_status', 'active');
    
    // Set temporary access flag (24 hours)
    localStorage.setItem('temp_access_until', new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString());

    console.log("[DEBUG] Payment confirmed locally for user:", userEmail, "plan:", planType);

    // FIXED: Try to sync with Supabase in background (non-blocking)
    try {
      const { data: { session }, error: sessionError } = await withTimeout(
        supabase.auth.getSession(),
        500
      );
      
      if (!sessionError && session?.user) {
        console.log("[DEBUG] Attempting to sync payment with Supabase...");
        
        // FIXED: Non-blocking Supabase update (fire and forget)
        supabase.auth.updateUser({
          data: {
            payment_confirmed: true,
            plan_type: planType,
            payment_date: new Date().toISOString(),
            subscription_status: 'active',
            temp_access_until: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
          }
        }).then(() => {
          console.log("[DEBUG] Payment synced with Supabase successfully");
        }).catch((error) => {
          console.warn("[DEBUG] Failed to sync payment with Supabase (non-critical):", error);
        });
      } else {
        console.warn("[DEBUG] No session for Supabase sync, using local storage only");
      }
    } catch (syncError) {
      console.warn("[DEBUG] Supabase sync failed (non-critical):", syncError);
    }

    return {
      success: true,
      user: { email: userEmail },
      plan: planType,
      paymentDate: new Date().toISOString()
    };
  } catch (error) {
    console.error("[DEBUG] Error confirming payment:", error);
    throw error;
  }
}

export async function forceSignOut() {
  try {
    console.log("[DEBUG] Force signing out all sessions");

    if (typeof window !== 'undefined') {
      // Clear all localStorage
      localStorage.clear();
    }

    try {
      await withTimeout(
        supabase.auth.signOut({ scope: 'global' }),
        800
      );
    } catch (signOutError) {
      console.warn("[DEBUG] Sign out API call failed, but continuing with local cleanup");
    }

    console.log("[DEBUG] Force sign out completed");

    if (typeof window !== 'undefined') {
      window.location.reload();
    }

    return { success: true };
  } catch (error) {
    console.error("[DEBUG] Force sign out exception:", error);
    // Always succeed for force sign out
    if (typeof window !== 'undefined') {
      localStorage.clear();
      window.location.reload();
    }
    return { success: true };
  }
}