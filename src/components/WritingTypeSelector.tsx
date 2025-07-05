import React from 'react';
import { BookOpen, MessageSquare, Lightbulb, FileText, Users, Sparkles } from 'lucide-react';

interface WritingType {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  examples: string[];
}

interface WritingTypeSelectorProps {
  selectedType: string;
  onTypeSelect: (type: string) => void;
}

const writingTypes: WritingType[] = [
  {
    id: 'narrative',
    title: 'Tell a Story',
    description: 'Share exciting adventures and tales!',
    icon: <BookOpen className="h-8 w-8" />,
    color: 'primary',
    examples: ['Adventure stories', 'Fairy tales', 'Personal experiences']
  },
  {
    id: 'persuasive',
    title: 'Convince Others',
    description: 'Share your opinions and convince friends!',
    icon: <MessageSquare className="h-8 w-8" />,
    color: 'success',
    examples: ['Why we need longer recess', 'Best pet to have', 'Favorite season']
  },
  {
    id: 'argumentative',
    title: 'Both Sides Writing',
    description: 'Look at different points of view!',
    icon: <Users className="h-8 w-8" />,
    color: 'magic',
    examples: ['School uniforms debate', 'Technology in classrooms', 'Homework policies']
  },
  {
    id: 'expository',
    title: 'Explain Things',
    description: 'Teach others about cool topics!',
    icon: <Lightbulb className="h-8 w-8" />,
    color: 'sunshine',
    examples: ['How to make friends', 'Why exercise is important', 'How plants grow']
  },
  {
    id: 'descriptive',
    title: 'Paint with Words',
    description: 'Describe amazing places and things!',
    icon: <Sparkles className="h-8 w-8" />,
    color: 'sky',
    examples: ['Your dream bedroom', 'A magical forest', 'The perfect day']
  },
  {
    id: 'reflective',
    title: 'Think About It',
    description: 'Share your thoughts and feelings!',
    icon: <FileText className="h-8 w-8" />,
    color: 'fun',
    examples: ['What makes you proud', 'A lesson you learned', 'Your biggest dream']
  }
];

export function WritingTypeSelector({ selectedType, onTypeSelect }: WritingTypeSelectorProps) {
  const getColorClasses = (color: string) => {
    const colorMap = {
      primary: 'from-primary-400 to-primary-600 border-primary-200 hover:border-primary-300',
      success: 'from-success-400 to-success-600 border-success-200 hover:border-success-300',
      magic: 'from-magic-400 to-magic-600 border-magic-200 hover:border-magic-300',
      sunshine: 'from-sunshine-400 to-sunshine-600 border-sunshine-200 hover:border-sunshine-300',
      sky: 'from-sky-400 to-sky-600 border-sky-200 hover:border-sky-300',
      fun: 'from-fun-400 to-fun-600 border-fun-200 hover:border-fun-300'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.primary;
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-kid-3xl font-display font-bold text-neutral-800 mb-4">
          What kind of writing adventure today? 🚀
        </h2>
        <p className="text-kid-lg font-body text-neutral-600">
          Pick your favorite type and let's start creating!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {writingTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => onTypeSelect(type.id)}
            className={`
              relative group p-6 rounded-kid-lg border-2 text-left transition-all duration-300
              hover:scale-105 hover:shadow-bounce active:scale-95
              ${selectedType === type.id 
                ? `bg-gradient-to-br ${getColorClasses(type.color).split(' ').slice(0, 2).join(' ')} text-white shadow-bounce` 
                : `bg-white ${getColorClasses(type.color).split(' ').slice(2).join(' ')} hover:shadow-fun`
              }
            `}
          >
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10 opacity-50"></div>
            
            <div className="relative z-10">
              {/* Icon */}
              <div className={`
                w-16 h-16 rounded-kid flex items-center justify-center mb-4 transition-transform group-hover:scale-110
                ${selectedType === type.id ? 'bg-white/20 text-white' : `bg-${type.color}-100 text-${type.color}-600`}
              `}>
                {type.icon}
              </div>

              {/* Title and Description */}
              <h3 className={`
                text-kid-xl font-display font-bold mb-2
                ${selectedType === type.id ? 'text-white' : 'text-neutral-800'}
              `}>
                {type.title}
              </h3>
              
              <p className={`
                text-kid-base font-body mb-4
                ${selectedType === type.id ? 'text-white/90' : 'text-neutral-600'}
              `}>
                {type.description}
              </p>

              {/* Examples */}
              <div className="space-y-1">
                <p className={`
                  text-kid-sm font-body font-bold
                  ${selectedType === type.id ? 'text-white/80' : 'text-neutral-500'}
                `}>
                  Examples:
                </p>
                <ul className="space-y-1">
                  {type.examples.map((example, index) => (
                    <li 
                      key={index}
                      className={`
                        text-kid-sm font-body flex items-center
                        ${selectedType === type.id ? 'text-white/70' : 'text-neutral-500'}
                      `}
                    >
                      <span className="mr-2">•</span>
                      {example}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Selection indicator */}
              {selectedType === type.id && (
                <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
