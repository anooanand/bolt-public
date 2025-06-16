import React from 'react';

interface SplitScreenProps {
  children: React.ReactNode[];
}

export function SplitScreen({ children }: SplitScreenProps) {
  // Ensure we have exactly two children
  const [left, right] = React.Children.toArray(children).slice(0, 2);

  return (
    <div className="flex flex-col md:flex-row h-full max-w-full px-4 md:px-6 lg:px-8">
      <div className="w-full md:w-3/5 h-full overflow-hidden mb-4 md:mb-0 md:pr-4">
        {left}
      </div>
      <div className="w-full md:w-2/5 h-full overflow-hidden md:pl-4">
        {right}
      </div>
    </div>
  );
}