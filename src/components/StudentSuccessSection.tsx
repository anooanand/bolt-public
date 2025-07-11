import React from 'react';
import { Star, TrendingUp, Award, Users, Quote } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  age: number;
  school: string;
  quote: string;
  improvement: string;
  rating: number;
  avatar: string;
}

interface SuccessMetric {
  id: string;
  value: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  color: 'blue' | 'green' | 'purple' | 'amber';
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Emma Chen',
    age: 11,
    school: 'Sydney Grammar School',
    quote: 'InstaChat AI helped me write better stories! My teacher said my writing improved so much. The AI buddy gives really helpful tips.',
    improvement: 'Writing score improved from 65% to 89%',
    rating: 5,
    avatar: '👧'
  },
  {
    id: '2',
    name: 'Marcus Thompson',
    age: 10,
    school: 'James Ruse Agricultural High School',
    quote: 'I used to hate writing essays, but now I love it! The step-by-step help makes everything so easy to understand.',
    improvement: 'Confidence increased by 85%',
    rating: 5,
    avatar: '👦'
  },
  {
    id: '3',
    name: 'Sophia Patel',
    age: 11,
    school: 'North Sydney Girls High School',
    quote: 'The practice tests helped me get ready for my selective exam. I felt so confident on test day!',
    improvement: 'Exam readiness score: 94%',
    rating: 5,
    avatar: '👧'
  },
  {
    id: '4',
    name: 'Oliver Kim',
    age: 10,
    school: 'Baulkham Hills High School',
    quote: 'My vocabulary got so much better! I learned new words and how to use them properly in my writing.',
    improvement: 'Vocabulary expanded by 200+ words',
    rating: 5,
    avatar: '👦'
  }
];

const successMetrics: SuccessMetric[] = [
  {
    id: 'improvement',
    value: '87%',
    label: 'Average Score Improvement',
    description: 'Students see significant writing score improvements within 4 weeks',
    icon: <TrendingUp className="w-8 h-8" />,
    color: 'green'
  },
  {
    id: 'confidence',
    value: '92%',
    label: 'Confidence Boost',
    description: 'Students report feeling more confident about writing after using our platform',
    icon: <Award className="w-8 h-8" />,
    color: 'blue'
  },
  {
    id: 'students',
    value: '10,000+',
    label: 'Happy Students',
    description: 'Students across NSW have improved their writing skills with InstaChat AI',
    icon: <Users className="w-8 h-8" />,
    color: 'purple'
  },
  {
    id: 'satisfaction',
    value: '4.9/5',
    label: 'Parent Satisfaction',
    description: 'Parents love seeing their children\'s writing progress and enthusiasm',
    icon: <Star className="w-8 h-8" />,
    color: 'amber'
  }
];

export function StudentSuccessSection() {
  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="absolute inset-0 bg-grid opacity-30"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Amazing Student Success Stories
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-200 max-w-3xl mx-auto">
            See how InstaChat AI has helped thousands of students improve their writing skills and ace their selective exams.
          </p>
        </div>

        {/* Success Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {successMetrics.map((metric) => (
            <SuccessMetricCard key={metric.id} metric={metric} />
          ))}
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            What Students Are Saying
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl p-8 text-white">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Join Thousands of Successful Students!
          </h3>
          <p className="text-lg mb-6 opacity-95">
            Start your writing journey today and see amazing results in just weeks.
          </p>
          <button className="px-8 py-4 bg-white text-blue-700 font-bold rounded-xl hover:bg-gray-100 transition-colors duration-300 shadow-lg">
            Start Your Free Trial
          </button>
        </div>
      </div>
    </section>
  );
}

interface SuccessMetricCardProps {
  metric: SuccessMetric;
}

function SuccessMetricCard({ metric }: SuccessMetricCardProps) {
  const colorClasses = {
    blue: {
      bg: 'bg-blue-50 dark:bg-blue-900/40',
      text: 'text-blue-700 dark:text-blue-300',
      border: 'border-blue-300 dark:border-blue-600'
    },
    green: {
      bg: 'bg-green-50 dark:bg-green-900/40',
      text: 'text-green-700 dark:text-green-300',
      border: 'border-green-300 dark:border-green-600'
    },
    purple: {
      bg: 'bg-purple-50 dark:bg-purple-900/40',
      text: 'text-purple-700 dark:text-purple-300',
      border: 'border-purple-300 dark:border-purple-600'
    },
    amber: {
      bg: 'bg-amber-50 dark:bg-amber-900/40',
      text: 'text-amber-700 dark:text-amber-300',
      border: 'border-amber-300 dark:border-amber-600'
    }
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border-2 ${colorClasses[metric.color].border} transform hover:scale-105`}>
      <div className={`${colorClasses[metric.color].bg} p-3 rounded-lg w-fit mb-4`}>
        <div className={colorClasses[metric.color].text}>
          {metric.icon}
        </div>
      </div>
      <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        {metric.value}
      </div>
      <div className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
        {metric.label}
      </div>
      <div className="text-sm text-gray-700 dark:text-gray-300">
        {metric.description}
      </div>
    </div>
  );
}

interface TestimonialCardProps {
  testimonial: Testimonial;
}

function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 relative">
      <div className="absolute top-4 right-4 text-blue-300 dark:text-blue-600">
        <Quote className="w-8 h-8" />
      </div>
      
      <div className="flex items-center mb-4">
        <div className="text-3xl mr-4">{testimonial.avatar}</div>
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white">
            {testimonial.name}, {testimonial.age}
          </h4>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {testimonial.school}
          </p>
        </div>
      </div>

      <div className="flex mb-3">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
        ))}
      </div>

      <p className="text-gray-800 dark:text-gray-200 mb-4 italic">
        "{testimonial.quote}"
      </p>

      <div className="bg-green-50 dark:bg-green-900/40 p-3 rounded-lg">
        <p className="text-sm font-semibold text-green-800 dark:text-green-200">
          📈 {testimonial.improvement}
        </p>
      </div>
    </div>
  );
}
