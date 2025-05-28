import React from 'react';

export function OverviewTab() {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Learning Objective</h3>
      <p className="mb-6 text-gray-700">
        By the end of today, you'll understand the fundamentals of descriptive writing and how to use vivid language to create engaging imagery in your NSW Selective exam responses.
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
                Strong descriptive writing skills can significantly improve your scores in both the "Ideas & Content" (30%) and "Language & Vocabulary" (25%) criteria of the NSW Selective exam.
              </p>
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-lg font-medium text-gray-900 mb-2">Descriptive Writing Fundamentals</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-bold text-blue-800 mb-2 flex items-center">
            <span className="bg-blue-200 text-blue-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">1</span>
            Sensory Details
          </h4>
          <p className="text-blue-800">
            Engage all five senses (sight, sound, smell, taste, touch) to create a vivid, immersive experience for the reader.
            <br /><span className="italic mt-1 block">Example: The crisp autumn leaves crunched beneath my feet as the scent of cinnamon and apples wafted from nearby cafés.</span>
          </p>
        </div>
        
        <div className="bg-green-50 rounded-lg p-4">
          <h4 className="font-bold text-green-800 mb-2 flex items-center">
            <span className="bg-green-200 text-green-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">2</span>
            Specific Language
          </h4>
          <p className="text-green-800">
            Use precise nouns, powerful verbs, and specific adjectives instead of vague, general terms.
            <br /><span className="italic mt-1 block">Instead of: "The dog was big and scary."<br />Better: "The Rottweiler towered over me, its muscles rippling beneath glossy black fur as it bared its gleaming fangs."</span>
          </p>
        </div>
        
        <div className="bg-purple-50 rounded-lg p-4">
          <h4 className="font-bold text-purple-800 mb-2 flex items-center">
            <span className="bg-purple-200 text-purple-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">3</span>
            Figurative Language
          </h4>
          <p className="text-purple-800">
            Use similes, metaphors, personification, and other literary devices to create vivid comparisons and images.
            <br /><span className="italic mt-1 block">Example: The ancient oak tree stood like a wise guardian at the entrance to the park, its gnarled branches reaching out like protective arms.</span>
          </p>
        </div>
        
        <div className="bg-red-50 rounded-lg p-4">
          <h4 className="font-bold text-red-800 mb-2 flex items-center">
            <span className="bg-red-200 text-red-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">4</span>
            Show, Don't Tell
          </h4>
          <p className="text-red-800">
            Demonstrate emotions, qualities, and situations through details rather than simply stating them.
            <br /><span className="italic mt-1 block">Instead of: "She was nervous."<br />Better: "Her hands trembled as she fumbled with her keys, and beads of sweat formed along her hairline despite the cool breeze."</span>
          </p>
        </div>
        
        <div className="bg-yellow-50 rounded-lg p-4 md:col-span-2">
          <h4 className="font-bold text-yellow-800 mb-2 flex items-center">
            <span className="bg-yellow-200 text-yellow-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">5</span>
            Purposeful Organization
          </h4>
          <p className="text-yellow-800">
            Arrange descriptive details in a logical order (spatial, chronological, or order of importance) to guide the reader through the scene.
            <br /><span className="italic mt-1 block">Example: My gaze traveled from the weathered doorway, across the faded Persian rug, to the crackling fireplace that cast dancing shadows on the far wall.</span>
          </p>
        </div>
      </div>
      
      <div className="border-t pt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Today's Schedule</h3>
        <ol className="space-y-2 text-gray-700">
          <li className="flex items-start">
            <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 flex-shrink-0">1</span>
            <span>Learn about descriptive writing fundamentals (15 minutes)</span>
          </li>
          <li className="flex items-start">
            <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 flex-shrink-0">2</span>
            <span>Analyze descriptive passages in example texts (15 minutes)</span>
          </li>
          <li className="flex items-start">
            <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 flex-shrink-0">3</span>
            <span>Practice transforming basic descriptions into vivid ones (15 minutes)</span>
          </li>
          <li className="flex items-start">
            <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 flex-shrink-0">4</span>
            <span>Write a descriptive paragraph about a place using all five senses (25 minutes)</span>
          </li>
        </ol>
      </div>
    </div>
  );
}
