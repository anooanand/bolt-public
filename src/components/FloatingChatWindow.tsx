import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Minimize2, Maximize2, X, Move } from 'lucide-react';
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
  
  const chatRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  // Handle dragging functionality
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!chatRef.current) return;
    
    const rect = chatRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setIsDragging(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !chatRef.current) return;
    
    const newX = e.clientX - dragOffset.x;
    const newY = e.clientY - dragOffset.y;
    
    // Constrain to viewport
    const maxX = window.innerWidth - chatRef.current.offsetWidth;
    const maxY = window.innerHeight - chatRef.current.offsetHeight;
    
    setPosition({
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY))
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragOffset]);

  // Reset position when window resizes
  useEffect(() => {
    const handleResize = () => {
      if (!chatRef.current) return;
      
      const maxX = window.innerWidth - chatRef.current.offsetWidth;
      const maxY = window.innerHeight - chatRef.current.offsetHeight;
      
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
        right: position.x === 0 ? '20px' : 'auto',
        bottom: position.y === 0 ? '20px' : 'auto',
        left: position.x !== 0 ? `${position.x}px` : 'auto',
        top: position.y !== 0 ? `${position.y}px` : 'auto'
      }}
    >
      <div
        ref={headerRef}
        className="floating-chat-header"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          <h3>Questions to Ask Your Writing Buddy</h3>
        </div>
        
        <div className="floating-chat-controls">
          <button
            className="floating-chat-control-btn"
            onClick={toggleMinimize}
            title={isMinimized ? "Maximize" : "Minimize"}
          >
            {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
          </button>
          <button
            className="floating-chat-control-btn"
            onClick={handleClose}
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="floating-chat-content">
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

