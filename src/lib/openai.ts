import OpenAI from 'openai';

// Create OpenAI client with enhanced error handling
let openai: OpenAI | null = null;

try {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  
  if (apiKey && apiKey !== 'your-openai-api-key-here' && apiKey.trim() !== '') {
    openai = new OpenAI({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true
    });
    console.log('[DEBUG] OpenAI client initialized successfully with GPT-4');
  } else {
    console.warn('[DEBUG] OpenAI API key not configured - AI features will use fallbacks');
  }
} catch (error) {
  console.error('[DEBUG] Failed to initialize OpenAI client:', error);
  openai = null;
}

// Safe function to check if OpenAI is available
export const isOpenAIAvailable = (): boolean => {
  return openai !== null;
};

export async function generatePrompt(textType: string): Promise<string> {
  if (!openai) {
    const fallbackPrompts: { [key: string]: string } = {
      narrative: "Write a story about an unexpected adventure that changed someone's perspective on life.",
      persuasive: "Write an essay arguing for or against allowing students to use smartphones in school.",
      creative: "Write a creative piece about discovering a hidden talent you never knew you had.",
      descriptive: "Describe a bustling marketplace using all five senses to bring the scene to life.",
      informative: "Explain how climate change affects our daily lives and what we can do about it.",
      default: "Write about a topic that interests you, focusing on clear expression of your ideas."
    };
    
    return fallbackPrompts[textType.toLowerCase()] || fallbackPrompts.default;
  }

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are an expert writing teacher creating prompts for Year 5-6 students. Generate an engaging and age-appropriate ${textType} writing prompt.`
        }
      ],
      model: "gpt-4",
      temperature: 0.7,
      max_tokens: 100
    });

    return completion.choices[0].message.content || "Write about a memorable experience.";
  } catch (error) {
    console.error('OpenAI prompt generation error:', error);
    return "Write about a memorable experience that taught you something important.";
  }
}

export async function getWritingFeedback(content: string, textType: string, assistanceLevel: string, feedbackHistory: any[]): Promise<any> {
  if (!openai) {
    return {
      overallComment: "AI feedback is not available without an OpenAI API key. Your writing shows good effort and structure. Keep practicing to improve your skills!",
      feedbackItems: [
        {
          type: "praise",
          area: "effort",
          text: "Great job completing your writing task!",
          suggestionForImprovement: "Continue practicing regularly to build your writing skills."
        },
        {
          type: "suggestion",
          area: "general",
          text: "Focus on clear expression of your ideas.",
          suggestionForImprovement: "Read your work aloud to check if it makes sense."
        }
      ],
      focusForNextTime: ["Continue practicing", "Focus on clear communication", "Review your work before submitting"]
    };
  }

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are an expert writing teacher providing feedback for Year 5-6 students. Analyze this ${textType} writing piece and provide constructive feedback. Consider the student's ${assistanceLevel} assistance level and previous feedback history. Return feedback in this format:
{
  "overallComment": "Brief, encouraging overall assessment",
  "feedbackItems": [
    {
      "type": "praise/suggestion/question/challenge",
      "area": "specific area of writing (e.g., vocabulary, structure)",
      "text": "detailed feedback point",
      "exampleFromText": "relevant example from student's writing (optional)",
      "suggestionForImprovement": "specific suggestion (optional)"
    }
  ],
  "focusForNextTime": ["2-3 specific points to focus on"]
}`
        },
        {
          role: "user",
          content: `Previous feedback history:\n${JSON.stringify(feedbackHistory)}\n\nCurrent text:\n${content}`
        }
      ],
      model: "gpt-4",
      temperature: 0.7,
      max_tokens: 1000
    });

    const responseContent = completion.choices[0].message.content;
    if (!responseContent) {
      throw new Error('Empty response from OpenAI');
    }

    // Parse and validate the response
    const parsed = JSON.parse(responseContent);
    
    // Ensure all required fields are present
    if (!parsed.overallComment || !Array.isArray(parsed.feedbackItems)) {
      throw new Error('Invalid response format: missing required fields');
    }

    return parsed;
  } catch (error) {
    console.error('OpenAI writing feedback error:', error);
    return {
      overallComment: "I'm having trouble analyzing your writing right now. Your work shows good effort - please try again in a moment.",
      feedbackItems: [
        {
          type: "praise",
          area: "effort",
          text: "You've made a good attempt at this writing task.",
          suggestionForImprovement: "Keep practicing to improve your skills."
        }
      ],
      focusForNextTime: ["Try again in a few moments", "Continue practicing", "Focus on clear expression"]
    };
  }
}

