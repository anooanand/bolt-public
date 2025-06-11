import React, { useState } from 'react';
import { 
  RefreshCw, 
  Copy, 
  ArrowRightLeft, 
  Download, 
  History,
  Wand2,
  FileText,
  Lightbulb,
  Zap
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface ParaphrasePanelProps {
  onNavigate: (page: string) => void;
}

interface ParaphraseHistory {
  id: string;
  original: string;
  paraphrased: string;
  mode: string;
  timestamp: Date;
}

type ParaphraseMode = 'standard' | 'formal' | 'casual' | 'creative' | 'concise' | 'expand';

export const ParaphrasePanel: React.FC<ParaphrasePanelProps> = ({ onNavigate }) => {
  const { isPaidUser } = useAuth();
  const [inputText, setInputText] = useState<string>('');
  const [outputText, setOutputText] = useState<string>('');
  const [selectedMode, setSelectedMode] = useState<ParaphraseMode>('standard');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [history, setHistory] = useState<ParaphraseHistory[]>([]);

  const paraphraseModes = [
    {
      id: 'standard' as ParaphraseMode,
      name: 'Standard',
      description: 'Balanced rewriting with natural flow',
      icon: RefreshCw,
      color: 'bg-blue-500'
    },
    {
      id: 'formal' as ParaphraseMode,
      name: 'Formal',
      description: 'Academic and professional tone',
      icon: FileText,
      color: 'bg-purple-500'
    },
    {
      id: 'casual' as ParaphraseMode,
      name: 'Casual',
      description: 'Conversational and friendly tone',
      icon: Lightbulb,
      color: 'bg-green-500'
    },
    {
      id: 'creative' as ParaphraseMode,
      name: 'Creative',
      description: 'Imaginative and expressive rewriting',
      icon: Wand2,
      color: 'bg-pink-500',
      isPro: true
    },
    {
      id: 'concise' as ParaphraseMode,
      name: 'Concise',
      description: 'Shorter, more direct version',
      icon: Zap,
      color: 'bg-orange-500',
      isPro: true
    },
    {
      id: 'expand' as ParaphraseMode,
      name: 'Expand',
      description: 'Detailed, elaborated version',
      icon: ArrowRightLeft,
      color: 'bg-indigo-500',
      isPro: true
    }
  ];

  const handleParaphrase = async () => {
    if (!inputText.trim()) return;
    
    const selectedModeData = paraphraseModes.find(mode => mode.id === selectedMode);
    if (selectedModeData?.isPro && !isPaidUser) {
      alert('Upgrade to Pro to use this paraphrasing mode');
      return;
    }

    setIsProcessing(true);
    
    // Simulate AI paraphrasing
    setTimeout(() => {
      const mockParaphrases: Record<ParaphraseMode, string[]> = {
        standard: [
          'This text has been rewritten using standard paraphrasing techniques to maintain clarity while changing the structure.',
          'The content has been rephrased with a balanced approach, preserving the original meaning while improving readability.',
          'Using conventional paraphrasing methods, this passage has been restructured for better flow and understanding.'
        ],
        formal: [
          'This document has been systematically restructured utilizing formal academic conventions to enhance professional presentation.',
          'The aforementioned content has been methodically revised in accordance with scholarly writing standards.',
          'This material has been comprehensively reformulated using established academic protocols for enhanced clarity.'
        ],
        casual: [
          "Here's a friendlier way to say the same thing - it's been rewritten to sound more conversational and easy-going.",
          "I've made this sound more relaxed and approachable while keeping the same basic message.",
          "This has been reworded in a more laid-back, everyday style that's easier to connect with."
        ],
        creative: [
          'Like a master artist reshaping clay, this text has been molded into a fresh, vibrant expression of the original idea.',
          'Imagine if words could dance - this is your text performing a beautiful waltz of meaning and style.',
          'This content has been transformed into a tapestry of language, weaving new patterns while preserving the essence.'
        ],
        concise: [
          'Text rewritten for brevity and impact.',
          'Streamlined version maintaining core message.',
          'Condensed for maximum clarity and efficiency.'
        ],
        expand: [
          'This comprehensive and thoroughly detailed rewriting provides an extensive exploration of the original concept, incorporating additional context, explanatory elements, and enriched vocabulary to create a more complete and nuanced understanding of the subject matter.',
          'The following expanded version offers a more elaborate and comprehensive treatment of the original text, providing enhanced detail, contextual information, and sophisticated language structures to deliver a richer, more complete communication experience.',
          'This extensively developed paraphrase presents a detailed and comprehensive reformulation that incorporates additional explanatory content, contextual background, and sophisticated linguistic elements to provide readers with a more thorough and complete understanding.'
        ]
      };

      const paraphrases = mockParaphrases[selectedMode];
      const randomParaphrase = paraphrases[Math.floor(Math.random() * paraphrases.length)];
      
      setOutputText(randomParaphrase);
      
      // Add to history
      const newHistoryItem: ParaphraseHistory = {
        id: Date.now().toString(),
        original: inputText,
        paraphrased: randomParaphrase,
        mode: selectedMode,
        timestamp: new Date()
      };
      
      setHistory(prev => [newHistoryItem, ...prev.slice(0, 9)]); // Keep last 10
      setIsProcessing(false);
    }, 2000);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  const handleSwap = () => {
    setInputText(outputText);
    setOutputText('');
  };

  const handleExport = () => {
    const exportData = {
      original: inputText,
      paraphrased: outputText,
      mode: selectedMode,
      timestamp: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'paraphrase-result.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Advanced Paraphrasing Tool
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Transform your text with AI-powered paraphrasing in multiple styles
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Paraphrasing Interface */}
          <div className="lg:col-span-3">
            {/* Mode Selection */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Paraphrasing Mode
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {paraphraseModes.map((mode) => {
                  const Icon = mode.icon;
                  const isLocked = mode.isPro && !isPaidUser;
                  
                  return (
                    <button
                      key={mode.id}
                      onClick={() => !isLocked && setSelectedMode(mode.id)}
                      disabled={isLocked}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        selectedMode === mode.id
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      } ${isLocked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                      <div className="flex items-center mb-2">
                        <div className={`p-2 ${mode.color} rounded-lg mr-3`}>
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        <div className="text-left">
                          <h3 className="font-medium text-gray-900 dark:text-white">
                            {mode.name}
                            {isLocked && (
                              <span className="ml-2 text-xs bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-1 rounded">
                                Pro
                              </span>
                            )}
                          </h3>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 text-left">
                        {mode.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Input/Output Interface */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200 dark:divide-gray-700">
                {/* Input Section */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Original Text
                    </h3>
                    <button
                      onClick={() => handleCopy(inputText)}
                      className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      title="Copy original text"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Enter the text you want to paraphrase..."
                    className="w-full h-64 p-4 border border-gray-200 dark:border-gray-700 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    {inputText.length} characters
                  </div>
                </div>

                {/* Output Section */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Paraphrased Text
                    </h3>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={handleSwap}
                        disabled={!outputText}
                        className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Swap input and output"
                      >
                        <ArrowRightLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleCopy(outputText)}
                        disabled={!outputText}
                        className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Copy paraphrased text"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="w-full h-64 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 overflow-y-auto">
                    {isProcessing ? (
                      <div className="flex items-center justify-center h-full">
                        <div className="text-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                          <p className="text-gray-600 dark:text-gray-400">
                            Paraphrasing your text...
                          </p>
                        </div>
                      </div>
                    ) : outputText ? (
                      <p className="text-gray-900 dark:text-white whitespace-pre-wrap">
                        {outputText}
                      </p>
                    ) : (
                      <p className="text-gray-500 dark:text-gray-400 italic">
                        Paraphrased text will appear here...
                      </p>
                    )}
                  </div>
                  <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    {outputText.length} characters
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="border-t border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setShowHistory(!showHistory)}
                      className="flex items-center px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                    >
                      <History className="w-4 h-4 mr-2" />
                      History ({history.length})
                    </button>
                    <button
                      onClick={handleExport}
                      disabled={!outputText}
                      className="flex items-center px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </button>
                  </div>
                  
                  <button
                    onClick={handleParaphrase}
                    disabled={!inputText.trim() || isProcessing}
                    className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                  >
                    {isProcessing ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    ) : (
                      <RefreshCw className="w-4 h-4 mr-2" />
                    )}
                    {isProcessing ? 'Processing...' : 'Paraphrase'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tips */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Paraphrasing Tips
              </h3>
              <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p>Keep the original meaning while changing the structure</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p>Use synonyms and different sentence patterns</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p>Choose the right mode for your audience</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p>Always review and edit the output</p>
                </div>
              </div>
            </div>

            {/* History */}
            {showHistory && history.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Recent History
                </h3>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {history.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                      onClick={() => {
                        setInputText(item.original);
                        setOutputText(item.paraphrased);
                        setSelectedMode(item.mode as ParaphraseMode);
                      }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-blue-600 dark:text-blue-400 uppercase">
                          {item.mode}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {item.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                        {item.original.substring(0, 100)}...
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Upgrade Prompt */}
            {!isPaidUser && (
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900 dark:to-pink-900 rounded-lg p-6 border border-purple-200 dark:border-purple-700">
                <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">
                  Unlock All Modes
                </h3>
                <p className="text-sm text-purple-700 dark:text-purple-300 mb-4">
                  Get access to Creative, Concise, and Expand modes with Pro!
                </p>
                <button
                  onClick={() => onNavigate('pricing')}
                  className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Upgrade Now
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

