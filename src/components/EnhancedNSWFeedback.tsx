import React from 'react';

// NSW text type guides for enhanced OpenAI prompts
const NSW_TEXT_TYPE_GUIDES = {
  narrative: {
    structure: "Clear beginning, middle, and end with well-developed characters and setting",
    language: "Descriptive language, dialogue, and sensory details",
    focus: "Plot development, character growth, and engaging storytelling"
  },
  persuasive: {
    structure: "Introduction with clear position, supporting arguments with evidence, and strong conclusion",
    language: "Persuasive devices, emotive language, and rhetorical questions",
    focus: "Logical arguments, addressing counterpoints, and call to action"
  },
  expository: {
    structure: "Introduction, informative paragraphs with facts, and summarizing conclusion",
    language: "Clear, precise language with technical terms where appropriate",
    focus: "Factual information, explanations, and educational content"
  },
  reflective: {
    structure: "Introduction to experience, analysis of feelings/thoughts, and conclusion with lessons learned",
    language: "Personal voice, thoughtful analysis, and introspective tone",
    focus: "Personal growth, insights, and meaningful reflection"
  },
  descriptive: {
    structure: "Introduction to subject, detailed description paragraphs, and concluding impression",
    language: "Vivid imagery, sensory details, and figurative language",
    focus: "Creating a clear picture in the reader's mind through detailed observation"
  }
};

// Enhanced OpenAI prompt generator for NSW-specific feedback
async function generateNSWFeedback(essay, textType) {
  const typeGuide = NSW_TEXT_TYPE_GUIDES[textType] || {};
  
  const prompt = `
    As an expert in NSW Selective School writing assessment, provide feedback on this ${textType}.
    
    Focus on these NSW Selective criteria:
    SET A (15 marks):
    - Content: relevance, originality, detail
    - Structure: organization, paragraphing, cohesion
    - Style: vocabulary, language features appropriate for ${textType}
    
    SET B (10 marks):
    - Sentences: variety, complexity, correctness
    - Punctuation: accuracy and range
    - Spelling: accuracy
    
    Text type guidance for ${textType}:
    - Structure: ${typeGuide.structure || "Well-organized with clear beginning, middle, and end"}
    - Language: ${typeGuide.language || "Age-appropriate vocabulary and style"}
    - Focus: ${typeGuide.focus || "Clear purpose and audience awareness"}
    
    Essay: ${essay}
    
    Provide specific scores for each criterion with justification and suggestions for improvement.
    Format your response to be encouraging and constructive for a student aged 9-11.
  `;
  
  try {
    // This would connect to the OpenAI API in production
    // For this implementation, we'll return a simulated response
    console.log("Generating NSW-specific feedback with enhanced prompt");
    
    // Simulated response - in production this would call the OpenAI API
    return {
      setA: {
        content: Math.floor(Math.random() * 3) + 3,
        structure: Math.floor(Math.random() * 3) + 2,
        style: Math.floor(Math.random() * 3) + 2
      },
      setB: {
        sentences: Math.floor(Math.random() * 2) + 2,
        punctuation: Math.floor(Math.random() * 2) + 1,
        spelling: Math.floor(Math.random() * 2) + 1
      },
      feedback: [
        "Your writing shows good understanding of the topic.",
        "Try to organize your ideas into clearer paragraphs.",
        "Use more descriptive words to make your writing more vivid.",
        "Practice using different sentence types to add variety.",
        "Remember to check your punctuation, especially commas and apostrophes.",
        "Double-check the spelling of longer words."
      ]
    };
  } catch (error) {
    console.error("Error generating NSW feedback:", error);
    return null;
  }
}

// Enhanced feedback component with color-coded highlights
export function EnhancedNSWFeedback({ essay, textType }) {
  const [feedback, setFeedback] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  
  const getFeedback = async () => {
    setLoading(true);
    try {
      const result = await generateNSWFeedback(essay, textType);
      setFeedback(result);
    } catch (error) {
      console.error("Error getting feedback:", error);
    } finally {
      setLoading(false);
    }
  };
  
  React.useEffect(() => {
    if (essay && essay.trim().length > 50) {
      getFeedback();
    }
  }, [essay, textType]);
  
  if (loading) {
    return (
      <div className="p-4 text-center">
        <div className="animate-pulse">Analyzing your writing...</div>
      </div>
    );
  }
  
  if (!feedback) {
    return null;
  }
  
  return (
    <div className="mt-6 p-4 bg-white rounded-lg shadow-sm">
      <h3 className="text-lg font-medium text-gray-900 mb-4">NSW Selective Writing Feedback</h3>
      
      <div className="space-y-4">
        <div className="p-3 bg-green-50 rounded-md border border-green-200">
          <h4 className="font-medium text-green-800 mb-2">Strengths</h4>
          <p className="text-green-700">{feedback.feedback[0]}</p>
        </div>
        
        <div className="p-3 bg-amber-50 rounded-md border border-amber-200">
          <h4 className="font-medium text-amber-800 mb-2">Areas for Improvement</h4>
          <ul className="list-disc pl-5 text-amber-700 space-y-1">
            {feedback.feedback.slice(1, 4).map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        
        <div className="p-3 bg-blue-50 rounded-md border border-blue-200">
          <h4 className="font-medium text-blue-800 mb-2">Suggestions</h4>
          <ul className="list-disc pl-5 text-blue-700 space-y-1">
            {feedback.feedback.slice(4).map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
