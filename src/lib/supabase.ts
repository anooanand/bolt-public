// COMPLETE FILE: src/lib/supabase.ts
// Copy-paste this entire file into bolt.new

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ENHANCED: Temporary access functions
export const grantTemporaryAccess = async (userId: string, planType: string = 'base_plan') => {
  try {
    console.log('🚀 Granting 24-hour temporary access for user:', userId);
    
    // Set 24-hour temporary access
    const tempAccessUntil = new Date();
    tempAccessUntil.setHours(tempAccessUntil.getHours() + 24);
    
    // Update user_profiles with temporary access
    const { error: profileError } = await supabase
      .from('user_profiles')
      .upsert({
        user_id: userId,
        payment_status: 'processing',
        payment_verified: false,
        temporary_access_granted: true,
        temp_access_until: tempAccessUntil.toISOString(),
        subscription_status: 'temp_active',
        subscription_plan: planType,
        updated_at: new Date().toISOString()
      }, { onConflict: 'user_id' });

    if (profileError) throw profileError;

    // Update user_access_status with temporary access
    const { error: accessError } = await supabase
      .from('user_access_status')
      .upsert({
        id: userId,
        email_verified: true,
        payment_verified: false,
        subscription_status: 'temp_active',
        has_access: true,
        access_type: 'Temporary access (24 hours)',
        temp_access_until: tempAccessUntil.toISOString()
      }, { onConflict: 'id' });

    if (accessError) throw accessError;

    // Store in localStorage for immediate UI update
    localStorage.setItem('temp_access_granted', 'true');
    localStorage.setItem('temp_access_until', tempAccessUntil.toISOString());
    localStorage.setItem('temp_access_plan', planType);
    
    console.log('✅ 24-hour temporary access granted until:', tempAccessUntil);
    return { success: true, tempAccessUntil };
    
  } catch (error) {
    console.error('❌ Error granting temporary access:', error);
    return { success: false, error };
  }
};

// ENHANCED: Check if user has any access (temporary or permanent)
export const hasAnyAccess = async (userId: string): Promise<boolean> => {
  try {
    // Check localStorage first for immediate response
    const tempAccess = localStorage.getItem('temp_access_granted');
    const tempUntil = localStorage.getItem('temp_access_until');
    
    if (tempAccess === 'true' && tempUntil) {
      const tempDate = new Date(tempUntil);
      if (tempDate > new Date()) {
        console.log('✅ Temporary access valid until:', tempDate);
        return true;
      } else {
        // Temporary access expired, clean up
        localStorage.removeItem('temp_access_granted');
        localStorage.removeItem('temp_access_until');
        localStorage.removeItem('temp_access_plan');
      }
    }
    
    // Check database for permanent access
    const { data: accessData } = await supabase
      .from('user_access_status')
      .select('has_access, payment_verified, temp_access_until')
      .eq('id', userId)
      .single();
    
    if (accessData?.has_access) {
      console.log('✅ Database access confirmed');
      return true;
    }
    
    // Check if temporary access is still valid in database
    if (accessData?.temp_access_until) {
      const tempDate = new Date(accessData.temp_access_until);
      if (tempDate > new Date()) {
        console.log('✅ Database temporary access valid');
        return true;
      }
    }
    
    console.log('❌ No valid access found');
    return false;
    
  } catch (error) {
    console.error('❌ Error checking access:', error);
    return false;
  }
};

// NEW: Check if user has temporary access specifically
export const hasTemporaryAccess = async (): Promise<boolean> => {
  try {
    // Check localStorage first for immediate response
    const tempAccess = localStorage.getItem('temp_access_granted');
    const tempUntil = localStorage.getItem('temp_access_until');
    
    if (tempAccess === 'true' && tempUntil) {
      const tempDate = new Date(tempUntil);
      if (tempDate > new Date()) {
        console.log('✅ 24-hour temporary access valid until:', tempDate);
        return true;
      } else {
        // Temporary access expired, clean up
        localStorage.removeItem('temp_access_granted');
        localStorage.removeItem('temp_access_until');
        localStorage.removeItem('temp_access_plan');
        console.log('⏰ Temporary access expired');
      }
    }
    
    // Check database for temporary access
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;
    
    const { data: accessData } = await supabase
      .from('user_access_status')
      .select('temp_access_until')
      .eq('id', user.id)
      .single();
    
    if (accessData?.temp_access_until) {
      const tempDate = new Date(accessData.temp_access_until);
      if (tempDate > new Date()) {
        console.log('✅ Database temporary access valid until:', tempDate);
        return true;
      }
    }
    
    return false;
  } catch (error) {
    console.error('❌ Error checking temporary access:', error);
    return false;
  }
};

