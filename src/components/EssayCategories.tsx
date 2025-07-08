import React, { useState } from 'react';
import { 
  PenLine, 
  Brain, 
  BookOpen, 
  Palette,
  MessageSquare,
  Award,
  CheckCircle,
  Star,
  FileText,
  BarChart,
  Lock 
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

// Define writing templates similar to old project
const WRITING_TEMPLATES: Record<string, { title: string; description: string }> = {
  narrative: {
    title: 'Narrative Writing',
    description: 'Create engaging stories with compelling characters and plots'
  },
  imaginative: {
    title: 'Imaginative Writing',
    description: 'Express creativity through fictional stories and scenarios'
  },
  recount: {
    title: 'Recount Writing',
    description: 'Tell about real events and experiences in chronological order'
  },
  persuasive: {
    title: 'Persuasive Writing',
    description: 'Convince readers with strong arguments and evidence'
  },
  discursive: {
    title: 'Discursive Writing',
    description: 'Explore different viewpoints on complex topics'
  },
  expository: {
    title: 'Expository Writing',
    description: 'Explain and inform with clear, factual information'
  },
  reflective: {
    title: 'Reflective Writing',
    description: 'Share personal thoughts and insights on experiences'
  },
  descriptive: {
    title: 'Descriptive Writing',
    description: 'Paint vivid pictures with detailed sensory language'
  },
  diary: {
    title: 'Diary Writing',
    description: 'Express personal thoughts and daily experiences'
  }
};

// Group templates by category
const CATEGORIES = {
  storytelling: {
    name: 'Storytelling & Creative Writing',
    description: 'Master the art of creative storytelling and narrative techniques',
    icon: PenLine,
    color: 'indigo',
    types: ['narrative', 'imaginative', 'recount']
  },
  argumentative: {
    name: 'Argument & Debate Writing',
    description: 'Learn to craft compelling arguments and balanced discussions',
    icon: Brain,
    color: 'purple',
    types: ['persuasive', 'discursive']
  },
  informative: {
    name: 'Informative & Reflective Writing',
    description: 'Develop clear explanations and thoughtful reflections',
    icon: BookOpen,
    color: 'blue',
    types: ['expository', 'reflective']
  },
  descriptive: {
    name: 'Descriptive & Expressive Writing',
    description: 'Paint vivid pictures with words and express emotions',
    icon: Palette,
    color: 'orange',
    types: ['descriptive', 'diary']
  }
};

interface EssayCategoriesProps {
  onNavigate: (page: string, type?: string) => void;
}

export function EssayCategories({ onNavigate }: EssayCategoriesProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState<string | null>(null);

  const handleWritingClick = async (e: React.MouseEvent, type: string) => {
    e.preventDefault();
    
    if (!user) {
      onNavigate('auth');
      return;
    }

    setLoading(type);
    try {
      // Navigate to writing session
      onNavigate('writing', type);
    } catch (error) {
      console.error('Navigation error:', error);
    } finally {
      setLoading(null);
    }
  };

  // Helper function to get button classes based on category color
  const getButtonClasses = (color: string) => {
    const colorMap: Record<string, string> = {
      indigo: 'bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600',
      purple: 'bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600',
      blue: 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600',
      orange: 'bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600'
    };
    return colorMap[color] || colorMap.indigo;
  };

  // Helper function to get border classes based on category color
  const getBorderClasses = (color: string) => {
    const colorMap: Record<string, string> = {
      indigo: 'border-indigo-500',
      purple: 'border-purple-500',
      blue: 'border-blue-500',
      orange: 'border-orange-500'
    };
    return colorMap[color] || colorMap.indigo;
  };

  // Helper function to get background classes based on category color
  const getBgClasses = (color: string) => {
    const colorMap: Record<string, string> = {
      indigo: 'bg-indigo-100 dark:bg-indigo-900/50',
      purple: 'bg-purple-100 dark:bg-purple-900/50',
      blue: 'bg-blue-100 dark:bg-blue-900/50',
      orange: 'bg-orange-100 dark:bg-orange-900/50'
    };
    return colorMap[color] || colorMap.indigo;
  };

  return (
    <div className="py-12 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-orange-600">
            Writing Types for NSW Selective Exam
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Choose from our comprehensive range of writing styles with AI-powered guidance
          </p>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Writing Categories */}
          <div className="col-span-12 lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {Object.entries(CATEGORIES).map(([key, category]) => (
                <div
                  key={key}
                  className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border-t-4 ${getBorderClasses(category.color)}`}
                >
                  <div className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className={`p-2 rounded-lg ${getBgClasses(category.color)}`}>
                        <category.icon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {category.name}
                      </h3>
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {category.description}
                    </p>

                    <div className="space-y-4">
                      {category.types.map(type => {
                        const template = WRITING_TEMPLATES[type];
                        return (
                          <div key={type} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium text-gray-900 dark:text-white">
                                {template.title}
                              </h4>
                              {!user && (
                                <Lock className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                              )}
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                              {template.description}
                            </p>
                            <button
                              onClick={(e) => handleWritingClick(e, type)}
                              disabled={loading === type}
                              className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white ${getButtonClasses(category.color)} focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed`}
                            >
                              {loading === type ? 'Loading...' : (user ? 'Start Writing' : 'Sign In to Start')}
                              <MessageSquare className="ml-2 h-4 w-4" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Essay Scorer */}
          <div className="col-span-12 lg:col-span-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border-t-4 border-green-500 h-full">
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-lg">
                    <Award className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Essay Scorer
                  </h3>
                </div>

                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Get detailed feedback and scores based on NSW marking criteria
                </p>

                <div className="space-y-6">
                  {/* Features */}
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">Detailed Analysis</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Comprehensive feedback on content, structure, and language
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Star className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">NSW Criteria</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Aligned with Selective School marking standards
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <FileText className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">Improvement Tips</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Actionable suggestions for better scores
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <BarChart className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">Score Tracking</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Monitor your progress over time
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Score Button */}
                  <button
                    onClick={(e) => handleWritingClick(e, 'scorer')}
                    disabled={loading === 'scorer'}
                    className="block w-full px-4 py-3 text-center text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading === 'scorer' ? 'Loading...' : (user ? 'Score Your Essay' : 'Sign In to Score Essays')}
                  </button>

                  {/* Info Box */}
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 text-sm text-green-700 dark:text-green-300">
                    <p className="font-medium mb-1">Pro Tip:</p>
                    <p>Submit your completed essays for instant feedback and scoring based on actual NSW Selective exam criteria.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 dark:text-gray-300">
            All essay types are aligned with NSW Selective exam requirements
          </p>
          {!user && (
            <button
              onClick={() => onNavigate('auth')}
              className="mt-4 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign In to Start Writing
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

