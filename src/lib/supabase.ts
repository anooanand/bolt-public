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

// Updated to bypass email confirmation
export async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      // Remove email redirect to bypass confirmation
      data: {
        email_confirmed: true // Add custom metadata to indicate email is confirmed
      }
    }
  });
  
  if (error) {
    throw error;
  }
  
  // Automatically sign in the user after signup
  await signIn(email, password);
  
  return data;
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) {
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

// New function to confirm payment and complete signup
export async function confirmPayment(planType: string) {
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  
  if (userError) {
    throw userError;
  }
  
  if (!user) {
    throw new Error('User not authenticated');
  }
  
  const { data, error } = await supabase.auth.updateUser({
    data: {
      payment_confirmed: true,
      plan_type: planType,
      signup_completed: true
    }
  });
  
  if (error) {
    throw error;
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
