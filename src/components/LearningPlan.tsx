import React, { useState, lazy, Suspense } from 'react';

// Helper function to handle both default and named exports
const lazyWithModule = (factory) => 
  lazy(() => factory().then(module => {
    const Component = module.default || module;
    if (!Component) {
      throw new Error('Module does not have a valid component export');
    }
    return { default: Component };
  }));

// Use the helper function for all lazy imports
const Day1AssessmentCriteria = lazyWithModule(() => import('./lessons/day1_assessment_criteria/index'));
const Day2SentenceStructure = lazyWithModule(() => import('./lessons/day2_sentence_structure/index'));
const Day3ParagraphBuilding = lazyWithModule(() => import('./lessons/day3_paragraph_building/index'));
const Day4BasicPunctuation = lazyWithModule(() => import('./lessons/day4_basic_punctuation/index'));
const Day5DescriptiveLanguage = lazyWithModule(() => import('./lessons/day5_descriptive_language/index'));
const Day6NarrativeStructure = lazyWithModule(() => import('./lessons/day6_narrative_structure/index'));
const Day7CharacterDevelopment = lazyWithModule(() => import('./lessons/day7_character_development/index'));
const Day8SettingAtmosphere = lazyWithModule(() => import('./lessons/day8_setting_atmosphere/index'));
const Day9DialogueWriting = lazyWithModule(() => import('./lessons/day9_dialogue_writing/index'));
const Day10PlotDevelopment = lazyWithModule(() => import('./lessons/day10_plot_development/index'));
const Day11ShowDontTell = lazyWithModule(() => import('./lessons/day11_show_dont_tell/index'));
const Day12PersuasiveWritingBasics = lazyWithModule(() => import('./lessons/day12_persuasive_writing_basics/index'));
const Day13PersuasiveTechniques = lazyWithModule(() => import('./lessons/day13_persuasive_techniques/index'));
const Day14PersuasiveEssayStructure = lazyWithModule(() => import('./lessons/day14_persuasive_essay_structure/index'));
const Day15PersuasiveEssayPractice = lazyWithModule(() => import('./lessons/day15_persuasive_essay_practice/index'));
const Day16DescriptiveWritingBasics = lazyWithModule(() => import('./lessons/day16_descriptive_writing_basics/index'));
const Day17SettingDescription = lazyWithModule(() => import('./lessons/day17_setting_description/index'));
const Day18CharacterDescription = lazyWithModule(() => import('./lessons/day18_character_description/index'));
const Day19SensoryDetails = lazyWithModule(() => import('./lessons/day19_sensory_details/index'));
const Day20AdvancedImagery = lazyWithModule(() => import('./lessons/day20_advanced_imagery_techniques/index'));
const Day21MetaphorsSimilesMastery = lazyWithModule(() => import('./lessons/day21_metaphors_similes_mastery/index'));
const Day22PersonificationAnthropomorphism = lazyWithModule(() => import('./lessons/day22_personification_anthropomorphism/index'));
const Day23CreatingMoodTone = lazyWithModule(() => import('./lessons/day23_creating_mood_tone/index'));
const Day24DescriptiveWritingPracticeExam = lazyWithModule(() => import('./lessons/day24_descriptive_writing_practice_exam/index'));
const Day25RhetoricalQuestionsAppeals = lazyWithModule(() => import('./lessons/day25_rhetorical_questions_appeals/index'));
const Day26CounterArgumentsRebuttals = lazyWithModule(() => import('./lessons/day26_counter_arguments_rebuttals/index'));
const Day27PersuasiveLanguageDevices = lazyWithModule(() => import('./lessons/day27_persuasive_language_devices/index'));
const Day28FormalVsInformalPersuasion = lazyWithModule(() => import('./lessons/day28_formal_vs_informal_persuasion/index'));
const Day29PersuasiveSpeechWriting = lazyWithModule(() => import('./lessons/day29_persuasive_speech_writing/index'));
const Day30PersuasiveWritingPracticeExam = lazyWithModule(() => import('./lessons/day30_persuasive_writing_practice_exam/index'));

