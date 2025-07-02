import React, { useState, useEffect, useRef, useCallback } from 'react';
import { generatePrompt, getSynonyms, rephraseSentence, evaluateEssay, getWritingFeedback, identifyCommonMistakes, getTextTypeVocabulary, getSpecializedTextTypeFeedback, getWritingStructure } from '../lib/openai';
import { dbOperations } from '../lib/database';
import { useApp } from '../contexts/AppContext';
import { AlertCircle, MessageSquare, BookOpen, PenTool, Clock, FileText, Send, Bot, User, Sparkles, Volume2, VolumeX } from 'lucide-react';
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

interface Message {
  id: string;
  role: 'assistant' | 'user';
  content: string;
  timestamp: Date;
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
  
  // Timer state
  const [timer, setTimer] = useState(30 * 60); // 30 minutes in seconds
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [planningNotes, setPlanningNotes] = useState('');
  
  // Assistant chat state
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [showAssistant, setShowAssistant] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentContent = content || '';
  const wordCount = currentContent.split(' ').filter(word => word.trim()).length;

  // Timer countdown effect
  useEffect(() => {
    if (timer > 0 && prompt) {
      const countdown = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearInterval(countdown);
    } else if (timer <= 0) {
      setIsTimeUp(true);
    }
  }, [timer, prompt]);

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

  // Initialize assistant chat
  useEffect(() => {
    if (textType && showAssistant) {
      const initialMessage = {
        id: crypto.randomUUID(),
        role: 'assistant' as const,
        content: `👋 Hi there! I'm your friendly writing buddy! Let's work on your ${textType}. What topic would you like to explore today? 🌟`,
        timestamp: new Date()
      };
      setMessages([initialMessage]);
    }
  }, [textType, showAssistant]);

  // Auto-scroll chat messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const analyzeText = useCallback((text: string) => {
    const newIssues: WritingIssue[] = [];
    
