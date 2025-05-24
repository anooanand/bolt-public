import React, { useState } from 'react';
import { HelpCenter } from './HelpCenter';
import { KeyboardAccessibility } from './KeyboardAccessibility';
import { AutoSave } from './AutoSave';
import { TextToSpeech } from './TextToSpeech';

interface SupportiveFeaturesProps {
  children: React.ReactNode;
  content: string;
  textType: string;
  onRestoreContent?: (content: string, textType: string) => void;
}

export function SupportiveFeatures({ 
  children, 
  content, 
  textType, 
  onRestoreContent 
}: SupportiveFeaturesProps) {
  const [showHelpCenter, setShowHelpCenter] = useState(false);

  return (
    <KeyboardAccessibility>
      <div className="relative">
        {/* Help Center */}
        <HelpCenter 
          isOpen={showHelpCenter} 
          onClose={() => setShowHelpCenter(false)} 
        />

        {/* Main Content */}
        {children}
      </div>
    </KeyboardAccessibility>
  );
}

// Export all components for easy imports
;