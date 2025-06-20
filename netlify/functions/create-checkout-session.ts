import { Handler } from '@netlify/functions';
import Stripe from 'stripe';

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15',
});

const handler: Handler = async (event) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
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

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    console.log('Received request body:', event.body);
    const { priceId, planType, userId, userEmail } = JSON.parse(event.body || '{}');

    // Validate required parameters
    if (!priceId) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing required parameter: priceId' }),
      };
    }

    console.log('Creating checkout session for:', { priceId, planType, userId, userEmail });

    // Create the checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${getBaseUrl(event)}?paymentSuccess=true&planType=${planType || priceId}`,
      cancel_url: `${getBaseUrl(event)}/pricing?paymentSuccess=false`,
      
      // Add customer email if available
      customer_email: userEmail || undefined,
      
      // Add metadata for tracking
      metadata: {
        userId: userId || 'unknown',
        planType: planType || priceId,
        source: 'website'
      }
    });

    console.log('Checkout session created:', session.id);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        url: session.url,
        sessionId: session.id
      }),
    };
  } catch (error: any) {
    console.error('Stripe Checkout error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Failed to create checkout session',
        message: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
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
      console.error('Error parsing referer:', e);
    }
  }
  
  // Final fallback - use the deployed URL
  return 'https://keen-horse-21743a.netlify.app';
}

export { handler };