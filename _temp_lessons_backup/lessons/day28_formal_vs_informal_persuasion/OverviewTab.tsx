import React from 'react';

export function OverviewTab() {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Learning Objective</h3>
      <p className="mb-6 text-gray-700">
        By the end of today, you'll understand the differences between formal and informal persuasive writing and when to use each style for the NSW Selective exam.
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
                The NSW Selective exam may require either formal or informal persuasive writing, depending on the prompt. Students who can adapt their writing style to match the appropriate context typically score 10-15% higher in the "Language & Vocabulary" criterion.
              </p>
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-lg font-medium text-gray-900 mb-2">Formal vs. Informal Persuasive Writing</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-bold text-blue-800 mb-2 flex items-center">
            <span className="bg-blue-200 text-blue-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">1</span>
            Formal Persuasive Writing
          </h4>
          <p className="text-blue-800">
            Used in academic essays, business proposals, letters to officials, and newspaper editorials.
          </p>
          <div className="mt-2 bg-white p-3 rounded border border-blue-200">
            <p className="text-blue-800 font-medium">Key characteristics:</p>
            <ul className="list-disc pl-5 text-blue-800 space-y-1 mt-1">
              <li>Uses third-person perspective (they, one, individuals)</li>
              <li>Avoids contractions (cannot vs. can't)</li>
              <li>Uses precise vocabulary and technical terms</li>
              <li>Avoids slang, colloquialisms, and idioms</li>
              <li>Uses complex sentence structures</li>
              <li>Maintains an objective, impersonal tone</li>
              <li>Relies heavily on facts, statistics, and expert opinions</li>
              <li>Uses full words rather than abbreviations</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-green-50 rounded-lg p-4">
          <h4 className="font-bold text-green-800 mb-2 flex items-center">
            <span className="bg-green-200 text-green-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">2</span>
            Informal Persuasive Writing
          </h4>
          <p className="text-green-800">
            Used in blog posts, social media, letters to friends, and school newspaper articles.
          </p>
          <div className="mt-2 bg-white p-3 rounded border border-green-200">
            <p className="text-green-800 font-medium">Key characteristics:</p>
            <ul className="list-disc pl-5 text-green-800 space-y-1 mt-1">
              <li>Uses first and second person (I, we, you)</li>
              <li>Uses contractions (can't, don't, it's)</li>
              <li>Uses everyday language and conversational tone</li>
              <li>May include appropriate slang or colloquialisms</li>
              <li>Uses simpler, more direct sentence structures</li>
              <li>Expresses personal opinions and experiences</li>
              <li>Relies more on anecdotes and relatable examples</li>
              <li>May use rhetorical questions to engage readers</li>
            </ul>
          </div>
        </div>
      </div>
      
      <h3 className="text-lg font-medium text-gray-900 mb-2">When to Use Each Style</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-purple-50 rounded-lg p-4">
          <h4 className="font-bold text-purple-800 mb-2 flex items-center">
            <span className="bg-purple-200 text-purple-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">1</span>
            Use Formal Style When:
          </h4>
          <div className="mt-2 bg-white p-3 rounded border border-purple-200">
            <ul className="list-disc pl-5 text-purple-800 space-y-1">
              <li>The prompt asks you to write to an authority figure (principal, mayor, editor)</li>
              <li>The topic is serious or academic (environmental policy, educational reform)</li>
              <li>You're writing an essay for a formal publication</li>
              <li>You need to establish credibility on a complex issue</li>
              <li>The audience is unfamiliar or distant (general public, officials)</li>
            </ul>
            <p className="text-purple-800 italic mt-2">Example prompt: "Write a letter to your local council persuading them to invest in more public libraries."</p>
          </div>
        </div>
        
        <div className="bg-red-50 rounded-lg p-4">
          <h4 className="font-bold text-red-800 mb-2 flex items-center">
            <span className="bg-red-200 text-red-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">2</span>
            Use Informal Style When:
          </h4>
          <div className="mt-2 bg-white p-3 rounded border border-red-200">
            <ul className="list-disc pl-5 text-red-800 space-y-1">
              <li>The prompt asks you to write to peers or friends</li>
              <li>The topic relates to youth culture or school life</li>
              <li>You're writing for a school newspaper or blog</li>
              <li>You want to create a strong emotional connection</li>
              <li>The audience is familiar (classmates, community members)</li>
            </ul>
            <p className="text-red-800 italic mt-2">Example prompt: "Write a blog post convincing your fellow students to join the school's environmental club."</p>
          </div>
        </div>
      </div>
      
      <div className="bg-yellow-50 rounded-lg p-4 mb-6">
        <h4 className="font-bold text-yellow-800 mb-2 flex items-center">
          <span className="bg-yellow-200 text-yellow-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">✓</span>
          Comparing Formal and Informal Approaches
        </h4>
        <p className="text-yellow-800">
          See how the same argument can be presented in both formal and informal styles:
        </p>
        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-3 rounded border border-yellow-200">
            <p className="text-yellow-800 font-medium">Formal:</p>
            <p className="text-yellow-800 italic">
              "Research indicates that reducing school hours would be detrimental to educational outcomes. A study conducted by the Education Research Institute (2023) found that students who received fewer instructional hours scored significantly lower on standardized assessments. Furthermore, reduced school hours would create additional childcare challenges for working parents, potentially leading to increased economic strain on families."
            </p>
          </div>
          <div className="bg-white p-3 rounded border border-yellow-200">
            <p className="text-yellow-800 font-medium">Informal:</p>
            <p className="text-yellow-800 italic">
              "Let's be real—cutting school hours isn't the answer. Don't we want to do well on our exams? Research shows that less time in class means lower test scores. And think about your parents—they'd have to figure out what to do with you during those extra hours at home! Many of them work full-time jobs. It's just not practical, is it?"
            </p>
          </div>
        </div>
      </div>
      
      <div className="border-t pt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Today's Schedule</h3>
        <ol className="space-y-2 text-gray-700">
          <li className="flex items-start">
            <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 flex-shrink-0">1</span>
            <span>Learn about formal and informal persuasive writing (15 minutes)</span>
          </li>
          <li className="flex items-start">
            <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 flex-shrink-0">2</span>
            <span>Identify formal and informal elements in example passages (15 minutes)</span>
          </li>
          <li className="flex items-start">
            <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 flex-shrink-0">3</span>
            <span>Practice converting between formal and informal styles (15 minutes)</span>
          </li>
          <li className="flex items-start">
            <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 flex-shrink-0">4</span>
            <span>Write two persuasive paragraphs on the same topic—one formal and one informal (25 minutes)</span>
          </li>
        </ol>
      </div>
    </div>
  );
}
