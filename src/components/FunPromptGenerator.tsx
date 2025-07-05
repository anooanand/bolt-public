import React, { useState, useEffect } from 'react';
import { Shuffle, Sparkles, Wand2, Gift, Lightbulb, Star } from 'lucide-react';

interface FunPromptGeneratorProps {
  textType: string;
  onPromptGenerated: (prompt: string) => void;
  onCustomPrompt: (prompt: string) => void;
  currentPrompt?: string;
}

interface PromptTemplate {
  category: string;
  templates: string[];
  emoji: string;
  color: string;
}

const promptTemplates: Record<string, PromptTemplate> = {
  narrative: {
    category: 'Story Adventures',
    emoji: '📚',
    color: 'primary',
    templates: [
      "Write about a magical day when you discovered you could talk to animals! What would they tell you?",
      "Imagine you found a secret door in your bedroom that leads to another world. What's on the other side?",
      "Tell the story of a superhero kid who saves the day at school. What's their special power?",
      "Write about the most amazing birthday party ever - but something unexpected happens!",
      "Create a story about a friendly dragon who lives in your backyard. What adventures do you have together?"
    ]
  },
  persuasive: {
    category: 'Convince Me!',
    emoji: '💪',
    color: 'success',
    templates: [
      "Convince your parents why you should be allowed to have a pet dinosaur!",
      "Persuade your teacher that homework should be done through video games. What are your best arguments?",
      "Argue why kids should be allowed to design their own school uniforms. What would yours look like?",
      "Convince your family that ice cream should be a breakfast food. What are the benefits?"
    ]
  },
  descriptive: {
    category: 'Paint with Words',
    emoji: '🎨',
    color: 'magic',
    templates: [
      "Describe your dream bedroom in such detail that anyone could build it exactly as you imagine!",
      "Paint a picture with words of the most beautiful place you've ever seen or imagined.",
      "Describe the perfect snow day - what does everything look, sound, and feel like?",
      "Write about the most delicious meal ever created. Make your reader's mouth water!"
    ]
  }
};

export function FunPromptGenerator({ 
  textType, 
  onPromptGenerated, 
  onCustomPrompt, 
  currentPrompt 
}: FunPromptGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customPromptText, setCustomPromptText] = useState('');

  const template = promptTemplates[textType] || promptTemplates.narrative;

  const generateRandomPrompt = async () => {
    setIsGenerating(true);
    
    // Add a fun delay to build anticipation
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const randomPrompt = template.templates[Math.floor(Math.random() * template.templates.length)];
    onPromptGenerated(randomPrompt);
    setIsGenerating(false);
  };

  const handleCustomPromptSubmit = () => {
    if (customPromptText.trim()) {
      onCustomPrompt(customPromptText.trim());
      setCustomPromptText('');
      setShowCustomInput(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-kid-2xl font-display font-bold text-neutral-800 mb-2">
          {template.emoji} {template.category}
        </h2>
        <p className="text-kid-lg font-body text-neutral-600">
          Ready for an awesome writing challenge?
        </p>
      </div>

      {/* Current prompt display */}
      {currentPrompt && (
        <div className="bg-gradient-to-r from-primary-400 to-magic-400 rounded-kid-lg p-6 text-white shadow-bounce">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <Lightbulb className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h3 className="text-kid-lg font-display font-bold mb-2">
                Your Writing Challenge:
              </h3>
              <p className="text-kid-base font-body leading-relaxed">
                {currentPrompt}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Generate new prompt button */}
        <button
          onClick={generateRandomPrompt}
          disabled={isGenerating}
          className={`
            flex-1 relative overflow-hidden
            bg-gradient-to-r from-${template.color}-400 to-${template.color}-600
            text-white font-display font-bold text-kid-lg
            px-6 py-4 rounded-kid-lg shadow-bounce
            hover:scale-105 active:scale-95 transition-all duration-300
            disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none
          `}
        >
          <div className="relative z-10 flex items-center justify-center space-x-3">
            {isGenerating ? (
              <>
                <Wand2 className="h-6 w-6 animate-spin" />
                <span>Creating Magic...</span>
              </>
            ) : (
              <>
                <Shuffle className="h-6 w-6" />
                <span>Surprise Me! ✨</span>
              </>
            )}
          </div>
        </button>

        {/* Custom prompt button */}
        <button
          onClick={() => setShowCustomInput(!showCustomInput)}
          className="
            flex-1 bg-white border-2 border-neutral-200 hover:border-neutral-300
            text-neutral-700 font-display font-bold text-kid-lg
            px-6 py-4 rounded-kid-lg shadow-fun
            hover:scale-105 active:scale-95 transition-all duration-300
            flex items-center justify-center space-x-3
          "
        >
          <Gift className="h-6 w-6" />
          <span>I Have My Own Idea! 💡</span>
        </button>
      </div>

      {/* Custom prompt input */}
      {showCustomInput && (
        <div className="bg-white border-2 border-neutral-200 rounded-kid-lg p-6 shadow-fun animate-celebrate">
          <h3 className="text-kid-lg font-display font-bold text-neutral-800 mb-3">
            Share Your Amazing Idea! 🌟
          </h3>
          <div className="space-y-4">
            <textarea
              value={customPromptText}
              onChange={(e) => setCustomPromptText(e.target.value)}
              placeholder="What would you like to write about today? Be as creative as you want!"
              className="
                w-full h-32 p-4 border-2 border-neutral-200 rounded-kid
                text-kid-base font-body resize-none
                focus:border-primary-400 focus:ring-2 focus:ring-primary-200 focus:outline-none
                transition-colors
              "
            />
            <div className="flex space-x-3">
              <button
                onClick={handleCustomPromptSubmit}
                disabled={!customPromptText.trim()}
                className="
                  bg-gradient-to-r from-success-400 to-success-600
                  text-white font-display font-bold text-kid-base
                  px-6 py-3 rounded-kid shadow-success
                  hover:scale-105 active:scale-95 transition-all duration-300
                  disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                  flex items-center space-x-2
                "
              >
                <Star className="h-5 w-5" />
                <span>Let's Write This!</span>
              </button>
              <button
                onClick={() => {
                  setShowCustomInput(false);
                  setCustomPromptText('');
                }}
                className="
                  bg-neutral-200 hover:bg-neutral-300
                  text-neutral-700 font-display font-bold text-kid-base
                  px-6 py-3 rounded-kid
                  hover:scale-105 active:scale-95 transition-all duration-300
                "
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
