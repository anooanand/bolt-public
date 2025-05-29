import React, { useState, useEffect, useCallback, useRef } from 'react';
import { generatePrompt, getSynonyms, rephraseSentence, evaluateEssay } from '../lib/openai';
import { AlertCircle, Send, Maximize2, Minimize2, Volume2, Moon, Sun, BarChart2 } from 'lucide-react';
import { InlineSuggestionPopup } from './InlineSuggestionPopup';
import { AutoSave } from './AutoSave';
import './responsive.css';

interface WritingAreaProps {
  content: string;
  onChange: (content: string) => void;
  textType: string;
  onTimerStart: (shouldStart: boolean) => void;
  onSubmit: () => void;
}

interface WritingIssue {
  start: number;
  end: number;
  type: 'spelling' | 'grammar' | 'vocabulary' | 'structure' | 'style';
  message: string;
  suggestion: string;
}

export function WritingArea({ content, onChange, textType, onTimerStart, onSubmit }: WritingAreaProps) {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showCustomPrompt, setShowCustomPrompt] = useState(false);
  const [customPrompt, setCustomPrompt] = useState('');
  const [issues, setIssues] = useState<WritingIssue[]>([]);
  const [selectedIssue, setSelectedIssue] = useState<WritingIssue | null>(null);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showPromptButtons, setShowPromptButtons] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [wordCountGoal, setWordCountGoal] = useState(250);
  const [isPomodoro, setIsPomodoro] = useState(false);
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60); // 25 minutes in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [readingLevel, setReadingLevel] = useState('');
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const pomodoroIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (prompt) {
      onTimerStart(true);
      setShowPromptButtons(false);
    }
  }, [prompt, onTimerStart]);

  // Handle fullscreen mode
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    
    // Focus the textarea after toggling fullscreen
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }, 100);
  };

  // Handle dark mode toggle
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Handle font size changes
  const changeFontSize = (delta: number) => {
    setFontSize(prevSize => {
      const newSize = prevSize + delta;
      return Math.min(Math.max(newSize, 12), 24); // Limit between 12px and 24px
    });
  };

  // Handle Pomodoro timer
  useEffect(() => {
    if (isPomodoro && isTimerRunning) {
      pomodoroIntervalRef.current = setInterval(() => {
        setPomodoroTime(prevTime => {
          if (prevTime <= 1) {
            // Timer finished
            setIsTimerRunning(false);
            clearInterval(pomodoroIntervalRef.current as NodeJS.Timeout);
            
            // Play sound or show notification
            const audio = new Audio('/timer-complete.mp3');
            audio.play().catch(e => console.log('Audio play failed:', e));
            
            // Show notification if browser supports it
            if ('Notification' in window && Notification.permission === 'granted') {
              new Notification('Writing Time Complete!', {
                body: 'Great job! Take a short break before continuing.',
                icon: '/logo.png'
              });
            }
            
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (pomodoroIntervalRef.current) {
      clearInterval(pomodoroIntervalRef.current);
    }
    
    return () => {
      if (pomodoroIntervalRef.current) {
        clearInterval(pomodoroIntervalRef.current);
      }
    };
  }, [isPomodoro, isTimerRunning]);

  // Start/pause Pomodoro timer
  const togglePomodoro = () => {
    if (!isPomodoro) {
      setIsPomodoro(true);
      setIsTimerRunning(true);
      setPomodoroTime(25 * 60); // Reset to 25 minutes
    } else {
      setIsTimerRunning(!isTimerRunning);
    }
  };

  // Reset Pomodoro timer
  const resetPomodoro = () => {
    setPomodoroTime(25 * 60);
    setIsTimerRunning(false);
  };

  // Format time for display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Calculate reading level based on content
  useEffect(() => {
    if (content.trim().length > 50) {
      // Simple algorithm to estimate reading level
      const words = content.split(/\s+/).filter(Boolean);
      const sentences = content.split(/[.!?]+/).filter(Boolean);
      const avgWordsPerSentence = words.length / sentences.length;
      const longWords = words.filter(word => word.length > 6).length;
      const longWordPercentage = (longWords / words.length) * 100;
      
      let level = '';
      if (avgWordsPerSentence < 8 && longWordPercentage < 10) {
        level = 'Year 3-4';
      } else if (avgWordsPerSentence < 12 && longWordPercentage < 15) {
        level = 'Year 5-6';
      } else if (avgWordsPerSentence < 15 && longWordPercentage < 20) {
        level = 'Year 7-8';
      } else {
        level = 'Year 9+';
      }
      
      setReadingLevel(level);
    } else {
      setReadingLevel('');
    }
  }, [content]);

  // Calculate word count progress
  const wordCount = content.split(/\s+/).filter(Boolean).length;
  const wordCountProgress = Math.min((wordCount / wordCountGoal) * 100, 100);

  const analyzeText = React.useCallback((text: string) => {
    const newIssues: WritingIssue[] = [];
    
    // Common spelling mistakes (only incorrect spellings)
    const spellingPatterns = {
      'softley': 'softly',
      'recieve': 'receive',
      'seperate': 'separate',
      'occured': 'occurred',
      'accomodate': 'accommodate',
      'alot': 'a lot',
      'cant': "can't",
      'dont': "don't",
      'wont': "won't",
      'im': "I'm",
      'ive': "I've",
      'id': "I'd",
      'youre': "you're",
      'theyre': "they're"
    };

    // Grammar patterns (only incorrect grammar)
    const grammarPatterns = {
      'i am': 'I am',
      'i have': 'I have',
      'i will': 'I will',
      'i was': 'I was'
    };

    // Vocabulary improvements with multiple suggestions
    const vocabularyPatterns = {
      'good': 'excellent, outstanding, remarkable',
      'bad': 'poor, inadequate, unsatisfactory',
      'said': 'exclaimed, declared, announced',
      'nice': 'pleasant, delightful, charming',
      'big': 'enormous, massive, substantial',
      'small': 'tiny, minute, compact',
      'happy': 'joyful, delighted, cheerful',
      'sad': 'unhappy, gloomy, melancholy',
      'walk': 'stroll, amble, wander',
      'run': 'dash, sprint, race',
      'look': 'gaze, stare, observe',
      'went': 'traveled, journeyed, ventured',
      'saw': 'noticed, observed, spotted',
      'got': 'received, obtained, acquired',
      'make': 'create, produce, construct',
      'think': 'believe, consider, ponder',
      'started': 'began, commenced, initiated'
    };

    // Check spelling
    Object.entries(spellingPatterns).forEach(([incorrect, correct]) => {
      const regex = new RegExp(`\\b${incorrect}\\b`, 'gi');
      let match;
      while ((match = regex.exec(text)) !== null) {
        newIssues.push({
          start: match.index,
          end: match.index + incorrect.length,
          type: 'spelling',
          message: `This word is misspelled. The correct spelling is "${correct}".`,
          suggestion: correct
        });
      }
    });

    // Check grammar
    Object.entries(grammarPatterns).forEach(([incorrect, correct]) => {
      const regex = new RegExp(`\\b${incorrect}\\b`, 'gi');
      let match;
      while ((match = regex.exec(text)) !== null) {
        newIssues.push({
          start: match.index,
          end: match.index + incorrect.length,
          type: 'grammar',
          message: `This needs proper capitalization.`,
          suggestion: correct
        });
      }
    });

    // Check vocabulary
    Object.entries(vocabularyPatterns).forEach(([basic, improvements]) => {
      const regex = new RegExp(`\\b${basic}\\b`, 'gi');
      let match;
      while ((match = regex.exec(text)) !== null) {
        newIssues.push({
          start: match.index,
          end: match.index + basic.length,
          type: 'vocabulary',
          message: `Consider using a more descriptive word to make your writing more engaging.`,
          suggestion: improvements
        });
      }
    });

    // Check for repeated words
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    const wordCounts: { [key: string]: number } = {};
    words.forEach((word, index) => {
      if (word.length > 3) { // Only check words longer than 3 letters
        if (wordCounts[word]) {
          if (index - wordCounts[word] < 30) { // Check if words are close together
            const start = text.toLowerCase().indexOf(word, index);
            const suggestions = vocabularyPatterns[word as keyof typeof vocabularyPatterns];
            if (suggestions) {
              newIssues.push({
                start,
                end: start + word.length,
                type: 'style',
                message: `This word appears multiple times nearby. Try using a different word for variety.`,
                suggestion: suggestions
              });
            }
          }
        }
        wordCounts[word] = index;
      }
    });

    setIssues(newIssues);
  }, []);

  useEffect(() => {
    if (content.trim()) {
      analyzeText(content);
    }
  }, [content, analyzeText]);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    onChange(newContent);
  };

  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    if (overlayRef.current) {
      overlayRef.current.scrollTop = e.currentTarget.scrollTop;
    }
  };

  const handleIssueClick = (issue: WritingIssue, event: React.MouseEvent) => {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const containerRect = containerRef.current?.getBoundingClientRect();
    
    if (containerRect) {
      let x = rect.left - containerRect.left;
      let y = rect.top - containerRect.top + rect.height;

      const maxX = containerRect.width - 300; // 300px is max-width of popup
      if (x > maxX) x = maxX;
      if (x < 0) x = 0;

      // Ensure popup doesn't go below the container
      const maxY = containerRect.height - 200; // Approximate popup height
      if (y > maxY) y = rect.top - containerRect.top - 220; // Show above the word

      setPopupPosition({ x, y });
      setSelectedIssue(issue);
      setSuggestions([]);
    }
  };

  const handleApplySuggestion = (suggestion: string, start: number, end: number) => {
    const newContent = content.slice(0, start) + suggestion + content.slice(end);
    onChange(newContent);
    setSelectedIssue(null);
    setSuggestions([]);
  };

  const handleParaphrase = async () => {
    if (selectedIssue) {
      setIsLoadingSuggestions(true);
      try {
        const text = content.slice(selectedIssue.start, selectedIssue.end);
        const alternatives = await rephraseSentence(text);
        setSuggestions(alternatives);
      } catch (error) {
        console.error('Error getting alternatives:', error);
      } finally {
        setIsLoadingSuggestions(false);
      }
    }
  };

  const handleThesaurus = async () => {
    if (selectedIssue) {
      setIsLoadingSuggestions(true);
      try {
        const word = content.slice(selectedIssue.start, selectedIssue.end).toLowerCase();
        const synonyms = await getSynonyms(word);
        setSuggestions(synonyms);
      } catch (error) {
        console.error('Error getting synonyms:', error);
      } finally {
        setIsLoadingSuggestions(false);
      }
    }
  };

  const getHighlightStyle = (type: WritingIssue['type']) => {
    switch (type) {
      case 'spelling':
        return 'bg-red-100 border-b-2 border-red-400';
      case 'grammar':
        return 'bg-yellow-100 border-b-2 border-yellow-400';
      case 'vocabulary':
        return 'bg-green-100 border-b-2 border-green-400';
      case 'structure':
        return 'bg-purple-100 border-b-2 border-purple-400';
      case 'style':
        return 'bg-orange-100 border-b-2 border-orange-400';
      default:
        return '';
    }
  };

  const handleGeneratePrompt = async () => {
    setIsGenerating(true);
    const newPrompt = await generatePrompt(textType);
    if (newPrompt) {
      setPrompt(newPrompt);
      setShowCustomPrompt(false);
    }
    setIsGenerating(false);
  };

  const handleCustomPromptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customPrompt.trim()) {
      setPrompt(customPrompt);
      setShowCustomPrompt(false);
    }
  };

  const handleSubmitEssay = () => {
    onSubmit();
  };

  // Speech recognition for voice-to-text
  const startVoiceInput = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = true;
      recognition.interimResults = true;
      
      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');
        
        // Append to existing content
        const newContent = content + ' ' + transcript;
        onChange(newContent);
      };
      
      recognition.start();
      
      // Stop after 30 seconds or when user clicks stop
      setTimeout(() => {
        recognition.stop();
      }, 30000);
    } else {
      alert('Voice input is not supported in your browser. Try using Chrome or Edge.');
    }
  };

  const noTypeSelected = !textType;

  return (
    <div 
      ref={containerRef} 
      className={`${isFullscreen ? 'fixed inset-0 z-50' : 'h-full'} flex flex-col bg-white rounded-lg shadow-sm writing-area-container transition-all duration-300 ${isDarkMode ? 'dark-mode' : ''}`}
      style={{
        backgroundColor: isDarkMode ? '#1a1a1a' : 'white',
        color: isDarkMode ? '#e0e0e0' : 'inherit'
      }}
    >
      {/* Writing Area Header */}
      <div className={`p-4 border-b space-y-4 content-spacing ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex flex-wrap justify-between items-center gap-2">
          <h2 className={`text-lg font-medium capitalize ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
            {textType ? `${textType} Writing` : 'Select Writing Type'}
          </h2>
          
          {/* Controls */}
          <div className="flex items-center space-x-2">
            {/* Font Size Controls */}
            <div className="flex items-center mr-2">
              <button 
                onClick={() => changeFontSize(-1)}
                className={`p-1 rounded-md ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}
                title="Decrease font size"
              >
                A-
              </button>
              <span className={`mx-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{fontSize}px</span>
              <button 
                onClick={() => changeFontSize(1)}
                className={`p-1 rounded-md ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}
                title="Increase font size"
              >
                A+
              </button>
            </div>
            
            {/* Voice Input */}
            <button
              onClick={startVoiceInput}
              className={`p-2 rounded-md ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}
              title="Voice input"
            >
              <Volume2 size={18} />
            </button>
            
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-md ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}
              title={isDarkMode ? "Light mode" : "Dark mode"}
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            
            {/* Fullscreen Toggle */}
            <button
              onClick={toggleFullscreen}
              className={`p-2 rounded-md ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}
              title={isFullscreen ? "Exit fullscreen" : "Fullscreen mode"}
            >
              {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
            </button>
          </div>
        </div>

        {noTypeSelected ? (
          <div className="flex items-center text-amber-600 text-sm">
            <AlertCircle className="w-4 h-4 mr-2" />
            Please select a writing type first
          </div>
        ) : showPromptButtons && (
          <div className="flex flex-wrap space-x-2 gap-2">
            <button
              onClick={() => setShowCustomPrompt(true)}
              disabled={noTypeSelected}
              className={`px-4 py-2 border rounded-md text-sm font-medium touch-friendly-button ${
                isDarkMode 
                  ? 'bg-blue-800 text-white border-blue-700 hover:bg-blue-700 disabled:opacity-50' 
                  : 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700 disabled:opacity-50'
              } disabled:cursor-not-allowed`}
            >
              I have my own prompt
            </button>
            <button
              onClick={handleGeneratePrompt}
              disabled={isGenerating || noTypeSelected}
              className={`px-4 py-2 rounded-md text-sm font-medium touch-friendly-button ${
                isDarkMode 
                  ? 'bg-purple-800 text-white hover:bg-purple-700 disabled:opacity-50' 
                  : 'bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50'
              } disabled:cursor-not-allowed`}
            >
              Generate New Prompt
            </button>
          </div>
        )}

        {showCustomPrompt && !noTypeSelected && (
          <form onSubmit={handleCustomPromptSubmit} className="space-y-2">
            <textarea
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="Enter your own writing prompt..."
              className={`w-full p-2 rounded-md text-sm ${
                isDarkMode 
                  ? 'bg-gray-800 text-gray-200 border-gray-700' 
                  : 'bg-white text-gray-900 border border-gray-300'
              }`}
              rows={3}
            />
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setShowCustomPrompt(false)}
                className={`px-3 py-1.5 text-sm ${
                  isDarkMode ? 'text-gray-300 hover:text-gray-100' : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!customPrompt.trim()}
                className={`px-3 py-1.5 rounded-md text-sm font-medium touch-friendly-button ${
                  isDarkMode 
                    ? 'bg-blue-800 text-white hover:bg-blue-700 disabled:opacity-50' 
                    : 'bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50'
                } disabled:cursor-not-allowed`}
              >
                Set Prompt
              </button>
            </div>
          </form>
        )}

        {prompt && !showCustomPrompt && !noTypeSelected && (
          <div className={`p-4 rounded-md ${isDarkMode ? 'bg-blue-900' : 'bg-blue-50'}`}>
            <h3 className={`font-medium mb-2 ${isDarkMode ? 'text-blue-200' : 'text-blue-900'}`}>Writing Prompt:</h3>
            <p className={isDarkMode ? 'text-blue-100' : 'text-blue-800'}>{prompt}</p>
          </div>
        )}
        
        {/* Pomodoro Timer */}
        {prompt && !noTypeSelected && (
          <div className={`flex items-center justify-between mt-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <div className="flex items-center">
              <button
                onClick={togglePomodoro}
                className={`px-3 py-1 rounded-md text-sm mr-2 ${
                  isDarkMode 
                    ? 'bg-gray-700 hover:bg-gray-600' 
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {isPomodoro ? (isTimerRunning ? 'Pause' : 'Resume') : 'Focus Timer'}
              </button>
              
              {isPomodoro && (
                <>
                  <span className={`text-lg font-mono ${pomodoroTime < 60 ? 'text-red-500' : ''}`}>
                    {formatTime(pomodoroTime)}
                  </span>
                  <button
                    onClick={resetPomodoro}
                    className={`ml-2 p-1 rounded-md text-xs ${
                      isDarkMode 
                        ? 'bg-gray-700 hover:bg-gray-600' 
                        : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                  >
                    Reset
                  </button>
                </>
              )}
            </div>
            
            {/* Reading Level Indicator */}
            {readingLevel && (
              <div className="flex items-center">
                <BarChart2 size={16} className="mr-1" />
                <span className="text-sm">Reading Level: {readingLevel}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Main Writing Area */}
      <div className="relative flex-1 overflow-hidden writing-area-enhanced">
        <textarea
          ref={textareaRef}
          value={content}
          onChange={handleContentChange}
          onScroll={handleScroll}
          disabled={noTypeSelected || !prompt}
          className={`absolute inset-0 w-full h-full p-4 resize-none focus:outline-none overflow-y-auto writing-textarea ${
            isDarkMode 
              ? 'disabled:bg-gray-800 disabled:text-gray-500' 
              : 'disabled:bg-gray-50 disabled:text-gray-400'
          } disabled:cursor-not-allowed`}
          placeholder={noTypeSelected 
            ? "Select a writing type to begin..." 
            : !prompt 
              ? "Choose or enter a prompt to start writing..." 
              : "Begin writing here..."}
          style={{ 
            caretColor: isDarkMode ? 'white' : 'black',
            color: 'transparent',
            background: 'transparent',
            fontSize: `${fontSize}px`,
            lineHeight: '1.6'
          }}
        />
        <div 
          ref={overlayRef}
          className="absolute inset-0 pointer-events-none p-4 overflow-y-hidden"
          style={{ 
            whiteSpace: 'pre-wrap', 
            wordWrap: 'break-word', 
            fontSize: `${fontSize}px`, 
            lineHeight: '1.6',
            color: isDarkMode ? '#e0e0e0' : '#333'
          }}
        >
          {content.split('').map((char, index) => {
            const issue = issues.find(i => index >= i.start && index < i.end);
            return (
              <span
                key={index}
                className={issue ? `${getHighlightStyle(issue.type)} relative group cursor-pointer` : ''}
                onClick={issue ? (e) => handleIssueClick(issue, e) : undefined}
                style={{ pointerEvents: issue ? 'auto' : 'none' }}
              >
                {char}
              </span>
            );
          })}
        </div>

        {selectedIssue && (
          <InlineSuggestionPopup
            original={content.slice(selectedIssue.start, selectedIssue.end)}
            suggestion={suggestions.length > 0 ? suggestions.join(', ') : selectedIssue.suggestion}
            explanation={selectedIssue.message}
            position={popupPosition}
            onApply={handleApplySuggestion}
            onParaphrase={handleParaphrase}
            onThesaurus={handleThesaurus}
            onClose={() => {
              setSelectedIssue(null);
              setSuggestions([]);
            }}
            start={selectedIssue.start}
            end={selectedIssue.end}
            isLoading={isLoadingSuggestions}
            isDarkMode={isDarkMode}
          />
        )}
      </div>

      {/* Writing Area Footer */}
      <div className={`p-4 border-t ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'} content-spacing`}>
        <div className="space-y-4">
          {/* Word Count Progress Bar */}
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                Word count: {wordCount} / {wordCountGoal}
              </div>
              <div className="flex items-center">
                <button 
                  onClick={() => setWordCountGoal(Math.max(wordCountGoal - 50, 50))}
                  className={`text-xs p-1 rounded ${isDarkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-200'}`}
                >
                  -
                </button>
                <span className={`text-xs mx-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Goal</span>
                <button 
                  onClick={() => setWordCountGoal(wordCountGoal + 50)}
                  className={`text-xs p-1 rounded ${isDarkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-200'}`}
                >
                  +
                </button>
              </div>
              <AutoSave 
                content={content} 
                textType={textType}
              />
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div 
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${wordCountProgress}%` }}
              ></div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex flex-wrap gap-2 text-xs">
              <div className="flex items-center">
                <span className="w-3 h-3 bg-red-100 border-b-2 border-red-400 mr-1"></span>
                <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Spelling</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 bg-yellow-100 border-b-2 border-yellow-400 mr-1"></span>
                <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Grammar</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 bg-green-100 border-b-2 border-green-400 mr-1"></span>
                <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Vocabulary</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 bg-purple-100 border-b-2 border-purple-400 mr-1"></span>
                <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Structure</span>
              </div>
            </div>
            
            {/* Submit Button */}
            {content.trim().length > 50 && (
              <button
                onClick={handleSubmitEssay}
                className={`flex items-center px-4 py-2 rounded-md text-white text-sm font-medium ${
                  isDarkMode ? 'bg-green-700 hover:bg-green-600' : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                <Send size={16} className="mr-2" />
                Submit Essay
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
