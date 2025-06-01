import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

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

export async function signUp(email: string, password: string) {
  try {
    console.log("Starting signup process for:", email);
    
    // First check if user exists by trying to sign in
    const { data: existingUser, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (existingUser?.user) {
      console.log("User already exists and signed in successfully");
      return existingUser;
    }

    // If user doesn't exist, create new account
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
      throw error;
    }

    // Add delay before attempting sign in
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Attempt to sign in the newly created user
    const { data: signInData, error: autoSignInError } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (autoSignInError) {
      console.error("Auto sign-in error:", autoSignInError);
      
      // Add additional delay and retry once more
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const { data: retryData, error: retryError } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (retryError) {
        console.error("Retry sign-in error:", retryError);
        throw new Error('Account created but unable to sign in automatically. Please try signing in manually.');
      }
      
      return retryData;
    }

    console.log("User created and signed in successfully");
    return signInData;

  } catch (err) {
    console.error("Signup process error:", err);
    throw err;
  }
}

export async function signIn(email: string, password: string) {
  try {
    console.log("Attempting to sign in:", email);
    
    // First refresh any existing session
    await supabase.auth.refreshSession();
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      console.error("Sign in error:", error);
      throw error;
    }
    
    console.log("Sign in successful");
    return data;
  } catch (err) {
    console.error("Sign in process error:", err);
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