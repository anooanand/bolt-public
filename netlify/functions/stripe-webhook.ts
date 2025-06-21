// ENHANCED: Stripe Webhook Handler with Proper RPC Function Calls
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
  console.log('🔔 Webhook received:', event.httpMethod);
  
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
    console.error('❌ Missing body or signature');
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing body or signature' }),
    };
  }

  let stripeEvent: Stripe.Event;

  try {
    // Verify the webhook signature
    stripeEvent = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    console.log('✅ Webhook signature verified successfully for event:', stripeEvent.type);
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
        console.log(`ℹ️ Unhandled event type: ${stripeEvent.type}`);
    }

    // Log the event for monitoring
    await logWebhookEvent(stripeEvent);

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        received: true, 
        event_type: stripeEvent.type,
        event_id: stripeEvent.id 
      }),
    };
  } catch (error: any) {
    console.error('❌ Error processing webhook:', error);
    
    // Log the error
    await logWebhookError(stripeEvent, error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Internal server error',
        event_type: stripeEvent.type,
        event_id: stripeEvent.id 
      }),
    };
  }
};

// ENHANCED: Handle successful checkout session completion
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

    console.log('👤 Processing payment for user:', userId, 'email:', customerEmail);

    // Get subscription details if it's a subscription
    let subscriptionId = null;
    let planType = 'base_plan';
    let amount = session.amount_total || 0;

    if (session.mode === 'subscription' && session.subscription) {
      subscriptionId = session.subscription as string;
      
      // Get subscription details from Stripe
      const subscription = await stripe.subscriptions.retrieve(subscriptionId);
      if (subscription.items.data.length > 0) {
        const priceId = subscription.items.data[0].price.id;
        console.log('💰 Price ID from subscription:', priceId);
        
        // Get plan type using our RPC function
        const { data: planData, error: planError } = await supabase
          .rpc('get_plan_type_from_price_id', { price_id: priceId });
        
        if (planError) {
          console.warn('⚠️ Error getting plan type, using default:', planError);
          planType = 'base_plan';
        } else {
          planType = planData || 'base_plan';
        }
        
        console.log('📋 Determined plan type:', planType);
      }
    } else if (session.line_items) {
      // For one-time payments, get price ID from line items
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
      if (lineItems.data.length > 0 && lineItems.data[0].price) {
        const priceId = lineItems.data[0].price.id;
        console.log('💰 Price ID from line items:', priceId);
        
        const { data: planData, error: planError } = await supabase
          .rpc('get_plan_type_from_price_id', { price_id: priceId });
        
        planType = planData || 'base_plan';
        console.log('📋 Determined plan type:', planType);
      }
    }

    // Call our enhanced RPC function to handle payment success
    const { data: result, error: rpcError } = await supabase
      .rpc('handle_payment_success', {
        p_user_id: userId,
        p_stripe_customer_id: customerId,
        p_stripe_subscription_id: subscriptionId,
        p_plan_type: planType,
        p_amount: amount,
        p_currency: session.currency || 'usd'
      });

    if (rpcError) {
      console.error('❌ RPC error handling payment success:', rpcError);
      throw rpcError;
    }

    console.log('✅ Payment success processed via RPC:', result);
    
    // Also update the existing stripe tables for compatibility
    await updateStripeCustomerRecord(userId, customerId);
    if (subscriptionId) {
      const subscription = await stripe.subscriptions.retrieve(subscriptionId);
      await updateStripeSubscriptionRecord(customerId, subscriptionId, subscription);
    }

    console.log('🎊 Checkout session completed successfully for user:', userId);

  } catch (error) {
    console.error('❌ Error handling checkout session completed:', error);
    throw error;
  }
}

// ENHANCED: Handle subscription creation
async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
  console.log('📝 Processing subscription created:', subscription.id);
  
  try {
    const customerId = subscription.customer as string;
    await updateStripeSubscriptionRecord(customerId, subscription.id, subscription);
    
    // Update subscription status using RPC
    const { data: result, error } = await supabase
      .rpc('handle_subscription_status_change', {
        p_stripe_customer_id: customerId,
        p_subscription_status: subscription.status,
        p_subscription_id: subscription.id
      });
    
    if (error) {
      console.error('❌ Error updating subscription status:', error);
    } else {
      console.log('✅ Subscription status updated:', result);
    }
    
    console.log('✅ Subscription created processed');
  } catch (error) {
    console.error('❌ Error handling subscription created:', error);
    throw error;
  }
}

