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
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border-4 border-blue-300 dark:border-blue-700">
        <div className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 p-6 border-b-4 border-blue-300 dark:border-blue-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-4 shadow-lg">
                <Rocket className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">Choose Your Story Type!</h2>
                <p className="text-gray-700 dark:text-gray-300 mt-1 font-medium">
                  What kind of writing adventure do you want to go on today?
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors bg-white dark:bg-gray-700 p-2 rounded-full shadow-md hover:shadow-lg transform hover:scale-110 transition-all duration-300"
            >
              <X className="w-6 h-6" />
            </p>
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
                  className="p-6 border-4 border-gray-200 dark:border-gray-600 rounded-2xl hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 text-left group transform hover:scale-105 hover:shadow-xl bg-white dark:bg-gray-800"
                >
                  <div className="flex items-center gap-4 mb-3">
                    <div className="p-3 bg-gradient-to-r from-blue-200 to-purple-200 dark:from-blue-900/50 dark:to-purple-900/50 rounded-xl group-hover:from-blue-300 group-hover:to-purple-300 dark:group-hover:from-blue-800/60 dark:group-hover:to-purple-800/60 transition-colors shadow-md">
                      <IconComponent className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="font-bold text-xl text-gray-900 dark:text-white">{type.label}</h3>
                  </div>
                  <p className="text-base text-gray-700 dark:text-gray-300 font-medium">{type.description}</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
