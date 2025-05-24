import React from 'react';

interface ActivitiesTabProps {
  completedActivities: string[];
  toggleActivityCompletion: (activity: string) => void;
}

export function ActivitiesTab({ completedActivities, toggleActivityCompletion }: ActivitiesTabProps) {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Today's Activities</h3>
      
      <div className="space-y-6">
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-indigo-50 px-4 py-2 flex justify-between items-center">
            <h4 className="font-medium text-indigo-800">Activity 1: Assessment Criteria Exploration</h4>
            <button 
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                completedActivities.includes('activity1')
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
              onClick={() => toggleActivityCompletion('activity1')}
            >
              {completedActivities.includes('activity1') ? 'Completed ✓' : 'Mark Complete'}
            </button>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Let's explore each assessment criterion in detail and learn what examiners are looking for.
            </p>
            
            <div className="mb-4">
              <h5 className="font-medium text-gray-900 mb-2">Ideas & Content (30%)</h5>
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm text-gray-700 mb-2">Examiners are looking for:</p>
                <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                  <li>Original and creative ideas</li>
                  <li>Direct response to the writing prompt</li>
                  <li>Thoughtful details and examples</li>
                  <li>Clear purpose and audience awareness</li>
                  <li>Engaging and interesting content</li>
                </ul>
              </div>
            </div>
            
            <div className="mb-4">
              <h5 className="font-medium text-gray-900 mb-2">Structure & Organization (25%)</h5>
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm text-gray-700 mb-2">Examiners are looking for:</p>
                <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                  <li>Clear beginning, middle, and end</li>
                  <li>Logical paragraph organization</li>
                  <li>Smooth transitions between ideas</li>
                  <li>Appropriate text structure for the writing type</li>
                  <li>Coherent flow of ideas</li>
                </ul>
              </div>
            </div>
            
            <div className="mb-4">
              <h5 className="font-medium text-gray-900 mb-2">Language & Vocabulary (25%)</h5>
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm text-gray-700 mb-2">Examiners are looking for:</p>
                <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                  <li>Varied sentence structures (simple, compound, complex)</li>
                  <li>Sophisticated and precise vocabulary</li>
                  <li>Effective use of descriptive language</li>
                  <li>Appropriate figurative language (similes, metaphors, etc.)</li>
                  <li>Strong word choice that enhances meaning</li>
                </ul>
              </div>
            </div>
            
            <div>
              <h5 className="font-medium text-gray-900 mb-2">Spelling & Grammar (20%)</h5>
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm text-gray-700 mb-2">Examiners are looking for:</p>
                <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                  <li>Correct spelling of common and challenging words</li>
                  <li>Proper punctuation usage</li>
                  <li>Correct grammar and sentence structure</li>
                  <li>Consistent tense throughout</li>
                  <li>Appropriate word usage</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-indigo-50 px-4 py-2 flex justify-between items-center">
            <h4 className="font-medium text-indigo-800">Activity 2: Sample Essay Analysis</h4>
            <button 
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                completedActivities.includes('activity2')
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
              onClick={() => toggleActivityCompletion('activity2')}
            >
              {completedActivities.includes('activity2') ? 'Completed ✓' : 'Mark Complete'}
            </button>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Let's analyze a sample essay with marking annotations to see how the criteria are applied.
            </p>
            
            <div className="border p-4 rounded-lg mb-4 bg-gray-50">
              <h5 className="font-medium text-gray-900 mb-2">Sample Essay Prompt:</h5>
              <p className="italic text-gray-700 mb-4">
                Write a narrative about a character who discovers something unexpected.
              </p>
              
              <h5 className="font-medium text-gray-900 mb-2">Sample Essay:</h5>
              <div className="prose max-w-none text-gray-700">
                <p className="relative">
                  <span className="bg-blue-100 px-1">The old house at the end of Willow Street had always fascinated me.</span>
                  <span className="absolute top-0 right-0 text-xs text-blue-600">Strong opening</span>
                </p>
                <p className="relative">
                  <span className="bg-green-100 px-1">Its windows were like tired eyes, watching the neighborhood change over decades. The paint peeled from its walls like old skin, and the garden had grown wild and untamed.</span>
                  <span className="absolute top-0 right-0 text-xs text-green-600">Excellent descriptive language</span>
                </p>
                <p>
                  When I heard that old Mrs. Jenkins had finally moved to a nursing home, I couldn't resist the temptation to explore the mysterious house before the new owners arrived.
                </p>
                <p className="relative">
                  <span className="bg-red-100 px-1">I snuck in through the back door, which was unlock.</span>
                  <span className="absolute top-0 right-0 text-xs text-red-600">Spelling error: "unlock" should be "unlocked"</span>
                </p>
                <p>
                  The inside of the house was dark and dusty. Sheets covered the furniture like ghosts frozen in time. I moved carefully through the hallway, my footsteps echoing on the wooden floor.
                </p>
                <p>
                  In what must have been Mrs. Jenkins' bedroom, I found an old wooden chest at the foot of the bed. Curiosity got the better of me, and I carefully lifted the heavy lid.
                </p>
                <p className="relative">
                  <span className="bg-purple-100 px-1">Inside was a collection of letters, yellowed with age, tied together with a faded blue ribbon. The top envelope was addressed to "My dearest Elizabeth" in elegant handwriting.</span>
                  <span className="absolute top-0 right-0 text-xs text-purple-600">Good use of detail</span>
                </p>
                <p>
                  I knew I shouldn't read someone else's private letters, but I couldn't help myself. I gently untied the ribbon and opened the first letter.
                </p>
                <p className="relative">
                  <span className="bg-red-100 px-1">"My dearest Elizabeth, I write to you from the trenches of France. The war rages on, but thoughts of you keep me going. I count the days until I can return home and make you my wife. Forever yours, Thomas."</span>
                  <span className="absolute top-0 right-0 text-xs text-red-600">Inconsistent tense - switches to present</span>
                </p>
                <p>
                  I was stunned. Mrs. Jenkins had always been alone as long as I could remember. I had never heard of a Thomas in her life.
                </p>
              </div>
            </div>
            
            <div className="bg-indigo-50 p-4 rounded-lg">
              <h5 className="font-medium text-indigo-800 mb-2">Assessment Notes:</h5>
              <div className="space-y-3">
                <div>
                  <p className="font-medium text-gray-900">Ideas & Content: 8/10</p>
                  <p className="text-sm text-gray-700">Creative premise with good development. The discovery of the letters creates interest, but the ending feels somewhat abrupt.</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Structure & Organization: 7/10</p>
                  <p className="text-sm text-gray-700">Clear beginning and middle, but the conclusion needs more development. Paragraphs are well-organized with logical flow.</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Language & Vocabulary: 9/10</p>
                  <p className="text-sm text-gray-700">Excellent use of descriptive language and varied sentence structures. Effective similes enhance the imagery.</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Spelling & Grammar: 6/10</p>
                  <p className="text-sm text-gray-700">A few spelling errors and inconsistent tense usage. Generally good grammar but needs more careful proofreading.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-indigo-50 px-4 py-2 flex justify-between items-center">
            <h4 className="font-medium text-indigo-800">Activity 3: Create Your Self-Assessment Checklist</h4>
            <button 
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                completedActivities.includes('activity3')
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
              onClick={() => toggleActivityCompletion('activity3')}
            >
              {completedActivities.includes('activity3') ? 'Completed ✓' : 'Mark Complete'}
            </button>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Now, let's create a self-assessment checklist that you can use to evaluate your own writing.
            </p>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h5 className="font-medium text-gray-900 mb-3">My Writing Self-Assessment Checklist</h5>
              
              <div className="space-y-4">
                <div>
                  <h6 className="font-medium text-gray-800 mb-2">Ideas & Content</h6>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input type="checkbox" id="ideas1" className="h-4 w-4 text-indigo-600 rounded border-gray-300" />
                      <label htmlFor="ideas1" className="ml-2 text-sm text-gray-700">My ideas are original and creative</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="ideas2" className="h-4 w-4 text-indigo-600 rounded border-gray-300" />
                      <label htmlFor="ideas2" className="ml-2 text-sm text-gray-700">I've directly responded to the writing prompt</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="ideas3" className="h-4 w-4 text-indigo-600 rounded border-gray-300" />
                      <label htmlFor="ideas3" className="ml-2 text-sm text-gray-700">I've included thoughtful details and examples</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="ideas4" className="h-4 w-4 text-indigo-600 rounded border-gray-300" />
                      <label htmlFor="ideas4" className="ml-2 text-sm text-gray-700">My writing has a clear purpose</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="ideas5" className="h-4 w-4 text-indigo-600 rounded border-gray-300" />
                      <label htmlFor="ideas5" className="ml-2 text-sm text-gray-700">My content is engaging and interesting</label>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h6 className="font-medium text-gray-800 mb-2">Structure & Organization</h6>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input type="checkbox" id="structure1" className="h-4 w-4 text-indigo-600 rounded border-gray-300" />
                      <label htmlFor="structure1" className="ml-2 text-sm text-gray-700">My writing has a clear beginning, middle, and end</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="structure2" className="h-4 w-4 text-indigo-600 rounded border-gray-300" />
                      <label htmlFor="structure2" className="ml-2 text-sm text-gray-700">My paragraphs are logically organized</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="structure3" className="h-4 w-4 text-indigo-600 rounded border-gray-300" />
                      <label htmlFor="structure3" className="ml-2 text-sm text-gray-700">I've used smooth transitions between ideas</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="structure4" className="h-4 w-4 text-indigo-600 rounded border-gray-300" />
                      <label htmlFor="structure4" className="ml-2 text-sm text-gray-700">I've used an appropriate text structure for this writing type</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="structure5" className="h-4 w-4 text-indigo-600 rounded border-gray-300" />
                      <label htmlFor="structure5" className="ml-2 text-sm text-gray-700">My ideas flow coherently</label>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h6 className="font-medium text-gray-800 mb-2">Language & Vocabulary</h6>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input type="checkbox" id="language1" className="h-4 w-4 text-indigo-600 rounded border-gray-300" />
                      <label htmlFor="language1" className="ml-2 text-sm text-gray-700">I've used varied sentence structures</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="language2" className="h-4 w-4 text-indigo-600 rounded border-gray-300" />
                      <label htmlFor="language2" className="ml-2 text-sm text-gray-700">I've included sophisticated and precise vocabulary</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="language3" className="h-4 w-4 text-indigo-600 rounded border-gray-300" />
                      <label htmlFor="language3" className="ml-2 text-sm text-gray-700">I've used effective descriptive language</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="language4" className="h-4 w-4 text-indigo-600 rounded border-gray-300" />
                      <label htmlFor="language4" className="ml-2 text-sm text-gray-700">I've included appropriate figurative language</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="language5" className="h-4 w-4 text-indigo-600 rounded border-gray-300" />
                      <label htmlFor="language5" className="ml-2 text-sm text-gray-700">My word choices enhance the meaning of my writing</label>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h6 className="font-medium text-gray-800 mb-2">Spelling & Grammar</h6>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input type="checkbox" id="spelling1" className="h-4 w-4 text-indigo-600 rounded border-gray-300" />
                      <label htmlFor="spelling1" className="ml-2 text-sm text-gray-700">I've checked my spelling</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="spelling2" className="h-4 w-4 text-indigo-600 rounded border-gray-300" />
                      <label htmlFor="spelling2" className="ml-2 text-sm text-gray-700">I've used proper punctuation</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="spelling3" className="h-4 w-4 text-indigo-600 rounded border-gray-300" />
                      <label htmlFor="spelling3" className="ml-2 text-sm text-gray-700">My grammar and sentence structure are correct</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="spelling4" className="h-4 w-4 text-indigo-600 rounded border-gray-300" />
                      <label htmlFor="spelling4" className="ml-2 text-sm text-gray-700">I've used consistent tense throughout</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="spelling5" className="h-4 w-4 text-indigo-600 rounded border-gray-300" />
                      <label htmlFor="spelling5" className="ml-2 text-sm text-gray-700">I've used words appropriately</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
