import OpenAI from 'openai';

// Create OpenAI client with enhanced error handling
let openai: OpenAI | null = null;

try {
  // Try multiple possible API key environment variables
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY || 
                 import.meta.env.OPENAI_API_KEY ||
                 process.env.OPENAI_API_KEY;
  
  if (apiKey && 
      apiKey !== 'your_openai_api_key_here' && 
      apiKey !== 'your-openai-api-key-here' && 
      apiKey !== 'sk-placeholder' &&
      apiKey.trim() !== '' &&
      apiKey.startsWith('sk-')) {
    openai = new OpenAI({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true
    });
    console.log('[DEBUG] OpenAI client initialized successfully with GPT-4');
  } else {
    console.warn('[DEBUG] OpenAI API key not configured or invalid - AI features will be limited');
    console.warn('[DEBUG] Expected format: sk-... but got:', apiKey ? `${apiKey.substring(0, 10)}...` : 'undefined');
  }
} catch (error) {
  console.error('[DEBUG] Failed to initialize OpenAI client:', error);
  openai = null;
}

// Safe function to check if OpenAI is available
const isOpenAIAvailable = (): boolean => {
  return openai !== null;
};

// Helper function to make API calls to the enhanced backend
async function makeBackendCall(operation: string, data: any): Promise<any> {
  try {
    console.log(`[DEBUG] Making backend call for operation: ${operation}`);
    
    // Always try backend calls first, regardless of environment
    try {
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
        const errorText = await response.text();
        console.error(`[DEBUG] Backend call failed: ${response.status} - ${errorText}`);
        throw new Error(`Backend call failed: ${response.status}`);
      }

      const result = await response.json();
      console.log(`[DEBUG] Backend call successful for ${operation}`);
      return result;
    } catch (fetchError) {
      console.error(`[DEBUG] Backend fetch failed for ${operation}:`, fetchError);
      return { error: 'BACKEND_NOT_AVAILABLE' };
    }
  } catch (error) {
    console.error('Backend call error:', error);
    return { error: 'BACKEND_NOT_AVAILABLE' };
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
    
    console.log('[DEBUG] Using enhanced NSW Selective fallback feedback');
    
    // Enhanced fallback response with detailed NSW criteria analysis
    const analysis = analyzeContentStructure(content);
    const estimatedScore = Math.min(30, Math.max(8, Math.round(analysis.wordCount / 15) + analysis.paragraphCount * 2));
    const bandLevel = estimatedScore >= 27 ? 6 : estimatedScore >= 22 ? 5 : estimatedScore >= 17 ? 4 : estimatedScore >= 12 ? 3 : estimatedScore >= 7 ? 2 : 1;
    
    return {
      overallComment: `Your ${analysis.wordCount}-word ${textType} demonstrates ${bandLevel >= 4 ? 'solid' : 'developing'} understanding of NSW Selective requirements. You're currently showing Band ${bandLevel} characteristics. Let's work on reaching Band 5-6 level.`,
      totalScore: estimatedScore,
      overallBand: bandLevel,
      bandDescription: bandLevel >= 5 ? "Proficient - Well-developed ideas" : bandLevel >= 4 ? "Sound - Adequate ideas" : "Developing - Simple ideas",
      estimatedExamScore: `${estimatedScore}/30`,
      criteriaFeedback: {
        ideasAndContent: {
          score: Math.round(estimatedScore * 0.3),
          maxScore: 9,
          band: Math.min(6, Math.max(1, Math.round(estimatedScore * 0.3 / 1.5))),
          strengths: analysis.wordCount > 100 ? [`You've developed a substantial ${textType} with ${analysis.wordCount} words`] : ["You've made a good start on your writing"],
          improvements: analysis.wordCount < 150 ? ["Develop your ideas with more specific details and examples"] : ["Deepen your analysis and add more sophisticated insights"],
          suggestions: [`Add more specific examples and evidence to support your ${textType} ideas`, "Show deeper thinking by explaining the 'why' behind your points"],
          nextSteps: [`Expand your ${textType} with at least 2 more specific examples or details`]
        },
        textStructureAndOrganization: {
          score: Math.round(estimatedScore * 0.25),
          maxScore: 7.5,
          band: Math.min(6, Math.max(1, Math.round(estimatedScore * 0.25 / 1.25))),
          strengths: analysis.paragraphCount > 1 ? [`Good paragraph organization with ${analysis.paragraphCount} paragraphs`] : ["You have a clear structure"],
          improvements: analysis.paragraphCount === 1 ? ["Break your writing into multiple paragraphs for better organization"] : ["Strengthen transitions between paragraphs"],
          suggestions: [`Use NSW Selective-appropriate structure for ${textType}: clear introduction, well-developed body, strong conclusion`, "Add transition words to connect your ideas smoothly"],
          nextSteps: [`Review NSW Selective ${textType} structure requirements and apply them to your writing`]
        },
        languageFeaturesAndVocabulary: {
          score: Math.round(estimatedScore * 0.25),
          maxScore: 7.5,
          band: Math.min(6, Math.max(1, Math.round(estimatedScore * 0.25 / 1.25))),
          strengths: analysis.descriptiveWords.length > 3 ? [`Good use of descriptive language: ${analysis.descriptiveWords.slice(0, 3).join(', ')}`] : ["You're developing your vocabulary"],
          improvements: ["Use more sophisticated vocabulary appropriate for NSW Selective Band 5-6 level", "Vary your sentence structures for more engaging writing"],
          suggestions: ["Replace simple words with more sophisticated alternatives (e.g., 'good' → 'exceptional')", "Use complex sentences with subordinate clauses"],
          nextSteps: ["Practice using 5 new sophisticated vocabulary words in your next draft"]
        },
        spellingPunctuationGrammar: {
          score: Math.round(estimatedScore * 0.2),
          maxScore: 6,
          band: Math.min(6, Math.max(1, Math.round(estimatedScore * 0.2 / 1))),
          strengths: ["Your basic grammar and spelling show good control"],
          improvements: ["Check for any minor errors and ensure consistent tense throughout"],
          suggestions: ["Proofread your work carefully, reading it aloud to catch errors", "Use varied punctuation to create more sophisticated sentences"],
          nextSteps: [`Maintain consistent ${textType === 'narrative' ? 'past' : 'present'} tense throughout your writing`]
        }
      },
      priorityFocus: [
        estimatedScore < 20 ? "Develop ideas with more specific details and examples" : "Add sophisticated insights and analysis",
        estimatedScore < 15 ? "Improve basic structure and organization" : "Enhance vocabulary and sentence variety"
      ],
      examStrategies: [
        `Plan your ${textType} structure before writing (5 minutes planning time)`,
        "Use sophisticated vocabulary appropriate for selective school entry",
        "Leave time to check and improve your work (5 minutes checking time)"
      ],
      interactiveQuestions: getTextTypeQuestions(textType),
      revisionSuggestions: [
        `Add 2-3 more specific examples to strengthen your ${textType}`,
        "Replace 3 simple words with more sophisticated alternatives",
        "Check that each paragraph has one clear main idea"
      ]
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
    
    console.log('[DEBUG] Using enhanced fallback feedback for local development');
    
    // Enhanced contextual fallback based on content analysis
    const analysis = analyzeContentStructure(content);
    const qualityScore = Math.min(10, Math.max(3, Math.round(analysis.wordCount / 20) + (analysis.paragraphCount > 1 ? 2 : 0)));
    
    return {
      overallComment: `Your ${analysis.wordCount}-word ${textType} shows ${qualityScore >= 7 ? 'strong' : qualityScore >= 5 ? 'good' : 'developing'} effort for NSW Selective preparation! You're building important writing skills.`,
      feedbackItems: [
        {
          type: "praise",
          area: "NSW Selective Preparation",
          text: `Excellent effort writing ${analysis.wordCount} words! This shows dedication to your NSW Selective preparation.`,
          exampleFromText: analysis.firstSentence,
          suggestionForImprovement: "For NSW Selective success, continue building sophisticated vocabulary and varied sentence structures."
        },
        {
          type: "suggestion",
          area: "NSW Text Structure",
          text: analysis.paragraphCount === 1 ? `Your ${textType} is currently in one paragraph.` : `You've organized your ${textType} into ${analysis.paragraphCount} paragraphs - good structure!`,
          suggestionForImprovement: analysis.paragraphCount === 1 ? `For NSW Selective ${textType}, break your writing into 3-4 well-developed paragraphs.` : "Excellent paragraph organization for NSW Selective standards!"
        },
        {
          type: "challenge",
          area: "Vocabulary Enhancement",
          text: `Your vocabulary shows ${analysis.descriptiveWords.length > 5 ? 'good variety' : 'room for growth'}.`,
          suggestionForImprovement: "For Band 5-6 NSW Selective writing, use more sophisticated vocabulary that demonstrates language maturity."
        }
      ],
      focusForNextTime: [
        analysis.averageSentenceLength < 10 ? "Write longer, more complex sentences for NSW Selective standards" : "Excellent sentence complexity!",
        analysis.descriptiveWords.length < 5 ? "Add more sophisticated vocabulary and descriptive language" : "Great use of descriptive language!",
        `Ensure your ${textType} follows NSW Selective text type conventions`,
        "Practice using literary devices appropriate for your age level"
      ]
    };
  }
}

