import React, { useState, useEffect } from 'react';
import { Bot, ChevronDown, ChevronUp, MessageCircle, TrendingUp, Target, BookOpen, Zap } from 'lucide-react';

interface ImprovedCoachPanelProps {
  content: string;
  textType: string;
  assistanceLevel: string;
  onSendMessage?: (message: string) => void;
}

interface CoachMessage {
  id: string;
  text: string;
  timestamp: Date;
  type: 'tip' | 'encouragement' | 'feedback';
}

export function ImprovedCoachPanel({
  content,
  textType,
  assistanceLevel,
  onSendMessage
}: ImprovedCoachPanelProps) {
  const [messages, setMessages] = useState<CoachMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [expandedSections, setExpandedSections] = useState({
    structure: true,
    vocab: true
  });
  const [stats, setStats] = useState({
    wpm: 0,
    focus: 100,
    creativity: '⭐',
    streak: 1
  });

  useEffect(() => {
    // Initialize with welcome message
    if (messages.length === 0) {
      setMessages([{
        id: '1',
        text: "Hello there, amazing writer! 👋 I'm your AI writing coach, and I'm super excited to help you create an incredible story! I can see you've chosen creative writing - excellent choice! Let's make magic happen together! I'll give you real-time tips, suggestions, and encouragement as you write! 🚀",
        timestamp: new Date(),
        type: 'encouragement'
      }]);
    }
  }, []);

  useEffect(() => {
    // Calculate stats based on content
    const words = content.trim().split(/\s+/).filter(word => word.length > 0);
    const wordCount = words.length;
    
    // Simple WPM calculation (assuming 1 minute of writing time for demo)
    setStats(prev => ({
      ...prev,
      wpm: Math.min(wordCount, 60), // Cap at 60 for demo
      creativity: wordCount > 50 ? '⭐⭐' : wordCount > 20 ? '⭐' : '✨'
    }));

    // Add coaching messages based on content length
    if (wordCount === 10 && !messages.find(m => m.text.includes('Great start'))) {
      addCoachMessage("Great start! You're building momentum. Keep those creative ideas flowing! 🌟", 'encouragement');
    } else if (wordCount === 50 && !messages.find(m => m.text.includes('Halfway'))) {
      addCoachMessage("Halfway there! Your story is taking shape beautifully. Remember to add vivid details! 🎨", 'tip');
    } else if (wordCount >= 100 && !messages.find(m => m.text.includes('Excellent progress'))) {
      addCoachMessage("Excellent progress! Your writing is flowing wonderfully. Consider adding dialogue to bring your characters to life! 💬", 'feedback');
    }
  }, [content]);

  const addCoachMessage = (text: string, type: CoachMessage['type']) => {
    const newMessage: CoachMessage = {
      id: Date.now().toString(),
      text,
      timestamp: new Date(),
      type
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (chatInput.trim()) {
      if (onSendMessage) {
        onSendMessage(chatInput);
      }
      // Add user message and mock AI response
      addCoachMessage(`Great question! Here's my advice: ${chatInput.includes('help') ? 'Try focusing on one paragraph at a time and describe what your character sees, hears, and feels!' : 'Keep writing and let your creativity flow! Remember, every great writer started with a single word.'}`, 'tip');
      setChatInput('');
    }
  };

  const structureSteps = [
    { text: "1. Plan your main character & setting", status: content.length > 20 ? 'completed' : 'current' },
    { text: "2. Write an engaging opening hook", status: content.length > 50 ? 'completed' : content.length > 20 ? 'current' : 'pending' },
    { text: "3. Build the exciting middle conflict", status: content.length > 100 ? 'completed' : content.length > 50 ? 'current' : 'pending' },
    { text: "4. Create a satisfying resolution", status: content.length > 150 ? 'completed' : content.length > 100 ? 'current' : 'pending' },
    { text: "5. Edit and polish to perfection", status: content.length > 200 ? 'current' : 'pending' }
  ];

  const powerWords = [
    'mysterious', 'suddenly', 'whispered', 'trembling',
    'discovered', 'ancient', 'gleaming', 'adventure',
    'magnificent', 'enchanted', 'brilliant', 'extraordinary'
  ];

  const insertWord = (word: string) => {
    // This would typically insert the word at cursor position
    console.log('Inserting word:', word);
  };

  return (
    <div className="improved-coach-panel">
      <div className="coach-header">
        <div className="coach-title">Your AI Writing Coach</div>
        <div className="coach-subtitle">I'm here to help you write amazingly!</div>
      </div>

      <div className="coach-content">
        {/* Messages */}
        <div className="messages-section">
          {messages.map((message) => (
            <div key={message.id} className="coach-message">
              <div className="coach-avatar">
                <Bot size={20} />
              </div>
              <div className="message-content">
                {message.text}
              </div>
            </div>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">{stats.wpm}</div>
            <div className="stat-label">Words/Min</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.focus}%</div>
            <div className="stat-label">Focus Score</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.creativity}</div>
            <div className="stat-label">Creativity</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.streak}</div>
            <div className="stat-label">Day Streak</div>
          </div>
        </div>

        {/* Structure Guide */}
        <div className="section-card">
          <div 
            className="section-header" 
            onClick={() => toggleSection('structure')}
          >
            <div className="section-title">
              <Target size={16} />
              Story Structure Guide
            </div>
            {expandedSections.structure ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
          {expandedSections.structure && (
            <div className="section-content">
              <ul className="structure-steps">
                {structureSteps.map((step, index) => (
                  <li key={index} className={step.status}>
                    {step.text}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Vocabulary */}
        <div className="section-card">
          <div 
            className="section-header" 
            onClick={() => toggleSection('vocab')}
          >
            <div className="section-title">
              <Zap size={16} />
              Power Words Library
            </div>
            {expandedSections.vocab ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
          {expandedSections.vocab && (
            <div className="section-content">
              <div className="vocab-grid">
                {powerWords.map((word, index) => (
                  <div 
                    key={index}
                    className="vocab-chip" 
                    onClick={() => insertWord(word)}
                  >
                    {word}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Chat Section */}
        <div className="chat-section">
          <form onSubmit={handleChatSubmit}>
            <input
              type="text"
              className="chat-input"
              placeholder="Ask me anything about your story..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
            />
            <button type="submit" className="chat-submit">
              <MessageCircle size={16} />
              Ask Coach
            </button>
          </form>
        </div>
      </div>

      <style jsx>{`
        .improved-coach-panel {
          width: 400px;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          margin: 8px;
          max-height: calc(100vh - 200px);
        }

        .coach-header {
          background: linear-gradient(135deg, #10b981, #34d399);
          color: white;
          padding: 24px;
          text-align: center;
          position: relative;
        }

        .coach-header::before {
          content: '🤖';
          position: absolute;
          top: 20px;
          right: 20px;
          font-size: 28px;
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }

        .coach-title {
          font-size: 20px;
          font-weight: 800;
          margin-bottom: 8px;
        }

        .coach-subtitle {
          font-size: 14px;
          opacity: 0.9;
          font-weight: 500;
        }

        .coach-content {
          flex: 1;
          overflow-y: auto;
          padding: 20px;
        }

        .coach-content::-webkit-scrollbar {
          width: 6px;
        }

        .coach-content::-webkit-scrollbar-track {
          background: transparent;
        }

        .coach-content::-webkit-scrollbar-thumb {
          background: rgba(100, 116, 139, 0.3);
          border-radius: 3px;
        }

        .messages-section {
          margin-bottom: 20px;
        }

        .coach-message {
          background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
          border: 2px solid rgba(59, 130, 246, 0.2);
          border-radius: 20px;
          padding: 20px;
          margin-bottom: 16px;
          position: relative;
          overflow: hidden;
          animation: slideInRight 0.6s ease;
          display: flex;
          gap: 12px;
          align-items: flex-start;
        }

        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }

        .coach-avatar {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #10b981, #34d399);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 800;
          font-size: 16px;
          box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
          flex-shrink: 0;
        }

        .message-content {
          flex: 1;
          font-size: 14px;
          line-height: 1.5;
          color: #1e293b;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          margin-bottom: 20px;
        }

        .stat-card {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 16px;
          padding: 16px;
          text-align: center;
        }

        .stat-value {
          font-size: 24px;
          font-weight: 800;
          background: linear-gradient(135deg, #10b981, #34d399);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .stat-label {
          font-size: 12px;
          color: #64748b;
          margin-top: 4px;
          font-weight: 600;
        }

        .section-card {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 20px;
          margin-bottom: 20px;
          overflow: hidden;
        }

        .section-header {
          padding: 20px;
          background: rgba(248, 250, 252, 0.8);
          border-bottom: 1px solid rgba(255, 255, 255, 0.3);
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .section-header:hover {
          background: rgba(248, 250, 252, 1);
        }

        .section-title {
          font-size: 16px;
          font-weight: 700;
          color: #0f172a;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .section-content {
          padding: 20px;
        }

        .structure-steps {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .structure-steps li {
          padding: 16px 20px;
          margin-bottom: 12px;
          background: rgba(248, 250, 252, 0.8);
          border-radius: 16px;
          border-left: 4px solid #e2e8f0;
          font-size: 14px;
          font-weight: 600;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
        }

        .structure-steps li:hover {
          background: rgba(248, 250, 252, 1);
          transform: translateX(8px);
        }

        .structure-steps li.current {
          border-left-color: #10b981;
          background: linear-gradient(135deg, #f0fdf4, #dcfce7);
          box-shadow: 0 4px 15px rgba(16, 185, 129, 0.2);
        }

        .structure-steps li.completed {
          border-left-color: #64748b;
          background: rgba(241, 245, 249, 0.8);
          opacity: 0.6;
        }

        .vocab-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }

        .vocab-chip {
          background: rgba(248, 250, 252, 0.8);
          padding: 12px 16px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          text-align: center;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid rgba(255, 255, 255, 0.3);
          position: relative;
          overflow: hidden;
        }

        .vocab-chip::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent);
          transition: left 0.5s;
        }

        .vocab-chip:hover {
          background: linear-gradient(135deg, #10b981, #34d399);
          color: white;
          transform: translateY(-4px);
          box-shadow: 0 8px 20px rgba(16, 185, 129, 0.4);
        }

        .vocab-chip:hover::before {
          left: 100%;
        }

        .chat-section {
          border-top: 1px solid rgba(255, 255, 255, 0.3);
          padding: 20px 0 0 0;
        }

        .chat-section form {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .chat-input {
          width: 100%;
          padding: 14px 18px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 16px;
          font-size: 14px;
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }

        .chat-input:focus {
          outline: none;
          border-color: #10b981;
          box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.1);
          background: rgba(255, 255, 255, 0.95);
        }

        .chat-submit {
          background: linear-gradient(135deg, #10b981, #34d399);
          color: white;
          border: none;
          padding: 12px 20px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .chat-submit:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
        }

        @media (max-width: 1024px) {
          .improved-coach-panel {
            width: 100%;
            height: 300px;
            order: -1;
            max-height: 300px;
          }
        }

        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .vocab-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      `}</style>
    </div>
  );
}
