import React from 'react';
import { 
  PenLine, 
  Brain, 
  BookOpen, 
  FileText, 
  MessageSquare,
  Target,
  Star,
  Clock
} from 'lucide-react';

interface NSWEssayTypesProps {
  onNavigate: (page: string) => void;
}

export function NSWEssayTypes({ onNavigate }: NSWEssayTypesProps) {
  return (
    <div className="py-12 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-orange-600">
            Master Every Writing Style for Selective Success
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Practice under exam conditions and get feedback to improve your writing skills
          </p>
        </div>

        {/* Add Exam Practice Pad section at the top */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg shadow-lg overflow-hidden">
            <div className="p-8 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-4">NSW Selective Exam Practice Simulator</h2>
                  <p className="text-lg opacity-90 mb-6">
                    Experience real exam conditions with our timed writing environment
                  </p>
                </div>
                <div className="hidden lg:block">
                  <Target className="h-16 w-16 opacity-80" />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Timed Practice</h3>
                    <p className="text-sm opacity-90">Write your own essay under timed exam conditions</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <FileText className="h-5 w-5 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Word Counter</h3>
                    <p className="text-sm opacity-90">Track your word count in real-time</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Target className="h-5 w-5 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Self-Review</h3>
                    <p className="text-sm opacity-90">Review your essay after completing the practice session</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onNavigate('exam-practice')}
                className="inline-flex items-center px-6 py-3 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-indigo-50 transition-colors"
              >
                Start Practice Session
                <MessageSquare className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Writing Categories */}
          <div className="col-span-12 lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Narrative Writing */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border-t-4 border-indigo-500">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg">
                    <PenLine className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Narrative Writing
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Create engaging stories with strong plots, vivid descriptions, and memorable characters.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <Star className="h-4 w-4 text-indigo-600 mt-1" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Story Mountain framework</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Star className="h-4 w-4 text-indigo-600 mt-1" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Character development</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Star className="h-4 w-4 text-indigo-600 mt-1" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Descriptive techniques</span>
                  </div>
                </div>
              </div>

              {/* Persuasive Writing */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border-t-4 border-purple-500">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-lg">
                    <Brain className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Persuasive Writing
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Master the PEEL method to construct powerful arguments that convince your readers.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <Star className="h-4 w-4 text-purple-600 mt-1" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Strong thesis statements</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Star className="h-4 w-4 text-purple-600 mt-1" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Evidence-based arguments</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Star className="h-4 w-4 text-purple-600 mt-1" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Persuasive techniques</span>
                  </div>
                </div>
              </div>

              {/* Informative Writing */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border-t-4 border-blue-500">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
                    <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Informative Writing
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Explain complex topics clearly and effectively with structured information.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <Star className="h-4 w-4 text-blue-600 mt-1" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Clear explanations</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Star className="h-4 w-4 text-blue-600 mt-1" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Logical organization</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Star className="h-4 w-4 text-blue-600 mt-1" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Supporting examples</span>
                  </div>
                </div>
              </div>

              {/* Reflective Writing */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border-t-4 border-orange-500">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-orange-100 dark:bg-orange-900/50 rounded-lg">
                    <FileText className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Reflective Writing
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Share personal experiences and insights with meaningful reflection.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <Star className="h-4 w-4 text-orange-600 mt-1" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Personal insights</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Star className="h-4 w-4 text-orange-600 mt-1" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Critical thinking</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Star className="h-4 w-4 text-orange-600 mt-1" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Learning outcomes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Practice Tips */}
          <div className="col-span-12 lg:col-span-4">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border-t-4 border-green-500 h-full">
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-lg">
                    <Target className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Practice Tips
                  </h3>
                </div>

                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Follow these tips to make the most of your practice sessions
                </p>

                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Clock className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">Time Management</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Practice with the timer to improve your speed
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Target className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">Regular Practice</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Set a consistent practice schedule
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Star className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">Self-Review</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Review your work after each session
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => onNavigate('auth')}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Start Your Writing Journey
          </button>
        </div>
      </div>
    </div>
  );
}

