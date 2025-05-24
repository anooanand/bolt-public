import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function generatePrompt(textType: string): Promise<string> {
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
    return "Write about a memorable experience.";
  }
}

export async function getWritingFeedback(content: string, textType: string, assistanceLevel: string, feedbackHistory: any[]): Promise<any> {
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
      overallComment: "I'm having trouble analyzing your writing right now. Please try again in a moment.",
      feedbackItems: [],
      focusForNextTime: ["Try again in a few moments"]
    };
  }
}

export async function identifyCommonMistakes(content: string, textType: string) {
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
    // Return a default response structure if there's an error
    return {
      overallAssessment: "Unable to analyze the writing at this time.",
      mistakesIdentified: [],
      patternAnalysis: "Unable to analyze patterns at this time.",
      priorityFixes: ["Please try again later"],
      positiveElements: ["Unable to identify positive elements at this time"]
    };
  }
}

export async function getSynonyms(word: string): Promise<string[]> {
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
    return synonyms;
  } catch (error) {
    console.error('OpenAI synonym generation error:', error);
    return [];
  }
}

export async function rephraseSentence(sentence: string): Promise<string> {
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
    return sentence;
  }
}

// Add the missing generateParaphrases function
export async function generateParaphrases(text: string): Promise<any> {
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

    // Parse and validate the response
    const parsed = JSON.parse(responseContent);
    
    // Ensure the suggestions array is present
    if (!Array.isArray(parsed.suggestions)) {
      throw new Error('Invalid response format: missing suggestions array');
    }

    // Add position information if not provided by the API
    const suggestions = parsed.suggestions.map((suggestion: any, index: number) => {
      if (typeof suggestion.start !== 'number' || typeof suggestion.end !== 'number') {
        // If position info is missing, use the whole text
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

// Add the missing getWritingStructure function
export async function getWritingStructure(textType: string): Promise<string> {
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
    // Return a default structure if there's an error
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

// Add the missing evaluateEssay function
export async function evaluateEssay(content: string, textType: string): Promise<any> {
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

    // Parse and validate the response
    const parsed = JSON.parse(responseContent);
    
    // Ensure all required fields are present
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
    // Return a default evaluation structure if there's an error
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

// Add the missing getTextTypeVocabulary function
export async function getTextTypeVocabulary(textType: string, contentSample: string): Promise<any> {
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

    // Parse and validate the response
    const parsed = JSON.parse(responseContent);
    
    // Ensure all required fields are present
    if (!parsed.textType || 
        !Array.isArray(parsed.categories) || 
        !Array.isArray(parsed.phrasesAndExpressions) ||
        !Array.isArray(parsed.transitionWords)) {
      throw new Error('Invalid response format: missing required fields');
    }

    return parsed;
  } catch (error) {
    console.error('OpenAI vocabulary generation error:', error);
    // Return a default vocabulary structure if there's an error
    return {
      textType: textType,
      categories: [
        {
          name: "Descriptive Words",
          words: ["colorful", "exciting", "interesting", "amazing", "wonderful"],
          examples: ["The colorful rainbow appeared after the rain.", "It was an exciting adventure for everyone."]
        },
        {
          name: "Action Verbs",
          words: ["ran", "jumped", "walked", "talked", "moved"],
          examples: ["She ran quickly to catch the bus.", "He jumped over the puddle."]
        }
      ],
      phrasesAndExpressions: [
        "Once upon a time",
        "In my opinion",
        "For example",
        "In conclusion"
      ],
      transitionWords: [
        "First",
        "Next",
        "Then",
        "Finally",
        "However",
        "Because"
      ]
    };
  }
}

// Add the missing getNSWSelectiveFeedback function
async function getNSWSelectiveFeedback(content: string, textType: string): Promise<any> {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are an expert writing teacher evaluating a Year 5-6 student's ${textType} writing piece according to NSW Selective School criteria. Provide detailed feedback and scoring. Return the evaluation in this exact JSON format:
{
  "overallComment": "Brief, encouraging overall assessment",
  "overallScore": {
    "total": 18,
    "percentage": 72
  },
  "categoryScores": {
    "content": {
      "score": 4,
      "percentage": 80,
      "feedback": "Detailed feedback on content"
    },
    "form": {
      "score": 4,
      "percentage": 80,
      "feedback": "Detailed feedback on form/structure"
    },
    "vocabulary": {
      "score": 3,
      "percentage": 60,
      "feedback": "Detailed feedback on vocabulary"
    },
    "sentences": {
      "score": 3,
      "percentage": 75,
      "feedback": "Detailed feedback on sentences"
    },
    "punctuation": {
      "score": 2,
      "percentage": 67,
      "feedback": "Detailed feedback on punctuation"
    },
    "spelling": {
      "score": 2,
      "percentage": 67,
      "feedback": "Detailed feedback on spelling"
    }
  },
  "strengths": [
    "Strength 1",
    "Strength 2",
    "Strength 3"
  ],
  "areasForImprovement": [
    "Area 1",
    "Area 2",
    "Area 3"
  ],
  "specificExamples": [
    {
      "text": "Example from student's writing",
      "comment": "Comment about this example",
      "category": "content/form/vocabulary/sentences/punctuation/spelling"
    }
  ],
  "improvementSuggestions": [
    {
      "category": "content/form/vocabulary/sentences/punctuation/spelling",
      "suggestion": "Specific suggestion for improvement"
    }
  ],
  "progressTracking": {
    "currentLevel": "Current achievement level",
    "nextSteps": [
      "Next step 1",
      "Next step 2"
    ]
  }
}`
        },
        {
          role: "user",
          content: `Text type: ${textType}\n\nContent: ${content}`
        }
      ],
      model: "gpt-4",
      temperature: 0.7,
      max_tokens: 1500
    });

    const responseContent = completion.choices[0].message.content;
    if (!responseContent) {
      throw new Error('Empty response from OpenAI');
    }

    // Parse and validate the response
    const parsed = JSON.parse(responseContent);
    
    // Ensure all required fields are present
    if (!parsed.overallComment || 
        !parsed.overallScore || 
        !parsed.categoryScores ||
        !Array.isArray(parsed.strengths) ||
        !Array.isArray(parsed.areasForImprovement)) {
      throw new Error('Invalid response format: missing required fields');
    }

    return parsed;
  } catch (error) {
    console.error('OpenAI NSW selective feedback error:', error);
    // Return a default feedback structure if there's an error
    return {
      overallComment: "This is a good attempt at a piece of writing. With some refinement, it could be even better.",
      overallScore: {
        total: 15,
        percentage: 60
      },
      categoryScores: {
        content: {
          score: 3,
          percentage: 60,
          feedback: "Your content shows some good ideas but could be developed further."
        },
        form: {
          score: 3,
          percentage: 60,
          feedback: "Your structure is generally appropriate but could be more clearly organized."
        },
        vocabulary: {
          score: 3,
          percentage: 60,
          feedback: "You use some good vocabulary but could include more varied word choices."
        },
        sentences: {
          score: 2,
          percentage: 50,
          feedback: "Your sentences are mostly correct but could vary more in structure."
        },
        punctuation: {
          score: 2,
          percentage: 67,
          feedback: "Your punctuation is generally correct but has some errors."
        },
        spelling: {
          score: 2,
          percentage: 67,
          feedback: "Your spelling is mostly accurate with a few errors."
        }
      },
      strengths: [
        "Good attempt at addressing the topic",
        "Some interesting ideas presented",
        "Basic structure is in place"
      ],
      areasForImprovement: [
        "Develop ideas more fully",
        "Vary sentence structures",
        "Use more precise vocabulary"
      ],
      specificExamples: [
        {
          text: "Example from the text",
          comment: "This could be improved by...",
          category: "content"
        }
      ],
      improvementSuggestions: [
        {
          category: "content",
          suggestion: "Add more specific details to support your main ideas"
        },
        {
          category: "vocabulary",
          suggestion: "Use more precise and varied word choices"
        }
      ],
      progressTracking: {
        currentLevel: "Developing",
        nextSteps: [
          "Focus on developing ideas more fully",
          "Practice varying sentence structures"
        ]
      }
    };
  }
}

// Add the missing getSpecializedTextTypeFeedback function
export async function getSpecializedTextTypeFeedback(content: string, textType: string): Promise<any> {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are an expert writing teacher providing specialized feedback for Year 5-6 students writing a ${textType} piece. Analyze the content and provide detailed, genre-specific feedback. Return the analysis in this exact JSON format:
{
  "textType": "${textType}",
  "overallImpression": "Brief overall impression of the writing",
  "genreSpecificFeedback": {
    "strengths": [
      {
        "area": "Area of strength specific to this text type",
        "comment": "Detailed comment about this strength",
        "example": "Example from the text (if applicable)"
      }
    ],
    "improvements": [
      {
        "area": "Area for improvement specific to this text type",
        "comment": "Detailed comment about this area",
        "suggestion": "Specific suggestion for improvement"
      }
    ]
  },
  "textTypeElements": [
    {
      "element": "Key element of this text type (e.g., 'Character development' for narrative)",
      "present": true/false,
      "quality": "high/medium/low",
      "feedback": "Specific feedback about this element"
    }
  ],
  "exemplarComparison": "How this writing compares to exemplars of this text type",
  "nextStepsForThisGenre": [
    "Specific next step for improving in this genre",
    "Another specific next step"
  ]
}`
        },
        {
          role: "user",
          content: `Text type: ${textType}\n\nContent: ${content}`
        }
      ],
      model: "gpt-4",
      temperature: 0.7,
      max_tokens: 1500
    });

    const responseContent = completion.choices[0].message.content;
    if (!responseContent) {
      throw new Error('Empty response from OpenAI');
    }

    // Parse and validate the response
    const parsed = JSON.parse(responseContent);
    
    // Ensure all required fields are present
    if (!parsed.textType || 
        !parsed.overallImpression || 
        !parsed.genreSpecificFeedback ||
        !Array.isArray(parsed.textTypeElements) ||
        !Array.isArray(parsed.nextStepsForThisGenre)) {
      throw new Error('Invalid response format: missing required fields');
    }

    return parsed;
  } catch (error) {
    console.error('OpenAI specialized text type feedback error:', error);
    // Return a default feedback structure if there's an error
    return {
      textType: textType,
      overallImpression: "This is a good attempt at a " + textType + " piece. With some refinement, it could be even better.",
      genreSpecificFeedback: {
        strengths: [
          {
            area: "Basic structure",
            comment: "You have included the basic elements required for this text type.",
            example: "Your introduction sets up the main idea effectively."
          }
        ],
        improvements: [
          {
            area: "Genre conventions",
            comment: "Your writing could better follow the conventions of this text type.",
            suggestion: "Study examples of successful " + textType + " writing to understand the typical features."
          }
        ]
      },
      textTypeElements: [
        {
          element: "Basic structure",
          present: true,
          quality: "medium",
          feedback: "You have the basic structure in place, but it could be more clearly defined."
        },
        {
          element: "Language features",
          present: true,
          quality: "medium",
          feedback: "You use some appropriate language features for this text type, but could include more."
        }
      ],
      exemplarComparison: "Your writing shows understanding of basic " + textType + " features but lacks some of the sophistication seen in exemplary pieces.",
      nextStepsForThisGenre: [
        "Study examples of high-quality " + textType + " writing",
        "Practice including more specific features of this text type",
        "Focus on developing the aspects mentioned in the improvement suggestions"
      ]
    };
  }
}
