import { Handler } from '@netlify/functions';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

// Validate required environment variables
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is required');
}

if (!process.env.VITE_SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
  throw new Error('Supabase configuration is required');
}

if (!process.env.STRIPE_WEBHOOK_SECRET) {
  throw new Error('STRIPE_WEBHOOK_SECRET is required');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-06-20',
});

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// Logger for debugging
const logger = {
  info: (message: string, data?: any) => {
    console.log(`INFO: ${message}`, data ? JSON.stringify(data, null, 2) : '');
  },
  error: (message: string, error: any) => {
    console.error(`ERROR: ${message}`, error);
  }
};

function getPlanTypeFromPriceId(priceId: string): string {
  const planMapping: { [key: string]: string } = {
    'price_1RXEqERtcrDpOK7ME3QH9uzu': 'premium_plan',
    'price_1QzeXvRtcrDpOK7M5IHfp8ES': 'premium_plan',
  };
  return planMapping[priceId] || 'premium_plan';
}

export const handler: Handler = async (event) => {
  const logContext = {
    timestamp: new Date().toISOString(),
    requestId: event.requestContext?.requestId || 'unknown',
    path: event.path,
    method: event.httpMethod,
  };

  logger.info('Webhook request received', logContext);

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    logger.info('Invalid method', { ...logContext, method: event.httpMethod });
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  // Get the raw request body for signature verification
  let rawBody: string;
  try {
    rawBody = event.isBase64Encoded
      ? Buffer.from(event.body || '', 'base64').toString('utf8')
      : (event.body || '');

    logger.info('Request body parsed', { 
      ...logContext, 
      bodyLength: rawBody.length,
      isBase64: event.isBase64Encoded
    });
  } catch (error) {
    logger.error('Failed to parse request body', { ...logContext, error });
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid request body' }),
    };
  }

  // Get the Stripe signature from headers
  const stripeSignature = event.headers['stripe-signature'];
  if (!stripeSignature) {
    logger.error('Missing Stripe signature', logContext);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing Stripe signature' }),
    };
  }

  try {
    // Verify the event
    let stripeEvent;
    try {
      stripeEvent = stripe.webhooks.constructEvent(
        rawBody,
        stripeSignature,
        process.env.STRIPE_WEBHOOK_SECRET
      );

      logger.info('Webhook signature verified', { 
        ...logContext, 
        eventType: stripeEvent.type,
        eventId: stripeEvent.id
      });
    } catch (err) {
      logger.error('Webhook signature verification failed', { 
        ...logContext, 
        error: err,
      });
      return {
        statusCode: 400,
        body: JSON.stringify({ error: `Webhook signature verification failed: ${err instanceof Error ? err.message : 'Unknown error'}` }),
      };
    }

    // Handle the event
    switch (stripeEvent.type) {
      case 'checkout.session.completed': {
        const session = stripeEvent.data.object as Stripe.Checkout.Session;
        
        logger.info('Processing checkout.session.completed', {
          ...logContext,
          sessionId: session.id,
          customerId: session.customer,
          subscriptionId: session.subscription,
          customerEmail: session.customer_email
        });

        if (!session.customer_email) {
          logger.error('No customer email in session', { ...logContext, sessionId: session.id });
          throw new Error('No customer email provided');
        }

        // Get subscription details if it's a subscription
        let planType = 'premium_plan';
        let currentPeriodEnd = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

        if (session.subscription) {
          try {
            const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
            const priceId = subscription.items.data[0]?.price.id;
            planType = getPlanTypeFromPriceId(priceId);
            currentPeriodEnd = new Date(subscription.current_period_end * 1000);
            
            logger.info('Subscription details retrieved', {
              ...logContext,
              subscriptionId: subscription.id,
              status: subscription.status,
              planType: planType,
              currentPeriodEnd: currentPeriodEnd.toISOString()
            });
          } catch (error) {
            logger.error('Error fetching subscription details', { ...logContext, error });
          }
        }

        // Find or create user profile by email
        const { data: existingProfile, error: profileError } = await supabase
          .from('user_profiles')
          .select('id, email')
          .eq('email', session.customer_email)
          .single();

        if (profileError && profileError.code !== 'PGRST116') {
          logger.error('Error checking user profile', { ...logContext, error: profileError });
          throw profileError;
        }

        if (!existingProfile) {
          // Create new user profile
          const { data: newProfile, error: createError } = await supabase
            .from('user_profiles')
            .insert({
              email: session.customer_email,
              payment_status: 'verified',
              payment_verified: true,
              subscription_status: 'active',
              plan_type: planType,
              stripe_customer_id: session.customer as string,
              stripe_subscription_id: session.subscription as string,
              temporary_access_expires: currentPeriodEnd.toISOString(),
              last_payment_date: new Date().toISOString(),
              role: 'user',
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            })
            .select()
            .single();

          if (createError) {
            logger.error('Failed to create user profile', { ...logContext, error: createError });
            throw createError;
          }

          logger.info('New user profile created', {
            ...logContext,
            profileId: newProfile.id,
            email: session.customer_email
          });
        } else {
          // Update existing user profile
          const { error: updateError } = await supabase
            .from('user_profiles')
            .update({
              payment_status: 'verified',
              payment_verified: true,
              subscription_status: 'active',
              plan_type: planType,
              stripe_customer_id: session.customer as string,
              stripe_subscription_id: session.subscription as string,
              temporary_access_expires: currentPeriodEnd.toISOString(),
              last_payment_date: new Date().toISOString(),
              updated_at: new Date().toISOString()
            })
            .eq('id', existingProfile.id);

          if (updateError) {
            logger.error('Failed to update user profile', { ...logContext, error: updateError });
            throw updateError;
          }

          logger.info('User profile updated', {
            ...logContext,
            profileId: existingProfile.id,
            email: session.customer_email
          });
        }

        break;
      }

      case 'customer.subscription.updated': {
        const subscription = stripeEvent.data.object as Stripe.Subscription;
        
        logger.info('Processing subscription update', {
          ...logContext,
          subscriptionId: subscription.id,
          status: subscription.status,
          customerId: subscription.customer
        });

        // Update user profile by stripe_customer_id
        const { error: updateError } = await supabase
          .from('user_profiles')
          .update({
            subscription_status: subscription.status,
            payment_verified: subscription.status === 'active',
            payment_status: subscription.status === 'active' ? 'verified' : 'cancelled',
            temporary_access_expires: subscription.status === 'active' 
              ? new Date(subscription.current_period_end * 1000).toISOString() 
              : null,
            updated_at: new Date().toISOString()
          })
          .eq('stripe_customer_id', subscription.customer as string);

        if (updateError) {
          logger.error('Failed to update subscription status', { ...logContext, error: updateError });
        } else {
          logger.info('Subscription status updated', { ...logContext, subscriptionId: subscription.id });
        }

        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = stripeEvent.data.object as Stripe.Invoice;
        
        logger.info('Processing invoice payment', {
          ...logContext,
          invoiceId: invoice.id,
          customerId: invoice.customer
        });

        // Update payment date
        const { error: updateError } = await supabase
          .from('user_profiles')
          .update({
            last_payment_date: new Date().toISOString(),
            payment_status: 'verified',
            payment_verified: true,
            updated_at: new Date().toISOString()
          })
          .eq('stripe_customer_id', invoice.customer as string);

        if (updateError) {
          logger.error('Failed to update payment date', { ...logContext, error: updateError });
        } else {
          logger.info('Payment date updated', { ...logContext, invoiceId: invoice.id });
        }

        break;
      }

      default:
        logger.info('Unhandled event type', { ...logContext, type: stripeEvent.type });
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ received: true, success: true }),
    };
  } catch (error) {
    logger.error('Error processing webhook', { 
      ...logContext, 
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error processing webhook' 
      }),
    };
  }
};

