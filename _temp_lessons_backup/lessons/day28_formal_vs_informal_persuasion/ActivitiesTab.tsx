import React from 'react';

export function ActivitiesTab() {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Interactive Activities</h3>
      
      <div className="bg-indigo-50 p-4 rounded-lg mb-6">
        <p className="text-gray-700">
          Complete these interactive activities to practice using formal and informal persuasive writing styles for the NSW Selective exam.
        </p>
      </div>
      
      <div className="space-y-8">
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-blue-50 px-4 py-2">
            <h4 className="font-medium text-blue-800">Activity 1: Identify Formal and Informal Elements</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Read the following passages and identify whether each highlighted element is characteristic of formal or informal persuasive writing.
            </p>
            
            <div className="space-y-6">
              <div>
                <p className="text-gray-700 mb-2">Passage 1:</p>
                <div className="border p-3 rounded-lg mb-3 bg-gray-50">
                  <p className="text-gray-700">
                    <span className="bg-yellow-100 px-1 rounded">I believe</span> that school uniforms should be mandatory in all public schools. <span className="bg-green-100 px-1 rounded">Research conducted by the Education Policy Institute (2023) indicates</span> that schools with uniform policies report fewer instances of bullying related to appearance and socioeconomic status. <span className="bg-blue-100 px-1 rounded">Don't you think</span> all students deserve to feel equal in their learning environment? <span className="bg-purple-100 px-1 rounded">Furthermore, it has been observed that</span> uniforms help students develop a sense of belonging and community within their school.
                  </p>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">The yellow highlighted text "I believe" is:</label>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <input id="yellow-formal" name="yellow" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                        <label htmlFor="yellow-formal" className="ml-2 block text-sm text-gray-700">Formal</label>
                      </div>
                      <div className="flex items-center">
                        <input id="yellow-informal" name="yellow" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                        <label htmlFor="yellow-informal" className="ml-2 block text-sm text-gray-700">Informal</label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">The green highlighted text "Research conducted by the Education Policy Institute (2023) indicates" is:</label>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <input id="green-formal" name="green" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                        <label htmlFor="green-formal" className="ml-2 block text-sm text-gray-700">Formal</label>
                      </div>
                      <div className="flex items-center">
                        <input id="green-informal" name="green" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                        <label htmlFor="green-informal" className="ml-2 block text-sm text-gray-700">Informal</label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">The blue highlighted text "Don't you think" is:</label>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <input id="blue-formal" name="blue" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                        <label htmlFor="blue-formal" className="ml-2 block text-sm text-gray-700">Formal</label>
                      </div>
                      <div className="flex items-center">
                        <input id="blue-informal" name="blue" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                        <label htmlFor="blue-informal" className="ml-2 block text-sm text-gray-700">Informal</label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">The purple highlighted text "Furthermore, it has been observed that" is:</label>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <input id="purple-formal" name="purple" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                        <label htmlFor="purple-formal" className="ml-2 block text-sm text-gray-700">Formal</label>
                      </div>
                      <div className="flex items-center">
                        <input id="purple-informal" name="purple" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                        <label htmlFor="purple-informal" className="ml-2 block text-sm text-gray-700">Informal</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-gray-700 mb-2">Passage 2:</p>
                <div className="border p-3 rounded-lg mb-3 bg-gray-50">
                  <p className="text-gray-700">
                    <span className="bg-yellow-100 px-1 rounded">Let's face it</span> – social media has changed how we communicate. <span className="bg-green-100 px-1 rounded">It's pretty obvious</span> that platforms like Instagram and TikTok have a huge impact on teens. <span className="bg-blue-100 px-1 rounded">According to recent studies conducted by the Digital Media Research Center,</span> adolescents who spend more than three hours daily on social media report higher levels of anxiety and depression. <span className="bg-purple-100 px-1 rounded">One must consider</span> the long-term effects of this digital dependency on young people's mental health.
                  </p>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">The yellow highlighted text "Let's face it" is:</label>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <input id="yellow2-formal" name="yellow2" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                        <label htmlFor="yellow2-formal" className="ml-2 block text-sm text-gray-700">Formal</label>
                      </div>
                      <div className="flex items-center">
                        <input id="yellow2-informal" name="yellow2" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                        <label htmlFor="yellow2-informal" className="ml-2 block text-sm text-gray-700">Informal</label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">The green highlighted text "It's pretty obvious" is:</label>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <input id="green2-formal" name="green2" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                        <label htmlFor="green2-formal" className="ml-2 block text-sm text-gray-700">Formal</label>
                      </div>
                      <div className="flex items-center">
                        <input id="green2-informal" name="green2" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                        <label htmlFor="green2-informal" className="ml-2 block text-sm text-gray-700">Informal</label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">The blue highlighted text "According to recent studies conducted by the Digital Media Research Center," is:</label>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <input id="blue2-formal" name="blue2" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                        <label htmlFor="blue2-formal" className="ml-2 block text-sm text-gray-700">Formal</label>
                      </div>
                      <div className="flex items-center">
                        <input id="blue2-informal" name="blue2" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                        <label htmlFor="blue2-informal" className="ml-2 block text-sm text-gray-700">Informal</label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">The purple highlighted text "One must consider" is:</label>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <input id="purple2-formal" name="purple2" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                        <label htmlFor="purple2-formal" className="ml-2 block text-sm text-gray-700">Formal</label>
                      </div>
                      <div className="flex items-center">
                        <input id="purple2-informal" name="purple2" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                        <label htmlFor="purple2-informal" className="ml-2 block text-sm text-gray-700">Informal</label>
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
                  Check Answers
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-green-50 px-4 py-2">
            <h4 className="font-medium text-green-800">Activity 2: Match Contexts with Appropriate Style</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              For each writing context, select whether a formal or informal persuasive style would be more appropriate.
            </p>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-4">
                <div className="border p-3 rounded-lg bg-gray-50">
                  <p className="text-gray-700 mb-2">1. A letter to your school principal requesting more funding for the arts program</p>
                  <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">The most appropriate style would be:</label>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <input id="context1-formal" name="context1" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                        <label htmlFor="context1-formal" className="ml-2 block text-sm text-gray-700">Formal</label>
                      </div>
                      <div className="flex items-center">
                        <input id="context1-informal" name="context1" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                        <label htmlFor="context1-informal" className="ml-2 block text-sm text-gray-700">Informal</label>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border p-3 rounded-lg bg-gray-50">
                  <p className="text-gray-700 mb-2">2. A social media post encouraging your friends to join a beach cleanup event</p>
                  <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">The most appropriate style would be:</label>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <input id="context2-formal" name="context2" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                        <label htmlFor="context2-formal" className="ml-2 block text-sm text-gray-700">Formal</label>
                      </div>
                      <div className="flex items-center">
                        <input id="context2-informal" name="context2" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                        <label htmlFor="context2-informal" className="ml-2 block text-sm text-gray-700">Informal</label>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border p-3 rounded-lg bg-gray-50">
                  <p className="text-gray-700 mb-2">3. An editorial for a national newspaper about climate change policy</p>
                  <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">The most appropriate style would be:</label>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <input id="context3-formal" name="context3" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                        <label htmlFor="context3-formal" className="ml-2 block text-sm text-gray-700">Formal</label>
                      </div>
                      <div className="flex items-center">
                        <input id="context3-informal" name="context3" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                        <label htmlFor="context3-informal" className="ml-2 block text-sm text-gray-700">Informal</label>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border p-3 rounded-lg bg-gray-50">
                  <p className="text-gray-700 mb-2">4. A speech to your classmates about starting a new student club</p>
                  <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">The most appropriate style would be:</label>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <input id="context4-formal" name="context4" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                        <label htmlFor="context4-formal" className="ml-2 block text-sm text-gray-700">Formal</label>
                      </div>
                      <div className="flex items-center">
                        <input id="context4-informal" name="context4" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                        <label htmlFor="context4-informal" className="ml-2 block text-sm text-gray-700">Informal</label>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border p-3 rounded-lg bg-gray-50">
                  <p className="text-gray-700 mb-2">5. A letter to a local business requesting sponsorship for a school event</p>
                  <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">The most appropriate style would be:</label>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <input id="context5-formal" name="context5" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                        <label htmlFor="context5-formal" className="ml-2 block text-sm text-gray-700">Formal</label>
                      </div>
                      <div className="flex items-center">
                        <input id="context5-informal" name="context5" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                        <label htmlFor="context5-informal" className="ml-2 block text-sm text-gray-700">Informal</label>
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
                  Check Answers
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-purple-50 px-4 py-2">
            <h4 className="font-medium text-purple-800">Activity 3: Convert Between Formal and Informal Styles</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Practice converting sentences between formal and informal persuasive styles.
            </p>
            
            <div className="space-y-6">
              <div>
                <p className="text-gray-700 mb-2">Convert these informal sentences to formal style:</p>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">1. "Don't you think it's crazy that we're still using so much plastic when we know it's killing our oceans?"</p>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Write the formal version here..."
                    ></textarea>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">2. "I'm telling you, later school start times would be awesome for teens who need more sleep!"</p>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Write the formal version here..."
                    ></textarea>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">3. "Let's face it – we've got to do something about the cafeteria food. It's pretty bad, right?"</p>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Write the formal version here..."
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-gray-700 mb-2">Convert these formal sentences to informal style:</p>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">1. "Research indicates that excessive screen time may have detrimental effects on adolescent development."</p>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Write the informal version here..."
                    ></textarea>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">2. "It is imperative that educational institutions implement more comprehensive recycling programs."</p>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Write the informal version here..."
                    ></textarea>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">3. "One must consider the long-term environmental implications of continued fossil fuel consumption."</p>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Write the informal version here..."
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Submit Conversions
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-red-50 px-4 py-2">
            <h4 className="font-medium text-red-800">Activity 4: Write Formal and Informal Paragraphs</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Write two persuasive paragraphs on the same topic—one using formal style and one using informal style.
            </p>
            
            <div className="space-y-6">
              <div>
                <p className="text-sm text-gray-600 mb-2">Choose a topic for your persuasive paragraphs:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                  <div className="flex items-center">
                    <input id="topic1" name="topic" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="topic1" className="ml-2 block text-sm text-gray-700">Schools should offer more extracurricular activities</label>
                  </div>
                  <div className="flex items-center">
                    <input id="topic2" name="topic" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="topic2" className="ml-2 block text-sm text-gray-700">Public transportation should be free for students</label>
                  </div>
                  <div className="flex items-center">
                    <input id="topic3" name="topic" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="topic3" className="ml-2 block text-sm text-gray-700">Community service should be required for graduation</label>
                  </div>
                  <div className="flex items-center">
                    <input id="topic4" name="topic" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="topic4" className="ml-2 block text-sm text-gray-700">Your own choice:</label>
                    <input type="text" className="ml-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="Enter a topic..." />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Planning your paragraphs:</label>
                  <div className="grid grid-cols-1 gap-3">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Your position on this topic:</label>
                      <input type="text" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="What is your stance on this issue?" />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Key points to include in both paragraphs:</label>
                      <textarea
                        rows={3}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="List 2-3 key points you want to make in both paragraphs..."
                      ></textarea>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Formal Paragraph:</label>
                    <div className="mb-2">
                      <label className="block text-xs text-gray-500 mb-1">Imagine you are writing to:</label>
                      <select className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                        <option>Select an audience...</option>
                        <option value="1">School principal</option>
                        <option value="2">Local newspaper editor</option>
                        <option value="3">City council member</option>
                        <option value="4">School board</option>
                      </select>
                    </div>
                    <textarea
                      rows={8}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Write your formal persuasive paragraph here..."
                    ></textarea>
                    <div className="mt-2">
                      <label className="block text-xs text-gray-500 mb-1">Formal elements I included (check all that apply):</label>
                      <div className="space-y-1">
                        <div className="flex items-center">
                          <input id="formal1" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                          <label htmlFor="formal1" className="ml-2 block text-xs text-gray-700">Third-person perspective</label>
                        </div>
                        <div className="flex items-center">
                          <input id="formal2" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                          <label htmlFor="formal2" className="ml-2 block text-xs text-gray-700">No contractions</label>
                        </div>
                        <div className="flex items-center">
                          <input id="formal3" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                          <label htmlFor="formal3" className="ml-2 block text-xs text-gray-700">Precise vocabulary</label>
                        </div>
                        <div className="flex items-center">
                          <input id="formal4" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                          <label htmlFor="formal4" className="ml-2 block text-xs text-gray-700">Complex sentence structures</label>
                        </div>
                        <div className="flex items-center">
                          <input id="formal5" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                          <label htmlFor="formal5" className="ml-2 block text-xs text-gray-700">Facts and statistics</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Informal Paragraph:</label>
                    <div className="mb-2">
                      <label className="block text-xs text-gray-500 mb-1">Imagine you are writing to:</label>
                      <select className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                        <option>Select an audience...</option>
                        <option value="1">Fellow students</option>
                        <option value="2">Friends on social media</option>
                        <option value="3">School newspaper readers</option>
                        <option value="4">Members of your club</option>
                      </select>
                    </div>
                    <textarea
                      rows={8}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Write your informal persuasive paragraph here..."
                    ></textarea>
                    <div className="mt-2">
                      <label className="block text-xs text-gray-500 mb-1">Informal elements I included (check all that apply):</label>
                      <div className="space-y-1">
                        <div className="flex items-center">
                          <input id="informal1" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                          <label htmlFor="informal1" className="ml-2 block text-xs text-gray-700">First/second person (I, we, you)</label>
                        </div>
                        <div className="flex items-center">
                          <input id="informal2" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                          <label htmlFor="informal2" className="ml-2 block text-xs text-gray-700">Contractions (can't, don't, it's)</label>
                        </div>
                        <div className="flex items-center">
                          <input id="informal3" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                          <label htmlFor="informal3" className="ml-2 block text-xs text-gray-700">Everyday language</label>
                        </div>
                        <div className="flex items-center">
                          <input id="informal4" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                          <label htmlFor="informal4" className="ml-2 block text-xs text-gray-700">Simple, direct sentences</label>
                        </div>
                        <div className="flex items-center">
                          <input id="informal5" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                          <label htmlFor="informal5" className="ml-2 block text-xs text-gray-700">Rhetorical questions</label>
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
                  Submit Paragraphs
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
