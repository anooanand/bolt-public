import React from 'react';

interface WritingModesSectionProps {
  onSelectMode: (mode: string) => void;
}

export function WritingModesSection({ onSelectMode }: WritingModesSectionProps) {
  return (
    <section className="py-16 bg-gradient-to-br from-indigo-50 via-white to-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Choose Your Writing Mode</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Different modes to support your learning journey from practice to exam simulation.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card bg-white p-6 rounded-xl shadow-md text-center border-t-4 border-indigo-500">
            <div className="mb-4">
              <div className="h-16 w-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto">
                <i className="fas fa-pen text-indigo-600 text-2xl"></i>
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Writing Mode</h3>
            <p className="text-gray-600 mb-4">
              Focus on developing your writing skills with unlimited time and full access to feedback and guidance.
            </p>
            <button 
              className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
              onClick={() => onSelectMode('writing')}
            >
              Start Writing
            </button>
          </div>
          <div className="card bg-white p-6 rounded-xl shadow-md text-center border-t-4 border-purple-500">
            <div className="mb-4">
              <div className="h-16 w-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                <i className="fas fa-brain text-purple-600 text-2xl"></i>
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Deeper Learning</h3>
            <p className="text-gray-600 mb-4">
              Dive deeper into writing techniques, language devices, and structure through interactive lessons.
            </p>
            <button 
              className="w-full py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
              onClick={() => onSelectMode('learning')}
            >
              Start Learning
            </button>
          </div>
          <div className="card bg-white p-6 rounded-xl shadow-md text-center border-t-4 border-green-500">
            <div className="mb-4">
              <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <i className="fas fa-clipboard-check text-green-600 text-2xl"></i>
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Exam Mode</h3>
            <p className="text-gray-600 mb-4">
              Simulate the real NSW Selective exam with timed writing tests and authentic prompts.
            </p>
            <button 
              className="w-full py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              onClick={() => onSelectMode('exam')}
            >
              Enter Exam Mode
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
