import React, { useState, useEffect } from 'react';
import { Star, Heart, Lightbulb, CheckCircle, AlertTriangle, Sparkles, Target, BookOpen } from 'lucide-react';

interface FeedbackItem {
  id: string;
  type: 'praise' | 'suggestion' | 'improvement' | 'achievement';
  category: 'spelling' | 'grammar' | 'vocabulary' | 'structure' | 'creativity' | 'overall';
  title: string;
  message: string;
  icon: React.ReactNode;
  color: string;
  actionable?: boolean;
  suggestion?: string;
}

interface KidFriendlyFeedbackProps {
  content: string;
  textType: string;
  onFeedbackAction?: (action: string, data?: any) => void;
}

export function KidFriendlyFeedback({ content, textType, onFeedbackAction }: KidFriendlyFeedbackProps) {
  const [feedback, setFeedback] = useState<FeedbackItem[]>([]);
  const [overallScore, setOverallScore] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  // Analyze content and generate kid-friendly feedback
  const analyzeFeedback = (text: string): FeedbackItem[] => {
    const feedbackItems: FeedbackItem[] = [];
    const wordCount = text.trim().split(/\s+/).filter(word => word.length > 0).length;
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0);

    // Overall encouragement based on length
    if (wordCount > 0) {
      if (wordCount >= 100) {
        feedbackItems.push({
          id: 'length-excellent',
          type: 'achievement',
          category: 'overall',
          title: 'Amazing Length! 🎉',
          message: `Wow! You wrote ${wordCount} words! That's a fantastic amount of writing. You're really getting the hang of this!`,
          icon: <Star className="h-5 w-5 fill-current" />,
          color: 'success'
        });
      } else if (wordCount >= 50) {
        feedbackItems.push({
          id: 'length-good',
          type: 'praise',
          category: 'overall',
          title: 'Great Progress! ⭐',
          message: `You've written ${wordCount} words! You're doing really well. Try to add a bit more detail to make your story even better!`,
          icon: <Heart className="h-5 w-5 fill-current" />,
          color: 'primary'
        });
      } else {
        feedbackItems.push({
          id: 'length-encourage',
          type: 'suggestion',
          category: 'overall',
          title: 'Keep Going! 💪',
          message: `You've made a good start with ${wordCount} words! Try to add more details about what happens, how characters feel, or what things look like.`,
          icon: <Target className="h-5 w-5" />,
          color: 'sunshine',
          actionable: true,
          suggestion: 'Add more descriptive details to your story'
        });
      }
    }

    // Sentence structure feedback
    if (sentences.length > 0) {
      const avgWordsPerSentence = wordCount / sentences.length;
      
      if (avgWordsPerSentence > 15) {
        feedbackItems.push({
          id: 'sentences-long',
          type: 'suggestion',
          category: 'structure',
          title: 'Break It Up! ✂️',
          message: 'Some of your sentences are quite long! Try breaking them into shorter sentences to make your writing easier to read.',
          icon: <Lightbulb className="h-5 w-5" />,
          color: 'sky',
          actionable: true,
          suggestion: 'Split long sentences into shorter ones'
        });
      } else if (avgWordsPerSentence < 5) {
        feedbackItems.push({
          id: 'sentences-short',
          type: 'suggestion',
          category: 'structure',
          title: 'Add More Details! 🌟',
          message: 'Try making some sentences longer by adding more information. What else can you tell us about what happened?',
          icon: <Lightbulb className="h-5 w-5" />,
          color: 'magic',
          actionable: true,
          suggestion: 'Add more details to some sentences'
        });
      } else {
        feedbackItems.push({
          id: 'sentences-good',
          type: 'praise',
          category: 'structure',
          title: 'Perfect Sentence Length! 👍',
          message: 'Your sentences are just the right length! They\'re easy to read and understand. Great job!',
          icon: <CheckCircle className="h-5 w-5" />,
          color: 'success'
        });
      }
    }

    // Paragraph structure
    if (paragraphs.length > 1) {
      feedbackItems.push({
        id: 'paragraphs-good',
        type: 'praise',
        category: 'structure',
        title: 'Great Organization! 📚',
        message: `You organized your writing into ${paragraphs.length} paragraphs! This makes it much easier to read. Well done!`,
        icon: <BookOpen className="h-5 w-5" />,
        color: 'primary'
      });
    } else if (wordCount > 100) {
      feedbackItems.push({
        id: 'paragraphs-suggest',
        type: 'suggestion',
        category: 'structure',
        title: 'Try Paragraphs! 📝',
        message: 'Your story is getting long! Try breaking it into paragraphs when you start a new idea or when something new happens.',
        icon: <Lightbulb className="h-5 w-5" />,
        color: 'sunshine',
        actionable: true,
        suggestion: 'Break your writing into paragraphs'
      });
    }

    // Creativity and engagement based on text type
    if (textType === 'narrative') {
      if (text.toLowerCase().includes('once upon a time') || text.toLowerCase().includes('the end')) {
        feedbackItems.push({
          id: 'story-structure',
          type: 'praise',
          category: 'creativity',
          title: 'Story Structure! 📖',
          message: 'I love how you used story language! Your story has a clear beginning or ending. That\'s what real authors do!',
          icon: <Sparkles className="h-5 w-5" />,
          color: 'magic'
        });
      }
    } else if (textType === 'persuasive') {
      if (text.toLowerCase().includes('because') || text.toLowerCase().includes('reason')) {
        feedbackItems.push({
          id: 'persuasive-reasons',
          type: 'praise',
          category: 'structure',
          title: 'Great Reasons! 💡',
          message: 'You\'re giving reasons for your opinion! That\'s exactly what persuasive writing should do. Excellent work!',
          icon: <CheckCircle className="h-5 w-5" />,
          color: 'success'
        });
      }
    }

    // Vocabulary praise
    const uniqueWords = new Set(text.toLowerCase().split(/\s+/).filter(word => word.length > 3));
    if (uniqueWords.size > 20) {
      feedbackItems.push({
        id: 'vocabulary-rich',
        type: 'praise',
        category: 'vocabulary',
        title: 'Amazing Vocabulary! 🌟',
        message: `You used ${uniqueWords.size} different interesting words! Your vocabulary is really growing. Keep using those great words!`,
        icon: <Star className="h-5 w-5 fill-current" />,
        color: 'magic'
      });
    }

    // Engagement and encouragement
    feedbackItems.push({
      id: 'keep-writing',
      type: 'praise',
      category: 'overall',
      title: 'You\'re Doing Great! 🎉',
      message: 'I can see you\'re putting effort into your writing! Every word you write makes you a better writer. Keep up the fantastic work!',
      icon: <Heart className="h-5 w-5 fill-current" />,
      color: 'fun'
    });

    return feedbackItems;
  };

  // Calculate overall score
  const calculateScore = (feedbackItems: FeedbackItem[]): number => {
    const praiseCount = feedbackItems.filter(f => f.type === 'praise' || f.type === 'achievement').length;
    const totalCount = feedbackItems.length;
    return Math.round((praiseCount / totalCount) * 100);
  };

  // Analyze content when it changes
  useEffect(() => {
    if (content.trim().length > 10) {
      setIsAnalyzing(true);
      
      // Simulate analysis delay for better UX
      setTimeout(() => {
        const newFeedback = analyzeFeedback(content);
        setFeedback(newFeedback);
        setOverallScore(calculateScore(newFeedback));
        setIsAnalyzing(false);
      }, 1000);
    } else {
      setFeedback([]);
      setOverallScore(0);
    }
  }, [content]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'success';
    if (score >= 60) return 'primary';
    if (score >= 40) return 'sunshine';
    return 'fun';
  };

  const getScoreMessage = (score: number) => {
    if (score >= 80) return 'Outstanding! 🌟';
    if (score >= 60) return 'Great job! 👍';
    if (score >= 40) return 'Good work! 💪';
    return 'Keep trying! 🚀';
  };

  const getColorClasses = (color: string) => {
    const colorMap = {
      primary: 'from-primary-400 to-primary-600 border-primary-200 bg-primary-50',
      success: 'from-success-400 to-success-600 border-success-200 bg-success-50',
      magic: 'from-magic-400 to-magic-600 border-magic-200 bg-magic-50',
      fun: 'from-fun-400 to-fun-600 border-fun-200 bg-fun-50',
      sky: 'from-sky-400 to-sky-600 border-sky-200 bg-sky-50',
      sunshine: 'from-sunshine-400 to-sunshine-600 border-sunshine-200 bg-sunshine-50'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.primary;
  };

  if (content.trim().length < 10) {
    return (
      <div className="bg-white rounded-kid-lg p-6 shadow-fun border-2 border-neutral-200">
        <div className="text-center">
          <Sparkles className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
          <h3 className="text-kid-lg font-display font-bold text-neutral-600 mb-2">
            Start Writing to Get Feedback! ✨
          </h3>
          <p className="text-kid-base font-body text-neutral-500">
            Once you start writing, I'll give you helpful tips and encouragement!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Overall score */}
      <div className={`
        bg-gradient-to-r ${getColorClasses(getScoreColor(overallScore)).split(' ').slice(0, 2).join(' ')}
        rounded-kid-lg p-6 text-white shadow-bounce
      `}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-kid-xl font-display font-bold mb-1">
              {getScoreMessage(overallScore)}
            </h3>
            <p className="text-kid-base font-body opacity-90">
              Your writing is getting better and better!
            </p>
          </div>
          <div className="text-center">
            <div className="text-kid-3xl font-display font-bold mb-1">
              {isAnalyzing ? '...' : `${overallScore}%`}
            </div>
            <div className="text-kid-sm font-body opacity-80">
              Awesome Score
            </div>
          </div>
        </div>
      </div>

      {/* Feedback items */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-kid-lg font-display font-bold text-neutral-800">
            Your Writing Feedback 📝
          </h3>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-kid-sm font-body text-primary-600 hover:text-primary-700 transition-colors"
          >
            {showDetails ? 'Show Less' : 'Show More'}
          </button>
        </div>

        {isAnalyzing ? (
          <div className="bg-white rounded-kid p-6 shadow-fun border-2 border-neutral-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-kid-base font-body text-neutral-600">
                Reading your amazing writing...
              </span>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {feedback.slice(0, showDetails ? feedback.length : 3).map((item) => (
              <div
                key={item.id}
                className={`
                  bg-white rounded-kid p-4 shadow-fun border-2 
                  ${getColorClasses(item.color).split(' ')[2]}
                  transition-all duration-300 hover:scale-102
                `}
              >
                <div className="flex items-start space-x-3">
                  <div className={`
                    flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center
                    ${getColorClasses(item.color).split(' ')[3]}
                  `}>
                    <div className={`text-${item.color}-600`}>
                      {item.icon}
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="text-kid-base font-display font-bold text-neutral-800 mb-1">
                      {item.title}
                    </h4>
                    <p className="text-kid-sm font-body text-neutral-600 leading-relaxed">
                      {item.message}
                    </p>
                    
                    {item.actionable && item.suggestion && (
                      <button
                        onClick={() => onFeedbackAction?.('apply_suggestion', item.suggestion)}
                        className={`
                          mt-3 bg-gradient-to-r ${getColorClasses(item.color).split(' ').slice(0, 2).join(' ')}
                          text-white text-kid-sm font-display font-bold
                          px-4 py-2 rounded-kid shadow-sm
                          hover:scale-105 active:scale-95 transition-all duration-300
                          flex items-center space-x-2
                        `}
                      >
                        <Lightbulb className="h-4 w-4" />
                        <span>Help Me Fix This!</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {!showDetails && feedback.length > 3 && (
              <button
                onClick={() => setShowDetails(true)}
                className="w-full bg-neutral-100 hover:bg-neutral-200 border-2 border-neutral-200 rounded-kid p-3 text-kid-base font-body text-neutral-600 transition-colors"
              >
                See {feedback.length - 3} more feedback items...
              </button>
            )}
          </div>
        )}
      </div>

      {/* Encouragement section */}
      <div className="bg-gradient-to-r from-fun-100 to-magic-100 rounded-kid p-4 border-2 border-fun-200">
        <div className="flex items-center space-x-3">
          <Heart className="h-6 w-6 text-fun-600 fill-current animate-pulse" />
          <div>
            <h4 className="text-kid-base font-display font-bold text-neutral-800">
              Keep Up the Great Work! 💖
            </h4>
            <p className="text-kid-sm font-body text-neutral-600">
              Every word you write makes you a better writer. You're doing amazing!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