export function LearningPlan() {
  const [currentDay, setCurrentDay] = useState(1);
  const [showLessonContent, setShowLessonContent] = useState(false);

  // Combined array with day titles and emojis to reduce duplication
  const dayInfo = [
    { title: "Assessment Criteria", emoji: "📝" },
    { title: "Sentence Structure", emoji: "🔤" },
    { title: "Paragraph Building", emoji: "📊" },
    { title: "Basic Punctuation", emoji: "🔍" },
    { title: "Descriptive Language", emoji: "🎨" },
    { title: "Narrative Structure", emoji: "📚" },
    { title: "Character Development", emoji: "👤" },
    { title: "Setting & Atmosphere", emoji: "🏞️" },
    { title: "Dialogue Writing", emoji: "💬" },
    { title: "Plot Development", emoji: "📈" },
    { title: "Show, Don't Tell", emoji: "👁️" },
    { title: "Persuasive Writing Basics", emoji: "⚖️" },
    { title: "Persuasive Techniques", emoji: "🔊" },
    { title: "Persuasive Essay Structure", emoji: "📑" },
    { title: "Persuasive Essay Practice", emoji: "✍️" },
    { title: "Descriptive Writing Basics", emoji: "🖌️" },
    { title: "Setting Description", emoji: "🌄" },
    { title: "Character Description", emoji: "👪" },
    { title: "Sensory Details", emoji: "👃" },
    { title: "Advanced Imagery", emoji: "🎭" },
    { title: "Metaphors & Similes", emoji: "🔄" },
    { title: "Personification", emoji: "🧸" },
    { title: "Mood & Tone", emoji: "🎵" },
    { title: "Descriptive Practice Exam", emoji: "📝" },
    { title: "Rhetorical Questions", emoji: "❓" },
    { title: "Counter-Arguments", emoji: "⚔️" },
    { title: "Persuasive Language", emoji: "🗣️" },
    { title: "Formal vs Informal", emoji: "👔" },
    { title: "Persuasive Speech", emoji: "🎤" },
    { title: "Persuasive Practice Exam", emoji: "🏆" }
  ];

  const handleDaySelect = (day) => {
    setCurrentDay(day);
    setShowLessonContent(true);
  };

  // Function to render the correct lesson component based on the day
  const renderLessonComponent = (day) => {
    const Component = getLessonComponentByDay(day);
    if (!Component) return null;

    return (
      <Suspense fallback={
        <div className="p-4 text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
          </div>
          <p className="mt-2 text-gray-600">Loading lesson content...</p>
        </div>
      }>
        <ErrorBoundary fallback={<div className="p-4 text-red-600">Error loading lesson content. Please try again.</div>}>
          <Component />
        </ErrorBoundary>
      </Suspense>
    );
  };

  // Helper function to get the correct component based on day number
  const getLessonComponentByDay = (day) => {
    const components = {
      1: Day1AssessmentCriteria,
      2: Day2SentenceStructure,
      3: Day3ParagraphBuilding,
      4: Day4BasicPunctuation,
      5: Day5DescriptiveLanguage,
      6: Day6NarrativeStructure,
      7: Day7CharacterDevelopment,
      8: Day8SettingAtmosphere,
      9: Day9DialogueWriting,
      10: Day10PlotDevelopment,
      11: Day11ShowDontTell,
      12: Day12PersuasiveWritingBasics,
      13: Day13PersuasiveTechniques,
      14: Day14PersuasiveEssayStructure,
      15: Day15PersuasiveEssayPractice,
      16: Day16DescriptiveWritingBasics,
      17: Day17SettingDescription,
      18: Day18CharacterDescription,
      19: Day19SensoryDetails,
      20: Day20AdvancedImagery,
      21: Day21MetaphorsSimilesMastery,
      22: Day22PersonificationAnthropomorphism,
      23: Day23CreatingMoodTone,
      24: Day24DescriptiveWritingPracticeExam,
      25: Day25RhetoricalQuestionsAppeals,
      26: Day26CounterArgumentsRebuttals,
      27: Day27PersuasiveLanguageDevices,
      28: Day28FormalVsInformalPersuasion,
      29: Day29PersuasiveSpeechWriting,
      30: Day30PersuasiveWritingPracticeExam
    };
    return components[day] || null;
  };

  // Render days in groups of 6 for better organization and performance
  const renderDayGroups = () => {
    const groups = [];
    const itemsPerGroup = 6;
    
    for (let i = 0; i < dayInfo.length; i += itemsPerGroup) {
      const groupDays = dayInfo.slice(i, i + itemsPerGroup);
      const groupIndex = Math.floor(i / itemsPerGroup);
      
      groups.push(
        <div key={`group-${groupIndex}`} className="mb-4">
          <h4 className="text-sm font-medium text-gray-500 mb-2">
            Days {i + 1}-{Math.min(i + itemsPerGroup, dayInfo.length)}
          </h4>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {groupDays.map((day, index) => (
              <button
                key={i + index + 1}
                onClick={() => handleDaySelect(i + index + 1)}
                className={`p-2 rounded-lg border-2 transition-all ${
                  currentDay === i + index + 1
                    ? 'bg-blue-100 border-blue-500 shadow-md'
                    : 'hover:bg-blue-50 border-gray-200'
                }`}
              >
                <div className="text-2xl mb-1">{day.emoji}</div>
                <div className="text-xs font-bold">Day {i + index + 1}</div>
                <div className="text-xs truncate">{day.title}</div>
              </button>
            ))}
          </div>
        </div>
      );
    }
    
    return groups;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-3">Choose Your Learning Day:</h3>
        {renderDayGroups()}
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 border-b bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 flex items-center">
              <span className="text-2xl mr-2">{dayInfo[currentDay - 1].emoji}</span>
              Day {currentDay}: {dayInfo[currentDay - 1].title}
            </h2>
          </div>
          
          <div className="mt-4 flex space-x-2">
            <button
              onClick={() => setShowLessonContent(!showLessonContent)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md ${
                showLessonContent
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {showLessonContent ? 'Hide Lesson' : 'Show Lesson'}
            </button>
          </div>
        </div>

        {showLessonContent && (
          <div className="p-4">
            {renderLessonComponent(currentDay)}
          </div>
        )}
      </div>
    </div>
  );
}

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Lesson loading error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}