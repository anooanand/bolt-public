import React from 'react';

export function ActivitiesTab() {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Interactive Activities</h3>
      
      <div className="bg-indigo-50 p-4 rounded-lg mb-6">
        <p className="text-gray-700">
          Complete these interactive activities to practice writing a complete persuasive essay for the NSW Selective exam. Apply all the persuasive writing skills you've learned so far.
        </p>
      </div>
      
      <div className="space-y-8">
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-blue-50 px-4 py-2">
            <h4 className="font-medium text-blue-800">Activity 1: Analyze the Prompt</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Read the persuasive essay prompt below and analyze what it's asking you to do.
            </p>
            
            <div className="border p-3 rounded-lg mb-4 bg-gray-50">
              <p className="text-gray-700 font-medium">
                Prompt: "Technology has made students less capable of thinking deeply and independently. Do you agree or disagree? Write a persuasive essay arguing your position."
              </p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Identify the key terms in this prompt:</label>
                <textarea
                  rows={3}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="List the key terms you need to address in your essay..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">What position will you take on this issue?</label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input id="pos1" name="position" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="pos1" className="ml-2 block text-sm text-gray-700">Agree - Technology has made students less capable of thinking deeply and independently</label>
                  </div>
                  <div className="flex items-center">
                    <input id="pos2" name="position" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="pos2" className="ml-2 block text-sm text-gray-700">Disagree - Technology has not made students less capable of thinking deeply and independently</label>
                  </div>
                  <div className="flex items-center">
                    <input id="pos3" name="position" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="pos3" className="ml-2 block text-sm text-gray-700">Qualified position - Technology has both positive and negative effects on student thinking (explain below)</label>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Write your thesis statement (your clear position on this issue):</label>
                <textarea
                  rows={2}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Write a clear, specific thesis statement that answers the prompt..."
                ></textarea>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save Analysis
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-green-50 px-4 py-2">
            <h4 className="font-medium text-green-800">Activity 2: Plan Your Essay</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Create a detailed outline for your persuasive essay based on the position you've chosen.
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-blue-800 mb-1">Introduction Plan:</label>
                <div className="space-y-2">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Hook idea:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="How will you grab the reader's attention?"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Background information:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="What context will you provide about technology and education?"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Thesis statement (copy from Activity 1):</label>
                    <textarea
                      rows={1}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Your clear position on the issue..."
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-green-800 mb-1">Body Paragraph 1 Plan:</label>
                <div className="space-y-2">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Main argument:</label>
                    <textarea
                      rows={1}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="What is your first main point?"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Evidence/examples:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="What evidence will support this point?"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Persuasive techniques to use:</label>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center">
                        <input id="tech1-1" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                        <label htmlFor="tech1-1" className="ml-2 block text-sm text-gray-700">Facts & Statistics</label>
                      </div>
                      <div className="flex items-center">
                        <input id="tech1-2" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                        <label htmlFor="tech1-2" className="ml-2 block text-sm text-gray-700">Emotive Language</label>
                      </div>
                      <div className="flex items-center">
                        <input id="tech1-3" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                        <label htmlFor="tech1-3" className="ml-2 block text-sm text-gray-700">Expert Opinion</label>
                      </div>
                      <div className="flex items-center">
                        <input id="tech1-4" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                        <label htmlFor="tech1-4" className="ml-2 block text-sm text-gray-700">Rhetorical Questions</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-green-800 mb-1">Body Paragraph 2 Plan:</label>
                <div className="space-y-2">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Main argument:</label>
                    <textarea
                      rows={1}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="What is your second main point?"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Evidence/examples:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="What evidence will support this point?"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Persuasive techniques to use:</label>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center">
                        <input id="tech2-1" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                        <label htmlFor="tech2-1" className="ml-2 block text-sm text-gray-700">Facts & Statistics</label>
                      </div>
                      <div className="flex items-center">
                        <input id="tech2-2" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                        <label htmlFor="tech2-2" className="ml-2 block text-sm text-gray-700">Emotive Language</label>
                      </div>
                      <div className="flex items-center">
                        <input id="tech2-3" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                        <label htmlFor="tech2-3" className="ml-2 block text-sm text-gray-700">Expert Opinion</label>
                      </div>
                      <div className="flex items-center">
                        <input id="tech2-4" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                        <label htmlFor="tech2-4" className="ml-2 block text-sm text-gray-700">Rhetorical Questions</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-purple-800 mb-1">Counterargument Paragraph Plan:</label>
                <div className="space-y-2">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Opposing viewpoint:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="What is the main argument against your position?"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Your response:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="How will you counter this argument?"
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-red-800 mb-1">Conclusion Plan:</label>
                <div className="space-y-2">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Restatement of thesis:</label>
                    <textarea
                      rows={1}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="How will you restate your position in different words?"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Summary of main points:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="How will you briefly recap your arguments?"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Call to action or final thought:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="How will you end your essay with impact?"
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
            <h4 className="font-medium text-purple-800">Activity 3: Write Your Complete Essay</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Using your plan from Activity 2, write your complete persuasive essay. Remember to follow the persuasive essay structure and incorporate persuasive techniques.
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Complete Essay:</label>
                <textarea
                  rows={20}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Write your complete persuasive essay here..."
                ></textarea>
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
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Self-Assessment Checklist:</label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input id="check1" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="check1" className="ml-2 block text-sm text-gray-700">My introduction clearly states my position and provides context.</label>
                  </div>
                  <div className="flex items-center">
                    <input id="check2" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="check2" className="ml-2 block text-sm text-gray-700">My body paragraphs follow the PEEL structure.</label>
                  </div>
                  <div className="flex items-center">
                    <input id="check3" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="check3" className="ml-2 block text-sm text-gray-700">I've used at least three different persuasive techniques.</label>
                  </div>
                  <div className="flex items-center">
                    <input id="check4" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="check4" className="ml-2 block text-sm text-gray-700">I've addressed counterarguments to strengthen my position.</label>
                  </div>
                  <div className="flex items-center">
                    <input id="check5" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="check5" className="ml-2 block text-sm text-gray-700">My conclusion restates my thesis and provides a strong ending.</label>
                  </div>
                  <div className="flex items-center">
                    <input id="check6" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="check6" className="ml-2 block text-sm text-gray-700">I've used varied sentence structures and vocabulary.</label>
                  </div>
                  <div className="flex items-center">
                    <input id="check7" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="check7" className="ml-2 block text-sm text-gray-700">I've checked for spelling and grammar errors.</label>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Areas for Improvement:</label>
                <textarea
                  rows={4}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Identify specific areas where you could improve your essay..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Revised Sections (optional):</label>
                <textarea
                  rows={8}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Rewrite any sections that need improvement..."
                ></textarea>
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
