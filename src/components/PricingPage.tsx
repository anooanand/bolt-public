import React, { useState, useEffect } from 'react';
import { ArrowRight, Check, Star } from 'lucide-react';

export function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const [userEmail, setUserEmail] = useState<string | null>(null);
  
  // Get user email from localStorage on component mount
  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    setUserEmail(email);
    
    // If no email is found, check if there's a session cookie
    if (!email) {
      // Try to get email from session if available
      const checkSession = async () => {
        try {
          const { supabase } = await import('../lib/supabase');
          const { data } = await supabase.auth.getSession();
          if (data.session?.user?.email) {
            localStorage.setItem('userEmail', data.session.user.email);
            setUserEmail(data.session.user.email);
          }
        } catch (error) {
          console.error('Error checking session:', error);
        }
      };
      
      checkSession();
    }
  }, []);
  
  const plans = [
    {
      name: 'Try Out',
      description: 'Perfect for students just starting their preparation',
      monthlyPrice: '$4.99',
      yearlyPrice: '$49.90',
      yearlyDiscount: 'Save $9.98',
      features: [
        'Access to basic writing tools',
        'Limited AI feedback',
        'Basic text type templates',
        'Email support'
      ],
      buttonText: 'Start Free Trial',
      buttonLink: 'https://buy.stripe.com/test_14kaG7gNX1773v28wB',
      popular: false,
      planType: 'try-out'
    },
    {
      name: 'Base Plan',
      description: 'Ideal for students serious about exam preparation',
      monthlyPrice: '$19.99',
      yearlyPrice: '$199.90',
      yearlyDiscount: 'Save $39.98',
      features: [
        'Unlimited AI feedback',
        'All text type templates',
        'Advanced writing analysis',
        'Practice exam simulations',
        'Priority support',
        'Progress tracking'
      ],
      buttonText: 'Start Free Trial',
      buttonLink: 'https://buy.stripe.com/test_3cs5lNbtD5nn3v28wC',
      popular: true,
      planType: 'base-plan'
    },
    {
      name: 'Premium',
      description: 'The ultimate preparation package',
      monthlyPrice: '$29.99',
      yearlyPrice: '$299.90',
      yearlyDiscount: 'Save $59.98',
      features: [
        'Everything in Base Plan',
        'One-on-one coaching sessions',
        'Personalized study plan',
        'Mock exam reviews',
        'Parent progress reports',
        'Guaranteed score improvement'
      ],
      buttonText: 'Start Free Trial',
      buttonLink: 'https://buy.stripe.com/test_6oE7tVdBL3fffdKbIP',
      popular: false,
      planType: 'premium'
    }
  ];

  const handleSubscribe = (plan: typeof plans[0]) => {
    console.log("Payment button clicked for plan:", plan.name);
    console.log("Current user email:", userEmail);
    
    // Get email from state or prompt user if not available
    let email = userEmail;
    
    if (!email) {
      // Try to get from localStorage again
      email = localStorage.getItem('userEmail');
    }
    
    if (!email) {
      // Prompt user for email if still not available
      email = prompt('Please enter your email to continue:');
    }
    
    if (!email) {
      alert('Email is required to continue with subscription');
      return;
    }
    
    // Store email for future use
    localStorage.setItem('userEmail', email);
    setUserEmail(email);
    
    // Construct the URL with email and redirect parameters
    let url = plan.buttonLink;
    
    // Add email parameter
    url = `${url}?prefilled_email=${encodeURIComponent(email)}`;
    
    // Add success redirect parameter
    const successUrl = `${window.location.origin}?payment_success=true&plan=${plan.name.toLowerCase().replace(/\s+/g, '-')}`;
    url = `${url}&success_url=${encodeURIComponent(successUrl)}`;
    
    console.log('Redirecting to payment URL:', url);
    
    // Add loading state feedback
    const button = document.activeElement as HTMLButtonElement;
    if (button) {
      const originalText = button.textContent;
      button.textContent = 'Redirecting...';
      button.disabled = true;
      
      // Restore button after a delay in case redirect fails
      setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
      }, 5000);
    }
    
    // Redirect to Stripe
    try {
      window.location.href = url;
    } catch (error) {
      console.error('Error redirecting to payment:', error);
      alert('Error redirecting to payment. Please try again.');
      
      // Restore button
      if (button) {
        button.textContent = plan.buttonText;
        button.disabled = false;
      }
    }
  };

  return (
    <section className="py-16 bg-white dark:bg-gray-900" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            All plans include a 3-day free trial. Cancel anytime.
          </p>
          
          {userEmail && (
            <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-md inline-block">
              ✅ Signed in as: {userEmail}
            </div>
          )}
          
          <div className="mt-8 inline-flex items-center p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                billingPeriod === 'monthly'
                  ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod('yearly')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                billingPeriod === 'yearly'
                  ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              Yearly <span className="text-green-500 font-normal">Save 20%</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border ${
                plan.popular 
                  ? 'border-indigo-200 dark:border-indigo-800 ring-2 ring-indigo-500 dark:ring-indigo-400' 
                  : 'border-gray-200 dark:border-gray-700'
              } overflow-hidden h-full flex flex-col`}
            >
              {plan.popular && (
                <div className="bg-indigo-500 text-white text-center py-1.5 text-sm font-medium">
                  Most Popular
                </div>
              )}
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">{plan.description}</p>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">
                    {billingPeriod === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 ml-2">
                    /{billingPeriod === 'monthly' ? 'month' : 'year'}
                  </span>
                  
                  {billingPeriod === 'yearly' && (
                    <p className="mt-1 text-green-500 text-sm font-medium">{plan.yearlyDiscount}</p>
                  )}
                </div>
                
                <button
                  onClick={() => handleSubscribe(plan)}
                  className={`w-full py-3 px-4 rounded-md ${
                    plan.popular
                      ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white'
                  } font-medium flex items-center justify-center transition-colors duration-200`}
                >
                  {plan.buttonText}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </button>
              </div>
              
              <div className="p-6 bg-gray-50 dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 flex-grow">
                <h4 className="font-medium text-gray-900 dark:text-white mb-4">What's included:</h4>
                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 shrink-0" />
                      <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="p-6 bg-gray-50 dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center">
                  <div className="flex mr-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">5.0 (100+ reviews)</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Need a custom plan for your school?</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            We offer special pricing for schools and educational institutions. Contact us to learn more about our school plans.
          </p>
          <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md">
            Contact Sales
          </button>
        </div>
      </div>
    </section>
  );
}