import React, { useState, useEffect } from 'react';
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

const STRIPE_URLS = {
  tryOut: 'https://buy.stripe.com/test_14kaG7gNX1773v28wB',
  base: 'https://buy.stripe.com/test_3cs5lNbtD5nn3v28wC',
  premium: 'https://buy.stripe.com/test_6oE7tVdBL3fffdKbIP'
};

interface MultiStepSignUpProps {
  onSuccess: () => void;
  onSignInClick: () => void;
  simpleRedirect?: boolean; // NEW: if true, skip plan selection and redirect to /pricing
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
    features: ['Access to basic writing tools', 'Limited AI feedback', 'Basic text type templates', 'Email support'],
    stripeUrl: STRIPE_URLS.tryOut
  },
  {
    id: 'base',
    name: 'Base Plan',
    price: '$19.99',
    description: 'Ideal for students serious about exam preparation',
    features: ['Unlimited AI feedback', 'All text type templates', 'Advanced writing analysis', 'Practice exam simulations', 'Priority support', 'Progress tracking'],
    stripeUrl: STRIPE_URLS.base
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '$29.99',
    description: 'The ultimate preparation package',
    features: ['Everything in Base Plan', 'One-on-one coaching sessions', 'Personalized study plan', 'Mock exam reviews', 'Parent progress reports', 'Guaranteed score improvement'],
    stripeUrl: STRIPE_URLS.premium
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

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const paymentSuccess = urlParams.get('payment_success');
    const planId = urlParams.get('plan');
    if (paymentSuccess === 'true' && planId) {
      const plan = plans.find(p => p.id === planId);
      if (plan) {
        setSelectedPlan(plan);
        setCurrentStep(4);
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    }
  }, []);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      signUpSchema.parse({ email, password, confirmPassword });
      setIsLoading(true);
      await signUp(email, password);

      localStorage.setItem('userEmail', email);
      localStorage.setItem('redirect_after_signup', simpleRedirect ? 'pricing' : 'dashboard');

      if (simpleRedirect) {
        window.location.href = '/pricing';
        onSuccess();
        return;
      }

      setCurrentStep(2);
      onSuccess();
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      } else if (err.message?.includes('already registered') || err.message?.includes('already exists')) {
        localStorage.setItem('userEmail', email);
        if (simpleRedirect) {
          window.location.href = '/pricing';
          onSuccess();
          return;
        }
        setCurrentStep(2);
        onSuccess();
      } else {
        setError(err.message || 'An error occurred during sign up');
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
    if (!selectedPlan) return;
    localStorage.setItem('selectedPlanId', selectedPlan.id);
    localStorage.setItem('userEmail', email);
    const successUrl = `${window.location.origin}?payment_success=true&plan=${selectedPlan.id}`;
    const stripeUrlWithEmail = `${selectedPlan.stripeUrl}&prefilled_email=${encodeURIComponent(email)}`;
    window.location.href = `${stripeUrlWithEmail}&redirect_to=${encodeURIComponent(successUrl)}`;
  };

  const renderStep = () => {
    // Same as your current implementation — no change needed
    // (Rendering forms, plan cards, trial start page, final confirmation)
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
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
              <span
                className={`text-xs mt-2 ${
                  currentStep >= step
                    ? 'text-indigo-600 dark:text-indigo-400 font-medium'
                    : 'text-gray-500 dark:text-gray-400'
                }`}
              >
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
