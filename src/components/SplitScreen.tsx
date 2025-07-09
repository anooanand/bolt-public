import React from 'react';
import './improved-layout.css';

interface SplitScreenProps {
  children: React.ReactNode;
  useFloatingChat?: boolean;
  useFloatingChat?: boolean;
}

export function SplitScreen({ children, useFloatingChat = false }: SplitScreenProps) {
  if (useFloatingChat) {
    // When using floating chat, only show the writing area (first child)
    return (
      <div className="split-screen-container with-floating-chat bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 p-4 rounded-3xl shadow-lg">
        <div className="split-screen-left bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden border-4 border-blue-200 dark:border-blue-800">
          {Array.isArray(children) && children.length > 0 ? children[0] : children}
        </div>
      </div>
    );
  }

  if (useFloatingChat) {
    // When using floating chat, only show the writing area (first child)
    return (
      <div className="split-screen-container with-floating-chat bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 p-4 rounded-3xl shadow-lg">
        <div className="split-screen-left bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden border-4 border-blue-200 dark:border-blue-800">
          {Array.isArray(children) && children.length > 0 ? children[0] : children}
        </div>
      </div>
    );
  }

  return (
    <div className="split-screen-container bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 p-4 rounded-3xl shadow-lg">
      <div className="split-screen-left bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden border-4 border-blue-200 dark:border-blue-800">
        {Array.isArray(children) && children.length > 0 ? children[0] : null}
      </div>
      <div className="split-screen-right bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden border-4 border-purple-200 dark:border-purple-800">
        {Array.isArray(children) && children.length > 1 ? children[1] : null}
      </div>
    </div>
  );
}