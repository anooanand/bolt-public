import React, { useState } from 'react';
import { LearningNavigation } from './LearningNavigation';
import { WritingGuides } from './WritingGuides';
import { SkillDrills } from './SkillDrills';
import { ExampleEssays } from './ExampleEssays';
import { BrainstormingTools } from './BrainstormingTools';
import { ExamStrategies } from './ExamStrategies';
import { LearningPlan } from './LearningPlan';

interface LearningPageProps {
  state: {
    content: string;
    textType: string;
    assistanceLevel: string;
    timerStarted: boolean;
  };
  onStateChange: (updates: Partial<typeof LearningPageProps.prototype.state>) => void;
  onNavigateToWriting: () => void;
}

type ResourceCategory = 'guides' | 'skills' | 'examples' | 'brainstorming' | 'examStrategies' | 'learningPlan';

export function LearningPage({ state, onStateChange, onNavigateToWriting }: LearningPageProps) {
  const [activeResource, setActiveResource] = useState<ResourceCategory>('learningPlan');

  const renderResourceContent = () => {
    switch (activeResource) {
      case 'guides':
        return <WritingGuides textType={state.textType} />;
      case 'skills':
        return <SkillDrills textType={state.textType} />;
      case 'examples':
        return <ExampleEssays textType={state.textType} userContent={state.content} />;
      case 'brainstorming':
        return (
          <BrainstormingTools 
            textType={state.textType} 
            onApplyToWriting={(content) => {
              onStateChange({ content: state.content + '\n\n' + content });
              onNavigateToWriting();
            }} 
          />
        );
      case 'examStrategies':
        return <ExamStrategies textType={state.textType} />;
      case 'learningPlan':
        return <LearningPlan />;
      default:
        return <LearningPlan />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <header className="mb-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="flex items-center text-blue-600 mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3Z"></path>
                </svg>
              </div>
              <h1 className="text-xl font-bold text-gray-900">NSW Selective Essay Coach</h1>
            </div>
            <div className="flex space-x-2">
              <select
                value={state.textType}
                onChange={(e) => onStateChange({ textType: e.target.value })}
                className="rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6"
              >
                <option value="">Select writing type...</option>
                <option value="narrative">Narrative</option>
                <option value="persuasive">Persuasive</option>
                <option value="expository">Expository / Informative</option>
                <option value="reflective">Reflective</option>
                <option value="descriptive">Descriptive</option>
                <option value="recount">Recount</option>
                <option value="discursive">Discursive</option>
                <option value="news">News Report</option>
                <option value="letter">Letter</option>
                <option value="diary">Diary Entry</option>
              </select>
              <select
                value={state.assistanceLevel}
                onChange={(e) => onStateChange({ assistanceLevel: e.target.value })}
                className="rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6"
              >
                <option value="detailed">Detailed Assistance</option>
                <option value="moderate">Moderate Guidance</option>
                <option value="minimal">Minimal Support</option>
              </select>
            </div>
          </div>
          
          <div className="flex border-b border-gray-200 mt-4">
            <button
              className={`py-2 px-4 font-medium text-sm ${
                'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
              onClick={onNavigateToWriting}
            >
              Writing Mode
            </button>
            <button
              className={`py-2 px-4 font-medium text-sm ${
                'bg-indigo-50 border-b-2 border-indigo-500 text-indigo-600'
              }`}
            >
              Deeper Learning
            </button>
          </div>
        </header>

        <div className="flex border rounded-lg shadow-sm bg-white overflow-hidden">
          <div className="w-64 border-r bg-gray-50 p-4">
            <LearningNavigation 
              activeResource={activeResource}
              onResourceChange={setActiveResource}
              textType={state.textType}
            />
          </div>
          
          <div className="flex-1 p-6 overflow-y-auto">
            {renderResourceContent()}
          </div>
        </div>
        
        <div className="mt-4">
          <button
            onClick={onNavigateToWriting}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm font-medium"
          >
            Return to Writing
          </button>
        </div>
      </div>
    </div>
  );
}