import { Handler } from '@netlify/functions';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15',
});

const handler: Handler = async (event) => {
  const sig = event.headers['stripe-signature'] || '';

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;
  let stripeEvent;

  try {
    const rawBody = Buffer.from(event.body || '', 'utf8');

    stripeEvent = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err: any) {
    console.error('❌ Webhook signature verification failed:', err.message);
    return {
      statusCode: 400,
      body: `Webhook Error: ${err.message}`,
    };
  }

  switch (stripeEvent.type) {
    case 'checkout.session.completed':
      const session = stripeEvent.data.object as Stripe.Checkout.Session;
      console.log('✅ Checkout session completed:', session.id);
      break;

    // Handle other events as needed

    default:
      console.log(`Unhandled event type: ${stripeEvent.type}`);
  }

  return {
    statusCode: 200,
    body: 'Webhook received successfully!',
  };
};

export { handler };
