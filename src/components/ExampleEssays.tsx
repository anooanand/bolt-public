// ExampleEssays.tsx - Sample essays with AI-powered annotations
import React, { useState, useEffect } from 'react';
import { Info, ChevronRight } from 'lucide-react';

interface ExampleEssaysProps {
  textType: string;
  userContent?: string;
}

interface Example {
  id: string;
  title: string;
  level: 'basic' | 'intermediate' | 'advanced';
  text: string;
  annotations: Array<{
    start: number;
    end: number;
    note: string;
  }>;
}

export function ExampleEssays({ textType, userContent }: ExampleEssaysProps) {
  const [examples, setExamples] = useState<Example[]>([]);
  const [selectedExample, setSelectedExample] = useState<Example | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<'basic' | 'intermediate' | 'advanced'>('intermediate');
  const [isLoading, setIsLoading] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [comparisonFeedback, setComparisonFeedback] = useState<string[]>([]);

  // Load examples based on writing type
  useEffect(() => {
    if (!textType) return;
    
    setIsLoading(true);
    
    // In a real implementation, this would fetch from an API
    // For now, we'll use mock data based on the writing type
    setTimeout(() => {
      const mockExamples = getMockExamples(textType);
      setExamples(mockExamples);
      
      // Select the first example of the selected level
      const defaultExample = mockExamples.find(ex => ex.level === selectedLevel) || mockExamples[0];
      setSelectedExample(defaultExample);
      
      setIsLoading(false);
    }, 1000);
  }, [textType, selectedLevel]);

  const getMockExamples = (type: string): Example[] => {
    // Different examples based on writing type
    if (type === 'narrative') {
      return [
        {
          id: 'narrative-basic',
          title: 'The Lost Dog',
          level: 'basic',
          text: "I lost my dog yesterday. I was very sad. I looked everywhere for him. I looked in the park. I looked in my garden. I asked my neighbors. Then I heard a bark. It was coming from the shed. I opened the door. My dog was inside! He was happy to see me. I was happy too.",
          annotations: [
            { start: 0, end: 22, note: "Simple opening that establishes the problem" },
            { start: 23, end: 38, note: "Tells emotion directly" },
            { start: 39, end: 107, note: "Lists actions in a logical sequence" },
            { start: 108, end: 123, note: "Creates a moment of discovery" },
            { start: 124, end: 190, note: "Simple resolution with emotional closure" }
          ]
        },
        {
          id: 'narrative-intermediate',
          title: 'The Unexpected Discovery',
          level: 'intermediate',
          text: "The old attic had always been forbidden territory. As I climbed the creaking stairs, my heart pounded against my ribs. What secrets was this dusty room hiding? I pushed open the door, and a shaft of golden sunlight revealed a treasure trove of forgotten memories. Old photographs, yellowed with age, spilled from a wooden chest. Each one told a story of people I'd never met but somehow recognized. Hours passed as I pieced together the puzzle of my family's past, until the setting sun reminded me that some secrets are meant to be discovered.",
          annotations: [
            { start: 0, end: 46, note: "Creates mystery with a forbidden place" },
            { start: 47, end: 106, note: "Shows character's feelings through physical reaction" },
            { start: 107, end: 143, note: "Uses a question to build intrigue" },
            { start: 144, end: 255, note: "Uses sensory details (visual imagery)" },
            { start: 256, end: 350, note: "Specific details about the discovery" },
            { start: 351, end: 462, note: "Shows time passing and character's engagement" },
            { start: 463, end: 544, note: "Thoughtful conclusion with deeper meaning" }
          ]
        },
        {
          id: 'narrative-advanced',
          title: 'The Echo of Memory',
          level: 'advanced',
          text: "The grandfather clock in the hallway chimed three times, each resonant note hanging in the air like an unanswered question. Maya froze, her fingertips hovering above the brass doorknob that gleamed in the half-light. Behind this door lay the remnants of a life carefully packed away—her grandmother's life, preserved like a butterfly under glass since her passing last autumn. The family had unanimously decided that Maya, with her 'artistic sensibilities,' should be the one to sort through the belongings. 'You'll know what to keep,' they'd said, as if memory were a commodity that could be parceled and distributed. With a deep breath that tasted of dust and faded perfume, she turned the knob and stepped into a past that was both foreign and strangely familiar.",
          annotations: [
            { start: 0, end: 107, note: "Sophisticated opening with metaphor and sensory detail" },
            { start: 108, end: 171, note: "Character introduction with specific action that creates tension" },
            { start: 172, end: 317, note: "Background information woven into the narrative" },
            { start: 318, end: 437, note: "Dialogue integration with deeper meaning" },
            { start: 438, end: 544, note: "Metaphorical language about memory" },
            { start: 545, end: 662, note: "Sensory details (smell) and contrasting concepts in conclusion" }
          ]
        }
      ];
    } else if (type === 'persuasive') {
      return [
        {
          id: 'persuasive-basic',
          title: 'Why We Need More Parks',
          level: 'basic',
          text: "We need more parks in our city. Parks are good for people. They give us places to play and exercise. Parks have trees and plants that make our air cleaner. They also look nice and make people happy. Animals need parks too. Birds and squirrels live in parks. If we build more parks, everyone will be healthier and happier.",
          annotations: [
            { start: 0, end: 32, note: "Clear position statement" },
            { start: 33, end: 56, note: "Simple supporting point" },
            { start: 57, end: 95, note: "Specific benefit explained" },
            { start: 96, end: 145, note: "Environmental benefit" },
            { start: 146, end: 181, note: "Emotional/psychological benefit" },
            { start: 182, end: 216, note: "Additional stakeholder consideration" },
            { start: 217, end: 288, note: "Simple concluding statement that restates position" }
          ]
        },
        {
          id: 'persuasive-intermediate',
          title: 'Why School Uniforms Should Be Abolished',
          level: 'intermediate',
          text: "School uniforms should be abolished in all primary schools. They restrict students' individuality and self-expression at a crucial developmental stage. Furthermore, they create an unnecessary financial burden on families who must purchase specific clothing that children quickly outgrow. While some argue that uniforms promote equality, they actually hide but do not solve economic differences. Instead of forcing uniformity, schools should focus on teaching acceptance and celebrating diversity. By allowing children to choose their own clothing within reasonable guidelines, we would foster independence, creativity, and a more authentic school community.",
          annotations: [
            { start: 0, end: 58, note: "Clear position statement with specific scope" },
            { start: 59, end: 139, note: "First argument with developmental reasoning" },
            { start: 140, end: 255, note: "Second argument with practical financial impact" },
            { start: 256, end: 343, note: "Addresses and refutes counterargument" },
            { start: 344, end: 428, note: "Alternative solution proposed" },
            { start: 429, end: 559, note: "Strong conclusion with multiple benefits" }
          ]
        },
        {
          id: 'persuasive-advanced',
          title: 'Digital Literacy: A Fundamental Right',
          level: 'advanced',
          text: "In an era where information flows ceaselessly through digital channels, digital literacy must be recognized not merely as a skill but as a fundamental right for every citizen. The digital divide—the gap between those with access to technology and the knowledge to use it effectively and those without—has evolved from an inconvenience to a critical social justice issue. When essential services, educational resources, and civic participation increasingly migrate online, those without digital literacy skills find themselves systematically excluded from full participation in society. This exclusion perpetuates existing inequalities and creates new barriers to social mobility. Critics may argue that prioritizing digital literacy diverts resources from traditional educational needs, but this perspective creates a false dichotomy. Digital literacy is not separate from core education but integral to how students access, evaluate, and apply knowledge across all disciplines. By implementing comprehensive digital literacy programs in schools, particularly in underserved communities, we can empower the next generation with the tools they need to navigate an increasingly complex information landscape, participate meaningfully in democracy, and access economic opportunities that would otherwise remain beyond reach.",
          annotations: [
            { start: 0, end: 151, note: "Sophisticated thesis framing digital literacy as a right, not just a skill" },
            { start: 152, end: 321, note: "Defines the problem with specific terminology and evolution" },
            { start: 322, end: 487, note: "Explains consequences with cause-effect reasoning" },
            { start: 488, end: 574, note: "Connects to broader social issues" },
            { start: 575, end: 713, note: "Anticipates and addresses counterargument" },
            { start: 714, end: 845, note: "Reframes the issue to resolve the apparent contradiction" },
            { start: 846, end: 1124, note: "Solution with specific implementation suggestion" },
            { start: 1125, end: 1301, note: "Conclusion with multiple far-reaching benefits" }
          ]
        }
      ];
    } else {
      // Default examples for other writing types
      return [
        {
          id: 'default-basic',
          title: 'Sample Basic Essay',
          level: 'basic',
          text: "This is a sample essay showing basic writing skills. It has a clear beginning that tells what the essay is about. The middle part gives some information about the topic. The ending reminds the reader of the main idea. This structure helps the reader understand the message.",
          annotations: [
            { start: 0, end: 54, note: "Simple introduction" },
            { start: 55, end: 113, note: "States the purpose directly" },
            { start: 114, end: 170, note: "Mentions the body content" },
            { start: 171, end: 225, note: "Describes conclusion function" },
            { start: 226, end: 283, note: "Explains the benefit of structure" }
          ]
        },
        {
          id: 'default-intermediate',
          title: 'Sample Intermediate Essay',
          level: 'intermediate',
          text: "Effective writing requires careful planning and thoughtful execution. When writers take time to organize their ideas before beginning, they create more coherent and persuasive texts. This planning phase allows them to identify their main points, arrange them in a logical sequence, and consider how best to support each with evidence or examples. Additionally, thoughtful writers consider their audience's needs and expectations, adjusting their tone and vocabulary accordingly. By following these fundamental principles, anyone can improve their writing skills and communicate more effectively.",
          annotations: [
            { start: 0, end: 63, note: "Clear topic sentence with two key concepts" },
            { start: 64, end: 169, note: "Elaborates on the first concept (planning)" },
            { start: 170, end: 312, note: "Explains specific benefits with details" },
            { start: 313, end: 421, note: "Introduces additional consideration (audience awareness)" },
            { start: 422, end: 533, note: "Strong conclusion that restates the main idea and adds value" }
          ]
        }
      ];
    }
  };

  const handleLevelChange = (level: 'basic' | 'intermediate' | 'advanced') => {
    setSelectedLevel(level);
    setShowComparison(false);
    
    // Find an example of the selected level
    const example = examples.find(ex => ex.level === level);
    if (example) {
      setSelectedExample(example);
    }
  };

  const handleCompareWithMyWriting = () => {
    if (!userContent || userContent.trim().length < 50) {
      setComparisonFeedback([
        "You need to write more in the writing area before comparing.",
        "Try writing at least a few sentences to get meaningful comparison feedback."
      ]);
    } else {
      // In a real implementation, this would use AI to compare the user's writing
      // with the selected example and provide specific feedback
      setComparisonFeedback([
        "Your opening could be more engaging like the example.",
        "The example uses more descriptive language and sensory details.",
        "Your writing has good ideas but could benefit from more varied sentence structures.",
        "Try adding more specific details to bring your writing to life."
      ]);
    }
    
    setShowComparison(true);
  };

  if (!textType) {
    return (
      <div className="text-center py-12">
        <div className="text-amber-600 mb-4">
          <Info className="h-12 w-12 mx-auto" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Please Select a Writing Type</h3>
        <p className="text-gray-600">
          Choose a writing type from the dropdown menu to see relevant examples.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-gray-600">Loading examples...</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {textType.charAt(0).toUpperCase() + textType.slice(1)} Writing Examples
      </h2>
      
      <div className="mb-6">
        <div className="text-sm font-medium text-gray-700 mb-2">Select example level:</div>
        <div className="flex space-x-2">
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              selectedLevel === 'basic'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => handleLevelChange('basic')}
          >
            Basic (Year 5)
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              selectedLevel === 'intermediate'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => handleLevelChange('intermediate')}
          >
            Intermediate (Year 6)
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              selectedLevel === 'advanced'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => handleLevelChange('advanced')}
          >
            Advanced (Year 7)
          </button>
        </div>
      </div>
      
      {showComparison ? (
        <div className="bg-white rounded-lg border p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium text-gray-900">Comparing Your Writing</h3>
            <button
              onClick={() => setShowComparison(false)}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              Back to Example
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Example:</h4>
              <div className="bg-blue-50 p-4 rounded-md text-gray-800">
                {selectedExample?.text.substring(0, 200)}...
              </div>
              <div className="mt-2 text-sm text-gray-500">
                <span className="font-medium">Strengths:</span> Clear structure, descriptive language, engaging opening
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Your Writing:</h4>
              <div className="bg-gray-50 p-4 rounded-md text-gray-800">
                {userContent ? (userContent.substring(0, 200) + (userContent.length > 200 ? '...' : '')) : 'No content yet'}
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h4 className="font-medium text-gray-900 mb-3">Feedback:</h4>
            {comparisonFeedback.length > 0 ? (
              <ul className="space-y-2">
                {comparisonFeedback.map((feedback, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>{feedback}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">Write more content to receive comparison feedback.</p>
            )}
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-md text-yellow-800">
            <h4 className="font-medium mb-2">Tips for improvement:</h4>
            <ul className="space-y-1 text-sm">
              <li>• Study how the example uses descriptive language</li>
              <li>• Notice the variety of sentence structures</li>
              <li>• Pay attention to how the example engages the reader from the start</li>
              <li>• Look for specific details that make the writing vivid</li>
            </ul>
          </div>
        </div>
      ) : selectedExample ? (
        <div className="bg-white rounded-lg border p-6 shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">{selectedExample.title}</h3>
          
          <div className="relative bg-gray-50 p-6 rounded-md mb-6">
            {selectedExample.text.split('').map((char, index) => {
              const annotation = selectedExample.annotations.find(
                a => index >= a.start && index < a.end
              );
              return (
                <span
                  key={index}
                  className={annotation ? 'bg-yellow-100 relative group' : ''}
                >
                  {char}
                  {annotation && index === annotation.start && (
                    <span className="absolute top-0 -mt-6 left-1/2 transform -translate-x-1/2 bg-yellow-200 text-yellow-800 text-xs px-1 py-0.5 rounded hidden group-hover:block whitespace-nowrap z-10">
                      {annotation.note}
                    </span>
                  )}
                </span>
              );
            })}
          </div>
          
          <div className="mb-6">
            <h4 className="font-medium text-gray-900 mb-3">Annotations:</h4>
            <div className="space-y-2">
              {selectedExample.annotations.map((annotation, index) => (
                <div key={index} className="flex items-start">
                  <span className="bg-yellow-200 text-yellow-800 text-xs px-1 py-0.5 rounded mr-2 mt-0.5 shrink-0">
                    {index + 1}
                  </span>
                  <div>
                    <p className="text-sm text-gray-700">{annotation.note}</p>
                    <p className="text-xs text-gray-500 italic mt-1">
                      "{selectedExample.text.substring(annotation.start, Math.min(annotation.end, annotation.start + 40))}
                      {annotation.end > annotation.start + 40 ? '...' : ''}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {userContent && userContent.trim().length > 0 && (
            <button
              onClick={handleCompareWithMyWriting}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium"
            >
              Compare with My Writing
              <ChevronRight className="ml-1 h-4 w-4" />
            </button>
          )}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600">No examples available for this writing type and level.</p>
        </div>
      )}
    </div>
  );
}
