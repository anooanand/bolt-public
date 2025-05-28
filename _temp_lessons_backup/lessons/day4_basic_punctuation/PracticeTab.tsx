import React from 'react';

export function PracticeTab() {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Practice Task: Mastering Basic Punctuation</h3>
      
      <div className="bg-indigo-50 p-4 rounded-lg mb-6">
        <p className="text-gray-700">
          Now it's time to apply what you've learned about punctuation! In this practice task, you'll identify and correct punctuation errors, explore how punctuation changes meaning, and write a paragraph with correct punctuation.
        </p>
      </div>
      
      <div className="space-y-6">
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-blue-50 px-4 py-3">
            <h4 className="font-medium text-blue-800">Part 1: Identify and Correct Punctuation Errors</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Each sentence below contains one or more punctuation errors. Identify the errors and rewrite the sentences correctly.
            </p>
            
            <div className="space-y-4">
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">1. After the long journey we were tired hungry and ready for bed</p>
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">What punctuation error(s) do you see?</label>
                    <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                      <option>Select...</option>
                      <option>Missing comma after introductory phrase</option>
                      <option>Missing commas in a list</option>
                      <option>Missing period at the end</option>
                      <option>All of the above</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Corrected sentence:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Rewrite the sentence with correct punctuation..."
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">2. "Where are you going" asked Tom "I need your help with this project"</p>
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">What punctuation error(s) do you see?</label>
                    <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                      <option>Select...</option>
                      <option>Missing question mark</option>
                      <option>Missing comma after dialogue tag</option>
                      <option>Missing period at the end</option>
                      <option>All of the above</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Corrected sentence:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Rewrite the sentence with correct punctuation..."
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">3. The students brought the following items pencils notebooks calculators and rulers.</p>
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">What punctuation error(s) do you see?</label>
                    <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                      <option>Select...</option>
                      <option>Missing colon before the list</option>
                      <option>Missing commas in the list</option>
                      <option>Both of the above</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Corrected sentence:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Rewrite the sentence with correct punctuation..."
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-green-50 px-4 py-3">
            <h4 className="font-medium text-green-800">Part 2: How Punctuation Changes Meaning</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              See how different punctuation can completely change the meaning of a sentence. For each example, explain the difference in meaning.
            </p>
            
            <div className="space-y-4">
              <div className="border p-3 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                  <p className="text-gray-800">A. Let's eat, Grandma!</p>
                  <p className="text-gray-800">B. Let's eat Grandma!</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Explain the difference in meaning:</label>
                  <textarea
                    rows={2}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="How does the comma change the meaning?"
                  ></textarea>
                </div>
              </div>
              
              <div className="border p-3 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                  <p className="text-gray-800">A. The students who completed their homework passed the test.</p>
                  <p className="text-gray-800">B. The students, who completed their homework, passed the test.</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Explain the difference in meaning:</label>
                  <textarea
                    rows={2}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="How do the commas change the meaning?"
                  ></textarea>
                </div>
              </div>
              
              <div className="border p-3 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                  <p className="text-gray-800">A. Stop! No littering allowed.</p>
                  <p className="text-gray-800">B. Stop. No littering allowed.</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Explain the difference in meaning or tone:</label>
                  <textarea
                    rows={2}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="How does the exclamation mark vs. period change the tone?"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-purple-50 px-4 py-3">
            <h4 className="font-medium text-purple-800">Part 3: Write a Paragraph with Correct Punctuation</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Write a paragraph (5-7 sentences) about a memorable school event or experience. Your paragraph should include:
            </p>
            
            <div className="bg-gray-50 p-3 rounded-lg mb-4">
              <ul className="list-disc pl-5 text-gray-700">
                <li>At least one comma in a list</li>
                <li>At least one comma after an introductory phrase</li>
                <li>At least one set of quotation marks (direct speech)</li>
                <li>A question mark</li>
                <li>A colon or exclamation mark</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your paragraph:</label>
                <textarea
                  rows={8}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Write your paragraph here..."
                ></textarea>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-sm font-medium text-gray-700 mb-2">Identify the punctuation you used:</p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                    <label className="ml-2 block text-sm text-gray-700">Comma in a list</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                    <label className="ml-2 block text-sm text-gray-700">Comma after an introductory phrase</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                    <label className="ml-2 block text-sm text-gray-700">Quotation marks (direct speech)</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                    <label className="ml-2 block text-sm text-gray-700">Question mark</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                    <label className="ml-2 block text-sm text-gray-700">Colon or exclamation mark</label>
                  </div>
                </div>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-sm font-medium text-gray-700 mb-2">Self-assessment:</p>
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">How confident are you with your punctuation usage?</label>
                    <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                      <option>Select...</option>
                      <option>Very confident - I understand all the rules</option>
                      <option>Somewhat confident - I understand most rules</option>
                      <option>Neutral - I'm still learning</option>
                      <option>Not very confident - I need more practice</option>
                      <option>Not at all confident - I find punctuation confusing</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Which punctuation mark do you find most challenging to use correctly?</label>
                    <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                      <option>Select...</option>
                      <option>Commas</option>
                      <option>Semicolons</option>
                      <option>Colons</option>
                      <option>Quotation marks</option>
                      <option>Apostrophes</option>
                      <option>Other (specify in comments)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Additional comments:</label>
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
