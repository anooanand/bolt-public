import React from 'react';

export function PracticeTab() {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Practice Task: Evaluate a Sample Essay</h3>
      
      <div className="bg-indigo-50 p-4 rounded-lg mb-6">
        <p className="text-gray-700">
          Now it's your turn to apply what you've learned! Read the sample essay below and evaluate it using the four assessment criteria. This will help you understand how to identify strengths and weaknesses in writing.
        </p>
      </div>
      
      <div className="border p-4 rounded-lg mb-6">
        <h4 className="font-medium text-gray-900 mb-2">Sample Essay Prompt:</h4>
        <p className="italic text-gray-700 mb-4">
          Write a persuasive text explaining why your school should implement a new program or policy of your choice.
        </p>
        
        <h4 className="font-medium text-gray-900 mb-2">Sample Essay:</h4>
        <div className="prose max-w-none text-gray-700">
          <p className="font-bold text-center mb-2">Why Our School Needs a Community Garden</p>
          
          <p>
            I believe that our school should create a community garden in the unused space behind the science building. This would benefit our school in many ways and teach students important skills.
          </p>
          
          <p>
            First, a community garden would provide fresh vegetables for our school cafeteria. The food would be healthier than what we currently eat. Students would enjoy eating vegetables they grew themselves. This would save the school money on food costs.
          </p>
          
          <p>
            Second, a garden would help students learn about science and nature. We would see plants grow from seeds and learn about the environment. Teachers could use the garden for science lessons about plants, insects, and ecosystems. This would make learning more fun and interesting.
          </p>
          
          <p>
            Third, working in the garden would teach responsibility. Students would need to water plants and pull weeds regularly. They would learn that hard work leads to good results when the vegetables are ready to harvest.
          </p>
          
          <p>
            Some people might say that a garden would cost too much money to start. However, we could apply for grants from environmental organizations. Parents and local businesses might donate supplies. The money saved on cafeteria food would help pay for the garden over time.
          </p>
          
          <p>
            In conclusion, a community garden would provide healthy food, enhance learning, and teach responsibility. I strongly urge our school to implement this beneficial program.
          </p>
        </div>
      </div>
      
      <div className="space-y-6">
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Your Evaluation:</h4>
          <p className="text-sm text-gray-600 mb-4">
            Rate the essay on each criterion from 1-10 and provide brief comments on strengths and areas for improvement.
          </p>
          
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h5 className="font-medium text-blue-800 mb-2">Ideas & Content (30%)</h5>
              <div className="flex items-center mb-2">
                <label className="block text-sm font-medium text-gray-700 w-20">Rating:</label>
                <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option>Select...</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Comments:</label>
                <textarea
                  rows={3}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="What are the strengths and weaknesses of the ideas and content?"
                ></textarea>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <h5 className="font-medium text-green-800 mb-2">Structure & Organization (25%)</h5>
              <div className="flex items-center mb-2">
                <label className="block text-sm font-medium text-gray-700 w-20">Rating:</label>
                <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option>Select...</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Comments:</label>
                <textarea
                  rows={3}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="How well is the essay structured and organized?"
                ></textarea>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <h5 className="font-medium text-purple-800 mb-2">Language & Vocabulary (25%)</h5>
              <div className="flex items-center mb-2">
                <label className="block text-sm font-medium text-gray-700 w-20">Rating:</label>
                <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option>Select...</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Comments:</label>
                <textarea
                  rows={3}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="How effective is the language and vocabulary usage?"
                ></textarea>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <h5 className="font-medium text-red-800 mb-2">Spelling & Grammar (20%)</h5>
              <div className="flex items-center mb-2">
                <label className="block text-sm font-medium text-gray-700 w-20">Rating:</label>
                <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option>Select...</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Comments:</label>
                <textarea
                  rows={3}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="How accurate is the spelling and grammar?"
                ></textarea>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <h5 className="font-medium text-gray-900 mb-2">Overall Assessment</h5>
              <div className="flex items-center mb-2">
                <label className="block text-sm font-medium text-gray-700 w-20">Total Score:</label>
                <input
                  type="text"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  placeholder="Calculate total score"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Overall Comments:</label>
                <textarea
                  rows={4}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Provide overall feedback and suggestions for improvement"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit Evaluation
          </button>
        </div>
      </div>
    </div>
  );
}
