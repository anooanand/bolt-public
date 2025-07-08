import React, { useState } from 'react';

interface FAQItemProps {
  question: string;
  answer: React.ReactNode;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 dark:border-gray-700">
      <button
        className="flex justify-between items-center w-full py-4 px-2 text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-medium text-gray-800 dark:text-white">{question}</span>
        <svg
          className={`w-5 h-5 text-indigo-600 dark:text-indigo-400 transition-transform duration-300 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 pb-4' : 'max-h-0'
        }`}
      >
        <div className="px-2 text-gray-700 dark:text-gray-300">{answer}</div>
      </div>
    </div>
  );
};

export const FAQPage: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">
          Frequently Asked Questions
        </h1>
        <p className="text-center text-lg text-gray-700 dark:text-gray-300 mb-12">
          Learn about NSW Selective exams and how our AI-powered writing assistant helps students excel
        </p>
        
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">AI Writing Assistant</h2>
          
          <FAQItem
            question="Does the AI write essays for me?"
            answer={
              <div>
                <p className="mb-2">
                  No, our AI never writes essays for you. This is important for several reasons:
                </p>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                  <li>Learning: You need to develop your own writing skills to succeed in exams and beyond</li>
                  <li>Authenticity: Examiners can detect AI-generated content</li>
                  <li>Ethics: Using AI to write essays for you is considered cheating</li>
                </ul>
                <p className="mb-2">Instead, our AI:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Guides you through the writing process step by step</li>
                  <li>Helps you brainstorm and organize your ideas</li>
                  <li>Provides feedback on your writing</li>
                  <li>Suggests improvements for grammar, structure, and style</li>
                  <li>Teaches you writing techniques you can use in exams</li>
                </ul>
              </div>
            }
          />
          
          <FAQItem
            question="How does the AI improve writing skills?"
            answer={
              <div>
                <p className="mb-2">
                  Our AI enhances writing skills through multiple approaches:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Interactive guidance through the writing process</li>
                  <li>Constructive feedback on your work</li>
                  <li>Teaching writing techniques and strategies</li>
                  <li>Helping you identify areas for improvement</li>
                  <li>Providing examples of effective writing techniques</li>
                </ul>
                <p className="mt-2">
                  The AI adapts to your skill level and provides increasingly advanced suggestions as you progress.
                </p>
              </div>
            }
          />
          
          <FAQItem
            question="Can AI detect plagiarism?"
            answer={
              <div>
                <p className="mb-2">
                  Yes, our AI system includes advanced plagiarism detection:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Checks against a vast database of texts</li>
                  <li>Identifies copied content and paraphrasing</li>
                  <li>Ensures originality in student work</li>
                  <li>Provides reports on content authenticity</li>
                </ul>
                <p className="mt-2 font-medium">
                  Note: Plagiarism is strictly prohibited and may result in account suspension.
                </p>
              </div>
            }
          />
          
          <FAQItem
            question="What is InstaChat AI Writing Mate?"
            answer={
              <p>
                InstaChat AI Writing Mate is an AI-powered writing coach specifically designed to help students prepare for NSW Selective School exams. It provides personalized guidance, real-time feedback, and structured practice for various writing types required in the exam.
              </p>
            }
          />
          
          <FAQItem
            question="How does InstaChat AI differ from other AI writing tools?"
            answer={
              <div>
                <p className="mb-2">
                  Unlike generic AI chatbots that simply generate content, InstaChat AI:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Provides step-by-step writing guidance following NSW curriculum standards</li>
                  <li>Offers real-time feedback on grammar, structure, and content</li>
                  <li>Adapts to each student's skill level</li>
                  <li>Focuses on teaching writing skills rather than just generating answers</li>
                  <li>Includes exam-specific strategies and practice environments</li>
                </ul>
              </div>
            }
          />
        </div>
        
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">NSW Selective Exam Preparation</h2>
          
          <FAQItem
            question="What writing types are covered for NSW Selective exams?"
            answer={
              <div>
                <p className="mb-2">Our platform covers all major writing types that may appear in NSW Selective exams:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Narrative Writing - Stories with plots, characters, and descriptive elements</li>
                  <li>Persuasive Writing - Arguments using the PEEL method</li>
                  <li>Informative Writing - Clear explanations of topics</li>
                  <li>Reflective Writing - Personal insights and experiences</li>
                  <li>Imaginative Writing - Creative and fantastical stories</li>
                  <li>Discursive Writing - Exploring different viewpoints</li>
                  <li>Descriptive Writing - Creating vivid imagery with words</li>
                  <li>Recount Writing - Sharing personal or historical experiences</li>
                  <li>Diary Entry Writing - Personal thoughts and feelings</li>
                </ul>
              </div>
            }
          />
          
          <FAQItem
            question="How does the exam simulation work?"
            answer={
              <div>
                <p className="mb-2">
                  The NSW Selective Exam Practice Simulator creates a realistic exam environment with:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Timed writing sessions that match actual exam conditions</li>
                  <li>Real-time word count tracking</li>
                  <li>Post-session review and feedback</li>
                  <li>Assessment based on NSW marking criteria</li>
                </ul>
                <p className="mt-2">
                  This helps students practice under pressure and get familiar with exam conditions while receiving feedback aligned with NSW marking standards.
                </p>
              </div>
            }
          />
          
          <FAQItem
            question="What marking criteria are used for assessment?"
            answer={
              <div>
                <p className="mb-2">
                  Our assessment follows the official NSW Selective School marking criteria, including:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Content and ideas - Originality, relevance, and development</li>
                  <li>Structure and organization - Logical flow and paragraph structure</li>
                  <li>Language and expression - Vocabulary, grammar, and sentence variety</li>
                  <li>Mechanics - Spelling, punctuation, and formatting</li>
                  <li>Text type requirements - Specific elements for each writing type</li>
                </ul>
                <p className="mt-2">
                  Feedback is provided for each criterion to help students understand their strengths and areas for improvement.
                </p>
              </div>
            }
          />
          
          <FAQItem
            question="How should students prepare for the NSW Selective exam?"
            answer={
              <div>
                <p className="mb-2">
                  We recommend a structured approach to preparation:
                </p>
                <ol className="list-decimal pl-5 space-y-1">
                  <li>Start early - Begin preparation at least 6-12 months before the exam</li>
                  <li>Understand the requirements - Learn what each writing type requires</li>
                  <li>Regular practice - Write consistently using our platform</li>
                  <li>Timed practice - Get comfortable writing under time constraints</li>
                  <li>Seek feedback - Use our AI coach to improve your writing</li>
                  <li>Review and revise - Learn from mistakes and implement improvements</li>
                  <li>Practice exam conditions - Use our simulator for realistic practice</li>
                </ol>
                <p className="mt-2">
                  Consistent practice with guidance is the key to success in the NSW Selective exam.
                </p>
              </div>
            }
          />
        </div>
        
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Using the Platform</h2>
          
          <FAQItem
            question="How do I get started with InstaChat AI Writing Mate?"
            answer={
              <div>
                <p className="mb-2">Getting started is easy:</p>
                <ol className="list-decimal pl-5 space-y-1">
                  <li>Create an account or sign in</li>
                  <li>Select a writing type (narrative, persuasive, etc.)</li>
                  <li>Choose your assistance level</li>
                  <li>Start writing with AI guidance</li>
                </ol>
              </div>
            }
          />
          
          <FAQItem
            question="How does the step-by-step writing guidance work?"
            answer={
              <div>
                <p className="mb-2">
                  Our AI provides structured guidance through each stage of the writing process:
                </p>
                <ol className="list-decimal pl-5 space-y-1">
                  <li>Understanding the prompt - Analyzing what the question asks</li>
                  <li>Planning - Organizing your ideas and creating an outline</li>
                  <li>Introduction - Crafting an engaging opening</li>
                  <li>Body paragraphs - Developing your arguments or narrative</li>
                  <li>Conclusion - Creating an effective ending</li>
                  <li>Revision - Improving your work based on feedback</li>
                </ol>
                <p className="mt-2">
                  The AI adapts its guidance based on your writing type and skill level, providing appropriate scaffolding and examples.
                </p>
              </div>
            }
          />
          
          <FAQItem
            question="Can I save my work and continue later?"
            answer={
              <p>
                Yes, the platform automatically saves your work as you write. You can leave and return to continue working on your essays at any time. Your progress, feedback, and writing history are all preserved in your account.
              </p>
            }
          />
          
          <FAQItem
            question="Is there a word limit for essays?"
            answer={
              <p>
                The platform supports essays of any length, but we recommend following NSW Selective exam guidelines, which typically suggest 350-500 words depending on the writing type. The word counter feature helps you track your progress and stay within recommended limits.
              </p>
            }
          />
        </div>
        
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Technical Questions</h2>
          
          <FAQItem
            question="Is my child's writing data secure?"
            answer={
              <p>
                Yes, we take data security seriously. All writing data is encrypted and stored securely. We do not share student writing with third parties, and all data is used solely for providing feedback and improving the platform's educational capabilities.
              </p>
            }
          />
          
          <FAQItem
            question="Can I access InstaChat AI Writing Mate on mobile devices?"
            answer={
              <p>
                Yes, InstaChat AI Writing Mate is fully responsive and works on smartphones, tablets, and computers. Students can practice their writing skills on any device with an internet connection.
              </p>
            }
          />
          
          <FAQItem
            question="Do I need to install any software?"
            answer={
              <p>
                No, InstaChat AI Writing Mate is a web-based platform that runs in your browser. There's no need to install any software or apps – simply sign in and start writing.
              </p>
            }
          />
          
          <FAQItem
            question="What subscription plans are available?"
            answer={
              <p>
                We offer flexible subscription plans to meet different needs, including monthly and annual options. Please visit our Pricing page for the most current information on available plans and features.
              </p>
            }
          />
          
          <FAQItem
            question="Is there a free trial available?"
            answer={
              <p>
                Yes, we offer a limited free trial so you can experience the platform before subscribing. The free trial gives access to basic features and allows you to see how the AI coaching works.
              </p>
            }
          />
          
          <FAQItem
            question="How can I get help if I have questions?"
            answer={
              <p>
                Our support team is available to help with any questions. You can contact us through the Help Center in your account, or email support@instachatai.co for assistance.
              </p>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
