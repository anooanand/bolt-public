import { Handler } from '@netlify/functions';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15',
});

// Initialize Supabase for user identification
const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    const { priceId, planType, userId, userEmail } = JSON.parse(event.body || '{}');

    // Validate required parameters
    if (!priceId || !planType) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required parameters: priceId and planType' }),
      };
    }

    console.log('🚀 Creating checkout session for:', { priceId, planType, userId, userEmail });

    // If userId is provided, grant temporary access immediately
    if (userId) {
      try {
        const { error: tempAccessError } = await supabase.rpc('grant_temporary_access', {
          p_user_id: userId,
          p_hours: 24,
          p_reason: 'Payment initiated'
        });

        if (tempAccessError) {
          console.error('❌ Error granting temporary access:', tempAccessError);
          // Don't fail the checkout creation, just log the error
        } else {
          console.log('✅ Temporary access granted for user:', userId);
        }
      } catch (error) {
        console.error('❌ Error in temporary access grant:', error);
        // Continue with checkout creation even if temp access fails
      }
    }

    // Create the checkout session with enhanced parameters
    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${getBaseUrl(event)}?paymentSuccess=true&planType=${planType}`,
      cancel_url: `${getBaseUrl(event)}?paymentSuccess=false`,
      
      // Enhanced parameters for user identification
      client_reference_id: userId || undefined,
      customer_email: userEmail || undefined,
      
      // Additional metadata for tracking
      metadata: {
        plan_type: planType,
        user_id: userId || 'unknown',
        created_at: new Date().toISOString(),
        source: 'bolt_new_app'
      },
      
      // Subscription data for better tracking
      subscription_data: {
        metadata: {
          plan_type: planType,
          user_id: userId || 'unknown',
          source: 'bolt_new_app'
        }
      },
      
      // Customer creation parameters
      customer_creation: userId ? 'always' : undefined,
    };

    // If we have user information, try to find or create customer
    if (userId && userEmail) {
      try {
        // Check if customer already exists
        const existingCustomers = await stripe.customers.list({
          email: userEmail,
          limit: 1
        });

        if (existingCustomers.data.length > 0) {
          // Use existing customer
          sessionParams.customer = existingCustomers.data[0].id;
          console.log('✅ Using existing Stripe customer:', existingCustomers.data[0].id);
        } else {
          // Let Stripe create a new customer with the provided email
          console.log('✅ Will create new Stripe customer with email:', userEmail);
        }
      } catch (error) {
        console.error('❌ Error checking existing customer:', error);
        // Continue without customer pre-creation
      }
    }

    // Create the checkout session
    const session = await stripe.checkout.sessions.create(sessionParams);

    console.log('✅ Checkout session created:', session.id);

    // Log the session creation for tracking
    if (userId) {
      try {
        await supabase
          .from('payment_logs')
          .insert({
            user_id: userId,
            stripe_session_id: session.id,
            event_type: 'checkout_session_created',
            payment_status: 'pending',
            plan_type: planType,
            metadata: {
              session_url: session.url,
              price_id: priceId,
              customer_email: userEmail
            }
          });
      } catch (logError) {
        console.error('❌ Error logging session creation:', logError);
        // Don't fail the request for logging errors
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        url: session.url,
        sessionId: session.id,
        message: userId ? 'Checkout session created with temporary access granted' : 'Checkout session created'
      }),
    };

  } catch (error: any) {
    console.error('❌ Stripe Checkout error:', error);
    
    // Log the error if we have user context
    try {
      const { userId } = JSON.parse(event.body || '{}');
      if (userId) {
        await supabase
          .from('payment_logs')
          .insert({
            user_id: userId,
            event_type: 'checkout_session_error',
            payment_status: 'error',
            error_message: error.message,
            metadata: {
              error_stack: error.stack,
              request_body: event.body
            }
          });
      }
    } catch (logError) {
      console.error('❌ Error logging checkout error:', logError);
    }

    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Failed to create checkout session',
        message: error.message 
      }),
    };
  }
};

// Helper function to get base URL from the event
function getBaseUrl(event: any): string {
  // Try to get the origin from headers
  const origin = event.headers.origin || event.headers.Origin;
  if (origin) {
    return origin;
  }
  
  // Fallback to referer
  const referer = event.headers.referer || event.headers.Referer;
  if (referer) {
    try {
      const url = new URL(referer);
      return `${url.protocol}//${url.host}`;
    } catch (e) {
      console.error('❌ Error parsing referer:', e);
    }
  }
  
  // Final fallback - you should replace this with your actual domain
  return 'https://keen-horse-21743a.netlify.app';
}

export { handler };

