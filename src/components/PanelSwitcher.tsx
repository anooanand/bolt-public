import React from 'react';
import { Bot, RefreshCw } from 'lucide-react';

interface PanelSwitcherProps {
  activePanel: 'coach' | 'paraphrase';
  onPanelChange: (panel: 'coach' | 'paraphrase') => void;
}

export function PanelSwitcher({ activePanel, onPanelChange }: PanelSwitcherProps) {
  return (
    <div className="panel-switcher">
      <div className="switcher-container">
        <button
          onClick={() => onPanelChange('coach')}
          className={`switcher-btn ${activePanel === 'coach' ? 'active' : ''}`}
        >
          <Bot size={16} />
          AI Coach
        </button>
        <button
          onClick={() => onPanelChange('paraphrase')}
          className={`switcher-btn ${activePanel === 'paraphrase' ? 'active' : ''}`}
        >
          <RefreshCw size={16} />
          Paraphrase
        </button>
      </div>

      <style jsx>{`
        .panel-switcher {
          background: var(--glass-bg);
          backdrop-filter: blur(20px);
          border-top: 1px solid var(--glass-border);
          padding: var(--space-md);
          display: flex;
          justify-content: center;
          align-items: center;
          box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);
        }

        .switcher-container {
          display: flex;
          gap: var(--space-sm);
          background: rgba(241, 245, 249, 0.8);
          padding: var(--space-xs);
          border-radius: var(--radius-lg);
          backdrop-filter: blur(10px);
          border: 1px solid var(--glass-border);
        }

        .switcher-btn {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          padding: var(--space-md) var(--space-lg);
          border: none;
          border-radius: var(--radius-md);
          background: transparent;
          color: var(--text-secondary);
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all var(--transition-bounce);
          position: relative;
          overflow: hidden;
        }

        .switcher-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent);
          transition: left var(--transition-slow);
        }

        .switcher-btn:hover {
          background: rgba(255, 255, 255, 0.8);
          color: var(--text-primary);
          transform: translateY(-1px);
        }

        .switcher-btn:hover::before {
          left: 100%;
        }

        .switcher-btn.active {
          background: var(--secondary-gradient);
          color: white;
          box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);
          transform: translateY(-1px);
        }

        .switcher-btn.active:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(99, 102, 241, 0.5);
        }

        @media (max-width: 768px) {
          .panel-switcher {
            padding: var(--space-sm);
          }
          
          .switcher-container {
            width: 100%;
            justify-content: center;
          }
          
          .switcher-btn {
            flex: 1;
            justify-content: center;
            padding: var(--space-sm) var(--space-md);
            font-size: 13px;
          }
        }
      `}</style>
    </div>
  );
}
