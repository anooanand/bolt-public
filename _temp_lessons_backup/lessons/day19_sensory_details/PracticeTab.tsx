import React from 'react';

export function PracticeTab() {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Practice Task: Sensory Details</h3>
      
      <div className="bg-indigo-50 p-4 rounded-lg mb-6">
        <p className="text-gray-700">
          Now it's time to apply what you've learned about sensory details! In this practice task, you'll identify sensory details in example passages, add sensory details to basic descriptions, and write a descriptive paragraph using all five senses.
        </p>
      </div>
      
      <div className="space-y-6">
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-blue-50 px-4 py-3">
            <h4 className="font-medium text-blue-800">Part 1: Identify Sensory Details</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Read the following passage and identify the sensory details used for each of the five senses.
            </p>
            
            <div className="border p-4 rounded-lg mb-4 bg-gray-50">
              <p className="text-gray-800 italic">
                The moment Maya stepped into the night market, her senses were overwhelmed. Colorful paper lanterns swayed overhead, casting a warm glow on the bustling crowd below. Vendors called out from their stalls, their voices competing with the sizzle of frying dumplings and the upbeat melody from a street musician's erhu. The aroma of five-spice powder and caramelized sugar hung in the humid air, occasionally punctuated by the sharp scent of chili oil that made her nose tingle. Maya's mouth watered as she accepted a sample of moon cake, the sweet lotus paste melting on her tongue, contrasting with the slightly bitter tea she sipped to wash it down. She navigated through the narrow pathways, brushing past silks and rough canvas awnings, her sandals sticking slightly to the cobblestones still damp from an earlier rain shower. A light breeze provided momentary relief from the press of bodies around her, cooling the thin sheen of perspiration on her skin.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Identify visual details (sight):</p>
                <textarea
                  rows={3}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="List at least 3 visual details from the passage..."
                ></textarea>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Identify auditory details (sound):</p>
                <textarea
                  rows={3}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="List at least 3 sound details from the passage..."
                ></textarea>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Identify olfactory details (smell):</p>
                <textarea
                  rows={3}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="List at least 2 smell details from the passage..."
                ></textarea>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Identify gustatory details (taste):</p>
                <textarea
                  rows={3}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="List at least 2 taste details from the passage..."
                ></textarea>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Identify tactile details (touch):</p>
                <textarea
                  rows={3}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="List at least 3 touch details from the passage..."
                ></textarea>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Which sense creates the strongest impression in this passage? Why?</p>
                <textarea
                  rows={3}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Explain which sense you think is most vividly portrayed and why..."
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-green-50 px-4 py-3">
            <h4 className="font-medium text-green-800">Part 2: Add Sensory Details</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Transform these basic descriptions by adding rich sensory details for each of the five senses.
            </p>
            
            <div className="space-y-4">
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Basic description 1:</p>
                <div className="bg-gray-100 p-2 rounded mb-2">
                  <p className="text-gray-700 italic">It was raining in the forest.</p>
                </div>
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm text-gray-700">Add visual details (sight):</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="What could be seen in this rainy forest?"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700">Add auditory details (sound):</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="What sounds would be heard in this rainy forest?"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700">Add olfactory details (smell):</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="What smells would be present in this rainy forest?"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700">Add tactile details (touch):</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="What tactile sensations would be felt in this rainy forest?"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700">Add gustatory details (taste) - be creative:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="What taste sensations might be experienced in this rainy forest?"
                    ></textarea>
                  </div>
                </div>
                <div className="mt-3">
                  <label className="block text-sm text-gray-700">Your complete sensory-rich description:</label>
                  <textarea
                    rows={6}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md mt-1"
                    placeholder="Combine your sensory details into a cohesive paragraph..."
                  ></textarea>
                </div>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Basic description 2:</p>
                <div className="bg-gray-100 p-2 rounded mb-2">
                  <p className="text-gray-700 italic">The bakery was busy in the morning.</p>
                </div>
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm text-gray-700">Add visual details (sight):</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="What could be seen in this busy bakery?"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700">Add auditory details (sound):</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="What sounds would be heard in this busy bakery?"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700">Add olfactory details (smell):</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="What smells would be present in this busy bakery?"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700">Add tactile details (touch):</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="What tactile sensations would be felt in this busy bakery?"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700">Add gustatory details (taste):</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="What taste sensations might be experienced in this busy bakery?"
                    ></textarea>
                  </div>
                </div>
                <div className="mt-3">
                  <label className="block text-sm text-gray-700">Your complete sensory-rich description:</label>
                  <textarea
                    rows={6}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md mt-1"
                    placeholder="Combine your sensory details into a cohesive paragraph..."
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-purple-50 px-4 py-3">
            <h4 className="font-medium text-purple-800">Part 3: Write a Sensory-Rich Paragraph</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Write a descriptive paragraph using all five senses. Choose one of the following settings.
            </p>
            
            <div className="bg-gray-50 p-3 rounded-lg mb-4">
              <p className="text-gray-800 font-medium">Choose one setting:</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
                <div className="flex items-center">
                  <input type="radio" name="setting" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300" />
                  <label className="ml-2 block text-sm text-gray-700">A crowded beach on a hot summer day</label>
                </div>
                <div className="flex items-center">
                  <input type="radio" name="setting" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300" />
                  <label className="ml-2 block text-sm text-gray-700">A kitchen during a family holiday dinner</label>
                </div>
                <div className="flex items-center">
                  <input type="radio" name="setting" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300" />
                  <label className="ml-2 block text-sm text-gray-700">An old library on a rainy afternoon</label>
                </div>
                <div className="flex items-center">
                  <input type="radio" name="setting" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300" />
                  <label className="ml-2 block text-sm text-gray-700">A carnival or amusement park at night</label>
                </div>
                <div className="flex items-center">
                  <input type="radio" name="setting" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300" />
                  <label className="ml-2 block text-sm text-gray-700">A garden in spring</label>
                </div>
                <div className="flex items-center">
                  <input type="radio" name="setting" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300" />
                  <label className="ml-2 block text-sm text-gray-700">Your own choice</label>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Planning your sensory-rich paragraph:</p>
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm text-gray-700">Visual details to include (sight):</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="List at least 3 visual details you'll include..."
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700">Auditory details to include (sound):</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="List at least 3 sound details you'll include..."
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700">Olfactory details to include (smell):</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="List at least 2 smell details you'll include..."
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700">Gustatory details to include (taste):</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="List at least 1 taste detail you'll include..."
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700">Tactile details to include (touch):</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="List at least 3 touch details you'll include..."
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your sensory-rich paragraph:</label>
                <textarea
                  rows={12}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Write your paragraph here, incorporating all five senses to create a vivid, immersive experience..."
                ></textarea>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-sm font-medium text-gray-700 mb-2">Self-assessment:</p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                    <label className="ml-2 block text-sm text-gray-700">I included at least 3 visual details (sight)</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                    <label className="ml-2 block text-sm text-gray-700">I included at least 3 auditory details (sound)</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                    <label className="ml-2 block text-sm text-gray-700">I included at least 2 olfactory details (smell)</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                    <label className="ml-2 block text-sm text-gray-700">I included at least 1 gustatory detail (taste)</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                    <label className="ml-2 block text-sm text-gray-700">I included at least 3 tactile details (touch)</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                    <label className="ml-2 block text-sm text-gray-700">My details are specific and vivid rather than generic</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                    <label className="ml-2 block text-sm text-gray-700">My paragraph flows naturally and creates a cohesive experience</label>
                  </div>
                </div>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Reflection:</p>
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm text-gray-700">Which sense was easiest for you to incorporate? Why?</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700">Which sense was most challenging to incorporate? Why?</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700">How did incorporating all five senses enhance your description?</label>
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
