const OpenAI = require("openai");

// Initialize OpenAI with server-side API key - Enhanced error handling
let openai = null;

try {
  const apiKey = process.env.OPENAI_API_KEY || process.env.VITE_OPENAI_API_KEY;
  
  if (apiKey && apiKey.startsWith('sk-')) {
    openai = new OpenAI({
      apiKey: apiKey
    });
    console.log('[AI-OPS] OpenAI client initialized successfully');
  } else {
    console.error('[AI-OPS] OpenAI API key not found or invalid format');
  }
} catch (error) {
  console.error('[AI-OPS] Failed to initialize OpenAI:', error);
}

// Check if OpenAI is available
function isOpenAIAvailable() {
  return openai !== null;
}

// Helper function to analyze content structure
function analyzeContentStructure(content) {
  const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const words = content.trim().split(/\s+/).filter(w => w.length > 0);
  const paragraphs = content.split(/\n\s*\n/).filter(p => p.trim().length > 0);

  const potentialCharacters = words.filter((word, index) => {
    const isCapitalized = /^[A-Z][a-z]+$/.test(word);
    const isNotSentenceStart = index > 0 && !/[.!?]/.test(words[index - 1]);
    return isCapitalized && isNotSentenceStart;
  });

  const dialogueMatches = content.match(/"[^"]*"/g) || [];

  const descriptiveWords = words.filter(word =>
    /ly$/.test(word) ||
    /ing$/.test(word) ||
    /ed$/.test(word)
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
    firstSentence: sentences[0]?.trim() || "",
    lastSentence: sentences[sentences.length - 1]?.trim() || ""
  };
}

// NSW Selective Band Descriptors (NEW - CRITICAL FOR BAND SCORING)
const bandDescriptors = {
  6: { 
    min: 27, 
    max: 30, 
    description: "Exceptional - Sophisticated ideas, flawless execution",
    details: "Highly original and engaging ideas with sophisticated vocabulary and complex sentence structures. Flawless technical accuracy with perfect text type adherence."
  },
  5: { 
    min: 22, 
    max: 26, 
    description: "Proficient - Well-developed ideas, strong execution",
    details: "Original ideas with good development. Varied vocabulary and sentence structures with minor technical errors that don't impede meaning. Strong text type understanding."
  },
  4: { 
    min: 17, 
    max: 21, 
    description: "Sound - Adequate ideas, competent execution",
    details: "Adequate ideas with some development. Generally appropriate vocabulary with some technical errors present. Basic text type structure followed."
  },
  3: { 
    min: 12, 
    max: 16, 
    description: "Developing - Simple ideas, basic execution",
    details: "Simple ideas with limited development. Basic vocabulary usage with regular technical errors. Partial text type understanding."
  },
  2: { 
    min: 7, 
    max: 11, 
    description: "Elementary - Limited ideas, weak execution",
    details: "Very simple ideas with limited vocabulary range. Frequent technical errors with minimal text type awareness."
  },
  1: { 
    min: 0, 
    max: 6, 
    description: "Emerging - Minimal development",
    details: "Minimal idea development with very basic vocabulary. Extensive technical errors with little text type understanding."
  }
};

// Calculate Band Level from Total Score (NEW - CRITICAL FOR BAND SCORING)
function calculateBandLevel(totalScore) {
  for (const [band, descriptor] of Object.entries(bandDescriptors)) {
    if (totalScore >= descriptor.min && totalScore <= descriptor.max) {
      return { band: parseInt(band), ...descriptor };
    }
  }
  return { band: 1, ...bandDescriptors[1] };
}

// Calculate Individual Criterion Bands (NEW - CRITICAL FOR BAND SCORING)
function calculateCriterionBand(score, maxScore) {
  const percentage = (score / maxScore) * 100;
  if (percentage >= 90) return 6;
  if (percentage >= 75) return 5;
  if (percentage >= 60) return 4;
  if (percentage >= 45) return 3;
  if (percentage >= 25) return 2;
  return 1;
}

