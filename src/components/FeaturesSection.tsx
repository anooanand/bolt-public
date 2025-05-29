import React from 'react';
import { Sparkles, Brain, Target, Clock } from 'lucide-react';

interface FeaturesSectionProps {
  onTryFeature: (feature: string) => void;
}

export function FeaturesSection({ onTryFeature }: FeaturesSectionProps) {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Comprehensive Learning</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to excel in writing
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our AI-powered platform provides all the tools and guidance needed to master writing for the NSW Selective exam.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            <div className="flex flex-col">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                <Sparkles className="h-5 w-5 flex-none text-indigo-600" />
                AI Writing Coach
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">Get instant, personalized feedback on your writing with our advanced AI analysis. Learn from detailed suggestions and improve with every session.</p>
                <p className="mt-6">
                  <button
                    onClick={() => onTryFeature('ai-feedback')}
                    className="text-sm font-semibold leading-6 text-indigo-600"
                  >
                    Try AI feedback <span aria-hidden="true">→</span>
                  </button>
                </p>
              </dd>
            </div>
            <div className="flex flex-col">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                <Brain className="h-5 w-5 flex-none text-indigo-600" />
                Interactive Learning
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">Practice with interactive exercises, real exam-style prompts, and comprehensive writing guides for each text type.</p>
                <p className="mt-6">
                  <button
                    onClick={() => onTryFeature('interactive-learning')}
                    className="text-sm font-semibold leading-6 text-indigo-600"
                  >
                    Start learning <span aria-hidden="true">→</span>
                  </button>
                </p>
              </dd>
            </div>
            <div className="flex flex-col">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                <Clock className="h-5 w-5 flex-none text-indigo-600" />
                Exam Preparation
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">Simulate real exam conditions with timed writing sessions and get scored according to NSW Selective criteria.</p>
                <p className="mt-6">
                  <button
                    onClick={() => onTryFeature('exam-prep')}
                    className="text-sm font-semibold leading-6 text-indigo-600"
                  >
                    Try exam mode <span aria-hidden="true">→</span>
                  </button>
                </p>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}