import React from 'react';

export function ActivitiesTab() {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Interactive Activities</h3>
      
      <div className="bg-indigo-50 p-4 rounded-lg mb-6">
        <p className="text-gray-700">
          Complete these interactive activities to practice writing a complete persuasive essay for the NSW Selective exam.
        </p>
      </div>
      
      <div className="space-y-8">
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-blue-50 px-4 py-2">
            <h4 className="font-medium text-blue-800">Activity 1: Review Persuasive Techniques</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Review the persuasive techniques you've learned and select the ones you plan to use in your practice essay.
            </p>
            
            <div className="space-y-6">
              <div>
                <p className="text-gray-700 mb-2">Check the persuasive techniques you plan to incorporate in your essay:</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <div className="flex items-center">
                    <input id="tech1" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="tech1" className="ml-2 block text-sm text-gray-700">Rhetorical questions</label>
                  </div>
                  <div className="flex items-center">
                    <input id="tech2" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="tech2" className="ml-2 block text-sm text-gray-700">Emotive language</label>
                  </div>
                  <div className="flex items-center">
                    <input id="tech3" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="tech3" className="ml-2 block text-sm text-gray-700">Facts and statistics</label>
                  </div>
                  <div className="flex items-center">
                    <input id="tech4" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="tech4" className="ml-2 block text-sm text-gray-700">Expert opinions</label>
                  </div>
                  <div className="flex items-center">
                    <input id="tech5" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="tech5" className="ml-2 block text-sm text-gray-700">Personal anecdotes</label>
                  </div>
                  <div className="flex items-center">
                    <input id="tech6" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="tech6" className="ml-2 block text-sm text-gray-700">Inclusive language (we, our)</label>
                  </div>
                  <div className="flex items-center">
                    <input id="tech7" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="tech7" className="ml-2 block text-sm text-gray-700">Repetition for emphasis</label>
                  </div>
                  <div className="flex items-center">
                    <input id="tech8" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="tech8" className="ml-2 block text-sm text-gray-700">Rule of three</label>
                  </div>
                  <div className="flex items-center">
                    <input id="tech9" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="tech9" className="ml-2 block text-sm text-gray-700">Metaphors and similes</label>
                  </div>
                  <div className="flex items-center">
                    <input id="tech10" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="tech10" className="ml-2 block text-sm text-gray-700">Addressing counter-arguments</label>
                  </div>
                  <div className="flex items-center">
                    <input id="tech11" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="tech11" className="ml-2 block text-sm text-gray-700">Call to action</label>
                  </div>
                  <div className="flex items-center">
                    <input id="tech12" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="tech12" className="ml-2 block text-sm text-gray-700">Formal or informal tone</label>
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-gray-700 mb-2">For each technique you selected, write a brief example of how you might use it:</p>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Rhetorical question example:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="e.g., How can we expect students to develop digital responsibility if we never give them the opportunity to practice it?"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Emotive language example:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="e.g., The devastating impact of excessive screen time on young minds cannot be ignored."
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Rule of three example:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="e.g., We must educate our children, empower our teachers, and engage our community."
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save Techniques
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-green-50 px-4 py-2">
            <h4 className="font-medium text-green-800">Activity 2: Analyze and Plan Your Essay</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Analyze the practice prompt and create a detailed plan for your persuasive essay.
            </p>
            
            <div className="space-y-6">
              <div>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                  <p className="text-yellow-800 font-medium">Practice Prompt:</p>
                  <p className="text-yellow-800 italic">"Write a persuasive essay arguing whether online learning should replace traditional classroom education."</p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">What position will you take on this issue?</label>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <input id="position-for" name="position" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                        <label htmlFor="position-for" className="ml-2 block text-sm text-gray-700">For (online learning should replace traditional classrooms)</label>
                      </div>
                      <div className="flex items-center">
                        <input id="position-against" name="position" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                        <label htmlFor="position-against" className="ml-2 block text-sm text-gray-700">Against (traditional classrooms should remain primary)</label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Who is your target audience?</label>
                    <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                      <option>Select an audience...</option>
                      <option value="1">Education officials</option>
                      <option value="2">School administrators</option>
                      <option value="3">Parents</option>
                      <option value="4">Students</option>
                      <option value="5">General public</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">What tone will you use?</label>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <input id="tone-formal" name="tone" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                        <label htmlFor="tone-formal" className="ml-2 block text-sm text-gray-700">Formal</label>
                      </div>
                      <div className="flex items-center">
                        <input id="tone-semiformal" name="tone" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                        <label htmlFor="tone-semiformal" className="ml-2 block text-sm text-gray-700">Semi-formal</label>
                      </div>
                      <div className="flex items-center">
                        <input id="tone-informal" name="tone" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                        <label htmlFor="tone-informal" className="ml-2 block text-sm text-gray-700">Informal</label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Write your thesis statement:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="e.g., While online learning offers valuable flexibility and technological advantages, it should supplement rather than replace traditional classroom education, which provides irreplaceable social development, hands-on learning experiences, and equitable access to quality education."
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Main arguments (list 3):</label>
                    <div className="space-y-2">
                      <textarea
                        rows={2}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Argument 1: Traditional classrooms provide essential social interaction and development that cannot be replicated online."
                      ></textarea>
                      <textarea
                        rows={2}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Argument 2: Hands-on learning experiences in subjects like science, art, and physical education require in-person instruction."
                      ></textarea>
                      <textarea
                        rows={2}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Argument 3: Traditional classrooms provide more equitable access to quality education, as not all students have reliable internet or suitable learning environments at home."
                      ></textarea>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Counter-argument to address:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="e.g., While online learning offers flexibility and personalized pacing, these benefits can be incorporated into traditional education through a hybrid approach rather than complete replacement."
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Evidence you'll use (facts, statistics, examples):</label>
                    <textarea
                      rows={4}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="List specific evidence you'll use to support each argument..."
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save Essay Plan
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-purple-50 px-4 py-2">
            <h4 className="font-medium text-purple-800">Activity 3: Write Your Persuasive Essay</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Using your plan from Activity 2, write your complete persuasive essay. Remember to include all the elements of effective persuasive writing.
            </p>
            
            <div className="space-y-6">
              <div>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        <span className="font-medium text-yellow-800">Time limit:</span> Try to complete your essay within 30 minutes to simulate exam conditions.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Introduction:</label>
                    <textarea
                      rows={5}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Write your introduction here, including a hook, context, and thesis statement..."
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Body Paragraph 1:</label>
                    <textarea
                      rows={6}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Write your first body paragraph here, focusing on your first main argument..."
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Body Paragraph 2:</label>
                    <textarea
                      rows={6}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Write your second body paragraph here, focusing on your second main argument..."
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Body Paragraph 3:</label>
                    <textarea
                      rows={6}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Write your third body paragraph here, focusing on your third main argument..."
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Counter-argument Paragraph:</label>
                    <textarea
                      rows={5}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Acknowledge opposing viewpoints and refute them..."
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Conclusion:</label>
                    <textarea
                      rows={5}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Write your conclusion here, restating your thesis, summarizing your arguments, and including a call to action..."
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save Essay
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-red-50 px-4 py-2">
            <h4 className="font-medium text-red-800">Activity 4: Review and Improve Your Essay</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Evaluate your essay against the assessment criteria and identify areas for improvement.
            </p>
            
            <div className="space-y-6">
              <div>
                <p className="text-gray-700 mb-2">Self-Assessment Checklist:</p>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Ideas & Content (30%)</p>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input id="ideas1" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                        <label htmlFor="ideas1" className="ml-2 block text-sm text-gray-700">My thesis statement is clear and specific</label>
                      </div>
                      <div className="flex items-center">
                        <input id="ideas2" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                        <label htmlFor="ideas2" className="ml-2 block text-sm text-gray-700">My arguments are logical and well-developed</label>
                      </div>
                      <div className="flex items-center">
                        <input id="ideas3" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                        <label htmlFor="ideas3" className="ml-2 block text-sm text-gray-700">I've included specific evidence to support my claims</label>
                      </div>
                      <div className="flex items-center">
                        <input id="ideas4" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                        <label htmlFor="ideas4" className="ml-2 block text-sm text-gray-700">I've addressed counter-arguments effectively</label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Text Structure (20%)</p>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input id="structure1" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                        <label htmlFor="structure1" className="ml-2 block text-sm text-gray-700">My introduction effectively hooks the reader</label>
                      </div>
                      <div className="flex items-center">
                        <input id="structure2" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                        <label htmlFor="structure2" className="ml-2 block text-sm text-gray-700">Each paragraph focuses on one main idea</label>
                      </div>
                      <div className="flex items-center">
                        <input id="structure3" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                        <label htmlFor="structure3" className="ml-2 block text-sm text-gray-700">My conclusion effectively summarizes and provides closure</label>
                      </div>
                      <div className="flex items-center">
                        <input id="structure4" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                        <label htmlFor="structure4" className="ml-2 block text-sm text-gray-700">I've included a clear call to action</label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Language & Vocabulary (25%)</p>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input id="language1" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                        <label htmlFor="language1" className="ml-2 block text-sm text-gray-700">I've used persuasive language effectively</label>
                      </div>
                      <div className="flex items-center">
                        <input id="language2" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                        <label htmlFor="language2" className="ml-2 block text-sm text-gray-700">My vocabulary is precise and varied</label>
                      </div>
                      <div className="flex items-center">
                        <input id="language3" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                        <label htmlFor="language3" className="ml-2 block text-sm text-gray-700">I've used at least 3 different persuasive techniques</label>
                      </div>
                      <div className="flex items-center">
                        <input id="language4" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                        <label htmlFor="language4" className="ml-2 block text-sm text-gray-700">My tone is appropriate for my audience</label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Cohesion (15%)</p>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input id="cohesion1" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                        <label htmlFor="cohesion1" className="ml-2 block text-sm text-gray-700">I've used effective transitions between paragraphs</label>
                      </div>
                      <div className="flex items-center">
                        <input id="cohesion2" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                        <label htmlFor="cohesion2" className="ml-2 block text-sm text-gray-700">My ideas flow logically from one to the next</label>
                      </div>
                      <div className="flex items-center">
                        <input id="cohesion3" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                        <label htmlFor="cohesion3" className="ml-2 block text-sm text-gray-700">I've used pronouns and references consistently</label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Spelling, Punctuation & Grammar (10%)</p>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input id="spg1" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                        <label htmlFor="spg1" className="ml-2 block text-sm text-gray-700">I've checked for spelling errors</label>
                      </div>
                      <div className="flex items-center">
                        <input id="spg2" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                        <label htmlFor="spg2" className="ml-2 block text-sm text-gray-700">My punctuation is correct</label>
                      </div>
                      <div className="flex items-center">
                        <input id="spg3" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                        <label htmlFor="spg3" className="ml-2 block text-sm text-gray-700">My sentences are grammatically correct</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Areas for improvement:</label>
                <textarea
                  rows={4}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Based on your self-assessment, what specific areas of your essay could be improved?"
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Specific improvements to make:</label>
                <textarea
                  rows={4}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="List specific changes you would make to improve your essay if you had more time..."
                ></textarea>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Complete Self-Assessment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
