// Updated Supabase Connection with DNS Fix
import { createClient } from '@supabase/supabase-js';

// Get environment variables with fallbacks - ensure correct URL format with https://
const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL?.trim() || 'https://rvlotczavccreigdzczo.supabase.co').replace(/([^:])\/\/+/g, '$1/');
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim() || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ2bG90Y3phdmNjcmVpZ2R6Y3pvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg5NTkyNDMsImV4cCI6MjA2NDUzNTI0M30.6gIQ0XmqgwmoULkgvZg4m3GTvsFKPv0MmesXiscRjbg';

// Log configuration for debugging
console.log("Supabase Connection Configuration:");
console.log("URL:", supabaseUrl);
console.log("Key (first 10 chars):", supabaseAnonKey.substring(0, 10) + "...");

// Create Supabase client with direct connection and DNS error handling
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    storageKey: 'bolt_auth_token_v5' // Updated to avoid conflicts with previous versions
  },
  global: {
    headers: { 
      'x-application-name': 'bolt-writing-assistant',
      'x-client-version': '2.0.3'
    }
  }
});

// Enhanced signup function with improved error handling for DNS issues
export async function signUp(email: string, password: string) {
  console.log("Starting signup process for:", email);
  
  try {
    // Verify URL is accessible before attempting signup
    try {
      console.log(`Verifying Supabase URL is accessible: ${supabaseUrl}`);
      const pingResponse = await fetch(`${supabaseUrl}/auth/v1/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabaseAnonKey
        }
      });
      console.log("Supabase URL ping response:", pingResponse.status);
    } catch (pingErr) {
      console.error("Supabase URL is not accessible:", pingErr);
      throw new Error(`Cannot connect to Supabase: ${pingErr.message || 'DNS resolution failed'}`);
    }
    
    // Continue with normal signup using Supabase client
    console.log("Proceeding with Supabase client signup...");
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
        data: {
          email_confirmed: false,
          payment_confirmed: false,
          signup_completed: false,
          signup_date: new Date().toISOString(),
          last_login_attempt: new Date().toISOString()
        }
      }
    });

    if (error) {
      console.error("Signup failed:", error.message);
      throw error;
    }

    if (!data?.user) {
      throw new Error('No user data returned from signup');
    }

    console.log("Signup successful:", {
      user: data.user.id,
      email: data.user.email,
      session: !!data.session
    });

    return { success: true, user: data.user };
  } catch (err: any) {
    console.error("Signup error:", err);
    
    // Check if the error is due to an existing user
    if (err.message?.includes('already registered') || err.message?.includes('already exists')) {
      return { success: false, error: err, emailExists: true };
    }
    
    // Check for DNS or network errors
    if (err.message?.includes('Failed to fetch') || 
        err.message?.includes('NetworkError') || 
        err.message?.includes('network') ||
        err.message?.includes('DNS') ||
        err.message?.includes('ERR_NAME_NOT_RESOLVED')) {
      throw new Error(`Network error: Cannot connect to Supabase. Please check your internet connection and Supabase project status. Original error: ${err.message}`);
    }
    
    throw err;
  }
}

export async function signIn(email: string, password: string) {
  try {
    console.log("Attempting sign in for:", email);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    console.log("Sign in successful:", data?.user?.email);
    return data;
  } catch (err: any) {
    console.error("Sign in failed:", err.message);
    throw err;
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    console.log("Signed out successfully");
    return true;
  } catch (err: any) {
    console.error("Sign out error:", err);
    return false;
  }
}

export async function getCurrentUser() {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) return null;
    return user;
  } catch (err: any) {
    console.error("Get current user error:", err);
    return null;
  }
}

export async function confirmPayment(planType: string) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("No user found");
  await supabase.auth.updateUser({
    data: {
      payment_confirmed: true,
      plan_type: planType,
      signup_completed: true,
      payment_date: new Date().toISOString()
    }
  });
  await supabase.from('user_payments').upsert([
    { user_id: user.id, plan_type: planType, payment_date: new Date().toISOString(), status: 'confirmed' }
  ]);
  return true;
}

export async function hasCompletedPayment() {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    return user?.user_metadata?.payment_confirmed === true;
  } catch {
    return false;
  }
}

export async function getUserPlanType() {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    return user?.user_metadata?.plan_type || null;
  } catch {
    return null;
  }
}

export async function isSignupCompleted() {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    return user?.user_metadata?.signup_completed === true;
  } catch {
    return false;
  }
}

export async function requestPasswordReset(email: string) {
  try {
    console.log("Sending password reset for:", email);
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`
    });

    if (error) {
      console.error("Password reset error:", error.message);
      throw error;
    }

    console.log("Password reset email sent:", data);
    return { success: true };
  } catch (err: any) {
    console.error("Password reset exception:", err);
    throw new Error(err.message || "Failed to send password reset email.");
  }
}
