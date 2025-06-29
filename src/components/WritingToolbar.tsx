import React, { useState, useEffect } from 'react';
import {
  PenTool,
  CheckCircle,
  BookOpen,
  Lightbulb,
  FileText,
  Sparkles,
  Target,
  ChevronDown,
  ChevronUp,
  Star,
  Heart,
  Zap,
  Award,
  HelpCircle,
  Play,
  Pause,
  RotateCcw,
  Save,
  Eye,
  Volume2,
  VolumeX
} from 'lucide-react';

interface Tool {
  id: string;
  label: string;
  kidFriendlyLabel: string;
  description: string;
  icon: React.ComponentType<any>;
  action: () => void;
  helpText: string;
  category: 'writing' | 'planning' | 'checking' | 'fun';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

interface ToolGroup {
  id: string;
  title: string;
  description: string;
  tools: Tool[];
  icon: React.ComponentType<any>;
  priority: 'primary' | 'secondary' | 'advanced';
  color: string;
}

interface WritingToolbarProps {
  content: string;
  textType: string;
  onShowHelpCenter: () => void;
  onShowPlanningTool: () => void;
  onTimerStart: (shouldStart: boolean) => void;
  onCheckWriting?: () => void;
  onShowVocabulary?: () => void;
  onShowExamples?: () => void;
  onGeneratePrompt?: () => void;
  onSave?: () => void;
  onTextToSpeech?: () => void;
}

export function WritingToolbar({
  content,
  textType,
  onShowHelpCenter,
  onShowPlanningTool,
  onTimerStart,
  onCheckWriting,
  onShowVocabulary,
  onShowExamples,
  onGeneratePrompt,
  onSave,
  onTextToSpeech
}: KidFriendlyToolbarProps) {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set(['writing-helpers']));
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);
  const [userLevel, setUserLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Determine user level based on content length and complexity
  useEffect(() => {
    const wordCount = content.split(/\s+/).filter(word => word.length > 0).length;
    const sentenceCount = content.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    const avgWordsPerSentence = sentenceCount > 0 ? wordCount / sentenceCount : 0;

    if (wordCount > 200 && avgWordsPerSentence > 8) {
      setUserLevel('advanced');
    } else if (wordCount > 50 && avgWordsPerSentence > 5) {
      setUserLevel('intermediate');
    } else {
      setUserLevel('beginner');
    }
  }, [content]);

  const playSound = (type: 'click' | 'success' | 'error') => {
    if (!soundEnabled) return;
    
    // Create audio context for sound feedback
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    const frequencies = {
      click: 800,
      success: 1000,
      error: 400
    };
    
    oscillator.frequency.setValueAtTime(frequencies[type], audioContext.currentTime);
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  };

  const handleToolClick = (tool: Tool) => {
    playSound('click');
    tool.action();
  };

  const toggleGroup = (groupId: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(groupId)) {
      newExpanded.delete(groupId);
    } else {
      newExpanded.add(groupId);
    }
    setExpandedGroups(newExpanded);
    playSound('click');
  };

  const handleTimerToggle = () => {
    const newState = !isTimerRunning;
    setIsTimerRunning(newState);
    onTimerStart(newState);
    playSound(newState ? 'success' : 'click');
  };

  // Kid-friendly tool groups with enhanced organization
  const kidFriendlyToolGroups: ToolGroup[] = [
    {
      id: 'writing-helpers',
      title: 'Writing Helpers',
      description: 'Tools to make your writing sparkle and shine! ✨',
      priority: 'primary',
      icon: PenTool,
      color: 'blue',
      tools: [
        {
          id: 'check-writing',
          label: 'Check',
          kidFriendlyLabel: 'Check My Writing',
          description: 'Let me help you make your writing amazing!',
          icon: CheckCircle,
          action: onCheckWriting || (() => {}),
          helpText: 'I\'ll look for ways to make your writing even better and give you helpful suggestions!',
          category: 'checking',
          difficulty: 'beginner'
        },
        {
          id: 'vocabulary',
          label: 'Vocabulary',
          kidFriendlyLabel: 'Find Cool Words',
          description: 'Discover exciting words to make your writing more colorful!',
          icon: BookOpen,
          action: onShowVocabulary || (() => {}),
          helpText: 'Click on any word in your writing, and I\'ll suggest some awesome alternatives!',
          category: 'writing',
          difficulty: 'intermediate'
        },
        {
          id: 'examples',
          label: 'Examples',
          kidFriendlyLabel: 'See Examples',
          description: 'Look at examples to spark your creativity!',
          icon: Lightbulb,
          action: onShowExamples || (() => {}),
          helpText: 'Check out some example writing to get ideas for your own masterpiece!',
          category: 'writing',
          difficulty: 'beginner'
        },
        {
          id: 'text-to-speech',
          label: 'Listen',
          kidFriendlyLabel: 'Hear My Writing',
          description: 'Listen to your writing read aloud!',
          icon: Volume2,
          action: onTextToSpeech || (() => {}),
          helpText: 'Hearing your writing can help you catch mistakes and improve flow!',
          category: 'checking',
          difficulty: 'beginner'
        }
      ]
    },
    {
      id: 'planning-tools',
      title: 'Planning & Ideas',
      description: 'Get organized and brainstorm brilliant ideas! 🧠',
      priority: 'secondary',
      icon: Target,
      color: 'green',
      tools: [
        {
          id: 'planning',
          label: 'Plan',
          kidFriendlyLabel: 'Plan My Story',
          description: 'Let\'s organize your thoughts before you start writing!',
          icon: FileText,
          action: onShowPlanningTool,
          helpText: 'Planning helps you organize your ideas so your writing flows perfectly!',
          category: 'planning',
          difficulty: 'intermediate'
        },
        {
          id: 'new-prompt',
          label: 'New Prompt',
          kidFriendlyLabel: 'Get New Ideas',
          description: 'Need a fresh idea? I\'ve got tons of creative prompts!',
          icon: Sparkles,
          action: onGeneratePrompt || (() => {}),
          helpText: 'If you\'re stuck, I can give you a brand new writing idea to explore!',
          category: 'planning',
          difficulty: 'beginner'
        },
        {
          id: 'timer',
          label: 'Timer',
          kidFriendlyLabel: isTimerRunning ? 'Stop Timer' : 'Start Timer',
          description: isTimerRunning ? 'Stop your writing session' : 'Start a focused writing session!',
          icon: isTimerRunning ? Pause : Play,
          action: handleTimerToggle,
          helpText: 'Set a timer to help you focus and write without distractions!',
          category: 'planning',
          difficulty: 'intermediate'
        }
      ]
    },
    {
      id: 'fun-tools',
      title: 'Fun Tools',
      description: 'Make writing even more enjoyable! 🎉',
      priority: 'secondary',
      icon: Star,
      color: 'purple',
      tools: [
        {
          id: 'save',
          label: 'Save',
          kidFriendlyLabel: 'Save My Work',
          description: 'Keep your amazing writing safe!',
          icon: Save,
          action: onSave || (() => {}),
          helpText: 'Save your work so you never lose your brilliant ideas!',
          category: 'fun',
          difficulty: 'beginner'
        },
        {
          id: 'preview',
          label: 'Preview',
          kidFriendlyLabel: 'See How It Looks',
          description: 'Preview your writing like a real book!',
          icon: Eye,
          action: () => {},
          helpText: 'See how your writing would look when published!',
          category: 'fun',
          difficulty: 'intermediate'
        },
        {
          id: 'help',
          label: 'Help',
          kidFriendlyLabel: 'Get Help',
          description: 'Need help? I\'m here for you!',
          icon: HelpCircle,
          action: onShowHelpCenter,
          helpText: 'Get tips, tricks, and answers to all your writing questions!',
          category: 'fun',
          difficulty: 'beginner'
        }
      ]
    }
  ];

  // Filter tools based on user level
  const getFilteredTools = (tools: Tool[]) => {
    const levelOrder = { beginner: 0, intermediate: 1, advanced: 2 };
    const currentLevelIndex = levelOrder[userLevel];
    
    return tools.filter(tool => levelOrder[tool.difficulty] <= currentLevelIndex);
  };

  const ToolButton: React.FC<{ tool: Tool; groupColor: string }> = ({ tool, groupColor }) => {
    const colorClasses = {
      blue: 'bg-blue-500 hover:bg-blue-600 border-blue-300',
      green: 'bg-green-500 hover:bg-green-600 border-green-300',
      purple: 'bg-purple-500 hover:bg-purple-600 border-purple-300',
      yellow: 'bg-yellow-500 hover:bg-yellow-600 border-yellow-300',
      red: 'bg-red-500 hover:bg-red-600 border-red-300'
    };

    return (
      <div className="relative">
        <button
          onClick={() => handleToolClick(tool)}
          onMouseEnter={() => setShowTooltip(tool.id)}
          onMouseLeave={() => setShowTooltip(null)}
          onFocus={() => setShowTooltip(tool.id)}
          onBlur={() => setShowTooltip(null)}
          className={`
            w-full flex items-center justify-center p-4 text-white rounded-xl text-sm font-medium
            transition-all duration-200 transform hover:scale-105 hover:shadow-lg
            border-2 ${colorClasses[groupColor] || colorClasses.blue}
            min-h-[60px] touch-target
          `}
        >
          <tool.icon className="w-5 h-5 mr-2 flex-shrink-0" />
          <span className="text-center leading-tight">{tool.kidFriendlyLabel}</span>
        </button>
        
        {showTooltip === tool.id && (
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-4 py-3 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap z-20 max-w-xs">
            <div className="font-medium mb-1">{tool.description}</div>
            <div className="text-xs opacity-80">{tool.helpText}</div>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
          </div>
        )}
      </div>
    );
  };

  const GroupHeader: React.FC<{ group: ToolGroup }> = ({ group }) => {
    const isExpanded = expandedGroups.has(group.id);
    const colorClasses = {
      blue: 'bg-blue-50 hover:bg-blue-100 text-blue-800 border-blue-200',
      green: 'bg-green-50 hover:bg-green-100 text-green-800 border-green-200',
      purple: 'bg-purple-50 hover:bg-purple-100 text-purple-800 border-purple-200'
    };

    return (
      <button
        onClick={() => toggleGroup(group.id)}
        className={`
          w-full flex items-center justify-between p-4 rounded-xl transition-all duration-200
          border-2 ${colorClasses[group.color] || colorClasses.blue}
          hover:shadow-md touch-target
        `}
      >
        <div className="flex items-center">
          <group.icon className="w-6 h-6 mr-3" />
          <div className="text-left">
            <div className="font-bold text-lg">{group.title}</div>
            <div className="text-sm opacity-80">{group.description}</div>
          </div>
        </div>
        <div className="flex items-center ml-4">
          {group.priority === 'primary' && (
            <Star className="w-5 h-5 text-yellow-500 mr-2" />
          )}
          {isExpanded ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </div>
      </button>
    );
  };

  return (
    <div className="kid-toolbar bg-gradient-to-r from-gray-50 to-white border-b-2 border-gray-200 p-6">
      {/* Toolbar Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Heart className="w-6 h-6 text-red-500 mr-3" />
          <h2 className="text-2xl font-bold text-gray-800">Writing Tools</h2>
          <div className="ml-4 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            {userLevel.charAt(0).toUpperCase() + userLevel.slice(1)} Writer
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          {/* Sound Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`
              p-2 rounded-lg transition-colors touch-target
              ${soundEnabled ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}
            `}
            title={soundEnabled ? 'Sound On' : 'Sound Off'}
          >
            {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>
          
          {/* Progress Indicator */}
          <div className="flex items-center space-x-2 bg-white rounded-lg px-4 py-2 border-2 border-gray-200">
            <Award className="w-5 h-5 text-yellow-500" />
            <span className="font-medium text-gray-700">
              {content.split(/\s+/).filter(word => word.length > 0).length} words
            </span>
          </div>
        </div>
      </div>

      {/* Tool Groups */}
      <div className="space-y-6">
        {kidFriendlyToolGroups.map(group => {
          const isExpanded = expandedGroups.has(group.id);
          const filteredTools = getFilteredTools(group.tools);
          
          return (
            <div key={group.id} className="tool-group">
              <GroupHeader group={group} />
              
              {isExpanded && (
                <div className="mt-4 transition-all duration-300">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredTools.map(tool => (
                      <ToolButton key={tool.id} tool={tool} groupColor={group.color} />
                    ))}
                  </div>
                  
                  {filteredTools.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <Zap className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p>More tools will unlock as you write more!</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Quick Actions Bar for Mobile */}
      <div className="mt-6 lg:hidden">
        <div className="bg-white rounded-xl border-2 border-gray-200 p-4">
          <h3 className="font-bold text-gray-800 mb-3 text-center">Quick Actions</h3>
          <div className="flex justify-around">
            <button
              onClick={() => handleToolClick(kidFriendlyToolGroups[0].tools[0])}
              className="flex flex-col items-center p-3 rounded-lg bg-blue-500 text-white touch-target"
            >
              <CheckCircle className="w-6 h-6 mb-1" />
              <span className="text-xs">Check</span>
            </button>
            
            <button
              onClick={onShowPlanningTool}
              className="flex flex-col items-center p-3 rounded-lg bg-green-500 text-white touch-target"
            >
              <FileText className="w-6 h-6 mb-1" />
              <span className="text-xs">Plan</span>
            </button>
            
            <button
              onClick={handleTimerToggle}
              className={`flex flex-col items-center p-3 rounded-lg text-white touch-target ${
                isTimerRunning ? 'bg-red-500' : 'bg-purple-500'
              }`}
            >
              {isTimerRunning ? <Pause className="w-6 h-6 mb-1" /> : <Play className="w-6 h-6 mb-1" />}
              <span className="text-xs">{isTimerRunning ? 'Stop' : 'Timer'}</span>
            </button>
            
            <button
              onClick={onShowHelpCenter}
              className="flex flex-col items-center p-3 rounded-lg bg-yellow-500 text-white touch-target"
            >
              <HelpCircle className="w-6 h-6 mb-1" />
              <span className="text-xs">Help</span>
            </button>
          </div>
        </div>
      </div>

      {/* Encouragement Message */}
      {content.length > 0 && (
        <div className="mt-6 p-4 bg-gradient-to-r from-green-100 to-blue-100 rounded-xl border-2 border-green-200">
          <div className="flex items-center">
            <Star className="w-6 h-6 text-yellow-500 mr-3" />
            <div>
              <div className="font-bold text-green-800">You're doing amazing!</div>
              <div className="text-sm text-green-700">
                Keep writing - every word makes you a better storyteller! 🌟
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