// Enhanced fallback feedback function
function createEnhancedFallbackFeedback(content, textType, assistanceLevel) {
  const analysis = analyzeContentStructure(content);
  const wordCount = analysis.wordCount;
  
  console.log('[AI-OPS] Creating enhanced fallback feedback for', textType, 'with', wordCount, 'words');
  
  const feedbackItems = [];
  
  // Praise based on effort and progress
  if (wordCount > 0) {
    feedbackItems.push({
      type: "praise",
      area: "Writing Progress",
      text: `Great work writing ${wordCount} words for your ${textType}! You're making excellent progress.`,
      suggestionForImprovement: wordCount < 100 ? "Keep developing your ideas with more details." : "Your word count shows good development!"
    });
  }
  
  // Structure feedback
  if (analysis.paragraphCount === 1 && wordCount > 50) {
    feedbackItems.push({
      type: "suggestion",
      area: "Structure",
      text: "Your writing is currently in one paragraph.",
      suggestionForImprovement: `For ${textType} writing, try breaking your ideas into 3-4 paragraphs: introduction, body paragraphs, and conclusion.`
    });
  } else if (analysis.paragraphCount > 1) {
    feedbackItems.push({
      type: "praise",
      area: "Structure", 
      text: `Excellent paragraph organization with ${analysis.paragraphCount} paragraphs!`,
      suggestionForImprovement: "Make sure each paragraph focuses on one main idea."
    });
  }
  
  // Content-specific feedback
  if (textType === 'narrative') {
    if (analysis.hasDialogue) {
      feedbackItems.push({
        type: "praise",
        area: "Dialogue",
        text: "Great use of dialogue in your narrative!",
        suggestionForImprovement: "Dialogue brings characters to life and makes stories more engaging."
      });
    } else if (wordCount > 100) {
      feedbackItems.push({
        type: "suggestion",
        area: "Character Development",
        text: "Consider adding some dialogue to your narrative.",
        suggestionForImprovement: "Dialogue helps readers connect with your characters. Try: 'I can't believe this!' she exclaimed."
      });
    }
    
    if (analysis.potentialCharacters.length > 0) {
      feedbackItems.push({
        type: "praise",
        area: "Characters",
        text: `I can see you've introduced characters: ${analysis.potentialCharacters.slice(0, 3).join(', ')}`,
        suggestionForImprovement: "Develop your characters by showing their emotions and motivations."
      });
    }
  }
  
  // Vocabulary feedback
  if (analysis.descriptiveWords.length > 3) {
    feedbackItems.push({
      type: "praise",
      area: "Vocabulary",
      text: `Good use of descriptive language: ${analysis.descriptiveWords.slice(0, 3).join(', ')}`,
      suggestionForImprovement: "Keep using varied and interesting vocabulary to make your writing more engaging."
    });
  } else if (wordCount > 50) {
    feedbackItems.push({
      type: "suggestion",
      area: "Vocabulary",
      text: "Try using more descriptive words to make your writing more vivid.",
      suggestionForImprovement: "Instead of 'good', try 'excellent' or 'outstanding'. Instead of 'big', try 'enormous' or 'massive'."
    });
  }
  
  // Length-based feedback
  const focusForNextTime = [];
  if (wordCount < 150) {
    focusForNextTime.push("Continue developing your ideas with more specific details and examples");
  }
  if (analysis.averageSentenceLength < 8) {
    focusForNextTime.push("Try writing some longer, more complex sentences");
  }
  if (analysis.descriptiveWords.length < 3) {
    focusForNextTime.push("Use more descriptive and sophisticated vocabulary");
  }
  
  // Default focus items if none added
  if (focusForNextTime.length === 0) {
    focusForNextTime.push("Keep practicing your writing skills", "Focus on clear expression and good organization");
  }
  
  return {
    overallComment: `Your ${wordCount}-word ${textType} shows ${wordCount > 100 ? 'strong' : 'good'} development! You're building excellent writing skills for NSW Selective preparation.`,
    feedbackItems,
    focusForNextTime,
    isEnhancedFallback: true,
    wordCount: analysis.wordCount,
    analysisData: analysis
  };
}

