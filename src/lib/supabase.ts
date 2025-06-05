// Updated frontend Supabase client with improved session management
// This version includes enhanced session handling and debugging

import { createClient } from '@supabase/supabase-js';

// Get environment variables with fallbacks
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim() || 'https://rvlotczavccreigdzczo.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim() || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ2bG90Y3phdmNjcmVpZ2R6Y3pvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg5NTkyNDMsImV4cCI6MjA2NDUzNTI0M30.6gIQ0XmqgwmoULkgvZg4m3GTvsFKPv0MmesXiscRjbg';

// Log configuration for debugging
console.log("Supabase Configuration:");
console.log("URL:", supabaseUrl);
console.log("Key (first 10 chars):", supabaseAnonKey.substring(0, 10) + "...");

// Create Supabase client for non-auth operations
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    storageKey: 'bolt_auth_token_v7' // Updated to avoid conflicts with previous versions
  },
  global: {
    headers: { 
      'x-application-name': 'bolt-writing-assistant',
      'x-client-version': '2.0.5'
    }
  }
});

// Function to call our Netlify auth proxy instead of direct Supabase
async function callAuthProxy(action, data) {
  console.log(`Calling auth proxy with action: ${action}`);
  
  try {
    const response = await fetch('/.netlify/functions/auth-proxy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        action,
        ...data
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `HTTP error ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Auth proxy ${action} error:`, error);
    throw error;
  }
}

// Enhanced signup function with improved session management
export async function signUp(email, password) {
  console.log("Starting signup process for:", email);
  
  try {
    // Use our Netlify Function proxy instead of direct Supabase call
    const result = await callAuthProxy('signup', {
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
    
    if (result.error) {
      console.error("Signup failed:", result.error.message);
      throw new Error(result.error.message);
    }
    
    if (!result.user) {
      throw new Error('No user data returned from signup');
    }
    
    console.log("Signup successful:", {
      user: result.user.id,
      email: result.user.email,
      session: !!result.session
    });
    
    // ENHANCED SESSION MANAGEMENT
    if (result.session) {
      console.log("Setting session with tokens...");
      
      // Set the session in Supabase client
      const { data, error } = await supabase.auth.setSession({
        access_token: result.session.access_token,
        refresh_token: result.session.refresh_token
      });
      
      if (error) {
        console.error("Error setting session:", error);
      } else {
        console.log("Session set successfully:", !!data.session);
      }
      
      // Verify session was established
      const { data: { session } } = await supabase.auth.getSession();
      console.log("Session verification:", {
        sessionExists: !!session,
        userId: session?.user?.id,
        email: session?.user?.email
      });
      
      // Store user email for pricing page
      if (session?.user?.email) {
        localStorage.setItem('userEmail', session.user.email);
        localStorage.setItem('userId', session.user.id);
      }
    } else {
      console.warn("No session returned from signup - this may cause issues");
    }
    
    return { success: true, user: result.user, session: result.session };
  } catch (err) {
    console.error("Signup error:", err);
    
    // Check if the error is due to an existing user
    if (err.message?.includes('already registered') || err.message?.includes('already exists')) {
      return { success: false, error: err, emailExists: true };
    }
    
    throw err;
  }
}

export async function signIn(email, password) {
  try {
    console.log("Attempting sign in for:", email);
    
    // Use our Netlify Function proxy
    const result = await callAuthProxy('signin', { email, password });
    
    if (result.error) {
      throw new Error(result.error.message);
    }
    
    // Update the Supabase client session
    if (result.session) {
      const { data, error } = await supabase.auth.setSession({
        access_token: result.session.access_token,
        refresh_token: result.session.refresh_token
      });
      
      if (error) {
        console.error("Error setting session:", error);
      }
      
      // Store user info
      if (result.user?.email) {
        localStorage.setItem('userEmail', result.user.email);
        localStorage.setItem('userId', result.user.id);
      }
    }
    
    console.log("Sign in successful:", result?.user?.email);
    return result;
  } catch (err) {
    console.error("Sign in failed:", err.message);
    throw err;
  }
}

export async function signOut() {
  try {
    // Use our Netlify Function proxy
    await callAuthProxy('signout', {});
    
    // Also clear the local session
    await supabase.auth.signOut();
    
    // Clear stored user info
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userId');
    
    console.log("Signed out successfully");
    return true;
  } catch (err) {
    console.error("Sign out error:", err);
    return false;
  }
}

export async function getCurrentUser() {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) return null;
    return user;
  } catch (err) {
    console.error("Get current user error:", err);
    return null;
  }
}

export async function requestPasswordReset(email) {
  try {
    console.log("Sending password reset for:", email);
    
    // Use our Netlify Function proxy
    const result = await callAuthProxy('reset', {
      email,
      options: {
        redirectTo: `${window.location.origin}/auth/reset-password`
      }
    });
    
    if (result.error) {
      throw new Error(result.error.message);
    }
    
    console.log("Password reset email sent");
    return { success: true };
  } catch (err) {
    console.error("Password reset exception:", err);
    throw new Error(err.message || "Failed to send password reset email.");
  }
}

// Other functions remain the same, using the supabase client directly
export async function confirmPayment(planType) {
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

