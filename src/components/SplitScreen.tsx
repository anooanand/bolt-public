import React from 'react';
import { EnhancedWritingArea } from './EnhancedWritingArea';
import { TextToSpeech } from './TextToSpeech';
import { NSWCriteriaTracker } from './NSWCriteriaTracker';
import { EnhancedNSWFeedback } from './EnhancedNSWFeedback';

interface SplitScreenProps {
  left: React.ReactNode;
  right: React.ReactNode;
}

export function SplitScreen({ left, right }: SplitScreenProps) {
  return (
    <div className="flex flex-col md:flex-row h-full">
      <div className="w-full md:w-3/5 h-full overflow-hidden">
        {left}
      </div>
      <div className="w-full md:w-2/5 h-full overflow-hidden">
        {right}
      </div>
    </div>
  );
}