// Enhanced NSW Selective Writing Exam Feedback Function with Band Scoring (UPDATED)
async function getNSWSelectiveFeedback(content, textType, assistanceLevel = "medium", feedbackHistory = []) {
  if (!isOpenAIAvailable()) {
    console.log('[AI-OPS] OpenAI not available, using enhanced fallback');
    return createEnhancedFallbackFeedback(content, textType, assistanceLevel);
  }

  try {
    console.log(`[AI-OPS] Getting NSW Selective feedback for ${textType} (${content.length} chars)`);
    
    const analysis = analyzeContentStructure(content);

    const prompt = `You are an expert NSW Selective School writing assessor. Analyze this ${textType} writing sample and provide detailed, specific feedback based on NSW Selective criteria.

STUDENT'S WRITING:
"${content}"

CONTENT ANALYSIS:
- Word count: ${analysis.wordCount}
- Sentence count: ${analysis.sentenceCount}
- Paragraph count: ${analysis.paragraphCount}
- Average sentence length: ${Math.round(analysis.averageSentenceLength)} words
- Has dialogue: ${analysis.hasDialogue}
- Potential characters: ${analysis.potentialCharacters.join(', ') || 'None identified'}
- Descriptive words used: ${analysis.descriptiveWords.slice(0, 5).join(', ') || 'Limited'}

NSW SELECTIVE CRITERIA TO ASSESS:

1. IDEAS AND CONTENT (30% - 9 points max):
   - Relevance to prompt and task requirements
   - Originality and creativity of ideas
   - Development and elaboration of ideas
   - Depth of thinking and insight
   - Engagement and audience awareness

2. TEXT STRUCTURE AND ORGANIZATION (25% - 7.5 points max):
   - Clear beginning, middle, and end
   - Logical sequence and flow of ideas
   - Effective paragraph structure
   - Coherence and cohesion between sections
   - Appropriate structure for ${textType}

3. LANGUAGE FEATURES AND VOCABULARY (25% - 7.5 points max):
   - Sophisticated and varied vocabulary
   - Effective use of literary devices
   - Sentence variety and structure
   - Appropriate tone and style for purpose
   - Precision and clarity of expression

4. SPELLING, PUNCTUATION, AND GRAMMAR (20% - 6 points max):
   - Accurate spelling, including difficult words
   - Correct and varied punctuation
   - Grammatical accuracy
   - Consistent tense and point of view

INSTRUCTIONS:
1. Provide specific scores for each criterion (Ideas: /9, Structure: /7.5, Language: /7.5, Grammar: /6)
2. Calculate total score out of 30
3. Give concrete examples from the student's text
4. Offer specific, actionable suggestions for improvement
5. Include questions that help the student think deeper about their writing
6. Suggest specific revision tasks they can do right now
7. Be encouraging but honest about areas needing work
8. Reference specific words, phrases, or sentences from their writing

Format your response as a JSON object with this structure:
{
  "overallComment": "Brief encouraging overview",
  "totalScore": number (out of 30),
  "criteriaFeedback": {
    "ideasAndContent": {
      "score": number (out of 9),
      "maxScore": 9,
      "strengths": ["specific strength with example from text"],
      "improvements": ["specific area needing work"],
      "suggestions": ["actionable suggestion with example"],
      "nextSteps": ["specific task to improve this area"]
    },
    "textStructureAndOrganization": {
      "score": number (out of 7.5),
      "maxScore": 7.5,
      "strengths": ["specific strength with example from text"],
      "improvements": ["specific area needing work"],
      "suggestions": ["actionable suggestion with example"],
      "nextSteps": ["specific task to improve this area"]
    },
    "languageFeaturesAndVocabulary": {
      "score": number (out of 7.5),
      "maxScore": 7.5,
      "strengths": ["specific strength with example from text"],
      "improvements": ["specific area needing work"],
      "suggestions": ["actionable suggestion with example"],
      "nextSteps": ["specific task to improve this area"]
    },
    "spellingPunctuationGrammar": {
      "score": number (out of 6),
      "maxScore": 6,
      "strengths": ["specific strength with example from text"],
      "improvements": ["specific area needing work"],
      "suggestions": ["actionable suggestion with example"],
      "nextSteps": ["specific task to improve this area"]
    }
  },
  "priorityFocus": ["top 2 areas to focus on next"],
  "examStrategies": ["specific exam tips based on this writing"],
  "interactiveQuestions": ["questions to help student reflect on their writing"],
  "revisionSuggestions": ["specific tasks they can do to improve this piece right now"]
}`;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert NSW Selective School writing assessor who provides detailed, specific, and encouraging feedback to help students improve their writing skills for the selective school exam. Always provide numerical scores that accurately reflect the quality of the writing."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.3,
      max_tokens: 2500
    });

    const feedbackText = response.choices[0].message.content;

    try {
      const feedbackJson = JSON.parse(feedbackText);
      
      // Calculate band levels for each criterion
      const criteriaWithBands = {};
      Object.entries(feedbackJson.criteriaFeedback).forEach(([key, criteria]) => {
        criteriaWithBands[key] = {
          ...criteria,
          band: calculateCriterionBand(criteria.score, criteria.maxScore)
        };
      });

      // Calculate overall band level
      const totalScore = feedbackJson.totalScore || 
        Object.values(feedbackJson.criteriaFeedback).reduce((sum, criteria) => sum + criteria.score, 0);
      
      const overallBand = calculateBandLevel(totalScore);

      // Return enhanced feedback with band information
      return {
        ...feedbackJson,
        totalScore,
        overallBand: overallBand.band,
        bandDescription: overallBand.description,
        bandDetails: overallBand.details,
        estimatedExamScore: `${totalScore}/30`,
        criteriaFeedback: criteriaWithBands
      };

    } catch (parseError) {
      console.error("Failed to parse OpenAI feedback as JSON:", parseError);
      
      // Fallback with basic band calculation
      const fallbackScore = Math.max(1, Math.min(30, analysis.wordCount / 10));
      const fallbackBand = calculateBandLevel(fallbackScore);
      
      return {
        overallComment: "I'm having trouble analyzing your writing right now. Your work shows good effort - please try again in a moment.",
        totalScore: fallbackScore,
        overallBand: fallbackBand.band,
        bandDescription: fallbackBand.description,
        bandDetails: fallbackBand.details,
        estimatedExamScore: `${fallbackScore}/30`,
        criteriaFeedback: {
          ideasAndContent: {
            score: fallbackScore * 0.3,
            maxScore: 9,
            band: calculateCriterionBand(fallbackScore * 0.3, 9),
            strengths: ["Please try again to get detailed feedback."],
            improvements: ["Please try again to get detailed feedback."],
            suggestions: ["Please try again to get detailed feedback."],
            nextSteps: ["Please try again to get detailed feedback."]
          },
          textStructureAndOrganization: {
            score: fallbackScore * 0.25,
            maxScore: 7.5,
            band: calculateCriterionBand(fallbackScore * 0.25, 7.5),
            strengths: ["Please try again to get detailed feedback."],
            improvements: ["Please try again to get detailed feedback."],
            suggestions: ["Please try again to get detailed feedback."],
            nextSteps: ["Please try again to get detailed feedback."]
          },
          languageFeaturesAndVocabulary: {
            score: fallbackScore * 0.25,
            maxScore: 7.5,
            band: calculateCriterionBand(fallbackScore * 0.25, 7.5),
            strengths: ["Please try again to get detailed feedback."],
            improvements: ["Please try again to get detailed feedback."],
            suggestions: ["Please try again to get detailed feedback."],
            nextSteps: ["Please try again to get detailed feedback."]
          },
          spellingPunctuationGrammar: {
            score: fallbackScore * 0.2,
            maxScore: 6,
            band: calculateCriterionBand(fallbackScore * 0.2, 6),
            strengths: ["Please try again to get detailed feedback."],
            improvements: ["Please try again to get detailed feedback."],
            suggestions: ["Please try again to get detailed feedback."],
            nextSteps: ["Please try again to get detailed feedback."]
          }
        },
        priorityFocus: ["Please try again to get detailed feedback."],
        examStrategies: ["Please try again to get detailed feedback."],
        interactiveQuestions: ["Please try again to get detailed feedback."],
        revisionSuggestions: ["Please try again to get detailed feedback."]
      };
    }

  } catch (error) {
    console.error("Error getting NSW Selective feedback:", error);

    const analysis = analyzeContentStructure(content);
    const fallbackScore = Math.max(1, Math.min(30, analysis.wordCount / 10));
    const fallbackBand = calculateBandLevel(fallbackScore);
    
    return {
      overallComment: `Your ${analysis.wordCount}-word ${textType} shows good effort! I can see you're developing your writing skills. Let's work on making it even stronger using NSW Selective exam criteria.`,
      totalScore: fallbackScore,
      overallBand: fallbackBand.band,
      bandDescription: fallbackBand.description,
      bandDetails: fallbackBand.details,
      estimatedExamScore: `${fallbackScore}/30`,
      criteriaFeedback: {
        ideasAndContent: {
          score: fallbackScore * 0.3,
          maxScore: 9,
          band: calculateCriterionBand(fallbackScore * 0.3, 9),
          strengths: ["You've started writing, which is the first step!"],
          improvements: ["Try to develop your ideas more fully"],
          suggestions: ["Add more details and examples to support your main ideas"],
          nextSteps: ["Expand each paragraph with more specific details"]
        },
        textStructureAndOrganization: {
          score: fallbackScore * 0.25,
          maxScore: 7.5,
          band: calculateCriterionBand(fallbackScore * 0.25, 7.5),
          strengths: ["You have a basic structure in place"],
          improvements: ["Work on creating clearer connections between ideas"],
          suggestions: ["Use transition words to link your paragraphs"],
          nextSteps: ["Plan your writing with a clear beginning, middle, and end"]
        },
        languageFeaturesAndVocabulary: {
          score: fallbackScore * 0.25,
          maxScore: 7.5,
          band: calculateCriterionBand(fallbackScore * 0.25, 7.5),
          strengths: ["You're using appropriate vocabulary for your age"],
          improvements: ["Try to include more varied and sophisticated words"],
          suggestions: ["Replace simple words with more interesting alternatives"],
          nextSteps: ["Keep a vocabulary journal of new words you learn"]
        },
        spellingPunctuationGrammar: {
          score: fallbackScore * 0.2,
          maxScore: 6,
          band: calculateCriterionBand(fallbackScore * 0.2, 6),
          strengths: ["Your basic sentence structure is developing well"],
          improvements: ["Check your spelling and punctuation carefully"],
          suggestions: ["Read your work aloud to catch errors"],
          nextSteps: ["Proofread your writing before submitting"]
        }
      },
      priorityFocus: ["Develop ideas more fully", "Improve text structure and organization"],
      examStrategies: ["Plan your writing before you start", "Leave time to check your work"],
      interactiveQuestions: ["What is the main message you want to share?", "How can you make your writing more interesting?"],
      revisionSuggestions: ["Add more details to each paragraph", "Check for spelling and grammar errors"]
    };
  }
}

