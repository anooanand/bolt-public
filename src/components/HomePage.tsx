import React from 'react';
import { ArrowRight, Star, Zap, CheckCircle, BookOpen, Brain, Target } from 'lucide-react';

export function HomePage() {
  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-indigo-50 dark:from-gray-900 dark:to-gray-800 pt-20 pb-16 md:pt-32 md:pb-24">
        <div className="absolute inset-0 bg-grid opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-50/50 to-white dark:via-indigo-900/20 dark:to-gray-900"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">Boost Your Writing </span>
              <span className="bg-gradient-to-r from-purple-600 to-rose-500 text-transparent bg-clip-text">Skills</span>
              <br />
              <span className="text-gray-900 dark:text-white">with AI-Powered Practice</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              Master narrative, persuasive, and creative writing with personalized AI guidance. Join thousands of students improving their writing skills.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
              <button 
                onClick={() => window.location.hash = '#pricing'}
                className="px-8 py-4 text-lg font-semibold rounded-md bg-indigo-600 hover:bg-indigo-700 text-white transition-all duration-200 flex items-center justify-center"
              >
                View Pricing
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
              
              <button 
                onClick={() => window.location.hash = '#features'}
                className="px-8 py-4 text-lg font-semibold rounded-md border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 flex items-center justify-center"
              >
                Explore Features
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </div>
            
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 text-gray-600 dark:text-gray-400">
              <div className="flex items-center">
                <div className="flex mr-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span>5.0 (100+ reviews)</span>
              </div>
              <span className="hidden sm:inline-block">•</span>
              <div className="flex items-center">
                <Zap className="w-4 h-4 text-indigo-500 mr-1" />
                <span>Used by 10,000+ students</span>
              </div>
              <span className="hidden sm:inline-block">•</span>
              <div className="flex items-center">
                <span>3-day free trial</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative overflow-hidden" id="features">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/50 to-white dark:from-gray-800/50 dark:to-gray-900"></div>
        <div className="absolute inset-0 bg-grid opacity-30"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Powerful Writing Tools
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Everything you need to master writing in one place.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Brain className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />}
              title="AI-Powered Feedback"
              description="Receive instant, detailed feedback on your writing with specific suggestions to improve content, structure, and style."
              tag="Instant Analysis"
              color="indigo"
            />

            <FeatureCard 
              icon={<BookOpen className="w-6 h-6 text-purple-600 dark:text-purple-400" />}
              title="Text Type Templates"
              description="Access templates for all text types with clear structures, examples, and guided prompts for better writing."
              tag="Multiple Formats"
              color="purple"
            />

            <FeatureCard 
              icon={<Target className="w-6 h-6 text-amber-600 dark:text-amber-400" />}
              title="Timed Practice Mode"
              description="Practice under real exam conditions with our timer and realistic practice prompts based on past exams."
              tag="Exam Mode"
              color="amber"
            />
          </div>

          <div className="mt-16 text-center">
            <a 
              href="#pricing" 
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Get Started
              <ArrowRight className="ml-2 -mr-1 h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800" id="how-it-works">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our AI-powered platform makes writing practice effective, engaging, and tailored to your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StepCard 
              number="1"
              title="Choose Your Writing Type"
              description="Select from narrative, persuasive, informative, or any other writing style you want to practice."
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
              description="Get comprehensive feedback to understand your strengths and areas for improvement."
              icon={<Target className="w-6 h-6 text-rose-500" />}
            />
          </div>

          <div className="mt-16 bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Why Users Love Our Platform</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Testimonial 
                  quote="My writing has improved dramatically since using this platform. My last practice test score increased by 15 points!"
                  author="Sarah M."
                  role="Student"
                />
                
                <Testimonial 
                  quote="The AI feedback is like having a tutor available 24/7. I can practice whenever I want and always get helpful guidance."
                  author="Jason T."
                  role="Student"
                />
              </div>
            </div>
            
            <div className="bg-indigo-50 dark:bg-indigo-900/30 p-8">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-6 md:mb-0">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Ready to boost your writing skills?</h3>
                  <p className="text-gray-600 dark:text-gray-300">Join thousands of students improving their writing</p>
                </div>
                
                <button 
                  onClick={() => window.location.hash = '#pricing'}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md flex items-center"
                >
                  Get Started Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Writing Types Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Writing Types We Support
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Practice a variety of writing styles with specialized guidance for each
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <WritingTypeCard
              title="Narrative Writing"
              description="Create engaging stories with compelling plots, vivid descriptions, and memorable characters."
              features={[
                "Character development",
                "Plot structure",
                "Setting descriptions",
                "Dialogue techniques"
              ]}
            />
            
            <WritingTypeCard
              title="Persuasive Writing"
              description="Craft convincing arguments with strong evidence, logical reasoning, and persuasive techniques."
              features={[
                "Thesis development",
                "Supporting evidence",
                "Counter-arguments",
                "Persuasive devices"
              ]}
            />
            
            <WritingTypeCard
              title="Expository Writing"
              description="Explain concepts clearly with well-organized information, facts, and examples."
              features={[
                "Clear explanations",
                "Logical organization",
                "Factual accuracy",
                "Informative content"
              ]}
            />
            
            <WritingTypeCard
              title="Descriptive Writing"
              description="Paint vivid pictures with words using sensory details and figurative language."
              features={[
                "Sensory language",
                "Figurative devices",
                "Detailed observations",
                "Mood creation"
              ]}
            />
            
            <WritingTypeCard
              title="Reflective Writing"
              description="Share personal insights and experiences with thoughtful analysis and self-awareness."
              features={[
                "Personal perspective",
                "Critical reflection",
                "Emotional awareness",
                "Growth analysis"
              ]}
            />
            
            <WritingTypeCard
              title="Creative Writing"
              description="Express imagination through original stories, poetry, and other creative forms."
              features={[
                "Unique voice",
                "Creative expression",
                "Imaginative scenarios",
                "Stylistic techniques"
              ]}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Writing?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of users who have improved their writing skills with our AI-powered platform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => window.location.hash = '#pricing'}
              className="px-8 py-4 bg-white text-indigo-600 font-bold rounded-md hover:bg-gray-100 transition-colors"
            >
              Get Started
            </button>
            <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-md hover:bg-white/10 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  tag: string;
  color: 'indigo' | 'purple' | 'amber' | 'blue' | 'green' | 'rose';
}

