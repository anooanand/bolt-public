import React, { createContext, useContext, ReactNode } from 'react';
import { Star, Trophy, Award, Target, Zap, Heart } from 'lucide-react';

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  earned: boolean;
  earnedDate?: Date;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  points: number;
  unlocked: boolean;
  unlockedDate?: Date;
}

export interface GamificationState {
  totalPoints: number;
  level: number;
  badges: Badge[];
  achievements: Achievement[];
  streakDays: number;
  wordsWritten: number;
  storiesCompleted: number;
  perfectGrammarCount: number;
}

interface GamificationContextType {
  state: GamificationState;
  updateState: (newState: GamificationState) => void;
}

const GamificationContext = createContext<GamificationContextType | undefined>(undefined);

export function useGamification() {
  const context = useContext(GamificationContext);
  if (!context) {
    throw new Error('useGamification must be used within a GamificationSystem');
  }
  return context;
}

interface GamificationSystemProps {
  children: ReactNode;
  state: GamificationState;
  onStateUpdate: (state: GamificationState) => void;
}

export function GamificationSystem({ children, state, onStateUpdate }: GamificationSystemProps) {
  return (
    <GamificationContext.Provider value={{ state, updateState: onStateUpdate }}>
      {children}
    </GamificationContext.Provider>
  );
}

// Progress Tracker Component
interface ProgressTrackerProps {
  state: GamificationState;
}

export function ProgressTracker({ state }: ProgressTrackerProps) {
  const getProgressToNextLevel = () => {
    const pointsForNextLevel = state.level * 100;
    const currentLevelPoints = (state.level - 1) * 100;
    const progress = ((state.totalPoints - currentLevelPoints) / (pointsForNextLevel - currentLevelPoints)) * 100;
    return Math.min(Math.max(progress, 0), 100);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-kid-2xl font-display font-bold text-neutral-800 mb-2">
          Your Amazing Progress! 📈
        </h2>
        <p className="text-kid-lg font-body text-neutral-600">
          Look how much you've grown as a writer!
        </p>
      </div>

      {/* Level Progress */}
      <div className="bg-white rounded-kid-lg p-6 shadow-fun border-2 border-primary-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-kid-lg font-display font-bold text-neutral-800">
            Level Progress
          </h3>
          <div className="flex items-center space-x-2">
            <Trophy className="h-6 w-6 text-sunshine-600" />
            <span className="text-kid-lg font-display font-bold text-sunshine-600">
              Level {state.level}
            </span>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-kid-sm font-body text-neutral-600">
            <span>Progress to Level {state.level + 1}</span>
            <span>{Math.round(getProgressToNextLevel())}%</span>
          </div>
          <div className="w-full bg-neutral-200 rounded-full h-4 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary-400 to-success-400 rounded-full transition-all duration-500"
              style={{ width: `${getProgressToNextLevel()}%` }}
            />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-kid p-4 shadow-fun border-2 border-primary-100 text-center">
          <Star className="h-8 w-8 text-primary-600 mx-auto mb-2" />
          <div className="text-kid-2xl font-bold text-primary-600 mb-1">
            {state.totalPoints}
          </div>
          <div className="text-kid-sm font-body text-neutral-600">Total Points</div>
        </div>

        <div className="bg-white rounded-kid p-4 shadow-fun border-2 border-success-100 text-center">
          <Target className="h-8 w-8 text-success-600 mx-auto mb-2" />
          <div className="text-kid-2xl font-bold text-success-600 mb-1">
            {state.wordsWritten}
          </div>
          <div className="text-kid-sm font-body text-neutral-600">Words Written</div>
        </div>

        <div className="bg-white rounded-kid p-4 shadow-fun border-2 border-magic-100 text-center">
          <Award className="h-8 w-8 text-magic-600 mx-auto mb-2" />
          <div className="text-kid-2xl font-bold text-magic-600 mb-1">
            {state.storiesCompleted}
          </div>
          <div className="text-kid-sm font-body text-neutral-600">Stories Done</div>
        </div>

        <div className="bg-white rounded-kid p-4 shadow-fun border-2 border-sunshine-100 text-center">
          <Zap className="h-8 w-8 text-sunshine-600 mx-auto mb-2" />
          <div className="text-kid-2xl font-bold text-sunshine-600 mb-1">
            {state.streakDays}
          </div>
          <div className="text-kid-sm font-body text-neutral-600">Day Streak</div>
        </div>
      </div>
    </div>
  );
}

// Badges Display Component
interface BadgesDisplayProps {
  badges: Badge[];
}

export function BadgesDisplay({ badges }: BadgesDisplayProps) {
  const earnedBadges = badges.filter(badge => badge.earned);
  const availableBadges = badges.filter(badge => !badge.earned);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-kid-2xl font-display font-bold text-neutral-800 mb-2">
          Your Badge Collection! 🏆
        </h2>
        <p className="text-kid-lg font-body text-neutral-600">
          You've earned {earnedBadges.length} out of {badges.length} badges!
        </p>
      </div>

      {/* Earned Badges */}
      {earnedBadges.length > 0 && (
        <div>
          <h3 className="text-kid-xl font-display font-bold text-neutral-800 mb-4">
            Badges You've Earned ✨
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {earnedBadges.map((badge) => (
              <div
                key={badge.id}
                className={`
                  bg-gradient-to-br from-${badge.color}-400 to-${badge.color}-600
                  text-white p-4 rounded-kid-lg shadow-bounce text-center
                  hover:scale-105 transition-transform duration-300
                `}
              >
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  {badge.icon}
                </div>
                <h4 className="text-kid-base font-display font-bold mb-1">
                  {badge.name}
                </h4>
                <p className="text-kid-sm font-body opacity-90">
                  {badge.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Available Badges */}
      {availableBadges.length > 0 && (
        <div>
          <h3 className="text-kid-xl font-display font-bold text-neutral-800 mb-4">
            Badges to Earn 🎯
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {availableBadges.map((badge) => (
              <div
                key={badge.id}
                className="bg-white border-2 border-neutral-200 p-4 rounded-kid-lg shadow-fun text-center opacity-75 hover:opacity-100 transition-opacity duration-300"
              >
                <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <div className="text-neutral-400">
                    {badge.icon}
                  </div>
                </div>
                <h4 className="text-kid-base font-display font-bold text-neutral-600 mb-1">
                  {badge.name}
                </h4>
                <p className="text-kid-sm font-body text-neutral-500">
                  {badge.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
