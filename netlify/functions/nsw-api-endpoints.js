const OpenAI = require("openai");

// Initialize OpenAI with server-side API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Helper function to analyze content structure (reused from existing code)
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

// 1. NSW Text Type Analysis Endpoint
async function getNSWTextTypeAnalysis(content, textType) {
  try {
    const analysis = analyzeContentStructure(content);

    const prompt = `You are an expert NSW Selective School writing assessor specializing in text type analysis. Analyze this ${textType} writing sample and provide detailed feedback on how well it adheres to the specific requirements and conventions of this text type.

STUDENT'S WRITING:
"${content}"

TEXT TYPE: ${textType}

CONTENT ANALYSIS:
- Word count: ${analysis.wordCount}
- Sentence count: ${analysis.sentenceCount}
- Paragraph count: ${analysis.paragraphCount}
- Has dialogue: ${analysis.hasDialogue}
- Potential characters: ${analysis.potentialCharacters.join(', ') || 'None identified'}

TEXT TYPE SPECIFIC ANALYSIS FOR ${textType.toUpperCase()}:

${getTextTypeRequirements(textType)}

INSTRUCTIONS:
1. Assess how well the writing meets the specific requirements of ${textType}
2. Identify which text type features are present and which are missing
3. Provide specific examples from the student's text
4. Suggest improvements specific to this text type
5. Rate adherence to text type conventions (1-10)

Format your response as a JSON object with this structure:
{
  "textType": "${textType}",
  "adherenceScore": number (1-10),
  "textTypeFeatures": {
    "present": ["features that are well demonstrated"],
    "partial": ["features that are partially demonstrated"],
    "missing": ["features that are missing or weak"]
  },
  "structuralAnalysis": {
    "opening": "analysis of how well the opening meets text type requirements",
    "body": "analysis of body paragraphs/development",
    "conclusion": "analysis of conclusion effectiveness"
  },
  "languageFeatures": {
    "appropriate": ["language features used well for this text type"],
    "needsWork": ["language features that need improvement"]
  },
  "specificSuggestions": ["actionable suggestions specific to improving this text type"],
  "textTypeExamples": ["examples of how to improve specific elements"],
  "nextSteps": ["specific tasks to better meet text type requirements"]
}`;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert NSW Selective School writing assessor who specializes in analyzing how well student writing meets specific text type requirements and conventions."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.3,
      max_tokens: 2000
    });

    const feedbackText = response.choices[0].message.content;

    try {
      const feedbackJson = JSON.parse(feedbackText);
      return {
        success: true,
        ...feedbackJson,
        wordCount: analysis.wordCount,
        analysisTimestamp: new Date().toISOString()
      };
    } catch (parseError) {
      console.error("Failed to parse text type analysis as JSON:", parseError);
      return {
        success: false,
        error: "Failed to analyze text type",
        textType: textType,
        adherenceScore: 5,
        message: "Please try again to get detailed text type analysis."
      };
    }

  } catch (error) {
    console.error("Error in NSW text type analysis:", error);
    return {
      success: false,
      error: error.message,
      textType: textType,
      message: "Unable to analyze text type at this time."
    };
  }
}

