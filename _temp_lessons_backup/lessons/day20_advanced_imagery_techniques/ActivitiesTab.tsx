import React from 'react';

export function ActivitiesTab() {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Interactive Activities</h3>
      
      <div className="bg-indigo-50 p-4 rounded-lg mb-6">
        <p className="text-gray-700">
          Complete these interactive activities to practice using advanced imagery techniques to create powerful, memorable writing for the NSW Selective exam.
        </p>
      </div>
      
      <div className="space-y-8">
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-blue-50 px-4 py-2">
            <h4 className="font-medium text-blue-800">Activity 1: Identify Advanced Imagery Techniques</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Read the following passages and identify which advanced imagery technique is being used in each.
            </p>
            
            <div className="space-y-6">
              <div>
                <p className="text-gray-700 mb-2">Passage 1:</p>
                <div className="border p-3 rounded-lg mb-3 bg-gray-50">
                  <p className="text-gray-700 italic">
                    "The old man's memories were a vast ocean, with some moments floating like bright buoys on the surface while others lurked in the murky depths. Each day, he dove deeper into these waters, swimming through currents of regret and surfacing with pearls of wisdom that he carefully arranged on the shore of his present life."
                  </p>
                </div>
                <div className="mt-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Which advanced imagery technique is primarily used in this passage?</label>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input id="p1-juxtaposition" name="passage1" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                      <label htmlFor="p1-juxtaposition" className="ml-2 block text-sm text-gray-700">Juxtaposition</label>
                    </div>
                    <div className="flex items-center">
                      <input id="p1-synesthesia" name="passage1" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                      <label htmlFor="p1-synesthesia" className="ml-2 block text-sm text-gray-700">Synesthesia</label>
                    </div>
                    <div className="flex items-center">
                      <input id="p1-extended-metaphor" name="passage1" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                      <label htmlFor="p1-extended-metaphor" className="ml-2 block text-sm text-gray-700">Extended Metaphor</label>
                    </div>
                    <div className="flex items-center">
                      <input id="p1-symbolism" name="passage1" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                      <label htmlFor="p1-symbolism" className="ml-2 block text-sm text-gray-700">Symbolism</label>
                    </div>
                    <div className="flex items-center">
                      <input id="p1-motif" name="passage1" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                      <label htmlFor="p1-motif" className="ml-2 block text-sm text-gray-700">Motif</label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-gray-700 mb-2">Passage 2:</p>
                <div className="border p-3 rounded-lg mb-3 bg-gray-50">
                  <p className="text-gray-700 italic">
                    "The violinist's notes painted vibrant purple swirls in the air, each crescendo a burst of crimson that warmed the audience's skin. As the melody softened, cool blue tones washed over the concert hall, leaving a sweet aftertaste like mint on everyone's tongue."
                  </p>
                </div>
                <div className="mt-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Which advanced imagery technique is primarily used in this passage?</label>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input id="p2-juxtaposition" name="passage2" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                      <label htmlFor="p2-juxtaposition" className="ml-2 block text-sm text-gray-700">Juxtaposition</label>
                    </div>
                    <div className="flex items-center">
                      <input id="p2-synesthesia" name="passage2" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                      <label htmlFor="p2-synesthesia" className="ml-2 block text-sm text-gray-700">Synesthesia</label>
                    </div>
                    <div className="flex items-center">
                      <input id="p2-extended-metaphor" name="passage2" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                      <label htmlFor="p2-extended-metaphor" className="ml-2 block text-sm text-gray-700">Extended Metaphor</label>
                    </div>
                    <div className="flex items-center">
                      <input id="p2-symbolism" name="passage2" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                      <label htmlFor="p2-symbolism" className="ml-2 block text-sm text-gray-700">Symbolism</label>
                    </div>
                    <div className="flex items-center">
                      <input id="p2-motif" name="passage2" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                      <label htmlFor="p2-motif" className="ml-2 block text-sm text-gray-700">Motif</label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-gray-700 mb-2">Passage 3:</p>
                <div className="border p-3 rounded-lg mb-3 bg-gray-50">
                  <p className="text-gray-700 italic">
                    "The pristine white wedding dress hung in the window of the abandoned shop, now gray with dust and age. A single ray of sunlight illuminated it against the backdrop of crumbling walls and shattered dreams."
                  </p>
                </div>
                <div className="mt-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Which advanced imagery technique is primarily used in this passage?</label>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input id="p3-juxtaposition" name="passage3" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                      <label htmlFor="p3-juxtaposition" className="ml-2 block text-sm text-gray-700">Juxtaposition</label>
                    </div>
                    <div className="flex items-center">
                      <input id="p3-synesthesia" name="passage3" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                      <label htmlFor="p3-synesthesia" className="ml-2 block text-sm text-gray-700">Synesthesia</label>
                    </div>
                    <div className="flex items-center">
                      <input id="p3-extended-metaphor" name="passage3" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                      <label htmlFor="p3-extended-metaphor" className="ml-2 block text-sm text-gray-700">Extended Metaphor</label>
                    </div>
                    <div className="flex items-center">
                      <input id="p3-symbolism" name="passage3" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                      <label htmlFor="p3-symbolism" className="ml-2 block text-sm text-gray-700">Symbolism</label>
                    </div>
                    <div className="flex items-center">
                      <input id="p3-motif" name="passage3" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                      <label htmlFor="p3-motif" className="ml-2 block text-sm text-gray-700">Motif</label>
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
            <h4 className="font-medium text-green-800">Activity 2: Create Synesthesia</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Practice creating synesthesia by describing one sensory experience in terms of another.
            </p>
            
            <div className="space-y-6">
              <div>
                <p className="text-gray-700 mb-2">Complete each sentence using synesthesia:</p>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">1. The music felt like...</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Describe how music (sound) feels physically (touch)..."
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">2. The scent of roses tasted like...</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Describe how a scent (smell) has a taste..."
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">3. The bright colors sounded like...</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Describe how colors (sight) have a sound..."
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">4. The smooth texture smelled like...</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Describe how a texture (touch) has a smell..."
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">5. Create your own synesthesia example:</label>
                    <textarea
                      rows={3}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Create a sentence that describes one sense in terms of another..."
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
            <h4 className="font-medium text-purple-800">Activity 3: Develop Extended Metaphors</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Practice developing extended metaphors by expanding on the initial comparisons below.
            </p>
            
            <div className="space-y-6">
              <div>
                <p className="text-gray-700 mb-2">Choose one of the following metaphor starters and develop it into an extended metaphor paragraph:</p>
                <div className="space-y-3 mb-4">
                  <div className="flex items-center">
                    <input id="meta1" name="metaphor" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="meta1" className="ml-2 block text-sm text-gray-700">"Life is a journey..."</label>
                  </div>
                  <div className="flex items-center">
                    <input id="meta2" name="metaphor" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="meta2" className="ml-2 block text-sm text-gray-700">"Her anger was a volcano..."</label>
                  </div>
                  <div className="flex items-center">
                    <input id="meta3" name="metaphor" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="meta3" className="ml-2 block text-sm text-gray-700">"The classroom was a zoo..."</label>
                  </div>
                  <div className="flex items-center">
                    <input id="meta4" name="metaphor" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="meta4" className="ml-2 block text-sm text-gray-700">"His mind was a computer..."</label>
                  </div>
                  <div className="flex items-center">
                    <input id="meta5" name="metaphor" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="meta5" className="ml-2 block text-sm text-gray-700">Create your own metaphor starter:</label>
                    <input type="text" className="ml-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="Enter your metaphor starter..." />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Develop your extended metaphor:</label>
                  <textarea
                    rows={6}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Write a paragraph that extends your chosen metaphor throughout. Continue the comparison in multiple ways, developing the image fully..."
                  ></textarea>
                </div>
                
                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Self-check: How did you extend the metaphor?</label>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input id="ext1" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="ext1" className="ml-2 block text-sm text-gray-700">I used multiple aspects of the metaphor (e.g., different parts of a journey)</label>
                    </div>
                    <div className="flex items-center">
                      <input id="ext2" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="ext2" className="ml-2 block text-sm text-gray-700">I used related vocabulary throughout the paragraph</label>
                    </div>
                    <div className="flex items-center">
                      <input id="ext3" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="ext3" className="ml-2 block text-sm text-gray-700">I maintained the comparison consistently</label>
                    </div>
                    <div className="flex items-center">
                      <input id="ext4" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="ext4" className="ml-2 block text-sm text-gray-700">I created a vivid, detailed image</label>
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
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-red-50 px-4 py-2">
            <h4 className="font-medium text-red-800">Activity 4: Create Advanced Imagery</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Write a descriptive paragraph using at least two advanced imagery techniques from today's lesson.
            </p>
            
            <div className="space-y-6">
              <div>
                <p className="text-sm text-gray-600 mb-2">Choose a scenario to describe:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                  <div className="flex items-center">
                    <input id="scene1" name="scene" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="scene1" className="ml-2 block text-sm text-gray-700">A moment of triumph or achievement</label>
                  </div>
                  <div className="flex items-center">
                    <input id="scene2" name="scene" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="scene2" className="ml-2 block text-sm text-gray-700">A significant change or transformation</label>
                  </div>
                  <div className="flex items-center">
                    <input id="scene3" name="scene" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="scene3" className="ml-2 block text-sm text-gray-700">An emotional moment between characters</label>
                  </div>
                  <div className="flex items-center">
                    <input id="scene4" name="scene" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="scene4" className="ml-2 block text-sm text-gray-700">Your own choice:</label>
                    <input type="text" className="ml-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="Enter a scenario..." />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Select the imagery techniques you'll use (choose at least two):</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="flex items-center">
                      <input id="tech1" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="tech1" className="ml-2 block text-sm text-gray-700">Juxtaposition</label>
                    </div>
                    <div className="flex items-center">
                      <input id="tech2" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="tech2" className="ml-2 block text-sm text-gray-700">Synesthesia</label>
                    </div>
                    <div className="flex items-center">
                      <input id="tech3" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="tech3" className="ml-2 block text-sm text-gray-700">Extended Metaphor</label>
                    </div>
                    <div className="flex items-center">
                      <input id="tech4" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="tech4" className="ml-2 block text-sm text-gray-700">Symbolism</label>
                    </div>
                    <div className="flex items-center">
                      <input id="tech5" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="tech5" className="ml-2 block text-sm text-gray-700">Motif</label>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Write your descriptive paragraph:</label>
                  <textarea
                    rows={10}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Write your paragraph using at least two advanced imagery techniques..."
                  ></textarea>
                </div>
                
                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Explain your use of imagery techniques:</label>
                  <textarea
                    rows={4}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Explain which techniques you used and how you incorporated them into your paragraph..."
                  ></textarea>
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
