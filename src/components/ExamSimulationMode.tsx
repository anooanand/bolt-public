import React, { useState } from 'react';
import { Clock, X } from 'lucide-react';

interface ExamSimulationModeProps {
  onExit: () => void;
}

export function ExamSimulationMode({ onExit }: ExamSimulationModeProps) {
  const [timeRemaining, setTimeRemaining] = useState(30); // 30 minutes for exam

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Clock className="w-6 h-6 text-blue-600 mr-2" />
            <h1 className="text-xl font-bold text-gray-900">Exam Simulation Mode</h1>
          </div>
          <button
            onClick={onExit}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Exit exam mode"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
          <div className="flex items-center justify-between">
            <span className="text-blue-700 font-medium">Time Remaining:</span>
            <span className="text-2xl font-bold text-blue-800">{timeRemaining}:00</span>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Writing Prompt</h2>
          <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
            <p className="text-gray-700">
              Write a persuasive essay on the following topic:
              "Should schools replace traditional textbooks with digital devices?"
              Consider both the advantages and disadvantages in your response.
            </p>
          </div>
        </div>

        <div className="mb-4">
          <textarea
            className="w-full h-96 p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Start writing your response here..."
          />
        </div>

        <div className="flex justify-between items-center">
          <button
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
            onClick={onExit}
          >
            Exit Exam Mode
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Submit Essay
          </button>
        </div>
      </div>
    </div>
  );
}