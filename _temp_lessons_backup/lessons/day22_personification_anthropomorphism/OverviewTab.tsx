import React from 'react';

export function OverviewTab() {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Learning Objective</h3>
      <p className="mb-6 text-gray-700">
        By the end of today, you'll understand how to use personification and anthropomorphism to create vivid, engaging writing for the NSW Selective exam.
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
                Effective use of personification can significantly improve your score in the "Language & Vocabulary" criterion (25% of your writing score). This technique brings your writing to life and creates memorable images that stay with the reader.
              </p>
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-lg font-medium text-gray-900 mb-2">Understanding Personification & Anthropomorphism</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-bold text-blue-800 mb-2 flex items-center">
            <span className="bg-blue-200 text-blue-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">1</span>
            Personification
          </h4>
          <p className="text-blue-800">
            Giving human qualities, actions, or emotions to non-human things (objects, animals, forces of nature, abstract concepts).
          </p>
          <div className="mt-2 bg-white p-3 rounded border border-blue-200">
            <p className="text-blue-800 font-medium">Examples:</p>
            <ul className="list-disc pl-5 text-blue-800 space-y-1 mt-1">
              <li>The wind <span className="underline">whispered</span> through the trees.</li>
              <li>The ancient oak <span className="underline">stood guard</span> over the park.</li>
              <li>The stars <span className="underline">winked</span> at me from the night sky.</li>
              <li>Fear <span className="underline">crept</span> into my heart.</li>
              <li>The camera <span className="underline">refused</span> to work today.</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-green-50 rounded-lg p-4">
          <h4 className="font-bold text-green-800 mb-2 flex items-center">
            <span className="bg-green-200 text-green-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">2</span>
            Anthropomorphism
          </h4>
          <p className="text-green-800">
            A specific type of personification that gives human form, character, or behavior to animals, objects, or abstract concepts, often in a more complete way.
          </p>
          <div className="mt-2 bg-white p-3 rounded border border-green-200">
            <p className="text-green-800 font-medium">Examples:</p>
            <ul className="list-disc pl-5 text-green-800 space-y-1 mt-1">
              <li>In the story, the rabbit wore a waistcoat and checked his pocket watch.</li>
              <li>The teapot sang a cheerful tune as she danced across the counter.</li>
              <li>The old computer sighed and reluctantly powered up for one last task.</li>
              <li>The moon smiled down on the sleeping town, her gentle face full of wisdom.</li>
            </ul>
          </div>
        </div>
      </div>
      
      <h3 className="text-lg font-medium text-gray-900 mb-2">Using Personification Effectively</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-purple-50 rounded-lg p-4">
          <h4 className="font-bold text-purple-800 mb-2 flex items-center">
            <span className="bg-purple-200 text-purple-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">1</span>
            Create Mood & Atmosphere
          </h4>
          <p className="text-purple-800">
            Use personification to establish or enhance the emotional tone of your writing.
          </p>
          <div className="mt-2 grid grid-cols-1 gap-2">
            <div className="bg-white p-2 rounded border border-purple-200">
              <p className="text-purple-800 font-medium">Ominous/Threatening:</p>
              <p className="text-purple-800 italic">The fog crept silently through the streets, its cold fingers reaching into every corner and alleyway.</p>
            </div>
            <div className="bg-white p-2 rounded border border-purple-200">
              <p className="text-purple-800 font-medium">Cheerful/Welcoming:</p>
              <p className="text-purple-800 italic">The morning sun danced across the meadow, kissing each flower awake with its golden touch.</p>
            </div>
          </div>
        </div>
        
        <div className="bg-red-50 rounded-lg p-4">
          <h4 className="font-bold text-red-800 mb-2 flex items-center">
            <span className="bg-red-200 text-red-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">2</span>
            Reveal Character Perspective
          </h4>
          <p className="text-red-800">
            Show how your character views the world through the personification they notice or create.
          </p>
          <div className="mt-2 grid grid-cols-1 gap-2">
            <div className="bg-white p-2 rounded border border-red-200">
              <p className="text-red-800 font-medium">Optimistic Character:</p>
              <p className="text-red-800 italic">To Maya, the old house smiled with its bright windows, and the creaking stairs sang songs of welcome.</p>
            </div>
            <div className="bg-white p-2 rounded border border-red-200">
              <p className="text-red-800 font-medium">Fearful Character:</p>
              <p className="text-red-800 italic">To James, the old house glared with its dark windows, and the creaking stairs groaned warnings of danger.</p>
            </div>
          </div>
        </div>
        
        <div className="bg-yellow-50 rounded-lg p-4 md:col-span-2">
          <h4 className="font-bold text-yellow-800 mb-2 flex items-center">
            <span className="bg-yellow-200 text-yellow-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">3</span>
            Extended Personification
          </h4>
          <p className="text-yellow-800">
            Develop personification throughout a paragraph or entire piece for greater impact.
          </p>
          <div className="mt-2 bg-white p-3 rounded border border-yellow-200">
            <p className="text-yellow-800 italic">
              The old library was a wise elder who held the knowledge of centuries within its walls. Its shelves stood like patient teachers, offering their wisdom to anyone who approached. Books whispered their stories, eager to share their secrets with curious minds. The wooden tables had witnessed generations of students and bore the scars of countless pens that had danced across papers. Even the dust motes seemed to float with purpose, as if they were the very thoughts of scholars who had come before, still lingering in the air. When the clock chimed, it was as though the library itself was clearing its throat, reminding visitors that time was precious and knowledge waited for no one.
            </p>
          </div>
        </div>
      </div>
      
      <div className="border-t pt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Today's Schedule</h3>
        <ol className="space-y-2 text-gray-700">
          <li className="flex items-start">
            <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 flex-shrink-0">1</span>
            <span>Learn about personification and anthropomorphism (15 minutes)</span>
          </li>
          <li className="flex items-start">
            <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 flex-shrink-0">2</span>
            <span>Identify and analyze personification in example passages (15 minutes)</span>
          </li>
          <li className="flex items-start">
            <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 flex-shrink-0">3</span>
            <span>Practice creating personification for different objects and concepts (15 minutes)</span>
          </li>
          <li className="flex items-start">
            <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 flex-shrink-0">4</span>
            <span>Write a descriptive paragraph using extended personification (25 minutes)</span>
          </li>
        </ol>
      </div>
    </div>
  );
}