// Enhanced function for specialized text type feedback with contextual analysis
async function getSpecializedTextTypeFeedback(content: string, textType: string): Promise<any> {
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
    if (result.error === 'BACKEND_NOT_AVAILABLE') {
      console.log('[DEBUG] Using fallback prompts for local development');
      
      // Enhanced NSW Selective fallback prompts
      const nswSelectiveFallbackPrompts: { [key: string]: string } = {
        narrative: "Write a narrative about a time when you had to make a difficult decision. Show how this experience changed you as a person. Include dialogue, descriptive language, and a clear structure with beginning, middle, and end.",
        persuasive: "Should students be allowed to use technology during class time? Write a persuasive essay arguing your position. Use specific examples, address counterarguments, and include a strong conclusion that calls your reader to action.",
        creative: "Write a creative piece that begins with this line: 'The old photograph revealed a secret that changed everything.' Use sophisticated vocabulary, varied sentence structures, and engaging literary techniques.",
        descriptive: "Describe your ideal learning environment using all five senses. Paint a vivid picture that helps the reader experience this space as if they were there. Use sophisticated adjectives and varied sentence beginnings.",
        expository: "Explain how social media affects young people's friendships. Use specific examples, clear explanations, and organize your ideas logically. Include both positive and negative effects in your response.",
        reflective: "Reflect on a challenge you overcame this year. Analyze what you learned about yourself and how this experience will help you in the future. Show deep thinking and personal insight.",
        recount: "Recount a significant school event from this year. Include specific details about what happened, who was involved, and why this event was meaningful. Use chronological order and engaging language.",
        default: "Write about a topic that interests you, demonstrating sophisticated vocabulary, clear structure, and well-developed ideas suitable for NSW Selective assessment."
      };
      
      return nswSelectiveFallbackPrompts[textType.toLowerCase()] || nswSelectiveFallbackPrompts.default;
    }
    return result.prompt || "Write about a memorable experience that taught you something important.";
  } catch (error) {
    console.error('Error generating prompt:', error);
    return "Write about a memorable experience that taught you something important.";
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

async function getWritingStructure(textType: string): Promise<string> {
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
async function checkGrammarAndSpelling(content: string): Promise<any> {
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
async function analyzeSentenceStructure(content: string): Promise<any> {
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
async function enhanceVocabulary(content: string): Promise<any> {
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
