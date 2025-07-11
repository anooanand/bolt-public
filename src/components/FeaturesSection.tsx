import React, { useState } from 'react';
import { Sparkles, BookOpen, Clock, Brain, ArrowRight, Zap, Target, BarChart } from 'lucide-react';
import FeatureDetailsModal from './FeatureDetailsModal';

interface Feature {
  id: string;
  title: string;
  description: string;
  details: string;
  icon: React.ReactNode;
  tag: string;
  color: 'indigo' | 'purple' | 'amber' | 'blue' | 'green' | 'rose';
}

const features: Feature[] = [
  {
    id: 'ai-feedback',
    title: 'AI-Powered Feedback',
    description: 'Receive instant, detailed feedback on your writing with specific suggestions to improve content, structure, and style.',
    details: 'Our advanced AI system analyzes your writing across multiple dimensions including grammar, vocabulary, sentence structure, coherence, and NSW selective exam criteria. Get personalized suggestions for improvement with explanations of why changes are recommended. The feedback is tailored specifically for students aged 9-11 preparing for selective school entrance exams.',
    icon: <Brain className="w-6 h-6 text-indigo-700 dark:text-indigo-300" />,
    tag: 'Instant Analysis',
    color: 'indigo'
  },
  {
    id: 'templates',
    title: 'Text Type Templates',
    description: 'Access templates for all text types with clear structures, examples, and guided prompts for better writing.',
    details: 'Comprehensive templates for all 11 text types commonly found in NSW selective exams: narrative, persuasive, informative, descriptive, and more. Each template includes structure guidelines, vocabulary suggestions, example paragraphs, and step-by-step writing prompts to help students understand and master different writing formats.',
    icon: <BookOpen className="w-6 h-6 text-purple-700 dark:text-purple-300" />,
    tag: '11 Types',
    color: 'purple'
  },
  {
    id: 'practice',
    title: 'Timed Practice Mode',
    description: 'Practice under real exam conditions with our timer and realistic practice prompts based on past exams.',
    details: 'Simulate actual exam conditions with authentic prompts from past NSW selective tests. Features include customizable timers, distraction-free writing environment, automatic saving, and post-practice analysis. Students can practice with different time limits to build confidence and improve time management skills.',
    icon: <Clock className="w-6 h-6 text-amber-700 dark:text-amber-300" />,
    tag: 'Exam Mode',
    color: 'amber'
  },
  {
    id: 'vocabulary',
    title: 'Vocabulary Enhancement',
    description: 'Improve your vocabulary with smart suggestions and alternatives to elevate your writing style.',
    details: 'Interactive vocabulary builder with age-appropriate word suggestions, synonyms, and context examples. Features include word difficulty levels, usage examples in sentences, and personalized vocabulary lists based on your writing. Helps students expand their vocabulary naturally while writing.',
    icon: <Zap className="w-6 h-6 text-blue-700 dark:text-blue-300" />,
    tag: 'Advanced',
    color: 'blue'
  },
  {
    id: 'learning',
    title: 'Personalized Learning',
    description: 'Get customized learning paths based on your strengths and areas for improvement.',
    details: 'Adaptive learning system that identifies individual strengths and weaknesses through writing analysis. Creates personalized study plans with targeted exercises, recommends specific text types to practice, and adjusts difficulty based on progress. Includes goal setting and milestone tracking.',
    icon: <Target className="w-6 h-6 text-green-700 dark:text-green-300" />,
    tag: 'Adaptive',
    color: 'green'
  },
  {
    id: 'progress',
    title: 'Progress Tracking',
    description: 'Monitor your improvement over time with detailed analytics and performance metrics.',
    details: 'Comprehensive progress dashboard showing writing improvement trends, skill development across different text types, time management progress, and readiness indicators for the selective exam. Includes visual charts, achievement badges, and detailed reports for parents and teachers.',
    icon: <BarChart className="w-6 h-6 text-rose-700 dark:text-rose-300" />,
    tag: 'Analytics',
    color: 'rose'
  }
];

