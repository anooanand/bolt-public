import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface LearningProgress {
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

interface LearningContextType {
  progress: LearningProgress;
  updateProgress: (updates: Partial<LearningProgress>) => void;
  completeLesson: (day: number, score: number, timeSpent: number) => void;
  earnBadge: (badgeId: string) => void;
  resetProgress: () => void;
  getRecommendations: () => number[];
}

const LearningContext = createContext<LearningContextType | undefined>(undefined);

const initialProgress: LearningProgress = {
  completedLessons: [],
  currentStreak: 0,
  totalPoints: 0,
  earnedBadges: [],
  lessonScores: {},
  timeSpent: {},
  lastActivity: new Date(),
  preferences: {
    difficulty: 'standard',
    focusAreas: []
  }
};

export function LearningProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<LearningProgress>(initialProgress);

  // Load progress from localStorage on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('learningProgress');
    if (savedProgress) {
      try {
        const parsed = JSON.parse(savedProgress);
        setProgress({
          ...parsed,
          lastActivity: new Date(parsed.lastActivity)
        });
      } catch (error) {
        console.error('Error loading learning progress:', error);
      }
    }
  }, []);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('learningProgress', JSON.stringify(progress));
  }, [progress]);

  const updateProgress = (updates: Partial<LearningProgress>) => {
    setProgress(prev => ({ ...prev, ...updates, lastActivity: new Date() }));
  };

  const completeLesson = (day: number, score: number, timeSpent: number) => {
    setProgress(prev => {
      const newCompletedLessons = [...new Set([...prev.completedLessons, day])];
      const newLessonScores = { ...prev.lessonScores, [day]: score };
      const newTimeSpent = { ...prev.timeSpent, [day]: timeSpent };
      const pointsEarned = Math.round(score * 0.5); // Convert percentage to points
      
      return {
        ...prev,
        completedLessons: newCompletedLessons,
        lessonScores: newLessonScores,
        timeSpent: newTimeSpent,
        totalPoints: prev.totalPoints + pointsEarned,
        currentStreak: calculateStreak(newCompletedLessons),
        lastActivity: new Date()
      };
    });
  };

  const earnBadge = (badgeId: string) => {
    setProgress(prev => ({
      ...prev,
      earnedBadges: [...new Set([...prev.earnedBadges, badgeId])],
      lastActivity: new Date()
    }));
  };

  const resetProgress = () => {
    setProgress(initialProgress);
    localStorage.removeItem('learningProgress');
  };

  const calculateStreak = (completedLessons: number[]): number => {
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

  const getRecommendations = (): number[] => {
    const completed = progress.completedLessons;
    const available = [];
    
    // Define lesson prerequisites
    const prerequisites: { [key: number]: number[] } = {
      6: [1, 3], // Narrative Structure needs Assessment Criteria and Paragraph Building
      7: [6], // Character Development needs Narrative Structure
      9: [4, 7], // Dialogue Writing needs Basic Punctuation and Character Development
      10: [6, 7], // Plot Development needs Narrative Structure and Character Development
      11: [8, 9], // Show Don't Tell needs Setting & Dialogue
      12: [1, 3], // Persuasive Basics needs Assessment Criteria and Paragraph Building
      13: [12], // Persuasive Techniques needs Persuasive Basics
      14: [12, 13], // Persuasive Essay Structure needs previous persuasive lessons
      15: [14], // Persuasive Practice needs Essay Structure
      16: [5], // Descriptive Basics needs Descriptive Language
      17: [16], // Setting Description needs Descriptive Basics
      18: [16], // Character Description needs Descriptive Basics
      19: [17, 18], // Sensory Details needs both description types
      20: [19], // Advanced Imagery needs Sensory Details
      21: [20], // Metaphors & Similes needs Advanced Imagery
      22: [20], // Personification needs Advanced Imagery
      23: [21, 22], // Mood & Tone needs advanced techniques
      24: [23], // Descriptive Practice Exam needs all descriptive skills
      25: [13], // Rhetorical Questions needs Persuasive Techniques
      26: [14, 25], // Counter-Arguments needs Essay Structure and Rhetorical Questions
      27: [25], // Persuasive Language needs Rhetorical Questions
      28: [27], // Formal vs Informal needs Persuasive Language
      29: [28], // Persuasive Speech needs Formal vs Informal
      30: [26, 29] // Final Practice Exam needs Counter-Arguments and Speech
    };
    
    for (let day = 1; day <= 30; day++) {
      if (!completed.includes(day)) {
        const prereqs = prerequisites[day] || [];
        if (prereqs.length === 0 || prereqs.every(req => completed.includes(req))) {
          available.push(day);
        }
      }
    }
    
    return available.slice(0, 3); // Return top 3 recommendations
  };

  const value: LearningContextType = {
    progress,
    updateProgress,
    completeLesson,
    earnBadge,
    resetProgress,
    getRecommendations
  };

  return (
    <LearningContext.Provider value={value}>
      {children}
    </LearningContext.Provider>
  );
}

export function useLearning() {
  const context = useContext(LearningContext);
  if (context === undefined) {
    throw new Error('useLearning must be used within a LearningProvider');
  }
  return context;
}

// Utility functions for progress calculations
const calculateCompletionRate = (completedLessons: number[]): number => {
  return Math.round((completedLessons.length / 30) * 100);
};

const calculateAverageScore = (lessonScores: { [key: number]: number }): number => {
  const scores = Object.values(lessonScores);
  if (scores.length === 0) return 0;
  return Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length);
};

const getTotalTimeSpent = (timeSpent: { [key: number]: number }): number => {
  return Object.values(timeSpent).reduce((sum, time) => sum + time, 0);
};

const formatTimeSpent = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
};