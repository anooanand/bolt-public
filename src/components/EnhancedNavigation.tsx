import React from 'react';
import { ChevronRight, Home, Map, ArrowLeft, ArrowRight } from 'lucide-react';

interface NavigationProps {
  currentStep: string;
  availableSteps: string[];
  completedSteps: string[];
  onStepChange: (step: string) => void;
  onHome: () => void;
}

export function EnhancedNavigation({
  currentStep,
  availableSteps,
  completedSteps,
  onStepChange,
  onHome
}: NavigationProps) {
  const currentIndex = availableSteps.indexOf(currentStep);
  const canGoBack = currentIndex > 0;
  const canGoForward = currentIndex < availableSteps.length - 1 && completedSteps.includes(currentStep);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg border border-gray-200 dark:border-gray-700">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center space-x-2 mb-4">
        <button
          onClick={onHome}
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
          title="Home"
        >
          <Home className="w-4 h-4" />
        </button>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Writing</span>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <span className="text-sm font-bold text-purple-600 dark:text-purple-400">{currentStep}</span>
      </div>

      {/* Step Navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => canGoBack && onStepChange(availableSteps[currentIndex - 1])}
          disabled={!canGoBack}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
            canGoBack 
              ? 'bg-blue-500 text-white hover:bg-blue-600 hover:shadow-lg' 
              : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        <div className="flex items-center space-x-2">
          <Map className="w-5 h-5 text-purple-500" />
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Step {currentIndex + 1} of {availableSteps.length}
          </span>
        </div>

        <button
          onClick={() => canGoForward && onStepChange(availableSteps[currentIndex + 1])}
          disabled={!canGoForward}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
            canGoForward 
              ? 'bg-green-500 text-white hover:bg-green-600 hover:shadow-lg' 
              : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
          }`}
        >
          <span>Next</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Quick Jump Buttons */}
      <div className="space-y-2">
        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Quick Jump:</h4>
        <div className="grid grid-cols-2 gap-2">
          {availableSteps.map((step) => {
            const isCompleted = completedSteps.includes(step);
            const isCurrent = currentStep === step;
            const isAccessible = isCompleted || isCurrent || availableSteps.indexOf(step) <= currentIndex;
            
            return (
              <button
                key={step}
                onClick={() => isAccessible && onStepChange(step)}
                disabled={!isAccessible}
                className={`p-3 rounded-lg text-sm font-medium transition-all ${
                  isCurrent
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : isCompleted
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-900/50'
                    : isAccessible
                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    : 'bg-gray-50 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{step}</span>
                  {isCompleted && <span className="text-green-500">✓</span>}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Keyboard Shortcuts */}
      <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
        <h5 className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">Keyboard Shortcuts:</h5>
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 dark:text-gray-400">
          <div>← Previous Step</div>
          <div>→ Next Step</div>
          <div>Ctrl+S Save</div>
          <div>Ctrl+H Home</div>
        </div>
      </div>
    </div>
  );
}

