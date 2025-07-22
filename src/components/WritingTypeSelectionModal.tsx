// Enhanced Writing Type Selection Modal - Copy and paste this to replace your existing WritingTypeSelectionModal.tsx

import React, { useState } from 'react';
import { X, BookOpen, Lightbulb, MessageSquare, Megaphone, ScrollText, Sparkles, Newspaper, Mail, Calendar, Rocket, Puzzle, Wand, Compass, MapPin, Target, Mic, Search, Filter, Star, Heart, Zap, Crown, Gem } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface WritingTypeSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectType: (type: string) => void;
}

const writingTypes = [
  { 
    value: 'narrative', 
    label: 'Narrative', 
    icon: Rocket, 
    description: 'Create exciting tales with heroes and twists!',
    color: 'from-blue-400 to-purple-500',
    bgColor: 'from-blue-50 to-purple-50',
    borderColor: 'border-blue-300',
    difficulty: 'Medium',
    popular: true
  },
  { 
    value: 'persuasive', 
    label: 'Persuasive', 
    icon: Megaphone, 
    description: 'Share your strong ideas and get others to agree!',
    color: 'from-orange-400 to-red-500',
    bgColor: 'from-orange-50 to-red-50',
    borderColor: 'border-orange-300',
    difficulty: 'Hard',
    popular: false
  },
  { 
    value: 'expository', 
    label: 'Expository / Informative', 
    icon: Lightbulb, 
    description: 'Teach others about cool topics with clear facts!',
    color: 'from-yellow-400 to-orange-500',
    bgColor: 'from-yellow-50 to-orange-50',
    borderColor: 'border-yellow-300',
    difficulty: 'Medium',
    popular: true
  },
  { 
    value: 'reflective', 
    label: 'Reflective', 
    icon: Sparkles, 
    description: 'Explore your own experiences and what you learned!',
    color: 'from-purple-400 to-pink-500',
    bgColor: 'from-purple-50 to-pink-50',
    borderColor: 'border-purple-300',
    difficulty: 'Easy',
    popular: false
  },
  { 
    value: 'descriptive', 
    label: 'Descriptive', 
    icon: Wand, 
    description: 'Use amazing words to describe people, places, and things!',
    color: 'from-green-400 to-teal-500',
    bgColor: 'from-green-50 to-teal-50',
    borderColor: 'border-green-300',
    difficulty: 'Easy',
    popular: true
  },
  { 
    value: 'recount', 
    label: 'Recount', 
    icon: Calendar, 
    description: 'Tell about events in the order they happened!',
    color: 'from-indigo-400 to-blue-500',
    bgColor: 'from-indigo-50 to-blue-50',
    borderColor: 'border-indigo-300',
    difficulty: 'Easy',
    popular: false
  },
  { 
    value: 'discursive', 
    label: 'Discursive', 
    icon: MessageSquare, 
    description: 'Look at different ideas about a topic, then share your view!',
    color: 'from-pink-400 to-rose-500',
    bgColor: 'from-pink-50 to-rose-50',
    borderColor: 'border-pink-300',
    difficulty: 'Hard',
    popular: false
  },
  { 
    value: 'news report', 
    label: 'News Report', 
    icon: Newspaper, 
    description: 'Report the facts like a real journalist!',
    color: 'from-gray-400 to-slate-500',
    bgColor: 'from-gray-50 to-slate-50',
    borderColor: 'border-gray-300',
    difficulty: 'Medium',
    popular: false
  },
  { 
    value: 'letter', 
    label: 'Letter', 
    icon: Mail, 
    description: 'Write a friendly note or an important message!',
    color: 'from-cyan-400 to-blue-500',
    bgColor: 'from-cyan-50 to-blue-50',
    borderColor: 'border-cyan-300',
    difficulty: 'Easy',
    popular: false
  },
  { 
    value: 'diary entry', 
    label: 'Diary Entry', 
    icon: BookOpen, 
    description: 'Write down your daily adventures and feelings!',
    color: 'from-emerald-400 to-green-500',
    bgColor: 'from-emerald-50 to-green-50',
    borderColor: 'border-emerald-300',
    difficulty: 'Easy',
    popular: false
  },
  { 
    value: 'speech', 
    label: 'Speech', 
    icon: Mic, 
    description: 'Deliver a powerful speech to inspire and engage your audience!',
    color: 'from-violet-400 to-purple-500',
    bgColor: 'from-violet-50 to-purple-50',
    borderColor: 'border-violet-300',
    difficulty: 'Hard',
    popular: false
  }
];