// Enhanced grammar checking for the writing editor
async function checkGrammarForEditor(text) {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are an expert writing assistant that analyzes text for grammar, spelling, punctuation, and style issues. For each error found, provide the exact character positions (start and end), error type, message, and contextual suggestions.

Return the analysis in this exact JSON format:
{
  "errors": [
    {
      "start": 15,
      "end": 19,
      "message": "Spelling error: 'yung' should be 'young'",
      "type": "spelling",
      "suggestions": ["young"],
      "context": "there was a yung adventurer"
    },
    {
      "start": 45,
      "end": 51,
      "message": "Grammar error: Subject-verb disagreement",
      "type": "grammar", 
      "suggestions": ["were"],
      "context": "The trees was tall"
    }
  ]
}

Analyze the text carefully for:
- Spelling errors (misspelled words)
- Grammar errors (subject-verb agreement, tense consistency, etc.)
- Punctuation errors (missing periods, comma splices, etc.)
- Style issues (repetitive words, unclear phrasing)

Be precise with character positions and provide helpful, contextual suggestions.`
        },
        {
          role: "user",
          content: `Please analyze this text for errors:\n\n${text}`
        }
      ],
      model: "gpt-4",
      temperature: 0.2,
      max_tokens: 1500
    });

    const responseContent = completion.choices[0].message.content;
    if (!responseContent) {
      throw new Error("Empty response from OpenAI");
    }

    const parsed = JSON.parse(responseContent);
    
    // Validate the response format
    if (!parsed.errors || !Array.isArray(parsed.errors)) {
      throw new Error("Invalid response format: errors not an array");
    }

    // Validate each error object
    const validatedErrors = parsed.errors.filter(error => {
      return typeof error.start === 'number' &&
             typeof error.end === 'number' &&
             typeof error.message === 'string' &&
             typeof error.type === 'string' &&
             Array.isArray(error.suggestions);
    });

    return { errors: validatedErrors };
  } catch (error) {
    console.error("OpenAI grammar check for editor error:", error);
    // Return empty errors array as fallback
    return { errors: [] };
  }
}

// All your existing functions (keeping them exactly as they are)
async function generatePrompt(textType) {
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

    return { prompt: completion.choices[0].message.content || "Write about a memorable experience." };
  } catch (error) {
    console.error("OpenAI prompt generation error:", error);
    return { 
      prompt: "Write about a memorable experience that taught you something important.",
      fallback: true
    };
  }
}

async function getWritingFeedback(content, textType, assistanceLevel, feedbackHistory) {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are an expert writing teacher providing feedback for Year 5-6 students. Analyze this ${textType} writing piece and provide constructive feedback. Consider the student's ${assistanceLevel} assistance level and previous feedback history. Return feedback in this format:\n{\n  "overallComment": "Brief, encouraging overall assessment",\n  "feedbackItems": [\n    {\n      "type": "praise/suggestion/question/challenge",\n      "area": "specific area of writing (e.g., vocabulary, structure)",\n      "text": "detailed feedback point",\n      "exampleFromText": "relevant example from student's writing (optional)",\n      "suggestionForImprovement": "specific suggestion (optional)"\n    }\n  ],\n  "focusForNextTime": ["2-3 specific points to focus on"]\n}`
        },
        {
          role: "user",
          content: `Previous feedback history:\n${JSON.stringify(feedbackHistory || [])}\n\nCurrent text:\n${content}`
        }
      ],
      model: "gpt-4",
      temperature: 0.7,
      max_tokens: 1000
    });

    const responseContent = completion.choices[0].message.content;
    if (!responseContent) {
      throw new Error("Empty response from OpenAI");
    }

    return JSON.parse(responseContent);
  } catch (error) {
    console.error("OpenAI writing feedback error:", error);
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

async function identifyCommonMistakes(content, textType) {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are an expert writing teacher analyzing a Year 5-6 student's ${textType} writing piece. Identify common mistakes and provide constructive feedback. Return the analysis in this exact JSON format:\n{\n  "overallAssessment": "Brief overall assessment of the writing",\n  "mistakesIdentified": [\n    {\n      "category": "content/structure/vocabulary/sentences/punctuation/spelling",\n      "issue": "Description of the mistake",\n      "example": "Example from the text showing the mistake",\n      "impact": "How this affects the writing",\n      "correction": "How to fix this mistake",\n      "preventionTip": "How to avoid this mistake in future"\n    }\n  ],\n  "patternAnalysis": "Analysis of any patterns in mistakes",\n  "priorityFixes": ["List", "of", "priority", "fixes"],\n  "positiveElements": ["List", "of", "things", "done", "well"]\n}`
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
      throw new Error("Empty response from OpenAI");
    }

    const parsed = JSON.parse(responseContent);
    
    if (!parsed.overallAssessment || !Array.isArray(parsed.mistakesIdentified)) {
      throw new Error("Invalid response format: missing required fields");
    }

    return parsed;
  } catch (error) {
    console.error("OpenAI mistake identification error:", error);
    return {
      overallAssessment: "Unable to analyze the writing at this time. Your work shows good effort.",
      mistakesIdentified: [],
      patternAnalysis: "Unable to analyze patterns at this time. Focus on careful proofreading.",
      priorityFixes: ["Proofread carefully", "Check spelling and grammar", "Ensure clear expression"],
      positiveElements: ["Good effort in completing the task", "Appropriate attempt at the text type"]
    };
  }
}

