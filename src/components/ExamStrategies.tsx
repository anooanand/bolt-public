import React, { useState } from 'react';
import { Clock, Search, FileText, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';

interface ExamStrategiesProps {
  textType: string;
}

type StrategySection = 'timeManagement' | 'questionAnalysis' | 'planningTemplates' | 'commonPitfalls';

export function ExamStrategies({ textType }: ExamStrategiesProps) {
  const [activeSection, setActiveSection] = useState<StrategySection>('timeManagement');
  const [expandedPitfall, setExpandedPitfall] = useState<number | null>(null);
  const [expandedTemplate, setExpandedTemplate] = useState<number | null>(null);
  const [selectedExercise, setSelectedExercise] = useState<number | null>(null);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(300); // 5 minutes default
  const [exerciseContent, setExerciseContent] = useState('');
  const [showExerciseResult, setShowExerciseResult] = useState(false);
  const [promptAnalysisInput, setPromptAnalysisInput] = useState('');
  const [promptAnalysisResult, setPromptAnalysisResult] = useState<{
    keywords: string[];
    instructions: string[];
    constraints: string[];
    suggestions: string;
  } | null>(null);

  // Time Management Exercises
  const timeManagementExercises = [
    {
      id: 1,
      title: "5-Minute Paragraph Sprint",
      description: "Practice writing a focused paragraph on a given topic in just 5 minutes.",
      prompts: [
        "Describe your favorite place to visit",
        "Explain why reading is important",
        "Describe a character who overcomes a challenge",
        "Explain the importance of friendship"
      ],
      timeLimit: 300 // 5 minutes in seconds
    },
    {
      id: 2,
      title: "3-Minute Introduction Challenge",
      description: "Write a compelling introduction for an essay in just 3 minutes.",
      prompts: [
        "Write an introduction for an essay about technology in schools",
        "Write an introduction for a narrative about a surprising discovery",
        "Write an introduction for a persuasive essay about environmental protection",
        "Write an introduction for an essay about a historical figure who inspires you"
      ],
      timeLimit: 180 // 3 minutes in seconds
    },
    {
      id: 3,
      title: "2-Minute Conclusion Wrap-up",
      description: "Create a strong conclusion that summarizes main points in 2 minutes.",
      prompts: [
        "Write a conclusion for an essay about the benefits of exercise",
        "Write a conclusion for a story about overcoming obstacles",
        "Write a conclusion for a persuasive essay about reducing plastic waste",
        "Write a conclusion for an essay about the importance of learning new languages"
      ],
      timeLimit: 120 // 2 minutes in seconds
    }
  ];

  // Question Analysis Examples
  const questionAnalysisExamples = [
    {
      prompt: "Write a narrative about a character who faces an unexpected challenge during a journey.",
      analysis: {
        keywords: ["narrative", "character", "unexpected challenge", "journey"],
        instructions: ["Write a story", "Focus on a character", "Include an unexpected challenge", "Set during a journey"],
        constraints: ["Must be a narrative", "Must have a central character", "Must include a journey"],
        suggestions: "Plan your character's personality and background first. Then outline the journey and decide what unexpected challenge they'll face. Make sure the challenge is truly unexpected but believable within your story context."
      }
    },
    {
      prompt: "Persuade your local council to build more recreational facilities for young people in your area.",
      analysis: {
        keywords: ["persuade", "local council", "recreational facilities", "young people", "your area"],
        instructions: ["Write persuasively", "Address the local council", "Argue for more recreational facilities", "Focus on benefits for young people"],
        constraints: ["Must be persuasive", "Must address local council", "Must focus on local area", "Must benefit young people"],
        suggestions: "Start by identifying specific recreational facilities that would benefit young people in your area. Include statistics or examples of how similar facilities have benefited youth in other areas. Address potential counterarguments like cost or space limitations."
      }
    },
    {
      prompt: "Explain how technology has changed education in the past decade. Include both positive and negative impacts.",
      analysis: {
        keywords: ["explain", "technology", "education", "past decade", "positive impacts", "negative impacts"],
        instructions: ["Explain changes", "Focus on education", "Cover the past decade", "Include both positive and negative impacts"],
        constraints: ["Must be explanatory", "Must cover both positive and negative impacts", "Must focus on past decade"],
        suggestions: "Organize your essay to clearly separate positive and negative impacts. Consider impacts on students, teachers, and the learning environment. Use specific examples of technologies (e.g., tablets, online learning platforms) and their effects."
      }
    }
  ];

  // Planning Templates
  const planningTemplates = [
    {
      id: 1,
      title: "Narrative Planning Template",
      description: "A structured template for planning narrative writing",
      template: {
        sections: [
          {
            title: "Character Development",
            questions: [
              "Who is your main character? (Name, age, personality)",
              "What does your character want or need?",
              "What obstacle or challenge will they face?"
            ]
          },
          {
            title: "Setting",
            questions: [
              "Where does your story take place?",
              "When does your story take place?",
              "What important details about the setting affect your story?"
            ]
          },
          {
            title: "Plot Structure",
            questions: [
              "Beginning: How will you introduce your character and setting?",
              "Middle: What events lead to the main challenge?",
              "Climax: How does the main challenge reach its highest point?",
              "Resolution: How is the challenge resolved?"
            ]
          },
          {
            title: "Themes and Techniques",
            questions: [
              "What is the main message or theme of your story?",
              "What literary techniques will you use? (e.g., foreshadowing, flashbacks)",
              "What sensory details will you include?"
            ]
          }
        ]
      }
    },
    {
      id: 2,
      title: "Persuasive Writing Template",
      description: "A framework for organizing persuasive arguments",
      template: {
        sections: [
          {
            title: "Introduction",
            questions: [
              "What is your position or thesis statement?",
              "Why is this topic important or relevant?",
              "What will your main arguments be? (brief overview)"
            ]
          },
          {
            title: "Argument 1",
            questions: [
              "What is your first main point?",
              "What evidence supports this point?",
              "How does this connect to your thesis?"
            ]
          },
          {
            title: "Argument 2",
            questions: [
              "What is your second main point?",
              "What evidence supports this point?",
              "How does this connect to your thesis?"
            ]
          },
          {
            title: "Argument 3",
            questions: [
              "What is your third main point?",
              "What evidence supports this point?",
              "How does this connect to your thesis?"
            ]
          },
          {
            title: "Counterarguments",
            questions: [
              "What might someone who disagrees say?",
              "How would you respond to these counterarguments?",
              "Why is your position still stronger?"
            ]
          },
          {
            title: "Conclusion",
            questions: [
              "How will you restate your thesis?",
              "What are the main points to summarize?",
              "What call to action or final thought will you leave readers with?"
            ]
          }
        ]
      }
    },
    {
      id: 3,
      title: "Expository/Informative Template",
      description: "A structure for clear, informative writing",
      template: {
        sections: [
          {
            title: "Introduction",
            questions: [
              "What topic will you explain?",
              "Why is this topic important or interesting?",
              "What are the main aspects you will cover?"
            ]
          },
          {
            title: "Background Information",
            questions: [
              "What essential background does the reader need?",
              "Are there any key terms to define?",
              "What context helps understand the topic?"
            ]
          },
          {
            title: "Main Point 1",
            questions: [
              "What is the first key aspect of your topic?",
              "What facts, examples, or explanations support this?",
              "How does this connect to your overall topic?"
            ]
          },
          {
            title: "Main Point 2",
            questions: [
              "What is the second key aspect of your topic?",
              "What facts, examples, or explanations support this?",
              "How does this connect to your overall topic?"
            ]
          },
          {
            title: "Main Point 3",
            questions: [
              "What is the third key aspect of your topic?",
              "What facts, examples, or explanations support this?",
              "How does this connect to your overall topic?"
            ]
          },
          {
            title: "Conclusion",
            questions: [
              "How will you summarize the main points?",
              "What is the significance or implications of this information?",
              "What final thought will help readers remember your explanation?"
            ]
          }
        ]
      }
    }
  ];

  // Common Pitfalls
  const commonPitfalls = [
    {
      id: 1,
      title: "Ignoring the Prompt Requirements",
      description: "One of the most common mistakes is not fully addressing all aspects of the prompt.",
      examples: [
        "Prompt asks to discuss both advantages and disadvantages, but the response only covers advantages.",
        "Prompt requires a specific text type (e.g., persuasive), but student writes in a different style.",
        "Prompt includes specific elements to include, but some are omitted in the response."
      ],
      solution: "Always underline or highlight key requirements in the prompt before you start writing. Create a quick checklist and refer back to it as you write to ensure you're meeting all requirements."
    },
    {
      id: 2,
      title: "Poor Time Management",
      description: "Running out of time leads to rushed conclusions or incomplete responses.",
      examples: [
        "Spending too much time planning and not enough time writing",
        "Writing an overly detailed introduction at the expense of the main body",
        "Not leaving time to review for errors or improvements"
      ],
      solution: "Allocate specific time blocks: 5 minutes for planning, 20-25 minutes for writing, and 5 minutes for reviewing. Set checkpoints - by 10 minutes in, you should have completed your introduction and started your first body paragraph."
    },
    {
      id: 3,
      title: "Weak Structure and Organization",
      description: "Disorganized writing makes it difficult for markers to follow your ideas.",
      examples: [
        "Missing clear paragraphs or sections",
        "Ideas presented randomly without logical flow",
        "No clear introduction or conclusion"
      ],
      solution: "Always use a clear structure with an introduction, body paragraphs, and conclusion. Each paragraph should focus on one main idea with a topic sentence. Use transition words (firstly, furthermore, in conclusion) to guide the reader through your writing."
    },
    {
      id: 4,
      title: "Limited Vocabulary and Expression",
      description: "Using basic or repetitive language reduces the impact of your writing.",
      examples: [
        "Overusing simple words like 'good', 'bad', 'nice', or 'said'",
        "Repeating the same sentence structures throughout",
        "Using informal language or slang in formal writing"
      ],
      solution: "Prepare a list of sophisticated alternatives for common words. Practice using varied sentence structures - mix short and long sentences, and different sentence beginnings. Read widely to absorb more advanced vocabulary and expressions."
    },
    {
      id: 5,
      title: "Insufficient Development of Ideas",
      description: "Presenting ideas without adequate explanation, examples, or evidence.",
      examples: [
        "Making claims without supporting evidence",
        "Providing too few details in narrative descriptions",
        "Listing points without explaining their significance"
      ],
      solution: "Use the PEEL structure for paragraphs: Point, Evidence, Explanation, Link. For each main idea, provide specific examples, explanations, or evidence. Ask yourself 'why?' and 'how?' to develop your ideas further."
    }
  ];

  // Handle timer for time management exercises
  React.useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (timerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(prev => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setTimerRunning(false);
      setShowExerciseResult(true);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerRunning, timerSeconds]);

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Start time management exercise
  const startExercise = (exercise: typeof timeManagementExercises[0]) => {
    setSelectedExercise(exercise.id);
    setTimerSeconds(exercise.timeLimit);
    setExerciseContent('');
    setShowExerciseResult(false);
    setTimerRunning(true);
  };

  // Analyze prompt
  const analyzePrompt = () => {
    if (!promptAnalysisInput.trim()) return;
    
    // In a real implementation, this would call an API or more sophisticated analysis
    // This is a simplified version for demonstration
    const keywords = promptAnalysisInput.split(' ')
      .filter(word => word.length > 4)
      .slice(0, 5);
    
    const isNarrative = promptAnalysisInput.toLowerCase().includes('narrative') || 
                        promptAnalysisInput.toLowerCase().includes('story');
    const isPersuasive = promptAnalysisInput.toLowerCase().includes('persuade') || 
                         promptAnalysisInput.toLowerCase().includes('convince');
    const isExpository = promptAnalysisInput.toLowerCase().includes('explain') || 
                         promptAnalysisInput.toLowerCase().includes('describe');
    
    const instructions = [];
    if (isNarrative) instructions.push("Write a story", "Develop characters", "Create a plot");
    if (isPersuasive) instructions.push("Present arguments", "Use persuasive language", "Address counterarguments");
    if (isExpository) instructions.push("Explain clearly", "Provide information", "Use facts and examples");
    
    const constraints = [];
    if (promptAnalysisInput.toLowerCase().includes('must')) {
      const mustSentence = promptAnalysisInput.split('must')[1].split('.')[0];
      constraints.push(`Must${mustSentence}`);
    }
    
    if (promptAnalysisInput.toLowerCase().includes('include')) {
      const includeSentence = promptAnalysisInput.split('include')[1].split('.')[0];
      constraints.push(`Include${includeSentence}`);
    }
    
    setPromptAnalysisResult({
      keywords,
      instructions: instructions.length ? instructions : ["Write a response", "Address the topic"],
      constraints: constraints.length ? constraints : ["Follow standard writing conventions"],
      suggestions: "Plan your response before writing. Make sure to address all aspects of the prompt and follow any specific instructions."
    });
  };

  // Render Time Management section
  const renderTimeManagement = () => (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-4">Time Management Training</h2>
      
      <p className="text-gray-700 mb-6">
        Effective time management is crucial for success in the NSW Selective exam. These exercises will help you practice writing quality content under time pressure.
      </p>
      
      {selectedExercise ? (
        <div className="bg-white rounded-lg border p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              {timeManagementExercises.find(ex => ex.id === selectedExercise)?.title}
            </h3>
            <div className={`text-xl font-mono font-bold ${timerSeconds < 60 ? 'text-red-600' : 'text-blue-600'}`}>
              {formatTime(timerSeconds)}
            </div>
          </div>
          
          <div className="mb-4">
            <p className="text-gray-700 mb-2">
              <strong>Prompt:</strong> {timeManagementExercises.find(ex => ex.id === selectedExercise)?.prompts[Math.floor(Math.random() * 4)]}
            </p>
            <p className="text-sm text-gray-500">
              {timeManagementExercises.find(ex => ex.id === selectedExercise)?.description}
            </p>
          </div>
          
          <textarea
            value={exerciseContent}
            onChange={(e) => setExerciseContent(e.target.value)}
            disabled={!timerRunning && showExerciseResult}
            className="w-full h-40 p-3 border rounded-md mb-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Start writing here..."
          />
          
          <div className="flex justify-between">
            <button
              onClick={() => {
                setSelectedExercise(null);
                setTimerRunning(false);
              }}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            
            {!timerRunning && !showExerciseResult ? (
              <button
                onClick={() => setTimerRunning(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Start Timer
              </button>
            ) : timerRunning ? (
              <button
                onClick={() => setTimerRunning(false)}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Stop Timer
              </button>
            ) : (
              <button
                onClick={() => setSelectedExercise(null)}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Complete
              </button>
            )}
          </div>
          
          {showExerciseResult && (
            <div className="mt-6 p-4 bg-blue-50 rounded-md">
              <h4 className="font-medium text-blue-800 mb-2">Exercise Complete!</h4>
              <p className="text-blue-700 mb-2">
                You wrote {exerciseContent.split(' ').filter(Boolean).length} words in {formatTime(timeManagementExercises.find(ex => ex.id === selectedExercise)?.timeLimit || 0)}.
              </p>
              <p className="text-blue-700">
                Word rate: {Math.round((exerciseContent.split(' ').filter(Boolean).length / (timeManagementExercises.find(ex => ex.id === selectedExercise)?.timeLimit || 1)) * 60)} words per minute.
              </p>
              <div className="mt-3 text-sm text-blue-800">
                <p className="font-medium">Tips for improvement:</p>
                <ul className="list-disc list-inside mt-1">
                  <li>Aim for 15-20 words per minute for quality writing</li>
                  <li>Practice quick outlining before writing</li>
                  <li>Focus on clear, concise sentences</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {timeManagementExercises.map(exercise => (
            <div key={exercise.id} className="bg-white rounded-lg border p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start mb-3">
                <Clock className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                <h3 className="text-lg font-medium text-gray-900">{exercise.title}</h3>
              </div>
              <p className="text-gray-700 mb-4 text-sm">{exercise.description}</p>
              <p className="text-sm text-gray-500 mb-4">Time limit: {formatTime(exercise.timeLimit)}</p>
              <button
                onClick={() => startExercise(exercise)}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
              >
                Start Exercise
              </button>
            </div>
          ))}
        </div>
      )}
      
      <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
        <h3 className="text-lg font-medium text-yellow-800 mb-2">Time Management Tips</h3>
        <ul className="list-disc list-inside text-yellow-700 space-y-1">
          <li>Allocate 5 minutes for planning before you start writing</li>
          <li>Aim to complete your main content with 5 minutes remaining for review</li>
          <li>If you're running out of time, focus on completing all sections rather than perfecting one section</li>
          <li>Practice with a timer regularly to build your sense of pacing</li>
          <li>For a 40-minute exam, aim to write 400-500 words (10-12 words per minute)</li>
        </ul>
      </div>
    </div>
  );

  // Render Question Analysis section
  const renderQuestionAnalysis = () => (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-4">Question Analysis Practice</h2>
      
      <p className="text-gray-700 mb-6">
        Understanding the exam prompt is the first critical step to success. Learn how to break down prompts to identify key requirements and plan your response effectively.
      </p>
      
      <div className="bg-white rounded-lg border p-6 mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Prompt Analysis Tool</h3>
        
        <div className="mb-4">
          <label htmlFor="promptInput" className="block text-sm font-medium text-gray-700 mb-1">
            Enter an exam prompt to analyze:
          </label>
          <textarea
            id="promptInput"
            value={promptAnalysisInput}
            onChange={(e) => setPromptAnalysisInput(e.target.value)}
            className="w-full h-24 p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., Write a narrative about a character who faces an unexpected challenge during a journey."
          />
        </div>
        
        <button
          onClick={analyzePrompt}
          disabled={!promptAnalysisInput.trim()}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Analyze Prompt
        </button>
        
        {promptAnalysisResult && (
          <div className="mt-6 border-t pt-4">
            <h4 className="font-medium text-gray-900 mb-3">Analysis Results:</h4>
            
            <div className="space-y-4">
              <div>
                <h5 className="text-sm font-medium text-blue-700 mb-1">Key Words:</h5>
                <div className="flex flex-wrap gap-2">
                  {promptAnalysisResult.keywords.map((keyword, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-sm">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h5 className="text-sm font-medium text-green-700 mb-1">Instructions:</h5>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {promptAnalysisResult.instructions.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h5 className="text-sm font-medium text-amber-700 mb-1">Constraints/Requirements:</h5>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {promptAnalysisResult.constraints.map((constraint, index) => (
                    <li key={index}>{constraint}</li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-md">
                <h5 className="text-sm font-medium text-gray-900 mb-1">Planning Suggestions:</h5>
                <p className="text-gray-700 text-sm">{promptAnalysisResult.suggestions}</p>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-3">Example Prompt Analyses</h3>
        
        <div className="space-y-4">
          {questionAnalysisExamples.map((example, index) => (
            <div key={index} className="bg-white rounded-lg border overflow-hidden">
              <div className="p-4 bg-gray-50 border-b">
                <h4 className="font-medium text-gray-900">Example {index + 1}:</h4>
                <p className="text-gray-700">{example.prompt}</p>
              </div>
              
              <div className="p-4">
                <div className="space-y-3">
                  <div>
                    <h5 className="text-sm font-medium text-blue-700 mb-1">Key Words:</h5>
                    <div className="flex flex-wrap gap-2">
                      {example.analysis.keywords.map((keyword, idx) => (
                        <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-sm">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="text-sm font-medium text-green-700 mb-1">Instructions:</h5>
                    <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                      {example.analysis.instructions.map((instruction, idx) => (
                        <li key={idx}>{instruction}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="text-sm font-medium text-amber-700 mb-1">Constraints/Requirements:</h5>
                    <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                      {example.analysis.constraints.map((constraint, idx) => (
                        <li key={idx}>{constraint}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded-md">
                    <h5 className="text-sm font-medium text-gray-900 mb-1">Planning Suggestions:</h5>
                    <p className="text-gray-700 text-sm">{example.analysis.suggestions}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
        <h3 className="text-lg font-medium text-blue-800 mb-2">Question Analysis Tips</h3>
        <ul className="list-disc list-inside text-blue-700 space-y-1">
          <li>Underline or highlight key words in the prompt</li>
          <li>Identify the text type required (narrative, persuasive, etc.)</li>
          <li>Look for specific instructions (e.g., "include both advantages and disadvantages")</li>
          <li>Note any constraints or requirements (word limit, specific elements to include)</li>
          <li>Before writing, make sure you understand exactly what the prompt is asking</li>
        </ul>
      </div>
    </div>
  );

  // Render Planning Templates section
  const renderPlanningTemplates = () => (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-4">Planning Templates</h2>
      
      <p className="text-gray-700 mb-6">
        Effective planning is essential for well-structured writing. These templates will help you quickly organize your ideas before you start writing.
      </p>
      
      <div className="space-y-6 mb-6">
        {planningTemplates.map((template, index) => (
          <div key={index} className="bg-white rounded-lg border overflow-hidden">
            <div 
              className="p-4 bg-gray-50 border-b flex justify-between items-center cursor-pointer"
              onClick={() => setExpandedTemplate(expandedTemplate === template.id ? null : template.id)}
            >
              <div>
                <h3 className="font-medium text-gray-900">{template.title}</h3>
                <p className="text-sm text-gray-500">{template.description}</p>
              </div>
              {expandedTemplate === template.id ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </div>
            
            {expandedTemplate === template.id && (
              <div className="p-4">
                <div className="space-y-6">
                  {template.template.sections.map((section, sectionIndex) => (
                    <div key={sectionIndex}>
                      <h4 className="font-medium text-blue-700 mb-2">{section.title}</h4>
                      <div className="space-y-3 pl-4">
                        {section.questions.map((question, questionIndex) => (
                          <div key={questionIndex} className="flex">
                            <div className="w-6 text-gray-400">{questionIndex + 1}.</div>
                            <div className="flex-1">
                              <p className="text-gray-700">{question}</p>
                              <div className="mt-1 h-8 border-b border-dashed border-gray-300"></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 flex justify-end">
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                    onClick={() => window.print()}
                  >
                    Print Template
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="bg-green-50 border border-green-200 rounded-md p-4">
        <h3 className="text-lg font-medium text-green-800 mb-2">Quick Planning Method (5 minutes)</h3>
        <ol className="list-decimal list-inside text-green-700 space-y-2">
          <li>
            <strong>1 minute:</strong> Analyze the prompt - identify text type, key requirements, and constraints
          </li>
          <li>
            <strong>1 minute:</strong> Brainstorm main ideas - jot down 3-5 key points or story elements
          </li>
          <li>
            <strong>1 minute:</strong> Organize structure - decide on introduction, body paragraphs, and conclusion
          </li>
          <li>
            <strong>1 minute:</strong> Develop details - add supporting points for each main idea
          </li>
          <li>
            <strong>1 minute:</strong> Review plan - ensure all prompt requirements are addressed
          </li>
        </ol>
      </div>
    </div>
  );

  // Render Common Pitfalls section
  const renderCommonPitfalls = () => (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-4">Common Pitfalls Guide</h2>
      
      <p className="text-gray-700 mb-6">
        Being aware of common mistakes can help you avoid them in your own writing. This guide highlights frequent errors in selective exams and provides strategies to overcome them.
      </p>
      
      <div className="space-y-4 mb-6">
        {commonPitfalls.map((pitfall, index) => (
          <div key={index} className="bg-white rounded-lg border overflow-hidden">
            <div 
              className="p-4 bg-gray-50 border-b flex justify-between items-center cursor-pointer"
              onClick={() => setExpandedPitfall(expandedPitfall === pitfall.id ? null : pitfall.id)}
            >
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-900">{pitfall.title}</h3>
                  <p className="text-sm text-gray-500">{pitfall.description}</p>
                </div>
              </div>
              {expandedPitfall === pitfall.id ? (
                <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
              )}
            </div>
            
            {expandedPitfall === pitfall.id && (
              <div className="p-4">
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-amber-700 mb-2">Examples:</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {pitfall.examples.map((example, exampleIndex) => (
                      <li key={exampleIndex}>{example}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-green-50 p-3 rounded-md">
                  <h4 className="text-sm font-medium text-green-700 mb-1">Solution:</h4>
                  <p className="text-gray-700">{pitfall.solution}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="bg-purple-50 border border-purple-200 rounded-md p-4">
        <h3 className="text-lg font-medium text-purple-800 mb-2">Pre-Exam Checklist</h3>
        <p className="text-purple-700 mb-2">Review this checklist before your exam to avoid common pitfalls:</p>
        <ul className="list-disc list-inside text-purple-700 space-y-1">
          <li>Practice analyzing prompts to identify all requirements</li>
          <li>Develop a time management strategy for the exam</li>
          <li>Prepare planning templates for different text types</li>
          <li>Build a bank of sophisticated vocabulary for different contexts</li>
          <li>Practice writing conclusions that effectively summarize main points</li>
          <li>Review grammar rules, especially punctuation and sentence structure</li>
          <li>Practice editing and proofreading techniques</li>
        </ul>
      </div>
    </div>
  );

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Strategic Exam Techniques</h1>
      
      <div className="mb-6 bg-indigo-50 p-4 rounded-md">
        <p className="text-indigo-700">
          Master the strategic techniques needed for success in the NSW Selective exam. These tools and exercises will help you develop essential skills for effective writing under exam conditions.
        </p>
      </div>
      
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              className={`py-4 px-6 font-medium text-sm border-b-2 ${
                activeSection === 'timeManagement'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveSection('timeManagement')}
            >
              <Clock className="inline-block h-4 w-4 mr-2" />
              Time Management
            </button>
            <button
              className={`py-4 px-6 font-medium text-sm border-b-2 ${
                activeSection === 'questionAnalysis'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveSection('questionAnalysis')}
            >
              <Search className="inline-block h-4 w-4 mr-2" />
              Question Analysis
            </button>
            <button
              className={`py-4 px-6 font-medium text-sm border-b-2 ${
                activeSection === 'planningTemplates'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveSection('planningTemplates')}
            >
              <FileText className="inline-block h-4 w-4 mr-2" />
              Planning Templates
            </button>
            <button
              className={`py-4 px-6 font-medium text-sm border-b-2 ${
                activeSection === 'commonPitfalls'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveSection('commonPitfalls')}
            >
              <AlertTriangle className="inline-block h-4 w-4 mr-2" />
              Common Pitfalls
            </button>
          </nav>
        </div>
      </div>
      
      <div className="py-4">
        {activeSection === 'timeManagement' && renderTimeManagement()}
        {activeSection === 'questionAnalysis' && renderQuestionAnalysis()}
        {activeSection === 'planningTemplates' && renderPlanningTemplates()}
        {activeSection === 'commonPitfalls' && renderCommonPitfalls()}
      </div>
    </div>
  );
}
