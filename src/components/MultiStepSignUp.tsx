import React, { useState } from 'react';
import { signUp } from '../lib/supabase';
import { z } from 'zod';
import { Mail, Lock, Loader, Check, ArrowRight } from 'lucide-react';

const signUpSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Stripe payment URLs
const STRIPE_URLS = {
  tryOut: 'https://buy.stripe.com/test_14kaG7gNX1773v28wB',
  base: 'https://buy.stripe.com/test_3cs5lNbtD5nn3v28wC',
  premium: 'https://buy.stripe.com/test_6oE7tVdBL3fffdKbIP'
};

interface MultiStepSignUpProps {
  onSuccess: () => void;
  onSignInClick: () => void;
}

type Plan = {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  stripeUrl: string;
};

const plans: Plan[] = [
  {
    id: 'tryout',
    name: 'Try Out',
    price: '$4.99',
    description: 'Perfect for students just starting their preparation',
    features: [
      'Access to basic writing tools',
      'Limited AI feedback', 
      'Basic text type templates',
      'Email support'
    ],
    stripeUrl: STRIPE_URLS.tryOut
  },
  {
    id: 'base',
    name: 'Base Plan',
    price: '$19.99', 
    description: 'Ideal for students serious about exam preparation',
    features: [
      'Unlimited AI feedback',
      'All text type templates',
      'Advanced writing analysis',
      'Practice exam simulations',
      'Priority support',
      'Progress tracking'
    ],
    stripeUrl: STRIPE_URLS.base
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '$29.99',
    description: 'The ultimate preparation package',
    features: [
      'Everything in Base Plan',
      'One-on-one coaching sessions',
      'Personalized study plan',
      'Mock exam reviews',
      'Parent progress reports',
      'Guaranteed score improvement'
    ],
    stripeUrl: STRIPE_URLS.premium
  }
];

export function MultiStepSignUp({ onSuccess, onSignInClick }: MultiStepSignUpProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    try {
      // Validate form data
      signUpSchema.parse({ email, password, confirmPassword });
      
      setIsLoading(true);
      
      // Call the updated signUp function
      const result = await signUp(email, password);
      
      if (result) {
        console.log("Signup successful, proceeding to step 2");
        // Store email for later use
        localStorage.setItem('userEmail', email);
        // Move to next step after successful signup
        setCurrentStep(2);
        // Notify parent component of successful authentication
        onSuccess();
      }
    } catch (err) {
      console.error("Signup error in component:", err);
      
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      } else if (err instanceof Error) {
        // If it's an "already registered" error, just move to the next step
        if (err.message.includes('already registered') || 
            err.message.includes('already exists')) {
          console.log("User already exists, proceeding to step 2");
          localStorage.setItem('userEmail', email);
          setCurrentStep(2);
          onSuccess();
        } else {
          setError(err.message);
        }
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlanSelection = (plan: Plan) => {
    setSelectedPlan(plan);
    setCurrentStep(3);
  };

  const handlePaymentRedirect = () => {
    if (selectedPlan) {
      // Store selected plan in localStorage for retrieval after payment
      localStorage.setItem('selectedPlanId', selectedPlan.id);
      localStorage.setItem('userEmail', email); // Store email for payment confirmation
      
      // Add success redirect parameter to the URL
      const successUrl = `${window.location.origin}?payment_success=true&plan=${selectedPlan.id}`;
      
      // Add email parameter to Stripe URL
      const stripeUrlWithEmail = `${selectedPlan.stripeUrl}&prefilled_email=${encodeURIComponent(email)}`;
      
      // Redirect to Stripe payment URL with success redirect and email
      window.location.href = `${stripeUrlWithEmail}&redirect_to=${encodeURIComponent(successUrl)}`;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="w-full">
            <form onSubmit={handleSignUp} className="space-y-6">
              <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">Create Your Free Account</h2>
              
              {error && (
                <div className="p-3 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-md text-sm">
                  {error}
                </div>
              )}
              
              <div>
                <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
              
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <Loader className="animate-spin -ml-1 mr-2 h-5 w-5" />
                      Creating account...
                    </>
                  ) : (
                    'Sign Up'
                  )}
                </button>
                
                <button
                  type="button"
                  onClick={onSignInClick}
                  className="mt-4 text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 text-center w-full"
                >
                  Already have an account? Sign in
                </button>
              </div>
            </form>
          </div>
        );
      
      case 2:
        return (
          <div className="w-full">
            <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">Choose Your Plan</h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
              Select the subscription that best fits your needs
            </p>
            
            <div className="space-y-6">
              {plans.map((plan) => (
                <div 
                  key={plan.id}
                  onClick={() => handlePlanSelection(plan)}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 cursor-pointer hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{plan.name}</h3>
                    <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{plan.price}<span className="text-sm font-normal text-gray-500">/month</span></span>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{plan.description}</p>
                  
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                        <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button
                    className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center justify-center"
                  >
                    Select Plan
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="w-full text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">3-Day Free Trial</h2>
            
            <div className="bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 p-6 rounded-lg mb-8">
              <p className="text-lg text-gray-800 dark:text-gray-200 mb-4">
                Try all features free for 3 days with {selectedPlan?.name}
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                You won't be charged until your trial ends. Cancel anytime.
              </p>
              
              <div className="bg-white dark:bg-gray-800 p-4 rounded-md mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600 dark:text-gray-300">Plan:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{selectedPlan?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Price:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{selectedPlan?.price}/month</span>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-gray-600 dark:text-gray-300">Email:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{email}</span>
                </div>
              </div>
            </div>
            
            <button
              onClick={handlePaymentRedirect}
              className="w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Start Your Free Trial
            </button>
            
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              By proceeding, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
        {/* Progress Steps */}
        <div className="flex justify-between mb-8">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex flex-col items-center">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep >= step 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                }`}
              >
                {currentStep > step ? <Check className="h-5 w-5" /> : step}
              </div>
              <span className={`text-xs mt-2 ${
                currentStep >= step 
                  ? 'text-indigo-600 dark:text-indigo-400 font-medium' 
                  : 'text-gray-500 dark:text-gray-400'
              }`}>
                {step === 1 && 'Sign Up'}
                {step === 2 && 'Choose Plan'}
                {step === 3 && '3-Day Trial'}
                {step === 4 && 'Start Writing'}
              </span>
            </div>
          ))}
        </div>
        
        {renderStep()}
      </div>
    </div>
  );
}
