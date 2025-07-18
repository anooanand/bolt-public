import React, { useState, useRef } from 'react';
import { User } from '@supabase/supabase-js';
import { useLearning } from '../contexts/LearningContext';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { LogOut, Menu, X, ChevronDown } from 'lucide-react';

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
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { progress } = useLearning();
  
  // Use ref to prevent multiple simultaneous sign out attempts
  const isSigningOut = useRef(false);

  const navigationItems = [
    { id: 'home', name: '🏠 Home', href: '/' },
    { id: 'features', name: '✨ Fun Stuff', href: '/features' },
    { id: 'about', name: '🙋‍♀️ About Us', href: '/about' },
    { id: 'faq', name: '❓ Questions', href: '/faq' }
  ];

  const learningItems = [
    { id: 'learning', name: '📚 My Adventures', description: 'Your learning journey' },
    { id: 'progress-dashboard', name: '🌟 My Progress', description: 'See how far you have come' },
    { id: 'quiz-demo', name: '🧠 Brain Games', description: 'Test your smarts' }
  ];

  const handleSignOut = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Prevent multiple simultaneous sign out attempts
    if (isSigningOut.current) {
      console.log('Sign out already in progress, ignoring click...');
      return;
    }
    
    try {
      isSigningOut.current = true;
      console.log('NavBar: Sign out clicked');
      
      // Close all menus immediately
      setIsUserMenuOpen(false);
      setIsMenuOpen(false);
      setIsLearningMenuOpen(false);
      
      // Call the sign out function
      await onForceSignOut();
      
    } catch (error) {
      console.error('Error during sign out:', error);
    } finally {
      // Reset the flag after a delay to prevent rapid clicks
      setTimeout(() => {
        isSigningOut.current = false;
      }, 2000);
    }
  };

  // Helper function to get navigation item classes with improved styling
  const getNavItemClasses = (itemId: string, isActive: boolean) => {
    const baseClasses = "px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 text-sm";
    
    if (isActive) {
      return `${baseClasses} bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105`;
    }
    
    return `${baseClasses} bg-white/80 hover:bg-white/95 text-gray-700 hover:text-gray-900 hover:shadow-md hover:transform hover:scale-102 border border-gray-200/50`;
  };

  // Helper function for user avatar
  const getUserInitial = () => {
    if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return 'U';
  };

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div className="flex items-center">
            <Link 
              to="/" 
              className="flex items-center space-x-2 text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors duration-200"
              onClick={() => onNavigate('home')}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                AI
              </div>
              <span>InstaChat AI</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navigationItems.map((item) => (
              <Link
                key={item.id}
                to={item.href}
                className={getNavItemClasses(item.id, activePage === item.id)}
                onClick={() => onNavigate(item.id)}
              >
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          {/* Right Side - User Actions */}
          <div className="flex items-center space-x-3">
            
            {/* Learning Menu (if user is logged in) */}
            {user && (
              <div className="relative hidden md:block">
                <button
                  onClick={() => setIsLearningMenuOpen(!isLearningMenuOpen)}
                  className={getNavItemClasses('learning', activePage === 'learning')}
                >
                  <span>🎯 My Learning</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                {isLearningMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200/50 py-2 z-50">
                    {learningItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          onNavigate(item.id);
                          setIsLearningMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors duration-200"
                      >
                        <div className="font-medium text-gray-900">{item.name}</div>
                        <div className="text-sm text-gray-500">{item.description}</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* User Menu or Sign In */}
            {user ? (
              <div className="flex items-center space-x-3">
                <Link
                  to="/dashboard"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  onClick={() => onNavigate('dashboard')}
                >
                  🏠 My Space
                </Link>
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                  >
                    {getUserInitial()}
                  </button>
                
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200/50 py-2 z-50">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <div className="text-sm font-medium text-gray-900">Signed in as</div>
                        <div className="text-sm text-gray-500 truncate">{user.email}</div>
                      </div>
                      <Link
                        to="/dashboard"
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                        onClick={() => {
                          onNavigate('dashboard');
                          setIsUserMenuOpen(false);
                        }}
                      >
                        🏠 My Space
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors duration-200 flex items-center space-x-2"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={onSignInClick}
                  className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200"
                >
                  🔑 Sign In
                </button>
                <button
                  onClick={onSignUpClick}
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                >
                  🚀 Get Started
                </button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200/50 py-4">
            <div className="space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.href}
                  className={`block px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                    activePage === item.id
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => {
                    onNavigate(item.id);
                    setIsMenuOpen(false);
                  }}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Learning Menu */}
              {user && (
                <div className="border-t border-gray-200/50 pt-4 mt-4">
                  <div className="px-4 py-2 text-sm font-medium text-gray-500 uppercase tracking-wide">
                    Learning
                  </div>
                  {learningItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        onNavigate(item.id);
                        setIsMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-gray-500">{item.description}</div>
                    </button>
                  ))}
                </div>
              )}
              
              {/* Mobile User Actions */}
              {user ? (
                <div className="border-t border-gray-200/50 pt-4 mt-4">
                  <div className="px-4 py-2 text-sm text-gray-500">
                    {user.email}
                  </div>
                  <Link
                    to="/dashboard"
                    className="block w-full text-left px-4 py-3 bg-blue-600 text-white rounded-lg font-medium mb-2"
                    onClick={() => {
                      onNavigate('dashboard');
                      setIsMenuOpen(false);
                    }}
                  >
                    🏠 My Space
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 flex items-center space-x-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <div className="border-t border-gray-200/50 pt-4 mt-4 space-y-2">
                  <button
                    onClick={() => {
                      onSignInClick();
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                  >
                    🔑 Sign In
                  </button>
                  <button
                    onClick={() => {
                      onSignUpClick();
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium"
                  >
                    🚀 Get Started
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
