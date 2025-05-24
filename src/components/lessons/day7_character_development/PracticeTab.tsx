import React from 'react';

export function PracticeTab() {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Practice Task: Creating Compelling Characters</h3>
      
      <div className="bg-indigo-50 p-4 rounded-lg mb-6">
        <p className="text-gray-700">
          Now it's time to apply what you've learned about character development! In this practice task, you'll analyze character development in example passages and create your own compelling character using the STEAL method.
        </p>
      </div>
      
      <div className="space-y-6">
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-blue-50 px-4 py-3">
            <h4 className="font-medium text-blue-800">Part 1: Identify Character Development Techniques</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Read the passage below and identify which sentences demonstrate each element of the STEAL method.
            </p>
            
            <div className="border p-4 rounded-lg mb-4 bg-gray-50">
              <p className="text-gray-800 mb-2">
                [1] "I don't need anyone's help," Zara insisted, though her voice trembled slightly. [2] She tucked a strand of her frizzy red hair behind her ear and adjusted the worn backpack that hung from her narrow shoulders. [3] Despite her confident words, Zara wondered if she could really handle the science project alone, especially after failing the last test. [4] When she entered the classroom, several students whispered and pointed in her direction, while others simply looked away. [5] After class, Zara stayed behind to help clean the lab equipment, meticulously organizing each beaker and test tube even though no one had asked her to.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Which sentence demonstrates Speech (S)?</p>
                <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option>Select...</option>
                  <option>Sentence [1]</option>
                  <option>Sentence [2]</option>
                  <option>Sentence [3]</option>
                  <option>Sentence [4]</option>
                  <option>Sentence [5]</option>
                </select>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Which sentence demonstrates Thoughts (T)?</p>
                <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option>Select...</option>
                  <option>Sentence [1]</option>
                  <option>Sentence [2]</option>
                  <option>Sentence [3]</option>
                  <option>Sentence [4]</option>
                  <option>Sentence [5]</option>
                </select>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Which sentence demonstrates Effect on Others (E)?</p>
                <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option>Select...</option>
                  <option>Sentence [1]</option>
                  <option>Sentence [2]</option>
                  <option>Sentence [3]</option>
                  <option>Sentence [4]</option>
                  <option>Sentence [5]</option>
                </select>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Which sentence demonstrates Actions (A)?</p>
                <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option>Select...</option>
                  <option>Sentence [1]</option>
                  <option>Sentence [2]</option>
                  <option>Sentence [3]</option>
                  <option>Sentence [4]</option>
                  <option>Sentence [5]</option>
                </select>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Which sentence demonstrates Looks (L)?</p>
                <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option>Select...</option>
                  <option>Sentence [1]</option>
                  <option>Sentence [2]</option>
                  <option>Sentence [3]</option>
                  <option>Sentence [4]</option>
                  <option>Sentence [5]</option>
                </select>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">What personality traits does this passage reveal about Zara?</p>
                <textarea
                  rows={3}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Describe Zara's personality based on the passage..."
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-green-50 px-4 py-3">
            <h4 className="font-medium text-green-800">Part 2: Create a Character Profile</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Create a detailed character profile using the STEAL method. This character could be used in a story for the NSW Selective exam.
            </p>
            
            <div className="space-y-4">
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Basic Information:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Character Name:</label>
                    <input
                      type="text"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Age:</label>
                    <input
                      type="text"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Age"
                    />
                  </div>
                </div>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Speech (S):</p>
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">How does your character talk?</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Describe their speech patterns, word choice, accent, etc."
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Example dialogue:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Write a line of dialogue that your character might say"
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Thoughts (T):</p>
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">What does your character think about?</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Describe their inner thoughts, hopes, fears, motivations"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Example inner monologue:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Write a thought that might go through your character's mind"
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Effect on Others (E):</p>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">How do others react to your character?</label>
                  <textarea
                    rows={3}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Describe how other people typically respond to your character"
                  ></textarea>
                </div>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Actions (A):</p>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">What does your character do?</label>
                  <textarea
                    rows={3}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Describe typical behaviors, habits, and decisions your character makes"
                  ></textarea>
                </div>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Looks (L):</p>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">What does your character look like?</label>
                  <textarea
                    rows={3}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Describe physical appearance, clothing, and mannerisms"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-purple-50 px-4 py-3">
            <h4 className="font-medium text-purple-800">Part 3: Write a Character Introduction</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Using your character profile from Part 2, write a paragraph that introduces your character to readers. Try to incorporate at least three elements of the STEAL method.
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
              
              <div className="border p-3 rounded-lg">
                <p className="text-sm font-medium text-gray-700 mb-2">Self-assessment:</p>
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Which STEAL elements did you include? (Check all that apply)</label>
                    <div className="space-y-1">
                      <div className="flex items-center">
                        <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                        <label className="ml-2 block text-sm text-gray-700">Speech (S)</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                        <label className="ml-2 block text-sm text-gray-700">Thoughts (T)</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                        <label className="ml-2 block text-sm text-gray-700">Effect on Others (E)</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                        <label className="ml-2 block text-sm text-gray-700">Actions (A)</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                        <label className="ml-2 block text-sm text-gray-700">Looks (L)</label>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">How well do you think your character introduction reveals personality?</label>
                    <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                      <option>Select...</option>
                      <option>Very well - the character feels real and three-dimensional</option>
                      <option>Well - the character has some depth but could be developed further</option>
                      <option>Somewhat - basic traits are shown but need more detail</option>
                      <option>Needs improvement - the character feels flat or stereotypical</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">How could you improve your character development?</label>
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