    // Simplified spelling patterns
    const spellingPatterns = {
      'recieve': 'receive',
      'seperate': 'separate',
      'alot': 'a lot',
      'cant': "can't",
      'dont': "don't",
      'youre': "you're",
      'theyre': "they're"
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
          message: `Spelling: "${correct}"`,
          suggestion: correct
        });
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
      }, 30000);

      return () => clearTimeout(saveTimer);
    }
  }, [currentContent, textType, state.user, addWriting, wordCount]);

  useEffect(() => {
    if (currentContent && currentContent.trim()) {
      analyzeText(currentContent);
    }
  }, [currentContent, analyzeText]);

  // Convert seconds to MM:SS format
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

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

      const maxX = containerRect.width - 300;
      if (x > maxX) x = maxX;
      if (x < 0) x = 0;

      const maxY = containerRect.height - 200;
      if (y > maxY) y = rect.top - containerRect.top - 220;

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
      default:
        return '';
    }
  };

  const handleGeneratePrompt = async () => {
    setIsGenerating(true);
    const newPrompt = await generatePrompt(textType);
    if (newPrompt) {
      setPrompt(newPrompt);
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
      if (textType) {
        localStorage.setItem(`${textType}_prompt`, customPrompt);
      }
      setShowCustomPrompt(false);
    }
  };

  // Chat functionality
  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isChatLoading) return;

    try {
      setIsChatLoading(true);

      // Add user message
      const userMessage: Message = {
        id: crypto.randomUUID(),
        role: 'user',
        content: chatInput,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, userMessage]);
      setChatInput('');

      // Add temporary "thinking" message
      const thinkingId = crypto.randomUUID();
      setMessages(prev => [...prev, {
        id: thinkingId,
        role: 'assistant',
        content: '🤔 Thinking...',
        timestamp: new Date()
      }]);

      // Get AI response (simplified - you may want to use your actual API)
      const response = await getWritingFeedback(chatInput, textType, 'Year 5-6', []);
      
      // Replace thinking message with actual response
      setMessages(prev => prev.map(msg => 
        msg.id === thinkingId 
          ? {
              id: crypto.randomUUID(),
              role: 'assistant',
              content: response,
              timestamp: new Date()
            }
          : msg
      ));
    } catch (error) {
      console.error('Error submitting chat:', error);
    } finally {
      setIsChatLoading(false);
    }
  };

  const noTypeSelected = !textType;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <h1 className="text-2xl font-bold mb-4 text-center text-gray-900 dark:text-white p-6">
            NSW Selective School Writing Pad
          </h1>

          {/* Timer and Word Count */}
          <div className="flex justify-between items-center mb-6 p-4 bg-gray-50 dark:bg-gray-700 mx-6 rounded-lg">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                Time Left: {formatTime(timer)}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                Words: {wordCount}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowAssistant(!showAssistant)}
                className="flex items-center space-x-2 px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm"
              >
                <Bot className="h-4 w-4" />
                <span>Writing Assistant</span>
              </button>
            </div>
          </div>

          <div className="flex">
            {/* Main Writing Area */}
            <div className={`${showAssistant ? 'w-2/3' : 'w-full'} p-6`}>
              {/* Prompt Section */}
              {noTypeSelected && (
                <div className="mb-6 p-4 bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 rounded-lg">
                  <div className="flex items-center text-amber-600 dark:text-amber-400">
                    <AlertCircle className="w-5 h-5 mr-2" />
                    Please select a writing type first
                  </div>
                </div>
              )}

              {showPromptButtons && !noTypeSelected && (
                <div className="mb-6">
                  <div className="flex space-x-2 mb-4">
                    <button
                      onClick={() => setShowCustomPrompt(true)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                    >
                      Custom Prompt
                    </button>
                    <button
                      onClick={handleGeneratePrompt}
                      disabled={isGenerating}
                      className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 text-sm"
                    >
                      Generate Prompt
                    </button>
                  </div>
                </div>
              )}

              {showCustomPrompt && (
                <div className="mb-6">
                  <form onSubmit={handleCustomPromptSubmit} className="space-y-3">
                    <textarea
                      value={customPrompt}
                      onChange={(e) => setCustomPrompt(e.target.value)}
                      placeholder="Enter your custom prompt..."
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      rows={3}
                    />
                    <div className="flex space-x-2">
                      <button 
                        type="submit" 
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
                      >
                        Set Prompt
                      </button>
                      <button 
                        type="button"
                        onClick={() => setShowCustomPrompt(false)}
                        className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {prompt && (
                <div className="mb-6 bg-blue-50 dark:bg-blue-900/30 p-4 rounded-md text-blue-800 dark:text-blue-200">
                  <strong>Prompt:</strong> {prompt}
                </div>
              )}

              {/* Planning Section */}
              <div className="mb-6">
                <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
                  Planning Notes (Optional)
                </h2>
                <textarea
                  disabled={isTimeUp || noTypeSelected}
                  className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white resize-none"
                  rows={4}
                  placeholder="Write your ideas, plot points, or arguments here before starting your essay..."
                  value={planningNotes}
                  onChange={(e) => setPlanningNotes(e.target.value)}
                />
              </div>

              {/* Essay Writing Section */}
              <div className="mb-6">
                <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
                  Write Your Essay
                </h2>
                <div ref={containerRef} className="relative">
                  <textarea
                    ref={textareaRef}
                    disabled={isTimeUp || noTypeSelected}
                    className="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white resize-none"
                    rows={15}
                    placeholder="Start writing your essay here..."
                    value={currentContent}
                    onChange={handleContentChange}
                    onScroll={handleScroll}
                  />
                  
                  {/* Overlay for highlighting issues */}
                  <div
                    ref={overlayRef}
                    className="absolute inset-4 p-4 text-lg pointer-events-none overflow-y-auto"
                    style={{ zIndex: 5 }}
                    aria-hidden="true"
                  >
                    {issues.length > 0 && currentContent.split(/(\b\w+\b|\s+|\S)/g).map((part, i) => {
                      const charIndex = currentContent.indexOf(part, currentContent.split(/(\b\w+\b|\s+|\S)/g).slice(0, i).join('').length);
                      const issue = issues.find(issue => charIndex >= issue.start && charIndex < issue.end);
                      return issue ? (
                        <span
                          key={i}
                          className={`relative cursor-pointer pointer-events-auto ${getHighlightStyle(issue.type)}`}
                          onClick={(e) => handleIssueClick(issue, e)}
                        >
                          {part}
                        </span>
                      ) : (
                        <span key={i}>{part}</span>
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
              </div>

              {/* Time Up Message */}
              {isTimeUp && (
                <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/50 border border-red-400 text-red-700 dark:text-red-300 rounded-lg flex items-center justify-between">
                  <span>Time is up! Please submit your essay.</span>
                  <button
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                    onClick={onSubmit}
                  >
                    Submit Essay
                  </button>
                </div>
              )}

              {/* Status Bar */}
              <WritingStatusBar
                wordCount={wordCount}
                charCount={currentContent.length}
                lastSaved={lastSaved}
                isSaving={isSaving}
                issuesCount={issues.length}
                onSubmit={onSubmit}
              />
            </div>

            {/* Writing Assistant Chat */}
            {showAssistant && (
              <div className="w-1/3 border-l border-gray-200 dark:border-gray-700 flex flex-col h-[600px]">
                {/* Chat Header */}
                <div className="px-4 py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 dark:from-indigo-600 dark:via-purple-600 dark:to-pink-600 flex justify-between items-center">
                  <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                    <Bot className="h-5 w-5" />
                    <span>Writing Assistant</span>
                    <Sparkles className="h-4 w-4 text-yellow-300 animate-pulse" />
                  </h3>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-800">
                  {messages.map(message => (
                    <div
                      key={message.id}
                      className={`flex items-start space-x-3 ${
                        message.role === 'assistant' ? 'justify-start' : 'justify-end'
                      }`}
                    >
                      <div
                        className={`flex items-start space-x-3 px-3 py-2 rounded-lg max-w-[85%] ${
                          message.role === 'assistant'
                            ? 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100'
                            : 'bg-indigo-500 dark:bg-indigo-600 text-white'
                        }`}
                      >
                        {message.role === 'assistant' ? (
                          <Bot className="h-4 w-4 text-indigo-500 dark:text-indigo-400 flex-shrink-0 mt-1" />
                        ) : (
                          <User className="h-4 w-4 text-white flex-shrink-0 mt-1" />
                        )}
                        <div className="flex-1 break-words text-sm">
                          {message.content === '🤔 Thinking...' ? (
                            <span className="flex items-center space-x-2">
                              <span>Thinking</span>
                              <span className="inline-flex space-x-1">
                                <span className="animate-bounce">.</span>
                                <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>.</span>
                                <span className="animate-bounce" style={{ animationDelay: "0.4s" }}>.</span>
                              </span>
                            </span>
                          ) : (
                            message.content
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Chat Input */}
                <form onSubmit={handleChatSubmit} className="p-3 bg-gray-50 dark:bg-gray-800 border-t dark:border-gray-700">
                  <div className="flex space-x-2">
                    <textarea
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Ask for writing help..."
                      className="flex-1 p-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white resize-none"
                      rows={2}
                      disabled={isChatLoading}
                    />
                    <button
                      type="submit"
                      disabled={isChatLoading || !chatInput.trim()}
                      className="px-3 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed h-fit"
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

