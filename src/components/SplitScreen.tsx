import React from 'react';
import './improved-layout.css';

interface SplitScreenProps {
  children: React.ReactNode;
}

export function SplitScreen({ children }: SplitScreenProps) {
  return (
    <div className="split-screen-container">
      <div className="split-screen-left">
        {Array.isArray(children) && children.length > 0 ? children[0] : null}
      </div>
      <div className="split-screen-right">
        {Array.isArray(children) && children.length > 1 ? children[1] : null}
      </div>
    </div>
  );
}