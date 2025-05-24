import React from 'react';

export function OverviewTab() {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Learning Objective</h3>
      <p className="mb-6 text-gray-700">
        By the end of today, you'll understand how to use descriptive language effectively to create vivid imagery and engage readers in your NSW Selective exam writing.
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
                Descriptive language is a key component of the "Language & Vocabulary" criterion (25% of your writing score). Students who use vivid, precise descriptions typically score higher than those who use generic language.
              </p>
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-lg font-medium text-gray-900 mb-2">The Five Senses in Descriptive Writing</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-bold text-blue-800 mb-2 flex items-center">
            <span className="bg-blue-200 text-blue-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">👁️</span>
            Visual (Sight)
          </h4>
          <p className="text-blue-800">
            Describe what can be seen: colors, shapes, sizes, patterns, movements.
            <br /><span className="italic mt-1 block">Example: The crimson sunset painted the sky with streaks of gold and purple.</span>
          </p>
        </div>
        
        <div className="bg-green-50 rounded-lg p-4">
          <h4 className="font-bold text-green-800 mb-2 flex items-center">
            <span className="bg-green-200 text-green-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">👂</span>
            Auditory (Sound)
          </h4>
          <p className="text-green-800">
            Describe what can be heard: volume, pitch, rhythm, specific sounds.
            <br /><span className="italic mt-1 block">Example: The leaves rustled softly as a gentle breeze whispered through the trees.</span>
          </p>
        </div>
        
        <div className="bg-purple-50 rounded-lg p-4">
          <h4 className="font-bold text-purple-800 mb-2 flex items-center">
            <span className="bg-purple-200 text-purple-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">👃</span>
            Olfactory (Smell)
          </h4>
          <p className="text-purple-800">
            Describe scents and odors: pleasant or unpleasant, strong or subtle.
            <br /><span className="italic mt-1 block">Example: The rich aroma of freshly baked bread wafted through the kitchen.</span>
          </p>
        </div>
        
        <div className="bg-red-50 rounded-lg p-4">
          <h4 className="font-bold text-red-800 mb-2 flex items-center">
            <span className="bg-red-200 text-red-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">👅</span>
            Gustatory (Taste)
          </h4>
          <p className="text-red-800">
            Describe flavors: sweet, sour, bitter, salty, savory, specific tastes.
            <br /><span className="italic mt-1 block">Example: The tangy lemonade sent a refreshing zing across my tongue.</span>
          </p>
        </div>
        
        <div className="bg-yellow-50 rounded-lg p-4 md:col-span-2">
          <h4 className="font-bold text-yellow-800 mb-2 flex items-center">
            <span className="bg-yellow-200 text-yellow-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">✋</span>
            Tactile (Touch)
          </h4>
          <p className="text-yellow-800">
            Describe textures, temperatures, and physical sensations.
            <br /><span className="italic mt-1 block">Example: The rough, weathered bark scratched against my fingertips as I traced the ancient tree's surface.</span>
          </p>
        </div>
      </div>
      
      <div className="border-t pt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Today's Schedule</h3>
        <ol className="space-y-2 text-gray-700">
          <li className="flex items-start">
            <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 flex-shrink-0">1</span>
            <span>Learn about the five senses in descriptive writing (15 minutes)</span>
          </li>
          <li className="flex items-start">
            <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 flex-shrink-0">2</span>
            <span>Identify sensory details in example passages (15 minutes)</span>
          </li>
          <li className="flex items-start">
            <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 flex-shrink-0">3</span>
            <span>Practice writing sensory descriptions for given scenarios (15 minutes)</span>
          </li>
          <li className="flex items-start">
            <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 flex-shrink-0">4</span>
            <span>Create a descriptive paragraph using all five senses (25 minutes)</span>
          </li>
        </ol>
      </div>
    </div>
  );
}
