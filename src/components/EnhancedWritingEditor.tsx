import React, { useState, useEffect, useRef } from 'react';
import { AlertCircle, CheckCircle, Lightbulb, Loader2 } from 'lucide-react';

interface EnhancedWritingEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
}

interface GrammarError {
  start: number;
  end: number;
  message: string;
  type: 'grammar' | 'spelling' | 'style' | 'punctuation';
  suggestions: string[];
  context?: string;
}

export function EnhancedWritingEditor({ 
  content, 
  onChange, 
  placeholder = "Start writing your amazing story here! Let your creativity flow and bring your ideas to life... ✨",
  className = "",
  style = {}
}: EnhancedWritingEditorProps) {
  const [errors, setErrors] = useState<GrammarError[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedError, setSelectedError] = useState<GrammarError | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const checkTimeoutRef = useRef<NodeJS.Timeout>();

  // AI-powered grammar and spelling checker
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

  // Client-side fallback using browser APIs and contextual analysis
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

  // Advanced contextual spelling checker
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

  // Analyze word in context for spelling and usage
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
            return { message: 'Consider "they\'re" for "they are"', suggestions: ['they\'re'] };
          }
          return null;
        }
      },
      {
        words: ['your', 'you\'re'],
        check: () => {
          if (lowerWord === 'your' && (nextWord === 'going' || nextWord === 'coming' || context.includes('you are'))) {
            return { message: 'Consider "you\'re" for "you are"', suggestions: ['you\'re'] };
          }
          if (lowerWord === 'you\'re' && (nextWord === 'house' || nextWord === 'car' || context.includes('belonging'))) {
            return { message: 'Consider "your" for possession', suggestions: ['your'] };
          }
          return null;
        }
      },
      {
        words: ['its', 'it\'s'],
        check: () => {
          if (lowerWord === 'its' && (nextWord === 'going' || context.includes('it is'))) {
            return { message: 'Consider "it\'s" for "it is"', suggestions: ['it\'s'] };
          }
          if (lowerWord === 'it\'s' && (nextWord === 'color' || nextWord === 'size' || context.includes('belonging'))) {
            return { message: 'Consider "its" for possession', suggestions: ['its'] };
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

  // Advanced grammar checking using contextual patterns
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

  // Check subject-verb agreement
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

  // Check tense consistency
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

  // Check common grammar patterns
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

  // Check punctuation
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

  // Get context around a word for better suggestions
  const getWordContext = (text: string, start: number, length: number): string => {
    const contextStart = Math.max(0, start - 20);
    const contextEnd = Math.min(text.length, start + length + 20);
    return text.substring(contextStart, contextEnd);
  };

  // Update errors when content changes (debounced)
  useEffect(() => {
    if (checkTimeoutRef.current) {
      clearTimeout(checkTimeoutRef.current);
    }

    checkTimeoutRef.current = setTimeout(async () => {
      if (content.trim()) {
        const newErrors = await checkTextWithAI(content);
        setErrors(newErrors);
      } else {
        setErrors([]);
      }
    }, 1000); // Debounce for 1 second

    return () => {
      if (checkTimeoutRef.current) {
        clearTimeout(checkTimeoutRef.current);
      }
    };
  }, [content]);

  // Create highlighted text overlay
  const createHighlightedText = () => {
    if (!content) return '';
    
    let highlightedText = content;
    const sortedErrors = [...errors].sort((a, b) => b.start - a.start);
    
    sortedErrors.forEach((error) => {
      const before = highlightedText.substring(0, error.start);
      const errorText = highlightedText.substring(error.start, error.end);
      const after = highlightedText.substring(error.end);
      
      const className = `${error.type}-error`;
      highlightedText = `${before}<span class="${className}" data-error="${encodeURIComponent(JSON.stringify(error))}">${errorText}</span>${after}`;
    });
    
    return highlightedText.replace(/\n/g, '<br>');
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
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
    
    // Find if cursor is on an error
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

  return (
    <div className={`relative ${className}`} style={style}>
      <style jsx>{`
        .writing-editor-container {
          position: relative;
        }
        
        .writing-textarea {
          width: 100%;
          height: 100%;
          padding: 1.5rem;
          border: 2px solid #e5e7eb;
          border-radius: 0.75rem;
          resize: none;
          font-family: Georgia, serif;
          font-size: 1.125rem;
          line-height: 1.75;
          background: transparent;
          z-index: 2;
          position: relative;
        }
        
        .writing-textarea:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        
        .highlight-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          padding: 1.5rem;
          font-family: Georgia, serif;
          font-size: 1.125rem;
          line-height: 1.75;
          color: transparent;
          pointer-events: none;
          z-index: 1;
          white-space: pre-wrap;
          word-wrap: break-word;
          overflow: hidden;
        }
        
        .spelling-error {
          background-color: rgba(239, 68, 68, 0.2);
          border-bottom: 2px wavy #ef4444;
          color: transparent;
        }
        
        .grammar-error {
          background-color: rgba(59, 130, 246, 0.2);
          border-bottom: 2px wavy #3b82f6;
          color: transparent;
        }
        
        .punctuation-error {
          background-color: rgba(249, 115, 22, 0.2);
          border-bottom: 2px wavy #f97316;
          color: transparent;
        }
        
        .style-error {
          background-color: rgba(168, 85, 247, 0.2);
          border-bottom: 2px wavy #a855f7;
          color: transparent;
        }
        
        .suggestions-popup {
          position: absolute;
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 0.5rem;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          z-index: 10;
          max-width: 300px;
          padding: 0.75rem;
        }
        
        .suggestion-item {
          padding: 0.5rem;
          cursor: pointer;
          border-radius: 0.25rem;
          transition: background-color 0.2s;
        }
        
        .suggestion-item:hover {
          background-color: #f3f4f6;
        }
      `}</style>
      
      <div className="writing-editor-container">
        {/* Highlight overlay */}
        <div 
          ref={overlayRef}
          className="highlight-overlay"
          dangerouslySetInnerHTML={{ __html: createHighlightedText() }}
        />
        
        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={content}
          onChange={handleTextChange}
          onClick={handleTextareaClick}
          placeholder={placeholder}
          className="writing-textarea"
          spellCheck={true}
        />
        
        {/* Loading indicator */}
        {isChecking && (
          <div className="absolute top-4 right-4 flex items-center text-blue-600">
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
            <span className="text-sm">AI Checking...</span>
          </div>
        )}
        
        {/* Suggestions popup */}
        {showSuggestions && selectedError && (
          <div className="suggestions-popup" style={{ top: '100px', left: '20px' }}>
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
                <div
                  key={index}
                  className="suggestion-item text-sm"
                  onClick={() => applySuggestion(selectedError, suggestion)}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Error summary */}
      {errors.length > 0 && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center mb-2">
            <Lightbulb className="w-4 h-4 text-blue-600 mr-2" />
            <span className="text-sm font-medium text-blue-800">AI Writing Assistant</span>
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
  );
}
