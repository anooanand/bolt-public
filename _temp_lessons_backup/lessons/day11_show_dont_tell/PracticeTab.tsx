import React from 'react';

export function PracticeTab() {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Practice Task: Show, Don't Tell</h3>
      
      <div className="bg-indigo-50 p-4 rounded-lg mb-6">
        <p className="text-gray-700">
          Now it's time to apply the "show, don't tell" technique! In this practice task, you'll identify showing versus telling in example passages, convert telling sentences into showing paragraphs, and write your own descriptive paragraph using this powerful technique.
        </p>
      </div>
      
      <div className="space-y-6">
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-blue-50 px-4 py-3">
            <h4 className="font-medium text-blue-800">Part 1: Identify "Showing" vs. "Telling"</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              For each of the following passages, identify whether it's an example of "showing" or "telling" and explain why.
            </p>
            
            <div className="space-y-4">
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Passage 1:</p>
                <div className="bg-gray-50 p-3 rounded mb-3">
                  <p className="text-gray-800 italic">
                    The classroom fell silent as Ms. Chen entered. Students straightened in their seats, closed their social media apps, and flipped open notebooks. Even James, who usually slouched in the back row, sat upright and uncapped his pen. When she placed her leather briefcase on the desk with a sharp click, three students in the front row flinched.
                  </p>
                </div>
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm text-gray-700">This passage is an example of:</label>
                    <div className="mt-1 flex items-center space-x-4">
                      <div className="flex items-center">
                        <input type="radio" name="passage1" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300" />
                        <label className="ml-2 block text-sm text-gray-700">Showing</label>
                      </div>
                      <div className="flex items-center">
                        <input type="radio" name="passage1" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300" />
                        <label className="ml-2 block text-sm text-gray-700">Telling</label>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700">Explain your answer:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="What specific details make this showing or telling?"
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Passage 2:</p>
                <div className="bg-gray-50 p-3 rounded mb-3">
                  <p className="text-gray-800 italic">
                    The weather was terrible that day. It was very cold and windy. Everyone felt miserable as they walked to school. Winter was the worst season, and this was the coldest day so far. The students were relieved when they finally got inside the warm building.
                  </p>
                </div>
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm text-gray-700">This passage is an example of:</label>
                    <div className="mt-1 flex items-center space-x-4">
                      <div className="flex items-center">
                        <input type="radio" name="passage2" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300" />
                        <label className="ml-2 block text-sm text-gray-700">Showing</label>
                      </div>
                      <div className="flex items-center">
                        <input type="radio" name="passage2" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300" />
                        <label className="ml-2 block text-sm text-gray-700">Telling</label>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700">Explain your answer:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="What specific details make this showing or telling?"
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Passage 3:</p>
                <div className="bg-gray-50 p-3 rounded mb-3">
                  <p className="text-gray-800 italic">
                    Alex was excited about winning the competition. The judges had been impressed by his project. His family was proud of him, and his friends were happy for his success. It was the best day of his life.
                  </p>
                </div>
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm text-gray-700">This passage is an example of:</label>
                    <div className="mt-1 flex items-center space-x-4">
                      <div className="flex items-center">
                        <input type="radio" name="passage3" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300" />
                        <label className="ml-2 block text-sm text-gray-700">Showing</label>
                      </div>
                      <div className="flex items-center">
                        <input type="radio" name="passage3" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300" />
                        <label className="ml-2 block text-sm text-gray-700">Telling</label>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700">Explain your answer:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="What specific details make this showing or telling?"
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Passage 4:</p>
                <div className="bg-gray-50 p-3 rounded mb-3">
                  <p className="text-gray-800 italic">
                    Maya's fingers hovered over the piano keys, trembling slightly. She inhaled deeply, catching the faint scent of lemon polish on the ancient instrument. The audience's whispers faded as the spotlight warmed her shoulders. A bead of sweat trickled down her temple as she struck the first chord, her grandmother's voice echoing in her memory: "Music isn't in the notes, child. It's in the silence between them."
                  </p>
                </div>
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm text-gray-700">This passage is an example of:</label>
                    <div className="mt-1 flex items-center space-x-4">
                      <div className="flex items-center">
                        <input type="radio" name="passage4" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300" />
                        <label className="ml-2 block text-sm text-gray-700">Showing</label>
                      </div>
                      <div className="flex items-center">
                        <input type="radio" name="passage4" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300" />
                        <label className="ml-2 block text-sm text-gray-700">Telling</label>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700">Explain your answer:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="What specific details make this showing or telling?"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-green-50 px-4 py-3">
            <h4 className="font-medium text-green-800">Part 2: Convert "Telling" to "Showing"</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              For each of the following "telling" sentences, rewrite them as "showing" paragraphs using sensory details, specific actions, and vivid descriptions.
            </p>
            
            <div className="space-y-4">
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Telling Sentence 1:</p>
                <div className="bg-red-50 p-2 rounded mb-3">
                  <p className="text-red-800 italic">The abandoned house was creepy.</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-700">Your "showing" paragraph:</label>
                  <textarea
                    rows={4}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Rewrite using sensory details, specific actions, and vivid descriptions..."
                  ></textarea>
                </div>
                <div className="mt-2">
                  <label className="block text-sm text-gray-700">What techniques did you use to show rather than tell?</label>
                  <div className="mt-1 space-y-1">
                    <div className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                      <label className="ml-2 block text-sm text-gray-700">Sensory details (sight, sound, smell, taste, touch)</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                      <label className="ml-2 block text-sm text-gray-700">Specific, concrete details</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                      <label className="ml-2 block text-sm text-gray-700">Actions that reveal emotions</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                      <label className="ml-2 block text-sm text-gray-700">Figurative language (metaphors, similes)</label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Telling Sentence 2:</p>
                <div className="bg-red-50 p-2 rounded mb-3">
                  <p className="text-red-800 italic">Mia was very happy about getting into her dream university.</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-700">Your "showing" paragraph:</label>
                  <textarea
                    rows={4}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Rewrite using sensory details, specific actions, and vivid descriptions..."
                  ></textarea>
                </div>
                <div className="mt-2">
                  <label className="block text-sm text-gray-700">What techniques did you use to show rather than tell?</label>
                  <div className="mt-1 space-y-1">
                    <div className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                      <label className="ml-2 block text-sm text-gray-700">Sensory details (sight, sound, smell, taste, touch)</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                      <label className="ml-2 block text-sm text-gray-700">Specific, concrete details</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                      <label className="ml-2 block text-sm text-gray-700">Actions that reveal emotions</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                      <label className="ml-2 block text-sm text-gray-700">Figurative language (metaphors, similes)</label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Telling Sentence 3:</p>
                <div className="bg-red-50 p-2 rounded mb-3">
                  <p className="text-red-800 italic">The market was busy and full of interesting things.</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-700">Your "showing" paragraph:</label>
                  <textarea
                    rows={4}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Rewrite using sensory details, specific actions, and vivid descriptions..."
                  ></textarea>
                </div>
                <div className="mt-2">
                  <label className="block text-sm text-gray-700">What techniques did you use to show rather than tell?</label>
                  <div className="mt-1 space-y-1">
                    <div className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                      <label className="ml-2 block text-sm text-gray-700">Sensory details (sight, sound, smell, taste, touch)</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                      <label className="ml-2 block text-sm text-gray-700">Specific, concrete details</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                      <label className="ml-2 block text-sm text-gray-700">Actions that reveal emotions</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                      <label className="ml-2 block text-sm text-gray-700">Figurative language (metaphors, similes)</label>
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
              Choose one of the following emotions or states and write a descriptive paragraph (150-200 words) that shows this emotion without ever directly naming it. Use sensory details, specific actions, and vivid descriptions.
            </p>
            
            <div className="bg-gray-50 p-3 rounded-lg mb-4">
              <ul className="grid grid-cols-2 gap-2 text-gray-700">
                <li>Anxiety</li>
                <li>Excitement</li>
                <li>Disappointment</li>
                <li>Pride</li>
                <li>Exhaustion</li>
                <li>Confusion</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Selected Emotion/State:</label>
                <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option>Select an emotion...</option>
                  <option>Anxiety</option>
                  <option>Excitement</option>
                  <option>Disappointment</option>
                  <option>Pride</option>
                  <option>Exhaustion</option>
                  <option>Confusion</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Descriptive Paragraph:</label>
                <textarea
                  rows={8}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Write your paragraph here, showing the emotion without naming it..."
                ></textarea>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-sm font-medium text-gray-700 mb-2">Self-assessment checklist:</p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                    <label className="ml-2 block text-sm text-gray-700">I used at least three different sensory details</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                    <label className="ml-2 block text-sm text-gray-700">I included specific, concrete details instead of general statements</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                    <label className="ml-2 block text-sm text-gray-700">I showed the emotion through actions and behaviors</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                    <label className="ml-2 block text-sm text-gray-700">I never directly named the emotion</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                    <label className="ml-2 block text-sm text-gray-700">I used at least one example of figurative language</label>
                  </div>
                </div>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-sm font-medium text-gray-700 mb-2">Reflection:</p>
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">What was the most challenging aspect of showing rather than telling?</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">How did using the "show, don't tell" technique make your writing more engaging?</label>
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
