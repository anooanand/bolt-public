import React from 'react';

export function OverviewTab() {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Learning Objective</h3>
      <p className="mb-6 text-gray-700">
        By the end of today, you'll understand how to create and control mood and tone in your writing for the NSW Selective exam.
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
                Mastering mood and tone can significantly improve your scores in both the "Ideas & Content" (30%) and "Language & Vocabulary" (25%) criteria. Examiners consistently reward students who can create a distinct atmosphere that enhances their narrative.
              </p>
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-lg font-medium text-gray-900 mb-2">Understanding Mood & Tone</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-bold text-blue-800 mb-2 flex items-center">
            <span className="bg-blue-200 text-blue-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">1</span>
            Mood
          </h4>
          <p className="text-blue-800">
            The atmosphere or feeling that a piece of writing creates for the reader.
          </p>
          <div className="mt-2 bg-white p-3 rounded border border-blue-200">
            <p className="text-blue-800 font-medium">Common moods include:</p>
            <ul className="list-disc pl-5 text-blue-800 space-y-1 mt-1">
              <li>Mysterious</li>
              <li>Tense</li>
              <li>Joyful</li>
              <li>Melancholic</li>
              <li>Peaceful</li>
              <li>Ominous</li>
              <li>Nostalgic</li>
              <li>Suspenseful</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-green-50 rounded-lg p-4">
          <h4 className="font-bold text-green-800 mb-2 flex items-center">
            <span className="bg-green-200 text-green-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">2</span>
            Tone
          </h4>
          <p className="text-green-800">
            The writer's attitude toward the subject, characters, or readers.
          </p>
          <div className="mt-2 bg-white p-3 rounded border border-green-200">
            <p className="text-green-800 font-medium">Common tones include:</p>
            <ul className="list-disc pl-5 text-green-800 space-y-1 mt-1">
              <li>Formal</li>
              <li>Informal</li>
              <li>Serious</li>
              <li>Humorous</li>
              <li>Optimistic</li>
              <li>Pessimistic</li>
              <li>Sarcastic</li>
              <li>Sympathetic</li>
            </ul>
          </div>
        </div>
      </div>
      
      <h3 className="text-lg font-medium text-gray-900 mb-2">Techniques for Creating Mood & Tone</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-purple-50 rounded-lg p-4">
          <h4 className="font-bold text-purple-800 mb-2 flex items-center">
            <span className="bg-purple-200 text-purple-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">1</span>
            Word Choice (Diction)
          </h4>
          <p className="text-purple-800">
            Select words with appropriate connotations to create your desired mood.
          </p>
          <div className="mt-2 grid grid-cols-1 gap-2">
            <div className="bg-white p-2 rounded border border-purple-200">
              <p className="text-purple-800 font-medium">Ominous Mood:</p>
              <p className="text-purple-800 italic">The ancient house <span className="underline">loomed</span> at the end of the street. Shadows <span className="underline">lurked</span> in every corner, and the windows <span className="underline">glared</span> like watchful eyes.</p>
            </div>
            <div className="bg-white p-2 rounded border border-purple-200">
              <p className="text-purple-800 font-medium">Joyful Mood:</p>
              <p className="text-purple-800 italic">The charming cottage <span className="underline">nestled</span> at the end of the lane. Sunlight <span className="underline">danced</span> through every window, and flowers <span className="underline">smiled</span> from the garden beds.</p>
            </div>
          </div>
        </div>
        
        <div className="bg-red-50 rounded-lg p-4">
          <h4 className="font-bold text-red-800 mb-2 flex items-center">
            <span className="bg-red-200 text-red-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">2</span>
            Sentence Structure
          </h4>
          <p className="text-red-800">
            Vary sentence length and structure to create different effects.
          </p>
          <div className="mt-2 grid grid-cols-1 gap-2">
            <div className="bg-white p-2 rounded border border-red-200">
              <p className="text-red-800 font-medium">Tense/Urgent Mood:</p>
              <p className="text-red-800 italic">He ran. Heart pounding. Breath ragged. The footsteps behind him grew louder. Closer. No time to rest. No place to hide.</p>
            </div>
            <div className="bg-white p-2 rounded border border-red-200">
              <p className="text-red-800 font-medium">Peaceful/Contemplative Mood:</p>
              <p className="text-red-800 italic">The lake stretched before him, its surface a perfect mirror of the sky above, while the distant mountains stood sentinel over the tranquil scene that had remained unchanged for centuries, offering a sense of permanence in an ever-changing world.</p>
            </div>
          </div>
        </div>
        
        <div className="bg-yellow-50 rounded-lg p-4">
          <h4 className="font-bold text-yellow-800 mb-2 flex items-center">
            <span className="bg-yellow-200 text-yellow-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">3</span>
            Sensory Details
          </h4>
          <p className="text-yellow-800">
            Use specific sensory information to immerse readers in the mood.
          </p>
          <div className="mt-2 grid grid-cols-1 gap-2">
            <div className="bg-white p-2 rounded border border-yellow-200">
              <p className="text-yellow-800 font-medium">Eerie Mood:</p>
              <p className="text-yellow-800 italic">The floorboards <span className="underline">creaked</span> beneath her feet. A <span className="underline">musty, damp odor</span> filled her nostrils, and the air felt <span className="underline">cold and clammy</span> against her skin. From somewhere deep in the house came a <span className="underline">faint, rhythmic tapping</span>.</p>
            </div>
          </div>
        </div>
        
        <div className="bg-indigo-50 rounded-lg p-4">
          <h4 className="font-bold text-indigo-800 mb-2 flex items-center">
            <span className="bg-indigo-200 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">4</span>
            Imagery & Figurative Language
          </h4>
          <p className="text-indigo-800">
            Create vivid mental pictures that evoke specific emotions.
          </p>
          <div className="mt-2 grid grid-cols-1 gap-2">
            <div className="bg-white p-2 rounded border border-indigo-200">
              <p className="text-indigo-800 font-medium">Melancholic Mood:</p>
              <p className="text-indigo-800 italic">Memories clung to the abandoned playground like the last autumn leaves on a winter tree. The rusty swing set groaned like an old man's joints when the wind pushed it, a sad melody of forgotten laughter.</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-t pt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Today's Schedule</h3>
        <ol className="space-y-2 text-gray-700">
          <li className="flex items-start">
            <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 flex-shrink-0">1</span>
            <span>Learn about mood and tone in writing (15 minutes)</span>
          </li>
          <li className="flex items-start">
            <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 flex-shrink-0">2</span>
            <span>Identify mood and tone in example passages (15 minutes)</span>
          </li>
          <li className="flex items-start">
            <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 flex-shrink-0">3</span>
            <span>Practice rewriting passages to change mood and tone (15 minutes)</span>
          </li>
          <li className="flex items-start">
            <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 flex-shrink-0">4</span>
            <span>Write a descriptive paragraph with a specific mood (25 minutes)</span>
          </li>
        </ol>
      </div>
    </div>
  );
}
