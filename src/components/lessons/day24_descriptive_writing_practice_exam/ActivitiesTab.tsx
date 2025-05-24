import React from 'react';

export function ActivitiesTab() {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Interactive Activities</h3>
      
      <div className="bg-indigo-50 p-4 rounded-lg mb-6">
        <p className="text-gray-700">
          Complete these interactive activities to practice applying all the descriptive writing techniques you've learned for the NSW Selective exam.
        </p>
      </div>
      
      <div className="space-y-8">
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-blue-50 px-4 py-2">
            <h4 className="font-medium text-blue-800">Activity 1: Review Descriptive Writing Techniques</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Match each descriptive writing technique with its correct definition and example.
            </p>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-3 rounded border">
                  <h5 className="font-medium text-gray-800 mb-2">Techniques</h5>
                  <ul className="space-y-2 text-gray-700">
                    <li className="p-2 bg-white rounded shadow-sm">1. Sensory Details</li>
                    <li className="p-2 bg-white rounded shadow-sm">2. Figurative Language</li>
                    <li className="p-2 bg-white rounded shadow-sm">3. Specific Word Choice</li>
                    <li className="p-2 bg-white rounded shadow-sm">4. Varied Sentence Structure</li>
                    <li className="p-2 bg-white rounded shadow-sm">5. Creating Mood</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 p-3 rounded border">
                  <h5 className="font-medium text-gray-800 mb-2">Definitions</h5>
                  <div className="space-y-2">
                    <select className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                      <option>Match with Technique 1</option>
                      <option value="A">Using language that compares one thing to another</option>
                      <option value="B">Creating a particular feeling or atmosphere</option>
                      <option value="C">Using precise, vivid nouns and strong verbs</option>
                      <option value="D">Descriptions that appeal to sight, sound, smell, taste, and touch</option>
                      <option value="E">Using a mix of simple, compound, and complex sentences</option>
                    </select>
                    
                    <select className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                      <option>Match with Technique 2</option>
                      <option value="A">Using language that compares one thing to another</option>
                      <option value="B">Creating a particular feeling or atmosphere</option>
                      <option value="C">Using precise, vivid nouns and strong verbs</option>
                      <option value="D">Descriptions that appeal to sight, sound, smell, taste, and touch</option>
                      <option value="E">Using a mix of simple, compound, and complex sentences</option>
                    </select>
                    
                    <select className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                      <option>Match with Technique 3</option>
                      <option value="A">Using language that compares one thing to another</option>
                      <option value="B">Creating a particular feeling or atmosphere</option>
                      <option value="C">Using precise, vivid nouns and strong verbs</option>
                      <option value="D">Descriptions that appeal to sight, sound, smell, taste, and touch</option>
                      <option value="E">Using a mix of simple, compound, and complex sentences</option>
                    </select>
                    
                    <select className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                      <option>Match with Technique 4</option>
                      <option value="A">Using language that compares one thing to another</option>
                      <option value="B">Creating a particular feeling or atmosphere</option>
                      <option value="C">Using precise, vivid nouns and strong verbs</option>
                      <option value="D">Descriptions that appeal to sight, sound, smell, taste, and touch</option>
                      <option value="E">Using a mix of simple, compound, and complex sentences</option>
                    </select>
                    
                    <select className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                      <option>Match with Technique 5</option>
                      <option value="A">Using language that compares one thing to another</option>
                      <option value="B">Creating a particular feeling or atmosphere</option>
                      <option value="C">Using precise, vivid nouns and strong verbs</option>
                      <option value="D">Descriptions that appeal to sight, sound, smell, taste, and touch</option>
                      <option value="E">Using a mix of simple, compound, and complex sentences</option>
                    </select>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-3 rounded border">
                  <h5 className="font-medium text-gray-800 mb-2">Examples</h5>
                  <div className="space-y-2">
                    <select className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                      <option>Match with Technique 1</option>
                      <option value="1">"The velvet petals felt smooth against my fingertips, while the sweet fragrance filled my nostrils."</option>
                      <option value="2">"The old house was a silent guardian, watching over the neighborhood with tired eyes."</option>
                      <option value="3">"The dog sprinted across the yard, pounced on the tennis ball, and triumphantly trotted back."</option>
                      <option value="4">"She trudged through the deserted streets. Cold. Alone. Forgotten."</option>
                      <option value="5">"The mansion towered over us, its windows like vacant eyes staring down at unwelcome visitors."</option>
                    </select>
                    
                    <select className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                      <option>Match with Technique 2</option>
                      <option value="1">"The velvet petals felt smooth against my fingertips, while the sweet fragrance filled my nostrils."</option>
                      <option value="2">"The old house was a silent guardian, watching over the neighborhood with tired eyes."</option>
                      <option value="3">"The dog sprinted across the yard, pounced on the tennis ball, and triumphantly trotted back."</option>
                      <option value="4">"She trudged through the deserted streets. Cold. Alone. Forgotten."</option>
                      <option value="5">"The mansion towered over us, its windows like vacant eyes staring down at unwelcome visitors."</option>
                    </select>
                    
                    <select className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                      <option>Match with Technique 3</option>
                      <option value="1">"The velvet petals felt smooth against my fingertips, while the sweet fragrance filled my nostrils."</option>
                      <option value="2">"The old house was a silent guardian, watching over the neighborhood with tired eyes."</option>
                      <option value="3">"The dog sprinted across the yard, pounced on the tennis ball, and triumphantly trotted back."</option>
                      <option value="4">"She trudged through the deserted streets. Cold. Alone. Forgotten."</option>
                      <option value="5">"The mansion towered over us, its windows like vacant eyes staring down at unwelcome visitors."</option>
                    </select>
                    
                    <select className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                      <option>Match with Technique 4</option>
                      <option value="1">"The velvet petals felt smooth against my fingertips, while the sweet fragrance filled my nostrils."</option>
                      <option value="2">"The old house was a silent guardian, watching over the neighborhood with tired eyes."</option>
                      <option value="3">"The dog sprinted across the yard, pounced on the tennis ball, and triumphantly trotted back."</option>
                      <option value="4">"She trudged through the deserted streets. Cold. Alone. Forgotten."</option>
                      <option value="5">"The mansion towered over us, its windows like vacant eyes staring down at unwelcome visitors."</option>
                    </select>
                    
                    <select className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                      <option>Match with Technique 5</option>
                      <option value="1">"The velvet petals felt smooth against my fingertips, while the sweet fragrance filled my nostrils."</option>
                      <option value="2">"The old house was a silent guardian, watching over the neighborhood with tired eyes."</option>
                      <option value="3">"The dog sprinted across the yard, pounced on the tennis ball, and triumphantly trotted back."</option>
                      <option value="4">"She trudged through the deserted streets. Cold. Alone. Forgotten."</option>
                      <option value="5">"The mansion towered over us, its windows like vacant eyes staring down at unwelcome visitors."</option>
                    </select>
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
            <h4 className="font-medium text-green-800">Activity 2: Analyze the Practice Prompt</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Analyze the following descriptive writing prompt and plan your response.
            </p>
            
            <div className="space-y-6">
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <p className="text-gray-800 font-medium">Practice Prompt:</p>
                <p className="text-gray-800 italic">"Write a descriptive piece about a place that feels like home to you."</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">What specific place will you choose to describe?</label>
                <input
                  type="text"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="e.g., My grandmother's kitchen, a local park, my reading corner..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">What mood or feeling do you want to create?</label>
                <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option>Select a mood...</option>
                  <option value="1">Peaceful/Comforting</option>
                  <option value="2">Nostalgic/Sentimental</option>
                  <option value="3">Joyful/Energetic</option>
                  <option value="4">Cozy/Intimate</option>
                  <option value="5">Other (specify in your plan)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Plan your description by listing details for each sense:</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Visual details (What can be seen?)</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="List 3-5 specific visual details..."
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Sounds (What can be heard?)</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="List 2-3 specific sounds..."
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Smells (What can be smelled?)</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="List 2-3 specific smells..."
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Tactile sensations (What can be felt?)</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="List 2-3 tactile sensations..."
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Plan your figurative language:</label>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">One simile you'll use:</label>
                    <input
                      type="text"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="e.g., The kitchen was as warm as a gentle hug..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">One metaphor you'll use:</label>
                    <input
                      type="text"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="e.g., The old armchair was a faithful friend..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">One example of personification you'll use:</label>
                    <input
                      type="text"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="e.g., The fireplace whispered comforting stories..."
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Outline your description structure:</label>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Introduction (first impression):</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="How will you introduce the place?"
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Middle (detailed exploration):</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="How will you organize the main body of your description?"
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Conclusion (final impression):</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="How will you conclude your description?"
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save Plan
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-purple-50 px-4 py-2">
            <h4 className="font-medium text-purple-800">Activity 3: Write Your Descriptive Piece</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Write your complete descriptive piece based on your plan. Remember to use the techniques we've learned.
            </p>
            
            <div className="space-y-6">
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <div className="flex items-center mb-2">
                  <svg className="h-5 w-5 text-yellow-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <p className="text-gray-800 font-medium">Timed Writing Exercise (30 minutes)</p>
                </div>
                <p className="text-gray-800">
                  This is a timed exercise to simulate exam conditions. Try to complete your descriptive piece within 30 minutes.
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your descriptive piece:</label>
                <textarea
                  rows={15}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Write your complete descriptive piece here..."
                ></textarea>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save Writing
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-red-50 px-4 py-2">
            <h4 className="font-medium text-red-800">Activity 4: Review and Improve</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Evaluate your descriptive piece against the assessment criteria and identify areas for improvement.
            </p>
            
            <div className="space-y-6">
              <div>
                <h5 className="text-sm font-medium text-gray-700 mb-2">Self-Assessment Checklist:</h5>
                <div className="space-y-2 border p-4 rounded-lg bg-gray-50">
                  <div className="flex items-center">
                    <input id="check1" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="check1" className="ml-2 block text-sm text-gray-700">I engaged all five senses in my description.</label>
                  </div>
                  <div className="flex items-center">
                    <input id="check2" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="check2" className="ml-2 block text-sm text-gray-700">I used specific, vivid language (strong verbs, precise nouns).</label>
                  </div>
                  <div className="flex items-center">
                    <input id="check3" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="check3" className="ml-2 block text-sm text-gray-700">I included figurative language (similes, metaphors, personification).</label>
                  </div>
                  <div className="flex items-center">
                    <input id="check4" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="check4" className="ml-2 block text-sm text-gray-700">I created a consistent mood throughout my description.</label>
                  </div>
                  <div className="flex items-center">
                    <input id="check5" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="check5" className="ml-2 block text-sm text-gray-700">I varied my sentence structure (length and type).</label>
                  </div>
                  <div className="flex items-center">
                    <input id="check6" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="check6" className="ml-2 block text-sm text-gray-700">I showed rather than told (used details to convey feelings/impressions).</label>
                  </div>
                  <div className="flex items-center">
                    <input id="check7" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="check7" className="ml-2 block text-sm text-gray-700">I organized my description in a logical way.</label>
                  </div>
                  <div className="flex items-center">
                    <input id="check8" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="check8" className="ml-2 block text-sm text-gray-700">I checked for spelling and grammar errors.</label>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Identify your strengths:</label>
                <textarea
                  rows={3}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="What did you do well in your descriptive piece?"
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Identify areas for improvement:</label>
                <textarea
                  rows={3}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="What could you improve in your descriptive piece?"
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Revise one paragraph:</label>
                <p className="text-sm text-gray-500 mb-2">Choose one paragraph from your description and revise it to improve it.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Original paragraph:</label>
                    <textarea
                      rows={5}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Copy one paragraph from your description..."
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Revised paragraph:</label>
                    <textarea
                      rows={5}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Rewrite the paragraph with improvements..."
                    ></textarea>
                  </div>
                </div>
                <div className="mt-2">
                  <label className="block text-xs text-gray-500 mb-1">Explain your changes:</label>
                  <textarea
                    rows={2}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="What specific improvements did you make and why?"
                  ></textarea>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Complete Review
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
