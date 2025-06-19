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
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  const body = event.body;
  const signature = event.headers['stripe-signature'];

  if (!body || !signature) {
    console.error('Missing body or signature');
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing body or signature' }),
    };
  }

  let stripeEvent: Stripe.Event;

  try {
    // Verify the webhook signature
    stripeEvent = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    console.log('✅ Webhook signature verified successfully');
  } catch (error: any) {
    console.error('❌ Webhook signature verification failed:', error.message);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Webhook signature verification failed' }),
    };
  }

  try {
    // Handle different event types
    switch (stripeEvent.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(stripeEvent.data.object as Stripe.Checkout.Session);
        break;
      
      case 'customer.subscription.created':
        await handleSubscriptionCreated(stripeEvent.data.object as Stripe.Subscription);
        break;
      
      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(stripeEvent.data.object as Stripe.Subscription);
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
        console.log(`Unhandled event type: ${stripeEvent.type}`);
    }

    // Log the event for monitoring
    await logWebhookEvent(stripeEvent);

    return {
      statusCode: 200,
      body: JSON.stringify({ received: true }),
    };
  } catch (error: any) {
    console.error('❌ Error processing webhook:', error);
    
    // Log the error
    await logWebhookError(stripeEvent, error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};

// Handle successful checkout session completion
async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  console.log('🎉 Processing checkout session completed:', session.id);
  
  try {
    // Extract user ID from client_reference_id
    const userId = session.client_reference_id;
    const customerEmail = session.customer_email;
    const customerId = session.customer as string;
    
    if (!userId) {
      console.error('❌ No client_reference_id found in session:', session.id);
      throw new Error('No user ID found in checkout session');
    }

    // Get subscription details if it's a subscription
    let subscriptionId = null;
    let planType = 'unknown';
    let amount = session.amount_total || 0;

    if (session.mode === 'subscription' && session.subscription) {
      subscriptionId = session.subscription as string;
      
      // Get subscription details from Stripe
      const subscription = await stripe.subscriptions.retrieve(subscriptionId);
      if (subscription.items.data.length > 0) {
        const priceId = subscription.items.data[0].price.id;
        planType = getPlanTypeFromPriceId(priceId);
      }
    }

    // Update user profile with payment success
    const { error: dbError } = await supabase.rpc('handle_payment_success', {
      p_user_id: userId,
      p_stripe_customer_id: customerId,
      p_stripe_subscription_id: subscriptionId,
      p_plan_type: planType,
      p_amount: amount,
      p_currency: session.currency || 'usd'
    });

    if (dbError) {
      console.error('❌ Database error handling payment success:', dbError);
      throw dbError;
    }

    console.log('✅ Payment success processed for user:', userId);
    
    // Also update the existing stripe tables for compatibility
    await updateStripeCustomerRecord(userId, customerId);
    if (subscriptionId) {
      await updateStripeSubscriptionRecord(customerId, subscriptionId, subscription);
    }

  } catch (error) {
    console.error('❌ Error handling checkout session completed:', error);
    throw error;
  }
}

// Handle subscription creation
async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
  console.log('📝 Processing subscription created:', subscription.id);
  
  try {
    const customerId = subscription.customer as string;
    await updateStripeSubscriptionRecord(customerId, subscription.id, subscription);
    console.log('✅ Subscription created processed');
  } catch (error) {
    console.error('❌ Error handling subscription created:', error);
    throw error;
  }
}

// Handle subscription updates
async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  console.log('🔄 Processing subscription updated:', subscription.id);
  
  try {
    const customerId = subscription.customer as string;
    await updateStripeSubscriptionRecord(customerId, subscription.id, subscription);
    
    // If subscription is canceled or past due, update user access
    if (subscription.status === 'canceled' || subscription.status === 'past_due') {
      await updateUserSubscriptionStatus(customerId, subscription.status);
    }
    
    console.log('✅ Subscription updated processed');
  } catch (error) {
    console.error('❌ Error handling subscription updated:', error);
    throw error;
  }
}

// Handle subscription deletion
async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  console.log('🗑️ Processing subscription deleted:', subscription.id);
  
  try {
    const customerId = subscription.customer as string;
    await updateUserSubscriptionStatus(customerId, 'canceled');
    console.log('✅ Subscription deleted processed');
  } catch (error) {
    console.error('❌ Error handling subscription deleted:', error);
    throw error;
  }
}

