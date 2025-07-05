import React, { useState, useEffect } from 'react';
import { MessageCircle, Lightbulb, Star, Heart, Zap, CheckCircle } from 'lucide-react';

interface WritingCoachProps {
  content: string;
  textType: string;
  wordCount: number;
  onEncouragement?: () => void;
}

interface CoachMessage {
  id: string;
  type: 'encouragement' | 'tip' | 'celebration';
  message: string;
  mascot: 'wizard' | 'guardian' | 'spinner' | 'explorer';
  icon: React.ReactNode;
  color: string;
}

export function WritingCoach({ content, textType, wordCount, onEncouragement }: WritingCoachProps) {
  const [currentMessage, setCurrentMessage] = useState<CoachMessage | null>(null);

  // Generate encouraging messages based on writing progress
  const generateCoachMessage = (): CoachMessage => {
    const messages: CoachMessage[] = [];

    // Word count based encouragement
    if (wordCount === 0) {
      messages.push({
        id: 'start-writing',
        type: 'encouragement',
        message: "Hi there! I'm here to help you write something amazing. Just start typing and let your imagination flow! ✨",
        mascot: 'spinner',
        icon: <Heart className="h-5 w-5" />,
        color: 'primary'
      });
    } else if (wordCount < 50) {
      messages.push({
        id: 'keep-going',
        type: 'encouragement',
        message: `Great start! You've written ${wordCount} words. Keep going - you're doing fantastic! 🌟`,
        mascot: 'explorer',
        icon: <Star className="h-5 w-5" />,
        color: 'success'
      });
    } else if (wordCount >= 100) {
      messages.push({
        id: 'amazing-progress',
        type: 'celebration',
        message: `Incredible! You've written ${wordCount} words! You're becoming a real writing superstar! 🎉`,
        mascot: 'wizard',
        icon: <CheckCircle className="h-5 w-5" />,
        color: 'sunshine'
      });
    }

    // Text type specific tips
    if (textType === 'narrative') {
      messages.push({
        id: 'narrative-tip',
        type: 'tip',
        message: "Remember to include exciting characters, a fun setting, and an adventure! What happens next in your story? 📚",
        mascot: 'spinner',
        icon: <Lightbulb className="h-5 w-5" />,
        color: 'primary'
      });
    } else if (textType === 'persuasive') {
      messages.push({
        id: 'persuasive-tip',
        type: 'tip',
        message: "Great job sharing your opinion! Remember to give reasons why others should agree with you. What's your strongest point? 💪",
        mascot: 'explorer',
        icon: <Lightbulb className="h-5 w-5" />,
        color: 'success'
      });
    }

    // Return a random message from available options
    return messages[Math.floor(Math.random() * messages.length)];
  };

  // Update coach message periodically
  useEffect(() => {
    const interval = setInterval(() => {
      const newMessage = generateCoachMessage();
      if (!currentMessage || currentMessage.id !== newMessage.id) {
        setCurrentMessage(newMessage);
      }
    }, 15000);

    return () => clearInterval(interval);
  }, [content, textType, wordCount, currentMessage]);

  // Initialize with first message
  useEffect(() => {
    if (!currentMessage) {
      setCurrentMessage(generateCoachMessage());
    }
  }, []);

  if (!currentMessage) return null;

  const getColorClasses = (color: string) => {
    const colorMap = {
      primary: 'from-primary-400 to-primary-600 border-primary-200',
      success: 'from-success-400 to-success-600 border-success-200',
      magic: 'from-magic-400 to-magic-600 border-magic-200',
      sunshine: 'from-sunshine-400 to-sunshine-600 border-sunshine-200',
      sky: 'from-sky-400 to-sky-600 border-sky-200',
      fun: 'from-fun-400 to-fun-600 border-fun-200'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.primary;
  };

  return (
    <div className="space-y-4">
      {/* Current coach message */}
      <div className={`
        relative bg-gradient-to-r ${getColorClasses(currentMessage.color)} 
        rounded-kid-lg p-4 shadow-fun border-2 text-white overflow-hidden
      `}>
        <div className="relative z-10 flex items-start space-x-3">
          {/* Mascot avatar */}
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center animate-bounce-gentle">
              {currentMessage.icon}
            </div>
          </div>

          {/* Message content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-kid-sm font-display font-bold">
                {currentMessage.mascot === 'wizard' && 'Word Wizard'}
                {currentMessage.mascot === 'guardian' && 'Grammar Guardian'}
                {currentMessage.mascot === 'spinner' && 'Story Spinner'}
                {currentMessage.mascot === 'explorer' && 'Idea Explorer'}
              </span>
            </div>
            <p className="text-kid-base font-body leading-relaxed">
              {currentMessage.message}
            </p>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="flex items-center space-x-2">
        <button
          onClick={() => {
            setCurrentMessage(generateCoachMessage());
            onEncouragement?.();
          }}
          className="bg-white border-2 border-primary-200 hover:border-primary-300 rounded-kid px-3 py-2 flex items-center space-x-2 transition-colors group"
        >
          <MessageCircle className="h-4 w-4 text-primary-600 group-hover:scale-110 transition-transform" />
          <span className="text-kid-sm font-body text-neutral-700">
            Get Encouragement
          </span>
        </button>

        <button
          onClick={() => setCurrentMessage(generateCoachMessage())}
          className="bg-white border-2 border-magic-200 hover:border-magic-300 rounded-kid px-3 py-2 flex items-center space-x-2 transition-colors group"
        >
          <Lightbulb className="h-4 w-4 text-magic-600 group-hover:scale-110 transition-transform" />
          <span className="text-kid-sm font-body text-neutral-700">
            Get a Tip
          </span>
        </button>
      </div>
    </div>
  );
}