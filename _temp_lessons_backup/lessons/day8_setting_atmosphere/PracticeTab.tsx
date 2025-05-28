import React from 'react';

export function PracticeTab() {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Practice Task: Creating Vivid Settings and Atmosphere</h3>
      
      <div className="bg-indigo-50 p-4 rounded-lg mb-6">
        <p className="text-gray-700">
          Now it's time to apply what you've learned about setting and atmosphere! In this practice task, you'll analyze setting descriptions, create contrasting atmospheres, and write your own detailed setting that establishes mood.
        </p>
      </div>
      
      <div className="space-y-6">
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-blue-50 px-4 py-3">
            <h4 className="font-medium text-blue-800">Part 1: Analyze Setting Descriptions</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Read the passage below and identify the key elements of setting and atmosphere used by the author.
            </p>
            
            <div className="border p-4 rounded-lg mb-4 bg-gray-50">
              <p className="text-gray-800">
                The abandoned schoolhouse stood at the end of Willow Lane, its once-white paint now peeling and gray. Tall grass had reclaimed the playground, and the rusty swing set creaked in the autumn breeze. Through broken windows, dust motes danced in shafts of late afternoon sunlight. The faded clock on the bell tower had stopped at 3:15, as if time itself had given up on this forgotten place. A child's faded drawing still clung to one wall, a cheerful reminder of laughter that once echoed through these silent halls. The floorboards groaned underfoot, whispering secrets of generations past.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Identify elements of Physical Location in the passage:</p>
                <textarea
                  rows={2}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="List specific details that describe the physical location..."
                ></textarea>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Identify elements of Time Period in the passage:</p>
                <textarea
                  rows={2}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="List specific details that indicate time period, season, or time of day..."
                ></textarea>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Identify Sensory Details in the passage:</p>
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm text-gray-700">Visual (sight):</label>
                    <input
                      type="text"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700">Auditory (sound):</label>
                    <input
                      type="text"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700">Tactile (touch):</label>
                    <input
                      type="text"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">What mood or atmosphere does this passage create?</p>
                <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option>Select...</option>
                  <option>Nostalgic and melancholy</option>
                  <option>Eerie and mysterious</option>
                  <option>Peaceful and serene</option>
                  <option>Tense and foreboding</option>
                </select>
                <div className="mt-2">
                  <label className="block text-sm text-gray-700">Explain your choice using specific details from the passage:</label>
                  <textarea
                    rows={2}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  ></textarea>
                </div>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Identify any Symbolic Elements in the passage:</p>
                <textarea
                  rows={2}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="What objects or features might have deeper meaning?"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-green-50 px-4 py-3">
            <h4 className="font-medium text-green-800">Part 2: Create Contrasting Atmospheres</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              For this exercise, you'll create two contrasting descriptions of the same location—a school library—with completely different atmospheres.
            </p>
            
            <div className="space-y-4">
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Description 1: Create a peaceful, welcoming atmosphere</p>
                <div>
                  <textarea
                    rows={5}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Describe the school library in a way that creates a peaceful, welcoming atmosphere..."
                  ></textarea>
                </div>
                <div className="mt-2">
                  <label className="block text-sm text-gray-700">What specific techniques did you use to create this atmosphere?</label>
                  <textarea
                    rows={2}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  ></textarea>
                </div>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Description 2: Create a tense, mysterious atmosphere</p>
                <div>
                  <textarea
                    rows={5}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Describe the same school library in a way that creates a tense, mysterious atmosphere..."
                  ></textarea>
                </div>
                <div className="mt-2">
                  <label className="block text-sm text-gray-700">What specific techniques did you use to create this atmosphere?</label>
                  <textarea
                    rows={2}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  ></textarea>
                </div>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Reflection:</p>
                <div>
                  <label className="block text-sm text-gray-700">How did changing word choice, sensory details, and focus affect the atmosphere?</label>
                  <textarea
                    rows={3}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-purple-50 px-4 py-3">
            <h4 className="font-medium text-purple-800">Part 3: Write a Detailed Setting Description</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Choose one of the following locations and write a detailed setting description that establishes a specific mood. Your description should include all five key elements of setting and atmosphere.
            </p>
            
            <div className="bg-gray-50 p-3 rounded-lg mb-4">
              <ul className="list-disc pl-5 text-gray-700">
                <li>An abandoned amusement park</li>
                <li>A bustling city market</li>
                <li>A secret garden</li>
                <li>A storm-battered coastline</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Selected Location:</label>
                <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option>Select a location...</option>
                  <option>An abandoned amusement park</option>
                  <option>A bustling city market</option>
                  <option>A secret garden</option>
                  <option>A storm-battered coastline</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mood/Atmosphere I want to create:</label>
                <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option>Select a mood...</option>
                  <option>Mysterious</option>
                  <option>Joyful</option>
                  <option>Peaceful</option>
                  <option>Tense</option>
                  <option>Melancholy</option>
                  <option>Magical</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Setting Description:</label>
                <textarea
                  rows={10}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Write your detailed setting description here..."
                ></textarea>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-sm font-medium text-gray-700 mb-2">Self-assessment checklist:</p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                    <label className="ml-2 block text-sm text-gray-700">I included specific details about the physical location</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                    <label className="ml-2 block text-sm text-gray-700">I established time period (season, time of day, era, etc.)</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                    <label className="ml-2 block text-sm text-gray-700">I included at least three different sensory details</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                    <label className="ml-2 block text-sm text-gray-700">My word choices consistently support my chosen mood</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                    <label className="ml-2 block text-sm text-gray-700">I included at least one symbolic element</label>
                  </div>
                </div>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-sm font-medium text-gray-700 mb-2">Reflection:</p>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Which element of setting was easiest for you to develop?</label>
                  <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                    <option>Select...</option>
                    <option>Physical Location</option>
                    <option>Time Period</option>
                    <option>Sensory Details</option>
                    <option>Mood & Atmosphere</option>
                    <option>Symbolic Elements</option>
                  </select>
                </div>
                <div className="mt-2">
                  <label className="block text-sm text-gray-700 mb-1">Which element was most challenging?</label>
                  <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                    <option>Select...</option>
                    <option>Physical Location</option>
                    <option>Time Period</option>
                    <option>Sensory Details</option>
                    <option>Mood & Atmosphere</option>
                    <option>Symbolic Elements</option>
                  </select>
                </div>
                <div className="mt-2">
                  <label className="block text-sm text-gray-700 mb-1">How could you improve your setting description?</label>
                  <textarea
                    rows={2}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit Practice Task
          </button>
        </div>
      </div>
    </div>
  );
}
