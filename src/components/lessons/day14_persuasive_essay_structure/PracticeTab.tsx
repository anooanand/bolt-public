import React from 'react';

export function PracticeTab() {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Practice Task: Persuasive Essay Structure</h3>
      
      <div className="bg-indigo-50 p-4 rounded-lg mb-6">
        <p className="text-gray-700">
          Now it's time to apply what you've learned about persuasive essay structure! In this practice task, you'll analyze the structure of example persuasive essays, create an essay outline using the PEEL structure, and write an introduction and one body paragraph for a persuasive essay.
        </p>
      </div>
      
      <div className="space-y-6">
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-blue-50 px-4 py-3">
            <h4 className="font-medium text-blue-800">Part 1: Analyze Essay Structure</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Read the following persuasive essay and identify its structural components.
            </p>
            
            <div className="border p-4 rounded-lg mb-4 bg-gray-50">
              <p className="text-gray-800 font-medium mb-2">
                "Why Schools Should Adopt Later Start Times"
              </p>
              
              <p className="text-gray-800 mb-2">
                <span className="bg-yellow-100 px-1">Imagine waking up every morning feeling like you've barely slept, struggling to focus in your first class, and battling fatigue throughout the day. This is the reality for millions of students forced to attend schools with early start times that conflict with their natural sleep cycles.</span> Adolescents naturally experience a shift in their biological clock during puberty, making it difficult for them to fall asleep before 11:00 PM and wake up before 8:00 AM. <span className="bg-green-100 px-1">Despite this well-established scientific fact, most schools continue to start classes around 7:30 or 8:00 AM, creating a serious disconnect between school schedules and teenage biology. Schools should adopt later start times to improve student health, academic performance, and overall well-being.</span>
              </p>
              
              <p className="text-gray-800 mb-2">
                <span className="bg-blue-100 px-1">Later school start times lead to significant improvements in student health.</span> According to the American Academy of Pediatrics, adolescents require 8-10 hours of sleep each night for optimal health, yet studies show that only 15% of teenagers get enough sleep on school nights. <span className="bg-purple-100 px-1">Research published in the Journal of Clinical Sleep Medicine found that when schools delayed their start times by just one hour, students gained an average of 45 minutes of sleep per night.</span> This additional sleep reduced reported symptoms of depression, decreased caffeine consumption, and lowered rates of drowsy driving accidents among teen drivers. <span className="bg-pink-100 px-1">By aligning school schedules with adolescent sleep patterns, we can address the growing public health concern of sleep deprivation among teenagers and its associated health risks.</span>
              </p>
              
              <p className="text-gray-800 mb-2">
                <span className="bg-blue-100 px-1">Academic performance improves significantly when students are well-rested.</span> A landmark study by the University of Minnesota examined data from more than 9,000 students across multiple high schools that had shifted to later start times. <span className="bg-purple-100 px-1">The researchers found that attendance rates improved, tardiness decreased, and academic performance in core subjects increased measurably.</span> In schools that pushed start times to 8:30 AM or later, graduation rates increased by an average of 3%, and standardized test scores rose by up to 7 percentile points. <span className="bg-pink-100 px-1">These academic benefits were particularly pronounced among disadvantaged students, suggesting that later start times could be an effective tool for reducing achievement gaps.</span>
              </p>
              
              <p className="text-gray-800 mb-2">
                <span className="bg-orange-100 px-1">Critics of later school start times often cite logistical challenges such as bus scheduling, after-school activities, and childcare arrangements.</span> While these concerns are valid, they are not insurmountable obstacles. <span className="bg-red-100 px-1">Many districts that have successfully implemented later start times have found creative solutions, such as flipping elementary and high school bus schedules or adjusting activity times.</span> The Brookings Institution conducted a cost-benefit analysis and found that the academic and health benefits of later start times far outweigh the costs of implementation. <span className="bg-pink-100 px-1">When we consider that the primary purpose of schools is to educate students effectively, it becomes clear that schedules should be designed to optimize learning conditions rather than administrative convenience.</span>
              </p>
              
              <p className="text-gray-800">
                <span className="bg-indigo-100 px-1">The evidence supporting later school start times is overwhelming and compelling.</span> By making this change, schools can improve student health, boost academic performance, and create more effective learning environments. <span className="bg-teal-100 px-1">The science of adolescent sleep patterns is clear, and it's time for our educational policies to align with what we know about teenage biology.</span> <span className="bg-amber-100 px-1">Schools, parents, and policymakers must work together to implement later start times, prioritizing the well-being and academic success of our students. The time to act is now—our teenagers' health and future depend on it.</span>
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Identify the Hook in the introduction:</p>
                <textarea
                  rows={2}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="What sentence or phrase grabs the reader's attention?"
                ></textarea>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Identify the Thesis Statement:</p>
                <textarea
                  rows={2}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="What sentence clearly states the author's position?"
                ></textarea>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">For the first body paragraph, identify the PEEL components:</p>
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm text-gray-700">Point (topic sentence):</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700">Evidence:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700">Explanation:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700">Link:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Identify the paragraph that addresses counterarguments:</p>
                <textarea
                  rows={2}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Which paragraph acknowledges opposing viewpoints?"
                ></textarea>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Identify the components of the conclusion:</p>
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm text-gray-700">Restatement of thesis:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700">Broader implications:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700">Call to action:</label>
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
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-green-50 px-4 py-3">
            <h4 className="font-medium text-green-800">Part 2: Create an Essay Outline</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Choose one of the following persuasive essay topics and create a detailed outline using the PEEL structure.
            </p>
            
            <div className="bg-gray-50 p-3 rounded-lg mb-4">
              <ul className="list-disc pl-5 text-gray-700">
                <li>Should students be required to wear school uniforms?</li>
                <li>Should mobile phones be banned in schools?</li>
                <li>Should junk food be banned from school canteens?</li>
                <li>Should schools replace textbooks with tablets or laptops?</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Selected Topic:</label>
                <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option>Select a topic...</option>
                  <option>Should students be required to wear school uniforms?</option>
                  <option>Should mobile phones be banned in schools?</option>
                  <option>Should junk food be banned from school canteens?</option>
                  <option>Should schools replace textbooks with tablets or laptops?</option>
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
                <p className="text-gray-800 mb-2">Introduction:</p>
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm text-gray-700">Hook:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="An engaging opening to capture reader interest..."
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700">Background:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Brief context about the issue..."
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700">Thesis Statement:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Your clear position on the topic..."
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Body Paragraph 1:</p>
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm text-gray-700">Point (topic sentence):</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="First main argument supporting your position..."
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700">Evidence:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Facts, statistics, examples, or expert opinions..."
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700">Explanation:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="How the evidence supports your point..."
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700">Link:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Connection back to thesis or transition to next paragraph..."
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Body Paragraph 2:</p>
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm text-gray-700">Point (topic sentence):</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Second main argument supporting your position..."
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700">Evidence:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Facts, statistics, examples, or expert opinions..."
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700">Explanation:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="How the evidence supports your point..."
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700">Link:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Connection back to thesis or transition to next paragraph..."
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Counterargument Paragraph:</p>
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm text-gray-700">Acknowledge:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Present the opposing view fairly..."
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700">Counter:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Explain why this view is flawed or limited..."
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700">Reinforce:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Strengthen your own position in comparison..."
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Conclusion:</p>
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm text-gray-700">Restate thesis:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Remind readers of your position (in different words)..."
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700">Summarize main points:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Briefly recap your main arguments..."
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700">Call to action:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Encourage readers to think or act in a specific way..."
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-purple-50 px-4 py-3">
            <h4 className="font-medium text-purple-800">Part 3: Write an Introduction and Body Paragraph</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Using the outline you created in Part 2, write a complete introduction paragraph and one body paragraph for your persuasive essay.
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Introduction Paragraph:</label>
                <textarea
                  rows={6}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Write your complete introduction paragraph, including hook, background, and thesis statement..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Body Paragraph:</label>
                <textarea
                  rows={8}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Write a complete body paragraph following the PEEL structure..."
                ></textarea>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-sm font-medium text-gray-700 mb-2">Self-assessment checklist:</p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                    <label className="ml-2 block text-sm text-gray-700">My introduction includes an engaging hook</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                    <label className="ml-2 block text-sm text-gray-700">My introduction provides relevant background information</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                    <label className="ml-2 block text-sm text-gray-700">My thesis statement clearly states my position</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                    <label className="ml-2 block text-sm text-gray-700">My body paragraph begins with a clear topic sentence (Point)</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                    <label className="ml-2 block text-sm text-gray-700">My body paragraph includes specific evidence</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                    <label className="ml-2 block text-sm text-gray-700">My body paragraph explains how the evidence supports my point</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                    <label className="ml-2 block text-sm text-gray-700">My body paragraph links back to my thesis or transitions to the next point</label>
                  </div>
                </div>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-sm font-medium text-gray-700 mb-2">Reflection:</p>
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">What was the most challenging part of writing these paragraphs?</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">How does following the PEEL structure help organize your ideas?</label>
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