function FeatureCard({ icon, title, description, tag, color }: FeatureCardProps) {
  const colorClasses = {
    indigo: {
      bg: 'bg-indigo-50 dark:bg-indigo-900/30',
      text: 'text-indigo-600 dark:text-indigo-400',
      hover: 'hover:text-indigo-800 dark:hover:text-indigo-300',
      tag: 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400'
    },
    purple: {
      bg: 'bg-purple-50 dark:bg-purple-900/30',
      text: 'text-purple-600 dark:text-purple-400',
      hover: 'hover:text-purple-800 dark:hover:text-purple-300',
      tag: 'bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400'
    },
    amber: {
      bg: 'bg-amber-50 dark:bg-amber-900/30',
      text: 'text-amber-600 dark:text-amber-400',
      hover: 'hover:text-amber-800 dark:hover:text-amber-300',
      tag: 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
    },
    blue: {
      bg: 'bg-blue-50 dark:bg-blue-900/30',
      text: 'text-blue-600 dark:text-blue-400',
      hover: 'hover:text-blue-800 dark:hover:text-blue-300',
      tag: 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
    },
    green: {
      bg: 'bg-green-50 dark:bg-green-900/30',
      text: 'text-green-600 dark:text-green-400',
      hover: 'hover:text-green-800 dark:hover:text-green-300',
      tag: 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400'
    },
    rose: {
      bg: 'bg-rose-50 dark:bg-rose-900/30',
      text: 'text-rose-600 dark:text-rose-400',
      hover: 'hover:text-rose-800 dark:hover:text-rose-300',
      tag: 'bg-rose-50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400'
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 flex flex-col h-full">
      <div className="flex items-center mb-4">
        <div className={`${colorClasses[color].bg} p-3 rounded-lg mr-3`}>
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
      </div>
      <p className="text-gray-600 dark:text-gray-300 text-sm mb-6 flex-grow">
        {description}
      </p>
      <div className="flex justify-between items-center mt-auto">
        <button 
          className={`${colorClasses[color].text} ${colorClasses[color].hover} text-sm font-medium inline-flex items-center group`}
        >
          Learn more
          <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
        <span className={`${colorClasses[color].tag} text-xs px-2 py-1 rounded-full`}>
          {tag}
        </span>
      </div>
    </div>
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

interface WritingTypeCardProps {
  title: string;
  description: string;
  features: string[];
}

function WritingTypeCard({ title, description, features }: WritingTypeCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-all duration-300">
      <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
      
      <ul className="space-y-2 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
            <span className="text-gray-700 dark:text-gray-300">{feature}</span>
          </li>
        ))}
      </ul>
      
      <button className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium flex items-center text-sm">
        Try this format
        <ArrowRight className="ml-2 w-4 h-4" />
      </button>
    </div>
  );
}

export default HomePage;