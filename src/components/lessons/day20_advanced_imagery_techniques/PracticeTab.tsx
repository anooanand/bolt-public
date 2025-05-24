import React from 'react';

export function PracticeTab() {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Practice: Advanced Imagery Techniques</h3>
      
      <div className="bg-indigo-50 p-4 rounded-lg mb-6">
        <p className="text-gray-700">
          Now it's time to practice using advanced imagery techniques in your writing. Complete the exercises below to strengthen your ability to create powerful, memorable imagery that will impress NSW Selective exam markers.
        </p>
      </div>
      
      <div className="space-y-8">
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-blue-50 px-4 py-2">
            <h4 className="font-medium text-blue-800">Exercise 1: Identify Advanced Imagery</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Read the following passages and identify which advanced imagery technique is being used in each example.
            </p>
            
            <div className="space-y-4">
              <div className="border p-3 rounded-lg">
                <p className="italic text-gray-700 mb-2">
                  "The old man's memories were a dusty attic, filled with cobwebbed trunks of regret and faded photographs of joy. Each day, he climbed the creaking stairs of his mind to sort through these relics, hoping to organize the clutter before his time ran out."
                </p>
                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Identify the technique:</label>
                  <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                    <option>Select...</option>
                    <option>Juxtaposition</option>
                    <option>Synesthesia</option>
                    <option>Extended Metaphor</option>
                    <option>Symbolism</option>
                    <option>Motif</option>
                  </select>
                </div>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="italic text-gray-700 mb-2">
                  "The pianist's melody painted azure waves across the concert hall, washing over the audience in cool, rippling currents."
                </p>
                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Identify the technique:</label>
                  <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                    <option>Select...</option>
                    <option>Juxtaposition</option>
                    <option>Synesthesia</option>
                    <option>Extended Metaphor</option>
                    <option>Symbolism</option>
                    <option>Motif</option>
                  </select>
                </div>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="italic text-gray-700 mb-2">
                  "The delicate porcelain doll sat on the shelf beside the worn leather football. Her painted smile contrasted with the ball's scuffed surface, her pristine dress with its muddy stitching."
                </p>
                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Identify the technique:</label>
                  <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                    <option>Select...</option>
                    <option>Juxtaposition</option>
                    <option>Synesthesia</option>
                    <option>Extended Metaphor</option>
                    <option>Symbolism</option>
                    <option>Motif</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-green-50 px-4 py-2">
            <h4 className="font-medium text-green-800">Exercise 2: Create Synesthesia</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Synesthesia is a powerful technique that mixes sensory experiences. Complete the sentences below by describing one sense in terms of another.
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">1. The thunder's sound...</label>
                <textarea
                  rows={2}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Describe the sound in terms of another sense (touch, taste, sight, smell)"
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">2. The scent of fresh bread...</label>
                <textarea
                  rows={2}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Describe the smell in terms of another sense (sound, touch, taste, sight)"
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">3. The sunset colors...</label>
                <textarea
                  rows={2}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Describe the sight in terms of another sense (sound, touch, taste, smell)"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-purple-50 px-4 py-2">
            <h4 className="font-medium text-purple-800">Exercise 3: Develop an Extended Metaphor</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Choose one of the metaphor starters below and develop it into an extended metaphor paragraph (5-7 sentences) that maintains the comparison throughout.
            </p>
            
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <input id="metaphor1" name="metaphor" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                <label htmlFor="metaphor1" className="ml-2 block text-sm text-gray-700">Life is a journey</label>
              </div>
              <div className="flex items-center mb-2">
                <input id="metaphor2" name="metaphor" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                <label htmlFor="metaphor2" className="ml-2 block text-sm text-gray-700">The classroom is a beehive</label>
              </div>
              <div className="flex items-center mb-2">
                <input id="metaphor3" name="metaphor" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                <label htmlFor="metaphor3" className="ml-2 block text-sm text-gray-700">Emotions are weather</label>
              </div>
              <div className="flex items-center">
                <input id="metaphor4" name="metaphor" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                <label htmlFor="metaphor4" className="ml-2 block text-sm text-gray-700">The internet is an ocean</label>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Extended Metaphor:</label>
              <textarea
                rows={6}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Write your extended metaphor paragraph here..."
              ></textarea>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-red-50 px-4 py-2">
            <h4 className="font-medium text-red-800">Exercise 4: Create a Symbolic Scene</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Write a short scene (100-150 words) that includes at least one symbol representing an abstract concept. After writing, explain what your symbol represents.
            </p>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Choose an abstract concept to symbolize:</p>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center">
                  <input id="concept1" name="concept" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="concept1" className="ml-2 block text-sm text-gray-700">Freedom</label>
                </div>
                <div className="flex items-center">
                  <input id="concept2" name="concept" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="concept2" className="ml-2 block text-sm text-gray-700">Hope</label>
                </div>
                <div className="flex items-center">
                  <input id="concept3" name="concept" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="concept3" className="ml-2 block text-sm text-gray-700">Fear</label>
                </div>
                <div className="flex items-center">
                  <input id="concept4" name="concept" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="concept4" className="ml-2 block text-sm text-gray-700">Transformation</label>
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Symbolic Scene:</label>
              <textarea
                rows={6}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Write your scene here..."
              ></textarea>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Explanation of Symbolism:</label>
              <textarea
                rows={3}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Explain what your symbol represents and how it connects to the abstract concept..."
              ></textarea>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-yellow-50 px-4 py-2">
            <h4 className="font-medium text-yellow-800">Exercise 5: Final Challenge - Combined Techniques</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Write a descriptive paragraph (150-200 words) about one of the topics below, using at least three different advanced imagery techniques. Label each technique you use.
            </p>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Choose a topic:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="flex items-center">
                  <input id="topic1" name="topic" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="topic1" className="ml-2 block text-sm text-gray-700">A moment of triumph or defeat</label>
                </div>
                <div className="flex items-center">
                  <input id="topic2" name="topic" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="topic2" className="ml-2 block text-sm text-gray-700">A significant place from your childhood</label>
                </div>
                <div className="flex items-center">
                  <input id="topic3" name="topic" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="topic3" className="ml-2 block text-sm text-gray-700">A powerful natural event (storm, sunrise, etc.)</label>
                </div>
                <div className="flex items-center">
                  <input id="topic4" name="topic" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="topic4" className="ml-2 block text-sm text-gray-700">A moment of significant change</label>
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Descriptive Paragraph:</label>
              <textarea
                rows={8}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Write your paragraph here..."
              ></textarea>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Identify Your Techniques:</label>
              <textarea
                rows={4}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="List the advanced imagery techniques you used and provide a brief explanation of each..."
              ></textarea>
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
