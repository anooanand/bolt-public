import React from 'react';

export function OverviewTab() {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Learning Objective</h3>
      <p className="mb-6 text-gray-700">
        By the end of today, you'll understand how to use rhetorical questions and appeals effectively in persuasive writing for the NSW Selective exam.
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
                Effective use of rhetorical questions and appeals can significantly improve your score in both the "Ideas & Content" (30%) and "Language & Vocabulary" (25%) criteria. These techniques help engage readers and make your arguments more compelling.
              </p>
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-lg font-medium text-gray-900 mb-2">Rhetorical Questions</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-bold text-blue-800 mb-2 flex items-center">
            <span className="bg-blue-200 text-blue-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">1</span>
            What Are Rhetorical Questions?
          </h4>
          <p className="text-blue-800">
            Questions asked for effect, to make readers think or feel a certain way, rather than to get an answer.
          </p>
          <div className="mt-2 bg-white p-3 rounded border border-blue-200">
            <p className="text-blue-800 font-medium">Examples:</p>
            <ul className="list-disc pl-5 text-blue-800 space-y-1 mt-1">
              <li>Isn't it time we took action on climate change?</li>
              <li>How would you feel if someone treated you that way?</li>
              <li>Who doesn't want to succeed in life?</li>
              <li>Haven't we waited long enough for change?</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-green-50 rounded-lg p-4">
          <h4 className="font-bold text-green-800 mb-2 flex items-center">
            <span className="bg-green-200 text-green-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">2</span>
            Purposes of Rhetorical Questions
          </h4>
          <p className="text-green-800">
            Strategic uses of rhetorical questions in persuasive writing.
          </p>
          <div className="mt-2 bg-white p-3 rounded border border-green-200">
            <p className="text-green-800 font-medium">Functions:</p>
            <ul className="list-disc pl-5 text-green-800 space-y-1 mt-1">
              <li><span className="font-medium">Engage the reader:</span> Draw readers into your argument</li>
              <li><span className="font-medium">Emphasize a point:</span> Highlight important ideas</li>
              <li><span className="font-medium">Create agreement:</span> Lead readers to agree with your position</li>
              <li><span className="font-medium">Stimulate thought:</span> Make readers reflect on your argument</li>
              <li><span className="font-medium">Transition:</span> Move smoothly between ideas or paragraphs</li>
            </ul>
          </div>
        </div>
      </div>
      
      <h3 className="text-lg font-medium text-gray-900 mb-2">Rhetorical Appeals</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-purple-50 rounded-lg p-4">
          <h4 className="font-bold text-purple-800 mb-2 flex items-center">
            <span className="bg-purple-200 text-purple-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">1</span>
            Ethos (Appeal to Ethics/Credibility)
          </h4>
          <p className="text-purple-800">
            Establishing your credibility or citing trustworthy sources to strengthen your argument.
          </p>
          <div className="mt-2 bg-white p-3 rounded border border-purple-200">
            <p className="text-purple-800 font-medium">Techniques:</p>
            <ul className="list-disc pl-5 text-purple-800 space-y-1 mt-1">
              <li>Citing experts or authorities</li>
              <li>Demonstrating knowledge of the topic</li>
              <li>Acknowledging opposing viewpoints fairly</li>
              <li>Using appropriate language and tone</li>
            </ul>
            <p className="text-purple-800 italic mt-2">Example: "As Dr. Sarah Chen, a leading environmental scientist, has demonstrated in her recent research..."</p>
          </div>
        </div>
        
        <div className="bg-red-50 rounded-lg p-4">
          <h4 className="font-bold text-red-800 mb-2 flex items-center">
            <span className="bg-red-200 text-red-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">2</span>
            Pathos (Appeal to Emotion)
          </h4>
          <p className="text-red-800">
            Evoking emotional responses to persuade readers and make them care about your argument.
          </p>
          <div className="mt-2 bg-white p-3 rounded border border-red-200">
            <p className="text-red-800 font-medium">Techniques:</p>
            <ul className="list-disc pl-5 text-red-800 space-y-1 mt-1">
              <li>Using emotive language</li>
              <li>Sharing personal stories or anecdotes</li>
              <li>Creating vivid imagery</li>
              <li>Appealing to shared values</li>
            </ul>
            <p className="text-red-800 italic mt-2">Example: "Imagine the heartbreak of families forced to flee their homes, carrying only what they can fit in their arms, as floodwaters destroy everything they've worked for."</p>
          </div>
        </div>
        
        <div className="bg-yellow-50 rounded-lg p-4">
          <h4 className="font-bold text-yellow-800 mb-2 flex items-center">
            <span className="bg-yellow-200 text-yellow-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">3</span>
            Logos (Appeal to Logic)
          </h4>
          <p className="text-yellow-800">
            Using reasoning, evidence, and facts to support your argument and appeal to readers' rationality.
          </p>
          <div className="mt-2 bg-white p-3 rounded border border-yellow-200">
            <p className="text-yellow-800 font-medium">Techniques:</p>
            <ul className="list-disc pl-5 text-yellow-800 space-y-1 mt-1">
              <li>Presenting statistics and data</li>
              <li>Using cause-and-effect reasoning</li>
              <li>Making logical comparisons</li>
              <li>Providing concrete examples</li>
            </ul>
            <p className="text-yellow-800 italic mt-2">Example: "Research shows that schools with mandatory uniform policies report 23% fewer disciplinary incidents and a 15% improvement in attendance rates."</p>
          </div>
        </div>
      </div>
      
      <div className="bg-indigo-50 rounded-lg p-4 mb-6">
        <h4 className="font-bold text-indigo-800 mb-2 flex items-center">
          <span className="bg-indigo-200 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">✓</span>
          Balancing the Three Appeals
        </h4>
        <p className="text-indigo-800">
          The most effective persuasive writing uses a strategic combination of ethos, pathos, and logos.
        </p>
        <div className="mt-2 bg-white p-3 rounded border border-indigo-200">
          <p className="text-indigo-800 italic">
            "As a student who has witnessed bullying firsthand (ethos), I believe we must implement stronger anti-bullying policies in our schools. Research from the Department of Education shows that comprehensive anti-bullying programs reduce incidents by up to 50% (logos). Imagine the difference this would make for the countless students who dread coming to school each day, who suffer in silence, and whose educational opportunities are diminished by fear (pathos). Isn't it our responsibility to ensure every student feels safe in their learning environment?"
          </p>
        </div>
      </div>
      
      <div className="border-t pt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Today's Schedule</h3>
        <ol className="space-y-2 text-gray-700">
          <li className="flex items-start">
            <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 flex-shrink-0">1</span>
            <span>Learn about rhetorical questions and appeals (15 minutes)</span>
          </li>
          <li className="flex items-start">
            <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 flex-shrink-0">2</span>
            <span>Identify rhetorical techniques in example passages (15 minutes)</span>
          </li>
          <li className="flex items-start">
            <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 flex-shrink-0">3</span>
            <span>Practice creating effective rhetorical questions and appeals (15 minutes)</span>
          </li>
          <li className="flex items-start">
            <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 flex-shrink-0">4</span>
            <span>Write a persuasive paragraph using rhetorical questions and all three appeals (25 minutes)</span>
          </li>
        </ol>
      </div>
    </div>
  );
}
