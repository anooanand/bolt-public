import React from 'react';

export function SupportTab() {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Extra Help & Resources</h3>
      
      <div className="space-y-6">
        <div className="bg-indigo-50 p-4 rounded-lg">
          <p className="text-gray-700 mb-4">
            Need additional support with creating mood and tone? Here are some helpful resources and tips!
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
                  <a href="#" className="text-purple-600 hover:text-purple-800 font-medium">Mood vs. Tone: Understanding the Difference</a>
                  <p className="text-sm text-gray-600">Learn how to distinguish between these two important elements of writing.</p>
                </div>
              </li>
              <li className="flex">
                <svg className="h-6 w-6 text-purple-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <a href="#" className="text-purple-600 hover:text-purple-800 font-medium">Word Choice: The Power of Diction</a>
                  <p className="text-sm text-gray-600">How to select words that create the perfect mood for your story.</p>
                </div>
              </li>
              <li className="flex">
                <svg className="h-6 w-6 text-purple-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <a href="#" className="text-purple-600 hover:text-purple-800 font-medium">Sentence Structure and Rhythm in Writing</a>
                  <p className="text-sm text-gray-600">How to use sentence length and structure to enhance mood.</p>
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
                  <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">Mood Creation Worksheet</a>
                  <p className="text-sm text-gray-600">Practice exercises for developing different moods in your writing.</p>
                </div>
              </li>
              <li className="flex">
                <svg className="h-6 w-6 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <div>
                  <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">Mood-Specific Vocabulary Lists</a>
                  <p className="text-sm text-gray-600">Word banks organized by different moods (mysterious, joyful, tense, etc.).</p>
                </div>
              </li>
              <li className="flex">
                <svg className="h-6 w-6 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <div>
                  <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">Before and After: Mood Transformation Examples</a>
                  <p className="text-sm text-gray-600">Examples of the same scene written with different moods.</p>
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
                <h5 className="font-medium text-gray-900 mb-1">What's the difference between mood and tone?</h5>
                <p className="text-gray-700">
                  Mood refers to the atmosphere or feeling that a piece of writing creates for the reader—how the reader feels while reading (mysterious, tense, joyful, etc.). Tone refers to the writer's attitude toward the subject, characters, or readers (formal, informal, serious, humorous, etc.). While related, they're distinct: a writer might use a humorous tone (attitude) to create a lighthearted mood (atmosphere), or a formal tone to create a solemn mood. For the NSW Selective exam, being able to control both mood and tone demonstrates sophisticated writing skills and awareness of how language affects readers.
                </p>
              </div>
              <div>
                <h5 className="font-medium text-gray-900 mb-1">How can I create a specific mood in my writing?</h5>
                <p className="text-gray-700">
                  To create a specific mood, use a combination of techniques. Word choice (diction) is crucial—select words with connotations that match your desired mood. Sentence structure affects pacing and rhythm; short sentences create tension, while longer ones can create a reflective or peaceful mood. Sensory details immerse readers in the atmosphere—what your characters see, hear, smell, taste, and feel should all contribute to the mood. Figurative language like metaphors and personification can powerfully reinforce mood. Finally, setting details (weather, time of day, location) should align with your intended mood—a storm for tension, sunshine for optimism, etc.
                </p>
              </div>
              <div>
                <h5 className="font-medium text-gray-900 mb-1">How can I maintain a consistent mood throughout my writing?</h5>
                <p className="text-gray-700">
                  Maintaining a consistent mood requires careful attention throughout your writing process. First, clearly identify your intended mood before you begin writing. Create a list of words, phrases, and images that evoke this mood to reference as you write. Review each paragraph to ensure all elements—diction, sentence structure, imagery, and sensory details—support your chosen mood. Be especially careful with dialogue and character actions, which can inadvertently shift the mood if they don't align with the atmosphere you're creating. However, deliberate mood shifts can be effective for specific narrative purposes, such as contrasting a peaceful beginning with a sudden tense event.
                </p>
              </div>
              <div>
                <h5 className="font-medium text-gray-900 mb-1">How do I avoid creating a melodramatic or forced mood?</h5>
                <p className="text-gray-700">
                  To avoid melodrama, focus on subtlety and restraint. Instead of explicitly stating the mood ("It was a terrifying night"), let readers experience it through specific, concrete details. Use "show, don't tell" techniques—describe a character's racing heart rather than saying they were scared. Vary your intensity; constant high emotion becomes exhausting for readers. Trust your readers' intelligence by suggesting the mood rather than hammering it home with excessive adjectives or extreme language. Finally, ensure the mood serves your story's purpose rather than existing for its own sake—a tense mood should advance the plot or reveal character, not simply create drama without purpose.
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
                  To improve your ability to create mood and tone, try this exercise: Choose a simple setting (like a classroom, park, or kitchen) and write three brief descriptions of it—first creating a mysterious mood, then a joyful mood, and finally a melancholic mood. Use the same basic setting details in each version, but change your word choice, sentence structure, and which sensory details you emphasize. This helps you understand how the same subject can create entirely different feelings based on how you present it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
