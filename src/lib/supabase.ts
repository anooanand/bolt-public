// src/lib/supabase.ts - Fixed version without admin API calls
import { createClient } from '@supabase/supabase-js';

// Get environment variables with fallbacks for local development
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim() || 'https://zrzicouoioyqptfplnkg.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim() || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpyemljb3VvaW95cXB0ZnBsbmtnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg2ODg0NDgsImV4cCI6MjA2NDI2NDQ0OH0.ISq_Zdw8XUlGkeSlAXAAZukP2vDBkpPSvyYP7oQqr9s';

// Create Supabase client with improved configuration
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    storageKey: 'bolt_auth_token_v2' // Updated storage key to avoid conflicts
  },
  global: {
    headers: { 
      'x-application-name': 'bolt-writing-assistant',
      'x-client-version': '2.0.0' // Add version tracking
    }
  },
  realtime: {
    timeout: 60000
  }
});

// Enhanced error types
export type AuthError = {
  message: string;
  code?: string;
  status?: number;
};

// Completely redesigned signup function with robust error handling - FIXED VERSION WITHOUT ADMIN API
export async function signUp(email: string, password: string) {
  try {
    console.log("Starting enhanced signup process for:", email);
    
    // Attempt signup directly - we'll handle the "user exists" error properly
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin + '/auth/callback',
        data: {
          email_confirmed: false, // Changed to false to ensure proper confirmation flow
          payment_confirmed: false,
          signup_completed: false,
          signup_date: new Date().toISOString(),
          last_login_attempt: new Date().toISOString()
        }
      }
    });

    if (error) {
      console.error("Signup error:", error);
      
      // Provide user-friendly error messages
      if (error.message.includes("already registered") || error.message.includes("already exists") || error.status === 422) {
        return { 
          user: null, 
          session: null, 
          error: { 
            message: "This email is already registered. Please sign in instead.",
            code: error.code || "user_exists",
            status: error.status || 409
          }
        };
      }
      
      // Handle other specific error cases
      if (error.message.includes("password")) {
        return { 
          user: null, 
          session: null, 
          error: { 
            message: "Password must be at least 6 characters and include a mix of letters and numbers.",
            code: error.code,
            status: error.status
          }
        };
      }
      
      // Generic error fallback
      return { 
        user: null, 
        session: null, 
        error: { 
          message: error.message || "Failed to create account. Please try again.",
          code: error.code,
          status: error.status
        }
      };
    }

    console.log("Signup response:", data);
    
    // Handle email confirmation requirement
    if (data?.user && !data.session) {
      console.log("Email confirmation required or session not established");
      
      // Store partial signup data for later use
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('partial_signup_email', email);
        localStorage.setItem('partial_signup_timestamp', new Date().toISOString());
      }
      
      return { 
        user: data.user, 
        session: null, 
        emailConfirmationRequired: true,
        message: "Please check your email to confirm your account."
      };
    }
    
    // If we have both user and session, signup was successful
    if (data?.user && data.session) {
      console.log("User created and signed in successfully");
      
      // Store user data
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userId', data.user.id);
        localStorage.setItem('redirect_after_signup', 'pricing');
      }
      
      return data;
    }
    
    // Fallback for unexpected cases
    return { 
      user: data?.user || null, 
      session: data?.session || null,
      partialSuccess: true,
      message: "Account created but additional steps may be required."
    };

  } catch (err: any) {
    console.error("Signup process error:", err);
    
    // Provide a user-friendly error message
    return { 
      user: null, 
      session: null, 
      error: { 
        message: "An unexpected error occurred. Please try again later.",
        originalError: err.message
      }
    };
  }
}

// Enhanced sign-in function with better error handling and session management
export async function signIn(email: string, password: string) {
  try {
    console.log("Attempting enhanced sign in for:", email);
    
    // Track login attempt
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('last_login_attempt', new Date().toISOString());
    }
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      console.error("Sign in error:", error);
      
      // Provide user-friendly error messages
      if (error.message.includes("Invalid login")) {
        return { 
          user: null, 
          session: null, 
          error: { 
            message: "Invalid email or password. Please try again.",
            code: error.code,
            status: error.status
          }
        };
      }
      
      // Generic error fallback
      return { 
        user: null, 
        session: null, 
        error: { 
          message: error.message || "Failed to sign in. Please try again.",
          code: error.code,
          status: error.status
        }
      };
    }
    
    console.log("Sign in successful");
    
    // Store user data
    if (data?.user && typeof localStorage !== 'undefined') {
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userId', data.user.id);
      localStorage.setItem('last_successful_login', new Date().toISOString());
    }
    
    return data;
  } catch (err: any) {
    console.error("Sign in process error:", err);
    
    // Provide a user-friendly error message
    return { 
      user: null, 
      session: null, 
      error: { 
        message: "An unexpected error occurred during sign in. Please try again later.",
        originalError: err.message
      }
    };
  }
}

// Enhanced sign-out function
export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error("Sign out error:", error);
      throw error;
    }
    
    // Clear local storage items related to user session
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userId');
      localStorage.removeItem('redirect_after_signup');
      localStorage.removeItem('last_successful_login');
    }
    
    console.log("Sign out successful");
    return { success: true };
  } catch (err: any) {
    console.error("Sign out process error:", err);
    return { 
      success: false, 
      error: { 
        message: "Failed to sign out completely. Please try again.",
        originalError: err.message
      }
    };
  }
}

