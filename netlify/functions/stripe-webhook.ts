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

// FIXED: Handle checkout session completed with proper UUID generation and field mapping
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

  // FIXED: Use database transaction for atomicity
  const { data: transactionData, error: transactionError } = await supabase.rpc('begin');
  if (transactionError) {
    console.error('❌ Error starting transaction:', transactionError);
    throw transactionError;
  }

  try {
    // STEP 1: Check if user exists in auth.users
    console.log('🔍 Checking if user exists in auth.users...');
    const { data: authUser, error: authError } = await supabase
      .from('auth.users')
      .select('id, email')
      .eq('email', customerEmail)
      .single();

    let userId: string;

    if (authError && authError.code === 'PGRST116') {
      // User doesn't exist in auth.users, this is unusual for a payment webhook
      // but we'll handle it by creating a user profile without auth user
      console.log('⚠️ User not found in auth.users, creating profile without auth reference');
      userId = crypto.randomUUID(); // Generate new UUID for user profile
    } else if (authError) {
      console.error('❌ Error checking auth.users:', authError);
      throw authError;
    } else {
      userId = authUser.id;
      console.log('✅ Found user in auth.users:', userId);
    }

    // STEP 2: Handle user_profiles table with proper UUID generation
    console.log('🔍 Checking if user profile exists...');
    const { data: existingProfile, error: checkError } = await supabase
      .from('user_profiles')
      .select('id, email, user_id')
      .eq('email', customerEmail)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      console.error('❌ Error checking user profile:', checkError);
      throw checkError;
    }

    if (!existingProfile) {
      console.log('👤 Creating new user profile...');
      
      // FIXED: Generate UUID for id field and properly map all fields
      const newProfileData = {
        id: userId, // Use the same UUID as auth.users or generated UUID
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
        role: 'user',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        manual_override: false,
        temporary_access_granted: false
      };

      // Only add user_id if we have an auth user
      if (authUser) {
        newProfileData.user_id = authUser.id;
      }

      const { error: createError } = await supabase
        .from('user_profiles')
        .insert(newProfileData);

      if (createError) {
        console.error('❌ Error creating user profile:', createError);
        throw createError;
      }
      console.log('✅ Created new user profile successfully');
    } else {
      console.log('📝 Updating existing user profile...');
      
      const updateData = {
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
      };

      const { error: updateError, count: updateCount } = await supabase
        .from('user_profiles')
        .update(updateData)
        .eq('email', customerEmail);

      if (updateError) {
        console.error('❌ Error updating user_profiles:', updateError);
        throw updateError;
      }
      console.log(`✅ Updated user_profiles successfully (${updateCount} rows affected)`);
    }

    // STEP 3: Handle user_access_status table (if it exists and is not a view)
    console.log('🔍 Attempting to update user access status...');
    try {
      const { error: accessError } = await supabase
        .from('user_access_status')
        .upsert({
          email: customerEmail,
          payment_verified: true,
          subscription_status: 'active',
          has_access: true,
          access_type: `Paid subscription (${planType})`,
          temp_access_until: currentPeriodEnd,
          email_verified: true,
          manual_override: false
        }, {
          onConflict: 'email'
        });

      if (accessError) {
        console.warn('⚠️ Could not update user_access_status (may be a view):', accessError);
        // Don't throw - this table might be a view or not exist
      } else {
        console.log('✅ Updated user_access_status successfully');
      }
    } catch (error) {
      console.warn('⚠️ Error with user_access_status table:', error);
      // Don't throw - continue processing
    }

    // FIXED: Commit transaction
    const { error: commitError } = await supabase.rpc('commit');
    if (commitError) {
      console.error('❌ Error committing transaction:', commitError);
      throw commitError;
    }

    console.log('🎊 Checkout session processing completed successfully!');

  } catch (error) {
    console.error('❌ Error in payment processing:', error);
    
    // Rollback transaction
    const { error: rollbackError } = await supabase.rpc('rollback');
    if (rollbackError) {
      console.error('❌ Error rolling back transaction:', rollbackError);
    }
    
    throw error;
  }
}

// FIXED: Subscription change handler with proper error handling
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
        current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
        current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
        temp_access_until: isActive ? new Date(subscription.current_period_end * 1000).toISOString() : null,
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

// FIXED: Invoice payment handler
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

// FIXED: Main handler with comprehensive error handling
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
        processed_at: new Date().toISOString(),
        success: true
      }) 
    };
    
  } catch (error) {
    console.error(`❌ Error processing webhook event ${stripeEvent.type}:`, error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    const errorDetails = error instanceof Error && 'code' in error ? error : null;
    
    return { 
      statusCode: 500, 
      body: JSON.stringify({ 
        error: 'Internal Server Error', 
        message: errorMessage,
        details: errorDetails,
        event_type: stripeEvent.type,
        event_id: stripeEvent.id,
        timestamp: new Date().toISOString(),
        success: false
      }) 
    };
  }
}