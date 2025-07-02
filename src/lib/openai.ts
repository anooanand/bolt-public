// File: src/lib/openai.ts
// Copy this entire file and replace your existing openai.ts

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
    console.log('[DEBUG] OpenAI client initialized successfully');
  } else {
    console.log('[DEBUG] OpenAI API key not configured - using fallback responses');
  }
} catch (error) {
  console.error('[DEBUG] Failed to initialize OpenAI client:', error);
  openai = null;
}

// Safe function to check if OpenAI is available
export const isOpenAIAvailable = (): boolean => {
  return openai !== null;
};

// Generate writing prompts based on text type
export async function generatePrompt(textType: string): Promise<string> {
  if (!openai) {
    // Fallback prompts when OpenAI is not available
    const fallbackPrompts: Record<string, string[]> = {
      narrative: [
        "Write about a time when you discovered something unexpected.",
        "Tell the story of a character who finds a mysterious object.",
        "Describe an adventure that begins with opening a door.",
        "Write about a day when everything went wrong, but it turned out to be the best day ever.",
        "Tell the story of a friendship between two unlikely characters."
      ],
      persuasive: [
        "Convince your reader why students should have more outdoor time at school.",
        "Argue for or against having pets in the classroom.",
        "Persuade someone to try a new hobby or activity.",
        "Write about why your favorite book should be read by everyone.",
        "Convince your parents to let you have a later bedtime."
      ],
      descriptive: [
        "Describe your ideal treehouse in vivid detail.",
        "Paint a picture with words of your favorite season.",
        "Describe a place that makes you feel peaceful.",
        "Write a detailed description of your dream bedroom.",
        "Describe the most delicious meal you can imagine."
      ],
      informative: [
        "Explain how to care for a pet to someone who has never had one.",
        "Describe the process of how plants grow from seeds.",
        "Inform readers about an interesting animal and its habitat.",
        "Explain how to make your favorite sandwich step by step.",
        "Teach someone how to play your favorite game."
      ],
      creative: [
        "Write about a world where gravity works backwards.",
        "Imagine you can talk to animals for one day - what happens?",
        "Create a story about a magical school supply that comes to life.",
        "Write about a character who can control the weather with their emotions.",
        "Imagine you find a door in your house that leads to different time periods."
      ],
      expository: [
        "Explain the importance of friendship in your life.",
        "Discuss how technology has changed the way we communicate.",
        "Explain what makes a good leader.",
        "Discuss the benefits of reading books.",
        "Explain how teamwork helps achieve goals."
      ]
    };

    const prompts = fallbackPrompts[textType.toLowerCase()] || fallbackPrompts.narrative;
    return prompts[Math.floor(Math.random() * prompts.length)];
  }

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are an expert writing teacher creating prompts for Year 5-6 students. Generate an engaging and age-appropriate ${textType} writing prompt that encourages creativity and meets curriculum standards. The prompt should be clear, inspiring, and suitable for students aged 10-12.`
        }
      ],
      model: "gpt-4",
      temperature: 0.7,
      max_tokens: 150
    });

    return completion.choices[0].message.content || `Write a ${textType} about a topic that interests you.`;
  } catch (error) {
    console.error('OpenAI prompt generation error:', error);
    // Return fallback prompt
    const fallbackPrompts: Record<string, string[]> = {
      narrative: ["Write about a memorable adventure you've had or would like to have."],
      persuasive: ["Write about something you believe strongly in and convince others to agree with you."],
      descriptive: ["Describe a place that is special to you in vivid detail."],
      informative: ["Explain something you know well to teach others about it."],
      creative: ["Write a creative story about anything that interests you."],
      expository: ["Explain your thoughts about an important topic."]
    };
    
    const prompts = fallbackPrompts[textType.toLowerCase()] || fallbackPrompts.narrative;
    return prompts[0];
  }
}

// Get synonyms for a word
export async function getSynonyms(word: string): Promise<string[]> {
  if (!openai) {
    // Fallback synonyms for common words
    const fallbackSynonyms: Record<string, string[]> = {
      good: ['excellent', 'great', 'wonderful', 'fantastic', 'amazing'],
      bad: ['terrible', 'awful', 'horrible', 'dreadful', 'poor'],
      big: ['large', 'huge', 'enormous', 'massive', 'gigantic'],
      small: ['tiny', 'little', 'miniature', 'petite', 'compact'],
      happy: ['joyful', 'cheerful', 'delighted', 'pleased', 'content'],
      sad: ['unhappy', 'sorrowful', 'gloomy', 'melancholy', 'dejected'],
      fast: ['quick', 'rapid', 'swift', 'speedy', 'hasty'],
      slow: ['gradual', 'leisurely', 'sluggish', 'unhurried', 'delayed'],
      nice: ['pleasant', 'lovely', 'delightful', 'enjoyable', 'agreeable'],
      funny: ['hilarious', 'amusing', 'comical', 'entertaining', 'humorous'],
      smart: ['intelligent', 'clever', 'bright', 'brilliant', 'wise'],
      pretty: ['beautiful', 'lovely', 'attractive', 'gorgeous', 'stunning'],
      scary: ['frightening', 'terrifying', 'spooky', 'creepy', 'eerie'],
      loud: ['noisy', 'booming', 'thunderous', 'deafening', 'roaring'],
      quiet: ['silent', 'peaceful', 'hushed', 'still', 'calm']
    };

    const cleanWord = word.toLowerCase().trim();
    return fallbackSynonyms[cleanWord] || [word];
  }

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `Provide 5 age-appropriate synonyms for the word "${word}" suitable for Year 5-6 students. Return only the synonyms as a comma-separated list without any additional text. Make sure the synonyms are words that 10-12 year old students would understand and use.`
        }
      ],
      model: "gpt-4",
      temperature: 0.7,
      max_tokens: 50
    });

    const synonyms = completion.choices[0].message.content?.split(',').map(s => s.trim()) || [];
    return synonyms.filter(s => s.length > 0);
  } catch (error) {
    console.error('OpenAI synonym generation error:', error);
    return [word];
  }
}

// Rephrase a sentence
export async function rephraseSentence(sentence: string): Promise<string> {
  if (!openai) {
    // Simple fallback rephrasing patterns
    const patterns = [
      `Here's another way to say it: ${sentence}`,
      `You could also write: ${sentence}`,
      `Try this instead: ${sentence}`,
      `Another option: ${sentence}`,
      `Consider this version: ${sentence}`
    ];
    return patterns[Math.floor(Math.random() * patterns.length)];
  }

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `Rephrase this sentence in a way that's suitable for Year 5-6 students while maintaining its meaning and improving clarity. Make the language age-appropriate for 10-12 year olds. Return only the rephrased sentence without any additional explanation.`
        },
        {
          role: "user",
          content: sentence
        }
      ],
      model: "gpt-4",
      temperature: 0.7,
      max_tokens: 100
    });

    return completion.choices[0].message.content || sentence;
  } catch (error) {
    console.error('OpenAI sentence rephrasing error:', error);
    return sentence;
  }
}