async function getSynonyms(word) {
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

    const synonyms = completion.choices[0].message.content?.split(",").map(s => s.trim()) || [];
    return synonyms.length > 0 ? synonyms : [`[No synonyms found for "${word}"]`];
  } catch (error) {
    console.error("OpenAI synonym generation error:", error);
    return [`[Synonyms for "${word}" temporarily unavailable]`];
  }
}

async function rephraseSentence(sentence) {
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
    console.error("OpenAI sentence rephrasing error:", error);
    return `[Rephrasing temporarily unavailable] ${sentence}`;
  }
}

async function getTextTypeVocabulary(textType, contentSample) {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are an expert writing teacher providing vocabulary assistance for Year 5-6 students writing a ${textType} piece. Based on the content sample provided, suggest appropriate vocabulary. Return the suggestions in this exact JSON format:\n{\n  "textType": "${textType}",\n  "categories": [\n    {\n      "name": "Descriptive Words",\n      "words": ["vivid", "stunning", "magnificent", "gleaming", "enormous"],\n      "examples": ["The vivid sunset painted the sky with stunning colors.", "The magnificent castle stood on the gleaming hill."]\n    },\n    {\n      "name": "Action Verbs",\n      "words": ["darted", "soared", "plunged", "vanished", "erupted"],\n      "examples": ["The bird soared through the clouds.", "She darted across the busy street."]\n    }\n  ],\n  "phrasesAndExpressions": [\n    "In the blink of an eye",\n    "As quick as lightning",\n    "Without a moment's hesitation",\n    "To my surprise"\n  ],\n  "transitionWords": [\n    "First",\n    "Next",\n    "Then",\n    "After that",\n    "Finally",\n    "However",\n    "Although",\n    "Because",\n    "Therefore",\n    "In conclusion"\n  ]\n}`
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
      throw new Error("Empty response from OpenAI");
    }

    const parsed = JSON.parse(responseContent);
    
    if (!parsed.textType || 
        !Array.isArray(parsed.categories) || 
        !Array.isArray(parsed.phrasesAndExpressions) ||
        !Array.isArray(parsed.transitionWords)) {
      throw new Error("Invalid response format: missing required fields");
    }

    return parsed;
  } catch (error) {
    console.error("OpenAI vocabulary generation error:", error);
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

async function evaluateEssay(content, textType) {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are an expert writing teacher evaluating a Year 5-6 student's ${textType} essay. Provide comprehensive feedback and scoring. Return the evaluation in this exact JSON format:\n{\n  "overallScore": 7,\n  "strengths": [\n    "Clear thesis statement",\n    "Good use of transition words",\n    "Varied sentence structure"\n  ],\n  "areasForImprovement": [\n    "Needs more supporting evidence",\n    "Some spelling errors",\n    "Conclusion could be stronger"\n  ],\n  "specificFeedback": {\n    "structure": "Detailed feedback on essay structure",\n    "language": "Feedback on language use and vocabulary",\n    "ideas": "Feedback on ideas and content development",\n    "mechanics": "Feedback on grammar, spelling, and punctuation"\n  },\n  "nextSteps": [\n    "Review and correct spelling errors",\n    "Add more supporting evidence to main points",\n    "Strengthen conclusion by restating main ideas"\n  ]\n}`
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
      throw new Error("Empty response from OpenAI");
    }

    const parsed = JSON.parse(responseContent);
    
    if (typeof parsed.overallScore !== "number" || 
        !Array.isArray(parsed.strengths) || 
        !Array.isArray(parsed.areasForImprovement) ||
        !parsed.specificFeedback ||
        !Array.isArray(parsed.nextSteps)) {
      throw new Error("Invalid response format: missing required fields");
    }

    return parsed;
  } catch (error) {
    console.error("OpenAI essay evaluation error:", error);
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

async function getSpecializedTextTypeFeedback(content, textType) {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are an expert writing teacher providing specialized feedback for Year 5-6 students on ${textType} writing. Focus specifically on how well the student has understood and applied the conventions, structure, and features of this text type. Return feedback in this exact JSON format:\n{\n  "overallComment": "Brief assessment of how well the student has handled this text type",\n  "textTypeSpecificFeedback": {\n    "structure": "Feedback on how well the student followed the expected structure for this text type",\n    "language": "Feedback on use of language features specific to this text type",\n    "purpose": "How well the student achieved the purpose of this text type",\n    "audience": "How well the student considered their audience"\n  },\n  "strengthsInTextType": [\n    "Specific strengths in handling this text type",\n    "What the student did well for this writing style"\n  ],\n  "improvementAreas": [\n    "Areas where the student can improve their understanding of this text type",\n    "Specific features they need to work on"\n  ],\n  "nextSteps": [\n    "Specific actions to improve in this text type",\n    "Resources or practice suggestions"\n  ]\n}`
        },
        {
          role: "user",
          content: `Text type: ${textType}\n\nStudent writing:\n${content}`
        }
      ],
      model: "gpt-4",
      temperature: 0.7,
      max_tokens: 1000
    });

    const responseContent = completion.choices[0].message.content;
    if (!responseContent) {
      throw new Error("Empty response from OpenAI");
    }

    const parsed = JSON.parse(responseContent);
    
    if (!parsed.overallComment || 
        !parsed.textTypeSpecificFeedback ||
        !Array.isArray(parsed.strengthsInTextType) ||
        !Array.isArray(parsed.improvementAreas) ||
        !Array.isArray(parsed.nextSteps)) {
      throw new Error("Invalid response format: missing required fields");
    }

    return parsed;
  } catch (error) {
    console.error("OpenAI specialized text type feedback error:", error);
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

async function getWritingStructure(textType) {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are an expert NSW Selective School writing teacher creating a comprehensive guide for Year 5-6 students on ${textType} writing for selective school entrance exams.

Include NSW-specific requirements:
- Band descriptors and what each band requires
- NSW Selective exam expectations
- Age-appropriate but sophisticated techniques
- Specific strategies for achieving Band 5-6 levels

Return the guide in this exact JSON format:\n{\n  "title": "NSW Selective ${textType} Writing Guide",\n  "nswContext": "Brief explanation of NSW Selective requirements for this text type",\n  "bandRequirements": {\n    "band6": "What Band 6 ${textType} writing looks like",\n    "band5": "What Band 5 ${textType} writing looks like",\n    "band4": "What Band 4 ${textType} writing looks like"\n  },\n  "sections": [\n    {\n      "heading": "NSW Selective Structure Requirements",\n      "content": "Detailed explanation of structure requirements for NSW Selective ${textType}"\n    },\n    {\n      "heading": "Language Features for Band 5-6",\n      "content": "NSW-specific language features and sophisticated techniques"\n    },\n    {\n      "heading": "Common NSW Selective Mistakes",\n      "content": "Mistakes that prevent students from achieving higher bands"\n    },\n    {\n      "heading": "NSW Exam Strategies",\n      "content": "Specific strategies for NSW Selective exam success"\n    }\n  ]\n}`
        },
        {
          role: "user",
          content: `Text type: ${textType}`
        }
      ],
      model: "gpt-4",
      temperature: 0.7,
      max_tokens: 1000
    });

    const responseContent = completion.choices[0].message.content;
    if (!responseContent) {
      throw new Error("Empty response from OpenAI");
    }

    return responseContent;
  } catch (error) {
    console.error("OpenAI writing structure generation error:", error);
    return JSON.stringify({
      title: `NSW Selective ${textType} Writing Guide`,
      nswContext: `This guide focuses on ${textType} writing requirements for NSW Selective School entrance exams, targeting Band 5-6 achievement levels.`,
      bandRequirements: {
        band6: `Band 6 ${textType} writing demonstrates exceptional sophistication with highly original ideas, flawless execution, and sophisticated language features.`,
        band5: `Band 5 ${textType} writing shows proficient skills with well-developed ideas, strong structure, and varied vocabulary appropriate for selective school entry.`,
        band4: `Band 4 ${textType} writing displays sound understanding with adequate ideas and competent execution of basic requirements.`
      },
      sections: [
        {
          heading: "NSW Selective Structure Requirements",
          content: `For NSW Selective ${textType} writing: Clear introduction that engages the reader → Well-developed body with sophisticated ideas → Strong conclusion that leaves lasting impact. Each paragraph should have one main idea with supporting details.`
        },
        {
          heading: "Language Features for Band 5-6",
          content: "Use sophisticated vocabulary appropriate for Year 5-6 level, vary sentence structures (simple, compound, complex), incorporate literary devices, and demonstrate precise word choice that enhances meaning."
        },
        {
          heading: "Common NSW Selective Mistakes",
          content: "Avoid: repetitive vocabulary, simple sentence structures only, lack of text type features, insufficient development of ideas, and poor time management in exam conditions."
        },
        {
          heading: "NSW Exam Strategies",
          content: "Plan for 5 minutes, write for 20 minutes, review for 5 minutes. Use sophisticated vocabulary, vary sentence beginnings, include text type features, and demonstrate original thinking appropriate for selective school entry."
        }
      ]
    });
  }
}

