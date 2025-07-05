import React from 'react';
import { Star, Trophy, Sparkles } from 'lucide-react';

interface KidFriendlyHeaderProps {
  studentName: string;
  points: number;
  level: number;
  currentBadges: string[];
  onProfileClick?: () => void;
}

export function KidFriendlyHeader({ 
  studentName, 
  points, 
  level, 
  currentBadges, 
  onProfileClick 
}: KidFriendlyHeaderProps) {
  const getProgressToNextLevel = () => {
    const pointsForNextLevel = level * 100;
    const currentLevelPoints = (level - 1) * 100;
    const progress = ((points - currentLevelPoints) / (pointsForNextLevel - currentLevelPoints)) * 100;
    return Math.min(Math.max(progress, 0), 100);
  };

  return (
    <header className="bg-gradient-to-r from-primary-400 via-fun-400 to-magic-400 text-white shadow-bounce">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Welcome */}
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center animate-bounce-gentle">
              <Sparkles className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-kid-xl font-display font-bold">
                Hi there, {studentName}! 👋
              </h1>
              <p className="text-kid-sm font-body opacity-90">
                Ready to write something amazing today?
              </p>
            </div>
          </div>

          {/* Stats and Progress */}
          <div className="flex items-center space-x-6">
            {/* Points */}
            <div className="flex items-center space-x-2">
              <Star className="h-6 w-6 text-sunshine-300 fill-current" />
              <span className="text-kid-lg font-display font-bold">
                {points} points
              </span>
            </div>

            {/* Level */}
            <div className="flex items-center space-x-2">
              <Trophy className="h-6 w-6 text-sunshine-300" />
              <span className="text-kid-lg font-display font-bold">
                Level {level}
              </span>
            </div>

            {/* Profile Button */}
            <button
              onClick={onProfileClick}
              className="w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors group"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-sunshine-400 to-primary-400 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-white font-display font-bold text-kid-sm">
                  {studentName.charAt(0).toUpperCase()}
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-kid-sm font-body mb-2">
            <span>Progress to Level {level + 1}</span>
            <span>{Math.round(getProgressToNextLevel())}%</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-sunshine-400 to-success-400 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${getProgressToNextLevel()}%` }}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
