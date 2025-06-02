// Updated supabase.ts file with improved API key handling and error reporting

import { createClient } from '@supabase/supabase-js';

// Trim whitespace from environment variables to prevent issues
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();

// Log environment variables availability for debugging
console.log("Environment variables check:");
console.log("SUPABASE_URL available:", !!supabaseUrl);
console.log("SUPABASE_ANON_KEY available:", !!supabaseAnonKey);
console.log("SUPABASE_URL prefix:", supabaseUrl?.substring(0, 20) + "...");
console.log("SUPABASE_ANON_KEY prefix:", supabaseAnonKey?.substring(0, 20) + "...");

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Create Supabase client with explicit headers to ensure API key is properly sent
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
    storage: window.localStorage,
    storageKey: 'bolt_auth_token'
  },
  global: {
    headers: { 
      'x-application-name': 'bolt-writing-assistant',
      'apikey': supabaseAnonKey // Explicitly add API key to headers
    }
  },
  realtime: {
    timeout: 60000
  }
});

export type AuthError = {
  message: string;
};

// Updated Supabase connection check with detailed error reporting
export async function checkSupabaseConnection() {
  try {
    const start = Date.now();
    
    // First check if we can reach the Supabase endpoint
    try {
      const response = await fetch(supabaseUrl);
      if (!response.ok) {
        return {
          connected: false,
          error: `Supabase endpoint returned status ${response.status}`
        };
      }
    } catch (fetchErr) {
      return {
        connected: false,
        error: `Cannot reach Supabase endpoint: ${fetchErr.message}`
      };
    }
    
    // Then try a lightweight auth operation
    const { data, error } = await supabase.auth.getSession();
    const elapsed = Date.now() - start;
    
    if (error) {
      console.error("Supabase connection check failed:", error);
      return {
        connected: false,
        error: error.message,
        details: error
      };
    }
    
    console.log(`Supabase connection check successful, time: ${elapsed}ms`);
    return {
      connected: true,
      responseTime: elapsed
    };
  } catch (err) {
    console.error("Supabase connection check failed:", err);
    return {
      connected: false,
      error: err.message,
      details: err
    };
  }
}

// Simplified signup function with better error handling
export async function signUp(email: string, password: string) {
  try {
    console.log("Starting signup process for:", email);
    
    // Check connection first with detailed logging
    const connectionCheck = await checkSupabaseConnection();
    console.log("Supabase connection check:", connectionCheck);
    
    if (!connectionCheck.connected) {
      throw new Error(`Unable to connect to Supabase: ${connectionCheck.error || 'Connection failed'}`);
    }
    
    // Log the headers being used (without exposing full key)
    console.log("Using headers:", {
      'apikey': '***' + supabaseAnonKey.substring(supabaseAnonKey.length - 5),
      'Content-Type': 'application/json'
    });
    
    // Directly attempt signup with explicit headers
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: undefined,
        data: {
          email_confirmed: true,
          payment_confirmed: false,
          signup_completed: false
        }
      }
    });

    if (error) {
      console.error("Signup error:", error);
      console.error("Error details:", JSON.stringify(error, null, 2));
      
      // Special handling for API key errors
      if (error.message?.includes('API key') || error.status === 401) {
        console.error("API key issue detected. Please verify your Supabase API key is correct and not expired.");
      }
      
      throw error;
    }

    console.log("Signup response:", data);
    
    // If signup was successful but requires email confirmation
    if (data?.user?.identities?.length === 0) {
      console.log("Email confirmation required");
      return { user: data.user, session: null, emailConfirmationRequired: true };
    }
    
    // If signup was successful and no session returned
    if (data?.user && !data.session) {
      console.log("User created but no session returned, attempting sign in");
      
      // Add delay before attempting sign in
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Attempt to sign in the newly created user
      return await signIn(email, password);
    }

    console.log("User created and signed in successfully");
    return data;

  } catch (err) {
    console.error("Signup process error:", err);
    console.error("Error details:", JSON.stringify(err, null, 2));
    throw err;
  }
}

export async function signIn(email: string, password: string) {
  try {
    console.log("Attempting to sign in:", email);
    
    // Check connection first
    const connectionCheck = await checkSupabaseConnection();
    console.log("Sign in connection check:", connectionCheck);
    
    if (!connectionCheck.connected) {
      throw new Error(`Unable to connect to Supabase: ${connectionCheck.error || 'Connection failed'}`);
    }
    
    // First refresh any existing session
    await supabase.auth.refreshSession();
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      console.error("Sign in error:", error);
      console.error("Error details:", JSON.stringify(error, null, 2));
      throw error;
    }
    
    console.log("Sign in successful");
    return data;
  } catch (err) {
    console.error("Sign in process error:", err);
    console.error("Error details:", JSON.stringify(err, null, 2));
    throw err;
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    console.log("Sign out successful");
  } catch (err) {
    console.error("Sign out error:", err);
    throw err;
  }
}

export async function getCurrentUser() {
  try {
    // First try to refresh the session
    await supabase.auth.refreshSession();
    
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error) {
      if (error.message === 'Auth session missing!' || 
          error.message.includes('JWT') || 
          error.message.includes('session')) {
        return null;
      }
      throw error;
    }
    
    return user;
  } catch (err) {
    console.error("Get current user error:", err);
    return null;
  }
}

export async function confirmPayment(planType: string) {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError) throw userError;
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase.auth.updateUser({
      data: {
        email_confirmed: true,
        payment_confirmed: true,
        plan_type: planType,
        signup_completed: true,
        payment_date: new Date().toISOString()
      }
    });
    
    if (error) throw error;
    
    try {
      await supabase
        .from('user_payments')
        .upsert([{
          user_id: user.id,
          plan_type: planType,
          payment_date: new Date().toISOString(),
          status: 'confirmed'
        }]);
    } catch (dbError) {
      console.error('Failed to update payment record:', dbError);
    }
    
    return data;
  } catch (err) {
    console.error("Payment confirmation error:", err);
    throw err;
  }
}

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
