import React, { useState, useEffect, useCallback } from 'react';
import { BarChart3, AlertCircle, CheckCircle, TrendingUp, RefreshCw, Eye } from 'lucide-react';

interface SentenceAnalysis {
  sentence: string;
  length: number;
  complexity: 'simple' | 'compound' | 'complex' | 'compound-complex';
  issues: string[];
  suggestions: string[];
  score: number;
}

interface SentencePattern {
  pattern: string;
  count: number;
  examples: string[];
  suggestion: string;
}

interface SentenceAnalyzerProps {
  content: string;
  textType: string;
  onSuggestionApply?: (original: string, suggestion: string) => void;
  className?: string;
}

export const SentenceAnalyzer: React.FC<SentenceAnalyzerProps> = ({
  content,
  textType,
  onSuggestionApply,
  className = ''
}) => {
  const [analysis, setAnalysis] = useState<SentenceAnalysis[]>([]);
  const [patterns, setPatterns] = useState<SentencePattern[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedSentence, setSelectedSentence] = useState<number | null>(null);
  const [showPatterns, setShowPatterns] = useState(false);

  // Analyze sentence structure
  const analyzeSentenceStructure = useCallback(async () => {
    if (content.trim().length < 5) return;

    setIsAnalyzing(true);
    try {
      const response = await fetch('/.netlify/functions/ai-operations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          operation: 'analyzeSentenceStructure',
          content,
          textType
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.sentences) {
          setAnalysis(data.sentences);
        }
        if (data.patterns) {
          setPatterns(data.patterns);
        }
      }
    } catch (error) {
      console.error('Error analyzing sentence structure:', error);
    } finally {
      setIsAnalyzing(false);
    }
  }, [content, textType]);

  // Debounced analysis
  useEffect(() => {
    const timer = setTimeout(() => {
      analyzeSentenceStructure();
    }, 2000);

    return () => clearTimeout(timer);
  }, [analyzeSentenceStructure]);

  // Calculate overall statistics
  const getOverallStats = () => {
    if (analysis.length === 0) return null;

    const totalSentences = analysis.length;
    const averageLength = analysis.reduce((sum, s) => sum + s.length, 0) / totalSentences;
    const complexityDistribution = analysis.reduce((acc, s) => {
      acc[s.complexity] = (acc[s.complexity] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const averageScore = analysis.reduce((sum, s) => sum + s.score, 0) / totalSentences;
    const sentencesWithIssues = analysis.filter(s => s.issues.length > 0).length;

    return {
      totalSentences,
      averageLength: Math.round(averageLength),
      complexityDistribution,
      averageScore: Math.round(averageScore),
      sentencesWithIssues,
      varietyScore: Object.keys(complexityDistribution).length * 25 // Max 100 for 4 types
    };
  };

  const stats = getOverallStats();

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'simple':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'compound':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'complex':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'compound-complex':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Sentence Analyzer</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Real-time sentence structure analysis</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowPatterns(!showPatterns)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                showPatterns 
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600'
              }`}
            >
              <Eye className="h-4 w-4 inline mr-1" />
              Patterns
            </button>
            {isAnalyzing && <RefreshCw className="h-4 w-4 animate-spin text-blue-500" />}
          </div>
        </div>
      </div>

      {/* Overall Statistics */}
      {stats && (
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Overall Statistics</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalSentences}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Sentences</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.averageLength}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Avg. Words</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${getScoreColor(stats.averageScore)}`}>{stats.averageScore}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Avg. Score</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${getScoreColor(stats.varietyScore)}`}>{stats.varietyScore}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Variety Score</div>
            </div>
          </div>

          {/* Complexity Distribution */}
          <div className="mt-4">
            <h5 className="font-medium text-gray-900 dark:text-white mb-2">Sentence Complexity Distribution</h5>
            <div className="flex flex-wrap gap-2">
              {Object.entries(stats.complexityDistribution).map(([complexity, count]) => (
                <span
                  key={complexity}
                  className={`px-3 py-1 rounded-full text-sm font-medium border ${getComplexityColor(complexity)}`}
                >
                  {complexity}: {count}
                </span>
              ))}
            </div>
          </div>

          {/* Issues Summary */}
          {stats.sentencesWithIssues > 0 && (
            <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                <span className="text-sm font-medium text-amber-800 dark:text-amber-200">
                  {stats.sentencesWithIssues} sentence{stats.sentencesWithIssues !== 1 ? 's' : ''} need{stats.sentencesWithIssues === 1 ? 's' : ''} attention
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Pattern Analysis */}
      {showPatterns && patterns.length > 0 && (
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Repetitive Patterns</h4>
          <div className="space-y-3">
            {patterns.map((pattern, index) => (
              <div key={index} className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-yellow-800 dark:text-yellow-200">{pattern.pattern}</span>
                      <span className="text-xs bg-yellow-200 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded-full">
                        Used {pattern.count} times
                      </span>
                    </div>
                    <p className="text-sm text-yellow-700 dark:text-yellow-300 mb-2">{pattern.suggestion}</p>
                    <div className="text-xs text-yellow-600 dark:text-yellow-400">
                      <span className="font-medium">Examples:</span> {pattern.examples.slice(0, 2).join(', ')}
                      {pattern.examples.length > 2 && '...'}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Individual Sentence Analysis */}
      <div className="p-6">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Individual Sentences</h4>
        
        {isAnalyzing ? (
          <div className="text-center py-8">
            <RefreshCw className="h-8 w-8 animate-spin text-blue-500 mx-auto mb-2" />
            <p className="text-gray-600 dark:text-gray-400">Analyzing sentence structure...</p>
          </div>
        ) : analysis.length > 0 ? (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {analysis.map((sentence, index) => (
              <div
                key={index}
                className={`p-4 border rounded-lg transition-colors cursor-pointer ${
                  selectedSentence === index
                    ? 'border-blue-300 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-600'
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                }`}
                onClick={() => setSelectedSentence(selectedSentence === index ? null : index)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getComplexityColor(sentence.complexity)}`}>
                        {sentence.complexity}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {sentence.length} words
                      </span>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${getScoreBgColor(sentence.score)} ${getScoreColor(sentence.score)}`}>
                        {sentence.score}/100
                      </div>
                    </div>
                    <p className="text-sm text-gray-900 dark:text-white mb-2">"{sentence.sentence}"</p>
                    
                    {/* Issues */}
                    {sentence.issues.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-2">
                        {sentence.issues.map((issue, issueIndex) => (
                          <span
                            key={issueIndex}
                            className="inline-flex items-center space-x-1 px-2 py-1 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 rounded-full text-xs"
                          >
                            <AlertCircle className="h-3 w-3" />
                            <span>{issue}</span>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="ml-3">
                    {sentence.issues.length === 0 ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                </div>

                {/* Expanded Details */}
                {selectedSentence === index && sentence.suggestions.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                    <h5 className="font-medium text-gray-900 dark:text-white mb-2">Suggestions:</h5>
                    <div className="space-y-2">
                      {sentence.suggestions.map((suggestion, suggestionIndex) => (
                        <div
                          key={suggestionIndex}
                          className="p-2 bg-green-50 dark:bg-green-900/20 rounded border border-green-200 dark:border-green-800"
                        >
                          <p className="text-sm text-green-800 dark:text-green-200">{suggestion}</p>
                          {onSuggestionApply && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onSuggestionApply(sentence.sentence, suggestion);
                              }}
                              className="mt-2 px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                            >
                              Apply Suggestion
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : content.trim().length < 5 ? (
          <div className="text-center py-8">
            <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">Write at least 5 words to analyze sentence structure</p>
          </div>
        ) : (
          <div className="text-center py-8">
            <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">No sentences to analyze</p>
          </div>
        )}
      </div>

      {/* Tips Section */}
      <div className="border-t border-gray-200 dark:border-gray-700 p-6">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Sentence Variety Tips</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h5 className="font-medium text-blue-800 dark:text-blue-200 mb-1">Mix Sentence Types</h5>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Use a variety of simple, compound, and complex sentences to create engaging rhythm.
            </p>
          </div>
          <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <h5 className="font-medium text-green-800 dark:text-green-200 mb-1">Vary Sentence Length</h5>
            <p className="text-sm text-green-700 dark:text-green-300">
              Combine short, punchy sentences with longer, more detailed ones for better flow.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SentenceAnalyzer;
