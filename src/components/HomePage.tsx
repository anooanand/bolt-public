import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { EssayCategories } from './EssayCategories';
import { NSWEssayTypes } from './NSWEssayTypes';
import { AdaptiveAI } from './AdaptiveAI';
import { HowItWorks } from './HowItWorks';
import { ReferralBanner } from './ReferralBanner';
import { StudentSuccessSection } from './StudentSuccessSection';
import { AdaptiveLearning } from './AdaptiveLearning';
import { WritingTypesGrid } from './WritingTypesGrid';
import { ExamPracticeSimulator } from './ExamPracticeSimulator';
import { FeatureComparison } from './FeatureComparison';
import { TestComponent } from './TestComponent';

interface HomePageProps {
  onNavigate: (page: string, type?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {user && <ReferralBanner onNavigate={onNavigate} />}

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-orange-600">
              Boost Your Child's Selective Exam Score
            </span>
            <br />
            <span className="text-gray-900 dark:text-white">
              with AI-Powered Writing Practice
            </span>
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Master narrative, persuasive, and creative writing with personalized AI guidance. Join thousands of students preparing for NSW Selective exams.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            {!user && (
              <button
                onClick={() => onNavigate('pricing')}
                className="px-8 py-4 text-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                View Pricing
              </button>
            )}
            <a
              href="#how-it-works"
              className="px-8 py-4 text-lg font-semibold text-indigo-600 dark:text-indigo-400 bg-white dark:bg-gray-800 border-2 border-indigo-600 dark:border-indigo-400 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              See How It Works
            </a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main>
        <TestComponent />
        
        {/* Writing Types for NSW Selective Exam */}
        <div id="get-started">
          <EssayCategories onNavigate={onNavigate} />
        </div>
        
        {/* NSW Essay Types */}
        <NSWEssayTypes onNavigate={onNavigate} />
        
        {/* Writing Types Grid */}
        <WritingTypesGrid onNavigate={onNavigate} />
        
        {/* NSW Selective Exam Practice Simulator */}
        <ExamPracticeSimulator onNavigate={onNavigate} />
        
        {/* AI That Adapts to Your Level */}
        <AdaptiveLearning />
        
        {/* How InstaChat AI Helps Students Succeed */}
        <StudentSuccessSection />
        
        {/* Feature Comparison */}
        <FeatureComparison />
        
        {/* How It Works */}
        <div id="how-it-works">
          <AdaptiveAI />
        </div>
        <HowItWorks />
      </main>
    </div>
  );
};
