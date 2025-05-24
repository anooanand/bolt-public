import React from 'react';

export function OverviewTab() {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Learning Objective</h3>
      <p className="mb-6 text-gray-700">
        By the end of today, you'll apply all the persuasive writing techniques you've learned to practice writing a complete persuasive piece for the NSW Selective exam.
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
                Regular practice with timed persuasive writing exercises is one of the most effective ways to prepare for the NSW Selective exam. Students who practice under exam conditions typically score 15-20% higher in the writing section.
              </p>
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-lg font-medium text-gray-900 mb-2">Persuasive Writing Practice Process</h3>
      
      <div className="grid grid-cols-1 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-bold text-blue-800 mb-2 flex items-center">
            <span className="bg-blue-200 text-blue-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">1</span>
            Analyze the Prompt
          </h4>
          <p className="text-blue-800">
            Carefully read and understand what the prompt is asking you to argue.
          </p>
          <div className="mt-2 bg-white p-3 rounded border border-blue-200">
            <p className="text-blue-800 font-medium">Example prompt:</p>
            <p className="text-blue-800 italic">"Write a persuasive essay arguing whether schools should ban mobile phones during school hours."</p>
            <p className="text-blue-800 mt-2">Key considerations:</p>
            <ul className="list-disc pl-5 text-blue-800 space-y-1 mt-1">
              <li>What position will you take? (for or against the ban)</li>
              <li>Who is your audience? (school administrators, parents, students)</li>
              <li>What tone is appropriate? (formal, semi-formal)</li>
              <li>What persuasive techniques will be most effective?</li>
              <li>What counter-arguments should you address?</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-green-50 rounded-lg p-4">
          <h4 className="font-bold text-green-800 mb-2 flex items-center">
            <span className="bg-green-200 text-green-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">2</span>
            Plan Your Essay
          </h4>
          <p className="text-green-800">
            Create a quick outline with your thesis and main arguments.
          </p>
          <div className="mt-2 bg-white p-3 rounded border border-green-200">
            <p className="text-green-800 font-medium">Planning elements:</p>
            <ul className="list-disc pl-5 text-green-800 space-y-1 mt-1">
              <li><span className="font-medium">Position:</span> Against banning mobile phones</li>
              <li><span className="font-medium">Thesis:</span> While mobile phone use needs regulation, a complete ban is counterproductive and ignores the educational benefits and real-world skills that responsible phone use can provide.</li>
              <li><span className="font-medium">Argument 1:</span> Educational benefits (research tools, educational apps)</li>
              <li><span className="font-medium">Argument 2:</span> Teaching digital citizenship and responsibility</li>
              <li><span className="font-medium">Argument 3:</span> Safety and communication benefits</li>
              <li><span className="font-medium">Counter-argument:</span> Distraction concerns can be addressed through clear policies</li>
              <li><span className="font-medium">Persuasive techniques:</span> Statistics, expert opinions, rhetorical questions, emotional appeals</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-purple-50 rounded-lg p-4">
          <h4 className="font-bold text-purple-800 mb-2 flex items-center">
            <span className="bg-purple-200 text-purple-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">3</span>
            Write Your Essay
          </h4>
          <p className="text-purple-800">
            Write your complete persuasive essay, incorporating the techniques we've learned.
          </p>
          <div className="mt-2 bg-white p-3 rounded border border-purple-200">
            <p className="text-purple-800 font-medium">Essay structure:</p>
            <ol className="list-decimal pl-5 text-purple-800 space-y-1 mt-1">
              <li><span className="font-medium">Introduction:</span> Hook, context, thesis statement</li>
              <li><span className="font-medium">Body Paragraph 1:</span> First main argument with evidence</li>
              <li><span className="font-medium">Body Paragraph 2:</span> Second main argument with evidence</li>
              <li><span className="font-medium">Body Paragraph 3:</span> Third main argument with evidence</li>
              <li><span className="font-medium">Counter-argument Paragraph:</span> Acknowledge and refute opposing views</li>
              <li><span className="font-medium">Conclusion:</span> Restate thesis, summarize arguments, call to action</li>
            </ol>
          </div>
        </div>
        
        <div className="bg-red-50 rounded-lg p-4">
          <h4 className="font-bold text-red-800 mb-2 flex items-center">
            <span className="bg-red-200 text-red-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">4</span>
            Review and Improve
          </h4>
          <p className="text-red-800">
            Evaluate your essay against the assessment criteria and make improvements.
          </p>
          <div className="mt-2 bg-white p-3 rounded border border-red-200">
            <p className="text-red-800 font-medium">Review checklist:</p>
            <ul className="list-disc pl-5 text-red-800 space-y-1 mt-1">
              <li><span className="font-medium">Ideas & Content (30%):</span> Is my argument clear, logical, and well-supported?</li>
              <li><span className="font-medium">Text Structure (20%):</span> Does my essay have a clear introduction, body, and conclusion?</li>
              <li><span className="font-medium">Language & Vocabulary (25%):</span> Have I used persuasive language effectively?</li>
              <li><span className="font-medium">Cohesion (15%):</span> Do my paragraphs and ideas flow logically?</li>
              <li><span className="font-medium">Spelling, Punctuation & Grammar (10%):</span> Have I checked for errors?</li>
              <li><span className="font-medium">Persuasive Techniques:</span> Have I used a variety of persuasive devices?</li>
              <li><span className="font-medium">Counter-arguments:</span> Have I addressed opposing viewpoints?</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="bg-indigo-50 rounded-lg p-4 mb-6">
        <h4 className="font-bold text-indigo-800 mb-2 flex items-center">
          <span className="bg-indigo-200 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">✓</span>
          Persuasive Techniques Checklist
        </h4>
        <p className="text-indigo-800">
          Make sure you've incorporated a variety of persuasive techniques in your essay:
        </p>
        <div className="mt-2 bg-white p-3 rounded border border-indigo-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <ul className="list-disc pl-5 text-indigo-800 space-y-1">
                <li>Rhetorical questions</li>
                <li>Emotive language</li>
                <li>Facts and statistics</li>
                <li>Expert opinions</li>
                <li>Personal anecdotes</li>
                <li>Inclusive language (we, our)</li>
              </ul>
            </div>
            <div>
              <ul className="list-disc pl-5 text-indigo-800 space-y-1">
                <li>Repetition for emphasis</li>
                <li>Rule of three</li>
                <li>Metaphors and similes</li>
                <li>Addressing counter-arguments</li>
                <li>Call to action</li>
                <li>Formal or informal tone (as appropriate)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-t pt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Today's Schedule</h3>
        <ol className="space-y-2 text-gray-700">
          <li className="flex items-start">
            <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 flex-shrink-0">1</span>
            <span>Review persuasive writing techniques (10 minutes)</span>
          </li>
          <li className="flex items-start">
            <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 flex-shrink-0">2</span>
            <span>Analyze the practice prompt and plan your essay (15 minutes)</span>
          </li>
          <li className="flex items-start">
            <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 flex-shrink-0">3</span>
            <span>Write your complete persuasive essay (30 minutes)</span>
          </li>
          <li className="flex items-start">
            <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 flex-shrink-0">4</span>
            <span>Review, evaluate, and improve your essay (15 minutes)</span>
          </li>
        </ol>
      </div>
    </div>
  );
}
