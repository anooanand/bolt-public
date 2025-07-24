import React, { useState, useEffect, useRef } from 'react';
import { AlertCircle, CheckCircle, Lightbulb, Loader2, Star, Target, Zap } from 'lucide-react';
import { TextHighlighter, useTextHighlights } from './TextHighlighter';

interface EnhancedWritingEditorWithHighlightingProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
  textType?: string;
  onGetFeedback?: (content: string) => Promise<any>;
}

interface GrammarError {
  start: number;
  end: number;
  message: string;
  type: 'grammar' | 'spelling' | 'style' | 'punctuation';
  suggestions: string[];
  context?: string;
}

interface AIFeedback {
  feedbackItems?: Array<{
    type: 'praise' | 'suggestion' | 'improvement';
    text: string;
    exampleFromText?: string;
    suggestionForImprovement?: string;
    area?: string;
  }>;
  corrections?: Array<{
    original: string;
    suggestion: string;
    explanation?: string;
  }>;
  vocabularyEnhancements?: Array<{
    original: string;
    suggestion: string;
  }>;
  overallScore?: number;
  criteriaScores?: {
    ideas: number;
    structure: number;
    language: number;
    accuracy: number;
  };
  strengths?: string[];
  areasForImprovement?: string[];
}

export function EnhancedWritingEditorWithHighlighting({
  content,
  onChange,
  placeholder = "Start writing your amazing story here! Let your creativity flow and bring your ideas to life... ✨",
  className = "",
  style = {},
  textType = "narrative",
  onGetFeedback
}: EnhancedWritingEditorWithHighlightingProps) {
  const [errors, setErrors] = useState<GrammarError[]>([]);
  const [aiFeedback, setAiFeedback] = useState<AIFeedback | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedError, setSelectedError] = useState<GrammarError | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [isGettingAIFeedback, setIsGettingAIFeedback] = useState(false);
  const [showAIHighlights, setShowAIHighlights] = useState(true);
  const [showGrammarHighlights, setShowGrammarHighlights] = useState(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const checkTimeoutRef = useRef<NodeJS.Timeout>();
  const feedbackTimeoutRef = useRef<NodeJS.Timeout>();

  // Generate highlights from AI feedback using the existing hook
  const aiHighlights = useTextHighlights(content, aiFeedback);

  // AI-powered grammar and spelling checker (from latest EnhancedWritingEditor)
  const checkTextWithAI = async (text: string): Promise<GrammarError[]> => {
    if (!text.trim() || text.length < 10) return [];
    
    try {
      setIsChecking(true);
      
      // Try to use OpenAI API for contextual grammar and spelling checking
      const response = await fetch('/netlify/functions/ai-operations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          action: 'check-grammar',
          text: text
        }),
      });

      if (response.ok) {
        const result = await response.json();
        return result.errors || [];
      } else {
        // Fallback to client-side checking if API fails
        return await checkTextClientSide(text);
      }
    } catch (error) {
      console.error('Grammar check API error:', error);
      // Fallback to client-side checking
      return await checkTextClientSide(text);
    } finally {
      setIsChecking(false);
    }
  };

  // Get AI feedback for highlighting
  const getAIFeedbackForHighlighting = async (text: string) => {
    const words = text.trim().split(/\s+/).filter(w => w.length > 0);
    if (words.length < 50) return;
    
    try {
      setIsGettingAIFeedback(true);
      
      if (onGetFeedback) {
        const feedback = await onGetFeedback(text);
        setAiFeedback(feedback);
      } else {
        // Fallback to direct API call
        const response = await fetch('/netlify/functions/ai-operations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            action: 'getNSWSelectiveFeedback',
            content: text,
            textType: textType,
            assistanceLevel: 'detailed',
            feedbackHistory: []
          }),
        });

        if (response.ok) {
          const feedback = await response.json();
          setAiFeedback(feedback);
        }
      }
    } catch (error) {
      console.error('AI feedback error:', error);
    } finally {
      setIsGettingAIFeedback(false);
    }
  };

  // Client-side fallback using browser APIs and contextual analysis (from latest EnhancedWritingEditor)
  const checkTextClientSide = async (text: string): Promise<GrammarError[]> => {
    const errors: GrammarError[] = [];
    
    // Advanced contextual grammar checking
    const grammarErrors = await checkGrammarPatterns(text);
    errors.push(...grammarErrors);

    // Punctuation and style checks
    const punctuationErrors = checkPunctuation(text);
    errors.push(...punctuationErrors);

    // Contextual spelling checks
    const spellingErrors = await checkSpellingInContext(text);
    errors.push(...spellingErrors);

    return errors;
  };

  // Advanced contextual spelling checker (from latest EnhancedWritingEditor)
  const checkSpellingInContext = async (text: string): Promise<GrammarError[]> => {
    const errors: GrammarError[] = [];
    const words = text.match(/\b\w+\b/g) || [];
    
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      const wordStart = text.indexOf(word, i > 0 ? text.indexOf(words[i-1]) + words[i-1].length : 0);
      
      // Get context around the word
      const context = getWordContext(text, wordStart, word.length);
      const prevWord = i > 0 ? words[i-1] : '';
      const nextWord = i < words.length - 1 ? words[i+1] : '';
      
      // Check for contextual spelling issues
      const spellingIssue = await analyzeWordInContext(word, context, prevWord, nextWord);
      if (spellingIssue) {
        errors.push({
          start: wordStart,
          end: wordStart + word.length,
          message: spellingIssue.message,
          type: 'spelling',
          suggestions: spellingIssue.suggestions,
          context: context
        });
      }
    }
    
    return errors;
  };

  // Analyze word in context for spelling and usage (from latest EnhancedWritingEditor)
  const analyzeWordInContext = async (word: string, context: string, prevWord: string, nextWord: string): Promise<{message: string, suggestions: string[]} | null> => {
    const lowerWord = word.toLowerCase();
    
    // Common contextual confusions
    const contextualChecks = [
      {
        words: ['their', 'there', 'they\'re'],
        check: () => {
          if (lowerWord === 'their' && (context.includes('over') || context.includes('location'))) {
            return { message: 'Consider "there" for location', suggestions: ['there'] };
          }
          if (lowerWord === 'there' && (context.includes('belonging') || nextWord === 'house' || nextWord === 'car')) {
            return { message: 'Consider "their" for possession', suggestions: ['their'] };
          }
          if ((lowerWord === 'their' || lowerWord === 'there') && (context.includes('they are') || nextWord === 'going')) {
            return { message: 'Consider "they\'re" for "they are"', suggestions: ["they're"] };
          }
          return null;
        }
      },
      {
        words: ['your', 'you\'re'],
        check: () => {
          if (lowerWord === 'your' && (nextWord === 'going' || nextWord === 'coming' || context.includes('you are'))) {
            return { message: 'Consider "you\'re" for "you are"', suggestions: ["you're"] };
          }
          if (lowerWord === "you're" && (nextWord === 'house' || nextWord === 'car' || context.includes('belonging'))) {
            return { message: 'Consider "your" for possession', suggestions: ["your"] };
          }
          return null;
        }
      },
      {
        words: ['its', 'it\'s'],
        check: () => {
          if (lowerWord === 'its' && (nextWord === 'going' || context.includes('it is'))) {
            return { message: 'Consider "it\'s" for "it is"', suggestions: ["it's"] };
          }
          if (lowerWord === 'it\'s' && (nextWord === 'color' || nextWord === 'size' || context.includes('belonging'))) {
            return { message: 'Consider "its" for possession', suggestions: ["its"] };
          }
          return null;
        }
      }
    ];

    for (const check of contextualChecks) {
      if (check.words.includes(lowerWord)) {
        const result = check.check();
        if (result) return result;
      }
    }

    return null;
  };

  // Advanced grammar checking using contextual patterns (from latest EnhancedWritingEditor)
  const checkGrammarPatterns = async (text: string): Promise<GrammarError[]> => {
    const errors: GrammarError[] = [];
    const sentences = text.split(/[.!?]+/).filter(s => s.trim());
    
    for (const sentence of sentences) {
      const trimmed = sentence.trim();
      if (!trimmed) continue;

      // Subject-verb agreement
      const subjectVerbErrors = checkSubjectVerbAgreement(trimmed, text);
      errors.push(...subjectVerbErrors);

      // Tense consistency
      const tenseErrors = checkTenseConsistency(trimmed, text);
      errors.push(...tenseErrors);

      // Common grammar patterns
      const commonErrors = checkCommonGrammarPatterns(trimmed, text);
      errors.push(...commonErrors);
    }

    return errors;
  };

  // Check subject-verb agreement (from latest EnhancedWritingEditor)
  const checkSubjectVerbAgreement = (sentence: string, fullText: string): GrammarError[] => {
    const errors: GrammarError[] = [];
    
    // Pattern for plural subjects with singular verbs
    const patterns = [
      {
        regex: /\b(\w+s)\s+(is|was)\b/gi,
        check: (match: RegExpMatchArray) => {
          const subject = match[1];
          const verb = match[2].toLowerCase();
          
          // Skip if subject is not actually plural (e.g., "glass is", "class is")
          const nonPluralEndings = ['ss', 'us', 'is', 'as'];
          if (nonPluralEndings.some(ending => subject.toLowerCase().endsWith(ending))) {
            return null;
          }
          
          return {
            message: `Subject-verb disagreement: "${subject}" appears plural, consider "${verb === 'is' ? 'are' : 'were'}"`,
            suggestions: [verb === 'is' ? 'are' : 'were']
          };
        }
      }
    ];

    patterns.forEach(({ regex, check }) => {
      let match;
      while ((match = regex.exec(sentence)) !== null) {
        const result = check(match);
        if (result) {
          const sentenceStart = fullText.indexOf(sentence);
          errors.push({
            start: sentenceStart + match.index!,
            end: sentenceStart + match.index! + match[0].length,
            message: result.message,
            type: 'grammar',
            suggestions: result.suggestions,
            context: getWordContext(fullText, sentenceStart + match.index!, match[0].length)
          });
        }
      }
    });

    return errors;
  };

  // Check tense consistency (from latest EnhancedWritingEditor)
  const checkTenseConsistency = (sentence: string, fullText: string): GrammarError[] => {
    const errors: GrammarError[] = [];
    
    // Simple tense inconsistency check
    const pastTenseVerbs = sentence.match(/\b\w+ed\b/g) || [];
    const presentTenseVerbs = sentence.match(/\b(is|are|am|go|goes|come|comes)\b/g) || [];
    
    if (pastTenseVerbs.length > 0 && presentTenseVerbs.length > 0) {
      // This is a simplified check - in a real implementation, you'd use more sophisticated NLP
      const sentenceStart = fullText.indexOf(sentence);
      errors.push({
        start: sentenceStart,
        end: sentenceStart + sentence.length,
        message: 'Possible tense inconsistency in this sentence',
        type: 'grammar',
        suggestions: ['Check verb tenses for consistency'],
        context: sentence
      });
    }

    return errors;
  };

  // Check common grammar patterns (from latest EnhancedWritingEditor)
  const checkCommonGrammarPatterns = (sentence: string, fullText: string): GrammarError[] => {
    const errors: GrammarError[] = [];
    
    const patterns = [
      {
        regex: /\b(I|he|she|they)\s+seen\b/gi,
        message: 'Use "saw" for simple past or "have seen" for present perfect',
        suggestions: ['saw', 'have seen']
      },
      {
        regex: /\bcould\s+of\b/gi,
        message: 'Use "could have" instead of "could of"',
        suggestions: ['could have']
      },
      {
        regex: /\bshould\s+of\b/gi,
        message: 'Use "should have" instead of "should of"',
        suggestions: ['should have']
      }
    ];

    patterns.forEach(({ regex, message, suggestions }) => {
      let match;
      while ((match = regex.exec(sentence)) !== null) {
        const sentenceStart = fullText.indexOf(sentence);
        errors.push({
          start: sentenceStart + match.index!,
          end: sentenceStart + match.index! + match[0].length,
          message,
          type: 'grammar',
          suggestions,
          context: getWordContext(fullText, sentenceStart + match.index!, match[0].length)
        });
      }
    });

    return errors;
  };

  // Check punctuation (from latest EnhancedWritingEditor)
  const checkPunctuation = (text: string): GrammarError[] => {
    const errors: GrammarError[] = [];
    
    // Check for missing periods at end of sentences
    const sentences = text.split(/[.!?]+/);
    if (sentences.length > 1 && text.trim() && !text.trim().match(/[.!?]$/)) {
      errors.push({
        start: text.length - 1,
        end: text.length,
        message: 'Consider adding punctuation at the end of the sentence',
        type: 'punctuation',
        suggestions: ['.', '!', '?']
      });
    }

    // Check for double spaces
    const doubleSpacePattern = /  +/g;
    let match;
    while ((match = doubleSpacePattern.exec(text)) !== null) {
      errors.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Multiple spaces found',
        type: 'style',
        suggestions: [' ']
      });
    }

    return errors;
  };

  // Get context around a word for better suggestions (from latest EnhancedWritingEditor)
  const getWordContext = (text: string, start: number, length: number): string => {
    const contextStart = Math.max(0, start - 20);
    const contextEnd = Math.min(text.length, start + length + 20);
    return text.substring(contextStart, contextEnd);
  };

  // Update grammar errors when content changes (debounced)
  useEffect(() => {
    if (checkTimeoutRef.current) {
      clearTimeout(checkTimeoutRef.current);
    }

    checkTimeoutRef.current = setTimeout(async () => {
      if (content.trim() && showGrammarHighlights) {
        const newErrors = await checkTextWithAI(content);
        setErrors(newErrors);
      } else {
        setErrors([]);
      }
    }, 1000);

    return () => {
      if (checkTimeoutRef.current) {
        clearTimeout(checkTimeoutRef.current);
      }
    };
  }, [content, showGrammarHighlights]);

  // Update AI feedback when content changes (debounced longer)
  useEffect(() => {
    if (feedbackTimeoutRef.current) {
      clearTimeout(feedbackTimeoutRef.current);
    }

    feedbackTimeoutRef.current = setTimeout(async () => {
      if (content.trim() && showAIHighlights) {
        await getAIFeedbackForHighlighting(content);
      } else {
        setAiFeedback(null);
      }
    }, 3000); // Longer debounce for AI feedback

    return () => {
      if (feedbackTimeoutRef.current) {
        clearTimeout(feedbackTimeoutRef.current);
      }
    };
  }, [content, showAIHighlights, textType]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const handleHighlightClick = (highlight: any) => {
    console.log('AI Highlight clicked:', highlight);
  };

  const applySuggestion = (error: GrammarError, suggestion: string) => {
    const before = content.substring(0, error.start);
    const after = content.substring(error.end);
    const newContent = before + suggestion + after;
    onChange(newContent);
    setSelectedError(null);
    setShowSuggestions(false);
  };

  const handleTextareaClick = (e: React.MouseEvent<HTMLTextAreaElement>) => {
    const textarea = e.currentTarget;
    const cursorPosition = textarea.selectionStart;
    
    // Find if cursor is on a grammar error
    const errorAtCursor = errors.find(error => 
      cursorPosition >= error.start && cursorPosition <= error.end
    );
    
    if (errorAtCursor) {
      setSelectedError(errorAtCursor);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
      setSelectedError(null);
    }
  };

  const getErrorTypeIcon = (type: string) => {
    switch (type) {
      case 'spelling':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'grammar':
        return <CheckCircle className="w-4 h-4 text-blue-500" />;
      case 'punctuation':
        return <AlertCircle className="w-4 h-4 text-orange-500" />;
      case 'style':
        return <Lightbulb className="w-4 h-4 text-purple-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getErrorTypeColor = (type: string) => {
    switch (type) {
      case 'spelling':
        return 'text-red-700';
      case 'grammar':
        return 'text-blue-700';
      case 'punctuation':
        return 'text-orange-700';
      case 'style':
        return 'text-purple-700';
      default:
        return 'text-gray-700';
    }
  };

  // Convert grammar errors to highlights format for overlay
  const grammarHighlights = errors.map(error => ({
    start: error.start,
    end: error.end,
    type: 'improvement' as const,
    feedback: error.message,
    suggestion: error.suggestions[0],
    category: 'Grammar & Spelling'
  }));

  // Combine AI highlights and grammar highlights
  const allHighlights = showAIHighlights && showGrammarHighlights 
    ? [...aiHighlights, ...grammarHighlights]
    : showAIHighlights 
    ? aiHighlights 
    : showGrammarHighlights 
    ? grammarHighlights 
    : [];

  return (
    <div className={`relative ${className}`} style={style}>
      {/* Control Panel */}
      <div className="mb-4 p-3 bg-gray-50 border border-gray-200 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-700">AI Writing Assistant</h3>
          <div className="flex items-center space-x-4">
            {(isChecking || isGettingAIFeedback) && (
              <div className="flex items-center text-blue-600">
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                <span className="text-sm">
                  {isGettingAIFeedback ? 'Getting AI feedback...' : 'Checking grammar...'}
                </span>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={showAIHighlights}
              onChange={(e) => setShowAIHighlights(e.target.checked)}
              className="mr-2"
            />
            <Star className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-sm text-gray-600">AI Feedback Highlights</span>
          </label>
          
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={showGrammarHighlights}
              onChange={(e) => setShowGrammarHighlights(e.target.checked)}
              className="mr-2"
            />
            <Target className="w-4 h-4 text-blue-500 mr-1" />
            <span className="text-sm text-gray-600">Grammar & Spelling</span>
          </label>
        </div>
      </div>

      {/* Writing Area with Highlighting */}
      <div className="relative">
        {content && allHighlights.length > 0 ? (
          <div className="relative">
            <TextHighlighter
              text={content}
              highlights={allHighlights}
              onHighlightClick={handleHighlightClick}
              className="min-h-[400px] p-6 border-2 border-gray-200 rounded-lg bg-white font-serif text-lg leading-relaxed"
            />
            {/* Invisible textarea for input */}
            <textarea
              ref={textareaRef}
              value={content}
              onChange={handleTextChange}
              onClick={handleTextareaClick}
              placeholder={placeholder}
              className="absolute inset-0 w-full h-full p-6 bg-transparent border-none outline-none resize-none font-serif text-lg leading-relaxed text-transparent caret-black"
              style={{ caretColor: 'black' }}
              spellCheck={true}
            />
          </div>
        ) : (
          <textarea
            ref={textareaRef}
            value={content}
            onChange={handleTextChange}
            onClick={handleTextareaClick}
            placeholder={placeholder}
            className="w-full min-h-[400px] p-6 border-2 border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white font-serif text-lg leading-relaxed"
            spellCheck={true}
          />
        )}
        
        {/* Grammar suggestions popup */}
        {showSuggestions && selectedError && (
          <div className="absolute z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-w-sm" 
               style={{ top: '100px', left: '20px' }}>
            <div className="flex items-center mb-2">
              {getErrorTypeIcon(selectedError.type)}
              <span className={`text-sm font-medium ml-2 ${getErrorTypeColor(selectedError.type)}`}>
                {selectedError.type.charAt(0).toUpperCase() + selectedError.type.slice(1)} Issue
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-3">{selectedError.message}</p>
            {selectedError.context && (
              <p className="text-xs text-gray-500 mb-3 italic">
                Context: "{selectedError.context}"
              </p>
            )}
            <div className="space-y-1">
              {selectedError.suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded"
                  onClick={() => applySuggestion(selectedError, suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Feedback Summary */}
      {(aiFeedback || errors.length > 0) && (
        <div className="mt-4 space-y-3">
          {/* AI Feedback Summary */}
          {aiFeedback && showAIHighlights && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center mb-2">
                <Zap className="w-5 h-5 text-green-600 mr-2" />
                <span className="text-sm font-medium text-green-800">NSW Selective AI Feedback</span>
                {aiFeedback.overallScore && (
                  <span className="ml-auto text-sm font-bold text-green-700">
                    Score: {aiFeedback.overallScore}/100
                  </span>
                )}
              </div>
              
              {aiFeedback.criteriaScores && (
                <div className="grid grid-cols-4 gap-2 mb-3">
                  <div className="text-center">
                    <div className="text-xs text-gray-600">Ideas</div>
                    <div className="font-medium text-green-700">{aiFeedback.criteriaScores.ideas}/25</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-600">Structure</div>
                    <div className="font-medium text-green-700">{aiFeedback.criteriaScores.structure}/25</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-600">Language</div>
                    <div className="font-medium text-green-700">{aiFeedback.criteriaScores.language}/25</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-600">Accuracy</div>
                    <div className="font-medium text-green-700">{aiFeedback.criteriaScores.accuracy}/25</div>
                  </div>
                </div>
              )}
              
              <p className="text-sm text-green-700">
                Found {aiHighlights.filter(h => h.type === 'strength').length} strengths, {' '}
                {aiHighlights.filter(h => h.type === 'improvement').length} improvements, and {' '}
                {aiHighlights.filter(h => h.type === 'suggestion').length} suggestions. 
                Click on highlighted text to see detailed feedback.
              </p>
            </div>
          )}

          {/* Grammar Summary */}
          {errors.length > 0 && showGrammarHighlights && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center mb-2">
                <Lightbulb className="w-4 h-4 text-blue-600 mr-2" />
                <span className="text-sm font-medium text-blue-800">Grammar & Spelling Assistant</span>
              </div>
              <p className="text-sm text-blue-700">
                Found {errors.filter(e => e.type === 'spelling').length} spelling, {' '}
                {errors.filter(e => e.type === 'grammar').length} grammar, {' '}
                {errors.filter(e => e.type === 'punctuation').length} punctuation, and {' '}
                {errors.filter(e => e.type === 'style').length} style suggestions. 
                Click on highlighted text to see contextual AI suggestions.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
