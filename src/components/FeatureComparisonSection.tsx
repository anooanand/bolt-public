import React from 'react';
import { Check, X, Zap, BookOpen, Target, Brain, Clock, Award } from 'lucide-react';

interface ComparisonFeature {
  feature: string;
  instachat: boolean | string;
  genericAI: boolean | string;
  otherTools: boolean | string;
  icon?: React.ReactNode;
}

const comparisonFeatures: ComparisonFeature[] = [
  {
    feature: 'Step-by-Step Writing Guidance',
    instachat: 'Advanced coaching system',
    genericAI: false,
    otherTools: 'Basic templates only',
    icon: <BookOpen className="w-5 h-5" />
  },
  {
    feature: 'NSW Writing Criteria Adherence',
    instachat: 'Specifically designed for NSW',
    genericAI: false,
    otherTools: false,
    icon: <Target className="w-5 h-5" />
  },
  {
    feature: 'Exam-Style Feedback',
    instachat: 'Real exam format scoring',
    genericAI: 'Generic feedback only',
    otherTools: 'Limited feedback',
    icon: <Award className="w-5 h-5" />
  },
  {
    feature: 'Real-Time Corrections',
    instachat: 'Instant smart suggestions',
    genericAI: 'Basic spell check',
    otherTools: 'Manual corrections',
    icon: <Zap className="w-5 h-5" />
  },
  {
    feature: 'Adaptive Learning System',
    instachat: 'Personalized learning paths',
    genericAI: false,
    otherTools: false,
    icon: <Brain className="w-5 h-5" />
  },
  {
    feature: 'Interactive Coaching',
    instachat: 'AI writing buddy experience',
    genericAI: 'Question-answer only',
    otherTools: 'Static content',
    icon: <Brain className="w-5 h-5" />
  },
  {
    feature: 'Timed Practice Mode',
    instachat: 'Full exam simulation',
    genericAI: false,
    otherTools: 'Basic timer only',
    icon: <Clock className="w-5 h-5" />
  },
  {
    feature: 'Age-Appropriate Content',
    instachat: 'Designed for ages 9-11',
    genericAI: 'Generic for all ages',
    otherTools: 'Not age-specific',
    icon: <Target className="w-5 h-5" />
  },
  {
    feature: 'Progress Tracking',
    instachat: 'Detailed analytics & reports',
    genericAI: false,
    otherTools: 'Basic tracking',
    icon: <Award className="w-5 h-5" />
  },
  {
    feature: 'Teaches Writing Skills',
    instachat: 'Comprehensive skill building',
    genericAI: 'Generates answers for you',
    otherTools: 'Limited skill development',
    icon: <BookOpen className="w-5 h-5" />
  }
];

const uniqueFeatures = [
  {
    title: 'Teaching vs. Generating',
    description: 'Unlike generic AI that writes for you, InstaChat AI teaches you HOW to write better.',
    icon: <BookOpen className="w-8 h-8 text-blue-600" />
  },
  {
    title: 'NSW Exam Focus',
    description: 'Specifically designed for NSW selective exam requirements and writing criteria.',
    icon: <Target className="w-8 h-8 text-green-600" />
  },
  {
    title: 'Interactive Learning',
    description: 'Engaging AI buddy that makes learning fun and interactive, not just informational.',
    icon: <Brain className="w-8 h-8 text-purple-600" />
  },
  {
    title: 'Real Exam Preparation',
    description: 'Authentic practice with real exam conditions, timing, and scoring methods.',
    icon: <Clock className="w-8 h-8 text-amber-600" />
  }
];

export function FeatureComparisonSection() {
  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-b from-blue-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="absolute inset-0 bg-grid opacity-30"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            How InstaChat AI Stands Out
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            See why InstaChat AI is different from generic AI chatbots and other writing tools. We don't just generate answers - we teach you to become a better writer.
          </p>
        </div>

        {/* Unique Features Highlight */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {uniqueFeatures.map((feature, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 text-center transform hover:scale-105">
              <div className="flex justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
            <h3 className="text-2xl font-bold text-white text-center">
              Feature Comparison
            </h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Feature
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-blue-600 dark:text-blue-400">
                    InstaChat AI
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600 dark:text-gray-400">
                    Generic AI Chatbots
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600 dark:text-gray-400">
                    Other Writing Tools
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                {comparisonFeatures.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        {item.icon && (
                          <div className="mr-3 text-gray-600 dark:text-gray-400">
                            {item.icon}
                          </div>
                        )}
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {item.feature}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <ComparisonCell value={item.instachat} isInstachat={true} />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <ComparisonCell value={item.genericAI} isInstachat={false} />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <ComparisonCell value={item.otherTools} isInstachat={false} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Experience the InstaChat AI Difference
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Join thousands of students who are improving their writing skills with our unique teaching approach.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-100 transition-colors duration-300 shadow-lg">
                Start Free Trial
              </button>
              <button className="px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-blue-600 transition-colors duration-300">
                See Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface ComparisonCellProps {
  value: boolean | string;
  isInstachat: boolean;
}

function ComparisonCell({ value, isInstachat }: ComparisonCellProps) {
  if (typeof value === 'boolean') {
    return (
      <div className="flex justify-center">
        {value ? (
          <div className={`p-2 rounded-full ${isInstachat ? 'bg-green-100 dark:bg-green-900/30' : 'bg-green-100 dark:bg-green-900/30'}`}>
            <Check className={`w-4 h-4 ${isInstachat ? 'text-green-600 dark:text-green-400' : 'text-green-600 dark:text-green-400'}`} />
          </div>
        ) : (
          <div className="p-2 rounded-full bg-red-100 dark:bg-red-900/30">
            <X className="w-4 h-4 text-red-600 dark:text-red-400" />
          </div>
        )}
      </div>
    );
  }

  return (
    <span className={`text-sm font-medium px-3 py-1 rounded-full ${
      isInstachat 
        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' 
        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
    }`}>
      {value}
    </span>
  );
}
