import { createClient } from '@supabase/supabase-js';

// Environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Development-only logging
if (import.meta.env.DEV) {
  console.log("Environment variables check:");
  console.log("SUPABASE_URL available:", !!supabaseUrl);
  console.log("SUPABASE_ANON_KEY available:", !!supabaseAnonKey);
}

// Provide fallback values for build process
const url = supabaseUrl || 'https://placeholder-url.supabase.co';
const key = supabaseAnonKey || 'placeholder-key';

export const supabase = createClient(url, key);

// Auth proxy function for Netlify functions
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

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Auth proxy error:', error);
    throw error;
  }
}

// Sign up function
export async function signUp(email: string, password: string) {
  try {
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Supabase configuration is missing');
    }
    
    console.log("Attempting signup for:", email);
    
    // Store email in localStorage for later use
    if (typeof window !== 'undefined') {
      localStorage.setItem('userEmail', email);
    }
    
    const result = await callAuthProxy('signup', { email, password });
    
    if (result.error) {
      throw new Error(result.error.message);
    }

    console.log("Signup successful:", result);
    return result;
  } catch (error) {
    console.error("Signup failed:", error);
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
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Supabase configuration is missing');
    }
    
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    
    // Clear stored user data
    if (typeof window !== 'undefined') {
      localStorage.removeItem('userEmail');
    }
    
    return { success: true };
  } catch (error) {
    console.error("Sign out failed:", error);
    throw error;
  }
}

// Get current user
export async function getCurrentUser() {
  try {
    if (!supabaseUrl || !supabaseAnonKey) {
      return null;
    }
    
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error) {
      // Check if the error is due to missing auth session
      if (error.message === 'Auth session missing!' || error.name === 'AuthSessionMissingError') {
        console.info("No authenticated user session found"); // Expected state, not an error
        return null;
      }
      // Log other errors as actual errors
      console.error("Unexpected error getting current user:", error);
      return null;
    }

    return user;
  } catch (error) {
    // Only log as error if it's an unexpected error
    if (error instanceof Error && 
        error.message !== 'Auth session missing!' && 
        error.name !== 'AuthSessionMissingError') {
      console.error("Error in getCurrentUser:", error);
    } else {
      console.info("No authenticated user session found");
    }
    return null;
  }
}

// Confirm payment function - Enhanced with better error handling
export async function confirmPayment(planType: string) {
  try {
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Supabase configuration is missing');
    }

    console.log("[DEBUG] Confirming payment for plan:", planType);

    const user = await getCurrentUser();
    if (!user) {
      console.error("[DEBUG] No authenticated user found when confirming payment");
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

// Check if user has completed payment - Enhanced function
export async function hasCompletedPayment() {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      console.log("No user found for payment check");
      return false;
    }

    // Check user metadata for payment confirmation
    const paymentConfirmed = user.user_metadata?.payment_confirmed || 
                           user.user_metadata?.signup_completed ||
                           false;
    
    const planType = user.user_metadata?.plan_type || null;
    
    console.log("Payment status check for user:", user.email, {
      paymentConfirmed, 
      planType,
      subscriptionStatus: user.user_metadata?.subscription_status
    });

    return paymentConfirmed;
  } catch (error) {
    console.error("Error checking payment status:", error);
    return false;
  }
}

// Check payment status function - Enhanced
export async function checkPaymentStatus(userEmail: string | null = null) {
  try {
    const user = await getCurrentUser();
    
    if (!user && !userEmail) {
      return { hasPayment: false, planType: null };
    }

    // Check user metadata for payment confirmation
    const paymentConfirmed = user?.user_metadata?.payment_confirmed || 
                           user?.user_metadata?.signup_completed ||
                           false;
    
    const planType = user?.user_metadata?.plan_type || null;
    
    console.log("Payment status check:", { 
      paymentConfirmed, 
      planType,
      userEmail: user?.email || userEmail 
    });

    return {
      hasPayment: paymentConfirmed,
      planType: planType,
      subscriptionStatus: user?.user_metadata?.subscription_status || null,
      paymentDate: user?.user_metadata?.payment_date || null
    };
  } catch (error) {
    console.error("Error checking payment status:", error);
    return { hasPayment: false, planType: null };
  }
}

// Create or update user payment record
export async function createPaymentRecord(planType: string, amount: number | null = null) {
  try {
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Supabase configuration is missing');
    }
    
    const user = await getCurrentUser();
    if (!user) {
      throw new Error("No authenticated user found");
    }

    const paymentData: any = {
      payment_confirmed: true,
      plan_type: planType,
      signup_completed: true,
      payment_date: new Date().toISOString(),
      subscription_status: 'active'
    };

    if (amount) {
      paymentData.payment_amount = amount;
    }

    const { data, error } = await supabase.auth.updateUser({
      data: paymentData
    });

    if (error) {
      console.error("Error creating payment record:", error);
      throw error;
    }

    console.log("Payment record created successfully:", data);
    return data;
  } catch (error) {
    console.error("Error creating payment record:", error);
    throw error;
  }
}

// Get user by email function
export async function getUserByEmail(email: string) {
  try {
    if (!supabaseUrl || !supabaseAnonKey) {
      return null;
    }
    
    const user = await getCurrentUser();
    
    if (user && user.email === email) {
      return user;
    }
    
    return null;
  } catch (error) {
    console.error("Error getting user by email:", error);
    return null;
  }
}

// Initialize auth state listener
export function onAuthStateChange(callback: (event: string, session: any) => void) {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase configuration is missing');
    return () => {}; // Return no-op cleanup function
  }
  
  return supabase.auth.onAuthStateChange((event, session) => {
    console.log("Auth state change:", event, session?.user?.email || 'no user');
    callback(event, session);
  });
}

// Reset password function
export async function resetPassword(email: string) {
  try {
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Supabase configuration is missing');
    }
    
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    
    if (error) throw error;
    
    return { success: true };
  } catch (error) {
    console.error("Password reset failed:", error);
    throw error;
  }
}

// Update password function
export async function updatePassword(newPassword: string) {
  try {
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Supabase configuration is missing');
    }
    
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });
    
    if (error) throw error;
    
    return { success: true };
  } catch (error) {
    console.error("Password update failed:", error);
    throw error;
  }
}

// Request password reset function
export async function requestPasswordReset(email: string) {
  try {
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Supabase configuration is missing');
    }
    
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    
    if (error) throw error;
    
    return { success: true };
  } catch (error) {
    console.error("Password reset request failed:", error);
    throw error;
  }
}

// Export the supabase client for direct use if needed
export default supabase;

