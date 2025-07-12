import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Minimize2, Maximize2, X, ChevronLeft, ChevronRight, PanelRightClose, PanelRightOpen } from 'lucide-react';
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
        className="floating-chat-toggle enhanced-toggle"
        onClick={toggleVisibility}
        title="Open Writing Buddy - Get 25% more writing space!"
      >
        <PanelRightOpen className="w-6 h-6" />
        <span className="toggle-tooltip">Writing Buddy</span>
      </button>
    );
  }

  return (
    <div
      ref={chatRef}
      className={`attached-chat-container enhanced-panel ${isMinimized ? 'minimized' : ''} ${isCollapsed ? 'collapsed' : ''}`}
    >
      <div className="attached-chat-header enhanced-header">
        <div className="flex items-center gap-2">
          <div className="header-icon-wrapper">
            <MessageSquare className="w-5 h-5" />
          </div>
          {!isCollapsed && (
            <div className="header-content">
              <h3>Writing Buddy</h3>
              <span className="header-subtitle">AI-powered writing assistance</span>
            </div>
          )}
        </div>
        
        <div className="attached-chat-controls enhanced-controls">
          <button
            className="attached-chat-control-btn collapse-btn"
            onClick={toggleCollapse}
            title={isCollapsed ? "Expand Panel - Show full interface" : "Collapse Panel - Maximize writing space"}
          >
            {isCollapsed ? <PanelRightOpen className="w-4 h-4" /> : <PanelRightClose className="w-4 h-4" />}
          </button>
          {!isCollapsed && (
            <>
              <button
                className="attached-chat-control-btn minimize-btn"
                onClick={toggleMinimize}
                title={isMinimized ? "Maximize Panel" : "Minimize Panel"}
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </button>
              <button
                className="attached-chat-control-btn close-btn"
                onClick={handleClose}
                title="Close Panel - Get 25% more writing space"
              >
                <X className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>
      
      <div className="attached-chat-content enhanced-content">
        <TabbedCoachPanel
          content={content}
          textType={textType}
          assistanceLevel={assistanceLevel}
          selectedText={selectedText}
          onNavigate={onNavigate}
        />
      </div>
      
      {/* Space utilization indicator */}
      {isCollapsed && (
        <div className="space-indicator">
          <div className="space-indicator-text">+25% Writing Space</div>
        </div>
      )}
    </div>
  );
}