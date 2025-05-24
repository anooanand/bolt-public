import React from 'react';

export function PracticeTab() {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Practice: Counter-Arguments & Rebuttals</h3>
      
      <div className="bg-indigo-50 p-4 rounded-lg mb-6">
        <p className="text-gray-700">
          Now it's time to practice addressing counter-arguments and creating effective rebuttals in your persuasive writing. Complete the exercises below to strengthen your ability to acknowledge opposing viewpoints while maintaining a strong argument for the NSW Selective exam.
        </p>
      </div>
      
      <div className="space-y-8">
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-blue-50 px-4 py-2">
            <h4 className="font-medium text-blue-800">Exercise 1: Identify Counter-Arguments & Rebuttals</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Read the following persuasive paragraph. Identify the counter-argument and the rebuttal, then explain how effectively the writer addresses the opposing viewpoint.
            </p>
            
            <div className="space-y-6">
              <div className="border p-3 rounded-lg">
                <p className="italic text-gray-700 mb-3">
                  Many people believe that lowering the voting age to 16 would lead to uninformed voting decisions, as teenagers lack the life experience and maturity to understand complex political issues. While it's true that younger voters may have less experience with certain aspects of adult life, such as paying taxes or mortgages, this perspective overlooks the fact that many 16-year-olds are already engaged citizens who work, pay income tax, and are affected by government policies on education, healthcare, and the environment. Research from countries that have lowered their voting age, such as Austria and Scotland, shows that 16 and 17-year-old voters often research candidates more thoroughly than older voters and have higher turnout rates than 18-24 year olds. Furthermore, involving young people in democracy earlier creates lifelong voting habits that strengthen our democratic system. Rather than excluding young voices from the political process, we should focus on improving civic education for all ages.
                </p>
                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Identify the counter-argument:</label>
                  <textarea
                    rows={3}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="What opposing viewpoint does the writer address?"
                  ></textarea>
                </div>
                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Identify the rebuttal:</label>
                  <textarea
                    rows={3}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="How does the writer respond to the counter-argument?"
                  ></textarea>
                </div>
                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Evaluate the effectiveness:</label>
                  <textarea
                    rows={3}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="How effectively does the writer address the opposing viewpoint? What strategies do they use?"
                  ></textarea>
                </div>
              </div>
              
              <div className="border p-3 rounded-lg">
                <p className="italic text-gray-700 mb-3">
                  Critics of school uniform policies argue that uniforms restrict students' freedom of expression and individuality, which are important aspects of personal development. This concern about self-expression deserves consideration, as developing a sense of identity is indeed a crucial part of adolescence. However, school uniforms actually create a more equitable environment where students can express their individuality through their character, ideas, and achievements rather than through their clothing choices or financial status. A study by the Educational Policy Institute found that schools with uniform policies reported 27% fewer incidents of bullying related to appearance and socioeconomic status. Additionally, uniforms help students focus on their academic identity within the school community while still allowing plenty of opportunities for self-expression through extracurricular activities, creative projects, and personal style choices outside of school hours. The benefits of increased equality and reduced social pressure ultimately outweigh the limited restrictions on clothing expression during school hours.
                </p>
                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Identify the counter-argument:</label>
                  <textarea
                    rows={3}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="What opposing viewpoint does the writer address?"
                  ></textarea>
                </div>
                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Identify the rebuttal:</label>
                  <textarea
                    rows={3}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="How does the writer respond to the counter-argument?"
                  ></textarea>
                </div>
                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Evaluate the effectiveness:</label>
                  <textarea
                    rows={3}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="How effectively does the writer address the opposing viewpoint? What strategies do they use?"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-green-50 px-4 py-2">
            <h4 className="font-medium text-green-800">Exercise 2: Match Rebuttals to Counter-Arguments</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              For each counter-argument below, select the most effective rebuttal from the options provided.
            </p>
            
            <div className="space-y-6">
              <div>
                <h5 className="font-medium text-gray-800 mb-2">1. Counter-argument: "Banning smartphones in schools violates students' rights and doesn't prepare them for the real world where technology is everywhere."</h5>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input id="rebuttal1a" name="rebuttal1" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="rebuttal1a" className="ml-2 block text-sm text-gray-700">
                      "Students don't have rights at school. Teachers and administrators should make all the rules."
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input id="rebuttal1b" name="rebuttal1" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="rebuttal1b" className="ml-2 block text-sm text-gray-700">
                      "While teaching responsible technology use is important, research shows that smartphone presence reduces cognitive capacity and attention span by up to 30%, even when the device is turned off. Schools can better prepare students for the real world by teaching focused work habits and appropriate technology use through controlled access during specific learning activities, rather than unlimited personal use throughout the day."
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input id="rebuttal1c" name="rebuttal1" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="rebuttal1c" className="ml-2 block text-sm text-gray-700">
                      "Technology is actually bad for society and should be limited everywhere, not just in schools."
                    </label>
                  </div>
                </div>
              </div>
              
              <div>
                <h5 className="font-medium text-gray-800 mb-2">2. Counter-argument: "Extending school hours would cause student burnout and reduce time for important extracurricular activities."</h5>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input id="rebuttal2a" name="rebuttal2" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="rebuttal2a" className="ml-2 block text-sm text-gray-700">
                      "Students are lazy and need to work harder. Longer hours would teach them discipline."
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input id="rebuttal2b" name="rebuttal2" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="rebuttal2b" className="ml-2 block text-sm text-gray-700">
                      "Extracurricular activities aren't important for student development anyway."
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input id="rebuttal2c" name="rebuttal2" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="rebuttal2c" className="ml-2 block text-sm text-gray-700">
                      "The concern about burnout is valid, which is why our proposal restructures the school day rather than simply adding hours. By incorporating more breaks, physical activity, and project-based learning into a slightly longer day, students actually report less stress and better work-life balance. Additionally, the extended hours would include time for supervised extracurricular activities, making these opportunities more accessible to students whose parents work late or who lack transportation."
                    </label>
                  </div>
                </div>
              </div>
              
              <div>
                <h5 className="font-medium text-gray-800 mb-2">3. Counter-argument: "Online learning can never replace the value of in-person education and face-to-face interaction with teachers and peers."</h5>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input id="rebuttal3a" name="rebuttal3" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="rebuttal3a" className="ml-2 block text-sm text-gray-700">
                      "While face-to-face interaction offers unique benefits, online learning isn't intended to completely replace traditional education but to complement and enhance it. Digital platforms provide advantages that physical classrooms cannot, such as personalized learning paths that adapt to each student's pace, access to global experts and resources, and flexibility for students with different learning styles or circumstances. The most effective educational approach combines both online and in-person elements, leveraging the strengths of each to create a more inclusive and adaptable learning environment."
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input id="rebuttal3b" name="rebuttal3" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="rebuttal3b" className="ml-2 block text-sm text-gray-700">
                      "In-person education is outdated and will soon be completely replaced by technology."
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input id="rebuttal3c" name="rebuttal3" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                    <label htmlFor="rebuttal3c" className="ml-2 block text-sm text-gray-700">
                      "People who prefer in-person learning just aren't good with technology and need to adapt to the modern world."
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-purple-50 px-4 py-2">
            <h4 className="font-medium text-purple-800">Exercise 3: Create Rebuttals Using Different Strategies</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              For the following counter-argument, write four different rebuttals using each of the strategies we've learned.
            </p>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
              <p className="text-gray-700 font-medium">Counter-argument:</p>
              <p className="text-gray-700 italic mt-1">
                "Requiring students to learn a musical instrument is impractical because it's too expensive, takes time away from core academic subjects, and not everyone has musical talent."
              </p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">1. "Yes, but..." Approach:</label>
                <textarea
                  rows={4}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Acknowledge the validity of a point before explaining why your argument is still stronger..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">2. "Common Ground" Approach:</label>
                <textarea
                  rows={4}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Identify shared values or goals before explaining why your solution better achieves them..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">3. "Evidence-Based" Approach:</label>
                <textarea
                  rows={4}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Present data or expert opinions that directly contradict the counter-argument..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">4. "Reframing" Approach:</label>
                <textarea
                  rows={4}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Shift the perspective to show how the counter-argument misses the main point..."
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-red-50 px-4 py-2">
            <h4 className="font-medium text-red-800">Exercise 4: Strengthen Weak Rebuttals</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              The following rebuttals are weak or ineffective. Rewrite each one to make it stronger and more persuasive.
            </p>
            
            <div className="space-y-6">
              <div>
                <h5 className="font-medium text-gray-800 mb-2">1. Topic: Schools should adopt a four-day school week</h5>
                <p className="text-gray-600 mb-2 italic">
                  Counter-argument: "A four-day school week would create childcare problems for working parents."
                </p>
                <p className="text-gray-600 mb-2 italic">
                  Weak rebuttal: "Parents should just figure it out. It's not the school's job to provide childcare."
                </p>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Improved rebuttal:</label>
                  <textarea
                    rows={4}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Rewrite this rebuttal to make it stronger and more persuasive..."
                  ></textarea>
                </div>
              </div>
              
              <div>
                <h5 className="font-medium text-gray-800 mb-2">2. Topic: Schools should eliminate homework</h5>
                <p className="text-gray-600 mb-2 italic">
                  Counter-argument: "Without homework, students won't develop independent study skills needed for university."
                </p>
                <p className="text-gray-600 mb-2 italic">
                  Weak rebuttal: "University is different from school anyway, so it doesn't matter."
                </p>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Improved rebuttal:</label>
                  <textarea
                    rows={4}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Rewrite this rebuttal to make it stronger and more persuasive..."
                  ></textarea>
                </div>
              </div>
              
              <div>
                <h5 className="font-medium text-gray-800 mb-2">3. Topic: All students should learn coding</h5>
                <p className="text-gray-600 mb-2 italic">
                  Counter-argument: "Not all students are interested in or suited for computer programming."
                </p>
                <p className="text-gray-600 mb-2 italic">
                  Weak rebuttal: "They should be interested because technology is important."
                </p>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Improved rebuttal:</label>
                  <textarea
                    rows={4}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Rewrite this rebuttal to make it stronger and more persuasive..."
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-yellow-50 px-4 py-2">
            <h4 className="font-medium text-yellow-800">Exercise 5: Final Challenge - Complete Paragraph</h4>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Write a complete paragraph that addresses a counter-argument on one of the topics below. Follow the paragraph structure we learned: introduce the counter-argument, acknowledge valid aspects, present your rebuttal with evidence, and reinforce your position.
            </p>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Choose a topic:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="flex items-center">
                  <input id="topic1" name="topic" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="topic1" className="ml-2 block text-sm text-gray-700">Social media has a positive impact on teenagers</label>
                </div>
                <div className="flex items-center">
                  <input id="topic2" name="topic" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="topic2" className="ml-2 block text-sm text-gray-700">Schools should replace textbooks with tablets</label>
                </div>
                <div className="flex items-center">
                  <input id="topic3" name="topic" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="topic3" className="ml-2 block text-sm text-gray-700">Competitive sports should be mandatory in schools</label>
                </div>
                <div className="flex items-center">
                  <input id="topic4" name="topic" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="topic4" className="ml-2 block text-sm text-gray-700">Students should have a say in hiring teachers</label>
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">What counter-argument will you address?</label>
              <textarea
                rows={2}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Write the counter-argument you will address..."
              ></textarea>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Complete Paragraph:</label>
              <textarea
                rows={8}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Write your paragraph addressing the counter-argument..."
              ></textarea>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Identify Your Strategy:</label>
              <textarea
                rows={3}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Which rebuttal strategy did you use? How did you structure your paragraph?"
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
