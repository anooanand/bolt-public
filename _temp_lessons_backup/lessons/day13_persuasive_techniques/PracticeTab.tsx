import React from 'react';

export function PracticeTab() {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Practice Task: Persuasive Techniques</h3>
      
      <div className="bg-indigo-50 p-4 rounded-lg mb-6">
        <p className="text-gray-700">
          Now it's time to apply what you've learned about persuasive techniques! In this practice task, you'll identify persuasive techniques in example texts, practice using different techniques for a given topic, and write a persuasive paragraph incorporating multiple techniques.
        </p>
      </div>
      
      <div className="space-y-6">
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-blue-50 px-4 py-3">
            <h4 className="font-medium text-blue-800">Part 1: Identify Persuasive Techniques</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Read the following excerpts from persuasive texts and identify the persuasive techniques used in each.
            </p>
            
            <div className="space-y-4">
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Excerpt 1:</p>
                <div className="bg-gray-50 p-3 rounded mb-3">
                  <p className="text-gray-800 italic">
                    "Every single day, another 137 species become extinct due to deforestation. These magnificent creatures, once thriving in their natural habitats, are now gone forever, their unique beauty and potential contributions to medicine and science lost for all time. The heartbreaking reality is that we are destroying our planet's precious biodiversity at an alarming rate."
                  </p>
                </div>
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm text-gray-700">What persuasive technique is primarily used in this excerpt?</label>
                    <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                      <option>Select...</option>
                      <option>Emotive Language</option>
                      <option>Facts & Statistics</option>
                      <option>Rhetorical Questions</option>
                      <option>Expert Opinion</option>
                      <option>Personal Anecdotes</option>
                      <option>Repetition</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700">Identify specific words or phrases that demonstrate this technique:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700">What secondary technique is also used?</label>
                    <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                      <option>Select...</option>
                      <option>Emotive Language</option>
                      <option>Facts & Statistics</option>
                      <option>Rhetorical Questions</option>
                      <option>Expert Opinion</option>
                      <option>Personal Anecdotes</option>
                      <option>Repetition</option>
                      <option>None</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Excerpt 2:</p>
                <div className="bg-gray-50 p-3 rounded mb-3">
                  <p className="text-gray-800 italic">
                    "Do we really want to live in a world where children can't play outside because of air pollution? Is this the legacy we want to leave for future generations? How can we justify our inaction when the solutions are within our reach?"
                  </p>
                </div>
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm text-gray-700">What persuasive technique is primarily used in this excerpt?</label>
                    <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                      <option>Select...</option>
                      <option>Emotive Language</option>
                      <option>Facts & Statistics</option>
                      <option>Rhetorical Questions</option>
                      <option>Expert Opinion</option>
                      <option>Personal Anecdotes</option>
                      <option>Repetition</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700">How does this technique affect the reader?</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Excerpt 3:</p>
                <div className="bg-gray-50 p-3 rounded mb-3">
                  <p className="text-gray-800 italic">
                    "According to Professor James Chen, Director of the Climate Research Institute, 'We have less than a decade to make significant changes to our energy systems before we reach a point of no return.' His research, published in the prestigious Science Journal, demonstrates that carbon emissions must be reduced by 45% by 2030 to prevent catastrophic climate change."
                  </p>
                </div>
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm text-gray-700">What persuasive technique is primarily used in this excerpt?</label>
                    <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                      <option>Select...</option>
                      <option>Emotive Language</option>
                      <option>Facts & Statistics</option>
                      <option>Rhetorical Questions</option>
                      <option>Expert Opinion</option>
                      <option>Personal Anecdotes</option>
                      <option>Repetition</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700">Why is this technique effective in this context?</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Excerpt 4:</p>
                <div className="bg-gray-50 p-3 rounded mb-3">
                  <p className="text-gray-800 italic">
                    "Last year, I witnessed the impact of plastic pollution firsthand while visiting my grandparents' coastal village. The beach where I had played as a child was now littered with plastic bottles, wrappers, and microplastics. An elderly fisherman told me he now catches more plastic than fish. This is not just an environmental issue—it's personal for communities whose livelihoods depend on clean oceans."
                  </p>
                </div>
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm text-gray-700">What persuasive technique is primarily used in this excerpt?</label>
                    <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                      <option>Select...</option>
                      <option>Emotive Language</option>
                      <option>Facts & Statistics</option>
                      <option>Rhetorical Questions</option>
                      <option>Expert Opinion</option>
                      <option>Personal Anecdotes</option>
                      <option>Repetition</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700">How does this technique create an emotional connection with readers?</label>
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
            <h4 className="font-medium text-green-800">Part 2: Practice Using Different Persuasive Techniques</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              For the topic "Schools should provide free healthy lunches to all students," write one sentence using each of the following persuasive techniques.
            </p>
            
            <div className="space-y-4">
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Emotive Language:</p>
                <textarea
                  rows={2}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Write a sentence using words that evoke strong emotions..."
                ></textarea>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Facts & Statistics:</p>
                <textarea
                  rows={2}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Write a sentence using numerical data or factual information..."
                ></textarea>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Rhetorical Question:</p>
                <textarea
                  rows={2}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Write a question that makes readers think about the issue..."
                ></textarea>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Expert Opinion:</p>
                <textarea
                  rows={2}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Write a sentence citing an authority or specialist..."
                ></textarea>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Personal Anecdote:</p>
                <textarea
                  rows={2}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Write a sentence with a brief, relevant story..."
                ></textarea>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Repetition:</p>
                <textarea
                  rows={2}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Write a sentence repeating key words or phrases for emphasis..."
                ></textarea>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Reflection:</p>
                <div>
                  <label className="block text-sm text-gray-700">Which technique do you think would be most effective for this topic and why?</label>
                  <textarea
                    rows={3}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-purple-50 px-4 py-3">
            <h4 className="font-medium text-purple-800">Part 3: Write a Persuasive Paragraph</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Choose one of the following topics and write a persuasive paragraph (150-200 words) incorporating at least three different persuasive techniques.
            </p>
            
            <div className="bg-gray-50 p-3 rounded-lg mb-4">
              <ul className="list-disc pl-5 text-gray-700">
                <li>Social media has more negative than positive effects on teenagers</li>
                <li>All students should be required to learn a second language</li>
                <li>Zoos are necessary for conservation efforts</li>
                <li>Standardized testing is not an effective measure of student ability</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Selected Topic:</label>
                <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option>Select a topic...</option>
                  <option>Social media has more negative than positive effects on teenagers</option>
                  <option>All students should be required to learn a second language</option>
                  <option>Zoos are necessary for conservation efforts</option>
                  <option>Standardized testing is not an effective measure of student ability</option>
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
                <p className="text-gray-800 mb-2">Planning:</p>
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm text-gray-700">Persuasive techniques I will use (select at least three):</label>
                    <div className="mt-1 space-y-1">
                      <div className="flex items-center">
                        <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                        <label className="ml-2 block text-sm text-gray-700">Emotive Language</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                        <label className="ml-2 block text-sm text-gray-700">Facts & Statistics</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                        <label className="ml-2 block text-sm text-gray-700">Rhetorical Questions</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                        <label className="ml-2 block text-sm text-gray-700">Expert Opinion</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                        <label className="ml-2 block text-sm text-gray-700">Personal Anecdotes</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                        <label className="ml-2 block text-sm text-gray-700">Repetition</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Persuasive Paragraph:</label>
                <textarea
                  rows={8}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Write your persuasive paragraph here, incorporating at least three different persuasive techniques..."
                ></textarea>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-sm font-medium text-gray-700 mb-2">Self-assessment:</p>
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm text-gray-700">Identify where you used each persuasive technique in your paragraph:</label>
                    <textarea
                      rows={4}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Example: Emotive Language - 'devastating impact' in sentence 2..."
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700">How do these techniques work together to strengthen your argument?</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700">What other technique could you add to make your paragraph even more persuasive?</label>
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
