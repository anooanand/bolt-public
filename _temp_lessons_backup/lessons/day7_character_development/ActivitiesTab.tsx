import React from 'react';

export function ActivitiesTab() {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Interactive Activities</h3>
      
      <div className="bg-indigo-50 p-4 rounded-lg mb-6">
        <p className="text-gray-700">
          Complete these interactive activities to reinforce your understanding of character development. These exercises will help you create compelling, believable characters in your creative writing for the NSW Selective exam.
        </p>
      </div>
      
      <div className="space-y-8">
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-blue-50 px-4 py-2">
            <h4 className="font-medium text-blue-800">Activity 1: Identify Character Development Techniques</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Read the passage below and identify which aspects of the STEAL method (Speech, Thoughts, Effect on Others, Actions, Looks) are used to develop the character of Maya.
            </p>
            
            <div className="border p-3 rounded-lg mb-4 bg-gray-50">
              <p className="text-gray-700">
                (1) Maya tucked a strand of her curly black hair behind her ear, revealing the three small earrings that climbed up her earlobe. Her worn backpack, covered in hand-drawn designs and political badges, hung from one shoulder. (2) "I don't care what everyone else thinks," she said, her voice quiet but firm. "Someone needs to speak up about this." (3) Maya wondered if she was brave enough to actually go through with her plan to address the school board. The thought of all those adults staring at her made her stomach twist, but the alternative—staying silent—seemed worse. (4) As she walked down the hallway, several younger students nodded respectfully in her direction. A few teachers smiled warmly, while others averted their eyes, clearly uncomfortable with her reputation as a troublemaker. (5) During lunch, when she noticed a freshman sitting alone, Maya immediately gathered her things and moved to join the isolated student, introducing herself with a genuine smile.
              </p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Which numbered section shows Maya's Speech?</label>
                <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option>Select section number...</option>
                  <option value="1">Section 1</option>
                  <option value="2">Section 2</option>
                  <option value="3">Section 3</option>
                  <option value="4">Section 4</option>
                  <option value="5">Section 5</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Which numbered section shows Maya's Thoughts?</label>
                <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option>Select section number...</option>
                  <option value="1">Section 1</option>
                  <option value="2">Section 2</option>
                  <option value="3">Section 3</option>
                  <option value="4">Section 4</option>
                  <option value="5">Section 5</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Which numbered section shows the Effect Maya has on Others?</label>
                <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option>Select section number...</option>
                  <option value="1">Section 1</option>
                  <option value="2">Section 2</option>
                  <option value="3">Section 3</option>
                  <option value="4">Section 4</option>
                  <option value="5">Section 5</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Which numbered section shows Maya's Actions?</label>
                <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option>Select section number...</option>
                  <option value="1">Section 1</option>
                  <option value="2">Section 2</option>
                  <option value="3">Section 3</option>
                  <option value="4">Section 4</option>
                  <option value="5">Section 5</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Which numbered section shows Maya's Looks?</label>
                <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option>Select section number...</option>
                  <option value="1">Section 1</option>
                  <option value="2">Section 2</option>
                  <option value="3">Section 3</option>
                  <option value="4">Section 4</option>
                  <option value="5">Section 5</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">What character traits do these details reveal about Maya?</label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input id="trait1" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="trait1" className="ml-2 block text-sm text-gray-700">Confident</label>
                  </div>
                  <div className="flex items-center">
                    <input id="trait2" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="trait2" className="ml-2 block text-sm text-gray-700">Compassionate</label>
                  </div>
                  <div className="flex items-center">
                    <input id="trait3" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="trait3" className="ml-2 block text-sm text-gray-700">Politically aware</label>
                  </div>
                  <div className="flex items-center">
                    <input id="trait4" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="trait4" className="ml-2 block text-sm text-gray-700">Insecure but determined</label>
                  </div>
                  <div className="flex items-center">
                    <input id="trait5" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="trait5" className="ml-2 block text-sm text-gray-700">Respected by some, controversial to others</label>
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
            <h4 className="font-medium text-green-800">Activity 2: Character Development Techniques</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              For each character trait below, write a sentence using the specified STEAL technique to reveal that trait.
            </p>
            
            <div className="space-y-6">
              <div>
                <p className="text-gray-700 mb-2">1. Character trait: <span className="font-medium">Determined</span></p>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Using Speech:</label>
                  <textarea
                    rows={2}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Write a sentence showing determination through what the character says..."
                  ></textarea>
                </div>
              </div>
              
              <div>
                <p className="text-gray-700 mb-2">2. Character trait: <span className="font-medium">Nervous</span></p>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Using Thoughts:</label>
                  <textarea
                    rows={2}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Write a sentence showing nervousness through the character's inner thoughts..."
                  ></textarea>
                </div>
              </div>
              
              <div>
                <p className="text-gray-700 mb-2">3. Character trait: <span className="font-medium">Respected</span></p>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Using Effect on Others:</label>
                  <textarea
                    rows={2}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Write a sentence showing respect through how others react to the character..."
                  ></textarea>
                </div>
              </div>
              
              <div>
                <p className="text-gray-700 mb-2">4. Character trait: <span className="font-medium">Kind</span></p>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Using Actions:</label>
                  <textarea
                    rows={2}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Write a sentence showing kindness through what the character does..."
                  ></textarea>
                </div>
              </div>
              
              <div>
                <p className="text-gray-700 mb-2">5. Character trait: <span className="font-medium">Creative</span></p>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Using Looks:</label>
                  <textarea
                    rows={2}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Write a sentence showing creativity through the character's appearance..."
                  ></textarea>
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
          <div className="bg-purple-50 px-4 py-2">
            <h4 className="font-medium text-purple-800">Activity 3: Create a Character Profile</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Create a detailed character profile using the STEAL method. This character could be used in your creative writing for the NSW Selective exam.
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Character Name:</label>
                <input
                  type="text"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Enter your character's name..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Character Age:</label>
                <input
                  type="text"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Enter your character's age..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-blue-800 mb-1">Speech (How they talk, what they say):</label>
                <textarea
                  rows={3}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Describe how your character speaks, their word choice, accent, or speech patterns..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-green-800 mb-1">Thoughts (Inner monologue, hopes, fears):</label>
                <textarea
                  rows={3}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Describe your character's inner thoughts, what they worry about, hope for..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-purple-800 mb-1">Effect on Others (How people react to them):</label>
                <textarea
                  rows={3}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Describe how other people typically respond to your character..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-red-800 mb-1">Actions (What they do, behaviors, habits):</label>
                <textarea
                  rows={3}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Describe typical actions, behaviors, or habits of your character..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-yellow-800 mb-1">Looks (Physical appearance, clothing, mannerisms):</label>
                <textarea
                  rows={3}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Describe your character's physical appearance, clothing style, and mannerisms..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Key Character Traits (List 3-5 main traits):</label>
                <textarea
                  rows={2}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="List 3-5 key traits that define your character..."
                ></textarea>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save Character Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-red-50 px-4 py-2">
            <h4 className="font-medium text-red-800">Activity 4: Write a Character Introduction</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Using the character profile you created in Activity 3, write a paragraph that introduces your character to readers. Try to incorporate at least three aspects of the STEAL method.
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Character Introduction:</label>
                <textarea
                  rows={8}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Write a paragraph introducing your character..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">STEAL elements used (check all that apply):</label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                  <div className="flex items-center">
                    <input id="speech" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="speech" className="ml-2 block text-sm text-gray-700">Speech</label>
                  </div>
                  <div className="flex items-center">
                    <input id="thoughts" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="thoughts" className="ml-2 block text-sm text-gray-700">Thoughts</label>
                  </div>
                  <div className="flex items-center">
                    <input id="effect" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="effect" className="ml-2 block text-sm text-gray-700">Effect on Others</label>
                  </div>
                  <div className="flex items-center">
                    <input id="actions" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="actions" className="ml-2 block text-sm text-gray-700">Actions</label>
                  </div>
                  <div className="flex items-center">
                    <input id="looks" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="looks" className="ml-2 block text-sm text-gray-700">Looks</label>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Self-Assessment:</label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input id="check1" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="check1" className="ml-2 block text-sm text-gray-700">My character feels unique and original (not a stereotype).</label>
                  </div>
                  <div className="flex items-center">
                    <input id="check2" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="check2" className="ml-2 block text-sm text-gray-700">I used specific details rather than general descriptions.</label>
                  </div>
                  <div className="flex items-center">
                    <input id="check3" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="check3" className="ml-2 block text-sm text-gray-700">I showed character traits through multiple STEAL elements.</label>
                  </div>
                  <div className="flex items-center">
                    <input id="check4" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="check4" className="ml-2 block text-sm text-gray-700">My character has both strengths and flaws (complexity).</label>
                  </div>
                  <div className="flex items-center">
                    <input id="check5" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="check5" className="ml-2 block text-sm text-gray-700">I used descriptive language to make my character memorable.</label>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Submit Character Introduction
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
