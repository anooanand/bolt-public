import React from 'react';

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">
          About InstaChat AI Writing Mate
        </h1>
        
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Our Mission</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            InstaChat AI Writing Mate was created with a clear mission: to help students master the writing skills needed to excel in NSW Selective School exams and beyond. We believe that every student deserves personalized guidance that adapts to their unique learning journey.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Unlike generic AI tools that simply generate content, our platform teaches students how to become better writers through structured guidance, real-time feedback, and practice aligned with NSW curriculum standards.
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Our Educational Approach</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            We've developed a unique educational methodology that combines AI technology with proven pedagogical principles:
          </p>
          
          <div className="mb-6">
            <h3 className="text-xl font-medium mb-2 text-indigo-600 dark:text-indigo-400">Step-by-Step Guidance</h3>
            <p className="text-gray-700 dark:text-gray-300 pl-4 border-l-2 border-indigo-200 dark:border-indigo-800">
              Our AI coach guides students through each section of their writing using an interactive, structured approach based on NSW syllabus expectations.
            </p>
          </div>
          
          <div className="mb-6">
            <h3 className="text-xl font-medium mb-2 text-indigo-600 dark:text-indigo-400">Adaptive Learning</h3>
            <p className="text-gray-700 dark:text-gray-300 pl-4 border-l-2 border-indigo-200 dark:border-indigo-800">
              The platform continuously analyzes writing patterns and progress to provide personalized recommendations and challenges appropriate for each student's skill level.
            </p>
          </div>
          
          <div className="mb-6">
            <h3 className="text-xl font-medium mb-2 text-indigo-600 dark:text-indigo-400">NSW Curriculum Alignment</h3>
            <p className="text-gray-700 dark:text-gray-300 pl-4 border-l-2 border-indigo-200 dark:border-indigo-800">
              All writing types, feedback, and assessment criteria are specifically designed to align with NSW Selective School exam requirements.
            </p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Our Results</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Students using InstaChat AI Writing Mate have reported significant improvements in their writing skills and confidence:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-indigo-50 dark:bg-indigo-900/30 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">82%</div>
              <div className="text-gray-700 dark:text-gray-300">Writing Score Improvement</div>
            </div>
            <div className="bg-indigo-50 dark:bg-indigo-900/30 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">94%</div>
              <div className="text-gray-700 dark:text-gray-300">Student Confidence</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Join Our Community</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Join thousands of students who are already using InstaChat AI Writing Mate to prepare for NSW Selective School exams. Our platform provides the guidance, practice, and feedback needed to develop strong writing skills that last a lifetime.
          </p>
          <div className="text-center">
            <a href="#" className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium rounded-md shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1">
              Start Your Writing Journey
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
