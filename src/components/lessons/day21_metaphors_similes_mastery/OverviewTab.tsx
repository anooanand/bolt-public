import React from 'react';

export function OverviewTab() {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Learning Objective</h3>
      <p className="mb-6 text-gray-700">
        By the end of today, you'll understand how to create and use metaphors and similes effectively to enhance your writing for the NSW Selective exam.
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
                Effective use of metaphors and similes can significantly improve your score in the "Language & Vocabulary" criterion (25% of your writing score). Examiners consistently reward students who can create fresh, original comparisons rather than relying on clichés.
              </p>
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-lg font-medium text-gray-900 mb-2">Metaphors vs. Similes</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-bold text-blue-800 mb-2 flex items-center">
            <span className="bg-blue-200 text-blue-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">1</span>
            Similes
          </h4>
          <p className="text-blue-800">
            Comparisons that use "like" or "as" to show how two different things are similar in one specific way.
          </p>
          <div className="mt-2 bg-white p-3 rounded border border-blue-200">
            <p className="text-blue-800 font-medium">Examples:</p>
            <ul className="list-disc pl-5 text-blue-800 space-y-1 mt-1">
              <li>Her voice was as smooth as honey.</li>
              <li>The stars sparkled like diamonds in the night sky.</li>
              <li>The child ran like a cheetah across the playground.</li>
            </ul>
            <p className="text-blue-800 font-medium mt-2">Structure:</p>
            <p className="text-blue-800 italic">Thing A + is like/as + Thing B</p>
          </div>
        </div>
        
        <div className="bg-green-50 rounded-lg p-4">
          <h4 className="font-bold text-green-800 mb-2 flex items-center">
            <span className="bg-green-200 text-green-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">2</span>
            Metaphors
          </h4>
          <p className="text-green-800">
            Direct comparisons that state one thing IS another thing, creating a stronger, more immediate image.
          </p>
          <div className="mt-2 bg-white p-3 rounded border border-green-200">
            <p className="text-green-800 font-medium">Examples:</p>
            <ul className="list-disc pl-5 text-green-800 space-y-1 mt-1">
              <li>Her voice was honey, sweet and soothing.</li>
              <li>The stars were diamonds scattered across black velvet.</li>
              <li>The child was a cheetah, racing across the playground.</li>
            </ul>
            <p className="text-green-800 font-medium mt-2">Structure:</p>
            <p className="text-green-800 italic">Thing A + is + Thing B</p>
          </div>
        </div>
      </div>
      
      <h3 className="text-lg font-medium text-gray-900 mb-2">Creating Powerful Comparisons</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-purple-50 rounded-lg p-4">
          <h4 className="font-bold text-purple-800 mb-2 flex items-center">
            <span className="bg-purple-200 text-purple-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">1</span>
            Be Specific & Original
          </h4>
          <p className="text-purple-800">
            Avoid clichés and create fresh comparisons that surprise the reader.
          </p>
          <div className="mt-2 grid grid-cols-1 gap-2">
            <div className="bg-red-100 p-2 rounded">
              <p className="text-red-800 font-medium">Weak (Cliché):</p>
              <p className="text-red-800 italic">Her eyes were blue as the ocean.</p>
            </div>
            <div className="bg-green-100 p-2 rounded">
              <p className="text-green-800 font-medium">Strong (Original):</p>
              <p className="text-green-800 italic">Her eyes were blue as the forgotten marbles I found under my childhood bed—dusty yet somehow still bright with possibility.</p>
            </div>
          </div>
        </div>
        
        <div className="bg-red-50 rounded-lg p-4">
          <h4 className="font-bold text-red-800 mb-2 flex items-center">
            <span className="bg-red-200 text-red-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">2</span>
            Consider Your Purpose
          </h4>
          <p className="text-red-800">
            Choose comparisons that enhance the mood, theme, or character development.
          </p>
          <div className="mt-2 grid grid-cols-1 gap-2">
            <div className="bg-red-100 p-2 rounded">
              <p className="text-red-800 font-medium">Weak (Random):</p>
              <p className="text-red-800 italic">The abandoned house was like a broken pencil.</p>
            </div>
            <div className="bg-green-100 p-2 rounded">
              <p className="text-green-800 font-medium">Strong (Purposeful):</p>
              <p className="text-green-800 italic">The abandoned house was like an elderly person forgotten by family—once vibrant and full of life, now slumped and weathered by years of neglect.</p>
            </div>
          </div>
        </div>
        
        <div className="bg-yellow-50 rounded-lg p-4 md:col-span-2">
          <h4 className="font-bold text-yellow-800 mb-2 flex items-center">
            <span className="bg-yellow-200 text-yellow-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">3</span>
            Extend Your Comparisons
          </h4>
          <p className="text-yellow-800">
            Develop your metaphors or similes beyond a single sentence for greater impact.
          </p>
          <div className="mt-2 grid grid-cols-1 gap-2">
            <div className="bg-red-100 p-2 rounded">
              <p className="text-red-800 font-medium">Basic:</p>
              <p className="text-red-800 italic">The classroom was a prison.</p>
            </div>
            <div className="bg-green-100 p-2 rounded">
              <p className="text-green-800 font-medium">Extended:</p>
              <p className="text-green-800 italic">The classroom was a prison. The ticking clock served as our merciless guard, while the rows of desks formed perfect cell blocks. We students were the inmates, sentenced to six hours of confinement, with only brief moments of yard time when the bell signaled recess. Mr. Thompson, our warden, paced the front of the room, keys jangling at his belt as he lectured about the importance of good behavior.</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-t pt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Today's Schedule</h3>
        <ol className="space-y-2 text-gray-700">
          <li className="flex items-start">
            <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 flex-shrink-0">1</span>
            <span>Learn about metaphors and similes (15 minutes)</span>
          </li>
          <li className="flex items-start">
            <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 flex-shrink-0">2</span>
            <span>Identify and analyze metaphors and similes in example passages (15 minutes)</span>
          </li>
          <li className="flex items-start">
            <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 flex-shrink-0">3</span>
            <span>Practice creating original metaphors and similes (15 minutes)</span>
          </li>
          <li className="flex items-start">
            <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 flex-shrink-0">4</span>
            <span>Write a descriptive paragraph using extended metaphor or multiple similes (25 minutes)</span>
          </li>
        </ol>
      </div>
    </div>
  );
}