export async function identifyCommonMistakes(content: string, textType: string) {
  if (!openai) {
    return {
      overallAssessment: "AI analysis is not available without an OpenAI API key. Your writing shows good effort and understanding of the task.",
      mistakesIdentified: [],
      patternAnalysis: "Unable to analyze patterns without AI assistance. Focus on proofreading your work carefully.",
      priorityFixes: ["Proofread for spelling and grammar", "Check sentence structure", "Ensure ideas flow logically"],
      positiveElements: ["Good effort in completing the task", "Appropriate length", "Clear attempt at the required text type"]
    };
  }

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are an expert writing teacher analyzing a Year 5-6 student's ${textType} writing piece. Identify common mistakes and provide constructive feedback. Return the analysis in this exact JSON format:
{
  "overallAssessment": "Brief overall assessment of the writing",
  "mistakesIdentified": [
    {
      "category": "content/structure/vocabulary/sentences/punctuation/spelling",
      "issue": "Description of the mistake",
      "example": "Example from the text showing the mistake",
      "impact": "How this affects the writing",
      "correction": "How to fix this mistake",
      "preventionTip": "How to avoid this mistake in future"
    }
  ],
  "patternAnalysis": "Analysis of any patterns in mistakes",
  "priorityFixes": ["List", "of", "priority", "fixes"],
  "positiveElements": ["List", "of", "things", "done", "well"]
}`
        },
        {
          role: "user",
          content: content
        }
      ],
      model: "gpt-4",
      temperature: 0.7,
      max_tokens: 1000
    });

    const responseContent = completion.choices[0].message.content;
    if (!responseContent) {
      throw new Error('Empty response from OpenAI');
    }

    // Parse and validate the response
    const parsed = JSON.parse(responseContent);
    
    // Ensure all required fields are present
    if (!parsed.overallAssessment || !Array.isArray(parsed.mistakesIdentified)) {
      throw new Error('Invalid response format: missing required fields');
    }

    return parsed;
  } catch (error) {
    console.error('OpenAI mistake identification error:', error);
    return {
      overallAssessment: "Unable to analyze the writing at this time. Your work shows good effort.",
      mistakesIdentified: [],
      patternAnalysis: "Unable to analyze patterns at this time. Focus on careful proofreading.",
      priorityFixes: ["Proofread carefully", "Check spelling and grammar", "Ensure clear expression"],
      positiveElements: ["Good effort in completing the task", "Appropriate attempt at the text type"]
    };
  }
}

export async function getSynonyms(word: string): Promise<string[]> {
  if (!openai) {
    // Basic synonym fallbacks for common words
    const commonSynonyms: { [key: string]: string[] } = {
      good: ['excellent', 'great', 'wonderful', 'fantastic', 'amazing'],
      bad: ['poor', 'terrible', 'awful', 'dreadful', 'horrible'],
      big: ['large', 'huge', 'enormous', 'massive', 'gigantic'],
      small: ['tiny', 'little', 'miniature', 'petite', 'compact'],
      happy: ['joyful', 'cheerful', 'delighted', 'pleased', 'content'],
      sad: ['unhappy', 'sorrowful', 'melancholy', 'dejected', 'gloomy'],
      fast: ['quick', 'rapid', 'swift', 'speedy', 'hasty'],
      slow: ['gradual', 'leisurely', 'sluggish', 'unhurried', 'deliberate'],
      beautiful: ['lovely', 'gorgeous', 'stunning', 'attractive', 'pretty'],
      ugly: ['unattractive', 'hideous', 'unsightly', 'repulsive', 'grotesque']
    };
    
    return commonSynonyms[word.toLowerCase()] || [`[Synonyms for "${word}" not available without API key]`];
  }

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `Provide 5 age-appropriate synonyms for the word "${word}" suitable for Year 5-6 students. Return only the synonyms as a comma-separated list.`
        }
      ],
      model: "gpt-4",
      temperature: 0.7,
      max_tokens: 50
    });

    const synonyms = completion.choices[0].message.content?.split(',').map(s => s.trim()) || [];
    return synonyms.length > 0 ? synonyms : [`[No synonyms found for "${word}"]`];
  } catch (error) {
    console.error('OpenAI synonym generation error:', error);
    return [`[Synonyms for "${word}" temporarily unavailable]`];
  }
}

export async function rephraseSentence(sentence: string): Promise<string> {
  if (!openai) {
    return `[Rephrasing not available without API key] Original: ${sentence}`;
  }

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `Rephrase this sentence in a way that's suitable for Year 5-6 students while maintaining its meaning: "${sentence}"`
        }
      ],
      model: "gpt-4",
      temperature: 0.7,
      max_tokens: 100
    });

    return completion.choices[0].message.content || sentence;
  } catch (error) {
    console.error('OpenAI sentence rephrasing error:', error);
    return `[Rephrasing temporarily unavailable] ${sentence}`;
  }
}

