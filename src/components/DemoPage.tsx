import React, { useState } from 'react';
import { Brain, BookOpen, Clock, Zap, Target, BarChart, Play, Star, CheckCircle } from 'lucide-react';

interface DemoPageProps {
  onClose?: () => void;
}

export function DemoPage({ onClose }: DemoPageProps) {
  const [activeDemo, setActiveDemo] = useState<string>('essay-scorer');

  const demos = [
    {
      id: 'essay-scorer',
      title: 'AI Essay Scorer',
      description: 'Try our AI-powered essay feedback system',
      icon: <Brain className="w-6 h-6" />,
      component: <DemoEssayScorer />
    },
    {
      id: 'text-templates',
      title: 'Text Type Templates',
      description: 'Explore writing templates for different text types',
      icon: <BookOpen className="w-6 h-6" />,
      component: <DemoTextTemplates />
    },
    {
      id: 'timed-practice',
      title: 'Timed Practice',
      description: 'Experience exam-style timed writing practice',
      icon: <Clock className="w-6 h-6" />,
      component: <DemoTimedPractice />
    },
    {
      id: 'vocabulary',
      title: 'Vocabulary Helper',
      description: 'See how our vocabulary enhancement works',
      icon: <Zap className="w-6 h-6" />,
      component: <DemoVocabularyHelper />
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Try Our Writing Tools
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Experience the power of our NSW Selective Exam writing platform with these interactive demos.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          {demos.map((demo) => (
            <button
              key={demo.id}
              onClick={() => setActiveDemo(demo.id)}
              className={`p-4 rounded-lg text-left transition-all duration-200 ${
                activeDemo === demo.id
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:shadow-md'
              }`}
            >
              <div className="flex items-center mb-2">
                {demo.icon}
                <h3 className="ml-2 font-semibold">{demo.title}</h3>
              </div>
              <p className={`text-sm ${
                activeDemo === demo.id ? 'text-indigo-100' : 'text-gray-600 dark:text-gray-300'
              }`}>
                {demo.description}
              </p>
            </button>
          ))}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          {demos.find(demo => demo.id === activeDemo)?.component}
        </div>

        <div className="mt-8 text-center">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-6 text-white">
            <h3 className="text-xl font-bold mb-2">Ready to unlock the full experience?</h3>
            <p className="mb-4">Get unlimited access to all features, personalized feedback, and progress tracking.</p>
            <button className="btn btn-secondary btn-lg">
              Start Free Trial
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DemoEssayScorer() {
  const [essay, setEssay] = useState('');
  const [feedback, setFeedback] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const sampleEssay = `The environment is one of the most important issues facing our world today. Climate change, pollution, and deforestation are threatening our planet's future. We must take action now to protect our environment for future generations.

Firstly, climate change is causing serious problems around the world. Rising temperatures are melting ice caps and causing sea levels to rise. This threatens coastal cities and island nations. We need to reduce our carbon emissions by using renewable energy sources like solar and wind power.

Secondly, pollution is harming our air, water, and soil. Factories and cars release harmful chemicals into the atmosphere. Plastic waste is filling our oceans and harming marine life. We should recycle more and use fewer single-use plastics.

In conclusion, protecting the environment requires immediate action from everyone. By making small changes in our daily lives, we can make a big difference for our planet's future.`;

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      setFeedback({
        score: 85,
        strengths: [
          'Clear thesis statement',
          'Good use of linking words (Firstly, Secondly)',
          'Relevant examples provided',
          'Strong conclusion'
        ],
        improvements: [
          'Add more specific examples and statistics',
          'Vary sentence structure for better flow',
          'Include counterarguments to strengthen position',
          'Expand vocabulary with more sophisticated terms'
        ],
        suggestions: [
          'Consider using "Furthermore" instead of "Secondly"',
          'Replace "serious problems" with "significant challenges"',
          'Add transition sentences between paragraphs'
        ]
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">AI Essay Scorer Demo</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Your Essay (or try our sample)
          </label>
          <textarea
            value={essay}
            onChange={(e) => setEssay(e.target.value)}
            placeholder="Write your essay here or click 'Use Sample Essay' below..."
            className="w-full h-64 p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
          />
          <div className="mt-2 flex gap-2">
            <button
              onClick={() => setEssay(sampleEssay)}
              className="px-4 py-2 text-sm bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500"
            >
              Use Sample Essay
            </button>
            <button
              onClick={handleAnalyze}
              disabled={!essay.trim() || isAnalyzing}
              className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAnalyzing ? 'Analyzing...' : 'Analyze Essay'}
            </button>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">AI Feedback</h4>
          {feedback ? (
            <div className="space-y-4">
              <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Star className="w-5 h-5 text-yellow-500 mr-2" />
                  <span className="font-semibold text-green-800 dark:text-green-300">
                    Score: {feedback.score}/100
                  </span>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                <h5 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Strengths</h5>
                <ul className="space-y-1">
                  {feedback.strengths.map((strength: string, index: number) => (
                    <li key={index} className="flex items-start text-blue-700 dark:text-blue-300">
                      <CheckCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-amber-50 dark:bg-amber-900/30 p-4 rounded-lg">
                <h5 className="font-semibold text-amber-800 dark:text-amber-300 mb-2">Areas for Improvement</h5>
                <ul className="space-y-1">
                  {feedback.improvements.map((improvement: string, index: number) => (
                    <li key={index} className="text-amber-700 dark:text-amber-300 text-sm">
                      • {improvement}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <Brain className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Write or paste an essay above and click "Analyze Essay" to see AI feedback</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function DemoTextTemplates() {
  const [selectedType, setSelectedType] = useState('persuasive');

  const textTypes = {
    persuasive: {
      title: 'Persuasive Essay',
      structure: [
        'Introduction with clear position',
        'Argument 1 with evidence',
        'Argument 2 with evidence',
        'Address counterargument',
        'Strong conclusion'
      ],
      example: 'School uniforms should be mandatory because they promote equality, reduce distractions, and create a sense of community...'
    },
    narrative: {
      title: 'Narrative Writing',
      structure: [
        'Engaging opening',
        'Character introduction',
        'Setting description',
        'Rising action',
        'Climax and resolution'
      ],
      example: 'The old lighthouse stood silently against the stormy sky, its beacon long extinguished...'
    },
    informative: {
      title: 'Informative Text',
      structure: [
        'Clear introduction',
        'Main topic explanation',
        'Supporting details',
        'Examples and evidence',
        'Summary conclusion'
      ],
      example: 'Renewable energy sources are becoming increasingly important in our fight against climate change...'
    }
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Text Type Templates Demo</h3>
      
      <div className="flex gap-2 mb-6">
        {Object.entries(textTypes).map(([key, type]) => (
          <button
            key={key}
            onClick={() => setSelectedType(key)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              selectedType === key
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500'
            }`}
          >
            {type.title}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">Structure Template</h4>
          <ol className="space-y-2">
            {textTypes[selectedType as keyof typeof textTypes].structure.map((item, index) => (
              <li key={index} className="flex items-start text-gray-700 dark:text-gray-300">
                <span className="bg-indigo-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                  {index + 1}
                </span>
                {item}
              </li>
            ))}
          </ol>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">Example Opening</h4>
          <p className="text-gray-700 dark:text-gray-300 italic">
            "{textTypes[selectedType as keyof typeof textTypes].example}"
          </p>
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-md">
            <p className="text-blue-800 dark:text-blue-300 text-sm">
              💡 <strong>Tip:</strong> This template helps you structure your ideas clearly and ensures you include all necessary elements for this text type.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function DemoTimedPractice() {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes
  const [isActive, setIsActive] = useState(false);
  const [essay, setEssay] = useState('');

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startTimer = () => {
    setIsActive(true);
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Timed Practice Demo</h3>
      
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 rounded-lg mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold">Practice Prompt</h4>
            <p className="text-indigo-100">
              "Technology has changed the way we communicate. Write a persuasive essay arguing whether this change has been positive or negative for society."
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{formatTime(timeLeft)}</div>
            <button
              onClick={startTimer}
              disabled={isActive}
              className="btn btn-secondary btn-sm mt-2"
            >
              {isActive ? 'In Progress' : 'Start Timer'}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <textarea
            value={essay}
            onChange={(e) => setEssay(e.target.value)}
            placeholder="Start writing your essay here..."
            className="w-full h-64 p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
            disabled={!isActive && timeLeft === 25 * 60}
          />
          <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Word count: {essay.split(' ').filter(word => word.length > 0).length}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h5 className="font-semibold mb-2 text-gray-900 dark:text-white">Quick Tips</h5>
            <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
              <li>• Plan for 5 minutes</li>
              <li>• Write for 18 minutes</li>
              <li>• Review for 2 minutes</li>
              <li>• Aim for 250-300 words</li>
            </ul>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg">
            <h5 className="font-semibold mb-2 text-yellow-800 dark:text-yellow-300">Structure Reminder</h5>
            <ol className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
              <li>1. Introduction + position</li>
              <li>2. Argument 1</li>
              <li>3. Argument 2</li>
              <li>4. Counterargument</li>
              <li>5. Conclusion</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

function DemoVocabularyHelper() {
  const [selectedWord, setSelectedWord] = useState('good');
  
  const vocabularyData = {
    good: {
      alternatives: ['excellent', 'outstanding', 'remarkable', 'exceptional', 'superb'],
      context: 'Instead of "good", try using more specific words that show exactly what you mean.',
      examples: [
        'The movie was excellent (not just good)',
        'She gave an outstanding performance',
        'The results were remarkable'
      ]
    },
    bad: {
      alternatives: ['terrible', 'awful', 'dreadful', 'appalling', 'disastrous'],
      context: 'Replace "bad" with words that show the severity or type of problem.',
      examples: [
        'The weather was terrible (not just bad)',
        'The situation became disastrous',
        'The service was appalling'
      ]
    },
    big: {
      alternatives: ['enormous', 'massive', 'gigantic', 'colossal', 'immense'],
      context: 'Use specific size words to paint a clearer picture for your reader.',
      examples: [
        'The elephant was enormous (not just big)',
        'They faced a massive challenge',
        'The building was colossal'
      ]
    }
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Vocabulary Helper Demo</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">Common Words to Improve</h4>
          <div className="space-y-2">
            {Object.keys(vocabularyData).map((word) => (
              <button
                key={word}
                onClick={() => setSelectedWord(word)}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  selectedWord === word
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <span className="font-medium capitalize">{word}</span>
                <span className="text-sm opacity-75 ml-2">
                  → {vocabularyData[word as keyof typeof vocabularyData].alternatives.length} alternatives
                </span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">
            Better alternatives for "{selectedWord}"
          </h4>
          
          <div className="space-y-4">
            <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
              <h5 className="font-medium text-green-800 dark:text-green-300 mb-2">Suggested Words</h5>
              <div className="flex flex-wrap gap-2">
                {vocabularyData[selectedWord as keyof typeof vocabularyData].alternatives.map((alt, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 rounded-full text-sm font-medium"
                  >
                    {alt}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
              <h5 className="font-medium text-blue-800 dark:text-blue-300 mb-2">Why Change?</h5>
              <p className="text-blue-700 dark:text-blue-300 text-sm">
                {vocabularyData[selectedWord as keyof typeof vocabularyData].context}
              </p>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg">
              <h5 className="font-medium text-purple-800 dark:text-purple-300 mb-2">Examples</h5>
              <ul className="space-y-1">
                {vocabularyData[selectedWord as keyof typeof vocabularyData].examples.map((example, index) => (
                  <li key={index} className="text-purple-700 dark:text-purple-300 text-sm">
                    • {example}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

