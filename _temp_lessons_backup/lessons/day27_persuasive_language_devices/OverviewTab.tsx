import React from 'react';
import { TextToSpeech } from "../../../src/components/TextToSpeech";


export function OverviewTab() {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Learning Objective</h3>
      <TextToSpeech text="By the end of today, you'll understand how to use a variety of persuasive language devices to enhance your persuasive writing for the NSW Selective exam.">
        <p className="mb-6 text-gray-700">
          By the end of today, you'll understand how to use a variety of persuasive language devices to enhance your persuasive writing for the NSW Selective exam.
        </p>
      </TextToSpeech>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">Did you know?</h3>
            <div className="mt-2 text-sm text-yellow-700">
              <TextToSpeech text="Students who effectively use a variety of persuasive language devices typically score 15-20% higher in the Language & Vocabulary criterion (25% of your writing score). Examiners are particularly impressed by the strategic use of these devices to strengthen arguments.">
                <p>
                  Students who effectively use a variety of persuasive language devices typically score 15-20% higher in the "Language & Vocabulary" criterion (25% of your writing score). Examiners are particularly impressed by the strategic use of these devices to strengthen arguments.
                </p>
              </TextToSpeech>
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-lg font-medium text-gray-900 mb-2">Key Persuasive Language Devices</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-bold text-blue-800 mb-2 flex items-center">
            <span className="bg-blue-200 text-blue-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">1</span>
            Repetition
          </h4>
          <TextToSpeech text="Repeating key words, phrases, or ideas to emphasize important points and make them memorable.">
            <p className="text-blue-800">
              Repeating key words, phrases, or ideas to emphasize important points and make them memorable.
            </p>
          </TextToSpeech>
          <div className="mt-2 bg-white p-3 rounded border border-blue-200">
            <p className="text-blue-800 font-medium">Types of repetition:</p>
            <ul className="list-disc pl-5 text-blue-800 space-y-1 mt-1">
              <li><span className="italic">Anaphora:</span> Repeating words at the beginning of successive clauses</li>
              <li><span className="italic">Epistrophe:</span> Repeating words at the end of successive clauses</li>
              <li><span className="italic">Anadiplosis:</span> Repeating the last word of one clause at the beginning of the next</li>
            </ul>
            <TextToSpeech text="Example: We must act now. Now, before more damage is done. Now, while we still have time. Now, for the sake of future generations.">
              <p className="text-blue-800 italic mt-2">Example: "We must act now. Now, before more damage is done. Now, while we still have time. Now, for the sake of future generations."</p>
            </TextToSpeech>
          </div>
        </div>
        
        <div className="bg-green-50 rounded-lg p-4">
          <h4 className="font-bold text-green-800 mb-2 flex items-center">
            <span className="bg-green-200 text-green-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">2</span>
            Emotive Language
          </h4>
          <TextToSpeech text="Words and phrases that evoke strong emotions to influence how readers feel about an issue.">
            <p className="text-green-800">
              Words and phrases that evoke strong emotions to influence how readers feel about an issue.
            </p>
          </TextToSpeech>
          <div className="mt-2 bg-white p-3 rounded border border-green-200">
            <p className="text-green-800 font-medium">Emotional appeals:</p>
            <ul className="list-disc pl-5 text-green-800 space-y-1 mt-1">
              <li>Words with positive connotations (opportunity, freedom, progress)</li>
              <li>Words with negative connotations (crisis, threat, failure)</li>
              <li>Words that evoke specific emotions (outrage, pride, compassion)</li>
            </ul>
            <TextToSpeech text="Example: The devastating impact of plastic pollution is destroying our precious oceans and killing innocent marine life.">
              <p className="text-green-800 italic mt-2">Example: "The devastating impact of plastic pollution is destroying our precious oceans and killing innocent marine life."</p>
            </TextToSpeech>
          </div>
        </div>
        
        <div className="bg-purple-50 rounded-lg p-4">
          <h4 className="font-bold text-purple-800 mb-2 flex items-center">
            <span className="bg-purple-200 text-purple-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">3</span>
            Inclusive Language
          </h4>
          <TextToSpeech text="Words that create a sense of unity, shared identity, or common purpose with the audience.">
            <p className="text-purple-800">
              Words that create a sense of unity, shared identity, or common purpose with the audience.
            </p>
          </TextToSpeech>
          <div className="mt-2 bg-white p-3 rounded border border-purple-200">
            <p className="text-purple-800 font-medium">Inclusive techniques:</p>
            <ul className="list-disc pl-5 text-purple-800 space-y-1 mt-1">
              <li>Using "we," "us," and "our" to create shared ownership</li>
              <li>Appealing to shared values or experiences</li>
              <li>Creating a sense of community or collective responsibility</li>
            </ul>
            <TextToSpeech text="Example: As members of this school community, we all share the responsibility to create a safe environment where everyone can thrive. Our actions today will shape our collective future.">
              <p className="text-purple-800 italic mt-2">Example: "As members of this school community, we all share the responsibility to create a safe environment where everyone can thrive. Our actions today will shape our collective future."</p>
            </TextToSpeech>
          </div>
        </div>
        
        <div className="bg-red-50 rounded-lg p-4">
          <h4 className="font-bold text-red-800 mb-2 flex items-center">
            <span className="bg-red-200 text-red-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">4</span>
            Imperative Voice
          </h4>
          <TextToSpeech text="Using commands or directives to create a sense of urgency and call readers to action.">
            <p className="text-red-800">
              Using commands or directives to create a sense of urgency and call readers to action.
            </p>
          </TextToSpeech>
          <div className="mt-2 bg-white p-3 rounded border border-red-200">
            <p className="text-red-800 font-medium">Effective uses:</p>
            <ul className="list-disc pl-5 text-red-800 space-y-1 mt-1">
              <li>Creating a sense of urgency</li>
              <li>Providing clear direction</li>
              <li>Emphasizing the need for immediate action</li>
              <li>Strengthening calls to action in conclusions</li>
            </ul>
            <TextToSpeech text="Example: Consider the consequences of inaction. Imagine a future where clean water is scarce. Act now before it's too late. Join our conservation efforts today.">
              <p className="text-red-800 italic mt-2">Example: "Consider the consequences of inaction. Imagine a future where clean water is scarce. Act now before it's too late. Join our conservation efforts today."</p>
            </TextToSpeech>
          </div>
        </div>
        
        <div className="bg-yellow-50 rounded-lg p-4">
          <h4 className="font-bold text-yellow-800 mb-2 flex items-center">
            <span className="bg-yellow-200 text-yellow-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">5</span>
            Tricolon
          </h4>
          <TextToSpeech text="A series of three parallel words, phrases, or clauses that creates rhythm and emphasis.">
            <p className="text-yellow-800">
              A series of three parallel words, phrases, or clauses that creates rhythm and emphasis.
            </p>
          </TextToSpeech>
          <div className="mt-2 bg-white p-3 rounded border border-yellow-200">
            <p className="text-yellow-800 font-medium">Why it works:</p>
            <ul className="list-disc pl-5 text-yellow-800 space-y-1 mt-1">
              <li>Creates a satisfying rhythm</li>
              <li>Makes ideas more memorable</li>
              <li>Builds to a climax (especially with increasing length)</li>
              <li>Feels complete and balanced</li>
            </ul>
            <p className="text-yellow-800 italic mt-2">Examples:</p>
            <ul className="list-disc pl-5 text-yellow-800 space-y-1 mt-1">
              <li>
                <TextToSpeech text="Education improves lives, builds communities, and transforms nations.">
                  "Education improves lives, builds communities, and transforms nations."
                </TextToSpeech>
              </li>
              <li>
                <TextToSpeech text="We came, we saw, we conquered.">
                  "We came, we saw, we conquered." (Julius Caesar)
                </TextToSpeech>
              </li>
              <li>
                <TextToSpeech text="Government of the people, by the people, for the people.">
                  "Government of the people, by the people, for the people." (Abraham Lincoln)
                </TextToSpeech>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="bg-indigo-50 rounded-lg p-4">
          <h4 className="font-bold text-indigo-800 mb-2 flex items-center">
            <span className="bg-indigo-200 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">6</span>
            Antithesis
          </h4>
          <TextToSpeech text="Juxtaposing contrasting ideas in balanced phrases to highlight differences and create impact.">
            <p className="text-indigo-800">
              Juxtaposing contrasting ideas in balanced phrases to highlight differences and create impact.
            </p>
          </TextToSpeech>
          <div className="mt-2 bg-white p-3 rounded border border-indigo-200">
            <p className="text-indigo-800 font-medium">Why it works:</p>
            <ul className="list-disc pl-5 text-indigo-800 space-y-1 mt-1">
              <li>Creates memorable contrasts</li>
              <li>Highlights key differences</li>
              <li>Makes complex ideas clearer</li>
              <li>Adds rhetorical force</li>
            </ul>
            <p className="text-indigo-800 italic mt-2">Examples:</p>
            <ul className="list-disc pl-5 text-indigo-800 space-y-1 mt-1">
              <li>
                <TextToSpeech text="It was the best of times, it was the worst of times.">
                  "It was the best of times, it was the worst of times." (Charles Dickens)
                </TextToSpeech>
              </li>
              <li>
                <TextToSpeech text="Ask not what your country can do for you, ask what you can do for your country.">
                  "Ask not what your country can do for you, ask what you can do for your country." (John F. Kennedy)
                </TextToSpeech>
              </li>
              <li>
                <TextToSpeech text="The cost of action may be high, but the price of inaction is immeasurable.">
                  "The cost of action may be high, but the price of inaction is immeasurable."
                </TextToSpeech>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="bg-teal-50 rounded-lg p-4 mb-6">
        <h4 className="font-bold text-teal-800 mb-2 flex items-center">
          <span className="bg-teal-200 text-teal-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">✓</span>
          Using Persuasive Devices Effectively
        </h4>
        <TextToSpeech text="Guidelines for incorporating persuasive language devices in your writing.">
          <p className="text-teal-800">
            Guidelines for incorporating persuasive language devices in your writing.
          </p>
        </TextToSpeech>
        <div className="mt-2 bg-white p-3 rounded border border-teal-200">
          <ol className="list-decimal pl-5 text-teal-800 space-y-2">
            <li><span className="font-medium">Use purposefully,</span> not just for decoration. Each device should strengthen your argument.</li>
            <li><span className="font-medium">Vary your techniques</span> throughout your essay to maintain reader interest.</li>
            <li><span className="font-medium">Don't overuse</span> any single device, which can make your writing seem forced or artificial.</li>
            <li><span className="font-medium">Match the device</span> to your purpose and audience. Some techniques work better for certain topics.</li>
            <li><span className="font-medium">Practice identifying</span> these devices in persuasive texts you read to better understand their effect.</li>
          </ol>
        </div>
      </div>
      
      <div className="border-t pt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Today's Schedule</h3>
        <TextToSpeech text="Today's schedule includes learning about persuasive language devices, identifying them in example passages, practicing creating sentences using different persuasive devices, and writing a persuasive paragraph incorporating at least three different devices.">
          <ol className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 flex-shrink-0">1</span>
              <span>Learn about persuasive language devices (15 minutes)</span>
            </li>
            <li className="flex items-start">
              <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 flex-shrink-0">2</span>
              <span>Identify persuasive devices in example passages (15 minutes)</span>
            </li>
            <li className="flex items-start">
              <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 flex-shrink-0">3</span>
              <span>Practice creating sentences using different persuasive devices (15 minutes)</span>
            </li>
            <li className="flex items-start">
              <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 flex-shrink-0">4</span>
              <span>Write a persuasive paragraph incorporating at least three different devices (25 minutes)</span>
            </li>
          </ol>
        </TextToSpeech>
      </div>
    </div>
  );
}