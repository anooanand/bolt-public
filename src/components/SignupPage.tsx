import React from 'react';
import { MultiStepSignUp } from './MultiStepSignUp';
import { Check, ArrowRight } from 'lucide-react';

interface SignupPageProps {
  onNavigate: (page: string) => void;
}

export function SignupPage({ onNavigate }: SignupPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 mb-4">
            Get Started in Minutes
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Join thousands of students improving their writing skills with our AI-powered platform
          </p>
        </div>

        {/* Steps Overview */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: 1, title: 'Sign Up', description: 'Create your free account' },
              { step: 2, title: 'Choose Plan', description: 'Select your subscription' },
              { step: 3, title: '3-Day Trial', description: 'Try all features free' },
              { step: 4, title: 'Start Writing', description: 'Access all features' }
            ].map((item) => (
              <div key={item.step} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">{item.step}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Signup Form */}
        <div className="max-w-md mx-auto">
          <MultiStepSignUp 
            onSuccess={() => {
              // Redirect to dashboard after successful signup
              onNavigate('dashboard');
            }}
            onSignInClick={() => {
              // Switch to sign in modal
              onNavigate('signin');
            }}
          />
        </div>

        {/* Testimonials or Additional Info */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
              Why Students Love Our Platform
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  quote: "The AI feedback helped me improve my writing score by 20% in just two weeks!",
                  author: "Sarah K., Year 6 Student"
                },
                {
                  quote: "The practice exams and personalized feedback were exactly what my child needed.",
                  author: "Michael T., Parent"
                },
                {
                  quote: "I love how easy it is to get instant feedback on my writing at any time.",
                  author: "Jason L., Year 5 Student"
                }
              ].map((testimonial, index) => (
                <div key={index} className="text-center">
                  <div className="text-indigo-500 mb-4">
                    <svg className="w-8 h-8 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{testimonial.quote}</p>
                  <p className="font-medium text-gray-900 dark:text-white">{testimonial.author}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}