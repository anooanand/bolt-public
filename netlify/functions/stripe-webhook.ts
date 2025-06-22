// CORRECTED WEBHOOK: netlify/functions/stripe-webhook.ts
// Fixed the undefined variable error

import { Handler } from '@netlify/functions';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export const handler: Handler = async (event) => {
  console.log('🔔 Stripe Webhook received:', event.httpMethod);

  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, stripe-signature',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const sig = event.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !webhookSecret) {
    console.error('❌ Missing signature or webhook secret');
    return { statusCode: 400, body: 'Missing signature or webhook secret' };
  }

  let stripeEvent: Stripe.Event;

  try {
    stripeEvent = stripe.webhooks.constructEvent(event.body!, sig, webhookSecret);
    console.log(`✅ Webhook signature verified for event: ${stripeEvent.type} ID: ${stripeEvent.id}`);
  } catch (err) {
    console.error('❌ Webhook signature verification failed:', err);
    return { statusCode: 400, body: 'Webhook signature verification failed' };
  }

  try {
    console.log(`🔄 Processing event: ${stripeEvent.type}`);

    switch (stripeEvent.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(stripeEvent.data.object as Stripe.Checkout.Session);
        break;
      case 'customer.subscription.updated':
      case 'customer.subscription.created':
        await handleSubscriptionChange(stripeEvent.data.object as Stripe.Subscription);
        break;
      case 'invoice.payment_succeeded':
        await handleInvoicePaymentSucceeded(stripeEvent.data.object as Stripe.Invoice);
        break;
      default:
        console.log(`ℹ️ Unhandled event type: ${stripeEvent.type}`);
    }

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ received: true, eventType: stripeEvent.type }),
    };
  } catch (error) {
    console.error('❌ Error processing webhook:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ error: 'Webhook processing failed' }),
    };
  }
};

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

  // 1. UPDATE USER_PROFILES TABLE
  try {
    const { error: profileError } = await supabase
      .from('user_profiles')
      .upsert({
        user_id: userId,
        email: customerEmail,
        stripe_customer_id: stripeCustomerId,
        stripe_subscription_id: subscriptionId,
        subscription_status: 'active',
        payment_status: 'verified',
        plan_type: planType,
        last_payment_date: new Date().toISOString(),
        payment_verified: true,
        current_period_start: currentPeriodStart,
        current_period_end: currentPeriodEnd,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'user_id'
      });

    if (profileError) {
      console.error('❌ Error updating user_profiles:', profileError);
      throw profileError;
    }
    console.log('✅ Updated user_profiles successfully');
  } catch (error) {
    console.error('❌ Error updating user_profiles:', error);
    throw error;
  }

  // 2. INSERT INTO USER_PAYMENTS TABLE (if it exists)
  try {
    const { error: paymentError } = await supabase
      .from('user_payments')
      .insert({
        user_id: userId,
        stripe_customer_id: stripeCustomerId,
        stripe_subscription_id: subscriptionId,
        payment_status: 'completed',
        plan_type: planType,
        amount: session.amount_total || 0,
        currency: session.currency || 'usd',
        payment_date: new Date().toISOString(),
        created_at: new Date().toISOString()
      });

    if (paymentError) {
      console.error('❌ Error inserting user_payments:', paymentError);
      // Don't throw - this table might not exist
    } else {
      console.log('✅ Inserted user_payments successfully');
    }
  } catch (error) {
    console.error('❌ Error with user_payments:', error);
    // Don't throw - this is not critical
  }

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
}

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

  // Update subscription status in user_profiles
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

async function handleInvoicePaymentSucceeded(invoice: Stripe.Invoice) {
  console.log('💰 Processing invoice payment succeeded:', invoice.id);

  const customerId = invoice.customer as string;

  // Update last payment date in user_profiles
  const { error: updateError } = await supabase
    .from('user_profiles')
    .update({
      last_payment_date: new Date().toISOString(),
      payment_status: 'verified',
      updated_at: new Date().toISOString()
    })
    .eq('stripe_customer_id', customerId);

  if (updateError) {
    console.error('❌ Error updating payment date:', updateError);
  } else {
    console.log('✅ Updated payment date for customer:', customerId);
  }
}

function getPlanTypeFromPriceId(priceId: string): string {
  // Map your actual Stripe price IDs to plan types
  const priceMap: { [key: string]: string } = {
    'price_1QexWRtCrOpCXM5InfpatS': 'try_out_plan',
    'price_1RXEqERtcrDpOK7ME3QH9uzu': 'base_plan',
    // Add more price IDs as needed
  };

  return priceMap[priceId] || 'base_plan';
}

