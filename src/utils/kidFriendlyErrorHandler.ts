import React, { useEffect } from 'react';
import { X } from 'lucide-react';

// Comprehensive error handling system for kid-friendly interactions
export interface KidFriendlyError {
  type: 'encouragement' | 'guidance' | 'celebration' | 'gentle-correction';
  title: string;
  message: string;
  actionSuggestion?: string;
  helpText?: string;
  icon: string;
  color: 'blue' | 'green' | 'yellow' | 'purple';
  autoHide?: boolean;
  duration?: number;
}

export class KidFriendlyErrorHandler {
  private static errorMappings: Record<string, KidFriendlyError> = {
    'NETWORK_ERROR': {
      type: 'guidance',
      title: 'Connection Hiccup!',
      message: 'It looks like we\'re having trouble connecting to the internet. Don\'t worry, your writing is safe!',
      actionSuggestion: 'Let\'s try again in a moment, or you can keep writing while we reconnect.',
      helpText: 'Your work is automatically saved on your device, so nothing will be lost.',
      icon: '🌐',
      color: 'blue',
      autoHide: false
    },

    'AI_GENERATION_FAILED': {
      type: 'encouragement',
      title: 'Let Me Think Again!',
      message: 'I\'m having trouble coming up with suggestions right now, but that\'s okay!',
      actionSuggestion: 'You can keep writing your amazing story, and I\'ll try to help again in a moment.',
      helpText: 'Sometimes the best ideas come from your own creativity anyway!',
      icon: '🤔',
      color: 'purple',
      autoHide: true,
      duration: 5000
    },

    'VALIDATION_ERROR': {
      type: 'gentle-correction',
      title: 'Let\'s Check That Together!',
      message: 'I noticed something we can improve in your writing.',
      actionSuggestion: 'Take a look at the highlighted area, and let\'s make it even better!',
      helpText: 'Every great writer makes revisions - it\'s part of the creative process!',
      icon: '✨',
      color: 'yellow',
      autoHide: false
    },

    'SAVE_FAILED': {
      type: 'guidance',
      title: 'Saving Trouble!',
      message: 'I\'m having trouble saving your work right now, but don\'t worry!',
      actionSuggestion: 'Your writing is still safe, and I\'ll keep trying to save it automatically.',
      helpText: 'You can also copy your text as a backup if you want to be extra safe.',
      icon: '💾',
      color: 'blue',
      autoHide: false
    },

    'CONTENT_TOO_SHORT': {
      type: 'encouragement',
      title: 'Great Start!',
      message: 'You\'re off to a wonderful beginning! Keep going to unlock more helpful features.',
      actionSuggestion: 'Try writing a few more sentences to see what suggestions I can offer.',
      helpText: 'The more you write, the better I can help you improve your story!',
      icon: '🌱',
      color: 'green',
      autoHide: true,
      duration: 4000
    },

    'RATE_LIMIT_EXCEEDED': {
      type: 'gentle-correction',
      title: 'Slow Down, Speed Writer!',
      message: 'Wow, you\'re writing so fast! Let\'s take a quick breather.',
      actionSuggestion: 'Keep writing, but I might need a moment to catch up with all your amazing ideas.',
      helpText: 'Taking breaks while writing actually helps your creativity!',
      icon: '🏃‍♂️',
      color: 'yellow',
      autoHide: true,
      duration: 6000
    },

    'INITIALIZATION_ERROR': {
      type: 'guidance',
      title: 'Getting Ready!',
      message: 'I\'m still setting up your writing space. Just a moment please!',
      actionSuggestion: 'This usually takes just a few seconds. Your patience is appreciated!',
      helpText: 'Good things are worth waiting for!',
      icon: '⚙️',
      color: 'blue',
      autoHide: true,
      duration: 3000
    },

    'WORD_COUNT_MILESTONE': {
      type: 'celebration',
      title: 'Amazing Progress!',
      message: 'Look how much you\'ve written! You\'re doing fantastic!',
      actionSuggestion: 'Keep up the excellent work - you\'re on a roll!',
      helpText: 'Every word counts towards becoming a better writer!',
      icon: '🎉',
      color: 'green',
      autoHide: true,
      duration: 4000
    },

    'GRAMMAR_SUGGESTION': {
      type: 'gentle-correction',
      title: 'Let\'s Polish This!',
      message: 'I found a small way to make your writing even better!',
      actionSuggestion: 'Check out the suggestion - it\'s just a tiny improvement.',
      helpText: 'Even professional writers edit their work multiple times!',
      icon: '📝',
      color: 'yellow',
      autoHide: false
    },

    'VOCABULARY_ENHANCEMENT': {
      type: 'encouragement',
      title: 'Word Power!',
      message: 'I found some exciting words that could make your writing sparkle!',
      actionSuggestion: 'Try out these word suggestions to add more color to your story.',
      helpText: 'Learning new words is like collecting treasures for your writing!',
      icon: '📚',
      color: 'purple',
      autoHide: false
    }
  };

  static handleError(errorCode: string, context?: any): KidFriendlyError {
    const errorConfig = this.errorMappings[errorCode] || this.getDefaultError();
    
    // Create a copy to avoid modifying the original
    const customizedError = { ...errorConfig };
    
    // Add contextual information if available
    if (context) {
      customizedError.message = this.addContext(customizedError.message, context);
    }
    
    return customizedError;
  }

