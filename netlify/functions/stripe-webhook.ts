import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase and Stripe clients (ensure these are correctly configured with your keys)
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!); // Use environment variables
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20', // Use your desired API version
});

// Helper function to get plan type (assuming this is defined elsewhere or needs to be added)
function getPlanTypeFromPriceId(priceId: string): string {
  // Implement your logic to map Stripe Price ID to your internal plan type
  if (priceId === 'price_1RXEqERtcrDpOK7ME3QH9uzu') {
    return 'premium_plan';
  }
  return 'base_plan';
}

// Your existing handleCheckoutSessionCompleted function
async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  console.log('🎉 Processing checkout session completed:', session.id);
  console.log('Session details:', {
    id: session.id,
    customer: session.customer,
    customer_email: session.customer_email,
    mode: session.mode,
    payment_status: session.payment_status,
    subscription: session.subscription
  });

  const customerEmail = session.customer_email;
  if (!customerEmail) {
    console.error('❌ No customer email in session');
    return;
  }

  console.log('👤 Processing payment for email:', customerEmail);

  // Find user by email in auth.users
  const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();
  if (authError) {
    console.error('❌ Error fetching auth users:', authError);
    throw new Error(`Failed to fetch users: ${authError.message}`);
  }

  const user = authUsers.users.find(u => u.email === customerEmail);
  if (!user) {
    console.error(`❌ No user found with email: ${customerEmail}`);
    throw new Error(`No user found with email: ${customerEmail}`);
  }

  console.log('✅ Found user ID:', user.id);

  const userId = user.id;
  const stripeCustomerId = session.customer as string;
  const subscriptionId = session.subscription as string;

  console.log('📋 Subscription ID:', subscriptionId);

  // Get subscription details for plan type and dates
  let planType = 'base_plan';
  let currentPeriodStart = new Date().toISOString();
  let currentPeriodEnd = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(); // 1 year from now

  if (subscriptionId) {
    try {
      const subscription = await stripe.subscriptions.retrieve(subscriptionId);
      const priceId = subscription.items.data[0]?.price.id;
      console.log('💰 Price ID:', priceId);
      planType = getPlanTypeFromPriceId(priceId);
      console.log('📋 Plan type:', planType);
      
      // Get actual subscription period dates
      currentPeriodStart = new Date(subscription.current_period_start * 1000).toISOString();
      currentPeriodEnd = new Date(subscription.current_period_end * 1000).toISOString();
      console.log('📅 Period:', currentPeriodStart, 'to', currentPeriodEnd);
    } catch (error) {
      console.error('⚠️ Error fetching subscription:', error);
    }
  }

  // Try using the database function first
  try {
    const { data, error } = await supabase.rpc('process_payment_success', {
      p_user_id: userId,
      p_plan_type: planType,
      p_stripe_customer_id: stripeCustomerId,
      p_stripe_subscription_id: subscriptionId
    });

    if (error) {
      console.error('❌ Error calling process_payment_success function:', error);
      throw error;
    } else {
      console.log('✅ Payment success processed via database function');
      return; // Success, exit early
    }
  } catch (error) {
    console.error('❌ Database function failed, using fallback method:', error);
  }

  // Fallback: Direct table updates with correct structure
  try {
    // 1. UPDATE USER_PROFILES TABLE using user_id as primary key
    const { error: profileError } = await supabase
      .from('user_profiles')
      .upsert({
        user_id: userId, // Use user_id as primary key
        email: customerEmail,
        stripe_customer_id: stripeCustomerId,
        stripe_subscription_id: subscriptionId,
        subscription_status: 'active',
        payment_status: 'verified',
        plan_type: planType,
        subscription_plan: planType,
        last_payment_date: new Date().toISOString(),
        payment_verified: true,
        current_period_start: currentPeriodStart,
        current_period_end: currentPeriodEnd,
        temp_access_until: currentPeriodEnd,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'user_id' // Use user_id for conflict resolution
      });

    if (profileError) {
      console.error('❌ Error updating user_profiles:', profileError);
      throw profileError;
    }
    console.log('✅ Updated user_profiles successfully');

    // 2. UPDATE USER_ACCESS_STATUS TABLE using id as primary key
    const { error: accessError } = await supabase
      .from('user_access_status')
      .upsert({
        id: userId, // Use id as primary key
        email: customerEmail,
        email_verified: true,
        payment_verified: true,
        subscription_status: 'active',
        has_access: true,
        access_type: `Paid subscription (${planType})`,
        temp_access_until: currentPeriodEnd,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'id' // Use id for conflict resolution
      });

    if (accessError) {
      console.error('❌ Error updating user_access_status:', accessError);
      throw accessError;
    }
    console.log('✅ Updated user_access_status successfully');

    // 3. LOG TO PAYMENT_LOGS TABLE (if it exists)
    try {
      const { error: logError } = await supabase
        .from('payment_logs')
        .insert({
          user_id: userId,
          stripe_customer_id: stripeCustomerId,
          stripe_subscription_id: subscriptionId,
          event_type: 'checkout.session.completed',
          payment_status: 'completed',
          amount: session.amount_total || 0,
          currency: session.currency || 'usd',
          processed_at: new Date().toISOString(),
          webhook_verified: true,
          metadata: {
            session_id: session.id,
            plan_type: planType,
            payment_method: session.payment_method_types?.[0] || 'unknown'
          }
        });

      if (logError) {
        console.error('❌ Error logging to payment_logs:', logError);
        // Don't throw - this table might not exist
      } else {
        console.log('✅ Logged to payment_logs successfully');
      }
    } catch (error) {
      console.error('❌ Error with payment_logs:', error);
      // Don't throw - this is not critical
    }

    console.log('🎊 Checkout session processing completed successfully!');

  } catch (error) {
    console.error('❌ Error in fallback processing:', error);
    throw error;
  }
}

