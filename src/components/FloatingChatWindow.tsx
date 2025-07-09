import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Minimize2, Maximize2, X, Move, Sparkles } from 'lucide-react';
import { TabbedCoachPanel } from './TabbedCoachPanel';
import './FloatingChatWindow.css';

interface FloatingChatWindowProps {
  content: string;
  textType: string;
  assistanceLevel: string;
  selectedText: string;
  onNavigate?: (page: string) => void;
}

export function FloatingChatWindow({ 
  content, 
  textType, 
  assistanceLevel, 
  selectedText, 
  onNavigate 
}: FloatingChatWindowProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [localAssistanceLevel, setLocalAssistanceLevel] = useState<string>(assistanceLevel);
  
  const chatRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  // Initialize position to ensure window is fully visible
  useEffect(() => {
    if (chatRef.current) {
      const rect = chatRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const windowWidth = window.innerWidth;
      
      // Position the window so it's fully visible
      const initialX = Math.max(0, windowWidth - rect.width - 20);
      const initialY = Math.max(0, windowHeight - rect.height - 20);
      
      setPosition({ x: initialX, y: initialY });
    }
  }, []);

  // Handle dragging functionality
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!chatRef.current) return;
    
    const rect = chatRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setIsDragging(true);
    
    // Add dragging class immediately
    chatRef.current.classList.add('dragging');
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !chatRef.current) return;
    
    e.preventDefault();
    
    const newX = e.clientX - dragOffset.x;
    const newY = e.clientY - dragOffset.y;
    
    // Get current dimensions
    const rect = chatRef.current.getBoundingClientRect();
    
    // Constrain to viewport with proper boundaries
    const maxX = window.innerWidth - rect.width;
    const maxY = window.innerHeight - rect.height;
    
    const constrainedX = Math.max(0, Math.min(newX, maxX));
    const constrainedY = Math.max(0, Math.min(newY, maxY));
    
    setPosition({
      x: constrainedX,
      y: constrainedY
    });
  };

  const handleMouseUp = (e: MouseEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    // Remove dragging class
    if (chatRef.current) {
      chatRef.current.classList.remove('dragging');
    }
  };

  useEffect(() => {
    if (isDragging) {
      // Prevent text selection and other interactions while dragging
      document.body.style.userSelect = 'none';
      document.body.style.pointerEvents = 'none';
      
      document.addEventListener('mousemove', handleMouseMove, { passive: false });
      document.addEventListener('mouseup', handleMouseUp, { passive: false });
      
      return () => {
        document.body.style.userSelect = '';
        document.body.style.pointerEvents = '';
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragOffset]);

  // Reset position when window resizes
  useEffect(() => {
    const handleResize = () => {
      if (!chatRef.current) return;
      
      const rect = chatRef.current.getBoundingClientRect();
      const maxX = window.innerWidth - rect.width;
      const maxY = window.innerHeight - rect.height;
      
      setPosition(prev => ({
        x: Math.max(0, Math.min(prev.x, maxX)),
        y: Math.max(0, Math.min(prev.y, maxY))
      }));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  // Update local assistance level when prop changes
  useEffect(() => {
    setLocalAssistanceLevel(assistanceLevel);
  }, [assistanceLevel]);

  const handleAssistanceLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocalAssistanceLevel(e.target.value);
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
      className={`floating-chat-container ${isMinimized ? 'minimized' : ''} ${isDragging ? 'dragging' : ''}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 1000
      }}
    >
      <div
        ref={headerRef}
        className="floating-chat-header"
        onMouseDown={handleMouseDown}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          <h3>Questions to Ask Your Writing Buddy</h3>
          <Move className="w-4 h-4 opacity-60" />
        </div>
        
        <div className="floating-chat-controls">
          <button
            className="floating-chat-control-btn"
            onClick={toggleMinimize}
            title={isMinimized ? "Maximize" : "Minimize"}
            onMouseDown={(e) => e.stopPropagation()}
          >
            {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
          </button>
          <button
            className="floating-chat-control-btn"
            onClick={handleClose}
            title="Close"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="floating-chat-content">
        <TabbedCoachPanel
          content={content}
          textType={textType}
          assistanceLevel={localAssistanceLevel}
          selectedText={selectedText}
          onNavigate={onNavigate}
        />
      </div>
    </div>
  );
}
