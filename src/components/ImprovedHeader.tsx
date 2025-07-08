import React, { useState, useEffect } from 'react';
import { Clock, Zap, Target, Settings } from 'lucide-react';

interface ImprovedHeaderProps {
  textType: string;
  assistanceLevel: string;
  onTextTypeChange: (type: string) => void;
  onAssistanceLevelChange: (level: string) => void;
  onTimerStart: () => void;
  timeRemaining?: number;
  currentStep?: number;
  totalSteps?: number;
}

export function ImprovedHeader({
  textType,
  assistanceLevel,
  onTextTypeChange,
  onAssistanceLevelChange,
  onTimerStart,
  timeRemaining = 45,
  currentStep = 1,
  totalSteps = 4
}: ImprovedHeaderProps) {
  const [progress, setProgress] = useState((currentStep / totalSteps) * 100);

  useEffect(() => {
    setProgress((currentStep / totalSteps) * 100);
  }, [currentStep, totalSteps]);

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m left`;
    }
    return `${mins} mins left`;
  };

  return (
    <header className="improved-header">
      <div className="header-content">
        <div className="header-left">
          <div className="app-title">
            <span className="app-icon">🤖</span>
            NSW Writing Coach
            <span className="ai-badge">AI Powered</span>
          </div>
          <div className="progress-section">
            <span className="progress-text">Step {currentStep} of {totalSteps}</span>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
        
        <div className="header-right">
          <div className="timer">
            <Clock size={16} />
            {formatTime(timeRemaining)}
          </div>
          <div className="live-indicator">
            <div className="live-dot" />
            Live AI Feedback
          </div>
        </div>
      </div>

      <style jsx>{`
        .improved-header {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.3);
          padding: 16px 24px;
          z-index: 100;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          position: sticky;
          top: 0;
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1400px;
          margin: 0 auto;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .app-title {
          font-size: 20px;
          font-weight: 800;
          background: linear-gradient(135deg, #10b981, #34d399);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .app-icon {
          font-size: 24px;
        }

        .ai-badge {
          background: linear-gradient(135deg, #10b981, #34d399);
          color: white;
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          animation: pulse 2s infinite;
          box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.9; }
        }

        .progress-section {
          display: flex;
          align-items: center;
          gap: 16px;
          background: rgba(255, 255, 255, 0.85);
          padding: 12px 20px;
          border-radius: 25px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .progress-text {
          font-size: 14px;
          font-weight: 600;
          color: #0f172a;
        }

        .progress-bar {
          width: 120px;
          height: 8px;
          background: rgba(226, 232, 240, 0.6);
          border-radius: 4px;
          overflow: hidden;
          position: relative;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(135deg, #10b981, #34d399);
          border-radius: 4px;
          transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
        }

        .progress-fill::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent);
          animation: shimmer 2s infinite;
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .timer, .live-indicator {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          font-weight: 600;
          padding: 8px 16px;
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .live-dot {
          width: 8px;
          height: 8px;
          background: #10b981;
          border-radius: 50%;
          animation: blink 1.5s infinite;
        }

        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0.4; }
        }

        @media (max-width: 768px) {
          .improved-header {
            padding: 12px 16px;
          }
          
          .progress-section {
            display: none;
          }
          
          .header-left {
            gap: 12px;
          }
          
          .app-title {
            font-size: 18px;
          }
          
          .header-right {
            gap: 8px;
          }
          
          .timer, .live-indicator {
            padding: 6px 12px;
            font-size: 12px;
          }
        }
      `}</style>
    </header>
  );
}

