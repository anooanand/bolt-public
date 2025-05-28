import React from 'react';

export function ActivitiesTab() {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Interactive Activities</h3>
      
      <div className="bg-indigo-50 p-4 rounded-lg mb-6">
        <p className="text-gray-700">
          Complete these interactive activities to reinforce your understanding of paragraph building. These exercises will help you develop the skills needed to create well-structured paragraphs for the NSW Selective exam.
        </p>
      </div>
      
      <div className="space-y-8">
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-blue-50 px-4 py-2">
            <h4 className="font-medium text-blue-800">Activity 1: Identify PEEL Components</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Read the paragraph below and identify which sentences represent each component of the PEEL structure.
            </p>
            
            <div className="border p-3 rounded-lg mb-4 bg-gray-50">
              <p className="text-gray-700">
                (1) Technology has significantly improved education in modern classrooms. (2) Interactive whiteboards allow teachers to display multimedia content that engages visual learners. (3) Educational apps provide personalized learning experiences that adapt to each student's pace and level. (4) These technological tools help students understand complex concepts through visualization and interactive exercises, making learning more effective than traditional methods alone. (5) By incorporating technology thoughtfully, schools can create more dynamic and accessible learning environments for all students.
              </p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Which sentence is the Point (Topic Sentence)?</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Which sentences provide Evidence/Examples?</label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input id="e1" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="e1" className="ml-2 block text-sm text-gray-700">Sentence 1</label>
                  </div>
                  <div className="flex items-center">
                    <input id="e2" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="e2" className="ml-2 block text-sm text-gray-700">Sentence 2</label>
                  </div>
                  <div className="flex items-center">
                    <input id="e3" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="e3" className="ml-2 block text-sm text-gray-700">Sentence 3</label>
                  </div>
                  <div className="flex items-center">
                    <input id="e4" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="e4" className="ml-2 block text-sm text-gray-700">Sentence 4</label>
                  </div>
                  <div className="flex items-center">
                    <input id="e5" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="e5" className="ml-2 block text-sm text-gray-700">Sentence 5</label>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Which sentence provides the Explanation?</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Which sentence is the Link (Concluding Sentence)?</label>
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
            <h4 className="font-medium text-green-800">Activity 2: Match Topic Sentences to Paragraphs</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Match each topic sentence to the most appropriate paragraph based on the main idea.
            </p>
            
            <div className="space-y-6">
              <div className="border p-3 rounded-lg bg-gray-50">
                <p className="text-gray-700">
                  <span className="font-medium">Paragraph A:</span> __________ The Great Barrier Reef stretches over 2,300 kilometers and is home to thousands of species of marine life. Coral bleaching caused by rising ocean temperatures has damaged large portions of the reef. Scientists estimate that without immediate action, this natural wonder could be lost within decades.
                </p>
              </div>
              
              <div className="border p-3 rounded-lg bg-gray-50">
                <p className="text-gray-700">
                  <span className="font-medium">Paragraph B:</span> __________ Students can access information instantly through smartphones and laptops. Teachers can use educational apps and online platforms to create interactive lessons. Digital textbooks can be updated regularly to include the most current information, unlike printed versions that quickly become outdated.
                </p>
              </div>
              
              <div className="border p-3 rounded-lg bg-gray-50">
                <p className="text-gray-700">
                  <span className="font-medium">Paragraph C:</span> __________ Regular physical activity improves cardiovascular health and builds stronger muscles and bones. Exercise also releases endorphins, which reduce stress and improve mood. Additionally, team sports teach valuable social skills like cooperation and communication.
                </p>
              </div>
              
              <div className="mt-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Topic Sentence for Paragraph A:</label>
                  <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                    <option>Select the best topic sentence...</option>
                    <option value="1">Climate change poses a serious threat to the world's largest coral reef system.</option>
                    <option value="2">Technology has revolutionized the way students learn in modern classrooms.</option>
                    <option value="3">Regular exercise provides numerous benefits for physical and mental health.</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Topic Sentence for Paragraph B:</label>
                  <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                    <option>Select the best topic sentence...</option>
                    <option value="1">Climate change poses a serious threat to the world's largest coral reef system.</option>
                    <option value="2">Technology has revolutionized the way students learn in modern classrooms.</option>
                    <option value="3">Regular exercise provides numerous benefits for physical and mental health.</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Topic Sentence for Paragraph C:</label>
                  <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                    <option>Select the best topic sentence...</option>
                    <option value="1">Climate change poses a serious threat to the world's largest coral reef system.</option>
                    <option value="2">Technology has revolutionized the way students learn in modern classrooms.</option>
                    <option value="3">Regular exercise provides numerous benefits for physical and mental health.</option>
                  </select>
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
            <h4 className="font-medium text-purple-800">Activity 3: Create Topic and Concluding Sentences</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              For each paragraph body, write an effective topic sentence and concluding sentence.
            </p>
            
            <div className="space-y-6">
              <div>
                <div className="border p-3 rounded-lg bg-gray-50 mb-4">
                  <p className="text-gray-700">
                    <span className="font-medium">Paragraph Body:</span> Many students struggle with math anxiety, causing them to perform poorly on tests despite understanding the concepts. Research shows that approximately 50% of middle school students experience some form of math-related stress. This anxiety can lead to avoidance behaviors, where students deliberately skip math homework or find excuses to miss class. When students associate math with negative emotions, they create a cycle of stress that becomes increasingly difficult to break.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Write a topic sentence:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Write a clear topic sentence that introduces the main idea..."
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Write a concluding sentence:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Write a concluding sentence that wraps up the paragraph..."
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="border p-3 rounded-lg bg-gray-50 mb-4">
                  <p className="text-gray-700">
                    <span className="font-medium">Paragraph Body:</span> Plastic waste takes hundreds of years to decompose, with a single plastic bottle lasting up to 450 years in the environment. Marine animals often mistake plastic debris for food, leading to injury or death. According to recent studies, over 100,000 marine animals die each year from plastic entanglement or ingestion. Microplastics have now been found in the deepest ocean trenches and even in the air we breathe.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Write a topic sentence:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Write a clear topic sentence that introduces the main idea..."
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Write a concluding sentence:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Write a concluding sentence that wraps up the paragraph..."
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Submit Sentences
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-red-50 px-4 py-2">
            <h4 className="font-medium text-red-800">Activity 4: Build a Complete PEEL Paragraph</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Create a complete paragraph using the PEEL structure on one of the topics below.
            </p>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Choose a topic:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="flex items-center">
                  <input id="topic1" name="topic" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="topic1" className="ml-2 block text-sm text-gray-700">The importance of reading fiction</label>
                </div>
                <div className="flex items-center">
                  <input id="topic2" name="topic" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="topic2" className="ml-2 block text-sm text-gray-700">Why learning a musical instrument is beneficial</label>
                </div>
                <div className="flex items-center">
                  <input id="topic3" name="topic" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="topic3" className="ml-2 block text-sm text-gray-700">The effects of social media on teenagers</label>
                </div>
                <div className="flex items-center">
                  <input id="topic4" name="topic" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="topic4" className="ml-2 block text-sm text-gray-700">The value of learning another language</label>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-blue-800 mb-1">P - Point (Topic Sentence):</label>
                <textarea
                  rows={2}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Write your topic sentence here..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-green-800 mb-1">E - Evidence/Examples:</label>
                <textarea
                  rows={3}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Provide specific details, facts, or examples that support your main idea..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-purple-800 mb-1">E - Explanation:</label>
                <textarea
                  rows={3}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Explain how your evidence supports your main idea and why it's important..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-red-800 mb-1">L - Link (Concluding Sentence):</label>
                <textarea
                  rows={2}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Write your concluding sentence here..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Complete Paragraph:</label>
                <textarea
                  rows={6}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Combine all your PEEL components into a complete, cohesive paragraph..."
                ></textarea>
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
