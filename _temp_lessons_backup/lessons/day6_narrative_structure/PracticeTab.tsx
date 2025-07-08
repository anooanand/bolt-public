import React from 'react';

export function PracticeTab() {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Practice Task: Creating a Structured Narrative</h3>
      
      <div className="bg-indigo-50 p-4 rounded-lg mb-6">
        <p className="text-gray-700">
          Now it's time to apply what you've learned about narrative structure! In this practice task, you'll identify narrative elements in an example story and then plan and write the beginning of your own structured narrative.
        </p>
      </div>
      
      <div className="space-y-6">
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-blue-50 px-4 py-3">
            <h4 className="font-medium text-blue-800">Part 1: Identify Narrative Elements</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Read the short story below and identify which paragraphs represent each of the five narrative elements.
            </p>
            
            <div className="border p-4 rounded-lg mb-4 bg-gray-50">
              <p className="text-gray-800 mb-2">
                [1] Max clutched his science project tightly as he walked into the school gymnasium. The annual Science Fair was the biggest event of the year, and as a new student, he was desperate to make an impression. His solar-powered water purifier had taken weeks to perfect.
              </p>
              <p className="text-gray-800 mb-2">
                [2] As he set up his display, Max noticed Tyler, the school's science champion for three years running, glaring at him from across the room. Throughout the morning, several mishaps occurred. Max's display board kept falling over, and his carefully prepared handouts mysteriously disappeared. Later, he discovered that someone had tampered with his project's wiring.
              </p>
              <p className="text-gray-800 mb-2">
                [3] When the judges reached Max's table, disaster struck. As he flipped the switch to demonstrate his purifier, there was a loud pop and a puff of smoke. The judges frowned and moved on while laughter erupted from Tyler's direction. In desperation, Max pulled apart his project and discovered a crossed wire that couldn't have been accidental.
              </p>
              <p className="text-gray-800 mb-2">
                [4] With only fifteen minutes before final judging, Max frantically rewired his project. He called out to Tyler, asking to borrow a screwdriver. Surprised, Tyler brought it over. "I know it was you," Max whispered, "but I still need your help." Red-faced, Tyler stayed and helped Max repair the damage he had caused.
              </p>
              <p className="text-gray-800">
                [5] When the judges returned, Max and Tyler together demonstrated how the purifier worked. Max won second place, while Tyler's project took first. At the award ceremony, Tyler publicly apologized for his sabotage. By the next Science Fair, they had created a joint project that revolutionized the school's recycling system—and formed an unlikely friendship.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Which paragraph represents the Exposition?</p>
                <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option>Select...</option>
                  <option>Paragraph [1]</option>
                  <option>Paragraph [2]</option>
                  <option>Paragraph [3]</option>
                  <option>Paragraph [4]</option>
                  <option>Paragraph [5]</option>
                </select>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Which paragraph represents the Rising Action?</p>
                <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option>Select...</option>
                  <option>Paragraph [1]</option>
                  <option>Paragraph [2]</option>
                  <option>Paragraph [3]</option>
                  <option>Paragraph [4]</option>
                  <option>Paragraph [5]</option>
                </select>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Which paragraph represents the Climax?</p>
                <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option>Select...</option>
                  <option>Paragraph [1]</option>
                  <option>Paragraph [2]</option>
                  <option>Paragraph [3]</option>
                  <option>Paragraph [4]</option>
                  <option>Paragraph [5]</option>
                </select>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Which paragraph represents the Falling Action?</p>
                <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option>Select...</option>
                  <option>Paragraph [1]</option>
                  <option>Paragraph [2]</option>
                  <option>Paragraph [3]</option>
                  <option>Paragraph [4]</option>
                  <option>Paragraph [5]</option>
                </select>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Which paragraph represents the Resolution?</p>
                <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option>Select...</option>
                  <option>Paragraph [1]</option>
                  <option>Paragraph [2]</option>
                  <option>Paragraph [3]</option>
                  <option>Paragraph [4]</option>
                  <option>Paragraph [5]</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-green-50 px-4 py-3">
            <h4 className="font-medium text-green-800">Part 2: Plan Your Narrative</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Plan a short story using the five-element narrative structure. Choose one of the following prompts:
            </p>
            
            <div className="bg-gray-50 p-3 rounded-lg mb-4">
              <ul className="list-disc pl-5 text-gray-700">
                <li>A student discovers a hidden talent during a school competition</li>
                <li>A misunderstanding between friends leads to an unexpected adventure</li>
                <li>A character finds a mysterious object that changes their life</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Selected Prompt:</label>
                <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option>Select a prompt...</option>
                  <option>A student discovers a hidden talent during a school competition</option>
                  <option>A misunderstanding between friends leads to an unexpected adventure</option>
                  <option>A character finds a mysterious object that changes their life</option>
                </select>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Exposition (Introduction):</p>
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Characters:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Who are the main characters? Describe them briefly."
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Setting:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Where and when does the story take place?"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Initial Situation:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="What is happening at the beginning of the story?"
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Rising Action:</p>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Events that build tension:</label>
                  <textarea
                    rows={3}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="What complications or conflicts develop? List 2-3 events."
                  ></textarea>
                </div>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Climax:</p>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">The turning point:</label>
                  <textarea
                    rows={3}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="What is the moment of highest tension or the main turning point?"
                  ></textarea>
                </div>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Falling Action:</p>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Events after the climax:</label>
                  <textarea
                    rows={3}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="What happens as a result of the climax? How do characters react?"
                  ></textarea>
                </div>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Resolution:</p>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">How the story ends:</label>
                  <textarea
                    rows={3}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="How is the conflict resolved? What is the new normal for the characters?"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-purple-50 px-4 py-3">
            <h4 className="font-medium text-purple-800">Part 3: Write Your Narrative Beginning</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Using your plan from Part 2, write the beginning of your story (the exposition and the start of the rising action). Focus on introducing your characters, setting, and initial situation clearly.
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Story Beginning:</label>
                <textarea
                  rows={10}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Write the beginning of your story here..."
                ></textarea>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-sm font-medium text-gray-700 mb-2">Self-assessment:</p>
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">How well did you establish your exposition?</label>
                    <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                      <option>Select...</option>
                      <option>Very well - characters, setting, and situation are all clear</option>
                      <option>Well - most elements are clear but could add more detail</option>
                      <option>Somewhat - basic information is there but needs development</option>
                      <option>Needs improvement - missing key exposition elements</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">What was challenging about starting your narrative?</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">How would you continue the story in the next section?</label>
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
