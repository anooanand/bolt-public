import React from 'react';

export function OverviewTab() {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Learning Objective</h3>
      <p className="mb-6 text-gray-700">
        By the end of today, you'll understand the key elements of narrative structure and how to organize your creative writing effectively for the NSW Selective exam.
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
                A well-structured narrative is crucial for the "Structure & Organization" criterion (25% of your writing score). Even creative stories need logical organization to engage readers effectively.
              </p>
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-lg font-medium text-gray-900 mb-2">The Five Elements of Narrative Structure</h3>
      
      <div className="grid grid-cols-1 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-bold text-blue-800 mb-2 flex items-center">
            <span className="bg-blue-200 text-blue-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">1</span>
            Exposition
          </h4>
          <p className="text-blue-800">
            The beginning of the story where you introduce the characters, setting, and initial situation. This provides the necessary background information for readers.
            <br /><span className="italic mt-1 block">Example: Sarah nervously adjusted her uniform as she approached the unfamiliar school gates. Being the new student in Year 6 was daunting, especially mid-term.</span>
          </p>
        </div>
        
        <div className="bg-green-50 rounded-lg p-4">
          <h4 className="font-bold text-green-800 mb-2 flex items-center">
            <span className="bg-green-200 text-green-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">2</span>
            Rising Action
          </h4>
          <p className="text-green-800">
            A series of events that build tension, introduce complications or conflicts, and develop the story. This section creates interest and moves the plot forward.
            <br /><span className="italic mt-1 block">Example: As weeks passed, Sarah noticed items from her backpack mysteriously disappearing. First her special pen, then her math notebook, and finally her lunch money. Someone was targeting her.</span>
          </p>
        </div>
        
        <div className="bg-purple-50 rounded-lg p-4">
          <h4 className="font-bold text-purple-800 mb-2 flex items-center">
            <span className="bg-purple-200 text-purple-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">3</span>
            Climax
          </h4>
          <p className="text-purple-800">
            The turning point or moment of highest tension in the story. This is where the main conflict reaches its peak intensity.
            <br /><span className="italic mt-1 block">Example: During lunch break, Sarah hid behind the library shelves and caught Jamie, the class captain, rummaging through her backpack. Their eyes met in a moment of shocked silence.</span>
          </p>
        </div>
        
        <div className="bg-red-50 rounded-lg p-4">
          <h4 className="font-bold text-red-800 mb-2 flex items-center">
            <span className="bg-red-200 text-red-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">4</span>
            Falling Action
          </h4>
          <p className="text-red-800">
            Events that occur after the climax, showing the consequences of the climactic moment and beginning to resolve the conflict.
            <br /><span className="italic mt-1 block">Example: Tears welled in Jamie's eyes as she explained how her parents couldn't afford school supplies after her dad lost his job. She'd been too ashamed to ask for help.</span>
          </p>
        </div>
        
        <div className="bg-yellow-50 rounded-lg p-4">
          <h4 className="font-bold text-yellow-800 mb-2 flex items-center">
            <span className="bg-yellow-200 text-yellow-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">5</span>
            Resolution
          </h4>
          <p className="text-yellow-800">
            The conclusion of the story where conflicts are resolved and a new normal is established. This provides closure for the reader.
            <br /><span className="italic mt-1 block">Example: By term's end, Sarah and Jamie had become inseparable friends. Together they started a school supplies exchange program, helping students in need while protecting their dignity.</span>
          </p>
        </div>
      </div>
      
      <div className="border-t pt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Today's Schedule</h3>
        <ol className="space-y-2 text-gray-700">
          <li className="flex items-start">
            <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 flex-shrink-0">1</span>
            <span>Learn about the five elements of narrative structure (15 minutes)</span>
          </li>
          <li className="flex items-start">
            <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 flex-shrink-0">2</span>
            <span>Identify narrative elements in example stories (15 minutes)</span>
          </li>
          <li className="flex items-start">
            <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 flex-shrink-0">3</span>
            <span>Plan a short story using the five-element structure (15 minutes)</span>
          </li>
          <li className="flex items-start">
            <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 flex-shrink-0">4</span>
            <span>Write the beginning of your planned story (25 minutes)</span>
          </li>
        </ol>
      </div>
    </div>
  );
}
