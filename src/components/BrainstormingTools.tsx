// BrainstormingTools.tsx - AI-powered brainstorming and outlining tools
import React, { useState } from 'react';
import { Info, Lightbulb, List, Users, MapPin, BarChart } from 'lucide-react';

interface BrainstormingToolsProps {
  textType: string;
  onApplyToWriting: (content: string) => void;
}

type ToolType = 'ideas' | 'characters' | 'settings' | 'outline';

interface GeneratedIdea {
  category: string;
  ideas: string[];
}

interface Character {
  name: string;
  traits: string[];
  background: string;
  motivation: string;
}

interface Setting {
  location: string;
  description: string;
  sensoryDetails: {
    sights: string[];
    sounds: string[];
    smells: string[];
    textures: string[];
  };
  mood: string;
}

interface OutlineSection {
  heading: string;
  points: string[];
}

export function BrainstormingTools({ textType, onApplyToWriting }: BrainstormingToolsProps) {
  const [activeTool, setActiveTool] = useState<ToolType>('ideas');
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedIdeas, setGeneratedIdeas] = useState<GeneratedIdea[]>([]);
  const [generatedCharacters, setGeneratedCharacters] = useState<Character[]>([]);
  const [generatedSettings, setGeneratedSettings] = useState<Setting[]>([]);
  const [generatedOutline, setGeneratedOutline] = useState<OutlineSection[]>([]);

  const handleGenerateContent = () => {
    if (!prompt.trim()) {
      return;
    }

    setIsGenerating(true);

    // In a real implementation, this would call the OpenAI API
    // For now, we'll simulate a response after a delay
    setTimeout(() => {
      switch (activeTool) {
        case 'ideas':
          setGeneratedIdeas(getMockIdeas(textType, prompt));
          break;
        case 'characters':
          setGeneratedCharacters(getMockCharacters(prompt));
          break;
        case 'settings':
          setGeneratedSettings(getMockSettings(prompt));
          break;
        case 'outline':
          setGeneratedOutline(getMockOutline(textType, prompt));
          break;
      }
      setIsGenerating(false);
    }, 1500);
  };

  const getMockIdeas = (type: string, userPrompt: string): GeneratedIdea[] => {
    if (type === 'narrative') {
      return [
        {
          category: 'Plot Ideas',
          ideas: [
            'A child discovers a hidden door in their bedroom that leads to a parallel world',
            'A student accidentally swaps backpacks with someone who has a mysterious object inside',
            'A character finds an old map that leads to an unexpected discovery in their own town',
            'Someone inherits a house from a relative they never knew existed'
          ]
        },
        {
          category: 'Conflict Ideas',
          ideas: [
            'The main character must overcome their fear to save someone they care about',
            'Two friends compete for the same opportunity and their friendship is tested',
            'A character must choose between what they want and what others expect of them',
            'Someone must face the consequences of a past mistake'
          ]
        },
        {
          category: 'Theme Ideas',
          ideas: [
            'Finding courage in unexpected places',
            'The importance of honesty and trust',
            'Learning to appreciate what you have',
            'Discovering your true identity'
          ]
        }
      ];
    } else if (type === 'persuasive') {
      return [
        {
          category: 'Arguments For',
          ideas: [
            'Improves quality of life for community members',
            'Creates economic benefits and job opportunities',
            'Addresses an important social inequality',
            'Provides long-term environmental benefits'
          ]
        },
        {
          category: 'Arguments Against',
          ideas: [
            'Potential costs and budget concerns',
            'Possible unintended consequences',
            'Alternative solutions might be more effective',
            'Implementation challenges'
          ]
        },
        {
          category: 'Evidence Types',
          ideas: [
            'Statistics about similar initiatives',
            'Expert opinions from relevant fields',
            'Real-world examples of success stories',
            'Personal testimonials from affected individuals'
          ]
        }
      ];
    } else {
      return [
        {
          category: 'Main Topics',
          ideas: [
            'Historical background of the subject',
            'Current relevance and importance',
            'Key components or aspects to explore',
            'Future implications or developments'
          ]
        },
        {
          category: 'Supporting Details',
          ideas: [
            'Specific examples that illustrate main points',
            'Definitions of important terminology',
            'Comparisons to similar concepts or situations',
            'Step-by-step explanations of processes'
          ]
        }
      ];
    }
  };

  const getMockCharacters = (userPrompt: string): Character[] => {
    return [
      {
        name: 'Alex Chen',
        traits: ['Curious', 'Determined', 'Slightly anxious', 'Creative problem-solver'],
        background: 'Middle child in a busy family, often overlooked but observant. Has always been fascinated by mysteries and puzzles.',
        motivation: 'Wants to prove their capabilities to family members who underestimate them.'
      },
      {
        name: 'Morgan Taylor',
        traits: ['Confident', 'Athletic', 'Impatient', 'Loyal to friends'],
        background: 'Star athlete who secretly loves art and poetry but hides these interests to maintain their popular image.',
        motivation: 'Struggling with the pressure to maintain a perfect reputation while wanting to express their true self.'
      },
      {
        name: 'Sam Rodriguez',
        traits: ['Quiet', 'Intelligent', 'Compassionate', 'Observant'],
        background: 'Recently moved to a new town and is having trouble fitting in. Has a special talent that hasn\'t been discovered yet.',
        motivation: 'Searching for a place to belong while staying true to their values.'
      }
    ];
  };

  const getMockSettings = (userPrompt: string): Setting[] => {
    return [
      {
        location: 'Abandoned Lighthouse',
        description: 'A weathered lighthouse standing on rocky cliffs overlooking a turbulent sea. The once-white paint is now peeling, revealing layers of history beneath.',
        sensoryDetails: {
          sights: ['Spiral staircase with worn steps', 'Dust particles dancing in beams of light', 'Old photographs on the walls'],
          sounds: ['Creaking floorboards', 'Distant waves crashing', 'Wind whistling through cracks'],
          smells: ['Salt air', 'Musty old books', 'Faint traces of lamp oil'],
          textures: ['Rough stone walls', 'Smooth brass fixtures', 'Weathered wooden railings']
        },
        mood: 'Mysterious and melancholic, with hints of forgotten stories'
      },
      {
        location: 'Secret Garden',
        description: 'A hidden garden enclosed by ancient stone walls covered in ivy. Untended for years, nature has reclaimed the space in beautiful chaos.',
        sensoryDetails: {
          sights: ['Wildflowers in unexpected places', 'Overgrown pathways', 'Stone fountain with clear water'],
          sounds: ['Birds singing', 'Leaves rustling', 'Distant wind chimes'],
          smells: ['Rich soil', 'Fragrant flowers', 'Fresh rain'],
          textures: ['Soft moss', 'Rough stone benches', 'Smooth flower petals']
        },
        mood: 'Peaceful and enchanting, a place where time seems to stand still'
      }
    ];
  };

  const getMockOutline = (type: string, userPrompt: string): OutlineSection[] => {
    if (type === 'narrative') {
      return [
        {
          heading: 'Introduction',
          points: [
            'Introduce main character and setting',
            'Establish normal everyday life',
            'Hint at the upcoming change or challenge'
          ]
        },
        {
          heading: 'Rising Action',
          points: [
            'Character discovers or encounters something unusual',
            'Initial reaction to the situation',
            'Decision to investigate or respond',
            'First obstacles or complications appear'
          ]
        },
        {
          heading: 'Climax',
          points: [
            'Character faces the biggest challenge',
            'Moment of truth or difficult decision',
            'Character must use what they\'ve learned or changed'
          ]
        },
        {
          heading: 'Resolution',
          points: [
            'Aftermath of the climax',
            'How the character has changed',
            'Return to a new normal',
            'Final image or thought to leave with the reader'
          ]
        }
      ];
    } else if (type === 'persuasive') {
      return [
        {
          heading: 'Introduction',
          points: [
            'Hook to grab reader\'s attention',
            'Background information on the topic',
            'Clear thesis statement presenting your position'
          ]
        },
        {
          heading: 'First Argument',
          points: [
            'Topic sentence stating first main point',
            'Evidence and examples supporting this point',
            'Explanation of why this matters',
            'Transition to next argument'
          ]
        },
        {
          heading: 'Second Argument',
          points: [
            'Topic sentence stating second main point',
            'Evidence and examples supporting this point',
            'Explanation of why this matters',
            'Transition to next argument'
          ]
        },
        {
          heading: 'Counter-Argument',
          points: [
            'Acknowledge opposing viewpoint',
            'Respectfully explain why your position is stronger',
            'Additional evidence if needed'
          ]
        },
        {
          heading: 'Conclusion',
          points: [
            'Restate thesis in a fresh way',
            'Summarize main arguments',
            'Call to action or final thought',
            'Leave reader with something to consider'
          ]
        }
      ];
    } else {
      return [
        {
          heading: 'Introduction',
          points: [
            'Define the topic and its importance',
            'Provide brief overview of what will be covered',
            'State the main purpose of the essay'
          ]
        },
        {
          heading: 'Background',
          points: [
            'Historical context or development',
            'Key terminology and definitions',
            'Current state of knowledge on the topic'
          ]
        },
        {
          heading: 'Main Points',
          points: [
            'First major aspect or component',
            'Second major aspect or component',
            'Third major aspect or component',
            'Relationships between these aspects'
          ]
        },
        {
          heading: 'Conclusion',
          points: [
            'Summary of key information',
            'Significance or implications',
            'Future directions or unanswered questions'
          ]
        }
      ];
    }
  };

  const formatContentForWriting = (): string => {
    let content = '';
    
    switch (activeTool) {
      case 'ideas':
        content = '# Brainstorming Ideas\n\n';
        generatedIdeas.forEach(category => {
          content += `## ${category.category}\n`;
          category.ideas.forEach(idea => {
            content += `- ${idea}\n`;
          });
          content += '\n';
        });
        break;
        
      case 'characters':
        content = '# Character Profiles\n\n';
        generatedCharacters.forEach(character => {
          content += `## ${character.name}\n\n`;
          content += `**Traits:** ${character.traits.join(', ')}\n\n`;
          content += `**Background:** ${character.background}\n\n`;
          content += `**Motivation:** ${character.motivation}\n\n`;
        });
        break;
        
      case 'settings':
        content = '# Setting Descriptions\n\n';
        generatedSettings.forEach(setting => {
          content += `## ${setting.location}\n\n`;
          content += `${setting.description}\n\n`;
          content += `**Mood:** ${setting.mood}\n\n`;
          content += '### Sensory Details\n\n';
          content += `**Sights:** ${setting.sensoryDetails.sights.join(', ')}\n\n`;
          content += `**Sounds:** ${setting.sensoryDetails.sounds.join(', ')}\n\n`;
          content += `**Smells:** ${setting.sensoryDetails.smells.join(', ')}\n\n`;
          content += `**Textures:** ${setting.sensoryDetails.textures.join(', ')}\n\n`;
        });
        break;
        
      case 'outline':
        content = '# Essay Outline\n\n';
        generatedOutline.forEach(section => {
          content += `## ${section.heading}\n`;
          section.points.forEach(point => {
            content += `- ${point}\n`;
          });
          content += '\n';
        });
        break;
    }
    
    return content;
  };

  const handleApplyToWriting = () => {
    const formattedContent = formatContentForWriting();
    onApplyToWriting(formattedContent);
  };

  if (!textType) {
    return (
      <div className="text-center py-12">
        <div className="text-amber-600 mb-4">
          <Info className="h-12 w-12 mx-auto" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Please Select a Writing Type</h3>
        <p className="text-gray-600">
          Choose a writing type from the dropdown menu to use the brainstorming tools.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Brainstorming Tools
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <button
          className={`flex flex-col items-center p-4 rounded-lg border ${
            activeTool === 'ideas'
              ? 'bg-blue-50 border-blue-200'
              : 'bg-white border-gray-200 hover:bg-gray-50'
          }`}
          onClick={() => setActiveTool('ideas')}
        >
          <Lightbulb className={`h-6 w-6 mb-2 ${activeTool === 'ideas' ? 'text-blue-600' : 'text-gray-500'}`} />
          <span className={`text-sm font-medium ${activeTool === 'ideas' ? 'text-blue-700' : 'text-gray-700'}`}>
            Idea Generator
          </span>
        </button>
        
        <button
          className={`flex flex-col items-center p-4 rounded-lg border ${
            activeTool === 'characters'
              ? 'bg-blue-50 border-blue-200'
              : 'bg-white border-gray-200 hover:bg-gray-50'
          }`}
          onClick={() => setActiveTool('characters')}
        >
          <Users className={`h-6 w-6 mb-2 ${activeTool === 'characters' ? 'text-blue-600' : 'text-gray-500'}`} />
          <span className={`text-sm font-medium ${activeTool === 'characters' ? 'text-blue-700' : 'text-gray-700'}`}>
            Character Creator
          </span>
        </button>
        
        <button
          className={`flex flex-col items-center p-4 rounded-lg border ${
            activeTool === 'settings'
              ? 'bg-blue-50 border-blue-200'
              : 'bg-white border-gray-200 hover:bg-gray-50'
          }`}
          onClick={() => setActiveTool('settings')}
        >
          <MapPin className={`h-6 w-6 mb-2 ${activeTool === 'settings' ? 'text-blue-600' : 'text-gray-500'}`} />
          <span className={`text-sm font-medium ${activeTool === 'settings' ? 'text-blue-700' : 'text-gray-700'}`}>
            Setting Builder
          </span>
        </button>
        
        <button
          className={`flex flex-col items-center p-4 rounded-lg border ${
            activeTool === 'outline'
              ? 'bg-blue-50 border-blue-200'
              : 'bg-white border-gray-200 hover:bg-gray-50'
          }`}
          onClick={() => setActiveTool('outline')}
        >
          <List className={`h-6 w-6 mb-2 ${activeTool === 'outline' ? 'text-blue-600' : 'text-gray-500'}`} />
          <span className={`text-sm font-medium ${activeTool === 'outline' ? 'text-blue-700' : 'text-gray-700'}`}>
            Outline Creator
          </span>
        </button>
      </div>
      
      <div className="bg-white rounded-lg border p-6 shadow-sm">
        <div className="mb-6">
          <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-2">
            {activeTool === 'ideas' && 'What would you like ideas about?'}
            {activeTool === 'characters' && 'Describe the type of character you need:'}
            {activeTool === 'settings' && 'Describe the type of setting you need:'}
            {activeTool === 'outline' && 'What is your essay or story about?'}
          </label>
          <textarea
            id="prompt"
            rows={3}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={
              activeTool === 'ideas' 
                ? 'E.g., "A story about a lost treasure" or "Arguments about school uniforms"' 
                : activeTool === 'characters'
                ? 'E.g., "A brave but flawed protagonist" or "A mysterious antagonist with a secret"'
                : activeTool === 'settings'
                ? 'E.g., "A spooky abandoned house" or "A futuristic city"'
                : 'E.g., "The effects of social media on teenagers" or "A coming-of-age story"'
            }
          />
        </div>
        
        <div className="flex justify-center mb-6">
          <button
            onClick={handleGenerateContent}
            disabled={isGenerating || !prompt.trim()}
            className={`px-4 py-2 rounded-md text-white text-sm font-medium flex items-center ${
              isGenerating || !prompt.trim()
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isGenerating ? (
              <>
                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                Generating...
              </>
            ) : (
              <>
                <Lightbulb className="h-4 w-4 mr-2" />
                Generate {activeTool === 'ideas' ? 'Ideas' : activeTool === 'characters' ? 'Characters' : activeTool === 'settings' ? 'Settings' : 'Outline'}
              </>
            )}
          </button>
        </div>
        
        {/* Generated Content Display */}
        {activeTool === 'ideas' && generatedIdeas.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Generated Ideas</h3>
            
            <div className="space-y-4">
              {generatedIdeas.map((category, categoryIndex) => (
                <div key={categoryIndex} className="bg-gray-50 p-4 rounded-md">
                  <h4 className="font-medium text-gray-900 mb-2">{category.category}</h4>
                  <ul className="space-y-1">
                    {category.ideas.map((idea, ideaIndex) => (
                      <li key={ideaIndex} className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span className="text-gray-700">{idea}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTool === 'characters' && generatedCharacters.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Generated Characters</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {generatedCharacters.map((character, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-md">
                  <h4 className="font-medium text-gray-900 mb-2">{character.name}</h4>
                  
                  <div className="mb-2">
                    <span className="text-sm font-medium text-gray-700">Traits: </span>
                    <span className="text-sm text-gray-600">{character.traits.join(', ')}</span>
                  </div>
                  
                  <div className="mb-2">
                    <span className="text-sm font-medium text-gray-700">Background: </span>
                    <span className="text-sm text-gray-600">{character.background}</span>
                  </div>
                  
                  <div>
                    <span className="text-sm font-medium text-gray-700">Motivation: </span>
                    <span className="text-sm text-gray-600">{character.motivation}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTool === 'settings' && generatedSettings.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Generated Settings</h3>
            
            <div className="space-y-4">
              {generatedSettings.map((setting, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-md">
                  <h4 className="font-medium text-gray-900 mb-2">{setting.location}</h4>
                  <p className="text-gray-700 mb-3">{setting.description}</p>
                  
                  <div className="mb-2">
                    <span className="text-sm font-medium text-gray-700">Mood: </span>
                    <span className="text-sm text-gray-600">{setting.mood}</span>
                  </div>
                  
                  <h5 className="font-medium text-gray-800 text-sm mt-3 mb-2">Sensory Details:</h5>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Sights: </span>
                      <span className="text-gray-600">{setting.sensoryDetails.sights.join(', ')}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Sounds: </span>
                      <span className="text-gray-600">{setting.sensoryDetails.sounds.join(', ')}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Smells: </span>
                      <span className="text-gray-600">{setting.sensoryDetails.smells.join(', ')}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Textures: </span>
                      <span className="text-gray-600">{setting.sensoryDetails.textures.join(', ')}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTool === 'outline' && generatedOutline.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Generated Outline</h3>
            
            <div className="space-y-4">
              {generatedOutline.map((section, sectionIndex) => (
                <div key={sectionIndex} className="bg-gray-50 p-4 rounded-md">
                  <h4 className="font-medium text-gray-900 mb-2">{section.heading}</h4>
                  <ul className="space-y-1">
                    {section.points.map((point, pointIndex) => (
                      <li key={pointIndex} className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span className="text-gray-700">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {((activeTool === 'ideas' && generatedIdeas.length > 0) ||
          (activeTool === 'characters' && generatedCharacters.length > 0) ||
          (activeTool === 'settings' && generatedSettings.length > 0) ||
          (activeTool === 'outline' && generatedOutline.length > 0)) && (
          <div className="flex justify-center">
            <button
              onClick={handleApplyToWriting}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm font-medium"
            >
              Apply to Writing
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
