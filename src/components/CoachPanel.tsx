import React, { useState, useEffect, useCallback, useRef } from 'react';
import { MessageSquare, Sparkles, ChevronDown, ChevronUp, ThumbsUp, Lightbulb, HelpCircle, Target, AlertCircle, Star, Zap, Gift, Heart, X, Send, Bot, RefreshCw } from 'lucide-react';
import { getWritingFeedback } from '../lib/openai';
import AIErrorHandler from '../utils/errorHandling';
import { promptConfig } from '../config/prompts';
import './improved-layout.css';

interface CoachPanelProps {
  content: string;
  textType: string;
  assistanceLevel: string;
}

interface FeedbackItem {
  type: 'praise' | 'suggestion' | 'question' | 'challenge';
  area: string;
  text: string;
  exampleFromText?: string;
  suggestionForImprovement?: string;
}

interface StructuredFeedback {
  overallComment: string;
  feedbackItems: FeedbackItem[];
  focusForNextTime: string[];
}

interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  questionType?: string;
  operation?: string;
  responseQuality?: 'high' | 'medium' | 'low' | 'fallback';
  nswSpecific?: boolean;
  conversationContext?: string;
}

// Enhanced question analysis and routing
interface QuestionAnalysis {
  type: 'vocabulary' | 'structure' | 'grammar' | 'content' | 'general';
  operation: string;
  confidence: number;
  keywords: string[];
}

const extractResponseText = (response: any, questionType: string, userQuestion: string): string => {
  // Handle different response formats from the backend
  if (typeof response === 'string') {
    return response;
  }
  
  if (response && typeof response === 'object') {
    // Handle NSW Selective feedback format
    if (response.overallComment && response.criteriaFeedback) {
      let nswResponse = response.overallComment + '\n\n';
      
      // Add specific NSW criteria feedback based on question type
      if (questionType === 'structure' && response.criteriaFeedback.textStructureAndOrganization) {
        const structureFeedback = response.criteriaFeedback.textStructureAndOrganization;
        nswResponse += `**Structure Guidance (NSW Band ${structureFeedback.band || 'Assessment'}):**\n`;
        if (structureFeedback.suggestions && structureFeedback.suggestions.length > 0) {
          nswResponse += structureFeedback.suggestions.slice(0, 2).join('\n') + '\n\n';
        }
      }
      
      if (questionType === 'vocabulary' && response.criteriaFeedback.languageFeaturesAndVocabulary) {
        const vocabFeedback = response.criteriaFeedback.languageFeaturesAndVocabulary;
        nswResponse += `**Vocabulary Enhancement (NSW Band ${vocabFeedback.band || 'Assessment'}):**\n`;
        if (vocabFeedback.suggestions && vocabFeedback.suggestions.length > 0) {
          nswResponse += vocabFeedback.suggestions.slice(0, 2).join('\n') + '\n\n';
        }
      }
      
      if (questionType === 'content' && response.criteriaFeedback.ideasAndContent) {
        const contentFeedback = response.criteriaFeedback.ideasAndContent;
        nswResponse += `**Content Development (NSW Band ${contentFeedback.band || 'Assessment'}):**\n`;
        if (contentFeedback.suggestions && contentFeedback.suggestions.length > 0) {
          nswResponse += contentFeedback.suggestions.slice(0, 2).join('\n') + '\n\n';
        }
      }
      
      // Add NSW-specific exam strategies if available
      if (response.examStrategies && response.examStrategies.length > 0) {
        nswResponse += `**NSW Selective Exam Tips:**\n`;
        nswResponse += response.examStrategies.slice(0, 2).join('\n');
      }
      
      return nswResponse;
    }
    
    // Handle specific question types with contextual responses
    if (questionType === 'vocabulary' && response.suggestions) {
      if (Array.isArray(response.suggestions)) {
        return `Here are some vocabulary suggestions for your ${textType} writing:\n\n` + 
               response.suggestions.slice(0, 3).map((s: any) => {
                 if (typeof s === 'object' && s.word && s.suggestion) {
                   return `• Instead of "${s.word}", try: ${s.suggestion}`;
                 }
                 return `• ${s}`;
               }).join('\n');
      }
    }
    
    if (questionType === 'structure' && response.structure) {
      return `For ${textType} writing structure:\n\n${response.structure}`;
    }
    
    if (questionType === 'grammar' && response.corrections) {
      if (Array.isArray(response.corrections) && response.corrections.length > 0) {
        return `Here are some grammar suggestions:\n\n` + 
               response.corrections.slice(0, 3).map((c: any) => `• ${c.suggestion || c.message || c}`).join('\n');
      }
    }
    
    // Fallback for general feedback
    if (response.feedbackItems && Array.isArray(response.feedbackItems) && response.feedbackItems.length > 0) {
      return response.feedbackItems[0].text || 'I have some specific feedback for your writing!';
    }
    
    // If it's an object but we can't extract meaningful text, provide a contextual response
    return generateContextualResponse(questionType, userQuestion);
  }
  
  return generateContextualResponse(questionType, userQuestion);
};

