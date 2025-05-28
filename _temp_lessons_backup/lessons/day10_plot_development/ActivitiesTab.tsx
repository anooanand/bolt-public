import React from 'react';

export function ActivitiesTab() {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Interactive Activities</h3>
      
      <div className="bg-indigo-50 p-4 rounded-lg mb-6">
        <p className="text-gray-700">
          Complete these interactive activities to reinforce your understanding of plot development. These exercises will help you create compelling plots for your creative writing in the NSW Selective exam.
        </p>
      </div>
      
      <div className="space-y-8">
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-blue-50 px-4 py-2">
            <h4 className="font-medium text-blue-800">Activity 1: Identify Plot Elements</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Read the short story below and identify the different elements of plot development.
            </p>
            
            <div className="border p-3 rounded-lg mb-4 bg-gray-50">
              <p className="text-gray-700">
                (1) Twelve-year-old Mia had always dreamed of joining the school robotics team, but her extreme shyness made it difficult for her to speak up during team tryouts. When the robotics teacher, Mr. Chen, announced a special competition with a scholarship prize, Mia knew she had to overcome her fears.
                
                (2) On the day of tryouts, Mia arrived early with her carefully designed robot prototype. As she waited nervously, the team captain, Zack, accidentally knocked her robot off the table, breaking a crucial component. With only thirty minutes before her presentation, Mia rushed to fix it.
                
                (3) While searching for replacement parts in the supply closet, Mia overheard Zack telling his friends he would make sure no new members joined "his" team this year. Mia realized he had broken her robot on purpose.
                
                (4) When her turn came, Mia's hands trembled as she began her presentation. Her voice was barely audible. Mr. Chen asked her to speak up, and several students snickered. Mia froze completely, staring at her damaged robot.
                
                (5) Just as she was about to give up, she noticed a younger student in the back of the room watching her with admiration. Something shifted inside Mia. Instead of focusing on her fear, she focused on her passion for robotics and all the hours she'd spent designing her project.
                
                (6) Taking a deep breath, Mia started again, this time explaining how she'd solved the last-minute technical problem with an innovative solution. Her voice grew stronger as she demonstrated her robot's unique features. Even Zack looked impressed.
                
                (7) A week later, Mr. Chen announced the new team members. Not only was Mia selected, but her quick-thinking repair solution had earned her the position of technical specialist. When Zack approached her after the announcement, Mia expected another confrontation. Instead, he reluctantly admitted her design was "pretty clever" and asked if she could help with a technical issue on his project.
              </p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Which paragraph establishes the Central Conflict?</label>
                <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option>Select paragraph number...</option>
                  <option value="1">Paragraph 1</option>
                  <option value="2">Paragraph 2</option>
                  <option value="3">Paragraph 3</option>
                  <option value="4">Paragraph 4</option>
                  <option value="5">Paragraph 5</option>
                  <option value="6">Paragraph 6</option>
                  <option value="7">Paragraph 7</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Which paragraphs show Rising Complications? (Select all that apply)</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  <div className="flex items-center">
                    <input id="comp1" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="comp1" className="ml-2 block text-sm text-gray-700">Paragraph 2</label>
                  </div>
                  <div className="flex items-center">
                    <input id="comp2" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="comp2" className="ml-2 block text-sm text-gray-700">Paragraph 3</label>
                  </div>
                  <div className="flex items-center">
                    <input id="comp3" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="comp3" className="ml-2 block text-sm text-gray-700">Paragraph 4</label>
                  </div>
                  <div className="flex items-center">
                    <input id="comp4" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="comp4" className="ml-2 block text-sm text-gray-700">Paragraph 6</label>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Which paragraph contains the main Turning Point in the story?</label>
                <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option>Select paragraph number...</option>
                  <option value="1">Paragraph 1</option>
                  <option value="2">Paragraph 2</option>
                  <option value="3">Paragraph 3</option>
                  <option value="4">Paragraph 4</option>
                  <option value="5">Paragraph 5</option>
                  <option value="6">Paragraph 6</option>
                  <option value="7">Paragraph 7</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Which paragraph shows the Resolution & Transformation?</label>
                <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option>Select paragraph number...</option>
                  <option value="1">Paragraph 1</option>
                  <option value="2">Paragraph 2</option>
                  <option value="3">Paragraph 3</option>
                  <option value="4">Paragraph 4</option>
                  <option value="5">Paragraph 5</option>
                  <option value="6">Paragraph 6</option>
                  <option value="7">Paragraph 7</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">What important Character Decision does Mia make that changes the course of the story?</label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input id="decision1" name="decision" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="decision1" className="ml-2 block text-sm text-gray-700">She decides to report Zack for breaking her robot</label>
                  </div>
                  <div className="flex items-center">
                    <input id="decision2" name="decision" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="decision2" className="ml-2 block text-sm text-gray-700">She decides to focus on her passion rather than her fear</label>
                  </div>
                  <div className="flex items-center">
                    <input id="decision3" name="decision" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="decision3" className="ml-2 block text-sm text-gray-700">She decides to give up on joining the robotics team</label>
                  </div>
                  <div className="flex items-center">
                    <input id="decision4" name="decision" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="decision4" className="ml-2 block text-sm text-gray-700">She decides to build a completely new robot</label>
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
            <h4 className="font-medium text-green-800">Activity 2: Plot Structure Analysis</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              For each plot element below, identify which part of the hero's journey it represents in a typical adventure story.
            </p>
            
            <div className="space-y-6">
              <div>
                <h5 className="font-medium text-gray-800 mb-2">Match each plot element to its correct stage:</h5>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-700 mb-2">1. <span className="font-medium">A young hero discovers they have unusual abilities that set them apart from others in their village.</span></p>
                    <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                      <option>Select the matching plot stage...</option>
                      <option value="1">Central Conflict Introduction</option>
                      <option value="2">Character Background/Ordinary World</option>
                      <option value="3">Call to Adventure/Inciting Incident</option>
                      <option value="4">Rising Action/Complications</option>
                      <option value="5">Turning Point/Climax</option>
                      <option value="6">Resolution/Transformation</option>
                    </select>
                  </div>
                  
                  <div>
                    <p className="text-gray-700 mb-2">2. <span className="font-medium">The hero's mentor is captured by the enemy, forcing the hero to continue the quest alone.</span></p>
                    <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                      <option>Select the matching plot stage...</option>
                      <option value="1">Central Conflict Introduction</option>
                      <option value="2">Character Background/Ordinary World</option>
                      <option value="3">Call to Adventure/Inciting Incident</option>
                      <option value="4">Rising Action/Complications</option>
                      <option value="5">Turning Point/Climax</option>
                      <option value="6">Resolution/Transformation</option>
                    </select>
                  </div>
                  
                  <div>
                    <p className="text-gray-700 mb-2">3. <span className="font-medium">The hero learns that an ancient artifact must be found to save their village from destruction.</span></p>
                    <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                      <option>Select the matching plot stage...</option>
                      <option value="1">Central Conflict Introduction</option>
                      <option value="2">Character Background/Ordinary World</option>
                      <option value="3">Call to Adventure/Inciting Incident</option>
                      <option value="4">Rising Action/Complications</option>
                      <option value="5">Turning Point/Climax</option>
                      <option value="6">Resolution/Transformation</option>
                    </select>
                  </div>
                  
                  <div>
                    <p className="text-gray-700 mb-2">4. <span className="font-medium">In the final battle, the hero realizes they must sacrifice their newfound power to defeat the enemy.</span></p>
                    <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                      <option>Select the matching plot stage...</option>
                      <option value="1">Central Conflict Introduction</option>
                      <option value="2">Character Background/Ordinary World</option>
                      <option value="3">Call to Adventure/Inciting Incident</option>
                      <option value="4">Rising Action/Complications</option>
                      <option value="5">Turning Point/Climax</option>
                      <option value="6">Resolution/Transformation</option>
                    </select>
                  </div>
                  
                  <div>
                    <p className="text-gray-700 mb-2">5. <span className="font-medium">The hero returns to their village, no longer with magical powers but with wisdom and courage that inspires others.</span></p>
                    <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                      <option>Select the matching plot stage...</option>
                      <option value="1">Central Conflict Introduction</option>
                      <option value="2">Character Background/Ordinary World</option>
                      <option value="3">Call to Adventure/Inciting Incident</option>
                      <option value="4">Rising Action/Complications</option>
                      <option value="5">Turning Point/Climax</option>
                      <option value="6">Resolution/Transformation</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Check Matches
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-purple-50 px-4 py-2">
            <h4 className="font-medium text-purple-800">Activity 3: Create a Plot Outline</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Create a plot outline for a short story using the plot development techniques you've learned. Choose one of the prompts below or create your own.
            </p>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Story prompts (choose one or create your own):</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="flex items-center">
                  <input id="prompt1" name="prompt" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="prompt1" className="ml-2 block text-sm text-gray-700">A student discovers a hidden talent that could change their future</label>
                </div>
                <div className="flex items-center">
                  <input id="prompt2" name="prompt" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="prompt2" className="ml-2 block text-sm text-gray-700">A mysterious object appears in a neighborhood park</label>
                </div>
                <div className="flex items-center">
                  <input id="prompt3" name="prompt" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="prompt3" className="ml-2 block text-sm text-gray-700">Two rivals must work together to solve a problem</label>
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
                <label className="block text-sm font-medium text-blue-800 mb-1">1. Central Conflict:</label>
                <textarea
                  rows={3}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Describe the main problem or struggle that will drive your story..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-green-800 mb-1">2. Rising Complications (list at least three):</label>
                <textarea
                  rows={4}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Describe obstacles and challenges that will increase in difficulty..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-purple-800 mb-1">3. Character Decisions:</label>
                <textarea
                  rows={3}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Describe key choices your main character will make that drive the plot forward..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-red-800 mb-1">4. Turning Point:</label>
                <textarea
                  rows={3}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Describe the significant moment that will change the direction of your story..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-yellow-800 mb-1">5. Resolution & Transformation:</label>
                <textarea
                  rows={3}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Describe how the conflict will be resolved and how your character will change..."
                ></textarea>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save Plot Outline
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-red-50 px-4 py-2">
            <h4 className="font-medium text-red-800">Activity 4: Write a Turning Point Scene</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Using the plot outline you created in Activity 3, write a scene that includes the turning point of your story. This is the moment where something significant changes in your story's direction.
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Turning Point Scene:</label>
                <textarea
                  rows={12}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Write your scene here..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Self-Assessment:</label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input id="check1" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="check1" className="ml-2 block text-sm text-gray-700">My scene clearly shows a significant change in the story's direction.</label>
                  </div>
                  <div className="flex items-center">
                    <input id="check2" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="check2" className="ml-2 block text-sm text-gray-700">My scene reveals something important about the character or situation.</label>
                  </div>
                  <div className="flex items-center">
                    <input id="check3" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="check3" className="ml-2 block text-sm text-gray-700">My scene builds on the central conflict established in my plot outline.</label>
                  </div>
                  <div className="flex items-center">
                    <input id="check4" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="check4" className="ml-2 block text-sm text-gray-700">My scene includes sensory details and descriptive language.</label>
                  </div>
                  <div className="flex items-center">
                    <input id="check5" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="check5" className="ml-2 block text-sm text-gray-700">My scene shows character emotions and reactions to events.</label>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Submit Scene
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
