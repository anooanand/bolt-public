import React from 'react';

export function ActivitiesTab() {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Interactive Activities</h3>
      
      <div className="bg-indigo-50 p-4 rounded-lg mb-6">
        <p className="text-gray-700">
          Complete these interactive activities to reinforce your understanding of persuasive techniques. These exercises will help you use these techniques effectively in your writing for the NSW Selective exam.
        </p>
      </div>
      
      <div className="space-y-8">
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-blue-50 px-4 py-2">
            <h4 className="font-medium text-blue-800">Activity 1: Identify Persuasive Techniques</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Read each excerpt below and identify which persuasive technique is being used.
            </p>
            
            <div className="space-y-6">
              <div>
                <p className="text-gray-700 mb-2">1. <span className="font-medium">"Can we really afford to ignore climate change any longer? How will we explain our inaction to future generations?"</span></p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input id="tech1-a" name="tech1" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="tech1-a" className="ml-2 block text-sm text-gray-700">Emotive Language</label>
                  </div>
                  <div className="flex items-center">
                    <input id="tech1-b" name="tech1" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="tech1-b" className="ml-2 block text-sm text-gray-700">Facts & Statistics</label>
                  </div>
                  <div className="flex items-center">
                    <input id="tech1-c" name="tech1" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="tech1-c" className="ml-2 block text-sm text-gray-700">Rhetorical Questions</label>
                  </div>
                  <div className="flex items-center">
                    <input id="tech1-d" name="tech1" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="tech1-d" className="ml-2 block text-sm text-gray-700">Expert Opinion</label>
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-gray-700 mb-2">2. <span className="font-medium">"A recent study by the Department of Education found that students who read for pleasure at least 30 minutes daily score 23% higher on standardized tests."</span></p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input id="tech2-a" name="tech2" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="tech2-a" className="ml-2 block text-sm text-gray-700">Personal Anecdote</label>
                  </div>
                  <div className="flex items-center">
                    <input id="tech2-b" name="tech2" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="tech2-b" className="ml-2 block text-sm text-gray-700">Facts & Statistics</label>
                  </div>
                  <div className="flex items-center">
                    <input id="tech2-c" name="tech2" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="tech2-c" className="ml-2 block text-sm text-gray-700">Repetition</label>
                  </div>
                  <div className="flex items-center">
                    <input id="tech2-d" name="tech2" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="tech2-d" className="ml-2 block text-sm text-gray-700">Rhetorical Questions</label>
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-gray-700 mb-2">3. <span className="font-medium">"The heartbreaking sight of homeless children shivering in the bitter cold should shock us all into action."</span></p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input id="tech3-a" name="tech3" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="tech3-a" className="ml-2 block text-sm text-gray-700">Emotive Language</label>
                  </div>
                  <div className="flex items-center">
                    <input id="tech3-b" name="tech3" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="tech3-b" className="ml-2 block text-sm text-gray-700">Expert Opinion</label>
                  </div>
                  <div className="flex items-center">
                    <input id="tech3-c" name="tech3" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="tech3-c" className="ml-2 block text-sm text-gray-700">Facts & Statistics</label>
                  </div>
                  <div className="flex items-center">
                    <input id="tech3-d" name="tech3" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="tech3-d" className="ml-2 block text-sm text-gray-700">Personal Anecdote</label>
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-gray-700 mb-2">4. <span className="font-medium">"According to Professor James Wong, a leading nutritionist at Sydney University, 'Breakfast is the most important meal of the day for developing brains.'"</span></p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input id="tech4-a" name="tech4" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="tech4-a" className="ml-2 block text-sm text-gray-700">Rhetorical Questions</label>
                  </div>
                  <div className="flex items-center">
                    <input id="tech4-b" name="tech4" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="tech4-b" className="ml-2 block text-sm text-gray-700">Expert Opinion</label>
                  </div>
                  <div className="flex items-center">
                    <input id="tech4-c" name="tech4" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="tech4-c" className="ml-2 block text-sm text-gray-700">Emotive Language</label>
                  </div>
                  <div className="flex items-center">
                    <input id="tech4-d" name="tech4" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="tech4-d" className="ml-2 block text-sm text-gray-700">Repetition</label>
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-gray-700 mb-2">5. <span className="font-medium">"Last week, I watched my younger brother struggle with his homework until midnight. The next day, he was too tired to focus in class. This pattern continued all week, affecting his grades and his mood."</span></p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input id="tech5-a" name="tech5" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="tech5-a" className="ml-2 block text-sm text-gray-700">Facts & Statistics</label>
                  </div>
                  <div className="flex items-center">
                    <input id="tech5-b" name="tech5" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="tech5-b" className="ml-2 block text-sm text-gray-700">Expert Opinion</label>
                  </div>
                  <div className="flex items-center">
                    <input id="tech5-c" name="tech5" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="tech5-c" className="ml-2 block text-sm text-gray-700">Personal Anecdote</label>
                  </div>
                  <div className="flex items-center">
                    <input id="tech5-d" name="tech5" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="tech5-d" className="ml-2 block text-sm text-gray-700">Rhetorical Questions</label>
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-gray-700 mb-2">6. <span className="font-medium">"We need change. Change in our policies. Change in our priorities. Change in our actions."</span></p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input id="tech6-a" name="tech6" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="tech6-a" className="ml-2 block text-sm text-gray-700">Repetition</label>
                  </div>
                  <div className="flex items-center">
                    <input id="tech6-b" name="tech6" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="tech6-b" className="ml-2 block text-sm text-gray-700">Emotive Language</label>
                  </div>
                  <div className="flex items-center">
                    <input id="tech6-c" name="tech6" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="tech6-c" className="ml-2 block text-sm text-gray-700">Facts & Statistics</label>
                  </div>
                  <div className="flex items-center">
                    <input id="tech6-d" name="tech6" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="tech6-d" className="ml-2 block text-sm text-gray-700">Personal Anecdote</label>
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
            <h4 className="font-medium text-green-800">Activity 2: Analyze Multiple Techniques</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Read the persuasive paragraph below and identify all the persuasive techniques used.
            </p>
            
            <div className="border p-3 rounded-lg mb-4 bg-gray-50">
              <p className="text-gray-700">
                Have you ever considered how much plastic you use in a single day? From toothbrushes to food packaging, plastic has invaded every aspect of our lives. According to the United Nations Environment Programme, humans produce over 300 million tons of plastic waste every year – equivalent to the weight of the entire human population. This devastating pollution is choking our oceans, poisoning our wildlife, and threatening our own health. Marine biologist Dr. Elena Rodriguez warns that "microplastics are now found in the stomachs of nearly all marine species studied." Last month, I volunteered at a beach cleanup and was horrified to fill three large bags with plastic waste in just one hour at a small local beach. We must act now. Now, before more species go extinct. Now, before our oceans become plastic soup. The time for change is not tomorrow – it's today.
              </p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Identify all the persuasive techniques used in this paragraph (select all that apply):</label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input id="para1" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="para1" className="ml-2 block text-sm text-gray-700">Rhetorical Questions</label>
                  </div>
                  <div className="flex items-center">
                    <input id="para2" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="para2" className="ml-2 block text-sm text-gray-700">Facts & Statistics</label>
                  </div>
                  <div className="flex items-center">
                    <input id="para3" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="para3" className="ml-2 block text-sm text-gray-700">Emotive Language</label>
                  </div>
                  <div className="flex items-center">
                    <input id="para4" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="para4" className="ml-2 block text-sm text-gray-700">Expert Opinion</label>
                  </div>
                  <div className="flex items-center">
                    <input id="para5" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="para5" className="ml-2 block text-sm text-gray-700">Personal Anecdote</label>
                  </div>
                  <div className="flex items-center">
                    <input id="para6" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="para6" className="ml-2 block text-sm text-gray-700">Repetition</label>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">For each technique you identified, provide an example from the text:</label>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Rhetorical Questions example:</label>
                    <textarea
                      rows={1}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Copy an example from the text..."
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Facts & Statistics example:</label>
                    <textarea
                      rows={1}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Copy an example from the text..."
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Emotive Language example:</label>
                    <textarea
                      rows={1}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Copy an example from the text..."
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expert Opinion example:</label>
                    <textarea
                      rows={1}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Copy an example from the text..."
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Personal Anecdote example:</label>
                    <textarea
                      rows={1}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Copy an example from the text..."
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Repetition example:</label>
                    <textarea
                      rows={1}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Copy an example from the text..."
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Check Analysis
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-purple-50 px-4 py-2">
            <h4 className="font-medium text-purple-800">Activity 3: Create Persuasive Statements</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              For the topic "Schools should offer more extracurricular activities," create one persuasive statement using each technique.
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-blue-800 mb-1">1. Emotive Language:</label>
                <textarea
                  rows={2}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Write a statement using emotive language..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-green-800 mb-1">2. Facts & Statistics (you can create realistic-sounding statistics):</label>
                <textarea
                  rows={2}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Write a statement using facts and statistics..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-purple-800 mb-1">3. Rhetorical Questions:</label>
                <textarea
                  rows={2}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Write a statement using rhetorical questions..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-red-800 mb-1">4. Expert Opinion (you can create a realistic-sounding expert):</label>
                <textarea
                  rows={2}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Write a statement using expert opinion..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-yellow-800 mb-1">5. Personal Anecdote:</label>
                <textarea
                  rows={2}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Write a statement using a personal anecdote..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-indigo-800 mb-1">6. Repetition:</label>
                <textarea
                  rows={2}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Write a statement using repetition..."
                ></textarea>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Submit Statements
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-red-50 px-4 py-2">
            <h4 className="font-medium text-red-800">Activity 4: Write a Persuasive Paragraph</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Choose one of the topics below and write a persuasive paragraph incorporating at least three different persuasive techniques.
            </p>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Choose a topic:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="flex items-center">
                  <input id="topic1" name="topic" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="topic1" className="ml-2 block text-sm text-gray-700">Social media has more negative than positive effects on teenagers</label>
                </div>
                <div className="flex items-center">
                  <input id="topic2" name="topic" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="topic2" className="ml-2 block text-sm text-gray-700">All students should learn a musical instrument</label>
                </div>
                <div className="flex items-center">
                  <input id="topic3" name="topic" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="topic3" className="ml-2 block text-sm text-gray-700">School canteens should only sell healthy food</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Your persuasive paragraph:</label>
                <textarea
                  rows={10}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Write your persuasive paragraph here..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Persuasive techniques used (check all that apply):</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  <div className="flex items-center">
                    <input id="used1" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="used1" className="ml-2 block text-sm text-gray-700">Emotive Language</label>
                  </div>
                  <div className="flex items-center">
                    <input id="used2" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="used2" className="ml-2 block text-sm text-gray-700">Facts & Statistics</label>
                  </div>
                  <div className="flex items-center">
                    <input id="used3" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="used3" className="ml-2 block text-sm text-gray-700">Rhetorical Questions</label>
                  </div>
                  <div className="flex items-center">
                    <input id="used4" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="used4" className="ml-2 block text-sm text-gray-700">Expert Opinion</label>
                  </div>
                  <div className="flex items-center">
                    <input id="used5" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="used5" className="ml-2 block text-sm text-gray-700">Personal Anecdote</label>
                  </div>
                  <div className="flex items-center">
                    <input id="used6" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="used6" className="ml-2 block text-sm text-gray-700">Repetition</label>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Self-Assessment:</label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input id="check1" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="check1" className="ml-2 block text-sm text-gray-700">I used at least three different persuasive techniques.</label>
                  </div>
                  <div className="flex items-center">
                    <input id="check2" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="check2" className="ml-2 block text-sm text-gray-700">My paragraph has a clear position on the topic.</label>
                  </div>
                  <div className="flex items-center">
                    <input id="check3" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="check3" className="ml-2 block text-sm text-gray-700">My persuasive techniques are integrated naturally into the paragraph.</label>
                  </div>
                  <div className="flex items-center">
                    <input id="check4" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="check4" className="ml-2 block text-sm text-gray-700">My paragraph flows well and is coherent.</label>
                  </div>
                  <div className="flex items-center">
                    <input id="check5" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="check5" className="ml-2 block text-sm text-gray-700">My paragraph is convincing and would likely persuade readers.</label>
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
