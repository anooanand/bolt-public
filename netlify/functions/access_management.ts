import { Handler } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase with service role key for server-side operations
const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

const handler: Handler = async (event) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS' ) {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  try {
    const path = event.path.replace('/.netlify/functions/access-management', '');
    const method = event.httpMethod;

    console.log('🔐 Access management request:', { method, path } );

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

// Grant temporary access to a user
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

    console.log('⏰ Granting temporary access:', { userId, hours, reason });

    // Call the database function to grant temporary access
    const { data, error } = await supabase.rpc('grant_temporary_access', {
      p_user_id: userId,
      p_hours: hours,
      p_reason: reason
    });

    if (error) {
      console.error('❌ Error granting temporary access:', error);
      throw error;
    }

    console.log('✅ Temporary access granted successfully');

    return {
      statusCode: 200,
      headers: getCorsHeaders(),
      body: JSON.stringify({
        success: true,
        message: `Temporary access granted for ${hours} hours`,
        expiresAt: new Date(Date.now() + hours * 60 * 60 * 1000).toISOString()
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

// Check if user has valid access
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

    console.log('🔍 Checking access for user:', userId);

    // Call the database function to check access
    const { data, error } = await supabase.rpc('user_has_valid_access', {
      p_user_id: userId
    });

    if (error) {
      console.error('❌ Error checking access:', error);
      throw error;
    }

    // Get detailed user status
    const { data: userStatus, error: statusError } = await supabase
      .from('user_access_status')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (statusError && statusError.code !== 'PGRST116') {
      console.error('❌ Error getting user status:', statusError);
      throw statusError;
    }

    const hasAccess = data === true;
    console.log('✅ Access check completed:', { userId, hasAccess });

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

// Process payment success (called from frontend)
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

    console.log('💳 Processing payment success:', { userId, planType, sessionId });

    // First, grant temporary access immediately (if still desired as an immediate fallback)
    const { error: tempAccessError } = await supabase.rpc('grant_temporary_access', {
      p_user_id: userId,
      p_hours: 30 * 24,
      p_reason: 'Payment success - awaiting webhook confirmation'
    });

    if (tempAccessError) {
      console.error('❌ Error granting temporary access:', tempAccessError);
      // Don't fail the entire request, just log the error
    }

    // Update user_access_status for permanent access
    const { error: updateAccessError } = await supabase
      .from('user_access_status')
      .upsert({
        id: userId,
        payment_verified: true, // Set to true on successful payment
        subscription_status: 'active', // Set to active
        temp_access_until: null, // Clear temporary access expiration
        has_access: true // Grant permanent access
      }, { onConflict: 'id' });

    if (updateAccessError) {
      console.error('❌ Error updating permanent access status:', updateAccessError);
      // Log but don't fail the request
    }

    // Log the payment success event
    const { error: logError } = await supabase
      .from('payment_logs')
      .insert({
        user_id: userId,
        stripe_session_id: sessionId,
        event_type: 'payment_success_frontend',
        payment_status: 'pending_webhook',
        plan_type: planType,
        metadata: {
          source: 'frontend_callback',
          processed_at: new Date().toISOString()
        }
      });

    if (logError) {
      console.error('❌ Error logging payment success:', logError);
    }

    console.log('✅ Payment success processed');

    return {
      statusCode: 200,
      headers: getCorsHeaders(),
      body: JSON.stringify({
        success: true,
        message: 'Payment success processed, temporary access granted',
        temporaryAccessHours: 30 * 24
      }),
    };

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

// Cleanup expired temporary access
async function handleCleanupExpired(event: any) {
  try {
    console.log('🧹 Cleaning up expired temporary access');

    // Call the database function to cleanup expired access
    const { data, error } = await supabase.rpc('cleanup_expired_temporary_access');

    if (error) {
      console.error('❌ Error cleaning up expired access:', error);
      throw error;
    }

    const cleanedUpCount = data || 0;
    console.log('✅ Cleanup completed:', { cleanedUpCount });

    return {
      statusCode: 200,
      headers: getCorsHeaders(),
      body: JSON.stringify({
        success: true,
        message: `Cleaned up ${cleanedUpCount} expired access records`,
        cleanedUpCount
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

// Get detailed user status
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

    console.log('📊 Getting user status:', userId);

    // Get user access status
    const { data: accessStatus, error: accessError } = await supabase
      .from('user_access_status')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (accessError && accessError.code !== 'PGRST116') {
      console.error('❌ Error getting access status:', accessError);
      throw accessError;
    }

    // Get recent payment logs
    const { data: recentLogs, error: logsError } = await supabase
      .from('payment_logs')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(5);

    if (logsError) {
      console.error('❌ Error getting payment logs:', logsError);
      // Don't fail the request, just log the error
    }

    console.log('✅ User status retrieved');

    return {
      statusCode: 200,
      headers: getCorsHeaders(),
      body: JSON.stringify({
        accessStatus: accessStatus || null,
        recentLogs: recentLogs || [],
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

// Helper function to get CORS headers
function getCorsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Content-Type': 'application/json',
  };
}

export { handler };

