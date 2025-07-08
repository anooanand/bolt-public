import React from 'react';

export function SupportTab() {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Extra Help & Resources</h3>
      
      <div className="space-y-6">
        <div className="bg-indigo-50 p-4 rounded-lg">
          <p className="text-gray-700 mb-4">
            Need additional support with the "show, don't tell" technique? Here are some helpful resources and tips!
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
                  <a href="#" className="text-purple-600 hover:text-purple-800 font-medium">Mastering "Show, Don't Tell" in Creative Writing</a>
                  <p className="text-sm text-gray-600">A comprehensive guide to bringing your writing to life through sensory details.</p>
                </div>
              </li>
              <li className="flex">
                <svg className="h-6 w-6 text-purple-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <a href="#" className="text-purple-600 hover:text-purple-800 font-medium">Transforming Telling into Showing: Before and After Examples</a>
                  <p className="text-sm text-gray-600">See real examples of how to convert weak telling statements into powerful showing passages.</p>
                </div>
              </li>
              <li className="flex">
                <svg className="h-6 w-6 text-purple-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <a href="#" className="text-purple-600 hover:text-purple-800 font-medium">Using Sensory Details to Show, Not Tell</a>
                  <p className="text-sm text-gray-600">How to incorporate all five senses to create vivid, immersive writing.</p>
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
                  <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">"Show, Don't Tell" Practice Worksheet</a>
                  <p className="text-sm text-gray-600">Exercises to help you transform telling statements into showing paragraphs.</p>
                </div>
              </li>
              <li className="flex">
                <svg className="h-6 w-6 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <div>
                  <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">Sensory Details Word Bank</a>
                  <p className="text-sm text-gray-600">A collection of descriptive words organized by the five senses to enhance your showing.</p>
                </div>
              </li>
              <li className="flex">
                <svg className="h-6 w-6 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <div>
                  <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">"Show, Don't Tell" Checklist</a>
                  <p className="text-sm text-gray-600">A tool to evaluate your writing and identify opportunities to show rather than tell.</p>
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
                <h5 className="font-medium text-gray-900 mb-1">Should I always show and never tell?</h5>
                <p className="text-gray-700">
                  No, effective writing uses both showing and telling strategically. Show important moments, emotions, and character traits that are central to your story. Tell when you need to convey straightforward information, transition between scenes, or summarize less important details. The key is knowing when each approach serves your purpose better.
                </p>
              </div>
              <div>
                <h5 className="font-medium text-gray-900 mb-1">How do I show emotions without naming them?</h5>
                <p className="text-gray-700">
                  Focus on physical reactions (racing heart, sweaty palms), facial expressions, body language, actions, thoughts, and dialogue. For example, instead of saying "She was angry," you might write, "Her jaw clenched. She slammed the book shut and glared at him, her words coming out in a low, measured tone." These details allow readers to experience the emotion without being told its name.
                </p>
              </div>
              <div>
                <h5 className="font-medium text-gray-900 mb-1">How detailed should my "showing" be in the NSW Selective exam?</h5>
                <p className="text-gray-700">
                  Given the time constraints, be selective about what you show in detail. Focus on showing key emotional moments, important character traits, and significant settings that impact your story. You don't need elaborate descriptions for every element—choose the moments where sensory details and specific actions will have the greatest impact on your reader.
                </p>
              </div>
              <div>
                <h5 className="font-medium text-gray-900 mb-1">How can I practice the "show, don't tell" technique?</h5>
                <p className="text-gray-700">
                  Start by identifying "telling" statements in your own writing (look for emotion words, character traits, or vague descriptions). Then rewrite these passages using specific sensory details, actions, dialogue, or thoughts. Another effective practice is to observe people and places around you, noting specific details that reveal emotions or qualities without naming them directly.
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
                  To improve your "show, don't tell" skills, try this exercise: Choose a basic emotion (fear, joy, anger, etc.) and write a short paragraph about a character experiencing that emotion without ever naming the emotion itself. Focus on physical sensations, actions, thoughts, and dialogue that reveal the feeling. Then ask someone to read it and identify the emotion. If they can, you've successfully "shown" rather than "told."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
