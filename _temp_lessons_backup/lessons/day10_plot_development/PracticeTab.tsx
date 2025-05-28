import React from 'react';

export function PracticeTab() {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Practice Task: Developing Compelling Plots</h3>
      
      <div className="bg-indigo-50 p-4 rounded-lg mb-6">
        <p className="text-gray-700">
          Now it's time to apply what you've learned about plot development! In this practice task, you'll analyze plot structure in example stories, create your own plot outline, and write a key scene that includes a turning point.
        </p>
      </div>
      
      <div className="space-y-6">
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-blue-50 px-4 py-3">
            <h4 className="font-medium text-blue-800">Part 1: Analyze Plot Structure</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Read the short story summary below and identify the key plot development techniques used.
            </p>
            
            <div className="border p-4 rounded-lg mb-4 bg-gray-50">
              <p className="text-gray-800">
                <strong>The Lost Key</strong>
              </p>
              <p className="text-gray-800 mb-2">
                When 12-year-old Mia discovers an antique key in her recently deceased grandmother's belongings, she becomes determined to find what it unlocks. Her parents are busy settling the estate and pay little attention to her "treasure hunt." While exploring her grandmother's old Victorian house, Mia notices a small keyhole behind a loose piece of wallpaper in the attic. However, before she can try the key, her cousin Jake snatches it away, claiming that anything valuable in the house should be shared.
              </p>
              <p className="text-gray-800 mb-2">
                Mia attempts to get the key back by challenging Jake to a bike race, but crashes and sprains her ankle. While recovering, she overhears her parents discussing selling the house immediately, giving her just one day left to solve the mystery. With the help of her younger brother, Mia creates a distraction that allows her to reclaim the key from Jake's backpack.
              </p>
              <p className="text-gray-800 mb-2">
                As a thunderstorm rages outside, Mia sneaks up to the attic one last time. When she inserts the key into the hidden keyhole, she's shocked to find not jewels or money, but a collection of handwritten stories her grandmother had created about Mia's own mother as a child. Mia realizes these stories are the real treasure—memories her mother had forgotten.
              </p>
              <p className="text-gray-800">
                Instead of keeping the discovery to herself, Mia decides to share the stories with her grieving mother. As they read the stories together, Mia's mother smiles for the first time since the funeral. The family decides to keep the house as a gathering place, and Mia understands that her grandmother's true legacy wasn't hidden treasure but the stories that connected generations.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Identify the Central Conflict in the story:</p>
                <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option>Select...</option>
                  <option>Mia versus her cousin Jake over possession of the key</option>
                  <option>Mia's determination to discover what the key unlocks before the house is sold</option>
                  <option>Mia's struggle to connect with her grieving mother</option>
                  <option>Mia's desire to find valuable treasure in her grandmother's house</option>
                </select>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">List two Rising Complications that increase the stakes:</p>
                <textarea
                  rows={3}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Identify two obstacles or challenges that make Mia's goal more difficult..."
                ></textarea>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Identify an important Character Decision that drives the plot:</p>
                <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option>Select...</option>
                  <option>Mia deciding to challenge Jake to a bike race</option>
                  <option>Mia creating a distraction to reclaim the key</option>
                  <option>Mia deciding to share the stories with her mother instead of keeping them to herself</option>
                  <option>Mia's parents deciding to sell the house</option>
                </select>
                <div className="mt-2">
                  <label className="block text-sm text-gray-700">How does this decision reveal Mia's character?</label>
                  <textarea
                    rows={2}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  ></textarea>
                </div>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">What is the main Turning Point in the story?</p>
                <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option>Select...</option>
                  <option>When Mia crashes her bike and sprains her ankle</option>
                  <option>When Mia discovers what the key actually unlocks</option>
                  <option>When Mia overhears her parents discussing selling the house</option>
                  <option>When Mia reclaims the key from Jake's backpack</option>
                </select>
                <div className="mt-2">
                  <label className="block text-sm text-gray-700">How does this turning point change the direction of the story?</label>
                  <textarea
                    rows={2}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  ></textarea>
                </div>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Describe the Resolution & Transformation in the story:</p>
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm text-gray-700">How is the central conflict resolved?</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700">How has Mia transformed by the end of the story?</label>
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
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-green-50 px-4 py-3">
            <h4 className="font-medium text-green-800">Part 2: Create a Plot Outline</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Create a plot outline for a short story using the plot development techniques you've learned. Choose one of the following prompts:
            </p>
            
            <div className="bg-gray-50 p-3 rounded-lg mb-4">
              <ul className="list-disc pl-5 text-gray-700">
                <li>A student discovers a hidden talent that changes their life</li>
                <li>A character finds an object that doesn't belong to them and must decide what to do</li>
                <li>Two rivals must work together to overcome an unexpected challenge</li>
                <li>A character's attempt to fix a small problem leads to bigger complications</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Selected Prompt:</label>
                <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option>Select a prompt...</option>
                  <option>A student discovers a hidden talent that changes their life</option>
                  <option>A character finds an object that doesn't belong to them and must decide what to do</option>
                  <option>Two rivals must work together to overcome an unexpected challenge</option>
                  <option>A character's attempt to fix a small problem leads to bigger complications</option>
                </select>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Central Conflict:</p>
                <div>
                  <label className="block text-sm text-gray-700">What is the main problem or struggle in your story?</label>
                  <textarea
                    rows={3}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Describe the central conflict that will drive your plot..."
                  ></textarea>
                </div>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Rising Complications:</p>
                <div>
                  <label className="block text-sm text-gray-700">List three obstacles or challenges that will increase in difficulty:</label>
                  <div className="space-y-2">
                    <input
                      type="text"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="First complication"
                    />
                    <input
                      type="text"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Second complication"
                    />
                    <input
                      type="text"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Third complication"
                    />
                  </div>
                </div>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Character Decisions:</p>
                <div>
                  <label className="block text-sm text-gray-700">What important decisions will your main character make?</label>
                  <div className="space-y-2">
                    <input
                      type="text"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="First decision"
                    />
                    <input
                      type="text"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Second decision"
                    />
                  </div>
                </div>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Turning Point:</p>
                <div>
                  <label className="block text-sm text-gray-700">What significant moment will change the direction of your story?</label>
                  <textarea
                    rows={3}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Describe the turning point in your story..."
                  ></textarea>
                </div>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Resolution & Transformation:</p>
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm text-gray-700">How will the conflict be resolved?</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700">How will your main character transform or change?</label>
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
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-purple-50 px-4 py-3">
            <h4 className="font-medium text-purple-800">Part 3: Write a Key Scene with a Turning Point</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Using your plot outline from Part 2, write a key scene (200-300 words) that includes the turning point of your story. This is the moment that changes the direction of your plot.
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Scene:</label>
                <textarea
                  rows={12}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Write your scene here, focusing on the turning point..."
                ></textarea>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-sm font-medium text-gray-700 mb-2">Self-assessment checklist:</p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                    <label className="ml-2 block text-sm text-gray-700">My scene includes a clear turning point</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                    <label className="ml-2 block text-sm text-gray-700">The turning point changes the direction of the story</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                    <label className="ml-2 block text-sm text-gray-700">My scene reveals something about the character(s)</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                    <label className="ml-2 block text-sm text-gray-700">The scene builds tension or emotion</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                    <label className="ml-2 block text-sm text-gray-700">The scene connects to my overall plot outline</label>
                  </div>
                </div>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-sm font-medium text-gray-700 mb-2">Reflection:</p>
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">How does your turning point change the direction of your story?</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">What was challenging about writing this scene?</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">How would you continue the story after this turning point?</label>
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
