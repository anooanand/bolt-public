import { Handler } from '@netlify/functions';
import Stripe from 'stripe';

// Initialize Stripe with error handling
let stripe: Stripe;
try {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY environment variable is not set');
  }
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2022-11-15',
  });
} catch (error) {
  console.error('Failed to initialize Stripe:', error);
}

const handler: Handler = async (event) => {
  // Enhanced CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, Accept',
    'Access-Control-Allow-Methods': 'POST, OPTIONS, GET',
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    console.log('=== STRIPE CHECKOUT SESSION CREATION ===');
    console.log('Event headers:', JSON.stringify(event.headers, null, 2));
    console.log('Event body:', event.body);

    // Check if Stripe is initialized
    if (!stripe) {
      console.error('Stripe not initialized - missing STRIPE_SECRET_KEY');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'Payment system not configured',
          message: 'Stripe secret key is missing'
        }),
      };
    }

    // Parse request body
    let requestData;
    try {
      requestData = JSON.parse(event.body || '{}');
    } catch (parseError) {
      console.error('Failed to parse request body:', parseError);
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid JSON in request body' }),
      };
    }

    const { priceId, planType, userId, userEmail } = requestData;
    console.log('Parsed request data:', { priceId, planType, userId, userEmail });

    // Validate required parameters
    if (!priceId) {
      console.error('Missing priceId parameter');
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing required parameter: priceId' }),
      };
    }

    // Get base URL for redirects
    const baseUrl = getBaseUrl(event);
    console.log('Base URL determined:', baseUrl);

    // Prepare checkout session parameters
    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/payment-success?session_id={CHECKOUT_SESSION_ID}&success=true&plan=${encodeURIComponent(planType || priceId)}`,
      cancel_url: `${baseUrl}/pricing?canceled=true`,
      
      // Add metadata for tracking
      metadata: {
        userId: userId || 'unknown',
        planType: planType || priceId,
        source: 'website',
        timestamp: new Date().toISOString()
      },

      // Add customer email if available
      ...(userEmail && { customer_email: userEmail }),

      // Enable automatic tax calculation if configured
      automatic_tax: { enabled: false },
      
      // Add billing address collection
      billing_address_collection: 'auto',
    };

    console.log('Creating Stripe checkout session with params:', JSON.stringify(sessionParams, null, 2));

    // Create the checkout session
    const session = await stripe.checkout.sessions.create(sessionParams);

    console.log('✅ Checkout session created successfully:', {
      id: session.id,
      url: session.url,
      customer_email: session.customer_email,
      mode: session.mode
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        url: session.url,
        sessionId: session.id,
        success: true
      }),
    };

  } catch (error: any) {
    console.error('❌ Stripe Checkout error:', error);
    
    // Enhanced error handling
    let errorMessage = 'Failed to create checkout session';
    let statusCode = 500;

    if (error.type === 'StripeCardError') {
      errorMessage = 'Payment method error: ' + error.message;
      statusCode = 400;
    } else if (error.type === 'StripeRateLimitError') {
      errorMessage = 'Too many requests. Please try again later.';
      statusCode = 429;
    } else if (error.type === 'StripeInvalidRequestError') {
      errorMessage = 'Invalid payment request: ' + error.message;
      statusCode = 400;
    } else if (error.type === 'StripeAPIError') {
      errorMessage = 'Payment service temporarily unavailable';
      statusCode = 503;
    } else if (error.type === 'StripeConnectionError') {
      errorMessage = 'Network error connecting to payment service';
      statusCode = 503;
    } else if (error.type === 'StripeAuthenticationError') {
      errorMessage = 'Payment system authentication error';
      statusCode = 500;
    }

    return {
      statusCode,
      headers,
      body: JSON.stringify({ 
        error: errorMessage,
        message: error.message,
        type: error.type || 'unknown',
        ...(process.env.NODE_ENV === 'development' && { 
          stack: error.stack,
          details: error 
        })
      }),
    };
  }
};

// Enhanced helper function to get base URL
function getBaseUrl(event: any): string {
  console.log('Determining base URL from event...');
  
  // Try to get the origin from headers (most reliable)
  const origin = event.headers.origin || event.headers.Origin;
  if (origin) {
    console.log('Using origin from headers:', origin);
    return origin;
  }
  
  // Try to get from referer
  const referer = event.headers.referer || event.headers.Referer;
  if (referer) {
    try {
      const url = new URL(referer);
      const baseUrl = `${url.protocol}//${url.host}`;
      console.log('Using base URL from referer:', baseUrl);
      return baseUrl;
    } catch (e) {
      console.error('Error parsing referer:', e);
    }
  }
  
  // Try to get from host header
  const host = event.headers.host || event.headers.Host;
  if (host) {
    const protocol = event.headers['x-forwarded-proto'] || 'https';
    const baseUrl = `${protocol}://${host}`;
    console.log('Using base URL from host header:', baseUrl);
    return baseUrl;
  }
  
  // Final fallback - use the deployed URL
  const fallbackUrl = 'https://keen-horse-21743a.netlify.app';
  console.log('Using fallback URL:', fallbackUrl);
  return fallbackUrl;
}

export { handler };