// Enhanced current user function with session refresh
export async function getCurrentUser() {
  try {
    // First try to refresh the session
    const { data: refreshData, error: refreshError } = await supabase.auth.refreshSession();
    
    if (refreshError) {
      console.log("Session refresh failed:", refreshError.message);
      // Continue to try getting user anyway
    } else if (refreshData?.user) {
      console.log("Session refreshed successfully");
      return refreshData.user;
    }
    
    // Try to get user directly
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error) {
      if (error.message === 'Auth session missing!' || 
          error.message.includes('JWT') || 
          error.message.includes('session')) {
        console.log("No active session found");
        return null;
      }
      console.error("Get user error:", error);
      throw error;
    }
    
    return user;
  } catch (err: any) {
    console.error("Get current user error:", err);
    return null;
  }
}

// Other functions remain with enhanced error handling and logging
export async function confirmPayment(planType: string) {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError) {
      console.error("User retrieval error during payment confirmation:", userError);
      throw userError;
    }
    
    if (!user) {
      console.error("No authenticated user found during payment confirmation");
      throw new Error('User not authenticated');
    }

    const { data, error } = await supabase.auth.updateUser({
      data: {
        email_confirmed: true,
        payment_confirmed: true,
        plan_type: planType,
        signup_completed: true,
        payment_date: new Date().toISOString()
      }
    });
    
    if (error) {
      console.error("User update error during payment confirmation:", error);
      throw error;
    }
    
    try {
      // Record payment in database
      const { error: dbError } = await supabase
        .from('user_payments')
        .upsert([{
          user_id: user.id,
          plan_type: planType,
          payment_date: new Date().toISOString(),
          status: 'confirmed'
        }]);
        
      if (dbError) {
        console.error('Failed to update payment record:', dbError);
        // Continue despite DB error - user metadata is updated
      }
    } catch (dbError) {
      console.error('Exception during payment record update:', dbError);
      // Continue despite DB error - user metadata is updated
    }
    
    return data;
  } catch (err: any) {
    console.error("Payment confirmation error:", err);
    throw err;
  }
}

// Other utility functions with enhanced error handling
export async function hasCompletedPayment() {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) return false;
    return user.user_metadata?.payment_confirmed === true;
  } catch (err) {
    console.error("Check payment completion error:", err);
    return false;
  }
}

export async function getUserPlanType() {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) return null;
    return user.user_metadata?.plan_type;
  } catch (err) {
    console.error("Get user plan type error:", err);
    return null;
  }
}

export async function isSignupCompleted() {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) return false;
    return user.user_metadata?.signup_completed === true;
  } catch (err) {
    console.error("Check signup completion error:", err);
    return false;
  }
}

// New helper functions for improved user experience

// Check if email verification is pending
export async function isEmailVerificationPending() {
  try {
    const email = localStorage.getItem('partial_signup_email');
    if (!email) return false;
    
    const timestamp = localStorage.getItem('partial_signup_timestamp');
    if (!timestamp) return false;
    
    // Check if the partial signup is less than 24 hours old
    const signupTime = new Date(timestamp).getTime();
    const currentTime = new Date().getTime();
    const hoursSinceSignup = (currentTime - signupTime) / (1000 * 60 * 60);
    
    return hoursSinceSignup < 24;
  } catch (err) {
    console.error("Check email verification status error:", err);
    return false;
  }
}

// Resend verification email
export async function resendVerificationEmail(email: string) {
  try {
    const { data, error } = await supabase.auth.resend({
      type: 'signup',
      email: email,
      options: {
        emailRedirectTo: window.location.origin + '/auth/callback',
      }
    });
    
    if (error) {
      console.error("Resend verification email error:", error);
      return { 
        success: false, 
        error: { 
          message: error.message || "Failed to resend verification email.",
          code: error.code,
          status: error.status
        }
      };
    }
    
    return { success: true, data };
  } catch (err: any) {
    console.error("Resend verification process error:", err);
    return { 
      success: false, 
      error: { 
        message: "An unexpected error occurred. Please try again later.",
        originalError: err.message
      }
    };
  }
}

// Password reset request
export async function requestPasswordReset(email: string) {
  try {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + '/auth/reset-password',
    });
    
    if (error) {
      console.error("Password reset request error:", error);
      return { 
        success: false, 
        error: { 
          message: error.message || "Failed to send password reset email.",
          code: error.code,
          status: error.status
        }
      };
    }
    
    return { success: true, data };
  } catch (err: any) {
    console.error("Password reset process error:", err);
    return { 
      success: false, 
      error: { 
        message: "An unexpected error occurred. Please try again later.",
        originalError: err.message
      }
    };
  }
}

// Update password
export async function updatePassword(newPassword: string) {
  try {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword
    });
    
    if (error) {
      console.error("Password update error:", error);
      return { 
        success: false, 
        error: { 
          message: error.message || "Failed to update password.",
          code: error.code,
          status: error.status
        }
      };
    }
    
    return { success: true, data };
  } catch (err: any) {
    console.error("Password update process error:", err);
    return { 
      success: false, 
      error: { 
        message: "An unexpected error occurred. Please try again later.",
        originalError: err.message
      }
    };
  }
}