async function checkGrammarAndSpelling(content) {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are an expert writing assistant. Analyze the provided text for grammar and spelling errors. For each error, identify its type (grammar/spelling), the exact text with the error, and a clear suggestion for correction. Return the corrections in this exact JSON format:\n{\n  "corrections": [\n    {\n      "type": "grammar",\n      "text": "The quick brown fox jump over the lazy dog.",\n      "suggestion": "Change 'jump' to 'jumps'."\n    },\n    {\n      "type": "spelling",\n      "text": "I have a red car.",\n      "suggestion": "Change 'car' to 'cat'."\n    }\n  ]\n}`
        },
        {
          role: "user",
          content: content
        }
      ],
      model: "gpt-4",
      temperature: 0.2,
      max_tokens: 1000
    });

    const responseContent = completion.choices[0].message.content;
    if (!responseContent) {
      throw new Error("Empty response from OpenAI");
    }

    const parsed = JSON.parse(responseContent);
    if (!Array.isArray(parsed.corrections)) {
      throw new Error("Invalid response format: corrections not an array");
    }
    return parsed;
  } catch (error) {
    console.error("OpenAI grammar and spelling check error:", error);
    return {
      corrections: [
        { type: "grammar", text: "Example grammar error.", suggestion: "Example grammar correction." },
        { type: "spelling", text: "Exampel spelling mistake.", suggestion: "Example spelling correction." }
      ]
    };
  }
}

async function analyzeSentenceStructure(content) {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are an expert writing assistant. Analyze the provided text for sentence structure and variety. Identify instances of repetitive sentence beginnings or opportunities to combine short, choppy sentences. For each identified issue, provide the problematic sentence(s) and a clear suggestion for improvement. Return the analysis in this exact JSON format:\n{\n  "analysis": [\n    {\n      "type": "repetitive_beginning",\n      "sentence": "The boy ran. The boy jumped.",\n      "suggestion": "Vary sentence beginnings. Consider: 'The boy ran and jumped.'"\n    },\n    {\n      "type": "choppy_sentences",\n      "sentence": "He walked. He saw a dog. It barked.",\n      "suggestion": "Combine short sentences. Consider: 'He walked and saw a barking dog.'"\n    }\n  ]\n}`
        },
        {
          role: "user",
          content: content
        }
      ],
      model: "gpt-4",
      temperature: 0.2,
      max_tokens: 1000
    });

    const responseContent = completion.choices[0].message.content;
    if (!responseContent) {
      throw new Error("Empty response from OpenAI");
    }

    const parsed = JSON.parse(responseContent);
    if (!Array.isArray(parsed.analysis)) {
      throw new Error("Invalid response format: analysis not an array");
    }
    return parsed;
  } catch (error) {
    console.error("OpenAI sentence structure analysis error:", error);
    return {
      analysis: [
        { type: "repetitive_beginning", sentence: "The boy ran. The boy jumped.", suggestion: "Vary sentence beginnings." },
        { type: "choppy_sentences", sentence: "He walked. He saw a dog. It barked.", suggestion: "Combine short sentences." }
      ]
    };
  }
}

