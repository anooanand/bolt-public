// COMPLETE FIXED WEBHOOK: netlify/functions/stripe-webhook.ts
// This webhook will properly update Supabase when Stripe payments are completed

import { Handler } from '@netlify/functions';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15',
});

// Initialize Supabase with service role key for server-side operations
const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Webhook endpoint secret for signature verification
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

const handler: Handler = async (event) => {
  console.log('🔔 Stripe Webhook received:', event.httpMethod);
  
  // Enhanced CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Stripe-Signature',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  const body = event.body;
  const signature = event.headers['stripe-signature'];

  if (!body || !signature) {
    console.error('❌ Missing body or signature');
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Missing body or signature' }),
    };
  }

  let stripeEvent: Stripe.Event;

  try {
    // Verify the webhook signature
    stripeEvent = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    console.log('✅ Webhook signature verified for event:', stripeEvent.type, 'ID:', stripeEvent.id);
  } catch (error: any) {
    console.error('❌ Webhook signature verification failed:', error.message);
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Webhook signature verification failed' }),
    };
  }

  try {
    console.log('🔄 Processing event:', stripeEvent.type);
    
    // Handle different event types
    switch (stripeEvent.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(stripeEvent.data.object as Stripe.Checkout.Session);
        break;
      
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        await handleSubscriptionChange(stripeEvent.data.object as Stripe.Subscription);
        break;
      
      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(stripeEvent.data.object as Stripe.Subscription);
        break;
      
      case 'invoice.payment_succeeded':
        await handleInvoicePaymentSucceeded(stripeEvent.data.object as Stripe.Invoice);
        break;
      
      case 'invoice.payment_failed':
        await handleInvoicePaymentFailed(stripeEvent.data.object as Stripe.Invoice);
        break;
      
      default:
        console.log(`ℹ️ Unhandled event type: ${stripeEvent.type}`);
    }

    // Log successful processing
    await logWebhookEvent(stripeEvent, 'success');

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        received: true, 
        event_type: stripeEvent.type,
        event_id: stripeEvent.id,
        processed_at: new Date().toISOString()
      }),
    };
  } catch (error: any) {
    console.error('❌ Error processing webhook:', error);
    
    // Log the error
    await logWebhookEvent(stripeEvent, 'error', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Internal server error',
        event_type: stripeEvent.type,
        event_id: stripeEvent.id,
        message: error.message
      }),
    };
  }
};

// MAIN FUNCTION: Handle successful checkout session completion
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
  
  try {
    // Get customer email - this is our primary identifier
    const customerEmail = session.customer_email;
    const customerId = session.customer as string;
    
    if (!customerEmail) {
      throw new Error('No customer email found in checkout session');
    }

    console.log('👤 Processing payment for email:', customerEmail);

    // Find user by email in auth.users
    const { data: authUser, error: authError } = await supabase.auth.admin.listUsers();
    
    if (authError) {
      throw new Error(`Error fetching users: ${authError.message}`);
    }

    const user = authUser.users.find(u => u.email === customerEmail);
    
    if (!user) {
      throw new Error(`No user found with email: ${customerEmail}`);
    }

    const userId = user.id;
    console.log('✅ Found user ID:', userId);

    // Determine plan type and subscription details
    let subscriptionId = null;
    let planType = 'base_plan';
    let amount = session.amount_total || 0;

    if (session.mode === 'subscription' && session.subscription) {
      subscriptionId = session.subscription as string;
      console.log('📋 Subscription ID:', subscriptionId);
      
      // Get subscription details from Stripe
      try {
        const subscription = await stripe.subscriptions.retrieve(subscriptionId);
        if (subscription.items.data.length > 0) {
          const priceId = subscription.items.data[0].price.id;
          console.log('💰 Price ID:', priceId);
          
          // Map price ID to plan type
          planType = mapPriceIdToPlanType(priceId);
          console.log('📋 Plan type:', planType);
        }
      } catch (subError) {
        console.warn('⚠️ Error fetching subscription details:', subError);
      }
    }

    // Update user_access_status directly
    const { error: accessError } = await supabase
      .from('user_access_status')
      .upsert({
        user_id: userId,
        email_verified: true,
        payment_status: 'completed',
        payment_verified: true,
        subscription_status: 'active',
        has_access: true,
        temp_access_until: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 year
        stripe_customer_id: customerId,
        plan_type: planType,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'user_id'
      });

    if (accessError) {
      console.error('❌ Error updating user_access_status:', accessError);
      throw accessError;
    }

    console.log('✅ Updated user_access_status for user:', userId);

    // Update user_profiles
    const { error: profileError } = await supabase
      .from('user_profiles')
      .upsert({
        user_id: userId,
        stripe_customer_id: customerId,
        subscription_status: 'active',
        payment_status: 'verified',
        plan_type: planType,
        last_payment_date: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'user_id'
      });

    if (profileError) {
      console.warn('⚠️ Error updating user_profiles:', profileError);
    } else {
      console.log('✅ Updated user_profiles for user:', userId);
    }

    // Log the successful payment
    const { error: logError } = await supabase
      .from('payment_logs')
      .insert({
        user_id: userId,
        stripe_customer_id: customerId,
        stripe_session_id: session.id,
        stripe_subscription_id: subscriptionId,
        payment_status: 'completed',
        amount: amount,
        currency: session.currency || 'usd',
        processed_at: new Date().toISOString(),
        webhook_verified: true,
        metadata: {
          plan_type: planType,
          session_mode: session.mode,
          customer_email: customerEmail
        }
      });

    if (logError) {
      console.warn('⚠️ Error logging payment:', logError);
    } else {
      console.log('✅ Logged payment for user:', userId);
    }

    console.log('🎊 Checkout session completed successfully for user:', userId);

  } catch (error) {
    console.error('❌ Error handling checkout session completed:', error);
    throw error;
  }
}

