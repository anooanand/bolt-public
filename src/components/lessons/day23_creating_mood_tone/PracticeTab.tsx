import React from 'react';

export function PracticeTab() {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Practice: Creating Mood & Tone</h3>
      
      <div className="bg-indigo-50 p-4 rounded-lg mb-6">
        <p className="text-gray-700">
          Now it's time to practice creating and controlling mood and tone in your writing. Complete the exercises below to strengthen your ability to evoke specific atmospheres and attitudes in your writing for the NSW Selective exam.
        </p>
      </div>
      
      <div className="space-y-8">
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-blue-50 px-4 py-2">
            <h4 className="font-medium text-blue-800">Exercise 1: Identify Mood & Tone</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Read the following passages and identify the mood and tone of each. Then explain which specific words or phrases helped you identify them.
            </p>
            
            <div className="space-y-6">
              <div className="border p-3 rounded-lg">
                <p className="italic text-gray-700 mb-3">
                  The abandoned fairground stood silent under the moonlight. Rust had claimed the once-colorful carousel horses, their painted smiles now eerie grimaces frozen in time. A tattered banner flapped weakly in the midnight breeze, its faded letters spelling out "Fun For All" in a cruel mockery of what once was. Somewhere in the distance, a swing creaked back and forth, though no one sat upon it.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">What is the mood?</label>
                    <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                      <option>Select...</option>
                      <option>Mysterious</option>
                      <option>Tense</option>
                      <option>Joyful</option>
                      <option>Melancholic</option>
                      <option>Peaceful</option>
                      <option>Ominous</option>
                      <option>Nostalgic</option>
                      <option>Eerie</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">What is the tone?</label>
                    <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                      <option>Select...</option>
                      <option>Formal</option>
                      <option>Informal</option>
                      <option>Serious</option>
                      <option>Humorous</option>
                      <option>Optimistic</option>
                      <option>Pessimistic</option>
                      <option>Sarcastic</option>
                      <option>Melancholic</option>
                    </select>
                  </div>
                </div>
                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Which words or phrases create this mood and tone?</label>
                  <textarea
                    rows={3}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Identify specific words and phrases..."
                  ></textarea>
                </div>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="italic text-gray-700 mb-3">
                  The morning sun poured through the kitchen window like liquid gold, warming the checkered tiles and dancing across the freshly baked muffins on the counter. Outside, birds conducted their cheerful symphony while children's laughter bubbled up from the neighboring yard. Sarah hummed as she poured her coffee, anticipating the perfect day that stretched before her like an unopened gift.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">What is the mood?</label>
                    <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                      <option>Select...</option>
                      <option>Mysterious</option>
                      <option>Tense</option>
                      <option>Joyful</option>
                      <option>Melancholic</option>
                      <option>Peaceful</option>
                      <option>Ominous</option>
                      <option>Nostalgic</option>
                      <option>Hopeful</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">What is the tone?</label>
                    <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                      <option>Select...</option>
                      <option>Formal</option>
                      <option>Informal</option>
                      <option>Serious</option>
                      <option>Humorous</option>
                      <option>Optimistic</option>
                      <option>Pessimistic</option>
                      <option>Sarcastic</option>
                      <option>Cheerful</option>
                    </select>
                  </div>
                </div>
                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Which words or phrases create this mood and tone?</label>
                  <textarea
                    rows={3}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Identify specific words and phrases..."
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-green-50 px-4 py-2">
            <h4 className="font-medium text-green-800">Exercise 2: Word Choice for Mood</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Replace the underlined neutral words in each sentence with more evocative words that create the specified mood.
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">1. Create a tense mood: The dog <span className="underline">walked</span> toward the stranger who <span className="underline">stood</span> by the gate.</label>
                <textarea
                  rows={2}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Rewrite the sentence with words that create tension..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">2. Create a peaceful mood: The water <span className="underline">moved</span> against the shore as the sun <span className="underline">went</span> below the horizon.</label>
                <textarea
                  rows={2}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Rewrite the sentence with words that create peace..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">3. Create a joyful mood: The children <span className="underline">ran</span> through the field as butterflies <span className="underline">flew</span> around them.</label>
                <textarea
                  rows={2}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Rewrite the sentence with words that create joy..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">4. Create a mysterious mood: The figure <span className="underline">came</span> out of the fog and <span className="underline">went</span> down the empty street.</label>
                <textarea
                  rows={2}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Rewrite the sentence with words that create mystery..."
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-purple-50 px-4 py-2">
            <h4 className="font-medium text-purple-800">Exercise 3: Sentence Structure for Mood</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Rewrite each passage using appropriate sentence structures to create the specified mood.
            </p>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">1. Create an urgent, tense mood:</label>
                <p className="text-gray-600 mb-2 italic">
                  The student was walking to the exam hall. He realized that he was late. The clock was ticking. He had forgotten his student ID. The proctor would not let him in without it.
                </p>
                <textarea
                  rows={4}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Rewrite using sentence structures that create urgency and tension..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">2. Create a peaceful, contemplative mood:</label>
                <p className="text-gray-600 mb-2 italic">
                  The lake was still. Mountains surrounded it. The sky was clear. Birds flew overhead. A gentle breeze blew. The trees swayed slightly.
                </p>
                <textarea
                  rows={4}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Rewrite using sentence structures that create peace and contemplation..."
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-red-50 px-4 py-2">
            <h4 className="font-medium text-red-800">Exercise 4: Sensory Details for Mood</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Add specific sensory details (sight, sound, smell, taste, touch) to create the specified mood in each setting.
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">1. Create an eerie mood in an abandoned house:</label>
                <textarea
                  rows={5}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Describe the abandoned house using sensory details that create an eerie mood..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">2. Create a festive mood at a celebration:</label>
                <textarea
                  rows={5}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Describe the celebration using sensory details that create a festive mood..."
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-yellow-50 px-4 py-2">
            <h4 className="font-medium text-yellow-800">Exercise 5: Changing Tone</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Rewrite the following passage three times, each with a different tone as specified.
            </p>
            
            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-gray-700 italic">
                Original passage (neutral tone): <br />
                The school announced that the annual sports day would be postponed due to the weather forecast. Students were informed that they should continue their preparations for the event, which would be held the following week.
              </p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">1. Rewrite with an enthusiastic tone:</label>
                <textarea
                  rows={3}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Rewrite the passage with enthusiasm..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">2. Rewrite with a disappointed tone:</label>
                <textarea
                  rows={3}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Rewrite the passage with disappointment..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">3. Rewrite with a formal, authoritative tone:</label>
                <textarea
                  rows={3}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Rewrite the passage with formality and authority..."
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-indigo-50 px-4 py-2">
            <h4 className="font-medium text-indigo-800">Exercise 6: Final Challenge - Creating a Specific Mood</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Write a descriptive paragraph (150-200 words) about one of the settings below, creating a specific mood of your choice. Use word choice, sentence structure, sensory details, and imagery to establish your chosen mood.
            </p>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Choose a setting:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="flex items-center">
                  <input id="setting1" name="setting" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="setting1" className="ml-2 block text-sm text-gray-700">A forest at twilight</label>
                </div>
                <div className="flex items-center">
                  <input id="setting2" name="setting" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="setting2" className="ml-2 block text-sm text-gray-700">A busy city intersection</label>
                </div>
                <div className="flex items-center">
                  <input id="setting3" name="setting" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="setting3" className="ml-2 block text-sm text-gray-700">An empty classroom after school</label>
                </div>
                <div className="flex items-center">
                  <input id="setting4" name="setting" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="setting4" className="ml-2 block text-sm text-gray-700">A hospital waiting room</label>
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">What mood are you creating?</label>
              <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                <option>Select...</option>
                <option>Mysterious</option>
                <option>Tense</option>
                <option>Joyful</option>
                <option>Melancholic</option>
                <option>Peaceful</option>
                <option>Ominous</option>
                <option>Nostalgic</option>
                <option>Hopeful</option>
                <option>Eerie</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Descriptive Paragraph:</label>
              <textarea
                rows={8}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Write your paragraph here..."
              ></textarea>
            </div>
            
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Explain your techniques:</label>
              <textarea
                rows={4}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Explain which techniques you used to create your chosen mood (word choice, sentence structure, sensory details, imagery)..."
              ></textarea>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit Practice Exercises
          </button>
        </div>
      </div>
    </div>
  );
}
