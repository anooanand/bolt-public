// Stripe product configuration
export const products = [
  {
    id: 'prod_RtRO1XGmUeqEKo',
    name: 'Try Out Plan',
    description: 'Perfect for students just starting their preparation',
    priceId: 'price_1RXEqERtcrDpOK7ME3QH9uzu',
    price: '$10.00',
    mode: 'subscription',
    features: [
      'Access to basic writing tools',
      'Limited AI feedback',
      'Basic text type templates',
      'Email support'
    ]
  },
  {
    id: 'prod_RtRQGUgw1pJm25',
    name: 'Base Plan',
    description: 'Ideal for students serious about exam preparation',
    priceId: 'price_1QzeXvRtcrDpOK7M5IHfp8ES',
    price: '$19.00',
    mode: 'subscription',
    features: [
      'Unlimited AI feedback',
      'All text type templates',
      'Advanced writing analysis',
      'Practice exam simulations',
      'Priority support',
      'Progress tracking'
    ],
    popular: true
  },
  {
    id: 'prod_RtRSP5NdMAUblV',
    name: 'Essential Plan',
    description: 'The ultimate preparation package',
    priceId: 'price_1QzeZjRtcrDpOK7MQ8Z4nlXn',
    price: '$29.00',
    mode: 'subscription',
    features: [
      'Everything in Base Plan',
      'One-on-one coaching sessions',
      'Personalized study plan',
      'Mock exam reviews',
      'Parent progress reports',
      'Guaranteed score improvement'
    ]
  }
];

// Helper function to get product by price ID
function getProductByPriceId(priceId: string) {
  return products.find(product => product.priceId === priceId);
}

// Helper function to get product by ID
function getProductById(id: string) {
  return products.find(product => product.id === id);
}

