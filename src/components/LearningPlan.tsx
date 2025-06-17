import React, { useState, lazy, Suspense } from 'react';

// Enhanced lesson structure with interactive elements
interface LessonData {
  title: string;
  emoji: string;
  category: 'foundation' | 'narrative' | 'persuasive' | 'descriptive' | 'advanced';
  difficulty: 1 | 2 | 3 | 4 | 5;
  estimatedTime: number; // in minutes
  skills: string[];
  prerequisites?: number[];
}

// Comprehensive lesson data
const enhancedLessonsData: { [key: number]: LessonData } = {
  1: { title: "Assessment Criteria", emoji: "📊", category: "foundation", difficulty: 1, estimatedTime: 45, skills: ["Understanding criteria", "Self-assessment"] },
  2: { title: "Sentence Structure", emoji: "🔤", category: "foundation", difficulty: 2, estimatedTime: 50, skills: ["Sentence variety", "Grammar basics"] },
  3: { title: "Paragraph Building", emoji: "📝", category: "foundation", difficulty: 2, estimatedTime: 55, skills: ["Topic sentences", "Supporting details"] },
  4: { title: "Basic Punctuation", emoji: "❓", category: "foundation", difficulty: 1, estimatedTime: 40, skills: ["Comma usage", "End punctuation"] },
  5: { title: "Descriptive Language", emoji: "🎨", category: "foundation", difficulty: 3, estimatedTime: 60, skills: ["Adjectives", "Sensory details"] },
  6: { title: "Narrative Structure", emoji: "📖", category: "narrative", difficulty: 2, estimatedTime: 65, skills: ["Story arc", "Plot structure"], prerequisites: [1, 3] },
  7: { title: "Character Development", emoji: "👤", category: "narrative", difficulty: 3, estimatedTime: 70, skills: ["Character traits", "Dialogue"], prerequisites: [6] },
  8: { title: "Setting & Atmosphere", emoji: "🌅", category: "narrative", difficulty: 3, estimatedTime: 60, skills: ["Scene setting", "Mood creation"], prerequisites: [5] },
  9: { title: "Dialogue Writing", emoji: "💬", category: "narrative", difficulty: 4, estimatedTime: 75, skills: ["Realistic dialogue", "Punctuation"], prerequisites: [4, 7] },
  10: { title: "Plot Development", emoji: "🎬", category: "narrative", difficulty: 4, estimatedTime: 80, skills: ["Conflict", "Resolution"], prerequisites: [6, 7] },
  11: { title: "Show, Don't Tell", emoji: "👁️", category: "narrative", difficulty: 5, estimatedTime: 85, skills: ["Vivid description", "Action over exposition"], prerequisites: [8, 9] },
  12: { title: "Persuasive Writing Basics", emoji: "🎯", category: "persuasive", difficulty: 2, estimatedTime: 55, skills: ["Arguments", "Evidence"], prerequisites: [1, 3] },
  13: { title: "Persuasive Techniques", emoji: "🧠", category: "persuasive", difficulty: 3, estimatedTime: 65, skills: ["Ethos, Pathos, Logos", "Appeals"], prerequisites: [12] },
  14: { title: "Persuasive Essay Structure", emoji: "🏗️", category: "persuasive", difficulty: 3, estimatedTime: 70, skills: ["Thesis statements", "Counter-arguments"], prerequisites: [12, 13] },
  15: { title: "Persuasive Essay Practice", emoji: "✍️", category: "persuasive", difficulty: 4, estimatedTime: 90, skills: ["Full essay writing", "Editing"], prerequisites: [14] },
  16: { title: "Descriptive Writing Basics", emoji: "🖼️", category: "descriptive", difficulty: 2, estimatedTime: 50, skills: ["Observation", "Details"], prerequisites: [5] },
  17: { title: "Setting Description", emoji: "🏞️", category: "descriptive", difficulty: 3, estimatedTime: 60, skills: ["Environment", "Atmosphere"], prerequisites: [16] },
  18: { title: "Character Description", emoji: "👨‍👩‍👧‍👦", category: "descriptive", difficulty: 3, estimatedTime: 55, skills: ["Physical traits", "Personality"], prerequisites: [16] },
  19: { title: "Sensory Details", emoji: "👃", category: "descriptive", difficulty: 4, estimatedTime: 65, skills: ["Five senses", "Immersion"], prerequisites: [17, 18] },
  20: { title: "Advanced Imagery", emoji: "🌟", category: "descriptive", difficulty: 4, estimatedTime: 70, skills: ["Figurative language", "Symbolism"], prerequisites: [19] },
  21: { title: "Metaphors & Similes", emoji: "🔄", category: "advanced", difficulty: 4, estimatedTime: 75, skills: ["Comparisons", "Creative language"], prerequisites: [20] },
  22: { title: "Personification", emoji: "🌳", category: "advanced", difficulty: 4, estimatedTime: 60, skills: ["Human qualities", "Animation"], prerequisites: [20] },
  23: { title: "Mood & Tone", emoji: "🎭", category: "advanced", difficulty: 5, estimatedTime: 80, skills: ["Emotional impact", "Voice"], prerequisites: [21, 22] },
  24: { title: "Descriptive Practice Exam", emoji: "📋", category: "descriptive", difficulty: 5, estimatedTime: 120, skills: ["Timed writing", "Application"], prerequisites: [23] },
  25: { title: "Rhetorical Questions", emoji: "❓", category: "advanced", difficulty: 4, estimatedTime: 55, skills: ["Engagement", "Persuasion"], prerequisites: [13] },
  26: { title: "Counter-Arguments", emoji: "⚖️", category: "advanced", difficulty: 5, estimatedTime: 70, skills: ["Rebuttals", "Critical thinking"], prerequisites: [14, 25] },
  27: { title: "Persuasive Language", emoji: "🗣️", category: "advanced", difficulty: 4, estimatedTime: 65, skills: ["Power words", "Emotional appeal"], prerequisites: [25] },
  28: { title: "Formal vs Informal", emoji: "👔", category: "advanced", difficulty: 3, estimatedTime: 50, skills: ["Register", "Audience awareness"], prerequisites: [27] },
  29: { title: "Persuasive Speech", emoji: "🎤", category: "advanced", difficulty: 5, estimatedTime: 85, skills: ["Oral presentation", "Rhetoric"], prerequisites: [28] },
  30: { title: "Persuasive Practice Exam", emoji: "🏆", category: "persuasive", difficulty: 5, estimatedTime: 120, skills: ["Comprehensive assessment"], prerequisites: [26, 29] }
};

