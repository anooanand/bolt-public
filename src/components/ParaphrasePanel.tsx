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

interface ParaphrasePanelProps {
  selectedText: string;
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

export function ParaphrasePanel({ selectedText, onNavigate }: ParaphrasePanelProps) {
  const [inputText, setInputText] = useState<string>(selectedText || '');
  const [outputText, setOutputText] = useState<string>('');
  const [selectedMode, setSelectedMode] = useState<ParaphraseMode>('standard');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [history, setHistory] = useState<ParaphraseHistory[]>([]);

  // Update input text when selectedText changes
  React.useEffect(() => {
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
      color: 'bg-pink-500'
    },
    {
      id: 'concise' as ParaphraseMode,
      name: 'Concise',
      description: 'Shorter, more direct version',
      icon: Zap,
      color: 'bg-orange-500'
    },
    {
      id: 'expand' as ParaphraseMode,
      name: 'Expand',
      description: 'Detailed, elaborated version',
      icon: ArrowRightLeft,
      color: 'bg-indigo-500'
    }
  ];

  const handleParaphrase = async () => {
    if (!inputText.trim()) return;
    
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
    }, 1500);
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
    <div className="h-full flex flex-col bg-white dark:bg-gray-800 overflow-y-auto">
      <div className="p-4 border-b">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Paraphrase Tool
        </h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
          {paraphraseModes.slice(0, 3).map((mode) => {
            const Icon = mode.icon;
            return (
              <button
                key={mode.id}
                onClick={() => setSelectedMode(mode.id)}
                className={`p-2 rounded-lg border-2 transition-all ${
                  selectedMode === mode.id
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <div className="flex items-center">
                  <div className={`p-1.5 ${mode.color} rounded-lg mr-2`}>
                    <Icon className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-xs font-medium text-gray-900 dark:text-white">
                    {mode.name}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
          {paraphraseModes.slice(3).map((mode) => {
            const Icon = mode.icon;
            return (
              <button
                key={mode.id}
                onClick={() => setSelectedMode(mode.id)}
                className={`p-2 rounded-lg border-2 transition-all ${
                  selectedMode === mode.id
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <div className="flex items-center">
                  <div className={`p-1.5 ${mode.color} rounded-lg mr-2`}>
                    <Icon className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-xs font-medium text-gray-900 dark:text-white">
                    {mode.name}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-4 flex-1 overflow-y-auto">
        <div className="mb-4">
          <label htmlFor="inputText" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Original Text
          </label>
          <textarea
            id="inputText"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter text to paraphrase..."
            className="w-full h-24 p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        <div className="flex justify-center mb-4">
          <button
            onClick={handleParaphrase}
            disabled={isProcessing || !inputText.trim()}
            className={`px-4 py-2 rounded-md text-white text-sm font-medium flex items-center ${
              isProcessing || !inputText.trim()
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isProcessing ? (
              <>
                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                Paraphrasing...
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4 mr-2" />
                Paraphrase
              </>
            )}
          </button>
        </div>

        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <label htmlFor="outputText" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Paraphrased Text
            </label>
            <div className="flex space-x-1">
              {outputText && (
                <>
                  <button
                    onClick={() => handleCopy(outputText)}
                    className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    title="Copy to clipboard"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                  <button
                    onClick={handleSwap}
                    className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    title="Use as input"
                  >
                    <ArrowRightLeft className="h-4 w-4" />
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="w-full h-24 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white overflow-y-auto">
            {outputText || (
              <span className="text-gray-400 dark:text-gray-500">Paraphrased text will appear here...</span>
            )}
          </div>
        </div>

        {/* History Section */}
        <div>
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-2"
          >
            <History className="h-4 w-4 mr-1" />
            {showHistory ? 'Hide History' : 'Show History'} ({history.length})
          </button>
          
          {showHistory && history.length > 0 && (
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {history.map((item) => (
                <div
                  key={item.id}
                  className="p-2 bg-gray-50 dark:bg-gray-700 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 text-sm"
                  onClick={() => {
                    setInputText(item.original);
                    setOutputText(item.paraphrased);
                    setSelectedMode(item.mode as ParaphraseMode);
                  }}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      {item.mode.charAt(0).toUpperCase() + item.mode.slice(1)}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {item.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 line-clamp-1">{item.original}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="p-4 border-t bg-gray-50 dark:bg-gray-800">
        <div className="flex justify-between items-center">
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {selectedMode.charAt(0).toUpperCase() + selectedMode.slice(1)} Mode
          </div>
          {outputText && (
            <button
              onClick={handleExport}
              className="flex items-center text-xs text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            >
              <Download className="h-3 w-3 mr-1" />
              Export
            </button>
          )}
        </div>
      </div>
    </div>
  );
}