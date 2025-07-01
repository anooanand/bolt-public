import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase and Stripe clients
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

// Helper function to get plan type from price ID
function getPlanTypeFromPriceId(priceId: string): string {
  const planMapping: { [key: string]: string } = {
    'price_1RXEqERtcrDpOK7ME3QH9uzu': 'premium_plan',
    'price_1QzeXvRtcrDpOK7M5IHfp8ES': 'premium_plan',
  };
  return planMapping[priceId] || 'premium_plan';
}

// TARGETED FIX: Handle checkout session completed based on actual schema
async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  console.log('🎉 Processing checkout session completed:', session.id);
  
  const customerEmail = session.customer_email;
  const stripeCustomerId = session.customer as string;
  const subscriptionId = session.subscription as string;
  
  if (!customerEmail) {
    console.error('❌ No customer email in session');
    throw new Error('No customer email provided in checkout session');
  }

  console.log('👤 Processing payment for email:', customerEmail);

  // Get subscription details from Stripe
  let planType = 'premium_plan';
  let currentPeriodStart: string | null = null;
  let currentPeriodEnd: string | null = null;

  if (subscriptionId) {
    try {
      const subscription = await stripe.subscriptions.retrieve(subscriptionId);
      const priceId = subscription.items.data[0]?.price.id;
      console.log('💰 Price ID:', priceId);
      
      planType = getPlanTypeFromPriceId(priceId);
      currentPeriodStart = new Date(subscription.current_period_start * 1000).toISOString();
      currentPeriodEnd = new Date(subscription.current_period_end * 1000).toISOString();
      
      console.log('📋 Plan type:', planType);
      console.log('📅 Period:', currentPeriodStart, 'to', currentPeriodEnd);
    } catch (error) {
      console.error('⚠️ Error fetching subscription:', error);
      // Continue with default values
    }
  }

  try {
    // Check if user profile exists
    console.log('🔍 Checking if user profile exists...');
    const { data: existingProfile, error: checkError } = await supabase
      .from('user_profiles')
      .select('id, email')
      .eq('email', customerEmail)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      console.error('❌ Error checking user profile:', checkError);
      throw checkError;
    }

    if (!existingProfile) {
      console.log('👤 Creating new user profile...');
      
      // FIXED: Generate UUID and use only fields that exist based on indexes
      const { error: createError } = await supabase
        .from('user_profiles')
        .insert({
          // Don't specify id - let database generate it with default
          email: customerEmail,
          payment_status: 'verified',
          payment_verified: true,
          subscription_status: 'active',
          plan_type: planType,
          stripe_customer_id: stripeCustomerId,
          stripe_subscription_id: subscriptionId,
          last_payment_date: new Date().toISOString(),
          // Use temporary_access_expires based on index name
          temporary_access_expires: currentPeriodEnd || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          manual_override: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });

      if (createError) {
        console.error('❌ Error creating user profile:', createError);
        throw createError;
      }
      console.log('✅ Created new user profile successfully');
    } else {
      console.log('📝 Updating existing user profile...');
      
      const { error: updateError, count: updateCount } = await supabase
        .from('user_profiles')
        .update({
          payment_status: 'verified',
          payment_verified: true,
          subscription_status: 'active',
          plan_type: planType,
          stripe_customer_id: stripeCustomerId,
          stripe_subscription_id: subscriptionId,
          last_payment_date: new Date().toISOString(),
          temporary_access_expires: currentPeriodEnd || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('email', customerEmail);

      if (updateError) {
        console.error('❌ Error updating user_profiles:', updateError);
        throw updateError;
      }
      console.log(`✅ Updated user_profiles successfully (${updateCount} rows affected)`);
    }

    console.log('🎊 Checkout session processing completed successfully!');

  } catch (error) {
    console.error('❌ Error in payment processing:', error);
    throw error;
  }
}

// Handle subscription changes
async function handleSubscriptionChange(subscription: Stripe.Subscription) {
  console.log('🔄 Processing subscription change:', subscription.id, 'status:', subscription.status);

  const customerId = subscription.customer as string;
  
  try {
    // Find user by stripe_customer_id
    const { data: profiles, error: profileError } = await supabase
      .from('user_profiles')
      .select('email, id')
      .eq('stripe_customer_id', customerId)
      .limit(1);

    if (profileError) {
      console.error('❌ Error finding user profile:', profileError);
      return;
    }

    if (!profiles || profiles.length === 0) {
      console.warn('⚠️ User not found for customer ID:', customerId);
      return;
    }

    const userProfile = profiles[0];
    console.log('✅ Found user:', userProfile.email);

    // Determine if subscription is active
    const isActive = subscription.status === 'active';
    
    // Update user_profiles table
    const { error: updateError } = await supabase
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
      console.error('❌ Error updating subscription status:', updateError);
      throw updateError;
    }

    console.log('✅ Updated subscription status successfully');
  } catch (error) {
    console.error('❌ Error in subscription change handling:', error);
    throw error;
  }
}

// Handle invoice payment
async function handleInvoicePaymentSucceeded(invoice: Stripe.Invoice) {
  console.log('💰 Processing invoice payment succeeded:', invoice.id);

  const customerId = invoice.customer as string;

  try {
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
      throw updateError;
    }
    
    console.log(`✅ Updated payment date for customer: ${customerId} (${count} rows affected)`);
  } catch (error) {
    console.error('❌ Error in invoice payment handling:', error);
    throw error;
  }
}

// Main webhook handler
export async function handler(event: any) {
  // Handle CORS preflight requests
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
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  const sig = event.headers['stripe-signature'];
  let stripeEvent: Stripe.Event;

  // Verify webhook signature
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
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ error: `Webhook Error: ${err.message}` })
    };
  }

  console.log(`🎯 Processing webhook event: ${stripeEvent.type}`);
  console.log(`📋 Event ID: ${stripeEvent.id}`);

  try {
    // Process different webhook event types
    switch (stripeEvent.type) {
      case 'checkout.session.completed':
        const checkoutSession = stripeEvent.data.object as Stripe.Checkout.Session;
        if (checkoutSession.mode === 'subscription' || checkoutSession.mode === 'payment') {
          await handleCheckoutSessionCompleted(checkoutSession);
        } else {
          console.log(`ℹ️ Skipping checkout session with mode: ${checkoutSession.mode}`);
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
        console.log('ℹ️ Subscription created event - no action needed (handled by checkout.session.completed)');
        break;
        
      default:
        console.log(`ℹ️ Unhandled event type: ${stripeEvent.type}`);
    }

    console.log(`✅ Successfully processed webhook event: ${stripeEvent.type}`);
    
    return { 
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        received: true, 
        event_type: stripeEvent.type,
        event_id: stripeEvent.id,
        processed_at: new Date().toISOString(),
        success: true
      }) 
    };
    
  } catch (error) {
    console.error(`❌ Error processing webhook event ${stripeEvent.type}:`, error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    const errorCode = error instanceof Error && 'code' in error ? (error as any).code : null;
    
    return { 
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        error: 'Internal Server Error', 
        message: errorMessage,
        code: errorCode,
        event_type: stripeEvent.type,
        event_id: stripeEvent.id,
        timestamp: new Date().toISOString(),
        success: false
      }) 
    };
  }
}

