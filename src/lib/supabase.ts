import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase environment variables - using fallback mode');
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co', 
  supabaseAnonKey || 'placeholder-key', 
  {
    auth: {
      storage: localStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  }
);

// FIXED: Much shorter timeout wrapper
const withTimeout = <T>(promise: Promise<T>, timeoutMs: number = 1000): Promise<T> => {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => 
      setTimeout(() => reject(new Error('Operation timed out')), timeoutMs)
    )
  ]);
};

export async function getCurrentUser() {
  try {
    if (!supabaseUrl || !supabaseAnonKey) {
      console.log('No Supabase config - returning null user');
      return null;
    }

    const { data: sessionData, error: sessionError } = await withTimeout(
      supabase.auth.getSession(),
      800
    );
    
    if (sessionError) {
      console.error('Error getting session:', sessionError);
      return null;
    }

    if (!sessionData.session) {
      console.log('No active session found');
      return null;
    }

    const { data: { user }, error } = await withTimeout(
      supabase.auth.getUser(),
      800
    );

    if (error) {
      console.error('Error getting current user:', error);
      return null;
    }

    return user;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

// Enhanced temporary access check
export async function hasTemporaryAccess(): Promise<boolean> {
  try {
    const tempAccessUntil = localStorage.getItem('temp_access_until');
    const paymentProcessing = localStorage.getItem('payment_processing');
    const paymentPlan = localStorage.getItem('payment_plan');
    
    if (!tempAccessUntil) {
      console.log('[DEBUG] No temp access timestamp found');
      return false;
    }
    
    const expiryDate = new Date(tempAccessUntil);
    const now = new Date();
    const isValid = expiryDate > now;
    
    // Calculate time remaining
    const timeRemaining = expiryDate.getTime() - now.getTime();
    const hoursRemaining = Math.floor(timeRemaining / (1000 * 60 * 60));
    const minutesRemaining = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    
    console.log('[DEBUG] Temp access check:', {
      expiryDate: expiryDate.toISOString(),
      now: now.toISOString(),
      isValid,
      paymentProcessing,
      paymentPlan,
      timeRemaining: isValid ? `${hoursRemaining}h ${minutesRemaining}m` : 'Expired'
    });
    
    if (!isValid) {
      // Clean up expired access
      console.log('[DEBUG] Cleaning up expired temporary access');
      localStorage.removeItem('temp_access_until');
      localStorage.removeItem('payment_processing');
      localStorage.removeItem('payment_plan');
    }
    
    return isValid;
  } catch (error) {
    console.error('[DEBUG] Error checking temporary access:', error);
    return false;
  }
}

// Get temporary access info for UI display
export async function getTemporaryAccessInfo(): Promise<{
  hasAccess: boolean;
  expiryDate?: Date;
  timeRemaining?: string;
  paymentPlan?: string;
} | null> {
  try {
    const tempAccessUntil = localStorage.getItem('temp_access_until');
    const paymentPlan = localStorage.getItem('payment_plan');
    
    if (!tempAccessUntil) {
      return null;
    }
    
    const expiryDate = new Date(tempAccessUntil);
    const now = new Date();
    const hasAccess = expiryDate > now;
    
    if (!hasAccess) {
      return { hasAccess: false };
    }
    
    const timeRemaining = expiryDate.getTime() - now.getTime();
    const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    
    return {
      hasAccess,
      expiryDate,
      timeRemaining: `${hours}h ${minutes}m`,
      paymentPlan: paymentPlan || undefined
    };
  } catch (error) {
    console.error('[DEBUG] Error getting temporary access info:', error);
    return null;
  }
}

// Updated payment completion check
export async function hasCompletedPayment(): Promise<boolean> {
  try {
    // FIRST: Check temporary access (highest priority)
    const hasTemp = await hasTemporaryAccess();
    if (hasTemp) {
      console.log('[DEBUG] User has valid temporary access');
      return true;
    }
    
    // SECOND: Check permanent payment confirmation
    const localPaymentStatus = localStorage.getItem('payment_confirmed');
    const localUserEmail = localStorage.getItem('userEmail');
    
    if (localPaymentStatus === 'true' && localUserEmail) {
      console.log('[DEBUG] User has permanent payment confirmation for:', localUserEmail);
      return true;
    }
    
    // THIRD: Check Supabase (with timeout)
    try {
      const { data: { session }, error } = await withTimeout(
        supabase.auth.getSession(),
        3000 // 3 second timeout
      );
      
      if (!error && session?.user) {
        const paymentConfirmed = session.user.user_metadata?.payment_confirmed === true;
        const userEmail = session.user.email;
        
        console.log('[DEBUG] Supabase payment check for user:', userEmail, 'payment_confirmed:', paymentConfirmed);
        
        if (paymentConfirmed) {
          // Cache the result for faster future checks
          localStorage.setItem('payment_confirmed', 'true');
          localStorage.setItem('userEmail', userEmail || '');
          return true;
        }
      }
    } catch (dbError) {
      console.warn('[DEBUG] Database check failed, using local storage only:', dbError);
    }
    
    return false;
  } catch (error) {
    console.error('[DEBUG] Error in hasCompletedPayment:', error);
    return false;
  }
}

export async function signUp(email: string, password: string) {
  try {
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Supabase configuration is missing');
    }

    console.log("[DEBUG] Attempting sign up for:", email);

    const { data, error } = await withTimeout(
      supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            payment_confirmed: false,
            subscription_status: 'pending',
            created_at: new Date().toISOString()
          }
        }
      }),
      2500
    );

    if (error) {
      console.error("[DEBUG] Sign up failed:", error.message);
      throw error;
    }

    if (data.user) {
      console.log("[DEBUG] Sign up successful:", email);
      localStorage.setItem('userEmail', email);
      // FIXED: Explicitly set payment as not confirmed for new users
      localStorage.setItem('payment_confirmed', 'false');
      
      // Don't set temporary access on signup - only on payment
      console.log("[DEBUG] User signed up successfully, no temporary access granted yet");
      
      return { data, success: true, user: data.user };
    } else {
      throw new Error("Sign up failed: No user data returned");
    }
  } catch (error) {
    console.error("[DEBUG] Sign up failed:", error);
    return { error, success: false };
  }
}

