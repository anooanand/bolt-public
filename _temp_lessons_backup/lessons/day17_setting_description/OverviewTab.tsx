import React from 'react';

export function OverviewTab() {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Learning Objective</h3>
      <p className="mb-6 text-gray-700">
        By the end of today, you'll understand how to create vivid, detailed setting descriptions that enhance your creative writing for the NSW Selective exam.
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
                Effective setting descriptions contribute significantly to both the "Ideas & Content" (30%) and "Language & Vocabulary" (25%) criteria in the NSW Selective exam. A well-crafted setting can establish mood, provide context, and immerse readers in your story.
              </p>
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-lg font-medium text-gray-900 mb-2">Elements of Effective Setting Description</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-bold text-blue-800 mb-2 flex items-center">
            <span className="bg-blue-200 text-blue-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">1</span>
            Sensory Details
          </h4>
          <p className="text-blue-800">
            Engage all five senses to create an immersive experience of the setting.
            <br /><span className="italic mt-1 block">Example: The library's musty scent of aged paper mingled with lemon polish, while dust motes danced in the golden shafts of afternoon light that streamed through tall windows.</span>
          </p>
        </div>
        
        <div className="bg-green-50 rounded-lg p-4">
          <h4 className="font-bold text-green-800 mb-2 flex items-center">
            <span className="bg-green-200 text-green-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">2</span>
            Specific Details
          </h4>
          <p className="text-green-800">
            Include precise, concrete details that create a clear image rather than vague generalizations.
            <br /><span className="italic mt-1 block">Instead of: "The beach was beautiful."<br />Better: "Tiny shells dotted the pristine white sand, while turquoise waves crested and foamed at the shoreline."</span>
          </p>
        </div>
        
        <div className="bg-purple-50 rounded-lg p-4">
          <h4 className="font-bold text-purple-800 mb-2 flex items-center">
            <span className="bg-purple-200 text-purple-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">3</span>
            Mood and Atmosphere
          </h4>
          <p className="text-purple-800">
            Use setting details to establish the emotional tone of the scene.
            <br /><span className="italic mt-1 block">Example: The playground stood abandoned, its rusty swings creaking in the bitter wind. Fallen leaves skittered across cracked concrete, and the faded mural peeled away like old memories.</span>
          </p>
        </div>
        
        <div className="bg-red-50 rounded-lg p-4">
          <h4 className="font-bold text-red-800 mb-2 flex items-center">
            <span className="bg-red-200 text-red-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">4</span>
            Movement and Change
          </h4>
          <p className="text-red-800">
            Include dynamic elements that show the setting isn't static but alive and changing.
            <br /><span className="italic mt-1 block">Example: As evening descended, the bustling market gradually emptied. Vendors packed away their colorful wares, and street lamps flickered to life one by one.</span>
          </p>
        </div>
        
        <div className="bg-yellow-50 rounded-lg p-4 md:col-span-2">
          <h4 className="font-bold text-yellow-800 mb-2 flex items-center">
            <span className="bg-yellow-200 text-yellow-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">5</span>
            Character Interaction
          </h4>
          <p className="text-yellow-800">
            Show how characters interact with and respond to the setting to reveal both character and place.
            <br /><span className="italic mt-1 block">Example: Maya traced her fingers along the rough stone wall, feeling the centuries of history beneath her touch. She ducked beneath the low doorway, her shoulders instinctively hunching as the ceiling pressed down above her.</span>
          </p>
        </div>
      </div>
      
      <div className="border-t pt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Today's Schedule</h3>
        <ol className="space-y-2 text-gray-700">
          <li className="flex items-start">
            <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 flex-shrink-0">1</span>
            <span>Learn about the elements of effective setting description (15 minutes)</span>
          </li>
          <li className="flex items-start">
            <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 flex-shrink-0">2</span>
            <span>Analyze setting descriptions in example passages (15 minutes)</span>
          </li>
          <li className="flex items-start">
            <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 flex-shrink-0">3</span>
            <span>Practice transforming basic setting descriptions into vivid ones (15 minutes)</span>
          </li>
          <li className="flex items-start">
            <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 flex-shrink-0">4</span>
            <span>Write a detailed setting description that establishes mood (25 minutes)</span>
          </li>
        </ol>
      </div>
    </div>
  );
}
