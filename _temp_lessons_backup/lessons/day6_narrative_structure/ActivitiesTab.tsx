import React from 'react';

export function ActivitiesTab() {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Interactive Activities</h3>
      
      <div className="bg-indigo-50 p-4 rounded-lg mb-6">
        <p className="text-gray-700">
          Complete these interactive activities to reinforce your understanding of narrative structure. These exercises will help you develop the skills needed to organize your creative writing effectively for the NSW Selective exam.
        </p>
      </div>
      
      <div className="space-y-8">
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-blue-50 px-4 py-2">
            <h4 className="font-medium text-blue-800">Activity 1: Identify Narrative Elements</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Read the short story below and identify which parts represent each element of narrative structure.
            </p>
            
            <div className="border p-3 rounded-lg mb-4 bg-gray-50">
              <p className="text-gray-700">
                (1) Max had always dreamed of winning the school science fair. For months, he worked on his robot project, staying up late to perfect every detail. His parents worried about his obsession but supported his passion.
                
                (2) On the day of the fair, disaster struck. While carrying his robot to school, Max tripped on the sidewalk. Parts of his creation scattered across the pavement. With only two hours before judging, panic set in. He frantically gathered the pieces and rushed to school.
                
                (3) In the science lab, Max's hands trembled as he attempted to reassemble his robot. Nothing worked. With ten minutes remaining, he realized a crucial circuit board was cracked beyond repair. In desperation, he completely rewired the system, creating an entirely new function for his robot.
                
                (4) When the judges reached his table, instead of demonstrating a robot that could sort recycling, Max presented a robot that created art from recycled materials—drawing beautiful patterns with broken parts.
                
                (5) Max didn't win first place, but his innovative thinking earned him the "Creative Problem Solver" award. More importantly, he discovered his true talent wasn't just building robots but adapting to unexpected challenges.
              </p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Which paragraph represents the Exposition?</label>
                <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option>Select paragraph number...</option>
                  <option value="1">Paragraph 1</option>
                  <option value="2">Paragraph 2</option>
                  <option value="3">Paragraph 3</option>
                  <option value="4">Paragraph 4</option>
                  <option value="5">Paragraph 5</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Which paragraph represents the Rising Action?</label>
                <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option>Select paragraph number...</option>
                  <option value="1">Paragraph 1</option>
                  <option value="2">Paragraph 2</option>
                  <option value="3">Paragraph 3</option>
                  <option value="4">Paragraph 4</option>
                  <option value="5">Paragraph 5</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Which paragraph represents the Climax?</label>
                <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option>Select paragraph number...</option>
                  <option value="1">Paragraph 1</option>
                  <option value="2">Paragraph 2</option>
                  <option value="3">Paragraph 3</option>
                  <option value="4">Paragraph 4</option>
                  <option value="5">Paragraph 5</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Which paragraph represents the Falling Action?</label>
                <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option>Select paragraph number...</option>
                  <option value="1">Paragraph 1</option>
                  <option value="2">Paragraph 2</option>
                  <option value="3">Paragraph 3</option>
                  <option value="4">Paragraph 4</option>
                  <option value="5">Paragraph 5</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Which paragraph represents the Resolution?</label>
                <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option>Select paragraph number...</option>
                  <option value="1">Paragraph 1</option>
                  <option value="2">Paragraph 2</option>
                  <option value="3">Paragraph 3</option>
                  <option value="4">Paragraph 4</option>
                  <option value="5">Paragraph 5</option>
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
            <h4 className="font-medium text-green-800">Activity 2: Arrange Story Events</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Arrange the following story events into the correct narrative structure order.
            </p>
            
            <div className="space-y-6">
              <div>
                <h5 className="font-medium text-gray-800 mb-2">Story: "The Lost Dog"</h5>
                <div className="space-y-2">
                  <div className="border p-3 rounded-lg bg-gray-50">
                    <p className="text-gray-700">
                      <span className="font-medium">Event A:</span> Lily puts up posters around the neighborhood and posts on social media about her missing dog, Rocky.
                    </p>
                  </div>
                  <div className="border p-3 rounded-lg bg-gray-50">
                    <p className="text-gray-700">
                      <span className="font-medium">Event B:</span> Lily adopts Rocky, a rescue dog who becomes her best friend and helps her overcome her shyness.
                    </p>
                  </div>
                  <div className="border p-3 rounded-lg bg-gray-50">
                    <p className="text-gray-700">
                      <span className="font-medium">Event C:</span> During a thunderstorm, Rocky gets frightened by lightning and runs away through an open gate.
                    </p>
                  </div>
                  <div className="border p-3 rounded-lg bg-gray-50">
                    <p className="text-gray-700">
                      <span className="font-medium">Event D:</span> After a week of searching, Lily receives a call from an elderly man who found Rocky sheltering in his shed.
                    </p>
                  </div>
                  <div className="border p-3 rounded-lg bg-gray-50">
                    <p className="text-gray-700">
                      <span className="font-medium">Event E:</span> Lily and Rocky are reunited, and she decides to volunteer at the local animal shelter to help other lost pets find their way home.
                    </p>
                  </div>
                </div>
                
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-blue-800 mb-1">1. Exposition:</label>
                    <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                      <option>Select event...</option>
                      <option value="A">Event A</option>
                      <option value="B">Event B</option>
                      <option value="C">Event C</option>
                      <option value="D">Event D</option>
                      <option value="E">Event E</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-green-800 mb-1">2. Rising Action:</label>
                    <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                      <option>Select event...</option>
                      <option value="A">Event A</option>
                      <option value="B">Event B</option>
                      <option value="C">Event C</option>
                      <option value="D">Event D</option>
                      <option value="E">Event E</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-purple-800 mb-1">3. Climax:</label>
                    <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                      <option>Select event...</option>
                      <option value="A">Event A</option>
                      <option value="B">Event B</option>
                      <option value="C">Event C</option>
                      <option value="D">Event D</option>
                      <option value="E">Event E</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-red-800 mb-1">4. Falling Action:</label>
                    <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                      <option>Select event...</option>
                      <option value="A">Event A</option>
                      <option value="B">Event B</option>
                      <option value="C">Event C</option>
                      <option value="D">Event D</option>
                      <option value="E">Event E</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-yellow-800 mb-1">5. Resolution:</label>
                    <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                      <option>Select event...</option>
                      <option value="A">Event A</option>
                      <option value="B">Event B</option>
                      <option value="C">Event C</option>
                      <option value="D">Event D</option>
                      <option value="E">Event E</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Check Arrangement
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-purple-50 px-4 py-2">
            <h4 className="font-medium text-purple-800">Activity 3: Story Structure Planner</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Plan a short story using the five-element narrative structure. Choose one of the story prompts below or create your own.
            </p>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Story prompts (choose one or create your own):</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="flex items-center">
                  <input id="prompt1" name="prompt" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="prompt1" className="ml-2 block text-sm text-gray-700">A student discovers a hidden talent during a school competition</label>
                </div>
                <div className="flex items-center">
                  <input id="prompt2" name="prompt" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="prompt2" className="ml-2 block text-sm text-gray-700">An unexpected friendship forms between two rivals</label>
                </div>
                <div className="flex items-center">
                  <input id="prompt3" name="prompt" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="prompt3" className="ml-2 block text-sm text-gray-700">A mysterious object appears in a neighborhood park</label>
                </div>
                <div className="flex items-center">
                  <input id="prompt4" name="prompt" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="prompt4" className="ml-2 block text-sm text-gray-700">Your own idea:</label>
                  <input type="text" className="ml-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="Enter your story idea..." />
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-blue-800 mb-1">1. Exposition (Characters, Setting, Initial Situation):</label>
                <textarea
                  rows={3}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Introduce your main character(s), setting, and the initial situation..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-green-800 mb-1">2. Rising Action (Complications, Conflicts):</label>
                <textarea
                  rows={3}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Describe the events that build tension and develop the story..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-purple-800 mb-1">3. Climax (Turning Point, Highest Tension):</label>
                <textarea
                  rows={3}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Describe the moment of highest tension or the turning point in your story..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-red-800 mb-1">4. Falling Action (Consequences, Beginning Resolution):</label>
                <textarea
                  rows={3}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Describe the events that occur after the climax, showing consequences..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-yellow-800 mb-1">5. Resolution (Conclusion, New Normal):</label>
                <textarea
                  rows={3}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Describe how the story concludes and what the new normal is for your characters..."
                ></textarea>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save Story Plan
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-red-50 px-4 py-2">
            <h4 className="font-medium text-red-800">Activity 4: Write Your Story Beginning</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Using your story plan from Activity 3, write the beginning of your story (exposition and the start of rising action). Focus on introducing your characters, setting, and initial situation effectively.
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Story Title:</label>
                <input
                  type="text"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Enter a title for your story..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Story Beginning:</label>
                <textarea
                  rows={10}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Write the beginning of your story here..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Self-Assessment:</label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input id="check1" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="check1" className="ml-2 block text-sm text-gray-700">I introduced the main character(s) clearly.</label>
                  </div>
                  <div className="flex items-center">
                    <input id="check2" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="check2" className="ml-2 block text-sm text-gray-700">I established the setting (time and place).</label>
                  </div>
                  <div className="flex items-center">
                    <input id="check3" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="check3" className="ml-2 block text-sm text-gray-700">I presented the initial situation or problem.</label>
                  </div>
                  <div className="flex items-center">
                    <input id="check4" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="check4" className="ml-2 block text-sm text-gray-700">I began to build interest or tension.</label>
                  </div>
                  <div className="flex items-center">
                    <input id="check5" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="check5" className="ml-2 block text-sm text-gray-700">I used descriptive language to engage the reader.</label>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Submit Story Beginning
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
