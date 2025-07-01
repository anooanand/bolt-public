import { Handler } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

const handler: Handler = async (event) => {
  try {
    console.log('🕙 Running daily payment check at 10 PM');

    // FIXED: Find users with pending payments older than 24 hours (removed user_id field)
    const { data: pendingUsers, error } = await supabase
      .from('user_profiles')
      .select('id, email, created_at') // FIXED: Removed user_id, use id instead
      .eq('payment_status', 'pending')
      .lt('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString());

    if (error) {
      throw error;
    }

    let processedCount = 0;

    for (const user of pendingUsers || []) {
      try {
        // FIXED: Grant 24-hour temporary access using email-based approach
        const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
        
        const { error: grantError } = await supabase
          .from('user_profiles')
          .update({
            temporary_access_granted: true,
            temp_access_until: expiresAt,
            updated_at: new Date().toISOString()
          })
          .eq('email', user.email); // FIXED: Use email instead of user_id

        if (!grantError) {
          processedCount++;
          console.log(`✅ Granted temporary access to: ${user.email}`);
        } else {
          console.error(`❌ Failed to grant access to ${user.email}:`, grantError);
        }
      } catch (userError) {
        console.error(`❌ Error processing user ${user.email}:`, userError);
      }
    }

    // FIXED: Cleanup expired temporary access
    try {
      const now = new Date().toISOString();
      const { error: cleanupError } = await supabase
        .from('user_profiles')
        .update({
          temporary_access_granted: false,
          temp_access_until: null,
          updated_at: now
        })
        .lt('temp_access_until', now)
        .eq('temporary_access_granted', true);

      if (cleanupError) {
        console.error('❌ Error cleaning up expired access:', cleanupError);
      } else {
        console.log('✅ Cleaned up expired temporary access');
      }
    } catch (cleanupError) {
      console.error('❌ Error in cleanup process:', cleanupError);
    }

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

