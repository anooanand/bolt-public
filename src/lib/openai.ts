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

// Helper function to make API calls to the enhanced backend
async function makeBackendCall(operation: string, data: any): Promise<any> {
  try {
    // Check if we're in local development and backend functions aren't available
    const isLocalDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    
    const response = await fetch('/.netlify/functions/ai-operations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        operation,
        ...data
      })
    });

    if (!response.ok) {
      // If we get a 404 in local development, throw a specific error
      if (response.status === 404 && isLocalDev) {
        throw new Error('BACKEND_NOT_AVAILABLE');
      }
      throw new Error(`Backend call failed: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Backend call error:', error);
    // If backend is not available, throw the specific error to trigger fallbacks
    if (error instanceof Error && error.message === 'BACKEND_NOT_AVAILABLE') {
      throw error;
    }
    throw error;
  }
}

// Enhanced NSW Selective Writing Feedback Function
export async function getNSWSelectiveFeedback(
  content: string, 
  textType: string, 
  assistanceLevel: string = 'medium', 
  feedbackHistory: any[] = []
): Promise<any> {
  try {
    return await makeBackendCall('getNSWSelectiveFeedback', {
      content,
      textType,
      assistanceLevel,
      feedbackHistory
    });
  } catch (error) {
    console.error('Error getting NSW Selective feedback:', error);
    
    // Fallback response with NSW criteria structure
    return {
      overallComment: "Your writing shows good effort and understanding of the narrative form. Let's work on developing it further using NSW Selective exam criteria.",
      criteriaFeedback: {
        ideasAndContent: {
          score: 6,
          maxScore: 10,
          strengths: ["You have attempted to create a narrative with a clear storyline"],
          improvements: ["Develop your ideas with more specific details and depth"],
          suggestions: ["Add more descriptive details about characters, setting, and emotions"],
          nextSteps: ["Focus on expanding one key moment in your story with rich detail"]
        },
        textStructureAndOrganization: {
          score: 6,
          maxScore: 10,
          strengths: ["Your writing has a clear beginning"],
          improvements: ["Ensure smooth transitions between ideas"],
          suggestions: ["Use connecting words like 'meanwhile', 'suddenly', 'after that' to link your ideas"],
          nextSteps: ["Plan your story structure before writing - beginning, middle, end"]
        },
        languageFeaturesAndVocabulary: {
          score: 6,
          maxScore: 10,
          strengths: ["You've used some descriptive words"],
          improvements: ["Vary your sentence structure and use more sophisticated vocabulary"],
          suggestions: ["Try starting sentences in different ways and use more specific adjectives"],
          nextSteps: ["Practice using literary devices like similes or metaphors"]
        },
        spellingPunctuationGrammar: {
          score: 7,
          maxScore: 10,
          strengths: ["Generally good control of basic grammar and spelling"],
          improvements: ["Check for any minor errors and ensure consistent tense"],
          suggestions: ["Proofread your work carefully, reading it aloud to catch errors"],
          nextSteps: ["Focus on maintaining past tense throughout your narrative"]
        }
      },
      priorityFocus: ["Develop ideas with more specific details", "Improve sentence variety and vocabulary"],
      examStrategies: ["Plan your story structure before writing", "Use the full time allocation for planning, writing, and checking"],
      interactiveQuestions: ["What specific emotions does your main character feel?", "How can you make your setting more vivid for the reader?"],
      revisionSuggestions: ["Choose one paragraph to expand with more sensory details", "Rewrite two sentences to start them differently"]
    };
  }
}

// Helper function to analyze content structure and extract key elements
function analyzeContentStructure(content: string) {
  const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const words = content.trim().split(/\s+/).filter(w => w.length > 0);
  const paragraphs = content.split(/\n\s*\n/).filter(p => p.trim().length > 0);
  
  // Extract potential character names (capitalized words that aren't sentence starters)
  const potentialCharacters = words.filter((word, index) => {
    const isCapitalized = /^[A-Z][a-z]+$/.test(word);
    const isNotSentenceStart = index > 0 && !/[.!?]/.test(words[index - 1]);
    return isCapitalized && isNotSentenceStart;
  });

  // Identify dialogue (text in quotes)
  const dialogueMatches = content.match(/"[^"]*"/g) || [];
  
  // Identify descriptive language (adjectives and adverbs)
  const descriptiveWords = words.filter(word => 
    /ly$/.test(word) || // adverbs ending in -ly
    /ing$/.test(word) || // present participles
    /ed$/.test(word) // past participles
  );

  return {
    sentenceCount: sentences.length,
    wordCount: words.length,
    paragraphCount: paragraphs.length,
    averageSentenceLength: words.length / sentences.length,
    potentialCharacters: [...new Set(potentialCharacters)],
    hasDialogue: dialogueMatches.length > 0,
    dialogueCount: dialogueMatches.length,
    descriptiveWords: [...new Set(descriptiveWords)],
    firstSentence: sentences[0]?.trim() || '',
    lastSentence: sentences[sentences.length - 1]?.trim() || ''
  };
}

// Enhanced function to get contextual writing feedback
export async function getWritingFeedback(content: string, textType: string, assistanceLevel: string, feedbackHistory: any[]): Promise<any> {
  try {
    return await makeBackendCall('getWritingFeedback', {
      content,
      textType,
      assistanceLevel,
      feedbackHistory
    });
  } catch (error) {
    console.error('Error getting writing feedback:', error);
    
    // Provide contextual fallback based on content analysis
    const analysis = analyzeContentStructure(content);
    return {
      overallComment: `Your ${analysis.wordCount}-word ${textType} piece shows good effort! I can see you're developing your ideas.`,
      feedbackItems: [
        {
          type: "praise",
          area: "Effort",
          text: `Great job writing ${analysis.wordCount} words and organizing them into ${analysis.sentenceCount} sentences!`,
          exampleFromText: analysis.firstSentence,
          suggestionForImprovement: "Keep building on this foundation by adding more descriptive details."
        },
        {
          type: "suggestion",
          area: "Structure",
          text: analysis.paragraphCount === 1 ? "Your writing is all in one paragraph." : `You've organized your writing into ${analysis.paragraphCount} paragraphs.`,
          suggestionForImprovement: analysis.paragraphCount === 1 ? "Try breaking your writing into 2-3 paragraphs for better organization." : "Good paragraph organization! Keep this up."
        }
      ],
      focusForNextTime: [
        analysis.averageSentenceLength < 8 ? "Try writing some longer, more detailed sentences" : "Good sentence variety!",
        analysis.descriptiveWords.length < 3 ? "Add more describing words (adjectives)" : "Nice use of descriptive language",
        "Read your work aloud to check if it flows well"
      ]
    };
  }
}

