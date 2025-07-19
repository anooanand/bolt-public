import React, { useState, useEffect, useCallback } from 'react';
import { BookOpen, Star, TrendingUp, Search, Plus, Check, X } from 'lucide-react';

interface VocabularyWord {
  word: string;
  definition: string;
  example: string;
  difficulty: 'basic' | 'intermediate' | 'advanced';
  category: string;
  synonyms?: string[];
  usage_tip?: string;
}

interface VocabularyCategory {
  category: string;
  words: VocabularyWord[];
  description: string;
}

interface VocabularyBuilderProps {
  textType: string;
  currentContent: string;
  onWordSelect: (word: string) => void;
  className?: string;
}

interface WordSuggestion {
  original: string;
  suggestions: string[];
  context: string;
  reason: string;
}

export const VocabularyBuilder: React.FC<VocabularyBuilderProps> = ({
  textType,
  currentContent,
  onWordSelect,
  className = ''
}) => {
  const [vocabularyData, setVocabularyData] = useState<VocabularyCategory[]>([]);
  const [wordSuggestions, setWordSuggestions] = useState<WordSuggestion[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedWords, setSelectedWords] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState<'categories' | 'suggestions' | 'search'>('categories');

  // Fetch vocabulary data based on text type
  const fetchVocabularyData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/.netlify/functions/ai-operations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          operation: 'getTextTypeVocabulary',
          textType,
          content: currentContent
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.categories) {
          setVocabularyData(data.categories);
        }
      }
    } catch (error) {
      console.error('Error fetching vocabulary data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [textType, currentContent]);

  // Fetch vocabulary enhancement suggestions
  const fetchVocabularySuggestions = useCallback(async () => {
    if (currentContent.trim().length < 50) return;

    try {
      const response = await fetch('/.netlify/functions/ai-operations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          operation: 'enhanceVocabulary',
          content: currentContent,
          textType
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.suggestions) {
          setWordSuggestions(data.suggestions);
        }
      }
    } catch (error) {
      console.error('Error fetching vocabulary suggestions:', error);
    }
  }, [currentContent, textType]);

  useEffect(() => {
    fetchVocabularyData();
  }, [fetchVocabularyData]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchVocabularySuggestions();
    }, 1000);

    return () => clearTimeout(debounceTimer);
  }, [fetchVocabularySuggestions]);

  const handleWordSelect = (word: string) => {
    setSelectedWords(prev => new Set([...prev, word]));
    onWordSelect(word);
  };

  const getDifficultyColor = (difficulty: VocabularyWord['difficulty']) => {
    switch (difficulty) {
      case 'basic':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'advanced':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDifficultyIcon = (difficulty: VocabularyWord['difficulty']) => {
    switch (difficulty) {
      case 'basic':
        return <Star className="h-3 w-3" />;
      case 'intermediate':
        return <TrendingUp className="h-3 w-3" />;
      case 'advanced':
        return <BookOpen className="h-3 w-3" />;
      default:
        return <Star className="h-3 w-3" />;
    }
  };

  const filteredWords = vocabularyData
    .filter(category => selectedCategory === 'all' || category.category === selectedCategory)
    .flatMap(category => category.words)
    .filter(word => 
      searchTerm === '' || 
      word.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
      word.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
      word.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const categories = vocabularyData.map(cat => cat.category);

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Vocabulary Builder</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Enhance your {textType} writing</p>
            </div>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {selectedWords.size} words selected
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mt-4 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('categories')}
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'categories'
                ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Categories
          </button>
          <button
            onClick={() => setActiveTab('suggestions')}
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'suggestions'
                ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Suggestions ({wordSuggestions.length})
          </button>
          <button
            onClick={() => setActiveTab('search')}
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'search'
                ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Search
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'categories' && (
          <div>
            {/* Category Filter */}
            <div className="mb-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Words Grid */}
            <div className="grid grid-cols-1 gap-3 max-h-96 overflow-y-auto">
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto"></div>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">Loading vocabulary...</p>
                </div>
              ) : filteredWords.length > 0 ? (
                filteredWords.map((word, index) => (
                  <div
                    key={index}
                    className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-purple-300 dark:hover:border-purple-500 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-semibold text-gray-900 dark:text-white">{word.word}</h4>
                          <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(word.difficulty)}`}>
                            {getDifficultyIcon(word.difficulty)}
                            <span>{word.difficulty}</span>
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{word.definition}</p>
                        <div className="text-xs text-gray-500 dark:text-gray-500 mb-2">
                          <span className="font-medium">Example:</span> {word.example}
                        </div>
                        {word.usage_tip && (
                          <div className="text-xs text-purple-600 dark:text-purple-400">
                            <span className="font-medium">Tip:</span> {word.usage_tip}
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => handleWordSelect(word.word)}
                        className={`ml-3 p-2 rounded-lg transition-colors ${
                          selectedWords.has(word.word)
                            ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400'
                            : 'bg-gray-100 text-gray-600 hover:bg-purple-100 hover:text-purple-600 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-purple-900 dark:hover:text-purple-400'
                        }`}
                      >
                        {selectedWords.has(word.word) ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">No vocabulary words found for this category.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'suggestions' && (
          <div>
            <div className="mb-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Based on your current writing, here are some vocabulary improvements:
              </p>
            </div>

            <div className="space-y-4 max-h-96 overflow-y-auto">
              {wordSuggestions.length > 0 ? (
                wordSuggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-sm text-gray-500 dark:text-gray-400">Replace:</span>
                          <span className="font-medium text-red-600 dark:text-red-400">"{suggestion.original}"</span>
                        </div>
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-sm text-gray-500 dark:text-gray-400">With:</span>
                          <div className="flex flex-wrap gap-2">
                            {suggestion.suggestions.map((word, wordIndex) => (
                              <button
                                key={wordIndex}
                                onClick={() => handleWordSelect(word)}
                                className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded text-sm hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
                              >
                                {word}
                              </button>
                            ))}
                          </div>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{suggestion.reason}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">
                    {currentContent.trim().length < 50 
                      ? 'Write more content to get vocabulary suggestions.'
                      : 'No vocabulary improvements suggested at this time.'
                    }
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'search' && (
          <div>
            {/* Search Input */}
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search for words, definitions, or categories..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            {/* Search Results */}
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {searchTerm && filteredWords.length > 0 ? (
                filteredWords.map((word, index) => (
                  <div
                    key={index}
                    className="p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-purple-300 dark:hover:border-purple-500 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-medium text-gray-900 dark:text-white">{word.word}</h4>
                          <span className="text-xs text-gray-500 dark:text-gray-400">({word.category})</span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{word.definition}</p>
                      </div>
                      <button
                        onClick={() => handleWordSelect(word.word)}
                        className="ml-3 p-1 rounded hover:bg-purple-100 dark:hover:bg-purple-900 transition-colors"
                      >
                        <Plus className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                      </button>
                    </div>
                  </div>
                ))
              ) : searchTerm ? (
                <div className="text-center py-8">
                  <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">No words found matching "{searchTerm}"</p>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">Start typing to search for vocabulary words</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Selected Words Summary */}
      {selectedWords.size > 0 && (
        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Check className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {selectedWords.size} word{selectedWords.size !== 1 ? 's' : ''} selected
              </span>
            </div>
            <button
              onClick={() => setSelectedWords(new Set())}
              className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              Clear all
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {Array.from(selectedWords).map(word => (
              <span
                key={word}
                className="inline-flex items-center space-x-1 px-2 py-1 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 rounded-full text-xs"
              >
                <span>{word}</span>
                <button
                  onClick={() => setSelectedWords(prev => {
                    const newSet = new Set(prev);
                    newSet.delete(word);
                    return newSet;
                  })}
                  className="hover:text-purple-600 dark:hover:text-purple-400"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VocabularyBuilder;
