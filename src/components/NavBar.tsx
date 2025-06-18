import React, { useState } from 'react';
import { User } from '@supabase/supabase-js';
import { useLearning } from '../contexts/LearningContext';
import { Link } from 'react-router-dom';

interface NavBarProps {
  activePage: string;
  onNavigate: (page: string) => void;
  user: User | null;
  onSignInClick: () => void;
  onSignUpClick: () => void;
  onForceSignOut: () => void;
}

export function NavBar({ 
  activePage, 
  onNavigate, 
  user, 
  onSignInClick, 
  onSignUpClick, 
  onForceSignOut 
}: NavBarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLearningMenuOpen, setIsLearningMenuOpen] = useState(false);
  const { progress } = useLearning();

  const navigationItems = [
    { id: 'home', name: 'Home', href: '/' },
    { id: 'features', name: 'Features', href: '/features' },
    { id: 'about', name: 'About', href: '/about' },
    { id: 'faq', name: 'FAQ', href: '/faq' }
  ];

  const learningItems = [
    { id: 'learning', name: '📚 Learning Plan', description: 'Structured 30-day course' },
    { id: 'progress-dashboard', name: '📊 Progress Dashboard', description: 'Track your achievements' },
    { id: 'quiz-demo', name: '🧩 Practice Quiz', description: 'Test your knowledge' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50 dark:bg-gray-900/95 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AI</span>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">InstaChat AI</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.id}
                to={item.href}
                className={`text-sm font-medium transition-colors ${
                  activePage === item.id
                    ? 'text-blue-600 border-b-2 border-blue-600 pb-1'
                    : 'text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400'
                }`}
              >
                {item.name}
              </Link>
            ))}

            {/* Learning Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsLearningMenuOpen(!isLearningMenuOpen)}
                className={`flex items-center space-x-1 text-sm font-medium transition-colors ${
                  ['learning', 'progress-dashboard', 'quiz-demo', 'lesson'].includes(activePage)
                    ? 'text-blue-600 border-b-2 border-blue-600 pb-1'
                    : 'text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400'
                }`}
              >
                <span>Learning</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                {progress.completedLessons.length > 0 && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white font-bold">{progress.completedLessons.length}</span>
                  </div>
                )}
              </button>

              {/* Learning Dropdown Menu */}
              {isLearningMenuOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 dark:bg-gray-800 dark:border-gray-700">
                  {learningItems.map((item) => (
                    <Link
                      key={item.id}
                      to={`/${item.id}`}
                      className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors block dark:hover:bg-gray-700"
                      onClick={() => setIsLearningMenuOpen(false)}
                    >
                      <div className="font-medium text-gray-900 dark:text-white">{item.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{item.description}</div>
                    </Link>
                  ))}
                  
                  {/* Progress Summary */}
                  <div className="border-t border-gray-200 mt-2 pt-2 px-4 dark:border-gray-700">
                    <div className="text-xs text-gray-500 mb-1 dark:text-gray-400">Your Progress</div>
                    <div className="flex justify-between text-sm">
                      <span>Lessons: {progress.completedLessons.length}/30</span>
                      <span>Points: {progress.totalPoints}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1 dark:bg-gray-700">
                      <div 
                        className="bg-blue-600 h-1.5 rounded-full transition-all"
                        style={{ width: `${(progress.completedLessons.length / 30) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {user ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/dashboard"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Dashboard
                </Link>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center dark:bg-gray-700">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {user.email?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <button
                    onClick={onForceSignOut}
                    className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <button
                  onClick={onSignInClick}
                  className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors dark:text-gray-300 dark:hover:text-blue-400"
                >
                  Sign In
                </button>
                <button
                  onClick={onSignUpClick}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Get Started
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 dark:bg-gray-900 dark:border-gray-700">
          <div className="px-4 py-2 space-y-2">
            {navigationItems.map((item) => (
              <Link
                key={item.id}
                to={item.href}
                className={`block w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                  activePage === item.id
                    ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/30 dark:text-blue-400'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-800'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Mobile Learning Items */}
            <div className="border-t border-gray-200 pt-2 mt-2 dark:border-gray-700">
              <div className="text-xs font-medium text-gray-500 px-3 py-1 uppercase tracking-wide dark:text-gray-400">
                Learning
              </div>
              {learningItems.map((item) => (
                <Link
                  key={item.id}
                  to={`/${item.id}`}
                  className="block w-full text-left px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Mobile Auth */}
            <div className="border-t border-gray-200 pt-2 mt-2 dark:border-gray-700">
              {user ? (
                <div className="space-y-2">
                  <Link
                    to="/dashboard"
                    className="block w-full text-left px-3 py-2 rounded-md text-sm font-medium bg-blue-600 text-white"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      onForceSignOut();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      onSignInClick();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => {
                      onSignUpClick();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 rounded-md text-sm font-medium bg-blue-600 text-white"
                  >
                    Get Started
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Click outside to close dropdowns */}
      {(isLearningMenuOpen || isMenuOpen) && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => {
            setIsLearningMenuOpen(false);
            setIsMenuOpen(false);
          }}
        ></div>
      )}
    </nav>
  );
}