import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Minimize2, Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { TabbedCoachPanel } from './TabbedCoachPanel';
import './FloatingChatWindow.css';

interface FloatingChatWindowProps {
  content: string;
  textType: string;
  assistanceLevel: string;
  selectedText: string;
  onNavigate?: (page: string) => void;
  isVisible?: boolean;
  isCollapsed?: boolean;
  onVisibilityChange?: (visible: boolean) => void;
  onCollapseChange?: (collapsed: boolean) => void;
}

export function FloatingChatWindow({
  content,
  textType,
  assistanceLevel,
  selectedText,
  onNavigate,
  isVisible = true,
  isCollapsed = false,
  onVisibilityChange,
  onCollapseChange
}: FloatingChatWindowProps) {
  const [isMinimized, setIsMinimized] = useState(false);

  const chatRef = useRef<HTMLDivElement>(null);

  const toggleVisibility = () => {
    onVisibilityChange?.(!isVisible);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const toggleCollapse = () => {
    onCollapseChange?.(!isCollapsed);
  };

  const handleClose = () => {
    onVisibilityChange?.(false);
  };

  if (!isVisible) {
    return (
      <button
        className="floating-chat-toggle fixed bottom-4 right-4 bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-full shadow-lg transition-all duration-200 z-50"
        onClick={toggleVisibility}
        title="Open Writing Buddy"
      >
        <MessageSquare className="w-5 h-5" />
      </button>
    );
  }

  return (
    <div
      ref={chatRef}
      className={`attached-chat-container fixed right-0 top-16 bottom-0 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 shadow-xl transition-all duration-300 z-40 ${
        isMinimized ? 'w-12' : isCollapsed ? 'w-16' : 'w-96'
      }`}
    >
      <div className="attached-chat-header flex items-center justify-between p-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
        {!isMinimized && !isCollapsed && (
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-purple-600" />
            <h3 className="text-sm font-medium">Writing Buddy</h3>
          </div>
        )}

        <div className="attached-chat-controls flex items-center gap-1">
          <button
            className="attached-chat-control-btn p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
            onClick={toggleCollapse}
            title={isCollapsed ? "Expand Panel" : "Collapse Panel"}
          >
            {isCollapsed ? <ChevronLeft className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
          </button>
          <button
            className="attached-chat-control-btn p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
            onClick={toggleMinimize}
            title={isMinimized ? "Maximize" : "Minimize"}
          >
            {isMinimized ? <Maximize2 className="w-3 h-3" /> : <Minimize2 className="w-3 h-3" />}
          </button>
          <button
            className="attached-chat-control-btn p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
            onClick={handleClose}
            title="Close"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <div className="attached-chat-content flex-1 overflow-hidden">
          {!isCollapsed ? (
            <TabbedCoachPanel
              content={content}
              textType={textType}
              assistanceLevel={assistanceLevel}
              selectedText={selectedText}
              onNavigate={onNavigate}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-2">
              <MessageSquare className="w-6 h-6 text-purple-600 mb-2" />
              <div className="writing-vertical-text text-xs text-gray-500 dark:text-gray-400 transform rotate-90 whitespace-nowrap">
                Writing Buddy
              </div>
            </div>
          )}
        </div>
      )}

      {isMinimized && (
        <div className="flex flex-col items-center justify-center h-full p-2">
          <MessageSquare className="w-6 h-6 text-purple-600 mb-2" />
        </div>
      )}
    </div>
  );
}