export function FeaturesSection() {
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);

  const handleFeatureClick = (featureId: string) => {
    if (featureId === 'pricing') {
      // Scroll to pricing section
      const pricingElement = document.getElementById('pricing');
      if (pricingElement) {
        pricingElement.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Find and show feature details
      const feature = features.find(f => f.id === featureId);
      if (feature) {
        setSelectedFeature(feature);
      }
    }
  };

  const handleCloseModal = () => {
    setSelectedFeature(null);
  };

  return (
    <section className="py-20 relative overflow-hidden" id="features">
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/50 to-white dark:from-gray-800/50 dark:to-gray-900"></div>
      <div className="absolute inset-0 bg-grid opacity-30"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Powerful Writing Tools
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-200 max-w-3xl mx-auto">
            Everything you need to master essay writing for NSW selective exams and academic success in one place.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <FeatureCard 
              key={feature.id}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              tag={feature.tag}
              color={feature.color}
              onClick={() => handleFeatureClick(feature.id)}
            />
          ))}
        </div>

        <div className="mt-16 text-center">
          <button 
            onClick={() => handleFeatureClick('pricing')}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-700 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
          >
            Get Started
            <ArrowRight className="ml-2 -mr-1 h-5 w-5" />
          </button>
        </div>
      </div>

      {selectedFeature && (
        <FeatureDetailsModal
          feature={selectedFeature}
          onClose={handleCloseModal}
        />
      )}
    </section>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  tag: string;
  color: 'indigo' | 'purple' | 'amber' | 'blue' | 'green' | 'rose';
  onClick: () => void;
}

function FeatureCard({ icon, title, description, tag, color, onClick }: FeatureCardProps) {
  const colorClasses = {
    indigo: {
      bg: 'bg-indigo-50 dark:bg-indigo-900/40',
      text: 'text-indigo-800 dark:text-indigo-200',
      hover: 'hover:text-indigo-900 dark:hover:text-indigo-100',
      tag: 'bg-indigo-100 dark:bg-indigo-800 text-indigo-900 dark:text-indigo-100'
    },
    purple: {
      bg: 'bg-purple-50 dark:bg-purple-900/40',
      text: 'text-purple-800 dark:text-purple-200',
      hover: 'hover:text-purple-900 dark:hover:text-purple-100',
      tag: 'bg-purple-100 dark:bg-purple-800 text-purple-900 dark:text-purple-100'
    },
    amber: {
      bg: 'bg-amber-50 dark:bg-amber-900/40',
      text: 'text-amber-800 dark:text-amber-200',
      hover: 'hover:text-amber-900 dark:hover:text-amber-100',
      tag: 'bg-amber-100 dark:bg-amber-800 text-amber-900 dark:text-amber-100'
    },
    blue: {
      bg: 'bg-blue-50 dark:bg-blue-900/40',
      text: 'text-blue-800 dark:text-blue-200',
      hover: 'hover:text-blue-900 dark:hover:text-blue-100',
      tag: 'bg-blue-100 dark:bg-blue-800 text-blue-900 dark:text-blue-100'
    },
    green: {
      bg: 'bg-green-50 dark:bg-green-900/40',
      text: 'text-green-800 dark:text-green-200',
      hover: 'hover:text-green-900 dark:hover:text-green-100',
      tag: 'bg-green-100 dark:bg-green-800 text-green-900 dark:text-green-100'
    },
    rose: {
      bg: 'bg-rose-50 dark:bg-rose-900/40',
      text: 'text-rose-800 dark:text-rose-200',
      hover: 'hover:text-rose-900 dark:hover:text-rose-100',
      tag: 'bg-rose-100 dark:bg-rose-800 text-rose-900 dark:text-rose-100'
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
      <p className="text-gray-700 dark:text-gray-200 text-sm mb-6 flex-grow">
        {description}
      </p>
      <div className="flex justify-between items-center mt-auto">
        <button 
          onClick={onClick}
          className={`${colorClasses[color].text} ${colorClasses[color].hover} text-sm font-medium inline-flex items-center group transition-colors duration-200`}
        >
          Learn more
          <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
        <span className={`${colorClasses[color].tag} text-xs px-3 py-1 rounded-full font-medium`}>
          {tag}
        </span>
      </div>
    </div>
  );
}