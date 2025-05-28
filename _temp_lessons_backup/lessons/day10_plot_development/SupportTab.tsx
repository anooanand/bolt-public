import React from 'react';

export function SupportTab() {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Extra Help & Resources</h3>
      
      <div className="space-y-6">
        <div className="bg-indigo-50 p-4 rounded-lg">
          <p className="text-gray-700 mb-4">
            Need additional support with plot development? Here are some helpful resources and tips!
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
                  <a href="#" className="text-purple-600 hover:text-purple-800 font-medium">Mastering Plot Development for Short Stories</a>
                  <p className="text-sm text-gray-600">Learn how to create compelling plots within the constraints of a short story format.</p>
                </div>
              </li>
              <li className="flex">
                <svg className="h-6 w-6 text-purple-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <a href="#" className="text-purple-600 hover:text-purple-800 font-medium">Creating Compelling Conflicts</a>
                  <p className="text-sm text-gray-600">How to develop central conflicts that drive your story forward.</p>
                </div>
              </li>
              <li className="flex">
                <svg className="h-6 w-6 text-purple-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <a href="#" className="text-purple-600 hover:text-purple-800 font-medium">Crafting Effective Turning Points</a>
                  <p className="text-sm text-gray-600">How to create powerful moments that change the direction of your story.</p>
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
                  <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">Plot Development Worksheet</a>
                  <p className="text-sm text-gray-600">A step-by-step guide to planning your story's plot.</p>
                </div>
              </li>
              <li className="flex">
                <svg className="h-6 w-6 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <div>
                  <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">Conflict Types Reference Guide</a>
                  <p className="text-sm text-gray-600">A comprehensive list of different types of conflicts to use in your stories.</p>
                </div>
              </li>
              <li className="flex">
                <svg className="h-6 w-6 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <div>
                  <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">Plot Analysis Exercise</a>
                  <p className="text-sm text-gray-600">Practice identifying plot elements in sample stories.</p>
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
                <h5 className="font-medium text-gray-900 mb-1">How complex should my plot be for the NSW Selective exam?</h5>
                <p className="text-gray-700">
                  For a short story in the NSW Selective exam, focus on a single, clear central conflict rather than multiple complex storylines. Given the time constraints, it's better to develop one compelling plot thoroughly than to attempt several underdeveloped subplots. Your story should have a clear beginning, middle, and end with at least one significant turning point.
                </p>
              </div>
              <div>
                <h5 className="font-medium text-gray-900 mb-1">How do I create an original plot that stands out?</h5>
                <p className="text-gray-700">
                  While many basic plots have been used before, you can make yours original through unique characters, unexpected twists, or fresh settings. Consider combining familiar elements in new ways or approaching common situations from unusual perspectives. Also, drawing from your personal experiences and observations can add authenticity and originality to your storytelling.
                </p>
              </div>
              <div>
                <h5 className="font-medium text-gray-900 mb-1">How do I create effective rising complications?</h5>
                <p className="text-gray-700">
                  Start with smaller obstacles and gradually increase their difficulty or emotional impact. Each complication should logically follow from previous events while raising the stakes for your character. Ensure that complications are varied—mix external obstacles (physical challenges, other characters) with internal ones (fears, moral dilemmas). Most importantly, complications should force your character to make difficult decisions that reveal their personality.
                </p>
              </div>
              <div>
                <h5 className="font-medium text-gray-900 mb-1">How do I create a satisfying resolution?</h5>
                <p className="text-gray-700">
                  A satisfying resolution addresses the central conflict in a way that feels both surprising and inevitable. It should demonstrate how your character has changed or what they've learned. Not all resolutions need to be happy, but they should provide closure. Avoid deus ex machina endings (where problems are solved by sudden, implausible interventions) and instead show how your character's actions and decisions lead to the resolution.
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
                  To improve your plot development skills, try this exercise: Take a familiar story (like a fairy tale or popular movie) and reimagine it with a different central conflict or from another character's perspective. This helps you understand how changing one element can transform an entire plot while still maintaining a coherent structure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
