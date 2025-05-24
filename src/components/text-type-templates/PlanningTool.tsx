import React, { useState } from 'react';
import { PencilLine, Lightbulb, Clock, CheckSquare } from 'lucide-react';

interface PlanningToolProps {
  textType: string;
  onSavePlan: (plan: PlanningData) => void;
}

interface PlanningData {
  mainIdeas: string[];
  structure: {
    section: string;
    content: string;
  }[];
  keyPoints: string[];
  vocabulary: string[];
}

export function PlanningTool({ textType, onSavePlan }: PlanningToolProps) {
  const [activeTab, setActiveTab] = useState<'mindmap' | 'outline' | 'checklist'>('outline');
  const [mainIdeas, setMainIdeas] = useState<string[]>(['']);
  const [structure, setStructure] = useState<{section: string; content: string}[]>([]);
  const [keyPoints, setKeyPoints] = useState<string[]>(['']);
  const [vocabulary, setVocabulary] = useState<string[]>(['']);
  const [showTimer, setShowTimer] = useState(false);
  const [planningMinutes, setPlanningMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  // Initialize structure based on text type
  React.useEffect(() => {
    let initialStructure: {section: string; content: string}[] = [];
    
    switch(textType.toLowerCase()) {
      case 'narrative':
        initialStructure = [
          { section: 'Orientation', content: '' },
          { section: 'Complication', content: '' },
          { section: 'Rising Action', content: '' },
          { section: 'Climax', content: '' },
          { section: 'Resolution', content: '' }
        ];
        break;
      case 'persuasive':
        initialStructure = [
          { section: 'Introduction', content: '' },
          { section: 'First Argument', content: '' },
          { section: 'Second Argument', content: '' },
          { section: 'Third Argument', content: '' },
          { section: 'Address Counterarguments', content: '' },
          { section: 'Conclusion', content: '' }
        ];
        break;
      case 'expository':
      case 'informative':
        initialStructure = [
          { section: 'Introduction', content: '' },
          { section: 'Background Information', content: '' },
          { section: 'Main Point 1', content: '' },
          { section: 'Main Point 2', content: '' },
          { section: 'Main Point 3', content: '' },
          { section: 'Conclusion', content: '' }
        ];
        break;
      case 'descriptive':
        initialStructure = [
          { section: 'Introduction', content: '' },
          { section: 'General Overview', content: '' },
          { section: 'Sensory Details - Visual', content: '' },
          { section: 'Sensory Details - Other Senses', content: '' },
          { section: 'Emotional Connection', content: '' },
          { section: 'Conclusion', content: '' }
        ];
        break;
      case 'reflective':
        initialStructure = [
          { section: 'Introduction', content: '' },
          { section: 'Description', content: '' },
          { section: 'Feelings and Thoughts', content: '' },
          { section: 'Evaluation', content: '' },
          { section: 'Analysis', content: '' },
          { section: 'Conclusion', content: '' }
        ];
        break;
      case 'recount':
        initialStructure = [
          { section: 'Orientation', content: '' },
          { section: 'Series of Events', content: '' },
          { section: 'More Events', content: '' },
          { section: 'Final Events', content: '' },
          { section: 'Conclusion', content: '' }
        ];
        break;
      case 'discursive':
        initialStructure = [
          { section: 'Introduction', content: '' },
          { section: 'First Viewpoint', content: '' },
          { section: 'Second Viewpoint', content: '' },
          { section: 'Additional Perspectives', content: '' },
          { section: 'Analysis and Evaluation', content: '' },
          { section: 'Conclusion', content: '' }
        ];
        break;
      case 'news report':
        initialStructure = [
          { section: 'Headline', content: '' },
          { section: 'Lead Paragraph', content: '' },
          { section: 'Explanation Paragraph', content: '' },
          { section: 'Quote Paragraph', content: '' },
          { section: 'Additional Details', content: '' },
          { section: 'Concluding Paragraph', content: '' }
        ];
        break;
      case 'letter':
        initialStructure = [
          { section: 'Sender\'s Address', content: '' },
          { section: 'Date', content: '' },
          { section: 'Recipient\'s Address', content: '' },
          { section: 'Greeting', content: '' },
          { section: 'Introduction', content: '' },
          { section: 'Body Paragraphs', content: '' },
          { section: 'Conclusion', content: '' },
          { section: 'Closing', content: '' },
          { section: 'Signature', content: '' }
        ];
        break;
      case 'diary entry':
        initialStructure = [
          { section: 'Date and Greeting', content: '' },
          { section: 'Opening', content: '' },
          { section: 'Main Events', content: '' },
          { section: 'Thoughts and Feelings', content: '' },
          { section: 'Reflections', content: '' },
          { section: 'Conclusion', content: '' }
        ];
        break;
      default:
        initialStructure = [
          { section: 'Introduction', content: '' },
          { section: 'Main Body', content: '' },
          { section: 'Conclusion', content: '' }
        ];
    }
    
    setStructure(initialStructure);
  }, [textType]);

  // Timer functionality
  React.useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (timerActive) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (planningMinutes > 0) {
          setPlanningMinutes(planningMinutes - 1);
          setSeconds(59);
        } else {
          setTimerActive(false);
          alert("Planning time is up! Time to start writing.");
        }
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerActive, planningMinutes, seconds]);

  const handleMainIdeaChange = (index: number, value: string) => {
    const newMainIdeas = [...mainIdeas];
    newMainIdeas[index] = value;
    setMainIdeas(newMainIdeas);
    
    // Add a new empty field if the last field has content
    if (index === mainIdeas.length - 1 && value.trim() !== '') {
      setMainIdeas([...newMainIdeas, '']);
    }
  };

  const handleStructureChange = (index: number, value: string) => {
    const newStructure = [...structure];
    newStructure[index].content = value;
    setStructure(newStructure);
  };

  const handleKeyPointChange = (index: number, value: string) => {
    const newKeyPoints = [...keyPoints];
    newKeyPoints[index] = value;
    setKeyPoints(newKeyPoints);
    
    // Add a new empty field if the last field has content
    if (index === keyPoints.length - 1 && value.trim() !== '') {
      setKeyPoints([...newKeyPoints, '']);
    }
  };

  const handleVocabularyChange = (index: number, value: string) => {
    const newVocabulary = [...vocabulary];
    newVocabulary[index] = value;
    setVocabulary(newVocabulary);
    
    // Add a new empty field if the last field has content
    if (index === vocabulary.length - 1 && value.trim() !== '') {
      setVocabulary([...newVocabulary, '']);
    }
  };

  const handleSavePlan = () => {
    // Filter out empty entries
    const filteredMainIdeas = mainIdeas.filter(idea => idea.trim() !== '');
    const filteredKeyPoints = keyPoints.filter(point => point.trim() !== '');
    const filteredVocabulary = vocabulary.filter(word => word.trim() !== '');
    
    const planningData: PlanningData = {
      mainIdeas: filteredMainIdeas,
      structure: structure,
      keyPoints: filteredKeyPoints,
      vocabulary: filteredVocabulary
    };
    
    onSavePlan(planningData);
  };

  const startTimer = () => {
    setTimerActive(true);
  };

  const pauseTimer = () => {
    setTimerActive(false);
  };

  const resetTimer = () => {
    setTimerActive(false);
    setPlanningMinutes(5);
    setSeconds(0);
  };

  const getTextTypeSpecificPrompts = () => {
    switch(textType.toLowerCase()) {
      case 'narrative':
        return {
          mainIdeasPrompt: 'What are the main events or plot points in your story?',
          keyPointsPrompt: 'What characters, settings, or themes will you include?',
          vocabularyPrompt: 'List powerful verbs, descriptive adjectives, or sensory language you might use:'
        };
      case 'persuasive':
        return {
          mainIdeasPrompt: 'What are your main arguments or points of persuasion?',
          keyPointsPrompt: 'What evidence or examples will support your arguments?',
          vocabularyPrompt: 'List persuasive language, transition words, or strong verbs you might use:'
        };
      case 'expository':
      case 'informative':
        return {
          mainIdeasPrompt: 'What are the main facts or concepts you will explain?',
          keyPointsPrompt: 'What examples, definitions, or data will you include?',
          vocabularyPrompt: 'List technical terms, transition words, or precise language you might use:'
        };
      case 'descriptive':
        return {
          mainIdeasPrompt: 'What are the main aspects of your subject you will describe?',
          keyPointsPrompt: 'What sensory details (sight, sound, smell, taste, touch) will you include?',
          vocabularyPrompt: 'List vivid adjectives, specific nouns, or sensory language you might use:'
        };
      case 'reflective':
        return {
          mainIdeasPrompt: 'What experience or event will you reflect on?',
          keyPointsPrompt: 'What thoughts, feelings, or lessons learned will you explore?',
          vocabularyPrompt: 'List emotive language, reflective phrases, or personal expressions you might use:'
        };
      default:
        return {
          mainIdeasPrompt: 'What are the main ideas or points you want to include?',
          keyPointsPrompt: 'What key details, examples, or evidence will you include?',
          vocabularyPrompt: 'List useful vocabulary, phrases, or expressions you might use:'
        };
    }
  };

  const prompts = getTextTypeSpecificPrompts();

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-900">Planning Tool</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setShowTimer(!showTimer)}
            className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Clock className="h-4 w-4 mr-1" />
            {showTimer ? 'Hide Timer' : 'Show Timer'}
          </button>
          <button
            onClick={handleSavePlan}
            className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save Plan
          </button>
        </div>
      </div>

      {showTimer && (
        <div className="mb-4 p-3 bg-blue-50 rounded-md">
          <div className="flex items-center justify-between">
            <div className="text-blue-800 font-medium">Planning Timer: {String(planningMinutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</div>
            <div className="flex space-x-2">
              {!timerActive ? (
                <button
                  onClick={startTimer}
                  className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Start
                </button>
              ) : (
                <button
                  onClick={pauseTimer}
                  className="px-2 py-1 text-xs bg-yellow-600 text-white rounded hover:bg-yellow-700"
                >
                  Pause
                </button>
              )}
              <button
                onClick={resetTimer}
                className="px-2 py-1 text-xs bg-gray-600 text-white rounded hover:bg-gray-700"
              >
                Reset
              </button>
            </div>
          </div>
          <div className="mt-2 text-xs text-blue-600">
            Recommendation: Spend 5 minutes planning before you start writing
          </div>
        </div>
      )}

      <div className="mb-4">
        <div className="flex border-b border-gray-200">
          <button
            className={`py-2 px-4 font-medium text-sm ${
              activeTab === 'outline' 
                ? 'bg-indigo-50 border-b-2 border-indigo-500 text-indigo-600' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setActiveTab('outline')}
          >
            <PencilLine className="h-4 w-4 inline mr-1" />
            Outline
          </button>
          <button
            className={`py-2 px-4 font-medium text-sm ${
              activeTab === 'mindmap' 
                ? 'bg-indigo-50 border-b-2 border-indigo-500 text-indigo-600' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setActiveTab('mindmap')}
          >
            <Lightbulb className="h-4 w-4 inline mr-1" />
            Ideas
          </button>
          <button
            className={`py-2 px-4 font-medium text-sm ${
              activeTab === 'checklist' 
                ? 'bg-indigo-50 border-b-2 border-indigo-500 text-indigo-600' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setActiveTab('checklist')}
          >
            <CheckSquare className="h-4 w-4 inline mr-1" />
            Checklist
          </button>
        </div>
      </div>

      <div className="overflow-y-auto max-h-96 p-1">
        {activeTab === 'outline' && (
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Fill in the outline for your {textType.toLowerCase()} writing:
            </p>
            {structure.map((item, index) => (
              <div key={index} className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  {item.section}
                </label>
                <textarea
                  value={item.content}
                  onChange={(e) => handleStructureChange(index, e.target.value)}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  rows={2}
                  placeholder={`What will you include in your ${item.section.toLowerCase()}?`}
                />
              </div>
            ))}
          </div>
        )}

        {activeTab === 'mindmap' && (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                {prompts.mainIdeasPrompt}
              </label>
              {mainIdeas.map((idea, index) => (
                <input
                  key={index}
                  type="text"
                  value={idea}
                  onChange={(e) => handleMainIdeaChange(index, e.target.value)}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder={`Idea ${index + 1}`}
                />
              ))}
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                {prompts.keyPointsPrompt}
              </label>
              {keyPoints.map((point, index) => (
                <input
                  key={index}
                  type="text"
                  value={point}
                  onChange={(e) => handleKeyPointChange(index, e.target.value)}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder={`Detail ${index + 1}`}
                />
              ))}
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                {prompts.vocabularyPrompt}
              </label>
              {vocabulary.map((word, index) => (
                <input
                  key={index}
                  type="text"
                  value={word}
                  onChange={(e) => handleVocabularyChange(index, e.target.value)}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder={`Word/Phrase ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'checklist' && (
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Use this checklist to ensure your {textType.toLowerCase()} writing meets all requirements:
            </p>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-900">Content</h3>
              <div className="ml-2 space-y-2">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded mt-0.5"
                  />
                  <label className="ml-2 text-sm text-gray-700">
                    My writing addresses the prompt/topic directly
                  </label>
                </div>
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded mt-0.5"
                  />
                  <label className="ml-2 text-sm text-gray-700">
                    I have included all required elements for this text type
                  </label>
                </div>
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded mt-0.5"
                  />
                  <label className="ml-2 text-sm text-gray-700">
                    My ideas are creative and original
                  </label>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-900">Structure</h3>
              <div className="ml-2 space-y-2">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded mt-0.5"
                  />
                  <label className="ml-2 text-sm text-gray-700">
                    My writing has a clear beginning, middle, and end
                  </label>
                </div>
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded mt-0.5"
                  />
                  <label className="ml-2 text-sm text-gray-700">
                    I've organized my ideas in a logical sequence
                  </label>
                </div>
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded mt-0.5"
                  />
                  <label className="ml-2 text-sm text-gray-700">
                    I've used paragraphs to separate different ideas
                  </label>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-900">Language</h3>
              <div className="ml-2 space-y-2">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded mt-0.5"
                  />
                  <label className="ml-2 text-sm text-gray-700">
                    I've used interesting and varied vocabulary
                  </label>
                </div>
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded mt-0.5"
                  />
                  <label className="ml-2 text-sm text-gray-700">
                    My sentences vary in length and structure
                  </label>
                </div>
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded mt-0.5"
                  />
                  <label className="ml-2 text-sm text-gray-700">
                    I've checked for spelling and punctuation errors
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