// Badge system
interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  requirement: string;
  category: string;
  points: number;
}

const badges: Badge[] = [
  { id: 'first-step', name: 'First Steps', icon: '🚀', description: 'Started your learning journey', requirement: 'Complete Day 1', category: 'milestone', points: 10 },
  { id: 'foundation-master', name: 'Foundation Master', icon: '🏗️', description: 'Mastered the basics', requirement: 'Complete Days 1-5', category: 'category', points: 50 },
  { id: 'story-teller', name: 'Story Teller', icon: '📚', description: 'Narrative writing expert', requirement: 'Complete Days 6-11', category: 'category', points: 75 },
  { id: 'persuasion-pro', name: 'Persuasion Pro', icon: '🎯', description: 'Master of persuasive writing', requirement: 'Complete Days 12-15', category: 'category', points: 75 },
  { id: 'artist-writer', name: 'Artist Writer', icon: '🎨', description: 'Descriptive writing virtuoso', requirement: 'Complete Days 16-24', category: 'category', points: 100 },
  { id: 'week-warrior', name: 'Week Warrior', icon: '🔥', description: 'Consistent daily learner', requirement: '7-day streak', category: 'streak', points: 25 },
  { id: 'month-master', name: 'Month Master', icon: '👑', description: 'Completed the full program', requirement: 'Complete all 30 days', category: 'completion', points: 200 },
  { id: 'speed-demon', name: 'Speed Demon', icon: '⚡', description: 'Fast learner', requirement: 'Complete 5 lessons in one day', category: 'achievement', points: 30 },
  { id: 'perfectionist', name: 'Perfectionist', icon: '✨', description: 'High achiever', requirement: 'Score 90%+ on 5 practice tasks', category: 'achievement', points: 40 }
];

// Progress tracking interface
interface StudentProgress {
  completedLessons: number[];
  currentStreak: number;
  totalPoints: number;
  earnedBadges: string[];
  lessonScores: { [key: number]: number };
  timeSpent: { [key: number]: number };
  lastActivity: Date;
  preferences: {
    difficulty: 'adaptive' | 'standard' | 'challenge';
    focusAreas: string[];
  };
}

