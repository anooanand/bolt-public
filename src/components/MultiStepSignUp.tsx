import React, { useState, useEffect } from 'react';
import { ArrowRight, Check, Star, Zap, CheckCircle, Loader } from 'lucide-react';
import { signUp } from '../lib/supabase';
import { z } from 'zod';

const signUpSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

interface MultiStepSignUpProps {
  onSuccess: (user: any) => void;
  onSignInClick: () => void;
  simpleRedirect?: boolean; // if true, skip plan selection and redirect to /pricing
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
    id: 'try-out',
    name: 'Try Out',
    price: '$4.99',
    description: 'Perfect for students just starting their preparation',
    features: ['Access to basic writing tools', 'Limited AI feedback', 'Basic text type templates', 'Email support'],
    stripeUrl: 'https://buy.stripe.com/test_14kaG7gNX1773v28wB'
  },
  {
    id: 'base-plan',
    name: 'Base Plan',
    price: '$19.99',
    description: 'Ideal for students serious about exam preparation',
    features: ['Unlimited AI feedback', 'All text type templates', 'Advanced writing analysis', 'Practice exam simulations', 'Priority support', 'Progress tracking'],
    stripeUrl: 'https://buy.stripe.com/test_3cs5lNbtD5nn3v28wC'
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '$29.99',
    description: 'The ultimate preparation package',
    features: ['Everything in Base Plan', 'One-on-one coaching sessions', 'Personalized study plan', 'Mock exam reviews', 'Parent progress reports', 'Guaranteed score improvement'],
    stripeUrl: 'https://buy.stripe.com/test_6oE7tVdBL3fffdKbIP'
  }
];

export function MultiStepSignUp({ onSuccess, onSignInClick, simpleRedirect = false }: MultiStepSignUpProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [redirectAfterSignup, setRedirectAfterSignup] = useState(false);
  const [signupCompleted, setSignupCompleted] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    try {
      // Validate form data
      signUpSchema.parse({ email, password, confirmPassword });
      setIsLoading(true);
      
      console.log("Starting signup with validated data");
      
      // Attempt signup
      const { data, error } = await signUp(email, password);
      
      if (error) {
        if (error.message?.includes('already registered') || error.message?.includes('already exists')) {
          // User already exists - store email and proceed to plan selection
          localStorage.setItem('userEmail', email);
          setCurrentStep(2);
          setIsLoading(false);
          return;
        }
        throw error;
      }

      console.log("Signup result:", data);

      // Store email in localStorage
      localStorage.setItem('userEmail', email);
      
      // Set temporary access flag (24 hours)
      localStorage.setItem('temp_access_until', new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString());
      
      // Always proceed to step 2 (plan selection) after successful signup
      setCurrentStep(2);
      setSignupCompleted(true);
      
      // Only store the redirect preference, don't redirect yet
      if (simpleRedirect) {
        setRedirectAfterSignup(true);
      }
    } catch (err: any) {
      console.error("Signup error caught in component:", err);
      
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      } else if (err.message?.includes('already registered') || err.message?.includes('already exists')) {
        localStorage.setItem('userEmail', email);
        
        // Even for existing users, proceed to step 2 (plan selection)
        setCurrentStep(2);
        
        if (simpleRedirect) {
          setRedirectAfterSignup(true);
        }
      } else {
        // Provide more user-friendly error message
        const errorMessage = err.message || 'An error occurred during sign up';
        console.error('Signup error details:', err);
        setError(`${errorMessage}. Please try again or contact support.`);
      }
    } finally {
      // Always ensure loading state is cleared
      setIsLoading(false);
      console.log("Signup process completed (success or error)");
    }
  };

  const handlePlanSelection = (plan: Plan) => {
    setSelectedPlan(plan);
    setCurrentStep(3);
  };

  const handlePaymentRedirect = () => {
    if (!selectedPlan) return;
    
    // Store plan information in localStorage
    localStorage.setItem('selectedPlanId', selectedPlan.id);
    localStorage.setItem('userEmail', email);
    
    // Set temporary access flag (24 hours)
    localStorage.setItem('temp_access_until', new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString());
    
    // Create success URL with plan information
    const successUrl = `${window.location.origin}?payment_success=true&plan=${selectedPlan.id}`;
    
    // Construct Stripe URL with parameters
    let stripeUrl = selectedPlan.stripeUrl;
    
    // Add email parameter
    stripeUrl = `${stripeUrl}?prefilled_email=${encodeURIComponent(email)}`;
    
    // Add success redirect parameter
    stripeUrl = `${stripeUrl}&success_url=${encodeURIComponent(successUrl)}`;
    
    // Redirect to Stripe checkout
    window.location.href = stripeUrl;
  };

  // Only call onSuccess and close the modal when explicitly needed
  const completeSignup = () => {
    onSuccess({
      email,
      user_metadata: {
        payment_status: 'pending',
        temp_access_until: localStorage.getItem('temp_access_until')
      }
    });
    
    // If redirectAfterSignup is true, redirect to pricing page
    if (redirectAfterSignup) {
      window.location.href = '/pricing';
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="w-full">
            <form onSubmit={handleSignUp} className="space-y-6">
              <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">Create Your Account</h2>
              
              {error && (
                <div className="p-3 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-md text-sm">
                  {error}
                  {error.includes('taking longer than expected') && (
                    <button 
                      onClick={() => window.location.reload()}
                      className="ml-2 underline font-medium"
                      type="button"
                    >
                      Refresh page
                    </button>
                  )}
                </div>
              )}
              
              <div>
                <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-3 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
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
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-3 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
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
                  <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-3 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
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
                    className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md flex items-center justify-center transition-colors"
                  >
                    Select Plan
                    <ArrowRight className="ml-2 w-4 h-4" />
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
              className="w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-md"
            >
              Start Your Free Trial
            </button>
            
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              By proceeding, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        );
      
      case 4:
        // Call completeSignup immediately without delay
        completeSignup();
        
        return (
          <div className="w-full text-center">
            <div className="mb-6 flex justify-center">
              <div className="rounded-full bg-green-100 p-3">
                <Check className="h-8 w-8 text-green-600" />
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Success!
            </h2>
            
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Your account has been created successfully.
            </p>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {renderStep()}
    </div>
  );
}