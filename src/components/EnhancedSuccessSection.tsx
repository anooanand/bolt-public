import React from 'react';
import { CheckCircle, X, Play } from 'lucide-react';

export function EnhancedSuccessSection() {
  return (
    <div className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Statistics Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-8 md:p-12 text-white">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
              See Results in Just Weeks!
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">87%</div>
              <div className="text-lg text-blue-100">Average Score Improvement</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">10,000+</div>
              <div className="text-lg text-blue-100">Students Helped</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">4.9/5</div>
              <div className="text-lg text-blue-100">Parent Satisfaction</div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-100 transition-colors duration-300 shadow-lg">
              Start Your Free Trial
            </button>
            <button className="px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-blue-600 transition-colors duration-300 flex items-center justify-center">
              <Play className="w-5 h-5 mr-2" />
              Watch Demo
            </button>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-8 md:p-12 text-white text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Join Thousands of Successful Students!
          </h2>
          <p className="text-lg mb-6 text-blue-100 max-w-2xl mx-auto">
            Start your writing journey today and see amazing results in just weeks.
          </p>
          <button className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-100 transition-colors duration-300 shadow-lg">
            Start Your Free Trial
          </button>
        </div>
      </div>

      {/* How InstaChat AI Helps Students Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            How InstaChat AI Helps Students Succeed in Writing
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
            Our AI-powered platform guides students step-by-step, helping them master key writing formats required for NSW Selective School exams and school assignments.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* How InstaChat AI Works */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
            <div className="flex items-center mb-6">
              <div className="text-2xl mr-3">🚀</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                How InstaChat AI Works
              </h3>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex items-center mb-3">
                  <div className="text-xl mr-3">🧠</div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Step-by-Step Writing Support
                  </h4>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-3">
                  The AI guides students through each section using an interactive, structured approach based on NSW syllabus expectations.
                </p>
                <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg">
                  <p className="text-blue-800 dark:text-blue-200 italic">
                    Example: "What is your main argument? Why do you believe this is true?"
                  </p>
                </div>
              </div>

              <div>
                <div className="flex items-center mb-3">
                  <div className="text-xl mr-3">🎯</div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Real-Time AI Feedback
                  </h4>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-gray-600 dark:text-gray-300">Grammar & spelling corrections</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-gray-600 dark:text-gray-300">Sentence structure improvements</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-gray-600 dark:text-gray-300">Persuasive & narrative techniques</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Student Success Data */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
            <div className="flex items-center mb-6">
              <div className="text-2xl mr-3">📈</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Student Success Data
              </h3>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-700 dark:text-gray-300">Writing Score Improvement</span>
                  <span className="text-2xl font-bold text-blue-600">82%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full" style={{ width: '82%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-700 dark:text-gray-300">Student Confidence</span>
                  <span className="text-2xl font-bold text-purple-600">94%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-600 h-3 rounded-full" style={{ width: '94%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Comparison Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
          <div className="flex items-center mb-6">
            <div className="text-2xl mr-3">💡</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              How InstaChat AI Stands Out from Other AI Writing Tools
            </h3>
          </div>

          <div className="mb-6">
            <div className="flex items-center mb-4">
              <div className="text-xl mr-3">🔍</div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                Feature Comparison
              </h4>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200 dark:border-gray-700">
                    <th className="text-left py-4 px-4 font-semibold text-gray-900 dark:text-white">Feature</th>
                    <th className="text-center py-4 px-4 font-semibold text-green-600">InstaChat AI</th>
                    <th className="text-center py-4 px-4 font-semibold text-gray-600 dark:text-gray-400">Generic AI Chatbots</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr>
                    <td className="py-4 px-4 text-gray-700 dark:text-gray-300">Step-by-step writing guidance</td>
                    <td className="py-4 px-4 text-center">
                      <CheckCircle className="w-6 h-6 text-green-500 mx-auto" />
                    </td>
                    <td className="py-4 px-4 text-center">
                      <X className="w-6 h-6 text-red-500 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 text-gray-700 dark:text-gray-300">Follows NSW writing criteria</td>
                    <td className="py-4 px-4 text-center">
                      <CheckCircle className="w-6 h-6 text-green-500 mx-auto" />
                    </td>
                    <td className="py-4 px-4 text-center">
                      <X className="w-6 h-6 text-red-500 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 text-gray-700 dark:text-gray-300">NSW exam-style feedback</td>
                    <td className="py-4 px-4 text-center">
                      <CheckCircle className="w-6 h-6 text-green-500 mx-auto" />
                    </td>
                    <td className="py-4 px-4 text-center">
                      <X className="w-6 h-6 text-red-500 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 text-gray-700 dark:text-gray-300">Real-time grammar & sentence corrections</td>
                    <td className="py-4 px-4 text-center">
                      <CheckCircle className="w-6 h-6 text-green-500 mx-auto" />
                    </td>
                    <td className="py-4 px-4 text-center">
                      <CheckCircle className="w-6 h-6 text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 text-gray-700 dark:text-gray-300">Adaptive learning based on skill level</td>
                    <td className="py-4 px-4 text-center">
                      <CheckCircle className="w-6 h-6 text-green-500 mx-auto" />
                    </td>
                    <td className="py-4 px-4 text-center">
                      <X className="w-6 h-6 text-red-500 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 text-gray-700 dark:text-gray-300">Interactive AI coaching</td>
                    <td className="py-4 px-4 text-center">
                      <CheckCircle className="w-6 h-6 text-green-500 mx-auto" />
                    </td>
                    <td className="py-4 px-4 text-center">
                      <X className="w-6 h-6 text-red-500 mx-auto" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 p-4 bg-pink-50 dark:bg-pink-900/30 rounded-lg border-l-4 border-pink-500">
              <div className="flex items-start">
                <div className="text-xl mr-3">📌</div>
                <p className="text-gray-700 dark:text-gray-300">
                  Unlike generic AI chatbots, InstaChat AI teaches students how to write better, rather than just generating answers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Continuous Learning Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl p-8 text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            Continuous Learning & Adaptation
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
            Our AI continuously analyzes your writing patterns and progress to provide personalized recommendations and challenges appropriate for your skill level. As you improve, the AI adjusts its feedback to help you reach the next level of writing excellence.
          </p>
        </div>
      </div>

      {/* Practice Simulator Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Master Every Writing Style for Selective Success
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Practice under exam conditions and get feedback to improve your writing skills
          </p>
        </div>

        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-8 md:p-12 text-white">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                NSW Selective Exam Practice Simulator
              </h3>
              <p className="text-lg text-blue-100 mb-6">
                Experience real exam conditions with our timed writing environment
              </p>
            </div>
            <div className="hidden md:block text-6xl opacity-50">
              🎯
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="text-xl mb-2">⏱️</div>
              <h4 className="text-lg font-semibold mb-2 text-white">Timed Practice</h4>
              <p className="text-blue-100 text-sm">
                Write your own essay under timed exam conditions
              </p>
            </div>
            <div className="text-center">
              <div className="text-xl mb-2">📝</div>
              <h4 className="text-lg font-semibold mb-2 text-white">Word Counter</h4>
              <p className="text-blue-100 text-sm">
                Track your word count in real-time
              </p>
            </div>
            <div className="text-center">
              <div className="text-xl mb-2">🎯</div>
              <h4 className="text-lg font-semibold mb-2 text-white">Self-Review</h4>
              <p className="text-blue-100 text-sm">
                Review your essay after completing the practice session
              </p>
            </div>
          </div>

          <div className="text-center">
            <button className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-100 transition-colors duration-300 shadow-lg flex items-center mx-auto">
              <Play className="w-5 h-5 mr-2" />
              Start Practice Session
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
