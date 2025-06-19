import { supabase } from './supabase';

/**
 * Creates a Stripe checkout session for the specified product
 * @param priceId The Stripe price ID
 * @param mode The checkout mode ('subscription' or 'payment')
 * @returns The checkout session URL
 */
export async function createCheckoutSession(priceId: string, mode: 'subscription' | 'payment' = 'subscription') {
  try {
    // Get the current user's auth token
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      throw new Error('User not authenticated');
    }
    
    // Prepare success and cancel URLs
    const successUrl = `${window.location.origin}?paymentSuccess=true&planType=${priceId}`;
    const cancelUrl = `${window.location.origin}/pricing?paymentSuccess=false`;
    
    // Call the Supabase Edge Function
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({
        price_id: priceId,
        success_url: successUrl,
        cancel_url: cancelUrl,
        mode: mode,
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create checkout session');
    }
    
    const { url } = await response.json();
    
    if (!url) {
      throw new Error('No checkout URL returned');
    }
    
    return url;
  } catch (error: any) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
}

/**
 * Gets the current user's subscription status
 * @returns The subscription status
 */
export async function getSubscriptionStatus() {
  try {
    const { data, error } = await supabase
      .from('stripe_user_subscriptions')
      .select('*')
      .maybeSingle();
    
    if (error) {
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Error getting subscription status:', error);
    return null;
  }
}

/**
 * Gets the current user's order history
 * @returns The order history
 */
export async function getOrderHistory() {
  try {
    const { data, error } = await supabase
      .from('stripe_user_orders')
      .select('*')
      .order('order_date', { ascending: false });
    
    if (error) {
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Error getting order history:', error);
    return [];
  }
}

export default {
  createCheckoutSession,
  getSubscriptionStatus,
  getOrderHistory,
};