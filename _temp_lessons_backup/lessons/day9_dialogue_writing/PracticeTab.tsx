import React from 'react';

export function PracticeTab() {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Practice Task: Writing Effective Dialogue</h3>
      
      <div className="bg-indigo-50 p-4 rounded-lg mb-6">
        <p className="text-gray-700">
          Now it's time to apply what you've learned about dialogue writing! In this practice task, you'll analyze dialogue in example passages, practice writing with distinct character voices, and create a scene with dialogue that reveals character and advances plot.
        </p>
      </div>
      
      <div className="space-y-6">
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-blue-50 px-4 py-3">
            <h4 className="font-medium text-blue-800">Part 1: Analyze Dialogue in Example Passages</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Read the dialogue passage below and analyze how it uses the key elements of effective dialogue.
            </p>
            
            <div className="border p-4 rounded-lg mb-4 bg-gray-50">
              <p className="text-gray-800 mb-2">
                "You can't be serious about this." Maya crossed her arms, glaring at her brother.
              </p>
              <p className="text-gray-800 mb-2">
                "I've never been more serious." Ethan continued packing his backpack, avoiding her eyes. "The scholarship is a once-in-a-lifetime opportunity."
              </p>
              <p className="text-gray-800 mb-2">
                "But what about Mum? You know she can't manage the shop alone." Maya's voice cracked slightly. "Not since Dad—"
              </p>
              <p className="text-gray-800 mb-2">
                "Don't." Ethan held up his hand. "Don't use that against me."
              </p>
              <p className="text-gray-800 mb-2">
                Maya sighed and sat on the edge of the bed. "I'm not trying to use anything against you. I just... I thought we were in this together."
              </p>
              <p className="text-gray-800">
                Ethan zipped his backpack closed with a sharp tug. "Sometimes people have to make their own paths, Maya. Even you said that once."
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">What purpose does this dialogue serve in the story?</p>
                <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option>Select...</option>
                  <option>Reveals character personalities and relationship</option>
                  <option>Advances the plot by showing conflict</option>
                  <option>Provides background information about the family</option>
                  <option>All of the above</option>
                </select>
                <div className="mt-2">
                  <label className="block text-sm text-gray-700">Explain your answer with specific examples from the text:</label>
                  <textarea
                    rows={2}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  ></textarea>
                </div>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">How do the characters' voices differ from each other?</p>
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm text-gray-700">Maya's voice characteristics:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Describe Maya's way of speaking..."
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700">Ethan's voice characteristics:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Describe Ethan's way of speaking..."
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Identify the dialogue tags and action beats in the passage:</p>
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm text-gray-700">List two dialogue tags:</label>
                    <input
                      type="text"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="e.g., 'said,' 'asked,' etc."
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700">List two action beats:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Actions that accompany dialogue..."
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">How does the punctuation and formatting help the reader follow the dialogue?</p>
                <textarea
                  rows={3}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Explain how quotation marks, paragraph breaks, etc. are used..."
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-green-50 px-4 py-3">
            <h4 className="font-medium text-green-800">Part 2: Practice Writing Dialogue with Distinct Character Voices</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Write a short dialogue between two characters with very different personalities discussing the same topic: a school assignment they need to complete together.
            </p>
            
            <div className="space-y-4">
              <div className="border p-3 rounded-lg">
                <p className="text-gray-800 mb-2">Character Profiles:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Character 1:</label>
                    <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                      <option>Select a personality...</option>
                      <option>Perfectionist and anxious</option>
                      <option>Laid-back and carefree</option>
                      <option>Enthusiastic and creative</option>
                      <option>Logical and methodical</option>
                      <option>Impatient and direct</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Character 2:</label>
                    <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                      <option>Select a personality...</option>
                      <option>Perfectionist and anxious</option>
                      <option>Laid-back and carefree</option>
                      <option>Enthusiastic and creative</option>
                      <option>Logical and methodical</option>
                      <option>Impatient and direct</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Dialogue:</label>
                <textarea
                  rows={10}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Write your dialogue here, using proper formatting and punctuation..."
                ></textarea>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-sm font-medium text-gray-700 mb-2">Reflection:</p>
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">How did you make Character 1's voice distinct?</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Word choice, sentence structure, expressions, etc."
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">How did you make Character 2's voice distinct?</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Word choice, sentence structure, expressions, etc."
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">What dialogue tags and action beats did you use?</label>
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
            <h4 className="font-medium text-purple-800">Part 3: Create a Scene with Purposeful Dialogue</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Write a scene (200-300 words) that includes dialogue between at least two characters. Your dialogue should reveal character personalities and advance the plot in some way.
            </p>
            
            <div className="bg-gray-50 p-3 rounded-lg mb-4">
              <p className="text-gray-700 mb-2">Choose one of the following scenarios:</p>
              <ul className="list-disc pl-5 text-gray-700">
                <li>Two friends discover something unexpected while exploring an abandoned building</li>
                <li>A student must convince a teacher to extend an important deadline</li>
                <li>A misunderstanding between siblings leads to a surprising revelation</li>
                <li>A new student's first day at school takes an unexpected turn</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Selected Scenario:</label>
                <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option>Select a scenario...</option>
                  <option>Two friends discover something unexpected while exploring an abandoned building</option>
                  <option>A student must convince a teacher to extend an important deadline</option>
                  <option>A misunderstanding between siblings leads to a surprising revelation</option>
                  <option>A new student's first day at school takes an unexpected turn</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Scene:</label>
                <textarea
                  rows={12}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Write your scene here, including dialogue and narrative..."
                ></textarea>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-sm font-medium text-gray-700 mb-2">Self-assessment checklist:</p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                    <label className="ml-2 block text-sm text-gray-700">My dialogue reveals character personalities</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                    <label className="ml-2 block text-sm text-gray-700">My dialogue advances the plot</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                    <label className="ml-2 block text-sm text-gray-700">Each character has a distinct voice</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                    <label className="ml-2 block text-sm text-gray-700">I used a mix of dialogue tags and action beats</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                    <label className="ml-2 block text-sm text-gray-700">My punctuation and formatting are correct</label>
                  </div>
                </div>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="text-sm font-medium text-gray-700 mb-2">Reflection:</p>
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">How does your dialogue reveal character?</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">How does your dialogue advance the plot?</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">What was the most challenging aspect of writing this dialogue?</label>
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
