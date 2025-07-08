import React from 'react';

export function PracticeTab() {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Practice Task: Persuasive Writing Basics</h3>
      
      <div className="bg-indigo-50 p-4 rounded-lg mb-6">
        <p className="text-gray-700">
          Now it's time to apply what you've learned about persuasive writing! In this practice task, you'll analyze persuasive techniques in example essays, develop strong reasons and evidence for a position, and write an introduction paragraph for a persuasive essay.
        </p>
      </div>
      
      <div className="space-y-6">
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-blue-50 px-4 py-3">
            <h4 className="font-medium text-blue-800">Part 1: Analyze Persuasive Techniques</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Read the following excerpt from a persuasive essay and identify the persuasive techniques used.
            </p>
            
            <div className="border p-4 rounded-lg mb-4 bg-gray-50">
              <p className="text-gray-800 font-medium mb-2">
                "Why Schools Should Start Later"
              </p>
              <p className="text-gray-800 mb-2">
                It's time for schools to acknowledge the overwhelming scientific evidence and make a change that will benefit students' health, academic performance, and overall well-being. Starting the school day at least one hour later would align with teenagers' natural sleep cycles and lead to significant improvements in their lives.
              </p>
              <p className="text-gray-800 mb-2">
                According to the Australian Sleep Health Foundation, adolescents naturally fall asleep later and wake later due to biological changes during puberty. When we force teens to wake up at 6:00 or 7:00 AM for early school start times, we're working against their biology. Dr. Sarah Chen, a leading sleep researcher at Sydney University, found that students who start school later gain an average of 45 minutes more sleep per night and show improved concentration throughout the day.
              </p>
              <p className="text-gray-800 mb-2">
                Some administrators argue that changing school hours would disrupt bus schedules and after-school activities. However, many districts that have implemented later start times have successfully adjusted their transportation systems with minimal additional costs. The academic and health benefits far outweigh these logistical challenges.
              </p>
              <p className="text-gray-800">
                As students, parents, and educators, we must advocate for school schedules that prioritize student well-being and learning. The evidence is clear: later school start times lead to better-rested, healthier, and more academically successful students. Isn't it time we put this knowledge into action?
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Identify the Clear Position in this essay:</p>
                <textarea
                  rows={2}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="What is the author's main argument or position?"
                ></textarea>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Identify one Strong Reason the author provides:</p>
                <textarea
                  rows={2}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="What logical reason does the author give to support their position?"
                ></textarea>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Identify Convincing Evidence used in the essay:</p>
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm text-gray-700">What facts, statistics, or expert opinions does the author use?</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700">How does this evidence strengthen the author's argument?</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">How does the author address Counterarguments?</p>
                <textarea
                  rows={3}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="What opposing viewpoint does the author acknowledge, and how do they respond to it?"
                ></textarea>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Identify the Call to Action in the conclusion:</p>
                <textarea
                  rows={2}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="How does the author encourage readers to think or act?"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-green-50 px-4 py-3">
            <h4 className="font-medium text-green-800">Part 2: Develop Strong Reasons and Evidence</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Choose one of the following persuasive essay topics and develop three strong reasons with supporting evidence for your position.
            </p>
            
            <div className="bg-gray-50 p-3 rounded-lg mb-4">
              <ul className="list-disc pl-5 text-gray-700">
                <li>Should students be allowed to use smartphones in the classroom?</li>
                <li>Should homework be banned or limited?</li>
                <li>Should all students be required to learn a musical instrument?</li>
                <li>Should single-use plastics be banned in schools?</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Selected Topic:</label>
                <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option>Select a topic...</option>
                  <option>Should students be allowed to use smartphones in the classroom?</option>
                  <option>Should homework be banned or limited?</option>
                  <option>Should all students be required to learn a musical instrument?</option>
                  <option>Should single-use plastics be banned in schools?</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">My Position:</label>
                <div className="mt-1 flex items-center space-x-4">
                  <div className="flex items-center">
                    <input type="radio" name="position" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300" />
                    <label className="ml-2 block text-sm text-gray-700">For</label>
                  </div>
                  <div className="flex items-center">
                    <input type="radio" name="position" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300" />
                    <label className="ml-2 block text-sm text-gray-700">Against</label>
                  </div>
                </div>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Reason 1:</p>
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm text-gray-700">State your first reason:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Provide a clear, logical reason that supports your position..."
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700">Supporting Evidence:</label>
                    <textarea
                      rows={3}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Provide facts, statistics, examples, or expert opinions that support this reason..."
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Reason 2:</p>
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm text-gray-700">State your second reason:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Provide a clear, logical reason that supports your position..."
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700">Supporting Evidence:</label>
                    <textarea
                      rows={3}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Provide facts, statistics, examples, or expert opinions that support this reason..."
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Reason 3:</p>
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm text-gray-700">State your third reason:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Provide a clear, logical reason that supports your position..."
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700">Supporting Evidence:</label>
                    <textarea
                      rows={3}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Provide facts, statistics, examples, or expert opinions that support this reason..."
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Potential Counterargument:</p>
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm text-gray-700">What might someone who disagrees with you argue?</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Identify a potential opposing viewpoint..."
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700">How would you respond to this counterargument?</label>
                    <textarea
                      rows={3}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Explain why your position is still stronger or more beneficial..."
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-purple-50 px-4 py-3">
            <h4 className="font-medium text-purple-800">Part 3: Write an Introduction Paragraph</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Using the topic and position you selected in Part 2, write an introduction paragraph for a persuasive essay. Your introduction should include a hook, background information, and a clear thesis statement.
            </p>
            
            <div className="space-y-4">
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Introduction Elements:</p>
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm text-gray-700">Hook (an attention-grabbing opening):</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Start with a surprising fact, question, quote, or scenario to grab the reader's attention..."
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700">Background Information (context for the issue):</label>
                    <textarea
                      rows={3}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Provide brief context about the topic and why it matters..."
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700">Thesis Statement (your clear position):</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="State your position clearly and mention your main reasons..."
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Complete Introduction Paragraph:</label>
                <textarea
                  rows={8}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Write your complete introduction paragraph, combining the hook, background information, and thesis statement..."
                ></textarea>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-sm font-medium text-gray-700 mb-2">Self-assessment checklist:</p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                    <label className="ml-2 block text-sm text-gray-700">My introduction begins with an engaging hook</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                    <label className="ml-2 block text-sm text-gray-700">I provided relevant background information about the topic</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                    <label className="ml-2 block text-sm text-gray-700">My thesis statement clearly states my position</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                    <label className="ml-2 block text-sm text-gray-700">My introduction previews my main reasons</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                    <label className="ml-2 block text-sm text-gray-700">My language is clear, confident, and persuasive</label>
                  </div>
                </div>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-sm font-medium text-gray-700 mb-2">Reflection:</p>
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">What was the most challenging part of writing your introduction?</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">How does your introduction set up the rest of your persuasive essay?</label>
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
