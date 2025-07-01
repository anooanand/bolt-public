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

// ENHANCED: CORS headers function
function getCorsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Content-Type': 'application/json',
  };
}

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

    switch (path) {
      case '/grant-temporary-access':
        if (method === 'POST') {
          return await handleGrantTemporaryAccess(event);
        }
        break;

      case '/check-access':
        if (method === 'POST') {
          return await handleCheckAccess(event);
        }
        break;

      case '/process-payment-success':
        if (method === 'POST') {
          return await handleProcessPaymentSuccess(event);
        }
        break;

      case '/cleanup-expired':
        if (method === 'POST') {
          return await handleCleanupExpired(event);
        }
        break;

      case '/user-status':
        if (method === 'POST') {
          return await handleGetUserStatus(event);
        }
        break;

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

// FIXED: Payment processing without user_id field
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
      return {
        statusCode: 200,
        headers: getCorsHeaders(),
        body: JSON.stringify({
          ...cached.result,
          cached: true,
          message: 'Payment already processed'
        }),
      };
    }

    // ENHANCED: Reduced logging - only log essential info
    console.log('💳 Processing payment:', { userId: userId.substring(0, 8) + '...', planType });

    // ENHANCED: Add processing lock
    const processingKey = `processing-${paymentKey}`;
    if (processedPayments.has(processingKey)) {
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
      // ENHANCED: Set 30-day access period (not 1 year)
      const thirtyDaysFromNow = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
      
      // Get user email
      const { data: userData, error: userError } = await supabase.auth.admin.getUserById(userId);
      if (userError || !userData.user) {
        throw new Error('User not found');
      }

      const userEmail = userData.user.email;

      // FIXED: Direct database update without user_id field
      const { error: profileError } = await supabase
        .from('user_profiles')
        .upsert({
          id: userId, // FIXED: Use 'id' instead of 'user_id'
          email: userEmail,
          payment_verified: true,
          payment_status: 'verified',
          subscription_status: 'active',
          subscription_plan: planType,
          current_period_end: thirtyDaysFromNow, // 30 days from now
          temp_access_until: thirtyDaysFromNow,   // 30 days from now
          last_payment_date: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }, { 
          onConflict: 'email', // FIXED: Use email as conflict resolution
          ignoreDuplicates: false 
        });

      if (profileError) {
        throw profileError;
      }

      const result = {
        success: true,
        message: 'Payment processed successfully',
        planType: planType,
        accessUntil: thirtyDaysFromNow,
        processedAt: new Date().toISOString()
      };

      // Cache the successful result
      processedPayments.set(paymentKey, { timestamp: Date.now(), result });
      
      // Remove processing lock
      processedPayments.delete(processingKey);

      console.log('✅ Payment processed successfully');

      return {
        statusCode: 200,
        headers: getCorsHeaders(),
        body: JSON.stringify(result),
      };

    } catch (processingError) {
      processedPayments.delete(processingKey);
      throw processingError;
    }

  } catch (error: any) {
    console.error('❌ Payment processing error:', error.message);
    return {
      statusCode: 500,
      headers: getCorsHeaders(),
      body: JSON.stringify({ 
        error: 'Failed to process payment',
        message: error.message 
      }),
    };
  }
}

// FIXED: Grant temporary access function without user_id
async function handleGrantTemporaryAccess(event: any) {
  try {
    const { userId, hours = 24, reason = 'Manual grant' } = JSON.parse(event.body || '{}');

    if (!userId) {
      return {
        statusCode: 400,
        headers: getCorsHeaders(),
        body: JSON.stringify({ error: 'userId is required' }),
      };
    }

    const expiresAt = new Date(Date.now() + hours * 60 * 60 * 1000).toISOString();
    
    // Get user email
    const { data: userData, error: userError } = await supabase.auth.admin.getUserById(userId);
    if (userError || !userData.user) {
      return {
        statusCode: 400,
        headers: getCorsHeaders(),
        body: JSON.stringify({ error: 'User not found' }),
      };
    }

    const userEmail = userData.user.email;

    // FIXED: Update user_profiles table without user_id field
    const { error: profileError } = await supabase
      .from('user_profiles')
      .upsert({
        id: userId, // FIXED: Use 'id' instead of 'user_id'
        email: userEmail,
        temporary_access_granted: true,
        temp_access_until: expiresAt,
        updated_at: new Date().toISOString()
      }, { onConflict: 'email' }); // FIXED: Use email as conflict resolution

    if (profileError) {
      console.error('❌ Error granting temporary access:', profileError);
      return {
        statusCode: 500,
        headers: getCorsHeaders(),
        body: JSON.stringify({ 
          error: 'Failed to grant temporary access',
          message: profileError.message 
        }),
      };
    }

    return {
      statusCode: 200,
      headers: getCorsHeaders(),
      body: JSON.stringify({
        success: true,
        message: `Temporary access granted for ${hours} hours`,
        expiresAt: expiresAt
      }),
    };

  } catch (error: any) {
    console.error('❌ Error in handleGrantTemporaryAccess:', error);
    return {
      statusCode: 500,
      headers: getCorsHeaders(),
      body: JSON.stringify({ 
        error: 'Failed to grant temporary access',
        message: error.message 
      }),
    };
  }
}

