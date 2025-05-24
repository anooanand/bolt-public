// WritingGuides.tsx - Interactive writing guides with annotated examples
import React, { useState, useEffect } from 'react';
import { getWritingStructure } from '../lib/openai';
import { ChevronRight, Info } from 'lucide-react';

interface WritingGuidesProps {
  textType: string;
}

interface GuideSection {
  heading: string;
  content: string;
  examples?: Array<{
    text: string;
    annotations: Array<{
      start: number;
      end: number;
      note: string;
    }>;
  }>;
}

interface Guide {
  title: string;
  sections: GuideSection[];
}

export function WritingGuides({ textType }: WritingGuidesProps) {
  const [guide, setGuide] = useState<Guide | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [showExample, setShowExample] = useState(false);
  const [currentExample, setCurrentExample] = useState<GuideSection['examples'][0] | null>(null);

  useEffect(() => {
    const fetchGuide = async () => {
      if (!textType) return;
      
      setIsLoading(true);
      try {
        // Get basic structure from OpenAI
        const structureResponse = await getWritingStructure(textType);
        
        if (structureResponse) {
          // Parse the response
          const parsedGuide = JSON.parse(structureResponse);
          
          // Enhance with examples (in a real implementation, these could come from another API call)
          const enhancedSections = parsedGuide.sections.map((section: GuideSection) => {
            // Add example for the first section as a demonstration
            if (section.heading.toLowerCase() === 'structure' || section.heading.toLowerCase() === 'introduction') {
              return {
                ...section,
                examples: [
                  {
                    text: getExampleTextForSection(textType, section.heading),
                    annotations: getAnnotationsForExample(textType, section.heading)
                  }
                ]
              };
            }
            return section;
          });
          
          setGuide({
            title: parsedGuide.title,
            sections: enhancedSections
          });
          
          // Set the first section as active by default
          if (enhancedSections.length > 0) {
            setActiveSection(enhancedSections[0].heading);
          }
        }
      } catch (error) {
        console.error('Error fetching writing guide:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchGuide();
  }, [textType]);

  // Helper function to get example text based on writing type and section
  const getExampleTextForSection = (type: string, section: string): string => {
    // In a real implementation, these would be more extensive and varied
    if (type === 'narrative') {
      return "The old attic had always been forbidden territory. As I climbed the creaking stairs, my heart pounded against my ribs. What secrets was this dusty room hiding? I pushed open the door, and a shaft of golden sunlight revealed a treasure trove of forgotten memories.";
    } else if (type === 'persuasive') {
      return "School uniforms should be abolished in all primary schools. They restrict students' individuality and self-expression at a crucial developmental stage. Furthermore, they create an unnecessary financial burden on families who must purchase specific clothing that children quickly outgrow.";
    } else if (type === 'expository') {
      return "Photosynthesis is the process by which plants convert sunlight into energy. This remarkable process occurs in the chloroplasts of plant cells, primarily in the leaves. During photosynthesis, plants use chlorophyll to capture sunlight, which is then used to convert water and carbon dioxide into glucose and oxygen.";
    } else {
      return "This is an example of a well-structured piece of writing. It begins with a clear introduction that establishes the main idea. The middle paragraphs develop this idea with supporting details. Finally, it concludes by summarizing the key points and leaving the reader with a final thought.";
    }
  };

  // Helper function to get annotations for examples
  const getAnnotationsForExample = (type: string, section: string) => {
    // In a real implementation, these would be more extensive and varied
    if (type === 'narrative') {
      return [
        { start: 0, end: 46, note: "Creates mystery with a forbidden place" },
        { start: 47, end: 106, note: "Shows character's feelings through physical reaction" },
        { start: 107, end: 143, note: "Uses a question to build intrigue" },
        { start: 144, end: 255, note: "Reveals the discovery with sensory details" }
      ];
    } else if (type === 'persuasive') {
      return [
        { start: 0, end: 58, note: "Clear position statement (thesis)" },
        { start: 59, end: 139, note: "First argument with reasoning" },
        { start: 140, end: 255, note: "Second argument with practical impact" }
      ];
    } else {
      return [
        { start: 0, end: 70, note: "Clear topic introduction" },
        { start: 71, end: 150, note: "Supporting detail that expands on the main idea" },
        { start: 151, end: 255, note: "Specific explanation of the process" }
      ];
    }
  };

  const handleSectionClick = (sectionHeading: string) => {
    setActiveSection(sectionHeading);
    setShowExample(false);
  };

  const handleShowExample = (section: GuideSection) => {
    if (section.examples && section.examples.length > 0) {
      setCurrentExample(section.examples[0]);
      setShowExample(true);
    }
  };

  if (!textType) {
    return (
      <div className="text-center py-12">
        <div className="text-amber-600 mb-4">
          <Info className="h-12 w-12 mx-auto" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Please Select a Writing Type</h3>
        <p className="text-gray-600">
          Choose a writing type from the dropdown menu to see relevant guides and examples.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-gray-600">Loading writing guide...</p>
      </div>
    );
  }

  if (!guide) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No guide available. Please try again later.</p>
      </div>
    );
  }

  const activeGuideSection = guide.sections.find(section => section.heading === activeSection);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{guide.title}</h2>
      
      {showExample && currentExample ? (
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <button
              onClick={() => setShowExample(false)}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
            >
              <ChevronRight className="h-4 w-4 transform rotate-180 mr-1" />
              Back to Guide
            </button>
          </div>
          
          <div className="bg-white rounded-lg border p-6 shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Annotated Example</h3>
            
            <div className="bg-gray-50 p-4 rounded-md mb-4 relative">
              {currentExample.text.split('').map((char, index) => {
                const annotation = currentExample.annotations.find(
                  a => index >= a.start && index < a.end
                );
                return (
                  <span
                    key={index}
                    className={annotation ? 'bg-yellow-100 relative group' : ''}
                  >
                    {char}
                    {annotation && index === annotation.start && (
                      <span className="absolute top-0 -mt-1 left-1/2 transform -translate-x-1/2 bg-yellow-200 text-yellow-800 text-xs px-1 rounded hidden group-hover:block">
                        {annotation.note}
                      </span>
                    )}
                  </span>
                );
              })}
            </div>
            
            <h4 className="font-medium text-gray-900 mb-2">Annotations:</h4>
            <ul className="space-y-2">
              {currentExample.annotations.map((annotation, index) => (
                <li key={index} className="flex items-start">
                  <span className="bg-yellow-200 text-yellow-800 text-xs px-1 rounded mr-2 mt-1">
                    {index + 1}
                  </span>
                  <span className="text-sm text-gray-700">
                    {annotation.note}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="flex">
          <div className="w-1/3 pr-6 border-r">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
              Sections
            </h3>
            <div className="space-y-1">
              {guide.sections.map((section) => (
                <button
                  key={section.heading}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                    activeSection === section.heading
                      ? 'bg-blue-100 text-blue-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => handleSectionClick(section.heading)}
                >
                  {section.heading}
                </button>
              ))}
            </div>
          </div>
          
          <div className="w-2/3 pl-6">
            {activeGuideSection && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  {activeGuideSection.heading}
                </h3>
                <p className="text-gray-700 mb-4">{activeGuideSection.content}</p>
                
                {activeGuideSection.examples && activeGuideSection.examples.length > 0 && (
                  <button
                    onClick={() => handleShowExample(activeGuideSection)}
                    className="inline-flex items-center px-4 py-2 border border-blue-300 text-sm font-medium rounded-md text-blue-700 bg-blue-50 hover:bg-blue-100"
                  >
                    See annotated example
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}