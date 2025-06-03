import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function signUp(email: string, password: string) {
  console.log("🟢 Starting signup process for:", email);

  try {
    const response = await timeout(
      supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            signup_date: new Date().toISOString(),
            email_confirmed: false,
            payment_confirmed: false,
            signup_completed: false,
            last_login_attempt: new Date().toISOString()
          }
        }
      }),
      30000 // Increased timeout to 30 seconds
    );

    const { data, error } = response;

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

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    }
    return { success: true };
  } catch (err: any) {
    console.error("🔥 Sign out error:", err);
    throw new Error(err.message || "Failed to sign out");
  }
}

// Helper function for timeout
function timeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) => 
      setTimeout(() => reject(new Error(`Operation timed out after ${ms}ms`)), ms)
    )
  ]);
}