// Helper function to get text type requirements
function getTextTypeRequirements(textType) {
  const requirements = {
    narrative: `
    NARRATIVE REQUIREMENTS:
    - Clear story structure (orientation, complication, resolution)
    - Well-developed characters with clear motivations
    - Engaging plot with conflict and resolution
    - Descriptive language and imagery
    - Dialogue that advances the story
    - Consistent point of view and tense
    - Engaging opening that hooks the reader
    - Satisfying conclusion that resolves the conflict`,
    
    persuasive: `
    PERSUASIVE REQUIREMENTS:
    - Clear thesis/position statement
    - Logical argument structure with supporting evidence
    - Use of persuasive techniques (rhetorical questions, repetition, emotive language)
    - Acknowledgment of counterarguments
    - Strong conclusion that reinforces the position
    - Appropriate tone for the intended audience
    - Facts, statistics, or examples to support claims
    - Call to action or clear recommendation`,
    
    expository: `
    EXPOSITORY REQUIREMENTS:
    - Clear topic introduction and thesis
    - Logical organization of information
    - Use of topic sentences and supporting details
    - Objective, informative tone
    - Clear explanations and definitions
    - Use of examples and evidence
    - Smooth transitions between ideas
    - Conclusion that summarizes key points`,
    
    recount: `
    RECOUNT REQUIREMENTS:
    - Chronological sequence of events
    - Clear orientation (who, what, when, where)
    - Personal experience or factual events
    - Past tense throughout
    - First or third person perspective
    - Descriptive details that bring events to life
    - Clear sequence markers (first, then, next, finally)
    - Reflection on the significance of events`,
    
    descriptive: `
    DESCRIPTIVE REQUIREMENTS:
    - Rich sensory details (sight, sound, smell, touch, taste)
    - Vivid imagery and figurative language
    - Clear focus on a person, place, object, or experience
    - Organized spatial or logical structure
    - Varied sentence structures for rhythm
    - Precise vocabulary and word choice
    - Creates a clear mental picture for the reader
    - Engages the reader's senses and emotions`
  };
  
  return requirements[textType.toLowerCase()] || `
  GENERAL TEXT TYPE REQUIREMENTS:
  - Clear structure appropriate to the text type
  - Consistent tone and style
  - Appropriate language features
  - Engaging content that meets the purpose
  - Clear beginning, middle, and end`;
}

// 2. NSW Vocabulary Sophistication Analysis Endpoint
async function getNSWVocabularySophistication(content) {
  try {
    const analysis = analyzeContentStructure(content);
    const words = content.trim().split(/\s+/).filter(w => w.length > 0);
    
    // Basic vocabulary analysis
    const uniqueWords = [...new Set(words.map(w => w.toLowerCase()))];
    const longWords = words.filter(w => w.length > 6);
    const academicWords = words.filter(w => isAcademicWord(w.toLowerCase()));

    const prompt = `You are an expert NSW Selective School writing assessor specializing in vocabulary sophistication analysis. Analyze this writing sample for vocabulary complexity, variety, and sophistication appropriate for NSW Selective standards.

STUDENT'S WRITING:
"${content}"

BASIC VOCABULARY METRICS:
- Total words: ${words.length}
- Unique words: ${uniqueWords.length}
- Vocabulary diversity ratio: ${(uniqueWords.length / words.length * 100).toFixed(1)}%
- Words over 6 letters: ${longWords.length}
- Potential academic words: ${academicWords.length}

VOCABULARY SOPHISTICATION ANALYSIS:
1. Assess vocabulary complexity and variety
2. Identify sophisticated word choices
3. Find opportunities for vocabulary enhancement
4. Suggest specific word improvements
5. Rate overall vocabulary sophistication (1-10)

Format your response as a JSON object:
{
  "vocabularyScore": number (1-10),
  "sophisticationLevel": "emerging|developing|proficient|advanced",
  "vocabularyMetrics": {
    "totalWords": ${words.length},
    "uniqueWords": ${uniqueWords.length},
    "diversityRatio": ${(uniqueWords.length / words.length * 100).toFixed(1)},
    "averageWordLength": number,
    "complexWords": number
  },
  "strengths": {
    "sophisticatedWords": ["list of sophisticated words used well"],
    "varietyExamples": ["examples of good vocabulary variety"],
    "appropriateChoices": ["words that are well-chosen for context"]
  },
  "improvements": {
    "basicWords": ["simple words that could be enhanced"],
    "repetitiveWords": ["words that are overused"],
    "missedOpportunities": ["places where more sophisticated words could be used"]
  },
  "suggestions": {
    "wordReplacements": [
      {
        "original": "simple word",
        "suggestions": ["sophisticated alternative 1", "sophisticated alternative 2"],
        "context": "explanation of when to use"
      }
    ],
    "vocabularyTechniques": ["specific techniques to improve vocabulary"],
    "practiceActivities": ["activities to build vocabulary sophistication"]
  },
  "nextSteps": ["specific actions to improve vocabulary sophistication"]
}`;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert NSW Selective School writing assessor who specializes in vocabulary sophistication analysis and helping students enhance their word choice and language complexity."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.3,
      max_tokens: 2000
    });

    const feedbackText = response.choices[0].message.content;

    try {
      const feedbackJson = JSON.parse(feedbackText);
      return {
        success: true,
        ...feedbackJson,
        analysisTimestamp: new Date().toISOString()
      };
    } catch (parseError) {
      console.error("Failed to parse vocabulary analysis as JSON:", parseError);
      return {
        success: false,
        error: "Failed to analyze vocabulary sophistication",
        vocabularyScore: 5,
        message: "Please try again to get detailed vocabulary analysis."
      };
    }

  } catch (error) {
    console.error("Error in NSW vocabulary sophistication analysis:", error);
    return {
      success: false,
      error: error.message,
      message: "Unable to analyze vocabulary sophistication at this time."
    };
  }
}

