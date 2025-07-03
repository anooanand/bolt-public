import React from 'react';

interface SplitScreenProps {
  children: React.ReactNode;
}

export function SplitScreen({ children }: SplitScreenProps) {
  return (
    <div className="flex flex-col md:flex-row h-full">
      <div className="w-full md:w-3/5 h-full overflow-hidden">
        {Array.isArray(children) && children.length > 0 ? children[0] : null}
      </div>
      <div className="w-full md:w-2/5 h-full overflow-hidden">
        {Array.isArray(children) && children.length > 1 ? children[1] : null}
      </div>
    </div>
  );
}
