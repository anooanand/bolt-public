import { supabase } from './supabase';

/**
 * Creates a Stripe checkout session for the specified product
 * @param priceId The Stripe price ID
 * @param userId The user ID (optional)
 * @returns The checkout session URL
 */
export async function createCheckoutSession(priceId: string, userId?: string) {
  try {
    console.log('🚀 Creating checkout session for price:', priceId);
    
    // Get the current user's auth token
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      throw new Error('User not authenticated');
    }
    
    const user = session.user;
    console.log('✅ User authenticated:', user.email);
    
    // Prepare the request data
    const requestData = {
      priceId: priceId,
      planType: priceId,
      userId: userId || user.id,
      userEmail: user.email,
    };
    
    console.log('📤 Sending request to Netlify function:', requestData);
    
    // Call the Netlify function directly
    const response = await fetch('/.netlify/functions/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(requestData),
    });
    
    console.log('📥 Response status:', response.status);
    console.log('📥 Response headers:', Object.fromEntries(response.headers.entries()));
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Netlify function error response:', errorText);
      
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch (e) {
        errorData = { error: errorText || 'Unknown error' };
      }
      
      throw new Error(errorData.error || errorData.message || `HTTP ${response.status}: Failed to create checkout session`);
    }
    
    const responseData = await response.json();
    console.log('✅ Netlify function success response:', responseData);
    
    const { url, sessionId } = responseData;
    
    if (!url) {
      throw new Error('No checkout URL returned from server');
    }
    
    console.log('🎯 Checkout URL created:', url);
    return { url, sessionId };
    
  } catch (error: any) {
    console.error('❌ Error creating checkout session:', error);
    
    // Provide more helpful error messages
    if (error.message.includes('CORS')) {
      throw new Error('Payment system configuration error. Please contact support.');
    } else if (error.message.includes('fetch')) {
      throw new Error('Network error. Please check your connection and try again.');
    } else if (error.message.includes('not authenticated')) {
      throw new Error('Please sign in to continue with payment.');
    } else {
      throw new Error(error.message || 'Failed to create checkout session. Please try again.');
    }
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

