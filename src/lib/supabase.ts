import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: localStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

async function callAuthProxy(action: string, data: any) {
  try {
    const response = await fetch('/.netlify/functions/auth-proxy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action, ...data }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Auth proxy error:', error);
    throw error;
  }
}

export async function getCurrentUser() {
  try {
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError) {
      console.error('Error getting session:', sessionError);
      return null;
    }

    if (!sessionData.session) {
      console.log('No active session found');
      return null;
    }

    const { data: { user }, error } = await supabase.auth.getUser();

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

    const result = await callAuthProxy('signup', { email, password });

    if (result.error) {
      console.error("Sign up failed:", result.error.message);
      throw new Error(result.error.message);
    }

    if (result.access_token && result.refresh_token) {
      const sessionResult = await supabase.auth.setSession({
        access_token: result.access_token,
        refresh_token: result.refresh_token
      });

      if (sessionResult.error) {
        console.error("Error setting session:", sessionResult.error);
        throw sessionResult.error;
      }

      console.log("Session set successfully after signup");
    }

    console.log("Sign up successful:", email);
    return result;
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

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      if (!error && data.user) {
        console.log("Direct Supabase sign in successful:", email);
        return data;
      }

      console.log("Direct auth failed, falling back to proxy");
    } catch (directAuthError) {
      console.log("Direct auth error, falling back to proxy:", directAuthError);
    }

    const result = await callAuthProxy('signin', { email, password });

    if (result.error) {
      console.error("Sign in failed:", result.error.message);
      throw new Error(result.error.message);
    }

    if (result.access_token && result.refresh_token) {
      const sessionResult = await supabase.auth.setSession({
        access_token: result.access_token,
        refresh_token: result.refresh_token
      });

      if (sessionResult.error) {
        console.error("Error setting session:", sessionResult.error);
        throw sessionResult.error;
      }

      console.log("Session set successfully after signin");
    }

    console.log("Sign in successful:", email);
    return result;
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

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Sign out failed:", error);
      throw error;
    }

    console.log("Sign out successful");
    return { success: true };
  } catch (error) {
    console.error("Sign out failed:", error);
    throw error;
  }
}

export async function requestPasswordReset(email: string) {
  try {
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Supabase configuration is missing');
    }

    console.log("Requesting password reset for:", email);

    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email);
      if (!error) {
        console.log("Direct Supabase password reset successful:", email);
        return { success: true };
      }

      console.log("Direct password reset failed, falling back to proxy");
    } catch (directResetError) {
      console.log("Direct password reset error, falling back to proxy:", directResetError);
    }

    const result = await callAuthProxy('reset-password', { email });

    if (result.error) {
      console.error("Password reset request failed:", result.error.message);
      throw new Error(result.error.message);
    }

    console.log("Password reset request successful:", email);
    return result;
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

    const { data: sessionData } = await supabase.auth.getSession();

    if (!sessionData.session) {
      console.log("[DEBUG] No active session found, attempting to refresh");
      const { data: refreshData, error: refreshError } = await supabase.auth.refreshSession();
      if (refreshError) {
        console.error("[DEBUG] Failed to refresh session:", refreshError);
      }
    }

    let user = await getCurrentUser();
    let retryCount = 0;
    const maxRetries = 3;

    while (!user && retryCount < maxRetries) {
      console.log(`[DEBUG] No user found, retrying... (${retryCount + 1}/${maxRetries})`);
      await new Promise(resolve => setTimeout(resolve, 1000));

      try {
        const { data: refreshData, error: refreshError } = await supabase.auth.refreshSession();
        if (!refreshError) {
          console.log("[DEBUG] Session refreshed successfully during retry");
        }
      } catch (refreshErr) {
        console.error("[DEBUG] Error refreshing session during retry:", refreshErr);
      }

      user = await getCurrentUser();
      retryCount++;
    }

    if (!user) {
      console.error("[DEBUG] No authenticated user found when confirming payment after retries");
      const userEmail = localStorage.getItem('userEmail');
      if (userEmail) {
        console.log("[DEBUG] Attempting to create payment record with email from localStorage:", userEmail);
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

    const { data, error } = await supabase.auth.updateUser({
      data: {
        payment_confirmed: true,
        plan_type: planType,
        signup_completed: true,
        payment_date: new Date().toISOString(),
        subscription_status: 'active'
      }
    });

    if (error) {
      console.error("[DEBUG] Error updating user metadata:", error);
      throw error;
    }

    console.log("[DEBUG] User metadata updated, forcing session refresh");

    const { data: refreshData, error: refreshError } = await supabase.auth.refreshSession();

    if (refreshError) {
      console.error("[DEBUG] Error refreshing session:", refreshError);
      throw refreshError;
    }

    const refreshedUser = await getCurrentUser();

    if (!refreshedUser?.user_metadata?.payment_confirmed) {
      console.warn("[DEBUG] Payment confirmation not reflected in refreshed user metadata");
      await new Promise(resolve => setTimeout(resolve, 1000));
      const { data: retryData, error: retryError } = await supabase.auth.refreshSession();
      if (retryError) console.error("[DEBUG] Error in retry session refresh:", retryError);
      const retryUser = await getCurrentUser();
      if (!retryUser?.user_metadata?.payment_confirmed) {
        console.error("[DEBUG] Payment confirmation still not reflected after retry");
      } else {
        console.log("[DEBUG] Payment confirmation verified in retry user metadata");
      }
    } else {
      console.log("[DEBUG] Payment confirmation verified in refreshed user metadata");
    }

    console.log("[DEBUG] Payment confirmation successful for user:", user.email, "plan:", planType);
    return data;
  } catch (error) {
    console.error("[DEBUG] Error confirming payment:", error);
    throw error;
  }
}

// ✅ NEW: Force sign out and clean up
export async function forceSignOut() {
  try {
    console.log("[DEBUG] Force signing out all sessions");

    if (typeof window !== 'undefined') {
      localStorage.removeItem('userEmail');
      localStorage.removeItem('supabase.auth.token');

      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('supabase.') || key.includes('auth')) {
          localStorage.removeItem(key);
        }
      });
    }

    const { error } = await supabase.auth.signOut({ scope: 'global' });

    if (error) {
      console.error("[DEBUG] Force sign out failed:", error);
      throw error;
    }

    console.log("[DEBUG] Force sign out successful");

    if (typeof window !== 'undefined') {
      window.location.reload();
    }

    return { success: true };
  } catch (error) {
    console.error("[DEBUG] Force sign out exception:", error);
    throw error;
  }
}
