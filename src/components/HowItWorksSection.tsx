import React, { useState } from 'react';
import { Play, BookOpen, Brain, Clock, Target, Award, ArrowRight, CheckCircle, Zap } from 'lucide-react';

interface Step {
  id: string;
  title: string;
  description: string;
  details: string;
  icon: React.ReactNode;
  color: 'blue' | 'green' | 'purple' | 'amber' | 'rose';
  features: string[];
}

const steps: Step[] = [
  {
    id: 'choose-type',
    title: 'Choose Your Writing Type',
    description: 'Select from 11 different text types designed for NSW selective exams',
    details: 'Start by choosing the type of writing you want to practice. Our platform covers all text types commonly found in NSW selective exams, including narrative, persuasive, informative, descriptive, and more. Each type comes with specific templates and guidance.',
    icon: <BookOpen className="w-8 h-8" />,
    color: 'blue',
    features: [
      '11 different text types',
      'NSW exam-specific templates',
      'Clear structure guidelines',
      'Example prompts included'
    ]
  },
  {
    id: 'get-guidance',
    title: 'Get Step-by-Step Writing Support',
    description: 'Receive real-time guidance and suggestions as you write',
    details: 'Our AI writing buddy provides step-by-step support throughout your writing process. Get instant suggestions for vocabulary, sentence structure, and content organization. The AI adapts to your skill level and provides age-appropriate guidance.',
    icon: <Brain className="w-8 h-8" />,
    color: 'green',
    features: [
      'Real-time writing assistance',
      'Vocabulary enhancement',
      'Structure suggestions',
      'Age-appropriate guidance'
    ]
  },
  {
    id: 'practice-timed',
    title: 'Practice Under Exam Conditions',
    description: 'Build confidence with timed practice sessions',
    details: 'Practice writing under real exam conditions with our timed practice mode. Choose from different time limits, work with authentic exam prompts, and build the time management skills essential for success in selective school entrance exams.',
    icon: <Clock className="w-8 h-8" />,
    color: 'purple',
    features: [
      'Authentic exam prompts',
      'Customizable time limits',
      'Distraction-free environment',
      'Time management training'
    ]
  },
  {
    id: 'receive-feedback',
    title: 'Receive AI-Powered Feedback',
    description: 'Get detailed feedback based on NSW writing criteria',
    details: 'After completing your writing, receive comprehensive feedback that follows NSW selective exam criteria. Our AI analyzes your work for content, structure, language use, and mechanics, providing specific suggestions for improvement.',
    icon: <Target className="w-8 h-8" />,
    color: 'amber',
    features: [
      'NSW criteria-based scoring',
      'Detailed improvement suggestions',
      'Strengths identification',
      'Specific examples provided'
    ]
  },
  {
    id: 'track-progress',
    title: 'Track Your Improvement',
    description: 'Monitor your progress with detailed analytics',
    details: 'Watch your writing skills improve over time with our comprehensive progress tracking. See detailed analytics on your performance across different text types, track your vocabulary growth, and celebrate your achievements.',
    icon: <Award className="w-8 h-8" />,
    color: 'rose',
    features: [
      'Performance analytics',
      'Progress visualization',
      'Achievement badges',
      'Skill development tracking'
    ]
  }
];

