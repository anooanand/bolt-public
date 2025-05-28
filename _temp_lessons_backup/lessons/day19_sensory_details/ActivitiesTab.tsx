import React from 'react';

export function ActivitiesTab() {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Interactive Activities</h3>
      
      <div className="bg-indigo-50 p-4 rounded-lg mb-6">
        <p className="text-gray-700">
          Complete these interactive activities to practice using sensory details effectively to create immersive, vivid writing for the NSW Selective exam.
        </p>
      </div>
      
      <div className="space-y-8">
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-blue-50 px-4 py-2">
            <h4 className="font-medium text-blue-800">Activity 1: Identify Sensory Details</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Read the following passage and identify which of the five senses are used in each highlighted section.
            </p>
            
            <div className="border p-3 rounded-lg mb-4 bg-gray-50">
              <p className="text-gray-700">
                <span className="bg-yellow-100 px-1 rounded">(1) The summer fair buzzed with activity as colorful tents and stalls lined the park's perimeter, their bright flags fluttering against the clear blue sky.</span> <span className="bg-green-100 px-1 rounded">(2) Children's laughter mingled with the tinny melody of the carousel and the occasional boom of the strongman's hammer striking the bell.</span> <span className="bg-purple-100 px-1 rounded">(3) The air was thick with the sweet scent of cotton candy and the savory aroma of sizzling sausages that made my mouth water instantly.</span> <span className="bg-red-100 px-1 rounded">(4) I bit into a caramel apple, the tart fruit contrasting with the sticky sweetness of the coating that clung to my teeth.</span> <span className="bg-blue-100 px-1 rounded">(5) The afternoon sun beat down on my shoulders, and the wooden bench beneath me felt rough against my bare legs as I watched the crowd swirl around me.</span>
              </p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Match each highlighted section with the sense(s) it appeals to:</label>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-yellow-800">Section 1 (yellow):</p>
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
                  
                  <div>
                    <p className="text-sm font-medium text-green-800">Section 2 (green):</p>
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
                  
                  <div>
                    <p className="text-sm font-medium text-purple-800">Section 3 (purple):</p>
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
                  
                  <div>
                    <p className="text-sm font-medium text-red-800">Section 4 (red):</p>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                      <div className="flex items-center">
                        <input id="s4-sight" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                        <label htmlFor="s4-sight" className="ml-2 block text-sm text-gray-700">Sight</label>
                      </div>
                      <div className="flex items-center">
                        <input id="s4-sound" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                        <label htmlFor="s4-sound" className="ml-2 block text-sm text-gray-700">Sound</label>
                      </div>
                      <div className="flex items-center">
                        <input id="s4-smell" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                        <label htmlFor="s4-smell" className="ml-2 block text-sm text-gray-700">Smell</label>
                      </div>
                      <div className="flex items-center">
                        <input id="s4-taste" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                        <label htmlFor="s4-taste" className="ml-2 block text-sm text-gray-700">Taste</label>
                      </div>
                      <div className="flex items-center">
                        <input id="s4-touch" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                        <label htmlFor="s4-touch" className="ml-2 block text-sm text-gray-700">Touch</label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-blue-800">Section 5 (blue):</p>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                      <div className="flex items-center">
                        <input id="s5-sight" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                        <label htmlFor="s5-sight" className="ml-2 block text-sm text-gray-700">Sight</label>
                      </div>
                      <div className="flex items-center">
                        <input id="s5-sound" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                        <label htmlFor="s5-sound" className="ml-2 block text-sm text-gray-700">Sound</label>
                      </div>
                      <div className="flex items-center">
                        <input id="s5-smell" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                        <label htmlFor="s5-smell" className="ml-2 block text-sm text-gray-700">Smell</label>
                      </div>
                      <div className="flex items-center">
                        <input id="s5-taste" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                        <label htmlFor="s5-taste" className="ml-2 block text-sm text-gray-700">Taste</label>
                      </div>
                      <div className="flex items-center">
                        <input id="s5-touch" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                        <label htmlFor="s5-touch" className="ml-2 block text-sm text-gray-700">Touch</label>
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
                  Check Answers
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-green-50 px-4 py-2">
            <h4 className="font-medium text-green-800">Activity 2: Sensory Detail Categories</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              For each sense below, categorize the given sensory details into the appropriate subcategories.
            </p>
            
            <div className="space-y-6">
              <div>
                <h5 className="text-sm font-medium text-blue-800 mb-2">Visual Details (Sight)</h5>
                <p className="text-gray-700 mb-3">Drag each visual detail to its correct category:</p>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Light and Shadow:</label>
                    <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                      <option>Select a detail...</option>
                      <option value="1">Dappled sunlight through leaves</option>
                      <option value="2">Crimson sunset over the horizon</option>
                      <option value="3">Harsh fluorescent lighting</option>
                      <option value="4">Flickering candlelight casting long shadows</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Movement and Stillness:</label>
                    <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                      <option>Select a detail...</option>
                      <option value="1">Leaves dancing in the breeze</option>
                      <option value="2">Motionless silhouette against the window</option>
                      <option value="3">Swirling mist across the lake</option>
                      <option value="4">Statue-like figure in the garden</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Specific Colors:</label>
                    <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                      <option>Select a detail...</option>
                      <option value="1">Azure sky stretching overhead</option>
                      <option value="2">Emerald grass glistening with dew</option>
                      <option value="3">Amber flames licking at the logs</option>
                      <option value="4">Sapphire waters of the tropical bay</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div>
                <h5 className="text-sm font-medium text-green-800 mb-2">Auditory Details (Sound)</h5>
                <p className="text-gray-700 mb-3">Match each sound with its best description:</p>
                
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Sounds:</p>
                      <ul className="list-disc pl-5 text-sm text-gray-600">
                        <li>Thunder</li>
                        <li>Wind chimes</li>
                        <li>Whisper</li>
                        <li>Footsteps</li>
                      </ul>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-700">Descriptions:</p>
                      <div className="space-y-2">
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">A soft, barely audible voice:</label>
                          <input type="text" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">A deep, rolling boom in the distance:</label>
                          <input type="text" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">A rhythmic, steady pattern on the wooden floor:</label>
                          <input type="text" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">A delicate, tinkling melody:</label>
                          <input type="text" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h5 className="text-sm font-medium text-purple-800 mb-2">Olfactory and Gustatory Details (Smell and Taste)</h5>
                <p className="text-gray-700 mb-3">Identify whether each description primarily relates to smell, taste, or both:</p>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-700">"The bitter coffee lingered on his tongue, its rich aroma filling the small café."</p>
                    <div className="mt-1 flex items-center space-x-4">
                      <div className="flex items-center">
                        <input id="st1-smell" name="st1" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                        <label htmlFor="st1-smell" className="ml-2 block text-sm text-gray-700">Primarily Smell</label>
                      </div>
                      <div className="flex items-center">
                        <input id="st1-taste" name="st1" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                        <label htmlFor="st1-taste" className="ml-2 block text-sm text-gray-700">Primarily Taste</label>
                      </div>
                      <div className="flex items-center">
                        <input id="st1-both" name="st1" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                        <label htmlFor="st1-both" className="ml-2 block text-sm text-gray-700">Both Equally</label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-700">"The acrid smoke from the factory stung her nostrils as she hurried past."</p>
                    <div className="mt-1 flex items-center space-x-4">
                      <div className="flex items-center">
                        <input id="st2-smell" name="st2" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                        <label htmlFor="st2-smell" className="ml-2 block text-sm text-gray-700">Primarily Smell</label>
                      </div>
                      <div className="flex items-center">
                        <input id="st2-taste" name="st2" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                        <label htmlFor="st2-taste" className="ml-2 block text-sm text-gray-700">Primarily Taste</label>
                      </div>
                      <div className="flex items-center">
                        <input id="st2-both" name="st2" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                        <label htmlFor="st2-both" className="ml-2 block text-sm text-gray-700">Both Equally</label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-700">"The metallic taste of fear filled his mouth as he waited for the results."</p>
                    <div className="mt-1 flex items-center space-x-4">
                      <div className="flex items-center">
                        <input id="st3-smell" name="st3" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                        <label htmlFor="st3-smell" className="ml-2 block text-sm text-gray-700">Primarily Smell</label>
                      </div>
                      <div className="flex items-center">
                        <input id="st3-taste" name="st3" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                        <label htmlFor="st3-taste" className="ml-2 block text-sm text-gray-700">Primarily Taste</label>
                      </div>
                      <div className="flex items-center">
                        <input id="st3-both" name="st3" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                        <label htmlFor="st3-both" className="ml-2 block text-sm text-gray-700">Both Equally</label>
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
                  Check Answers
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-purple-50 px-4 py-2">
            <h4 className="font-medium text-purple-800">Activity 3: Add Sensory Details</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Transform each basic sentence by adding rich sensory details for each of the five senses.
            </p>
            
            <div className="space-y-6">
              <div>
                <p className="text-gray-700 mb-2">Basic sentence: <span className="font-medium">"She walked into the kitchen."</span></p>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Add visual details (sight):</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Describe what she sees in the kitchen..."
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Add auditory details (sound):</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Describe what she hears in the kitchen..."
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Add olfactory details (smell):</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Describe what she smells in the kitchen..."
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Add gustatory details (taste):</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Describe any tastes she experiences..."
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Add tactile details (touch):</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Describe what she feels physically..."
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Now combine these details into a rich, sensory paragraph:</label>
                    <textarea
                      rows={5}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Write your complete sensory paragraph here..."
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-gray-700 mb-2">Basic sentence: <span className="font-medium">"The storm arrived."</span></p>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Add visual details (sight):</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Describe what the storm looks like..."
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Add auditory details (sound):</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Describe what the storm sounds like..."
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Add olfactory details (smell):</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Describe any smells associated with the storm..."
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Add gustatory details (taste):</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Describe any tastes experienced during the storm..."
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Add tactile details (touch):</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Describe how the storm feels physically..."
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Now combine these details into a rich, sensory paragraph:</label>
                    <textarea
                      rows={5}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Write your complete sensory paragraph here..."
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
            <h4 className="font-medium text-red-800">Activity 4: Write a Five-Senses Description</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Write a descriptive paragraph about one of the scenarios below, incorporating all five senses to create an immersive experience.
            </p>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Choose a scenario to describe:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="flex items-center">
                  <input id="scene1" name="scene" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="scene1" className="ml-2 block text-sm text-gray-700">A bustling night market</label>
                </div>
                <div className="flex items-center">
                  <input id="scene2" name="scene" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="scene2" className="ml-2 block text-sm text-gray-700">A day at the beach</label>
                </div>
                <div className="flex items-center">
                  <input id="scene3" name="scene" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="scene3" className="ml-2 block text-sm text-gray-700">Walking through a forest after rain</label>
                </div>
                <div className="flex items-center">
                  <input id="scene4" name="scene" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="scene4" className="ml-2 block text-sm text-gray-700">Your own choice:</label>
                  <input type="text" className="ml-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="Enter a scenario..." />
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Planning your description:</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Visual details (sight):</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="List visual details you'll include..."
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Auditory details (sound):</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="List sound details you'll include..."
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Olfactory details (smell):</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="List smell details you'll include..."
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Gustatory details (taste):</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="List taste details you'll include..."
                    ></textarea>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs text-gray-500 mb-1">Tactile details (touch):</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="List touch details you'll include..."
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your five-senses description:</label>
                <textarea
                  rows={10}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Write your complete descriptive paragraph here, incorporating all five senses..."
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
                    <label htmlFor="check2" className="ml-2 block text-sm text-gray-700">I included auditory details (what things sound like).</label>
                  </div>
                  <div className="flex items-center">
                    <input id="check3" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="check3" className="ml-2 block text-sm text-gray-700">I included olfactory details (what things smell like).</label>
                  </div>
                  <div className="flex items-center">
                    <input id="check4" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="check4" className="ml-2 block text-sm text-gray-700">I included gustatory details (what things taste like).</label>
                  </div>
                  <div className="flex items-center">
                    <input id="check5" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="check5" className="ml-2 block text-sm text-gray-700">I included tactile details (what things feel like).</label>
                  </div>
                  <div className="flex items-center">
                    <input id="check6" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="check6" className="ml-2 block text-sm text-gray-700">I used specific, concrete details rather than vague generalizations.</label>
                  </div>
                  <div className="flex items-center">
                    <input id="check7" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="check7" className="ml-2 block text-sm text-gray-700">I integrated the sensory details naturally into my description.</label>
                  </div>
                  <div className="flex items-center">
                    <input id="check8" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="check8" className="ml-2 block text-sm text-gray-700">My description creates a vivid, immersive experience for the reader.</label>
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
