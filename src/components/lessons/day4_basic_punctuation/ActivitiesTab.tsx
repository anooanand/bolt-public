import React from 'react';

export function ActivitiesTab() {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Interactive Activities</h3>
      
      <div className="bg-indigo-50 p-4 rounded-lg mb-6">
        <p className="text-gray-700">
          Complete these interactive activities to reinforce your understanding of basic punctuation. These exercises will help you develop the skills needed to use punctuation effectively in your NSW Selective exam writing.
        </p>
      </div>
      
      <div className="space-y-8">
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-blue-50 px-4 py-2">
            <h4 className="font-medium text-blue-800">Activity 1: Identify the Correct Punctuation</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Select the correctly punctuated sentence in each set.
            </p>
            
            <div className="space-y-6">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Set 1:</p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input id="q1-a" name="q1" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="q1-a" className="ml-2 block text-sm text-gray-700">After the exam, we went to the cafe, ordered lunch and discussed our answers.</label>
                  </div>
                  <div className="flex items-center">
                    <input id="q1-b" name="q1" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="q1-b" className="ml-2 block text-sm text-gray-700">After the exam we went to the cafe ordered lunch and discussed our answers.</label>
                  </div>
                  <div className="flex items-center">
                    <input id="q1-c" name="q1" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="q1-c" className="ml-2 block text-sm text-gray-700">After the exam, we went to the cafe, ordered lunch, and discussed our answers.</label>
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Set 2:</p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input id="q2-a" name="q2" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="q2-a" className="ml-2 block text-sm text-gray-700">"Have you finished your essay" asked the teacher.</label>
                  </div>
                  <div className="flex items-center">
                    <input id="q2-b" name="q2" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="q2-b" className="ml-2 block text-sm text-gray-700">"Have you finished your essay?" asked the teacher.</label>
                  </div>
                  <div className="flex items-center">
                    <input id="q2-c" name="q2" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="q2-c" className="ml-2 block text-sm text-gray-700">"Have you finished your essay"? asked the teacher.</label>
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Set 3:</p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input id="q3-a" name="q3" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="q3-a" className="ml-2 block text-sm text-gray-700">I need the following items for the project: scissors, glue, and colored paper.</label>
                  </div>
                  <div className="flex items-center">
                    <input id="q3-b" name="q3" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="q3-b" className="ml-2 block text-sm text-gray-700">I need the following items for the project; scissors, glue, and colored paper.</label>
                  </div>
                  <div className="flex items-center">
                    <input id="q3-c" name="q3" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="q3-c" className="ml-2 block text-sm text-gray-700">I need the following items for the project, scissors, glue, and colored paper.</label>
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Set 4:</p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input id="q4-a" name="q4" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="q4-a" className="ml-2 block text-sm text-gray-700">The students' projects were displayed in the hall.</label>
                  </div>
                  <div className="flex items-center">
                    <input id="q4-b" name="q4" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="q4-b" className="ml-2 block text-sm text-gray-700">The students projects' were displayed in the hall.</label>
                  </div>
                  <div className="flex items-center">
                    <input id="q4-c" name="q4" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="q4-c" className="ml-2 block text-sm text-gray-700">The students projects were displayed in the hall.</label>
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Set 5:</p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input id="q5-a" name="q5" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="q5-a" className="ml-2 block text-sm text-gray-700">Although it was raining we still went to the excursion.</label>
                  </div>
                  <div className="flex items-center">
                    <input id="q5-b" name="q5" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="q5-b" className="ml-2 block text-sm text-gray-700">Although it was raining, we still went to the excursion.</label>
                  </div>
                  <div className="flex items-center">
                    <input id="q5-c" name="q5" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="q5-c" className="ml-2 block text-sm text-gray-700">Although, it was raining we still went to the excursion.</label>
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
            <h4 className="font-medium text-green-800">Activity 2: Fix the Punctuation Errors</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Each sentence below contains punctuation errors. Rewrite each sentence with correct punctuation.
            </p>
            
            <div className="space-y-6">
              <div>
                <p className="text-gray-700 mb-2">1. The teacher said we need to bring our textbooks notebooks and calculators to class tomorrow</p>
                <textarea
                  rows={2}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Rewrite with correct punctuation..."
                ></textarea>
              </div>
              
              <div>
                <p className="text-gray-700 mb-2">2. Did you know that Sydney Australia is one of the most beautiful cities in the world</p>
                <textarea
                  rows={2}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Rewrite with correct punctuation..."
                ></textarea>
              </div>
              
              <div>
                <p className="text-gray-700 mb-2">3. When I arrived at school I realized I had forgotten my homework assignment at home</p>
                <textarea
                  rows={2}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Rewrite with correct punctuation..."
                ></textarea>
              </div>
              
              <div>
                <p className="text-gray-700 mb-2">4. Wow that was an amazing performance she exclaimed</p>
                <textarea
                  rows={2}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Rewrite with correct punctuation..."
                ></textarea>
              </div>
              
              <div>
                <p className="text-gray-700 mb-2">5. The museum has three sections ancient history modern art and interactive exhibits</p>
                <textarea
                  rows={2}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Rewrite with correct punctuation..."
                ></textarea>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Check Corrections
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-purple-50 px-4 py-2">
            <h4 className="font-medium text-purple-800">Activity 3: Punctuation Changes Meaning</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              See how different punctuation can change the meaning of a sentence. Punctuate each sentence in two different ways to create different meanings.
            </p>
            
            <div className="space-y-6">
              <div>
                <p className="text-gray-700 mb-2">1. the teacher said the student is clever</p>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Meaning 1: (The teacher made a statement about the student)</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Add punctuation to create this meaning..."
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Meaning 2: (Someone is reporting what the teacher said)</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Add punctuation to create this meaning..."
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-gray-700 mb-2">2. stop talking I need to focus</p>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Meaning 1: (Two separate commands)</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Add punctuation to create this meaning..."
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Meaning 2: (Explaining why the person should stop talking)</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Add punctuation to create this meaning..."
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-gray-700 mb-2">3. what are you doing here</p>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Meaning 1: (A casual question)</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Add punctuation to create this meaning..."
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Meaning 2: (An exclamation of surprise)</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Add punctuation to create this meaning..."
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Check Examples
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-red-50 px-4 py-2">
            <h4 className="font-medium text-red-800">Activity 4: Write a Punctuation-Perfect Paragraph</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Write a short paragraph (5-7 sentences) on one of the topics below. Use at least five different punctuation marks correctly.
            </p>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Choose a topic:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="flex items-center">
                  <input id="topic1" name="topic" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="topic1" className="ml-2 block text-sm text-gray-700">My favorite school subject</label>
                </div>
                <div className="flex items-center">
                  <input id="topic2" name="topic" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="topic2" className="ml-2 block text-sm text-gray-700">A memorable school excursion</label>
                </div>
                <div className="flex items-center">
                  <input id="topic3" name="topic" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="topic3" className="ml-2 block text-sm text-gray-700">My preparation for the selective exam</label>
                </div>
                <div className="flex items-center">
                  <input id="topic4" name="topic" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="topic4" className="ml-2 block text-sm text-gray-700">A conversation with a friend</label>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your paragraph:</label>
                <textarea
                  rows={6}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Write your paragraph here, using at least five different punctuation marks correctly..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">List the punctuation marks you used:</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  <div className="flex items-center">
                    <input id="p1" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="p1" className="ml-2 block text-sm text-gray-700">Full stop/Period (.)</label>
                  </div>
                  <div className="flex items-center">
                    <input id="p2" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="p2" className="ml-2 block text-sm text-gray-700">Comma (,)</label>
                  </div>
                  <div className="flex items-center">
                    <input id="p3" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="p3" className="ml-2 block text-sm text-gray-700">Question mark (?)</label>
                  </div>
                  <div className="flex items-center">
                    <input id="p4" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="p4" className="ml-2 block text-sm text-gray-700">Exclamation mark (!)</label>
                  </div>
                  <div className="flex items-center">
                    <input id="p5" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="p5" className="ml-2 block text-sm text-gray-700">Quotation marks (" ")</label>
                  </div>
                  <div className="flex items-center">
                    <input id="p6" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="p6" className="ml-2 block text-sm text-gray-700">Colon (:)</label>
                  </div>
                  <div className="flex items-center">
                    <input id="p7" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="p7" className="ml-2 block text-sm text-gray-700">Semicolon (;)</label>
                  </div>
                  <div className="flex items-center">
                    <input id="p8" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="p8" className="ml-2 block text-sm text-gray-700">Apostrophe (')</label>
                  </div>
                  <div className="flex items-center">
                    <input id="p9" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="p9" className="ml-2 block text-sm text-gray-700">Parentheses ( )</label>
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
