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
      if (error.message.includes('already registered')) {
        // Try to sign in if the user already exists
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (signInError) {
          throw new Error('Invalid email or password');
        }

        return signInData;
      }
      throw error;
    }

    return data;
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    }
    throw new Error('An unexpected error occurred during signup');
  }
}

export async function signIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error('Invalid email or password');
    }

    return data;
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    }
    throw new Error('An unexpected error occurred during sign in');
  }
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getCurrentUser() {
  try {
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
    console.error('Error getting current user:', err);
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
    console.error('Payment confirmation error:', err);
    throw err;
  }
}

export async function hasCompletedPayment() {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) return false;
    return user.user_metadata?.payment_confirmed === true;
  } catch (err) {
    console.error('Check payment completion error:', err);
    return false;
  }
}

export async function getUserPlanType() {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) return null;
    return user.user_metadata?.plan_type;
  } catch (err) {
    console.error('Get user plan type error:', err);
    return null;
  }
}

export async function isSignupCompleted() {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) return false;
    return user.user_metadata?.signup_completed === true;
  } catch (err) {
    console.error('Check signup completion error:', err);
    return false;
  }
}