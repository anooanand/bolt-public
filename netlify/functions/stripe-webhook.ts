import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function getPlanTypeFromPriceId(priceId: string): string {
  const planMapping: { [key: string]: string } = {
    'price_1RXEqERtcrDpOK7ME3QH9uzu': 'premium_plan',
    'price_1QzeXvRtcrDpOK7M5IHfp8ES': 'premium_plan',
  };
  return planMapping[priceId] || 'premium_plan';
}

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  console.log('🎉 Processing checkout session completed:', session.id);
  
  // Try both ways to get customer email
  const customerEmail = session.customer_email || session.customer_details?.email;
  const stripeCustomerId = session.customer as string;
  const subscriptionId = session.subscription as string;
  
  if (!customerEmail) {
    throw new Error('No customer email provided');
  }

  console.log('👤 Processing payment for email:', customerEmail);

  let planType = 'premium_plan';
  let currentPeriodStart = new Date().toISOString();
  let currentPeriodEnd = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

  if (subscriptionId) {
    try {
      const subscription = await stripe.subscriptions.retrieve(subscriptionId);
      const priceId = subscription.items.data[0]?.price.id;
      planType = getPlanTypeFromPriceId(priceId);
      currentPeriodStart = new Date(subscription.current_period_start * 1000).toISOString();
      currentPeriodEnd = new Date(subscription.current_period_end * 1000).toISOString();
      console.log('💰 Plan type:', planType, 'Period end:', currentPeriodEnd);
    } catch (error) {
      console.error('⚠️ Error fetching subscription:', error);
    }
  }

  try {
    // Update user_profiles using ONLY fields that exist in current schema
    console.log('📝 Updating user_profiles table...');
    const { error: profileError, count: profileCount } = await supabase
      .from('user_profiles')
      .update({
        payment_status: 'verified',
        payment_verified: true,
        subscription_status: 'active',
        subscription_plan: planType,
        stripe_customer_id: stripeCustomerId,
        stripe_subscription_id: subscriptionId,
        current_period_start: currentPeriodStart,
        current_period_end: currentPeriodEnd,
        last_payment_date: new Date().toISOString(),
        temporary_access_expires: currentPeriodEnd,
        updated_at: new Date().toISOString()
      })
      .eq('email', customerEmail);

    if (profileError) {
      console.error('❌ Error updating user_profiles:', profileError);
      throw profileError;
    }
    console.log(`✅ Updated user_profiles successfully (${profileCount} rows affected)`);

    if (profileCount === 0) {
      console.log('⚠️ No user found with email, attempting to create new profile...');
      
      // Create new user profile if none exists
      const { error: createError } = await supabase
        .from('user_profiles')
        .insert({
          email: customerEmail,
          payment_status: 'verified',
          payment_verified: true,
          subscription_status: 'active',
          subscription_plan: planType,
          stripe_customer_id: stripeCustomerId,
          stripe_subscription_id: subscriptionId,
          current_period_start: currentPeriodStart,
          current_period_end: currentPeriodEnd,
          last_payment_date: new Date().toISOString(),
          temporary_access_expires: currentPeriodEnd,
          role: 'user',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });

      if (createError) {
        console.error('❌ Failed to create user profile:', createError);
        throw createError;
      }

      console.log('✅ New user profile created');
    }

    console.log('🎊 Checkout session processing completed successfully!');

  } catch (error) {
    console.error('❌ Error in payment processing:', error);
    throw error;
  }
}

async function handleSubscriptionChange(subscription: Stripe.Subscription) {
  console.log('🔄 Processing subscription change:', subscription.id, 'status:', subscription.status);
  
  const customerId = subscription.customer as string;
  const isActive = subscription.status === 'active';
  
  const { error: updateError } = await supabase
    .from('user_profiles')
    .update({
      subscription_status: subscription.status,
      payment_verified: isActive,
      payment_status: isActive ? 'verified' : 'cancelled',
      current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
      current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
      temporary_access_expires: isActive ? new Date(subscription.current_period_end * 1000).toISOString() : null,
      updated_at: new Date().toISOString()
    })
    .eq('stripe_customer_id', customerId);

  if (updateError) {
    console.error('❌ Error updating subscription:', updateError);
  } else {
    console.log('✅ Subscription status updated');
  }
}

async function handleInvoicePaymentSucceeded(invoice: Stripe.Invoice) {
  console.log('💰 Processing invoice payment succeeded:', invoice.id);
  
  const customerId = invoice.customer as string;
  
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
    console.log('✅ Payment date updated');
  }
}

export async function handler(event: any) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const sig = event.headers['stripe-signature'];
  let stripeEvent: Stripe.Event;

  try {
    const rawBody = event.isBase64Encoded
      ? Buffer.from(event.body || '', 'base64').toString('utf8')
      : (event.body || '');

    stripeEvent = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error(`❌ Webhook signature verification failed: ${err.message}`);
    return { statusCode: 400, body: `Webhook Error: ${err.message}` };
  }

  console.log(`🎯 Processing webhook event: ${stripeEvent.type}`);
  console.log(`📋 Event ID: ${stripeEvent.id}`);

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
        
      case 'customer.subscription.created':
        console.log('ℹ️ Subscription created - handled by checkout.session.completed');
        break;
        
      default:
        console.log(`ℹ️ Unhandled event type: ${stripeEvent.type}`);
    }

    console.log(`✅ Successfully processed webhook event: ${stripeEvent.type}`);
    return { 
      statusCode: 200, 
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
      body: JSON.stringify({ 
        error: 'Internal Server Error', 
        success: false,
        event_type: stripeEvent.type,
        message: error instanceof Error ? error.message : 'Unknown error'
      }) 
    };
  }
}