// FIXED: Check access function without user_id
async function handleCheckAccess(event: any) {
  try {
    const { userId } = JSON.parse(event.body || '{}');

    if (!userId) {
      return {
        statusCode: 400,
        headers: getCorsHeaders(),
        body: JSON.stringify({ error: 'userId is required' }),
      };
    }

    // FIXED: Get detailed user status by id instead of user_id
    const { data: userStatus, error: statusError } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId) // FIXED: Use 'id' instead of 'user_id'
      .single();

    if (statusError && statusError.code !== 'PGRST116') {
      console.error('❌ Error getting user status:', statusError);
      return {
        statusCode: 500,
        headers: getCorsHeaders(),
        body: JSON.stringify({ 
          error: 'Failed to check access',
          message: statusError.message 
        }),
      };
    }

    // Check if user has valid access
    const hasAccess = userStatus?.subscription_status === 'active' ||
                     userStatus?.payment_verified === true ||
                     (userStatus?.current_period_end && new Date(userStatus.current_period_end) > new Date()) ||
                     (userStatus?.temp_access_until && new Date(userStatus.temp_access_until) > new Date());

    return {
      statusCode: 200,
      headers: getCorsHeaders(),
      body: JSON.stringify({
        hasAccess,
        userStatus: userStatus || null,
        checkedAt: new Date().toISOString()
      }),
    };

  } catch (error: any) {
    console.error('❌ Error in handleCheckAccess:', error);
    return {
      statusCode: 500,
      headers: getCorsHeaders(),
      body: JSON.stringify({ 
        error: 'Failed to check access',
        message: error.message 
      }),
    };
  }
}

// Cleanup expired temporary access
async function handleCleanupExpired(event: any) {
  try {
    const now = new Date().toISOString();
    
    const { error } = await supabase
      .from('user_profiles')
      .update({
        temporary_access_granted: false,
        temp_access_until: null,
        updated_at: now
      })
      .lt('temp_access_until', now)
      .eq('temporary_access_granted', true);

    if (error) {
      throw error;
    }

    return {
      statusCode: 200,
      headers: getCorsHeaders(),
      body: JSON.stringify({
        success: true,
        message: 'Expired access cleaned up',
        cleanedAt: now
      }),
    };

  } catch (error: any) {
    console.error('❌ Error in handleCleanupExpired:', error);
    return {
      statusCode: 500,
      headers: getCorsHeaders(),
      body: JSON.stringify({ 
        error: 'Failed to cleanup expired access',
        message: error.message 
      }),
    };
  }
}

// FIXED: Get user status without user_id
async function handleGetUserStatus(event: any) {
  try {
    const { userId } = JSON.parse(event.body || '{}');

    if (!userId) {
      return {
        statusCode: 400,
        headers: getCorsHeaders(),
        body: JSON.stringify({ error: 'userId is required' }),
      };
    }

    // FIXED: Query by id instead of user_id
    const { data: userStatus, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId) // FIXED: Use 'id' instead of 'user_id'
      .single();

    if (error && error.code !== 'PGRST116') {
      throw error;
    }

    return {
      statusCode: 200,
      headers: getCorsHeaders(),
      body: JSON.stringify({
        userStatus: userStatus || null,
        retrievedAt: new Date().toISOString()
      }),
    };

  } catch (error: any) {
    console.error('❌ Error in handleGetUserStatus:', error);
    return {
      statusCode: 500,
      headers: getCorsHeaders(),
      body: JSON.stringify({ 
        error: 'Failed to get user status',
        message: error.message 
      }),
    };
  }
}

export { handler };

