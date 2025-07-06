import React from 'react';
import { X, BookOpen, Lightbulb, MessageSquare, Megaphone, ScrollText, Sparkles, Newspaper, Mail, Calendar, Rocket, Puzzle, Wand, Compass, MapPin, Target } from 'lucide-react';

interface WritingTypeSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectType: (type: string) => void;
}

const writingTypes = [
  { value: 'narrative', label: 'Story Adventure', icon: Rocket, description: 'Create exciting tales with heroes and twists!' },
  { value: 'persuasive', label: 'Convince Me!', icon: Megaphone, description: 'Share your strong ideas and get others to agree!' },
  { value: 'expository', label: 'Explain It All', icon: Lightbulb, description: 'Teach others about cool topics with clear facts!' },
  { value: 'reflective', label: 'My Thoughts & Feelings', icon: Sparkles, description: 'Explore your own experiences and what you learned!' },
  { value: 'descriptive', label: 'Paint with Words', icon: Wand, description: 'Use amazing words to describe people, places, and things!' },
  { value: 'recount', label: 'What Happened Next?', icon: Calendar, description: 'Tell about events in the order they happened!' },
  { value: 'discursive', label: 'Two Sides of the Story', icon: MessageSquare, description: 'Look at different ideas about a topic, then share your view!' },
  { value: 'news report', label: 'Breaking News!', icon: Newspaper, description: 'Report the facts like a real journalist!' },
  { value: 'letter', label: 'Send a Message', icon: Mail, description: 'Write a friendly note or an important message!' },
  { value: 'diary entry', label: 'Secret Journal', icon: BookOpen, description: 'Write down your daily adventures and feelings!' }
];

export function WritingTypeSelectionModal({ isOpen, onClose, onSelectType }: WritingTypeSelectionModalProps) {
  if (!isOpen) return null;

  const handleSelectType = (type: string) => {
    onSelectType(type);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Choose Your Writing Adventure!
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6">
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Pick a writing challenge that sounds fun! Each one helps you become a super writer.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {writingTypes.map((type) => {
              const IconComponent = type.icon;
              return (
                <button
                  key={type.value}
                  onClick={() => handleSelectType(type.value)}
                  className="flex items-start p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 text-left group"
                >
                  <div className="flex-shrink-0 mr-4">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50 transition-colors">
                      <IconComponent className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      {type.label}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {type.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}



