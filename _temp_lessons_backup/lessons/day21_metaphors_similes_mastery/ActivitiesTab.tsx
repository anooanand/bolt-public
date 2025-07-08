import React from 'react';

export function ActivitiesTab() {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Interactive Activities</h3>
      
      <div className="bg-indigo-50 p-4 rounded-lg mb-6">
        <p className="text-gray-700">
          Complete these interactive activities to practice creating and using metaphors and similes effectively in your writing for the NSW Selective exam.
        </p>
      </div>
      
      <div className="space-y-8">
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-blue-50 px-4 py-2">
            <h4 className="font-medium text-blue-800">Activity 1: Identify Metaphors and Similes</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Read the following passages and identify whether each highlighted comparison is a metaphor or a simile.
            </p>
            
            <div className="space-y-6">
              <div>
                <p className="text-gray-700 mb-2">Passage 1:</p>
                <div className="border p-3 rounded-lg mb-3 bg-gray-50">
                  <p className="text-gray-700">
                    The old man's hands were <span className="bg-yellow-100 px-1 rounded">like weathered tree bark</span>, telling stories of decades of hard work. He sat quietly, <span className="bg-green-100 px-1 rounded">a mountain of patience</span> as the children buzzed around him. When he finally spoke, his voice <span className="bg-blue-100 px-1 rounded">was as deep as a well</span>, drawing everyone closer to hear his tales.
                  </p>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Yellow highlight: "like weathered tree bark"</label>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <input id="p1-1-metaphor" name="p1-1" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                        <label htmlFor="p1-1-metaphor" className="ml-2 block text-sm text-gray-700">Metaphor</label>
                      </div>
                      <div className="flex items-center">
                        <input id="p1-1-simile" name="p1-1" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                        <label htmlFor="p1-1-simile" className="ml-2 block text-sm text-gray-700">Simile</label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Green highlight: "a mountain of patience"</label>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <input id="p1-2-metaphor" name="p1-2" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                        <label htmlFor="p1-2-metaphor" className="ml-2 block text-sm text-gray-700">Metaphor</label>
                      </div>
                      <div className="flex items-center">
                        <input id="p1-2-simile" name="p1-2" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                        <label htmlFor="p1-2-simile" className="ml-2 block text-sm text-gray-700">Simile</label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Blue highlight: "was as deep as a well"</label>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <input id="p1-3-metaphor" name="p1-3" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                        <label htmlFor="p1-3-metaphor" className="ml-2 block text-sm text-gray-700">Metaphor</label>
                      </div>
                      <div className="flex items-center">
                        <input id="p1-3-simile" name="p1-3" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                        <label htmlFor="p1-3-simile" className="ml-2 block text-sm text-gray-700">Simile</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-gray-700 mb-2">Passage 2:</p>
                <div className="border p-3 rounded-lg mb-3 bg-gray-50">
                  <p className="text-gray-700">
                    The city <span className="bg-yellow-100 px-1 rounded">was a living organism</span>, breathing through its subway vents and pulsing with the movement of people. Traffic lights blinked <span className="bg-green-100 px-1 rounded">like the heartbeat of this concrete beast</span>. At night, the skyscrapers stood tall, <span className="bg-blue-100 px-1 rounded">sentinels guarding the dreams</span> of millions who slept beneath their watchful gaze.
                  </p>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Yellow highlight: "was a living organism"</label>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <input id="p2-1-metaphor" name="p2-1" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                        <label htmlFor="p2-1-metaphor" className="ml-2 block text-sm text-gray-700">Metaphor</label>
                      </div>
                      <div className="flex items-center">
                        <input id="p2-1-simile" name="p2-1" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                        <label htmlFor="p2-1-simile" className="ml-2 block text-sm text-gray-700">Simile</label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Green highlight: "like the heartbeat of this concrete beast"</label>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <input id="p2-2-metaphor" name="p2-2" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                        <label htmlFor="p2-2-metaphor" className="ml-2 block text-sm text-gray-700">Metaphor</label>
                      </div>
                      <div className="flex items-center">
                        <input id="p2-2-simile" name="p2-2" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                        <label htmlFor="p2-2-simile" className="ml-2 block text-sm text-gray-700">Simile</label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Blue highlight: "sentinels guarding the dreams"</label>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <input id="p2-3-metaphor" name="p2-3" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                        <label htmlFor="p2-3-metaphor" className="ml-2 block text-sm text-gray-700">Metaphor</label>
                      </div>
                      <div className="flex items-center">
                        <input id="p2-3-simile" name="p2-3" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                        <label htmlFor="p2-3-simile" className="ml-2 block text-sm text-gray-700">Simile</label>
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
            <h4 className="font-medium text-green-800">Activity 2: Transform Clichés into Original Comparisons</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Rewrite each clichéd metaphor or simile to create a fresh, original comparison.
            </p>
            
            <div className="space-y-6">
              <div>
                <p className="text-gray-700 mb-2">Cliché 1: <span className="font-medium">"Her eyes were as blue as the ocean."</span></p>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your original version:</label>
                  <textarea
                    rows={3}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Write your fresh, original comparison here..."
                  ></textarea>
                </div>
                <div className="mt-2">
                  <label className="block text-xs text-gray-500 mb-1">Is your comparison a:</label>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <input id="c1-metaphor" name="c1" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                      <label htmlFor="c1-metaphor" className="ml-2 block text-sm text-gray-700">Metaphor</label>
                    </div>
                    <div className="flex items-center">
                      <input id="c1-simile" name="c1" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                      <label htmlFor="c1-simile" className="ml-2 block text-sm text-gray-700">Simile</label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-gray-700 mb-2">Cliché 2: <span className="font-medium">"The children were busy little bees."</span></p>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your original version:</label>
                  <textarea
                    rows={3}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Write your fresh, original comparison here..."
                  ></textarea>
                </div>
                <div className="mt-2">
                  <label className="block text-xs text-gray-500 mb-1">Is your comparison a:</label>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <input id="c2-metaphor" name="c2" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                      <label htmlFor="c2-metaphor" className="ml-2 block text-sm text-gray-700">Metaphor</label>
                    </div>
                    <div className="flex items-center">
                      <input id="c2-simile" name="c2" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                      <label htmlFor="c2-simile" className="ml-2 block text-sm text-gray-700">Simile</label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-gray-700 mb-2">Cliché 3: <span className="font-medium">"Time is money."</span></p>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your original version:</label>
                  <textarea
                    rows={3}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Write your fresh, original comparison here..."
                  ></textarea>
                </div>
                <div className="mt-2">
                  <label className="block text-xs text-gray-500 mb-1">Is your comparison a:</label>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <input id="c3-metaphor" name="c3" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                      <label htmlFor="c3-metaphor" className="ml-2 block text-sm text-gray-700">Metaphor</label>
                    </div>
                    <div className="flex items-center">
                      <input id="c3-simile" name="c3" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                      <label htmlFor="c3-simile" className="ml-2 block text-sm text-gray-700">Simile</label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Submit Comparisons
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-purple-50 px-4 py-2">
            <h4 className="font-medium text-purple-800">Activity 3: Create Purposeful Comparisons</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Create metaphors or similes that enhance the mood or theme for each scenario.
            </p>
            
            <div className="space-y-6">
              <div>
                <p className="text-gray-700 mb-2">Scenario 1: <span className="font-medium">A character feeling anxious before an important test</span></p>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Create a metaphor:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Write a metaphor that captures the feeling of anxiety..."
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Create a simile:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Write a simile that captures the feeling of anxiety..."
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Explain how your comparisons enhance the mood:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Explain how your comparisons help convey anxiety..."
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-gray-700 mb-2">Scenario 2: <span className="font-medium">A peaceful natural setting at sunset</span></p>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Create a metaphor:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Write a metaphor that captures the peaceful sunset scene..."
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Create a simile:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Write a simile that captures the peaceful sunset scene..."
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Explain how your comparisons enhance the mood:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Explain how your comparisons help convey peacefulness..."
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Submit Comparisons
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-red-50 px-4 py-2">
            <h4 className="font-medium text-red-800">Activity 4: Create an Extended Metaphor</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Develop an extended metaphor throughout a paragraph to create a unified image.
            </p>
            
            <div className="space-y-6">
              <div>
                <p className="text-sm text-gray-600 mb-2">Choose a topic for your extended metaphor:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                  <div className="flex items-center">
                    <input id="topic1" name="topic" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="topic1" className="ml-2 block text-sm text-gray-700">School as a jungle</label>
                  </div>
                  <div className="flex items-center">
                    <input id="topic2" name="topic" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="topic2" className="ml-2 block text-sm text-gray-700">Mind as a garden</label>
                  </div>
                  <div className="flex items-center">
                    <input id="topic3" name="topic" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="topic3" className="ml-2 block text-sm text-gray-700">Life as a roller coaster</label>
                  </div>
                  <div className="flex items-center">
                    <input id="topic4" name="topic" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="topic4" className="ml-2 block text-sm text-gray-700">Your own choice:</label>
                    <input type="text" className="ml-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="Enter a topic..." />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Planning your extended metaphor:</label>
                  <div className="grid grid-cols-1 gap-3">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Main comparison (What is being compared to what?):</label>
                      <input type="text" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="e.g., School is a jungle" />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">List at least 3 elements you'll include in your extended metaphor:</label>
                      <textarea
                        rows={3}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="e.g., For 'School is a jungle': 1. Teachers as different animals 2. Hallways as paths through dense vegetation 3. Cafeteria as a watering hole..."
                      ></textarea>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Write your extended metaphor paragraph:</label>
                  <textarea
                    rows={8}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Write a paragraph that develops your metaphor throughout, creating a unified image..."
                  ></textarea>
                </div>
                
                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Self-Assessment Checklist:</label>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input id="check1" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="check1" className="ml-2 block text-sm text-gray-700">I established a clear main comparison.</label>
                    </div>
                    <div className="flex items-center">
                      <input id="check2" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="check2" className="ml-2 block text-sm text-gray-700">I developed at least three aspects of the metaphor.</label>
                    </div>
                    <div className="flex items-center">
                      <input id="check3" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="check3" className="ml-2 block text-sm text-gray-700">I used vocabulary related to the metaphor throughout.</label>
                    </div>
                    <div className="flex items-center">
                      <input id="check4" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="check4" className="ml-2 block text-sm text-gray-700">My metaphor creates a unified, coherent image.</label>
                    </div>
                    <div className="flex items-center">
                      <input id="check5" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="check5" className="ml-2 block text-sm text-gray-700">My metaphor is original and avoids clichés.</label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Submit Extended Metaphor
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
