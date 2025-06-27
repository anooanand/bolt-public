// Enhanced payment processing fix for access_management.ts
// This prevents the duplicate payment processing shown in your logs

import { Handler } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase with service role key for server-side operations
const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// ENHANCED: In-memory cache for processed payments (prevents duplicates)
const processedPayments = new Map<string, { timestamp: number; result: any }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// ENHANCED: Cleanup expired cache entries
function cleanupCache() {
  const now = Date.now();
  for (const [key, value] of processedPayments.entries()) {
    if (now - value.timestamp > CACHE_DURATION) {
      processedPayments.delete(key);
    }
  }
}

// ENHANCED: Generate unique payment key
function generatePaymentKey(userId: string, sessionId: string, planType: string): string {
  return `${userId}-${sessionId}-${planType}`.toLowerCase();
}

// ENHANCED: Process payment success with idempotency
async function handleProcessPaymentSuccess(event: any) {
  try {
    const { userId, planType, sessionId } = JSON.parse(event.body || '{}');

    if (!userId || !planType) {
      return {
        statusCode: 400,
        headers: getCorsHeaders(),
        body: JSON.stringify({ error: 'userId and planType are required' }),
      };
    }

    // ENHANCED: Create unique payment key for idempotency
    const paymentKey = generatePaymentKey(userId, sessionId || 'no-session', planType);
    
    // ENHANCED: Check if payment was already processed recently
    cleanupCache();
    const cached = processedPayments.get(paymentKey);
    if (cached) {
      console.log('🔄 Payment already processed recently, returning cached result:', paymentKey);
      return {
        statusCode: 200,
        headers: getCorsHeaders(),
        body: JSON.stringify({
          ...cached.result,
          cached: true,
          message: 'Payment already processed (cached result)'
        }),
      };
    }

    console.log('💳 Processing payment success:', { userId, planType, sessionId, paymentKey });

    // ENHANCED: Add processing lock to prevent race conditions
    const processingKey = `processing-${paymentKey}`;
    if (processedPayments.has(processingKey)) {
      console.log('⏳ Payment currently being processed, waiting...');
      // Wait a bit and check cache again
      await new Promise(resolve => setTimeout(resolve, 1000));
      const newCached = processedPayments.get(paymentKey);
      if (newCached) {
        return {
          statusCode: 200,
          headers: getCorsHeaders(),
          body: JSON.stringify({
            ...newCached.result,
            cached: true,
            message: 'Payment processed while waiting'
          }),
        };
      }
    }

    // Set processing lock
    processedPayments.set(processingKey, { timestamp: Date.now(), result: null });

    try {
      // Use the comprehensive payment success function
      const { data, error } = await supabase.rpc('process_payment_success', {
        p_user_id: userId,
        p_plan_type: planType,
        p_stripe_customer_id: null,
        p_stripe_subscription_id: sessionId
      });

      if (error) {
        console.error('❌ Error processing payment success:', error);
        
        // Fallback to direct updates (only user_profiles table)
        const fallbackResult = await fallbackProcessPayment(userId, planType);
        if (!fallbackResult.success) {
          throw error;
        }
      }

      const result = {
        success: true,
        message: 'Payment success processed, access granted',
        planType: planType,
        processedAt: new Date().toISOString()
      };

      // ENHANCED: Cache the successful result
      processedPayments.set(paymentKey, { timestamp: Date.now(), result });
      
      // Remove processing lock
      processedPayments.delete(processingKey);

      console.log('✅ Payment success processed and cached:', paymentKey);

      return {
        statusCode: 200,
        headers: getCorsHeaders(),
        body: JSON.stringify(result),
      };

    } catch (processingError) {
      // Remove processing lock on error
      processedPayments.delete(processingKey);
      throw processingError;
    }

  } catch (error: any) {
    console.error('❌ Error in handleProcessPaymentSuccess:', error);
    return {
      statusCode: 500,
      headers: getCorsHeaders(),
      body: JSON.stringify({ 
        error: 'Failed to process payment success',
        message: error.message 
      }),
    };
  }
}

// ENHANCED: Fallback payment processing with better error handling
async function fallbackProcessPayment(userId: string, planType: string) {
  try {
    const expiresAt = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(); // 1 year
    
    // Get user email with retry logic
    let userData, userError;
    for (let attempt = 0; attempt < 3; attempt++) {
      const result = await supabase.auth.admin.getUserById(userId);
      userData = result.data;
      userError = result.error;
      
      if (!userError && userData.user) break;
      
      if (attempt < 2) {
        console.log(`Retrying user fetch (attempt ${attempt + 1}/3)...`);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    if (userError || !userData.user) {
      console.error('❌ Error getting user data after retries:', userError);
      return { success: false, error: userError };
    }

    const userEmail = userData.user.email;

    // ENHANCED: Upsert with conflict resolution
    const { error: profileError } = await supabase
      .from('user_profiles')
      .upsert({
        user_id: userId,
        email: userEmail,
        payment_verified: true,
        payment_status: 'verified',
        subscription_status: 'active',
        subscription_plan: planType,
        temp_access_until: expiresAt,
        last_payment_date: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }, { 
        onConflict: 'user_id',
        ignoreDuplicates: false 
      });

    if (profileError) {
      console.error('❌ Fallback profile update error:', profileError);
      return { success: false, error: profileError };
    }

    console.log('✅ Updated user_profiles via fallback - view will reflect changes automatically');
    return { success: true };
  } catch (error) {
    console.error('❌ Fallback process payment error:', error);
    return { success: false, error };
  }
}

// ENHANCED: CORS headers function
function getCorsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Content-Type': 'application/json',
  };
}

// ENHANCED: Main handler with better error handling
const handler: Handler = async (event) => {
  const headers = getCorsHeaders();

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  try {
    const path = event.path.replace('/.netlify/functions/access_management', '');
    const method = event.httpMethod;

    console.log('🔐 Access management request:', { method, path });

    switch (path) {
      case '/process-payment-success':
        if (method === 'POST') {
          return await handleProcessPaymentSuccess(event);
        }
        break;

      // ... other endpoints remain the same

      default:
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ error: 'Endpoint not found' }),
        };
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };

  } catch (error: any) {
    console.error('❌ Access management error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Internal server error',
        message: error.message 
      }),
    };
  }
};

export { handler };

// ENHANCED: Additional utility functions for verification

// Function to manually verify a user's payment status
export async function verifyUserPaymentStatus(userId: string) {
  try {
    const { data, error } = await supabase
      .from('user_access_status')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error verifying payment status:', error);
      return { verified: false, error: error.message };
    }

    const isVerified = data?.payment_verified === true || 
                      data?.subscription_status === 'active' ||
                      (data?.temp_access_until && new Date(data.temp_access_until) > new Date());

    return { 
      verified: isVerified, 
      status: data,
      checkedAt: new Date().toISOString()
    };
  } catch (error) {
    console.error('Payment verification error:', error);
    return { verified: false, error: error.message };
  }
}

// Function to refresh user verification status
export async function refreshUserVerification(userId: string) {
  try {
    // Force refresh by calling the database function
    const { data, error } = await supabase.rpc('user_has_valid_access', {
      p_user_id: userId
    });

    if (error) {
      throw error;
    }

    return { hasAccess: data === true, refreshedAt: new Date().toISOString() };
  } catch (error) {
    console.error('Verification refresh error:', error);
    return { hasAccess: false, error: error.message };
  }
}