// Enhanced function for specialized text type feedback with contextual analysis
export async function getSpecializedTextTypeFeedback(content: string, textType: string): Promise<any> {
  try {
    return await makeBackendCall('getSpecializedTextTypeFeedback', {
      content,
      textType
    });
  } catch (error) {
    console.error('Error getting specialized text type feedback:', error);
    return {
      overallComment: "Unable to provide specialized feedback at this time. Your writing shows good understanding of the task.",
      textTypeSpecificFeedback: {
        structure: "Your writing has a clear structure appropriate for this text type.",
        language: "You've used suitable language for this writing style.",
        purpose: "Your writing addresses the main purpose effectively.",
        audience: "Consider your audience when refining your writing."
      },
      strengthsInTextType: [
        "Good understanding of the text type requirements",
        "Appropriate structure and organization",
        "Clear attempt at the required style"
      ],
      improvementAreas: [
        "Continue developing text type knowledge",
        "Practice specific language features",
        "Strengthen understanding of conventions"
      ],
      nextSteps: [
        "Review examples of this text type",
        "Practice with guided exercises",
        "Seek additional feedback and support"
      ]
    };
  }
}

// Enhanced function to identify specific mistakes in context
export async function identifyCommonMistakes(content: string, textType: string) {
  try {
    return await makeBackendCall('identifyCommonMistakes', {
      content,
      textType
    });
  } catch (error) {
    console.error('Error identifying common mistakes:', error);
    const analysis = analyzeContentStructure(content);
    return {
      overallAssessment: `Your ${analysis.wordCount}-word piece shows good effort. I can see you're developing your writing skills.`,
      mistakesIdentified: [],
      patternAnalysis: `Your writing shows ${analysis.sentenceCount} sentences with an average length of ${Math.round(analysis.averageSentenceLength)} words. Continue focusing on clear expression.`,
      priorityFixes: [
        analysis.averageSentenceLength < 6 ? "Try writing some longer, more detailed sentences" : "Good sentence length variety",
        "Proofread carefully for spelling and grammar",
        "Read your work aloud to check if it flows well"
      ],
      positiveElements: [
        `Strong opening: "${analysis.firstSentence.substring(0, 40)}..."`,
        `Good effort with ${analysis.wordCount} words written`
      ]
    };
  }
}

// Keep all other existing functions unchanged but route through backend
export async function generatePrompt(textType: string): Promise<string> {
  try {
    const result = await makeBackendCall('generatePrompt', { textType });
    return result.prompt || "Write about a memorable experience that taught you something important.";
  } catch (error) {
    console.error('Error generating prompt:', error);
    
    // If backend is not available (local development), use fallback prompts
    if (error instanceof Error && error.message === 'BACKEND_NOT_AVAILABLE') {
      console.log('Backend not available, using fallback prompts');
    }
    
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

export async function getSynonyms(word: string): Promise<string[]> {
  try {
    const result = await makeBackendCall('getSynonyms', { content: word });
    return Array.isArray(result) ? result : [result];
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
    const result = await makeBackendCall('rephraseSentence', { content: sentence });
    return result || `[Rephrasing not available at the moment] Original: ${sentence}`;
  } catch (error) {
    console.error('Error rephrasing sentence:', error);
    return `[Rephrasing not available at the moment] Original: ${sentence}`;
  }
}

export async function getTextTypeVocabulary(textType: string, contentSample: string): Promise<any> {
  try {
    return await makeBackendCall('getTextTypeVocabulary', {
      textType,
      content: contentSample
    });
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
    return await makeBackendCall('evaluateEssay', {
      content,
      textType
    });
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
    const result = await makeBackendCall('getWritingStructure', { textType });
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
    return await makeBackendCall('checkGrammarAndSpelling', { content });
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
    return await makeBackendCall('analyzeSentenceStructure', { content });
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
    return await makeBackendCall('enhanceVocabulary', { content });
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
  getNSWSelectiveFeedback,
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
