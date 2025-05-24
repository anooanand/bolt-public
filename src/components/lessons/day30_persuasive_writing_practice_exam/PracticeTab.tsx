import React from 'react';

export function PracticeTab() {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Practice: Persuasive Writing Exam</h3>
      
      <div className="bg-indigo-50 p-4 rounded-lg mb-6">
        <p className="text-gray-700">
          Today you'll apply all the persuasive writing techniques you've learned in a practice exam. This will help you prepare for the NSW Selective exam by simulating exam conditions and practicing the complete writing process.
        </p>
      </div>
      
      <div className="space-y-8">
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-blue-50 px-4 py-2">
            <h4 className="font-medium text-blue-800">Step 1: Analyze the Prompt</h4>
          </div>
          <div className="p-4">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
              <p className="text-gray-700 font-medium">Exam Prompt:</p>
              <p className="text-gray-700 italic mt-1">
                "Write a persuasive essay arguing whether students should be required to wear school uniforms. Present your position clearly and support it with strong arguments."
              </p>
            </div>
            
            <p className="text-gray-700 mb-4">
              Take a few minutes to analyze this prompt and answer the following questions:
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">What position will you take on this issue?</label>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <input id="for" name="position" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="for" className="ml-2 block text-sm text-gray-700">For school uniforms</label>
                  </div>
                  <div className="flex items-center">
                    <input id="against" name="position" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="against" className="ml-2 block text-sm text-gray-700">Against school uniforms</label>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Who is your primary audience?</label>
                <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option>Select your primary audience...</option>
                  <option>School administrators</option>
                  <option>Parents</option>
                  <option>Fellow students</option>
                  <option>General public</option>
                  <option>Education policymakers</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">What tone will you use?</label>
                <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option>Select your tone...</option>
                  <option>Formal</option>
                  <option>Semi-formal</option>
                  <option>Informal</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">What counter-arguments will you need to address?</label>
                <textarea
                  rows={3}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="List potential counter-arguments to your position..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">What persuasive techniques will you use? (Select at least 5)</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-1">
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
                    <label htmlFor="tech10" className="ml-2 block text-sm text-gray-700">Call to action</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-green-50 px-4 py-2">
            <h4 className="font-medium text-green-800">Step 2: Plan Your Essay</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Create a quick outline with your thesis and main arguments before you begin writing.
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Thesis statement (your position):</label>
                <textarea
                  rows={2}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Write a clear thesis statement that presents your position..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Main argument 1:</label>
                <textarea
                  rows={3}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Outline your first main argument and supporting evidence..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Main argument 2:</label>
                <textarea
                  rows={3}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Outline your second main argument and supporting evidence..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Main argument 3:</label>
                <textarea
                  rows={3}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Outline your third main argument and supporting evidence..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Counter-argument to address:</label>
                <textarea
                  rows={3}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Outline the main counter-argument you will address and your rebuttal..."
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-purple-50 px-4 py-2">
            <h4 className="font-medium text-purple-800">Step 3: Write Your Essay</h4>
          </div>
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <p className="text-gray-700">
                Write your complete persuasive essay based on your planning. Aim for approximately 350-400 words.
              </p>
              <div className="text-sm text-gray-500">
                <span className="font-medium">Time remaining:</span> 30:00
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Persuasive Essay:</label>
              <textarea
                rows={20}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Write your complete persuasive essay here..."
              ></textarea>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-red-50 px-4 py-2">
            <h4 className="font-medium text-red-800">Step 4: Review and Improve</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Evaluate your essay against the assessment criteria and make improvements.
            </p>
            
            <div className="space-y-6">
              <div className="border rounded-lg p-4">
                <h5 className="font-medium text-blue-800 mb-2">Ideas & Content (30%)</h5>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input id="clear" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="clear" className="ml-2 block text-sm text-gray-700">Is my position clear and consistent throughout?</label>
                  </div>
                  <div className="flex items-center">
                    <input id="arguments" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="arguments" className="ml-2 block text-sm text-gray-700">Are my arguments logical and well-supported with evidence?</label>
                  </div>
                  <div className="flex items-center">
                    <input id="counter" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="counter" className="ml-2 block text-sm text-gray-700">Have I addressed counter-arguments effectively?</label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Improvements needed:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Note any improvements needed for ideas and content..."
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <h5 className="font-medium text-green-800 mb-2">Text Structure (20%)</h5>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input id="intro" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="intro" className="ml-2 block text-sm text-gray-700">Does my introduction clearly state my position?</label>
                  </div>
                  <div className="flex items-center">
                    <input id="body" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="body" className="ml-2 block text-sm text-gray-700">Does each body paragraph focus on one main argument?</label>
                  </div>
                  <div className="flex items-center">
                    <input id="conclusion" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="conclusion" className="ml-2 block text-sm text-gray-700">Does my conclusion effectively summarize my position and arguments?</label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Improvements needed:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Note any improvements needed for text structure..."
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <h5 className="font-medium text-purple-800 mb-2">Language & Vocabulary (25%)</h5>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input id="persuasive" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="persuasive" className="ml-2 block text-sm text-gray-700">Have I used a variety of persuasive techniques effectively?</label>
                  </div>
                  <div className="flex items-center">
                    <input id="precise" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="precise" className="ml-2 block text-sm text-gray-700">Is my language precise and appropriate for my audience?</label>
                  </div>
                  <div className="flex items-center">
                    <input id="tone" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="tone" className="ml-2 block text-sm text-gray-700">Is my tone consistent and appropriate throughout?</label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Improvements needed:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Note any improvements needed for language and vocabulary..."
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <h5 className="font-medium text-yellow-800 mb-2">Cohesion (15%)</h5>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input id="flow" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="flow" className="ml-2 block text-sm text-gray-700">Do my paragraphs and ideas flow logically?</label>
                  </div>
                  <div className="flex items-center">
                    <input id="transitions" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="transitions" className="ml-2 block text-sm text-gray-700">Have I used effective transitions between paragraphs and ideas?</label>
                  </div>
                  <div className="flex items-center">
                    <input id="pronouns" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="pronouns" className="ml-2 block text-sm text-gray-700">Have I used pronouns and references consistently?</label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Improvements needed:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Note any improvements needed for cohesion..."
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <h5 className="font-medium text-red-800 mb-2">Spelling, Punctuation & Grammar (10%)</h5>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input id="spelling" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="spelling" className="ml-2 block text-sm text-gray-700">Have I checked for spelling errors?</label>
                  </div>
                  <div className="flex items-center">
                    <input id="grammar" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="grammar" className="ml-2 block text-sm text-gray-700">Have I checked for grammar errors?</label>
                  </div>
                  <div className="flex items-center">
                    <input id="punctuation" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="punctuation" className="ml-2 block text-sm text-gray-700">Have I used punctuation correctly?</label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Improvements needed:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Note any improvements needed for spelling, punctuation, and grammar..."
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <h5 className="font-medium text-gray-900 mb-2">Final Revised Version</h5>
                <p className="text-sm text-gray-600 mb-3">
                  Based on your review, make any necessary improvements to your persuasive essay below.
                </p>
                <textarea
                  rows={20}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Write your revised persuasive essay here..."
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit Practice Exam
          </button>
        </div>
      </div>
    </div>
  );
}
