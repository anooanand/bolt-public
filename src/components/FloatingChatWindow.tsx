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
        className="floating-chat-toggle"
        onClick={toggleVisibility}
        title="Open Writing Buddy"
      >
        <MessageSquare className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div
      ref={chatRef}
      className={`attached-chat-container ${isMinimized ? 'minimized' : ''} ${isCollapsed ? 'collapsed' : ''}`}
    >
      <div className="attached-chat-header">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          <h3>Writing Buddy</h3>
        </div>
        
        <div className="attached-chat-controls">
          <button
            className="attached-chat-control-btn"
            onClick={toggleCollapse}
            title={isCollapsed ? "Expand Panel" : "Collapse Panel"}
          >
            {isCollapsed ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
          <button
            className="attached-chat-control-btn"
            onClick={toggleMinimize}
            title={isMinimized ? "Maximize" : "Minimize"}
          >
            {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
          </button>
          <button
            className="attached-chat-control-btn"
            onClick={handleClose}
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="attached-chat-content">
        <TabbedCoachPanel
          content={content}
          textType={textType}
          assistanceLevel={assistanceLevel}
          selectedText={selectedText}
          onNavigate={onNavigate}
        />
      </div>
    </div>
  );
}