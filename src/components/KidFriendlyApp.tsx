import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { KidFriendlyHeader } from './KidFriendlyHeader';
import { KidFriendlyWritingArea } from './KidFriendlyWritingArea';
import { GamificationSystem, ProgressTracker, BadgesDisplay, GamificationState } from './GamificationSystem';
import { WritingTypeSelector } from './WritingTypeSelector';
import { Sparkles, BookOpen, Trophy, Settings, Home } from 'lucide-react';

// Default gamification state
const defaultGamificationState: GamificationState = {
  totalPoints: 0,
  level: 1,
  badges: [],
  achievements: [],
  streakDays: 0,
  wordsWritten: 0,
  storiesCompleted: 0,
  perfectGrammarCount: 0
};

export function KidFriendlyApp() {
  const [currentPage, setCurrentPage] = useState<'home' | 'writing' | 'progress' | 'badges'>('home');
  const [studentName, setStudentName] = useState('Young Writer');
  const [gamificationState, setGamificationState] = useState<GamificationState>(defaultGamificationState);
  
  // Writing state
  const [content, setContent] = useState('');
  const [textType, setTextType] = useState('');
  const [showWelcome, setShowWelcome] = useState(true);

  // Load saved data on mount
  useEffect(() => {
    const savedName = localStorage.getItem('studentName');
    const savedGamification = localStorage.getItem('gamificationState');
    const savedContent = localStorage.getItem('currentWriting');
    const savedTextType = localStorage.getItem('currentTextType');

    if (savedName) setStudentName(savedName);
    if (savedGamification) {
      try {
        setGamificationState(JSON.parse(savedGamification));
      } catch (e) {
        console.error('Failed to parse saved gamification state');
      }
    }
    if (savedContent) setContent(savedContent);
    if (savedTextType) setTextType(savedTextType);

    // Check if user has been here before
    const hasVisited = localStorage.getItem('hasVisited');
    if (hasVisited) {
      setShowWelcome(false);
    }
  }, []);

  // Save data when it changes
  useEffect(() => {
    localStorage.setItem('gamificationState', JSON.stringify(gamificationState));
  }, [gamificationState]);

  useEffect(() => {
    localStorage.setItem('currentWriting', content);
  }, [content]);

  useEffect(() => {
    localStorage.setItem('currentTextType', textType);
  }, [textType]);

  const handleGamificationUpdate = (newState: GamificationState) => {
    setGamificationState(newState);
  };

  const handleGetStarted = () => {
    localStorage.setItem('hasVisited', 'true');
    setShowWelcome(false);
    setCurrentPage('writing');
  };

  const handleNameChange = (name: string) => {
    setStudentName(name);
    localStorage.setItem('studentName', name);
  };

  // Welcome screen for first-time users
  if (showWelcome) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-400 via-fun-400 to-magic-400 flex items-center justify-center p-4">
        <div className="bg-white rounded-kid-xl p-8 max-w-2xl mx-auto text-center shadow-bounce">
          <div className="mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-sunshine-400 to-primary-400 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-gentle">
              <Sparkles className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-kid-3xl font-display font-bold text-neutral-800 mb-2">
              Welcome to Writing Adventures! 🚀
            </h1>
            <p className="text-kid-lg font-body text-neutral-600 mb-6">
              Get ready to become an amazing writer! We'll help you create incredible stories, 
              learn new words, and have tons of fun along the way!
            </p>
          </div>

          <div className="mb-6">
            <label className="block text-kid-lg font-display font-bold text-neutral-800 mb-3">
              What should we call you?
            </label>
            <input
              type="text"
              value={studentName}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="Enter your name here!"
              className="
                w-full max-w-sm mx-auto px-4 py-3 border-2 border-primary-200 rounded-kid
                text-kid-lg font-body text-center
                focus:border-primary-400 focus:ring-2 focus:ring-primary-200 focus:outline-none
                transition-colors
              "
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-kid p-4 border-2 border-primary-200">
              <BookOpen className="h-8 w-8 text-primary-600 mx-auto mb-2" />
              <h3 className="text-kid-base font-display font-bold text-neutral-800 mb-1">
                Write Amazing Stories
              </h3>
              <p className="text-kid-sm font-body text-neutral-600">
                Create adventures, fairy tales, and more!
              </p>
            </div>
            <div className="bg-gradient-to-br from-success-50 to-success-100 rounded-kid p-4 border-2 border-success-200">
              <Trophy className="h-8 w-8 text-success-600 mx-auto mb-2" />
              <h3 className="text-kid-base font-display font-bold text-neutral-800 mb-1">
                Earn Cool Badges
              </h3>
              <p className="text-kid-sm font-body text-neutral-600">
                Unlock achievements as you improve!
              </p>
            </div>
            <div className="bg-gradient-to-br from-magic-50 to-magic-100 rounded-kid p-4 border-2 border-magic-200">
              <Sparkles className="h-8 w-8 text-magic-600 mx-auto mb-2" />
              <h3 className="text-kid-base font-display font-bold text-neutral-800 mb-1">
                Get Smart Help
              </h3>
              <p className="text-kid-sm font-body text-neutral-600">
                Friendly coaches guide your writing!
              </p>
            </div>
          </div>

          <button
            onClick={handleGetStarted}
            className="
              bg-gradient-to-r from-primary-500 to-magic-500 hover:from-primary-600 hover:to-magic-600
              text-white font-display font-bold text-kid-xl
              px-8 py-4 rounded-kid-lg shadow-bounce
              hover:scale-105 active:scale-95 transition-all duration-300
              flex items-center space-x-3 mx-auto
            "
          >
            <Sparkles className="h-6 w-6" />
            <span>Let's Start Writing! ✨</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <GamificationSystem state={gamificationState} onStateUpdate={handleGamificationUpdate}>
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-magic-50">
        {/* Header */}
        <KidFriendlyHeader
          studentName={studentName}
          points={gamificationState.totalPoints}
          level={gamificationState.level}
          currentBadges={gamificationState.badges.filter(b => b.earned).map(b => b.id)}
          onProfileClick={() => setCurrentPage('progress')}
        />

        {/* Navigation */}
        <div className="bg-white border-b-2 border-primary-100 shadow-sm">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center space-x-1">
              {[
                { id: 'home', label: 'Home', icon: Home },
                { id: 'writing', label: 'Write', icon: BookOpen },
                { id: 'progress', label: 'Progress', icon: Trophy },
                { id: 'badges', label: 'Badges', icon: Sparkles }
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = currentPage === tab.id;
                
                return (
                  <button
                    key={tab.id}
                    onClick={() => setCurrentPage(tab.id as any)}
                    className={`
                      flex items-center space-x-2 px-4 py-3 rounded-t-kid font-display font-bold text-kid-base
                      transition-all duration-300 hover:scale-105
                      ${isActive 
                        ? 'bg-gradient-to-r from-primary-400 to-magic-400 text-white shadow-fun' 
                        : 'text-neutral-600 hover:text-neutral-800 hover:bg-neutral-50'
                      }
                    `}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main content */}
        <main className="flex-1">
          {currentPage === 'home' && (
            <div className="container mx-auto px-4 py-8 max-w-4xl">
              <div className="text-center mb-8">
                <h1 className="text-kid-3xl font-display font-bold text-neutral-800 mb-4">
                  What would you like to do today, {studentName}? 🌟
                </h1>
                <p className="text-kid-lg font-body text-neutral-600">
                  Choose your next writing adventure!
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <button
                  onClick={() => setCurrentPage('writing')}
                  className="
                    bg-gradient-to-br from-primary-400 to-primary-600 hover:from-primary-500 hover:to-primary-700
                    text-white p-8 rounded-kid-lg shadow-bounce
                    hover:scale-105 active:scale-95 transition-all duration-300
                    text-left group
                  "
                >
                  <BookOpen className="h-12 w-12 mb-4 group-hover:scale-110 transition-transform" />
                  <h2 className="text-kid-2xl font-display font-bold mb-2">
                    Start Writing
                  </h2>
                  <p className="text-kid-base font-body opacity-90">
                    Create amazing stories and practice your writing skills!
                  </p>
                </button>

                <button
                  onClick={() => setCurrentPage('progress')}
                  className="
                    bg-gradient-to-br from-success-400 to-success-600 hover:from-success-500 hover:to-success-700
                    text-white p-8 rounded-kid-lg shadow-bounce
                    hover:scale-105 active:scale-95 transition-all duration-300
                    text-left group
                  "
                >
                  <Trophy className="h-12 w-12 mb-4 group-hover:scale-110 transition-transform" />
                  <h2 className="text-kid-2xl font-display font-bold mb-2">
                    Check Progress
                  </h2>
                  <p className="text-kid-base font-body opacity-90">
                    See how much you've improved and what you've achieved!
                  </p>
                </button>
              </div>

              {/* Recent activity */}
              <div className="mt-8 bg-white rounded-kid-lg p-6 shadow-fun border-2 border-primary-100">
                <h2 className="text-kid-xl font-display font-bold text-neutral-800 mb-4">
                  Your Writing Journey So Far 📈
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-primary-50 rounded-kid">
                    <div className="text-kid-2xl font-bold text-primary-600 mb-1">
                      {gamificationState.totalPoints}
                    </div>
                    <div className="text-kid-sm font-body text-neutral-600">Total Points</div>
                  </div>
                  <div className="text-center p-4 bg-success-50 rounded-kid">
                    <div className="text-kid-2xl font-bold text-success-600 mb-1">
                      {gamificationState.level}
                    </div>
                    <div className="text-kid-sm font-body text-neutral-600">Current Level</div>
                  </div>
                  <div className="text-center p-4 bg-magic-50 rounded-kid">
                    <div className="text-kid-2xl font-bold text-magic-600 mb-1">
                      {gamificationState.wordsWritten}
                    </div>
                    <div className="text-kid-sm font-body text-neutral-600">Words Written</div>
                  </div>
                  <div className="text-center p-4 bg-sunshine-50 rounded-kid">
                    <div className="text-kid-2xl font-bold text-sunshine-600 mb-1">
                      {gamificationState.badges.filter(b => b.earned).length}
                    </div>
                    <div className="text-kid-sm font-body text-neutral-600">Badges Earned</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentPage === 'writing' && (
            <KidFriendlyWritingArea
              content={content}
              onChange={setContent}
              textType={textType}
              onTextTypeChange={setTextType}
              gamificationState={gamificationState}
              onGamificationUpdate={handleGamificationUpdate}
            />
          )}

          {currentPage === 'progress' && (
            <div className="container mx-auto px-4 py-8 max-w-4xl">
              <ProgressTracker state={gamificationState} />
            </div>
          )}

          {currentPage === 'badges' && (
            <div className="container mx-auto px-4 py-8 max-w-4xl">
              <BadgesDisplay badges={gamificationState.badges} />
            </div>
          )}
        </main>
      </div>
    </GamificationSystem>
  );
}

