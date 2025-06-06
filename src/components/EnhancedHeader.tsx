import React from 'react';
import { TextTypeGuide } from './text-type-templates/TextTypeGuide';
import { PlanningTool } from './text-type-templates/PlanningTool';
import { EnhancedTimer } from './text-type-templates/EnhancedTimer';
import { ModelResponsesLibrary } from './text-type-templates/ModelResponsesLibrary';
import { AlignedFeedback } from './text-type-templates/AlignedFeedback';

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
  const [showPlanningTool, setShowPlanningTool] = React.useState(false);
  const [planningData, setPlanningData] = React.useState(null);

  const handleSavePlan = (data: any) => {
    setPlanningData(data);
    // Here you would typically save the planning data to state or localStorage
    alert('Planning data saved! You can now refer to your plan while writing.');
    setShowPlanningTool(false);
  };

  return (
    <div className="mb-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div className="flex items-center">
          <div className="flex items-center text-blue-600 mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3Z"></path>
            </svg>
          </div>
          <h1 className="text-xl font-bold text-gray-900">InstaChatAI</h1>
          <div className="ml-4 text-sm text-green-600 flex items-center">
            <span className="w-2 h-2 bg-green-600 rounded-full mr-1"></span>
            Connected to OpenAI
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {/* Text Type Selector */}
          <select
            value={textType}
            onChange={(e) => onTextTypeChange(e.target.value)}
            className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
            className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
          >
            <option value="detailed">Detailed Assistance</option>
            <option value="moderate">Moderate Guidance</option>
            <option value="minimal">Minimal Support</option>
          </select>

          {/* Simplified Essential Tools */}
          <div className="flex space-x-2">
            <TextTypeGuide textType={textType} />
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
