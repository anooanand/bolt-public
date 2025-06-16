import React from 'react';

interface SplitScreenProps {
  children: React.ReactNode;
}

export function SplitScreen({ children }: SplitScreenProps) {
  // Convert children to array for easier handling
  const childrenArray = React.Children.toArray(children);
  
  // Ensure there are exactly two children
  if (childrenArray.length !== 2) {
    console.error('SplitScreen component requires exactly two children');
    return <div className="h-full">{children}</div>;
  }

  return (
    <div className="flex flex-col md:flex-row h-full">
      <div className="w-full md:w-3/5 h-1/2 md:h-full overflow-auto">
        {childrenArray[0]}
      </div>
      <div className="w-full md:w-2/5 h-1/2 md:h-full overflow-auto">
        {childrenArray[1]}
      </div>
    </div>
  );
}