// Handle successful invoice payment
async function handleInvoicePaymentSucceeded(invoice: Stripe.Invoice) {
  console.log('💰 Processing invoice payment succeeded:', invoice.id);
  
  try {
    const customerId = invoice.customer as string;
    const subscriptionId = invoice.subscription as string;
    
    // Update payment date and ensure access is active
    const { error } = await supabase
      .from('user_profiles')
      .update({
        last_payment_date: new Date().toISOString(),
        payment_status: 'paid',
        subscription_status: 'active',
        updated_at: new Date().toISOString()
      })
      .eq('stripe_customer_id', customerId);

    if (error) {
      console.error('❌ Error updating user profile for invoice payment:', error);
      throw error;
    }

    console.log('✅ Invoice payment succeeded processed');
  } catch (error) {
    console.error('❌ Error handling invoice payment succeeded:', error);
    throw error;
  }
}

// Handle failed invoice payment
async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  console.log('❌ Processing invoice payment failed:', invoice.id);
  
  try {
    const customerId = invoice.customer as string;
    
    // Update payment status but don't immediately revoke access
    // Let the subscription status handle access control
    const { error } = await supabase
      .from('user_profiles')
      .update({
        updated_at: new Date().toISOString()
      })
      .eq('stripe_customer_id', customerId);

    if (error) {
      console.error('❌ Error updating user profile for failed payment:', error);
      throw error;
    }

    console.log('✅ Invoice payment failed processed');
  } catch (error) {
    console.error('❌ Error handling invoice payment failed:', error);
    throw error;
  }
}

// Helper function to update stripe customer record
async function updateStripeCustomerRecord(userId: string, customerId: string) {
  const { error } = await supabase
    .from('stripe_customers')
    .upsert({
      user_id: userId,
      customer_id: customerId,
      updated_at: new Date().toISOString()
    }, {
      onConflict: 'user_id'
    });

  if (error) {
    console.error('❌ Error updating stripe customer record:', error);
    throw error;
  }
}

// Helper function to update stripe subscription record
async function updateStripeSubscriptionRecord(customerId: string, subscriptionId: string, subscription: Stripe.Subscription) {
  const subscriptionData = {
    customer_id: customerId,
    subscription_id: subscriptionId,
    status: subscription.status as any,
    current_period_start: subscription.current_period_start,
    current_period_end: subscription.current_period_end,
    cancel_at_period_end: subscription.cancel_at_period_end,
    updated_at: new Date().toISOString()
  };

  // Add price_id if available
  if (subscription.items.data.length > 0) {
    subscriptionData.price_id = subscription.items.data[0].price.id;
  }

  const { error } = await supabase
    .from('stripe_subscriptions')
    .upsert(subscriptionData, {
      onConflict: 'customer_id'
    });

  if (error) {
    console.error('❌ Error updating stripe subscription record:', error);
    throw error;
  }
}

// Helper function to update user subscription status
async function updateUserSubscriptionStatus(customerId: string, status: string) {
  const subscriptionStatus = status === 'canceled' ? 'canceled' : 
                           status === 'past_due' ? 'past_due' : 'active';
  
  const { error } = await supabase
    .from('user_profiles')
    .update({
      subscription_status: subscriptionStatus,
      updated_at: new Date().toISOString()
    })
    .eq('stripe_customer_id', customerId);

  if (error) {
    console.error('❌ Error updating user subscription status:', error);
    throw error;
  }
}

// Helper function to determine plan type from price ID
function getPlanTypeFromPriceId(priceId: string): string {
  // Map your Stripe price IDs to plan types
  const priceIdToPlan: { [key: string]: string } = {
    'price_1234567890': 'basic-monthly',
    'price_0987654321': 'premium-monthly',
    // Add your actual price IDs here
  };
  
  return priceIdToPlan[priceId] || 'unknown';
}

// Helper function to log webhook events
async function logWebhookEvent(event: Stripe.Event) {
  try {
    const { error } = await supabase
      .from('payment_logs')
      .insert({
        stripe_session_id: event.type === 'checkout.session.completed' ? event.data.object.id : null,
        event_type: event.type,
        payment_status: 'processed',
        processed_at: new Date().toISOString(),
        webhook_verified: true,
        metadata: {
          event_id: event.id,
          created: event.created,
          livemode: event.livemode
        }
      });

    if (error) {
      console.error('❌ Error logging webhook event:', error);
    }
  } catch (error) {
    console.error('❌ Error in logWebhookEvent:', error);
  }
}

// Helper function to log webhook errors
async function logWebhookError(event: Stripe.Event, error: any) {
  try {
    const { dbError } = await supabase
      .from('payment_logs')
      .insert({
        stripe_session_id: event.type === 'checkout.session.completed' ? event.data.object.id : null,
        event_type: event.type,
        payment_status: 'error',
        processed_at: new Date().toISOString(),
        webhook_verified: true,
        error_message: error.message || 'Unknown error',
        metadata: {
          event_id: event.id,
          error_stack: error.stack,
          error_name: error.name
        }
      });

    if (dbError) {
      console.error('❌ Error logging webhook error:', dbError);
    }
  } catch (logError) {
    console.error('❌ Error in logWebhookError:', logError);
  }
}

export { handler };

