import React from 'react';

export function ActivitiesTab() {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Interactive Activities</h3>
      
      <div className="bg-indigo-50 p-4 rounded-lg mb-6">
        <p className="text-gray-700">
          Complete these interactive activities to reinforce your understanding of persuasive writing basics. These exercises will help you craft effective arguments for the NSW Selective exam.
        </p>
      </div>
      
      <div className="space-y-8">
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-blue-50 px-4 py-2">
            <h4 className="font-medium text-blue-800">Activity 1: Identify Persuasive Elements</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Read the persuasive paragraph below and identify which elements of the persuasive writing framework are used.
            </p>
            
            <div className="border p-3 rounded-lg mb-4 bg-gray-50">
              <p className="text-gray-700">
                (1) Schools should extend lunch breaks from 30 minutes to a full hour. (2) The current half-hour break simply isn't enough time for students to eat properly and recharge their minds. (3) According to research published in the Journal of School Health, students who have longer lunch breaks show improved concentration in afternoon classes and score an average of 12% higher on afternoon tests. (4) Some administrators worry that longer breaks might reduce instructional time, but the quality of learning is more important than the quantity. Students who are refreshed and focused will learn more efficiently, making better use of classroom time. (5) It's time for school boards to prioritize student well-being and academic performance by implementing longer lunch periods that allow proper nutrition and mental breaks.
              </p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Which numbered sentence contains the Clear Position?</label>
                <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option>Select sentence number...</option>
                  <option value="1">Sentence 1</option>
                  <option value="2">Sentence 2</option>
                  <option value="3">Sentence 3</option>
                  <option value="4">Sentence 4</option>
                  <option value="5">Sentence 5</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Which numbered sentence contains a Strong Reason?</label>
                <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option>Select sentence number...</option>
                  <option value="1">Sentence 1</option>
                  <option value="2">Sentence 2</option>
                  <option value="3">Sentence 3</option>
                  <option value="4">Sentence 4</option>
                  <option value="5">Sentence 5</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Which numbered sentence contains Convincing Evidence?</label>
                <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option>Select sentence number...</option>
                  <option value="1">Sentence 1</option>
                  <option value="2">Sentence 2</option>
                  <option value="3">Sentence 3</option>
                  <option value="4">Sentence 4</option>
                  <option value="5">Sentence 5</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Which numbered sentence Addresses Counterarguments?</label>
                <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option>Select sentence number...</option>
                  <option value="1">Sentence 1</option>
                  <option value="2">Sentence 2</option>
                  <option value="3">Sentence 3</option>
                  <option value="4">Sentence 4</option>
                  <option value="5">Sentence 5</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Which numbered sentence contains a Call to Action?</label>
                <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option>Select sentence number...</option>
                  <option value="1">Sentence 1</option>
                  <option value="2">Sentence 2</option>
                  <option value="3">Sentence 3</option>
                  <option value="4">Sentence 4</option>
                  <option value="5">Sentence 5</option>
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
            <h4 className="font-medium text-green-800">Activity 2: Evaluate Persuasive Statements</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              For each statement below, identify whether it is a strong or weak persuasive element and explain why.
            </p>
            
            <div className="space-y-6">
              <div>
                <p className="text-gray-700 mb-2">1. <span className="font-medium">"Everyone knows that homework is a waste of time."</span></p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input id="eval1-strong" name="eval1" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="eval1-strong" className="ml-2 block text-sm text-gray-700">Strong persuasive statement</label>
                  </div>
                  <div className="flex items-center">
                    <input id="eval1-weak" name="eval1" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="eval1-weak" className="ml-2 block text-sm text-gray-700">Weak persuasive statement</label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mt-2 mb-1">Explain why:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Explain your reasoning..."
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-gray-700 mb-2">2. <span className="font-medium">"According to a 2023 survey of 1,500 students, 78% reported feeling more confident when they had time to prepare for class presentations."</span></p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input id="eval2-strong" name="eval2" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="eval2-strong" className="ml-2 block text-sm text-gray-700">Strong persuasive statement</label>
                  </div>
                  <div className="flex items-center">
                    <input id="eval2-weak" name="eval2" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="eval2-weak" className="ml-2 block text-sm text-gray-700">Weak persuasive statement</label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mt-2 mb-1">Explain why:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Explain your reasoning..."
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-gray-700 mb-2">3. <span className="font-medium">"While some people argue that technology in classrooms is distracting, when properly managed, digital tools can actually increase student engagement and provide personalized learning experiences."</span></p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input id="eval3-strong" name="eval3" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="eval3-strong" className="ml-2 block text-sm text-gray-700">Strong persuasive statement</label>
                  </div>
                  <div className="flex items-center">
                    <input id="eval3-weak" name="eval3" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="eval3-weak" className="ml-2 block text-sm text-gray-700">Weak persuasive statement</label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mt-2 mb-1">Explain why:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Explain your reasoning..."
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-gray-700 mb-2">4. <span className="font-medium">"I think school uniforms are probably a good idea."</span></p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input id="eval4-strong" name="eval4" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="eval4-strong" className="ml-2 block text-sm text-gray-700">Strong persuasive statement</label>
                  </div>
                  <div className="flex items-center">
                    <input id="eval4-weak" name="eval4" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="eval4-weak" className="ml-2 block text-sm text-gray-700">Weak persuasive statement</label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mt-2 mb-1">Explain why:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Explain your reasoning..."
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Submit Evaluations
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-purple-50 px-4 py-2">
            <h4 className="font-medium text-purple-800">Activity 3: Develop Reasons and Evidence</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Choose one of the persuasive positions below and develop three strong reasons with supporting evidence for each.
            </p>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Choose a position to support:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="flex items-center">
                  <input id="pos1" name="position" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="pos1" className="ml-2 block text-sm text-gray-700">Schools should offer more physical education classes</label>
                </div>
                <div className="flex items-center">
                  <input id="pos2" name="position" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="pos2" className="ml-2 block text-sm text-gray-700">Students should be allowed to use smartphones in class</label>
                </div>
                <div className="flex items-center">
                  <input id="pos3" name="position" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="pos3" className="ml-2 block text-sm text-gray-700">Homework should be limited to 30 minutes per night</label>
                </div>
                <div className="flex items-center">
                  <input id="pos4" name="position" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="pos4" className="ml-2 block text-sm text-gray-700">Your own topic:</label>
                  <input type="text" className="ml-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="Enter your position..." />
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-blue-800 mb-1">Reason 1:</label>
                <textarea
                  rows={2}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Write your first reason supporting your position..."
                ></textarea>
                
                <label className="block text-sm font-medium text-gray-700 mt-2 mb-1">Evidence for Reason 1:</label>
                <textarea
                  rows={2}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Provide facts, statistics, examples, or expert opinions that support this reason..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-green-800 mb-1">Reason 2:</label>
                <textarea
                  rows={2}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Write your second reason supporting your position..."
                ></textarea>
                
                <label className="block text-sm font-medium text-gray-700 mt-2 mb-1">Evidence for Reason 2:</label>
                <textarea
                  rows={2}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Provide facts, statistics, examples, or expert opinions that support this reason..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-purple-800 mb-1">Reason 3:</label>
                <textarea
                  rows={2}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Write your third reason supporting your position..."
                ></textarea>
                
                <label className="block text-sm font-medium text-gray-700 mt-2 mb-1">Evidence for Reason 3:</label>
                <textarea
                  rows={2}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Provide facts, statistics, examples, or expert opinions that support this reason..."
                ></textarea>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save Reasons and Evidence
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-red-50 px-4 py-2">
            <h4 className="font-medium text-red-800">Activity 4: Write a Persuasive Introduction</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Using the position and reasons you developed in Activity 3, write an introduction paragraph for a persuasive essay. Your introduction should include a clear position statement and preview your main reasons.
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Persuasive Introduction:</label>
                <textarea
                  rows={8}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Write your introduction paragraph here..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Self-Assessment:</label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input id="check1" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="check1" className="ml-2 block text-sm text-gray-700">My introduction clearly states my position on the issue.</label>
                  </div>
                  <div className="flex items-center">
                    <input id="check2" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="check2" className="ml-2 block text-sm text-gray-700">My introduction previews my main reasons or arguments.</label>
                  </div>
                  <div className="flex items-center">
                    <input id="check3" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="check3" className="ml-2 block text-sm text-gray-700">My introduction is engaging and captures the reader's attention.</label>
                  </div>
                  <div className="flex items-center">
                    <input id="check4" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="check4" className="ml-2 block text-sm text-gray-700">My introduction uses confident, persuasive language.</label>
                  </div>
                  <div className="flex items-center">
                    <input id="check5" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="check5" className="ml-2 block text-sm text-gray-700">My introduction is concise and focused on the main issue.</label>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Submit Introduction
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
