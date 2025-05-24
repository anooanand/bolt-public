import React from 'react';

export function PracticeTab() {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Practice Task: Create a Paragraph with Varied Sentence Structures</h3>
      
      <div className="bg-indigo-50 p-4 rounded-lg mb-6">
        <p className="text-gray-700">
          Now it's time to apply what you've learned about sentence structures! In this practice task, you'll identify sentence types and then create your own paragraph using all four sentence structures.
        </p>
      </div>
      
      <div className="space-y-6">
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-blue-50 px-4 py-3">
            <h4 className="font-medium text-blue-800">Part 1: Identify Sentence Types</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Read each sentence below and identify whether it is a simple, compound, complex, or compound-complex sentence.
            </p>
            
            <div className="space-y-4">
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">1. The storm raged throughout the night.</p>
                <div className="flex items-center">
                  <label className="block text-sm font-medium text-gray-700 w-32">Sentence type:</label>
                  <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                    <option>Select...</option>
                    <option>Simple</option>
                    <option>Compound</option>
                    <option>Complex</option>
                    <option>Compound-Complex</option>
                  </select>
                </div>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">2. The students studied hard, and they passed their exams with flying colors.</p>
                <div className="flex items-center">
                  <label className="block text-sm font-medium text-gray-700 w-32">Sentence type:</label>
                  <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                    <option>Select...</option>
                    <option>Simple</option>
                    <option>Compound</option>
                    <option>Complex</option>
                    <option>Compound-Complex</option>
                  </select>
                </div>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">3. When the bell rang, the students rushed out of the classroom.</p>
                <div className="flex items-center">
                  <label className="block text-sm font-medium text-gray-700 w-32">Sentence type:</label>
                  <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                    <option>Select...</option>
                    <option>Simple</option>
                    <option>Compound</option>
                    <option>Complex</option>
                    <option>Compound-Complex</option>
                  </select>
                </div>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">4. Although it was raining heavily, the match continued, but some spectators left early.</p>
                <div className="flex items-center">
                  <label className="block text-sm font-medium text-gray-700 w-32">Sentence type:</label>
                  <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                    <option>Select...</option>
                    <option>Simple</option>
                    <option>Compound</option>
                    <option>Complex</option>
                    <option>Compound-Complex</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-green-50 px-4 py-3">
            <h4 className="font-medium text-green-800">Part 2: Transform Sentences</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Rewrite each simple sentence below to transform it into the requested sentence type.
            </p>
            
            <div className="space-y-4">
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Simple sentence: The dog barked.</p>
                <p className="text-sm text-gray-600 mb-1">Transform into a compound sentence:</p>
                <textarea
                  rows={2}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="The dog barked, and..."
                ></textarea>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Simple sentence: The girl smiled.</p>
                <p className="text-sm text-gray-600 mb-1">Transform into a complex sentence:</p>
                <textarea
                  rows={2}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="When..., the girl smiled."
                ></textarea>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Simple sentence: The teacher explained the lesson.</p>
                <p className="text-sm text-gray-600 mb-1">Transform into a compound-complex sentence:</p>
                <textarea
                  rows={2}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="While..., the teacher explained the lesson, and..."
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-purple-50 px-4 py-3">
            <h4 className="font-medium text-purple-800">Part 3: Create a Paragraph</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Write a paragraph about a memorable school event using all four sentence types. Your paragraph should include at least one of each sentence type (simple, compound, complex, and compound-complex).
            </p>
            
            <div className="space-y-4">
              <textarea
                rows={8}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Write your paragraph here..."
              ></textarea>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border p-3 rounded-lg">
                  <p className="text-sm font-medium text-gray-700 mb-2">Identify your sentence types:</p>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <label className="block text-sm text-gray-700 w-40">Simple sentence:</label>
                      <input
                        type="text"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="First few words..."
                      />
                    </div>
                    <div className="flex items-center">
                      <label className="block text-sm text-gray-700 w-40">Compound sentence:</label>
                      <input
                        type="text"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="First few words..."
                      />
                    </div>
                    <div className="flex items-center">
                      <label className="block text-sm text-gray-700 w-40">Complex sentence:</label>
                      <input
                        type="text"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="First few words..."
                      />
                    </div>
                    <div className="flex items-center">
                      <label className="block text-sm text-gray-700 w-40">Compound-complex:</label>
                      <input
                        type="text"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="First few words..."
                      />
                    </div>
                  </div>
                </div>
                
                <div className="border p-3 rounded-lg">
                  <p className="text-sm font-medium text-gray-700 mb-2">Self-assessment:</p>
                  <div className="space-y-2">
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">What was challenging about this task?</label>
                      <textarea
                        rows={2}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      ></textarea>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">How did varying sentence structure improve your writing?</label>
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
