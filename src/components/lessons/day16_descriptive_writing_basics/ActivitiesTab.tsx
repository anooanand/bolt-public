import React from 'react';

export function ActivitiesTab() {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Interactive Activities</h3>
      
      <div className="bg-indigo-50 p-4 rounded-lg mb-6">
        <p className="text-gray-700">
          Complete these interactive activities to reinforce your understanding of descriptive writing fundamentals. These exercises will help you use vivid language to create engaging imagery in your NSW Selective exam responses.
        </p>
      </div>
      
      <div className="space-y-8">
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-blue-50 px-4 py-2">
            <h4 className="font-medium text-blue-800">Activity 1: Identify Sensory Details</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Read the descriptive passage below and identify which sensory details (sight, sound, smell, taste, touch) are used.
            </p>
            
            <div className="border p-3 rounded-lg mb-4 bg-gray-50">
              <p className="text-gray-700">
                The morning sun filtered through the dense canopy, casting dappled shadows on the forest floor. A gentle breeze rustled the leaves overhead, carrying with it the earthy scent of moss and damp soil. I ran my fingers along the rough bark of an ancient oak tree, feeling its deep grooves and weathered texture. In the distance, birds called to one another in melodic chirps while a nearby stream bubbled over smooth stones. I paused to pick a wild berry, its sweet-tart flavor bursting across my tongue as I continued my hike through the wilderness.
              </p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Identify all the sensory details in the passage (select all that apply and provide examples):</label>
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
                      <input id="taste" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="taste" className="ml-2 block text-sm font-medium text-gray-700">Taste</label>
                    </div>
                    <textarea
                      rows={2}
                      className="mt-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="List examples of taste details from the passage..."
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
            <h4 className="font-medium text-green-800">Activity 2: Identify Specific Language</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              For each sentence pair below, identify which one uses more specific language and explain why it's more effective.
            </p>
            
            <div className="space-y-6">
              <div>
                <p className="text-gray-700 mb-2">Pair 1:</p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input id="pair1a" name="pair1" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="pair1a" className="ml-2 block text-sm text-gray-700">A. The man walked across the street.</label>
                  </div>
                  <div className="flex items-center">
                    <input id="pair1b" name="pair1" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="pair1b" className="ml-2 block text-sm text-gray-700">B. The elderly gentleman shuffled across the busy intersection, leaning heavily on his carved mahogany cane.</label>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mt-2 mb-1">Explain why your choice is more effective:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Explain your reasoning..."
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-gray-700 mb-2">Pair 2:</p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input id="pair2a" name="pair2" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="pair2a" className="ml-2 block text-sm text-gray-700">A. The sunset painted the western sky with brilliant hues of crimson and gold, casting long shadows across the tranquil valley.</label>
                  </div>
                  <div className="flex items-center">
                    <input id="pair2b" name="pair2" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="pair2b" className="ml-2 block text-sm text-gray-700">B. The sun went down and it looked nice.</label>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mt-2 mb-1">Explain why your choice is more effective:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Explain your reasoning..."
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-gray-700 mb-2">Pair 3:</p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input id="pair3a" name="pair3" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="pair3a" className="ml-2 block text-sm text-gray-700">A. The food was good.</label>
                  </div>
                  <div className="flex items-center">
                    <input id="pair3b" name="pair3" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="pair3b" className="ml-2 block text-sm text-gray-700">B. The homemade lasagna melted in my mouth, its layers of perfectly al dente pasta, savory meat sauce, and creamy ricotta creating a symphony of Italian flavors.</label>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mt-2 mb-1">Explain why your choice is more effective:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Explain your reasoning..."
                    ></textarea>
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
            <h4 className="font-medium text-purple-800">Activity 3: Transform Basic Descriptions</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Transform each basic description into a vivid one by adding sensory details, specific language, and figurative language.
            </p>
            
            <div className="space-y-6">
              <div>
                <p className="text-gray-700 mb-2">1. Basic description: <span className="font-medium">"The beach was beautiful."</span></p>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your vivid description:</label>
                  <textarea
                    rows={4}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Transform this into a vivid description with sensory details..."
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
                      <label htmlFor="tech1-2" className="ml-2 block text-xs text-gray-700">Specific Language</label>
                    </div>
                    <div className="flex items-center">
                      <input id="tech1-3" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="tech1-3" className="ml-2 block text-xs text-gray-700">Figurative Language</label>
                    </div>
                    <div className="flex items-center">
                      <input id="tech1-4" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="tech1-4" className="ml-2 block text-xs text-gray-700">Show, Don't Tell</label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-gray-700 mb-2">2. Basic description: <span className="font-medium">"The old house was scary."</span></p>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your vivid description:</label>
                  <textarea
                    rows={4}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Transform this into a vivid description with sensory details..."
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
                      <label htmlFor="tech2-2" className="ml-2 block text-xs text-gray-700">Specific Language</label>
                    </div>
                    <div className="flex items-center">
                      <input id="tech2-3" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="tech2-3" className="ml-2 block text-xs text-gray-700">Figurative Language</label>
                    </div>
                    <div className="flex items-center">
                      <input id="tech2-4" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="tech2-4" className="ml-2 block text-xs text-gray-700">Show, Don't Tell</label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-gray-700 mb-2">3. Basic description: <span className="font-medium">"The girl was happy about her birthday."</span></p>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your vivid description:</label>
                  <textarea
                    rows={4}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Transform this into a vivid description with sensory details..."
                  ></textarea>
                </div>
                <div className="mt-2">
                  <label className="block text-xs text-gray-500 mb-1">Identify the techniques you used (select all that apply):</label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center">
                      <input id="tech3-1" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="tech3-1" className="ml-2 block text-xs text-gray-700">Sensory Details</label>
                    </div>
                    <div className="flex items-center">
                      <input id="tech3-2" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="tech3-2" className="ml-2 block text-xs text-gray-700">Specific Language</label>
                    </div>
                    <div className="flex items-center">
                      <input id="tech3-3" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="tech3-3" className="ml-2 block text-xs text-gray-700">Figurative Language</label>
                    </div>
                    <div className="flex items-center">
                      <input id="tech3-4" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="tech3-4" className="ml-2 block text-xs text-gray-700">Show, Don't Tell</label>
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
            <h4 className="font-medium text-red-800">Activity 4: Write a Descriptive Paragraph</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Write a descriptive paragraph about one of the places below. Use all five senses and incorporate specific language, figurative language, and the "show, don't tell" technique.
            </p>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Choose a place to describe:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="flex items-center">
                  <input id="place1" name="place" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="place1" className="ml-2 block text-sm text-gray-700">A busy school cafeteria at lunchtime</label>
                </div>
                <div className="flex items-center">
                  <input id="place2" name="place" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="place2" className="ml-2 block text-sm text-gray-700">A peaceful garden in the morning</label>
                </div>
                <div className="flex items-center">
                  <input id="place3" name="place" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="place3" className="ml-2 block text-sm text-gray-700">A crowded shopping mall during a sale</label>
                </div>
                <div className="flex items-center">
                  <input id="place4" name="place" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="place4" className="ml-2 block text-sm text-gray-700">Your own choice:</label>
                  <input type="text" className="ml-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="Enter a place..." />
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your descriptive paragraph:</label>
                <textarea
                  rows={10}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Write your descriptive paragraph here..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Self-Assessment Checklist:</label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input id="check1" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="check1" className="ml-2 block text-sm text-gray-700">I included visual details (what things look like).</label>
                  </div>
                  <div className="flex items-center">
                    <input id="check2" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="check2" className="ml-2 block text-sm text-gray-700">I included sound details (what things sound like).</label>
                  </div>
                  <div className="flex items-center">
                    <input id="check3" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="check3" className="ml-2 block text-sm text-gray-700">I included smell details (what things smell like).</label>
                  </div>
                  <div className="flex items-center">
                    <input id="check4" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="check4" className="ml-2 block text-sm text-gray-700">I included taste details (what things taste like).</label>
                  </div>
                  <div className="flex items-center">
                    <input id="check5" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="check5" className="ml-2 block text-sm text-gray-700">I included touch details (what things feel like).</label>
                  </div>
                  <div className="flex items-center">
                    <input id="check6" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="check6" className="ml-2 block text-sm text-gray-700">I used specific nouns, verbs, and adjectives.</label>
                  </div>
                  <div className="flex items-center">
                    <input id="check7" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="check7" className="ml-2 block text-sm text-gray-700">I included at least one example of figurative language (simile, metaphor, personification).</label>
                  </div>
                  <div className="flex items-center">
                    <input id="check8" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="check8" className="ml-2 block text-sm text-gray-700">I organized my description in a logical way (spatial, chronological, or by importance).</label>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Submit Paragraph
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