// Generate contextual responses based on question type and content
const generateContextualResponse = (questionType: string, userQuestion: string): string => {
  const responses = {
    vocabulary: [
      "Great question about vocabulary! For stronger word choices, try replacing simple words like 'good' with 'excellent' or 'outstanding'. What specific words would you like help improving?",
      "Vocabulary is key for NSW Selective success! Consider using more sophisticated words - instead of 'big', try 'enormous' or 'substantial'. Which part of your writing needs stronger vocabulary?",
      "Excellent vocabulary question! For narrative writing, use vivid action verbs and descriptive adjectives. For persuasive writing, use powerful words that convince your reader."
    ],
    structure: [
      "Structure is crucial for NSW Selective writing! For narratives, use: engaging opening → rising action → climax → resolution. For persuasive essays: introduction with thesis → 3 body paragraphs with evidence → strong conclusion.",
      "Great structure question! Make sure each paragraph has one main idea, and use connecting words like 'furthermore', 'however', and 'in conclusion' to link your ideas smoothly.",
      "NSW Selective examiners love clear structure! Start with a hook, develop your ideas logically, and end with impact. What type of writing are you working on?"
    ],
    grammar: [
      "Grammar accuracy is important for NSW Selective! Check your sentence variety - mix short and long sentences. Make sure you're using correct punctuation, especially commas and apostrophes.",
      "Good grammar question! For NSW Selective, focus on: subject-verb agreement, consistent tense, and varied sentence beginnings. Read your work aloud to catch errors.",
      "Grammar tip for NSW success: Use complex sentences with subordinate clauses, but make sure they're clear. Avoid run-on sentences and sentence fragments."
    ],
    content: [
      "Content development is key for NSW Selective! Add specific details, examples, and evidence to support your main ideas. Show, don't just tell - use sensory details and dialogue.",
      "Excellent content question! For narratives, develop your characters' emotions and motivations. For persuasive writing, include facts, statistics, or expert opinions to strengthen your arguments.",
      "NSW Selective values original thinking! Develop your ideas deeply rather than just listing them. Ask yourself 'why' and 'how' to add depth to your content."
    ],
    general: [
      "I'm here to help with your NSW Selective writing preparation! Ask me about specific aspects like vocabulary, structure, grammar, or content development.",
      "Great to see you working on your writing! For NSW Selective success, focus on clear structure, sophisticated vocabulary, and well-developed ideas. What specific area would you like help with?",
      "NSW Selective writing requires strong skills across all areas. I can help you with planning, drafting, vocabulary choices, grammar, and exam strategies. What's your main concern right now?"
    ]
  };
  
  const typeResponses = responses[questionType as keyof typeof responses] || responses.general;
  const randomIndex = Math.floor(Math.random() * typeResponses.length);
  return typeResponses[randomIndex];
};