// Helper function to identify academic words (basic implementation)
function isAcademicWord(word) {
  const academicWords = [
    'analyze', 'concept', 'constitute', 'context', 'create', 'data', 'define', 'derive',
    'distribute', 'economy', 'environment', 'establish', 'estimate', 'evident', 'export',
    'factor', 'finance', 'formula', 'function', 'identify', 'income', 'indicate',
    'individual', 'interpret', 'involve', 'issue', 'labor', 'legal', 'legislate',
    'major', 'method', 'occur', 'percent', 'period', 'policy', 'principle', 'proceed',
    'process', 'require', 'research', 'respond', 'role', 'section', 'significant',
    'similar', 'source', 'specific', 'structure', 'theory', 'vary', 'furthermore',
    'consequently', 'nevertheless', 'therefore', 'moreover', 'however', 'although',
    'demonstrate', 'illustrate', 'emphasize', 'examine', 'investigate', 'conclude'
  ];
  return academicWords.includes(word);
}

// 3. Progress Tracking Endpoint
async function getNSWProgressTracking(userId, assessmentData) {
  try {
    // This would typically interact with a database to store and retrieve progress data
    // For now, we'll simulate progress tracking with the provided assessment data
    
    const currentAssessment = assessmentData;
    const timestamp = new Date().toISOString();

    // Calculate progress metrics
    const progressMetrics = calculateProgressMetrics(currentAssessment);

    const response = {
      success: true,
      userId: userId,
      timestamp: timestamp,
      currentAssessment: {
        totalScore: currentAssessment.totalScore || 0,
        overallBand: currentAssessment.overallBand || 1,
        criteriaScores: {
          ideas: currentAssessment.criteriaFeedback?.ideasAndContent?.score || 0,
          structure: currentAssessment.criteriaFeedback?.textStructureAndOrganization?.score || 0,
          language: currentAssessment.criteriaFeedback?.languageFeaturesAndVocabulary?.score || 0,
          grammar: currentAssessment.criteriaFeedback?.spellingPunctuationGrammar?.score || 0
        }
      },
      progressMetrics: progressMetrics,
      readinessIndicator: {
        level: getReadinessLevel(currentAssessment.totalScore || 0),
        percentage: Math.min(100, ((currentAssessment.totalScore || 0) / 30) * 100),
        nextMilestone: getNextMilestone(currentAssessment.totalScore || 0),
        strengthAreas: identifyStrengths(currentAssessment),
        improvementAreas: identifyImprovements(currentAssessment)
      },
      recommendations: {
        focusAreas: getFocusAreas(currentAssessment),
        practiceActivities: getPracticeActivities(currentAssessment),
        studyPlan: getStudyPlan(currentAssessment),
        timeToExam: "Estimated preparation time based on current level"
      },
      historicalTrends: {
        // This would be populated from database in a real implementation
        message: "Historical data will be available after multiple assessments"
      }
    };

    return response;

  } catch (error) {
    console.error("Error in NSW progress tracking:", error);
    return {
      success: false,
      error: error.message,
      message: "Unable to track progress at this time."
    };
  }
}

