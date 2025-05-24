import React from 'react';

export function PracticeTab() {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Practice Task: Setting Description</h3>
      
      <div className="bg-indigo-50 p-4 rounded-lg mb-6">
        <p className="text-gray-700">
          Now it's time to apply what you've learned about setting description! In this practice task, you'll analyze setting descriptions, transform basic settings into vivid ones, and write your own detailed setting description that establishes mood.
        </p>
      </div>
      
      <div className="space-y-6">
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-blue-50 px-4 py-3">
            <h4 className="font-medium text-blue-800">Part 1: Analyze Setting Descriptions</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Read the following setting description and identify the techniques used to create a vivid sense of place.
            </p>
            
            <div className="border p-4 rounded-lg mb-4 bg-gray-50">
              <p className="text-gray-800 italic">
                The old Victorian house loomed at the end of Maple Street, its weathered facade a patchwork of faded paint and creeping ivy. Three stories of architectural excess—ornate gables, a wraparound porch with peeling columns, and narrow windows that reflected the setting sun like weary eyes. The front gate hung askew on rusted hinges, protesting with a mournful creak as I pushed it open. Brittle autumn leaves skittered across the overgrown path, whispering secrets beneath my feet. The air grew heavier with each step, carrying the musty scent of decay and something sweeter—perhaps the remnants of a once-tended rose garden, now choked with thorny weeds. A wind chime fashioned from tarnished spoons dangled from the porch ceiling, its discordant melody punctuating the eerie silence. As I reached for the tarnished brass doorknob, cold to the touch despite the warm evening, the porch boards groaned beneath my weight as if warning me to turn back.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Identify sensory details in the passage:</p>
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm text-gray-700">Sight (2 examples):</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="What visual details can you find?"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700">Sound (2 examples):</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="What auditory details can you find?"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700">Smell (1 example):</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="What olfactory details can you find?"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700">Touch (1 example):</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="What tactile details can you find?"
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Identify specific details that create a clear image:</p>
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm text-gray-700">Specific architectural details:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700">Specific details about the surroundings:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Identify mood and atmosphere:</p>
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm text-gray-700">What mood does this setting create?</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="How does the setting make you feel?"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700">List 3 words or phrases that contribute to this mood:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Identify movement and change:</p>
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm text-gray-700">What dynamic elements show the setting isn't static?</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Find examples of movement or change in the setting..."
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Identify character interaction:</p>
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm text-gray-700">How does the narrator interact with the setting?</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Find examples of the narrator engaging with the environment..."
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700">What does this interaction reveal about the setting or character?</label>
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
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-green-50 px-4 py-3">
            <h4 className="font-medium text-green-800">Part 2: Transform Basic Setting Descriptions</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Transform these basic setting descriptions into vivid, engaging ones using the techniques you've learned.
            </p>
            
            <div className="space-y-4">
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Basic setting 1:</p>
                <div className="bg-gray-100 p-2 rounded mb-2">
                  <p className="text-gray-700 italic">The classroom was empty after school.</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-700">Your vivid setting description (use sensory details):</label>
                  <textarea
                    rows={5}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Transform this using at least three different senses..."
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
                      <label className="ml-1 text-xs text-gray-700">Specific details</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                      <label className="ml-1 text-xs text-gray-700">Mood/atmosphere</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                      <label className="ml-1 text-xs text-gray-700">Movement/change</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                      <label className="ml-1 text-xs text-gray-700">Character interaction</label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Basic setting 2:</p>
                <div className="bg-gray-100 p-2 rounded mb-2">
                  <p className="text-gray-700 italic">It was a busy train station in the morning.</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-700">Your vivid setting description (create a specific mood):</label>
                  <textarea
                    rows={5}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Transform this to create either an exciting, anxious, or peaceful mood..."
                  ></textarea>
                </div>
                <div className="mt-2">
                  <label className="block text-sm text-gray-700">What mood were you trying to create?</label>
                  <div className="mt-1 flex items-center space-x-4">
                    <div className="flex items-center">
                      <input type="radio" name="mood" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300" />
                      <label className="ml-2 block text-sm text-gray-700">Exciting</label>
                    </div>
                    <div className="flex items-center">
                      <input type="radio" name="mood" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300" />
                      <label className="ml-2 block text-sm text-gray-700">Anxious</label>
                    </div>
                    <div className="flex items-center">
                      <input type="radio" name="mood" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300" />
                      <label className="ml-2 block text-sm text-gray-700">Peaceful</label>
                    </div>
                    <div className="flex items-center">
                      <input type="radio" name="mood" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300" />
                      <label className="ml-2 block text-sm text-gray-700">Other</label>
                    </div>
                  </div>
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
                      <label className="ml-1 text-xs text-gray-700">Specific details</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                      <label className="ml-1 text-xs text-gray-700">Mood/atmosphere</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                      <label className="ml-1 text-xs text-gray-700">Movement/change</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                      <label className="ml-1 text-xs text-gray-700">Character interaction</label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Basic setting 3:</p>
                <div className="bg-gray-100 p-2 rounded mb-2">
                  <p className="text-gray-700 italic">The forest was beautiful in autumn.</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-700">Your vivid setting description (include character interaction):</label>
                  <textarea
                    rows={5}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Transform this to show how a character interacts with the forest..."
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
                      <label className="ml-1 text-xs text-gray-700">Specific details</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                      <label className="ml-1 text-xs text-gray-700">Mood/atmosphere</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                      <label className="ml-1 text-xs text-gray-700">Movement/change</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                      <label className="ml-1 text-xs text-gray-700">Character interaction</label>
                    </div>
                  </div>
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
              Write a detailed setting description that establishes a specific mood. Choose one of the following settings and moods.
            </p>
            
            <div className="bg-gray-50 p-3 rounded-lg mb-4">
              <p className="text-gray-800 font-medium">Choose one setting:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                <div className="flex items-center">
                  <input type="radio" name="setting" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300" />
                  <label className="ml-2 block text-sm text-gray-700">An abandoned amusement park</label>
                </div>
                <div className="flex items-center">
                  <input type="radio" name="setting" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300" />
                  <label className="ml-2 block text-sm text-gray-700">A bustling night market</label>
                </div>
                <div className="flex items-center">
                  <input type="radio" name="setting" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300" />
                  <label className="ml-2 block text-sm text-gray-700">A coastal cliff at sunrise</label>
                </div>
                <div className="flex items-center">
                  <input type="radio" name="setting" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300" />
                  <label className="ml-2 block text-sm text-gray-700">A hidden garden in the city</label>
                </div>
              </div>
              
              <p className="text-gray-800 font-medium mt-4">Choose one mood to establish:</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
                <div className="flex items-center">
                  <input type="radio" name="mood_choice" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300" />
                  <label className="ml-2 block text-sm text-gray-700">Mysterious</label>
                </div>
                <div className="flex items-center">
                  <input type="radio" name="mood_choice" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300" />
                  <label className="ml-2 block text-sm text-gray-700">Joyful</label>
                </div>
                <div className="flex items-center">
                  <input type="radio" name="mood_choice" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300" />
                  <label className="ml-2 block text-sm text-gray-700">Melancholic</label>
                </div>
                <div className="flex items-center">
                  <input type="radio" name="mood_choice" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300" />
                  <label className="ml-2 block text-sm text-gray-700">Peaceful</label>
                </div>
                <div className="flex items-center">
                  <input type="radio" name="mood_choice" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300" />
                  <label className="ml-2 block text-sm text-gray-700">Tense</label>
                </div>
                <div className="flex items-center">
                  <input type="radio" name="mood_choice" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300" />
                  <label className="ml-2 block text-sm text-gray-700">Magical</label>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Planning your setting description:</p>
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm text-gray-700">Sensory details to include:</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-1">
                      <div>
                        <label className="block text-xs text-gray-600">Sight:</label>
                        <textarea
                          rows={2}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        ></textarea>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600">Sound:</label>
                        <textarea
                          rows={2}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        ></textarea>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600">Smell:</label>
                        <textarea
                          rows={2}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        ></textarea>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600">Touch:</label>
                        <textarea
                          rows={2}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700">Specific details to include:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="List precise, concrete details that will create a clear image..."
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700">Movement/change elements:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="How will you show the setting isn't static but alive and changing?"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700">Character interaction:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="How will a character interact with this setting?"
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your setting description:</label>
                <textarea
                  rows={12}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Write your detailed setting description here, using all the elements you've planned above..."
                ></textarea>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-sm font-medium text-gray-700 mb-2">Self-assessment:</p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                    <label className="ml-2 block text-sm text-gray-700">I included details appealing to at least three different senses</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                    <label className="ml-2 block text-sm text-gray-700">I used specific, concrete details rather than vague generalizations</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                    <label className="ml-2 block text-sm text-gray-700">I established the mood I intended to create</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                    <label className="ml-2 block text-sm text-gray-700">I included elements of movement or change</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                    <label className="ml-2 block text-sm text-gray-700">I showed character interaction with the setting</label>
                  </div>
                </div>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Reflection:</p>
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm text-gray-700">What techniques were most effective in establishing your chosen mood?</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700">How could you improve your setting description?</label>
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