// Generate intelligent local responses based on content analysis
const generateIntelligentLocalResponse = (question: string, analysis: QuestionAnalysis, content: string, textType: string): any => {
  const wordCount = content.trim().split(/\s+/).filter(w => w.length > 0).length;
  const lowerQuestion = question.toLowerCase();
  
  // Analyze the content to provide specific feedback
  const hasDialogue = content.includes('"') || content.includes("'");
  const hasGoodOpening = content.length > 50 && !content.toLowerCase().startsWith('once upon a time');
  const paragraphCount = content.split('\n\n').filter(p => p.trim().length > 0).length;
  
  // Provide specific responses based on question type and content analysis
  switch (analysis.type) {
    case 'vocabulary':
      if (lowerQuestion.includes('better word') || lowerQuestion.includes('synonym')) {
        return {
          suggestions: [
            { word: 'good', suggestion: 'excellent, outstanding, remarkable' },
            { word: 'said', suggestion: 'exclaimed, declared, whispered' },
            { word: 'went', suggestion: 'traveled, journeyed, ventured' },
            { word: 'big', suggestion: 'enormous, massive, gigantic' },
            { word: 'nice', suggestion: 'delightful, pleasant, wonderful' }
          ]
        };
      }
      return `For your ${textType} writing, try using more sophisticated vocabulary! Instead of simple words like 'good', 'big', or 'nice', use words like 'excellent', 'enormous', or 'delightful'. This will make your writing more engaging for NSW Selective assessors.`;
      
    case 'structure':
      if (paragraphCount === 1) {
        return `I notice your ${textType} is currently in one paragraph. For NSW Selective success, break it into 3-4 paragraphs: 1) Engaging introduction, 2-3) Body paragraphs developing your story/argument, 4) Strong conclusion. This will make your writing much clearer!`;
      }
      return `Your ${textType} structure looks good with ${paragraphCount} paragraphs! For NSW Selective, make sure each paragraph has one main idea and flows smoothly to the next. Use transition words like 'furthermore', 'however', and 'in conclusion'.`;
      
    case 'grammar':
      return `For NSW Selective grammar success: 1) Vary your sentence beginnings, 2) Mix short and long sentences, 3) Use correct punctuation, 4) Keep consistent tense throughout. Read your work aloud to catch any errors!`;
      
    case 'content':
      if (wordCount < 100) {
        return `Your ${textType} is off to a good start with ${wordCount} words! For NSW Selective, aim for 250-300 words. Add more specific details, examples, and descriptions to develop your ideas fully.`;
      }
      if (textType === 'narrative' && !hasDialogue) {
        return `Great ${textType} development with ${wordCount} words! Consider adding some dialogue to bring your characters to life. For example: "I can't believe this is happening!" she exclaimed.`;
      }
      return `Excellent content development with ${wordCount} words! Your ${textType} shows good understanding. Keep developing your ideas with specific examples and vivid details.`;
      
    default:
      if (wordCount === 0) {
        return `Ready to start your ${textType}? Begin with an engaging opening that hooks your reader. For narratives, try starting in the middle of action. For persuasive writing, start with a thought-provoking question or statistic.`;
      }
      if (wordCount < 50) {
        return `Good start on your ${textType}! You have ${wordCount} words so far. Keep developing your ideas - aim for at least 250 words for NSW Selective standards.`;
      }
      return `Your ${textType} is developing well with ${wordCount} words! ${hasGoodOpening ? 'Great opening!' : 'Consider strengthening your opening.'} ${hasDialogue && textType === 'narrative' ? 'Nice use of dialogue!' : ''} Keep building your ideas with specific details and examples.`;
  }
};
export function CoachPanel({ content, textType, assistanceLevel }: CoachPanelProps) {
  const [structuredFeedback, setStructuredFeedback] = useState<StructuredFeedback | null>(null);
  const [feedbackHistory, setFeedbackHistory] = useState<FeedbackItem[]>([]);
  const [localAssistanceLevel, setLocalAssistanceLevel] = useState<string>(assistanceLevel);
  const [hiddenFeedbackItems, setHiddenFeedbackItems] = useState<number[]>([]);
  const [isOverallCommentHidden, setIsOverallCommentHidden] = useState(false);
  const [isFocusForNextTimeHidden, setIsFocusForNextTimeHidden] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [lastProcessedContent, setLastProcessedContent] = useState('');
  const [error, setError] = useState<string | null>(null);
  
  // Enhanced chat functionality state
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [showPrompts, setShowPrompts] = useState(false);
  const [conversationContext, setConversationContext] = useState<ChatMessage[]>([]);
  const chatMessagesEndRef = useRef<HTMLDivElement>(null);

  // Enhanced question analysis function
  const analyzeUserQuestion = useCallback((question: string): QuestionAnalysis => {
    const lowerQuestion = question.toLowerCase();
    
    // Vocabulary-related keywords
    const vocabularyKeywords = ['word', 'vocabulary', 'synonym', 'better word', 'stronger word', 'replace', 'enhance', 'improve word'];
    const vocabularyScore = vocabularyKeywords.filter(keyword => lowerQuestion.includes(keyword)).length;
    
    // Structure-related keywords
    const structureKeywords = ['structure', 'organize', 'paragraph', 'introduction', 'conclusion', 'flow', 'transition', 'order'];
    const structureScore = structureKeywords.filter(keyword => lowerQuestion.includes(keyword)).length;
    
    // Grammar-related keywords
    const grammarKeywords = ['grammar', 'spelling', 'punctuation', 'sentence', 'tense', 'correct'];
    const grammarScore = grammarKeywords.filter(keyword => lowerQuestion.includes(keyword)).length;
    
    // Content-related keywords
    const contentKeywords = ['idea', 'content', 'topic', 'theme', 'argument', 'evidence', 'example', 'detail'];
    const contentScore = contentKeywords.filter(keyword => lowerQuestion.includes(keyword)).length;
    
    // Determine the most likely question type
    const scores = {
      vocabulary: vocabularyScore,
      structure: structureScore,
      grammar: grammarScore,
      content: contentScore
    };
    
    const maxScore = Math.max(...Object.values(scores));
    const questionType = Object.keys(scores).find(key => scores[key] === maxScore) || 'general';
    
    // Map question types to operations
    const operationMap = {
      vocabulary: 'enhanceVocabulary',
      structure: 'getWritingStructure',
      grammar: 'checkGrammarAndSpelling',
      content: 'getSpecializedTextTypeFeedback',
      general: 'getWritingFeedback'
    };
    
    return {
      type: questionType as QuestionAnalysis['type'],
      operation: operationMap[questionType],
      confidence: maxScore > 0 ? maxScore / vocabularyKeywords.length : 0.5,
      keywords: [vocabularyKeywords, structureKeywords, grammarKeywords, contentKeywords].flat().filter(keyword => lowerQuestion.includes(keyword))
    };
  }, []);

  // Enhanced API call routing function
  const routeQuestionToOperation = useCallback(async (question: string, analysis: QuestionAnalysis) => {
    try {
      console.log(`[DEBUG] Routing question: "${question}" (type: ${analysis.type})`);
      
      // Try to get real AI response first
      const response = await fetch('/.netlify/functions/ai-operations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          operation: 'getWritingFeedback',
          content,
          textType,
          assistanceLevel: localAssistanceLevel,
          feedbackHistory: conversationContext.slice(-5),
          userQuestion: question,
          questionType: analysis.type
        })
      });

      if (response.ok) {
        const aiResponse = await response.json();
        console.log('[DEBUG] AI response received:', aiResponse);
        
        // If we get a valid AI response, use it
        if (aiResponse && !aiResponse.error) {
          return aiResponse;
        }
      }
      
      console.log('[DEBUG] AI call failed, using intelligent local response');
      return generateIntelligentLocalResponse(question, analysis, content, textType);
    } catch (error) {
      console.error('[DEBUG] Error in API routing:', error);
      return generateIntelligentLocalResponse(question, analysis, content, textType);
    }
  }, [content, textType, localAssistanceLevel, conversationContext]);

  const getNSWSelectivePrompts = (textType: string) => {
    const basePrompts = [
      `How can I make my ${textType} more engaging for NSW Selective assessors?`,
      `What vocabulary would strengthen my ${textType} response for selective school standards?`,
      "How can I better incorporate the visual stimulus into my writing?",
      `What specific techniques should I use for ${textType} writing in the NSW Selective test?`,
      "How can I improve my opening sentence to hook the assessors?",
      "What makes a strong conclusion for NSW Selective writing?"
    ];

    const textTypeSpecificPrompts: { [key: string]: string[] } = {
      'advertisement': [
        "How can I create a more compelling headline for my advertisement?",
        "What persuasive techniques work best for NSW Selective advertisement writing?",
        "How do I include an effective call to action in my advertisement?"
      ],
      'advice sheet': [
        "How can I make my advice clearer and more helpful?",
        "What tone should I use for an effective advice sheet?",
        "How do I organize my advice in a logical sequence?"
      ],
      'diary entry': [
        "How can I make my diary entry more personal and reflective?",
        "What emotions should I express in my diary writing?",
        "How do I show character growth in a diary entry?"
      ],
      'discussion': [
        "How do I present balanced arguments in my discussion?",
        "What evidence should I include to support different viewpoints?",
        "How can I structure my discussion for maximum impact?"
      ],
      'guide': [
        "How can I make my instructions clearer and easier to follow?",
        "What format works best for a step-by-step guide?",
        "How do I anticipate what readers might find confusing?"
      ],
      'letter': [
        "What's the appropriate tone for my letter's purpose?",
        "How do I structure a formal letter for NSW Selective standards?",
        "What makes an effective opening and closing for letters?"
      ],
      'narrative': [
        "How can I create more vivid characters in my story?",
        "What techniques make dialogue sound natural and engaging?",
        "How do I build tension and excitement in my narrative?"
      ],
      'narrative/creative': [
        "How can I create more vivid characters in my story?",
        "What techniques make dialogue sound natural and engaging?",
        "How do I build tension and excitement in my narrative?"
      ],
      'news report': [
        "How do I write an effective lead paragraph for my news report?",
        "What makes my news writing objective and factual?",
        "How do I include all the important details (who, what, when, where, why)?"
      ],
      'persuasive': [
        "How can I make my arguments more convincing for NSW assessors?",
        "What evidence will strengthen my persuasive writing?",
        "How do I address counterarguments effectively?"
      ],
      'review': [
        "How do I balance personal opinion with objective analysis?",
        "What criteria should I use to evaluate what I'm reviewing?",
        "How can I make my recommendation clear and justified?"
      ],
      'speech': [
        "How can I make my speech more engaging for the audience?",
        "What rhetorical devices work best in speech writing?",
        "How do I create a memorable opening and powerful conclusion?"
      ]
    };

    const specificPrompts = textTypeSpecificPrompts[textType.toLowerCase()] || [];
    return [...basePrompts, ...specificPrompts];
  };

  const commonPrompts = getNSWSelectivePrompts(textType);

  // Helper function to count words in text
  const countWords = useCallback((text: string): number => {
    if (!text || text.trim().length === 0) return 0;
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  }, []);

  // Scroll to bottom of chat messages
  const scrollToBottom = () => {
    chatMessagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const fetchFeedback = useCallback(async (currentContent: string, currentTextType: string, currentAssistanceLevel: string, currentFeedbackHistory: FeedbackItem[]) => {
    const wordCount = countWords(currentContent);
    
    if (wordCount >= 50 && currentContent !== lastProcessedContent) {
      console.log(`[DEBUG] Triggering AI feedback - Word count: ${wordCount}, Content length: ${currentContent.length}`);
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await getWritingFeedback(currentContent, currentTextType, currentAssistanceLevel, currentFeedbackHistory);
        
        if (response && response.feedbackItems) {
          setStructuredFeedback(response);
          setFeedbackHistory(prevHistory => [...prevHistory, ...response.feedbackItems.filter(item => 
            !prevHistory.some(histItem => histItem.text === item.text && histItem.area === item.area)
          )]);
        } else if (response && response.overallComment) {
          setStructuredFeedback(response as StructuredFeedback);
        }
        
        setLastProcessedContent(currentContent);
        console.log('[DEBUG] AI feedback received and processed successfully');
      } catch (error) {
        const aiError = AIErrorHandler.handleError(error, 'writing feedback');
        console.error('[DEBUG] Error fetching AI feedback:', aiError.userFriendlyMessage);
        setError(aiError.userFriendlyMessage);
        
        // Use fallback feedback
        const fallbackFeedback = AIErrorHandler.createFallbackResponse('feedback', currentTextType);
        setStructuredFeedback(fallbackFeedback as StructuredFeedback);
      } finally {
        setIsLoading(false);
      }
    } else if (wordCount < 50) {
      console.log(`[DEBUG] Not triggering AI feedback - Word count: ${wordCount} (need 50+ words)`);
    }
  }, [lastProcessedContent, countWords]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchFeedback(content, textType, localAssistanceLevel, feedbackHistory);
    }, 2000);

    return () => clearTimeout(debounceTimer);
  }, [content, textType, localAssistanceLevel, feedbackHistory, fetchFeedback]);

  // Update local assistance level when prop changes
  useEffect(() => {
    setLocalAssistanceLevel(assistanceLevel);
  }, [assistanceLevel]);

  // Enhanced Chat functionality with intelligent routing
  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (chatInput.trim()) {
      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        text: chatInput.trim(),
        isUser: true,
        timestamp: new Date()
      };

      setChatMessages(prev => [...prev, userMessage]);
      setConversationContext(prev => [...prev, userMessage]);
      
      const currentInput = chatInput.trim();
      setChatInput('');
      setIsChatLoading(true);
      setShowPrompts(false);

      try {
        // Analyze the user's question
        const questionAnalysis = analyzeUserQuestion(currentInput);
        
        // Route to appropriate operation
        const response = await routeQuestionToOperation(currentInput, questionAnalysis);
        

        
        // Process response based on operation type
        const botResponseText = extractResponseText(response, questionAnalysis.type, currentInput);
        
        console.log(`[COACH] Bot response text: ${botResponseText.substring(0, 100)}...`);

        const botMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          text: botResponseText,
          isUser: false,
          timestamp: new Date(),
          questionType: questionAnalysis.type,
          operation: questionAnalysis.operation,
          responseQuality: response && response.overallComment ? 'high' : 'fallback',
          nswSpecific: true
        };

        setChatMessages(prev => [...prev, botMessage]);
        setConversationContext(prev => [...prev, botMessage]);

        // Add to feedback history if it's a substantial response
        if (response && response.feedbackItems) {
          const questionFeedbackItem: FeedbackItem = {
              type: 'question',
              area: `${questionAnalysis.type.charAt(0).toUpperCase() + questionAnalysis.type.slice(1)} Question`,
              text: `You asked: ${currentInput}`
          };
          const answerItems = response.feedbackItems.map(item => ({
            ...item, 
            area: `Answer: ${questionAnalysis.type} - ${currentInput.substring(0, 30)}...`
          }));
          
          setFeedbackHistory(prevHistory => [...prevHistory, questionFeedbackItem, ...answerItems.filter(item => 
              !prevHistory.some(histItem => histItem.text === item.text && histItem.area === item.area)
            )]);
        }

      } catch (error) {
        const aiError = AIErrorHandler.handleError(error, 'chat processing');
        const errorMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          text: `I'm having trouble right now, but keep writing! Focus on making your ${textType} clear and engaging.`,
          isUser: false,
          timestamp: new Date()
        };
        setChatMessages(prev => [...prev, errorMessage]);
      } finally {
        setIsChatLoading(false);
      }
    }
  };

  const handlePromptClick = (promptText: string) => {
    setChatInput(promptText);
    setShowPrompts(false);
  };

  const getFeedbackItemStyle = (type: FeedbackItem['type']) => {
    switch (type) {
      case 'praise':
        return { icon: <Star className="h-6 w-6 text-yellow-500 mr-3 shrink-0" />, bgColor: 'bg-gradient-to-r from-green-50 to-green-100', textColor: 'text-green-800' };
      case 'suggestion':
        return { icon: <Lightbulb className="h-6 w-6 text-amber-500 mr-3 shrink-0" />, bgColor: 'bg-gradient-to-r from-amber-50 to-amber-100', textColor: 'text-amber-800' };
      case 'question':
        return { icon: <HelpCircle className="h-6 w-6 text-blue-500 mr-3 shrink-0" />, bgColor: 'bg-gradient-to-r from-blue-50 to-blue-100', textColor: 'text-blue-800' };
      case 'challenge':
        return { icon: <Zap className="h-6 w-6 text-purple-500 mr-3 shrink-0" />, bgColor: 'bg-gradient-to-r from-purple-50 to-purple-100', textColor: 'text-purple-800' };
      default:
        return { icon: <Gift className="h-6 w-6 text-gray-500 mr-3 shrink-0" />, bgColor: 'bg-gradient-to-r from-gray-50 to-gray-100', textColor: 'text-gray-800' };
    }
  };

  // Calculate current word count for display
  const currentWordCount = countWords(content);
  const wordsNeeded = Math.max(0, 50 - currentWordCount);
  const targetWordCount = 250;
  const isNearTarget = currentWordCount >= 200 && currentWordCount <= 300;
  const isOverTarget = currentWordCount > 300;

  const getWordCountMessage = () => {
    if (currentWordCount < 50) {
      return `Write ${wordsNeeded} more word${wordsNeeded !== 1 ? 's' : ''} to get help (${currentWordCount}/50)`;
    }
    return `Great start! Try to write about ${targetWordCount} words (${currentWordCount}/${targetWordCount})`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
              <Bot className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">AI Writing Coach</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Enhanced with intelligent question routing</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              currentWordCount < 50 
                ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                : isNearTarget 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  : isOverTarget
                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
            }`}>
              {getWordCountMessage()}
            </span>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatMessages.length === 0 && (
          <div className="text-center py-8">
            <Bot className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400 mb-2">Ask me anything about your {textType} writing!</p>
            <p className="text-sm text-gray-500 dark:text-gray-500">I can help with vocabulary, structure, grammar, and content.</p>
          </div>
        )}
        
        {chatMessages.map((message) => (
          <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
              message.isUser 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
            }`}>
              {!message.isUser && message.questionType && (
                <div className="text-xs opacity-75 mb-1">
                  {message.questionType.charAt(0).toUpperCase() + message.questionType.slice(1)} Help
                </div>
              )}
              <p className="text-sm whitespace-pre-wrap">{message.text}</p>
              <p className="text-xs opacity-75 mt-1">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        
        {isChatLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg px-4 py-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={chatMessagesEndRef} />
      </div>

      {/* Quick Prompts */}
      {showPrompts && (
        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-2 flex items-center">
            <Star className="h-3 w-3 mr-1" />
            NSW Selective Writing Questions
          </div>
          <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto">
            {commonPrompts.slice(0, 6).map((prompt, index) => (
              <button
                key={index}
                onClick={() => handlePromptClick(prompt)}
                className="text-left p-2 text-sm bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 rounded-lg transition-colors border border-blue-200 dark:border-blue-800"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Chat Input */}
      <div className="border-t border-gray-200 dark:border-gray-700 p-4">
        <form onSubmit={handleChatSubmit} className="flex space-x-2">
          <button
            type="button"
            onClick={() => setShowPrompts(!showPrompts)}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <Sparkles className="h-5 w-5" />
          </button>
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder="Ask about NSW Selective writing: vocabulary, structure, grammar, content, or exam strategies..."
            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            disabled={isChatLoading}
          />
          <button
            type="submit"
            disabled={!chatInput.trim() || isChatLoading}
            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-5 w-5" />
          </button>
        </form>
      </div>

      {/* Feedback Section */}
      {structuredFeedback && (
        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Writing Feedback</h4>
          
          {/* Overall Comment */}
          {structuredFeedback.overallComment && !isOverallCommentHidden && (
            <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-start justify-between">
                <div className="flex items-start">
                  <MessageSquare className="h-5 w-5 text-blue-500 mr-3 mt-0.5 shrink-0" />
                  <p className="text-blue-800 dark:text-blue-200 text-sm">{structuredFeedback.overallComment}</p>
                </div>
                <button
                  onClick={() => setIsOverallCommentHidden(true)}
                  className="text-blue-400 hover:text-blue-600 ml-2"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* Feedback Items */}
          {structuredFeedback.feedbackItems && structuredFeedback.feedbackItems.length > 0 && (
            <div className="space-y-3 mb-4">
              {structuredFeedback.feedbackItems.map((item, index) => {
                if (hiddenFeedbackItems.includes(index)) return null;
                
                const style = getFeedbackItemStyle(item.type);
                return (
                  <div key={index} className={`p-4 rounded-lg border ${style.bgColor} border-opacity-50`}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start flex-1">
                        {style.icon}
                        <div className="flex-1">
                          <div className="flex items-center mb-1">
                            <span className={`text-xs font-medium px-2 py-1 rounded-full ${style.textColor} bg-white bg-opacity-50`}>
                              {item.area}
                            </span>
                          </div>
                          <p className={`${style.textColor} text-sm mb-2`}>{item.text}</p>
                          {item.exampleFromText && (
                            <div className="mt-2 p-2 bg-white bg-opacity-50 rounded border-l-4 border-current">
                              <p className="text-xs font-medium mb-1">From your text:</p>
                              <p className="text-sm italic">"{item.exampleFromText}"</p>
                            </div>
                          )}
                          {item.suggestionForImprovement && (
                            <div className="mt-2 p-2 bg-white bg-opacity-50 rounded border-l-4 border-current">
                              <p className="text-xs font-medium mb-1">Try this instead:</p>
                              <p className="text-sm">{item.suggestionForImprovement}</p>
                            </div>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => setHiddenFeedbackItems(prev => [...prev, index])}
                        className={`${style.textColor} hover:opacity-75 ml-2`}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Focus for Next Time */}
          {structuredFeedback.focusForNextTime && structuredFeedback.focusForNextTime.length > 0 && !isFocusForNextTimeHidden && (
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
              <div className="flex items-start justify-between">
                <div className="flex items-start">
                  <Target className="h-5 w-5 text-purple-500 mr-3 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-purple-800 dark:text-purple-200 text-sm font-medium mb-2">Focus for next time:</p>
                    <ul className="text-purple-700 dark:text-purple-300 text-sm space-y-1">
                      {structuredFeedback.focusForNextTime.map((focus, index) => (
                        <li key={index} className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>{focus}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <button
                  onClick={() => setIsFocusForNextTimeHidden(true)}
                  className="text-purple-400 hover:text-purple-600 ml-2"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center space-x-3">
            <RefreshCw className="h-5 w-5 text-blue-500 animate-spin" />
            <span className="text-sm text-gray-600 dark:text-gray-400">Analyzing your writing...</span>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center space-x-3 text-red-600 dark:text-red-400">
            <AlertCircle className="h-5 w-5" />
            <span className="text-sm">{error}</span>
          </div>
        </div>
      )}
    </div>
  );
}