export async function signIn(email: string, password: string) {
  try {
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Supabase configuration is missing');
    }

    console.log("[DEBUG] Attempting sign in for:", email);

    if (typeof window !== 'undefined') {
      localStorage.setItem('userEmail', email);
    }

    const { data, error } = await withTimeout(
      supabase.auth.signInWithPassword({ email, password }),
      2500
    );

    if (error) {
      console.error("[DEBUG] Sign in failed:", error.message);
      return { error };
    }

    if (data.user) {
      console.log("[DEBUG] Sign in successful:", email);
      
      // Check and cache payment status on sign in
      const paymentConfirmed = data.user.user_metadata?.payment_confirmed === true;
      localStorage.setItem('payment_confirmed', paymentConfirmed ? 'true' : 'false');
      
      // Check for temporary access from user metadata
      const tempAccessUntil = data.user.user_metadata?.temp_access_until;
      if (tempAccessUntil) {
        localStorage.setItem('temp_access_until', tempAccessUntil);
        console.log('[DEBUG] Restored temporary access from user metadata until:', tempAccessUntil);
      }
      
      console.log('[DEBUG] Sign in complete, payment status:', paymentConfirmed ? 'confirmed' : 'pending');
      
      return data;
    } else {
      throw new Error("Sign in failed: No user data returned");
    }
  } catch (error) {
    console.error("[DEBUG] Sign in failed:", error);
    throw error;
  }
}

export async function signOut() {
  try {
    console.log("[DEBUG] Attempting sign out");

    if (typeof window !== 'undefined') {
      // Clear payment-related localStorage but preserve some session info temporarily
      const userEmail = localStorage.getItem('userEmail');
      
      localStorage.removeItem('userEmail');
      localStorage.removeItem('payment_confirmed');
      localStorage.removeItem('temp_access_until');
      localStorage.removeItem('payment_processing');
      localStorage.removeItem('payment_plan');
      localStorage.removeItem('payment_date');
      localStorage.removeItem('subscription_status');
      
      console.log('[DEBUG] Cleared localStorage for user:', userEmail);
    }

    const { error } = await withTimeout(
      supabase.auth.signOut(),
      1500
    );

    if (error) {
      console.error("[DEBUG] Sign out failed:", error);
      throw error;
    }

    console.log("[DEBUG] Sign out successful");
    return { success: true };
  } catch (error) {
    console.error("[DEBUG] Sign out failed:", error);
    // Don't throw on sign out failure - just clear local state
    if (typeof window !== 'undefined') {
      localStorage.clear();
    }
    return { success: true };
  }
}

export async function requestPasswordReset(email: string) {
  try {
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Supabase configuration is missing');
    }

    console.log("[DEBUG] Requesting password reset for:", email);

    const { data, error } = await withTimeout(
      supabase.auth.resetPasswordForEmail(email),
      2500
    );
    
    if (error) {
      console.error("[DEBUG] Password reset request failed:", error.message);
      throw new Error(error.message);
    }

    console.log("[DEBUG] Password reset request successful:", email);
    return { success: true };
  } catch (error) {
    console.error("[DEBUG] Password reset request failed:", error);
    throw error;
  }
}

