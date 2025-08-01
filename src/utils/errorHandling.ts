// Enhanced error handling and fallbacks for AI Coach functionality

import { promptConfig } from '../config/prompts';

interface AIError {
  type: 'api_unavailable' | 'network_error' | 'rate_limit' | 'parsing_error' | 'general_error';
  message: string;
  userFriendlyMessage: string;
  retryable: boolean;
}

class AIErrorHandler {
  static handleError(error: any, context: string): AIError {
    console.error(`[AI Coach Error - ${context}]:`, error);

    // Determine error type based on error details
    if (error.message?.includes('OpenAI not available') || error.message?.includes('API key')) {
      return {
        type: 'api_unavailable',
        message: error.message,
        userFriendlyMessage: promptConfig.errorMessages.apiUnavailable,
        retryable: false
      };
    }

    if (error.message?.includes('network') || error.code === 'NETWORK_ERROR') {
      return {
        type: 'network_error',
        message: error.message,
        userFriendlyMessage: promptConfig.errorMessages.networkError,
        retryable: true
      };
    }

    if (error.status === 429 || error.message?.includes('rate limit')) {
      return {
        type: 'rate_limit',
        message: error.message,
        userFriendlyMessage: promptConfig.errorMessages.rateLimitError,
        retryable: true
      };
    }

    if (error.name === 'SyntaxError' || error.message?.includes('JSON')) {
      return {
        type: 'parsing_error',
        message: error.message,
        userFriendlyMessage: 'The AI response was unclear. Let me try a different approach.',
        retryable: true
      };
    }

    // Default to general error
    return {
      type: 'general_error',
      message: error.message || 'Unknown error',
      userFriendlyMessage: promptConfig.errorMessages.generalError,
      retryable: true
    };
  }

  static async withRetry<T>(
    operation: () => Promise<T>,
    maxRetries: number = 2,
    context: string = 'AI operation'
  ): Promise<T> {
    let lastError: any;

    for (let attempt = 1; attempt <= maxRetries + 1; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error;
        const aiError = this.handleError(error, context);

        // Don't retry if error is not retryable or we've reached max attempts
        if (!aiError.retryable || attempt > maxRetries) {
          throw aiError;
        }

        // Wait before retrying (exponential backoff)
        const delay = Math.min(1000 * Math.pow(2, attempt - 1), 5000);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }

    throw this.handleError(lastError, context);
  }

  static createFallbackResponse(type: 'evaluation' | 'prompt' | 'vocabulary' | 'feedback', textType?: string): any {
    switch (type) {
      case 'evaluation':
        return {
          overallScore: 6,
          strengths: [
            "You've made a good attempt at this writing task",
            "Your ideas show creativity and effort",
            "You're developing your writing skills well"
          ],
          areasForImprovement: [
            "Continue practicing to strengthen your writing",
            "Focus on developing your ideas further",
            "Keep working on grammar and spelling"
          ],
          specificFeedback: {
            structure: "Your writing has a clear structure. Keep working on organizing your ideas even more clearly.",
            language: "You're using good vocabulary. Try adding more descriptive words to make your writing even more engaging.",
            ideas: "Your ideas are interesting and show creativity. Develop them further with more details and examples.",
            mechanics: "Keep practicing your grammar and spelling. Reading more will help you improve these skills."
          },
          nextSteps: [
            "Read examples of excellent writing in this style",
            "Practice writing regularly to build your skills",
            "Ask for feedback from teachers or family members"
          ]
        };

      case 'prompt':
        const prompts = {
          narrative: "Write a story about a character who discovers something unexpected that changes their day in a wonderful way.",
          persuasive: "Write about something you believe strongly in and try to convince others to agree with your point of view.",
          creative: "Write a creative piece about an ordinary object that turns out to be magical.",
          default: "Write about a topic that interests you, focusing on expressing your ideas clearly and creatively."
        };
        return prompts[textType?.toLowerCase() as keyof typeof prompts] || prompts.default;

      case 'vocabulary':
        return ['wonderful', 'excellent', 'amazing', 'fantastic', 'remarkable'];

      case 'feedback':
        return {
          overallComment: `Your ${textType || 'writing'} shows good effort and understanding of the task.`,
          suggestions: [
            "Keep practicing to improve your skills",
            "Try reading more examples of this type of writing",
            "Focus on developing your ideas with more details"
          ]
        };

      default:
        return null;
    }
  }
}

export default AIErrorHandler;
