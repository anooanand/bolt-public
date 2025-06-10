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

// FIXED: Add timeout wrapper for all Supabase calls
const withTimeout = <T>(promise: Promise<T>, timeoutMs: number = 3000): Promise<T> => {
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
      2000
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
      2000
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

export async function hasCompletedPayment() {
  try {
    const user = await getCurrentUser();
    if (!user) return false;

    return user.user_metadata?.payment_confirmed === true || 
           user.user_metadata?.signup_completed === true;
  } catch (error) {
    console.error('Error checking payment status:', error);
    return false;
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
            signup_completed: true
          }
        }
      }),
      5000
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

    const { data, error } = await withTimeout(
      supabase.auth.signInWithPassword({ email, password }),
      5000
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
      3000
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
      5000
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

    let user = await getCurrentUser();
    
    if (!user) {
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

    console.log("[DEBUG] Updating user metadata with payment confirmation for user:", user.email);

    const { data, error } = await withTimeout(
      supabase.auth.updateUser({
        data: {
          payment_confirmed: true,
          plan_type: planType,
          signup_completed: true,
          payment_date: new Date().toISOString(),
          subscription_status: 'active'
        }
      }),
      5000
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
        2000
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

