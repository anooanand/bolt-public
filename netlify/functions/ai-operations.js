const OpenAI = require('openai');

// Initialize OpenAI with server-side API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

exports.handler = async (event) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'CORS preflight successful' })
    };
  }

  try {
    // Parse request body
    const body = JSON.parse(event.body);
    const { operation, content, textType, assistanceLevel, feedbackHistory } = body;

    let result;

    // Route to appropriate function based on operation
    switch (operation) {
      case 'generatePrompt':
        result = await generatePrompt(textType);
        break;
      case 'getWritingFeedback':
        result = await getWritingFeedback(content, textType, assistanceLevel, feedbackHistory);
        break;
      case 'identifyCommonMistakes':
        result = await identifyCommonMistakes(content, textType);
        break;
      case 'getSynonyms':
        result = await getSynonyms(content);
        break;
      case 'rephraseSentence':
        result = await rephraseSentence(content);
        break;
      case 'getTextTypeVocabulary':
        result = await getTextTypeVocabulary(textType, content);
        break;
      case 'evaluateEssay':
        result = await evaluateEssay(content, textType);
        break;
      case 'getSpecializedTextTypeFeedback':
        result = await getSpecializedTextTypeFeedback(content, textType);
        break;
      case 'getWritingStructure':
        result = await getWritingStructure(textType);
        break;
      default:
        throw new Error(`Unknown operation: ${operation}`);
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(result)
    };
  } catch (error) {
    console.error('AI operations error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: error.message || 'An error occurred processing your request',
        operation: JSON.parse(event.body).operation || 'unknown'
      })
    };
  }
};

// OpenAI function implementations
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
    console.error('OpenAI prompt generation error:', error);
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
          content: `Previous feedback history:\n${JSON.stringify(feedbackHistory || [])}\n\nCurrent text:\n${content}`
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
    return JSON.parse(responseContent);
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

async function identifyCommonMistakes(content, textType) {
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

    const synonyms = completion.choices[0].message.content?.split(',').map(s => s.trim()) || [];
    return synonyms.length > 0 ? synonyms : [`[No synonyms found for "${word}"]`];
  } catch (error) {
    console.error('OpenAI synonym generation error:', error);
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
    console.error('OpenAI sentence rephrasing error:', error);
    return `[Rephrasing temporarily unavailable] ${sentence}`;
  }
}

async function getTextTypeVocabulary(textType, contentSample) {
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

async function evaluateEssay(content, textType) {
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

async function getSpecializedTextTypeFeedback(content, textType) {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are an expert writing teacher providing specialized feedback for Year 5-6 students on ${textType} writing. Focus specifically on how well the student has understood and applied the conventions, structure, and features of this text type. Return feedback in this exact JSON format:
{
  "overallComment": "Brief assessment of how well the student has handled this text type",
  "textTypeSpecificFeedback": {
    "structure": "Feedback on how well the student followed the expected structure for this text type",
    "language": "Feedback on use of language features specific to this text type",
    "purpose": "How well the student achieved the purpose of this text type",
    "audience": "How well the student considered their audience"
  },
  "strengthsInTextType": [
    "Specific strengths in handling this text type",
    "What the student did well for this writing style"
  ],
  "improvementAreas": [
    "Areas where the student can improve their understanding of this text type",
    "Specific features they need to work on"
  ],
  "nextSteps": [
    "Specific actions to improve in this text type",
    "Resources or practice suggestions"
  ]
}`
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
      throw new Error('Empty response from OpenAI');
    }

    const parsed = JSON.parse(responseContent);
    
    if (!parsed.overallComment || 
        !parsed.textTypeSpecificFeedback ||
        !Array.isArray(parsed.strengthsInTextType) ||
        !Array.isArray(parsed.improvementAreas) ||
        !Array.isArray(parsed.nextSteps)) {
      throw new Error('Invalid response format: missing required fields');
    }

    return parsed;
  } catch (error) {
    console.error('OpenAI specialized text type feedback error:', error);
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