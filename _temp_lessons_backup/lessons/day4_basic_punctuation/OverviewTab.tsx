import React from 'react';

export function OverviewTab() {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Learning Objective</h3>
      <p className="mb-6 text-gray-700">
        By the end of today, you'll understand how to use basic punctuation correctly to enhance the clarity and effectiveness of your writing in the NSW Selective exam.
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
                Proper punctuation accounts for a significant portion of the "Spelling & Grammar" criterion (20% of your writing score). Even brilliant ideas can lose marks if punctuation errors make your writing difficult to understand.
              </p>
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-lg font-medium text-gray-900 mb-2">Essential Punctuation Marks</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-bold text-blue-800 mb-2 flex items-center">
            <span className="bg-blue-200 text-blue-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">.</span>
            Full Stop/Period
          </h4>
          <p className="text-blue-800">
            Marks the end of a sentence that makes a statement or gives a command.
            <br /><span className="italic mt-1 block">Example: The exam starts at 9 a.m. Be prepared.</span>
          </p>
        </div>
        
        <div className="bg-green-50 rounded-lg p-4">
          <h4 className="font-bold text-green-800 mb-2 flex items-center">
            <span className="bg-green-200 text-green-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">,</span>
            Comma
          </h4>
          <p className="text-green-800">
            Separates items in a list, marks off introductory elements, and joins independent clauses with a conjunction.
            <br /><span className="italic mt-1 block">Example: After studying hard, I felt confident, prepared, and ready.</span>
          </p>
        </div>
        
        <div className="bg-purple-50 rounded-lg p-4">
          <h4 className="font-bold text-purple-800 mb-2 flex items-center">
            <span className="bg-purple-200 text-purple-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">?</span>
            Question Mark
          </h4>
          <p className="text-purple-800">
            Indicates a direct question or query.
            <br /><span className="italic mt-1 block">Example: Have you completed your practice essay?</span>
          </p>
        </div>
        
        <div className="bg-red-50 rounded-lg p-4">
          <h4 className="font-bold text-red-800 mb-2 flex items-center">
            <span className="bg-red-200 text-red-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">!</span>
            Exclamation Mark
          </h4>
          <p className="text-red-800">
            Shows strong emotion, emphasis, or surprise. Use sparingly in formal writing.
            <br /><span className="italic mt-1 block">Example: We won the competition!</span>
          </p>
        </div>
        
        <div className="bg-yellow-50 rounded-lg p-4">
          <h4 className="font-bold text-yellow-800 mb-2 flex items-center">
            <span className="bg-yellow-200 text-yellow-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">' "</span>
            Quotation Marks
          </h4>
          <p className="text-yellow-800">
            Indicate direct speech, quotations, or titles of short works.
            <br /><span className="italic mt-1 block">Example: "I'll do my best," she promised.</span>
          </p>
        </div>
        
        <div className="bg-indigo-50 rounded-lg p-4">
          <h4 className="font-bold text-indigo-800 mb-2 flex items-center">
            <span className="bg-indigo-200 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">:</span>
            Colon
          </h4>
          <p className="text-indigo-800">
            Introduces lists, explanations, or elaborations.
            <br /><span className="italic mt-1 block">Example: I need three things for the exam: a pen, a pencil, and an eraser.</span>
          </p>
        </div>
      </div>
      
      <div className="border-t pt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Today's Schedule</h3>
        <ol className="space-y-2 text-gray-700">
          <li className="flex items-start">
            <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 flex-shrink-0">1</span>
            <span>Learn about essential punctuation marks and their uses (15 minutes)</span>
          </li>
          <li className="flex items-start">
            <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 flex-shrink-0">2</span>
            <span>Identify and correct punctuation errors in example sentences (15 minutes)</span>
          </li>
          <li className="flex items-start">
            <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 flex-shrink-0">3</span>
            <span>Practice using different punctuation marks to change meaning (15 minutes)</span>
          </li>
          <li className="flex items-start">
            <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 flex-shrink-0">4</span>
            <span>Write a short paragraph with correct punctuation (25 minutes)</span>
          </li>
        </ol>
      </div>
    </div>
  );
}
