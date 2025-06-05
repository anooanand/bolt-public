import React from 'react';
import { HeroSection } from './HeroSection';
import { FeaturesSection } from './FeaturesSection';
import { ToolsSection } from './ToolsSection';
import { WritingTypesSection } from './WritingTypesSection';
import { WritingModesSection } from './WritingModesSection';
import { HowItWorks } from './HowItWorks';

interface HomePageProps {
  onGetStarted?: () => void;
  onStartWriting?: () => void;
}

export function HomePage({ onGetStarted, onStartWriting }: HomePageProps) {
  const handleGetStarted = () => {
    if (onGetStarted) {
      onGetStarted();
    } else {
      // Default behavior - scroll to pricing or show auth modal
      console.log('Get Started clicked');
    }
  };

  const handleStartWriting = () => {
    if (onStartWriting) {
      onStartWriting();
    } else {
      // Default behavior - navigate to dashboard
      console.log('Start Writing clicked');
    }
  };

  return (
    <div className="min-h-screen">
      <HeroSection 
        onGetStarted={handleGetStarted}
        onStartWriting={handleStartWriting}
      />
      <FeaturesSection />
      <ToolsSection />
      <WritingTypesSection />
      <WritingModesSection />
      <HowItWorks />
    </div>
  );
}

