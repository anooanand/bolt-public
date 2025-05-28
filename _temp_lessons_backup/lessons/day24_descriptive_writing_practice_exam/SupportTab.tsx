import React from 'react';

export function SupportTab() {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Extra Help & Resources</h3>
      
      <div className="space-y-6">
        <div className="bg-indigo-50 p-4 rounded-lg">
          <p className="text-gray-700 mb-4">
            Need additional support with your descriptive writing practice exam? Here are some helpful resources and tips to help you excel!
          </p>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-purple-50 px-4 py-2">
            <h4 className="font-medium text-purple-800">Video Tutorials</h4>
          </div>
          <div className="p-4">
            <ul className="space-y-3">
              <li className="flex">
                <svg className="h-6 w-6 text-purple-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <a href="#" className="text-purple-600 hover:text-purple-800 font-medium">Exam Time Management Strategies</a>
                  <p className="text-sm text-gray-600">Learn how to effectively manage your time during the descriptive writing section.</p>
                </div>
              </li>
              <li className="flex">
                <svg className="h-6 w-6 text-purple-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <a href="#" className="text-purple-600 hover:text-purple-800 font-medium">Analyzing Descriptive Writing Prompts</a>
                  <p className="text-sm text-gray-600">How to quickly understand what the prompt is asking and plan your response.</p>
                </div>
              </li>
              <li className="flex">
                <svg className="h-6 w-6 text-purple-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <a href="#" className="text-purple-600 hover:text-purple-800 font-medium">High-Scoring Descriptive Writing Examples</a>
                  <p className="text-sm text-gray-600">Analysis of top-scoring student responses with examiner comments.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-blue-50 px-4 py-2">
            <h4 className="font-medium text-blue-800">Downloadable Resources</h4>
          </div>
          <div className="p-4">
            <ul className="space-y-3">
              <li className="flex">
                <svg className="h-6 w-6 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <div>
                  <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">Descriptive Writing Exam Checklist</a>
                  <p className="text-sm text-gray-600">A comprehensive checklist to review before submitting your exam response.</p>
                </div>
              </li>
              <li className="flex">
                <svg className="h-6 w-6 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <div>
                  <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">Additional Practice Prompts</a>
                  <p className="text-sm text-gray-600">A collection of 10 additional descriptive writing prompts with planning guides.</p>
                </div>
              </li>
              <li className="flex">
                <svg className="h-6 w-6 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <div>
                  <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">Self-Assessment Rubric</a>
                  <p className="text-sm text-gray-600">Evaluate your own writing using the same criteria as NSW Selective exam markers.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-green-50 px-4 py-2">
            <h4 className="font-medium text-green-800">Frequently Asked Questions</h4>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              <div>
                <h5 className="font-medium text-gray-900 mb-1">How much time should I spend planning my descriptive writing response?</h5>
                <p className="text-gray-700">
                  For a 40-minute descriptive writing task, aim to spend about 5-7 minutes planning. This might seem like a lot of time, but a solid plan will actually save you time during writing by preventing writer's block and helping you create a more organized, cohesive piece. Your plan should include the key sensory details you'll incorporate, the mood you want to create, and a rough outline of your description's structure. Remember that a well-planned piece with slightly fewer words is often stronger than a longer, rambling piece written without planning.
                </p>
              </div>
              <div>
                <h5 className="font-medium text-gray-900 mb-1">What should I do if I can't think of a good response to the prompt?</h5>
                <p className="text-gray-700">
                  If you're struggling with a prompt, first take a deep breath and remember that you can adapt the prompt to your strengths. Consider places, experiences, or topics you're familiar with and can describe vividly. For example, if the prompt asks you to describe "a special celebration" but you can't think of one, you can write about a regular family dinner but focus on the sensory details and emotions that make it special. The key is to showcase your descriptive writing skills, not necessarily to have the most unique or exotic subject. Examiners are looking for your ability to create vivid imagery and engage the reader's senses, not judge the uniqueness of your experiences.
                </p>
              </div>
              <div>
                <h5 className="font-medium text-gray-900 mb-1">How can I make my descriptive writing stand out from other students?</h5>
                <p className="text-gray-700">
                  To make your descriptive writing stand out, focus on specificity and originality rather than generic descriptions. Instead of writing "the beautiful sunset," describe "the sunset that painted the sky with streaks of amber and violet." Use unexpected comparisons and fresh figurative language rather than clichés. Incorporate less commonly used senses like taste, smell, and touch—not just sight and sound. Vary your sentence structure deliberately to create rhythm and emphasis. Most importantly, find a unique angle or perspective on even common subjects. For example, instead of describing a beach from a typical human perspective, you might describe it from the perspective of a seashell or an elderly person revisiting a childhood memory.
                </p>
              </div>
              <div>
                <h5 className="font-medium text-gray-900 mb-1">Should I use all the techniques we've learned in a single descriptive piece?</h5>
                <p className="text-gray-700">
                  While it's important to demonstrate your knowledge of descriptive techniques, trying to include every single technique we've learned can make your writing feel forced or overcrowded. Instead, select techniques that best serve your specific subject and the mood you're trying to create. For example, if you're describing a peaceful garden, personification might work well, while if you're describing a bustling market, sensory details and varied sentence structures might be more effective. Aim to include 3-5 different techniques used multiple times throughout your piece, rather than trying to use every technique once. Quality and appropriateness of techniques matter more than quantity.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">Need more help?</h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>
                  To improve your exam performance, try this exercise: Set a timer for 40 minutes and complete a practice prompt without any resources or help. When finished, wait at least an hour, then return to your writing with fresh eyes. Use the self-assessment rubric to identify your strengths and areas for improvement. Focus on one or two areas to improve in your next practice session. Repeating this process with different prompts will help you systematically improve your descriptive writing skills under exam conditions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
