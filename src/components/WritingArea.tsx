import React, { useState, useEffect, useRef, useCallback } from 'react';
import { generatePrompt, getSynonyms, rephraseSentence, evaluateEssay, getWritingFeedback, identifyCommonMistakes, getTextTypeVocabulary, getSpecializedTextTypeFeedback, getWritingStructure } from '../lib/openai';
import { dbOperations } from '../lib/database';
import { useApp } from '../contexts/AppContext';
import { AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
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
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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
    if (content.trim() && textType && state.user) {
      const saveTimer = setTimeout(async () => {
        setIsSaving(true);
        try {
          const wordCount = content.split(' ').filter(word => word.trim()).length;
          const title = content.split('\n')[0].substring(0, 50) || `${textType} Writing`;
          
          const { data, error } = await dbOperations.writings.createWriting({
            title,
            content,
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
  }, [content, textType, state.user, addWriting]);

  useEffect(() => {
    if (content && content.trim()) {
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
    if (!content.trim() || !textType) return;
    setIsLoadingSuggestions(true);
    try {
      const feedback = await getWritingFeedback(content, textType, 'Year 5-6', []); // Assuming Year 5-6 and no feedback history for simplicity
      setWritingFeedback(feedback);
    } catch (error) {
      console.error('Error getting writing feedback:', error);
    } finally {
      setIsLoadingSuggestions(false);
    }
  };

  const handleIdentifyCommonMistakes = async () => {
    if (!content.trim() || !textType) return;
    setIsLoadingSuggestions(true);
    try {
      const mistakes = await identifyCommonMistakes(content, textType);
      setCommonMistakes(mistakes);
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
      const vocabulary = await getTextTypeVocabulary(textType, content.substring(0, 500));
      setVocabularySuggestions(vocabulary);
    } catch (error) {
      console.error('Error getting text type vocabulary:', error);
    } finally {
      setIsLoadingSuggestions(false);
    }
  };

  const handleGetSpecializedTextTypeFeedback = async () => {
    if (!content.trim() || !textType) return;
    setIsLoadingSuggestions(true);
    try {
      const feedback = await getSpecializedTextTypeFeedback(content, textType);
      setSpecializedFeedback(feedback);
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

        {showCustomPrompt && !noTypeSelected && (
          <form onSubmit={handleCustomPromptSubmit} className="space-y-2">
            <textarea
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="Enter your own writing prompt..."
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
            />
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm font-medium touch-friendly-button"
            >
              Use Custom Prompt
            </button>
          </form>
        )}

        {prompt && (
          <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-md text-blue-800 dark:text-blue-200 text-sm">
            <p className="font-semibold">Writing Prompt:</p>
            <p>{prompt}</p>
          </div>
        )}
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="relative flex-1 flex flex-col">
          <textarea
            ref={textareaRef}
            className="flex-1 w-full p-4 text-lg leading-relaxed resize-none focus:outline-none bg-transparent text-gray-900 dark:text-white overflow-y-auto"
            value={content}
            onChange={handleContentChange}
            onScroll={handleScroll}
            placeholder={noTypeSelected ? 'Please select a writing type to begin...' : 'Start writing here...'}
            disabled={noTypeSelected || !prompt}
            spellCheck="false"
            autoCorrect="off"
            autoCapitalize="off"
            data-testid="writing-area"
          />
          <div
            ref={overlayRef}
            className="absolute inset-0 p-4 text-lg leading-relaxed pointer-events-none overflow-y-auto"
            style={{ color: 'transparent' }}
          >
            {issues.length > 0 &&
              content.split(/(\b|\s|\S)/).map((part, i) => {
                const issue = issues.find(
                  (iss) =>
                    content.substring(0, content.indexOf(part, i)).length >= iss.start &&
                    content.substring(0, content.indexOf(part, i)).length < iss.end
                );
                return (
                  <span
                    key={i}
                    className={issue ? getHighlightStyle(issue.type) + ' cursor-pointer' : ''}
                    onClick={issue ? (e) => handleIssueClick(issue, e) : undefined}
                    style={issue ? { pointerEvents: 'auto' } : {}}
                  >
                    {part}
                  </span>
                );
              })}
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

        {/* Collapsible Sidebar for AI Tools */}
        <div className={`relative bg-gray-50 dark:bg-gray-700 border-l border-gray-200 dark:border-gray-700 flex flex-col overflow-y-auto transition-all duration-300 ease-in-out ${isSidebarOpen ? 'w-80 p-4' : 'w-12'}`}>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="absolute top-1/2 -left-3 transform -translate-y-1/2 bg-gray-200 dark:bg-gray-600 p-1 rounded-full shadow-md z-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label={isSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            {isSidebarOpen ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
          {isSidebarOpen && (
            <>
              <h3 className="text-md font-medium text-gray-900 dark:text-white mb-4">AI Writing Tools</h3>
              <div className="space-y-4">
                <button
                  onClick={handleGetWritingFeedback}
                  disabled={!content.trim() || !textType || isLoadingSuggestions}
                  className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium touch-friendly-button"
                >
                  Get Writing Feedback
                </button>
                <button
                  onClick={handleIdentifyCommonMistakes}
                  disabled={!content.trim() || !textType || isLoadingSuggestions}
                  className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium touch-friendly-button"
                >
                  Identify Common Mistakes
                </button>
                <button
                  onClick={handleGetTextTypeVocabulary}
                  disabled={!textType || isLoadingSuggestions}
                  className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium touch-friendly-button"
                >
                  Get Vocabulary Suggestions
                </button>
                <button
                  onClick={handleGetSpecializedTextTypeFeedback}
                  disabled={!content.trim() || !textType || isLoadingSuggestions}
                  className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium touch-friendly-button"
                >
                  Get Specialized Feedback
                </button>
                <button
                  onClick={handleGetWritingStructure}
                  disabled={!textType || isLoadingSuggestions}
                  className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium touch-friendly-button"
                >
                  Get Writing Structure
                </button>
              </div>

              {writingFeedback && (
                <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-600 rounded-md text-gray-900 dark:text-white text-sm">
                  <h4 className="font-semibold">Writing Feedback:</h4>
                  <p><strong>Overall:</strong> {writingFeedback.overallComment}</p>
                  <ul className="list-disc list-inside">
                    {writingFeedback.feedbackItems.map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                  <p><strong>Focus for next time:</strong> {writingFeedback.focusForNextTime}</p>
                </div>
              )}

              {commonMistakes && (
                <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-600 rounded-md text-gray-900 dark:text-white text-sm">
                  <h4 className="font-semibold">Common Mistakes:</h4>
                  <p><strong>Overall Assessment:</strong> {commonMistakes.overallAssessment}</p>
                  <p><strong>Mistakes Identified:</strong> {commonMistakes.mistakesIdentified}</p>
                  <p><strong>Pattern Analysis:</strong> {commonMistakes.patternAnalysis}</p>
                  <p><strong>Priority Fixes:</strong> {commonMistakes.priorityFixes}</p>
                  <p><strong>Positive Elements:</strong> {commonMistakes.positiveElements}</p>
                </div>
              )}

              {vocabularySuggestions && (
                <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-600 rounded-md text-gray-900 dark:text-white text-sm">
                  <h4 className="font-semibold">Vocabulary Suggestions:</h4>
                  <p><strong>Text Type:</strong> {vocabularySuggestions.textType}</p>
                  {vocabularySuggestions.categories.map((category: any, index: number) => (
                    <div key={index} className="mb-2">
                      <p className="font-semibold">{category.category}:</p>
                      <ul className="list-disc list-inside">
                        {category.words.map((word: string, i: number) => (
                          <li key={i}>{word}</li>
                        ))}
                      </ul>
                      <p><em>Examples:</em> {category.examples}</p>
                    </div>
                  ))}
                  <p><strong>Phrases and Expressions:</strong> {vocabularySuggestions.phrasesAndExpressions}</p>
                  <p><strong>Transition Words:</strong> {vocabularySuggestions.transitionWords}</p>
                </div>
              )}

              {specializedFeedback && (
                <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-600 rounded-md text-gray-900 dark:text-white text-sm">
                  <h4 className="font-semibold">Specialized Feedback:</h4>
                  <p><strong>Overall:</strong> {specializedFeedback.overallComment}</p>
                  <p><strong>Structure:</strong> {specializedFeedback.textTypeSpecificFeedback.structure}</p>
                  <p><strong>Language:</strong> {specializedFeedback.textTypeSpecificFeedback.language}</p>
                  <p><strong>Purpose:</strong> {specializedFeedback.textTypeSpecificFeedback.purpose}</p>
                  <p><strong>Audience:</strong> {specializedFeedback.textTypeSpecificFeedback.audience}</p>
                  <p><strong>Strengths:</strong> {specializedFeedback.strengthsInTextType}</p>
                  <p><strong>Improvement Areas:</strong> {specializedFeedback.improvementAreas}</p>
                  <p><strong>Next Steps:</strong> {specializedFeedback.nextSteps}</p>
                </div>
              )}

              {writingStructure && (
                <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-600 rounded-md text-gray-900 dark:text-white text-sm">
                  <h4 className="font-semibold">Writing Structure:</h4>
                  <p><strong>Title:</strong> {writingStructure.title}</p>
                  <ul className="list-disc list-inside">
                    {writingStructure.sections.map((section: string, index: number) => (
                      <li key={index}>{section}</li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <WritingStatusBar
        wordCount={content.split(' ').filter(word => word.trim()).length}
        lastSaved={lastSaved}
        isSaving={isSaving}
        onRestore={handleRestoreContent}
        onSubmit={onSubmit}
      />
    </div>
  );
}