export function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(steps[0].id);
  const [showDemo, setShowDemo] = useState(false);

  const activeStepData = steps.find(step => step.id === activeStep) || steps[0];

  const colorClasses = {
    blue: {
      bg: 'bg-blue-50 dark:bg-blue-900/30',
      text: 'text-blue-600 dark:text-blue-400',
      border: 'border-blue-200 dark:border-blue-700',
      button: 'bg-blue-600 hover:bg-blue-700'
    },
    green: {
      bg: 'bg-green-50 dark:bg-green-900/30',
      text: 'text-green-600 dark:text-green-400',
      border: 'border-green-200 dark:border-green-700',
      button: 'bg-green-600 hover:bg-green-700'
    },
    purple: {
      bg: 'bg-purple-50 dark:bg-purple-900/30',
      text: 'text-purple-600 dark:text-purple-400',
      border: 'border-purple-200 dark:border-purple-700',
      button: 'bg-purple-600 hover:bg-purple-700'
    },
    amber: {
      bg: 'bg-amber-50 dark:bg-amber-900/30',
      text: 'text-amber-600 dark:text-amber-400',
      border: 'border-amber-200 dark:border-amber-700',
      button: 'bg-amber-600 hover:bg-amber-700'
    },
    rose: {
      bg: 'bg-rose-50 dark:bg-rose-900/30',
      text: 'text-rose-600 dark:text-rose-400',
      border: 'border-rose-200 dark:border-rose-700',
      button: 'bg-rose-600 hover:bg-rose-700'
    }
  };

  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="absolute inset-0 bg-grid opacity-30"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            🚀 How InstaChat AI Works
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Our step-by-step approach helps students master writing skills through interactive guidance, practice, and personalized feedback.
          </p>
        </div>

        {/* Interactive Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Step Navigation */}
          <div className="space-y-4">
            {steps.map((step, index) => (
              <StepCard
                key={step.id}
                step={step}
                index={index}
                isActive={activeStep === step.id}
                onClick={() => setActiveStep(step.id)}
                colorClasses={colorClasses}
              />
            ))}
          </div>

          {/* Step Details */}
          <div className="lg:sticky lg:top-8">
            <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border-2 ${colorClasses[activeStepData.color].border}`}>
              <div className={`${colorClasses[activeStepData.color].bg} p-4 rounded-xl w-fit mb-6`}>
                <div className={colorClasses[activeStepData.color].text}>
                  {activeStepData.icon}
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {activeStepData.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                {activeStepData.details}
              </p>

              <div className="space-y-3 mb-8">
                <h4 className="font-semibold text-gray-900 dark:text-white">Key Features:</h4>
                {activeStepData.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className={`w-5 h-5 mr-3 ${colorClasses[activeStepData.color].text}`} />
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setShowDemo(true)}
                className={`w-full ${colorClasses[activeStepData.color].button} text-white py-3 px-6 rounded-xl font-semibold transition-colors duration-300 flex items-center justify-center`}
              >
                <Play className="w-5 h-5 mr-2" />
                Try This Step
              </button>
            </div>
          </div>
        </div>

        {/* Process Flow Visualization */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            Your Writing Journey
          </h3>
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center text-center max-w-xs">
                  <div className={`${colorClasses[step.color].bg} p-4 rounded-full mb-3 border-2 ${colorClasses[step.color].border}`}>
                    <div className={colorClasses[step.color].text}>
                      {step.icon}
                    </div>
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {step.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {step.description}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <ArrowRight className="hidden md:block w-6 h-6 text-gray-400 dark:text-gray-500" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Success Stats */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            See Results in Just Weeks!
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
            <div>
              <div className="text-3xl font-bold mb-2">87%</div>
              <div className="text-blue-100">Average Score Improvement</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">10,000+</div>
              <div className="text-blue-100">Students Helped</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">4.9/5</div>
              <div className="text-blue-100">Parent Satisfaction</div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-100 transition-colors duration-300 shadow-lg">
              Start Your Free Trial
            </button>
            <button 
              onClick={() => setShowDemo(true)}
              className="px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-blue-600 transition-colors duration-300 flex items-center justify-center"
            >
              <Play className="w-5 h-5 mr-2" />
              Watch Demo
            </button>
          </div>
        </div>
      </div>

      {/* Demo Modal */}
      {showDemo && (
        <DemoModal onClose={() => setShowDemo(false)} />
      )}
    </section>
  );
}

interface StepCardProps {
  step: Step;
  index: number;
  isActive: boolean;
  onClick: () => void;
  colorClasses: any;
}

function StepCard({ step, index, isActive, onClick, colorClasses }: StepCardProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-6 rounded-xl transition-all duration-300 transform hover:scale-105 ${
        isActive
          ? `${colorClasses[step.color].bg} border-2 ${colorClasses[step.color].border} shadow-lg`
          : 'bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:shadow-md'
      }`}
    >
      <div className="flex items-start">
        <div className={`${isActive ? colorClasses[step.color].bg : 'bg-gray-100 dark:bg-gray-700'} p-3 rounded-lg mr-4 flex-shrink-0`}>
          <div className={isActive ? colorClasses[step.color].text : 'text-gray-600 dark:text-gray-400'}>
            {step.icon}
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <span className={`text-sm font-bold px-2 py-1 rounded-full mr-3 ${
              isActive 
                ? `${colorClasses[step.color].text} ${colorClasses[step.color].bg}` 
                : 'text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700'
            }`}>
              Step {index + 1}
            </span>
          </div>
          <h3 className={`text-lg font-semibold mb-2 ${
            isActive ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'
          }`}>
            {step.title}
          </h3>
          <p className={`text-sm ${
            isActive ? 'text-gray-700 dark:text-gray-300' : 'text-gray-600 dark:text-gray-400'
          }`}>
            {step.description}
          </p>
        </div>
      </div>
    </button>
  );
}

function DemoModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              InstaChat AI Demo
            </h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              ✕
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 to-purple-900 rounded-xl flex items-center justify-center mb-6">
            <div className="text-center">
              <Play className="w-16 h-16 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Interactive Demo Coming Soon!
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                Experience our step-by-step writing guidance in action
              </p>
            </div>
          </div>
          <div className="text-center">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-300"
            >
              Start Your Free Trial Instead
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
