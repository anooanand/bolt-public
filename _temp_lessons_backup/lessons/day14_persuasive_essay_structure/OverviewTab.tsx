import React from 'react';

export function OverviewTab() {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Learning Objective</h3>
      <p className="mb-6 text-gray-700">
        By the end of today, you'll understand how to structure a persuasive essay effectively for the NSW Selective exam.
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
                A well-structured persuasive essay is crucial for the "Structure & Organization" criterion (25% of your writing score). Examiners look for clear organization, logical flow, and effective transitions between ideas.
              </p>
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-lg font-medium text-gray-900 mb-2">Persuasive Essay Structure</h3>
      
      <div className="grid grid-cols-1 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-bold text-blue-800 mb-2 flex items-center">
            <span className="bg-blue-200 text-blue-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">1</span>
            Introduction
          </h4>
          <p className="text-blue-800">
            The opening paragraph that grabs attention, provides context, and clearly states your position (thesis statement).
          </p>
          <div className="mt-2 bg-white p-3 rounded border border-blue-200">
            <p className="text-blue-800 font-medium">Key components:</p>
            <ul className="list-disc pl-5 text-blue-800 space-y-1 mt-1">
              <li>Hook: An engaging opening that captures reader interest</li>
              <li>Background: Brief context about the issue</li>
              <li>Thesis statement: Your clear position on the topic</li>
              <li>Roadmap: Brief overview of your main arguments (optional)</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-green-50 rounded-lg p-4">
          <h4 className="font-bold text-green-800 mb-2 flex items-center">
            <span className="bg-green-200 text-green-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">2</span>
            Body Paragraphs (2-3)
          </h4>
          <p className="text-green-800">
            The main sections that present your arguments with supporting evidence. Each paragraph should focus on one main point.
          </p>
          <div className="mt-2 bg-white p-3 rounded border border-green-200">
            <p className="text-green-800 font-medium">PEEL structure for each paragraph:</p>
            <ul className="list-disc pl-5 text-green-800 space-y-1 mt-1">
              <li>Point: Topic sentence stating your argument</li>
              <li>Evidence: Facts, statistics, examples, or expert opinions</li>
              <li>Explanation: How the evidence supports your point</li>
              <li>Link: Connection back to thesis or transition to next paragraph</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-purple-50 rounded-lg p-4">
          <h4 className="font-bold text-purple-800 mb-2 flex items-center">
            <span className="bg-purple-200 text-purple-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">3</span>
            Counterargument Paragraph (Optional)
          </h4>
          <p className="text-purple-800">
            A paragraph that acknowledges opposing viewpoints and explains why your position is still stronger.
          </p>
          <div className="mt-2 bg-white p-3 rounded border border-purple-200">
            <p className="text-purple-800 font-medium">Key components:</p>
            <ul className="list-disc pl-5 text-purple-800 space-y-1 mt-1">
              <li>Acknowledge: Present the opposing view fairly</li>
              <li>Counter: Explain why this view is flawed or limited</li>
              <li>Reinforce: Strengthen your own position in comparison</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-red-50 rounded-lg p-4">
          <h4 className="font-bold text-red-800 mb-2 flex items-center">
            <span className="bg-red-200 text-red-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">4</span>
            Conclusion
          </h4>
          <p className="text-red-800">
            The final paragraph that reinforces your position and leaves a lasting impression.
          </p>
          <div className="mt-2 bg-white p-3 rounded border border-red-200">
            <p className="text-red-800 font-medium">Key components:</p>
            <ul className="list-disc pl-5 text-red-800 space-y-1 mt-1">
              <li>Restate thesis: Remind readers of your position (in different words)</li>
              <li>Summarize: Briefly recap your main arguments</li>
              <li>Broader implications: Explain why this matters</li>
              <li>Call to action: Encourage readers to think or act in a specific way</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="border-t pt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Today's Schedule</h3>
        <ol className="space-y-2 text-gray-700">
          <li className="flex items-start">
            <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 flex-shrink-0">1</span>
            <span>Learn about persuasive essay structure (15 minutes)</span>
          </li>
          <li className="flex items-start">
            <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 flex-shrink-0">2</span>
            <span>Analyze the structure of example persuasive essays (15 minutes)</span>
          </li>
          <li className="flex items-start">
            <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 flex-shrink-0">3</span>
            <span>Create an essay outline using the PEEL structure (15 minutes)</span>
          </li>
          <li className="flex items-start">
            <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 flex-shrink-0">4</span>
            <span>Write an introduction and one body paragraph for a persuasive essay (25 minutes)</span>
          </li>
        </ol>
      </div>
    </div>
  );
}
