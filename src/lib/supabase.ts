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
    detectSessionInUrl: true
  }
});

export type AuthError = {
  message: string;
};

export async function signUp(email: string, password: string) {
  try {
    console.log("Starting signup process for:", email);
    
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
      console.error("Signup error:", error.message);
      throw error;
    }
    
    console.log("User created and signed in successfully");
    return data;
  } catch (err) {
    console.error("Signup process error:", err);
    throw err;
  }
}

export async function signIn(email: string, password: string) {
  try {
    console.log("Attempting to sign in:", email);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      // If error is about email confirmation, try to fix it
      if (error.message.includes('email') && error.message.includes('confirm')) {
        console.log("Attempting to fix email confirmation issue");
        
        // Update user metadata to mark email as confirmed
        await supabase.auth.updateUser({
          data: {
            email_confirmed: true
          }
        });
        
        // Try signing in again
        const { data: retryData, error: retryError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (retryError) {
          console.error("Retry sign-in error:", retryError.message);
          throw new Error('Invalid email or password. Please try again.');
        }
        
        return retryData;
      }
      
      console.error("Sign-in error:", error.message);
      throw error;
    }
    
    console.log("Sign in successful");
    return data;
  } catch (err) {
    console.error("Sign-in process error:", err);
    throw err;
  }
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  
  if (error) {
    console.error("Sign-out error:", error.message);
    throw error;
  }
  
  console.log("Sign out successful");
}

export async function getCurrentUser() {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error) {
      // Check if error is related to missing/expired auth session
      if (error.message === 'Auth session missing!' || 
          error.message.includes('JWT') || 
          error.message.includes('session')) {
        return null;
      }
      console.error("Get current user error:", error.message);
      throw error;
    }
    
    return user;
  } catch (err) {
    console.error("Get current user process error:", err);
    return null; // Return null instead of throwing to prevent app crashes
  }
}

export async function confirmPayment(planType: string) {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError) {
      console.error("Get user for payment confirmation error:", userError.message);
      throw userError;
    }
    
    if (!user) {
      throw new Error('User not authenticated');
    }
    
    // Update user metadata to mark payment as confirmed and signup as completed
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
      console.error("Update user for payment confirmation error:", error.message);
      throw error;
    }
    
    // Create or update payment record in Supabase database if needed
    try {
      await supabase
        .from('user_payments')
        .upsert([
          {
            user_id: user.id,
            plan_type: planType,
            payment_date: new Date().toISOString(),
            status: 'confirmed'
          }
        ]);
    } catch (dbError) {
      console.error('Failed to update payment record in database:', dbError);
      // Continue anyway since user metadata is updated
    }
    
    console.log("Payment confirmed successfully");
    return data;
  } catch (err) {
    console.error("Payment confirmation process error:", err);
    throw err;
  }
}

export async function hasCompletedPayment() {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error || !user) {
      return false;
    }
    
    return user.user_metadata?.payment_confirmed === true;
  } catch (err) {
    console.error("Check payment completion error:", err);
    return false;
  }
}

export async function getUserPlanType() {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error || !user) {
      return null;
    }
    
    return user.user_metadata?.plan_type;
  } catch (err) {
    console.error("Get user plan type error:", err);
    return null;
  }
}

export async function isSignupCompleted() {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error || !user) {
      return false;
    }
    
    return user.user_metadata?.signup_completed === true;
  } catch (err) {
    console.error("Check signup completion error:", err);
    return false;
  }
}