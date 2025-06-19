import { Handler } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

const handler: Handler = async (event) => {
  try {
    console.log('🕙 Running daily payment check at 10 PM');

    // Find users with pending payments older than 24 hours
    const { data: pendingUsers, error } = await supabase
      .from('user_profiles')
      .select('id, user_id, email, created_at')
      .eq('payment_status', 'pending')
      .lt('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString());

    if (error) {
      throw error;
    }

    let processedCount = 0;

    for (const user of pendingUsers || []) {
      // Grant 24-hour temporary access
      const { error: grantError } = await supabase.rpc('grant_temporary_access', {
        p_user_id: user.user_id,
        p_hours: 24,
        p_reason: 'Daily fallback process'
      });

      if (!grantError) {
        processedCount++;
      }
    }

    // Cleanup expired temporary access
    await supabase.rpc('cleanup_expired_temporary_access');

    console.log(`✅ Daily check completed: ${processedCount} users processed`);

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        processedCount,
        message: 'Daily payment check completed'
      }),
    };

  } catch (error: any) {
    console.error('❌ Daily payment check error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

export { handler };