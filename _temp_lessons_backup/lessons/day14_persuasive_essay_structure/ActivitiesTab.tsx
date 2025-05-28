import React from 'react';

export function ActivitiesTab() {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Interactive Activities</h3>
      
      <div className="bg-indigo-50 p-4 rounded-lg mb-6">
        <p className="text-gray-700">
          Complete these interactive activities to reinforce your understanding of persuasive essay structure. These exercises will help you organize your ideas effectively for the NSW Selective exam.
        </p>
      </div>
      
      <div className="space-y-8">
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-blue-50 px-4 py-2">
            <h4 className="font-medium text-blue-800">Activity 1: Identify Essay Structure Components</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Read the persuasive essay excerpt below and identify which part of the essay structure each paragraph represents.
            </p>
            
            <div className="border p-3 rounded-lg mb-4 bg-gray-50">
              <p className="text-gray-700 mb-3">
                <strong>Paragraph A:</strong> Imagine waking up every morning dreading the day ahead because you know you'll face harassment, exclusion, or even physical threats. This is the reality for many students who experience bullying in schools. Despite anti-bullying policies, the problem persists in educational institutions across Australia. Schools must implement more effective anti-bullying programs that include peer mediation, regular workshops, and clear consequences for bullies.
              </p>
              
              <p className="text-gray-700 mb-3">
                <strong>Paragraph B:</strong> Peer mediation programs are one of the most effective ways to reduce bullying in schools. When students are trained to mediate conflicts between their peers, they develop important social skills while helping to resolve issues before they escalate into bullying. According to a 2023 study by the Australian Education Research Institute, schools that implemented peer mediation programs saw a 45% decrease in reported bullying incidents within one year. At Westfield High School in Sydney, the introduction of a peer mediation program resulted in not only fewer bullying cases but also improved overall school climate, with 78% of students reporting they felt safer at school after the program was established.
              </p>
              
              <p className="text-gray-700 mb-3">
                <strong>Paragraph C:</strong> Some critics argue that anti-bullying programs take valuable time away from academic instruction. They suggest that schools should focus primarily on educational outcomes rather than social issues. However, this view fails to recognize that students cannot learn effectively when they feel unsafe or threatened. Research consistently shows that students who experience bullying have lower academic performance, higher absenteeism, and increased mental health issues. By addressing bullying effectively, schools actually create an environment where academic learning can flourish.
              </p>
              
              <p className="text-gray-700">
                <strong>Paragraph D:</strong> The evidence is clear: comprehensive anti-bullying programs are essential for creating safe, productive learning environments. By implementing peer mediation, regular workshops, and consistent consequences, schools can significantly reduce bullying and its harmful effects. As a society, we must prioritize the emotional and physical safety of our students. It's time for all schools to commit to proven anti-bullying strategies that protect students and create the positive environments they deserve. Our children's wellbeing and education depend on it.
              </p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Which paragraph is the Introduction?</label>
                <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option>Select paragraph...</option>
                  <option value="A">Paragraph A</option>
                  <option value="B">Paragraph B</option>
                  <option value="C">Paragraph C</option>
                  <option value="D">Paragraph D</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Which paragraph is a Body Paragraph using the PEEL structure?</label>
                <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option>Select paragraph...</option>
                  <option value="A">Paragraph A</option>
                  <option value="B">Paragraph B</option>
                  <option value="C">Paragraph C</option>
                  <option value="D">Paragraph D</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Which paragraph addresses Counterarguments?</label>
                <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option>Select paragraph...</option>
                  <option value="A">Paragraph A</option>
                  <option value="B">Paragraph B</option>
                  <option value="C">Paragraph C</option>
                  <option value="D">Paragraph D</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Which paragraph is the Conclusion?</label>
                <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option>Select paragraph...</option>
                  <option value="A">Paragraph A</option>
                  <option value="B">Paragraph B</option>
                  <option value="C">Paragraph C</option>
                  <option value="D">Paragraph D</option>
                </select>
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
            <h4 className="font-medium text-green-800">Activity 2: Analyze PEEL Structure</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Analyze the body paragraph below and identify each component of the PEEL structure.
            </p>
            
            <div className="border p-3 rounded-lg mb-4 bg-gray-50">
              <p className="text-gray-700">
                (1) Regular physical education classes are essential for students' overall development and academic success. (2) According to a 2023 study published in the Journal of Educational Psychology, students who participated in at least 60 minutes of physical activity daily showed a 27% improvement in concentration and a 23% increase in test scores compared to less active peers. (3) This research demonstrates that physical activity directly enhances brain function by increasing blood flow and oxygen to the brain, which improves cognitive abilities like memory, problem-solving, and attention span. When students are physically active, their brains are better equipped to process and retain information, leading to improved academic performance across all subjects. (4) Therefore, schools that prioritize physical education are not taking time away from academics but are actually enhancing students' ability to learn and succeed in their studies.
              </p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Which numbered sentence contains the Point (topic sentence)?</label>
                <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option>Select sentence number...</option>
                  <option value="1">Sentence 1</option>
                  <option value="2">Sentence 2</option>
                  <option value="3">Sentence 3</option>
                  <option value="4">Sentence 4</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Which numbered sentence contains the Evidence?</label>
                <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option>Select sentence number...</option>
                  <option value="1">Sentence 1</option>
                  <option value="2">Sentence 2</option>
                  <option value="3">Sentence 3</option>
                  <option value="4">Sentence 4</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Which numbered sentence contains the Explanation?</label>
                <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option>Select sentence number...</option>
                  <option value="1">Sentence 1</option>
                  <option value="2">Sentence 2</option>
                  <option value="3">Sentence 3</option>
                  <option value="4">Sentence 4</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Which numbered sentence contains the Link back to the thesis?</label>
                <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option>Select sentence number...</option>
                  <option value="1">Sentence 1</option>
                  <option value="2">Sentence 2</option>
                  <option value="3">Sentence 3</option>
                  <option value="4">Sentence 4</option>
                </select>
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
            <h4 className="font-medium text-purple-800">Activity 3: Create an Essay Outline</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Create an outline for a persuasive essay on one of the topics below. Use the persuasive essay structure you've learned.
            </p>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Choose a topic:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="flex items-center">
                  <input id="topic1" name="topic" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="topic1" className="ml-2 block text-sm text-gray-700">Schools should switch to a four-day week</label>
                </div>
                <div className="flex items-center">
                  <input id="topic2" name="topic" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="topic2" className="ml-2 block text-sm text-gray-700">All students should learn coding</label>
                </div>
                <div className="flex items-center">
                  <input id="topic3" name="topic" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="topic3" className="ml-2 block text-sm text-gray-700">Exams should be replaced with project-based assessments</label>
                </div>
                <div className="flex items-center">
                  <input id="topic4" name="topic" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="topic4" className="ml-2 block text-sm text-gray-700">Your own topic:</label>
                  <input type="text" className="ml-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="Enter your topic..." />
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-blue-800 mb-1">Introduction:</label>
                <div className="space-y-2">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Hook (to grab attention):</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Write an engaging opening..."
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Background (brief context):</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Provide brief context about the issue..."
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Thesis Statement (your position):</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Clearly state your position..."
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-green-800 mb-1">Body Paragraph 1:</label>
                <div className="space-y-2">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Point (topic sentence):</label>
                    <textarea
                      rows={1}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="State your first main argument..."
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Evidence (facts, statistics, examples):</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Provide supporting evidence..."
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Explanation (how evidence supports your point):</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Explain how the evidence supports your argument..."
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Link (back to thesis or transition):</label>
                    <textarea
                      rows={1}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Connect back to your thesis or transition to next point..."
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-green-800 mb-1">Body Paragraph 2:</label>
                <div className="space-y-2">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Point (topic sentence):</label>
                    <textarea
                      rows={1}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="State your second main argument..."
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Evidence (facts, statistics, examples):</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Provide supporting evidence..."
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Explanation (how evidence supports your point):</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Explain how the evidence supports your argument..."
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Link (back to thesis or transition):</label>
                    <textarea
                      rows={1}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Connect back to your thesis or transition to next point..."
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-purple-800 mb-1">Counterargument Paragraph:</label>
                <div className="space-y-2">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Acknowledge (opposing view):</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Present the opposing viewpoint fairly..."
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Counter (why this view is limited):</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Explain why this view is flawed or limited..."
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Reinforce (your position):</label>
                    <textarea
                      rows={1}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Strengthen your own position in comparison..."
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-red-800 mb-1">Conclusion:</label>
                <div className="space-y-2">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Restate thesis (in different words):</label>
                    <textarea
                      rows={1}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Restate your position in different words..."
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Summarize main points:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Briefly recap your main arguments..."
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Call to action or broader implications:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="End with a strong statement encouraging action or thought..."
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save Essay Outline
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-red-50 px-4 py-2">
            <h4 className="font-medium text-red-800">Activity 4: Write Introduction and Body Paragraph</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Using the outline you created in Activity 3, write an introduction and one body paragraph for your persuasive essay.
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-blue-800 mb-1">Your Introduction:</label>
                <textarea
                  rows={6}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Write your introduction paragraph here..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-green-800 mb-1">Your Body Paragraph:</label>
                <textarea
                  rows={8}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Write one body paragraph using the PEEL structure..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Self-Assessment:</label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input id="check1" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="check1" className="ml-2 block text-sm text-gray-700">My introduction includes a hook, background, and clear thesis statement.</label>
                  </div>
                  <div className="flex items-center">
                    <input id="check2" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="check2" className="ml-2 block text-sm text-gray-700">My body paragraph follows the PEEL structure (Point, Evidence, Explanation, Link).</label>
                  </div>
                  <div className="flex items-center">
                    <input id="check3" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="check3" className="ml-2 block text-sm text-gray-700">My writing uses persuasive language and techniques.</label>
                  </div>
                  <div className="flex items-center">
                    <input id="check4" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="check4" className="ml-2 block text-sm text-gray-700">My paragraphs flow logically and are well-organized.</label>
                  </div>
                  <div className="flex items-center">
                    <input id="check5" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="check5" className="ml-2 block text-sm text-gray-700">My evidence supports my argument effectively.</label>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Submit Writing
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
