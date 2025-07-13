import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Image, FileText, Lightbulb, CheckSquare } from 'lucide-react';

interface DynamicPromptDisplayProps {
  prompt: string;
  textType: string;
  promptImage?: string; // Optional image URL for image prompts
}

export function DynamicPromptDisplay({ prompt, textType, promptImage }: DynamicPromptDisplayProps) {
  const [showGuidance, setShowGuidance] = useState(false);

  // Text type guidance data
  const textTypeGuidance = {
    narrative: {
      title: "Narrative Writing Tips",
      tips: [
        "Create engaging characters with clear motivations",
        "Establish a vivid setting (time and place)",
        "Develop a clear plot with beginning, middle, and end",
        "Include conflict or tension to drive the story",
        "Use descriptive language and dialogue",
        "Show, don't tell - use actions and dialogue to reveal character",
        "Include a satisfying resolution"
      ],
      checklist: [
        "Who are your main characters?",
        "What is the setting (time and place)?",
        "What is the main conflict or problem?",
        "How will the story resolve?",
        "What emotions do you want readers to feel?"
      ]
    },
    persuasive: {
      title: "Persuasive Writing Tips",
      tips: [
        "State your position clearly in the introduction",
        "Use strong evidence and examples to support your argument",
        "Address counterarguments and refute them",
        "Use persuasive language techniques (rhetorical questions, emotive language)",
        "Structure arguments logically from strongest to weakest",
        "Include a compelling conclusion that reinforces your position"
      ],
      checklist: [
        "What is your main argument or position?",
        "What evidence supports your argument?",
        "What might opponents say, and how will you respond?",
        "What action do you want readers to take?",
        "How will you make an emotional connection?"
      ]
    },
    expository: {
      title: "Expository Writing Tips",
      tips: [
        "Begin with a clear thesis statement",
        "Organize information logically (chronological, cause-effect, compare-contrast)",
        "Use topic sentences for each paragraph",
        "Include specific facts, examples, and details",
        "Use transition words to connect ideas",
        "Maintain an objective, informative tone",
        "Conclude by summarizing key points"
      ],
      checklist: [
        "What is your main topic or thesis?",
        "How will you organize your information?",
        "What key points will you cover?",
        "What examples or evidence will you include?",
        "How will you conclude effectively?"
      ]
    },
    recount: {
      title: "Recount Writing Tips",
      tips: [
        "Use chronological order (time sequence)",
        "Include specific details about when, where, who, what",
        "Use past tense consistently",
        "Include personal observations and reactions",
        "Use time connectives (first, then, next, finally)",
        "Focus on significant events and their impact"
      ],
      checklist: [
        "What event are you recounting?",
        "When and where did it happen?",
        "Who was involved?",
        "What happened first, next, then?",
        "Why was this event significant?"
      ]
    },
    descriptive: {
      title: "Descriptive Writing Tips",
      tips: [
        "Use all five senses in your descriptions",
        "Choose specific, vivid adjectives and adverbs",
        "Use figurative language (metaphors, similes)",
        "Organize descriptions spatially or by importance",
        "Create a clear mental image for readers",
        "Use varied sentence structures for rhythm"
      ],
      checklist: [
        "What are you describing?",
        "What does it look, sound, smell, feel, taste like?",
        "What emotions or mood do you want to create?",
        "What details are most important?",
        "How will you organize your description?"
      ]
    }
  };

  const currentGuidance = textTypeGuidance[textType.toLowerCase() as keyof typeof textTypeGuidance] || {
    title: "General Writing Tips",
    tips: [
      "Plan your writing before you start",
      "Use clear, concise language",
      "Organize your ideas logically",
      "Check your spelling and grammar",
      "Read your work aloud to check flow"
    ],
    checklist: [
      "What is your main purpose?",
      "Who is your audience?",
      "What key points will you make?",
      "How will you organize your ideas?",
      "What tone is appropriate?"
    ]
  };

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm mb-4">
      {/* Prompt Display */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center mb-2">
              <FileText className="w-5 h-5 text-blue-500 mr-2" />
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Writing Prompt ({textType})
              </h3>
            </div>
            
            {promptImage && (
              <div className="mb-3">
                <div className="relative inline-block">
                  <img 
                    src={promptImage} 
                    alt="Writing prompt image" 
                    className="max-w-full h-auto max-h-64 rounded-lg border border-gray-300 dark:border-gray-600"
                  />
                  <div className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded text-xs font-semibold flex items-center">
                    <Image className="w-3 h-3 mr-1" />
                    Image Prompt
                  </div>
                </div>
              </div>
            )}
            
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border-l-4 border-blue-400">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {prompt}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Guidance Section */}
      <div className="p-4">
        <button
          onClick={() => setShowGuidance(!showGuidance)}
          className="flex items-center justify-between w-full text-left hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-lg transition-colors"
        >
          <div className="flex items-center">
            <HelpCircle className="w-5 h-5 text-green-500 mr-2" />
            <span className="font-semibold text-gray-800 dark:text-gray-200">
              {currentGuidance.title}
            </span>
          </div>
          {showGuidance ? (
            <ChevronUp className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-500" />
          )}
        </button>

        {showGuidance && (
          <div className="mt-4 space-y-4">
            {/* Writing Tips */}
            <div>
              <div className="flex items-center mb-2">
                <Lightbulb className="w-4 h-4 text-yellow-500 mr-2" />
                <h4 className="font-semibold text-gray-700 dark:text-gray-300">Key Tips</h4>
              </div>
              <ul className="space-y-1">
                {currentGuidance.tips.map((tip, index) => (
                  <li key={index} className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            {/* Planning Checklist */}
            <div>
              <div className="flex items-center mb-2">
                <CheckSquare className="w-4 h-4 text-green-500 mr-2" />
                <h4 className="font-semibold text-gray-700 dark:text-gray-300">Planning Checklist</h4>
              </div>
              <ul className="space-y-1">
                {currentGuidance.checklist.map((item, index) => (
                  <li key={index} className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
