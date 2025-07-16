import React from 'react';
import { BookOpen, Clock, Brain, Sparkles, ArrowRight, BarChart2, Zap, Target, PenTool, Award } from 'lucide-react';

export function WritingTypesSection() {
  return (
    <section className="py-12 bg-white dark:bg-gray-900" id="writing-types">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white bg-gradient-to-r from-indigo-700 to-purple-700 dark:from-indigo-300 dark:to-purple-300 text-transparent bg-clip-text">
            Writing Types for NSW Selective Exam
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-200 max-w-3xl mx-auto">
            Choose from our comprehensive range of writing styles with AI-powered guidance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <WritingTypeCard 
            icon={<PenTool className="w-5 h-5 text-blue-700 dark:text-blue-300" />}
            title="Storytelling & Creative Writing"
            description="Master the art of creative storytelling and narrative techniques"
            types={[
              { name: "Narrative Writing", description: "Write engaging stories with compelling plots and characters" },
              { name: "Imaginative Writing", description: "Create fantastical stories and unique worlds" },
              { name: "Recount Writing", description: "Share personal or historical experiences effectively" }
            ]}
            color="blue"
          />

          <WritingTypeCard 
            icon={<Target className="w-5 h-5 text-purple-700 dark:text-purple-300" />}
            title="Argument & Debate Writing"
            description="Learn to craft compelling arguments and balanced discussions"
            types={[
              { name: "Persuasive Writing", description: "Convince readers with strong arguments and evidence" },
              { name: "Discursive Writing", description: "Explore different viewpoints on complex topics" }
            ]}
            color="purple"
          />

          <WritingTypeCard 
            icon={<Award className="w-5 h-5 text-green-700 dark:text-green-300" />}
            title="Essay Scorer"
            description="Get detailed feedback and scores based on NSW marking criteria"
            features={[
              { name: "Detailed Analysis", description: "Comprehensive feedback on content, structure, and language" },
              { name: "NSW Criteria", description: "Aligned with Selective School marking standards" },
              { name: "Improvement Tips", description: "Actionable suggestions for better scores" },
              { name: "Score Tracking", description: "Monitor your progress over time" }
            ]}
            color="green"
          />

          <WritingTypeCard 
            icon={<BookOpen className="w-5 h-5 text-blue-700 dark:text-blue-300" />}
            title="Informative & Reflective Writing"
            description="Develop clear explanations and thoughtful reflections"
            types={[
              { name: "Expository Writing", description: "Explain concepts clearly and factually" },
              { name: "Reflective Writing", description: "Share personal insights and learning experiences" }
            ]}
            color="blue"
          />

          <WritingTypeCard 
            icon={<Sparkles className="w-5 h-5 text-orange-700 dark:text-orange-300" />}
            title="Descriptive & Expressive Writing"
            description="Paint vivid pictures with words and express emotions"
            types={[
              { name: "Descriptive Writing", description: "Create vivid imagery using sensory details" },
              { name: "Diary Entry Writing", description: "Express personal thoughts and feelings effectively" }
            ]}
            color="orange"
          />
        </div>
      </div>
    </section>
  );
}

interface WritingTypeCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  types?: Array<{name: string, description: string}>;
  features?: Array<{name: string, description: string}>;
  color: 'blue' | 'purple' | 'green' | 'orange';
}

function WritingTypeCard({ icon, title, description, types, features, color }: WritingTypeCardProps) {
  const colorClasses = {
    blue: {
      border: 'border-blue-300 dark:border-blue-700',
      bg: 'bg-blue-50 dark:bg-blue-900/30',
      text: 'text-blue-800 dark:text-blue-200',
      hover: 'hover:border-blue-400 dark:hover:border-blue-600'
    },
    purple: {
      border: 'border-purple-300 dark:border-purple-700',
      bg: 'bg-purple-50 dark:bg-purple-900/30',
      text: 'text-purple-800 dark:text-purple-200',
      hover: 'hover:border-purple-400 dark:hover:border-purple-600'
    },
    green: {
      border: 'border-green-300 dark:border-green-700',
      bg: 'bg-green-50 dark:bg-green-900/30',
      text: 'text-green-800 dark:text-green-200',
      hover: 'hover:border-green-400 dark:hover:border-green-600'
    },
    orange: {
      border: 'border-orange-300 dark:border-orange-700',
      bg: 'bg-orange-50 dark:bg-orange-900/30',
      text: 'text-orange-800 dark:text-orange-200',
      hover: 'hover:border-orange-400 dark:hover:border-orange-600'
    }
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border ${colorClasses[color].border} ${colorClasses[color].hover} transition-all duration-300 overflow-hidden flex flex-col h-auto`}>
      <div className={`p-4 ${colorClasses[color].bg}`}>
        <div className="flex items-center mb-2">
          <div className="mr-2">
            {icon}
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white leading-tight">{title}</h3>
        </div>
        <p className="text-sm text-gray-700 dark:text-gray-200">{description}</p>
      </div>
      
      <div className="p-4 flex-grow">
        {types && types.map((type, index) => (
          <div key={index} className="mb-3 last:mb-0">
            <div className="flex items-center justify-between mb-1">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white">{type.name}</h4>
              <span className="text-gray-500 dark:text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </span>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-300 mb-2">{type.description}</p>
            <button className={`flex items-center text-xs font-medium ${colorClasses[color].text}`}>
              Sign In to Start
              <ArrowRight className="ml-1 w-3 h-3" />
            </button>
          </div>
         ))}
        
        {features && features.map((feature, index) => (
          <div key={index} className="mb-3 last:mb-0">
            <div className="flex items-start">
              <div className={`mt-0.5 mr-2 ${colorClasses[color].text}`}>
                {index === 0 && <BarChart2 className="w-4 h-4" />}
                {index === 1 && <Target className="w-4 h-4" />}
                {index === 2 && <BookOpen className="w-4 h-4" />}
                {index === 3 && <Clock className="w-4 h-4" />}
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">{feature.name}</h4>
                <p className="text-xs text-gray-600 dark:text-gray-300">{feature.description}</p>
              </div>
            </div>
          </div>
        ))}
        
        {features && (
          <button className={`mt-3 w-full py-2 px-3 rounded-md bg-green-700 hover:bg-green-800 text-white text-sm font-medium flex items-center justify-center`}>
            Sign In to Score Essays
            <ArrowRight className="ml-2 w-3 h-3" />
          </button>
        )}
      </div>
    </div>
  );
}
