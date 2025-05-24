import React from 'react';

export function PracticeTab() {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Practice Task: Descriptive Writing Basics</h3>
      
      <div className="bg-indigo-50 p-4 rounded-lg mb-6">
        <p className="text-gray-700">
          Now it's time to apply what you've learned about descriptive writing! In this practice task, you'll analyze descriptive passages, transform basic descriptions into vivid ones, and write your own descriptive paragraph using all five senses.
        </p>
      </div>
      
      <div className="space-y-6">
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-blue-50 px-4 py-3">
            <h4 className="font-medium text-blue-800">Part 1: Analyze Descriptive Passages</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Read the following descriptive passage and identify the techniques used to create vivid imagery.
            </p>
            
            <div className="border p-4 rounded-lg mb-4 bg-gray-50">
              <p className="text-gray-800 italic">
                The ancient lighthouse stood sentinel on the jagged cliff, its weathered stone face bearing the scars of a thousand storms. Salt-laden winds whipped around its circular tower, whistling through tiny cracks in the mortar. Inside, the spiral staircase wound upward like the shell of some massive sea creature, each step worn smooth by generations of keepers' boots. At the summit, the great lantern room gleamed with polished brass and crystal, its light slicing through the gathering dusk like a golden blade. Far below, the ocean hurled itself against the rocks, sending plumes of icy spray skyward before retreating with a sound like distant thunder.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Identify three examples of sensory details in the passage:</p>
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm text-gray-700">Sight:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="What visual details can you find?"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700">Sound:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="What auditory details can you find?"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700">Touch/Feel:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="What tactile details can you find?"
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Identify examples of specific language:</p>
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm text-gray-700">Precise nouns (2 examples):</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700">Powerful verbs (2 examples):</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700">Specific adjectives (2 examples):</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Identify examples of figurative language:</p>
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm text-gray-700">Simile or metaphor:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Find an example of a comparison..."
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700">Personification:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Find an example where a non-human thing is given human qualities..."
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">How is the description organized?</p>
                <div className="mt-1 space-y-1">
                  <div className="flex items-center">
                    <input type="radio" name="organization" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300" />
                    <label className="ml-2 block text-sm text-gray-700">Spatial (from one location to another)</label>
                  </div>
                  <div className="flex items-center">
                    <input type="radio" name="organization" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300" />
                    <label className="ml-2 block text-sm text-gray-700">Chronological (in time order)</label>
                  </div>
                  <div className="flex items-center">
                    <input type="radio" name="organization" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300" />
                    <label className="ml-2 block text-sm text-gray-700">Order of importance</label>
                  </div>
                </div>
                <div className="mt-2">
                  <label className="block text-sm text-gray-700">Explain your answer:</label>
                  <textarea
                    rows={2}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-green-50 px-4 py-3">
            <h4 className="font-medium text-green-800">Part 2: Transform Basic Descriptions</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Transform these basic descriptions into vivid, engaging ones using the techniques you've learned.
            </p>
            
            <div className="space-y-4">
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Basic description 1:</p>
                <div className="bg-gray-100 p-2 rounded mb-2">
                  <p className="text-gray-700 italic">The old man was tired.</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-700">Your vivid description (show, don't tell):</label>
                  <textarea
                    rows={4}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Transform this using specific details that show his tiredness..."
                  ></textarea>
                </div>
                <div className="mt-2 space-y-1">
                  <p className="text-sm text-gray-700">Techniques used (check all that apply):</p>
                  <div className="flex flex-wrap gap-2">
                    <div className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                      <label className="ml-1 text-xs text-gray-700">Sensory details</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                      <label className="ml-1 text-xs text-gray-700">Specific language</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                      <label className="ml-1 text-xs text-gray-700">Simile/Metaphor</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                      <label className="ml-1 text-xs text-gray-700">Personification</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                      <label className="ml-1 text-xs text-gray-700">Show, don't tell</label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Basic description 2:</p>
                <div className="bg-gray-100 p-2 rounded mb-2">
                  <p className="text-gray-700 italic">It was a hot day at the beach.</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-700">Your vivid description (use sensory details):</label>
                  <textarea
                    rows={4}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Transform this using all five senses..."
                  ></textarea>
                </div>
                <div className="mt-2 space-y-1">
                  <p className="text-sm text-gray-700">Senses included (check all that apply):</p>
                  <div className="flex flex-wrap gap-2">
                    <div className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                      <label className="ml-1 text-xs text-gray-700">Sight</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                      <label className="ml-1 text-xs text-gray-700">Sound</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                      <label className="ml-1 text-xs text-gray-700">Smell</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                      <label className="ml-1 text-xs text-gray-700">Taste</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                      <label className="ml-1 text-xs text-gray-700">Touch</label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Basic description 3:</p>
                <div className="bg-gray-100 p-2 rounded mb-2">
                  <p className="text-gray-700 italic">The abandoned house was scary.</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-700">Your vivid description (use figurative language):</label>
                  <textarea
                    rows={4}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Transform this using similes, metaphors, and/or personification..."
                  ></textarea>
                </div>
                <div className="mt-2 space-y-1">
                  <p className="text-sm text-gray-700">Figurative language used (check all that apply):</p>
                  <div className="flex flex-wrap gap-2">
                    <div className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                      <label className="ml-1 text-xs text-gray-700">Simile</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                      <label className="ml-1 text-xs text-gray-700">Metaphor</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                      <label className="ml-1 text-xs text-gray-700">Personification</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                      <label className="ml-1 text-xs text-gray-700">Hyperbole</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                      <label className="ml-1 text-xs text-gray-700">Imagery</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-purple-50 px-4 py-3">
            <h4 className="font-medium text-purple-800">Part 3: Write a Descriptive Paragraph</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Write a descriptive paragraph about one of the following places, using all five senses and at least three different descriptive techniques.
            </p>
            
            <div className="bg-gray-50 p-3 rounded-lg mb-4">
              <p className="text-gray-800 font-medium">Choose one:</p>
              <ul className="list-disc pl-5 text-gray-700">
                <li>A busy school cafeteria at lunchtime</li>
                <li>A peaceful garden in the early morning</li>
                <li>A crowded shopping mall during holiday season</li>
                <li>An empty playground after dark</li>
                <li>A hospital waiting room</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Selected place:</label>
                <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option>Select a place...</option>
                  <option>A busy school cafeteria at lunchtime</option>
                  <option>A peaceful garden in the early morning</option>
                  <option>A crowded shopping mall during holiday season</option>
                  <option>An empty playground after dark</option>
                  <option>A hospital waiting room</option>
                </select>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Planning your description:</p>
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm text-gray-700">Sight details (What can be seen?):</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700">Sound details (What can be heard?):</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700">Smell details (What scents are present?):</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700">Taste details (What tastes might be experienced?):</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700">Touch details (What textures or feelings?):</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Descriptive techniques to include:</p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                    <label className="ml-2 block text-sm text-gray-700">Simile or metaphor</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                    <label className="ml-2 block text-sm text-gray-700">Personification</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                    <label className="ml-2 block text-sm text-gray-700">Specific nouns, verbs, and adjectives</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                    <label className="ml-2 block text-sm text-gray-700">Show, don't tell</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                    <label className="ml-2 block text-sm text-gray-700">Purposeful organization (spatial, chronological, etc.)</label>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your descriptive paragraph:</label>
                <textarea
                  rows={10}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Write your descriptive paragraph here, using all five senses and at least three different descriptive techniques..."
                ></textarea>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-sm font-medium text-gray-700 mb-2">Self-assessment:</p>
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm text-gray-700">Which descriptive technique do you think you used most effectively?</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700">Which sense was the most challenging to incorporate, and why?</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700">How could you improve your descriptive paragraph?</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    ></textarea>
                  </div>
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
