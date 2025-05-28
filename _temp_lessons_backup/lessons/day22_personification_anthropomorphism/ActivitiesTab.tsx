import React from 'react';

export function ActivitiesTab() {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Interactive Activities</h3>
      
      <div className="bg-indigo-50 p-4 rounded-lg mb-6">
        <p className="text-gray-700">
          Complete these interactive activities to practice using personification and anthropomorphism to create vivid, engaging writing for the NSW Selective exam.
        </p>
      </div>
      
      <div className="space-y-8">
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-blue-50 px-4 py-2">
            <h4 className="font-medium text-blue-800">Activity 1: Identify Personification</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Read the following passages and identify the examples of personification or anthropomorphism.
            </p>
            
            <div className="space-y-6">
              <div>
                <p className="text-gray-700 mb-2">Passage 1:</p>
                <div className="border p-3 rounded-lg mb-3 bg-gray-50">
                  <p className="text-gray-700">
                    The autumn leaves danced and twirled as they fell from the trees. A gentle breeze whispered through the branches, encouraging more leaves to join the performance. The sun smiled down on the colorful display, while the old oak trees stood guard, watching over the seasonal parade.
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Identify all examples of personification in this passage:</label>
                  <textarea
                    rows={4}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="List each example and explain what non-human thing is given human qualities..."
                  ></textarea>
                </div>
              </div>
              
              <div>
                <p className="text-gray-700 mb-2">Passage 2:</p>
                <div className="border p-3 rounded-lg mb-3 bg-gray-50">
                  <p className="text-gray-700">
                    The old computer groaned as it started up, complaining about its age and the heavy workload it had endured over the years. "Just one more document," it seemed to sigh as the fan whirred loudly in protest. The cursor blinked impatiently, tapping its foot while waiting for commands, while the printer in the corner had fallen into a deep sleep, snoring softly.
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Is this passage an example of personification or anthropomorphism? Explain your answer:</label>
                  <textarea
                    rows={4}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Identify whether this is personification or anthropomorphism and explain why..."
                  ></textarea>
                </div>
              </div>
              
              <div>
                <p className="text-gray-700 mb-2">Passage 3:</p>
                <div className="border p-3 rounded-lg mb-3 bg-gray-50">
                  <p className="text-gray-700">
                    The storm raged through the night, its anger unleashed in violent bursts of thunder. Lightning flashed like a warning, illuminating the sky with its fury. Rain pounded against the windows, demanding to be let in, while the wind howled its displeasure at being shut out.
                  </p>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">What mood or atmosphere is created by the personification in this passage?</label>
                    <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                      <option>Select the mood...</option>
                      <option value="1">Peaceful and serene</option>
                      <option value="2">Threatening and ominous</option>
                      <option value="3">Playful and cheerful</option>
                      <option value="4">Melancholic and sad</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Identify the human emotions or actions given to the storm elements:</label>
                    <textarea
                      rows={3}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="List the human qualities given to the storm, thunder, lightning, rain, and wind..."
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
            <h4 className="font-medium text-green-800">Activity 2: Create Basic Personification</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Create personification for each of the following non-human things by giving them human qualities, actions, or emotions.
            </p>
            
            <div className="space-y-6">
              <div>
                <p className="text-gray-700 mb-2">Complete each sentence with personification:</p>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">1. The moon...</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Give the moon human qualities or actions..."
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">2. The old house...</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Give the old house human qualities or actions..."
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">3. The ocean waves...</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Give the ocean waves human qualities or actions..."
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">4. Time...</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Give time (abstract concept) human qualities or actions..."
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">5. The flowers...</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Give the flowers human qualities or actions..."
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Submit Examples
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-purple-50 px-4 py-2">
            <h4 className="font-medium text-purple-800">Activity 3: Create Mood with Personification</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Create personification for the same object but with different moods or emotions.
            </p>
            
            <div className="space-y-6">
              <div>
                <p className="text-gray-700 mb-2">Write about "the wind" using personification to create each mood:</p>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">1. The wind (threatening/ominous mood):</label>
                    <textarea
                      rows={3}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Describe the wind with personification that creates a threatening mood..."
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">2. The wind (playful/cheerful mood):</label>
                    <textarea
                      rows={3}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Describe the wind with personification that creates a playful mood..."
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">3. The wind (gentle/comforting mood):</label>
                    <textarea
                      rows={3}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Describe the wind with personification that creates a gentle mood..."
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-gray-700 mb-2">Now try with "the city" from different character perspectives:</p>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">1. The city (from the perspective of someone who loves it):</label>
                    <textarea
                      rows={3}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Use personification to show how someone who loves the city would perceive it..."
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">2. The city (from the perspective of someone who fears it):</label>
                    <textarea
                      rows={3}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Use personification to show how someone who fears the city would perceive it..."
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Submit Examples
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-red-50 px-4 py-2">
            <h4 className="font-medium text-red-800">Activity 4: Create Extended Personification</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Write a descriptive paragraph using extended personification or anthropomorphism.
            </p>
            
            <div className="space-y-6">
              <div>
                <p className="text-sm text-gray-600 mb-2">Choose a subject for your extended personification:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                  <div className="flex items-center">
                    <input id="subject1" name="subject" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="subject1" className="ml-2 block text-sm text-gray-700">A season (winter, summer, etc.)</label>
                  </div>
                  <div className="flex items-center">
                    <input id="subject2" name="subject" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="subject2" className="ml-2 block text-sm text-gray-700">A building (school, library, etc.)</label>
                  </div>
                  <div className="flex items-center">
                    <input id="subject3" name="subject" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="subject3" className="ml-2 block text-sm text-gray-700">Technology (phone, computer, etc.)</label>
                  </div>
                  <div className="flex items-center">
                    <input id="subject4" name="subject" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="subject4" className="ml-2 block text-sm text-gray-700">Your own choice:</label>
                    <input type="text" className="ml-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="Enter a subject..." />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Planning your extended personification:</label>
                  <div className="grid grid-cols-1 gap-3">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">What human characteristics will you give your subject?</label>
                      <textarea
                        rows={2}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="List personality traits, emotions, actions, etc..."
                      ></textarea>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">What mood or atmosphere do you want to create?</label>
                      <input type="text" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="e.g., mysterious, joyful, melancholic, etc." />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">List at least 3 specific human actions your subject will perform:</label>
                      <textarea
                        rows={3}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="e.g., For 'winter': 1. Painting the windows with frost 2. Wrapping the world in a blanket of snow 3. Whispering cold secrets..."
                      ></textarea>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Write your extended personification paragraph:</label>
                  <textarea
                    rows={8}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Write a paragraph that uses extended personification throughout, giving your subject human qualities, actions, and emotions..."
                  ></textarea>
                </div>
                
                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Self-Assessment Checklist:</label>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input id="check1" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="check1" className="ml-2 block text-sm text-gray-700">I gave my subject multiple human qualities or actions.</label>
                    </div>
                    <div className="flex items-center">
                      <input id="check2" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="check2" className="ml-2 block text-sm text-gray-700">I maintained the personification consistently throughout the paragraph.</label>
                    </div>
                    <div className="flex items-center">
                      <input id="check3" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="check3" className="ml-2 block text-sm text-gray-700">I created a specific mood or atmosphere with my personification.</label>
                    </div>
                    <div className="flex items-center">
                      <input id="check4" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="check4" className="ml-2 block text-sm text-gray-700">My personification is original and avoids clichés.</label>
                    </div>
                    <div className="flex items-center">
                      <input id="check5" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="check5" className="ml-2 block text-sm text-gray-700">I used specific, vivid details in my personification.</label>
                    </div>
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