// ENHANCED: Handle subscription updates
async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  console.log('🔄 Processing subscription updated:', subscription.id, 'status:', subscription.status);
  
  try {
    const customerId = subscription.customer as string;
    await updateStripeSubscriptionRecord(customerId, subscription.id, subscription);
    
    // Update subscription status using RPC
    const { data: result, error } = await supabase
      .rpc('handle_subscription_status_change', {
        p_stripe_customer_id: customerId,
        p_subscription_status: subscription.status,
        p_subscription_id: subscription.id
      });
    
    if (error) {
      console.error('❌ Error updating subscription status:', error);
    } else {
      console.log('✅ Subscription status updated:', result);
    }
    
    console.log('✅ Subscription updated processed');
  } catch (error) {
    console.error('❌ Error handling subscription updated:', error);
    throw error;
  }
}

// ENHANCED: Handle subscription deletion
async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  console.log('🗑️ Processing subscription deleted:', subscription.id);
  
  try {
    const customerId = subscription.customer as string;
    
    // Update subscription status to canceled using RPC
    const { data: result, error } = await supabase
      .rpc('handle_subscription_status_change', {
        p_stripe_customer_id: customerId,
        p_subscription_status: 'canceled',
        p_subscription_id: subscription.id
      });
    
    if (error) {
      console.error('❌ Error updating subscription status:', error);
    } else {
      console.log('✅ Subscription canceled:', result);
    }
    
    console.log('✅ Subscription deleted processed');
  } catch (error) {
    console.error('❌ Error handling subscription deleted:', error);
    throw error;
  }
}

// ENHANCED: Handle successful invoice payment
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
        payment_status: 'verified',
        subscription_status: 'active',
        updated_at: new Date().toISOString()
      })
      .eq('stripe_customer_id', customerId);

    if (error) {
      console.error('❌ Error updating user profile for invoice payment:', error);
      throw error;
    }

    // Also update access status
    const { error: accessError } = await supabase
      .from('user_access_status')
      .update({
        payment_verified: true,
        subscription_status: 'active',
        has_access: true
      })
      .eq('stripe_customer_id', customerId);

    if (accessError) {
      console.warn('⚠️ Error updating access status:', accessError);
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
    
    // Log the failed payment but don't immediately revoke access
    // Let the subscription status handle access control
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
  const subscriptionData: any = {
    customer_id: customerId,
    subscription_id: subscriptionId,
    status: subscription.status,
    current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
    current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
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

// ENHANCED: Helper function to log webhook events
async function logWebhookEvent(event: Stripe.Event) {
  try {
    const eventData: any = {
      event_type: event.type,
      payment_status: 'processed',
      processed_at: new Date().toISOString(),
      webhook_verified: true,
      metadata: {
        event_id: event.id,
        created: new Date(event.created * 1000).toISOString(),
        livemode: event.livemode
      }
    };

    // Add session ID if it's a checkout event
    if (event.type === 'checkout.session.completed') {
      eventData.stripe_session_id = (event.data.object as any).id;
    }

    // Add customer ID if available
    if (event.data.object && 'customer' in event.data.object) {
      eventData.stripe_customer_id = event.data.object.customer;
    }

    const { error } = await supabase
      .from('payment_logs')
      .insert(eventData);

    if (error) {
      console.error('❌ Error logging webhook event:', error);
    }
  } catch (error) {
    console.error('❌ Error in logWebhookEvent:', error);
  }
}

// ENHANCED: Helper function to log webhook errors
async function logWebhookError(event: Stripe.Event, error: any) {
  try {
    const errorData: any = {
      event_type: event.type,
      payment_status: 'error',
      processed_at: new Date().toISOString(),
      webhook_verified: true,
      error_message: error.message || 'Unknown error',
      metadata: {
        event_id: event.id,
        error_stack: error.stack,
        error_name: error.name,
        created: new Date(event.created * 1000).toISOString()
      }
    };

    // Add session ID if it's a checkout event
    if (event.type === 'checkout.session.completed') {
      errorData.stripe_session_id = (event.data.object as any).id;
    }

    // Add customer ID if available
    if (event.data.object && 'customer' in event.data.object) {
      errorData.stripe_customer_id = event.data.object.customer;
    }

    const { dbError } = await supabase
      .from('payment_logs')
      .insert(errorData);

    if (dbError) {
      console.error('❌ Error logging webhook error:', dbError);
    }
  } catch (logError) {
    console.error('❌ Error in logWebhookError:', logError);
  }
}

export { handler };

