import { createClient, SupabaseClient, User, AuthError } from '@supabase/supabase-js';

// Define types for better TypeScript support
interface AuthResult {
  user?: User | null;
  error?: AuthError | null;
  success?: boolean;
}

interface PaymentStatus {
  hasPayment: boolean;
  planType: string | null;
  subscriptionStatus?: string | null;
  paymentDate?: string | null;
}

interface PaymentData {
  payment_confirmed: boolean;
  plan_type: string;
  signup_completed: boolean;
  payment_date: string;
  subscription_status: string;
  payment_amount?: number;
}

// Environment variables with proper typing
const supabaseUrl: string = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey: string = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log("Environment variables check:");
console.log("SUPABASE_URL available:", !!supabaseUrl);
console.log("SUPABASE_ANON_KEY available:", !!supabaseAnonKey);

if (supabaseUrl) {
  console.log("SUPABASE_URL prefix:", supabaseUrl.substring(0, 15) + "...");
}
if (supabaseAnonKey) {
  console.log("SUPABASE_ANON_KEY prefix:", supabaseAnonKey.substring(0, 15) + "...");
}

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

// Auth proxy function for Netlify functions
async function callAuthProxy(action: string, data: Record<string, any>): Promise<any> {
  try {
    const response = await fetch('/.netlify/functions/auth-proxy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action, ...data }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Auth proxy error:', error);
    throw error;
  }
}

// Sign up function
export async function signUp(email: string, password: string): Promise<AuthResult> {
  try {
    console.log("Attempting signup for:", email);
    
    // Store email in localStorage for later use
    if (typeof window !== 'undefined') {
      localStorage.setItem('userEmail', email);
    }
    
    const result = await callAuthProxy('signup', { email, password });
    
    if (result.error) {
      throw new Error(result.error.message);
    }

    console.log("Signup successful:", result);
    return result;
  } catch (error) {
    console.error("Signup failed:", error);
    throw error;
  }
}

// Sign in function
export async function signIn(email: string, password: string): Promise<AuthResult> {
  try {
    console.log("Attempting sign in for:", email);
    console.log("Calling auth proxy with action: signin");
    
    // Store email in localStorage for later use
    if (typeof window !== 'undefined') {
      localStorage.setItem('userEmail', email);
    }
    
    const result = await callAuthProxy('signin', { email, password });
    
    if (result.error) {
      console.error("Sign in failed:", result.error.message);
      throw new Error(result.error.message);
    }

    console.log("Sign in successful:", email);
    return result;
  } catch (error) {
    console.error("Sign in failed:", (error as Error).message);
    console.error("Unexpected error during sign in:", error);
    throw error;
  }
}

// Sign out function
export async function signOut(): Promise<{ success: boolean }> {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    
    // Clear stored user data
    if (typeof window !== 'undefined') {
      localStorage.removeItem('userEmail');
    }
    
    return { success: true };
  } catch (error) {
    console.error("Sign out failed:", error);
    throw error;
  }
}

// Get current user
export async function getCurrentUser(): Promise<User | null> {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error) {
      console.error("Error getting current user:", error);
      return null;
    }

    return user;
  } catch (error) {
    console.error("Error in getCurrentUser:", error);
    return null;
  }
}

// Confirm payment function
export async function confirmPayment(planType: string): Promise<any> {
  try {
    console.log("Confirming payment for plan:", planType);
    
    const user = await getCurrentUser();
    if (!user) {
      throw new Error("No authenticated user found");
    }

    console.log("Updating user metadata with payment confirmation");
    
    const paymentData: PaymentData = {
      payment_confirmed: true,
      plan_type: planType,
      signup_completed: true,
      payment_date: new Date().toISOString(),
      subscription_status: 'active'
    };
    
    // Update user metadata to confirm payment
    const { data, error } = await supabase.auth.updateUser({
      data: paymentData
    });

    if (error) {
      console.error("Error updating user metadata:", error);
      throw error;
    }

    console.log("Payment confirmation successful:", data);
    return data;
  } catch (error) {
    console.error("Error confirming payment:", error);
    throw error;
  }
}

// Check payment status function
export async function checkPaymentStatus(userEmail: string | null = null): Promise<PaymentStatus> {
  try {
    const user = await getCurrentUser();
    
    if (!user && !userEmail) {
      return { hasPayment: false, planType: null };
    }

    // Check user metadata for payment confirmation
    const paymentConfirmed = user?.user_metadata?.payment_confirmed || 
                           user?.user_metadata?.signup_completed ||
                           false;
    
    const planType = user?.user_metadata?.plan_type || null;
    
    console.log("Payment status check:", { 
      paymentConfirmed, 
      planType,
      userEmail: user?.email || userEmail 
    });

    return {
      hasPayment: paymentConfirmed,
      planType: planType,
      subscriptionStatus: user?.user_metadata?.subscription_status || null,
      paymentDate: user?.user_metadata?.payment_date || null
    };
  } catch (error) {
    console.error("Error checking payment status:", error);
    return { hasPayment: false, planType: null };
  }
}

// Create or update user payment record
export async function createPaymentRecord(planType: string, amount: number | null = null): Promise<any> {
  try {
    const user = await getCurrentUser();
    if (!user) {
      throw new Error("No authenticated user found");
    }

    // For now, we'll store payment info in user metadata
    // In a production app, you might want a separate payments table
    const paymentData: PaymentData = {
      payment_confirmed: true,
      plan_type: planType,
      signup_completed: true,
      payment_date: new Date().toISOString(),
      subscription_status: 'active'
    };

    if (amount) {
      paymentData.payment_amount = amount;
    }

    const { data, error } = await supabase.auth.updateUser({
      data: paymentData
    });

    if (error) {
      console.error("Error creating payment record:", error);
      throw error;
    }

    console.log("Payment record created successfully:", data);
    return data;
  } catch (error) {
    console.error("Error creating payment record:", error);
    throw error;
  }
}

// Get user by email function
export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    // Note: This requires admin privileges in a real app
    // For now, we'll check if the current user matches the email
    const user = await getCurrentUser();
    
    if (user && user.email === email) {
      return user;
    }
    
    return null;
  } catch (error) {
    console.error("Error getting user by email:", error);
    return null;
  }
}

// Initialize auth state listener
export function onAuthStateChange(callback: (event: string, session: any) => void) {
  return supabase.auth.onAuthStateChange((event, session) => {
    console.log("Auth state change:", event, session?.user?.email || 'no user');
    callback(event, session);
  });
}

// Reset password function
export async function resetPassword(email: string): Promise<{ success: boolean }> {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    
    if (error) throw error;
    
    return { success: true };
  } catch (error) {
    console.error("Password reset failed:", error);
    throw error;
  }
}

// Update password function
export async function updatePassword(newPassword: string): Promise<{ success: boolean }> {
  try {
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });
    
    if (error) throw error;
    
    return { success: true };
  } catch (error) {
    console.error("Password update failed:", error);
    throw error;
  }
}

// Export the supabase client for direct use if needed
export default supabase;

