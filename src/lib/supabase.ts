import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase and Stripe clients
const supabase = createClient(import.meta.env.VITE_SUPABASE_URL!, import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY!);
const stripe = new Stripe(import.meta.env.VITE_STRIPE_SECRET_KEY!, {
});

// Helper function to get plan type
function getPlanTypeFromPriceId(priceId: string): string {
  // Map your Stripe Price IDs to internal plan types
  const planMapping: { [key: string]: string } = {
    'price_1RXEqERtcrDpOK7ME3QH9uzu': 'premium_plan',
    'price_1QzeXvRtcrDpOK7M5IHfp8ES': 'premium_plan',
    // Add more price ID mappings as needed
  };
  
  return planMapping[priceId] || 'premium_plan';
}

// IMPROVED: Bypass user lookup and update by email directly
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
  const stripeCustomerId = session.customer as string;
  const subscriptionId = session.subscription as string;
  
  if (!customerEmail) {
    console.error('❌ No customer email in session');
    throw new Error('No customer email provided in checkout session');
  }

  console.log('👤 Processing payment for email:', customerEmail);

  // Get subscription details for plan type and dates
  let planType = 'premium_plan';
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

  try {
    const { error: profileError, count: profileCount } = await supabase
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
        current_period_start: currentPeriodStart,
        current_period_end: currentPeriodEnd,
        temp_access_until: currentPeriodEnd,
        updated_at: new Date().toISOString()
      }, { onConflict: 'email', ignoreDuplicates: false });

    // IMPROVED: Update user_access_status by email
    console.log('📝 Updating user_access_status table...');
    const { error: accessError, count: accessCount } = await supabase
      .from('user_access_status')
      .update({
        payment_verified: true,
        subscription_status: 'active',
        has_access: true,
        access_type: `Paid subscription (${planType})`,
        temp_access_until: currentPeriodEnd,
        updated_at: new Date().toISOString()
      })
      .eq('email', customerEmail);

    if (accessError) {
      console.error('❌ Error updating user_access_status:', accessError);
      throw accessError;
    }
    console.log(`✅ Updated user_access_status successfully (${accessCount} rows affected)`);

    // IMPROVED: Log to payment_logs table for audit trail
    try {
      console.log('📝 Logging payment to audit trail...');
      const { error: logError } = await supabase
        .from('payment_logs')
        .insert({
          email: customerEmail,
          stripe_customer_id: stripeCustomerId,
          stripe_subscription_id: subscriptionId,
          event_type: 'checkout.session.completed',
          payment_status: 'completed',
          amount: session.amount_total || 0,
          currency: session.currency || 'usd',
          processed_at: new Date().toISOString(),
          webhook_verified: true,
          plan_type: planType,
          metadata: {
            session_id: session.id,
            payment_method: session.payment_method_types?.[0] || 'unknown',
            mode: session.mode
          }
        });

      if (logError) {
        console.error('❌ Error logging to payment_logs:', logError);
        // Don't throw - this is not critical
      } else {
        console.log('✅ Logged to payment_logs successfully');
      }
    } catch (error) {
      console.error('❌ Error with payment_logs:', error);
      // Don't throw - this is not critical
    }

    console.log('🎊 Checkout session processing completed successfully!');

  } catch (error) {
    console.error('❌ Error in payment processing:', error);
    
    // IMPROVED: Attempt to grant temporary access as fallback
    try {
      console.log('🔄 Attempting to grant temporary access as fallback...');
      await supabase
        .from('user_access_status')
        .update({
          has_access: true,
          access_type: 'Temporary access (payment processing error)',
          temp_access_until: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
          updated_at: new Date().toISOString()
        })
        .eq('email', customerEmail);
      
      console.log('✅ Granted temporary access as fallback');
    } catch (fallbackError) {
      console.error('❌ Fallback access grant also failed:', fallbackError);
    }
    
    throw error;
  }
}

// IMPROVED: Handle subscription changes with better error handling
async function handleSubscriptionChange(subscription: Stripe.Subscription) {
  console.log('🔄 Processing subscription change:', subscription.id, 'status:', subscription.status);

  const customerId = subscription.customer as string;
  
  try {
    // Find user by stripe customer ID in user_profiles
    const { data: profiles, error: profileError } = await supabase
      .from('user_profiles')
      .select('user_id, email')
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

    // Update subscription status in user_profiles
    const { error: updateError } = await supabase
      .from('user_profiles')
      .update({
        subscription_status: subscription.status,
        current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
        current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('stripe_customer_id', customerId);

    if (updateError) {
      console.error('❌ Error updating subscription status:', updateError);
      throw updateError;
    }

    // Update user_access_status based on subscription status
    const hasAccess = subscription.status === 'active';
    const accessType = hasAccess ? 'Paid subscription (active)' : `Subscription ${subscription.status}`;
    
    const { error: accessUpdateError } = await supabase
      .from('user_access_status')
      .update({
        subscription_status: subscription.status,
        has_access: hasAccess,
        access_type: accessType,
        updated_at: new Date().toISOString()
      })
      .eq('email', userProfile.email);

    if (accessUpdateError) {
      console.error('❌ Error updating access status:', accessUpdateError);
      throw accessUpdateError;
    }

    console.log('✅ Updated subscription status successfully');
  } catch (error) {
    console.error('❌ Error in subscription change handling:', error);
    throw error;
  }
}

// IMPROVED: Handle invoice payment with better error handling
async function handleInvoicePaymentSucceeded(invoice: Stripe.Invoice) {
  console.log('💰 Processing invoice payment succeeded:', invoice.id);

  const customerId = invoice.customer as string;

  try {
    // Update last payment date in user_profiles using stripe_customer_id
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

// IMPROVED: Main handler with better error handling and logging
export async function handler(event: any) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const sig = event.headers['stripe-signature'];
  let stripeEvent: Stripe.Event;

  try {
    stripeEvent = stripe.webhooks.constructEvent(
      event.body,
      sig,
      import.meta.env.VITE_STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error(`❌ Webhook signature verification failed: ${err.message}`);
    return { statusCode: 400, body: `Webhook Error: ${err.message}` };
  }

  console.log(`🎯 Processing webhook event: ${stripeEvent.type}`);

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
        
      default:
        console.log(`ℹ️ Unhandled event type: ${stripeEvent.type}`);
    }

    console.log(`✅ Successfully processed webhook event: ${stripeEvent.type}`);
    return { 
      statusCode: 200, 
      body: JSON.stringify({ 
        received: true, 
        event_type: stripeEvent.type,
        processed_at: new Date().toISOString()
      }) 
    };
    
  } catch (error) {
    console.error(`❌ Error processing webhook event ${stripeEvent.type}:`, error);
    
    // Return appropriate error response
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return { 
      statusCode: 500, 
      body: JSON.stringify({ 
        error: 'Internal Server Error', 
        message: errorMessage,
        event_type: stripeEvent.type,
        event_id: stripeEvent.id,
        timestamp: new Date().toISOString()
      }) 
    };
  }
}


export { supabase };



export function isEmailVerified(user: any): boolean {
  return user?.email_confirmed_at !== undefined && user?.email_confirmed_at !== null;
}

export function hasAnyAccess(userProfile: any): boolean {
  return userProfile?.has_access === true || userProfile?.temp_access_until !== undefined;
}


