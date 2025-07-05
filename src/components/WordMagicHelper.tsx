import React, { useState, useEffect } from 'react';
import { Wand2, Star, Sparkles, RefreshCw, Heart, Lightbulb, Zap } from 'lucide-react';

interface WordSuggestion {
  word: string;
  meaning: string;
  example: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: 'emotion' | 'action' | 'description' | 'size' | 'general';
}

interface WordMagicHelperProps {
  selectedText?: string;
  onWordSelect?: (word: string) => void;
  onClose?: () => void;
}

// Sample word suggestions database
const wordSuggestions: Record<string, WordSuggestion[]> = {
  'big': [
    { word: 'enormous', meaning: 'really, really big', example: 'The enormous elephant trumpeted loudly', difficulty: 'medium', category: 'size' },
    { word: 'gigantic', meaning: 'super huge', example: 'A gigantic castle stood on the hill', difficulty: 'medium', category: 'size' },
    { word: 'massive', meaning: 'very big and heavy', example: 'The massive rock blocked the path', difficulty: 'easy', category: 'size' },
    { word: 'colossal', meaning: 'amazingly huge', example: 'The colossal statue amazed everyone', difficulty: 'hard', category: 'size' }
  ],
  'small': [
    { word: 'tiny', meaning: 'very small', example: 'A tiny mouse scurried across the floor', difficulty: 'easy', category: 'size' },
    { word: 'miniature', meaning: 'like a small copy', example: 'She had a miniature dollhouse', difficulty: 'medium', category: 'size' },
    { word: 'petite', meaning: 'small and delicate', example: 'The petite fairy danced on the flower', difficulty: 'medium', category: 'size' },
    { word: 'microscopic', meaning: 'so small you need a microscope', example: 'Microscopic creatures live in water', difficulty: 'hard', category: 'size' }
  ],
  'happy': [
    { word: 'joyful', meaning: 'full of happiness', example: 'She felt joyful on her birthday', difficulty: 'easy', category: 'emotion' },
    { word: 'delighted', meaning: 'very pleased and happy', example: 'He was delighted with his present', difficulty: 'medium', category: 'emotion' },
    { word: 'ecstatic', meaning: 'extremely happy', example: 'The team was ecstatic about winning', difficulty: 'medium', category: 'emotion' },
    { word: 'overjoyed', meaning: 'more than happy', example: 'She was overjoyed to see her friend', difficulty: 'easy', category: 'emotion' }
  ],
  'sad': [
    { word: 'gloomy', meaning: 'feeling down and dark', example: 'The rainy day made him feel gloomy', difficulty: 'easy', category: 'emotion' },
    { word: 'melancholy', meaning: 'a gentle kind of sadness', example: 'The melancholy music made her think of home', difficulty: 'hard', category: 'emotion' },
    { word: 'sorrowful', meaning: 'full of sadness', example: 'The sorrowful puppy missed its owner', difficulty: 'medium', category: 'emotion' },
    { word: 'heartbroken', meaning: 'very, very sad', example: 'She was heartbroken when her pet died', difficulty: 'easy', category: 'emotion' }
  ],
  'run': [
    { word: 'sprint', meaning: 'run as fast as you can', example: 'He had to sprint to catch the bus', difficulty: 'easy', category: 'action' },
    { word: 'dash', meaning: 'run quickly for a short time', example: 'She dashed across the playground', difficulty: 'easy', category: 'action' },
    { word: 'gallop', meaning: 'run like a horse', example: 'The children galloped around the yard', difficulty: 'medium', category: 'action' },
    { word: 'scamper', meaning: 'run with quick little steps', example: 'The squirrel scampered up the tree', difficulty: 'medium', category: 'action' }
  ],
  'walk': [
    { word: 'stroll', meaning: 'walk slowly and relaxed', example: 'They strolled through the park', difficulty: 'easy', category: 'action' },
    { word: 'march', meaning: 'walk with big, strong steps', example: 'The soldiers marched in formation', difficulty: 'easy', category: 'action' },
    { word: 'wander', meaning: 'walk around without a plan', example: 'She wandered through the garden', difficulty: 'medium', category: 'action' },
    { word: 'trudge', meaning: 'walk slowly when tired', example: 'He trudged home after the long day', difficulty: 'medium', category: 'action' }
  ],
  'good': [
    { word: 'excellent', meaning: 'really, really good', example: 'She did excellent work on her project', difficulty: 'easy', category: 'general' },
    { word: 'fantastic', meaning: 'amazingly good', example: 'The show was fantastic!', difficulty: 'easy', category: 'general' },
    { word: 'marvelous', meaning: 'wonderfully good', example: 'What a marvelous idea!', difficulty: 'medium', category: 'general' },
    { word: 'spectacular', meaning: 'so good it's like a show', example: 'The fireworks were spectacular', difficulty: 'medium', category: 'general' }
  ],
  'bad': [
    { word: 'awful', meaning: 'really bad', example: 'The weather was awful today', difficulty: 'easy', category: 'general' },
    { word: 'terrible', meaning: 'very bad', example: 'He had a terrible headache', difficulty: 'easy', category: 'general' },
    { word: 'dreadful', meaning: 'bad and scary', example: 'The dreadful storm kept everyone inside', difficulty: 'medium', category: 'general' },
    { word: 'horrendous', meaning: 'extremely bad', example: 'The traffic was horrendous', difficulty: 'hard', category: 'general' }
  ]
};

export function WordMagicHelper({ selectedText, onWordSelect, onClose }: WordMagicHelperProps) {
  const [currentWord, setCurrentWord] = useState('');
  const [suggestions, setSuggestions] = useState<WordSuggestion[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showMagicAnimation, setShowMagicAnimation] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState<WordSuggestion | null>(null);

  // Find suggestions for a word
  const findSuggestions = (word: string): WordSuggestion[] => {
    const cleanWord = word.toLowerCase().trim();
    return wordSuggestions[cleanWord] || [];
  };

  // Handle word search
  const searchForWord = async (word: string) => {
    if (!word.trim()) return;
    
    setIsSearching(true);
    setShowMagicAnimation(true);
    
    // Simulate API call delay for better UX
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newSuggestions = findSuggestions(word);
    setSuggestions(newSuggestions);
    setIsSearching(false);
    setShowMagicAnimation(false);
  };

  // Initialize with selected text
  useEffect(() => {
    if (selectedText) {
      const word = selectedText.trim().toLowerCase();
      setCurrentWord(word);
      searchForWord(word);
    }
  }, [selectedText]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'success';
      case 'medium': return 'sunshine';
      case 'hard': return 'magic';
      default: return 'primary';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'Easy to use! 😊';
      case 'medium': return 'A bit challenging! 🤔';
      case 'hard': return 'Super impressive! 🌟';
      default: return 'Great word!';
    }
  };

  const getCategoryEmoji = (category: string) => {
    switch (category) {
      case 'emotion': return '😊';
      case 'action': return '🏃';
      case 'description': return '🎨';
      case 'size': return '📏';
      default: return '✨';
    }
  };

  const getColorClasses = (color: string) => {
    const colorMap = {
      primary: 'from-primary-400 to-primary-600 border-primary-200 bg-primary-50',
      success: 'from-success-400 to-success-600 border-success-200 bg-success-50',
      magic: 'from-magic-400 to-magic-600 border-magic-200 bg-magic-50',
      sunshine: 'from-sunshine-400 to-sunshine-600 border-sunshine-200 bg-sunshine-50',
      sky: 'from-sky-400 to-sky-600 border-sky-200 bg-sky-50',
      fun: 'from-fun-400 to-fun-600 border-fun-200 bg-fun-50'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.primary;
  };

  return (
    <div className="bg-white rounded-kid-lg shadow-bounce border-2 border-magic-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-magic-400 to-fun-400 p-4 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <Wand2 className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-kid-lg font-display font-bold">
                Word Magic Helper ✨
              </h2>
              <p className="text-kid-sm font-body opacity-90">
                Find amazing words to make your writing sparkle!
              </p>
            </div>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
            >
              <span className="text-white text-lg">×</span>
            </button>
          )}
        </div>
      </div>

      <div className="p-6">
        {/* Word search input */}
        <div className="mb-6">
          <label className="block text-kid-base font-display font-bold text-neutral-800 mb-2">
            What word would you like to improve? 🔍
          </label>
          <div className="flex space-x-2">
            <input
              type="text"
              value={currentWord}
              onChange={(e) => setCurrentWord(e.target.value)}
              placeholder="Type a word like 'big', 'happy', or 'run'..."
              className="
                flex-1 px-4 py-3 border-2 border-neutral-200 rounded-kid
                text-kid-base font-body
                focus:border-magic-400 focus:ring-2 focus:ring-magic-200 focus:outline-none
                transition-colors
              "
              onKeyPress={(e) => e.key === 'Enter' && searchForWord(currentWord)}
            />
            <button
              onClick={() => searchForWord(currentWord)}
              disabled={isSearching || !currentWord.trim()}
              className="
                bg-gradient-to-r from-magic-400 to-fun-400 hover:from-magic-500 hover:to-fun-500
                text-white font-display font-bold text-kid-base
                px-6 py-3 rounded-kid shadow-magic
                hover:scale-105 active:scale-95 transition-all duration-300
                disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                flex items-center space-x-2
              "
            >
              {isSearching ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Searching...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5" />
                  <span>Find Magic Words!</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Magic animation */}
        {showMagicAnimation && (
          <div className="mb-6 text-center">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-magic-100 to-fun-100 rounded-kid p-4 border-2 border-magic-200">
              <Wand2 className="h-6 w-6 text-magic-600 animate-spin" />
              <span className="text-kid-base font-body text-neutral-700">
                Casting word magic spells... ✨
              </span>
            </div>
          </div>
        )}

        {/* Word suggestions */}
        {suggestions.length > 0 && !isSearching && (
          <div className="space-y-4">
            <h3 className="text-kid-lg font-display font-bold text-neutral-800">
              Magic Words for "{currentWord}" 🎩
            </h3>
            
            <div className="grid gap-4">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className={`
                    bg-white border-2 rounded-kid p-4 transition-all duration-300 cursor-pointer
                    hover:scale-102 hover:shadow-fun
                    ${selectedSuggestion === suggestion 
                      ? `${getColorClasses(getDifficultyColor(suggestion.difficulty)).split(' ')[2]} shadow-fun` 
                      : 'border-neutral-200 hover:border-magic-300'
                    }
                  `}
                  onClick={() => setSelectedSuggestion(suggestion)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-kid-lg font-display font-bold text-neutral-800">
                          {suggestion.word}
                        </h4>
                        <span className="text-lg">
                          {getCategoryEmoji(suggestion.category)}
                        </span>
                        <div className={`
                          px-2 py-1 rounded-full text-kid-xs font-body font-bold
                          ${getColorClasses(getDifficultyColor(suggestion.difficulty)).split(' ')[3]}
                          text-${getDifficultyColor(suggestion.difficulty)}-700
                        `}>
                          {getDifficultyLabel(suggestion.difficulty)}
                        </div>
                      </div>
                      
                      <p className="text-kid-base font-body text-neutral-600 mb-2">
                        <strong>Meaning:</strong> {suggestion.meaning}
                      </p>
                      
                      <p className="text-kid-sm font-body text-neutral-500 italic">
                        <strong>Example:</strong> "{suggestion.example}"
                      </p>
                    </div>
                    
                    <div className="flex flex-col space-y-2 ml-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onWordSelect?.(suggestion.word);
                        }}
                        className="
                          bg-gradient-to-r from-success-400 to-primary-400
                          text-white font-display font-bold text-kid-sm
                          px-4 py-2 rounded-kid shadow-success
                          hover:scale-105 active:scale-95 transition-all duration-300
                          flex items-center space-x-2
                        "
                      >
                        <Star className="h-4 w-4" />
                        <span>Use This!</span>
                      </button>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          // Add to favorites functionality
                        }}
                        className="
                          bg-neutral-100 hover:bg-neutral-200 border-2 border-neutral-200
                          text-neutral-700 font-display font-bold text-kid-sm
                          px-4 py-2 rounded-kid
                          hover:scale-105 active:scale-95 transition-all duration-300
                          flex items-center space-x-2
                        "
                      >
                        <Heart className="h-4 w-4" />
                        <span>Save</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No suggestions found */}
        {suggestions.length === 0 && currentWord && !isSearching && (
          <div className="text-center py-8">
            <Lightbulb className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
            <h3 className="text-kid-lg font-display font-bold text-neutral-600 mb-2">
              Hmm, I don't know that word yet! 🤔
            </h3>
            <p className="text-kid-base font-body text-neutral-500 mb-4">
              Try searching for common words like "big", "happy", "run", "good", or "walk"!
            </p>
            <button
              onClick={() => {
                const randomWords = ['big', 'happy', 'run', 'good', 'walk'];
                const randomWord = randomWords[Math.floor(Math.random() * randomWords.length)];
                setCurrentWord(randomWord);
                searchForWord(randomWord);
              }}
              className="
                bg-gradient-to-r from-primary-400 to-magic-400
                text-white font-display font-bold text-kid-base
                px-6 py-3 rounded-kid shadow-fun
                hover:scale-105 active:scale-95 transition-all duration-300
                flex items-center space-x-2 mx-auto
              "
            >
              <RefreshCw className="h-5 w-5" />
              <span>Try a Random Word!</span>
            </button>
          </div>
        )}

        {/* Tips section */}
        <div className="mt-6 bg-gradient-to-r from-sky-50 to-primary-50 rounded-kid p-4 border-2 border-sky-200">
          <div className="flex items-start space-x-3">
            <Zap className="h-6 w-6 text-sky-600 flex-shrink-0 mt-1" />
            <div>
              <h4 className="text-kid-base font-display font-bold text-neutral-800 mb-1">
                Word Magic Tips! 💡
              </h4>
              <ul className="text-kid-sm font-body text-neutral-600 space-y-1">
                <li>• Use easy words when you're starting out</li>
                <li>• Try medium words to challenge yourself</li>
                <li>• Hard words will really impress your readers!</li>
                <li>• Always make sure the new word fits your sentence</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

