import React from 'react';

interface EssayScorerProps {
  onStartScoring: () => void;
}

export const EssayScorer: React.FC<EssayScorerProps> = ({ onStartScoring }) => {
  return (
    <section className="py-16 relative overflow-hidden bg-gradient-to-b from-white to-indigo-50/30 dark:from-gray-900 dark:to-gray-800">
      <div className="absolute inset-0 bg-grid opacity-30"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="glass-card rounded-2xl p-8 hover-lift card-shine">
          <div className="flex items-center mb-6">
            <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-xl mr-4">
              <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Essay Scorer
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="glass-card bg-white/50 dark:bg-gray-800/50 p-4 rounded-xl">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Detailed Analysis</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Get comprehensive feedback on content, structure, and language
              </p>
            </div>

            <div className="glass-card bg-white/50 dark:bg-gray-800/50 p-4 rounded-xl">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">NSW Criteria</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Aligned with Selective School marking standards
              </p>
            </div>

            <div className="glass-card bg-white/50 dark:bg-gray-800/50 p-4 rounded-xl">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Progress Tracking</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Monitor your improvement over time
              </p>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={onStartScoring}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-medium hover:from-green-600 hover:to-emerald-700 transition-all duration-300 hover:shadow-lg"
            >
              Start Scoring Essays
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EssayScorer;