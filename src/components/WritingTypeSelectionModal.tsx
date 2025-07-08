import React from 'react';
import { X, BookOpen, Lightbulb, MessageSquare, Megaphone, ScrollText, Sparkles, Newspaper, Mail, Calendar, Rocket, Puzzle, Wand, Compass, MapPin, Target, Mic } from 'lucide-react';

interface WritingTypeSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectType: (type: string) => void;
}

const writingTypes = [
  { value: 'narrative', label: 'Narrative', icon: Rocket, description: 'Create exciting tales with heroes and twists!' },
  { value: 'persuasive', label: 'Persuasive', icon: Megaphone, description: 'Share your strong ideas and get others to agree!' },
  { value: 'expository', label: 'Expository / Informative', icon: Lightbulb, description: 'Teach others about cool topics with clear facts!' },
  { value: 'reflective', label: 'Reflective', icon: Sparkles, description: 'Explore your own experiences and what you learned!' },
  { value: 'descriptive', label: 'Descriptive', icon: Wand, description: 'Use amazing words to describe people, places, and things!' },
  { value: 'recount', label: 'Recount', icon: Calendar, description: 'Tell about events in the order they happened!' },
  { value: 'discursive', label: 'Discursive', icon: MessageSquare, description: 'Look at different ideas about a topic, then share your view!' },
  { value: 'news report', label: 'News Report', icon: Newspaper, description: 'Report the facts like a real journalist!' },
  { value: 'letter', label: 'Letter', icon: Mail, description: 'Write a friendly note or an important message!' },
  { value: 'diary entry', label: 'Diary Entry', icon: BookOpen, description: 'Write down your daily adventures and feelings!' },
  { value: 'speech', label: 'Speech', icon: Mic, description: 'Deliver a powerful speech to inspire and engage your audience!' }
];

export function WritingTypeSelectionModal({ isOpen, onClose, onSelectType }: WritingTypeSelectionModalProps) {
  if (!isOpen) return null;

  const handleTypeSelect = (type: string) => {
    onSelectType(type);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Select Writing Type</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Choose the type of writing you'd like to practice. Each type has specific techniques and structures to help you improve.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {writingTypes.map((type) => {
              const IconComponent = type.icon;
              return (
                <button
                  key={type.value}
                  onClick={() => handleTypeSelect(type.value)}
                  className="p-4 border-2 border-gray-200 dark:border-gray-600 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 text-left group"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg group-hover:bg-blue-200 dark:group-hover:bg-blue-800/40 transition-colors">
                      <IconComponent className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{type.label}</h3>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{type.description}</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
