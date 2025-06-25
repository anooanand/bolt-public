import { Handler } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase with service role key for server-side operations
const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

const handler: Handler = async (event) => {
  // Enhanced CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Content-Type': 'application/json',
  };

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

// Enhanced grant temporary access function
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
      
      // Fallback: Direct table update if function fails
      const fallbackResult = await fallbackGrantAccess(userId, hours);
      if (!fallbackResult.success) {
        throw error;
      }
      
      console.log('✅ Temporary access granted via fallback method');
    } else {
      console.log('✅ Temporary access granted successfully via database function');
    }

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

// Fallback function for direct database access
async function fallbackGrantAccess(userId: string, hours: number) {
  try {
    const expiresAt = new Date(Date.now() + hours * 60 * 60 * 1000).toISOString();
    
    // Update user_profiles
    const { error: profileError } = await supabase
      .from('user_profiles')
      .upsert({
        user_id: userId,
        temporary_access_granted: true,
        temp_access_until: expiresAt,
        updated_at: new Date().toISOString()
      }, { onConflict: 'user_id' });

    if (profileError) {
      console.error('❌ Fallback profile update error:', profileError);
    }

    // Update user_access_status
    const { error: accessError } = await supabase
      .from('user_access_status')
      .upsert({
        id: userId,
        has_access: true,
        access_type: `Temporary access (${hours} hours)`,
        temp_access_until: expiresAt,
        updated_at: new Date().toISOString()
      }, { onConflict: 'id' });

    if (accessError) {
      console.error('❌ Fallback access update error:', accessError);
      return { success: false, error: accessError };
    }

    return { success: true };
  } catch (error) {
    console.error('❌ Fallback grant access error:', error);
    return { success: false, error };
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
      .eq('id', userId)
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

// Enhanced process payment success function
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

    // Use the comprehensive payment success function
    const { data, error } = await supabase.rpc('process_payment_success', {
      p_user_id: userId,
      p_plan_type: planType,
      p_stripe_customer_id: null,
      p_stripe_subscription_id: sessionId
    });

    if (error) {
      console.error('❌ Error processing payment success:', error);
      
      // Fallback to direct updates
      const fallbackResult = await fallbackProcessPayment(userId, planType);
      if (!fallbackResult.success) {
        throw error;
      }
    }

    console.log('✅ Payment success processed');

    return {
      statusCode: 200,
      headers: getCorsHeaders(),
      body: JSON.stringify({
        success: true,
        message: 'Payment success processed, access granted',
        planType: planType
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

// Fallback payment processing
async function fallbackProcessPayment(userId: string, planType: string) {
  try {
    const expiresAt = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(); // 1 year
    
    // Update user_profiles with permanent access
    const { error: profileError } = await supabase
      .from('user_profiles')
      .upsert({
        user_id: userId,
        payment_verified: true,
        payment_status: 'verified',
        subscription_status: 'active',
        subscription_plan: planType,
        temp_access_until: expiresAt,
        last_payment_date: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }, { onConflict: 'user_id' });

    if (profileError) {
      console.error('❌ Fallback profile update error:', profileError);
    }

    // Update user_access_status with permanent access
    const { error: accessError } = await supabase
      .from('user_access_status')
      .upsert({
        id: userId,
        payment_verified: true,
        subscription_status: 'active',
        has_access: true,
        access_type: `Paid subscription (${planType})`,
        temp_access_until: expiresAt,
        updated_at: new Date().toISOString()
      }, { onConflict: 'id' });

    if (accessError) {
      console.error('❌ Fallback access update error:', accessError);
      return { success: false, error: accessError };
    }

    return { success: true };
  } catch (error) {
    console.error('❌ Fallback process payment error:', error);
    return { success: false, error };
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
      .eq('id', userId)
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