// Helper functions for progress tracking
function calculateProgressMetrics(assessment) {
  const totalScore = assessment.totalScore || 0;
  const maxScore = 30;
  
  return {
    overallProgress: (totalScore / maxScore) * 100,
    bandLevel: assessment.overallBand || 1,
    criteriaProgress: {
      ideas: ((assessment.criteriaFeedback?.ideasAndContent?.score || 0) / 9) * 100,
      structure: ((assessment.criteriaFeedback?.textStructureAndOrganization?.score || 0) / 7.5) * 100,
      language: ((assessment.criteriaFeedback?.languageFeaturesAndVocabulary?.score || 0) / 7.5) * 100,
      grammar: ((assessment.criteriaFeedback?.spellingPunctuationGrammar?.score || 0) / 6) * 100
    }
  };
}

function getReadinessLevel(totalScore) {
  if (totalScore >= 25) return "Exam Ready";
  if (totalScore >= 20) return "Nearly Ready";
  if (totalScore >= 15) return "Developing Well";
  if (totalScore >= 10) return "Building Skills";
  return "Early Development";
}

function getNextMilestone(totalScore) {
  if (totalScore < 10) return "Reach 10 points - Building Skills";
  if (totalScore < 15) return "Reach 15 points - Developing Well";
  if (totalScore < 20) return "Reach 20 points - Nearly Ready";
  if (totalScore < 25) return "Reach 25 points - Exam Ready";
  return "Maintain Excellence";
}

function identifyStrengths(assessment) {
  const strengths = [];
  const criteria = assessment.criteriaFeedback || {};
  
  Object.entries(criteria).forEach(([key, value]) => {
    if (value.score && value.maxScore && (value.score / value.maxScore) > 0.7) {
      strengths.push(key.replace(/([A-Z])/g, ' $1').toLowerCase());
    }
  });
  
  return strengths.length > 0 ? strengths : ["Keep working on all areas"];
}

function identifyImprovements(assessment) {
  const improvements = [];
  const criteria = assessment.criteriaFeedback || {};
  
  Object.entries(criteria).forEach(([key, value]) => {
    if (value.score && value.maxScore && (value.score / value.maxScore) < 0.6) {
      improvements.push(key.replace(/([A-Z])/g, ' $1').toLowerCase());
    }
  });
  
  return improvements.length > 0 ? improvements : ["Continue developing all areas"];
}

function getFocusAreas(assessment) {
  const totalScore = assessment.totalScore || 0;
  
  if (totalScore < 15) {
    return ["Basic writing structure", "Idea development", "Grammar fundamentals"];
  } else if (totalScore < 22) {
    return ["Vocabulary sophistication", "Text organization", "Language features"];
  } else {
    return ["Advanced techniques", "Exam strategies", "Time management"];
  }
}

function getPracticeActivities(assessment) {
  const band = assessment.overallBand || 1;
  
  const activities = {
    1: ["Daily writing practice", "Basic grammar exercises", "Simple vocabulary building"],
    2: ["Structured paragraph writing", "Grammar review", "Word choice exercises"],
    3: ["Text type practice", "Sentence variety exercises", "Vocabulary expansion"],
    4: ["Advanced text structures", "Literary device practice", "Complex sentence construction"],
    5: ["Sophisticated writing techniques", "Advanced vocabulary", "Exam simulation"],
    6: ["Refinement exercises", "Creative challenges", "Peer review activities"]
  };
  
  return activities[band] || activities[1];
}

function getStudyPlan(assessment) {
  const totalScore = assessment.totalScore || 0;
  
  if (totalScore < 15) {
    return {
      phase: "Foundation Building",
      duration: "4-6 weeks",
      focus: "Basic skills development",
      activities: ["Daily 15-minute writing", "Grammar practice", "Reading comprehension"]
    };
  } else if (totalScore < 22) {
    return {
      phase: "Skill Enhancement",
      duration: "3-4 weeks", 
      focus: "Intermediate skill development",
      activities: ["Text type practice", "Vocabulary building", "Timed writing exercises"]
    };
  } else {
    return {
      phase: "Exam Preparation",
      duration: "2-3 weeks",
      focus: "Exam readiness and refinement",
      activities: ["Mock exams", "Strategy practice", "Final review"]
    };
  }
}