// NEW: Check if user has completed payment (permanent or temporary)
export const hasCompletedPayment = async (): Promise<boolean> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;
    
    // Check for temporary access first (immediate after payment)
    const tempAccess = await hasTemporaryAccess();
    if (tempAccess) {
      console.log('✅ User has 24-hour temporary access (payment completed)');
      return true;
    }
    
    // Check user_profiles for payment verification
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('payment_verified, subscription_status, manual_override')
      .eq('user_id', user.id)
      .single();
    
    if (profile?.payment_verified === true || 
        profile?.subscription_status === 'active' ||
        profile?.manual_override === true) {
      console.log('✅ Payment verified or manual override');
      return true;
    }
    
    // Check user_access_status for access
    const { data: accessData } = await supabase
      .from('user_access_status')
      .select('has_access, payment_verified')
      .eq('id', user.id)
      .single();
    
    if (accessData?.has_access === true || accessData?.payment_verified === true) {
      console.log('✅ Access confirmed via user_access_status');
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('❌ Error checking payment completion:', error);
    return false;
  }
};

// ENHANCED: Email verification with temporary access support
export const isEmailVerified = async (userId?: string): Promise<boolean> => {
  try {
    if (!userId) {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return false;
      userId = user.id;
    }

    // Check if user has any access (temporary or permanent)
    const hasAccess = await hasAnyAccess(userId);
    if (hasAccess) {
      console.log('✅ User has access (temporary or permanent)');
      return true;
    }

    // Original email verification logic as fallback
    const { data: { user } } = await supabase.auth.getUser();
    if (user?.email_confirmed_at) {
      console.log('✅ Email verified via auth.users');
      return true;
    }

    // Fallback: Check user_access_status table
    const { data: accessStatus } = await supabase
      .from('user_access_status')
      .select('email_verified')
      .eq('id', userId)
      .single();

    if (accessStatus?.email_verified) {
      console.log('✅ Email verified via user_access_status');
      return true;
    }

    // Final fallback: Check user_profiles manual override
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('manual_override')
      .eq('user_id', userId)
      .single();

    if (profile?.manual_override) {
      console.log('✅ Email verified via manual override');
      return true;
    }

    console.log('❌ Email not verified');
    return false;
    
  } catch (error) {
    console.error('❌ Error checking email verification:', error);
    return false;
  }
};

// Enhanced signup function
export const signUp = async (email: string, password: string) => {
  try {
    console.log('🔐 Starting signup process for:', email);
    
    // Create auth user first
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      console.error('❌ Auth signup error:', authError);
      throw authError;
    }

    if (!authData.user) {
      throw new Error('No user returned from signup');
    }

    console.log('✅ Auth user created:', authData.user.id);

    // Create user profile
    const { error: profileError } = await supabase
      .from('user_profiles')
      .insert({
        user_id: authData.user.id,
        email: email,
        payment_status: 'pending',
        payment_verified: false,
        subscription_status: 'free',
        role: 'user',
        temporary_access_granted: false,
        manual_override: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });

    if (profileError) {
      console.error('❌ Profile creation error:', profileError);
      // Don't throw here, auth user is already created
    } else {
      console.log('✅ User profile created');
    }

    // Create user access status
    const { error: accessError } = await supabase
      .from('user_access_status')
      .insert({
        id: authData.user.id,
        email: email,
        email_verified: false,
        payment_verified: false,
        subscription_status: 'free',
        has_access: false,
        access_type: 'Free trial',
        created_at: new Date().toISOString()
      });

    if (accessError) {
      console.error('❌ Access status creation error:', accessError);
      // Don't throw here, auth user is already created
    } else {
      console.log('✅ User access status created');
    }

    return { data: authData, error: null };
    
  } catch (error) {
    console.error('❌ Signup process error:', error);
    return { data: null, error };
  }
};

// Enhanced signin function
export const signIn = async (email: string, password: string) => {
  try {
    console.log('🔐 Starting signin process for:', email);
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('❌ Signin error:', error);
      throw error;
    }

    console.log('✅ User signed in successfully');
    return { data, error: null };
    
  } catch (error) {
    console.error('❌ Signin process error:', error);
    return { data: null, error };
  }
};

// Sign out function
export const signOut = async () => {
  try {
    // Clear temporary access from localStorage
    localStorage.removeItem('temp_access_granted');
    localStorage.removeItem('temp_access_until');
    localStorage.removeItem('temp_access_plan');
    
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    
    console.log('✅ User signed out successfully');
    return { error: null };
    
  } catch (error) {
    console.error('❌ Signout error:', error);
    return { error };
  }
};

