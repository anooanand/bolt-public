import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Ensure that the environment variables are defined
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL and Anon Key are required!');
}

// Create and export the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper functions for user access management
export function isEmailVerified(user: any): boolean {
  return user?.email_confirmed_at !== undefined && user?.email_confirmed_at !== null;
}

export function hasAnyAccess(userProfile: any): boolean {
  return userProfile?.has_access === true || userProfile?.temp_access_until !== undefined;
}

// Export default for compatibility
export default supabase;

