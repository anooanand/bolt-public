import React from 'react';
import { Book, Target, FileText, Lightbulb, Award, Calendar } from 'lucide-react';

type ResourceCategory = 'guides' | 'skills' | 'examples' | 'brainstorming' | 'examStrategies' | 'learningPlan';

interface LearningNavigationProps {
  activeResource: ResourceCategory;
  onResourceChange: (resource: ResourceCategory) => void;
  textType: string;
}

export function LearningNavigation({ 
  activeResource, 
  onResourceChange,
  textType
}: LearningNavigationProps) {
  const formattedTextType = textType 
    ? textType.charAt(0).toUpperCase() + textType.slice(1) 
    : 'Select a writing type';

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-3">Learning Resources</h2>
        <div className="space-y-1">
          <button
            className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
              activeResource === 'learningPlan'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => onResourceChange('learningPlan')}
          >
            <Calendar className="mr-2 h-5 w-5" />
            20-Day Learning Plan
          </button>
          <button
            className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
              activeResource === 'guides'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => onResourceChange('guides')}
          >
            <Book className="mr-2 h-5 w-5" />
            Writing Guides
          </button>
          <button
            className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
              activeResource === 'skills'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => onResourceChange('skills')}
          >
            <Target className="mr-2 h-5 w-5" />
            Skill Drills
          </button>
          <button
            className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
              activeResource === 'examples'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => onResourceChange('examples')}
          >
            <FileText className="mr-2 h-5 w-5" />
            Example Essays
          </button>
          <button
            className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
              activeResource === 'brainstorming'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => onResourceChange('brainstorming')}
          >
            <Lightbulb className="mr-2 h-5 w-5" />
            Brainstorming Tools
          </button>
          <button
            className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
              activeResource === 'examStrategies'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => onResourceChange('examStrategies')}
          >
            <Award className="mr-2 h-5 w-5" />
            Exam Strategies
          </button>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-200">
        <div className="text-sm font-medium text-gray-500 mb-2">Current writing type:</div>
        <div className="text-sm font-semibold text-gray-900 bg-gray-100 px-3 py-2 rounded-md">
          {formattedTextType}
        </div>
        {!textType && (
          <div className="mt-2 text-xs text-amber-600">
            Please select a writing type to see relevant content
          </div>
        )}
      </div>
    </div>
  );
}