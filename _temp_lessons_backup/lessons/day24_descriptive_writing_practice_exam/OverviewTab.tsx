import React from 'react';

export function OverviewTab() {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Learning Objective</h3>
      <p className="mb-6 text-gray-700">
        By the end of today, you'll apply all the descriptive writing techniques you've learned to practice writing a complete descriptive piece for the NSW Selective exam.
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
                Regular practice with timed descriptive writing exercises is one of the most effective ways to prepare for the NSW Selective exam. Students who practice under exam conditions typically score 15-20% higher in the writing section.
              </p>
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-lg font-medium text-gray-900 mb-2">Descriptive Writing Practice Process</h3>
      
      <div className="grid grid-cols-1 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-bold text-blue-800 mb-2 flex items-center">
            <span className="bg-blue-200 text-blue-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">1</span>
            Analyze the Prompt
          </h4>
          <p className="text-blue-800">
            Carefully read and understand what the prompt is asking you to describe.
          </p>
          <div className="mt-2 bg-white p-3 rounded border border-blue-200">
            <p className="text-blue-800 font-medium">Example prompt:</p>
            <p className="text-blue-800 italic">"Write a descriptive piece about a place that holds special memories for you."</p>
            <p className="text-blue-800 mt-2">Key considerations:</p>
            <ul className="list-disc pl-5 text-blue-800 space-y-1 mt-1">
              <li>What specific place will you choose?</li>
              <li>What sensory details can you include?</li>
              <li>What mood do you want to create?</li>
              <li>How will you organize your description (spatially, chronologically, etc.)?</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-green-50 rounded-lg p-4">
          <h4 className="font-bold text-green-800 mb-2 flex items-center">
            <span className="bg-green-200 text-green-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">2</span>
            Plan Your Description
          </h4>
          <p className="text-green-800">
            Create a quick outline with the main elements you want to include.
          </p>
          <div className="mt-2 bg-white p-3 rounded border border-green-200">
            <p className="text-green-800 font-medium">Planning elements:</p>
            <ul className="list-disc pl-5 text-green-800 space-y-1 mt-1">
              <li>Introduction: First impression of my grandmother's garden</li>
              <li>Visual details: Colorful flowers, old stone path, wooden bench</li>
              <li>Sounds: Birds singing, leaves rustling, distant wind chimes</li>
              <li>Smells: Roses, freshly cut grass, grandmother's cookies</li>
              <li>Tactile sensations: Rough bark, soft petals, cool grass</li>
              <li>Mood: Peaceful, nostalgic, comforting</li>
              <li>Conclusion: How this place shaped my memories</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-purple-50 rounded-lg p-4">
          <h4 className="font-bold text-purple-800 mb-2 flex items-center">
            <span className="bg-purple-200 text-purple-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">3</span>
            Write Your Description
          </h4>
          <p className="text-purple-800">
            Write your complete descriptive piece, incorporating the techniques we've learned.
          </p>
          <div className="mt-2 bg-white p-3 rounded border border-purple-200">
            <p className="text-purple-800 font-medium">Writing checklist:</p>
            <ul className="list-disc pl-5 text-purple-800 space-y-1 mt-1">
              <li>Engage all five senses</li>
              <li>Use specific, vivid language</li>
              <li>Include figurative language (similes, metaphors, personification)</li>
              <li>Create a consistent mood</li>
              <li>Vary sentence structure</li>
              <li>Show, don't tell</li>
              <li>Use strong verbs and precise nouns</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-red-50 rounded-lg p-4">
          <h4 className="font-bold text-red-800 mb-2 flex items-center">
            <span className="bg-red-200 text-red-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">4</span>
            Review and Improve
          </h4>
          <p className="text-red-800">
            Evaluate your description against the assessment criteria and make improvements.
          </p>
          <div className="mt-2 bg-white p-3 rounded border border-red-200">
            <p className="text-red-800 font-medium">Review questions:</p>
            <ul className="list-disc pl-5 text-red-800 space-y-1 mt-1">
              <li>Have I created a vivid, detailed picture?</li>
              <li>Have I engaged all five senses?</li>
              <li>Is my language specific and precise?</li>
              <li>Have I used figurative language effectively?</li>
              <li>Is there a consistent mood throughout?</li>
              <li>Have I varied my sentence structure?</li>
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
            <span>Review descriptive writing techniques (10 minutes)</span>
          </li>
          <li className="flex items-start">
            <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 flex-shrink-0">2</span>
            <span>Analyze the practice prompt and plan your description (15 minutes)</span>
          </li>
          <li className="flex items-start">
            <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 flex-shrink-0">3</span>
            <span>Write your complete descriptive piece (30 minutes)</span>
          </li>
          <li className="flex items-start">
            <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 flex-shrink-0">4</span>
            <span>Review, evaluate, and improve your description (15 minutes)</span>
          </li>
        </ol>
      </div>
    </div>
  );
}