// Handle subscription changes
async function handleSubscriptionChange(subscription: Stripe.Subscription) {
  console.log('🔄 Processing subscription change:', subscription.id, 'status:', subscription.status);
  
  try {
    const customerId = subscription.customer as string;
    
    // Find user by stripe customer ID
    const { data: userProfile, error: profileError } = await supabase
      .from('user_profiles')
      .select('user_id')
      .eq('stripe_customer_id', customerId)
      .single();

    if (profileError || !userProfile) {
      console.warn('⚠️ User not found for customer ID:', customerId);
      return;
    }

    const userId = userProfile.user_id;
    const isActive = ['active', 'trialing'].includes(subscription.status);

    // Update user_access_status
    const { error: accessError } = await supabase
      .from('user_access_status')
      .update({
        subscription_status: subscription.status,
        has_access: isActive,
        payment_verified: isActive,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', userId);

    if (accessError) {
      console.error('❌ Error updating access status:', accessError);
    }

    // Update user_profiles
    const { error: updateError } = await supabase
      .from('user_profiles')
      .update({
        subscription_status: subscription.status,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', userId);

    if (updateError) {
      console.error('❌ Error updating user profile:', updateError);
    }

    console.log('✅ Subscription change processed for user:', userId);
  } catch (error) {
    console.error('❌ Error handling subscription change:', error);
    throw error;
  }
}

// Handle subscription deletion
async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  console.log('🗑️ Processing subscription deleted:', subscription.id);
  await handleSubscriptionChange(subscription); // Same logic, just different status
}

// Handle successful invoice payment
async function handleInvoicePaymentSucceeded(invoice: Stripe.Invoice) {
  console.log('💰 Processing invoice payment succeeded:', invoice.id);
  
  try {
    const customerId = invoice.customer as string;
    
    // Update last payment date
    const { error } = await supabase
      .from('user_profiles')
      .update({
        last_payment_date: new Date().toISOString(),
        payment_status: 'verified',
        updated_at: new Date().toISOString()
      })
      .eq('stripe_customer_id', customerId);

    if (error) {
      console.error('❌ Error updating payment date:', error);
    } else {
      console.log('✅ Updated payment date for customer:', customerId);
    }
  } catch (error) {
    console.error('❌ Error handling invoice payment succeeded:', error);
  }
}

// Handle failed invoice payment
async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  console.log('❌ Processing invoice payment failed:', invoice.id);
  
  try {
    const customerId = invoice.customer as string;
    
    // Log the failed payment
    const { error } = await supabase
      .from('payment_logs')
      .insert({
        stripe_customer_id: customerId,
        payment_status: 'failed',
        error_message: 'Invoice payment failed',
        processed_at: new Date().toISOString(),
        webhook_verified: true,
        metadata: {
          invoice_id: invoice.id,
          amount_due: invoice.amount_due,
          currency: invoice.currency
        }
      });

    if (error) {
      console.error('❌ Error logging failed payment:', error);
    }
  } catch (error) {
    console.error('❌ Error handling invoice payment failed:', error);
  }
}

// Helper function to map Stripe price IDs to plan types
function mapPriceIdToPlanType(priceId: string): string {
  // Update these with your actual Stripe price IDs
  const priceMapping: { [key: string]: string } = {
    'price_1QexWRtCrOpCXM5InfpatS': 'try_out_plan',
    'price_1QexXRtCrOpCXM5InfpatS': 'base_plan',
    // Add more price IDs as needed
  };
  
  return priceMapping[priceId] || 'base_plan';
}

// Helper function to log webhook events
async function logWebhookEvent(event: Stripe.Event, status: 'success' | 'error', error?: any) {
  try {
    const logData: any = {
      event_type: event.type,
      payment_status: status === 'success' ? 'processed' : 'error',
      processed_at: new Date().toISOString(),
      webhook_verified: true,
      metadata: {
        event_id: event.id,
        created: new Date(event.created * 1000).toISOString(),
        livemode: event.livemode
      }
    };

    if (error) {
      logData.error_message = error.message;
      logData.metadata.error_stack = error.stack;
    }

    // Add session ID if it's a checkout event
    if (event.type === 'checkout.session.completed') {
      logData.stripe_session_id = (event.data.object as any).id;
    }

    // Add customer ID if available
    if (event.data.object && 'customer' in event.data.object) {
      logData.stripe_customer_id = event.data.object.customer;
    }

    const { error: dbError } = await supabase
      .from('payment_logs')
      .insert(logData);

    if (dbError) {
      console.error('❌ Error logging webhook event:', dbError);
    }
  } catch (logError) {
    console.error('❌ Error in logWebhookEvent:', logError);
  }
}

export { handler };

