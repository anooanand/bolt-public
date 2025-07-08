import React from 'react';

export function PracticeTab() {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Practice: Formal vs. Informal Persuasion</h3>
      
      <div className="bg-indigo-50 p-4 rounded-lg mb-6">
        <p className="text-gray-700">
          Now it's time to practice distinguishing between formal and informal persuasive writing styles and adapting your writing to each context. Complete the exercises below to strengthen your ability to write persuasively for different audiences and purposes on the NSW Selective exam.
        </p>
      </div>
      
      <div className="space-y-8">
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-blue-50 px-4 py-2">
            <h4 className="font-medium text-blue-800">Exercise 1: Identify Formal vs. Informal Elements</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Read the following passages and identify whether each is written in a formal or informal style. Then list the specific elements that indicate the style.
            </p>
            
            <div className="space-y-6">
              <div className="border p-3 rounded-lg">
                <p className="italic text-gray-700 mb-3">
                  "The implementation of a four-day school week would have significant benefits for educational institutions. Research conducted by the Education Policy Institute (2023) demonstrates that students who attend schools with compressed schedules exhibit improved attendance rates and academic performance. Furthermore, such a schedule would reduce operational costs for schools, allowing for the reallocation of resources to essential educational programs. It is therefore recommended that educational authorities consider this alternative schedule for implementation in the upcoming academic year."
                </p>
                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">This passage is written in:</label>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <input id="formal1" name="style1" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                      <label htmlFor="formal1" className="ml-2 block text-sm text-gray-700">Formal style</label>
                    </div>
                    <div className="flex items-center">
                      <input id="informal1" name="style1" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                      <label htmlFor="informal1" className="ml-2 block text-sm text-gray-700">Informal style</label>
                    </div>
                  </div>
                </div>
                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">List at least 4 elements that indicate this style:</label>
                  <textarea
                    rows={4}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="List specific words, phrases, or features that indicate the style..."
                  ></textarea>
                </div>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="italic text-gray-700 mb-3">
                  "Hey everyone! Don't you think it's time we shake things up with our school schedule? I've been looking into this four-day school week idea, and it's actually pretty awesome. Studies show kids miss fewer days and even do better in their classes! Plus, our school could save a ton of money that could go toward cool stuff like new tech or field trips. Let's face it—who wouldn't want an extra day off? I really think we should give this a shot next year!"
                </p>
                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">This passage is written in:</label>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <input id="formal2" name="style2" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                      <label htmlFor="formal2" className="ml-2 block text-sm text-gray-700">Formal style</label>
                    </div>
                    <div className="flex items-center">
                      <input id="informal2" name="style2" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                      <label htmlFor="informal2" className="ml-2 block text-sm text-gray-700">Informal style</label>
                    </div>
                  </div>
                </div>
                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">List at least 4 elements that indicate this style:</label>
                  <textarea
                    rows={4}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="List specific words, phrases, or features that indicate the style..."
                  ></textarea>
                </div>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="italic text-gray-700 mb-3">
                  "The excessive use of single-use plastics in school cafeterias poses a significant environmental threat. According to environmental scientists, these non-biodegradable materials persist in ecosystems for hundreds of years. Educational institutions have a responsibility to model sustainable practices for students. Therefore, it is proposed that the administration implement a comprehensive ban on single-use plastics and transition to compostable alternatives."
                </p>
                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">This passage is written in:</label>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <input id="formal3" name="style3" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                      <label htmlFor="formal3" className="ml-2 block text-sm text-gray-700">Formal style</label>
                    </div>
                    <div className="flex items-center">
                      <input id="informal3" name="style3" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                      <label htmlFor="informal3" className="ml-2 block text-sm text-gray-700">Informal style</label>
                    </div>
                  </div>
                </div>
                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">List at least 4 elements that indicate this style:</label>
                  <textarea
                    rows={4}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="List specific words, phrases, or features that indicate the style..."
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-green-50 px-4 py-2">
            <h4 className="font-medium text-green-800">Exercise 2: Match the Style to the Context</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              For each of the following writing contexts, indicate whether a formal or informal style would be more appropriate and explain why.
            </p>
            
            <div className="space-y-6">
              <div>
                <h5 className="font-medium text-gray-800 mb-2">1. A letter to the school principal requesting permission for a student-led event</h5>
                <div className="flex items-center space-x-4 mb-3">
                  <div className="flex items-center">
                    <input id="formal4" name="style4" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="formal4" className="ml-2 block text-sm text-gray-700">Formal style</label>
                  </div>
                  <div className="flex items-center">
                    <input id="informal4" name="style4" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="informal4" className="ml-2 block text-sm text-gray-700">Informal style</label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Explain why this style is appropriate:</label>
                  <textarea
                    rows={2}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Explain your reasoning..."
                  ></textarea>
                </div>
              </div>
              
              <div>
                <h5 className="font-medium text-gray-800 mb-2">2. A social media post encouraging classmates to join a beach cleanup</h5>
                <div className="flex items-center space-x-4 mb-3">
                  <div className="flex items-center">
                    <input id="formal5" name="style5" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="formal5" className="ml-2 block text-sm text-gray-700">Formal style</label>
                  </div>
                  <div className="flex items-center">
                    <input id="informal5" name="style5" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="informal5" className="ml-2 block text-sm text-gray-700">Informal style</label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Explain why this style is appropriate:</label>
                  <textarea
                    rows={2}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Explain your reasoning..."
                  ></textarea>
                </div>
              </div>
              
              <div>
                <h5 className="font-medium text-gray-800 mb-2">3. An editorial for a national newspaper about educational reform</h5>
                <div className="flex items-center space-x-4 mb-3">
                  <div className="flex items-center">
                    <input id="formal6" name="style6" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="formal6" className="ml-2 block text-sm text-gray-700">Formal style</label>
                  </div>
                  <div className="flex items-center">
                    <input id="informal6" name="style6" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="informal6" className="ml-2 block text-sm text-gray-700">Informal style</label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Explain why this style is appropriate:</label>
                  <textarea
                    rows={2}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Explain your reasoning..."
                  ></textarea>
                </div>
              </div>
              
              <div>
                <h5 className="font-medium text-gray-800 mb-2">4. A speech to fellow students at a school assembly</h5>
                <div className="flex items-center space-x-4 mb-3">
                  <div className="flex items-center">
                    <input id="formal7" name="style7" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="formal7" className="ml-2 block text-sm text-gray-700">Formal style</label>
                  </div>
                  <div className="flex items-center">
                    <input id="informal7" name="style7" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="informal7" className="ml-2 block text-sm text-gray-700">Informal style</label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Explain why this style is appropriate:</label>
                  <textarea
                    rows={2}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Explain your reasoning..."
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-purple-50 px-4 py-2">
            <h4 className="font-medium text-purple-800">Exercise 3: Convert Between Formal and Informal Styles</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Rewrite each of the following sentences, converting them from one style to the other as indicated.
            </p>
            
            <div className="space-y-6">
              <div>
                <p className="text-gray-600 mb-2 italic">
                  Formal: "It is imperative that educational institutions implement more environmentally sustainable practices to reduce their carbon footprint."
                </p>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rewrite in an informal style:</label>
                  <textarea
                    rows={2}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Rewrite the sentence in an informal style..."
                  ></textarea>
                </div>
              </div>
              
              <div>
                <p className="text-gray-600 mb-2 italic">
                  Informal: "Don't you think it's crazy that we spend so much time on homework? I mean, we're already at school for like 7 hours a day!"
                </p>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rewrite in a formal style:</label>
                  <textarea
                    rows={2}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Rewrite the sentence in a formal style..."
                  ></textarea>
                </div>
              </div>
              
              <div>
                <p className="text-gray-600 mb-2 italic">
                  Formal: "Research indicates that regular physical activity contributes significantly to improved cognitive function and academic performance among adolescents."
                </p>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rewrite in an informal style:</label>
                  <textarea
                    rows={2}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Rewrite the sentence in an informal style..."
                  ></textarea>
                </div>
              </div>
              
              <div>
                <p className="text-gray-600 mb-2 italic">
                  Informal: "Hey, we really need to do something about the cafeteria food. It's pretty awful, and lots of kids are just tossing it in the trash."
                </p>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rewrite in a formal style:</label>
                  <textarea
                    rows={2}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Rewrite the sentence in a formal style..."
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-red-50 px-4 py-2">
            <h4 className="font-medium text-red-800">Exercise 4: Analyze Writing Prompts</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Read each writing prompt and determine whether it requires a formal or informal response. Explain your reasoning.
            </p>
            
            <div className="space-y-6">
              <div>
                <p className="text-gray-600 mb-2 italic">
                  "Write a letter to your local council explaining why your community needs a new recreational center."
                </p>
                <div className="flex items-center space-x-4 mb-3">
                  <div className="flex items-center">
                    <input id="formal8" name="style8" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="formal8" className="ml-2 block text-sm text-gray-700">Formal style</label>
                  </div>
                  <div className="flex items-center">
                    <input id="informal8" name="style8" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="informal8" className="ml-2 block text-sm text-gray-700">Informal style</label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Explain your reasoning:</label>
                  <textarea
                    rows={2}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Explain why this prompt requires this style..."
                  ></textarea>
                </div>
              </div>
              
              <div>
                <p className="text-gray-600 mb-2 italic">
                  "Write a blog post for your school website convincing students to participate in the upcoming talent show."
                </p>
                <div className="flex items-center space-x-4 mb-3">
                  <div className="flex items-center">
                    <input id="formal9" name="style9" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="formal9" className="ml-2 block text-sm text-gray-700">Formal style</label>
                  </div>
                  <div className="flex items-center">
                    <input id="informal9" name="style9" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="informal9" className="ml-2 block text-sm text-gray-700">Informal style</label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Explain your reasoning:</label>
                  <textarea
                    rows={2}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Explain why this prompt requires this style..."
                  ></textarea>
                </div>
              </div>
              
              <div>
                <p className="text-gray-600 mb-2 italic">
                  "Write an editorial for a national newspaper arguing for or against extending the school day."
                </p>
                <div className="flex items-center space-x-4 mb-3">
                  <div className="flex items-center">
                    <input id="formal10" name="style10" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="formal10" className="ml-2 block text-sm text-gray-700">Formal style</label>
                  </div>
                  <div className="flex items-center">
                    <input id="informal10" name="style10" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="informal10" className="ml-2 block text-sm text-gray-700">Informal style</label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Explain your reasoning:</label>
                  <textarea
                    rows={2}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Explain why this prompt requires this style..."
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-yellow-50 px-4 py-2">
            <h4 className="font-medium text-yellow-800">Exercise 5: Final Challenge - Write in Both Styles</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Write two persuasive paragraphs on the same topic—one in a formal style and one in an informal style.
            </p>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Choose a topic:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="flex items-center">
                  <input id="topic1" name="topic" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="topic1" className="ml-2 block text-sm text-gray-700">Schools should offer more arts and music programs</label>
                </div>
                <div className="flex items-center">
                  <input id="topic2" name="topic" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="topic2" className="ml-2 block text-sm text-gray-700">Students should have more input in school curriculum</label>
                </div>
                <div className="flex items-center">
                  <input id="topic3" name="topic" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="topic3" className="ml-2 block text-sm text-gray-700">Schools should adopt later start times</label>
                </div>
                <div className="flex items-center">
                  <input id="topic4" name="topic" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="topic4" className="ml-2 block text-sm text-gray-700">Technology use should be increased in classrooms</label>
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Formal Paragraph:</label>
              <textarea
                rows={6}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Write your formal paragraph here..."
              ></textarea>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Informal Paragraph:</label>
              <textarea
                rows={6}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Write your informal paragraph here..."
              ></textarea>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Reflection:</label>
              <textarea
                rows={3}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Reflect on how you adapted your language, tone, and structure for each style..."
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
