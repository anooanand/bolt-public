import React from 'react';

export function OverviewTab() {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Learning Objective</h3>
      <p className="mb-6 text-gray-700">
        By the end of today, you'll understand the "show, don't tell" technique and how to apply it to create more vivid, engaging writing for the NSW Selective exam.
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
                Mastering "show, don't tell" can significantly improve your scores in both the "Ideas & Content" (30%) and "Language & Vocabulary" (25%) criteria. Examiners consistently reward writing that brings scenes to life through sensory details rather than simple statements.
              </p>
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-lg font-medium text-gray-900 mb-2">The "Show, Don't Tell" Technique</h3>
      
      <div className="grid grid-cols-1 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-bold text-blue-800 mb-2 flex items-center">
            <span className="bg-blue-200 text-blue-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">1</span>
            What Is "Show, Don't Tell"?
          </h4>
          <p className="text-blue-800">
            Instead of directly stating emotions, qualities, or situations, you demonstrate them through specific details, actions, dialogue, and sensory descriptions that allow readers to experience the story.
          </p>
          <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="bg-red-100 p-2 rounded">
              <p className="text-red-800 font-medium">Telling (Weak):</p>
              <p className="text-red-800 italic">Sarah was nervous about her presentation.</p>
            </div>
            <div className="bg-green-100 p-2 rounded">
              <p className="text-green-800 font-medium">Showing (Strong):</p>
              <p className="text-green-800 italic">Sarah's hands trembled as she shuffled her note cards. Beads of sweat formed on her forehead, and she kept clearing her throat as she approached the podium.</p>
            </div>
          </div>
        </div>
        
        <div className="bg-green-50 rounded-lg p-4">
          <h4 className="font-bold text-green-800 mb-2 flex items-center">
            <span className="bg-green-200 text-green-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">2</span>
            Using Sensory Details
          </h4>
          <p className="text-green-800">
            Engage the five senses (sight, sound, smell, taste, touch) to create a vivid experience for the reader.
          </p>
          <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="bg-red-100 p-2 rounded">
              <p className="text-red-800 font-medium">Telling (Weak):</p>
              <p className="text-red-800 italic">The beach was beautiful and relaxing.</p>
            </div>
            <div className="bg-green-100 p-2 rounded">
              <p className="text-green-800 font-medium">Showing (Strong):</p>
              <p className="text-green-800 italic">Warm sand squeezed between her toes as waves crashed rhythmically against the shore. The air tasted of salt, and seagulls called to each other overhead.</p>
            </div>
          </div>
        </div>
        
        <div className="bg-purple-50 rounded-lg p-4">
          <h4 className="font-bold text-purple-800 mb-2 flex items-center">
            <span className="bg-purple-200 text-purple-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">3</span>
            Revealing Through Action
          </h4>
          <p className="text-purple-800">
            Show character traits and emotions through behaviors and decisions rather than stating them directly.
          </p>
          <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="bg-red-100 p-2 rounded">
              <p className="text-red-800 font-medium">Telling (Weak):</p>
              <p className="text-red-800 italic">Tom was a generous person who cared about others.</p>
            </div>
            <div className="bg-green-100 p-2 rounded">
              <p className="text-green-800 font-medium">Showing (Strong):</p>
              <p className="text-green-800 italic">Tom gave his lunch to the new student who had forgotten hers, even though his stomach had been growling all morning. Later, he stayed an hour after school to help clean up a spill in the art room.</p>
            </div>
          </div>
        </div>
        
        <div className="bg-red-50 rounded-lg p-4">
          <h4 className="font-bold text-red-800 mb-2 flex items-center">
            <span className="bg-red-200 text-red-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">4</span>
            Using Specific Details
          </h4>
          <p className="text-red-800">
            Replace vague, general statements with precise, concrete details that create clear images.
          </p>
          <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="bg-red-100 p-2 rounded">
              <p className="text-red-800 font-medium">Telling (Weak):</p>
              <p className="text-red-800 italic">The old house was scary and in bad condition.</p>
            </div>
            <div className="bg-green-100 p-2 rounded">
              <p className="text-green-800 font-medium">Showing (Strong):</p>
              <p className="text-green-800 italic">Shingles hung precariously from the sagging roof, and the porch steps creaked under the slightest weight. Behind cracked windows, tattered curtains swayed in a breeze that shouldn't have been there.</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-t pt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Today's Schedule</h3>
        <ol className="space-y-2 text-gray-700">
          <li className="flex items-start">
            <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 flex-shrink-0">1</span>
            <span>Learn about the "show, don't tell" technique (15 minutes)</span>
          </li>
          <li className="flex items-start">
            <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 flex-shrink-0">2</span>
            <span>Identify "showing" vs. "telling" in example passages (15 minutes)</span>
          </li>
          <li className="flex items-start">
            <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 flex-shrink-0">3</span>
            <span>Practice converting "telling" sentences into "showing" paragraphs (15 minutes)</span>
          </li>
          <li className="flex items-start">
            <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 flex-shrink-0">4</span>
            <span>Write a descriptive paragraph using the "show, don't tell" technique (25 minutes)</span>
          </li>
        </ol>
      </div>
    </div>
  );
}
