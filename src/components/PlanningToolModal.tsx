import React from 'react';
import { X } from 'lucide-react';
import { PlanningTool } from './text-type-templates/PlanningTool';

interface PlanningToolModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSavePlan: (plan: any) => void;
  content?: string;
  textType: string;
  onRestoreContent?: (content: string) => void;
}

export function PlanningToolModal({
  isOpen,
  onClose,
  textType,
  onSavePlan,
}: PlanningToolModalProps) {

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        
        <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Planning Tool</h2>
            <div className="flex items-center space-x-4">
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>
          
          <div className="px-6 py-4 max-h-[70vh] overflow-y-auto">
            <PlanningTool textType={textType} onSavePlan={onSavePlan} />
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 mr-3"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onSavePlan({
                  // Sample plan data - this should ideally come from the PlanningTool component
                  mainIdeas: [\'Introduction\', \'Main arguments\', \'Conclusion\'],
                  structure: [
                    { section: \'Introduction\', content: \'Set up the topic and state position\' },
                    { section: \'Body Paragraph 1\', content: \'First main argument with evidence\' },
                    { section: \'Body Paragraph 2\', content: \'Second main argument with evidence\' },
                    { section: \'Body Paragraph 3\', content: \'Third main argument with evidence\' },
                    { section: \'Conclusion\', content: \'Restate position and summarize arguments\' }
                  ],
                  keyPoints: [\'Use persuasive language\', \'Include evidence\', \'Address counterarguments\'],
                  vocabulary: [\'Consequently\', \'Furthermore\', \'Undoubtedly\', \'Compelling\']
                });
                onClose();
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
