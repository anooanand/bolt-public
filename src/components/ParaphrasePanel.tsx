import React, { useState, useEffect } from 'react';
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

interface ParaphrasePanelProps {
  onNavigate: (page: string) => void;
  selectedText?: string;
}

interface ParaphraseHistory {
  id: string;
  original: string;
  paraphrased: string;
  mode: string;
  timestamp: Date;
}

type ParaphraseMode = 'standard' | 'formal' | 'casual' | 'creative' | 'concise' | 'expand';

export const ParaphrasePanel: React.FC<ParaphrasePanelProps> = ({ onNavigate, selectedText = '' }) => {
  const [inputText, setInputText] = useState<string>(selectedText || '');
  const [outputText, setOutputText] = useState<string>('');
  const [selectedMode, setSelectedMode] = useState<ParaphraseMode>('standard');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [history, setHistory] = useState<ParaphraseHistory[]>([]);
  const [isPaidUser, setIsPaidUser] = useState<boolean>(false); // Simplified for demo

  useEffect(() => {
    if (selectedText) {
      setInputText(selectedText);
    }
  }, [selectedText]);

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
    <div className="h-full flex flex-col bg-white dark:bg-gray-800 overflow-hidden rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">Paraphrase Tool</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Rewrite selected text in different styles</p>
      </div>

      <div className="p-4 space-y-4 flex-grow overflow-auto">
        {/* Mode Selection */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Paraphrasing Mode
          </label>
          <div className="grid grid-cols-2 gap-2">
            {paraphraseModes.slice(0, 4).map((mode) => {
              const Icon = mode.icon;
              const isLocked = mode.isPro && !isPaidUser;
              
              return (
                <button
                  key={mode.id}
                  onClick={() => !isLocked && setSelectedMode(mode.id)}
                  disabled={isLocked}
                  className={`p-2 rounded-lg border-2 transition-all ${
                    selectedMode === mode.id
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  } ${isLocked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div className="flex items-center">
                    <div className={`p-1 ${mode.color} rounded-lg mr-2`}>
                      <Icon className="w-3 h-3 text-white" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-xs font-medium text-gray-900 dark:text-white">
                        {mode.name}
                        {isLocked && (
                          <span className="ml-1 text-xxs bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-1 rounded">
                            Pro
                          </span>
                        )}
                      </h3>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Input */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Original Text
          </label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter or paste text to paraphrase..."
            className="w-full h-24 p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        <button
          onClick={handleParaphrase}
          disabled={!inputText.trim() || isProcessing}
          className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isProcessing ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
              Processing...
            </>
          ) : (
            <>
              <RefreshCw className="w-4 h-4 mr-2" />
              Paraphrase
            </>
          )}
        </button>

        {/* Output */}
        {outputText && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Paraphrased Text
              </label>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleCopy(outputText)}
                  className="p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  title="Copy to clipboard"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <button
                  onClick={handleSwap}
                  className="p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  title="Use as input"
                >
                  <ArrowRightLeft className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
              <p className="text-gray-900 dark:text-white whitespace-pre-wrap">{outputText}</p>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t bg-gray-50 dark:bg-gray-700">
        <div className="flex justify-between items-center">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
          >
            <History className="w-4 h-4 inline mr-1" />
            History ({history.length})
          </button>
          
          {!isPaidUser && (
            <button
              onClick={() => onNavigate('pricing')}
              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
            >
              Upgrade for Pro Features
            </button>
          )}
        </div>
      </div>
    </div>
  );
};