// Enhanced Supabase client with payment confirmation support
import { createClient } from '@supabase/supabase-js';

// Get environment variables with fallbacks
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim() || 'https://rvlotczavccreigdzczo.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim() || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ2bG90Y3phdmNjcmVpZ2R6Y3pvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg5NTkyNDMsImV4cCI6MjA2NDUzNTI0M30.6gIQ0XmqgwmoULkgvZg4m3GTvsFKPv0MmesXiscRjbg';

// Log configuration for debugging
console.log("Supabase Configuration:");
console.log("URL:", supabaseUrl);
console.log("Key (first 10 chars):", supabaseAnonKey.substring(0, 10) + "...");

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    storageKey: 'bolt_auth_token_v8' // Updated version for payment fixes
  },
  global: {
    headers: { 
      'x-application-name': 'bolt-writing-assistant',
      'x-client-version': '2.1.0'
    }
  }
});

// Function to call our Netlify auth proxy
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

// Enhanced signup function
export async function signUp(email, password) {
  console.log("Starting signup process for:", email);
  
  try {
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
    
    // Enhanced session management
    if (result.session) {
      console.log("Setting session with tokens...");
      
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
      
      // Store user data for payment processing
      if (session?.user?.email) {
        localStorage.setItem('userEmail', session.user.email);
        localStorage.setItem('userId', session.user.id);
      }
    } else {
      console.warn("No session returned from signup - storing email for payment processing");
      localStorage.setItem('userEmail', email);
    }
    
    return { success: true, user: result.user, session: result.session };
  } catch (err) {
    console.error("Signup error:", err);
    
    if (err.message?.includes('already registered') || err.message?.includes('already exists')) {
      return { success: false, error: err, emailExists: true };
    }
    
    throw err;
  }
}

export async function signIn(email, password) {
  try {
    console.log("Attempting sign in for:", email);
    
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
    await callAuthProxy('signout', {});
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

// ENHANCED PAYMENT CONFIRMATION FUNCTIONS

export async function findUserByEmail(email) {
  try {
    console.log("Looking up user by email:", email);
    
    // Try to get user from current session first
    const { data: { user } } = await supabase.auth.getUser();
    if (user && user.email === email) {
      console.log("Found user in current session");
      return user;
    }
    
    // If no current session, we need to sign in the user
    // For now, return null and handle in the calling function
    console.log("No current session for email:", email);
    return null;
  } catch (err) {
    console.error("Error finding user by email:", err);
    return null;
  }
}

export async function confirmPayment(planType) {
  try {
    console.log("Confirming payment for plan:", planType);
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      throw new Error("No authenticated user found");
    }
    
    console.log("Updating payment status for user:", user.email);
    
    // Update user metadata with payment information
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
      console.error("Error updating user payment status:", error);
      throw error;
    }
    
    console.log("Payment confirmed successfully for user:", user.email);
    
    // Also try to insert into user_payments table (if it exists)
    try {
      await supabase.from('user_payments').upsert([
        { 
          user_id: user.id, 
          plan_type: planType, 
          payment_date: new Date().toISOString(), 
          status: 'confirmed',
          amount: getPlanAmount(planType)
        }
      ]);
      console.log("Payment record inserted into user_payments table");
    } catch (tableError) {
      console.warn("Could not insert into user_payments table (table may not exist):", tableError);
      // This is not critical - the user metadata update is sufficient
    }
    
    return true;
  } catch (err) {
    console.error("Error confirming payment:", err);
    throw err;
  }
}

function getPlanAmount(planType) {
  const amounts = {
    'try-out': 9.00,
    'base-plan': 19.99,
    'premium': 29.99
  };
  return amounts[planType] || 0;
}

export async function hasCompletedPayment() {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;
    
    const paymentConfirmed = user?.user_metadata?.payment_confirmed === true;
    console.log("Payment status check:", {
      userId: user.id,
      email: user.email,
      paymentConfirmed,
      planType: user?.user_metadata?.plan_type
    });
    
    return paymentConfirmed;
  } catch (err) {
    console.error("Error checking payment status:", err);
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

// PAYMENT SUCCESS URL HANDLER
export async function handlePaymentSuccessFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  const paymentSuccess = urlParams.get('payment_success');
  const planType = urlParams.get('plan');
  
  if (paymentSuccess === 'true' && planType) {
    console.log("Payment success detected from URL:", { paymentSuccess, planType });
    
    try {
      // Get user email from localStorage
      const userEmail = localStorage.getItem('userEmail');
      if (!userEmail) {
        throw new Error("No user email found in localStorage");
      }
      
      // Check if user is already signed in
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        // User is signed in, confirm payment
        await confirmPayment(planType);
        console.log("Payment confirmed for signed-in user");
        return { success: true, user: session.user, requiresSignIn: false };
      } else {
        // User needs to sign in
        console.log("User needs to sign in to complete payment confirmation");
        return { success: true, user: null, requiresSignIn: true, email: userEmail, plan: planType };
      }
    } catch (error) {
      console.error("Error handling payment success:", error);
      return { success: false, error: error.message };
    }
  }
  
  return null; // No payment success in URL
}

export async function requestPasswordReset(email) {
  try {
    console.log("Sending password reset for:", email);
    
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