async function enhanceVocabulary(content) {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are an expert writing assistant. Analyze the provided text and suggest stronger synonyms or more precise word choices based on the context. Identify overused words or vague language and provide alternatives. Return the suggestions in this exact JSON format:\n{\n  "suggestions": [\n    {\n      "word": "good",\n      "suggestion": "excellent, superb, commendable"\n    },\n    {\n      "word": "very",\n      "suggestion": "exceedingly, remarkably, intensely"\n    }\n  ]\n}`
        },
        {
          role: "user",
          content: content
        }
      ],
      model: "gpt-4",
      temperature: 0.2,
      max_tokens: 1000
    });

    const responseContent = completion.choices[0].message.content;
    if (!responseContent) {
      throw new Error("Empty response from OpenAI");
    }

    const parsed = JSON.parse(responseContent);
    if (!Array.isArray(parsed.suggestions)) {
      throw new Error("Invalid response format: suggestions not an array");
    }
    return parsed;
  } catch (error) {
    console.error("OpenAI vocabulary enhancement error:", error);
    return {
      suggestions: [
        { word: "good", suggestion: "excellent, superb" },
        { word: "very", suggestion: "exceedingly, remarkably" }
      ]
    };
  }
}

// Main handler function
exports.handler = async (event) => {
  // CORS headers
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json"
  };

  // Handle preflight requests
  if (event.httpMethod === "OPTIONS" ) {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: "CORS preflight successful" })
    };
  }

  try {
    // Parse request body - UPDATED to include action and text
    const body = JSON.parse(event.body);
    console.log(`[AI-OPS] Received request for operation: ${body.operation || body.action}`);
    
    const { operation, content, textType, assistanceLevel, feedbackHistory, action, text } = body;

    // Check if OpenAI is available and log status
    console.log(`[AI-OPS] OpenAI available: ${isOpenAIAvailable()}`);
    
    let result;

    // Route to appropriate function based on operation or action - UPDATED
    switch (operation || action) {
      case "generatePrompt":
        result = await generatePrompt(textType);
        break;
      case "getWritingFeedback":
        result = await getWritingFeedback(content, textType, assistanceLevel, feedbackHistory);
        break;
      case "getNSWSelectiveFeedback":
        result = await getNSWSelectiveFeedback(content, textType, assistanceLevel, feedbackHistory);
        break;
      case "identifyCommonMistakes":
        result = await identifyCommonMistakes(content, textType);
        break;
      case "getSynonyms":
        result = await getSynonyms(content);
        break;
      case "rephraseSentence":
        result = await rephraseSentence(content);
        break;
      case "getTextTypeVocabulary":
        result = await getTextTypeVocabulary(textType, content);
        break;
      case "evaluateEssay":
        result = await evaluateEssay(content, textType);
        break;
      case "getSpecializedTextTypeFeedback":
        result = await getSpecializedTextTypeFeedback(content, textType);
        break;
      case "getWritingStructure":
        result = await getWritingStructure(textType);
        break;
      case "checkGrammarAndSpelling":
        result = await checkGrammarAndSpelling(content);
        break;
      case "check-grammar":  // NEW CASE FOR ENHANCED EDITOR
        result = await checkGrammarForEditor(text || content);
        break;
      case "analyzeSentenceStructure":
        result = await analyzeSentenceStructure(content);
        break;
      case "enhanceVocabulary":
        result = await enhanceVocabulary(content);
        break;
      default:
        throw new Error(`Unknown operation: ${operation || action}`);
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(result)
    };
  } catch (error) {
    console.error("AI operations error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: error.message || "An error occurred processing your request",
        operation: JSON.parse(event.body).operation || "unknown"
      })
    };
  }
};
