import React, { useState } from 'react';
import {
  PenTool,
  Brain,
  Target,
  Users,
  BookOpen,
  Zap,
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

  return (
    <div className="min-h-screen">
      {/* Hero Section with your custom dark theme */}
      <section className="hero-section">
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-white to-purple-400 bg-clip-text text-transparent">
            AI Writing Assistant
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            The ultimate writing assistant for NSW Selective School preparation and beyond.
            Get personalized feedback, AI-powered suggestions, and comprehensive learning modules.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {user ? (
              <button 
                onClick={() => onNavigate('dashboard')}
                className="gradient-button"
              >
                <span className="flex items-center gap-2">
                  Go to Dashboard <ArrowRight className="w-5 h-5" />
                </span>
              </button>
            ) : (
              <>
                <button 
                  onClick={() => onNavigate('auth')}
                  className="gradient-button"
                >
                  <span className="flex items-center gap-2">
                    Sign In to Start <ArrowRight className="w-5 h-5" />
                  </span>
                </button>
                
                <button 
                  onClick={() => onNavigate('demo')}
                  className="gradient-button-secondary"
                >
                  <span className="flex items-center gap-2">
                    <Play className="w-5 h-5" /> Watch Demo
                  </span>
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">
            Powerful Features
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card">
              <div className="feature-icon">
                <Brain className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">AI Writing Assistant</h3>
              <p className="text-gray-300">
                Get intelligent suggestions, grammar corrections, and style improvements as you write.
              </p>
            </div>
            
            <div className="card">
              <div className="feature-icon">
                <PenTool className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Advanced Paraphrasing</h3>
              <p className="text-gray-300">
                Transform your text with sophisticated paraphrasing tools and synonym suggestions.
              </p>
            </div>
            
            <div className="card">
              <div className="feature-icon">
                <Target className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">NSW Selective Exam Prep</h3>
              <p className="text-gray-300">
                Specialized tools and practice for NSW Selective School entrance exams.
              </p>
            </div>
            
            <div className="card">
              <div className="feature-icon">
                <BookOpen className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Learning Modules</h3>
              <p className="text-gray-300">
                Comprehensive writing courses from basics to advanced techniques.
              </p>
            </div>
            
            <div className="card">
              <div className="feature-icon">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Collaboration Tools</h3>
              <p className="text-gray-300">
                Share your work, get feedback, and collaborate with teachers and peers.
              </p>
            </div>
            
            <div className="card">
              <div className="feature-icon">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Real-time Feedback</h3>
              <p className="text-gray-300">
                Instant scoring and detailed feedback to improve your writing skills.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">
            What Students Say
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-300 mb-4">
                "This platform helped me improve my writing score by 40% for the NSW Selective exam!"
              </p>
              <div className="text-sm">
                <p className="font-semibold text-white">Sarah Chen</p>
                <p className="text-gray-400">Year 6 Student</p>
              </div>
            </div>
            
            <div className="card">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-300 mb-4">
                "Amazing tool for exam preparation. My daughter loves the interactive features."
              </p>
              <div className="text-sm">
                <p className="font-semibold text-white">Michael Rodriguez</p>
                <p className="text-gray-400">Parent</p>
              </div>
            </div>
            
            <div className="card">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-300 mb-4">
                "The AI feedback is incredibly detailed and helps students understand their mistakes."
              </p>
              <div className="text-sm">
                <p className="font-semibold text-white">Emma Thompson</p>
                <p className="text-gray-400">English Teacher</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="card">
            <h2 className="text-4xl font-bold mb-6 text-white">
              Ready to Transform Your Writing?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of students who have improved their writing skills with our AI-powered platform.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user ? (
                <button 
                  onClick={() => onNavigate('dashboard')}
                  className="gradient-button"
                >
                  Go to Dashboard
                </button>
              ) : (
                <>
                  <button 
                    onClick={() => onNavigate('auth')}
                    className="gradient-button"
                  >
                    Sign In to Start
                  </button>
                  <button 
                    onClick={() => onNavigate('pricing')}
                    className="gradient-button-secondary"
                  >
                    View Pricing
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

