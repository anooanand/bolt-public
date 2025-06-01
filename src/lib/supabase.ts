// Updated supabase.ts file with simplified signup logic and better error handling

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Log environment variables availability for debugging
console.log("Environment variables check:");
console.log("SUPABASE_URL available:", !!supabaseUrl);
console.log("SUPABASE_ANON_KEY available:", !!supabaseAnonKey);
console.log("SUPABASE_URL prefix:", supabaseUrl?.substring(0, 20) + "...");
console.log("SUPABASE_ANON_KEY prefix:", supabaseAnonKey?.substring(0, 20) + "...");

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

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
    headers: { 'x-application-name': 'bolt-writing-assistant' }
  },
  realtime: {
    timeout: 60000
  }
});

export type AuthError = {
  message: string;
};

// Supabase network connectivity check
export async function checkSupabaseConnection() {
  try {
    const start = Date.now();
    const response = await fetch(supabaseUrl);
    const elapsed = Date.now() - start;
    
    console.log(`Supabase connection check: ${response.status}, time: ${elapsed}ms`);
    return {
      connected: response.status >= 200 && response.status < 300,
      status: response.status,
      responseTime: elapsed
    };
  } catch (err) {
    console.error("Supabase connection check failed:", err);
    return {
      connected: false,
      error: err.message
    };
  }
}

// UPDATED: Simplified signup function without initial sign-in attempt
export async function signUp(email: string, password: string) {
  try {
    console.log("Starting signup process for:", email);
    
    // Check connection first
    const connectionCheck = await checkSupabaseConnection();
    console.log("Supabase connection check:", connectionCheck);
    
    if (!connectionCheck.connected) {
      throw new Error(`Unable to connect to Supabase: ${connectionCheck.error || connectionCheck.status}`);
    }
    
    // Directly attempt signup without checking if user exists first
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
      throw error;
    }

    console.log("Signup response:", data);
    
    // If signup was successful but requires email confirmation
    if (data?.user?.identities?.length === 0) {
      console.log("Email confirmation required");
      return { user: data.user, session: null, emailConfirmationRequired: true };
    }
    
    // If signup was successful and no email confirmation is required
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
      throw new Error(`Unable to connect to Supabase: ${connectionCheck.error || connectionCheck.status}`);
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

// Rest of your functions remain unchanged
