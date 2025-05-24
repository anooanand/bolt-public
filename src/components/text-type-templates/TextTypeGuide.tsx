import React from 'react';
import { BookOpen, X } from 'lucide-react';

interface TextTypeGuideProps {
  textType: string;
}

export function TextTypeGuide({ textType }: TextTypeGuideProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const getTextTypeGuide = () => {
    switch (textType.toLowerCase()) {
      case 'narrative':
        return {
          title: 'Narrative Writing Guide',
          description: 'A narrative tells a story. It has characters, setting, plot, conflict, and resolution.',
          keyFeatures: [
            'Clear beginning, middle, and end structure',
            'Well-developed characters with distinct personalities',
            'Vivid setting descriptions using sensory details',
            'Engaging plot with conflict and resolution',
            'Dialogue that reveals character and advances the plot',
            'Descriptive language and varied sentence structures',
            'Show, don\'t tell - use actions and reactions to convey emotions'
          ],
          structure: [
            {
              name: 'Orientation',
              description: 'Introduce characters, setting, and establish the situation',
              examples: ['In the shadowy corners of Blackwood Manor, twelve-year-old Emma clutched her flashlight as the storm raged outside.'],
              tips: ['Use sensory details to establish mood', 'Introduce the main character early', 'Hint at the coming conflict']
            },
            {
              name: 'Complication',
              description: 'Introduce a problem or conflict that the characters must face',
              examples: ['A sudden crash from the attic sent shivers down Emma\'s spine. Nobody was supposed to be upstairs.'],
              tips: ['Create tension through unexpected events', 'Show the character\'s reaction', 'Use short sentences for impact']
            },
            {
              name: 'Rising Action',
              description: 'Series of events that build tension and develop the conflict',
              examples: ['With each creaking step up the stairs, Emma\'s heart pounded harder. The strange noises grew louder, and the temperature seemed to drop with every floor she climbed.'],
              tips: ['Include obstacles and challenges', 'Build tension gradually', 'Use pacing to control suspense']
            },
            {
              name: 'Climax',
              description: 'The turning point where the main character faces the conflict directly',
              examples: ['Emma flung open the attic door, her flashlight beam cutting through the darkness to reveal...'],
              tips: ['This is the most intense moment', 'Show the character\'s courage or growth', 'Use vivid language and strong verbs']
            },
            {
              name: 'Resolution',
              description: 'How the conflict is resolved and what happens to the characters',
              examples: ['As dawn broke, Emma smiled at her discovery. What had seemed terrifying in the night was actually a treasure that would change everything.'],
              tips: ['Show how the character has changed', 'Tie up loose ends', 'Leave the reader with a satisfying conclusion']
            }
          ],
          exampleOpeners: [
            'The ancient door creaked open, revealing a room untouched for decades.',
            'Maya\'s heart raced as she spotted the mysterious package on her doorstep.',
            '"We shouldn\'t be here," whispered Sam, but curiosity pulled them deeper into the cave.'
          ]
        };
      case 'persuasive':
        return {
          title: 'Persuasive Writing Guide',
          description: 'Persuasive writing aims to convince the reader to accept a particular point of view or take a specific action.',
          keyFeatures: [
            'Clear position statement or thesis',
            'Strong, logical arguments supported by evidence',
            'Persuasive language and rhetorical devices',
            'Addressing counterarguments',
            'Formal tone and language',
            'Strong concluding statement that reinforces the position'
          ],
          structure: [
            {
              name: 'Introduction',
              description: 'Introduce the topic and clearly state your position',
              examples: ['School uniforms should be mandatory in all public schools because they create equality, improve focus on learning, and prepare students for professional environments.'],
              tips: ['Start with an attention-grabbing hook', 'Clearly state your position', 'Briefly outline your main arguments']
            },
            {
              name: 'First Argument',
              description: 'Present your strongest argument with supporting evidence',
              examples: ['Firstly, school uniforms create a sense of equality among students. When everyone wears the same clothing, socioeconomic differences become less visible, reducing peer pressure and bullying related to fashion choices.'],
              tips: ['Start with a clear topic sentence', 'Provide specific evidence or examples', 'Explain why this argument supports your position']
            },
            {
              name: 'Second Argument',
              description: 'Present your second argument with supporting evidence',
              examples: ['Furthermore, uniforms help students focus on their education rather than their appearance. Studies show that schools with uniform policies report higher attendance rates and fewer distractions in the classroom.'],
              tips: ['Use transition words (furthermore, in addition)', 'Include statistics or expert opinions if possible', 'Connect back to your main position']
            },
            {
              name: 'Third Argument',
              description: 'Present your third argument with supporting evidence',
              examples: ['Finally, wearing uniforms prepares students for professional environments where dress codes are common. Learning to present oneself appropriately is an important life skill that extends beyond the classroom.'],
              tips: ['Vary your sentence structure', 'Consider real-world applications', 'Use persuasive language']
            },
            {
              name: 'Address Counterarguments',
              description: 'Acknowledge opposing viewpoints and explain why your position is still valid',
              examples: ['Some argue that uniforms limit self-expression, however, students can still express their individuality through their achievements, ideas, and personalities rather than through clothing choices.'],
              tips: ['Be respectful of opposing views', 'Show why your argument is stronger', 'Use concession words (while, although, however)']
            },
            {
              name: 'Conclusion',
              description: 'Summarize your arguments and reinforce your position',
              examples: ['In conclusion, school uniforms should be mandatory because they promote equality, improve focus on education, and prepare students for future professional environments. The benefits clearly outweigh the limitations on personal fashion choices.'],
              tips: ['Restate your position', 'Summarize your main points', 'End with a strong, memorable statement']
            }
          ],
          exampleOpeners: [
            'Have you ever considered how much time is wasted each morning deciding what to wear to school?',
            'In a world where children face increasing pressure to fit in, school uniforms offer a simple solution.',
            'Imagine a classroom where students are judged by their ideas, not their clothing brands.'
          ]
        };
      case 'expository':
      case 'informative':
        return {
          title: 'Expository/Informative Writing Guide',
          description: 'Expository writing explains, informs, or describes a topic clearly and accurately.',
          keyFeatures: [
            'Clear explanation of the topic',
            'Factual information and details',
            'Logical organization of ideas',
            'Objective tone (usually)',
            'Use of examples, facts, and definitions',
            'Clear transitions between ideas'
          ],
          structure: [
            {
              name: 'Introduction',
              description: 'Introduce the topic and provide a brief overview',
              examples: ['Coral reefs are among the most diverse ecosystems on Earth, supporting approximately 25% of all marine species while covering less than 1% of the ocean floor.'],
              tips: ['Start with an interesting fact or statistic', 'Define the topic clearly', 'Include a thesis statement that outlines what you will explain']
            },
            {
              name: 'Background Information',
              description: 'Provide context and essential information about the topic',
              examples: ['Coral reefs are formed by colonies of tiny animals called coral polyps that secrete calcium carbonate to build protective skeletons. Over time, these skeletons create the massive structures we recognize as coral reefs.'],
              tips: ['Define key terms', 'Provide historical context if relevant', 'Use clear, concise language']
            },
            {
              name: 'Main Point 1',
              description: 'Explain the first main aspect of your topic',
              examples: ['Coral reefs serve as crucial habitats for thousands of marine species. Fish, crustaceans, and other sea creatures find food, shelter, and breeding grounds within the complex structures of the reef.'],
              tips: ['Start with a clear topic sentence', 'Include specific details and examples', 'Use facts and statistics to support your explanation']
            },
            {
              name: 'Main Point 2',
              description: 'Explain the second main aspect of your topic',
              examples: ['Beyond their ecological importance, coral reefs provide significant benefits to humans. They protect coastlines from storms and erosion, support fishing industries worth billions of dollars, and contain compounds used in medicines.'],
              tips: ['Use transition words to connect to previous points', 'Organize information logically', 'Consider different perspectives or applications']
            },
            {
              name: 'Main Point 3',
              description: 'Explain the third main aspect of your topic',
              examples: ['Unfortunately, coral reefs face numerous threats including climate change, ocean acidification, pollution, and destructive fishing practices. Rising ocean temperatures cause coral bleaching, where corals expel the algae living in their tissues and turn white.'],
              tips: ['Present information objectively', 'Include cause and effect relationships', 'Use expert opinions or research findings']
            },
            {
              name: 'Conclusion',
              description: 'Summarize the main points and reinforce the importance of the topic',
              examples: ['In conclusion, coral reefs are vital ecosystems that support marine biodiversity, provide benefits to humans, and face significant environmental challenges. Understanding and protecting these underwater treasures is essential for maintaining the health of our oceans.'],
              tips: ['Summarize key points without introducing new information', 'Emphasize the significance of the topic', 'Consider including a call to action or future implications']
            }
          ],
          exampleOpeners: [
            'Did you know that a single coral reef can contain more species than an entire country\'s forests?',
            'Coral reefs, often called the "rainforests of the sea," are among Earth\'s most complex and valuable ecosystems.',
            'For thousands of years, coral reefs have been building some of the most diverse habitats on our planet.'
          ]
        };
      case 'reflective':
        return {
          title: 'Reflective Writing Guide',
          description: 'Reflective writing explores personal experiences, thoughts, and feelings, and considers what was learned or how you\'ve changed.',
          keyFeatures: [
            'Personal perspective (often first-person)',
            'Description of an experience or event',
            'Analysis of thoughts and feelings',
            'Exploration of lessons learned',
            'Honest self-assessment',
            'Consideration of future applications'
          ],
          structure: [
            {
              name: 'Introduction',
              description: 'Introduce the experience or event you\'re reflecting on',
              examples: ['The day I performed in the school talent show was the day I discovered something important about myself. Standing backstage, watching my classmates perform, I never imagined how those three minutes on stage would change me.'],
              tips: ['Briefly describe the experience', 'Hint at its significance', 'Create interest in what you learned']
            },
            {
              name: 'Description',
              description: 'Describe what happened in detail',
              examples: ['My hands trembled as I picked up my guitar and walked onto the stage. The bright lights blinded me momentarily, and the faces in the audience blurred together. As I began to play the first chords of the song I had practiced for weeks, my voice cracked, and for a terrifying moment, I thought I would freeze.'],
              tips: ['Include sensory details', 'Describe your actions and reactions', 'Set the scene clearly']
            },
            {
              name: 'Feelings and Thoughts',
              description: 'Explore what you were thinking and feeling during the experience',
              examples: ['In that moment, panic washed over me. I felt exposed and vulnerable, certain that everyone could see my fear. Thoughts raced through my mind: "They\'ll laugh at me. I should have never signed up for this. I want to disappear."'],
              tips: ['Be honest about your emotions', 'Explore both positive and negative feelings', 'Consider why you felt that way']
            },
            {
              name: 'Evaluation',
              description: 'Analyze what was good and bad about the experience',
              examples: ['Looking back, I realize that while my performance wasn\'t technically perfect, something remarkable happened when I pushed through my fear. The audience wasn\'t judging me as harshly as I was judging myself. In fact, when I finally relaxed and connected with the music, people began to nod and smile.'],
              tips: ['Consider different perspectives', 'Identify what went well and what didn\'t', 'Avoid being overly critical or overly positive']
            },
            {
              name: 'Analysis',
              description: 'Make sense of the situation and what you learned',
              examples: ['This experience taught me that perfection isn\'t what connects us to others—authenticity is. When I stopped trying to be perfect and simply expressed myself honestly through the music, I created a genuine connection with the audience. I also learned that most fears look smaller once you face them.'],
              tips: ['Connect to broader themes or lessons', 'Consider what surprised you', 'Identify any changes in your perspective']
            },
            {
              name: 'Conclusion',
              description: 'Summarize what you learned and how you might apply it in the future',
              examples: ['That talent show performance changed how I approach challenges. Now, when I face something that scares me, I remind myself that the worst rarely happens, and that growth happens outside my comfort zone. I\'ve applied this lesson when giving class presentations, trying out for sports teams, and meeting new people.'],
              tips: ['Summarize key insights', 'Explain how you\'ve applied or will apply what you learned', 'End with a thoughtful reflection']
            }
          ],
          exampleOpeners: [
            'The moment I realized I had made a serious mistake was also the moment I began to truly understand responsibility.',
            'Looking back on my first day of middle school, I can now see how that experience shaped my approach to new situations.',
            'Sometimes the smallest decisions can lead to unexpected lessons, as I discovered when I volunteered at the animal shelter last summer.'
          ]
        };
      case 'descriptive':
        return {
          title: 'Descriptive Writing Guide',
          description: 'Descriptive writing creates a vivid picture of a person, place, object, or experience using sensory details.',
          keyFeatures: [
            'Rich sensory details (sight, sound, smell, taste, touch)',
            'Figurative language (similes, metaphors, personification)',
            'Precise word choice and vivid vocabulary',
            'Organized spatial or chronological structure',
            'Mood or atmosphere creation',
            'Focus on specific details rather than general statements'
          ],
          structure: [
            {
              name: 'Introduction',
              description: 'Introduce the subject and create initial impression',
              examples: ['The abandoned lighthouse stood sentinel on the jagged cliff edge, its weathered stone exterior bearing the scars of a century\'s worth of storms.'],
              tips: ['Create a strong first impression', 'Establish the dominant mood or tone', 'Hint at why this subject is significant']
            },
            {
              name: 'Main Body - Visual Details',
              description: 'Describe what the subject looks like in vivid detail',
              examples: ['Paint peeled from its once-pristine white surface like old skin, revealing patches of gray stone underneath. The afternoon sun cast long shadows across its cylindrical form, accentuating every crack and crevice that time had etched into its facade.'],
              tips: ['Use specific colors, shapes, sizes, and textures', 'Move from general to specific details', 'Use comparisons to familiar objects']
            },
            {
              name: 'Main Body - Other Senses',
              description: 'Include details related to sounds, smells, textures, and possibly tastes',
              examples: ['The salty breeze carried the rhythmic percussion of waves crashing against the rocks below. Seagulls wheeled overhead, their mournful cries punctuating the constant whisper of wind through the coastal grasses. The air tasted of salt and seaweed, with undertones of wild thyme that grew in sheltered pockets along the path.'],
              tips: ['Appeal to multiple senses', 'Use specific rather than general terms', 'Consider unexpected sensory aspects']
            },
            {
              name: 'Spatial Organization',
              description: 'Organize details in a logical spatial pattern',
              examples: ['Inside, a narrow spiral staircase twisted upward like the inside of a nautilus shell. Each iron step was worn in the center, testament to the countless keepers who had made this same journey. At the top, the lantern room awaited—a perfect glass-enclosed circle housing the massive Fresnel lens that had once guided ships safely to harbor.'],
              tips: ['Move from top to bottom, left to right, inside to outside, etc.', 'Use transition words to indicate spatial relationships', 'Create a mental map for the reader']
            },
            {
              name: 'Mood and Atmosphere',
              description: 'Develop the emotional quality of the description',
              examples: ['As the sun began its descent toward the horizon, the lighthouse cast an impossibly long shadow across the water, a dark finger pointing eastward. There was a dignity and presence to the structure that transcended its practical purpose, standing as a monument to humanity\'s age-old relationship with the sea.'],
              tips: ['Use word choice to evoke specific emotions', 'Consider the overall impression you want to create', 'Use figurative language to enhance mood']
            },
            {
              name: 'Conclusion',
              description: 'Provide final impressions and significance',
              examples: ['Though no longer serving its original purpose, the lighthouse remained steadfast, a silent witness to the ever-changing sea and sky, its presence a comforting constant in a world of perpetual motion.'],
              tips: ['Connect to broader themes or significance', 'Leave the reader with a strong final image', 'Consider how the subject affects you or others']
            }
          ],
          exampleOpeners: [
            'The ancient oak dominated the park, its gnarled branches reaching toward the sky like arthritic fingers.',
            'Grandmother\'s kitchen was a realm of contradictions—chaotic yet orderly, small yet infinite in its possibilities.',
            'The abandoned fairground held an eerie beauty in the early morning mist, a ghost of joy suspended in time.'
          ]
        };
      default:
        return {
          title: 'Select a Writing Type',
          description: 'Please select a writing type to see specific guidance.',
          keyFeatures: [],
          structure: [],
          exampleOpeners: []
        };
    }
  };

  const guide = getTextTypeGuide();

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <BookOpen className="w-4 h-4 mr-2" />
        Text Type Guide
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="sr-only">Close</span>
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      {guide.title}
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">{guide.description}</p>
                    </div>
                  </div>
                </div>

                {guide.keyFeatures.length > 0 && (
                  <div className="mt-6">
                    <h4 className="text-md font-medium text-gray-900">Key Features</h4>
                    <ul className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                      {guide.keyFeatures.map((feature, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start">
                          <span className="text-indigo-500 mr-2">•</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {guide.structure.length > 0 && (
                  <div className="mt-6">
                    <h4 className="text-md font-medium text-gray-900">Structure</h4>
                    <div className="mt-2 space-y-6">
                      {guide.structure.map((section, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-md">
                          <h5 className="text-sm font-medium text-gray-900">{section.name}</h5>
                          <p className="mt-1 text-sm text-gray-600">{section.description}</p>
                          
                          {section.examples && section.examples.length > 0 && (
                            <div className="mt-2">
                              <h6 className="text-xs font-medium text-gray-700">Example:</h6>
                              <div className="mt-1 text-sm text-gray-800 italic bg-white p-2 rounded border border-gray-200">
                                {section.examples[0]}
                              </div>
                            </div>
                          )}
                          
                          {section.tips && section.tips.length > 0 && (
                            <div className="mt-2">
                              <h6 className="text-xs font-medium text-gray-700">Tips:</h6>
                              <ul className="mt-1 text-xs text-gray-600">
                                {section.tips.map((tip, tipIndex) => (
                                  <li key={tipIndex} className="flex items-start">
                                    <span className="text-green-500 mr-1">✓</span>
                                    {tip}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {guide.exampleOpeners.length > 0 && (
                  <div className="mt-6">
                    <h4 className="text-md font-medium text-gray-900">Example Opening Lines</h4>
                    <div className="mt-2 bg-indigo-50 p-4 rounded-md">
                      <ul className="space-y-2">
                        {guide.exampleOpeners.map((opener, index) => (
                          <li key={index} className="text-sm text-indigo-700 italic">"{opener}"</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setIsOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
