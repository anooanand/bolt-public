import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Home, 
  BookOpen, 
  Gamepad2, 
  Trophy, 
  Star, 
  Heart, 
  Sparkles, 
  Target, 
  PenTool, 
  Zap, 
  Gift, 
  Crown, 
  Medal, 
  Smile,
  Rocket,
  Rainbow,
  Sun,
  Moon
} from 'lucide-react';

interface KidDashboardProps {
  user?: any;
}

export function KidDashboard({ user: propUser }: KidDashboardProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedCharacter, setSelectedCharacter] = useState('dragon');
  const [currentLevel, setCurrentLevel] = useState(3);
  const [totalXP, setTotalXP] = useState(750);
  const [storiesWritten, setStoriesWritten] = useState(5);
  const [wordsWritten, setWordsWritten] = useState(1250);
  const [streak, setStreak] = useState(3);

  // Use prop user if provided, otherwise use context user
  const currentUser = propUser || user;

  // Character themes with progress tracking
  const characters = {
    dragon: {
      name: 'Sparky the Dragon',
      emoji: '🐲',
      color: 'from-red-400 to-orange-500',
      bgColor: 'from-red-50 to-orange-50',
      borderColor: 'border-red-200'
    },
    unicorn: {
      name: 'Rainbow the Unicorn',
      emoji: '🦄',
      color: 'from-pink-400 to-purple-500',
      bgColor: 'from-pink-50 to-purple-50',
      borderColor: 'border-pink-200'
    },
    wizard: {
      name: 'Wise the Wizard',
      emoji: '🧙‍♂️',
      color: 'from-blue-400 to-indigo-500',
      bgColor: 'from-blue-50 to-indigo-50',
      borderColor: 'border-blue-200'
    },
    robot: {
      name: 'Beep the Robot',
      emoji: '🤖',
      color: 'from-green-400 to-teal-500',
      bgColor: 'from-green-50 to-teal-50',
      borderColor: 'border-green-200'
    }
  };

  const currentCharacter = characters[selectedCharacter];
  const progressToNextLevel = (totalXP % 300) / 300 * 100;

  // Achievement badges
  const achievements = [
    { id: 1, name: 'First Story', emoji: '📝', earned: true, description: 'Wrote your first story!' },
    { id: 2, name: 'Word Wizard', emoji: '✨', earned: true, description: 'Wrote 1000+ words!' },
    { id: 3, name: 'Daily Writer', emoji: '🔥', earned: true, description: '3-day writing streak!' },
    { id: 4, name: 'Creative Mind', emoji: '🎨', earned: false, description: 'Write 5 different story types' },
    { id: 5, name: 'Speed Writer', emoji: '⚡', earned: false, description: 'Write 500 words in one session' },
    { id: 6, name: 'Story Master', emoji: '👑', earned: false, description: 'Complete 10 stories' }
  ];

  const earnedAchievements = achievements.filter(a => a.earned);
  const nextAchievement = achievements.find(a => !a.earned);

  const handleStartWriting = () => {
    navigate('/writing');
  };

  const handlePracticeExam = () => {
    navigate('/exam');
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const getUserName = () => {
    if (currentUser?.email) {
      const emailPart = currentUser.email.split('@')[0];
      return emailPart.charAt(0).toUpperCase() + emailPart.slice(1);
    }
    return 'Little Writer';
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center bg-white rounded-3xl p-12 shadow-xl max-w-md mx-4">
          <div className="text-6xl mb-6">🌟</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Oops!</h2>
          <p className="text-gray-600 text-lg">You need to sign in first to start your writing adventure!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Simple Icon Navigation */}
      <nav className="bg-white shadow-lg border-b-4 border-blue-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center space-x-8 py-4">
            <button 
              onClick={() => handleNavigate('/')}
              className="flex flex-col items-center p-3 rounded-2xl hover:bg-blue-50 transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-500 rounded-2xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                <Home className="h-6 w-6 text-white" />
              </div>
              <span className="text-sm font-bold text-gray-700">Home</span>
            </button>
            
            <button 
              onClick={() => handleNavigate('/writing')}
              className="flex flex-col items-center p-3 rounded-2xl hover:bg-green-50 transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-500 rounded-2xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <span className="text-sm font-bold text-gray-700">Stories</span>
            </button>
            
            <button 
              onClick={() => handleNavigate('/exam')}
              className="flex flex-col items-center p-3 rounded-2xl hover:bg-purple-50 transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-500 rounded-2xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                <Gamepad2 className="h-6 w-6 text-white" />
              </div>
              <span className="text-sm font-bold text-gray-700">Games</span>
            </button>
            
            <button 
              onClick={() => handleNavigate('/achievements')}
              className="flex flex-col items-center p-3 rounded-2xl hover:bg-yellow-50 transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                <Trophy className="h-6 w-6 text-white" />
              </div>
              <span className="text-sm font-bold text-gray-700">Awards</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Kid-Friendly Header with Character */}
        <div className="mb-8">
          <div className={`bg-gradient-to-r ${currentCharacter.bgColor} rounded-3xl p-8 border-2 ${currentCharacter.borderColor} shadow-xl`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="text-8xl mr-6 animate-bounce">
                  {currentCharacter.emoji}
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">
                    Hi {getUserName()}! 🌟
                  </h1>
                  <p className="text-xl text-gray-700 mb-2">
                    {currentCharacter.name} is here to help you write!
                  </p>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center bg-white bg-opacity-70 rounded-full px-4 py-2">
                      <Crown className="h-5 w-5 text-yellow-500 mr-2" />
                      <span className="font-bold text-gray-800">Level {currentLevel}</span>
                    </div>
                    <div className="flex items-center bg-white bg-opacity-70 rounded-full px-4 py-2">
                      <Sparkles className="h-5 w-5 text-purple-500 mr-2" />
                      <span className="font-bold text-gray-800">{totalXP} XP</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Character Selection */}
              <div className="text-center">
                <p className="text-sm font-bold text-gray-700 mb-3">Choose Your Writing Buddy:</p>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(characters).map(([key, char]) => (
                    <button
                      key={key}
                      onClick={() => setSelectedCharacter(key)}
                      className={`text-3xl p-3 rounded-2xl transition-all duration-300 ${
                        selectedCharacter === key 
                          ? 'bg-white shadow-lg scale-110' 
                          : 'bg-white bg-opacity-50 hover:bg-white hover:scale-105'
                      }`}
                    >
                      {char.emoji}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Visual Progress Bar */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-gray-700">Progress to Level {currentLevel + 1}</span>
                <span className="text-sm font-bold text-gray-700">{Math.round(progressToNextLevel)}%</span>
              </div>
              <div className="w-full bg-white bg-opacity-50 rounded-full h-4 overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r ${currentCharacter.color} rounded-full transition-all duration-1000 ease-out`}
                  style={{ width: `${progressToNextLevel}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Large, Colorful Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          
          {/* Start Writing Button */}
          <button 
            onClick={handleStartWriting}
            className="group bg-gradient-to-br from-blue-400 to-purple-500 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 border-4 border-white"
          >
            <div className="text-center text-white">
              <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-opacity-30 transition-all duration-300">
                <PenTool className="h-10 w-10" />
              </div>
              <h3 className="text-3xl font-bold mb-3">Start Writing! ✨</h3>
              <p className="text-xl opacity-90 mb-4">Create amazing stories with your AI buddy</p>
              <div className="flex justify-center space-x-2">
                <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm font-bold">Stories</span>
                <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm font-bold">AI Help</span>
              </div>
            </div>
          </button>

          {/* Practice Games Button */}
          <button 
            onClick={handlePracticeExam}
            className="group bg-gradient-to-br from-green-400 to-teal-500 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 border-4 border-white"
          >
            <div className="text-center text-white">
              <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-opacity-30 transition-all duration-300">
                <Target className="h-10 w-10" />
              </div>
              <h3 className="text-3xl font-bold mb-3">Fun Practice! 🎯</h3>
              <p className="text-xl opacity-90 mb-4">Play games and improve your skills</p>
              <div className="flex justify-center space-x-2">
                <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm font-bold">Games</span>
                <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm font-bold">Skills</span>
              </div>
            </div>
          </button>
        </div>

        {/* Achievement Badges and Rewards */}
        <div className="bg-white rounded-3xl shadow-xl border-2 border-yellow-200 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-400 px-8 py-6">
            <h2 className="text-3xl font-bold text-white flex items-center">
              <Trophy className="h-8 w-8 mr-3" />
              Your Amazing Achievements! 🏆
            </h2>
          </div>
          <div className="p-8">
            
            {/* Earned Badges */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Medal className="h-6 w-6 text-yellow-500 mr-2" />
                Badges You've Earned ({earnedAchievements.length})
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {earnedAchievements.map((achievement) => (
                  <div key={achievement.id} className="text-center group">
                    <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <span className="text-3xl">{achievement.emoji}</span>
                    </div>
                    <h4 className="font-bold text-gray-900 text-sm mb-1">{achievement.name}</h4>
                    <p className="text-xs text-gray-600">{achievement.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Next Achievement */}
            {nextAchievement && (
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Star className="h-6 w-6 text-purple-500 mr-2" />
                  Next Challenge
                </h3>
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full flex items-center justify-center mr-4">
                    <span className="text-2xl opacity-60">{nextAchievement.emoji}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">{nextAchievement.name}</h4>
                    <p className="text-gray-600">{nextAchievement.description}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Progress Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          
          {/* Writing Streak */}
          <div className="bg-white rounded-3xl shadow-lg p-6 border-2 border-orange-200 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Writing Streak</h3>
            <p className="text-4xl font-bold text-orange-600 mb-2">{streak}</p>
            <p className="text-sm text-gray-600">days in a row! 🔥</p>
          </div>
          
          {/* Stories Created */}
          <div className="bg-white rounded-3xl shadow-lg p-6 border-2 border-blue-200 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Stories</h3>
            <p className="text-4xl font-bold text-blue-600 mb-2">{storiesWritten}</p>
            <p className="text-sm text-gray-600">amazing stories! 📚</p>
          </div>
          
          {/* Words Written */}
          <div className="bg-white rounded-3xl shadow-lg p-6 border-2 border-green-200 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-teal-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <PenTool className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Words</h3>
            <p className="text-4xl font-bold text-green-600 mb-2">{wordsWritten.toLocaleString()}</p>
            <p className="text-sm text-gray-600">words written! ✨</p>
          </div>
          
          {/* Fun Level */}
          <div className="bg-white rounded-3xl shadow-lg p-6 border-2 border-purple-200 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <Smile className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Fun Level</h3>
            <p className="text-4xl font-bold text-purple-600 mb-2">MAX!</p>
            <p className="text-sm text-gray-600">having a blast! 🎉</p>
          </div>
        </div>

        {/* Encouragement Section */}
        <div className="bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 rounded-3xl p-8 border-2 border-pink-200 text-center">
          <div className="flex items-center justify-center mb-6">
            <Heart className="h-8 w-8 text-pink-500 mr-2" />
            <Sparkles className="h-10 w-10 text-purple-500" />
            <Heart className="h-8 w-8 text-pink-500 ml-2" />
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-4">You're an Amazing Writer! 🌟</h3>
          <p className="text-gray-700 text-xl max-w-3xl mx-auto mb-6">
            Every story you write makes you stronger and more creative! Keep exploring, keep dreaming, 
            and remember - your imagination has no limits! 
          </p>
          <div className="flex justify-center space-x-4">
            <button 
              onClick={handleStartWriting}
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-4 rounded-2xl hover:from-pink-600 hover:to-purple-600 transition-all duration-300 font-bold text-lg shadow-lg transform hover:scale-105"
            >
              🚀 Write Another Story!
            </button>
            <button 
              onClick={handlePracticeExam}
              className="bg-gradient-to-r from-blue-500 to-teal-500 text-white px-8 py-4 rounded-2xl hover:from-blue-600 hover:to-teal-600 transition-all duration-300 font-bold text-lg shadow-lg transform hover:scale-105"
            >
              🎮 Play Writing Games!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default KidDashboard;

