import React from 'react';
import { BookOpen, Award, ThumbsUp, AlertTriangle, Star, Sparkles, Gift } from 'lucide-react';

interface ModelResponsesLibraryProps {
  textType: string;
}

export function ModelResponsesLibrary({ textType }: ModelResponsesLibraryProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedQuality, setSelectedQuality] = React.useState<'excellent' | 'good' | 'basic'>('excellent');
  const [showAnnotations, setShowAnnotations] = React.useState(true);

  const getModelResponses = () => {
    switch (textType.toLowerCase()) {
      case 'narrative':
        return {
          title: 'Narrative Writing Examples',
          description: 'These examples show different quality levels of narrative writing for the NSW Selective exam.',
          responses: {
            excellent: {
              title: 'The Discovery',
              text: `The ancient door creaked open, revealing a room untouched for decades. Maya's heart raced as dust particles danced in the beam of sunlight that pierced through the heavy curtains. This was her grandmother's secret study, mentioned only in whispers and forbidden to enter until now.

A mahogany desk dominated the center of the room, its surface covered with yellowed papers and leather-bound journals. Maya approached cautiously, her footsteps muffled by the Persian carpet. The air felt thick with secrets and forgotten memories.

"Hello?" she called, though she knew no one would answer. Her grandmother had passed away three weeks ago, leaving Maya this old house and a letter with explicit instructions: "Find what I've hidden in the study. It will change everything."

As Maya's fingers traced the edge of the desk, she noticed a small brass key hanging from a chain beneath it. Curious, she examined the desk more carefully and discovered a nearly invisible keyhole on the side panel. With trembling hands, she inserted the key and turned it.

The click echoed in the silent room. A hidden drawer slid open, revealing a leather pouch and a photograph. Maya gasped. The photograph showed her grandmother as a young woman, standing beside a famous scientist whose discoveries had changed modern medicine. They were holding what appeared to be a journal labeled "Breakthrough."

Suddenly, the significance of her grandmother's secret life began to unfold. Maya realized she wasn't just the quiet librarian everyone thought she knew. The pouch contained research notes that could revolutionize treatment for the very disease that had taken her grandmother's life.

"This is what you wanted me to find," Maya whispered, tears welling in her eyes. "Your legacy."

As the sun set beyond the windows, casting long shadows across the room, Maya made a decision. She would continue what her grandmother had started. The discovery wasn't just about scientific research; it was about uncovering the extraordinary truth of an ordinary woman who had changed the world from the shadows.

Maya carefully gathered the materials, knowing that from this moment, her life too would never be the same.`,
              annotations: [
                { text: "The ancient door creaked open, revealing a room untouched for decades.", note: "Strong opening sentence using sensory details to create immediate interest" },
                { text: "Maya's heart raced as dust particles danced in the beam of sunlight that pierced through the heavy curtains.", note: "Effective use of imagery and character reaction to build atmosphere" },
                { text: "This was her grandmother's secret study, mentioned only in whispers and forbidden to enter until now.", note: "Establishes intrigue and context efficiently" },
                { text: "\"Find what I've hidden in the study. It will change everything.\"", note: "Dialogue used effectively to create mystery and advance the plot" },
                { text: "With trembling hands, she inserted the key and turned it.", note: "Physical reactions show emotion rather than telling it" },
                { text: "The click echoed in the silent room.", note: "Short sentence for emphasis and pacing" },
                { text: "Maya realized she wasn't just the quiet librarian everyone thought she knew.", note: "Reveals character depth and creates a turning point" },
                { text: "\"This is what you wanted me to find,\" Maya whispered, tears welling in her eyes. \"Your legacy.\"", note: "Emotional climax with dialogue and physical reaction" },
                { text: "Maya carefully gathered the materials, knowing that from this moment, her life too would never be the same.", note: "Strong conclusion that suggests future implications" }
              ],
              markingCriteria: {
                content: 'Excellent (14-15/15): Creative and original idea with sophisticated plot development. Well-developed characters and setting. Engaging narrative with clear beginning, complication, and resolution.',
                language: 'Excellent (9-10/10): Sophisticated vocabulary and varied sentence structures. Excellent control of grammar, punctuation, and spelling. Effective use of literary devices.'
              }
            },
            good: {
              title: 'The Secret Room',
              text: `I couldn't believe my eyes when I found the hidden door behind the bookshelf in my new house. It was my first day after moving in, and I was arranging my books when I noticed that one section of the shelf moved slightly.

"What's this?" I said to myself as I pushed harder on the shelf. It swung open to reveal a small wooden door with a rusty handle. I was both scared and excited as I turned the handle and pulled the door open.

Inside was a small room with cobwebs everywhere. There was an old desk with papers scattered on it and a chair that looked like it would break if anyone sat on it. The walls were covered with maps and strange symbols that I didn't understand.

I walked over to the desk and picked up one of the papers. It was a letter dated 1955, addressed to someone named Professor Williams. The letter talked about a discovery that could "change the course of history" but didn't explain what the discovery was.

Suddenly, I heard footsteps coming up the stairs. I quickly put the letter in my pocket, closed the hidden door, and pushed the bookshelf back into place. It was my mom calling me for dinner.

"Coming!" I shouted, my heart still racing from what I had found.

That night, I couldn't sleep. I kept thinking about the secret room and the mysterious letter. Who was Professor Williams? What was the discovery? Why was there a hidden room in our house?

The next morning, I decided to go to the local library to see if I could find any information about the previous owners of the house or Professor Williams. I was determined to solve this mystery, no matter how long it took.

Little did I know that this discovery would lead me on an adventure bigger than anything I could have imagined, and that the secret hidden in my house would indeed change history – and my life – forever.`,
              annotations: [
                { text: "I couldn't believe my eyes when I found the hidden door behind the bookshelf in my new house.", note: "Opening creates interest but could be more descriptive" },
                { text: "\"What's this?\" I said to myself as I pushed harder on the shelf.", note: "Dialogue helps advance the action" },
                { text: "Inside was a small room with cobwebs everywhere.", note: "Basic description that could include more sensory details" },
                { text: "The letter talked about a discovery that could \"change the course of history\" but didn't explain what the discovery was.", note: "Creates mystery and intrigue" },
                { text: "Suddenly, I heard footsteps coming up the stairs.", note: "Creates tension and interrupts the discovery" },
                { text: "That night, I couldn't sleep.", note: "Shows character's reaction but could be more detailed" },
                { text: "Little did I know that this discovery would lead me on an adventure bigger than anything I could have imagined", note: "Conclusion hints at future events but is somewhat clichéd" }
              ],
              markingCriteria: {
                content: 'Good (11-13/15): Interesting idea with clear plot. Some character development and setting description. Has a beginning, middle, and end structure.',
                language: 'Good (7-8/10): Appropriate vocabulary with some variety in sentence structure. Good control of grammar, punctuation, and spelling with minor errors.'
              }
            },
            basic: {
              title: 'The Old House',
              text: `One day I moved into an old house with my family. It was big and old and a bit scary. My bedroom was on the second floor and it had a window that looked out onto the backyard.

On the first night, I heard strange noises coming from the attic above my room. It sounded like footsteps. I was really scared and pulled the blanket over my head.

The next morning I told my mom about the noises but she said it was probably just the house settling or maybe mice in the attic. I wasn't sure if I believed her.

After school that day, I decided to check out the attic. I found the door to it in the hallway ceiling. I pulled down the ladder and climbed up slowly.

The attic was dusty and dark. I turned on my flashlight and looked around. There were old boxes and furniture everywhere. Then I saw something move in the corner.

I was so scared! But then I realized it was just a cat. It must have gotten into the house somehow. It ran past me and down the ladder.

I went back downstairs and showed my mom the cat. She was surprised but said we could keep it if no one claimed it. We put up signs in the neighborhood but nobody came for the cat.

So that's how we got our cat, Midnight. And the noises in the attic stopped after that. It turns out the house wasn't haunted after all. It was just a cat looking for a home, just like we were.`,
              annotations: [
                { text: "One day I moved into an old house with my family.", note: "Simple opening that lacks detail and doesn't create much interest" },
                { text: "It was big and old and a bit scary.", note: "Basic description with repetitive structure and vague adjectives" },
                { text: "I was really scared and pulled the blanket over my head.", note: "Tells emotion directly rather than showing through actions or sensory details" },
                { text: "The attic was dusty and dark.", note: "Limited descriptive language" },
                { text: "I was so scared! But then I realized it was just a cat.", note: "Simplistic resolution of tension" },
                { text: "So that's how we got our cat, Midnight.", note: "Straightforward conclusion without depth" }
              ],
              markingCriteria: {
                content: 'Basic (6-10/15): Simple idea with basic plot. Limited character development and setting description. Has a beginning and end but underdeveloped middle.',
                language: 'Basic (4-6/10): Simple vocabulary and sentence structures. Some errors in grammar, punctuation, and spelling that occasionally affect meaning.'
              }
            }
          }
        };
      case 'persuasive':
        return {
          title: 'Persuasive Writing Examples',
          description: 'These examples show different quality levels of persuasive writing for the NSW Selective exam.',
          responses: {
            excellent: {
              title: 'School Uniforms Should Be Optional',
              text: `Imagine standing in front of your wardrobe each morning, empowered to choose clothing that expresses your personality, accommodates your sensory needs, and prepares you comfortably for the day's weather. Now contrast this with the reality faced by millions of Australian students: the mandatory school uniform. While proponents argue that uniforms create equality and discipline, the evidence overwhelmingly suggests that making school uniforms optional would benefit students' well-being, educational outcomes, and preparation for real-world decision-making.

First and foremost, optional uniforms would significantly improve student well-being. Research published in the Journal of Educational Psychology found that when students have autonomy over their appearance, they report higher levels of self-esteem and lower anxiety levels. This makes perfect sense—adolescence is a critical period for identity development, and clothing is a fundamental way young people express who they are. Furthermore, many students have sensory sensitivities or physical needs that standard uniforms fail to accommodate. A one-size-fits-all approach to school attire ignores these individual differences, potentially causing daily discomfort that distracts from learning.

Critics may argue that uniforms eliminate socioeconomic differences in appearance, but this argument falls short under scrutiny. The reality is that socioeconomic status remains visible through many other markers—quality of school supplies, digital devices, after-school activities, and even the condition of the uniforms themselves. Rather than forcing an artificial equality through identical clothing, schools should address economic disparities directly through inclusive practices and education about diversity and respect.

Moreover, allowing clothing choice actually better prepares students for their futures. In most workplaces and throughout adult life, individuals must make daily decisions about appropriate attire for different contexts. By giving students graduated responsibility for their clothing choices within reasonable guidelines, schools provide valuable practice in decision-making and understanding contextual appropriateness. This real-world skill development is far more valuable than years of compliance with arbitrary uniform rules that rarely translate to post-school environments.

The financial burden on families also cannot be ignored. Many parents struggle with the significant expense of specialized uniform items that can only be purchased from specific suppliers at premium prices. Optional uniform policies would allow families to make economical choices while maintaining a sense of school identity through other means, such as shared values and educational experiences.

Some school administrators fear that optional uniforms would create chaos or discipline problems. However, schools that have implemented flexible dress codes report the opposite effect. When students feel respected and given appropriate autonomy, they typically respond with increased engagement and cooperation. Clear guidelines about appropriate school attire can still exist without mandating identical clothing for every student.

In conclusion, while the tradition of school uniforms is deeply entrenched in Australian education, the evidence suggests it's time for change. By making uniforms optional and implementing thoughtful dress guidelines instead, schools can improve student well-being, better prepare young people for real-world responsibilities, reduce financial strain on families, and still maintain a positive educational environment. The question isn't whether students should wear whatever they want—it's whether we trust young people with appropriate guidance to make reasonable choices about their own bodies and appearance. The answer, supported by research and real-world examples, is clearly yes.`,
              annotations: [
                { text: "Imagine standing in front of your wardrobe each morning, empowered to choose clothing that expresses your personality, accommodates your sensory needs, and prepares you comfortably for the day's weather.", note: "Strong opening using second-person perspective to engage reader immediately" },
                { text: "Research published in the Journal of Educational Psychology found that when students have autonomy over their appearance, they report higher levels of self-esteem and lower anxiety levels.", note: "Effective use of specific evidence to support claims" },
                { text: "Critics may argue that uniforms eliminate socioeconomic differences in appearance, but this argument falls short under scrutiny.", note: "Addresses counterarguments directly" },
                { text: "Rather than forcing an artificial equality through identical clothing, schools should address economic disparities directly through inclusive practices and education about diversity and respect.", note: "Offers alternative solutions, showing nuanced thinking" },
                { text: "By giving students graduated responsibility for their clothing choices within reasonable guidelines, schools provide valuable practice in decision-making and understanding contextual appropriateness.", note: "Connects argument to broader educational goals" },
                { text: "The financial burden on families also cannot be ignored.", note: "Introduces new paragraph with clear topic sentence" },
                { text: "Some school administrators fear that optional uniforms would create chaos or discipline problems. However, schools that have implemented flexible dress codes report the opposite effect.", note: "Anticipates and addresses practical concerns" },
                { text: "The question isn't whether students should wear whatever they want—it's whether we trust young people with appropriate guidance to make reasonable choices about their own bodies and appearance.", note: "Reframes the debate effectively in conclusion" }
              ],
              markingCriteria: {
                content: 'Excellent (14-15/15): Sophisticated argument with clear position. Comprehensive, logical reasoning with strong supporting evidence. Effectively addresses counterarguments. Compelling introduction and conclusion.',
                language: 'Excellent (9-10/10): Sophisticated vocabulary and varied sentence structures. Excellent control of grammar, punctuation, and spelling. Effective use of persuasive devices and formal tone.'
              }
            },
            good: {
              title: 'Homework Should Be Limited',
              text: `Do you ever feel overwhelmed by the amount of homework you receive? Many students across Australia spend hours each night completing assignments, leaving little time for other important activities. I strongly believe that schools should limit homework to a maximum of 30 minutes per subject each week.

Firstly, too much homework can cause stress and anxiety in students. According to a survey by the Australian Education Union, 68% of students reported feeling stressed about the amount of homework they receive. This stress can lead to health problems such as headaches, exhaustion, and even depression. By limiting homework, schools can help improve students' mental health and well-being.

Secondly, children need time for physical activity and play. The Australian Department of Health recommends that children aged 5-17 should get at least 60 minutes of physical activity every day. However, when students are stuck inside doing homework for hours, they don't have time to exercise. This can lead to health problems like obesity and poor physical development.

Additionally, family time is important for a child's development. When students have too much homework, they miss out on valuable time with their families. Family dinners, conversations, and activities help children develop social skills and strong relationships. These experiences are just as important as academic learning.

Some people argue that homework helps reinforce what students learn in class. While this is true, research shows that the benefits of homework plateau after about 30 minutes per subject. Any additional time spent on homework doesn't significantly improve learning outcomes.

Others might say that homework teaches responsibility and time management. However, these skills can be taught through other means, such as assigning long-term projects with clear deadlines or encouraging students to participate in extracurricular activities.

In conclusion, limiting homework to 30 minutes per subject each week would reduce student stress, allow time for physical activity, and preserve important family time. Schools should focus on making homework more effective rather than simply assigning more of it. By finding this balance, we can ensure that students receive a well-rounded education that prepares them for success in all areas of life.`,
              annotations: [
                { text: "Do you ever feel overwhelmed by the amount of homework you receive?", note: "Opening with a question engages the reader but is somewhat clichéd" },
                { text: "According to a survey by the Australian Education Union, 68% of students reported feeling stressed about the amount of homework they receive.", note: "Good use of statistics to support claims" },
                { text: "The Australian Department of Health recommends that children aged 5-17 should get at least 60 minutes of physical activity every day.", note: "Cites authoritative source to strengthen argument" },
                { text: "Some people argue that homework helps reinforce what students learn in class.", note: "Addresses counterarguments but could develop this more fully" },
                { text: "While this is true, research shows that the benefits of homework plateau after about 30 minutes per subject.", note: "Uses research to counter opposing viewpoints" },
                { text: "In conclusion, limiting homework to 30 minutes per subject each week would reduce student stress, allow time for physical activity, and preserve important family time.", note: "Clear conclusion that restates main points" }
              ],
              markingCriteria: {
                content: 'Good (11-13/15): Clear position with logical arguments. Good supporting evidence but could be more comprehensive. Addresses some counterarguments. Clear introduction and conclusion.',
                language: 'Good (7-8/10): Appropriate vocabulary with some variety in sentence structure. Good control of grammar, punctuation, and spelling with minor errors. Some use of persuasive devices.'
              }
            },
            basic: {
              title: 'No More Homework',
              text: `I think schools should stop giving homework because it's not fair to students. We spend all day at school and then have to do more work at home. This is my opinion and I will tell you why.

First, homework takes too much time. Sometimes I have to spend 2 hours every night doing homework. This is too much because kids need time to play and relax too. When I have lots of homework, I can't play with my friends or watch TV.

Also, homework is boring. Most of the time it's just worksheets or questions from the textbook. This doesn't help us learn better. It just makes us not like school.

Another reason is that some kids don't have help at home. If they don't understand the homework, there's no teacher to help them. This isn't fair because some kids have parents who can help and some don't.

Some people think homework helps us learn more. But I think we should just learn everything at school instead. The teacher is there to help us at school.

Homework also causes arguments at home. My parents always tell me to do my homework and we end up fighting about it. This makes everyone unhappy.

In conclusion, I think schools should stop giving homework because it takes too much time, it's boring, it's not fair to all students, and it causes problems at home. School time should be for learning and home time should be for family and fun.`,
              annotations: [
                { text: "I think schools should stop giving homework because it's not fair to students.", note: "Position is clear but stated simplistically" },
                { text: "This is my opinion and I will tell you why.", note: "Unnecessary statement that weakens the argument" },
                { text: "Sometimes I have to spend 2 hours every night doing homework.", note: "Uses personal experience rather than evidence" },
                { text: "Also, homework is boring.", note: "Subjective statement without supporting evidence" },
                { text: "Some people think homework helps us learn more. But I think we should just learn everything at school instead.", note: "Acknowledges counterargument but dismisses it without adequate reasoning" },
                { text: "In conclusion, I think schools should stop giving homework because...", note: "Conclusion restates points but doesn't strengthen the argument" }
              ],
              markingCriteria: {
                content: 'Basic (6-10/15): Position is clear but arguments lack depth. Limited supporting evidence, mostly personal opinion. Minimal addressing of counterarguments. Simple introduction and conclusion.',
                language: 'Basic (4-6/10): Simple vocabulary and repetitive sentence structures. Some errors in grammar, punctuation, and spelling. Limited use of persuasive devices.'
              }
            }
          }
        };
      case 'descriptive':
        return {
          title: 'Descriptive Writing Examples',
          description: 'These examples show different quality levels of descriptive writing for the NSW Selective exam.',
          responses: {
            excellent: {
              title: 'The Old Lighthouse',
              text: `The lighthouse stood sentinel on the jagged cliff edge, its weathered stone exterior bearing the scars of a century's worth of storms. Paint peeled from its once-pristine white surface like old skin, revealing patches of gray stone underneath that seemed to tell stories of bygone eras. The afternoon sun cast long shadows across its cylindrical form, accentuating every crack and crevice that time had etched into its facade.

As I approached along the winding cliff path, the salty breeze intensified, carrying with it the rhythmic percussion of waves crashing against the rocks below. Seagulls wheeled overhead, their mournful cries punctuating the constant whisper of wind through the coastal grasses that clung tenaciously to the cliff face. The air tasted of salt and seaweed, with undertones of the wild thyme that grew in sheltered pockets along the path.

The heavy oak door at the lighthouse base groaned in protest as I pushed it open, releasing a waft of cool, musty air that spoke of abandonment and neglect. Dust motes danced in the shaft of sunlight that pierced the gloom, illuminating a narrow spiral staircase that twisted upward like the inside of a nautilus shell. Each iron step was worn in the center, testament to the countless keepers who had made this same journey over decades of faithful service.

My fingers traced the cold stone wall as I ascended, feeling the slight dampness that perpetually clung to the interior no matter the weather outside. The staircase creaked and sighed beneath my weight, as if the lighthouse itself was breathing. With each complete turn of the spiral, small windows offered glimpses of the intensifying blue of the ocean as I climbed higher, the horizon line gradually expanding until it seemed to encompass the entire world.

At the top, the lantern room awaited—a perfect glass-enclosed circle housing the massive Fresnel lens that had once guided ships safely to harbor. Though no longer lit, the intricate crystal prisms caught the late afternoon sunlight, fracturing it into a kaleidoscope of colors that danced across the curved walls. The brass fittings, though tarnished with verdigris, still retained hints of their former glory, gleaming dully in the ambient light.

Outside, the observation deck offered an unobstructed panorama that stole the breath from my lungs. The coastline curved away in both directions like the edges of an ancient map, white-capped waves marking the boundary between the deep azure of the ocean and the rugged brown of the land. Far below, the water churned around half-submerged rocks, creating patterns of white foam that formed and dissolved in endless variation.

As the sun began its descent toward the horizon, the lighthouse cast an impossibly long shadow across the water, a dark finger pointing eastward. The quality of light transformed, bathing everything in a golden glow that softened the lighthouse's weathered features and illuminated the salt-crusted windows until they shimmered like diamonds. In that moment, despite its abandonment, the lighthouse possessed a dignity and presence that transcended its practical purpose, standing as a monument to humanity's age-old relationship with the sea—both adversary and provider, danger and salvation.

The wind picked up as evening approached, whistling through tiny gaps in the lantern room's glass panels with an almost musical quality. It carried whispers of storms weathered, ships guided, and lives saved across generations. Though no longer serving its original purpose, the lighthouse remained steadfast, a silent witness to the ever-changing sea and sky, its presence a comforting constant in a world of perpetual motion.`,
              annotations: [
                { text: "The lighthouse stood sentinel on the jagged cliff edge, its weathered stone exterior bearing the scars of a century's worth of storms.", note: "Strong opening with personification and vivid imagery" },
                { text: "Paint peeled from its once-pristine white surface like old skin, revealing patches of gray stone underneath that seemed to tell stories of bygone eras.", note: "Effective simile with implied metaphor about history" },
                { text: "the salty breeze intensified, carrying with it the rhythmic percussion of waves crashing against the rocks below.", note: "Appeals to multiple senses (touch, sound) with musical metaphor" },
                { text: "The air tasted of salt and seaweed, with undertones of the wild thyme that grew in sheltered pockets along the path.", note: "Sophisticated sensory detail combining taste and smell" },
                { text: "Dust motes danced in the shaft of sunlight that pierced the gloom, illuminating a narrow spiral staircase that twisted upward like the inside of a nautilus shell.", note: "Visual imagery with natural simile" },
                { text: "The staircase creaked and sighed beneath my weight, as if the lighthouse itself was breathing.", note: "Personification creating atmosphere and connection" },
                { text: "the massive Fresnel lens that had once guided ships safely to harbor. Though no longer lit, the intricate crystal prisms caught the late afternoon sunlight, fracturing it into a kaleidoscope of colors", note: "Technical detail combined with beautiful visual imagery" },
                { text: "the lighthouse cast an impossibly long shadow across the water, a dark finger pointing eastward.", note: "Extended personification with visual imagery" },
                { text: "It carried whispers of storms weathered, ships guided, and lives saved across generations.", note: "Poetic conclusion connecting to human element and history" }
              ],
              markingCriteria: {
                content: 'Excellent (14-15/15): Exceptional focus on the subject with comprehensive, vivid details. Sophisticated organization of descriptive elements. Creates a powerful dominant impression with emotional resonance.',
                language: 'Excellent (9-10/10): Sophisticated vocabulary with precise word choice. Masterful use of figurative language. Excellent control of grammar, punctuation, and spelling. Varied and complex sentence structures.'
              }
            },
            good: {
              title: 'The Abandoned Playground',
              text: `The old playground sat in the corner of the park, forgotten by most of the neighborhood children who now preferred the newer, shinier equipment on the other side. A rusty swing set stood at its center, the chains creaking softly in the breeze. The once-bright red seats had faded to a dull pink, with cracks running across their surfaces like tiny rivers on a map.

Next to the swings, a slide curved downward, its metal surface reflecting the afternoon sunlight. Patches of green moss grew along the edges, creating a slippery border that few children would dare to touch. At the top of the slide's ladder, spider webs connected the rungs, undisturbed for what seemed like months.

The roundabout was the most worn of all the equipment. Its metal floor was scratched with countless initials and crude drawings, telling stories of the children who once played there. When I gave it a gentle push, it moved reluctantly with a low, mournful groan that echoed across the empty playground.

Surrounding the equipment, the ground was covered with woodchips that had turned gray with age. Weeds pushed through in places, reclaiming the space for nature. A dandelion had managed to grow right in the middle of the roundabout's center, its yellow flower a bright spot against the faded metal.

The sandbox in the corner was now home to more leaves than sand. The wooden border was rotting in places, especially on the north side where rain had pooled repeatedly over the years. A child's plastic shovel lay half-buried in one corner, its blue handle just visible above the surface.

Despite its abandoned state, there was something peaceful about the playground. Birds had made nests in the nearby trees, and their songs filled the air. A squirrel darted across the woodchips, pausing briefly on the bottom step of the slide before disappearing into the bushes beyond.

As the sun began to set, shadows stretched across the playground, making it look even more mysterious. The swing chains clinked together in the evening breeze, almost as if invisible children were playing there. For a moment, I could almost hear the echoes of laughter that once filled this space, before time and neglect had transformed it into this quiet, forgotten corner of the park.`,
              annotations: [
                { text: "The old playground sat in the corner of the park, forgotten by most of the neighborhood children who now preferred the newer, shinier equipment on the other side.", note: "Clear introduction establishing setting and mood" },
                { text: "The once-bright red seats had faded to a dull pink, with cracks running across their surfaces like tiny rivers on a map.", note: "Good use of color and simile" },
                { text: "Patches of green moss grew along the edges, creating a slippery border that few children would dare to touch.", note: "Effective sensory detail combining sight and implied touch" },
                { text: "Its metal floor was scratched with countless initials and crude drawings, telling stories of the children who once played there.", note: "Connects physical details to human element" },
                { text: "Weeds pushed through in places, reclaiming the space for nature.", note: "Personification showing passage of time" },
                { text: "The swing chains clinked together in the evening breeze, almost as if invisible children were playing there.", note: "Creates atmosphere with sound and implied presence" },
                { text: "For a moment, I could almost hear the echoes of laughter that once filled this space", note: "Effective conclusion connecting to emotional element" }
              ],
              markingCriteria: {
                content: 'Good (11-13/15): Clear focus on the subject with good descriptive details. Logical organization of elements. Creates a clear impression with some emotional connection.',
                language: 'Good (7-8/10): Appropriate vocabulary with some precise word choices. Good use of figurative language. Good control of grammar, punctuation, and spelling with minor errors. Some variety in sentence structures.'
              }
            },
            basic: {
              title: 'My Bedroom',
              text: `My bedroom is my favorite place in my house. It is not very big but I like it a lot. The walls are blue and I have posters of my favorite sports teams on them. There is a window that looks out to our backyard.

My bed is in the corner of the room. It has a blue and green striped blanket and two pillows. Next to my bed is a small table where I keep my alarm clock and my books. I like to read before I go to sleep.

On the other side of my room is my desk. This is where I do my homework. It has my computer on it and some pencils and pens. My school books are on a shelf above the desk. Sometimes it gets messy because I have lots of papers.

I have a closet for my clothes. It has sliding doors with mirrors on them. I can see myself when I get dressed in the morning. Inside the closet, I keep my clothes on hangers and my shoes on the floor.

The floor of my room has carpet. It is soft and gray. Sometimes I like to sit on the floor to play games or build with my Lego sets. I have a round blue rug in the middle of the room.

At night, I turn on my lamp that sits on my bedside table. It makes the room look nice and cozy. I also have a ceiling light for when I need the room to be bright.

I like my room because it is quiet and I can be alone there. It is comfortable and has all my favorite things. My room is the best place to relax after a long day at school.`,
              annotations: [
                { text: "My bedroom is my favorite place in my house. It is not very big but I like it a lot.", note: "Simple opening with basic information but limited descriptive language" },
                { text: "The walls are blue and I have posters of my favorite sports teams on them.", note: "Basic visual details without elaboration" },
                { text: "It has a blue and green striped blanket and two pillows.", note: "Simple description with limited sensory appeal" },
                { text: "Sometimes it gets messy because I have lots of papers.", note: "Tells rather than shows with minimal detail" },
                { text: "The floor of my room has carpet. It is soft and gray.", note: "Includes tactile element but with simple sentence structure" },
                { text: "It makes the room look nice and cozy.", note: "Uses vague adjectives rather than specific details" },
                { text: "My room is the best place to relax after a long day at school.", note: "Simple conclusion with limited emotional depth" }
              ],
              markingCriteria: {
                content: 'Basic (6-10/15): Basic focus on the subject with limited descriptive details. Simple organization following physical layout. Creates a basic impression with minimal emotional connection.',
                language: 'Basic (4-6/10): Simple vocabulary with general rather than specific words. Limited use of figurative language. Some errors in grammar, punctuation, and spelling. Repetitive sentence structures.'
              }
            }
          }
        };
      default:
        return {
          title: 'Select a Writing Type',
          description: 'Please select a writing type to see example responses.',
          responses: {
            excellent: {
              title: '',
              text: '',
              annotations: [],
              markingCriteria: {
                content: '',
                language: ''
              }
            },
            good: {
              title: '',
              text: '',
              annotations: [],
              markingCriteria: {
                content: '',
                language: ''
              }
            },
            basic: {
              title: '',
              text: '',
              annotations: [],
              markingCriteria: {
                content: '',
                language: ''
              }
            }
          }
        };
    }
  };

  const examples = getModelResponses();
  const selectedExample = examples.responses[selectedQuality];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center px-4 py-2 text-sm font-bold rounded-xl border-3 border-purple-300 bg-gradient-to-r from-purple-100 to-purple-200 text-purple-700 hover:from-purple-200 hover:to-purple-300 transition-all duration-300 transform hover:scale-105 shadow-md"
      >
        <Star className="w-5 h-5 mr-2" />
        See Examples
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto backdrop-blur-sm" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gradient-to-br from-purple-500/50 to-pink-500/50 transition-opacity" aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-3xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-5xl sm:w-full border-4 border-purple-300 dark:border-purple-700">
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 px-6 pt-5 pb-4 sm:p-8">
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-4 shadow-lg">
                      <Award className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl leading-6 font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400" id="modal-title">
                      {examples.title}
                    </h3>
                  </div>
                  <button
                    type="button"
                    className="bg-white dark:bg-gray-700 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 p-2 shadow-md hover:shadow-lg transform hover:scale-110 transition-all duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <BookOpen className="h-6 w-6" />
                  </button>
                </div>
                <div className="mt-2">
                  <p className="text-base text-gray-700 dark:text-gray-300 font-medium">{examples.description}</p>
                </div>

                <div className="mt-6 flex space-x-4 justify-center">
                  <button
                    onClick={() => setSelectedQuality('excellent')}
                    className={`px-5 py-3 text-base font-bold rounded-xl ${
                      selectedQuality === 'excellent'
                        ? 'bg-gradient-to-r from-green-200 to-green-300 text-green-800 border-3 border-green-400 shadow-md transform scale-105'
                        : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 border-3 border-gray-300 hover:from-gray-200 hover:to-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <div className="flex items-center">
                      <Star className="w-5 h-5 text-yellow-500 mr-2" />
                      Amazing Example
                    </div>
                  </button>
                  <button
                    onClick={() => setSelectedQuality('good')}
                    className={`px-5 py-3 text-base font-bold rounded-xl ${
                      selectedQuality === 'good'
                        ? 'bg-gradient-to-r from-blue-200 to-blue-300 text-blue-800 border-3 border-blue-400 shadow-md transform scale-105'
                        : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 border-3 border-gray-300 hover:from-gray-200 hover:to-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <div className="flex items-center">
                      <Gift className="w-5 h-5 text-blue-500 mr-2" />
                      Good Example
                    </div>
                  </button>
                  <button
                    onClick={() => setSelectedQuality('basic')}
                    className={`px-5 py-3 text-base font-bold rounded-xl ${
                      selectedQuality === 'basic'
                        ? 'bg-gradient-to-r from-yellow-200 to-yellow-300 text-yellow-800 border-3 border-yellow-400 shadow-md transform scale-105'
                        : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 border-3 border-gray-300 hover:from-gray-200 hover:to-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <div className="flex items-center">
                      <Sparkles className="w-5 h-5 text-yellow-500 mr-2" />
                      Starter Example
                    </div>
                  </button>
                  <div className="flex-grow"></div>
                  <button
                    onClick={() => setShowAnnotations(!showAnnotations)}
                    className={`px-5 py-3 text-base font-bold rounded-xl ${
                      showAnnotations
                        ? 'bg-gradient-to-r from-purple-200 to-purple-300 text-purple-800 border-3 border-purple-400 shadow-md'
                        : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 border-3 border-gray-300 hover:from-gray-200 hover:to-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <div className="flex items-center">
                      <Zap className="w-5 h-5 mr-2" />
                      {showAnnotations ? 'Hide Notes' : 'Show Notes'}
                    </div>
                  </button>
                </div>

                <div className="mt-4">
                  <h4 className="text-md font-medium text-gray-900">{selectedExample.title}</h4>
                  <div className="mt-2 bg-gray-50 p-4 rounded-md overflow-y-auto max-h-96">
                    {showAnnotations ? (
                      <div>
                        {selectedExample.text.split('\n\n').map((paragraph, index) => {
                          // Find annotations that match text in this paragraph
                          const paragraphAnnotations = selectedExample.annotations.filter(
                            annotation => paragraph.includes(annotation.text)
                          );
                          
                          return (
                            <div key={index} className="mb-4">
                              <p className="text-gray-900">{paragraph}</p>
                              {paragraphAnnotations.length > 0 && (
                                <div className="mt-1 pl-4 border-l-2 border-purple-300">
                                  {paragraphAnnotations.map((annotation, i) => (
                                    <div key={i} className="text-xs text-purple-700 mb-1">
                                      <span className="font-medium">"{annotation.text.substring(0, 40)}..."</span>: {annotation.note}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="text-gray-900 whitespace-pre-line">
                        {selectedExample.text}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-6 bg-indigo-50 p-4 rounded-md">
                  <h4 className="text-md font-medium text-indigo-900">NSW Selective Exam Marking Criteria</h4>
                  <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-3 rounded shadow-sm">
                      <h5 className="text-sm font-medium text-gray-900">Content, Form, and Vocabulary/Style (15 marks)</h5>
                      <p className="mt-1 text-sm text-gray-600">{selectedExample.markingCriteria.content}</p>
                    </div>
                    <div className="bg-white p-3 rounded shadow-sm">
                      <h5 className="text-sm font-medium text-gray-900">Sentences, Punctuation, and Spelling (10 marks)</h5>
                      <p className="mt-1 text-sm text-gray-600">{selectedExample.markingCriteria.language}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setIsOpen(false)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => {
                    // Logic to compare student's work would go here
                    alert('This feature will allow students to compare their work with the model response.');
                  }}
                >
                  Compare My Work
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
