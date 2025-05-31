import React from 'react';
import { Check } from 'lucide-react';

const pricingTiers = [
  {
    name: 'Basic',
    price: '$9.99',
    description: 'Perfect for students just starting their preparation',
    features: [
      'Access to basic writing tools',
      'Limited AI feedback',
      'Basic text type templates',
      'Email support'
    ]
  },
  {
    name: 'Pro',
    price: '$19.99',
    description: 'Ideal for students serious about exam preparation',
    features: [
      'Unlimited AI feedback',
      'All text type templates',
      'Advanced writing analysis',
      'Practice exam simulations',
      'Priority support',
      'Progress tracking'
    ]
  },
  {
    name: 'Premium',
    price: '$29.99',
    description: 'The ultimate preparation package',
    features: [
      'Everything in Pro',
      'One-on-one coaching sessions',
      'Personalized study plan',
      'Mock exam reviews',
      'Parent progress reports',
      'Guaranteed score improvement'
    ]
  }
];

export function PricingPage() {
  const handleSubscribe = () => {
    window.location.href = 'https://buy.stripe.com/test_14kaG7gNX1773v28wB';
  };

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Select the perfect plan to help you excel in your NSW Selective School exam preparation
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingTiers.map((tier) => (
            <div
              key={tier.name}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:-translate-y-2"
            >
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{tier.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">{tier.description}</p>
                <p className="text-4xl font-bold text-gray-900 dark:text-white mb-6">{tier.price}<span className="text-lg font-normal text-gray-500">/month</span></p>
                
                <ul className="space-y-4 mb-8">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={handleSubscribe}
                  className="w-full py-3 px-6 text-center text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 rounded-lg font-medium transition-all duration-300 transform hover:scale-[1.02]"
                >
                  Subscribe Now
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 dark:text-gray-300">
            All plans include a 14-day money-back guarantee
          </p>
        </div>
      </div>
    </div>
  );
}