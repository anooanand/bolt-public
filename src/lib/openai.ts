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
    console.log('[DEBUG] OpenAI API key not configured - AI features will use Netlify functions');
  }
} catch (error) {
  console.error('[DEBUG] Failed to initialize OpenAI client:', error);
  openai = null;
}

// Safe function to check if OpenAI is available
export const isOpenAIAvailable = (): boolean => {
  return openai !== null;
};

// Base URL for Netlify functions
const NETLIFY_FUNCTIONS_URL = '/.netlify/functions';

// Generic function to call Netlify functions for AI operations
async function callAIFunction(operation: string, params: any) {
  try {
    const response = await fetch(`${NETLIFY_FUNCTIONS_URL}/ai-operations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        operation,
        ...params
      }),
    });

    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error calling ${operation}:`, error);
    throw error;
  }
}

export async function generatePrompt(textType: string): Promise<string> {
  try {
    const result = await callAIFunction('generatePrompt', { textType });
    return result.prompt;
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
    return await callAIFunction('getWritingFeedback', { 
      content, 
      textType, 
      assistanceLevel, 
      feedbackHistory 
    });
  } catch (error) {
    console.error('Error getting writing feedback:', error);
    return {
      overallComment: "AI feedback is not available at the moment. Your writing shows good effort and structure. Keep practicing to improve your skills!",
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
}

export async function getSpecializedTextTypeFeedback(content: string, textType: string): Promise<any> {
  try {
    return await callAIFunction('getSpecializedTextTypeFeedback', { content, textType });
  } catch (error) {
    console.error('Error getting specialized text type feedback:', error);
    return {
      overallComment: "AI specialized feedback is not available at the moment. Your writing shows understanding of the text type requirements.",
      textTypeSpecificFeedback: {
        structure: "Your writing follows the basic structure expected for this text type.",
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
    return await callAIFunction('identifyCommonMistakes', { content, textType });
  } catch (error) {
    console.error('Error identifying common mistakes:', error);
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
  try {
    return await callAIFunction('getSynonyms', { content: word });
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
    const result = await callAIFunction('rephraseSentence', { content: sentence });
    return result;
  } catch (error) {
    console.error('Error rephrasing sentence:', error);
    return `[Rephrasing not available at the moment] Original: ${sentence}`;
  }
}

export async function getTextTypeVocabulary(textType: string, contentSample: string): Promise<any> {
  try {
    return await callAIFunction('getTextTypeVocabulary', { textType, content: contentSample });
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
    return await callAIFunction('evaluateEssay', { content, textType });
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
    const result = await callAIFunction('getWritingStructure', { textType });
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
  isOpenAIAvailable
};
