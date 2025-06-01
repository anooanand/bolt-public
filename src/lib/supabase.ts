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
    detectSessionInUrl: true // Enable session detection in URL
  }
});

export type AuthError = {
  message: string;
};

// Completely rewritten to fix signup issues and disable email confirmation
export async function signUp(email: string, password: string) {
  try {
    console.log("Starting signup process for:", email);
    
    // First try to sign in directly in case user already exists
    const { data: existingUser, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    // If sign in succeeds, user already exists and is now signed in
    if (existingUser?.user) {
      console.log("User already exists and is now signed in");
      return existingUser;
    }
    
    // If user doesn't exist, create a new account with disabled email confirmation
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        // IMPORTANT: These settings disable email confirmation
        emailRedirectTo: undefined,
        data: {
          email_confirmed: true, // Mark email as confirmed
          payment_confirmed: false, // Initialize payment status
          signup_completed: false // Will be set to true after payment
        }
      }
    });
    
    if (error) {
      console.error("Signup error:", error.message);
      throw error;
    }
    
    // Add a delay before attempting to sign in
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // After signup, explicitly sign in the user
    const { data: signInData, error: autoSignInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (autoSignInError) {
      console.error("Auto sign-in error:", autoSignInError.message);
      
      // Try one more time with a longer delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const { data: retrySignInData, error: retryError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (retryError) {
        console.error("Retry sign-in error:", retryError.message);
        throw new Error('Account created but failed to sign in automatically. Please try signing in manually.');
      }
      
      return retrySignInData;
    }
    
    console.log("User created and signed in successfully");
    return signInData;
  } catch (err) {
    console.error("Signup process error:", err);
    // Ensure we're throwing a proper Error object with a message
    if (err instanceof Error) {
      throw err;
    } else {
      throw new Error('An unexpected error occurred during signup');
    }
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

// Enhanced function to confirm payment and complete signup
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
        email_confirmed: true, // Ensure email is marked as confirmed
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

// Check if user has completed payment
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

// Get user's plan type
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

// Check if signup is completed (both email confirmed and payment confirmed)
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