// Enhanced payment confirmation with better error handling
export async function confirmPayment(planType: string) {
  try {
    console.log("[DEBUG] Confirming payment for plan:", planType);

    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
      throw new Error("No user email found in localStorage");
    }

    // Set payment confirmation in localStorage immediately
    localStorage.setItem('payment_confirmed', 'true');
    localStorage.setItem('payment_plan', planType);
    localStorage.setItem('payment_date', new Date().toISOString());
    localStorage.setItem('subscription_status', 'active');
    
    // Set temporary access flag (24 hours) - this ensures access even if DB sync fails
    const expiryTime = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
    localStorage.setItem('temp_access_until', expiryTime);
    localStorage.setItem('payment_processing', 'true');

    console.log("[DEBUG] Payment confirmed locally for user:", userEmail, "plan:", planType);
    console.log("[DEBUG] Temporary access granted until:", expiryTime);

    // Try to sync with Supabase in background (non-blocking)
    try {
      const { data: { session }, error: sessionError } = await withTimeout(
        supabase.auth.getSession(),
        1000 // Short timeout for background sync
      );
      
      if (!sessionError && session?.user) {
        console.log("[DEBUG] Attempting to sync payment with Supabase...");
        
        // Non-blocking Supabase update (fire and forget)
        supabase.auth.updateUser({
          data: {
            payment_confirmed: true,
            plan_type: planType,
            payment_date: new Date().toISOString(),
            subscription_status: 'active',
            temp_access_until: expiryTime
          }
        }).then(() => {
          console.log("[DEBUG] Payment synced with Supabase successfully");
        }).catch((error) => {
          console.warn("[DEBUG] Failed to sync payment with Supabase (non-critical):", error);
        });
      } else {
        console.warn("[DEBUG] No session for Supabase sync, using local storage only");
      }
    } catch (syncError) {
      console.warn("[DEBUG] Supabase sync failed (non-critical):", syncError);
    }

    return {
      success: true,
      user: { email: userEmail },
      plan: planType,
      paymentDate: new Date().toISOString(),
      tempAccessUntil: expiryTime
    };
  } catch (error) {
    console.error("[DEBUG] Error confirming payment:", error);
    throw error;
  }
}

// New function to extend temporary access (for manual verification process)
export async function extendTemporaryAccess(additionalHours: number = 24): Promise<boolean> {
  try {
    const currentExpiry = localStorage.getItem('temp_access_until');
    const userEmail = localStorage.getItem('userEmail');
    
    if (!userEmail) {
      console.warn('[DEBUG] Cannot extend access - no user email found');
      return false;
    }
    
    // Calculate new expiry time
    const baseTime = currentExpiry ? new Date(currentExpiry) : new Date();
    const newExpiry = new Date(baseTime.getTime() + (additionalHours * 60 * 60 * 1000));
    
    localStorage.setItem('temp_access_until', newExpiry.toISOString());
    console.log(`[DEBUG] Extended temporary access for ${userEmail} until:`, newExpiry.toISOString());
    
    return true;
  } catch (error) {
    console.error('[DEBUG] Error extending temporary access:', error);
    return false;
  }
}

// New function to revoke temporary access (for cleanup)
export async function revokeTemporaryAccess(): Promise<boolean> {
  try {
    const userEmail = localStorage.getItem('userEmail');
    
    localStorage.removeItem('temp_access_until');
    localStorage.removeItem('payment_processing');
    localStorage.removeItem('payment_plan');
    
    console.log('[DEBUG] Revoked temporary access for user:', userEmail);
    return true;
  } catch (error) {
    console.error('[DEBUG] Error revoking temporary access:', error);
    return false;
  }
}

export async function forceSignOut() {
  try {
    console.log("[DEBUG] Force signing out all sessions");

    if (typeof window !== 'undefined') {
      // Clear all localStorage
      localStorage.clear();
    }

    try {
      await withTimeout(
        supabase.auth.signOut({ scope: 'global' }),
        800
      );
    } catch (signOutError) {
      console.warn("[DEBUG] Sign out API call failed, but continuing with local cleanup");
    }

    console.log("[DEBUG] Force sign out completed");

    if (typeof window !== 'undefined') {
      window.location.reload();
    }

    return { success: true };
  } catch (error) {
    console.error("[DEBUG] Force sign out exception:", error);
    // Always succeed for force sign out
    if (typeof window !== 'undefined') {
      localStorage.clear();
      window.location.reload();
    }
    return { success: true };
  }
}

// Utility function to get user's payment status summary
export async function getPaymentStatusSummary(): Promise<{
  hasAccess: boolean;
  accessType: 'none' | 'temporary' | 'permanent';
  userEmail?: string;
  expiryInfo?: string;
  planType?: string;
}> {
  try {
    const userEmail = localStorage.getItem('userEmail');
    const hasTemp = await hasTemporaryAccess();
    const hasPermanent = localStorage.getItem('payment_confirmed') === 'true';
    
    if (hasPermanent) {
      return {
        hasAccess: true,
        accessType: 'permanent',
        userEmail: userEmail || undefined,
        planType: localStorage.getItem('payment_plan') || undefined
      };
    }
    
    if (hasTemp) {
      const tempInfo = await getTemporaryAccessInfo();
      return {
        hasAccess: true,
        accessType: 'temporary',
        userEmail: userEmail || undefined,
        expiryInfo: tempInfo?.timeRemaining,
        planType: tempInfo?.paymentPlan
      };
    }
    
    return {
      hasAccess: false,
      accessType: 'none',
      userEmail: userEmail || undefined
    };
  } catch (error) {
    console.error('[DEBUG] Error getting payment status summary:', error);
    return {
      hasAccess: false,
      accessType: 'none'
    };
  }
}