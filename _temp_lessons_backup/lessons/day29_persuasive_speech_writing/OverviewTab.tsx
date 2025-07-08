import React from 'react';

export function OverviewTab() {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Learning Objective</h3>
      <p className="mb-6 text-gray-700">
        By the end of today, you'll understand how to write and deliver effective persuasive speeches for the NSW Selective exam.
      </p>

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
              <p>
                While the NSW Selective exam typically requires written persuasive pieces, the skills of speech writing are valuable for several reasons. They help you develop a stronger sense of audience awareness, create more engaging openings and closings, and master rhetorical techniques that work equally well in written persuasive essays.
              </p>
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-lg font-medium text-gray-900 mb-2">Persuasive Speech vs. Persuasive Essay</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-bold text-blue-800 mb-2 flex items-center">
            <span className="bg-blue-200 text-blue-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">1</span>
            Key Similarities
          </h4>
          <div className="mt-2 bg-white p-3 rounded border border-blue-200">
            <ul className="list-disc pl-5 text-blue-800 space-y-1">
              <li>Both need a clear thesis/position</li>
              <li>Both require strong supporting evidence</li>
              <li>Both benefit from rhetorical devices</li>
              <li>Both need logical organization</li>
              <li>Both aim to persuade the audience</li>
              <li>Both should address counter-arguments</li>
              <li>Both need strong introductions and conclusions</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-green-50 rounded-lg p-4">
          <h4 className="font-bold text-green-800 mb-2 flex items-center">
            <span className="bg-green-200 text-green-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">2</span>
            Key Differences
          </h4>
          <div className="mt-2 bg-white p-3 rounded border border-green-200">
            <ul className="list-disc pl-5 text-green-800 space-y-1">
              <li><span className="font-medium">Audience connection:</span> Speeches use more direct address</li>
              <li><span className="font-medium">Language:</span> Speeches use simpler sentences and more repetition</li>
              <li><span className="font-medium">Structure:</span> Speeches need clearer signposting and transitions</li>
              <li><span className="font-medium">Delivery elements:</span> Speeches include pauses, emphasis, etc.</li>
              <li><span className="font-medium">Length:</span> Speeches are typically shorter and more concise</li>
              <li><span className="font-medium">Memorability:</span> Speeches need more memorable phrases and hooks</li>
            </ul>
          </div>
        </div>
      </div>
      
      <h3 className="text-lg font-medium text-gray-900 mb-2">Elements of Effective Persuasive Speeches</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-purple-50 rounded-lg p-4">
          <h4 className="font-bold text-purple-800 mb-2 flex items-center">
            <span className="bg-purple-200 text-purple-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">1</span>
            Strong Opening
          </h4>
          <p className="text-purple-800">
            Capture attention immediately and establish your purpose.
          </p>
          <div className="mt-2 bg-white p-3 rounded border border-purple-200">
            <p className="text-purple-800 font-medium">Effective opening techniques:</p>
            <ul className="list-disc pl-5 text-purple-800 space-y-1 mt-1">
              <li>Startling statistic or fact</li>
              <li>Provocative question</li>
              <li>Powerful quotation</li>
              <li>Brief, relevant anecdote</li>
              <li>Bold statement or declaration</li>
            </ul>
            <p className="text-purple-800 italic mt-2">Example: "Every day, the average teenager spends more time on social media than they do talking with family members face-to-face. Is this the future we want for human connection?"</p>
          </div>
        </div>
        
        <div className="bg-red-50 rounded-lg p-4">
          <h4 className="font-bold text-red-800 mb-2 flex items-center">
            <span className="bg-red-200 text-red-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">2</span>
            Clear Structure
          </h4>
          <p className="text-red-800">
            Organize your speech in a way that's easy to follow and remember.
          </p>
          <div className="mt-2 bg-white p-3 rounded border border-red-200">
            <p className="text-red-800 font-medium">Basic speech structure:</p>
            <ol className="list-decimal pl-5 text-red-800 space-y-1 mt-1">
              <li><span className="font-medium">Introduction:</span> Hook, thesis, preview main points</li>
              <li><span className="font-medium">Body:</span> 2-3 main arguments with evidence</li>
              <li><span className="font-medium">Address counter-arguments:</span> Acknowledge and refute</li>
              <li><span className="font-medium">Conclusion:</span> Restate thesis, summarize, call to action</li>
            </ol>
            <p className="text-red-800 mt-2">Use clear transitions between sections: "First... Next... Finally..."</p>
          </div>
        </div>
        
        <div className="bg-yellow-50 rounded-lg p-4">
          <h4 className="font-bold text-yellow-800 mb-2 flex items-center">
            <span className="bg-yellow-200 text-yellow-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">3</span>
            Rhetorical Techniques
          </h4>
          <p className="text-yellow-800">
            Use language devices that make your speech more persuasive and memorable.
          </p>
          <div className="mt-2 bg-white p-3 rounded border border-yellow-200">
            <p className="text-yellow-800 font-medium">Key techniques for speeches:</p>
            <ul className="list-disc pl-5 text-yellow-800 space-y-1 mt-1">
              <li><span className="font-medium">Rule of three:</span> "Education shapes our minds, our futures, and our society."</li>
              <li><span className="font-medium">Anaphora:</span> "We must act. We must unite. We must lead the way."</li>
              <li><span className="font-medium">Rhetorical questions:</span> "How long will we ignore this problem?"</li>
              <li><span className="font-medium">Antithesis:</span> "We must not ask what our school can do for us, but what we can do for our school."</li>
              <li><span className="font-medium">Metaphor:</span> "Climate change is a ticking time bomb that we cannot ignore."</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-indigo-50 rounded-lg p-4">
          <h4 className="font-bold text-indigo-800 mb-2 flex items-center">
            <span className="bg-indigo-200 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">4</span>
            Powerful Conclusion
          </h4>
          <p className="text-indigo-800">
            End with impact and leave your audience with a clear takeaway.
          </p>
          <div className="mt-2 bg-white p-3 rounded border border-indigo-200">
            <p className="text-indigo-800 font-medium">Effective conclusion techniques:</p>
            <ul className="list-disc pl-5 text-indigo-800 space-y-1 mt-1">
              <li>Circle back to your opening (create a frame)</li>
              <li>Provide a specific call to action</li>
              <li>End with a powerful quote or statement</li>
              <li>Present a compelling vision of the future</li>
              <li>Use a rhetorical question that lingers</li>
            </ul>
            <p className="text-indigo-800 italic mt-2">Example: "The choice is clear. We can continue down this path of environmental neglect, or we can choose a different future—one where our children inherit a planet even more beautiful than the one we received. The decision is ours, and the time to act is now."</p>
          </div>
        </div>
      </div>
      
      <div className="bg-teal-50 rounded-lg p-4 mb-6">
        <h4 className="font-bold text-teal-800 mb-2 flex items-center">
          <span className="bg-teal-200 text-teal-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">✓</span>
          Speech Writing Tips
        </h4>
        <div className="mt-2 bg-white p-3 rounded border border-teal-200">
          <ol className="list-decimal pl-5 text-teal-800 space-y-2">
            <li><span className="font-medium">Write for the ear, not the eye.</span> Use shorter sentences and simpler vocabulary than you would in an essay.</li>
            <li><span className="font-medium">Use inclusive language</span> like "we" and "our" to create a sense of community with your audience.</li>
            <li><span className="font-medium">Incorporate rhetorical questions</span> to engage your audience and make them think.</li>
            <li><span className="font-medium">Use repetition strategically</span> to emphasize key points and create rhythm.</li>
            <li><span className="font-medium">Include personal stories or anecdotes</span> to connect emotionally with your audience.</li>
            <li><span className="font-medium">Vary your sentence structure</span> to maintain interest and create emphasis.</li>
            <li><span className="font-medium">Read your speech aloud</span> as you write to ensure it flows naturally when spoken.</li>
          </ol>
        </div>
      </div>
      
      <div className="border-t pt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Today's Schedule</h3>
        <ol className="space-y-2 text-gray-700">
          <li className="flex items-start">
            <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 flex-shrink-0">1</span>
            <span>Learn about persuasive speech writing techniques (15 minutes)</span>
          </li>
          <li className="flex items-start">
            <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 flex-shrink-0">2</span>
            <span>Analyze example persuasive speeches (15 minutes)</span>
          </li>
          <li className="flex items-start">
            <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 flex-shrink-0">3</span>
            <span>Plan and outline a persuasive speech (15 minutes)</span>
          </li>
          <li className="flex items-start">
            <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 flex-shrink-0">4</span>
            <span>Write a short persuasive speech (25 minutes)</span>
          </li>
        </ol>
      </div>
    </div>
  );
}
