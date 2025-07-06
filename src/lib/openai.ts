import OpenAI from 'openai';

// Create OpenAI client with enhanced error handling
let openai: OpenAI | null = null;

try {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  
  if (apiKey && apiKey !== 'your_openai_api_key_here' && apiKey !== 'your-openai-api-key-here' && apiKey.trim() !== '') {
    openai = new OpenAI({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true
    });
    console.log('[DEBUG] OpenAI client initialized successfully with GPT-4');
  } else {
    console.log('[DEBUG] OpenAI API key not configured - AI features will be limited');
  }
} catch (error) {
  console.error('[DEBUG] Failed to initialize OpenAI client:', error);
  openai = null;
}

// Safe function to check if OpenAI is available
export const isOpenAIAvailable = (): boolean => {
  return openai !== null;
};

// Helper function to make OpenAI API calls with error handling
async function makeOpenAICall(messages: any[], maxTokens: number = 1000): Promise<string> {
  if (!openai) {
    throw new Error('OpenAI client not available');
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: messages,
      max_tokens: maxTokens,
      temperature: 0.7,
    });

    return response.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('OpenAI API call failed:', error);
    throw error;
  }
}

export async function generatePrompt(textType: string): Promise<string> {
  try {
    if (!openai) {
      throw new Error('OpenAI not available');
    }

    const messages = [
      {
        role: 'system',
        content: `You are a writing coach for NSW selective school writing tests for students aged 9-11 in Australia. Generate engaging, age-appropriate writing prompts that align with NSW curriculum standards. The prompts should be creative, relatable to children's experiences, and encourage imaginative thinking.`
      },
      {
        role: 'user',
        content: `Generate a creative and engaging ${textType} writing prompt suitable for NSW selective school tests for students aged 9-11. Make it interesting and relatable to children's experiences. Return only the prompt text, no additional formatting.`
      }
    ];

    const result = await makeOpenAICall(messages, 200);
    return result.trim();
  } catch (error) {
    console.error('Error generating prompt:', error);
    
    // Fallback prompts if the API call fails
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
}

export async function getWritingFeedback(content: string, textType: string, assistanceLevel: string, feedbackHistory: any[]): Promise<any> {
  try {
    if (!openai) {
      throw new Error('OpenAI not available');
    }

    const messages = [
      {
        role: 'system',
        content: `You are an expert writing coach for NSW selective school writing tests for students aged 9-11 in Australia. Provide constructive, encouraging feedback that helps students improve their writing skills. Your feedback should be:

1. Age-appropriate and encouraging
2. Specific and actionable
3. Aligned with NSW curriculum standards
4. Focused on both strengths and areas for improvement
5. Structured with clear categories

Assistance Level: ${assistanceLevel}

Return your response as a JSON object with this exact structure:
{
  "overallComment": "A brief, encouraging overall comment about the writing",
  "feedbackItems": [
    {
      "type": "praise|suggestion|question|challenge",
      "area": "specific area like 'Structure', 'Vocabulary', 'Ideas', etc.",
      "text": "specific feedback text",
      "exampleFromText": "quote from their writing if relevant",
      "suggestionForImprovement": "specific suggestion for improvement"
    }
  ],
  "focusForNextTime": ["specific focus point 1", "specific focus point 2", "specific focus point 3"]
}`
      },
      {
        role: 'user',
        content: `Please provide feedback on this ${textType} writing by a student aged 9-11:

"${content}"

Text Type: ${textType}
Assistance Level: ${assistanceLevel}

Provide structured feedback that encourages the student while helping them improve their writing skills.`
      }
    ];

    const result = await makeOpenAICall(messages, 1500);
    
    try {
      return JSON.parse(result);
    } catch (parseError) {
      // If JSON parsing fails, create a structured response from the text
      return {
        overallComment: result.substring(0, 200) + "...",
        feedbackItems: [
          {
            type: "suggestion",
            area: "General",
            text: "Your writing shows good effort! Keep practicing to improve your skills.",
            suggestionForImprovement: "Continue writing regularly and ask for feedback from teachers."
          }
        ],
        focusForNextTime: ["Continue practicing", "Focus on clear communication", "Review your work before submitting"]
      };
    }
  } catch (error) {
    console.error('Error getting writing feedback:', error);
    return {
      overallComment: "Great job on your writing! Your effort shows and you're making good progress. Keep practicing to build your skills!",
      feedbackItems: [
        {
          type: "praise",
          area: "Effort",
          text: "Great job completing your writing task!",
          suggestionForImprovement: "Continue practicing regularly to build your writing skills."
        },
        {
          type: "suggestion",
          area: "General",
          text: "Focus on clear expression of your ideas.",
          suggestionForImprovement: "Read your work aloud to check if it makes sense."
        }
      ],
      focusForNextTime: ["Continue practicing", "Focus on clear communication", "Review your work before submitting"]
    };
  }
}

export async function getSpecializedTextTypeFeedback(content: string, textType: string): Promise<any> {
  try {
    if (!openai) {
      throw new Error('OpenAI not available');
    }

    const messages = [
      {
        role: 'system',
        content: `You are a specialized writing coach for NSW selective school tests focusing on ${textType} writing for students aged 9-11. Provide detailed feedback specific to the ${textType} text type, including structure, language features, and purpose.

Return your response as a JSON object with this structure:
{
  "overallComment": "overall comment about their understanding of the text type",
  "textTypeSpecificFeedback": {
    "structure": "feedback about structure specific to this text type",
    "language": "feedback about language features for this text type",
    "purpose": "feedback about how well they achieved the purpose",
    "audience": "feedback about audience awareness"
  },
  "strengthsInTextType": ["strength 1", "strength 2", "strength 3"],
  "improvementAreas": ["area 1", "area 2", "area 3"],
  "nextSteps": ["step 1", "step 2", "step 3"]
}`
      },
      {
        role: 'user',
        content: `Analyze this ${textType} writing for text-type specific features:

"${content}"

Focus on how well the student has used the conventions and features specific to ${textType} writing.`
      }
    ];

    const result = await makeOpenAICall(messages, 1200);
    
    try {
      return JSON.parse(result);
    } catch (parseError) {
      return {
        overallComment: "Your writing shows understanding of the text type requirements.",
        textTypeSpecificFeedback: {
          structure: "Your writing follows the basic structure, but could benefit from clearer organization.",
          language: "You've used appropriate language for this writing style.",
          purpose: "Your writing addresses the main purpose of this text type.",
          audience: "Consider your target audience when writing."
        },
        strengthsInTextType: [
          "Shows understanding of the text type",
          "Appropriate attempt at the required format",
          "Good effort in addressing the task"
        ],
        improvementAreas: [
          "Continue practicing this text type",
          "Focus on specific features of this writing style",
          "Review examples of excellent writing in this format"
        ],
        nextSteps: [
          "Practice more examples of this text type",
          "Study the key features and structure",
          "Get feedback from teachers or peers"
        ]
      };
    }
  } catch (error) {
    console.error('Error getting specialized text type feedback:', error);
    return {
      overallComment: "Your writing shows understanding of the text type requirements.",
      textTypeSpecificFeedback: {
        structure: "Your writing follows the basic structure, but could benefit from clearer organization.",
        language: "You've used appropriate language for this writing style.",
        purpose: "Your writing addresses the main purpose of this text type.",
        audience: "Consider your target audience when writing."
      },
      strengthsInTextType: [
        "Shows understanding of the text type",
        "Appropriate attempt at the required format",
        "Good effort in addressing the task"
      ],
      improvementAreas: [
        "Continue practicing this text type",
        "Focus on specific features of this writing style",
        "Review examples of excellent writing in this format"
      ],
      nextSteps: [
        "Practice more examples of this text type",
        "Study the key features and structure",
        "Get feedback from teachers or peers"
      ]
    };
  }
}

export async function identifyCommonMistakes(content: string, textType: string) {
  try {
    if (!openai) {
      throw new Error('OpenAI not available');
    }

    const messages = [
      {
        role: 'system',
        content: `You are a writing coach specializing in identifying common mistakes in student writing for NSW selective school tests (ages 9-11). Analyze the writing for common errors and patterns, providing constructive feedback.

Return a JSON object with this structure:
{
  "overallAssessment": "brief overall assessment",
  "mistakesIdentified": [
    {
      "type": "grammar|spelling|punctuation|structure|vocabulary",
      "description": "description of the mistake",
      "example": "example from the text",
      "correction": "how to fix it"
    }
  ],
  "patternAnalysis": "analysis of any patterns in mistakes",
  "priorityFixes": ["most important fix 1", "most important fix 2", "most important fix 3"],
  "positiveElements": ["positive element 1", "positive element 2"]
}`
      },
      {
        role: 'user',
        content: `Analyze this ${textType} writing for common mistakes and patterns:

"${content}"

Identify specific errors and provide constructive guidance for improvement.`
      }
    ];

    const result = await makeOpenAICall(messages, 1200);
    
    try {
      return JSON.parse(result);
    } catch (parseError) {
      return {
        overallAssessment: "Your writing shows good effort and understanding.",
        mistakesIdentified: [],
        patternAnalysis: "Continue focusing on careful proofreading and clear expression.",
        priorityFixes: ["Proofread carefully", "Check spelling and grammar", "Ensure clear expression"],
        positiveElements: ["Good effort in completing the task", "Appropriate attempt at the text type"]
      };
    }
  } catch (error) {
    console.error('Error identifying common mistakes:', error);
    return {
      overallAssessment: "Your writing shows good effort and understanding.",
      mistakesIdentified: [],
      patternAnalysis: "Continue focusing on careful proofreading and clear expression.",
      priorityFixes: ["Proofread carefully", "Check spelling and grammar", "Ensure clear expression"],
      positiveElements: ["Good effort in completing the task", "Appropriate attempt at the text type"]
    };
  }
}

export async function getSynonyms(word: string): Promise<string[]> {
  try {
    if (!openai) {
      throw new Error('OpenAI not available');
    }

    const messages = [
      {
        role: 'system',
        content: 'You are a vocabulary coach for students aged 9-11. Provide age-appropriate synonyms that will help improve their writing. Return only a comma-separated list of 3-5 synonyms, no additional text.'
      },
      {
        role: 'user',
        content: `Provide 3-5 age-appropriate synonyms for the word "${word}" suitable for students aged 9-11.`
      }
    ];

    const result = await makeOpenAICall(messages, 100);
    return result.split(',').map(s => s.trim()).filter(s => s.length > 0);
  } catch (error) {
    console.error('Error getting synonyms:', error);
    
    // Basic synonym fallbacks for common words
    const commonSynonyms: { [key: string]: string[] } = {
      good: ['excellent', 'great', 'wonderful', 'fantastic', 'amazing'],
      bad: ['poor', 'terrible', 'awful', 'dreadful', 'horrible'],
      big: ['large', 'huge', 'enormous', 'massive', 'gigantic'],
      small: ['tiny', 'little', 'miniature', 'petite', 'compact'],
      happy: ['joyful', 'cheerful', 'delighted', 'pleased', 'content'],
      sad: ['unhappy', 'sorrowful', 'melancholy', 'dejected', 'gloomy']
    };
    
    return commonSynonyms[word.toLowerCase()] || [`[Synonyms for "${word}" not available at the moment]`];
  }
}

export async function rephraseSentence(sentence: string): Promise<string> {
  try {
    if (!openai) {
      throw new Error('OpenAI not available');
    }

    const messages = [
      {
        role: 'system',
        content: 'You are a writing coach helping students aged 9-11 improve their sentence structure. Provide 2-3 alternative ways to express the same idea, keeping the language age-appropriate. Return only the alternatives separated by " | ", no additional text.'
      },
      {
        role: 'user',
        content: `Provide 2-3 alternative ways to rephrase this sentence for a student aged 9-11: "${sentence}"`
      }
    ];

    const result = await makeOpenAICall(messages, 200);
    return result.trim();
  } catch (error) {
    console.error('Error rephrasing sentence:', error);
    return `[Rephrasing not available at the moment] Original: ${sentence}`;
  }
}

export async function getTextTypeVocabulary(textType: string, contentSample: string): Promise<any> {
  try {
    if (!openai) {
      throw new Error('OpenAI not available');
    }

    const messages = [
      {
        role: 'system',
        content: `You are a vocabulary coach for NSW selective school writing tests. Provide vocabulary specific to ${textType} writing that would help students aged 9-11 improve their writing.

Return a JSON object with this structure:
{
  "textType": "${textType}",
  "categories": [
    {
      "name": "category name",
      "words": ["word1", "word2", "word3"],
      "examples": ["example sentence 1", "example sentence 2"]
    }
  ],
  "phrasesAndExpressions": ["phrase 1", "phrase 2", "phrase 3"],
  "transitionWords": ["transition 1", "transition 2", "transition 3"]
}`
      },
      {
        role: 'user',
        content: `Provide vocabulary suggestions for ${textType} writing based on this sample: "${contentSample}"`
      }
    ];

    const result = await makeOpenAICall(messages, 800);
    
    try {
      return JSON.parse(result);
    } catch (parseError) {
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
  } catch (error) {
    console.error('Error getting text type vocabulary:', error);
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

export async function evaluateEssay(content: string, textType: string): Promise<any> {
  try {
    if (!openai) {
      throw new Error('OpenAI not available');
    }

    const messages = [
      {
        role: 'system',
        content: `You are an expert evaluator for NSW selective school writing tests for students aged 9-11. Provide a comprehensive evaluation using NSW curriculum standards.

Return a JSON object with this structure:
{
  "overallScore": number (1-10),
  "strengths": ["strength 1", "strength 2", "strength 3"],
  "areasForImprovement": ["area 1", "area 2", "area 3"],
  "specificFeedback": {
    "structure": "feedback about structure",
    "language": "feedback about language use",
    "ideas": "feedback about ideas and content",
    "mechanics": "feedback about grammar, spelling, punctuation"
  },
  "nextSteps": ["step 1", "step 2", "step 3"]
}`
      },
      {
        role: 'user',
        content: `Evaluate this ${textType} writing by a student aged 9-11 according to NSW curriculum standards:

"${content}"

Provide a comprehensive evaluation with specific, constructive feedback.`
      }
    ];

    const result = await makeOpenAICall(messages, 1000);
    
    try {
      return JSON.parse(result);
    } catch (parseError) {
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
  } catch (error) {
    console.error('Error evaluating essay:', error);
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

export async function getWritingStructure(textType: string): Promise<string> {
  try {
    if (!openai) {
      throw new Error('OpenAI not available');
    }

    const messages = [
      {
        role: 'system',
        content: `You are a writing structure expert for NSW selective school tests. Provide a comprehensive guide to ${textType} writing structure for students aged 9-11.

Return a JSON string with this structure:
{
  "title": "Guide to ${textType} Writing",
  "sections": [
    {
      "heading": "section heading",
      "content": "detailed content for this section"
    }
  ]
}`
      },
      {
        role: 'user',
        content: `Provide a comprehensive structure guide for ${textType} writing suitable for NSW selective school students aged 9-11.`
      }
    ];

    const result = await makeOpenAICall(messages, 800);
    return result;
  } catch (error) {
    console.error('Error getting writing structure:', error);
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

// New function for grammar and spelling check
export async function checkGrammarAndSpelling(content: string): Promise<any> {
  try {
    if (!openai) {
      throw new Error('OpenAI not available');
    }

    const messages = [
      {
        role: 'system',
        content: `You are a grammar and spelling checker for students aged 9-11. Identify errors and provide corrections in a supportive way.

Return a JSON object with this structure:
{
  "corrections": [
    {
      "type": "grammar|spelling|punctuation",
      "text": "the error text",
      "suggestion": "the correction",
      "explanation": "simple explanation for the student"
    }
  ]
}`
      },
      {
        role: 'user',
        content: `Check this text for grammar and spelling errors: "${content}"`
      }
    ];

    const result = await makeOpenAICall(messages, 600);
    
    try {
      return JSON.parse(result);
    } catch (parseError) {
      return {
        corrections: []
      };
    }
  } catch (error) {
    console.error('Error checking grammar and spelling:', error);
    return {
      corrections: []
    };
  }
}

// New function for sentence structure analysis
export async function analyzeSentenceStructure(content: string): Promise<any> {
  try {
    if (!openai) {
      throw new Error('OpenAI not available');
    }

    const messages = [
      {
        role: 'system',
        content: `You are a sentence structure analyzer for students aged 9-11. Identify patterns and suggest improvements.

Return a JSON object with this structure:
{
  "analysis": [
    {
      "type": "repetitive_beginning|choppy_sentences|run_on|variety_needed",
      "sentence": "example sentence",
      "suggestion": "how to improve it"
    }
  ]
}`
      },
      {
        role: 'user',
        content: `Analyze the sentence structure in this text: "${content}"`
      }
    ];

    const result = await makeOpenAICall(messages, 600);
    
    try {
      return JSON.parse(result);
    } catch (parseError) {
      return {
        analysis: []
      };
    }
  } catch (error) {
    console.error('Error analyzing sentence structure:', error);
    return {
      analysis: []
    };
  }
}

// New function for vocabulary enhancement
export async function enhanceVocabulary(content: string): Promise<any> {
  try {
    if (!openai) {
      throw new Error('OpenAI not available');
    }

    const messages = [
      {
        role: 'system',
        content: `You are a vocabulary enhancement coach for students aged 9-11. Suggest better word choices that are age-appropriate.

Return a JSON object with this structure:
{
  "suggestions": [
    {
      "word": "basic word found in text",
      "suggestion": "better alternatives",
      "context": "how to use it"
    }
  ]
}`
      },
      {
        role: 'user',
        content: `Suggest vocabulary improvements for this text: "${content}"`
      }
    ];

    const result = await makeOpenAICall(messages, 600);
    
    try {
      return JSON.parse(result);
    } catch (parseError) {
      return {
        suggestions: []
      };
    }
  } catch (error) {
    console.error('Error enhancing vocabulary:', error);
    return {
      suggestions: []
    };
  }
}

export default {
  generatePrompt,
  getWritingFeedback,
  getSpecializedTextTypeFeedback,
  identifyCommonMistakes,
  getSynonyms,
  rephraseSentence,
  getTextTypeVocabulary,
  evaluateEssay,
  getWritingStructure,
  checkGrammarAndSpelling,
  analyzeSentenceStructure,
  enhanceVocabulary,
  isOpenAIAvailable
};

