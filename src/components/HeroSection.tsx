import React from 'react';
import { ArrowRight, Sparkles, Zap, Shield } from 'lucide-react';

interface HeroSectionProps {
  onStartWriting: () => void;
  onTryDemo: () => void;
}

export function HeroSection({ onStartWriting, onTryDemo }: HeroSectionProps) {
  return (
    <div className="relative isolate">
      {/* Background gradient */}
      <div className="absolute inset-x-0 top-20 -z-10 transform-gpu overflow-hidden blur-3xl" aria-hidden="true">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
        <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
          <div className="mt-24 sm:mt-32 lg:mt-16">
            <a href="#" className="inline-flex space-x-6">
              <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-sm font-semibold leading-6 text-indigo-600 ring-1 ring-inset ring-indigo-500/20">
                Latest Update
              </span>
              <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-600">
                <span>Just shipped v1.0</span>
                <ArrowRight className="h-4 w-4" />
              </span>
            </a>
          </div>
          <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Master NSW Selective Writing with AI
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Your personal AI writing coach that helps students excel in the NSW Selective exam. Get instant feedback, learn from examples, and practice with real exam-style prompts.
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <button
              onClick={onStartWriting}
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Get started
            </button>
            <button
              onClick={onTryDemo}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Try demo <span aria-hidden="true">→</span>
            </button>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-8 border-t border-gray-200 pt-10">
            <div>
              <div className="flex items-center gap-x-2">
                <Sparkles className="h-5 w-5 text-indigo-600" />
                <h3 className="text-sm font-semibold leading-6 text-gray-900">AI-Powered Feedback</h3>
              </div>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Get instant, personalized feedback on your writing with advanced AI analysis.
              </p>
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <Zap className="h-5 w-5 text-indigo-600" />
                <h3 className="text-sm font-semibold leading-6 text-gray-900">Real-time Coaching</h3>
              </div>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Learn and improve as you write with interactive suggestions and guidance.
              </p>
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <Shield className="h-5 w-5 text-indigo-600" />
                <h3 className="text-sm font-semibold leading-6 text-gray-900">Exam-Aligned</h3>
              </div>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Practice with prompts and criteria aligned to NSW Selective standards.
              </p>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
          <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
            <img
              src="https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg"
              alt="Student writing with AI assistance"
              className="w-[76rem] rounded-md bg-white/5 shadow-2xl ring-1 ring-white/10"
            />
          </div>
        </div>
      </div>

      {/* Background gradient */}
      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
        <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"></div>
      </div>
    </div>
  );
}