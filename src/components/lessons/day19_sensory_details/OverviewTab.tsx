import React from 'react';

export function OverviewTab() {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Learning Objective</h3>
      <p className="mb-6 text-gray-700">
        By the end of today, you'll understand how to use sensory details effectively to create immersive, vivid writing for the NSW Selective exam.
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
                Writing that incorporates all five senses typically scores 15-20% higher in the "Language & Vocabulary" criterion (25% of your total writing score). Examiners consistently reward students who create a complete sensory experience.
              </p>
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-lg font-medium text-gray-900 mb-2">The Five Senses in Detail</h3>
      
      <div className="grid grid-cols-1 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-bold text-blue-800 mb-2 flex items-center">
            <span className="bg-blue-200 text-blue-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">👁️</span>
            Visual Details (Sight)
          </h4>
          <p className="text-blue-800">
            The most commonly used sense in writing. Go beyond basic colors and shapes to include:
          </p>
          <ul className="list-disc pl-5 text-blue-800 space-y-1 mt-2">
            <li>Light and shadow (dappled sunlight, harsh fluorescent glare)</li>
            <li>Movement and stillness (fluttering leaves, motionless silhouette)</li>
            <li>Texture as seen (rough bark, smooth glass)</li>
            <li>Specific colors (crimson, azure, amber vs. red, blue, yellow)</li>
            <li>Spatial relationships (looming overhead, nestled between)</li>
          </ul>
          <p className="text-blue-800 italic mt-2">Example: "The ancient oak's gnarled branches cast intricate shadows across the moss-covered stones, while amber sunlight filtered through the canopy in shifting patterns."</p>
        </div>
        
        <div className="bg-green-50 rounded-lg p-4">
          <h4 className="font-bold text-green-800 mb-2 flex items-center">
            <span className="bg-green-200 text-green-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">👂</span>
            Auditory Details (Sound)
          </h4>
          <p className="text-green-800">
            Often overlooked but powerful for creating atmosphere. Include:
          </p>
          <ul className="list-disc pl-5 text-green-800 space-y-1 mt-2">
            <li>Volume (whisper, roar, barely audible)</li>
            <li>Pitch (high-pitched squeal, deep rumble)</li>
            <li>Rhythm and pattern (steady dripping, erratic tapping)</li>
            <li>Distance (distant thunder, nearby whispers)</li>
            <li>Specific sound types (rustling, clanging, hissing)</li>
          </ul>
          <p className="text-green-800 italic mt-2">Example: "The grandfather clock's steady tick-tock punctuated the silence, occasionally drowned out by the muffled rumble of thunder that grew increasingly closer."</p>
        </div>
        
        <div className="bg-purple-50 rounded-lg p-4">
          <h4 className="font-bold text-purple-800 mb-2 flex items-center">
            <span className="bg-purple-200 text-purple-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">👃</span>
            Olfactory Details (Smell)
          </h4>
          <p className="text-purple-800">
            The sense most strongly linked to memory and emotion. Include:
          </p>
          <ul className="list-disc pl-5 text-purple-800 space-y-1 mt-2">
            <li>Intensity (faint trace, overwhelming stench)</li>
            <li>Emotional associations (comforting aroma, nauseating odor)</li>
            <li>Specific sources (pine needles, freshly baked bread)</li>
            <li>Combinations (sweet and smoky, sharp yet floral)</li>
            <li>Changes over time (lingering scent, quickly dissipating)</li>
          </ul>
          <p className="text-purple-800 italic mt-2">Example: "The musty scent of old books mingled with the sharp tang of lemon polish and the faint, sweet trace of the librarian's lavender perfume."</p>
        </div>
        
        <div className="bg-red-50 rounded-lg p-4">
          <h4 className="font-bold text-red-800 mb-2 flex items-center">
            <span className="bg-red-200 text-red-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">👅</span>
            Gustatory Details (Taste)
          </h4>
          <p className="text-red-800">
            Not just for food scenes! Can include:
          </p>
          <ul className="list-disc pl-5 text-red-800 space-y-1 mt-2">
            <li>Basic tastes (sweet, sour, bitter, salty, umami)</li>
            <li>Texture in mouth (creamy, crunchy, gritty)</li>
            <li>Temperature (scalding hot, refreshingly cool)</li>
            <li>Lingering effects (aftertaste, numbing sensation)</li>
            <li>Non-food tastes (metallic taste of fear, salt of tears)</li>
          </ul>
          <p className="text-red-800 italic mt-2">Example: "The first bite of the apple delivered an explosion of tartness that made her jaw tingle, followed by a subtle honeyed sweetness that lingered on her tongue."</p>
        </div>
        
        <div className="bg-yellow-50 rounded-lg p-4">
          <h4 className="font-bold text-yellow-800 mb-2 flex items-center">
            <span className="bg-yellow-200 text-yellow-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">✋</span>
            Tactile Details (Touch)
          </h4>
          <p className="text-yellow-800">
            Creates immediate physical connection for readers. Include:
          </p>
          <ul className="list-disc pl-5 text-yellow-800 space-y-1 mt-2">
            <li>Texture (rough, smooth, jagged, silky)</li>
            <li>Temperature (icy cold, lukewarm, scorching)</li>
            <li>Pressure (gentle brush, firm grip, crushing weight)</li>
            <li>Internal sensations (butterflies in stomach, racing heart)</li>
            <li>Environmental feelings (humid air, biting wind)</li>
          </ul>
          <p className="text-yellow-800 italic mt-2">Example: "Her fingers traced the weathered stone wall, feeling centuries of history in its cool, rough surface as the damp air clung to her skin and sent a shiver down her spine."</p>
        </div>
      </div>
      
      <div className="border-t pt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Today's Schedule</h3>
        <ol className="space-y-2 text-gray-700">
          <li className="flex items-start">
            <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 flex-shrink-0">1</span>
            <span>Learn about using sensory details effectively (15 minutes)</span>
          </li>
          <li className="flex items-start">
            <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 flex-shrink-0">2</span>
            <span>Identify sensory details in example passages (15 minutes)</span>
          </li>
          <li className="flex items-start">
            <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 flex-shrink-0">3</span>
            <span>Practice adding sensory details to basic descriptions (15 minutes)</span>
          </li>
          <li className="flex items-start">
            <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 flex-shrink-0">4</span>
            <span>Write a descriptive paragraph using all five senses (25 minutes)</span>
          </li>
        </ol>
      </div>
    </div>
  );
}
