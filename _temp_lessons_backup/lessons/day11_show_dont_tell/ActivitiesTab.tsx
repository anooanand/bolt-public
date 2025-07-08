import React from 'react';

export function ActivitiesTab() {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Interactive Activities</h3>
      
      <div className="bg-indigo-50 p-4 rounded-lg mb-6">
        <p className="text-gray-700">
          Complete these interactive activities to reinforce your understanding of the "show, don't tell" technique. These exercises will help you create more vivid, engaging writing for the NSW Selective exam.
        </p>
      </div>
      
      <div className="space-y-8">
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-blue-50 px-4 py-2">
            <h4 className="font-medium text-blue-800">Activity 1: Identify "Showing" vs. "Telling"</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              For each pair of sentences below, identify which one is "showing" and which one is "telling."
            </p>
            
            <div className="space-y-6">
              <div>
                <p className="text-gray-700 mb-2">Pair 1:</p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input id="pair1a" name="pair1" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="pair1a" className="ml-2 block text-sm text-gray-700">A. The old man was tired after his long journey.</label>
                  </div>
                  <div className="flex items-center">
                    <input id="pair1b" name="pair1" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="pair1b" className="ml-2 block text-sm text-gray-700">B. The old man's shoulders slumped as he dragged his feet along the dusty path, pausing every few steps to wipe his brow and catch his breath.</label>
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-gray-700 mb-2">Pair 2:</p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input id="pair2a" name="pair2" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="pair2a" className="ml-2 block text-sm text-gray-700">A. Her fingers trembled as she unfolded the letter, and her heart pounded so loudly she was sure everyone in the room could hear it.</label>
                  </div>
                  <div className="flex items-center">
                    <input id="pair2b" name="pair2" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="pair2b" className="ml-2 block text-sm text-gray-700">B. She was very nervous about opening the letter.</label>
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-gray-700 mb-2">Pair 3:</p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input id="pair3a" name="pair3" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="pair3a" className="ml-2 block text-sm text-gray-700">A. The classroom was noisy and chaotic.</label>
                  </div>
                  <div className="flex items-center">
                    <input id="pair3b" name="pair3" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="pair3b" className="ml-2 block text-sm text-gray-700">B. Papers flew across the room as students shouted over each other, chairs scraped against the floor, and the teacher repeatedly banged her ruler on the desk, trying to restore order.</label>
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-gray-700 mb-2">Pair 4:</p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input id="pair4a" name="pair4" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="pair4a" className="ml-2 block text-sm text-gray-700">A. The aroma of freshly baked bread wafted through the kitchen, making his stomach growl. He ran his fingers along the crisp crust, savoring the warmth that radiated through his fingertips.</label>
                  </div>
                  <div className="flex items-center">
                    <input id="pair4b" name="pair4" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="pair4b" className="ml-2 block text-sm text-gray-700">B. The bread smelled and felt good.</label>
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-gray-700 mb-2">Pair 5:</p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input id="pair5a" name="pair5" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="pair5a" className="ml-2 block text-sm text-gray-700">A. The weather was bad that day.</label>
                  </div>
                  <div className="flex items-center">
                    <input id="pair5b" name="pair5" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="pair5b" className="ml-2 block text-sm text-gray-700">B. Rain lashed against the windows as thunder cracked overhead, and the wind howled through the trees, bending them almost to the breaking point.</label>
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
            <h4 className="font-medium text-green-800">Activity 2: Identify Sensory Details</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Read the passage below and identify which sensory details are used to "show" rather than "tell."
            </p>
            
            <div className="border p-3 rounded-lg mb-4 bg-gray-50">
              <p className="text-gray-700">
                Maya stepped into her grandmother's kitchen. The linoleum floor squeaked beneath her shoes as she moved toward the counter. Steam rose from a pot on the stove, carrying the scent of cinnamon and apples throughout the room. The radio in the corner crackled with an old jazz tune, barely audible over the rhythmic chopping of her grandmother's knife against the cutting board. "Come taste this," her grandmother said, offering a wooden spoon coated with a thick, sweet sauce that warmed Maya's tongue. Outside the window, golden afternoon light filtered through the leaves of the old oak tree, casting dappled shadows across the worn kitchen table where decades of family meals had left their mark.
              </p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Identify all the sensory details in the passage (select all that apply):</label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input id="sense1" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="sense1" className="ml-2 block text-sm text-gray-700">Sight: "golden afternoon light filtered through the leaves"</label>
                  </div>
                  <div className="flex items-center">
                    <input id="sense2" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="sense2" className="ml-2 block text-sm text-gray-700">Sound: "the linoleum floor squeaked beneath her shoes"</label>
                  </div>
                  <div className="flex items-center">
                    <input id="sense3" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="sense3" className="ml-2 block text-sm text-gray-700">Smell: "the scent of cinnamon and apples"</label>
                  </div>
                  <div className="flex items-center">
                    <input id="sense4" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="sense4" className="ml-2 block text-sm text-gray-700">Taste: "a thick, sweet sauce that warmed Maya's tongue"</label>
                  </div>
                  <div className="flex items-center">
                    <input id="sense5" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="sense5" className="ml-2 block text-sm text-gray-700">Sound: "the radio in the corner crackled with an old jazz tune"</label>
                  </div>
                  <div className="flex items-center">
                    <input id="sense6" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="sense6" className="ml-2 block text-sm text-gray-700">Sound: "the rhythmic chopping of her grandmother's knife"</label>
                  </div>
                  <div className="flex items-center">
                    <input id="sense7" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="sense7" className="ml-2 block text-sm text-gray-700">Touch: "steam rose from a pot"</label>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">What emotion or atmosphere does this passage create through its sensory details?</label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input id="emotion1" name="emotion" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="emotion1" className="ml-2 block text-sm text-gray-700">Tension and suspense</label>
                  </div>
                  <div className="flex items-center">
                    <input id="emotion2" name="emotion" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="emotion2" className="ml-2 block text-sm text-gray-700">Warmth, comfort, and nostalgia</label>
                  </div>
                  <div className="flex items-center">
                    <input id="emotion3" name="emotion" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="emotion3" className="ml-2 block text-sm text-gray-700">Excitement and adventure</label>
                  </div>
                  <div className="flex items-center">
                    <input id="emotion4" name="emotion" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="emotion4" className="ml-2 block text-sm text-gray-700">Sadness and loneliness</label>
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
            <h4 className="font-medium text-purple-800">Activity 3: Convert "Telling" to "Showing"</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Convert each "telling" sentence into a "showing" paragraph. Use sensory details, specific actions, and descriptive language.
            </p>
            
            <div className="space-y-6">
              <div>
                <p className="text-gray-700 mb-2">1. <span className="font-medium">"The boy was excited about his birthday."</span></p>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your "showing" paragraph:</label>
                  <textarea
                    rows={3}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Rewrite this as a 'showing' paragraph with sensory details..."
                  ></textarea>
                </div>
              </div>
              
              <div>
                <p className="text-gray-700 mb-2">2. <span className="font-medium">"The abandoned house was creepy."</span></p>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your "showing" paragraph:</label>
                  <textarea
                    rows={3}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Rewrite this as a 'showing' paragraph with sensory details..."
                  ></textarea>
                </div>
              </div>
              
              <div>
                <p className="text-gray-700 mb-2">3. <span className="font-medium">"She was a kind and generous person."</span></p>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your "showing" paragraph:</label>
                  <textarea
                    rows={3}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Rewrite this as a 'showing' paragraph with actions and details..."
                  ></textarea>
                </div>
              </div>
              
              <div>
                <p className="text-gray-700 mb-2">4. <span className="font-medium">"The food at the restaurant was delicious."</span></p>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your "showing" paragraph:</label>
                  <textarea
                    rows={3}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Rewrite this as a 'showing' paragraph with sensory details..."
                  ></textarea>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Submit Paragraphs
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
              Choose one of the scenarios below and write a descriptive paragraph using the "show, don't tell" technique. Include sensory details, specific actions, and vivid language.
            </p>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Choose a scenario:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="flex items-center">
                  <input id="scenario1" name="scenario" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="scenario1" className="ml-2 block text-sm text-gray-700">A student's first day at a new school</label>
                </div>
                <div className="flex items-center">
                  <input id="scenario2" name="scenario" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="scenario2" className="ml-2 block text-sm text-gray-700">A thunderstorm approaching</label>
                </div>
                <div className="flex items-center">
                  <input id="scenario3" name="scenario" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="scenario3" className="ml-2 block text-sm text-gray-700">Winning (or losing) an important competition</label>
                </div>
                <div className="flex items-center">
                  <input id="scenario4" name="scenario" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="scenario4" className="ml-2 block text-sm text-gray-700">Exploring an interesting place</label>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your descriptive paragraph:</label>
                <textarea
                  rows={10}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Write your descriptive paragraph here using 'show, don't tell' techniques..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Self-Assessment:</label>
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
                    <label htmlFor="check3" className="ml-2 block text-sm text-gray-700">I included at least one other sense (smell, taste, or touch).</label>
                  </div>
                  <div className="flex items-center">
                    <input id="check4" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="check4" className="ml-2 block text-sm text-gray-700">I showed emotions through actions rather than stating them directly.</label>
                  </div>
                  <div className="flex items-center">
                    <input id="check5" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="check5" className="ml-2 block text-sm text-gray-700">I used specific, concrete details rather than vague descriptions.</label>
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
