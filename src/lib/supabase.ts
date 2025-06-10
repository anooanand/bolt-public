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

// FIXED: Shorter timeout wrapper for faster responses
const withTimeout = <T>(promise: Promise<T>, timeoutMs: number = 1500): Promise<T> => {
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

    // FIXED: Much shorter timeout for faster response
    const { data: sessionData, error: sessionError } = await withTimeout(
      supabase.auth.getSession(),
      1000
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
      1000
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

// FIXED: Faster payment check with immediate fallback
export async function hasCompletedPayment() {
  try {
    // FIXED: Use direct session check instead of getCurrentUser for speed
    const { data: { session }, error } = await withTimeout(
      supabase.auth.getSession(),
      800
    );
    
    if (error || !session?.user) {
      console.log('[DEBUG] No session or error in hasCompletedPayment:', error);
      return false;
    }

    const user = session.user;
    const paymentConfirmed = user.user_metadata?.payment_confirmed === true;
    
    console.log('[DEBUG] Payment check for user:', user.email, 'payment_confirmed:', paymentConfirmed);
    
    // FIXED: Only return true if payment was actually confirmed
    return paymentConfirmed;
  } catch (error) {
    console.error('[DEBUG] Error checking payment status (timeout):', error);
    // FIXED: On timeout, assume no payment for faster flow
    return false;
  }
}

export async function signUp(email: string, password: string) {
  try {
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Supabase configuration is missing');
    }

    console.log("Attempting sign up for:", email);

    // FIXED: Shorter timeout for sign up
    const { data, error } = await withTimeout(
      supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            // FIXED: Explicitly set payment_confirmed to false
            payment_confirmed: false,
            subscription_status: 'pending',
            created_at: new Date().toISOString()
          }
        }
      }),
      3000
    );

    if (error) {
      console.error("Sign up failed:", error.message);
      throw new Error(error.message);
    }

    if (data.user) {
      console.log("Sign up successful:", email);
      localStorage.setItem('userEmail', email);
      return data;
    } else {
      throw new Error("Sign up failed: No user data returned");
    }
  } catch (error) {
    console.error("Sign up failed:", error);
    throw error;
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

    // FIXED: Shorter timeout for sign in
    const { data, error } = await withTimeout(
      supabase.auth.signInWithPassword({ email, password }),
      3000
    );

    if (error) {
      console.error("Sign in failed:", error.message);
      throw new Error(error.message);
    }

    if (data.user) {
      console.log("Sign in successful:", email);
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
    }

    const { error } = await withTimeout(
      supabase.auth.signOut(),
      2000
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
      3000
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

export async function confirmPayment(planType: string) {
  try {
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Supabase configuration is missing');
    }

    console.log("[DEBUG] Confirming payment for plan:", planType);

    // FIXED: Use session check instead of getCurrentUser for speed
    const { data: { session }, error: sessionError } = await withTimeout(
      supabase.auth.getSession(),
      1000
    );
    
    if (sessionError || !session?.user) {
      console.error("[DEBUG] No authenticated user found when confirming payment");
      const userEmail = localStorage.getItem('userEmail');
      if (userEmail) {
        console.log("[DEBUG] Using email from localStorage:", userEmail);
        return {
          success: false,
          error: "No authenticated user found",
          fallback: {
            email: userEmail,
            planType: planType,
            paymentDate: new Date().toISOString()
          }
        };
      }
      throw new Error("No authenticated user found");
    }

    const user = session.user;
    console.log("[DEBUG] Updating user metadata with payment confirmation for user:", user.email);

    const { data, error } = await withTimeout(
      supabase.auth.updateUser({
        data: {
          payment_confirmed: true,
          plan_type: planType,
          payment_date: new Date().toISOString(),
          subscription_status: 'active'
        }
      }),
      3000
    );

    if (error) {
      console.error("[DEBUG] Error updating user metadata:", error);
      throw error;
    }

    console.log("[DEBUG] Payment confirmation successful for user:", user.email, "plan:", planType);
    return data;
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
        1000
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

