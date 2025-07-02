import React, { useState, useRef, useEffect } from 'react';
import { 
  Save, 
  Download, 
  BarChart3, 
  Clock,
  FileText,
  Maximize2,
  Minimize2,
  Volume2,
  RefreshCw
} from 'lucide-react';

interface ImprovedWritingAreaProps {
  content: string;
  onChange: (content: string) => void;
  textType: string;
  onTimerStart: (started: boolean) => void;
  onSubmit: () => void;
}

interface WritingStats {
  wordCount: number;
  characterCount: number;
  paragraphCount: number;
  readingTime: number;
}

export function ImprovedWritingArea({ 
  content, 
  onChange, 
  textType, 
  onTimerStart, 
  onSubmit 
}: ImprovedWritingAreaProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showStats, setShowStats] = useState(true);
  const [prompt, setPrompt] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [stats, setStats] = useState<WritingStats>({
    wordCount: 0,
    characterCount: 0,
    paragraphCount: 0,
    readingTime: 0
  });

  // Calculate writing statistics
  useEffect(() => {
    const words = content.trim().split(/\s+/).filter(word => word.length > 0);
    const paragraphs = content.split('\n\n').filter(p => p.trim().length > 0);
    
    setStats({
      wordCount: words.length,
      characterCount: content.length,
      paragraphCount: paragraphs.length,
      readingTime: Math.ceil(words.length / 200)
    });
  }, [content]);

  // Auto-save functionality
  useEffect(() => {
    if (content.length > 0) {
      const timer = setTimeout(() => {
        setLastSaved(new Date());
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [content]);

  const generatePrompt = async () => {
    setIsGenerating(true);
    // Simulate prompt generation
    setTimeout(() => {
      const prompts = [
        "Write about a time when you discovered something unexpected.",
        "Describe a place that holds special meaning to you.",
        "Tell the story of an important decision you had to make.",
        "Write about a person who has influenced your life.",
        "Describe a challenge you overcame and what you learned."
      ];
      setPrompt(prompts[Math.floor(Math.random() * prompts.length)]);
      setIsGenerating(false);
      onTimerStart(true);
    }, 1500);
  };

  const handleSave = () => {
    // Simulate save
    setLastSaved(new Date());
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${textType}_writing.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className={`flex flex-col h-full ${isFullscreen ? 'fixed inset-0 z-50 bg-white' : ''}`}>
      {/* Header with Tools */}
      <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold text-gray-800">
            {textType} Writing
          </h1>
          {showStats && (
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <FileText size={16} />
                <span>{stats.wordCount} words</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock size={16} />
                <span>{stats.readingTime} min read</span>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowStats(!showStats)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            title="Toggle Stats"
          >
            <BarChart3 size={18} />
          </button>
          <button
            onClick={handleSave}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            title="Save"
          >
            <Save size={18} />
          </button>
          <button
            onClick={handleDownload}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            title="Download"
          >
            <Download size={18} />
          </button>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          >
            {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </button>
        </div>
      </div>

      {/* Writing Prompt Section */}
      {!prompt && (
        <div className="p-6 bg-blue-50 border-b border-blue-100">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-lg font-medium text-blue-900 mb-2">Writing Prompt</h2>
            <p className="text-blue-700 mb-4">
              Write about a time when you discovered something unexpected.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={generatePrompt}
                disabled={isGenerating}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
              >
                {isGenerating ? <RefreshCw size={16} className="animate-spin" /> : <RefreshCw size={16} />}
                <span>{isGenerating ? 'Generating...' : 'New Prompt'}</span>
              </button>
              <button
                onClick={() => setPrompt("Custom prompt")}
                className="px-4 py-2 bg-white text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Use This Prompt
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Writing Area */}
      <div className="flex-1 flex">
        {/* Writing Text Area */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 p-6">
            <div className="max-w-4xl mx-auto h-full">
              <textarea
                ref={textareaRef}
                value={content}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Begin writing here... (Click on highlighted text for suggestions)"
                className="w-full h-full p-6 text-lg leading-relaxed border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                style={{ 
                  fontFamily: 'Georgia, serif',
                  lineHeight: '1.8'
                }}
              />
            </div>
          </div>

          {/* Bottom Status Bar */}
          <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
            <div className="max-w-4xl mx-auto flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center space-x-4">
                <span>Word count: {stats.wordCount}</span>
                <span>Characters: {stats.characterCount}</span>
                <span>Paragraphs: {stats.paragraphCount}</span>
              </div>
              <div className="flex items-center space-x-4">
                {lastSaved && (
                  <span>Last saved: {lastSaved.toLocaleTimeString()}</span>
                )}
                <button
                  onClick={onSubmit}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Submit Essay
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Writing Coach Panel */}
        <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-800 flex items-center space-x-2">
              <Volume2 size={18} className="text-blue-600" />
              <span>Writing Coach</span>
            </h3>
          </div>
          
          <div className="flex-1 p-4 space-y-4 overflow-y-auto">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Getting Started</h4>
              <p className="text-sm text-blue-700">
                Start by understanding the prompt. What is it asking you to write about? 
                Take a moment to brainstorm your ideas before you begin writing.
              </p>
            </div>

            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-medium text-green-900 mb-2">Structure Tips</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Start with a clear introduction</li>
                <li>• Use paragraphs to organize ideas</li>
                <li>• End with a strong conclusion</li>
              </ul>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="font-medium text-purple-900 mb-2">Writing Quality</h4>
              <p className="text-sm text-purple-700">
                Use varied sentence lengths and descriptive language to make your writing 
                more engaging and interesting to read.
              </p>
            </div>
          </div>

          <div className="p-4 border-t border-gray-200">
            <div className="space-y-2">
              <h4 className="font-medium text-gray-800">Common Writing Questions</h4>
              <input
                type="text"
                placeholder="Ask your coach a question..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Ask
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
