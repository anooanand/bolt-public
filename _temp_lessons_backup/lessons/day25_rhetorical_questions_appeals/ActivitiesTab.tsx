import React from 'react';

export function ActivitiesTab() {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Interactive Activities</h3>
      
      <div className="bg-indigo-50 p-4 rounded-lg mb-6">
        <p className="text-gray-700">
          Complete these interactive activities to practice using rhetorical questions and appeals effectively in persuasive writing for the NSW Selective exam.
        </p>
      </div>
      
      <div className="space-y-8">
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-blue-50 px-4 py-2">
            <h4 className="font-medium text-blue-800">Activity 1: Identify Rhetorical Questions</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Read the following passages and identify the rhetorical questions and their purpose.
            </p>
            
            <div className="space-y-6">
              <div>
                <p className="text-gray-700 mb-2">Passage 1:</p>
                <div className="border p-3 rounded-lg mb-3 bg-gray-50">
                  <p className="text-gray-700">
                    School uniforms have been a topic of debate for decades. <span className="bg-yellow-100 px-1 rounded">Shouldn't students have the right to express their individuality through their clothing?</span> Many argue that uniforms stifle creativity and self-expression. However, consider the benefits: reduced peer pressure, fewer distractions, and a stronger sense of community. <span className="bg-green-100 px-1 rounded">If uniforms can create a more focused learning environment, isn't that what matters most?</span> The evidence clearly shows that schools with uniform policies report fewer disciplinary issues and improved attendance rates.
                  </p>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">What is the purpose of the yellow highlighted rhetorical question?</label>
                    <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                      <option>Select the purpose...</option>
                      <option value="1">To present an opposing viewpoint</option>
                      <option value="2">To emphasize the writer's main argument</option>
                      <option value="3">To transition between paragraphs</option>
                      <option value="4">To provide a definition</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">What is the purpose of the green highlighted rhetorical question?</label>
                    <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                      <option>Select the purpose...</option>
                      <option value="1">To create agreement with the writer's position</option>
                      <option value="2">To express doubt about the topic</option>
                      <option value="3">To introduce a new topic</option>
                      <option value="4">To provide a counterargument</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-gray-700 mb-2">Passage 2:</p>
                <div className="border p-3 rounded-lg mb-3 bg-gray-50">
                  <p className="text-gray-700">
                    The amount of plastic waste in our oceans has reached crisis levels. <span className="bg-yellow-100 px-1 rounded">How would you feel if your favorite beach was covered in plastic bottles and bags?</span> Marine animals are dying by the thousands as they mistake plastic for food. <span className="bg-green-100 px-1 rounded">Can we really continue to ignore this problem while our planet suffocates?</span> It's time for immediate action. We must reduce single-use plastics, improve recycling systems, and clean up our waterways before it's too late.
                  </p>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">What is the purpose of the yellow highlighted rhetorical question?</label>
                    <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                      <option>Select the purpose...</option>
                      <option value="1">To appeal to the reader's emotions (pathos)</option>
                      <option value="2">To establish the writer's credibility (ethos)</option>
                      <option value="3">To present statistical evidence (logos)</option>
                      <option value="4">To introduce a counterargument</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">What is the purpose of the green highlighted rhetorical question?</label>
                    <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                      <option>Select the purpose...</option>
                      <option value="1">To create a sense of urgency</option>
                      <option value="2">To provide a definition</option>
                      <option value="3">To transition to a new topic</option>
                      <option value="4">To express doubt about the evidence</option>
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
            <h4 className="font-medium text-green-800">Activity 2: Identify Rhetorical Appeals</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Read the following statements and identify which rhetorical appeal (ethos, pathos, or logos) is being used.
            </p>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-4">
                <div className="border p-3 rounded-lg bg-gray-50">
                  <p className="text-gray-700 mb-2">1. "According to a recent study by Harvard University, students who eat breakfast perform 20% better on standardized tests than those who skip the morning meal."</p>
                  <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Which appeal is being used?</label>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <input id="appeal1-ethos" name="appeal1" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                        <label htmlFor="appeal1-ethos" className="ml-2 block text-sm text-gray-700">Ethos (Credibility)</label>
                      </div>
                      <div className="flex items-center">
                        <input id="appeal1-pathos" name="appeal1" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                        <label htmlFor="appeal1-pathos" className="ml-2 block text-sm text-gray-700">Pathos (Emotion)</label>
                      </div>
                      <div className="flex items-center">
                        <input id="appeal1-logos" name="appeal1" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                        <label htmlFor="appeal1-logos" className="ml-2 block text-sm text-gray-700">Logos (Logic)</label>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border p-3 rounded-lg bg-gray-50">
                  <p className="text-gray-700 mb-2">2. "Think about the children who go to bed hungry every night, their stomachs aching, unable to focus on their schoolwork the next day because of the gnawing pain of hunger."</p>
                  <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Which appeal is being used?</label>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <input id="appeal2-ethos" name="appeal2" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                        <label htmlFor="appeal2-ethos" className="ml-2 block text-sm text-gray-700">Ethos (Credibility)</label>
                      </div>
                      <div className="flex items-center">
                        <input id="appeal2-pathos" name="appeal2" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                        <label htmlFor="appeal2-pathos" className="ml-2 block text-sm text-gray-700">Pathos (Emotion)</label>
                      </div>
                      <div className="flex items-center">
                        <input id="appeal2-logos" name="appeal2" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                        <label htmlFor="appeal2-logos" className="ml-2 block text-sm text-gray-700">Logos (Logic)</label>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border p-3 rounded-lg bg-gray-50">
                  <p className="text-gray-700 mb-2">3. "As someone who has worked in the education system for over 20 years and holds a PhD in Educational Psychology, I have seen firsthand how these policies affect students."</p>
                  <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Which appeal is being used?</label>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <input id="appeal3-ethos" name="appeal3" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                        <label htmlFor="appeal3-ethos" className="ml-2 block text-sm text-gray-700">Ethos (Credibility)</label>
                      </div>
                      <div className="flex items-center">
                        <input id="appeal3-pathos" name="appeal3" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                        <label htmlFor="appeal3-pathos" className="ml-2 block text-sm text-gray-700">Pathos (Emotion)</label>
                      </div>
                      <div className="flex items-center">
                        <input id="appeal3-logos" name="appeal3" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                        <label htmlFor="appeal3-logos" className="ml-2 block text-sm text-gray-700">Logos (Logic)</label>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border p-3 rounded-lg bg-gray-50">
                  <p className="text-gray-700 mb-2">4. "When we compare the cost of implementing this program ($50,000) to the projected annual savings ($120,000), it becomes clear that this is a financially sound decision that will pay for itself within six months."</p>
                  <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Which appeal is being used?</label>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <input id="appeal4-ethos" name="appeal4" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                        <label htmlFor="appeal4-ethos" className="ml-2 block text-sm text-gray-700">Ethos (Credibility)</label>
                      </div>
                      <div className="flex items-center">
                        <input id="appeal4-pathos" name="appeal4" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                        <label htmlFor="appeal4-pathos" className="ml-2 block text-sm text-gray-700">Pathos (Emotion)</label>
                      </div>
                      <div className="flex items-center">
                        <input id="appeal4-logos" name="appeal4" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                        <label htmlFor="appeal4-logos" className="ml-2 block text-sm text-gray-700">Logos (Logic)</label>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border p-3 rounded-lg bg-gray-50">
                  <p className="text-gray-700 mb-2">5. "Our community values have always centered around caring for one another. Are we really willing to abandon those principles now, when our neighbors need us most?"</p>
                  <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Which appeal is being used?</label>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <input id="appeal5-ethos" name="appeal5" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                        <label htmlFor="appeal5-ethos" className="ml-2 block text-sm text-gray-700">Ethos (Credibility)</label>
                      </div>
                      <div className="flex items-center">
                        <input id="appeal5-pathos" name="appeal5" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                        <label htmlFor="appeal5-pathos" className="ml-2 block text-sm text-gray-700">Pathos (Emotion)</label>
                      </div>
                      <div className="flex items-center">
                        <input id="appeal5-logos" name="appeal5" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                        <label htmlFor="appeal5-logos" className="ml-2 block text-sm text-gray-700">Logos (Logic)</label>
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
            <h4 className="font-medium text-purple-800">Activity 3: Create Rhetorical Questions and Appeals</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Practice creating effective rhetorical questions and appeals for different persuasive topics.
            </p>
            
            <div className="space-y-6">
              <div>
                <p className="text-gray-700 mb-2">Topic 1: <span className="font-medium">Schools should offer more physical education classes</span></p>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Write a rhetorical question that engages the reader:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Write a rhetorical question that draws the reader into your argument..."
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Write an appeal to ethos (credibility):</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Write a statement that establishes credibility or cites a trustworthy source..."
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Write an appeal to pathos (emotion):</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Write a statement that evokes an emotional response..."
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Write an appeal to logos (logic):</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Write a statement that uses reasoning, evidence, or facts..."
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-gray-700 mb-2">Topic 2: <span className="font-medium">Social media has more negative than positive effects on teenagers</span></p>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Write a rhetorical question that emphasizes your point:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Write a rhetorical question that highlights an important aspect of your argument..."
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Write an appeal to ethos (credibility):</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Write a statement that establishes credibility or cites a trustworthy source..."
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Write an appeal to pathos (emotion):</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Write a statement that evokes an emotional response..."
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Write an appeal to logos (logic):</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Write a statement that uses reasoning, evidence, or facts..."
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Submit Examples
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
              Write a persuasive paragraph using rhetorical questions and all three appeals (ethos, pathos, and logos).
            </p>
            
            <div className="space-y-6">
              <div>
                <p className="text-sm text-gray-600 mb-2">Choose a topic for your persuasive paragraph:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                  <div className="flex items-center">
                    <input id="topic1" name="topic" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="topic1" className="ml-2 block text-sm text-gray-700">Homework should be banned</label>
                  </div>
                  <div className="flex items-center">
                    <input id="topic2" name="topic" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="topic2" className="ml-2 block text-sm text-gray-700">Plastic bags should be banned in all stores</label>
                  </div>
                  <div className="flex items-center">
                    <input id="topic3" name="topic" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="topic3" className="ml-2 block text-sm text-gray-700">All students should learn a musical instrument</label>
                  </div>
                  <div className="flex items-center">
                    <input id="topic4" name="topic" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="topic4" className="ml-2 block text-sm text-gray-700">Your own choice:</label>
                    <input type="text" className="ml-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="Enter a topic..." />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Planning your persuasive paragraph:</label>
                  <div className="grid grid-cols-1 gap-3">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Your position on this topic:</label>
                      <input type="text" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="What is your stance on this issue?" />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">One rhetorical question you'll include:</label>
                      <input type="text" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="Write a rhetorical question for your paragraph..." />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">How you'll appeal to ethos (credibility):</label>
                      <textarea
                        rows={2}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="How will you establish credibility in your paragraph?"
                      ></textarea>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">How you'll appeal to pathos (emotion):</label>
                      <textarea
                        rows={2}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="How will you appeal to emotions in your paragraph?"
                      ></textarea>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">How you'll appeal to logos (logic):</label>
                      <textarea
                        rows={2}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="What facts, statistics, or logical reasoning will you include?"
                      ></textarea>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Write your persuasive paragraph:</label>
                  <textarea
                    rows={8}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Write your persuasive paragraph using rhetorical questions and all three appeals..."
                  ></textarea>
                </div>
                
                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Self-Assessment Checklist:</label>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input id="check1" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="check1" className="ml-2 block text-sm text-gray-700">I included at least one effective rhetorical question.</label>
                    </div>
                    <div className="flex items-center">
                      <input id="check2" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="check2" className="ml-2 block text-sm text-gray-700">I included an appeal to ethos (credibility).</label>
                    </div>
                    <div className="flex items-center">
                      <input id="check3" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="check3" className="ml-2 block text-sm text-gray-700">I included an appeal to pathos (emotion).</label>
                    </div>
                    <div className="flex items-center">
                      <input id="check4" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="check4" className="ml-2 block text-sm text-gray-700">I included an appeal to logos (logic).</label>
                    </div>
                    <div className="flex items-center">
                      <input id="check5" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="check5" className="ml-2 block text-sm text-gray-700">My paragraph has a clear persuasive purpose.</label>
                    </div>
                    <div className="flex items-center">
                      <input id="check6" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="check6" className="ml-2 block text-sm text-gray-700">I used appropriate language and tone for my audience.</label>
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
