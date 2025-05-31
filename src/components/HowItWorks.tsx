import React from 'react';
import { Sparkles, ArrowRight, Star, Zap, Check, BookOpen, Brain, Target } from 'lucide-react';

export function HowItWorks() {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
            How InstaChat AI Works
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Our AI-powered platform makes writing practice effective, engaging, and tailored to NSW Selective exam requirements
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <StepCard 
            number="1"
            title="Choose Your Writing Type"
            description="Select from narrative, persuasive, informative, or any other writing style covered in the NSW Selective exam."
            icon={<BookOpen className="w-6 h-6 text-indigo-500" />}
          />
          
          <StepCard 
            number="2"
            title="Practice with AI Guidance"
            description="Write with real-time suggestions, vocabulary enhancements, and structure guidance from our specialized AI."
            icon={<Brain className="w-6 h-6 text-purple-500" />}
          />
          
          <StepCard 
            number="3"
            title="Receive Detailed Feedback"
            description="Get comprehensive feedback aligned with NSW marking criteria to understand your strengths and areas for improvement."
            icon={<Target className="w-6 h-6 text-rose-500" />}
          />
        </div>

        <div className="mt-16 bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
          <div className="p-8">
            <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Why Students & Parents Love Us</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Testimonial 
                quote="My daughter's writing has improved dramatically since using this platform. Her last practice test score increased by 15 points!"
                author="Sarah M."
                role="Parent of Year 6 student"
              />
              
              <Testimonial 
                quote="The AI feedback is like having a tutor available 24/7. I can practice whenever I want and always get helpful guidance."
                author="Jason T."
                role="Year 5 student"
              />
            </div>
          </div>
          
          <div className="bg-indigo-50 dark:bg-indigo-900/30 p-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Ready to boost your writing skills?</h3>
                <p className="text-gray-600 dark:text-gray-300">Join thousands of students preparing for NSW Selective exams</p>
              </div>
              
              <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md flex items-center">
                Get Started Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface StepCardProps {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

function StepCard({ number, title, description, icon }: StepCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-300 p-6 h-full">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center mr-4">
          <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">{number}</span>
        </div>
        <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-md">
          {icon}
        </div>
      </div>
      
      <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
}

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
}

function Testimonial({ quote, author, role }: TestimonialProps) {
  return (
    <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-6">
      <div className="flex mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
        ))}
      </div>
      
      <p className="text-gray-600 dark:text-gray-300 mb-4 italic">"{quote}"</p>
      
      <div>
        <p className="font-medium text-gray-900 dark:text-white">{author}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{role}</p>
      </div>
    </div>
  );
}