// 4. NSW Coaching Tips Endpoint
async function getNSWCoachingTips(content, textType, currentScore, focusArea) {
  try {
    const analysis = analyzeContentStructure(content);

    const prompt = `You are an expert NSW Selective School writing coach. Provide personalized, actionable coaching tips for this student based on their writing sample, current performance level, and specific focus area.

STUDENT'S WRITING:
"${content}"

CONTEXT:
- Text Type: ${textType}
- Current Score: ${currentScore}/30
- Focus Area: ${focusArea}
- Word Count: ${analysis.wordCount}
- Sentence Count: ${analysis.sentenceCount}

COACHING REQUIREMENTS:
1. Provide specific, actionable tips tailored to this student's level
2. Focus on the specified area while maintaining overall writing quality
3. Include immediate actions the student can take
4. Provide examples relevant to their writing
5. Suggest practice exercises
6. Give encouragement and motivation

Format your response as a JSON object:
{
  "coachingLevel": "beginner|intermediate|advanced",
  "primaryFocus": "${focusArea}",
  "immediateActions": [
    {
      "action": "specific action to take right now",
      "example": "concrete example from their writing",
      "improvement": "how this will improve their writing"
    }
  ],
  "strategicTips": [
    {
      "strategy": "broader writing strategy",
      "application": "how to apply it to their writing",
      "benefit": "why this helps with NSW Selective"
    }
  ],
  "practiceExercises": [
    {
      "exercise": "specific practice activity",
      "duration": "time needed",
      "outcome": "what they'll achieve"
    }
  ],
  "examStrategies": [
    {
      "strategy": "exam-specific tip",
      "timing": "when to use in exam",
      "impact": "how it improves exam performance"
    }
  ],
  "motivationalMessage": "encouraging message tailored to their progress",
  "nextSession": {
    "focus": "what to work on next",
    "goal": "specific goal for next writing session",
    "success_indicator": "how they'll know they've improved"
  }
}`;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert NSW Selective School writing coach who provides personalized, encouraging, and actionable guidance to help students improve their writing skills and exam performance."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.4,
      max_tokens: 2000
    });

    const coachingText = response.choices[0].message.content;

    try {
      const coachingJson = JSON.parse(coachingText);
      return {
        success: true,
        ...coachingJson,
        studentLevel: getStudentLevel(currentScore),
        sessionTimestamp: new Date().toISOString(),
        followUpReminder: getFollowUpReminder(focusArea)
      };
    } catch (parseError) {
      console.error("Failed to parse coaching tips as JSON:", parseError);
      return {
        success: false,
        error: "Failed to generate coaching tips",
        message: "Please try again to get personalized coaching guidance."
      };
    }

  } catch (error) {
    console.error("Error in NSW coaching tips:", error);
    return {
      success: false,
      error: error.message,
      message: "Unable to provide coaching tips at this time."
    };
  }
}

// Helper functions for coaching tips
function getStudentLevel(score) {
  if (score >= 25) return "advanced";
  if (score >= 18) return "intermediate";
  return "beginner";
}

function getFollowUpReminder(focusArea) {
  const reminders = {
    "ideas": "Remember to practice brainstorming techniques daily",
    "structure": "Work on outlining before writing your next piece",
    "language": "Keep a vocabulary journal and add 3 new words daily",
    "grammar": "Proofread your work carefully and read it aloud",
    "vocabulary": "Practice using sophisticated words in context",
    "texttype": "Study examples of excellent text types in your reading"
  };
  
  return reminders[focusArea.toLowerCase()] || "Keep practicing regularly and track your progress";
}

// Export functions for use in Netlify Functions
module.exports = {
  getNSWTextTypeAnalysis,
  getNSWVocabularySophistication,
  getNSWProgressTracking,
  getNSWCoachingTips
};
