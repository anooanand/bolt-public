import React from 'react';

export function ActivitiesTab() {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Interactive Activities</h3>
      
      <div className="bg-indigo-50 p-4 rounded-lg mb-6">
        <p className="text-gray-700">
          Complete these interactive activities to practice creating and controlling mood and tone in your writing for the NSW Selective exam.
        </p>
      </div>
      
      <div className="space-y-8">
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-blue-50 px-4 py-2">
            <h4 className="font-medium text-blue-800">Activity 1: Identify Mood and Tone</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Read the following passages and identify the mood and tone in each.
            </p>
            
            <div className="space-y-6">
              <div>
                <p className="text-gray-700 mb-2">Passage 1:</p>
                <div className="border p-3 rounded-lg mb-3 bg-gray-50">
                  <p className="text-gray-700">
                    The ancient trees loomed overhead, their twisted branches reaching like gnarled fingers across the path. Shadows deepened with each step I took, and the forest floor muffled my footsteps, as if the woods themselves were holding their breath. A distant owl called once, the sound hanging in the heavy air before fading into silence. Something rustled in the undergrowth to my left, but when I turned to look, nothing moved.
                  </p>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">What is the mood of this passage?</label>
                    <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                      <option>Select the mood...</option>
                      <option value="1">Joyful</option>
                      <option value="2">Mysterious/Ominous</option>
                      <option value="3">Peaceful</option>
                      <option value="4">Melancholic</option>
                      <option value="5">Nostalgic</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Identify three specific words or phrases that create this mood:</label>
                    <textarea
                      rows={3}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="List three specific words or phrases..."
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-gray-700 mb-2">Passage 2:</p>
                <div className="border p-3 rounded-lg mb-3 bg-gray-50">
                  <p className="text-gray-700">
                    Look, I get it. Everyone thinks they're an expert these days. Just spend five minutes online and suddenly you've got a PhD in whatever topic is trending. But let's be real for a second—most of what's being shared is complete nonsense. I've spent fifteen years studying this field, and I can tell you with absolute certainty that the popular "facts" circulating on social media wouldn't pass a basic fact-check. But sure, believe whatever meme comes your way. Who needs actual research when you've got likes and shares, right?
                  </p>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">What is the tone of this passage?</label>
                    <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                      <option>Select the tone...</option>
                      <option value="1">Formal</option>
                      <option value="2">Sympathetic</option>
                      <option value="3">Sarcastic</option>
                      <option value="4">Optimistic</option>
                      <option value="5">Objective</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Identify three specific phrases that reveal the writer's attitude:</label>
                    <textarea
                      rows={3}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="List three specific phrases..."
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-gray-700 mb-2">Passage 3:</p>
                <div className="border p-3 rounded-lg mb-3 bg-gray-50">
                  <p className="text-gray-700">
                    The sunlight sparkled on the lake's surface like scattered diamonds, while a gentle breeze carried the sweet scent of wildflowers across the water. Children's laughter rang out from the shore, where families spread colorful blankets on the grass. A pair of swans glided serenely past, barely creating a ripple. I closed my eyes and tilted my face toward the warmth of the sun, feeling the tension melt from my shoulders for the first time in months.
                  </p>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">What is the mood of this passage?</label>
                    <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                      <option>Select the mood...</option>
                      <option value="1">Tense</option>
                      <option value="2">Peaceful</option>
                      <option value="3">Mysterious</option>
                      <option value="4">Melancholic</option>
                      <option value="5">Suspenseful</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">What techniques does the writer use to create this mood? (Select all that apply)</label>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input id="tech1" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                        <label htmlFor="tech1" className="ml-2 block text-sm text-gray-700">Sensory details</label>
                      </div>
                      <div className="flex items-center">
                        <input id="tech2" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                        <label htmlFor="tech2" className="ml-2 block text-sm text-gray-700">Figurative language</label>
                      </div>
                      <div className="flex items-center">
                        <input id="tech3" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                        <label htmlFor="tech3" className="ml-2 block text-sm text-gray-700">Word choice with positive connotations</label>
                      </div>
                      <div className="flex items-center">
                        <input id="tech4" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                        <label htmlFor="tech4" className="ml-2 block text-sm text-gray-700">Short, urgent sentences</label>
                      </div>
                      <div className="flex items-center">
                        <input id="tech5" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                        <label htmlFor="tech5" className="ml-2 block text-sm text-gray-700">Dark imagery</label>
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
            <h4 className="font-medium text-green-800">Activity 2: Word Choice for Mood</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Select words with appropriate connotations to create different moods in the same basic sentence.
            </p>
            
            <div className="space-y-6">
              <div>
                <p className="text-gray-700 mb-2">Complete each sentence by selecting words that create the specified mood:</p>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">1. The house _____ at the end of the street. (Ominous mood)</label>
                    <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                      <option>Select a word...</option>
                      <option value="1">stood</option>
                      <option value="2">loomed</option>
                      <option value="3">nestled</option>
                      <option value="4">waited</option>
                      <option value="5">rested</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">2. The house _____ at the end of the street. (Peaceful mood)</label>
                    <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                      <option>Select a word...</option>
                      <option value="1">stood</option>
                      <option value="2">loomed</option>
                      <option value="3">nestled</option>
                      <option value="4">waited</option>
                      <option value="5">rested</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">3. The wind _____ through the trees. (Peaceful mood)</label>
                    <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                      <option>Select a word...</option>
                      <option value="1">howled</option>
                      <option value="2">whispered</option>
                      <option value="3">screamed</option>
                      <option value="4">slashed</option>
                      <option value="5">roared</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">4. The wind _____ through the trees. (Threatening mood)</label>
                    <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                      <option>Select a word...</option>
                      <option value="1">howled</option>
                      <option value="2">whispered</option>
                      <option value="3">danced</option>
                      <option value="4">played</option>
                      <option value="5">moved</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-gray-700 mb-2">Now create your own sentences with words that establish a specific mood:</p>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Write a sentence about rain that creates a melancholic mood:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Write your sentence here..."
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Write a sentence about rain that creates a joyful mood:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Write your sentence here..."
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Underline the specific words in your sentences that help create each mood:</label>
                    <textarea
                      rows={3}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="List the words that create each mood..."
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Submit Answers
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-purple-50 px-4 py-2">
            <h4 className="font-medium text-purple-800">Activity 3: Rewrite for Different Moods</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Rewrite the same basic scene to create different moods.
            </p>
            
            <div className="space-y-6">
              <div>
                <p className="text-gray-700 mb-2">Basic scene: <span className="font-medium">"A student walks into the school building on the first day."</span></p>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Rewrite this scene with an anxious/nervous mood:</label>
                    <textarea
                      rows={4}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Describe the scene with an anxious mood..."
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Rewrite this scene with an excited/hopeful mood:</label>
                    <textarea
                      rows={4}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Describe the scene with an excited mood..."
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">What techniques did you use to create each mood? (Select all that apply)</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div className="flex items-center">
                        <input id="tech1" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                        <label htmlFor="tech1" className="ml-2 block text-sm text-gray-700">Word choice (diction)</label>
                      </div>
                      <div className="flex items-center">
                        <input id="tech2" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                        <label htmlFor="tech2" className="ml-2 block text-sm text-gray-700">Sentence structure</label>
                      </div>
                      <div className="flex items-center">
                        <input id="tech3" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                        <label htmlFor="tech3" className="ml-2 block text-sm text-gray-700">Sensory details</label>
                      </div>
                      <div className="flex items-center">
                        <input id="tech4" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                        <label htmlFor="tech4" className="ml-2 block text-sm text-gray-700">Imagery & figurative language</label>
                      </div>
                      <div className="flex items-center">
                        <input id="tech5" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                        <label htmlFor="tech5" className="ml-2 block text-sm text-gray-700">Character's thoughts/feelings</label>
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
                  Submit Rewrites
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-red-50 px-4 py-2">
            <h4 className="font-medium text-red-800">Activity 4: Create a Mood-Focused Paragraph</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Write a descriptive paragraph with a specific mood using multiple techniques.
            </p>
            
            <div className="space-y-6">
              <div>
                <p className="text-sm text-gray-600 mb-2">Choose a mood for your paragraph:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                  <div className="flex items-center">
                    <input id="mood1" name="mood" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="mood1" className="ml-2 block text-sm text-gray-700">Mysterious</label>
                  </div>
                  <div className="flex items-center">
                    <input id="mood2" name="mood" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="mood2" className="ml-2 block text-sm text-gray-700">Nostalgic</label>
                  </div>
                  <div className="flex items-center">
                    <input id="mood3" name="mood" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="mood3" className="ml-2 block text-sm text-gray-700">Tense/Suspenseful</label>
                  </div>
                  <div className="flex items-center">
                    <input id="mood4" name="mood" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="mood4" className="ml-2 block text-sm text-gray-700">Your own choice:</label>
                    <input type="text" className="ml-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="Enter a mood..." />
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Choose a setting for your paragraph:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="flex items-center">
                      <input id="setting1" name="setting" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                      <label htmlFor="setting1" className="ml-2 block text-sm text-gray-700">An abandoned building</label>
                    </div>
                    <div className="flex items-center">
                      <input id="setting2" name="setting" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                      <label htmlFor="setting2" className="ml-2 block text-sm text-gray-700">A beach at sunset</label>
                    </div>
                    <div className="flex items-center">
                      <input id="setting3" name="setting" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                      <label htmlFor="setting3" className="ml-2 block text-sm text-gray-700">A busy city street</label>
                    </div>
                    <div className="flex items-center">
                      <input id="setting4" name="setting" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                      <label htmlFor="setting4" className="ml-2 block text-sm text-gray-700">Your own choice:</label>
                      <input type="text" className="ml-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="Enter a setting..." />
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Planning your mood-focused paragraph:</label>
                  <div className="grid grid-cols-1 gap-3">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">List 5-7 words with connotations that match your chosen mood:</label>
                      <textarea
                        rows={2}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="List words that evoke your chosen mood..."
                      ></textarea>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">List 2-3 sensory details you'll include:</label>
                      <textarea
                        rows={2}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="List sensory details (sight, sound, smell, taste, touch)..."
                      ></textarea>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Note any figurative language you'll use (simile, metaphor, personification):</label>
                      <textarea
                        rows={2}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Describe figurative language you'll include..."
                      ></textarea>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Write your mood-focused paragraph:</label>
                  <textarea
                    rows={8}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Write your paragraph here, focusing on creating your chosen mood..."
                  ></textarea>
                </div>
                
                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Self-Assessment Checklist:</label>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input id="check1" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="check1" className="ml-2 block text-sm text-gray-700">I used word choice (diction) with appropriate connotations.</label>
                    </div>
                    <div className="flex items-center">
                      <input id="check2" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="check2" className="ml-2 block text-sm text-gray-700">I included specific sensory details.</label>
                    </div>
                    <div className="flex items-center">
                      <input id="check3" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="check3" className="ml-2 block text-sm text-gray-700">I used sentence structure effectively (varied length, fragments for effect, etc.).</label>
                    </div>
                    <div className="flex items-center">
                      <input id="check4" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="check4" className="ml-2 block text-sm text-gray-700">I incorporated figurative language (simile, metaphor, personification).</label>
                    </div>
                    <div className="flex items-center">
                      <input id="check5" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="check5" className="ml-2 block text-sm text-gray-700">My paragraph creates a consistent, clear mood throughout.</label>
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
