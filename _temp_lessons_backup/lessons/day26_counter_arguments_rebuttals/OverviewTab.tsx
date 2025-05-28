import React from 'react';

export function OverviewTab() {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Learning Objective</h3>
      <p className="mb-6 text-gray-700">
        By the end of today, you'll understand how to effectively address counter-arguments and create strong rebuttals in persuasive writing for the NSW Selective exam.
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
                Addressing opposing viewpoints in your persuasive writing can significantly improve your score in the "Ideas & Content" criterion (30%). Examiners consistently reward students who demonstrate critical thinking by acknowledging and responding to counter-arguments.
              </p>
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-lg font-medium text-gray-900 mb-2">Understanding Counter-Arguments & Rebuttals</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-bold text-blue-800 mb-2 flex items-center">
            <span className="bg-blue-200 text-blue-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">1</span>
            Counter-Arguments
          </h4>
          <p className="text-blue-800">
            Opposing viewpoints or objections that challenge your main argument.
          </p>
          <div className="mt-2 bg-white p-3 rounded border border-blue-200">
            <p className="text-blue-800 font-medium">Why address them?</p>
            <ul className="list-disc pl-5 text-blue-800 space-y-1 mt-1">
              <li>Demonstrates fairness and critical thinking</li>
              <li>Strengthens your credibility (ethos)</li>
              <li>Shows you've considered multiple perspectives</li>
              <li>Anticipates and addresses reader concerns</li>
              <li>Makes your argument more comprehensive</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-green-50 rounded-lg p-4">
          <h4 className="font-bold text-green-800 mb-2 flex items-center">
            <span className="bg-green-200 text-green-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">2</span>
            Rebuttals
          </h4>
          <p className="text-green-800">
            Your responses to counter-arguments that defend and strengthen your position.
          </p>
          <div className="mt-2 bg-white p-3 rounded border border-green-200">
            <p className="text-green-800 font-medium">Effective rebuttals:</p>
            <ul className="list-disc pl-5 text-green-800 space-y-1 mt-1">
              <li>Acknowledge the validity of some aspects of opposing views</li>
              <li>Identify flaws in the counter-argument's reasoning</li>
              <li>Provide evidence that contradicts the counter-argument</li>
              <li>Explain why your position is still stronger despite objections</li>
              <li>Reframe the issue to show how your solution addresses concerns</li>
            </ul>
          </div>
        </div>
      </div>
      
      <h3 className="text-lg font-medium text-gray-900 mb-2">Strategies for Addressing Counter-Arguments</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-purple-50 rounded-lg p-4">
          <h4 className="font-bold text-purple-800 mb-2 flex items-center">
            <span className="bg-purple-200 text-purple-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">1</span>
            The "Yes, but..." Approach
          </h4>
          <p className="text-purple-800">
            Acknowledge the validity of a point before explaining why your argument is still stronger.
          </p>
          <div className="mt-2 bg-white p-3 rounded border border-purple-200">
            <p className="text-purple-800 italic">
              "Yes, school uniforms do limit individual expression through clothing choices. However, they create a more equitable environment where students are judged by their character and achievements rather than their fashion sense or financial status."
            </p>
          </div>
        </div>
        
        <div className="bg-red-50 rounded-lg p-4">
          <h4 className="font-bold text-red-800 mb-2 flex items-center">
            <span className="bg-red-200 text-red-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">2</span>
            The "Common Ground" Approach
          </h4>
          <p className="text-red-800">
            Identify shared values or goals before explaining why your solution better achieves them.
          </p>
          <div className="mt-2 bg-white p-3 rounded border border-red-200">
            <p className="text-red-800 italic">
              "Both sides of this debate want what's best for students' education. While opponents of homework believe reducing it will decrease stress, research shows that moderate, meaningful homework actually builds essential study skills that reduce academic anxiety in the long term."
            </p>
          </div>
        </div>
        
        <div className="bg-yellow-50 rounded-lg p-4">
          <h4 className="font-bold text-yellow-800 mb-2 flex items-center">
            <span className="bg-yellow-200 text-yellow-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">3</span>
            The "Evidence-Based" Approach
          </h4>
          <p className="text-yellow-800">
            Present data or expert opinions that directly contradict the counter-argument.
          </p>
          <div className="mt-2 bg-white p-3 rounded border border-yellow-200">
            <p className="text-yellow-800 italic">
              "While some argue that later school start times would disrupt family schedules, a 2023 study by the Sleep Research Institute found that when schools implemented later start times, 87% of families successfully adjusted their routines within one month, and reported improved family dynamics due to better-rested teenagers."
            </p>
          </div>
        </div>
        
        <div className="bg-indigo-50 rounded-lg p-4">
          <h4 className="font-bold text-indigo-800 mb-2 flex items-center">
            <span className="bg-indigo-200 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">4</span>
            The "Reframing" Approach
          </h4>
          <p className="text-indigo-800">
            Shift the perspective to show how the counter-argument misses the main point.
          </p>
          <div className="mt-2 bg-white p-3 rounded border border-indigo-200">
            <p className="text-indigo-800 italic">
              "Critics focus on the initial cost of installing solar panels in schools. However, this view fails to consider the long-term perspective. The question isn't whether we can afford to invest in renewable energy for schools, but whether we can afford not to, given the rising costs of traditional energy sources and the environmental impact."
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-teal-50 rounded-lg p-4 mb-6">
        <h4 className="font-bold text-teal-800 mb-2 flex items-center">
          <span className="bg-teal-200 text-teal-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">✓</span>
          Paragraph Structure for Counter-Arguments
        </h4>
        <p className="text-teal-800">
          A clear, effective structure for addressing opposing viewpoints in your essay.
        </p>
        <div className="mt-2 bg-white p-3 rounded border border-teal-200">
          <ol className="list-decimal pl-5 text-teal-800 space-y-2">
            <li><span className="font-medium">Introduce the counter-argument</span> fairly and accurately.</li>
            <li><span className="font-medium">Acknowledge</span> any valid aspects or concerns.</li>
            <li><span className="font-medium">Present your rebuttal</span> with evidence and reasoning.</li>
            <li><span className="font-medium">Reinforce</span> why your original position is still stronger.</li>
            <li><span className="font-medium">Transition</span> back to your main argument.</li>
          </ol>
          <p className="text-teal-800 italic mt-3">
            "Some people argue that technology in classrooms is distracting and reduces students' ability to focus on learning. This concern about distraction is understandable, as smartphones and social media can indeed pull attention away from educational content. However, research by the Educational Technology Institute shows that when properly implemented with clear guidelines and educational purposes, classroom technology actually increases student engagement by 42% and improves information retention. Furthermore, learning to use technology responsibly under teacher guidance prepares students for the digital workplace they will enter after graduation. Therefore, rather than removing technology from classrooms, we should focus on teaching digital literacy and implementing thoughtful technology policies."
          </p>
        </div>
      </div>
      
      <div className="border-t pt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Today's Schedule</h3>
        <ol className="space-y-2 text-gray-700">
          <li className="flex items-start">
            <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 flex-shrink-0">1</span>
            <span>Learn about counter-arguments and rebuttals (15 minutes)</span>
          </li>
          <li className="flex items-start">
            <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 flex-shrink-0">2</span>
            <span>Identify and analyze counter-arguments in example essays (15 minutes)</span>
          </li>
          <li className="flex items-start">
            <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 flex-shrink-0">3</span>
            <span>Practice creating rebuttals to common counter-arguments (15 minutes)</span>
          </li>
          <li className="flex items-start">
            <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 flex-shrink-0">4</span>
            <span>Write a paragraph that addresses a counter-argument (25 minutes)</span>
          </li>
        </ol>
      </div>
    </div>
  );
}
