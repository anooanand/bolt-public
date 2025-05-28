import React from 'react';

export function ActivitiesTab() {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Interactive Activities</h3>
      
      <div className="bg-indigo-50 p-4 rounded-lg mb-6">
        <p className="text-gray-700">
          Complete these interactive activities to reinforce your understanding of dialogue writing. These exercises will help you create realistic, engaging dialogue for your creative writing in the NSW Selective exam.
        </p>
      </div>
      
      <div className="space-y-8">
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-blue-50 px-4 py-2">
            <h4 className="font-medium text-blue-800">Activity 1: Identify Dialogue Elements</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Read the dialogue excerpt below and identify the different elements of effective dialogue.
            </p>
            
            <div className="border p-3 rounded-lg mb-4 bg-gray-50">
              <p className="text-gray-700">
                (1) "You can't seriously be thinking of going in there," Mei whispered, grabbing Alex's arm. (2) Her eyes darted toward the abandoned building.
                
                (3) Alex shrugged off her hand. (4) "Someone has to find out what happened to Jake."
                
                (5) "But the police said—"
                
                (6) "I don't care what they said!" (7) Alex kicked at a loose stone, sending it skittering across the pavement. (8) "They've given up. It's been three weeks."
                
                (9) Mei sighed and adjusted her backpack. (10) "Fine. But if we die, I'm going to be really annoyed with you."
                
                (11) "That's the spirit," Alex replied with a grim smile, pulling a flashlight from his pocket. (12) "Ready?"
                
                (13) "No," she muttered. (14) "Let's go anyway."
              </p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Which numbered sections are dialogue tags? (Select all that apply)</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  <div className="flex items-center">
                    <input id="tag1" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="tag1" className="ml-2 block text-sm text-gray-700">(1)</label>
                  </div>
                  <div className="flex items-center">
                    <input id="tag4" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="tag4" className="ml-2 block text-sm text-gray-700">(4)</label>
                  </div>
                  <div className="flex items-center">
                    <input id="tag11" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="tag11" className="ml-2 block text-sm text-gray-700">(11)</label>
                  </div>
                  <div className="flex items-center">
                    <input id="tag13" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="tag13" className="ml-2 block text-sm text-gray-700">(13)</label>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Which numbered sections are action beats? (Select all that apply)</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  <div className="flex items-center">
                    <input id="beat2" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="beat2" className="ml-2 block text-sm text-gray-700">(2)</label>
                  </div>
                  <div className="flex items-center">
                    <input id="beat3" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="beat3" className="ml-2 block text-sm text-gray-700">(3)</label>
                  </div>
                  <div className="flex items-center">
                    <input id="beat7" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="beat7" className="ml-2 block text-sm text-gray-700">(7)</label>
                  </div>
                  <div className="flex items-center">
                    <input id="beat9" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="beat9" className="ml-2 block text-sm text-gray-700">(9)</label>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">What purpose does the dialogue serve in this excerpt?</label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input id="purpose1" name="purpose" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="purpose1" className="ml-2 block text-sm text-gray-700">Mainly to provide background information</label>
                  </div>
                  <div className="flex items-center">
                    <input id="purpose2" name="purpose" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="purpose2" className="ml-2 block text-sm text-gray-700">Mainly to create conflict between characters</label>
                  </div>
                  <div className="flex items-center">
                    <input id="purpose3" name="purpose" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="purpose3" className="ml-2 block text-sm text-gray-700">Mainly to advance the plot and reveal character traits</label>
                  </div>
                  <div className="flex items-center">
                    <input id="purpose4" name="purpose" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="purpose4" className="ml-2 block text-sm text-gray-700">Mainly to describe the setting</label>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">What character traits are revealed through the dialogue?</label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input id="trait1" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="trait1" className="ml-2 block text-sm text-gray-700">Alex is determined and possibly reckless</label>
                  </div>
                  <div className="flex items-center">
                    <input id="trait2" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="trait2" className="ml-2 block text-sm text-gray-700">Mei is cautious but loyal</label>
                  </div>
                  <div className="flex items-center">
                    <input id="trait3" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="trait3" className="ml-2 block text-sm text-gray-700">Mei has a sarcastic sense of humor</label>
                  </div>
                  <div className="flex items-center">
                    <input id="trait4" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="trait4" className="ml-2 block text-sm text-gray-700">Alex is frustrated with authorities</label>
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
            <h4 className="font-medium text-green-800">Activity 2: Fix Dialogue Formatting</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Each dialogue example below contains formatting errors. Rewrite each example with correct punctuation and formatting.
            </p>
            
            <div className="space-y-6">
              <div>
                <p className="text-gray-700 mb-2">1. <span className="font-medium">I don't think that's a good idea she said as she closed the door.</span></p>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Corrected version:</label>
                  <textarea
                    rows={2}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Rewrite with correct punctuation and formatting..."
                  ></textarea>
                </div>
              </div>
              
              <div>
                <p className="text-gray-700 mb-2">2. <span className="font-medium">"Where are you going" asked Tom "The party doesn't start until eight."</span></p>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Corrected version:</label>
                  <textarea
                    rows={2}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Rewrite with correct punctuation and formatting..."
                  ></textarea>
                </div>
              </div>
              
              <div>
                <p className="text-gray-700 mb-2">3. <span className="font-medium">Sarah exclaimed "I can't believe we won" She jumped up and down with excitement "This is amazing!"</span></p>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Corrected version:</label>
                  <textarea
                    rows={2}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Rewrite with correct punctuation and formatting..."
                  ></textarea>
                </div>
              </div>
              
              <div>
                <p className="text-gray-700 mb-2">4. <span className="font-medium">"Do you know the way to the library." "Yes, it's down that street" replied the stranger "Take a left at the traffic lights."</span></p>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Corrected version:</label>
                  <textarea
                    rows={2}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Rewrite with correct punctuation and formatting..."
                  ></textarea>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Check Corrections
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-purple-50 px-4 py-2">
            <h4 className="font-medium text-purple-800">Activity 3: Create Distinct Character Voices</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Write dialogue for each character based on their description. Make sure each character has a distinct voice that reflects their personality.
            </p>
            
            <div className="space-y-6">
              <div>
                <h5 className="font-medium text-gray-800 mb-2">Scenario: A group of students discussing a difficult exam they just completed</h5>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-700 mb-2">Character 1: <span className="font-medium">A confident, top student who studies hard</span></p>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Write a line of dialogue:</label>
                      <textarea
                        rows={2}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Write dialogue that reflects this character's personality..."
                      ></textarea>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-gray-700 mb-2">Character 2: <span className="font-medium">A nervous, anxious student who doubts themselves</span></p>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Write a line of dialogue:</label>
                      <textarea
                        rows={2}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Write dialogue that reflects this character's personality..."
                      ></textarea>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-gray-700 mb-2">Character 3: <span className="font-medium">A laid-back student who didn't study much</span></p>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Write a line of dialogue:</label>
                      <textarea
                        rows={2}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Write dialogue that reflects this character's personality..."
                      ></textarea>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-gray-700 mb-2">Character 4: <span className="font-medium">An encouraging, optimistic friend</span></p>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Write a line of dialogue:</label>
                      <textarea
                        rows={2}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Write dialogue that reflects this character's personality..."
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h5 className="font-medium text-gray-800 mb-2">Now write a short conversation between these four characters:</h5>
                <textarea
                  rows={8}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Write a conversation that maintains each character's distinct voice..."
                ></textarea>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Submit Dialogue
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-red-50 px-4 py-2">
            <h4 className="font-medium text-red-800">Activity 4: Create a Scene with Purposeful Dialogue</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Write a scene with dialogue that reveals character traits and advances the plot. Choose one of the scenarios below.
            </p>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Choose a scenario:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="flex items-center">
                  <input id="scenario1" name="scenario" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="scenario1" className="ml-2 block text-sm text-gray-700">Two friends discover something unexpected while exploring an abandoned building</label>
                </div>
                <div className="flex items-center">
                  <input id="scenario2" name="scenario" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="scenario2" className="ml-2 block text-sm text-gray-700">A student must convince a teacher to extend an important deadline</label>
                </div>
                <div className="flex items-center">
                  <input id="scenario3" name="scenario" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="scenario3" className="ml-2 block text-sm text-gray-700">Two siblings argue over a family heirloom</label>
                </div>
                <div className="flex items-center">
                  <input id="scenario4" name="scenario" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="scenario4" className="ml-2 block text-sm text-gray-700">A newcomer tries to make friends on their first day at a new school</label>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your scene (include at least two characters):</label>
                <textarea
                  rows={12}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Write your scene with dialogue here..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Self-Assessment:</label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input id="check1" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="check1" className="ml-2 block text-sm text-gray-700">My dialogue reveals character traits.</label>
                  </div>
                  <div className="flex items-center">
                    <input id="check2" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="check2" className="ml-2 block text-sm text-gray-700">My dialogue advances the plot.</label>
                  </div>
                  <div className="flex items-center">
                    <input id="check3" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="check3" className="ml-2 block text-sm text-gray-700">Each character has a distinct voice.</label>
                  </div>
                  <div className="flex items-center">
                    <input id="check4" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="check4" className="ml-2 block text-sm text-gray-700">I used action beats to break up dialogue.</label>
                  </div>
                  <div className="flex items-center">
                    <input id="check5" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="check5" className="ml-2 block text-sm text-gray-700">My punctuation and formatting are correct.</label>
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
