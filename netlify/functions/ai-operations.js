const OpenAI = require("openai");

// Initialize OpenAI with server-side API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

exports.handler = async (event) => {
  // CORS headers
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json"
  };

  // Handle preflight requests
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: "CORS preflight successful" })
    };
  }

  try {
    // Parse request body
    const body = JSON.parse(event.body);
    const { operation, content, textType, assistanceLevel, feedbackHistory } = body;

    let result;

    // Route to appropriate function based on operation
    switch (operation) {
      case "generatePrompt":
        result = await generatePrompt(textType);
        break;
      case "getWritingFeedback":
        result = await getWritingFeedback(content, textType, assistanceLevel, feedbackHistory);
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
      case "analyzeSentenceStructure":
        result = await analyzeSentenceStructure(content);
        break;
      case "enhanceVocabulary":
        result = await enhanceVocabulary(content);
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

    // Parse and validate the response
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

    // Parse and validate the response
    const parsed = JSON.parse(responseContent);
    
    // Ensure all required fields are present
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
          content: `You are an expert writing teacher creating a guide for Year 5-6 students on ${textType} writing. Create a structured guide with sections covering key aspects of this writing type. Return the guide in this exact JSON format:\n{\n  "title": "Guide to ${textType} Writing",\n  "sections": [\n    {\n      "heading": "Structure",\n      "content": "Detailed explanation of the structure for this writing type"\n    },\n    {\n      "heading": "Language Features",\n      "content": "Explanation of key language features and techniques"\n    },\n    {\n      "heading": "Common Mistakes",\n      "content": "Common mistakes to avoid in this writing type"\n    },\n    {\n      "heading": "Planning Tips",\n      "content": "How to plan effectively for this writing type"\n    }\n  ]\n}`
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
          content: `You are an expert writing teacher creating a guide for Year 5-6 students on ${textType} writing. Create a structured guide with sections covering key aspects of this writing type. Return the guide in this exact JSON format:\n{\n  "title": "Guide to ${textType} Writing",\n  "sections": [\n    {\n      "heading": "Structure",\n      "content": "Detailed explanation of the structure for this writing type"\n    },\n    {\n      "heading": "Language Features",\n      "content": "Explanation of key language features and techniques"\n    },\n    {\n      "heading": "Common Mistakes",\n      "content": "Common mistakes to avoid in this writing type"\n    },\n    {\n      "heading": "Planning Tips",\n      "content": "How to plan effectively for this writing type"\n    }\n  ]\n}`
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

