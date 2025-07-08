import React from 'react';

export function OverviewTab() {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Learning Objective</h3>
      <p className="mb-6 text-gray-700">
        By the end of today, you'll understand how to create detailed, compelling character descriptions that bring your stories to life in the NSW Selective exam.
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
                Vivid character descriptions contribute significantly to both the "Ideas & Content" (30%) and "Language & Vocabulary" (25%) criteria in the NSW Selective exam. Well-developed characters make your stories more engaging and memorable.
              </p>
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-lg font-medium text-gray-900 mb-2">Elements of Effective Character Description</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-bold text-blue-800 mb-2 flex items-center">
            <span className="bg-blue-200 text-blue-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">1</span>
            Physical Appearance
          </h4>
          <p className="text-blue-800">
            Describe distinctive features that reveal personality, not just generic details.
            <br /><span className="italic mt-1 block">Instead of: "She had brown hair and blue eyes."<br />Better: "Her unruly copper curls escaped from hastily pinned braids, while her sharp blue eyes missed nothing, darting from face to face with keen intelligence."</span>
          </p>
        </div>
        
        <div className="bg-green-50 rounded-lg p-4">
          <h4 className="font-bold text-green-800 mb-2 flex items-center">
            <span className="bg-green-200 text-green-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">2</span>
            Body Language & Mannerisms
          </h4>
          <p className="text-green-800">
            Show habitual gestures, posture, and movements that reveal character traits.
            <br /><span className="italic mt-1 block">Example: "Mr. Chen's shoulders hunched forward as he walked, his fingers constantly tapping against his thigh in an irregular rhythm. When he spoke, he rarely made eye contact, instead focusing on a point just above the listener's head."</span>
          </p>
        </div>
        
        <div className="bg-purple-50 rounded-lg p-4">
          <h4 className="font-bold text-purple-800 mb-2 flex items-center">
            <span className="bg-purple-200 text-purple-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">3</span>
            Clothing & Possessions
          </h4>
          <p className="text-purple-800">
            Use personal items to reveal status, personality, values, and background.
            <br /><span className="italic mt-1 block">Example: "Amina's carefully pressed uniform contrasted with her scuffed, well-worn shoes. The tattered notebook she clutched was filled with meticulous notes in tiny handwriting, conserving every precious page."</span>
          </p>
        </div>
        
        <div className="bg-red-50 rounded-lg p-4">
          <h4 className="font-bold text-red-800 mb-2 flex items-center">
            <span className="bg-red-200 text-red-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">4</span>
            Voice & Speech Patterns
          </h4>
          <p className="text-red-800">
            Describe how characters speak, including tone, pace, vocabulary, and accent.
            <br /><span className="italic mt-1 block">Example: "Grandpa Joe spoke in a slow, deliberate drawl, stretching his vowels like warm taffy. His colorful country expressions—'busier than a one-legged man in a kickin' contest'—always made the children giggle."</span>
          </p>
        </div>
        
        <div className="bg-yellow-50 rounded-lg p-4 md:col-span-2">
          <h4 className="font-bold text-yellow-800 mb-2 flex items-center">
            <span className="bg-yellow-200 text-yellow-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">5</span>
            Actions & Reactions
          </h4>
          <p className="text-yellow-800">
            Show how characters behave in different situations to reveal their true nature.
            <br /><span className="italic mt-1 block">Example: "When the stray cat darted into the busy street, Zack didn't hesitate. He dropped his expensive art portfolio in a puddle and lunged forward, scooping the hissing animal to safety while cars honked and swerved around him."</span>
          </p>
        </div>
      </div>
      
      <div className="border-t pt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Today's Schedule</h3>
        <ol className="space-y-2 text-gray-700">
          <li className="flex items-start">
            <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 flex-shrink-0">1</span>
            <span>Learn about the elements of effective character description (15 minutes)</span>
          </li>
          <li className="flex items-start">
            <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 flex-shrink-0">2</span>
            <span>Analyze character descriptions in example passages (15 minutes)</span>
          </li>
          <li className="flex items-start">
            <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 flex-shrink-0">3</span>
            <span>Practice transforming basic character descriptions into vivid ones (15 minutes)</span>
          </li>
          <li className="flex items-start">
            <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 flex-shrink-0">4</span>
            <span>Write a detailed character description that reveals personality (25 minutes)</span>
          </li>
        </ol>
      </div>
    </div>
  );
}
