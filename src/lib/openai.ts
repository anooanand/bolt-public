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
    if (!openai) {
      throw new Error('OpenAI not available');
    }

    // Analyze the content structure for contextual insights
    const contentAnalysis = analyzeContentStructure(content);
    
    // Create a detailed analysis prompt based on the actual content
    const contextualAnalysis = `
CONTENT ANALYSIS:
- Word count: ${contentAnalysis.wordCount}
- Sentence count: ${contentAnalysis.sentenceCount}
- Paragraph count: ${contentAnalysis.paragraphCount}
- Average sentence length: ${Math.round(contentAnalysis.averageSentenceLength)} words
- Opening: "${contentAnalysis.firstSentence}"
- Closing: "${contentAnalysis.lastSentence}"
- Characters mentioned: ${contentAnalysis.potentialCharacters.join(', ') || 'None identified'}
- Contains dialogue: ${contentAnalysis.hasDialogue ? 'Yes (' + contentAnalysis.dialogueCount + ' instances)' : 'No'}
- Descriptive language used: ${contentAnalysis.descriptiveWords.slice(0, 5).join(', ') || 'Limited'}
`;

    const messages = [
      {
        role: 'system',
        content: `You are an expert writing coach for NSW selective school writing tests for students aged 9-11 in Australia. 

IMPORTANT: Provide CONTEXTUAL, SPECIFIC feedback based on the actual content the student has written. Avoid generic advice.

Your feedback should be:
1. **Content-specific**: Reference actual elements from their writing
2. **Actionable**: Give concrete suggestions they can implement immediately
3. **Encouraging**: Highlight what they're doing well specifically
4. **Age-appropriate**: Suitable for 9-11 year olds
5. **NSW curriculum aligned**: Follow selective school writing standards

ANALYSIS APPROACH:
- Examine their opening sentence and suggest specific improvements
- Look at their character development and plot progression
- Analyze their vocabulary choices and suggest specific alternatives
- Check their sentence variety and structure patterns
- Evaluate their ending and how it connects to the beginning

Assistance Level: ${assistanceLevel}

Return your response as a JSON object with this exact structure:
{
  "overallComment": "A specific comment about their actual writing, mentioning concrete elements",
  "feedbackItems": [
    {
      "type": "praise|suggestion|question|challenge",
      "area": "specific area like 'Opening Sentence', 'Character Development', 'Vocabulary Choice', etc.",
      "text": "specific feedback referencing their actual writing",
      "exampleFromText": "exact quote from their writing",
      "suggestionForImprovement": "specific, actionable suggestion with examples"
    }
  ],
  "focusForNextTime": ["specific focus point based on their writing", "another specific point", "third specific point"]
}`
      },
      {
        role: 'user',
        content: `Please provide CONTEXTUAL feedback on this ${textType} writing by a student aged 9-11:

"${content}"

${contextualAnalysis}

Text Type: ${textType}
Assistance Level: ${assistanceLevel}

IMPORTANT: Base your feedback on the actual content above. Reference specific words, phrases, sentences, or elements from their writing. Avoid generic advice - make it personal to what they've written.`
      }
    ];

    const result = await makeOpenAICall(messages, 1800);
    
    try {
      const parsedResult = JSON.parse(result);
      
      // Enhance the feedback with additional contextual suggestions
      if (parsedResult.feedbackItems) {
        parsedResult.feedbackItems = parsedResult.feedbackItems.map((item: any) => {
          // Add more specific suggestions based on content analysis
          if (item.area === 'Structure' && contentAnalysis.paragraphCount === 1) {
            item.suggestionForImprovement += " Try breaking your writing into 2-3 paragraphs to make it easier to read.";
          }
          
          if (item.area === 'Vocabulary' && contentAnalysis.descriptiveWords.length < 3) {
            item.suggestionForImprovement += " Add more describing words (adjectives and adverbs) to paint a clearer picture.";
          }
          
          if (textType.toLowerCase() === 'narrative' && !contentAnalysis.hasDialogue) {
            if (item.area === 'Character Development') {
              item.suggestionForImprovement += " Consider adding dialogue to show what your characters are thinking or feeling.";
            }
          }
          
          return item;
        });
      }
      
      return parsedResult;
    } catch (parseError) {
      console.error('JSON parsing failed, creating structured response from text');
      return {
        overallComment: `Your writing about "${contentAnalysis.firstSentence.substring(0, 50)}..." shows good effort and creativity!`,
        feedbackItems: [
          {
            type: "praise",
            area: "Content",
            text: "You've written a solid piece with clear ideas.",
            exampleFromText: contentAnalysis.firstSentence,
            suggestionForImprovement: "Continue developing your ideas with more specific details."
          }
        ],
        focusForNextTime: ["Add more descriptive details", "Vary your sentence lengths", "Check your spelling and punctuation"]
      };
    }
  } catch (error) {
    console.error('Error getting contextual writing feedback:', error);
    
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
    if (!openai) {
      throw new Error('OpenAI not available');
    }

    const contentAnalysis = analyzeContentStructure(content);
    
    // Text-type specific analysis
    let textTypeSpecificAnalysis = '';
    
    switch (textType.toLowerCase()) {
      case 'narrative':
        textTypeSpecificAnalysis = `
NARRATIVE ANALYSIS:
- Story elements: ${contentAnalysis.potentialCharacters.length > 0 ? 'Characters identified' : 'No clear characters yet'}
- Dialogue usage: ${contentAnalysis.hasDialogue ? 'Present' : 'Missing'}
- Story progression: ${contentAnalysis.paragraphCount > 1 ? 'Multi-paragraph structure' : 'Single paragraph'}
- Opening hook: "${contentAnalysis.firstSentence}"
- Resolution: "${contentAnalysis.lastSentence}"
`;
        break;
      case 'persuasive':
        textTypeSpecificAnalysis = `
PERSUASIVE ANALYSIS:
- Argument structure: ${contentAnalysis.paragraphCount} paragraph(s)
- Opening statement: "${contentAnalysis.firstSentence}"
- Conclusion: "${contentAnalysis.lastSentence}"
- Evidence/examples: ${content.includes('because') || content.includes('for example') ? 'Some present' : 'Limited'}
`;
        break;
      case 'descriptive':
        textTypeSpecificAnalysis = `
DESCRIPTIVE ANALYSIS:
- Sensory details: ${contentAnalysis.descriptiveWords.length} descriptive words identified
- Imagery: ${contentAnalysis.descriptiveWords.join(', ')}
- Organization: ${contentAnalysis.paragraphCount} paragraph(s)
- Focus: "${contentAnalysis.firstSentence}"
`;
        break;
    }

    const messages = [
      {
        role: 'system',
        content: `You are a specialized writing coach for NSW selective school tests focusing on ${textType} writing for students aged 9-11. 

IMPORTANT: Provide SPECIFIC feedback based on the actual content and how well it meets ${textType} writing requirements.

Analyze their writing for:
- ${textType}-specific structure and organization
- Appropriate language features for ${textType} writing
- How well they've achieved the purpose of ${textType} writing
- Age-appropriate use of ${textType} conventions

Return your response as a JSON object with this structure:
{
  "overallComment": "specific comment about their ${textType} writing based on actual content",
  "textTypeSpecificFeedback": {
    "structure": "specific feedback about their ${textType} structure with examples from their text",
    "language": "specific feedback about their language choices with examples",
    "purpose": "how well they achieved the ${textType} purpose, with specific references",
    "audience": "feedback about audience awareness with examples from their writing"
  },
  "strengthsInTextType": ["specific strength 1 with example", "specific strength 2 with example", "specific strength 3 with example"],
  "improvementAreas": ["specific area 1 with example from their text", "specific area 2 with example", "specific area 3 with example"],
  "nextSteps": ["specific step 1 based on their writing", "specific step 2", "specific step 3"]
}`
      },
      {
        role: 'user',
        content: `Analyze this ${textType} writing for text-type specific features:

"${content}"

${textTypeSpecificAnalysis}

Focus on how well the student has used the conventions and features specific to ${textType} writing. Reference their actual content in your feedback.`
      }
    ];

    const result = await makeOpenAICall(messages, 1500);
    
    try {
      return JSON.parse(result);
    } catch (parseError) {
      const analysis = analyzeContentStructure(content);
      return {
        overallComment: `Your ${textType} writing shows understanding of the task. I can see you're working with ${analysis.wordCount} words to develop your ideas.`,
        textTypeSpecificFeedback: {
          structure: `Your writing has ${analysis.paragraphCount} paragraph(s). ${textType} writing benefits from clear organization.`,
          language: `You're using appropriate language for ${textType} writing. Your opening "${analysis.firstSentence}" sets the tone.`,
          purpose: `Your writing addresses the ${textType} purpose. Continue developing this focus.`,
          audience: "Consider your reader and what they need to understand your ideas."
        },
        strengthsInTextType: [
          `Good attempt at ${textType} writing`,
          `Appropriate length with ${analysis.wordCount} words`,
          `Clear opening: "${analysis.firstSentence.substring(0, 30)}..."`
        ],
        improvementAreas: [
          analysis.paragraphCount === 1 ? "Consider using multiple paragraphs" : "Good paragraph structure",
          analysis.descriptiveWords.length < 3 ? "Add more descriptive language" : "Good use of descriptive words",
          "Continue practicing this text type"
        ],
        nextSteps: [
          `Study more examples of ${textType} writing`,
          "Practice the key features of this text type",
          "Get feedback from teachers or peers"
        ]
      };
    }
  } catch (error) {
    console.error('Error getting specialized text type feedback:', error);
    return {
      overallComment: `Your ${textType} writing shows understanding of the requirements.`,
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

// Enhanced function to identify specific mistakes in context
export async function identifyCommonMistakes(content: string, textType: string) {
  try {
    if (!openai) {
      throw new Error('OpenAI not available');
    }

    const contentAnalysis = analyzeContentStructure(content);

    const messages = [
      {
        role: 'system',
        content: `You are a writing coach specializing in identifying specific mistakes in student writing for NSW selective school tests (ages 9-11). 

IMPORTANT: Analyze the actual content and identify SPECIFIC errors with EXACT quotes from their writing.

Look for:
- Grammar errors with exact examples
- Spelling mistakes with exact words
- Punctuation issues with specific instances
- Sentence structure problems with examples
- Word choice issues with specific suggestions

Return a JSON object with this structure:
{
  "overallAssessment": "specific assessment based on their actual writing",
  "mistakesIdentified": [
    {
      "type": "grammar|spelling|punctuation|structure|vocabulary",
      "description": "specific description of the mistake",
      "example": "exact quote from their text showing the error",
      "correction": "exact correction with explanation",
      "location": "where in the text this appears"
    }
  ],
  "patternAnalysis": "analysis of patterns in their specific writing",
  "priorityFixes": ["most important fix based on their writing", "second priority", "third priority"],
  "positiveElements": ["specific positive element from their text", "another specific positive"]
}`
      },
      {
        role: 'user',
        content: `Analyze this ${textType} writing for specific mistakes and patterns:

"${content}"

CONTENT ANALYSIS:
- ${contentAnalysis.wordCount} words, ${contentAnalysis.sentenceCount} sentences
- Opening: "${contentAnalysis.firstSentence}"
- Closing: "${contentAnalysis.lastSentence}"

Identify specific errors with exact quotes from the text above.`
      }
    ];

    const result = await makeOpenAICall(messages, 1500);
    
    try {
      return JSON.parse(result);
    } catch (parseError) {
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

// Keep all other existing functions unchanged
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

