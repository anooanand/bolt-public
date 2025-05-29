import React, { useEffect } from 'react';
import { BookOpen, X } from 'lucide-react';

interface TextTypeGuideProps {
  textType: string;
}

export function TextTypeGuide({ textType }: TextTypeGuideProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  useEffect(() => {
    const handleShowTextTypeGuide = () => {
      setIsOpen(true);
    };

    window.addEventListener('show-text-type-guide', handleShowTextTypeGuide);
    
    return () => {
      window.removeEventListener('show-text-type-guide', handleShowTextTypeGuide);
    };
  }, []);

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
              description: 'Summarize what you learned and how you might apply it in the future.',
              examples: ['This performance taught me more than just how to handle stage fright. It showed me that being genuine and pushing through fear can lead to unexpected connections and personal growth. Now, when I face challenging situations, I remember that moment on stage and know that authenticity and courage are more important than perfection.'],
              tips: ['Reflect on the significance of what you learned', 'Consider how to apply these lessons', 'End with a meaningful insight']
            }
          ],
          exampleOpeners: [
            'Looking back on that summer afternoon, I never could have predicted how one small decision would change everything.',
            'Sometimes the most important lessons come from our most uncomfortable moments.',
            'It wasn\'t until weeks later that I fully understood what that experience had taught me.'
          ]
        };
      default:
        return null;
    }
  };

  return null;
}