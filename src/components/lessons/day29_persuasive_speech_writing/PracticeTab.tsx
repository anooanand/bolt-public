import React from 'react';

export function PracticeTab() {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Practice: Persuasive Speech Writing</h3>
      
      <div className="bg-indigo-50 p-4 rounded-lg mb-6">
        <p className="text-gray-700">
          Now it's time to practice writing persuasive speeches. Complete the exercises below to strengthen your ability to craft compelling spoken arguments that can also enhance your written persuasive pieces for the NSW Selective exam.
        </p>
      </div>
      
      <div className="space-y-8">
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-blue-50 px-4 py-2">
            <h4 className="font-medium text-blue-800">Exercise 1: Analyze Persuasive Speech Techniques</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Read the following excerpt from a persuasive speech and identify the techniques used. Then explain how each technique strengthens the persuasive impact.
            </p>
            
            <div className="border p-3 rounded-lg mb-4">
              <p className="italic text-gray-700">
                "Fellow students, imagine a school where creativity flourishes, where innovation is celebrated, and where every student has the opportunity to discover their unique talents. This is not just a dream—it can be our reality.
                <br /><br />
                Today, our arts programs are underfunded, our music rooms lack instruments, and our drama department struggles with outdated equipment. How can we expect to develop well-rounded students when we neglect these essential areas of education? How can we prepare for a future that demands creativity when we fail to nurture it now?
                <br /><br />
                Research shows that students who participate in arts education score higher in math and science. They develop critical thinking skills that serve them in every subject. They learn discipline, perseverance, and teamwork—skills that will benefit them throughout their lives.
                <br /><br />
                We must act. We must prioritize. We must invest in arts education. The time for change is not tomorrow—it's today. Join me in petitioning the school board to increase funding for arts programs. Together, we can create a school that truly prepares us for the future—a future where creativity is as valued as calculation, where expression is as important as equation."
              </p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">1. Identify the opening technique used and explain its effect:</label>
                <textarea
                  rows={3}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="What technique does the speaker use to open the speech? How does it engage the audience?"
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">2. Find at least two examples of rhetorical questions and explain their purpose:</label>
                <textarea
                  rows={3}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Quote the rhetorical questions and explain how they strengthen the argument..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">3. Identify an example of repetition (anaphora) and explain its effect:</label>
                <textarea
                  rows={3}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Quote the repetition and explain how it emphasizes key points..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">4. Find an example of antithesis and explain its impact:</label>
                <textarea
                  rows={3}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Quote the antithesis and explain how it creates contrast and emphasis..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">5. How does the conclusion create a call to action? What makes it effective?</label>
                <textarea
                  rows={3}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Analyze the conclusion and its persuasive elements..."
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-green-50 px-4 py-2">
            <h4 className="font-medium text-green-800">Exercise 2: Create Powerful Speech Openings</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Write compelling opening paragraphs for persuasive speeches on the following topics, using different attention-grabbing techniques.
            </p>
            
            <div className="space-y-6">
              <div>
                <h5 className="font-medium text-gray-800 mb-2">1. Topic: Schools should ban single-use plastics</h5>
                <p className="text-sm text-gray-600 mb-2">Technique: Start with a startling statistic or fact</p>
                <textarea
                  rows={4}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Write an opening paragraph that begins with a startling statistic or fact..."
                ></textarea>
              </div>
              
              <div>
                <h5 className="font-medium text-gray-800 mb-2">2. Topic: All students should learn a second language</h5>
                <p className="text-sm text-gray-600 mb-2">Technique: Start with a provocative question</p>
                <textarea
                  rows={4}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Write an opening paragraph that begins with a provocative question..."
                ></textarea>
              </div>
              
              <div>
                <h5 className="font-medium text-gray-800 mb-2">3. Topic: Schools should adopt later start times</h5>
                <p className="text-sm text-gray-600 mb-2">Technique: Start with a brief, relevant anecdote</p>
                <textarea
                  rows={4}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Write an opening paragraph that begins with a brief, relevant anecdote..."
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-purple-50 px-4 py-2">
            <h4 className="font-medium text-purple-800">Exercise 3: Create Rhetorical Devices for Speeches</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Write examples of the following rhetorical devices that could be used in a persuasive speech on the topic: "Schools should provide free healthy lunches to all students."
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">1. Rule of three (tricolon):</label>
                <textarea
                  rows={2}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Write a sentence using the rule of three..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">2. Anaphora (repetition at the beginning of successive clauses):</label>
                <textarea
                  rows={3}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Write 2-3 sentences using anaphora..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">3. Rhetorical question:</label>
                <textarea
                  rows={2}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Write a rhetorical question..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">4. Antithesis (juxtaposing contrasting ideas):</label>
                <textarea
                  rows={2}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Write a sentence using antithesis..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">5. Metaphor:</label>
                <textarea
                  rows={2}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Write a sentence using metaphor..."
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-red-50 px-4 py-2">
            <h4 className="font-medium text-red-800">Exercise 4: Create Powerful Conclusions</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Write compelling concluding paragraphs for persuasive speeches on the following topics, using different conclusion techniques.
            </p>
            
            <div className="space-y-6">
              <div>
                <h5 className="font-medium text-gray-800 mb-2">1. Topic: Schools should implement more outdoor education</h5>
                <p className="text-sm text-gray-600 mb-2">Technique: Provide a specific call to action</p>
                <textarea
                  rows={4}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Write a concluding paragraph with a specific call to action..."
                ></textarea>
              </div>
              
              <div>
                <h5 className="font-medium text-gray-800 mb-2">2. Topic: Students should have more input in school curriculum</h5>
                <p className="text-sm text-gray-600 mb-2">Technique: Present a compelling vision of the future</p>
                <textarea
                  rows={4}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Write a concluding paragraph that presents a vision of the future..."
                ></textarea>
              </div>
              
              <div>
                <h5 className="font-medium text-gray-800 mb-2">3. Topic: Schools should prioritize mental health education</h5>
                <p className="text-sm text-gray-600 mb-2">Technique: Circle back to your opening (create a frame)</p>
                <p className="text-sm text-gray-600 mb-2 italic">Opening: "In a classroom of 30 students, statistics tell us that at least six are struggling with mental health challenges right now."</p>
                <textarea
                  rows={4}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Write a concluding paragraph that circles back to the opening..."
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-yellow-50 px-4 py-2">
            <h4 className="font-medium text-yellow-800">Exercise 5: Final Challenge - Plan a Complete Speech</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Plan and outline a complete persuasive speech on one of the topics below. Then write the introduction and conclusion in full.
            </p>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Choose a topic:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="flex items-center">
                  <input id="topic1" name="topic" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="topic1" className="ml-2 block text-sm text-gray-700">Schools should replace textbooks with tablets</label>
                </div>
                <div className="flex items-center">
                  <input id="topic2" name="topic" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="topic2" className="ml-2 block text-sm text-gray-700">Students should have a longer lunch break</label>
                </div>
                <div className="flex items-center">
                  <input id="topic3" name="topic" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="topic3" className="ml-2 block text-sm text-gray-700">Schools should adopt a four-day school week</label>
                </div>
                <div className="flex items-center">
                  <input id="topic4" name="topic" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="topic4" className="ml-2 block text-sm text-gray-700">All students should learn coding</label>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Thesis statement (your position):</label>
                <textarea
                  rows={2}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Write a clear thesis statement..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Main argument 1 (with supporting evidence):</label>
                <textarea
                  rows={3}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Outline your first main argument and evidence..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Main argument 2 (with supporting evidence):</label>
                <textarea
                  rows={3}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Outline your second main argument and evidence..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Main argument 3 (with supporting evidence):</label>
                <textarea
                  rows={3}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Outline your third main argument and evidence..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Counter-argument and rebuttal:</label>
                <textarea
                  rows={3}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Outline a potential counter-argument and your rebuttal..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Introduction (write in full):</label>
                <textarea
                  rows={5}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Write your complete introduction paragraph(s)..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Conclusion (write in full):</label>
                <textarea
                  rows={5}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Write your complete conclusion paragraph(s)..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rhetorical devices used (list at least 3):</label>
                <textarea
                  rows={3}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="List the rhetorical devices you used in your introduction and conclusion..."
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
            Submit Practice Exercises
          </button>
        </div>
      </div>
    </div>
  );
}
