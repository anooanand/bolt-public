import React, { useState } from 'react';
import { 
  PenTool, 
  Brain, 
  Target, 
  Users, 
  Zap, 
  BookOpen,
  CheckCircle,
  Star,
  ArrowRight,
  Play
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { user } = useAuth();

  const features = [
    {
      icon: Brain,
      title: 'AI Writing Assistant',
      description: 'Get intelligent suggestions, grammar corrections, and style improvements as you write.',
      color: 'text-blue-600'
    },
    {
      icon: PenTool,
      title: 'Advanced Paraphrasing',
      description: 'Transform your text with sophisticated paraphrasing tools and synonym suggestions.',
      color: 'text-green-600'
    },
    {
      icon: Target,
      title: 'NSW Selective Exam Prep',
      description: 'Specialized tools and practice for NSW Selective School entrance exams.',
      color: 'text-purple-600'
    },
    {
      icon: BookOpen,
      title: 'Learning Modules',
      description: 'Comprehensive writing courses from basics to advanced techniques.',
      color: 'text-orange-600'
    },
    {
      icon: Users,
      title: 'Collaboration Tools',
      description: 'Share your work, get feedback, and collaborate with teachers and peers.',
      color: 'text-pink-600'
    },
    {
      icon: Zap,
      title: 'Real-time Feedback',
      description: 'Instant scoring and detailed feedback to improve your writing skills.',
      color: 'text-yellow-600'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Year 6 Student',
      content: 'This platform helped me improve my writing score by 40% for the NSW Selective exam!',
      rating: 5
    },
    {
      name: 'Michael Rodriguez',
      role: 'Parent',
      content: 'Amazing tool for exam preparation. My daughter loves the interactive features.',
      rating: 5
    },
    {
      name: 'Emma Thompson',
      role: 'English Teacher',
      content: 'The AI feedback is incredibly detailed and helps students understand their mistakes.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Master Your Writing with{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI Power
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              The ultimate writing assistant for NSW Selective School preparation and beyond. 
              Get personalized feedback, AI-powered suggestions, and comprehensive learning modules.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {user ? (
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors flex items-center"
                >
                  Go to Dashboard
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              ) : (
                <>
                  <button
                    onClick={() => onNavigate('write')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors flex items-center"
                  >
                    Start Writing Now
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </button>
                  <button
                    onClick={() => onNavigate('demo')}
                    className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 px-8 py-3 rounded-lg text-lg font-semibold transition-colors flex items-center"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Watch Demo
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 dark:bg-blue-800 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-40 right-10 w-16 h-16 bg-purple-200 dark:bg-purple-800 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-green-200 dark:bg-green-800 rounded-full opacity-20 animate-bounce delay-1000"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Everything You Need to Excel
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our comprehensive platform combines AI technology with proven teaching methods
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-gray-50 dark:bg-gray-700 p-8 rounded-xl hover:shadow-lg transition-shadow"
                >
                  <div className={`w-12 h-12 ${feature.color} mb-4`}>
                    <Icon className="w-full h-full" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Join thousands of students achieving their writing goals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  "{testimonial.content}"
                </p>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 dark:bg-blue-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Writing?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of students who have improved their writing skills with our AI-powered platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <button
                onClick={() => onNavigate('dashboard')}
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
              >
                Go to Dashboard
              </button>
            ) : (
              <>
                <button
                  onClick={() => onNavigate('auth')}
                  className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
                >
                  Get Started Free
                </button>
                <button
                  onClick={() => onNavigate('pricing')}
                  className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
                >
                  View Pricing
                </button>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

