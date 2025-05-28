import React from 'react';

export function PracticeTab() {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Practice: Descriptive Writing Exam</h3>
      
      <div className="bg-indigo-50 p-4 rounded-lg mb-6">
        <p className="text-gray-700">
          Today you'll apply all the descriptive writing techniques you've learned in a practice exam. This will help you prepare for the NSW Selective exam by simulating exam conditions and practicing the complete writing process.
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
                "Write a descriptive piece about a place that changes dramatically with the seasons. Make your reader feel as though they are experiencing this place through your words."
              </p>
            </div>
            
            <p className="text-gray-700 mb-4">
              Take a few minutes to analyze this prompt and answer the following questions:
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">What specific place will you describe?</label>
                <textarea
                  rows={2}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Describe your chosen location..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Which seasons will you focus on? How does the place change?</label>
                <textarea
                  rows={3}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Describe the seasonal changes..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">What mood(s) do you want to create?</label>
                <textarea
                  rows={2}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Describe your intended mood(s)..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">How will you organize your description?</label>
                <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option>Select an organization method...</option>
                  <option>Chronologically through the seasons</option>
                  <option>Spatially (moving through different areas)</option>
                  <option>By sensory experience (sight, sound, smell, etc.)</option>
                  <option>Contrast between two seasons</option>
                  <option>Other (describe in planning section)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-green-50 px-4 py-2">
            <h4 className="font-medium text-green-800">Step 2: Plan Your Description</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Create a quick outline with the main elements you want to include in your description. This will serve as your roadmap while writing.
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Introduction (first impression of the place):</label>
                <textarea
                  rows={3}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Outline your introduction..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Visual details to include:</label>
                <textarea
                  rows={3}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="List key visual details..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sounds to include:</label>
                <textarea
                  rows={2}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="List key sounds..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Smells to include:</label>
                <textarea
                  rows={2}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="List key smells..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tactile sensations to include:</label>
                <textarea
                  rows={2}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="List key tactile sensations..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Figurative language ideas (similes, metaphors, personification):</label>
                <textarea
                  rows={3}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Note ideas for figurative language..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Conclusion (final impression):</label>
                <textarea
                  rows={3}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Outline your conclusion..."
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-purple-50 px-4 py-2">
            <h4 className="font-medium text-purple-800">Step 3: Write Your Description</h4>
          </div>
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <p className="text-gray-700">
                Write your complete descriptive piece based on your planning. Aim for approximately 350-400 words.
              </p>
              <div className="text-sm text-gray-500">
                <span className="font-medium">Time remaining:</span> 30:00
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Descriptive Piece:</label>
              <textarea
                rows={15}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Write your complete descriptive piece here..."
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
              Evaluate your description against the assessment criteria and make improvements.
            </p>
            
            <div className="space-y-6">
              <div className="border rounded-lg p-4">
                <h5 className="font-medium text-blue-800 mb-2">Ideas & Content (30%)</h5>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input id="vivid" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="vivid" className="ml-2 block text-sm text-gray-700">Have I created a vivid, detailed picture of the place?</label>
                  </div>
                  <div className="flex items-center">
                    <input id="senses" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="senses" className="ml-2 block text-sm text-gray-700">Have I engaged multiple senses?</label>
                  </div>
                  <div className="flex items-center">
                    <input id="seasonal" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="seasonal" className="ml-2 block text-sm text-gray-700">Have I clearly shown how the place changes with the seasons?</label>
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
                <h5 className="font-medium text-green-800 mb-2">Structure & Organization (25%)</h5>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input id="flow" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="flow" className="ml-2 block text-sm text-gray-700">Does my description flow logically?</label>
                  </div>
                  <div className="flex items-center">
                    <input id="paragraphs" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="paragraphs" className="ml-2 block text-sm text-gray-700">Have I organized my description into effective paragraphs?</label>
                  </div>
                  <div className="flex items-center">
                    <input id="transitions" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="transitions" className="ml-2 block text-sm text-gray-700">Have I used smooth transitions between ideas?</label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Improvements needed:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Note any improvements needed for structure and organization..."
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <h5 className="font-medium text-purple-800 mb-2">Language & Vocabulary (25%)</h5>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input id="specific" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="specific" className="ml-2 block text-sm text-gray-700">Is my language specific and precise?</label>
                  </div>
                  <div className="flex items-center">
                    <input id="figurative" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="figurative" className="ml-2 block text-sm text-gray-700">Have I used figurative language effectively?</label>
                  </div>
                  <div className="flex items-center">
                    <input id="varied" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="varied" className="ml-2 block text-sm text-gray-700">Have I varied my sentence structure?</label>
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
                <h5 className="font-medium text-red-800 mb-2">Spelling & Grammar (20%)</h5>
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
                      placeholder="Note any improvements needed for spelling and grammar..."
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <h5 className="font-medium text-gray-900 mb-2">Final Revised Version</h5>
                <p className="text-sm text-gray-600 mb-3">
                  Based on your review, make any necessary improvements to your descriptive piece below.
                </p>
                <textarea
                  rows={15}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Write your revised descriptive piece here..."
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
