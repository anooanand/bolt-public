import React from 'react';

export function PracticeTab() {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Practice Task: Create a Paragraph Using PEEL Structure</h3>
      
      <div className="bg-indigo-50 p-4 rounded-lg mb-6">
        <p className="text-gray-700">
          Now it's time to apply what you've learned about paragraph structure! In this practice task, you'll identify PEEL components in example paragraphs and then create your own well-structured paragraph.
        </p>
      </div>
      
      <div className="space-y-6">
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-blue-50 px-4 py-3">
            <h4 className="font-medium text-blue-800">Part 1: Identify PEEL Components</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Read the paragraph below and identify which sentences represent each component of the PEEL structure.
            </p>
            
            <div className="border p-4 rounded-lg mb-4 bg-gray-50">
              <p className="text-gray-800">
                Technology has significantly improved education in modern classrooms. Smart boards and tablets have replaced traditional blackboards and textbooks, allowing for more interactive and engaging lessons. These digital tools enable teachers to incorporate videos, animations, and interactive exercises that appeal to different learning styles, helping students better understand complex concepts. As a result, technology has transformed the classroom experience, making learning more accessible and enjoyable for students of all abilities.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Which sentence is the Point (topic sentence)?</p>
                <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option>Select the sentence...</option>
                  <option>Technology has significantly improved education in modern classrooms.</option>
                  <option>Smart boards and tablets have replaced traditional blackboards and textbooks, allowing for more interactive and engaging lessons.</option>
                  <option>These digital tools enable teachers to incorporate videos, animations, and interactive exercises that appeal to different learning styles, helping students better understand complex concepts.</option>
                  <option>As a result, technology has transformed the classroom experience, making learning more accessible and enjoyable for students of all abilities.</option>
                </select>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Which sentence provides Evidence/Examples?</p>
                <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option>Select the sentence...</option>
                  <option>Technology has significantly improved education in modern classrooms.</option>
                  <option>Smart boards and tablets have replaced traditional blackboards and textbooks, allowing for more interactive and engaging lessons.</option>
                  <option>These digital tools enable teachers to incorporate videos, animations, and interactive exercises that appeal to different learning styles, helping students better understand complex concepts.</option>
                  <option>As a result, technology has transformed the classroom experience, making learning more accessible and enjoyable for students of all abilities.</option>
                </select>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Which sentence provides the Explanation?</p>
                <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option>Select the sentence...</option>
                  <option>Technology has significantly improved education in modern classrooms.</option>
                  <option>Smart boards and tablets have replaced traditional blackboards and textbooks, allowing for more interactive and engaging lessons.</option>
                  <option>These digital tools enable teachers to incorporate videos, animations, and interactive exercises that appeal to different learning styles, helping students better understand complex concepts.</option>
                  <option>As a result, technology has transformed the classroom experience, making learning more accessible and enjoyable for students of all abilities.</option>
                </select>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Which sentence is the Link (concluding sentence)?</p>
                <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option>Select the sentence...</option>
                  <option>Technology has significantly improved education in modern classrooms.</option>
                  <option>Smart boards and tablets have replaced traditional blackboards and textbooks, allowing for more interactive and engaging lessons.</option>
                  <option>These digital tools enable teachers to incorporate videos, animations, and interactive exercises that appeal to different learning styles, helping students better understand complex concepts.</option>
                  <option>As a result, technology has transformed the classroom experience, making learning more accessible and enjoyable for students of all abilities.</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-green-50 px-4 py-3">
            <h4 className="font-medium text-green-800">Part 2: Practice Writing Topic and Concluding Sentences</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              For each of the following paragraph topics, write a strong topic sentence and a concluding sentence.
            </p>
            
            <div className="space-y-4">
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Topic: The benefits of regular exercise</p>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Topic Sentence (Point):</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Write a clear topic sentence that introduces the main idea..."
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Concluding Sentence (Link):</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Write a concluding sentence that wraps up the paragraph..."
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Topic: The importance of reading books</p>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Topic Sentence (Point):</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Write a clear topic sentence that introduces the main idea..."
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Concluding Sentence (Link):</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Write a concluding sentence that wraps up the paragraph..."
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-purple-50 px-4 py-3">
            <h4 className="font-medium text-purple-800">Part 3: Create a Complete PEEL Paragraph</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Write a complete paragraph using the PEEL structure on one of the following topics:
            </p>
            
            <div className="bg-gray-50 p-3 rounded-lg mb-4">
              <ul className="list-disc pl-5 text-gray-700">
                <li>Why learning a musical instrument is beneficial</li>
                <li>The impact of social media on teenagers</li>
                <li>The importance of protecting the environment</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Selected Topic:</label>
                <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option>Select a topic...</option>
                  <option>Why learning a musical instrument is beneficial</option>
                  <option>The impact of social media on teenagers</option>
                  <option>The importance of protecting the environment</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your PEEL Paragraph:</label>
                <textarea
                  rows={8}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Write your complete paragraph here using the PEEL structure..."
                ></textarea>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border p-3 rounded-lg">
                  <p className="text-sm font-medium text-gray-700 mb-2">Identify your PEEL components:</p>
                  <div className="space-y-2">
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">Point (Topic Sentence):</label>
                      <textarea
                        rows={2}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Copy your topic sentence here..."
                      ></textarea>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">Evidence/Examples:</label>
                      <textarea
                        rows={2}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Copy your evidence/examples here..."
                      ></textarea>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">Explanation:</label>
                      <textarea
                        rows={2}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Copy your explanation here..."
                      ></textarea>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">Link (Concluding Sentence):</label>
                      <textarea
                        rows={2}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Copy your concluding sentence here..."
                      ></textarea>
                    </div>
                  </div>
                </div>
                
                <div className="border p-3 rounded-lg">
                  <p className="text-sm font-medium text-gray-700 mb-2">Self-assessment:</p>
                  <div className="space-y-2">
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">How well did you follow the PEEL structure?</label>
                      <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                        <option>Select...</option>
                        <option>Very well - all components are clear and effective</option>
                        <option>Well - all components are present but could be stronger</option>
                        <option>Somewhat - some components are missing or unclear</option>
                        <option>Needs improvement - structure is not clear</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">What was challenging about this task?</label>
                      <textarea
                        rows={2}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      ></textarea>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">How could you improve your paragraph?</label>
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
