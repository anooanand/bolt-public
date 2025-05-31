import React, { useState } from 'react';
import { TextToSpeech } from '../../../src/components/TextToSpeech';

export function ActivitiesTab({ completedActivities, toggleActivityCompletion }) {
  const [activity1Answers, setActivity1Answers] = useState({
    passage1Yellow: '',
    passage1Green: '',
    passage1Blue: '',
    passage2Yellow: '',
    passage2Green: '',
    passage2Blue: '',
    passage2Purple: ''
  });
  
  const [showAnswers, setShowAnswers] = useState(false);
  
  const correctAnswers = {
    passage1Yellow: '1', // Repetition (Anaphora)
    passage1Green: '5',  // Tricolon
    passage1Blue: '6',   // Antithesis
    passage2Yellow: '2', // Emotive Language
    passage2Green: '1',  // Repetition (Anaphora)
    passage2Blue: '3',   // Inclusive Language
    passage2Purple: '4'  // Imperative Voice
  };
  
  const handleAnswerChange = (field, value) => {
    setActivity1Answers({
      ...activity1Answers,
      [field]: value
    });
  };
  
  const checkAnswers = () => {
    setShowAnswers(true);
  };
  
  const getAnswerFeedback = (field) => {
    if (!showAnswers) return null;
    
    if (activity1Answers[field] === correctAnswers[field]) {
      return <span className="text-green-600 ml-2">✓ Correct!</span>;
    } else {
      return <span className="text-red-600 ml-2">✗ Incorrect</span>;
    }
  };

  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Interactive Activities</h3>
      
      <div className="bg-indigo-50 p-4 rounded-lg mb-6">
        <TextToSpeech text="Complete these interactive activities to practice using persuasive language devices effectively in your writing for the NSW Selective exam.">
          <p className="text-gray-700">
            Complete these interactive activities to practice using persuasive language devices effectively in your writing for the NSW Selective exam.
          </p>
        </TextToSpeech>
      </div>
      
      <div className="space-y-8">
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-blue-50 px-4 py-2">
            <h4 className="font-medium text-blue-800">Activity 1: Identify Persuasive Language Devices</h4>
          </div>
          <div className="p-4">
            <TextToSpeech text="Read the following passages and identify the persuasive language devices being used.">
              <p className="text-gray-700 mb-4">
                Read the following passages and identify the persuasive language devices being used.
              </p>
            </TextToSpeech>
            
            <div className="space-y-6">
              <div>
                <p className="text-gray-700 mb-2">Passage 1:</p>
                <div className="border p-3 rounded-lg mb-3 bg-gray-50">
                  <TextToSpeech text="The time for action is now. Now is when we must stand up. Now is when we must speak out. Now is when we must make a difference. If we wait any longer, the damage to our environment will be irreversible. We need to protect our forests, preserve our oceans, and purify our air. The choice is clear: we can either continue on our current path of destruction or we can choose a sustainable future.">
                    <p className="text-gray-700">
                      "The time for action is now. <span className="bg-yellow-100 px-1 rounded">Now is when we must stand up. Now is when we must speak out. Now is when we must make a difference.</span> If we wait any longer, the damage to our environment will be irreversible. <span className="bg-green-100 px-1 rounded">We need to protect our forests, preserve our oceans, and purify our air.</span> The choice is clear: <span className="bg-blue-100 px-1 rounded">we can either continue on our current path of destruction or we can choose a sustainable future.</span>"
                    </p>
                  </TextToSpeech>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">What persuasive device is used in the yellow highlighted text?</label>
                    <select 
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      value={activity1Answers.passage1Yellow}
                      onChange={(e) => handleAnswerChange('passage1Yellow', e.target.value)}
                    >
                      <option value="">Select the device...</option>
                      <option value="1">Repetition (Anaphora)</option>
                      <option value="2">Emotive Language</option>
                      <option value="3">Inclusive Language</option>
                      <option value="4">Imperative Voice</option>
                      <option value="5">Tricolon</option>
                      <option value="6">Antithesis</option>
                    </select>
                    {getAnswerFeedback('passage1Yellow')}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">What persuasive device is used in the green highlighted text?</label>
                    <select 
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      value={activity1Answers.passage1Green}
                      onChange={(e) => handleAnswerChange('passage1Green', e.target.value)}
                    >
                      <option value="">Select the device...</option>
                      <option value="1">Repetition (Anaphora)</option>
                      <option value="2">Emotive Language</option>
                      <option value="3">Inclusive Language</option>
                      <option value="4">Imperative Voice</option>
                      <option value="5">Tricolon</option>
                      <option value="6">Antithesis</option>
                    </select>
                    {getAnswerFeedback('passage1Green')}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">What persuasive device is used in the blue highlighted text?</label>
                    <select 
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      value={activity1Answers.passage1Blue}
                      onChange={(e) => handleAnswerChange('passage1Blue', e.target.value)}
                    >
                      <option value="">Select the device...</option>
                      <option value="1">Repetition (Anaphora)</option>
                      <option value="2">Emotive Language</option>
                      <option value="3">Inclusive Language</option>
                      <option value="4">Imperative Voice</option>
                      <option value="5">Tricolon</option>
                      <option value="6">Antithesis</option>
                    </select>
                    {getAnswerFeedback('passage1Blue')}
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-gray-700 mb-2">Passage 2:</p>
                <div className="border p-3 rounded-lg mb-3 bg-gray-50">
                  <TextToSpeech text="The devastating impact of plastic pollution is choking our oceans, poisoning our wildlife, and threatening our future. We cannot stand by while this crisis unfolds. We must take action. We must demand change. As citizens of this planet, we share the responsibility to protect it for future generations. Think about the world you want to leave behind. Consider the consequences of inaction. Join our campaign today.">
                    <p className="text-gray-700">
                      "<span className="bg-yellow-100 px-1 rounded">The devastating impact of plastic pollution is choking our oceans, poisoning our wildlife, and threatening our future.</span> <span className="bg-green-100 px-1 rounded">We cannot stand by while this crisis unfolds. We must take action. We must demand change.</span> <span className="bg-blue-100 px-1 rounded">As citizens of this planet, we share the responsibility to protect it for future generations.</span> <span className="bg-purple-100 px-1 rounded">Think about the world you want to leave behind. Consider the consequences of inaction. Join our campaign today.</span>"
                    </p>
                  </TextToSpeech>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">What persuasive device is used in the yellow highlighted text?</label>
                    <select 
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      value={activity1Answers.passage2Yellow}
                      onChange={(e) => handleAnswerChange('passage2Yellow', e.target.value)}
                    >
                      <option value="">Select the device...</option>
                      <option value="1">Repetition (Anaphora)</option>
                      <option value="2">Emotive Language</option>
                      <option value="3">Inclusive Language</option>
                      <option value="4">Imperative Voice</option>
                      <option value="5">Tricolon</option>
                      <option value="6">Antithesis</option>
                    </select>
                    {getAnswerFeedback('passage2Yellow')}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">What persuasive device is used in the green highlighted text?</label>
                    <select 
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      value={activity1Answers.passage2Green}
                      onChange={(e) => handleAnswerChange('passage2Green', e.target.value)}
                    >
                      <option value="">Select the device...</option>
                      <option value="1">Repetition (Anaphora)</option>
                      <option value="2">Emotive Language</option>
                      <option value="3">Inclusive Language</option>
                      <option value="4">Imperative Voice</option>
                      <option value="5">Tricolon</option>
                      <option value="6">Antithesis</option>
                    </select>
                    {getAnswerFeedback('passage2Green')}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">What persuasive device is used in the blue highlighted text?</label>
                    <select 
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      value={activity1Answers.passage2Blue}
                      onChange={(e) => handleAnswerChange('passage2Blue', e.target.value)}
                    >
                      <option value="">Select the device...</option>
                      <option value="1">Repetition (Anaphora)</option>
                      <option value="2">Emotive Language</option>
                      <option value="3">Inclusive Language</option>
                      <option value="4">Imperative Voice</option>
                      <option value="5">Tricolon</option>
                      <option value="6">Antithesis</option>
                    </select>
                    {getAnswerFeedback('passage2Blue')}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">What persuasive device is used in the purple highlighted text?</label>
                    <select 
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      value={activity1Answers.passage2Purple}
                      onChange={(e) => handleAnswerChange('passage2Purple', e.target.value)}
                    >
                      <option value="">Select the device...</option>
                      <option value="1">Repetition (Anaphora)</option>
                      <option value="2">Emotive Language</option>
                      <option value="3">Inclusive Language</option>
                      <option value="4">Imperative Voice</option>
                      <option value="5">Tricolon</option>
                      <option value="6">Antithesis</option>
                    </select>
                    {getAnswerFeedback('passage2Purple')}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={checkAnswers}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Check Answers
                </button>
              </div>
              
              {showAnswers && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
                  <h5 className="font-medium text-green-800 mb-2">Answer Key:</h5>
                  <ul className="space-y-1 text-green-700">
                    <li>Passage 1, Yellow: Repetition (Anaphora)</li>
                    <li>Passage 1, Green: Tricolon</li>
                    <li>Passage 1, Blue: Antithesis</li>
                    <li>Passage 2, Yellow: Emotive Language</li>
                    <li>Passage 2, Green: Repetition (Anaphora)</li>
                    <li>Passage 2, Blue: Inclusive Language</li>
                    <li>Passage 2, Purple: Imperative Voice</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-green-50 px-4 py-2">
            <h4 className="font-medium text-green-800">Activity 2: Create Sentences Using Persuasive Devices</h4>
          </div>
          <div className="p-4">
            <TextToSpeech text="Practice creating sentences using different persuasive language devices.">
              <p className="text-gray-700 mb-4">
                Practice creating sentences using different persuasive language devices.
              </p>
            </TextToSpeech>
            
            <div className="space-y-6">
              <div>
                <p className="text-gray-700 mb-2">Topic: <span className="font-medium">The importance of reading books</span></p>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Write a sentence using repetition (anaphora):</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Example: Books inspire us. Books teach us. Books transform us."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Write a sentence using emotive language:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Example: The heartbreaking decline in reading habits threatens to rob our children of the magical world of literature."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Write a sentence using inclusive language:</label>
                    <textarea
                      rows={2}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Example: Together, we can create a community of lifelong readers who share the joy of storytelling."
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}