import React from 'react';

export function PracticeTab() {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Practice Task: Character Description</h3>
      
      <div className="bg-indigo-50 p-4 rounded-lg mb-6">
        <p className="text-gray-700">
          Now it's time to apply what you've learned about character description! In this practice task, you'll analyze character descriptions, transform basic descriptions into vivid ones, and write your own detailed character description that reveals personality.
        </p>
      </div>
      
      <div className="space-y-6">
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-blue-50 px-4 py-3">
            <h4 className="font-medium text-blue-800">Part 1: Analyze Character Descriptions</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Read the following character description and identify the techniques used to create a vivid portrayal.
            </p>
            
            <div className="border p-4 rounded-lg mb-4 bg-gray-50">
              <p className="text-gray-800 italic">
                Mrs. Abernathy arrived precisely three minutes early, as she did for every appointment. Her silver hair was coiled into a tight bun that pulled the corners of her eyes slightly upward, giving her a perpetually suspicious expression. She wore a tweed skirt suit despite the summer heat, the fabric worn shiny at the elbows but impeccably clean. As she lowered herself into the chair, her movements were deliberate and efficient, like someone who had long ago decided that unnecessary motion was a waste of energy. From her handbag—a sturdy leather affair that had clearly outlasted several decades of fashion trends—she extracted a small notebook and a fountain pen that she unscrewed with practiced fingers. "Well then," she said, her voice crisp as autumn leaves, each word enunciated with the precision of someone who had spent forty years correcting children's grammar. "Shall we begin?" Her thin lips barely moved when she spoke, but her pale blue eyes missed nothing, cataloging every detail of the room as if conducting a silent inspection. When I failed to respond immediately, she tapped one finger against her notebook—tap, tap, tap—a metronome of impatience.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Identify elements of physical appearance:</p>
                <textarea
                  rows={3}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="What physical details are provided about Mrs. Abernathy? How do they reveal her personality?"
                ></textarea>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Identify body language and mannerisms:</p>
                <textarea
                  rows={3}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="What gestures, posture, or movements are described? What do they reveal about the character?"
                ></textarea>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Identify clothing and possessions:</p>
                <textarea
                  rows={3}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="What items does Mrs. Abernathy wear or carry? What do they suggest about her?"
                ></textarea>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Identify voice and speech patterns:</p>
                <textarea
                  rows={3}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="How is Mrs. Abernathy's way of speaking described? What does it reveal about her?"
                ></textarea>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Identify actions and reactions:</p>
                <textarea
                  rows={3}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="What does Mrs. Abernathy do in this passage? How does she react to the situation?"
                ></textarea>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">What personality traits are revealed through this description?</p>
                <textarea
                  rows={3}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="List at least three character traits and explain which details in the passage reveal them."
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-green-50 px-4 py-3">
            <h4 className="font-medium text-green-800">Part 2: Transform Basic Character Descriptions</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Transform these basic character descriptions into vivid, engaging ones using the techniques you've learned.
            </p>
            
            <div className="space-y-4">
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Basic description 1:</p>
                <div className="bg-gray-100 p-2 rounded mb-2">
                  <p className="text-gray-700 italic">The old man was kind and wise.</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-700">Your vivid character description (focus on physical appearance):</label>
                  <textarea
                    rows={5}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Transform this using distinctive physical features that reveal his kindness and wisdom..."
                  ></textarea>
                </div>
                <div className="mt-2 space-y-1">
                  <p className="text-sm text-gray-700">Elements included (check all that apply):</p>
                  <div className="flex flex-wrap gap-2">
                    <div className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                      <label className="ml-1 text-xs text-gray-700">Facial features</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                      <label className="ml-1 text-xs text-gray-700">Eyes</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                      <label className="ml-1 text-xs text-gray-700">Hair</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                      <label className="ml-1 text-xs text-gray-700">Hands</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                      <label className="ml-1 text-xs text-gray-700">Build/posture</label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Basic description 2:</p>
                <div className="bg-gray-100 p-2 rounded mb-2">
                  <p className="text-gray-700 italic">The teenager was nervous about the test.</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-700">Your vivid character description (focus on body language and mannerisms):</label>
                  <textarea
                    rows={5}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Transform this using gestures, posture, and movements that show nervousness..."
                  ></textarea>
                </div>
                <div className="mt-2 space-y-1">
                  <p className="text-sm text-gray-700">Elements included (check all that apply):</p>
                  <div className="flex flex-wrap gap-2">
                    <div className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                      <label className="ml-1 text-xs text-gray-700">Hand gestures</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                      <label className="ml-1 text-xs text-gray-700">Posture</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                      <label className="ml-1 text-xs text-gray-700">Facial expressions</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                      <label className="ml-1 text-xs text-gray-700">Repetitive habits</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                      <label className="ml-1 text-xs text-gray-700">Movement patterns</label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Basic description 3:</p>
                <div className="bg-gray-100 p-2 rounded mb-2">
                  <p className="text-gray-700 italic">The woman was wealthy and arrogant.</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-700">Your vivid character description (focus on clothing and possessions):</label>
                  <textarea
                    rows={5}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Transform this using clothing items and possessions that reveal wealth and arrogance..."
                  ></textarea>
                </div>
                <div className="mt-2 space-y-1">
                  <p className="text-sm text-gray-700">Elements included (check all that apply):</p>
                  <div className="flex flex-wrap gap-2">
                    <div className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                      <label className="ml-1 text-xs text-gray-700">Clothing</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                      <label className="ml-1 text-xs text-gray-700">Jewelry/accessories</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                      <label className="ml-1 text-xs text-gray-700">Personal items</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                      <label className="ml-1 text-xs text-gray-700">Brand names</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                      <label className="ml-1 text-xs text-gray-700">How items are used/treated</label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Basic description 4:</p>
                <div className="bg-gray-100 p-2 rounded mb-2">
                  <p className="text-gray-700 italic">The boy was shy and spoke quietly.</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-700">Your vivid character description (focus on voice and speech patterns):</label>
                  <textarea
                    rows={5}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Transform this with details about how the boy speaks..."
                  ></textarea>
                </div>
                <div className="mt-2 space-y-1">
                  <p className="text-sm text-gray-700">Elements included (check all that apply):</p>
                  <div className="flex flex-wrap gap-2">
                    <div className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                      <label className="ml-1 text-xs text-gray-700">Volume</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                      <label className="ml-1 text-xs text-gray-700">Pace/rhythm</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                      <label className="ml-1 text-xs text-gray-700">Tone/pitch</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                      <label className="ml-1 text-xs text-gray-700">Word choice/vocabulary</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                      <label className="ml-1 text-xs text-gray-700">Speech quirks/fillers</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-purple-50 px-4 py-3">
            <h4 className="font-medium text-purple-800">Part 3: Write a Detailed Character Description</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Write a detailed character description that reveals personality. Choose one of the following character types.
            </p>
            
            <div className="bg-gray-50 p-3 rounded-lg mb-4">
              <p className="text-gray-800 font-medium">Choose one character type:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                <div className="flex items-center">
                  <input type="radio" name="character" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300" />
                  <label className="ml-2 block text-sm text-gray-700">A determined athlete</label>
                </div>
                <div className="flex items-center">
                  <input type="radio" name="character" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300" />
                  <label className="ml-2 block text-sm text-gray-700">A mysterious new student</label>
                </div>
                <div className="flex items-center">
                  <input type="radio" name="character" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300" />
                  <label className="ml-2 block text-sm text-gray-700">An eccentric teacher</label>
                </div>
                <div className="flex items-center">
                  <input type="radio" name="character" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300" />
                  <label className="ml-2 block text-sm text-gray-700">A character with a secret</label>
                </div>
              </div>
              
              <p className="text-gray-800 font-medium mt-4">Choose three dominant personality traits for your character:</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                <div className="flex items-center">
                  <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                  <label className="ml-2 block text-sm text-gray-700">Ambitious</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                  <label className="ml-2 block text-sm text-gray-700">Anxious</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                  <label className="ml-2 block text-sm text-gray-700">Confident</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                  <label className="ml-2 block text-sm text-gray-700">Creative</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                  <label className="ml-2 block text-sm text-gray-700">Curious</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                  <label className="ml-2 block text-sm text-gray-700">Determined</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                  <label className="ml-2 block text-sm text-gray-700">Generous</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                  <label className="ml-2 block text-sm text-gray-700">Impatient</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                  <label className="ml-2 block text-sm text-gray-700">Intelligent</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                  <label className="ml-2 block text-sm text-gray-700">Mysterious</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                  <label className="ml-2 block text-sm text-gray-700">Rebellious</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                  <label className="ml-2 block text-sm text-gray-700">Shy</label>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Planning your character description:</p>
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm text-gray-700">Physical appearance details that reveal personality:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="List distinctive features that show your character's traits..."
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700">Body language and mannerisms:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="List gestures, posture, and movements that reveal personality..."
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700">Clothing and possessions:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="List items that reveal status, values, or background..."
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700">Voice and speech patterns:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Describe how your character speaks..."
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700">Actions and reactions:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Describe a situation and how your character behaves in it..."
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your character description:</label>
                <textarea
                  rows={12}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Write your detailed character description here, incorporating all five elements of effective character description..."
                ></textarea>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-sm font-medium text-gray-700 mb-2">Self-assessment:</p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                    <label className="ml-2 block text-sm text-gray-700">I included distinctive physical appearance details that reveal personality</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                    <label className="ml-2 block text-sm text-gray-700">I described body language and mannerisms that show character traits</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                    <label className="ml-2 block text-sm text-gray-700">I included clothing and possessions that reveal status, values, or background</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                    <label className="ml-2 block text-sm text-gray-700">I described voice and speech patterns that fit the character</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                    <label className="ml-2 block text-sm text-gray-700">I showed the character's actions and reactions in a specific situation</label>
                  </div>
                </div>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Reflection:</p>
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm text-gray-700">Which element of character description was most effective in revealing your character's personality?</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700">How could you improve your character description?</label>
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
