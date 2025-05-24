import React from 'react';

export function ActivitiesTab() {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Interactive Activities</h3>
      
      <div className="bg-indigo-50 p-4 rounded-lg mb-6">
        <p className="text-gray-700">
          Complete these interactive activities to reinforce your understanding of sentence structures. These exercises will help you develop the skills needed to create varied and effective sentences in your NSW Selective exam writing.
        </p>
      </div>
      
      <div className="space-y-8">
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-blue-50 px-4 py-2">
            <h4 className="font-medium text-blue-800">Activity 1: Identify the Sentence Type</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Read each sentence and identify whether it is simple, compound, complex, or compound-complex.
            </p>
            
            <div className="space-y-4">
              <div className="border p-3 rounded-lg">
                <p className="text-gray-700 mb-2">1. The storm raged throughout the night.</p>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <input id="q1-simple" name="q1" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="q1-simple" className="ml-2 block text-sm text-gray-700">Simple</label>
                  </div>
                  <div className="flex items-center">
                    <input id="q1-compound" name="q1" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="q1-compound" className="ml-2 block text-sm text-gray-700">Compound</label>
                  </div>
                  <div className="flex items-center">
                    <input id="q1-complex" name="q1" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="q1-complex" className="ml-2 block text-sm text-gray-700">Complex</label>
                  </div>
                  <div className="flex items-center">
                    <input id="q1-compound-complex" name="q1" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="q1-compound-complex" className="ml-2 block text-sm text-gray-700">Compound-Complex</label>
                  </div>
                </div>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-700 mb-2">2. The storm raged throughout the night, and many trees fell.</p>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <input id="q2-simple" name="q2" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="q2-simple" className="ml-2 block text-sm text-gray-700">Simple</label>
                  </div>
                  <div className="flex items-center">
                    <input id="q2-compound" name="q2" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="q2-compound" className="ml-2 block text-sm text-gray-700">Compound</label>
                  </div>
                  <div className="flex items-center">
                    <input id="q2-complex" name="q2" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="q2-complex" className="ml-2 block text-sm text-gray-700">Complex</label>
                  </div>
                  <div className="flex items-center">
                    <input id="q2-compound-complex" name="q2" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="q2-compound-complex" className="ml-2 block text-sm text-gray-700">Compound-Complex</label>
                  </div>
                </div>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-700 mb-2">3. When the storm finally passed, the neighborhood was quiet.</p>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <input id="q3-simple" name="q3" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="q3-simple" className="ml-2 block text-sm text-gray-700">Simple</label>
                  </div>
                  <div className="flex items-center">
                    <input id="q3-compound" name="q3" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="q3-compound" className="ml-2 block text-sm text-gray-700">Compound</label>
                  </div>
                  <div className="flex items-center">
                    <input id="q3-complex" name="q3" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="q3-complex" className="ml-2 block text-sm text-gray-700">Complex</label>
                  </div>
                  <div className="flex items-center">
                    <input id="q3-compound-complex" name="q3" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="q3-compound-complex" className="ml-2 block text-sm text-gray-700">Compound-Complex</label>
                  </div>
                </div>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-700 mb-2">4. When the storm finally passed, the neighborhood was quiet, but the damage was extensive.</p>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <input id="q4-simple" name="q4" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="q4-simple" className="ml-2 block text-sm text-gray-700">Simple</label>
                  </div>
                  <div className="flex items-center">
                    <input id="q4-compound" name="q4" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="q4-compound" className="ml-2 block text-sm text-gray-700">Compound</label>
                  </div>
                  <div className="flex items-center">
                    <input id="q4-complex" name="q4" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="q4-complex" className="ml-2 block text-sm text-gray-700">Complex</label>
                  </div>
                  <div className="flex items-center">
                    <input id="q4-compound-complex" name="q4" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="q4-compound-complex" className="ml-2 block text-sm text-gray-700">Compound-Complex</label>
                  </div>
                </div>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-700 mb-2">5. The emergency services worked tirelessly throughout the night to clear the roads and restore power.</p>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <input id="q5-simple" name="q5" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="q5-simple" className="ml-2 block text-sm text-gray-700">Simple</label>
                  </div>
                  <div className="flex items-center">
                    <input id="q5-compound" name="q5" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="q5-compound" className="ml-2 block text-sm text-gray-700">Compound</label>
                  </div>
                  <div className="flex items-center">
                    <input id="q5-complex" name="q5" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="q5-complex" className="ml-2 block text-sm text-gray-700">Complex</label>
                  </div>
                  <div className="flex items-center">
                    <input id="q5-compound-complex" name="q5" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="q5-compound-complex" className="ml-2 block text-sm text-gray-700">Compound-Complex</label>
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
            <h4 className="font-medium text-green-800">Activity 2: Sentence Transformation</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Transform each simple sentence into the requested sentence type.
            </p>
            
            <div className="space-y-6">
              <div>
                <p className="text-gray-700 mb-2">1. Simple sentence: <span className="font-medium">The student completed the assignment.</span></p>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Transform into a compound sentence:</label>
                  <textarea
                    rows={2}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Write your compound sentence here..."
                  ></textarea>
                </div>
              </div>
              
              <div>
                <p className="text-gray-700 mb-2">2. Simple sentence: <span className="font-medium">The teacher graded the papers.</span></p>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Transform into a complex sentence:</label>
                  <textarea
                    rows={2}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Write your complex sentence here..."
                  ></textarea>
                </div>
              </div>
              
              <div>
                <p className="text-gray-700 mb-2">3. Simple sentence: <span className="font-medium">The bell rang.</span></p>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Transform into a compound-complex sentence:</label>
                  <textarea
                    rows={2}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Write your compound-complex sentence here..."
                  ></textarea>
                </div>
              </div>
              
              <div>
                <p className="text-gray-700 mb-2">4. Compound sentence: <span className="font-medium">The sun was shining, and the birds were singing.</span></p>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Transform into a complex sentence:</label>
                  <textarea
                    rows={2}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Write your complex sentence here..."
                  ></textarea>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Submit Transformations
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-purple-50 px-4 py-2">
            <h4 className="font-medium text-purple-800">Activity 3: Sentence Variety Analysis</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Read the following paragraph and analyze the sentence variety. Identify each sentence type and discuss the effect of the variety.
            </p>
            
            <div className="border p-3 rounded-lg mb-4 bg-gray-50">
              <p className="text-gray-700">
                The morning sun cast long shadows across the field. Birds chirped merrily in the trees, and a gentle breeze rustled the leaves. When Sarah arrived at the park, she noticed the beautiful flowers that had just begun to bloom. The playground was empty, but the swings moved slightly in the wind. Although she had planned to meet her friends at noon, Sarah decided to enjoy the solitude for a while, and she sat on a bench to read her book.
              </p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Identify each sentence by type:</label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600 w-64">"The morning sun cast long shadows across the field."</span>
                    <select className="mt-1 block w-full pl-3 pr-10 py-1 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                      <option>Select type...</option>
                      <option>Simple</option>
                      <option>Compound</option>
                      <option>Complex</option>
                      <option>Compound-Complex</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600 w-64">"Birds chirped merrily in the trees, and a gentle breeze rustled the leaves."</span>
                    <select className="mt-1 block w-full pl-3 pr-10 py-1 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                      <option>Select type...</option>
                      <option>Simple</option>
                      <option>Compound</option>
                      <option>Complex</option>
                      <option>Compound-Complex</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600 w-64">"When Sarah arrived at the park, she noticed the beautiful flowers that had just begun to bloom."</span>
                    <select className="mt-1 block w-full pl-3 pr-10 py-1 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                      <option>Select type...</option>
                      <option>Simple</option>
                      <option>Compound</option>
                      <option>Complex</option>
                      <option>Compound-Complex</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600 w-64">"The playground was empty, but the swings moved slightly in the wind."</span>
                    <select className="mt-1 block w-full pl-3 pr-10 py-1 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                      <option>Select type...</option>
                      <option>Simple</option>
                      <option>Compound</option>
                      <option>Complex</option>
                      <option>Compound-Complex</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600 w-64">"Although she had planned to meet her friends at noon, Sarah decided to enjoy the solitude for a while, and she sat on a bench to read her book."</span>
                    <select className="mt-1 block w-full pl-3 pr-10 py-1 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                      <option>Select type...</option>
                      <option>Simple</option>
                      <option>Compound</option>
                      <option>Complex</option>
                      <option>Compound-Complex</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Discuss the effect of sentence variety in this paragraph:</label>
                <textarea
                  rows={4}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Explain how the variety of sentence structures affects the flow and impact of the paragraph..."
                ></textarea>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Submit Analysis
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-red-50 px-4 py-2">
            <h4 className="font-medium text-red-800">Activity 4: Create a Balanced Paragraph</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Write a paragraph about one of the topics below, using at least one of each sentence type (simple, compound, complex, and compound-complex). Then identify each sentence type in your paragraph.
            </p>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Choose a topic:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="flex items-center">
                  <input id="topic1" name="topic" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="topic1" className="ml-2 block text-sm text-gray-700">A memorable school event</label>
                </div>
                <div className="flex items-center">
                  <input id="topic2" name="topic" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="topic2" className="ml-2 block text-sm text-gray-700">Your favorite hobby</label>
                </div>
                <div className="flex items-center">
                  <input id="topic3" name="topic" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="topic3" className="ml-2 block text-sm text-gray-700">A place you'd like to visit</label>
                </div>
                <div className="flex items-center">
                  <input id="topic4" name="topic" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="topic4" className="ml-2 block text-sm text-gray-700">An important life lesson</label>
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Your paragraph:</label>
              <textarea
                rows={6}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Write your paragraph here, using all four sentence types..."
              ></textarea>
            </div>
            
            <div className="space-y-3 mb-4">
              <p className="text-sm font-medium text-gray-700">Now identify each sentence in your paragraph:</p>
              
              <div>
                <label className="block text-sm text-gray-600 mb-1">Sentence 1:</label>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <input id="s1-simple" name="s1" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="s1-simple" className="ml-2 block text-sm text-gray-700">Simple</label>
                  </div>
                  <div className="flex items-center">
                    <input id="s1-compound" name="s1" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="s1-compound" className="ml-2 block text-sm text-gray-700">Compound</label>
                  </div>
                  <div className="flex items-center">
                    <input id="s1-complex" name="s1" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="s1-complex" className="ml-2 block text-sm text-gray-700">Complex</label>
                  </div>
                  <div className="flex items-center">
                    <input id="s1-compound-complex" name="s1" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="s1-compound-complex" className="ml-2 block text-sm text-gray-700">Compound-Complex</label>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm text-gray-600 mb-1">Sentence 2:</label>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <input id="s2-simple" name="s2" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="s2-simple" className="ml-2 block text-sm text-gray-700">Simple</label>
                  </div>
                  <div className="flex items-center">
                    <input id="s2-compound" name="s2" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="s2-compound" className="ml-2 block text-sm text-gray-700">Compound</label>
                  </div>
                  <div className="flex items-center">
                    <input id="s2-complex" name="s2" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="s2-complex" className="ml-2 block text-sm text-gray-700">Complex</label>
                  </div>
                  <div className="flex items-center">
                    <input id="s2-compound-complex" name="s2" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="s2-compound-complex" className="ml-2 block text-sm text-gray-700">Compound-Complex</label>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm text-gray-600 mb-1">Sentence 3:</label>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <input id="s3-simple" name="s3" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="s3-simple" className="ml-2 block text-sm text-gray-700">Simple</label>
                  </div>
                  <div className="flex items-center">
                    <input id="s3-compound" name="s3" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="s3-compound" className="ml-2 block text-sm text-gray-700">Compound</label>
                  </div>
                  <div className="flex items-center">
                    <input id="s3-complex" name="s3" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="s3-complex" className="ml-2 block text-sm text-gray-700">Complex</label>
                  </div>
                  <div className="flex items-center">
                    <input id="s3-compound-complex" name="s3" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="s3-compound-complex" className="ml-2 block text-sm text-gray-700">Compound-Complex</label>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm text-gray-600 mb-1">Sentence 4:</label>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <input id="s4-simple" name="s4" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="s4-simple" className="ml-2 block text-sm text-gray-700">Simple</label>
                  </div>
                  <div className="flex items-center">
                    <input id="s4-compound" name="s4" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="s4-compound" className="ml-2 block text-sm text-gray-700">Compound</label>
                  </div>
                  <div className="flex items-center">
                    <input id="s4-complex" name="s4" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="s4-complex" className="ml-2 block text-sm text-gray-700">Complex</label>
                  </div>
                  <div className="flex items-center">
                    <input id="s4-compound-complex" name="s4" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="s4-compound-complex" className="ml-2 block text-sm text-gray-700">Compound-Complex</label>
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
  );
}