// Get writing feedback
export async function getWritingFeedback(content: string, textType: string, assistanceLevel: string = 'medium', feedbackHistory: any[] = []): Promise<any> {
  if (!openai) {
    // Fallback feedback structure
    const wordCount = content.split(/\s+/).filter(Boolean).length;
    const hasGoodLength = wordCount >= 50;
    const hasStructure = content.includes('\n') || content.length > 200;
    
    return {
      overallComment: hasGoodLength ? 
        "Your writing shows good effort and you've included plenty of details!" : 
        "Good start! Try adding more details to make your writing even better.",
      feedbackItems: [
        {
          type: "praise",
          area: "effort",
          text: "You've made a good attempt at this writing task.",
          exampleFromText: "",
          suggestionForImprovement: ""
        },
        {
          type: hasStructure ? "praise" : "suggestion",
          area: "structure",
          text: hasStructure ? 
            "Your writing has good organization." : 
            "Consider organizing your ideas into clear paragraphs.",
          exampleFromText: "",
          suggestionForImprovement: hasStructure ? "" : "Start each paragraph with a topic sentence."
        },
        {
          type: "suggestion",
          area: "vocabulary",
          text: "Try using some more descriptive words to make your writing more interesting.",
          exampleFromText: "",
          suggestionForImprovement: "Replace simple words with more specific ones."
        }
      ],
      focusForNextTime: [
        hasGoodLength ? "Use varied sentence lengths" : "Add more details and examples",
        "Include more descriptive words",
        "Check spelling and punctuation"
      ]
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

    const parsed = JSON.parse(responseContent);
    
    if (!parsed.overallComment || !Array.isArray(parsed.feedbackItems)) {
      throw new Error('Invalid response format: missing required fields');
    }

    return parsed;
  } catch (error) {
    console.error('OpenAI writing feedback error:', error);
    return {
      overallComment: "I'm having trouble analyzing your writing right now. Please try again in a moment.",
      feedbackItems: [],
      focusForNextTime: ["Try again in a few moments"]
    };
  }
}

// Identify common mistakes
export async function identifyCommonMistakes(content: string, textType: string) {
  if (!openai) {
    const wordCount = content.split(/\s+/).filter(Boolean).length;
    const hasCapitalization = /^[A-Z]/.test(content);
    const hasPunctuation = /[.!?]$/.test(content.trim());
    
    return {
      overallAssessment: "Your writing shows effort and creativity.",
      mistakesIdentified: [
        ...(hasCapitalization ? [] : [{
          category: "punctuation",
          issue: "Missing capital letter at the beginning",
          example: content.substring(0, 20) + "...",
          impact: "Makes the writing look unfinished",
          correction: "Start with a capital letter",
          preventionTip: "Always check the first word of your writing"
        }]),
        ...(hasPunctuation ? [] : [{
          category: "punctuation", 
          issue: "Missing ending punctuation",
          example: content.substring(content.length - 20),
          impact: "Sentences need proper endings",
          correction: "Add a period, exclamation mark, or question mark",
          preventionTip: "Read your writing aloud to hear where sentences end"
        }])
      ],
      patternAnalysis: wordCount < 50 ? "Try adding more details to develop your ideas." : "Good length for this type of writing.",
      priorityFixes: [
        hasCapitalization ? "Check spelling" : "Add capital letters",
        hasPunctuation ? "Vary sentence length" : "Add ending punctuation"
      ],
      positiveElements: ["Shows creativity", "Attempts to address the topic", "Uses own voice"]
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

    const parsed = JSON.parse(responseContent);
    
    if (!parsed.overallAssessment || !Array.isArray(parsed.mistakesIdentified)) {
      throw new Error('Invalid response format: missing required fields');
    }

    return parsed;
  } catch (error) {
    console.error('OpenAI mistake identification error:', error);
    return {
      overallAssessment: "Unable to analyze the writing at this time.",
      mistakesIdentified: [],
      patternAnalysis: "Unable to analyze patterns at this time.",
      priorityFixes: ["Please try again later"],
      positiveElements: ["Unable to identify positive elements at this time"]
    };
  }
}

// Generate paraphrases for text
export async function generateParaphrases(text: string): Promise<any> {
  if (!openai) {
    return {
      suggestions: [{
        original: text,
        alternatives: [text, `Another way to say: ${text}`, `You could write: ${text}`],
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
        alternatives: [text],
        start: 0,
        end: text.length
      }]
    };
  }
}

// Evaluate essay
export async function evaluateEssay(content: string, textType: string): Promise<any> {
  if (!openai) {
    const wordCount = content.split(/\s+/).filter(Boolean).length;
    const score = Math.min(Math.max(Math.floor(wordCount / 20), 3), 8);
    
    return {
      overallScore: score,
      strengths: [
        "Attempt at addressing the topic",
        "Shows personal voice",
        wordCount > 50 ? "Good length" : "Getting started"
      ],
      areasForImprovement: [
        wordCount < 100 ? "Add more details and examples" : "Refine word choice",
        "Check spelling and grammar",
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
      overallScore: 5,
      strengths: [
        "Attempt at addressing the topic",
        "Basic structure present"
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

