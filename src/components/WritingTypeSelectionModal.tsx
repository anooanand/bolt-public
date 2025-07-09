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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-700">
        <div className="bg-indigo-50 dark:bg-indigo-900/10 p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-indigo-600 rounded-md flex items-center justify-center mr-4">
                <Rocket className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Choose Your Writing Type</h2>
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  Select the type of writing you want to work on
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors bg-white dark:bg-gray-700 p-2 rounded-md"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {writingTypes.map((type) => {
              const IconComponent = type.icon;
              return (
                <button
                  key={type.value}
                  onClick={() => handleTypeSelect(type.value)}
                  className="p-5 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-indigo-500 dark:hover:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/10 transition-all duration-300 text-left bg-white dark:bg-gray-800"
                >
                  <div className="flex items-center mb-3">
                    <div className="p-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-md mr-3">
                      <IconComponent className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <h3 className="font-medium text-lg text-gray-900 dark:text-white">{type.label}</h3>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{type.description}</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
