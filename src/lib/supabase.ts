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
        id: userId, // Standardize to 'id' matching auth.users.id
        payment_status: 'processing',
        payment_verified: false,
        temporary_access_granted: true,
        temp_access_until: tempAccessUntil.toISOString(),
        subscription_status: 'temp_active',
        subscription_plan: planType,
        updated_at: new Date().toISOString()
      }, { onConflict: 'id' }); // Conflict on 'id'

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

    console.log('✅ Temporary access granted successfully.');
    return { success: true };
  } catch (error) {
    console.error('❌ Error granting temporary access:', error);
    return { success: false, error };
  }
};

// Email verification function
export const isEmailVerified = async (userId: string): Promise<boolean> => {
  try {
    console.log('🔍 Checking email verification for user:', userId);
    
    // Check if user exists in auth.users and email is confirmed
    const { data: authUser, error: authError } = await supabase.auth.getUser();
    
    if (authError || !authUser.user) {
      console.log('❌ No authenticated user found');
      return false;
    }

    // Check if email is confirmed in auth.users
    const isEmailConfirmed = authUser.user.email_confirmed_at !== null;
    console.log('📧 Email confirmation status:', isEmailConfirmed);
    
    return isEmailConfirmed;
  } catch (error) {
    console.error('❌ Error checking email verification:', error);
    return false;
  }
};

// Check if user has any access (temporary or permanent)
export const hasAnyAccess = async (userId: string): Promise<boolean> => {
  try {
    console.log('🔍 Checking access status for user:', userId);
    
    // First check user_profiles table
    const { data: profile, error: profileError } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (profileError && profileError.code !== 'PGRST116') {
      console.error('❌ Error fetching user profile:', profileError);
      return false;
    }

    if (profile) {
      // Check for temporary access
      if (profile.temporary_access_granted && profile.temp_access_until) {
        const tempAccessUntil = new Date(profile.temp_access_until);
        const now = new Date();
        
        if (tempAccessUntil > now) {
          console.log('✅ User has valid temporary access until:', tempAccessUntil);
          return true;
        } else {
          console.log('⏰ Temporary access expired at:', tempAccessUntil);
        }
      }

      // Check for permanent access
      if (profile.payment_verified && 
          (profile.subscription_status === 'active' || 
           profile.subscription_status === 'temp_active')) {
        console.log('✅ User has permanent access');
        return true;
      }

      // Check manual override
      if (profile.manual_override) {
        console.log('✅ User has manual override access');
        return true;
      }
    }

    // Also check user_access_status table if it exists
    const { data: accessStatus, error: accessError } = await supabase
      .from('user_access_status')
      .select('*')
      .eq('id', userId)
      .single();

    if (!accessError && accessStatus) {
      if (accessStatus.has_access) {
        // Check if temporary access is still valid
        if (accessStatus.temp_access_until) {
          const tempAccessUntil = new Date(accessStatus.temp_access_until);
          const now = new Date();
          
          if (tempAccessUntil > now) {
            console.log('✅ User has valid access via access_status table');
            return true;
          }
        } else if (accessStatus.payment_verified) {
          console.log('✅ User has permanent access via access_status table');
          return true;
        }
      }
    }

    console.log('❌ User does not have access');
    return false;
  } catch (error) {
    console.error('❌ Error checking access status:', error);
    return false;
  }
};

// Check user payment status
export const checkPaymentStatus = async (userId: string) => {
  try {
    console.log('💳 Checking payment status for user:', userId);
    
    const { data: profile, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('❌ Error fetching payment status:', error);
      return { verified: false, status: 'error' };
    }

    return {
      verified: profile?.payment_verified || false,
      status: profile?.payment_status || 'pending',
      subscriptionStatus: profile?.subscription_status || 'free',
      hasTemporaryAccess: profile?.temporary_access_granted || false,
      tempAccessUntil: profile?.temp_access_until
    };
  } catch (error) {
    console.error('❌ Error checking payment status:', error);
    return { verified: false, status: 'error' };
  }
};