// Enhanced Learning Plan Component
export function EnhancedLearningPlan() {
  const [currentDay, setCurrentDay] = useState(1);
  const [showLessonContent, setShowLessonContent] = useState(false);
  const [studentProgress, setStudentProgress] = useState<StudentProgress>({
    completedLessons: JSON.parse(localStorage.getItem('completedLessons') || '[]'),
    currentStreak: parseInt(localStorage.getItem('currentStreak') || '0'),
    totalPoints: parseInt(localStorage.getItem('totalPoints') || '0'),
    earnedBadges: JSON.parse(localStorage.getItem('earnedBadges') || '[]'),
    lessonScores: JSON.parse(localStorage.getItem('lessonScores') || '{}'),
    timeSpent: JSON.parse(localStorage.getItem('timeSpent') || '{}'),
    lastActivity: new Date(localStorage.getItem('lastActivity') || Date.now()),
    preferences: JSON.parse(localStorage.getItem('learningPreferences') || '{"difficulty":"standard","focusAreas":[]}')
  });
  
  const [showProgressDashboard, setShowProgressDashboard] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Save progress to localStorage
  const saveProgress = (progress: StudentProgress) => {
    setStudentProgress(progress);
    localStorage.setItem('completedLessons', JSON.stringify(progress.completedLessons));
    localStorage.setItem('currentStreak', progress.currentStreak.toString());
    localStorage.setItem('totalPoints', progress.totalPoints.toString());
    localStorage.setItem('earnedBadges', JSON.stringify(progress.earnedBadges));
    localStorage.setItem('lessonScores', JSON.stringify(progress.lessonScores));
    localStorage.setItem('timeSpent', JSON.stringify(progress.timeSpent));
    localStorage.setItem('lastActivity', progress.lastActivity.toISOString());
    localStorage.setItem('learningPreferences', JSON.stringify(progress.preferences));
  };

  // Check and award badges
  const checkBadges = (progress: StudentProgress) => {
    const newBadges: string[] = [];
    
    badges.forEach(badge => {
      if (!progress.earnedBadges.includes(badge.id)) {
        let earned = false;
        
        switch (badge.id) {
          case 'first-step':
            earned = progress.completedLessons.includes(1);
            break;
          case 'foundation-master':
            earned = [1, 2, 3, 4, 5].every(day => progress.completedLessons.includes(day));
            break;
          case 'story-teller':
            earned = [6, 7, 8, 9, 10, 11].every(day => progress.completedLessons.includes(day));
            break;
          case 'persuasion-pro':
            earned = [12, 13, 14, 15].every(day => progress.completedLessons.includes(day));
            break;
          case 'artist-writer':
            earned = [16, 17, 18, 19, 20, 21, 22, 23, 24].every(day => progress.completedLessons.includes(day));
            break;
          case 'week-warrior':
            earned = progress.currentStreak >= 7;
            break;
          case 'month-master':
            earned = progress.completedLessons.length === 30;
            break;
          case 'speed-demon':
            // Check if 5 lessons completed in one day (simplified check)
            earned = progress.completedLessons.length >= 5;
            break;
          case 'perfectionist':
            const highScores = Object.values(progress.lessonScores).filter(score => score >= 90);
            earned = highScores.length >= 5;
            break;
        }
        
        if (earned) {
          newBadges.push(badge.id);
        }
      }
    });
    
    if (newBadges.length > 0) {
      const updatedProgress = {
        ...progress,
        earnedBadges: [...progress.earnedBadges, ...newBadges],
        totalPoints: progress.totalPoints + newBadges.reduce((sum, badgeId) => {
          const badge = badges.find(b => b.id === badgeId);
          return sum + (badge?.points || 0);
        }, 0)
      };
      saveProgress(updatedProgress);
      
      // Show badge notification
      newBadges.forEach(badgeId => {
        const badge = badges.find(b => b.id === badgeId);
        if (badge) {
          showBadgeNotification(badge);
        }
      });
    }
  };

  const showBadgeNotification = (badge: Badge) => {
    // Simple notification - you can enhance this with a proper notification system
    alert(`🎉 Badge Earned: ${badge.icon} ${badge.name}\n${badge.description}\n+${badge.points} points!`);
  };

  const handleDaySelect = (day: number) => {
    setCurrentDay(day);
    setShowLessonContent(true);
    
    // Update last activity
    const updatedProgress = {
      ...studentProgress,
      lastActivity: new Date()
    };
    saveProgress(updatedProgress);
  };

  const markLessonComplete = (day: number, score?: number) => {
    const updatedProgress = {
      ...studentProgress,
      completedLessons: [...new Set([...studentProgress.completedLessons, day])],
      lessonScores: score ? { ...studentProgress.lessonScores, [day]: score } : studentProgress.lessonScores,
      totalPoints: studentProgress.totalPoints + 10, // Base points for completion
      currentStreak: calculateStreak([...studentProgress.completedLessons, day]),
      lastActivity: new Date()
    };
    
    saveProgress(updatedProgress);
    checkBadges(updatedProgress);
  };

  const calculateStreak = (completedLessons: number[]): number => {
    // Simple streak calculation - can be enhanced
    const sortedLessons = completedLessons.sort((a, b) => a - b);
    let streak = 0;
    let expectedDay = Math.max(...sortedLessons);
    
    for (let i = sortedLessons.length - 1; i >= 0; i--) {
      if (sortedLessons[i] === expectedDay) {
        streak++;
        expectedDay--;
      } else {
        break;
      }
    }
    
    return streak;
  };

  const getRecommendedLessons = (): number[] => {
    const completed = studentProgress.completedLessons;
    const available = [];
    
    for (let day = 1; day <= 30; day++) {
      if (!completed.includes(day)) {
        const lesson = enhancedLessonsData[day];
        if (!lesson.prerequisites || lesson.prerequisites.every(req => completed.includes(req))) {
          available.push(day);
        }
      }
    }
    
    return available.slice(0, 3); // Return top 3 recommendations
  };

  const filterLessonsByCategory = (category: string) => {
    if (category === 'all') return Object.keys(enhancedLessonsData).map(Number);
    return Object.entries(enhancedLessonsData)
      .filter(([_, lesson]) => lesson.category === category)
      .map(([day, _]) => parseInt(day));
  };

  const categories = [
    { id: 'all', name: 'All Lessons', icon: '📚' },
    { id: 'foundation', name: 'Foundation', icon: '🏗️' },
    { id: 'narrative', name: 'Narrative', icon: '📖' },
    { id: 'persuasive', name: 'Persuasive', icon: '🎯' },
    { id: 'descriptive', name: 'Descriptive', icon: '🎨' },
    { id: 'advanced', name: 'Advanced', icon: '🚀' }
  ];

  const renderProgressDashboard = () => (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-900">Your Learning Progress</h3>
        <button
          onClick={() => setShowProgressDashboard(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{studentProgress.completedLessons.length}</div>
          <div className="text-sm text-blue-800">Lessons Completed</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-green-600">{studentProgress.currentStreak}</div>
          <div className="text-sm text-green-800">Day Streak</div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-purple-600">{studentProgress.totalPoints}</div>
          <div className="text-sm text-purple-800">Total Points</div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-yellow-600">{studentProgress.earnedBadges.length}</div>
          <div className="text-sm text-yellow-800">Badges Earned</div>
        </div>
      </div>

      {/* Badges Section */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-3">Badges & Achievements</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {badges.map(badge => {
            const earned = studentProgress.earnedBadges.includes(badge.id);
            return (
              <div
                key={badge.id}
                className={`p-3 rounded-lg border-2 text-center transition-all ${
                  earned 
                    ? 'bg-yellow-50 border-yellow-300 shadow-md' 
                    : 'bg-gray-50 border-gray-200 opacity-60'
                }`}
              >
                <div className="text-2xl mb-1">{badge.icon}</div>
                <div className="text-xs font-medium">{badge.name}</div>
                <div className="text-xs text-gray-600 mt-1">+{badge.points}pts</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recommended Lessons */}
      <div>
        <h4 className="text-lg font-semibold mb-3">Recommended Next Steps</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {getRecommendedLessons().map(day => {
            const lesson = enhancedLessonsData[day];
            return (
              <button
                key={day}
                onClick={() => {
                  handleDaySelect(day);
                  setShowProgressDashboard(false);
                }}
                className="p-4 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors text-left"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{lesson.emoji}</span>
                  <div>
                    <div className="font-medium">Day {day}: {lesson.title}</div>
                    <div className="text-sm text-gray-600">{lesson.estimatedTime} minutes</div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderLessonGrid = () => {
    const filteredLessons = filterLessonsByCategory(selectedCategory);
    const groups = [];
    const itemsPerGroup = 6;
    
    for (let i = 0; i < filteredLessons.length; i += itemsPerGroup) {
      const groupLessons = filteredLessons.slice(i, i + itemsPerGroup);
      const groupIndex = Math.floor(i / itemsPerGroup);
      
      groups.push(
        <div key={`group-${groupIndex}`} className="mb-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {groupLessons.map(day => {
              const lesson = enhancedLessonsData[day];
              const isCompleted = studentProgress.completedLessons.includes(day);
              const isAvailable = !lesson.prerequisites || 
                lesson.prerequisites.every(req => studentProgress.completedLessons.includes(req));
              const score = studentProgress.lessonScores[day];
              
              return (
                <button
                  key={day}
                  onClick={() => isAvailable ? handleDaySelect(day) : null}
                  disabled={!isAvailable}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    currentDay === day
                      ? 'bg-blue-100 border-blue-500 shadow-md'
                      : isCompleted
                      ? 'bg-green-50 border-green-300 hover:bg-green-100'
                      : isAvailable
                      ? 'bg-white border-gray-200 hover:bg-blue-50 hover:border-blue-300'
                      : 'bg-gray-100 border-gray-200 opacity-50 cursor-not-allowed'
                  }`}
                >
                  <div className="text-2xl mb-2">{lesson.emoji}</div>
                  <div className="text-xs font-bold">Day {day}</div>
                  <div className="text-xs truncate mb-2">{lesson.title}</div>
                  
                  {/* Difficulty stars */}
                  <div className="flex justify-center mb-1">
                    {Array.from({ length: 5 }, (_, i) => (
                      <span
                        key={i}
                        className={`text-xs ${i < lesson.difficulty ? 'text-yellow-400' : 'text-gray-300'}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  
                  <div className="text-xs text-gray-600">{lesson.estimatedTime}min</div>
                  
                  {/* Status indicators */}
                  {isCompleted && (
                    <div className="mt-2">
                      <div className="text-xs text-green-600">✓ Complete</div>
                      {score && <div className="text-xs text-green-600">{score}%</div>}
                    </div>
                  )}
                  
                  {!isAvailable && lesson.prerequisites && (
                    <div className="text-xs text-red-500 mt-1">
                      Requires: {lesson.prerequisites.join(', ')}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      );
    }
    
    return groups;
  };

  const renderLessonComponent = (day: number) => {
    // This would load your existing lesson components
    // For now, we'll show a placeholder
    return (
      <div className="p-6 bg-white rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Day {day}: {enhancedLessonsData[day].title}</h3>
          <button
            onClick={() => markLessonComplete(day, 85)} // Mock score
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Mark Complete
          </button>
        </div>
        <p className="text-gray-600 mb-4">
          Estimated time: {enhancedLessonsData[day].estimatedTime} minutes
        </p>
        <div className="bg-blue-50 p-4 rounded-lg">
          <p>Lesson content would be loaded here from your existing lesson components.</p>
          <p className="mt-2 text-sm text-gray-600">
            Skills covered: {enhancedLessonsData[day].skills.join(', ')}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Header with progress overview */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">NSW Selective Writing Course</h2>
          <p className="text-gray-600">Master essay writing in 30 structured lessons</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowProgressDashboard(!showProgressDashboard)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
          >
            <span>📊</span>
            <span>Progress</span>
          </button>
          <div className="text-right">
            <div className="text-sm text-gray-600">Progress</div>
            <div className="text-lg font-bold text-blue-600">
              {studentProgress.completedLessons.length}/30
            </div>
          </div>
        </div>
      </div>

      {/* Progress Dashboard */}
      {showProgressDashboard && renderProgressDashboard()}

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${
              selectedCategory === category.id
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            <span>{category.icon}</span>
            <span>{category.name}</span>
          </button>
        ))}
      </div>

      {/* Lesson Grid */}
      {renderLessonGrid()}

      {/* Lesson Content Modal/Panel */}
      {showLessonContent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
              <h3 className="text-xl font-bold">Day {currentDay}: {enhancedLessonsData[currentDay].title}</h3>
              <button
                onClick={() => setShowLessonContent(false)}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ✕
              </button>
            </div>
            {renderLessonComponent(currentDay)}
          </div>
        </div>
      )}
    </div>
  );
}