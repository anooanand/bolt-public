import React, { useState, useEffect, useRef, useCallback } from 'react';
import { generatePrompt, getSynonyms, rephraseSentence, evaluateEssay, getWritingFeedback, identifyCommonMistakes, getTextTypeVocabulary, getSpecializedTextTypeFeedback, getWritingStructure } from '../lib/openai';
import { dbOperations } from '../lib/database';
import { useApp } from '../contexts/AppContext';
import { AlertCircle, ChevronLeft, ChevronRight, Lightbulb, MessageSquare, BookOpen, PenTool, Layout } from 'lucide-react';
import { InlineSuggestionPopup } from './InlineSuggestionPopup';
import { WritingStatusBar } from './WritingStatusBar';
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
  const { state, addWriting } = useApp();
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showCustomPrompt, setShowCustomPrompt] = useState(false);
  const [customPrompt, setCustomPrompt] = useState('');
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [issues, setIssues] = useState<WritingIssue[]>([]);
  const [selectedIssue, setSelectedIssue] = useState<WritingIssue | null>(null);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showPromptButtons, setShowPromptButtons] = useState(true);
  const [writingFeedback, setWritingFeedback] = useState<any>(null);
  const [commonMistakes, setCommonMistakes] = useState<any>(null);
  const [vocabularySuggestions, setVocabularySuggestions] = useState<any>(null);
  const [specializedFeedback, setSpecializedFeedback] = useState<any>(null);
  const [writingStructure, setWritingStructure] = useState<any>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // New state for sidebar visibility
  const [activeTool, setActiveTool] = useState<string | null>(null); // State for active tool
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentContent = content || ''; // Ensure content is always a string

  useEffect(() => {
    if (prompt) {
      onTimerStart(true);
      setShowPromptButtons(false);
    }
  }, [prompt, onTimerStart]);

  // Load saved prompt from localStorage
  useEffect(() => {
    if (textType) {
      const savedPrompt = localStorage.getItem(`${textType}_prompt`);
      if (savedPrompt) {
        setPrompt(savedPrompt);
        setShowPromptButtons(false);
      }
    }
  }, [textType]);

  const analyzeText = useCallback((text: string) => {
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
    const words = text.toLowerCase().match(/\\b\\w+\\b/g) || [];
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

  // Auto-save functionality
  useEffect(() => {
    if (currentContent.trim() && textType && state.user) {
      const saveTimer = setTimeout(async () => {
        setIsSaving(true);
        try {
          const wordCount = currentContent.split(' ').filter(word => word.trim()).length;
          const title = currentContent.split('\n')[0].substring(0, 50) || `${textType} Writing`;
          
          const { data, error } = await dbOperations.writings.createWriting({
            title,
            content: currentContent,
            text_type: textType,
            word_count: wordCount
          });
          
          if (data && !error) {
            addWriting(data);
            setLastSaved(new Date());
          }
        } catch (error) {
          console.error('Auto-save failed:', error);
        } finally {
          setIsSaving(false);
        }
      }, 30000); // Auto-save every 30 seconds

      return () => clearTimeout(saveTimer);
    }
  }, [currentContent, textType, state.user, addWriting]);

  useEffect(() => {
    if (currentContent && currentContent.trim()) {
      analyzeText(currentContent);
    }
  }, [currentContent, analyzeText]);

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
    const newContent = currentContent.slice(0, start) + suggestion + currentContent.slice(end);
    onChange(newContent);
    setSelectedIssue(null);
    setSuggestions([]);
  };

  const handleParaphrase = async () => {
    if (selectedIssue) {
      setIsLoadingSuggestions(true);
      try {
        const text = currentContent.slice(selectedIssue.start, selectedIssue.end);
        const alternatives = await rephraseSentence(text);
        setSuggestions(alternatives.split(',').map(s => s.trim()));
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
        const word = currentContent.slice(selectedIssue.start, selectedIssue.end).toLowerCase();
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
      // Save prompt to localStorage
      if (textType) {
        localStorage.setItem(`${textType}_prompt`, newPrompt);
      }
      setShowCustomPrompt(false);
    }
    setIsGenerating(false);
  };

  const handleCustomPromptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customPrompt.trim()) {
      setPrompt(customPrompt);
      // Save prompt to localStorage
      if (textType) {
        localStorage.setItem(`${textType}_prompt`, customPrompt);
      }
      setShowCustomPrompt(false);
    }
  };

  const handleRestoreContent = (restoredContent: string, restoredTextType: string) => {
    onChange(restoredContent);
    if (restoredTextType) {
      // You would need to lift this state up or use a context
      // For now, we'll just log it
      console.log('Restored text type:', restoredTextType);
    }
  };

  const handleGetWritingFeedback = async () => {
    if (!currentContent.trim() || !textType) return;
    setIsLoadingSuggestions(true);
    try {
      const feedback = await getWritingFeedback(currentContent, textType, 'Year 5-6', []); // Assuming Year 5-6 and no feedback history for simplicity
      setWritingFeedback(feedback);
      setActiveTool('feedback');
    } catch (error) {
      console.error('Error getting writing feedback:', error);
    } finally {
      setIsLoadingSuggestions(false);
    }
  };

  const handleIdentifyCommonMistakes = async () => {
    if (!currentContent.trim() || !textType) return;
    setIsLoadingSuggestions(true);
    try {
      const mistakes = await identifyCommonMistakes(currentContent, textType);
      setCommonMistakes(mistakes);
      setActiveTool('mistakes');
    } catch (error) {
      console.error('Error identifying common mistakes:', error);
    } finally {
      setIsLoadingSuggestions(false);
    }
  };

  const handleGetTextTypeVocabulary = async () => {
    if (!textType) return;
    setIsLoadingSuggestions(true);
    try {
      const vocabulary = await getTextTypeVocabulary(textType, currentContent.substring(0, 500));
      setVocabularySuggestions(vocabulary);
      setActiveTool('vocabulary');
    } catch (error) {
      console.error('Error getting text type vocabulary:', error);
    } finally {
      setIsLoadingSuggestions(false);
    }
  };

  const handleGetSpecializedTextTypeFeedback = async () => {
    if (!currentContent.trim() || !textType) return;
    setIsLoadingSuggestions(true);
    try {
      const feedback = await getSpecializedTextTypeFeedback(currentContent, textType);
      setSpecializedFeedback(feedback);
      setActiveTool('specializedFeedback');
    } catch (error) {
      console.error('Error getting specialized text type feedback:', error);
    } finally {
      setIsLoadingSuggestions(false);
    }
  };

  const handleGetWritingStructure = async () => {
    if (!textType) return;
    setIsLoadingSuggestions(true);
    try {
      const structure = await getWritingStructure(textType);
      setWritingStructure(JSON.parse(structure)); // Assuming the response is a JSON string
      setActiveTool('structure');
    } catch (error) {
      console.error('Error getting writing structure:', error);
    } finally {
      setIsLoadingSuggestions(false);
    }
  };

  const noTypeSelected = !textType;

  return (
    <div ref={containerRef} className="h-full flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow-sm writing-area-container">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 space-y-4 content-spacing">
        <div className="flex flex-wrap justify-between items-center gap-2">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white capitalize">
            {textType ? `${textType} Writing` : 'Select Writing Type'}
          </h2>
          {noTypeSelected ? (
            <div className="flex items-center text-amber-600 dark:text-amber-400 text-sm">
              <AlertCircle className="w-4 h-4 mr-2" />
              Please select a writing type first
            </div>
          ) : showPromptButtons && (
            <div className="flex flex-wrap space-x-2 gap-2">
              <button
                onClick={() => setShowCustomPrompt(true)}
                disabled={noTypeSelected}
                className="px-4 py-2 bg-blue-600 text-white border border-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium touch-friendly-button"
              >
                I have my own prompt
              </button>
              <button
                onClick={handleGeneratePrompt}
                disabled={isGenerating || noTypeSelected}
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium touch-friendly-button"
              >
                Generate New Prompt
              </button>
            </div>
          )}
        </div>

        {showCustomPrompt && (
          <form onSubmit={handleCustomPromptSubmit} className="flex items-center space-x-2">
            <input
              type="text"
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="Enter your custom prompt"
              className="flex-grow p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm font-medium">
              Set Prompt
            </button>
          </form>
        )}

        {prompt && (
          <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-md text-blue-800 dark:text-blue-200 text-sm flex items-start">
            <Lightbulb className="w-5 h-5 mr-2 flex-shrink-0" />
            <p><strong>Prompt:</strong> {prompt}</p>
          </div>
        )}
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Main Writing Area */}
        <div className="flex-1 flex flex-col relative p-4 overflow-hidden">
          <div className="relative flex-1">
            <textarea
              ref={textareaRef}
              className="w-full h-full p-2 text-lg bg-transparent z-10 relative resize-none outline-none text-gray-900 dark:text-white custom-scrollbar"
              value={currentContent}
              onChange={handleContentChange}
              onScroll={handleScroll}
              placeholder="Start writing here..."
              disabled={noTypeSelected}
            />
            <div
              ref={overlayRef}
              className="absolute inset-0 p-2 text-lg pointer-events-none overflow-y-auto custom-scrollbar"
              aria-hidden="true"
            >
              {issues.length > 0 && currentContent.split(/(\b\w+\b|\s+|\S)/g).map((part, i) => {
                const charIndex = currentContent.indexOf(part, currentContent.split(/(\b\w+\b|\s+|\S)/g).slice(0, i).join('').length);
                const issue = issues.find(issue => charIndex >= issue.start && charIndex < issue.end);
                return issue ? (
                  <span
                    key={i}
                    className={`relative cursor-pointer ${getHighlightStyle(issue.type)}`}
                    onClick={(e) => handleIssueClick(issue, e)}
                  >
                    {part}
                  </span>
                ) : (
                  <span key={i}>{part}</span>
                );
              })}
            </div>
          </div>
          {selectedIssue && (
            <InlineSuggestionPopup
              issue={selectedIssue}
              position={popupPosition}
              onClose={() => setSelectedIssue(null)}
              onApply={handleApplySuggestion}
              onParaphrase={handleParaphrase}
              onThesaurus={handleThesaurus}
              isLoadingSuggestions={isLoadingSuggestions}
              suggestions={suggestions}
            />
          )}
        </div>

        {/* Sidebar for Tools and Feedback */}
        <div className={`bg-gray-50 dark:bg-gray-700 border-l border-gray-200 dark:border-gray-700 p-4 transition-all duration-300 ease-in-out ${isSidebarOpen ? 'w-1/3 max-w-sm' : 'w-12'}`}> {/* Adjusted width classes */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label={isSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            {isSidebarOpen ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>

          {isSidebarOpen && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Writing Tools</h3>
              <div className="grid grid-cols-1 gap-2">
                <button
                  onClick={handleGetWritingFeedback}
                  disabled={isLoadingSuggestions || noTypeSelected}
                  className={`flex items-center justify-start p-3 rounded-md text-sm font-medium transition-colors ${activeTool === 'feedback' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-100'}`}
                >
                  <MessageSquare className="w-4 h-4 mr-2" /> Get Feedback
                </button>
                <button
                  onClick={handleIdentifyCommonMistakes}
                  disabled={isLoadingSuggestions || noTypeSelected}
                  className={`flex items-center justify-start p-3 rounded-md text-sm font-medium transition-colors ${activeTool === 'mistakes' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-100'}`}
                >
                  <PenTool className="w-4 h-4 mr-2" /> Identify Mistakes
                </button>
                <button
                  onClick={handleGetTextTypeVocabulary}
                  disabled={isLoadingSuggestions || noTypeSelected}
                  className={`flex items-center justify-start p-3 rounded-md text-sm font-medium transition-colors ${activeTool === 'vocabulary' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-100'}`}
                >
                  <BookOpen className="w-4 h-4 mr-2" /> Get Vocabulary
                </button>
                <button
                  onClick={handleGetSpecializedTextTypeFeedback}
                  disabled={isLoadingSuggestions || noTypeSelected}
                  className={`flex items-center justify-start p-3 rounded-md text-sm font-medium transition-colors ${activeTool === 'specializedFeedback' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-100'}`}
                >
                  <Lightbulb className="w-4 h-4 mr-2" /> Specialized Feedback
                </button>
                <button
                  onClick={handleGetWritingStructure}
                  disabled={isLoadingSuggestions || noTypeSelected}
                  className={`flex items-center justify-start p-3 rounded-md text-sm font-medium transition-colors ${activeTool === 'structure' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-100'}`}
                >
                  <Layout className="w-4 h-4 mr-2" /> Writing Structure
                </button>
              </div>

              {isLoadingSuggestions && <p className="text-gray-600 dark:text-gray-400">Loading suggestions...</p>}

              {activeTool === 'feedback' && writingFeedback && (
                <div className="bg-white dark:bg-gray-800 p-3 rounded-md shadow-sm">
                  <h4 className="font-semibold text-gray-900 dark:text-white">General Feedback:</h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">{writingFeedback}</p>
                </div>
              )}
              {activeTool === 'mistakes' && commonMistakes && (
                <div className="bg-white dark:bg-gray-800 p-3 rounded-md shadow-sm">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Common Mistakes:</h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">{commonMistakes}</p>
                </div>
              )}
              {activeTool === 'vocabulary' && vocabularySuggestions && (
                <div className="bg-white dark:bg-gray-800 p-3 rounded-md shadow-sm">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Vocabulary Suggestions:</h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">{vocabularySuggestions}</p>
                </div>
              )}
              {activeTool === 'specializedFeedback' && specializedFeedback && (
                <div className="bg-white dark:bg-gray-800 p-3 rounded-md shadow-sm">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Specialized Feedback:</h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">{specializedFeedback}</p>
                </div>
              )}
              {activeTool === 'structure' && writingStructure && (
                <div className="bg-white dark:bg-gray-800 p-3 rounded-md shadow-sm">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Writing Structure:</h4>
                  <pre className="text-gray-700 dark:text-gray-300 text-sm whitespace-pre-wrap">{JSON.stringify(writingStructure, null, 2)}</pre>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <WritingStatusBar
        wordCount={currentContent.split(' ').filter(word => word.trim()).length}
        charCount={currentContent.length}
        lastSaved={lastSaved}
        isSaving={isSaving}
        issuesCount={issues.length}
        onSubmit={onSubmit}
      />
    </div>
  );
}


