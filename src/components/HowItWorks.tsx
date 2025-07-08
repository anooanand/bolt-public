import React from 'react';
import { Brain, Target, CheckCircle, BarChart, Sparkles, GraduationCap, Check, X } from 'lucide-react';

export function HowItWorks() {
  const features = [
    {
      name: 'Step-by-step writing guidance',
      instachat: true,
      others: false,
    },
    {
      name: 'Follows NSW writing criteria',
      instachat: true,
      others: false,
    },
    {
      name: 'NSW exam-style feedback',
      instachat: true,
      others: false,
    },
    {
      name: 'Real-time grammar & sentence corrections',
      instachat: true,
      others: true,
    },
    {
      name: 'Adaptive learning based on skill level',
      instachat: true,
      others: false,
    },
    {
      name: 'Interactive AI coaching',
      instachat: true,
      others: false,
    },
  ];

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-orange-600">
            How InstaChat AI Helps Students Succeed in Writing
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Our AI-powered platform guides students step-by-step, helping them master key writing formats
            required for NSW Selective School exams and school assignments.
          </p>
        </div>

        {/* Smart Technology Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              🚀 How InstaChat AI Works
            </h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <Brain className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Step-by-Step Writing Support
                  </h4>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">
                    The AI guides students through each section using an interactive, structured approach
                    based on NSW syllabus expectations.
                  </p>
                  <div className="mt-3 bg-indigo-50 dark:bg-indigo-900/50 p-4 rounded-lg">
                    <p className="text-sm text-indigo-700 dark:text-indigo-300">
                      <span className="font-semibold">Example:</span> "What is your main argument? 
                      Why do you believe this is true?"
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <Target className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Real-Time AI Feedback
                  </h4>
                  <ul className="mt-2 space-y-2 text-gray-600 dark:text-gray-400">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Grammar & spelling corrections</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Sentence structure improvements</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Persuasive & narrative techniques</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              📈 Student Success Data
            </h3>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Writing Score Improvement
                    </span>
                    <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                      82%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '82%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Student Confidence
                    </span>
                    <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                      94%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '94%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Comparison Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            💡 How InstaChat AI Stands Out from Other AI Writing Tools
          </h3>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                🔍 Feature Comparison
              </h4>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              <div className="grid grid-cols-3 px-6 py-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                <div>Feature</div>
                <div className="text-center">InstaChat AI</div>
                <div className="text-center">Generic AI Chatbots</div>
              </div>
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="grid grid-cols-3 px-6 py-3 text-sm hover:bg-gray-50 dark:hover:bg-gray-800/50"
                >
                  <div className="text-gray-900 dark:text-white">{feature.name}</div>
                  <div className="flex justify-center">
                    {feature.instachat ? (
                      <Check className="h-5 w-5 text-green-500" />
                    ) : (
                      <X className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                  <div className="flex justify-center">
                    {feature.others ? (
                      <Check className="h-5 w-5 text-green-500" />
                    ) : (
                      <X className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-4 text-gray-600 dark:text-gray-400 text-sm">
            📌 Unlike generic AI chatbots, InstaChat AI teaches students how to write better, rather than just generating answers.
          </p>
        </div>

        {/* Writing Formats Section */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <Sparkles className="h-8 w-8 text-indigo-600 mb-4" />
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Narrative Writing
            </h4>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Uses Story Mountain framework for engaging storytelling
            </p>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Character development</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Plot structure</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Descriptive language</span>
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <Brain className="h-8 w-8 text-purple-600 mb-4" />
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Persuasive Writing
            </h4>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Follows PEEEL structure for compelling arguments
            </p>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Strong thesis statements</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Evidence-based arguments</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Logical reasoning</span>
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <GraduationCap className="h-8 w-8 text-orange-600 mb-4" />
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              NSW Exam Alignment
            </h4>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Built specifically for NSW writing standards
            </p>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Selective School criteria</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>NAPLAN alignment</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>HSC preparation</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

