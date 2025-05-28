import React from 'react';

interface FeaturesSectionProps {
  onTryFeature: (feature: string) => void;
}

export function FeaturesSection({ onTryFeature }: FeaturesSectionProps) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Comprehensive Writing Tools</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to master essay writing for the NSW Selective School exams in one place.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card bg-white p-8 rounded-xl shadow-lg border border-gray-100">
            <div className="feature-icon">
              <i className="fas fa-edit"></i>
            </div>
            <h3 className="text-xl font-semibold mb-4">AI-Powered Feedback</h3>
            <p className="text-gray-600 mb-6">
              Receive instant, detailed feedback on your writing with specific suggestions to improve content, structure, and style.
            </p>
            <div className="flex justify-between items-center">
              <a 
                className="text-indigo-600 hover:text-indigo-800 font-medium inline-flex items-center" 
                href="#"
                onClick={(e) => { e.preventDefault(); onTryFeature('ai-feedback'); }}
              >
                Try now
                <i className="fas fa-arrow-right ml-2"></i>
              </a>
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Set A Aligned</span>
            </div>
          </div>
          <div className="card bg-white p-8 rounded-xl shadow-lg border border-gray-100">
            <div className="feature-icon">
              <i className="fas fa-book"></i>
            </div>
            <h3 className="text-xl font-semibold mb-4">Text Type Templates</h3>
            <p className="text-gray-600 mb-6">
              Access templates for all NSW Selective text types with clear structures, examples, and guided prompts.
            </p>
            <div className="flex justify-between items-center">
              <a 
                className="text-indigo-600 hover:text-indigo-800 font-medium inline-flex items-center" 
                href="#"
                onClick={(e) => { e.preventDefault(); onTryFeature('templates'); }}
              >
                Explore templates
                <i className="fas fa-arrow-right ml-2"></i>
              </a>
              <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">11 Types</span>
            </div>
          </div>
          <div className="card bg-white p-8 rounded-xl shadow-lg border border-gray-100">
            <div className="feature-icon">
              <i className="fas fa-stopwatch"></i>
            </div>
            <h3 className="text-xl font-semibold mb-4">Timed Practice Mode</h3>
            <p className="text-gray-600 mb-6">
              Practice under real exam conditions with our 30-minute timer and realistic practice prompts based on past exams.
            </p>
            <div className="flex justify-between items-center">
              <a 
                className="text-indigo-600 hover:text-indigo-800 font-medium inline-flex items-center" 
                href="#"
                onClick={(e) => { e.preventDefault(); onTryFeature('practice'); }}
              >
                Start practice
                <i className="fas fa-arrow-right ml-2"></i>
              </a>
              <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">Exam Mode</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