export function WritingTypeSelectionModal({ isOpen, onClose, onSelectType }: WritingTypeSelectionModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [showPopularOnly, setShowPopularOnly] = useState(false);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const filteredTypes = writingTypes.filter(type => {
    const matchesSearch = type.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         type.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = selectedDifficulty === 'All' || type.difficulty === selectedDifficulty;
    const matchesPopular = !showPopularOnly || type.popular;
    
    return matchesSearch && matchesDifficulty && matchesPopular;
  });

  const handleTypeSelect = (type: string) => {
    onSelectType(type);
    localStorage.setItem('selectedWritingType', type);
    // Don't navigate here - let the parent component handle the flow
    // The onSelectType callback will handle the next steps
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden border-4 border-blue-300 dark:border-blue-700 relative">
        
        {/* Floating Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-200 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute top-20 right-20 w-16 h-16 bg-pink-200 rounded-full opacity-30 animate-bounce"></div>
          <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-purple-200 rounded-full opacity-15 animate-pulse"></div>
          <div className="absolute bottom-10 right-1/3 w-18 h-18 bg-green-200 rounded-full opacity-25 animate-bounce"></div>
        </div>

        {/* Enhanced Header */}
        <div className="bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 dark:from-blue-900/30 dark:via-purple-900/30 dark:to-pink-900/30 p-8 border-b-4 border-blue-300 dark:border-blue-700 relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-6 shadow-2xl animate-pulse">
                  <Rocket className="h-8 w-8 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                  <Crown className="h-4 w-4 text-white" />
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 mb-2">
                  Choose Your Story Type! ✨
                </h2>
                <p className="text-gray-700 dark:text-gray-300 text-lg font-medium">
                  What kind of writing adventure do you want to go on today?
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors bg-white dark:bg-gray-700 p-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300"
            >
              <X className="w-7 h-7" />
            </button>
          </div>
        </div>

        {/* Enhanced Search and Filter Section */}
        <div className="p-8 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20 border-b-2 border-gray-200 dark:border-gray-600 relative z-10">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search writing types..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-2xl focus:border-blue-500 focus:outline-none text-lg font-medium shadow-lg"
              />
            </div>

            {/* Difficulty Filter */}
            <div className="flex items-center gap-3">
              <Filter className="text-gray-500 h-5 w-5" />
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="px-4 py-3 border-2 border-gray-300 rounded-2xl focus:border-blue-500 focus:outline-none text-lg font-medium shadow-lg"
              >
                <option value="All">All Levels</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            {/* Popular Filter */}
            <button
              onClick={() => setShowPopularOnly(!showPopularOnly)}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-lg shadow-lg transition-all duration-300 transform hover:scale-105 ${
                showPopularOnly 
                  ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white' 
                  : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-yellow-400'
              }`}
            >
              <Star className={`h-5 w-5 ${showPopularOnly ? 'fill-current' : ''}`} />
              Popular
            </button>
          </div>
        </div>
        
        {/* Enhanced Grid Section */}
        <div className="p-8 overflow-y-auto max-h-[60vh] relative z-10">
          {filteredTypes.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-600 mb-3">No writing types found</h3>
              <p className="text-gray-500 text-lg">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTypes.map((type) => {
                const IconComponent = type.icon;
                return (
                  <button
                    key={type.value}
                    onClick={() => handleTypeSelect(type.value)}
                    className={`relative p-8 border-4 ${type.borderColor} rounded-3xl hover:border-opacity-80 bg-gradient-to-br ${type.bgColor} hover:shadow-2xl transition-all duration-300 text-left group transform hover:scale-105 overflow-hidden`}
                  >
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-5">
                      <div className="absolute top-0 right-0 w-20 h-20 bg-current rounded-full -mr-10 -mt-10"></div>
                      <div className="absolute bottom-0 left-0 w-16 h-16 bg-current rounded-full -ml-8 -mb-8"></div>
                    </div>

                    {/* Popular Badge */}
                    {type.popular && (
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center shadow-lg">
                        <Star className="h-3 w-3 mr-1 fill-current" />
                        Popular
                      </div>
                    )}

                    {/* Icon and Title */}
                    <div className="flex items-center gap-4 mb-4 relative z-10">
                      <div className={`p-4 bg-gradient-to-r ${type.color} rounded-2xl group-hover:scale-110 transition-transform shadow-xl`}>
                        <IconComponent className="w-10 h-10 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-1">{type.label}</h3>
                        <div className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${getDifficultyColor(type.difficulty)}`}>
                          {type.difficulty}
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-base text-gray-700 dark:text-gray-300 font-medium leading-relaxed relative z-10">
                      {type.description}
                    </p>

                    {/* Hover Effect Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Enhanced Footer */}
        <div className="bg-gradient-to-r from-gray-100 to-blue-100 dark:from-gray-800 dark:to-blue-900/20 p-6 border-t-2 border-gray-200 dark:border-gray-600 relative z-10">
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
              <Heart className="h-5 w-5 text-pink-500 animate-pulse" />
              <span className="font-medium text-lg">Choose the one that excites you most!</span>
              <Gem className="h-5 w-5 text-purple-500 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}