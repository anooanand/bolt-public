import React from 'react';

export function ActivitiesTab() {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Interactive Activities</h3>
      
      <div className="bg-indigo-50 p-4 rounded-lg mb-6">
        <p className="text-gray-700">
          Complete these interactive activities to reinforce your understanding of descriptive language. These exercises will help you develop the skills needed to create vivid imagery in your NSW Selective exam writing.
        </p>
      </div>
      
      <div className="space-y-8">
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-blue-50 px-4 py-2">
            <h4 className="font-medium text-blue-800">Activity 1: Identify the Sensory Details</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Read the passage below and identify which sensory details (sight, sound, smell, taste, touch) are used in each highlighted phrase.
            </p>
            
            <div className="border p-3 rounded-lg mb-4 bg-gray-50">
              <p className="text-gray-700">
                As I entered the bustling market, <span className="bg-yellow-100">(1) the vibrant colors of fresh produce</span> immediately caught my eye. <span className="bg-yellow-100">(2) The rhythmic calls of vendors</span> filled the air, competing with <span className="bg-yellow-100">(3) the sizzling sound of street food</span> being prepared. I made my way through the crowd, <span className="bg-yellow-100">(4) the rough cobblestones beneath my feet</span> reminding me of the market's ancient history. <span className="bg-yellow-100">(5) The sweet aroma of ripe mangoes</span> drew me to a fruit stall where I purchased one. <span className="bg-yellow-100">(6) The juicy flesh burst with tangy sweetness</span> as I took my first bite, making the visit worthwhile.
              </p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">(1) "the vibrant colors of fresh produce"</label>
                <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option>Select sense...</option>
                  <option value="sight">Sight (Visual)</option>
                  <option value="sound">Sound (Auditory)</option>
                  <option value="smell">Smell (Olfactory)</option>
                  <option value="taste">Taste (Gustatory)</option>
                  <option value="touch">Touch (Tactile)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">(2) "The rhythmic calls of vendors"</label>
                <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option>Select sense...</option>
                  <option value="sight">Sight (Visual)</option>
                  <option value="sound">Sound (Auditory)</option>
                  <option value="smell">Smell (Olfactory)</option>
                  <option value="taste">Taste (Gustatory)</option>
                  <option value="touch">Touch (Tactile)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">(3) "the sizzling sound of street food"</label>
                <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option>Select sense...</option>
                  <option value="sight">Sight (Visual)</option>
                  <option value="sound">Sound (Auditory)</option>
                  <option value="smell">Smell (Olfactory)</option>
                  <option value="taste">Taste (Gustatory)</option>
                  <option value="touch">Touch (Tactile)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">(4) "the rough cobblestones beneath my feet"</label>
                <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option>Select sense...</option>
                  <option value="sight">Sight (Visual)</option>
                  <option value="sound">Sound (Auditory)</option>
                  <option value="smell">Smell (Olfactory)</option>
                  <option value="taste">Taste (Gustatory)</option>
                  <option value="touch">Touch (Tactile)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">(5) "The sweet aroma of ripe mangoes"</label>
                <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option>Select sense...</option>
                  <option value="sight">Sight (Visual)</option>
                  <option value="sound">Sound (Auditory)</option>
                  <option value="smell">Smell (Olfactory)</option>
                  <option value="taste">Taste (Gustatory)</option>
                  <option value="touch">Touch (Tactile)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">(6) "The juicy flesh burst with tangy sweetness"</label>
                <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option>Select sense...</option>
                  <option value="sight">Sight (Visual)</option>
                  <option value="sound">Sound (Auditory)</option>
                  <option value="smell">Smell (Olfactory)</option>
                  <option value="taste">Taste (Gustatory)</option>
                  <option value="touch">Touch (Tactile)</option>
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
            <h4 className="font-medium text-green-800">Activity 2: Enhance Generic Descriptions</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Rewrite each generic sentence with vivid sensory details to make it more engaging and descriptive.
            </p>
            
            <div className="space-y-6">
              <div>
                <p className="text-gray-700 mb-2">1. Generic: <span className="font-medium">The beach was nice.</span></p>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Enhanced description:</label>
                  <textarea
                    rows={3}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Rewrite with vivid sensory details..."
                  ></textarea>
                </div>
                <div className="mt-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Which senses did you include? (Select all that apply)</label>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                    <div className="flex items-center">
                      <input id="s1-sight" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="s1-sight" className="ml-2 block text-sm text-gray-700">Sight</label>
                    </div>
                    <div className="flex items-center">
                      <input id="s1-sound" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="s1-sound" className="ml-2 block text-sm text-gray-700">Sound</label>
                    </div>
                    <div className="flex items-center">
                      <input id="s1-smell" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="s1-smell" className="ml-2 block text-sm text-gray-700">Smell</label>
                    </div>
                    <div className="flex items-center">
                      <input id="s1-taste" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="s1-taste" className="ml-2 block text-sm text-gray-700">Taste</label>
                    </div>
                    <div className="flex items-center">
                      <input id="s1-touch" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="s1-touch" className="ml-2 block text-sm text-gray-700">Touch</label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-gray-700 mb-2">2. Generic: <span className="font-medium">The food tasted good.</span></p>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Enhanced description:</label>
                  <textarea
                    rows={3}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Rewrite with vivid sensory details..."
                  ></textarea>
                </div>
                <div className="mt-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Which senses did you include? (Select all that apply)</label>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                    <div className="flex items-center">
                      <input id="s2-sight" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="s2-sight" className="ml-2 block text-sm text-gray-700">Sight</label>
                    </div>
                    <div className="flex items-center">
                      <input id="s2-sound" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="s2-sound" className="ml-2 block text-sm text-gray-700">Sound</label>
                    </div>
                    <div className="flex items-center">
                      <input id="s2-smell" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="s2-smell" className="ml-2 block text-sm text-gray-700">Smell</label>
                    </div>
                    <div className="flex items-center">
                      <input id="s2-taste" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="s2-taste" className="ml-2 block text-sm text-gray-700">Taste</label>
                    </div>
                    <div className="flex items-center">
                      <input id="s2-touch" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="s2-touch" className="ml-2 block text-sm text-gray-700">Touch</label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-gray-700 mb-2">3. Generic: <span className="font-medium">The storm was scary.</span></p>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Enhanced description:</label>
                  <textarea
                    rows={3}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Rewrite with vivid sensory details..."
                  ></textarea>
                </div>
                <div className="mt-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Which senses did you include? (Select all that apply)</label>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                    <div className="flex items-center">
                      <input id="s3-sight" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="s3-sight" className="ml-2 block text-sm text-gray-700">Sight</label>
                    </div>
                    <div className="flex items-center">
                      <input id="s3-sound" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="s3-sound" className="ml-2 block text-sm text-gray-700">Sound</label>
                    </div>
                    <div className="flex items-center">
                      <input id="s3-smell" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="s3-smell" className="ml-2 block text-sm text-gray-700">Smell</label>
                    </div>
                    <div className="flex items-center">
                      <input id="s3-taste" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="s3-taste" className="ml-2 block text-sm text-gray-700">Taste</label>
                    </div>
                    <div className="flex items-center">
                      <input id="s3-touch" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="s3-touch" className="ml-2 block text-sm text-gray-700">Touch</label>
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
          <div className="bg-purple-50 px-4 py-2">
            <h4 className="font-medium text-purple-800">Activity 3: Sensory Detail Generator</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              For each scenario, write specific sensory details that could be included in a descriptive paragraph.
            </p>
            
            <div className="space-y-6">
              <div>
                <h5 className="font-medium text-gray-800 mb-2">Scenario 1: A busy school cafeteria at lunchtime</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-blue-800 mb-1">Visual details (sight):</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="What can be seen..."
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-green-800 mb-1">Auditory details (sound):</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="What can be heard..."
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-purple-800 mb-1">Olfactory details (smell):</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="What can be smelled..."
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-red-800 mb-1">Gustatory details (taste):</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="What can be tasted..."
                    ></textarea>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-yellow-800 mb-1">Tactile details (touch):</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="What can be felt..."
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div>
                <h5 className="font-medium text-gray-800 mb-2">Scenario 2: A garden after rainfall</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-blue-800 mb-1">Visual details (sight):</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="What can be seen..."
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-green-800 mb-1">Auditory details (sound):</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="What can be heard..."
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-purple-800 mb-1">Olfactory details (smell):</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="What can be smelled..."
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-red-800 mb-1">Gustatory details (taste):</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="What can be tasted..."
                    ></textarea>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-yellow-800 mb-1">Tactile details (touch):</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="What can be felt..."
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Submit Details
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-red-50 px-4 py-2">
            <h4 className="font-medium text-red-800">Activity 4: Create a Five-Senses Paragraph</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Write a descriptive paragraph about one of the topics below, incorporating details from all five senses.
            </p>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Choose a topic:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="flex items-center">
                  <input id="topic1" name="topic" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="topic1" className="ml-2 block text-sm text-gray-700">A crowded sporting event</label>
                </div>
                <div className="flex items-center">
                  <input id="topic2" name="topic" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="topic2" className="ml-2 block text-sm text-gray-700">A favorite holiday celebration</label>
                </div>
                <div className="flex items-center">
                  <input id="topic3" name="topic" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="topic3" className="ml-2 block text-sm text-gray-700">A visit to the beach</label>
                </div>
                <div className="flex items-center">
                  <input id="topic4" name="topic" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="topic4" className="ml-2 block text-sm text-gray-700">A bustling city street</label>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your descriptive paragraph:</label>
                <textarea
                  rows={8}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Write your paragraph here, incorporating details from all five senses..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Highlight the sensory details you included:</label>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-blue-800 mb-1">Visual details:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="List visual details..."
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-green-800 mb-1">Auditory details:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="List sound details..."
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-purple-800 mb-1">Olfactory details:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="List smell details..."
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-red-800 mb-1">Gustatory details:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="List taste details..."
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-yellow-800 mb-1">Tactile details:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="List touch details..."
                    ></textarea>
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