export async function generateParaphrases(text: string): Promise<any> {
  if (!openai) {
    return {
      suggestions: [{
        original: text,
        alternatives: [`[Paraphrasing not available without API key] ${text}`],
        start: 0,
        end: text.length
      }]
    };
  }

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are an expert writing assistant helping Year 5-6 students improve their writing. Analyze this text and provide alternative phrasings. Return the analysis in this exact JSON format:
{
  "suggestions": [
    {
      "original": "original text segment",
      "alternatives": ["alternative 1", "alternative 2", "alternative 3"],
      "start": 0,
      "end": 10
    }
  ]
}`
        },
        {
          role: "user",
          content: text
        }
      ],
      model: "gpt-4",
      temperature: 0.7,
      max_tokens: 1000
    });

    const responseContent = completion.choices[0].message.content;
    if (!responseContent) {
      throw new Error('Empty response from OpenAI');
    }

    const parsed = JSON.parse(responseContent);
    
    if (!Array.isArray(parsed.suggestions)) {
      throw new Error('Invalid response format: missing suggestions array');
    }

    const suggestions = parsed.suggestions.map((suggestion: any) => {
      if (typeof suggestion.start !== 'number' || typeof suggestion.end !== 'number') {
        return {
          ...suggestion,
          start: 0,
          end: text.length
        };
      }
      return suggestion;
    });

    return { suggestions };
  } catch (error) {
    console.error('OpenAI paraphrase generation error:', error);
    return {
      suggestions: [{
        original: text,
        alternatives: [`[Paraphrasing temporarily unavailable] ${text}`],
        start: 0,
        end: text.length
      }]
    };
  }
}

export async function getWritingStructure(textType: string): Promise<string> {
  if (!openai) {
    const fallbackStructures: { [key: string]: any } = {
      narrative: {
        title: "Guide to Narrative Writing",
        sections: [
          {
            heading: "Structure",
            content: "A narrative should have a clear beginning (setting and characters), middle (problem and events), and end (resolution). Use the story mountain structure to plan your narrative."
          },
          {
            heading: "Language Features",
            content: "Use descriptive language, dialogue, and varied sentence structures. Include sensory details and show emotions through actions and dialogue."
          },
          {
            heading: "Common Mistakes",
            content: "Avoid rushing the story, forgetting to develop characters, and having an unclear ending."
          },
          {
            heading: "Planning Tips",
            content: "Plan your characters, setting, and main problem before writing. Use a story map or timeline to organize events."
          }
        ]
      },
      persuasive: {
        title: "Guide to Persuasive Writing",
        sections: [
          {
            heading: "Structure",
            content: "Start with a clear position statement, provide 2-3 strong arguments with evidence, address counterarguments, and conclude by restating your position."
          },
          {
            heading: "Language Features",
            content: "Use persuasive language, rhetorical questions, facts and statistics, and emotive language to convince your audience."
          },
          {
            heading: "Common Mistakes",
            content: "Avoid weak arguments, lack of evidence, and forgetting to consider the opposing viewpoint."
          },
          {
            heading: "Planning Tips",
            content: "Research your topic, list strong arguments, gather evidence, and consider what your audience thinks."
          }
        ]
      }
    };

    const structure = fallbackStructures[textType.toLowerCase()] || fallbackStructures.narrative;
    return JSON.stringify(structure);
  }

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are an expert writing teacher creating a guide for Year 5-6 students on ${textType} writing. Create a structured guide with sections covering key aspects of this writing type. Return the guide in this exact JSON format:
{
  "title": "Guide to ${textType} Writing",
  "sections": [
    {
      "heading": "Structure",
      "content": "Detailed explanation of the structure for this writing type"
    },
    {
      "heading": "Language Features",
      "content": "Explanation of key language features and techniques"
    },
    {
      "heading": "Common Mistakes",
      "content": "Common mistakes to avoid in this writing type"
    },
    {
      "heading": "Planning Tips",
      "content": "How to plan effectively for this writing type"
    }
  ]
}`
        }
      ],
      model: "gpt-4",
      temperature: 0.7,
      max_tokens: 1000
    });

    const responseContent = completion.choices[0].message.content;
    if (!responseContent) {
      throw new Error('Empty response from OpenAI');
    }

    return responseContent;
  } catch (error) {
    console.error('OpenAI writing structure generation error:', error);
    return JSON.stringify({
      title: `Guide to ${textType} Writing`,
      sections: [
        {
          heading: "Structure",
          content: "Every piece of writing should have a clear beginning, middle, and end. The beginning introduces your main idea, the middle develops it with details, and the end summarizes your key points."
        },
        {
          heading: "Language Features",
          content: "Use descriptive language, varied sentence structures, and appropriate vocabulary for your topic."
        },
        {
          heading: "Common Mistakes",
          content: "Avoid rushing your writing, forgetting to proofread, and using repetitive words or phrases."
        },
        {
          heading: "Planning Tips",
          content: "Before you start writing, take time to brainstorm ideas, create a simple outline, and think about your audience."
        }
      ]
    });
  }
}

