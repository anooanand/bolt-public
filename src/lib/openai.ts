import OpenAI from 'openai';

// Create OpenAI client with error handling
let openai: OpenAI | null = null;

try {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  
  if (apiKey && apiKey !== 'your-openai-api-key-here') {
    openai = new OpenAI({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true
    });
    console.log('[DEBUG] OpenAI client initialized successfully');
  } else {
    console.warn('[DEBUG] OpenAI API key not configured - AI features will be disabled');
  }
} catch (error) {
  console.error('[DEBUG] Failed to initialize OpenAI client:', error);
  openai = null;
}

// Safe function to check if OpenAI is available
export const isOpenAIAvailable = (): boolean => {
  return openai !== null;
};

// Safe function to get suggestions with fallback
export const getSuggestions = async (content: string, textType: string): Promise<string[]> => {
  if (!openai) {
    console.warn('[DEBUG] OpenAI not available, returning mock suggestions');
    return [
      "AI suggestions are not available without an OpenAI API key.",
      "Please configure your VITE_OPENAI_API_KEY environment variable.",
      "For now, you can use the writing tools without AI assistance."
    ];
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a writing coach helping students with ${textType} writing. Provide specific, actionable suggestions to improve their writing.`
        },
        {
          role: "user",
          content: `Please provide 3-5 specific suggestions to improve this ${textType} writing:\n\n${content}`
        }
      ],
      max_tokens: 300,
      temperature: 0.7
    });

    const suggestions = response.choices[0]?.message?.content?.split('\n').filter(s => s.trim()) || [];
    return suggestions.length > 0 ? suggestions : ["Great start! Keep writing to get more specific feedback."];
  } catch (error) {
    console.error('[DEBUG] Error getting AI suggestions:', error);
    return [
      "Unable to get AI suggestions at the moment.",
      "Please check your internet connection and try again.",
      "You can continue writing - suggestions will be available when the service is restored."
    ];
  }
};

// Safe function to analyze text with fallback
export const analyzeText = async (content: string, textType: string): Promise<{
  score: number;
  feedback: string;
  strengths: string[];
  improvements: string[];
}> => {
  if (!openai) {
    return {
      score: 75,
      feedback: "AI analysis is not available without an OpenAI API key. Your writing looks good - keep practicing!",
      strengths: ["Good effort", "Clear structure", "Appropriate length"],
      improvements: ["Configure OpenAI API key for detailed feedback", "Continue practicing", "Review writing guidelines"]
    };
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are an expert writing teacher analyzing ${textType} writing. Provide a score (0-100), feedback, strengths, and improvements in JSON format.`
        },
        {
          role: "user",
          content: `Analyze this ${textType} writing and respond with JSON containing: score, feedback, strengths (array), improvements (array):\n\n${content}`
        }
      ],
      max_tokens: 400,
      temperature: 0.3
    });

    const result = response.choices[0]?.message?.content;
    if (result) {
      try {
        return JSON.parse(result);
      } catch {
        // If JSON parsing fails, return structured fallback
        return {
          score: 80,
          feedback: result,
          strengths: ["Good writing effort"],
          improvements: ["Continue practicing"]
        };
      }
    }
  } catch (error) {
    console.error('[DEBUG] Error analyzing text:', error);
  }

  return {
    score: 75,
    feedback: "Analysis temporarily unavailable. Your writing shows good effort!",
    strengths: ["Clear communication", "Good structure"],
    improvements: ["Keep practicing", "Review feedback when available"]
  };
};

// Safe function to paraphrase text with fallback
export const paraphraseText = async (text: string, mode: string = 'standard'): Promise<string> => {
  if (!openai) {
    return `[AI paraphrasing not available] Original text: ${text}`;
  }

  try {
    const modeInstructions = {
      standard: "Rewrite this text in a clear, natural way while keeping the same meaning.",
      formal: "Rewrite this text in a formal, academic style.",
      casual: "Rewrite this text in a casual, conversational style.",
      creative: "Rewrite this text in a creative, engaging way.",
      concise: "Rewrite this text to be more concise and direct.",
      expand: "Expand this text with more detail and explanation."
    };

    const instruction = modeInstructions[mode as keyof typeof modeInstructions] || modeInstructions.standard;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: instruction
        },
        {
          role: "user",
          content: text
        }
      ],
      max_tokens: 200,
      temperature: 0.7
    });

    return response.choices[0]?.message?.content || text;
  } catch (error) {
    console.error('[DEBUG] Error paraphrasing text:', error);
    return `[Paraphrasing temporarily unavailable] Original: ${text}`;
  }
};

// Export the client for direct use (with null check)
export { openai };

export default {
  getSuggestions,
  analyzeText,
  paraphraseText,
  isOpenAIAvailable
};

