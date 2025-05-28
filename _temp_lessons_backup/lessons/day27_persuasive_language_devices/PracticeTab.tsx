import React from 'react';

export function PracticeTab() {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Practice: Persuasive Language Devices</h3>
      
      <div className="bg-indigo-50 p-4 rounded-lg mb-6">
        <p className="text-gray-700">
          Now it's time to practice using a variety of persuasive language devices to enhance your persuasive writing. Complete the exercises below to strengthen your ability to create compelling arguments for the NSW Selective exam.
        </p>
      </div>
      
      <div className="space-y-8">
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-blue-50 px-4 py-2">
            <h4 className="font-medium text-blue-800">Exercise 1: Identify Persuasive Language Devices</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Read the following passages and identify the persuasive language devices used in each. Select all that apply and explain their effect.
            </p>
            
            <div className="space-y-6">
              <div className="border p-3 rounded-lg">
                <p className="italic text-gray-700 mb-3">
                  "We must act now. We must protect our environment. We must secure our future. The time for debate is over; the time for action is here. Every day we delay, more damage is done. Every week we hesitate, more species are lost. Every month we postpone, more of our natural world disappears forever."
                </p>
                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Identify the persuasive devices used (select all that apply):</label>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input id="repetition1" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="repetition1" className="ml-2 block text-sm text-gray-700">Repetition (Anaphora)</label>
                    </div>
                    <div className="flex items-center">
                      <input id="emotive1" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="emotive1" className="ml-2 block text-sm text-gray-700">Emotive Language</label>
                    </div>
                    <div className="flex items-center">
                      <input id="inclusive1" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="inclusive1" className="ml-2 block text-sm text-gray-700">Inclusive Language</label>
                    </div>
                    <div className="flex items-center">
                      <input id="imperative1" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="imperative1" className="ml-2 block text-sm text-gray-700">Imperative Voice</label>
                    </div>
                    <div className="flex items-center">
                      <input id="tricolon1" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="tricolon1" className="ml-2 block text-sm text-gray-700">Tricolon</label>
                    </div>
                    <div className="flex items-center">
                      <input id="antithesis1" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="antithesis1" className="ml-2 block text-sm text-gray-700">Antithesis</label>
                    </div>
                  </div>
                </div>
                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Explain the effect of these devices:</label>
                  <textarea
                    rows={3}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="How do these devices strengthen the persuasive impact?"
                  ></textarea>
                </div>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="italic text-gray-700 mb-3">
                  "Our school doesn't need a new sports facility; it needs a new library. While physical activity strengthens the body, reading strengthens the mind. We can exercise anywhere, but we can only study effectively in a proper learning environment. The choice is not between sports and academics—it's between temporary enjoyment and lasting knowledge."
                </p>
                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Identify the persuasive devices used (select all that apply):</label>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input id="repetition2" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="repetition2" className="ml-2 block text-sm text-gray-700">Repetition</label>
                    </div>
                    <div className="flex items-center">
                      <input id="emotive2" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="emotive2" className="ml-2 block text-sm text-gray-700">Emotive Language</label>
                    </div>
                    <div className="flex items-center">
                      <input id="inclusive2" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="inclusive2" className="ml-2 block text-sm text-gray-700">Inclusive Language</label>
                    </div>
                    <div className="flex items-center">
                      <input id="imperative2" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="imperative2" className="ml-2 block text-sm text-gray-700">Imperative Voice</label>
                    </div>
                    <div className="flex items-center">
                      <input id="tricolon2" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="tricolon2" className="ml-2 block text-sm text-gray-700">Tricolon</label>
                    </div>
                    <div className="flex items-center">
                      <input id="antithesis2" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="antithesis2" className="ml-2 block text-sm text-gray-700">Antithesis</label>
                    </div>
                  </div>
                </div>
                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Explain the effect of these devices:</label>
                  <textarea
                    rows={3}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="How do these devices strengthen the persuasive impact?"
                  ></textarea>
                </div>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="italic text-gray-700 mb-3">
                  "As members of this community, we all share responsibility for its future. Our children deserve better schools. Our neighborhoods deserve better safety. Our city deserves better leadership. Together, we can transform our community from a place of struggle to a place of opportunity, from a symbol of decline to a model of revival."
                </p>
                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Identify the persuasive devices used (select all that apply):</label>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input id="repetition3" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="repetition3" className="ml-2 block text-sm text-gray-700">Repetition</label>
                    </div>
                    <div className="flex items-center">
                      <input id="emotive3" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="emotive3" className="ml-2 block text-sm text-gray-700">Emotive Language</label>
                    </div>
                    <div className="flex items-center">
                      <input id="inclusive3" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="inclusive3" className="ml-2 block text-sm text-gray-700">Inclusive Language</label>
                    </div>
                    <div className="flex items-center">
                      <input id="imperative3" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="imperative3" className="ml-2 block text-sm text-gray-700">Imperative Voice</label>
                    </div>
                    <div className="flex items-center">
                      <input id="tricolon3" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="tricolon3" className="ml-2 block text-sm text-gray-700">Tricolon</label>
                    </div>
                    <div className="flex items-center">
                      <input id="antithesis3" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="antithesis3" className="ml-2 block text-sm text-gray-700">Antithesis</label>
                    </div>
                  </div>
                </div>
                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Explain the effect of these devices:</label>
                  <textarea
                    rows={3}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="How do these devices strengthen the persuasive impact?"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-green-50 px-4 py-2">
            <h4 className="font-medium text-green-800">Exercise 2: Create Sentences Using Repetition</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Write sentences using different types of repetition to emphasize key points about the following topics.
            </p>
            
            <div className="space-y-6">
              <div>
                <h5 className="font-medium text-gray-800 mb-2">1. Topic: The importance of recycling</h5>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Anaphora (repeating words at the beginning of successive clauses):</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Write a sentence using anaphora..."
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Epistrophe (repeating words at the end of successive clauses):</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Write a sentence using epistrophe..."
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div>
                <h5 className="font-medium text-gray-800 mb-2">2. Topic: The benefits of learning a musical instrument</h5>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Anadiplosis (repeating the last word of one clause at the beginning of the next):</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Write a sentence using anadiplosis..."
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your choice of repetition type:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Write a sentence using any type of repetition..."
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-purple-50 px-4 py-2">
            <h4 className="font-medium text-purple-800">Exercise 3: Create Sentences Using Emotive and Inclusive Language</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Rewrite the following neutral sentences to make them more persuasive using emotive language and inclusive language.
            </p>
            
            <div className="space-y-6">
              <div>
                <p className="text-gray-600 mb-2 italic">
                  Neutral: "The school cafeteria should offer more vegetarian options."
                </p>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rewrite using emotive language:</label>
                  <textarea
                    rows={2}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Rewrite the sentence using words that evoke emotions..."
                  ></textarea>
                </div>
                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rewrite using inclusive language:</label>
                  <textarea
                    rows={2}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Rewrite the sentence using 'we,' 'us,' or 'our' to create shared ownership..."
                  ></textarea>
                </div>
              </div>
              
              <div>
                <p className="text-gray-600 mb-2 italic">
                  Neutral: "Students should have more input in school decisions."
                </p>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rewrite using emotive language:</label>
                  <textarea
                    rows={2}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Rewrite the sentence using words that evoke emotions..."
                  ></textarea>
                </div>
                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rewrite using inclusive language:</label>
                  <textarea
                    rows={2}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Rewrite the sentence using 'we,' 'us,' or 'our' to create shared ownership..."
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-red-50 px-4 py-2">
            <h4 className="font-medium text-red-800">Exercise 4: Create Sentences Using Imperative Voice and Tricolon</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Write persuasive sentences using imperative voice and tricolon for the following topics.
            </p>
            
            <div className="space-y-6">
              <div>
                <h5 className="font-medium text-gray-800 mb-2">1. Topic: Reducing plastic waste</h5>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Write a sentence using imperative voice (commands):</label>
                  <textarea
                    rows={2}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Write a sentence using commands or directives..."
                  ></textarea>
                </div>
                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Write a sentence using tricolon (three parallel elements):</label>
                  <textarea
                    rows={2}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Write a sentence with three parallel words, phrases, or clauses..."
                  ></textarea>
                </div>
              </div>
              
              <div>
                <h5 className="font-medium text-gray-800 mb-2">2. Topic: The importance of voting</h5>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Write a sentence using imperative voice (commands):</label>
                  <textarea
                    rows={2}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Write a sentence using commands or directives..."
                  ></textarea>
                </div>
                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Write a sentence using tricolon (three parallel elements):</label>
                  <textarea
                    rows={2}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Write a sentence with three parallel words, phrases, or clauses..."
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-yellow-50 px-4 py-2">
            <h4 className="font-medium text-yellow-800">Exercise 5: Create Sentences Using Antithesis</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Write persuasive sentences using antithesis (juxtaposing contrasting ideas) for the following topics.
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">1. Topic: Technology in education</label>
                <textarea
                  rows={2}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Write a sentence juxtaposing contrasting ideas..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">2. Topic: Social media's impact on society</label>
                <textarea
                  rows={2}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Write a sentence juxtaposing contrasting ideas..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">3. Topic: Climate change action</label>
                <textarea
                  rows={2}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Write a sentence juxtaposing contrasting ideas..."
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-indigo-50 px-4 py-2">
            <h4 className="font-medium text-indigo-800">Exercise 6: Final Challenge - Combined Techniques</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Write a persuasive paragraph (150-200 words) on one of the topics below. Include at least three different persuasive language devices.
            </p>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Choose a topic:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="flex items-center">
                  <input id="topic1" name="topic" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="topic1" className="ml-2 block text-sm text-gray-700">Schools should have longer lunch breaks</label>
                </div>
                <div className="flex items-center">
                  <input id="topic2" name="topic" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="topic2" className="ml-2 block text-sm text-gray-700">All students should learn a second language</label>
                </div>
                <div className="flex items-center">
                  <input id="topic3" name="topic" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="topic3" className="ml-2 block text-sm text-gray-700">Community service should be required for graduation</label>
                </div>
                <div className="flex items-center">
                  <input id="topic4" name="topic" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="topic4" className="ml-2 block text-sm text-gray-700">Schools should switch to digital textbooks</label>
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Persuasive Paragraph:</label>
              <textarea
                rows={8}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Write your paragraph here..."
              ></textarea>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Identify Your Techniques:</label>
              <textarea
                rows={4}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="List the persuasive language devices you used and explain how they strengthen your argument..."
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
