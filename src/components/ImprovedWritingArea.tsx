import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Target, Save, Lightbulb, Search, BookOpen } from 'lucide-react';
import { generatePrompt } from '../lib/openai';

interface ImprovedWritingAreaProps {
  content: string;
  onChange: (content: string) => void;
  textType: string;
  onTimerStart: () => void;
  onSubmit: () => void;
  prompt?: string;
  onPromptChange?: (prompt: string) => void;
}

export function ImprovedWritingArea({
  content,
  onChange,
  textType,
  onTimerStart,
  onSubmit,
  prompt: externalPrompt,
  onPromptChange
}: ImprovedWritingAreaProps) {
  const [prompt, setPrompt] = useState(externalPrompt || '');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showCustomPrompt, setShowCustomPrompt] = useState(false);
  const [customPrompt, setCustomPrompt] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [showPromptButtons, setShowPromptButtons] = useState(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const words = content.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
  }, [content]);

  useEffect(() => {
    if (prompt) {
      onTimerStart();
      setShowPromptButtons(false);
    }
  }, [prompt, onTimerStart]);

  useEffect(() => {
    if (externalPrompt) {
      setPrompt(externalPrompt);
    }
  }, [externalPrompt]);

  const handleGeneratePrompt = async () => {
    setIsGenerating(true);
    try {
      const newPrompt = await generatePrompt(textType);
      if (newPrompt) {
        setPrompt(newPrompt);
        if (onPromptChange) {
          onPromptChange(newPrompt);
        }
        setShowCustomPrompt(false);
      }
    } catch (error) {
      console.error('Error generating prompt:', error);
    }
    setIsGenerating(false);
  };

  const handleCustomPromptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customPrompt.trim()) {
      setPrompt(customPrompt);
      if (onPromptChange) {
        onPromptChange(customPrompt);
      }
      setShowCustomPrompt(false);
    }
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const getWritingTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'creative story':
      case 'creative':
        return '📖';
      case 'persuasive essay':
      case 'persuasive':
        return '🗣️';
      case 'narrative report':
      case 'narrative':
        return '📰';
      default:
        return '✍️';
    }
  };

  const getTargetWordCount = (type: string) => {
    switch (type.toLowerCase()) {
      case 'creative story':
      case 'creative':
        return '300-400';
      case 'persuasive essay':
      case 'persuasive':
        return '250-350';
      case 'narrative report':
      case 'narrative':
        return '200-300';
      default:
        return '250-400';
    }
  };

  const noTypeSelected = !textType;

  return (
    <div className="improved-writing-container">
      <div className="writing-header">
        {prompt && (
          <div className="prompt-section">
            <h3>
              <Sparkles size={20} />
              Today's NSW Selective Writing Challenge
            </h3>
            <div className="prompt-text">
              <strong>{prompt}</strong>
              {textType && (
                <div className="prompt-instructions">
                  <em>Write a {textType.toLowerCase()} of {getTargetWordCount(textType)} words. Include: vivid setting, character development, engaging dialogue, and a clear beginning, middle, and end.</em>
                </div>
              )}
            </div>
          </div>
        )}

        {textType && (
          <div className="writing-types">
            <button 
              className={`type-btn ${textType === 'creative story' ? 'active' : ''}`}
              onClick={() => {/* Handle type change */}}
            >
              📖 Creative Story
            </button>
            <button 
              className={`type-btn ${textType === 'persuasive essay' ? 'active' : ''}`}
              onClick={() => {/* Handle type change */}}
            >
              🗣️ Persuasive Essay
            </button>
            <button 
              className={`type-btn ${textType === 'narrative report' ? 'active' : ''}`}
              onClick={() => {/* Handle type change */}}
            >
              📰 Narrative Report
            </button>
          </div>
        )}

        {!noTypeSelected && showPromptButtons && (
          <div className="prompt-actions">
            <button
              onClick={() => setShowCustomPrompt(true)}
              className="btn btn-secondary"
            >
              <Target size={16} />
              I have my own prompt
            </button>
            <button
              onClick={handleGeneratePrompt}
              disabled={isGenerating}
              className="btn btn-primary"
            >
              <Sparkles size={16} />
              {isGenerating ? 'Generating...' : 'Generate New Prompt'}
            </button>
          </div>
        )}

        {showCustomPrompt && !noTypeSelected && (
          <form onSubmit={handleCustomPromptSubmit} className="custom-prompt-form">
            <textarea
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="Enter your own writing prompt..."
              className="custom-prompt-input"
              rows={3}
            />
            <div className="custom-prompt-actions">
              <button
                type="button"
                onClick={() => setShowCustomPrompt(false)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
              >
                Use This Prompt
              </button>
            </div>
          </form>
        )}
      </div>

      <div className="writing-area">
        <div className="textarea-container">
          <textarea
            ref={textareaRef}
            className="writing-textarea"
            value={content}
            onChange={handleContentChange}
            placeholder="Start typing your amazing story here! Your AI coach is watching and ready to help you create something incredible... ✨"
          />
          <div className="word-count">
            {wordCount} words • Target: {getTargetWordCount(textType)}
          </div>
        </div>
      </div>

      <div className="action-bar">
        <button className="btn btn-primary" onClick={() => {}}>
          <Lightbulb size={16} />
          Get Smart Tip
        </button>
        <button className="btn btn-secondary" onClick={() => {}}>
          <Search size={16} />
          AI Analysis
        </button>
        <button className="btn btn-secondary" onClick={() => {}}>
          <Save size={16} />
          Save Progress
        </button>
      </div>

      <style jsx>{`
        .improved-writing-container {
          flex: 1;
          display: flex;
          flex-direction: column;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.3);
          margin: 8px;
        }

        .writing-header {
          padding: 24px;
          background: rgba(248, 250, 252, 0.5);
          border-bottom: 1px solid rgba(255, 255, 255, 0.3);
        }

        .prompt-section {
          background: linear-gradient(135deg, #fef9e7, #fef3c7);
          border: 2px solid rgba(251, 191, 36, 0.3);
          border-radius: 20px;
          padding: 24px;
          margin-bottom: 20px;
          position: relative;
          overflow: hidden;
        }

        .prompt-section::before {
          content: '✨';
          position: absolute;
          top: 20px;
          right: 20px;
          font-size: 24px;
          animation: sparkle 3s infinite;
        }

        @keyframes sparkle {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.2) rotate(180deg); }
        }

        .prompt-section h3 {
          color: #92400e;
          font-size: 18px;
          margin-bottom: 16px;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .prompt-text {
          color: #78350f;
          line-height: 1.7;
          font-size: 16px;
        }

        .prompt-instructions {
          margin-top: 12px;
          font-style: italic;
          opacity: 0.8;
        }

        .writing-types {
          display: flex;
          gap: 12px;
          padding: 8px;
          background: rgba(241, 245, 249, 0.8);
          border-radius: 16px;
          backdrop-filter: blur(10px);
          margin-bottom: 20px;
        }

        .type-btn {
          padding: 12px 20px;
          border: none;
          border-radius: 12px;
          background: transparent;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .type-btn:hover {
          background: rgba(255, 255, 255, 0.8);
          transform: translateY(-2px);
        }

        .type-btn.active {
          background: linear-gradient(135deg, #10b981, #34d399);
          color: white;
          box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
        }

        .prompt-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .custom-prompt-form {
          background: rgba(255, 255, 255, 0.8);
          border-radius: 16px;
          padding: 20px;
          margin-top: 16px;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .custom-prompt-input {
          width: 100%;
          padding: 12px 16px;
          border: 1px solid rgba(226, 232, 240, 0.6);
          border-radius: 12px;
          font-size: 14px;
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
          margin-bottom: 12px;
          resize: vertical;
        }

        .custom-prompt-input:focus {
          outline: none;
          border-color: #10b981;
          box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.1);
          background: rgba(255, 255, 255, 0.95);
        }

        .custom-prompt-actions {
          display: flex;
          gap: 12px;
          justify-content: flex-end;
        }

        .writing-area {
          flex: 1;
          padding: 24px;
          display: flex;
          flex-direction: column;
          position: relative;
        }

        .textarea-container {
          flex: 1;
          position: relative;
          display: flex;
          flex-direction: column;
        }

        .writing-textarea {
          flex: 1;
          width: 100%;
          border: 2px solid transparent;
          border-radius: 20px;
          padding: 28px;
          font-size: 16px;
          line-height: 1.8;
          resize: none;
          outline: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          font-family: 'Georgia', serif;
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(10px);
          box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.05);
          min-height: 300px;
        }

        .writing-textarea:focus {
          border-color: #10b981;
          box-shadow: 0 0 0 6px rgba(16, 185, 129, 0.1), inset 0 2px 10px rgba(0, 0, 0, 0.05);
          background: rgba(255, 255, 255, 0.95);
        }

        .word-count {
          position: absolute;
          bottom: 20px;
          right: 28px;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(20px);
          padding: 10px 18px;
          border-radius: 25px;
          font-size: 13px;
          font-weight: 600;
          color: #64748b;
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .action-bar {
          padding: 24px;
          border-top: 1px solid rgba(255, 255, 255, 0.3);
          display: flex;
          gap: 16px;
          background: rgba(248, 250, 252, 0.8);
          backdrop-filter: blur(10px);
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn {
          padding: 14px 24px;
          border-radius: 16px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: center;
          gap: 10px;
          border: none;
          position: relative;
          overflow: hidden;
        }

        .btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
          transition: left 0.5s;
        }

        .btn:hover::before {
          left: 100%;
        }

        .btn-primary {
          background: linear-gradient(135deg, #10b981, #34d399);
          color: white;
          box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
        }

        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(16, 185, 129, 0.5);
        }

        .btn-primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .btn-secondary {
          background: rgba(255, 255, 255, 0.85);
          color: #0f172a;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.95);
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .writing-header {
            padding: 16px;
          }
          
          .writing-area {
            padding: 16px;
          }
          
          .action-bar {
            padding: 16px;
            flex-direction: column;
          }
          
          .prompt-actions {
            flex-direction: column;
          }
          
          .writing-types {
            flex-direction: column;
            gap: 8px;
          }
        }
      `}</style>
    </div>
  );
}

