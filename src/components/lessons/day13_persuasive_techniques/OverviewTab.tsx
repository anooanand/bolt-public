import React from 'react';

export function OverviewTab() {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Learning Objective</h3>
      <p className="mb-6 text-gray-700">
        By the end of today, you'll understand various persuasive techniques and how to use them effectively in your writing for the NSW Selective exam.
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
                Mastering persuasive techniques can significantly improve your scores in both the "Ideas & Content" (30%) and "Language & Vocabulary" (25%) criteria. Examiners are particularly impressed by students who can skillfully employ a variety of persuasive devices.
              </p>
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-lg font-medium text-gray-900 mb-2">Key Persuasive Techniques</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-bold text-blue-800 mb-2 flex items-center">
            <span className="bg-blue-200 text-blue-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">1</span>
            Emotive Language
          </h4>
          <p className="text-blue-800">
            Words that evoke strong emotions to influence how readers feel about an issue.
            <br /><span className="italic mt-1 block">Example: "The devastating impact of plastic pollution is destroying our precious oceans and killing innocent marine life."</span>
          </p>
        </div>
        
        <div className="bg-green-50 rounded-lg p-4">
          <h4 className="font-bold text-green-800 mb-2 flex items-center">
            <span className="bg-green-200 text-green-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">2</span>
            Facts & Statistics
          </h4>
          <p className="text-green-800">
            Numerical data and factual information that provide evidence and credibility to your argument.
            <br /><span className="italic mt-1 block">Example: "According to a 2024 environmental study, over 8 million tons of plastic enter our oceans every year, equivalent to dumping a garbage truck of plastic into the ocean every minute."</span>
          </p>
        </div>
        
        <div className="bg-purple-50 rounded-lg p-4">
          <h4 className="font-bold text-purple-800 mb-2 flex items-center">
            <span className="bg-purple-200 text-purple-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">3</span>
            Rhetorical Questions
          </h4>
          <p className="text-purple-800">
            Questions asked for effect, to make readers think about an issue rather than to get an answer.
            <br /><span className="italic mt-1 block">Example: "How would you feel if your home was filled with garbage that wasn't yours? Why should marine animals suffer this fate?"</span>
          </p>
        </div>
        
        <div className="bg-red-50 rounded-lg p-4">
          <h4 className="font-bold text-red-800 mb-2 flex items-center">
            <span className="bg-red-200 text-red-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">4</span>
            Expert Opinion
          </h4>
          <p className="text-red-800">
            Citing authorities or specialists to add weight and credibility to your argument.
            <br /><span className="italic mt-1 block">Example: "Marine biologist Dr. Sarah Chen warns that if current trends continue, there will be more plastic than fish in the ocean by 2050."</span>
          </p>
        </div>
        
        <div className="bg-yellow-50 rounded-lg p-4">
          <h4 className="font-bold text-yellow-800 mb-2 flex items-center">
            <span className="bg-yellow-200 text-yellow-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">5</span>
            Personal Anecdotes
          </h4>
          <p className="text-yellow-800">
            Short, relevant stories that create emotional connection and make abstract issues more relatable.
            <br /><span className="italic mt-1 block">Example: "Last summer, while volunteering at a beach cleanup, I found a sea turtle struggling with a plastic ring caught around its shell. The look in its eyes is something I'll never forget."</span>
          </p>
        </div>
        
        <div className="bg-indigo-50 rounded-lg p-4">
          <h4 className="font-bold text-indigo-800 mb-2 flex items-center">
            <span className="bg-indigo-200 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">6</span>
            Repetition
          </h4>
          <p className="text-indigo-800">
            Repeating key words or phrases to emphasize important points and make them memorable.
            <br /><span className="italic mt-1 block">Example: "We must act now. Now, before more damage is done. Now, before it's too late. Now, while we still can make a difference."</span>
          </p>
        </div>
      </div>
      
      <div className="border-t pt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Today's Schedule</h3>
        <ol className="space-y-2 text-gray-700">
          <li className="flex items-start">
            <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 flex-shrink-0">1</span>
            <span>Learn about key persuasive techniques (15 minutes)</span>
          </li>
          <li className="flex items-start">
            <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 flex-shrink-0">2</span>
            <span>Identify persuasive techniques in example texts (15 minutes)</span>
          </li>
          <li className="flex items-start">
            <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 flex-shrink-0">3</span>
            <span>Practice using different persuasive techniques for a given topic (15 minutes)</span>
          </li>
          <li className="flex items-start">
            <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 flex-shrink-0">4</span>
            <span>Write a persuasive paragraph incorporating at least three techniques (25 minutes)</span>
          </li>
        </ol>
      </div>
    </div>
  );
}
