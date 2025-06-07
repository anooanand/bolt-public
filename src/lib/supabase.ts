import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// FIXED: Configure the Supabase client with explicit storage options
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: localStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Helper function to call the auth proxy
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

// FIXED: Enhanced getCurrentUser function with better session handling
export async function getCurrentUser() {
  try {
    // First check if we have a session
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError) {
      console.error('Error getting session:', sessionError);
      return null;
    }
    
    // If no session, return null early
    if (!sessionData.session) {
      console.log('No active session found');
      return null;
    }
    
    // If we have a session, get the user
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

// Check if user has completed payment
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

// FIXED: Enhanced sign up function with better session handling
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

    // FIXED: Improved session handling
    if (result.access_token && result.refresh_token) {
      try {
        const sessionResult = await supabase.auth.setSession({
          access_token: result.access_token,
          refresh_token: result.refresh_token
        });
        
        if (sessionResult.error) {
          console.error("Error setting session:", sessionResult.error);
          throw sessionResult.error;
        }
        
        console.log("Session set successfully after signup");
      } catch (sessionError) {
        console.error("Failed to set session after signup:", sessionError);
        throw sessionError;
      }
    }

    console.log("Sign up successful:", email);
    return result;
  } catch (error) {
    console.error("Sign up failed:", error);
    throw error;
  }
}

// FIXED: Enhanced sign in function with better session handling
export async function signIn(email: string, password: string) {
  try {
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Supabase configuration is missing');
    }
    
    console.log("Attempting sign in for:", email);
    
    // Store email in localStorage for later use
    if (typeof window !== 'undefined') {
      localStorage.setItem('userEmail', email);
    }
    
    // FIXED: Try direct Supabase authentication first
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (!error && data.user) {
        console.log("Direct Supabase sign in successful:", email);
        return data;
      }
      
      // If direct auth fails, fall back to proxy
      console.log("Direct auth failed, falling back to proxy");
    } catch (directAuthError) {
      console.log("Direct auth error, falling back to proxy:", directAuthError);
    }
    
    // Fall back to auth proxy
    const result = await callAuthProxy('signin', { email, password });
    
    if (result.error) {
      console.error("Sign in failed:", result.error.message);
      throw new Error(result.error.message);
    }

    // FIXED: Improved session handling
    if (result.access_token && result.refresh_token) {
      try {
        const sessionResult = await supabase.auth.setSession({
          access_token: result.access_token,
          refresh_token: result.refresh_token
        });
        
        if (sessionResult.error) {
          console.error("Error setting session:", sessionResult.error);
          throw sessionResult.error;
        }
        
        console.log("Session set successfully after signin");
      } catch (sessionError) {
        console.error("Failed to set session after signin:", sessionError);
        throw sessionError;
      }
    }

    console.log("Sign in successful:", email);
    return result;
  } catch (error) {
    console.error("Sign in failed:", error);
    throw error;
  }
}

// Sign out function
export async function signOut() {
  try {
    console.log("Attempting sign out");
    
    // Clear local storage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('userEmail');
      // FIXED: Don't manually remove supabase.auth.token, let Supabase handle it
    }
    
    // Sign out from Supabase
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

// Request password reset
export async function requestPasswordReset(email: string) {
  try {
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Supabase configuration is missing');
    }
    
    console.log("Requesting password reset for:", email);
    
    // FIXED: Try direct Supabase password reset first
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email);
      
      if (!error) {
        console.log("Direct Supabase password reset successful:", email);
        return { success: true };
      }
      
      // If direct reset fails, fall back to proxy
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

// FIXED: Enhanced confirm payment function with better session handling
export async function confirmPayment(planType: string) {
  try {
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Supabase configuration is missing');
    }

    console.log("[DEBUG] Confirming payment for plan:", planType);

    // FIXED: First ensure we have a valid session
    const { data: sessionData } = await supabase.auth.getSession();
    
    if (!sessionData.session) {
      console.log("[DEBUG] No active session found, attempting to refresh");
      const { data: refreshData, error: refreshError } = await supabase.auth.refreshSession();
      
      if (refreshError) {
        console.error("[DEBUG] Failed to refresh session:", refreshError);
      }
    }

    // FIXED: Get user with retry mechanism
    let user = await getCurrentUser();
    let retryCount = 0;
    const maxRetries = 3;
    
    while (!user && retryCount < maxRetries) {
      console.log(`[DEBUG] No user found, retrying... (${retryCount + 1}/${maxRetries})`);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Try to refresh the session before getting the user again
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
      
      // Try to use the email from localStorage as a fallback
      const userEmail = localStorage.getItem('userEmail');
      if (userEmail) {
        console.log("[DEBUG] Attempting to create payment record with email from localStorage:", userEmail);
        
        // Create a payment record in a separate table that can be linked to the user later
        // This is a fallback mechanism and would require additional server-side logic
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

    console.log("[DEBUG] Session refreshed successfully");

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

