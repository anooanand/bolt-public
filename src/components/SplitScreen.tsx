import React from 'react';
import './improved-layout.css';

interface SplitScreenProps {
  children: React.ReactNode;
}

export function SplitScreen({ children }: SplitScreenProps) {
  return (
    <div className="split-screen-container bg-gray-50 dark:bg-gray-800/50 p-2 rounded-md shadow-sm">
      <div className="split-screen-left bg-white dark:bg-gray-800 rounded-md shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700">
        {Array.isArray(children) && children.length > 0 ? children[0] : null}
      </div>
      <div className="split-screen-right bg-white dark:bg-gray-800 rounded-md shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700">
        {Array.isArray(children) && children.length > 1 ? children[1] : null}
      </div>
    </div>
  );
}