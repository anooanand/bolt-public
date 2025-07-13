import React, { useState, useEffect } from 'react';
import { Clock, FileText, Save, Settings } from 'lucide-react';
import { WritingStatusBar } from './WritingStatusBar';
import { DynamicPromptDisplay } from './DynamicPromptDisplay';
import { StructuredPlanningSection } from './StructuredPlanningSection';

interface ExamModeWritingInterfaceProps {
  examDurationMinutes?: number;
  targetWordCountMin?: number;
  targetWordCountMax?: number;
  textType: string;
  prompt: string;
  promptImage?: string;
  onSubmit?: (content: string, plan: any) => void;
}

export function ExamModeWritingInterface({
  examDurationMinutes = 30,
  targetWordCountMin = 100,
  targetWordCountMax = 500,
  textType,
  prompt,
  promptImage,
  onSubmit
}: ExamModeWritingInterfaceProps) {
  const [content, setContent] = useState('');
  const [plan, setPlan] = useState<any>(null);
  const [showPlanning, setShowPlanning] = useState(false);
  const [examStarted, setExamStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(examDurationMinutes * 60);

  // Timer logic
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (examStarted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            setExamStarted(false);
            handleAutoSubmit();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [examStarted, timeLeft]);

  const handleAutoSubmit = () => {
    if (onSubmit) {
      onSubmit(content, plan);
    }
    alert('Time is up! Your work has been automatically submitted.');
  };

  const handleStartExam = () => {
    setExamStarted(true);
  };

  const handleManualSubmit = () => {
    if (onSubmit) {
      onSubmit(content, plan);
    }
    setExamStarted(false);
  };

  const handleSavePlan = (savedPlan: any) => {
    setPlan(savedPlan);
    setShowPlanning(false);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileText className="w-6 h-6 text-blue-500 mr-3" />
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  NSW Selective Exam - {textType} Writing
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Target: {targetWordCountMin}-{targetWordCountMax} words in {examDurationMinutes} minutes
                </p>
              </div>
            </div>
            
            {examStarted && (
              <div className="flex items-center space-x-4">
                <div className="flex items-center bg-red-100 text-red-700 px-4 py-2 rounded-lg font-bold text-lg animate-pulse">
                  <Clock className="w-6 h-6 mr-2" />
                  <span>Time Left: {formatTime(timeLeft)}</span>
                </div>
                <button
                  onClick={handleManualSubmit}
                  className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Submit Early
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        {!examStarted ? (
          /* Pre-Exam Setup */
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center">
            <div className="mb-6">
              <Clock className="w-16 h-16 text-blue-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Ready to Start Your Exam?
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                You have {examDurationMinutes} minutes to complete your {textType} writing.
                Target word count: {targetWordCountMin}-{targetWordCountMax} words.
              </p>
            </div>
            
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                Exam Tips:
              </h3>
              <ul className="text-sm text-yellow-700 dark:text-yellow-300 text-left space-y-1">
                <li>• Spend 5 minutes planning before you start writing</li>
                <li>• Keep an eye on the timer and word count</li>
                <li>• Use the planning section to organize your thoughts</li>
                <li>• Review your work if time permits</li>
              </ul>
            </div>
            
            <button
              onClick={handleStartExam}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold text-lg"
            >
              Start Exam
            </button>
          </div>
        ) : (
          /* Exam Interface */
          <div className="space-y-6">
            {/* Prompt Display */}
            <DynamicPromptDisplay 
              prompt={prompt}
              textType={textType}
              promptImage={promptImage}
            />

            {/* Planning Section */}
            <StructuredPlanningSection
              textType={textType}
              onSavePlan={handleSavePlan}
              isExpanded={showPlanning}
              onToggle={() => setShowPlanning(!showPlanning)}
            />

            {/* Writing Area */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  Your Writing
                </h3>
              </div>
              
              <div className="p-4">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder={`Start writing your ${textType} here...`}
                  className="w-full h-96 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-base leading-relaxed"
                  style={{ fontFamily: 'Georgia, serif' }}
                />
              </div>

              {/* Status Bar */}
              <WritingStatusBar
                content={content}
                textType={textType}
                examMode={true}
                examDurationMinutes={examDurationMinutes}
                targetWordCountMin={targetWordCountMin}
                targetWordCountMax={targetWordCountMax}
              />
            </div>

            {/* Plan Summary (if saved) */}
            {plan && (
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  Your Plan Summary:
                </h4>
                <div className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                  {plan.completedSteps?.map((step: any, index: number) => (
                    step.response && (
                      <div key={index}>
                        <strong>{step.title}:</strong> {step.response.substring(0, 100)}
                        {step.response.length > 100 && '...'}
                      </div>
                    )
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
