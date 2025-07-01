import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase and Stripe clients
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

// Helper function to get plan type
function getPlanTypeFromPriceId(priceId: string): string {
  const planMapping: { [key: string]: string } = {
    'price_1RXEqERtcrDpOK7ME3QH9uzu': 'premium_plan',
    'price_1QzeXvRtcrDpOK7M5IHfp8ES': 'premium_plan',
  };
  return planMapping[priceId] || 'premium_plan';
}

// CORRECTED: Handle checkout session completed - addresses specific database issues
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

  // Get subscription details
  let planType = 'premium_plan';
  let currentPeriodStart = new Date().toISOString();
  let currentPeriodEnd = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

  if (subscriptionId) {
    try {
      const subscription = await stripe.subscriptions.retrieve(subscriptionId);
      const priceId = subscription.items.data[0]?.price.id;
      console.log('💰 Price ID:', priceId);
      planType = getPlanTypeFromPriceId(priceId);
      console.log('📋 Plan type:', planType);
      
      currentPeriodStart = new Date(subscription.current_period_start * 1000).toISOString();
      currentPeriodEnd = new Date(subscription.current_period_end * 1000).toISOString();
      console.log('📅 Period:', currentPeriodStart, 'to', currentPeriodEnd);
    } catch (error) {
      console.error('⚠️ Error fetching subscription:', error);
    }
  }

  try {
    // STEP 1: Handle user_profiles table (this is a real table)
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
      // FIXED: Removed user_id field that doesn't exist in database
      const { error: createError } = await supabase
        .from('user_profiles')
        .insert({
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
          role: 'user'
          // REMOVED: user_id (field doesn't exist in database)
        });

      if (createError) {
        console.error('❌ Error creating user profile:', createError);
        throw createError;
      }
      console.log('✅ Created new user profile successfully');
    } else {
      console.log('📝 Updating existing user profile...');
      const { error: profileError, count: profileCount } = await supabase
        .from('user_profiles')
        .update({
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
        })
        .eq('email', customerEmail);

      if (profileError) {
        console.error('❌ Error updating user_profiles:', profileError);
        throw profileError;
      }
      console.log(`✅ Updated user_profiles successfully (${profileCount} rows affected)`);
    }

    // STEP 2: Handle user_access_status - SKIP if it's a view
    console.log('🔍 Attempting to update user access status...');
    try {
      // Try to update first (safer for views)
      const { error: accessUpdateError, count: accessCount } = await supabase
        .from('user_access_status')
        .update({
          payment_verified: true,
          subscription_status: 'active',
          has_access: true,
          access_type: `Paid subscription (${planType})`,
          temp_access_until: currentPeriodEnd,
          email_verified: true
        })
        .eq('email', customerEmail);

      if (accessUpdateError) {
        console.error('❌ Error updating user_access_status:', accessUpdateError);
        
        // If update fails, try insert (only if it's a real table)
        if (accessUpdateError.code !== '55000') { // Not a view error
          console.log('🔐 Trying to insert new user access status...');
          const { error: createAccessError } = await supabase
            .from('user_access_status')
            .insert({
              email: customerEmail,
              payment_verified: true,
              subscription_status: 'active',
              has_access: true,
              access_type: `Paid subscription (${planType})`,
              temp_access_until: currentPeriodEnd,
              email_verified: true,
              manual_override: false
            });

          if (createAccessError) {
            console.error('❌ Error creating user access status:', createAccessError);
            // Don't throw - this might be a view
          } else {
            console.log('✅ Created new user access status successfully');
          }
        } else {
          console.log('⚠️ user_access_status appears to be a view - skipping direct manipulation');
        }
      } else {
        console.log(`✅ Updated user_access_status successfully (${accessCount} rows affected)`);
      }
    } catch (error) {
      console.error('❌ Error with user_access_status table:', error);
      // Don't throw - continue processing
    }

    console.log('🎊 Checkout session processing completed successfully!');

  } catch (error) {
    console.error('❌ Error in payment processing:', error);
    
    // Simplified fallback - just ensure user profile is updated
    try {
      console.log('🔄 Attempting simplified fallback...');
      await supabase
        .from('user_profiles')
        .upsert({
          email: customerEmail,
          payment_verified: true,
          payment_status: 'verified',
          subscription_status: 'active',
          plan_type: planType,
          subscription_plan: planType,
          temp_access_until: currentPeriodEnd,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'email'
        });
      
      console.log('✅ Simplified fallback completed');
    } catch (fallbackError) {
      console.error('❌ Fallback also failed:', fallbackError);
    }
    
    throw error;
  }
}

// Simplified subscription change handler
async function handleSubscriptionChange(subscription: Stripe.Subscription) {
  console.log('🔄 Processing subscription change:', subscription.id, 'status:', subscription.status);

  const customerId = subscription.customer as string;
  
  try {
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

    // Update only user_profiles table
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

    console.log('✅ Updated subscription status successfully');
  } catch (error) {
    console.error('❌ Error in subscription change handling:', error);
    throw error;
  }
}

// Simplified invoice payment handler
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

// Main handler
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
      process.env.STRIPE_WEBHOOK_SECRET!
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

