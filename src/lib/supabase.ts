// src/lib/supabase.ts - Full version with logging-enhanced signup, retry, and timeout
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim() || 'https://zrzicouoioyqptfplnkg.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim() || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpyemljb3VvaW95cXB0ZnBsbmtnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg2ODg0NDgsImV4cCI6MjA2NDI2NDQ0OH0.ISq_Zdw8XUlGkeSlAXAAZukP2vDBkpPSvyYP7oQqr9s';

console.log("Supabase Configuration:");
console.log("URL:", supabaseUrl);
console.log("Key (first 10 chars):", supabaseAnonKey.substring(0, 10) + "...");

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    storageKey: 'bolt_auth_token_v3'
  },
  global: {
    headers: {
      'x-application-name': 'bolt-writing-assistant',
      'x-client-version': '2.0.1'
    }
  },
  realtime: {
    timeout: 60000
  }
});

async function retryWithTimeout<T>(
  operation: () => Promise<T>,
  retries = 2,
  timeout = 30000
): Promise<T> {
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error("Request timed out")), timeout);
  });

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      console.log(`Attempt ${attempt + 1}/${retries + 1}`);
      // Race between the operation and timeout
      const result = await Promise.race([operation(), timeoutPromise]) as T;
      return result;
    } catch (error) {
      if (attempt === retries) throw error;
      const delay = (attempt + 1) * 2000; // Exponential backoff
      console.log(`Retrying in ${delay/1000} seconds...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  throw new Error("All retry attempts failed");
}

export async function signUp(email: string, password: string) {
  console.log("🟢 Starting signup process for:", email);
  
  try {
    const signupOperation = () => supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin + '/auth/callback',
        data: {
          email_confirmed: false,
          payment_confirmed: false,
          signup_completed: false,
          signup_date: new Date().toISOString(),
          last_login_attempt: new Date().toISOString()
        }
      }
    });

    const { data, error } = await retryWithTimeout(signupOperation);

    console.log("📦 Signup response:", {
      user: data?.user?.id || null,
      email: data?.user?.email || null,
      session: !!data?.session,
      error: error || null
    });

    if (error) {
      console.error("❌ Signup failed:", error.message);
      throw new Error(error.message || "An unknown error occurred during signup.");
    }

    return { success: true, user: data?.user };
  } catch (err: any) {
    console.error("🔥 Signup exception:", err);
    throw new Error(err.message || "Signup failed.");
  }
}

export async function signIn(email: string, password: string) {
  try {
    console.log("🔐 Attempting sign in for:", email);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    console.log("✅ Sign in successful:", data?.user?.email);
    return data;
  } catch (err: any) {
    console.error("❌ Sign in failed:", err.message);
    throw new Error(err.message || "Sign in failed.");
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    console.log("👋 Signed out successfully");
    return true;
  } catch (err: any) {
    console.error("⚠️ Sign out error:", err);
    return false;
  }
}

export async function getCurrentUser() {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) return null;
    return user;
  } catch (err: any) {
    console.error("⚠️ Get current user error:", err);
    return null;
  }
}

export async function confirmPayment(planType: string) {
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

export async function requestPasswordReset(email: string) {
  try {
    console.log("📧 Sending password reset for:", email);
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + '/auth/reset-password'
    });

    if (error) {
      console.error("❌ Password reset error:", error.message);
      throw error;
    }

    console.log("✅ Password reset email sent:", data);
    return { success: true };
  } catch (err: any) {
    console.error("🔥 Password reset exception:", err);
    throw new Error(err.message || "Failed to send password reset email.");
  }
}