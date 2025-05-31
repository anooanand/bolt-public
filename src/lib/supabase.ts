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

// Updated to completely bypass email confirmation
export async function signUp(email: string, password: string) {
  // First check if user already exists
  const { data: existingUser, error: checkError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  // If user exists and can sign in, return the user
  if (existingUser?.user) {
    return existingUser;
  }
  
  // Otherwise create a new user
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: undefined, // Remove email redirect completely
      data: {
        email_confirmed: true, // Mark email as confirmed
        payment_confirmed: false, // Initialize payment status
        signup_completed: false // Will be set to true after payment
      }
    }
  });
  
  if (error) {
    // If error is about email confirmation, ignore it
    if (error.message.includes('email') && error.message.includes('confirm')) {
      // Try to sign in directly
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (signInError) {
        throw new Error('Failed to create account. Please try again.');
      }
      
      return signInData;
    }
    throw error;
  }
  
  // Automatically sign in the user after signup
  const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (signInError) {
    throw new Error('Account created but failed to sign in. Please try signing in manually.');
  }
  
  return data;
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) {
    // If error is about email confirmation, ignore it and try to sign in anyway
    if (error.message.includes('email') && error.message.includes('confirm')) {
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
        throw new Error('Invalid email or password. Please try again.');
      }
      
      return retryData;
    }
    throw error;
  }
  
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  
  if (error) {
    throw error;
  }
}

export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error) {
    // Check if error is related to missing/expired auth session
    if (error.message === 'Auth session missing!' || 
        error.message.includes('JWT') || 
        error.message.includes('session')) {
      return null;
    }
    throw error;
  }
  
  return user;
}

// Enhanced function to confirm payment and complete signup
export async function confirmPayment(planType: string) {
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  
  if (userError) {
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
  
  return data;
}

// Check if user has completed payment
export async function hasCompletedPayment() {
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error || !user) {
    return false;
  }
  
  return user.user_metadata?.payment_confirmed === true;
}

// Get user's plan type
export async function getUserPlanType() {
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error || !user) {
    return null;
  }
  
  return user.user_metadata?.plan_type;
}

// Check if signup is completed (both email confirmed and payment confirmed)
export async function isSignupCompleted() {
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error || !user) {
    return false;
  }
  
  return user.user_metadata?.signup_completed === true;
}
