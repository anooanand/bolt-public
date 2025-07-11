import React from 'react';

export const AdaptiveLearning: React.FC = () => {
  return (
    <section id="adaptive-learning" className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">
            AI That Adapts to Your Level
          </h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            Our intelligent writing coach dynamically adjusts feedback and guidance based on your skill level.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Beginner Level */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl shadow-xl p-8 transform transition duration-500 hover:scale-105 hover:shadow-2xl border border-blue-200 dark:border-gray-600">
            <div className="flex items-center justify-center w-16 h-16 bg-blue-500 rounded-full text-white text-2xl font-bold mb-6 mx-auto">
              B
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
              Beginner Level
            </h3>
            <p className="text-gray-700 dark:text-gray-200 mb-4 text-center">
              Just starting out? Our AI provides foundational support to build strong writing habits.
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
              <li>Basic sentence structure and grammar checks</li>
              <li>Vocabulary suggestions for common words</li>
              <li>Simple paragraph organization tips</li>
              <li>Clear and concise feedback on fundamental errors</li>
            </ul>
          </div>

          {/* Intermediate Level */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl shadow-xl p-8 transform transition duration-500 hover:scale-105 hover:shadow-2xl border border-purple-200 dark:border-gray-600">
            <div className="flex items-center justify-center w-16 h-16 bg-purple-500 rounded-full text-white text-2xl font-bold mb-6 mx-auto">
              I
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
              Intermediate Level
            </h3>
            <p className="text-gray-700 dark:text-gray-200 mb-4 text-center">
              Ready to refine your skills? The AI helps you develop more sophisticated writing techniques.
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
              <li>Guidance on developing strong topic sentences and supporting details</li>
              <li>Feedback on essay coherence and flow</li>
              <li>Suggestions for varied sentence structures and transitions</li>
              <li>Introduction to persuasive language and rhetorical devices</li>
            </ul>
          </div>

          {/* Advanced Level */}
          <div className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl shadow-xl p-8 transform transition duration-500 hover:scale-105 hover:shadow-2xl border border-green-200 dark:border-gray-600">
            <div className="flex items-center justify-center w-16 h-16 bg-green-500 rounded-full text-white text-2xl font-bold mb-6 mx-auto">
              A
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
              Advanced Level
            </h3>
            <p className="text-gray-700 dark:text-gray-200 mb-4 text-center">
              Mastering the art of writing? The AI challenges you with advanced strategies for exam success.
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
              <li>Advanced analytical and critical thinking prompts</li>
              <li>Refinement of complex arguments and counter-arguments</li>
              <li>Strategies for time management and exam-specific writing under pressure</li>
              <li>Personalized feedback on nuanced stylistic choices and voice</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Continuous Learning & Adaptation
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Our AI continuously learns from your writing patterns and progress, adapting its guidance to ensure you're always challenged and supported at the optimal level. This personalized approach leads to significant improvements in your writing skills for the NSW Selective Exam.
          </p>
          <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Proven Results for NSW Selective Exam Success
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Students using our AI writing coach show significant improvement in their writing scores
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">82%</div>
                <div className="text-gray-600 dark:text-gray-400">Average Score Improvement</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">94%</div>
                <div className="text-gray-600 dark:text-gray-400">Student Confidence Boost</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">10k+</div>
                <div className="text-gray-600 dark:text-gray-400">Students Helped</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
