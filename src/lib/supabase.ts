import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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

// Get current user
export async function getCurrentUser() {
  try {
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

// Sign up function
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

    // Set the complete session using the entire result object
    if (result.access_token && result.refresh_token) {
      await supabase.auth.setSession({
        access_token: result.access_token,
        refresh_token: result.refresh_token,
        expires_in: result.expires_in,
        token_type: result.token_type || 'bearer',
        user: result.user
      });
    }

    console.log("Sign up successful:", email);
    return result;
  } catch (error) {
    console.error("Sign up failed:", error);
    throw error;
  }
}

// Sign in function
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
    
    const result = await callAuthProxy('signin', { email, password });
    
    if (result.error) {
      console.error("Sign in failed:", result.error.message);
      throw new Error(result.error.message);
    }

    // Set the complete session using the entire result object
    if (result.access_token && result.refresh_token) {
      await supabase.auth.setSession({
        access_token: result.access_token,
        refresh_token: result.refresh_token,
        expires_in: result.expires_in,
        token_type: result.token_type || 'bearer',
        user: result.user
      });
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
      localStorage.removeItem('supabase.auth.token');
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

// Confirm payment function - Enhanced with better error handling and retry logic
export async function confirmPayment(planType: string) {
  try {
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Supabase configuration is missing');
    }

    console.log("[DEBUG] Confirming payment for plan:", planType);

    // FIXED: Add a retry mechanism for getting the current user
    let user = await getCurrentUser();
    let retryCount = 0;
    const maxRetries = 3;
    
    while (!user && retryCount < maxRetries) {
      console.log(`[DEBUG] No user found, retrying... (${retryCount + 1}/${maxRetries})`);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // FIXED: Try to refresh the session before getting the user again
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
      
      // FIXED: Try to use the email from localStorage as a fallback
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