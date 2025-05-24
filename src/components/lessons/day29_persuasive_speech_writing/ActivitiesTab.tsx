import React from 'react';

export function ActivitiesTab() {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Interactive Activities</h3>
      
      <div className="bg-indigo-50 p-4 rounded-lg mb-6">
        <p className="text-gray-700">
          Complete these interactive activities to practice writing effective persuasive speeches for the NSW Selective exam.
        </p>
      </div>
      
      <div className="space-y-8">
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-blue-50 px-4 py-2">
            <h4 className="font-medium text-blue-800">Activity 1: Analyze Persuasive Speech Techniques</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Read the following speech excerpts and identify the persuasive techniques being used.
            </p>
            
            <div className="space-y-6">
              <div>
                <p className="text-gray-700 mb-2">Speech Excerpt 1:</p>
                <div className="border p-3 rounded-lg mb-3 bg-gray-50">
                  <p className="text-gray-700">
                    "Today, our school stands at a crossroads. <span className="bg-yellow-100 px-1 rounded">We can continue with outdated technology that frustrates students and teachers alike, or we can invest in the tools that will prepare our students for the future.</span> The choice is clear. <span className="bg-green-100 px-1 rounded">We must upgrade our computer labs. We must improve our internet infrastructure. We must equip our classrooms with modern technology.</span> <span className="bg-blue-100 px-1 rounded">Because in the end, this isn't just about computers and tablets—it's about giving our students the education they deserve.</span>"
                  </p>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">What persuasive technique is used in the yellow highlighted text?</label>
                    <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                      <option>Select the technique...</option>
                      <option value="1">Antithesis (contrasting ideas)</option>
                      <option value="2">Rhetorical question</option>
                      <option value="3">Anaphora (repetition at beginning)</option>
                      <option value="4">Metaphor</option>
                      <option value="5">Rule of three</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">What persuasive technique is used in the green highlighted text?</label>
                    <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                      <option>Select the technique...</option>
                      <option value="1">Antithesis (contrasting ideas)</option>
                      <option value="2">Rhetorical question</option>
                      <option value="3">Anaphora (repetition at beginning)</option>
                      <option value="4">Metaphor</option>
                      <option value="5">Rule of three</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">What persuasive technique is used in the blue highlighted text?</label>
                    <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                      <option>Select the technique...</option>
                      <option value="1">Antithesis (contrasting ideas)</option>
                      <option value="2">Rhetorical question</option>
                      <option value="3">Anaphora (repetition at beginning)</option>
                      <option value="4">Metaphor</option>
                      <option value="5">Emotional appeal</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-gray-700 mb-2">Speech Excerpt 2:</p>
                <div className="border p-3 rounded-lg mb-3 bg-gray-50">
                  <p className="text-gray-700">
                    "<span className="bg-yellow-100 px-1 rounded">How long will we allow plastic pollution to destroy our oceans? How long will we ignore the damage to marine life? How long will we pretend this isn't our problem?</span> <span className="bg-green-100 px-1 rounded">Every minute, the equivalent of one garbage truck of plastic is dumped into our oceans.</span> This is unacceptable. <span className="bg-blue-100 px-1 rounded">Imagine a world where beaches are buried in plastic, where fish contain more synthetic material than nutrients, where our children cannot enjoy the natural beauty we once took for granted.</span> We cannot let this happen."
                  </p>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">What persuasive technique is used in the yellow highlighted text?</label>
                    <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                      <option>Select the technique...</option>
                      <option value="1">Antithesis (contrasting ideas)</option>
                      <option value="2">Rhetorical questions</option>
                      <option value="3">Anaphora (repetition at beginning)</option>
                      <option value="4">Metaphor</option>
                      <option value="5">Rule of three</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">What persuasive technique is used in the green highlighted text?</label>
                    <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                      <option>Select the technique...</option>
                      <option value="1">Startling statistic</option>
                      <option value="2">Rhetorical question</option>
                      <option value="3">Anaphora (repetition at beginning)</option>
                      <option value="4">Metaphor</option>
                      <option value="5">Rule of three</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">What persuasive technique is used in the blue highlighted text?</label>
                    <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                      <option>Select the technique...</option>
                      <option value="1">Antithesis (contrasting ideas)</option>
                      <option value="2">Rhetorical question</option>
                      <option value="3">Anaphora (repetition at beginning)</option>
                      <option value="4">Vivid imagery</option>
                      <option value="5">Rule of three</option>
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
            <h4 className="font-medium text-green-800">Activity 2: Create Powerful Speech Openings</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Practice writing attention-grabbing openings for persuasive speeches using different techniques.
            </p>
            
            <div className="space-y-6">
              <div>
                <p className="text-gray-700 mb-2">For each topic, write a compelling opening using the specified technique:</p>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Topic: <span className="font-medium">School uniforms should be optional</span></p>
                    <label className="block text-xs text-gray-500 mb-1">Write an opening using a startling statistic or fact:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Did you know that the average family spends over $250 per year on school uniforms? That's more than $3,000 over a student's school career—money that could be spent on educational resources or saved for university."
                    ></textarea>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Topic: <span className="font-medium">Schools should start later in the morning</span></p>
                    <label className="block text-xs text-gray-500 mb-1">Write an opening using a provocative question:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="What if I told you that a simple change in our school schedule could improve academic performance, reduce student stress, and even decrease car accidents among teenagers? Would you be interested in making that change?"
                    ></textarea>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Topic: <span className="font-medium">We should reduce plastic use in our school</span></p>
                    <label className="block text-xs text-gray-500 mb-1">Write an opening using a brief, relevant anecdote:</label>
                    <textarea
                      rows={3}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Last weekend, I was walking along Bondi Beach when I spotted something moving in the sand. It was a small sea turtle, struggling to make its way back to the ocean. As I got closer, I noticed something wrapped around its flipper—a plastic straw, just like the hundreds we use and discard in our school cafeteria every single day."
                    ></textarea>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Topic: <span className="font-medium">All students should learn a musical instrument</span></p>
                    <label className="block text-xs text-gray-500 mb-1">Write an opening using a powerful quotation:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Plato once said, 'Music gives a soul to the universe, wings to the mind, flight to the imagination, and life to everything.' Today, I want to talk about why every student in our school deserves the opportunity to experience this power through learning a musical instrument."
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Submit Openings
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-purple-50 px-4 py-2">
            <h4 className="font-medium text-purple-800">Activity 3: Plan a Persuasive Speech</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Create an outline for a persuasive speech on a topic of your choice.
            </p>
            
            <div className="space-y-6">
              <div>
                <p className="text-sm text-gray-600 mb-2">Choose a topic for your persuasive speech:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                  <div className="flex items-center">
                    <input id="topic1" name="topic" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="topic1" className="ml-2 block text-sm text-gray-700">Schools should ban mobile phones</label>
                  </div>
                  <div className="flex items-center">
                    <input id="topic2" name="topic" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="topic2" className="ml-2 block text-sm text-gray-700">Homework should be optional</label>
                  </div>
                  <div className="flex items-center">
                    <input id="topic3" name="topic" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="topic3" className="ml-2 block text-sm text-gray-700">Schools should adopt a four-day week</label>
                  </div>
                  <div className="flex items-center">
                    <input id="topic4" name="topic" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="topic4" className="ml-2 block text-sm text-gray-700">Your own choice:</label>
                    <input type="text" className="ml-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="Enter a topic..." />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Who is your audience?</label>
                  <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                    <option>Select an audience...</option>
                    <option value="1">Fellow students</option>
                    <option value="2">School administration</option>
                    <option value="3">Parents</option>
                    <option value="4">Community members</option>
                    <option value="5">School board</option>
                  </select>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Introduction</label>
                    <div className="grid grid-cols-1 gap-3">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Attention-grabbing opening:</label>
                        <select className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                          <option>Select an opening technique...</option>
                          <option value="1">Startling statistic or fact</option>
                          <option value="2">Provocative question</option>
                          <option value="3">Powerful quotation</option>
                          <option value="4">Brief, relevant anecdote</option>
                          <option value="5">Bold statement or declaration</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Write your opening:</label>
                        <textarea
                          rows={2}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="Write your attention-grabbing opening here..."
                        ></textarea>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Thesis statement (your position):</label>
                        <textarea
                          rows={2}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="Clearly state your position on the topic..."
                        ></textarea>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Preview of main points:</label>
                        <textarea
                          rows={2}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="Briefly outline the main points you will cover..."
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Body</label>
                    <div className="grid grid-cols-1 gap-3">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Main Point 1:</label>
                        <textarea
                          rows={2}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="State your first main argument..."
                        ></textarea>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Supporting evidence for Point 1:</label>
                        <textarea
                          rows={2}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="Provide facts, examples, or expert opinions that support this point..."
                        ></textarea>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Main Point 2:</label>
                        <textarea
                          rows={2}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="State your second main argument..."
                        ></textarea>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Supporting evidence for Point 2:</label>
                        <textarea
                          rows={2}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="Provide facts, examples, or expert opinions that support this point..."
                        ></textarea>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Main Point 3 (optional):</label>
                        <textarea
                          rows={2}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="State your third main argument (if needed)..."
                        ></textarea>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Supporting evidence for Point 3:</label>
                        <textarea
                          rows={2}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="Provide facts, examples, or expert opinions that support this point..."
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address Counter-Arguments</label>
                    <div className="grid grid-cols-1 gap-3">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Main opposing viewpoint:</label>
                        <textarea
                          rows={2}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="What would opponents of your position argue?"
                        ></textarea>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Your rebuttal:</label>
                        <textarea
                          rows={2}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="How would you respond to this opposing viewpoint?"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Conclusion</label>
                    <div className="grid grid-cols-1 gap-3">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Restate thesis:</label>
                        <textarea
                          rows={2}
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
                        <label className="block text-xs text-gray-500 mb-1">Call to action:</label>
                        <textarea
                          rows={2}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="What specific action do you want your audience to take?"
                        ></textarea>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Memorable closing statement:</label>
                        <textarea
                          rows={2}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="End with a powerful statement that will resonate with your audience..."
                        ></textarea>
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
                  Save Speech Outline
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-red-50 px-4 py-2">
            <h4 className="font-medium text-red-800">Activity 4: Write a Short Persuasive Speech</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Using your outline from Activity 3, write a short persuasive speech (2-3 minutes when spoken aloud).
            </p>
            
            <div className="space-y-6">
              <div>
                <p className="text-sm text-gray-600 mb-2">Remember to:</p>
                <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                  <li>Write for the ear, not the eye (use shorter sentences and simpler vocabulary)</li>
                  <li>Include rhetorical techniques (rule of three, anaphora, rhetorical questions, etc.)</li>
                  <li>Use inclusive language ("we," "our") to connect with your audience</li>
                  <li>Create a strong opening and powerful conclusion</li>
                  <li>Address and refute counter-arguments</li>
                  <li>Include a clear call to action</li>
                </ul>
                
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Persuasive Speech:</label>
                  <textarea
                    rows={15}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Write your complete persuasive speech here..."
                  ></textarea>
                </div>
                
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Self-Assessment:</label>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input id="check1" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="check1" className="ml-2 block text-sm text-gray-700">I included an attention-grabbing opening.</label>
                    </div>
                    <div className="flex items-center">
                      <input id="check2" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="check2" className="ml-2 block text-sm text-gray-700">I clearly stated my thesis/position.</label>
                    </div>
                    <div className="flex items-center">
                      <input id="check3" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="check3" className="ml-2 block text-sm text-gray-700">I included at least 2-3 main points with supporting evidence.</label>
                    </div>
                    <div className="flex items-center">
                      <input id="check4" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="check4" className="ml-2 block text-sm text-gray-700">I addressed and refuted at least one counter-argument.</label>
                    </div>
                    <div className="flex items-center">
                      <input id="check5" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="check5" className="ml-2 block text-sm text-gray-700">I used at least three different rhetorical techniques.</label>
                    </div>
                    <div className="flex items-center">
                      <input id="check6" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="check6" className="ml-2 block text-sm text-gray-700">I included a clear call to action.</label>
                    </div>
                    <div className="flex items-center">
                      <input id="check7" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="check7" className="ml-2 block text-sm text-gray-700">I ended with a powerful conclusion.</label>
                    </div>
                    <div className="flex items-center">
                      <input id="check8" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="check8" className="ml-2 block text-sm text-gray-700">I used language appropriate for spoken delivery (not too complex).</label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Submit Speech
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
