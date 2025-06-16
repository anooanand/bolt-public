import React, { useState } from 'react';
import { TextTypeGuide } from './text-type-templates/TextTypeGuide';
import { PlanningTool } from './text-type-templates/PlanningTool';
import { EnhancedTimer } from './text-type-templates/EnhancedTimer';
import { ModelResponsesLibrary } from './text-type-templates/ModelResponsesLibrary';
import { AlignedFeedback } from './text-type-templates/AlignedFeedback';
import { PenTool, ChevronDown } from 'lucide-react';

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
  const [planningData, setPlanningData] = useState(null);

  const handleSavePlan = (data: any) => {
    setPlanningData(data);
    // Here you would typically save the planning data to state or localStorage
    alert('Planning data saved! You can now refer to your plan while writing.');
    setShowPlanningTool(false);
  };

  return (
    <div className="mb-4 p-4 bg-white dark:bg-gray-800 shadow-sm">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div className="flex items-center">
          <div className="flex items-center text-blue-600 mr-2">
            <PenTool className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">InstaChat AI Writing Assistant</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          {/* Text Type Selector */}
          <select
            value={textType}
            onChange={(e) => onTextTypeChange(e.target.value)}
            className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-600 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white dark:bg-gray-700"
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

          {/* Assistance Level Selector */}
          <select
            value={assistanceLevel}
            onChange={(e) => onAssistanceLevelChange(e.target.value)}
            className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-600 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white dark:bg-gray-700"
          >
            <option value="detailed">Detailed Assistance</option>
            <option value="moderate">Moderate Guidance</option>
            <option value="minimal">Minimal Support</option>
          </select>

          {/* Simplified Essential Tools */}
          <div className="flex space-x-2">
            <EnhancedTimer onStart={onTimerStart} />
          </div>
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