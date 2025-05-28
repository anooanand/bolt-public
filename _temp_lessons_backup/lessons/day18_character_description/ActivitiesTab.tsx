import React from 'react';

export function ActivitiesTab() {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Interactive Activities</h3>
      
      <div className="bg-indigo-50 p-4 rounded-lg mb-6">
        <p className="text-gray-700">
          Complete these interactive activities to practice creating detailed, compelling character descriptions that bring your stories to life in the NSW Selective exam.
        </p>
      </div>
      
      <div className="space-y-8">
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-blue-50 px-4 py-2">
            <h4 className="font-medium text-blue-800">Activity 1: Analyze Character Descriptions</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Read the following character description and identify the elements that make it effective.
            </p>
            
            <div className="border p-3 rounded-lg mb-4 bg-gray-50">
              <p className="text-gray-700">
                Mrs. Abernathy arrived precisely three minutes early, as she always did. Her silver hair was coiled into a perfect bun, not a strand out of place, secured with two pearl-tipped pins that had belonged to her mother. She wore a crisp navy dress with a white lace collar, pressed to perfection, the fabric so immaculate it might have been purchased that morning rather than fifteen years ago. Her arthritis-gnarled fingers clutched a weathered leather handbag against her chest like a shield, her knuckles whitening whenever anyone stepped too close. "Good afternoon," she announced rather than greeted, her voice clipped and precise as a metronome, each syllable enunciated with the care of a former elocution teacher. When offered a seat, she perched at the very edge of the chair, spine rigid, ankles crossed and tucked to one side as though she'd been photographed that way since 1952. Throughout the meeting, she removed her gold-rimmed spectacles exactly seven times, polishing them with a monogrammed handkerchief before repositioning them on her narrow nose and fixing her listener with a gaze that had intimidated generations of schoolchildren into proper grammar.
              </p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Identify elements of physical appearance in this description:</label>
                <textarea
                  rows={3}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="List examples of physical appearance details..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Identify body language and mannerisms in this description:</label>
                <textarea
                  rows={3}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="List examples of body language and mannerisms..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Identify clothing and possessions in this description:</label>
                <textarea
                  rows={3}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="List examples of clothing and possessions..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Identify voice and speech patterns in this description:</label>
                <textarea
                  rows={3}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="List examples of voice and speech patterns..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">What personality traits are revealed through this description?</label>
                <textarea
                  rows={3}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Describe the character's personality traits and how they are shown..."
                ></textarea>
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
            <h4 className="font-medium text-green-800">Activity 2: Match Character Traits to Descriptions</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Match each character trait with the description that best illustrates it.
            </p>
            
            <div className="space-y-6">
              <div>
                <p className="text-gray-700 mb-2">1. Nervous/Anxious:</p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input id="trait1a" name="trait1" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="trait1a" className="ml-2 block text-sm text-gray-700">A. Marcus strode into the room, shoulders back and chin raised. He made direct eye contact with each person at the table before taking his seat at the head, spreading his documents with practiced precision.</label>
                  </div>
                  <div className="flex items-center">
                    <input id="trait1b" name="trait1" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="trait1b" className="ml-2 block text-sm text-gray-700">B. Sophia's fingers fluttered from her hair to her collar to the hem of her shirt, never still for more than a moment. She cleared her throat repeatedly as she spoke, her eyes darting around the room, never settling on any one face for long.</label>
                  </div>
                  <div className="flex items-center">
                    <input id="trait1c" name="trait1" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="trait1c" className="ml-2 block text-sm text-gray-700">C. Raj leaned back in his chair, legs stretched out and crossed at the ankles. A lazy smile played across his face as he watched the others debate, occasionally offering a drawled comment that somehow cut straight to the heart of the matter.</label>
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-gray-700 mb-2">2. Arrogant/Proud:</p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input id="trait2a" name="trait2" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="trait2a" className="ml-2 block text-sm text-gray-700">A. Elena's designer clothes bore prominent logos, and she made a show of checking her expensive watch every few minutes. When others spoke, she would sigh audibly, scrolling through her phone until it was her turn to speak, at which point she would talk over anyone who tried to interject.</label>
                  </div>
                  <div className="flex items-center">
                    <input id="trait2b" name="trait2" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="trait2b" className="ml-2 block text-sm text-gray-700">B. Despite the formal occasion, Tom wore a faded t-shirt with a small hole near the collar. He hunched slightly, hands shoved deep in his pockets, mumbling responses when directly addressed and quickly shifting the conversation away from himself.</label>
                  </div>
                  <div className="flex items-center">
                    <input id="trait2c" name="trait2" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="trait2c" className="ml-2 block text-sm text-gray-700">C. Mrs. Wilson listened intently to each student's presentation, her head tilted slightly, nodding encouragement when they faltered. Her eyes crinkled with genuine interest, and she jotted notes on areas where she could offer help later.</label>
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-gray-700 mb-2">3. Kind/Compassionate:</p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input id="trait3a" name="trait3" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="trait3a" className="ml-2 block text-sm text-gray-700">A. When the new student dropped her books, Jackson continued walking, pretending not to notice as papers scattered across the hallway. Later, he recounted the story to his friends with a smirk, mimicking her panicked expression.</label>
                  </div>
                  <div className="flex items-center">
                    <input id="trait3b" name="trait3" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="trait3b" className="ml-2 block text-sm text-gray-700">B. Mr. Chen kept a drawer of granola bars in his desk for students who came to school hungry. He never drew attention to it, simply sliding one across the table during morning check-ins with a casual comment about having too many. His worn sweater had patches on the elbows, but his students' art projects were framed in quality materials on his walls.</label>
                  </div>
                  <div className="flex items-center">
                    <input id="trait3c" name="trait3" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="trait3c" className="ml-2 block text-sm text-gray-700">C. Alicia calculated exactly how much each person owed for the shared meal, down to the cent, including a precisely divided portion of the tax. She reminded everyone of their debts daily until paid, keeping a spreadsheet on her phone of who owed what.</label>
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
          <div className="bg-purple-50 px-4 py-2">
            <h4 className="font-medium text-purple-800">Activity 3: Transform Basic Character Descriptions</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Transform each basic character description into a vivid one by adding physical details, mannerisms, clothing, speech patterns, and actions that reveal personality.
            </p>
            
            <div className="space-y-6">
              <div>
                <p className="text-gray-700 mb-2">1. Basic description: <span className="font-medium">"The teacher was strict."</span></p>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your vivid character description:</label>
                  <textarea
                    rows={5}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Transform this into a vivid character description..."
                  ></textarea>
                </div>
                <div className="mt-2">
                  <label className="block text-xs text-gray-500 mb-1">Identify the techniques you used (select all that apply):</label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center">
                      <input id="tech1-1" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="tech1-1" className="ml-2 block text-xs text-gray-700">Physical Appearance</label>
                    </div>
                    <div className="flex items-center">
                      <input id="tech1-2" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="tech1-2" className="ml-2 block text-xs text-gray-700">Body Language & Mannerisms</label>
                    </div>
                    <div className="flex items-center">
                      <input id="tech1-3" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="tech1-3" className="ml-2 block text-xs text-gray-700">Clothing & Possessions</label>
                    </div>
                    <div className="flex items-center">
                      <input id="tech1-4" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="tech1-4" className="ml-2 block text-xs text-gray-700">Voice & Speech Patterns</label>
                    </div>
                    <div className="flex items-center">
                      <input id="tech1-5" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="tech1-5" className="ml-2 block text-xs text-gray-700">Actions & Reactions</label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-gray-700 mb-2">2. Basic description: <span className="font-medium">"The boy was shy."</span></p>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your vivid character description:</label>
                  <textarea
                    rows={5}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Transform this into a vivid character description..."
                  ></textarea>
                </div>
                <div className="mt-2">
                  <label className="block text-xs text-gray-500 mb-1">Identify the techniques you used (select all that apply):</label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center">
                      <input id="tech2-1" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="tech2-1" className="ml-2 block text-xs text-gray-700">Physical Appearance</label>
                    </div>
                    <div className="flex items-center">
                      <input id="tech2-2" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="tech2-2" className="ml-2 block text-xs text-gray-700">Body Language & Mannerisms</label>
                    </div>
                    <div className="flex items-center">
                      <input id="tech2-3" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="tech2-3" className="ml-2 block text-xs text-gray-700">Clothing & Possessions</label>
                    </div>
                    <div className="flex items-center">
                      <input id="tech2-4" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="tech2-4" className="ml-2 block text-xs text-gray-700">Voice & Speech Patterns</label>
                    </div>
                    <div className="flex items-center">
                      <input id="tech2-5" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="tech2-5" className="ml-2 block text-xs text-gray-700">Actions & Reactions</label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Submit Descriptions
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-red-50 px-4 py-2">
            <h4 className="font-medium text-red-800">Activity 4: Create a Character Description</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Write a detailed character description that reveals personality through physical appearance, mannerisms, clothing, speech, and actions.
            </p>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Choose a character type to describe:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="flex items-center">
                  <input id="char1" name="character" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="char1" className="ml-2 block text-sm text-gray-700">A confident leader</label>
                </div>
                <div className="flex items-center">
                  <input id="char2" name="character" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="char2" className="ml-2 block text-sm text-gray-700">A mysterious stranger</label>
                </div>
                <div className="flex items-center">
                  <input id="char3" name="character" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="char3" className="ml-2 block text-sm text-gray-700">A kind but eccentric person</label>
                </div>
                <div className="flex items-center">
                  <input id="char4" name="character" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="char4" className="ml-2 block text-sm text-gray-700">Your own choice:</label>
                  <input type="text" className="ml-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="Enter a character type..." />
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Planning your character:</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Age and gender:</label>
                    <input type="text" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Occupation or role:</label>
                    <input type="text" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Three main personality traits:</label>
                    <input type="text" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">One secret or hidden aspect:</label>
                    <input type="text" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your character description:</label>
                <textarea
                  rows={10}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Write your detailed character description here..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Self-Assessment Checklist:</label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input id="check1" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="check1" className="ml-2 block text-sm text-gray-700">I included distinctive physical appearance details that reveal personality.</label>
                  </div>
                  <div className="flex items-center">
                    <input id="check2" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="check2" className="ml-2 block text-sm text-gray-700">I described body language and mannerisms that show character traits.</label>
                  </div>
                  <div className="flex items-center">
                    <input id="check3" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="check3" className="ml-2 block text-sm text-gray-700">I included clothing and/or possessions that reveal status, values, or background.</label>
                  </div>
                  <div className="flex items-center">
                    <input id="check4" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="check4" className="ml-2 block text-sm text-gray-700">I described the character's voice and speech patterns.</label>
                  </div>
                  <div className="flex items-center">
                    <input id="check5" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="check5" className="ml-2 block text-sm text-gray-700">I showed the character's actions or reactions in a specific situation.</label>
                  </div>
                  <div className="flex items-center">
                    <input id="check6" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="check6" className="ml-2 block text-sm text-gray-700">I used specific, concrete details rather than vague generalizations.</label>
                  </div>
                  <div className="flex items-center">
                    <input id="check7" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    <label htmlFor="check7" className="ml-2 block text-sm text-gray-700">I used figurative language (simile, metaphor) to enhance my description.</label>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Submit Description
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