  private static getDefaultError(): KidFriendlyError {
    return {
      type: 'encouragement',
      title: 'Oops, Something Unexpected!',
      message: 'Something unexpected happened, but don\'t worry! Your writing is safe and we can keep going.',
      actionSuggestion: 'Try that again, or let me know if you need help with something else.',
      helpText: 'Even the best technology has hiccups sometimes - you\'re doing great!',
      icon: '🤖',
      color: 'blue',
      autoHide: true,
      duration: 5000
    };
  }

  private static addContext(message: string, context: any): string {
    // Add contextual information to make errors more specific and helpful
    if (context.wordCount && context.wordCount < 10) {
      return message + ' Once you\'ve written a bit more, I\'ll have better suggestions for you!';
    }
    
    if (context.textType) {
      return message + ` I\'m especially good at helping with ${context.textType} writing!`;
    }
    
    if (context.milestone) {
      return message + ` You just reached ${context.milestone} words - that\'s amazing!`;
    }
    
    return message;
  }

  // Helper method to create celebration messages
  static createCelebration(milestone: string, wordCount: number): KidFriendlyError {
    const celebrations = {
      'first-words': {
        title: '🎉 First Words!',
        message: `Fantastic! You've written your first ${wordCount} words!`,
        icon: '🌟'
      },
      'word-warrior': {
        title: '⚔️ Word Warrior!',
        message: `Amazing! You're now a Word Warrior with ${wordCount} words!`,
        icon: '🏆'
      },
      'story-master': {
        title: '📖 Story Master!',
        message: `Incredible! You've become a Story Master with ${wordCount} words!`,
        icon: '👑'
      },
      'writing-champion': {
        title: '🏅 Writing Champion!',
        message: `Outstanding! You're a true Writing Champion with ${wordCount} words!`,
        icon: '🎖️'
      }
    };

    const celebration = celebrations[milestone] || celebrations['first-words'];
    
    return {
      type: 'celebration',
      title: celebration.title,
      message: celebration.message,
      actionSuggestion: 'Keep up the fantastic work! You\'re on an amazing writing journey!',
      helpText: 'Every word you write makes you a better storyteller!',
      icon: celebration.icon,
      color: 'green',
      autoHide: true,
      duration: 5000
    };
  }
}

// React component for displaying kid-friendly errors
export const KidFriendlyErrorDisplay: React.FC<{
  error: KidFriendlyError;
  onDismiss: () => void;
}> = ({ error, onDismiss }) => {
  useEffect(() => {
    if (error.autoHide && error.duration) {
      const timer = setTimeout(onDismiss, error.duration);
      return () => clearTimeout(timer);
    }
  }, [error, onDismiss]);

  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200 text-blue-800',
    green: 'bg-green-50 border-green-200 text-green-800',
    yellow: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    purple: 'bg-purple-50 border-purple-200 text-purple-800'
  };

  const buttonColorClasses = {
    blue: 'bg-blue-600 hover:bg-blue-700',
    green: 'bg-green-600 hover:bg-green-700',
    yellow: 'bg-yellow-600 hover:bg-yellow-700',
    purple: 'bg-purple-600 hover:bg-purple-700'
  };

  return (
    <div className={`p-4 rounded-xl border-2 ${colorClasses[error.color]} mb-4 relative shadow-lg ${error.type === 'celebration' ? 'celebration-bounce' : ''}`}>
      <div className="flex items-start">
        <span className="text-3xl mr-3 flex-shrink-0">{error.icon}</span>
        <div className="flex-1">
          <h3 className="font-bold text-xl mb-2">{error.title}</h3>
          <p className="mb-3 text-lg leading-relaxed">{error.message}</p>
          
          {error.actionSuggestion && (
            <div className="mb-3 p-3 bg-white bg-opacity-50 rounded-lg">
              <div className="flex items-start">
                <span className="text-lg mr-2">💡</span>
                <p className="font-medium text-base">{error.actionSuggestion}</p>
              </div>
            </div>
          )}
          
          {error.helpText && (
            <div className="mb-3 p-3 bg-white bg-opacity-30 rounded-lg">
              <div className="flex items-start">
                <span className="text-lg mr-2">ℹ️</span>
                <p className="text-sm opacity-90">{error.helpText}</p>
              </div>
            </div>
          )}
          
          {!error.autoHide && (
            <button
              onClick={onDismiss}
              className={`mt-2 px-4 py-2 text-white rounded-lg font-medium transition-colors ${buttonColorClasses[error.color]}`}
            >
              Got it! 👍
            </button>
          )}
        </div>
        
        {!error.autoHide && (
          <button
            onClick={onDismiss}
            className="ml-2 text-gray-500 hover:text-gray-700 flex-shrink-0 p-1 rounded-full hover:bg-white hover:bg-opacity-50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
      
      {/* Progress bar for auto-hide messages */}
      {error.autoHide && error.duration && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white bg-opacity-30 rounded-b-xl overflow-hidden">
          <div 
            className="h-full bg-white bg-opacity-60 transition-all ease-linear"
            style={{ 
              animation: `shrink ${error.duration}ms linear`,
              width: '100%'
            }}
          ></div>
        </div>
      )}
    </div>
  );
};

// CSS animation for the progress bar
const style = document.createElement('style');
style.textContent = `
  @keyframes shrink {
    from { width: 100%; }
    to { width: 0%; }
  }
`;
document.head.appendChild(style);