export async function evaluateEssay(content: string, textType: string): Promise<any> {
  if (!openai) {
    return {
      overallScore: 7,
      strengths: [
        "Good effort in completing the writing task",
        "Appropriate length for the assignment",
        "Clear attempt at the required text type"
      ],
      areasForImprovement: [
        "Configure OpenAI API key for detailed AI feedback",
        "Continue practicing writing regularly",
        "Review writing guidelines and examples"
      ],
      specificFeedback: {
        structure: "Your writing shows a basic structure. Focus on clear organization with introduction, body, and conclusion.",
        language: "Continue developing your vocabulary and sentence variety. Read widely to improve language skills.",
        ideas: "Your ideas are present. Work on developing them with more details and examples.",
        mechanics: "Proofread carefully for spelling, grammar, and punctuation errors."
      },
      nextSteps: [
        "Practice writing regularly",
        "Read examples of good writing in this style",
        "Focus on one area for improvement at a time"
      ]
    };
  }

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are an expert writing teacher evaluating a Year 5-6 student's ${textType} essay. Provide comprehensive feedback and scoring. Return the evaluation in this exact JSON format:
{
  "overallScore": 7,
  "strengths": [
    "Clear thesis statement",
    "Good use of transition words",
    "Varied sentence structure"
  ],
  "areasForImprovement": [
    "Needs more supporting evidence",
    "Some spelling errors",
    "Conclusion could be stronger"
  ],
  "specificFeedback": {
    "structure": "Detailed feedback on essay structure",
    "language": "Feedback on language use and vocabulary",
    "ideas": "Feedback on ideas and content development",
    "mechanics": "Feedback on grammar, spelling, and punctuation"
  },
  "nextSteps": [
    "Review and correct spelling errors",
    "Add more supporting evidence to main points",
    "Strengthen conclusion by restating main ideas"
  ]
}`
        },
        {
          role: "user",
          content: content
        }
      ],
      model: "gpt-4",
      temperature: 0.7,
      max_tokens: 1000
    });

    const responseContent = completion.choices[0].message.content;
    if (!responseContent) {
      throw new Error('Empty response from OpenAI');
    }

    const parsed = JSON.parse(responseContent);
    
    if (typeof parsed.overallScore !== 'number' || 
        !Array.isArray(parsed.strengths) || 
        !Array.isArray(parsed.areasForImprovement) ||
        !parsed.specificFeedback ||
        !Array.isArray(parsed.nextSteps)) {
      throw new Error('Invalid response format: missing required fields');
    }

    return parsed;
  } catch (error) {
    console.error('OpenAI essay evaluation error:', error);
    return {
      overallScore: 6,
      strengths: [
        "Attempt at addressing the topic",
        "Basic structure present",
        "Shows understanding of the task"
      ],
      areasForImprovement: [
        "Need more development of ideas",
        "Work on grammar and spelling",
        "Improve organization"
      ],
      specificFeedback: {
        structure: "Your essay has a basic structure, but could benefit from clearer organization.",
        language: "Consider using more varied vocabulary and sentence structures.",
        ideas: "Your ideas are present but need more development and supporting details.",
        mechanics: "Review your work for grammar and spelling errors."
      },
      nextSteps: [
        "Review basic grammar and spelling rules",
        "Practice organizing your ideas before writing",
        "Read examples of strong essays in this style"
      ]
    };
  }
}

export async function getTextTypeVocabulary(textType: string, contentSample: string): Promise<any> {
  if (!openai) {
    const fallbackVocabulary: { [key: string]: any } = {
      narrative: {
        textType: "narrative",
        categories: [
          {
            name: "Descriptive Words",
            words: ["vivid", "mysterious", "ancient", "gleaming", "towering"],
            examples: ["The vivid sunset painted the sky.", "The mysterious forest beckoned."]
          },
          {
            name: "Action Verbs",
            words: ["darted", "whispered", "thundered", "crept", "soared"],
            examples: ["She darted through the trees.", "The wind whispered secrets."]
          }
        ],
        phrasesAndExpressions: [
          "Once upon a time",
          "In the blink of an eye",
          "Without warning",
          "To their amazement"
        ],
        transitionWords: ["First", "Then", "Next", "Suddenly", "Finally", "Meanwhile"]
      },
      persuasive: {
        textType: "persuasive",
        categories: [
          {
            name: "Persuasive Words",
            words: ["essential", "crucial", "beneficial", "significant", "vital"],
            examples: ["It is essential that we act now.", "This change would be beneficial."]
          },
          {
            name: "Strong Verbs",
            words: ["demonstrate", "prove", "establish", "confirm", "reveal"],
            examples: ["Studies demonstrate the importance.", "Evidence proves this point."]
          }
        ],
        phrasesAndExpressions: [
          "It is clear that",
          "Without a doubt",
          "The evidence shows",
          "We must consider"
        ],
        transitionWords: ["Furthermore", "However", "Therefore", "In addition", "Nevertheless", "Consequently"]
      }
    };

    return fallbackVocabulary[textType.toLowerCase()] || fallbackVocabulary.narrative;
  }

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are an expert writing teacher providing vocabulary assistance for Year 5-6 students writing a ${textType} piece. Based on the content sample provided, suggest appropriate vocabulary. Return the suggestions in this exact JSON format:
{
  "textType": "${textType}",
  "categories": [
    {
      "name": "Descriptive Words",
      "words": ["vivid", "stunning", "magnificent", "gleaming", "enormous"],
      "examples": ["The vivid sunset painted the sky with stunning colors.", "The magnificent castle stood on the gleaming hill."]
    },
    {
      "name": "Action Verbs",
      "words": ["darted", "soared", "plunged", "vanished", "erupted"],
      "examples": ["The bird soared through the clouds.", "She darted across the busy street."]
    }
  ],
  "phrasesAndExpressions": [
    "In the blink of an eye",
    "As quick as lightning",
    "Without a moment's hesitation",
    "To my surprise"
  ],
  "transitionWords": [
    "First",
    "Next",
    "Then",
    "After that",
    "Finally",
    "However",
    "Although",
    "Because",
    "Therefore",
    "In conclusion"
  ]
}`
        },
        {
          role: "user",
          content: `Text type: ${textType}\n\nContent sample: ${contentSample}`
        }
      ],
      model: "gpt-4",
      temperature: 0.7,
      max_tokens: 1000
    });

    const responseContent = completion.choices[0].message.content;
    if (!responseContent) {
      throw new Error('Empty response from OpenAI');
    }

    const parsed = JSON.parse(responseContent);
    
    if (!parsed.textType || 
        !Array.isArray(parsed.categories) || 
        !Array.isArray(parsed.phrasesAndExpressions) ||
        !Array.isArray(parsed.transitionWords)) {
      throw new Error('Invalid response format: missing required fields');
    }

    return parsed;
  } catch (error) {
    console.error('OpenAI vocabulary generation error:', error);
    return {
      textType: textType,
      categories: [
        {
          name: "General Words",
          words: ["interesting", "important", "different", "special", "amazing"],
          examples: ["This is an interesting topic.", "It's important to remember."]
        }
      ],
      phrasesAndExpressions: [
        "In my opinion",
        "For example",
        "In conclusion",
        "On the other hand"
      ],
      transitionWords: [
        "First", "Second", "Next", "Then", "Finally", "However", "Because", "Therefore"
      ]
    };
  }
}

// Export the client for direct use (with null check)
export { openai };

export default {
  generatePrompt,
  getWritingFeedback,
  identifyCommonMistakes,
  getSynonyms,
  rephraseSentence,
  generateParaphrases,
  getWritingStructure,
  evaluateEssay,
  getTextTypeVocabulary,
  isOpenAIAvailable
};

