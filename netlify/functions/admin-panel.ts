import { Handler } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

const handler: Handler = async (event) => {
  // Basic admin authentication (enhance this for production)
  const adminKey = event.headers['x-admin-key'];
  if (adminKey !== process.env.ADMIN_KEY) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'Unauthorized' }),
    };
  }

  const { action, userId, planType } = JSON.parse(event.body || '{}');

  switch (action) {
    case 'grant_access':
      const { error } = await supabase.rpc('handle_payment_success', {
        p_user_id: userId,
        p_stripe_customer_id: 'manual_admin',
        p_stripe_subscription_id: 'manual_admin',
        p_plan_type: planType
      });
      
      return {
        statusCode: 200,
        body: JSON.stringify({ success: !error, error }),
      };

    case 'view_logs':
      const { data: logs } = await supabase
        .from('payment_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);
      
      return {
        statusCode: 200,
        body: JSON.stringify({ logs }),
      };

    default:
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid action' }),
      };
  }
};

export { handler };