import React, { useState } from 'react';
import { TextTypeGuide } from './text-type-templates/TextTypeGuide';
import { PlanningTool } from './text-type-templates/PlanningTool';
import { EnhancedTimer } from './text-type-templates/EnhancedTimer';
import { ModelResponsesLibrary } from './text-type-templates/ModelResponsesLibrary';
import { AlignedFeedback } from './text-type-templates/AlignedFeedback';
import { PenTool, BookOpen, Clock, Settings, HelpCircle, Lightbulb, Award } from 'lucide-react';

interface EnhancedHeaderProps {
  textType: string;
  assistanceLevel: string;
  onTextTypeChange: (textType: string) => void;
  onAssistanceLevelChange: (level: string) => void;
  onTimerStart: () => void;
}

export function EnhancedHeader({
  textType,
  assistanceLevel,
  onTextTypeChange,
  onAssistanceLevelChange,
  onTimerStart
}: EnhancedHeaderProps) {
  const [showPlanningTool, setShowPlanningTool] = useState(false);

  const handleSavePlan = (data: any) => {
    // Here you would typically save the planning data to state or localStorage
    alert('Planning data saved! You can now refer to your plan while writing.');
    setShowPlanningTool(false);
  };

  return (
    <div className="mb-4 px-4 py-3 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <select
            value={textType}
            onChange={(e) => onTextTypeChange(e.target.value)}
            className="block rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 dark:text-gray-100 dark:bg-gray-700 ring-1 ring-inset ring-gray-300 dark:ring-gray-600 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
          >
            <option value="">Select writing type...</option>
            <option value="narrative">Narrative</option>
            <option value="persuasive">Persuasive</option>
            <option value="expository">Expository / Informative</option>
            <option value="reflective">Reflective</option>
            <option value="descriptive">Descriptive</option>
            <option value="recount">Recount</option>
            <option value="discursive">Discursive</option>
            <option value="news report">News Report</option>
            <option value="letter">Letter</option>
            <option value="diary entry">Diary Entry</option>
          </select>

          <select
            value={assistanceLevel}
            onChange={(e) => onAssistanceLevelChange(e.target.value)}
            className="block rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 dark:text-gray-100 dark:bg-gray-700 ring-1 ring-inset ring-gray-300 dark:ring-gray-600 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
          >
            <option value="detailed">Detailed Assistance</option>
            <option value="moderate">Moderate Guidance</option>
            <option value="minimal">Minimal Support</option>
          </select>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => setShowPlanningTool(!showPlanningTool)}
            className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <PenTool className="h-4 w-4 mr-1.5" />
            Planning Tool
          </button>
          
          <button
            className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <Award className="h-4 w-4 mr-1.5" />
            Model Responses
          </button>
          
          <EnhancedTimer onStart={onTimerStart} />
          
          <button
            className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <Lightbulb className="h-4 w-4 mr-1.5" />
            Vocabulary
          </button>
          
          <button
            className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <HelpCircle className="h-4 w-4 mr-1.5" />
            Help
          </button>
        </div>
      </div>

      {/* Planning Tool Modal */}
      {showPlanningTool && (
        <div className="mt-4">
          <PlanningTool textType={textType} onSavePlan={handleSavePlan} />
        </div>
      )}
    </div>
  );
}