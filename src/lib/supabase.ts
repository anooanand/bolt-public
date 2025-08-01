import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Ensure that the environment variables are defined
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL and Anon Key are required!');
}

// Check if we're in a WebContainer environment that needs proxy
const isWebContainer = window.location.hostname.includes('webcontainer') || 
                      window.location.hostname.includes('credentialless') ||
                      window.location.hostname.includes('staticblitz');

// Create and export the Supabase client with proxy configuration if needed
export const supabase = createClient(
  supabaseUrl, 
  supabaseAnonKey,
  isWebContainer ? {
    global: {
      fetch: async (url, options = {}) => {
        // Check if this is a REST API call that needs proxying
        if (url.toString().includes('/rest/v1/')) {
          const proxyUrl = url.toString().replace(supabaseUrl, '/.netlify/functions/supabase-rest-proxy');
          console.log(`Proxying Supabase REST call: ${url} -> ${proxyUrl}`);
          return fetch(proxyUrl, options);
        }
        // For non-REST calls (auth, etc.), use normal fetch
        return fetch(url, options);
      }
    }
  } : undefined
);

// Helper function to check if email is verified
export function isEmailVerified(user: any): boolean {
  return user?.email_confirmed_at !== undefined && user?.email_confirmed_at !== null;
}

// FIXED: Updated function to properly check user access from database
export async function hasAnyAccess(userId: string): Promise<boolean> {
  try {
    // Query the user_access_status table to check payment verification
    const { data, error } = await supabase
      .from('user_access_status')
      .select('payment_verified, has_access, temp_access_until, manual_override')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error checking user access:', error);
      return false;
    }

    if (!data) {
      return false;
    }

    // Check if user has permanent access (payment verified or manual override)
    if (data.payment_verified || data.manual_override || data.has_access) {
      return true;
    }

    // Check if user has valid temporary access
    if (data.temp_access_until) {
      const tempAccessDate = new Date(data.temp_access_until);
      const now = new Date();
      return tempAccessDate > now;
    }

    return false;
  } catch (error) {
    console.error('Error in hasAnyAccess:', error);
    return false;
  }
}

// FIXED: New function to get detailed user access status
export async function getUserAccessStatus(userId: string) {
  try {
    const { data, error } = await supabase
      .from('user_access_status')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error getting user access status:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in getUserAccessStatus:', error);
    return null;
  }
}

// Export default for compatibility

