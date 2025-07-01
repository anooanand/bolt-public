import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

function getPlanTypeFromPriceId(priceId: string): string {
  const planMapping: { [key: string]: string } = {
    'price_1RXEqERtcrDpOK7ME3QH9uzu': 'premium_plan',
    'price_1QzeXvRtcrDpOK7M5IHfp8ES': 'premium_plan',
  };
  return planMapping[priceId] || 'premium_plan';
}

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  console.log('🎉 Processing checkout session completed:', session.id);
  
  const customerEmail = session.customer_email;
  const stripeCustomerId = session.customer as string;
  const subscriptionId = session.subscription as string;
  
  if (!customerEmail) {
    throw new Error('No customer email provided');
  }

  console.log('👤 Processing payment for email:', customerEmail);

  let planType = 'premium_plan';
  let currentPeriodEnd = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

  if (subscriptionId) {
    try {
      const subscription = await stripe.subscriptions.retrieve(subscriptionId);
      const priceId = subscription.items.data[0]?.price.id;
      planType = getPlanTypeFromPriceId(priceId);
      currentPeriodEnd = new Date(subscription.current_period_end * 1000).toISOString();
      console.log('💰 Plan type:', planType, 'Period end:', currentPeriodEnd);
    } catch (error) {
      console.error('⚠️ Error fetching subscription:', error);
    }
  }

  try {
    // UPSERT: Create user if doesn't exist, update if exists
    const { error: upsertError, data } = await supabase
      .from('user_profiles')
      .upsert({
        email: customerEmail,
        payment_status: 'verified',
        payment_verified: true,
        subscription_status: 'active',
        plan_type: planType,
        subscription_plan: planType,
        stripe_customer_id: stripeCustomerId,
        stripe_subscription_id: subscriptionId,
        last_payment_date: new Date().toISOString(),
        temporary_access_expires: currentPeriodEnd,
        role: 'user',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'email',
        ignoreDuplicates: false
      })
      .select();

    if (upsertError) {
      console.error('❌ Error upserting user_profiles:', upsertError);
      throw upsertError;
    }

    console.log(`✅ User profile upserted successfully:`, data);

    // Also update user_access_status table if it exists
    try {
      const { error: accessError } = await supabase
        .from('user_access_status')
        .upsert({
          email: customerEmail,
          email_verified: true,
          payment_verified: true,
          manual_override: false,
          subscription_status: 'active',
          has_access: true,
          access_type: planType
        }, {
          onConflict: 'email',
          ignoreDuplicates: false
        });

      if (accessError) {
        console.warn('⚠️ Could not update user_access_status (table may not exist):', accessError);
      } else {
        console.log('✅ User access status updated');
      }
    } catch (accessTableError) {
      console.warn('⚠️ user_access_status table not found, skipping');
    }

  } catch (error) {
    console.error('❌ Error in payment processing:', error);
    throw error;
  }
}

async function handleSubscriptionChange(subscription: Stripe.Subscription) {
  console.log('🔄 Processing subscription change:', subscription.id, 'status:', subscription.status);
  
  const customerId = subscription.customer as string;
  const isActive = subscription.status === 'active';
  
  // Update by stripe_customer_id
  const { error: updateError, count } = await supabase
    .from('user_profiles')
    .update({
      subscription_status: subscription.status,
      payment_verified: isActive,
      payment_status: isActive ? 'verified' : 'cancelled',
      temporary_access_expires: isActive ? new Date(subscription.current_period_end * 1000).toISOString() : null,
      updated_at: new Date().toISOString()
    })
    .eq('stripe_customer_id', customerId);

  if (updateError) {
    console.error('❌ Error updating subscription:', updateError);
  } else {
    console.log(`✅ Updated subscription status (${count} rows affected)`);
  }

  // Also update user_access_status if exists
  try {
    await supabase
      .from('user_access_status')
      .update({
        payment_verified: isActive,
        subscription_status: subscription.status,
        has_access: isActive,
        access_type: isActive ? 'premium_plan' : 'No access'
      })
      .eq('email', (await supabase.from('user_profiles').select('email').eq('stripe_customer_id', customerId).single()).data?.email);
  } catch (error) {
    console.warn('⚠️ Could not update user_access_status');
  }
}

async function handleInvoicePaymentSucceeded(invoice: Stripe.Invoice) {
  console.log('💰 Processing invoice payment succeeded:', invoice.id);
  
  const customerId = invoice.customer as string;
  
  const { error: updateError, count } = await supabase
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
    console.log(`✅ Updated payment date (${count} rows affected)`);
  }
}

export async function handler(event: any) {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, stripe-signature',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return { 
      statusCode: 405, 
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: 'Method Not Allowed' 
    };
  }

  const sig = event.headers['stripe-signature'];
  let stripeEvent: Stripe.Event;

  try {
    stripeEvent = stripe.webhooks.constructEvent(
      event.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error(`❌ Webhook signature verification failed: ${err.message}`);
    return { 
      statusCode: 400, 
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: `Webhook Error: ${err.message}` 
    };
  }

  console.log(`🎯 Processing webhook event: ${stripeEvent.type}`);
  console.log(`📋 Event ID: ${stripeEvent.id}`);

  try {
    switch (stripeEvent.type) {
      case 'checkout.session.completed':
        const checkoutSession = stripeEvent.data.object as Stripe.Checkout.Session;
        if (checkoutSession.mode === 'subscription' || checkoutSession.mode === 'payment') {
          await handleCheckoutSessionCompleted(checkoutSession);
        }
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
        
      case 'customer.subscription.created':
        console.log('ℹ️ Subscription created - handled by checkout.session.completed');
        break;
        
      default:
        console.log(`ℹ️ Unhandled event type: ${stripeEvent.type}`);
    }

    console.log(`✅ Successfully processed webhook event: ${stripeEvent.type}`);
    return { 
      statusCode: 200, 
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ 
        received: true, 
        success: true,
        event_type: stripeEvent.type,
        event_id: stripeEvent.id
      }) 
    };
    
  } catch (error) {
    console.error(`❌ Error processing webhook event:`, error);
    return { 
      statusCode: 500, 
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ 
        error: 'Internal Server Error', 
        success: false,
        event_type: stripeEvent.type,
        message: error instanceof Error ? error.message : 'Unknown error'
      }) 
    };
  }
}

