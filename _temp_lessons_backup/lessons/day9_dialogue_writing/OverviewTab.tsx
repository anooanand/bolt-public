import React from 'react';

export function OverviewTab() {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Learning Objective</h3>
      <p className="mb-6 text-gray-700">
        By the end of today, you'll understand how to write realistic, engaging dialogue that enhances your creative writing for the NSW Selective exam.
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
                Well-crafted dialogue can significantly improve your score in both the "Ideas & Content" (30%) and "Language & Vocabulary" (25%) criteria. It brings characters to life and advances your story in a natural, engaging way.
              </p>
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-lg font-medium text-gray-900 mb-2">Key Elements of Effective Dialogue</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-bold text-blue-800 mb-2 flex items-center">
            <span className="bg-blue-200 text-blue-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">1</span>
            Purpose
          </h4>
          <p className="text-blue-800">
            Every line of dialogue should serve a purpose: reveal character, advance the plot, create conflict, or provide information.
            <br /><span className="italic mt-1 block">Example: "I can't believe you sold our grandmother's necklace," she whispered, tears welling in her eyes.</span>
          </p>
        </div>
        
        <div className="bg-green-50 rounded-lg p-4">
          <h4 className="font-bold text-green-800 mb-2 flex items-center">
            <span className="bg-green-200 text-green-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">2</span>
            Character Voice
          </h4>
          <p className="text-green-800">
            Each character should have a distinct way of speaking that reflects their personality, background, and emotions.
            <br /><span className="italic mt-1 block">Example: "Ain't nobody got time for that nonsense," Grandpa Joe scoffed, adjusting his worn suspenders.</span>
          </p>
        </div>
        
        <div className="bg-purple-50 rounded-lg p-4">
          <h4 className="font-bold text-purple-800 mb-2 flex items-center">
            <span className="bg-purple-200 text-purple-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">3</span>
            Dialogue Tags
          </h4>
          <p className="text-purple-800">
            Words that indicate who is speaking and how they're speaking. Use "said" most often, with occasional descriptive tags for emphasis.
            <br /><span className="italic mt-1 block">Example: "I'll find a way," he said. "You always say that," she muttered.</span>
          </p>
        </div>
        
        <div className="bg-red-50 rounded-lg p-4">
          <h4 className="font-bold text-red-800 mb-2 flex items-center">
            <span className="bg-red-200 text-red-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">4</span>
            Action Beats
          </h4>
          <p className="text-red-800">
            Small actions that accompany dialogue to show character emotions, create pauses, and break up long conversations.
            <br /><span className="italic mt-1 block">Example: "I don't understand." She paced across the room, wringing her hands. "Why would anyone do this?"</span>
          </p>
        </div>
        
        <div className="bg-yellow-50 rounded-lg p-4 md:col-span-2">
          <h4 className="font-bold text-yellow-800 mb-2 flex items-center">
            <span className="bg-yellow-200 text-yellow-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">5</span>
            Punctuation & Formatting
          </h4>
          <p className="text-yellow-800">
            Proper use of quotation marks, commas, and paragraph breaks to clearly indicate who is speaking and make dialogue easy to follow.
            <br /><span className="italic mt-1 block">Example: "Are you coming?" asked Tom.<br />"Not today," replied Sarah. "I have too much homework."</span>
          </p>
        </div>
      </div>
      
      <div className="border-t pt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Today's Schedule</h3>
        <ol className="space-y-2 text-gray-700">
          <li className="flex items-start">
            <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 flex-shrink-0">1</span>
            <span>Learn about the key elements of effective dialogue (15 minutes)</span>
          </li>
          <li className="flex items-start">
            <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 flex-shrink-0">2</span>
            <span>Analyze dialogue in example passages (15 minutes)</span>
          </li>
          <li className="flex items-start">
            <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 flex-shrink-0">3</span>
            <span>Practice writing dialogue with distinct character voices (15 minutes)</span>
          </li>
          <li className="flex items-start">
            <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 flex-shrink-0">4</span>
            <span>Create a scene with dialogue that reveals character and advances plot (25 minutes)</span>
          </li>
        </ol>
      </div>
    </div>
  );
}
