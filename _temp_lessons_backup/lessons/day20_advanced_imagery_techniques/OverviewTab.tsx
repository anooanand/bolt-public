import React from 'react';

export function OverviewTab() {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Learning Objective</h3>
      <p className="mb-6 text-gray-700">
        By the end of today, you'll understand how to use advanced imagery techniques to create powerful, memorable writing for the NSW Selective exam.
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
                Students who effectively use advanced imagery techniques typically score in the top 10% for the "Language & Vocabulary" criterion (25% of your writing score). These techniques create lasting impressions on examiners.
              </p>
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-lg font-medium text-gray-900 mb-2">Advanced Imagery Techniques</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-bold text-blue-800 mb-2 flex items-center">
            <span className="bg-blue-200 text-blue-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">1</span>
            Juxtaposition
          </h4>
          <p className="text-blue-800">
            Placing contrasting elements side by side to highlight differences and create impact.
            <br /><span className="italic mt-1 block">Example: "The delicate butterfly rested on the rusted barrel of the abandoned tank, its vibrant wings fluttering against the cold metal."</span>
          </p>
        </div>
        
        <div className="bg-green-50 rounded-lg p-4">
          <h4 className="font-bold text-green-800 mb-2 flex items-center">
            <span className="bg-green-200 text-green-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">2</span>
            Synesthesia
          </h4>
          <p className="text-green-800">
            Mixing sensory experiences by describing one sense in terms of another.
            <br /><span className="italic mt-1 block">Example: "The trumpet's bright notes tasted like honey on my tongue." (mixing sound and taste)<br />"Her perfume sang a sweet melody as she passed." (mixing smell and sound)</span>
          </p>
        </div>
        
        <div className="bg-purple-50 rounded-lg p-4">
          <h4 className="font-bold text-purple-800 mb-2 flex items-center">
            <span className="bg-purple-200 text-purple-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">3</span>
            Extended Metaphor
          </h4>
          <p className="text-purple-800">
            Developing a single metaphor throughout a paragraph or entire piece to create a unified image.
            <br /><span className="italic mt-1 block">Example: "Her mind was a garden where ideas bloomed like wildflowers. Some thoughts were carefully cultivated roses, while others were stubborn weeds that refused to be uprooted. Daily, she tended this mental landscape, pruning doubts and watering dreams with determination."</span>
          </p>
        </div>
        
        <div className="bg-red-50 rounded-lg p-4">
          <h4 className="font-bold text-red-800 mb-2 flex items-center">
            <span className="bg-red-200 text-red-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">4</span>
            Symbolism
          </h4>
          <p className="text-red-800">
            Using objects, colors, or actions to represent abstract ideas or qualities.
            <br /><span className="italic mt-1 block">Example: "The white dove perched on the broken fence between the two properties. For a moment, both neighbors paused their argument to watch it preen its feathers in the sunlight."<br />(dove symbolizing peace amid conflict)</span>
          </p>
        </div>
        
        <div className="bg-yellow-50 rounded-lg p-4 md:col-span-2">
          <h4 className="font-bold text-yellow-800 mb-2 flex items-center">
            <span className="bg-yellow-200 text-yellow-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">5</span>
            Motif
          </h4>
          <p className="text-yellow-800">
            A recurring element, pattern, or image that develops a theme throughout your writing.
            <br /><span className="italic mt-1 block">Example: In a story about overcoming challenges, repeatedly using images of light breaking through darkness: "Morning sunlight pierced through the bedroom curtains," "A flashlight beam cut through the cave's blackness," "Understanding dawned in her eyes, dispelling confusion."</span>
          </p>
        </div>
      </div>
      
      <div className="border-t pt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Today's Schedule</h3>
        <ol className="space-y-2 text-gray-700">
          <li className="flex items-start">
            <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 flex-shrink-0">1</span>
            <span>Learn about advanced imagery techniques (15 minutes)</span>
          </li>
          <li className="flex items-start">
            <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 flex-shrink-0">2</span>
            <span>Identify advanced imagery in example passages (15 minutes)</span>
          </li>
          <li className="flex items-start">
            <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 flex-shrink-0">3</span>
            <span>Practice creating different types of imagery (15 minutes)</span>
          </li>
          <li className="flex items-start">
            <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 flex-shrink-0">4</span>
            <span>Write a descriptive paragraph using at least two advanced imagery techniques (25 minutes)</span>
          </li>
        </ol>
      </div>
    </div>
  );
}
