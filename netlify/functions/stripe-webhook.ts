import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-06-20', // Use your desired API version
});

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  if (event.httpMethod !== "POST" ) {
    return {
      statusCode: 405,
      body: "Method Not Allowed",
    };
  }

  const sig = event.headers["stripe-signature"];
  let stripeEvent: Stripe.Event;

  try {
    stripeEvent = stripe.webhooks.constructEvent(
      event.body || "",
      sig || "",
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`);
    return {
      statusCode: 400,
      body: `Webhook Error: ${err.message}`,
    };
  }

  // Handle the event
  switch (stripeEvent.type) {
    case "checkout.session.completed":
      const session = stripeEvent.data.object as Stripe.Checkout.Session;
      console.log("Checkout session completed:", session.id);
      // TODO: Implement logic to update Supabase database
      // Example: Update user_profiles table, create payment_logs entry
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${stripeEvent.type}`);
  }

  return {
    statusCode: 200,
    body: "Webhook received",
  };
};

export { handler };
