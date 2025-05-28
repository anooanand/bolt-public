import React from 'react';

export function ActivitiesTab() {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Interactive Activities</h3>
      
      <div className="bg-indigo-50 p-4 rounded-lg mb-6">
        <p className="text-gray-700">
          Complete these interactive activities to reinforce your understanding of setting and atmosphere. These exercises will help you create vivid settings that enhance your creative writing for the NSW Selective exam.
        </p>
      </div>
      
      <div className="space-y-8">
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-blue-50 px-4 py-2">
            <h4 className="font-medium text-blue-800">Activity 1: Identify Setting Elements</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Read the passage below and identify which elements of setting and atmosphere are used.
            </p>
            
            <div className="border p-3 rounded-lg mb-4 bg-gray-50">
              <p className="text-gray-700">
                The abandoned railway station stood frozen in time, its Victorian architecture a reminder of a more elegant era. Moonlight filtered through the cracked glass dome, casting long shadows across the marble floor where autumn leaves had gathered in dusty corners. The faint smell of rusted metal and damp wood permeated the air. Outside, the wind whispered through the overgrown platform, causing the old departure board to creak rhythmically. Despite being only a kilometer from the bustling modern city center, the station existed in its own pocket of silence, broken only by the occasional distant rumble of a new high-speed train passing on recently built tracks nearby. A single moth fluttered around the one working light bulb, its movement emphasizing the stillness of everything else.
              </p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Identify examples of Physical Location details (select all that apply):</label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input id="pl1" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="pl1" className="ml-2 block text-sm text-gray-700">"Victorian architecture"</label>
                  </div>
                  <div className="flex items-center">
                    <input id="pl2" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="pl2" className="ml-2 block text-sm text-gray-700">"cracked glass dome"</label>
                  </div>
                  <div className="flex items-center">
                    <input id="pl3" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="pl3" className="ml-2 block text-sm text-gray-700">"marble floor"</label>
                  </div>
                  <div className="flex items-center">
                    <input id="pl4" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="pl4" className="ml-2 block text-sm text-gray-700">"overgrown platform"</label>
                  </div>
                  <div className="flex items-center">
                    <input id="pl5" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="pl5" className="ml-2 block text-sm text-gray-700">"a kilometer from the bustling modern city center"</label>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Identify examples of Time Period details (select all that apply):</label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input id="tp1" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="tp1" className="ml-2 block text-sm text-gray-700">"Victorian architecture"</label>
                  </div>
                  <div className="flex items-center">
                    <input id="tp2" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="tp2" className="ml-2 block text-sm text-gray-700">"a more elegant era"</label>
                  </div>
                  <div className="flex items-center">
                    <input id="tp3" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="tp3" className="ml-2 block text-sm text-gray-700">"autumn leaves"</label>
                  </div>
                  <div className="flex items-center">
                    <input id="tp4" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="tp4" className="ml-2 block text-sm text-gray-700">"Moonlight"</label>
                  </div>
                  <div className="flex items-center">
                    <input id="tp5" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="tp5" className="ml-2 block text-sm text-gray-700">"modern city center"</label>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Identify examples of Sensory Details (select all that apply):</label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input id="sd1" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="sd1" className="ml-2 block text-sm text-gray-700">"Moonlight filtered through the cracked glass dome"</label>
                  </div>
                  <div className="flex items-center">
                    <input id="sd2" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="sd2" className="ml-2 block text-sm text-gray-700">"faint smell of rusted metal and damp wood"</label>
                  </div>
                  <div className="flex items-center">
                    <input id="sd3" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="sd3" className="ml-2 block text-sm text-gray-700">"wind whispered through the overgrown platform"</label>
                  </div>
                  <div className="flex items-center">
                    <input id="sd4" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="sd4" className="ml-2 block text-sm text-gray-700">"departure board to creak rhythmically"</label>
                  </div>
                  <div className="flex items-center">
                    <input id="sd5" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="sd5" className="ml-2 block text-sm text-gray-700">"distant rumble of a new high-speed train"</label>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">What mood or atmosphere is created in this passage?</label>
                <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option>Select the best answer...</option>
                  <option value="1">Cheerful and lively</option>
                  <option value="2">Nostalgic and melancholy</option>
                  <option value="3">Frightening and dangerous</option>
                  <option value="4">Chaotic and confusing</option>
                  <option value="5">Peaceful and serene</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Identify a symbolic element in the passage:</label>
                <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option>Select the best answer...</option>
                  <option value="1">The moth fluttering around the one working light bulb</option>
                  <option value="2">The marble floor</option>
                  <option value="3">The autumn leaves</option>
                  <option value="4">The Victorian architecture</option>
                  <option value="5">The distant high-speed train</option>
                </select>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Check Answers
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-green-50 px-4 py-2">
            <h4 className="font-medium text-green-800">Activity 2: Match Mood to Setting Description</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Match each mood or atmosphere to the setting description that best creates that feeling.
            </p>
            
            <div className="space-y-6">
              <div>
                <h5 className="font-medium text-gray-800 mb-2">Setting Descriptions:</h5>
                <div className="space-y-2">
                  <div className="border p-3 rounded-lg bg-gray-50">
                    <p className="text-gray-700">
                      <span className="font-medium">Setting A:</span> The playground equipment cast long shadows across the empty schoolyard. A lone swing moved back and forth with a rusty squeak, though no one sat on it. Papers and candy wrappers skittered across the asphalt in the chill breeze.
                    </p>
                  </div>
                  <div className="border p-3 rounded-lg bg-gray-50">
                    <p className="text-gray-700">
                      <span className="font-medium">Setting B:</span> Sunlight dappled through the canopy of leaves, creating shifting patterns on the forest floor. Birds called to one another in cheerful melodies, and the sweet scent of wildflowers mingled with the earthy aroma of moss and soil.
                    </p>
                  </div>
                  <div className="border p-3 rounded-lg bg-gray-50">
                    <p className="text-gray-700">
                      <span className="font-medium">Setting C:</span> The narrow alley twisted between towering buildings that blocked out the sky. Water dripped from rusted pipes, forming murky puddles. The distant wail of a siren echoed off the graffiti-covered walls.
                    </p>
                  </div>
                  <div className="border p-3 rounded-lg bg-gray-50">
                    <p className="text-gray-700">
                      <span className="font-medium">Setting D:</span> The old farmhouse kitchen glowed with warm light. A pot of soup bubbled on the stove, filling the air with the aroma of herbs and vegetables. Well-worn wooden chairs surrounded a table covered with a checkered cloth.
                    </p>
                  </div>
                  <div className="border p-3 rounded-lg bg-gray-50">
                    <p className="text-gray-700">
                      <span className="font-medium">Setting E:</span> Lightning flashed, briefly illuminating the jagged rocks below the cliff edge. The wind howled, whipping rain sideways and tearing at clothing. Thunder crashed overhead, drowning out all other sounds.
                    </p>
                  </div>
                </div>
                
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">1. Peaceful and serene:</label>
                    <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                      <option>Select setting...</option>
                      <option value="A">Setting A</option>
                      <option value="B">Setting B</option>
                      <option value="C">Setting C</option>
                      <option value="D">Setting D</option>
                      <option value="E">Setting E</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">2. Threatening and dangerous:</label>
                    <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                      <option>Select setting...</option>
                      <option value="A">Setting A</option>
                      <option value="B">Setting B</option>
                      <option value="C">Setting C</option>
                      <option value="D">Setting D</option>
                      <option value="E">Setting E</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">3. Cozy and comforting:</label>
                    <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                      <option>Select setting...</option>
                      <option value="A">Setting A</option>
                      <option value="B">Setting B</option>
                      <option value="C">Setting C</option>
                      <option value="D">Setting D</option>
                      <option value="E">Setting E</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">4. Eerie and unsettling:</label>
                    <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                      <option>Select setting...</option>
                      <option value="A">Setting A</option>
                      <option value="B">Setting B</option>
                      <option value="C">Setting C</option>
                      <option value="D">Setting D</option>
                      <option value="E">Setting E</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">5. Gritty and foreboding:</label>
                    <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                      <option>Select setting...</option>
                      <option value="A">Setting A</option>
                      <option value="B">Setting B</option>
                      <option value="C">Setting C</option>
                      <option value="D">Setting D</option>
                      <option value="E">Setting E</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Check Matches
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-purple-50 px-4 py-2">
            <h4 className="font-medium text-purple-800">Activity 3: Create Contrasting Atmospheres</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              For each location below, write two contrasting descriptions that create different atmospheres or moods.
            </p>
            
            <div className="space-y-6">
              <div>
                <h5 className="font-medium text-gray-800 mb-2">Location 1: A school hallway</h5>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description A: Create a cheerful, energetic atmosphere</label>
                    <textarea
                      rows={4}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Describe the school hallway with a cheerful, energetic atmosphere..."
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description B: Create an eerie, abandoned atmosphere</label>
                    <textarea
                      rows={4}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Describe the same school hallway with an eerie, abandoned atmosphere..."
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div>
                <h5 className="font-medium text-gray-800 mb-2">Location 2: A beach</h5>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description A: Create a peaceful, relaxing atmosphere</label>
                    <textarea
                      rows={4}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Describe the beach with a peaceful, relaxing atmosphere..."
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description B: Create a threatening, dangerous atmosphere</label>
                    <textarea
                      rows={4}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Describe the same beach with a threatening, dangerous atmosphere..."
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Submit Descriptions
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-red-50 px-4 py-2">
            <h4 className="font-medium text-red-800">Activity 4: Create a Detailed Setting Description</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Choose one of the locations below and write a detailed setting description that establishes a specific mood. Include all five elements of setting and atmosphere.
            </p>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Choose a location:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="flex items-center">
                  <input id="loc1" name="location" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="loc1" className="ml-2 block text-sm text-gray-700">An abandoned amusement park</label>
                </div>
                <div className="flex items-center">
                  <input id="loc2" name="location" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="loc2" className="ml-2 block text-sm text-gray-700">A busy city market</label>
                </div>
                <div className="flex items-center">
                  <input id="loc3" name="location" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="loc3" className="ml-2 block text-sm text-gray-700">A library</label>
                </div>
                <div className="flex items-center">
                  <input id="loc4" name="location" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="loc4" className="ml-2 block text-sm text-gray-700">A forest clearing</label>
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Choose a mood to establish:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="flex items-center">
                  <input id="mood1" name="mood" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="mood1" className="ml-2 block text-sm text-gray-700">Mysterious</label>
                </div>
                <div className="flex items-center">
                  <input id="mood2" name="mood" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="mood2" className="ml-2 block text-sm text-gray-700">Joyful</label>
                </div>
                <div className="flex items-center">
                  <input id="mood3" name="mood" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="mood3" className="ml-2 block text-sm text-gray-700">Tense</label>
                </div>
                <div className="flex items-center">
                  <input id="mood4" name="mood" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="mood4" className="ml-2 block text-sm text-gray-700">Peaceful</label>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Setting Description:</label>
                <textarea
                  rows={10}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Write your detailed setting description here..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Elements included (check all that apply):</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <div className="flex items-center">
                    <input id="el1" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="el1" className="ml-2 block text-sm text-gray-700">Physical Location</label>
                  </div>
                  <div className="flex items-center">
                    <input id="el2" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="el2" className="ml-2 block text-sm text-gray-700">Time Period</label>
                  </div>
                  <div className="flex items-center">
                    <input id="el3" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="el3" className="ml-2 block text-sm text-gray-700">Sensory Details</label>
                  </div>
                  <div className="flex items-center">
                    <input id="el4" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="el4" className="ml-2 block text-sm text-gray-700">Mood & Atmosphere</label>
                  </div>
                  <div className="flex items-center">
                    <input id="el5" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="el5" className="ml-2 block text-sm text-gray-700">Symbolic Elements</label>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Self-Assessment:</label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input id="check1" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="check1" className="ml-2 block text-sm text-gray-700">I included specific details rather than general descriptions.</label>
                  </div>
                  <div className="flex items-center">
                    <input id="check2" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="check2" className="ml-2 block text-sm text-gray-700">I used sensory details beyond just visual descriptions.</label>
                  </div>
                  <div className="flex items-center">
                    <input id="check3" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="check3" className="ml-2 block text-sm text-gray-700">My description consistently establishes the chosen mood.</label>
                  </div>
                  <div className="flex items-center">
                    <input id="check4" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="check4" className="ml-2 block text-sm text-gray-700">I included at least one symbolic element.</label>
                  </div>
                  <div className="flex items-center">
                    <input id="check5" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="check5" className="ml-2 block text-sm text-gray-700">My description would help readers visualize the setting clearly.</label>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Submit Description
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