// Also update the handleSubscriptionChange function to use correct table structure
async function handleSubscriptionChange(subscription: Stripe.Subscription) {
  console.log('🔄 Processing subscription change:', subscription.id, 'status:', subscription.status);

  const customerId = subscription.customer as string;
  
  // Find user by stripe customer ID in user_profiles
  const { data: profiles, error: profileError } = await supabase
    .from('user_profiles')
    .select('user_id, email')
    .eq('stripe_customer_id', customerId)
    .limit(1);

  if (profileError || !profiles || profiles.length === 0) {
    console.warn('⚠️ User not found for customer ID:', customerId);
    return;
  }

  const userId = profiles[0].user_id;

  // Update subscription status in user_profiles using user_id
  const { error: updateError } = await supabase
    .from('user_profiles')
    .update({
      subscription_status: subscription.status,
      current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
      current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
      updated_at: new Date().toISOString()
    })
    .eq('user_id', userId);

  if (updateError) {
    console.error('❌ Error updating subscription status:', updateError);
  } else {
    console.log('✅ Updated subscription status successfully');
  }
}

// Update handleInvoicePaymentSucceeded function
async function handleInvoicePaymentSucceeded(invoice: Stripe.Invoice) {
  console.log('💰 Processing invoice payment succeeded:', invoice.id);

  const customerId = invoice.customer as string;

  // Update last payment date in user_profiles using stripe_customer_id
  const { error: updateError } = await supabase
    .from('user_profiles')
    .update({
      last_payment_date: new Date().toISOString(),
      payment_status: 'verified',
      payment_verified: true,
      updated_at: new Date().toISOString()
    })
    .eq('stripe_customer_id', customerId);

  if (updateError) {
    console.error('❌ Error updating payment date:', updateError);
  } else {
    console.log('✅ Updated payment date for customer:', customerId);
  }
}

// **MAIN HANDLER FUNCTION FOR THE WEBHOOK**
export async function handler(event: any) {
  if (event.httpMethod !== 'POST' ) {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const sig = event.headers['stripe-signature'];
  let stripeEvent: Stripe.Event;

  try {
    stripeEvent = stripe.webhooks.constructEvent(
      event.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET! // Your Stripe webhook secret
    );
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`);
    return { statusCode: 400, body: `Webhook Error: ${err.message}` };
  }

  try {
    switch (stripeEvent.type) {
      case 'checkout.session.completed':
        const checkoutSession = stripeEvent.data.object as Stripe.Checkout.Session;
        await handleCheckoutSessionCompleted(checkoutSession);
        break;
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted':
        const subscription = stripeEvent.data.object as Stripe.Subscription;
        await handleSubscriptionChange(subscription);
        break;
      case 'invoice.payment_succeeded':
        const invoice = stripeEvent.data.object as Stripe.Invoice;
        await handleInvoicePaymentSucceeded(invoice);
        break;
      // Add other event types as needed
      default:
        console.log(`Unhandled event type ${stripeEvent.type}`);
    }

    return { statusCode: 200, body: 'Success' };
  } catch (error) {
    console.error('Error processing webhook event:', error);
    return { statusCode: 500, body: 'Internal Server Error' };
  }
}
