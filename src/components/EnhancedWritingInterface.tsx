import React, { useState } from 'react';
import { ChevronDown, ChevronUp, LayoutGrid, Maximize2, Minimize2, Settings, Eye, EyeOff } from 'lucide-react';

interface EnhancedWritingInterfaceProps {
  children: React.ReactNode;
}

export function EnhancedWritingInterface({ children }: EnhancedWritingInterfaceProps) {
  const [compactMode, setCompactMode] = useState(false);
  const [hideNonEssential, setHideNonEssential] = useState(false);
  const [collapsedSections, setCollapsedSections] = useState<string[]>([]);

  const toggleSection = (sectionId: string) => {
    setCollapsedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const toggleCompactMode = () => {
    setCompactMode(!compactMode);
  };

  const toggleNonEssential = () => {
    setHideNonEssential(!hideNonEssential);
  };

  return (
    <div className={`enhanced-writing-interface ${compactMode ? 'compact-mode' : ''} ${hideNonEssential ? 'hide-non-essential' : ''}`}>
      {/* Interface Controls */}
      <div className="interface-controls">
        <div className="control-group">
          <button
            onClick={toggleCompactMode}
            className="control-btn"
            title={compactMode ? "Exit Compact Mode" : "Enter Compact Mode"}
          >
            {compactMode ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            <span className="control-label">Compact</span>
          </button>
          
          <button
            onClick={toggleNonEssential}
            className="control-btn"
            title={hideNonEssential ? "Show All Elements" : "Hide Non-Essential Elements"}
          >
            {hideNonEssential ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            <span className="control-label">Focus</span>
          </button>
          
          <div className="space-indicator-compact">
            <LayoutGrid className="w-4 h-4" />
            <span className="space-text">Optimized Layout</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="enhanced-content-wrapper">
        {children}
      </div>

      <style jsx>{`
        .enhanced-writing-interface {
          position: relative;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .interface-controls {
          position: absolute;
          top: 10px;
          right: 10px;
          z-index: 100;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-radius: 12px;
          padding: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(0, 0, 0, 0.1);
        }

        .control-group {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .control-btn {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 6px 10px;
          background: transparent;
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 12px;
          color: #374151;
        }

        .control-btn:hover {
          background: rgba(59, 130, 246, 0.1);
          border-color: rgba(59, 130, 246, 0.3);
          color: #3b82f6;
        }

        .control-label {
          font-weight: 500;
        }

        .space-indicator-compact {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 6px 10px;
          background: rgba(34, 197, 94, 0.1);
          border: 1px solid rgba(34, 197, 94, 0.3);
          border-radius: 8px;
          font-size: 12px;
          color: #059669;
          font-weight: 500;
        }

        .enhanced-content-wrapper {
          flex: 1;
          overflow: hidden;
        }

        /* Compact Mode Styles */
        .enhanced-writing-interface.compact-mode .enhanced-content-wrapper {
          padding: 8px;
        }

        .enhanced-writing-interface.compact-mode :global(.p-6) {
          padding: 12px !important;
        }

        .enhanced-writing-interface.compact-mode :global(.p-4) {
          padding: 8px !important;
        }

        .enhanced-writing-interface.compact-mode :global(.space-y-8) {
          gap: 16px !important;
        }

        .enhanced-writing-interface.compact-mode :global(.space-y-6) {
          gap: 12px !important;
        }

        /* Hide Non-Essential Mode */
        .enhanced-writing-interface.hide-non-essential :global(.header-subtitle),
        .enhanced-writing-interface.hide-non-essential :global(.text-sm.text-gray-600),
        .enhanced-writing-interface.hide-non-essential :global(.help-text) {
          display: none !important;
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .interface-controls {
            position: relative;
            top: 0;
            right: 0;
            margin-bottom: 16px;
          }

          .control-group {
            flex-wrap: wrap;
            justify-content: center;
          }

          .control-label {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
