import React from 'react';

export function OverviewTab() {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Learning Objective</h3>
      <p className="mb-6 text-gray-700">
        By the end of today, you'll apply all the persuasive writing skills you've learned to practice writing a complete persuasive essay for the NSW Selective exam.
      </p>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">Did you know?</h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p>
                Practice is the most effective way to improve your persuasive writing skills. Students who regularly practice writing complete essays typically score 15-20% higher on the writing section of the NSW Selective exam.
              </p>
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-lg font-medium text-gray-900 mb-2">Persuasive Essay Practice Process</h3>
      
      <div className="grid grid-cols-1 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-bold text-blue-800 mb-2 flex items-center">
            <span className="bg-blue-200 text-blue-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">1</span>
            Analyze the Prompt
          </h4>
          <p className="text-blue-800">
            Carefully read and understand what the question is asking. Identify key terms and decide on your position.
          </p>
          <div className="mt-2 bg-white p-3 rounded border border-blue-200">
            <p className="text-blue-800 font-medium">Example prompt:</p>
            <p className="text-blue-800 italic">"Should all students be required to learn a musical instrument in school? Write a persuasive essay arguing your position."</p>
            <p className="text-blue-800 mt-2">Key considerations:</p>
            <ul className="list-disc pl-5 text-blue-800 space-y-1 mt-1">
              <li>Is this about all students or some students?</li>
              <li>What does "required" mean in this context?</li>
              <li>What position will you take? (Yes, No, or Qualified Yes/No)</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-green-50 rounded-lg p-4">
          <h4 className="font-bold text-green-800 mb-2 flex items-center">
            <span className="bg-green-200 text-green-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">2</span>
            Plan Your Essay
          </h4>
          <p className="text-green-800">
            Create a quick outline with your thesis statement, main arguments, supporting evidence, and conclusion.
          </p>
          <div className="mt-2 bg-white p-3 rounded border border-green-200">
            <p className="text-green-800 font-medium">Planning elements:</p>
            <ul className="list-disc pl-5 text-green-800 space-y-1 mt-1">
              <li>Thesis: "Learning a musical instrument should be optional, not mandatory, in schools."</li>
              <li>Argument 1: Different students have different talents and interests</li>
              <li>Argument 2: Limited school resources could be better allocated</li>
              <li>Argument 3: Optional music programs can still provide benefits</li>
              <li>Counterargument: Address benefits of music education</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-purple-50 rounded-lg p-4">
          <h4 className="font-bold text-purple-800 mb-2 flex items-center">
            <span className="bg-purple-200 text-purple-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">3</span>
            Write Your Draft
          </h4>
          <p className="text-purple-800">
            Write your complete essay following the persuasive essay structure we've learned.
          </p>
          <div className="mt-2 bg-white p-3 rounded border border-purple-200">
            <p className="text-purple-800 font-medium">Writing checklist:</p>
            <ul className="list-disc pl-5 text-purple-800 space-y-1 mt-1">
              <li>Introduction with hook, context, and thesis</li>
              <li>Body paragraphs using PEEL structure</li>
              <li>Varied persuasive techniques (emotive language, facts, rhetorical questions)</li>
              <li>Counterargument paragraph</li>
              <li>Strong conclusion with call to action</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-red-50 rounded-lg p-4">
          <h4 className="font-bold text-red-800 mb-2 flex items-center">
            <span className="bg-red-200 text-red-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">4</span>
            Review and Improve
          </h4>
          <p className="text-red-800">
            Evaluate your essay against the assessment criteria and make improvements.
          </p>
          <div className="mt-2 bg-white p-3 rounded border border-red-200">
            <p className="text-red-800 font-medium">Review questions:</p>
            <ul className="list-disc pl-5 text-red-800 space-y-1 mt-1">
              <li>Is my position clear and consistent throughout?</li>
              <li>Are my arguments logical and well-supported?</li>
              <li>Have I used varied sentence structures and vocabulary?</li>
              <li>Is my essay organized with clear paragraphs and transitions?</li>
              <li>Have I checked for spelling and grammar errors?</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="border-t pt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Today's Schedule</h3>
        <ol className="space-y-2 text-gray-700">
          <li className="flex items-start">
            <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 flex-shrink-0">1</span>
            <span>Review persuasive essay structure and techniques (10 minutes)</span>
          </li>
          <li className="flex items-start">
            <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 flex-shrink-0">2</span>
            <span>Analyze the practice prompt and plan your essay (15 minutes)</span>
          </li>
          <li className="flex items-start">
            <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 flex-shrink-0">3</span>
            <span>Write your complete persuasive essay (30 minutes)</span>
          </li>
          <li className="flex items-start">
            <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 flex-shrink-0">4</span>
            <span>Review, evaluate, and improve your essay (15 minutes)</span>
          </li>
        </ol>
      </div>
    </div>
  );
}
