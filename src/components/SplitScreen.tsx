import React from 'react';

interface SplitScreenProps {
  children: React.ReactNode;
}

export function SplitScreen({ children }: SplitScreenProps) {
  // Ensure there are exactly two children
  const childrenArray = React.Children.toArray(children);
  
  if (childrenArray.length !== 2) {
    console.error('SplitScreen component requires exactly two children');
    return <div className="h-full">{children}</div>;
  }

  return (
    <div className="flex flex-col md:flex-row h-full">
      <div className="w-full md:w-3/5 h-full md:h-full overflow-hidden">
        {childrenArray[0]}
      </div>
      <div className="w-full md:w-2/5 h-full md:h-full overflow-hidden">
        {childrenArray[1]}
      </div>
    </div>
  );
}