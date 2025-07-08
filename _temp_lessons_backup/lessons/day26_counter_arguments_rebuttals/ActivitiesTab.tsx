import React from 'react';

export function ActivitiesTab() {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Interactive Activities</h3>
      
      <div className="bg-indigo-50 p-4 rounded-lg mb-6">
        <p className="text-gray-700">
          Complete these interactive activities to practice addressing counter-arguments and creating strong rebuttals in persuasive writing for the NSW Selective exam.
        </p>
      </div>
      
      <div className="space-y-8">
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-blue-50 px-4 py-2">
            <h4 className="font-medium text-blue-800">Activity 1: Identify Counter-Arguments and Rebuttals</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Read the following passages and identify the counter-arguments and rebuttals.
            </p>
            
            <div className="space-y-6">
              <div>
                <p className="text-gray-700 mb-2">Passage 1:</p>
                <div className="border p-3 rounded-lg mb-3 bg-gray-50">
                  <p className="text-gray-700">
                    School uniforms should be mandatory in all public schools. <span className="bg-yellow-100 px-1 rounded">Some argue that uniforms limit students' freedom of expression and individuality. While personal expression is important, schools are primarily places of learning, not fashion showcases.</span> Uniforms create a level playing field where students are judged by their character and achievements rather than their clothing choices. Research shows that schools with uniform policies report fewer instances of bullying related to appearance and socioeconomic status. Additionally, uniforms help students develop a sense of belonging and community within their school.
                  </p>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">In the highlighted text, identify the counter-argument:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Write the counter-argument here..."
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">In the highlighted text, identify the rebuttal:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Write the rebuttal here..."
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Which approach is used in this rebuttal?</label>
                    <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                      <option>Select the approach...</option>
                      <option value="1">The "Yes, but..." Approach</option>
                      <option value="2">The "Common Ground" Approach</option>
                      <option value="3">The "Evidence-Based" Approach</option>
                      <option value="4">The "Reframing" Approach</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-gray-700 mb-2">Passage 2:</p>
                <div className="border p-3 rounded-lg mb-3 bg-gray-50">
                  <p className="text-gray-700">
                    Renewable energy sources should replace fossil fuels as soon as possible. <span className="bg-yellow-100 px-1 rounded">Critics argue that transitioning to renewable energy would be too expensive and harm the economy. This concern about cost is understandable, especially for industries that have relied on fossil fuels for decades. However, a 2023 economic analysis shows that while the initial investment in renewable infrastructure is significant, the long-term savings far outweigh these costs. Furthermore, the renewable energy sector has created over 500,000 new jobs in the past five years alone, stimulating economic growth.</span> When we also consider the healthcare costs associated with pollution from fossil fuels and the devastating economic impacts of climate change, the true cost of continuing with fossil fuels is actually much higher than transitioning to renewables.
                  </p>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">In the highlighted text, identify the counter-argument:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Write the counter-argument here..."
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">In the highlighted text, identify the rebuttal:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Write the rebuttal here..."
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Which approach is used in this rebuttal?</label>
                    <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                      <option>Select the approach...</option>
                      <option value="1">The "Yes, but..." Approach</option>
                      <option value="2">The "Common Ground" Approach</option>
                      <option value="3">The "Evidence-Based" Approach</option>
                      <option value="4">The "Reframing" Approach</option>
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
            <h4 className="font-medium text-green-800">Activity 2: Match Counter-Arguments with Effective Rebuttals</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Match each counter-argument with the most effective rebuttal strategy.
            </p>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-4">
                <div className="border p-3 rounded-lg bg-gray-50">
                  <p className="text-gray-700 mb-2">1. Counter-argument: "Reducing homework will leave students unprepared for the rigors of higher education."</p>
                  <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Select the most effective rebuttal strategy:</label>
                    <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                      <option>Select a rebuttal strategy...</option>
                      <option value="1">"While preparation for higher education is important, research shows that quality of homework matters more than quantity. Students with moderate, meaningful homework develop better study skills than those overwhelmed with busywork."</option>
                      <option value="2">"Higher education is changing too, with many universities moving away from traditional homework models toward project-based learning and practical applications."</option>
                      <option value="3">"This argument assumes that all homework is equally valuable, which isn't true. We should focus on homework that builds critical thinking rather than repetitive exercises."</option>
                      <option value="4">"The real question isn't whether students need preparation, but what kind of preparation best serves their learning needs in today's educational landscape."</option>
                    </select>
                  </div>
                </div>
                
                <div className="border p-3 rounded-lg bg-gray-50">
                  <p className="text-gray-700 mb-2">2. Counter-argument: "Banning smartphones in schools violates students' rights and prevents them from learning responsible technology use."</p>
                  <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Select the most effective rebuttal strategy:</label>
                    <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                      <option>Select a rebuttal strategy...</option>
                      <option value="1">"Both sides of this debate want students to develop healthy relationships with technology. However, research shows that learning responsible use happens best with clear boundaries and gradual introduction, not unlimited access."</option>
                      <option value="2">"A recent study of 50 schools found that those with smartphone restrictions saw a 32% increase in face-to-face social interactions and a 28% improvement in academic focus."</option>
                      <option value="3">"This argument confuses rights with privileges. Schools already limit many behaviors to create optimal learning environments, and smartphone use is no different."</option>
                      <option value="4">"The issue isn't about rights but about creating the best learning environment. Schools can teach responsible technology use through supervised, educational activities rather than unrestricted personal use."</option>
                    </select>
                  </div>
                </div>
                
                <div className="border p-3 rounded-lg bg-gray-50">
                  <p className="text-gray-700 mb-2">3. Counter-argument: "Extending school hours would exhaust students and leave them with no time for extracurricular activities."</p>
                  <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Select the most effective rebuttal strategy:</label>
                    <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                      <option>Select a rebuttal strategy...</option>
                      <option value="1">"Student well-being is indeed a priority, which is why the proposed extension includes more breaks, physical activity, and creative learning—not just more desk time."</option>
                      <option value="2">"This concern assumes that extended hours would follow the same intensive format as current school days. Instead, the additional time would include enrichment activities that many students currently lack access to."</option>
                      <option value="3">"Studies from countries with longer school days show that when properly structured with varied activities and adequate breaks, students actually report less stress and more enjoyment of school."</option>
                      <option value="4">"The real issue isn't the length of the school day but how that time is used. The proposed extension would actually incorporate many activities students currently pursue after school, potentially giving them more free time overall."</option>
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
          <div className="bg-purple-50 px-4 py-2">
            <h4 className="font-medium text-purple-800">Activity 3: Create Rebuttals Using Different Approaches</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Practice creating rebuttals to counter-arguments using different approaches.
            </p>
            
            <div className="space-y-6">
              <div>
                <p className="text-gray-700 mb-2">Counter-argument: <span className="font-medium">"Online learning can never be as effective as traditional classroom education."</span></p>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Write a rebuttal using the "Yes, but..." approach:</label>
                    <textarea
                      rows={3}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Acknowledge some validity in the counter-argument, then explain why your position is still stronger..."
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Write a rebuttal using the "Evidence-Based" approach:</label>
                    <textarea
                      rows={3}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Present data or expert opinions that contradict the counter-argument..."
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Write a rebuttal using the "Reframing" approach:</label>
                    <textarea
                      rows={3}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Shift the perspective to show how the counter-argument misses the main point..."
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-gray-700 mb-2">Counter-argument: <span className="font-medium">"Standardized testing is the most fair and objective way to assess student achievement."</span></p>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Write a rebuttal using the "Common Ground" approach:</label>
                    <textarea
                      rows={3}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Identify shared values or goals before explaining why your solution better achieves them..."
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Write a rebuttal using any approach of your choice:</label>
                    <textarea
                      rows={3}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Create a rebuttal using any of the approaches we've learned..."
                    ></textarea>
                    <div className="mt-1">
                      <label className="block text-xs text-gray-500 mb-1">Which approach did you use?</label>
                      <select className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                        <option>Select the approach...</option>
                        <option value="1">The "Yes, but..." Approach</option>
                        <option value="2">The "Common Ground" Approach</option>
                        <option value="3">The "Evidence-Based" Approach</option>
                        <option value="4">The "Reframing" Approach</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Submit Rebuttals
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-red-50 px-4 py-2">
            <h4 className="font-medium text-red-800">Activity 4: Write a Counter-Argument Paragraph</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Write a complete paragraph that addresses a counter-argument to your position on a persuasive topic.
            </p>
            
            <div className="space-y-6">
              <div>
                <p className="text-sm text-gray-600 mb-2">Choose a topic for your persuasive paragraph:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                  <div className="flex items-center">
                    <input id="topic1" name="topic" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="topic1" className="ml-2 block text-sm text-gray-700">Social media has a negative impact on teenagers</label>
                  </div>
                  <div className="flex items-center">
                    <input id="topic2" name="topic" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="topic2" className="ml-2 block text-sm text-gray-700">Schools should adopt year-round calendars</label>
                  </div>
                  <div className="flex items-center">
                    <input id="topic3" name="topic" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="topic3" className="ml-2 block text-sm text-gray-700">Competitive sports should be required in schools</label>
                  </div>
                  <div className="flex items-center">
                    <input id="topic4" name="topic" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="topic4" className="ml-2 block text-sm text-gray-700">Your own choice:</label>
                    <input type="text" className="ml-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="Enter a topic..." />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Planning your counter-argument paragraph:</label>
                  <div className="grid grid-cols-1 gap-3">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Your position on this topic:</label>
                      <input type="text" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="What is your stance on this issue?" />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">A strong counter-argument to your position:</label>
                      <textarea
                        rows={2}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="What would someone who disagrees with you argue?"
                      ></textarea>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Which rebuttal approach will you use?</label>
                      <select className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                        <option>Select an approach...</option>
                        <option value="1">The "Yes, but..." Approach</option>
                        <option value="2">The "Common Ground" Approach</option>
                        <option value="3">The "Evidence-Based" Approach</option>
                        <option value="4">The "Reframing" Approach</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Evidence or reasoning for your rebuttal:</label>
                      <textarea
                        rows={2}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="What evidence or reasoning will you use to support your rebuttal?"
                      ></textarea>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Write your counter-argument paragraph:</label>
                  <textarea
                    rows={8}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Write a paragraph that introduces a counter-argument, acknowledges any valid aspects, presents your rebuttal with evidence, and reinforces your position..."
                  ></textarea>
                </div>
                
                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Self-Assessment Checklist:</label>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input id="check1" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="check1" className="ml-2 block text-sm text-gray-700">I presented the counter-argument fairly and accurately.</label>
                    </div>
                    <div className="flex items-center">
                      <input id="check2" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="check2" className="ml-2 block text-sm text-gray-700">I acknowledged any valid aspects of the opposing viewpoint.</label>
                    </div>
                    <div className="flex items-center">
                      <input id="check3" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="check3" className="ml-2 block text-sm text-gray-700">I provided evidence or reasoning to support my rebuttal.</label>
                    </div>
                    <div className="flex items-center">
                      <input id="check4" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="check4" className="ml-2 block text-sm text-gray-700">I reinforced why my original position is still stronger.</label>
                    </div>
                    <div className="flex items-center">
                      <input id="check5" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="check5" className="ml-2 block text-sm text-gray-700">I used appropriate transitions and maintained a respectful tone.</label>
                    </div>
                    <div className="flex items-center">
                      <input id="check6" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="check6" className="ml-2 block text-sm text-gray-700">My paragraph follows a clear, logical structure.</label>
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
