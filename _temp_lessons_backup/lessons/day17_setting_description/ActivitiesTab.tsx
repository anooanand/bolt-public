import React from 'react';

export function ActivitiesTab() {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Interactive Activities</h3>
      
      <div className="bg-indigo-50 p-4 rounded-lg mb-6">
        <p className="text-gray-700">
          Complete these interactive activities to practice creating vivid, detailed setting descriptions that enhance your creative writing for the NSW Selective exam.
        </p>
      </div>
      
      <div className="space-y-8">
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-blue-50 px-4 py-2">
            <h4 className="font-medium text-blue-800">Activity 1: Analyze Setting Descriptions</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Read the following setting description and identify the elements that make it effective.
            </p>
            
            <div className="border p-3 rounded-lg mb-4 bg-gray-50">
              <p className="text-gray-700">
                The abandoned lighthouse stood sentinel on the rocky headland, its once-white paint now peeling away in long strips like old skin. Salt-laden winds whistled through cracks in the weathered door, creating an eerie, hollow moan that echoed up the spiral staircase. Inside, cobwebs draped from the ceiling like tattered lace curtains, and the floorboards groaned underfoot, protesting each step with decades of neglect. The air hung heavy with the tang of rust and seaweed, while shafts of dusty sunlight pierced through grimy windows, illuminating dancing motes in their golden beams. From the gallery at the top, the vast ocean stretched endlessly toward the horizon, its deep blue waters churning against jagged rocks below, sending up plumes of white spray that dissolved into mist. A pair of seagulls circled overhead, their mournful cries barely audible above the persistent crash of waves against the unyielding shore.
              </p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Identify the sensory details used in this description:</label>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center">
                      <input id="sight" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="sight" className="ml-2 block text-sm font-medium text-gray-700">Sight</label>
                    </div>
                    <textarea
                      rows={2}
                      className="mt-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="List examples of visual details from the passage..."
                    ></textarea>
                  </div>
                  
                  <div>
                    <div className="flex items-center">
                      <input id="sound" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="sound" className="ml-2 block text-sm font-medium text-gray-700">Sound</label>
                    </div>
                    <textarea
                      rows={2}
                      className="mt-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="List examples of sound details from the passage..."
                    ></textarea>
                  </div>
                  
                  <div>
                    <div className="flex items-center">
                      <input id="smell" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="smell" className="ml-2 block text-sm font-medium text-gray-700">Smell</label>
                    </div>
                    <textarea
                      rows={2}
                      className="mt-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="List examples of smell details from the passage..."
                    ></textarea>
                  </div>
                  
                  <div>
                    <div className="flex items-center">
                      <input id="touch" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="touch" className="ml-2 block text-sm font-medium text-gray-700">Touch</label>
                    </div>
                    <textarea
                      rows={2}
                      className="mt-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="List examples of touch details from the passage..."
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">What mood or atmosphere does this setting create?</label>
                <textarea
                  rows={3}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Describe the mood and explain how specific details contribute to it..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Identify three examples of specific details (not general statements) in this description:</label>
                <textarea
                  rows={3}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="List three specific details and explain why they're effective..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Find examples of movement or change in this setting:</label>
                <textarea
                  rows={2}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="List examples of how the setting shows movement or change..."
                ></textarea>
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
            <h4 className="font-medium text-green-800">Activity 2: Setting and Mood</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Match each mood with the setting details that would best create that atmosphere.
            </p>
            
            <div className="space-y-6">
              <div>
                <p className="text-gray-700 mb-2">1. Mysterious/Eerie:</p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input id="mood1a" name="mood1" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="mood1a" className="ml-2 block text-sm text-gray-700">A. Bright sunlight streamed through large windows, illuminating the polished wooden floors and cheerful yellow walls of the kitchen. The scent of freshly baked cookies filled the air.</label>
                  </div>
                  <div className="flex items-center">
                    <input id="mood1b" name="mood1" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="mood1b" className="ml-2 block text-sm text-gray-700">B. Shadows stretched across the narrow hallway as flickering candlelight barely penetrated the darkness. Portraits on the walls seemed to follow with their eyes, and unexplained creaks echoed from distant rooms.</label>
                  </div>
                  <div className="flex items-center">
                    <input id="mood1c" name="mood1" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="mood1c" className="ml-2 block text-sm text-gray-700">C. The bustling marketplace was alive with color and noise, as vendors shouted their wares and customers haggled over prices. Children darted between stalls, laughing and playing.</label>
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-gray-700 mb-2">2. Peaceful/Serene:</p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input id="mood2a" name="mood2" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="mood2a" className="ml-2 block text-sm text-gray-700">A. The mountain lake reflected the clear blue sky like a perfect mirror. Pine trees stood sentinel along the shore, their gentle whispers carried by the soft breeze. A lone eagle soared overhead in the vast silence.</label>
                  </div>
                  <div className="flex items-center">
                    <input id="mood2b" name="mood2" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="mood2b" className="ml-2 block text-sm text-gray-700">B. Car horns blared incessantly as vehicles jammed the intersection. Exhaust fumes hung in the hot air, and pedestrians pushed impatiently through the crowded sidewalks, everyone in a hurry to be somewhere else.</label>
                  </div>
                  <div className="flex items-center">
                    <input id="mood2c" name="mood2" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="mood2c" className="ml-2 block text-sm text-gray-700">C. The storm raged outside, lightning illuminating the room in brief, harsh flashes. Rain lashed against the windows like angry fingers demanding entry, and thunder shook the foundations of the house.</label>
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-gray-700 mb-2">3. Tense/Threatening:</p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input id="mood3a" name="mood3" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="mood3a" className="ml-2 block text-sm text-gray-700">A. The playground was filled with the sound of children's laughter. Colorful swings and slides stood against a backdrop of blooming spring flowers, and parents chatted amicably on nearby benches.</label>
                  </div>
                  <div className="flex items-center">
                    <input id="mood3b" name="mood3" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="mood3b" className="ml-2 block text-sm text-gray-700">B. The library was hushed except for the occasional turning of pages. Sunlight filtered through tall windows, casting warm patches on the worn carpet and illuminating dancing dust motes above the ancient bookshelves.</label>
                  </div>
                  <div className="flex items-center">
                    <input id="mood3c" name="mood3" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="mood3c" className="ml-2 block text-sm text-gray-700">C. The narrow alley ended in a brick wall, cutting off any escape route. Shadows deepened as the sun disappeared behind tall buildings, and the distant sound of footsteps grew louder, echoing between the graffiti-covered walls.</label>
                  </div>
                </div>
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
          <div className="bg-purple-50 px-4 py-2">
            <h4 className="font-medium text-purple-800">Activity 3: Transform Basic Setting Descriptions</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Transform each basic setting description into a vivid one by adding sensory details, specific language, and elements that create mood.
            </p>
            
            <div className="space-y-6">
              <div>
                <p className="text-gray-700 mb-2">1. Basic description: <span className="font-medium">"It was a classroom."</span></p>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your vivid setting description:</label>
                  <textarea
                    rows={5}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Transform this into a vivid setting description..."
                  ></textarea>
                </div>
                <div className="mt-2">
                  <label className="block text-xs text-gray-500 mb-1">Identify the techniques you used (select all that apply):</label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center">
                      <input id="tech1-1" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="tech1-1" className="ml-2 block text-xs text-gray-700">Sensory Details</label>
                    </div>
                    <div className="flex items-center">
                      <input id="tech1-2" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="tech1-2" className="ml-2 block text-xs text-gray-700">Specific Details</label>
                    </div>
                    <div className="flex items-center">
                      <input id="tech1-3" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="tech1-3" className="ml-2 block text-xs text-gray-700">Mood/Atmosphere</label>
                    </div>
                    <div className="flex items-center">
                      <input id="tech1-4" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="tech1-4" className="ml-2 block text-xs text-gray-700">Movement/Change</label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-gray-700 mb-2">2. Basic description: <span className="font-medium">"The forest was dark."</span></p>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your vivid setting description:</label>
                  <textarea
                    rows={5}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Transform this into a vivid setting description..."
                  ></textarea>
                </div>
                <div className="mt-2">
                  <label className="block text-xs text-gray-500 mb-1">Identify the techniques you used (select all that apply):</label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center">
                      <input id="tech2-1" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="tech2-1" className="ml-2 block text-xs text-gray-700">Sensory Details</label>
                    </div>
                    <div className="flex items-center">
                      <input id="tech2-2" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="tech2-2" className="ml-2 block text-xs text-gray-700">Specific Details</label>
                    </div>
                    <div className="flex items-center">
                      <input id="tech2-3" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="tech2-3" className="ml-2 block text-xs text-gray-700">Mood/Atmosphere</label>
                    </div>
                    <div className="flex items-center">
                      <input id="tech2-4" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="tech2-4" className="ml-2 block text-xs text-gray-700">Movement/Change</label>
                    </div>
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
            <h4 className="font-medium text-red-800">Activity 4: Create a Setting Description</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Write a detailed setting description that establishes a specific mood. Choose one of the settings and moods below.
            </p>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Choose a setting:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="flex items-center">
                  <input id="setting1" name="setting" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="setting1" className="ml-2 block text-sm text-gray-700">An abandoned amusement park</label>
                </div>
                <div className="flex items-center">
                  <input id="setting2" name="setting" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="setting2" className="ml-2 block text-sm text-gray-700">A busy city street at rush hour</label>
                </div>
                <div className="flex items-center">
                  <input id="setting3" name="setting" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="setting3" className="ml-2 block text-sm text-gray-700">A secret garden</label>
                </div>
                <div className="flex items-center">
                  <input id="setting4" name="setting" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="setting4" className="ml-2 block text-sm text-gray-700">Your own choice:</label>
                  <input type="text" className="ml-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="Enter a setting..." />
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Choose a mood to establish:</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <div className="flex items-center">
                  <input id="mood1" name="mood" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="mood1" className="ml-2 block text-sm text-gray-700">Mysterious/Eerie</label>
                </div>
                <div className="flex items-center">
                  <input id="mood2" name="mood" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="mood2" className="ml-2 block text-sm text-gray-700">Peaceful/Serene</label>
                </div>
                <div className="flex items-center">
                  <input id="mood3" name="mood" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="mood3" className="ml-2 block text-sm text-gray-700">Tense/Threatening</label>
                </div>
                <div className="flex items-center">
                  <input id="mood4" name="mood" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="mood4" className="ml-2 block text-sm text-gray-700">Joyful/Celebratory</label>
                </div>
                <div className="flex items-center">
                  <input id="mood5" name="mood" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="mood5" className="ml-2 block text-sm text-gray-700">Melancholy/Nostalgic</label>
                </div>
                <div className="flex items-center">
                  <input id="mood6" name="mood" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="mood6" className="ml-2 block text-sm text-gray-700">Your own choice:</label>
                  <input type="text" className="ml-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="Enter a mood..." />
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your setting description:</label>
                <textarea
                  rows={10}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Write your detailed setting description here..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Self-Assessment Checklist:</label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input id="check1" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="check1" className="ml-2 block text-sm text-gray-700">I included at least three different sensory details (sight, sound, smell, taste, touch).</label>
                  </div>
                  <div className="flex items-center">
                    <input id="check2" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="check2" className="ml-2 block text-sm text-gray-700">I used specific, concrete details rather than vague generalizations.</label>
                  </div>
                  <div className="flex items-center">
                    <input id="check3" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="check3" className="ml-2 block text-sm text-gray-700">My description creates the mood I intended.</label>
                  </div>
                  <div className="flex items-center">
                    <input id="check4" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="check4" className="ml-2 block text-sm text-gray-700">I included elements of movement or change in my setting.</label>
                  </div>
                  <div className="flex items-center">
                    <input id="check5" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="check5" className="ml-2 block text-sm text-gray-700">I used figurative language (simile, metaphor, personification) to enhance my description.</label>
                  </div>
                  <div className="flex items-center">
                    <input id="check6" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="check6" className="ml-2 block text-sm text-gray-700">I organized my description in a logical way (spatial, chronological, or by importance).</label>
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
