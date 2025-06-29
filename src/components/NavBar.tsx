import React, { useState, useRef } from 'react';
import { User } from '@supabase/supabase-js';
import { useLearning } from '../contexts/LearningContext';
import { useAuth } from '../contexts/AuthContext'; // FIXED: Added missing import
import { Link } from 'react-router-dom';
import { LogOut, Menu, X, AlertCircle, CheckCircle, XCircle, Mail, CreditCard, RefreshCw } from 'lucide-react';

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

  // ENHANCED: Get verification status from auth context
  const { 
    emailVerified, 
    paymentCompleted, 
    verificationStatus, 
    authError, 
    retryAuth, 
    clearAuthError 
  } = useAuth();

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
      
      // Clear any auth errors
      if (clearAuthError) {
        clearAuthError();
      }
      
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

  // ENHANCED: Verification status component with null checks
  const VerificationStatusIndicator = () => {
    if (!user) return null;

    return (
      <div className="flex items-center space-x-2">
        {/* Email Verification Status */}
        {emailVerified === false && (
          <div className="flex items-center text-yellow-600 dark:text-yellow-400">
            <Mail className="w-4 h-4 mr-1" />
            <span className="text-xs hidden sm:inline">Email pending</span>
          </div>
        )}
        
        {/* Payment Verification Status */}
        {paymentCompleted === false && emailVerified === true && (
          <div className="flex items-center text-orange-600 dark:text-orange-400">
            <CreditCard className="w-4 h-4 mr-1" />
            <span className="text-xs hidden sm:inline">Payment pending</span>
          </div>
        )}
        
        {/* Fully Verified Status */}
        {emailVerified === true && paymentCompleted === true && (
          <div className="flex items-center text-green-600 dark:text-green-400">
            <CheckCircle className="w-4 h-4 mr-1" />
            <span className="text-xs hidden sm:inline">Verified</span>
          </div>
        )}
        
        {/* Verification Failed */}
        {verificationStatus === 'failed' && (
          <div className="flex items-center text-red-600 dark:text-red-400">
            <XCircle className="w-4 h-4 mr-1" />
            <span className="text-xs hidden sm:inline">Failed</span>
          </div>
        )}
        
        {/* Auth Error with Retry */}
        {authError && retryAuth && (
          <button
            onClick={retryAuth}
            className="flex items-center text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
            title={authError}
          >
            <RefreshCw className="w-4 h-4 mr-1" />
            <span className="text-xs hidden sm:inline">Retry</span>
          </button>
        )}
      </div>
    );
  };

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

            {/* Pricing Tab */}
            <Link
              to="/pricing"
              className={`text-sm font-medium transition-colors ${
                activePage === 'pricing'
                  ? 'text-blue-600 border-b-2 border-blue-600 pb-1'
                  : 'text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400'
              }`}
            >
              Pricing
            </Link>

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
              <div className="flex items-center space-x-4 relative">
                {/* ENHANCED: Verification Status Indicator */}
                <VerificationStatusIndicator />
                
                <Link
                  to="/dashboard"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Dashboard
                </Link>
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2"
                  >
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center dark:bg-gray-700">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {user.email?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </button>
                  
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 dark:bg-gray-800 dark:border-gray-700">
                      <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {user.email}
                        </p>
                        {/* ENHANCED: Detailed verification status in user menu */}
                        <div className="mt-2 space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-500 dark:text-gray-400">Email:</span>
                            <span className={emailVerified ? 'text-green-600' : 'text-yellow-600'}>
                              {emailVerified ? 'Verified' : 'Pending'}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-500 dark:text-gray-400">Payment:</span>
                            <span className={paymentCompleted ? 'text-green-600' : 'text-orange-600'}>
                              {paymentCompleted ? 'Active' : 'Pending'}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {/* ENHANCED: Auth error display in menu */}
                      {authError && retryAuth && (
                        <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                          <div className="text-xs text-red-600 dark:text-red-400 mb-2">
                            {authError}
                          </div>
                          <button
                            onClick={retryAuth}
                            className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                          >
                            Retry verification
                          </button>
                        </div>
                      )}
                      
                      <Link
                        to="/dashboard"
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <Link
                        to="/settings"
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Settings
                      </Link>
                      <button
                        onClick={handleSignOut}
                        disabled={isSigningOut.current}
                        className={`block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:text-red-400 dark:hover:bg-gray-700 ${
                          isSigningOut.current ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      >
                        <div className="flex items-center">
                          <LogOut className="w-4 h-4 mr-2" />
                          {isSigningOut.current ? 'Signing out...' : 'Sign Out'}
                        </div>
                      </button>
                    </div>
                  )}
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
          <div className="md:hidden flex items-center space-x-2">
            {/* ENHANCED: Mobile verification status */}
            {user && <VerificationStatusIndicator />}
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
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
            
            {/* Mobile Pricing Link */}
            <Link
              to="/pricing"
              className={`block w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                activePage === 'pricing'
                  ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/30 dark:text-blue-400'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-800'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>          
            
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
                  <div className="px-3 py-2">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {user.email}
                    </p>
                    {/* ENHANCED: Mobile verification status details */}
                    <div className="mt-2 space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500 dark:text-gray-400">Email:</span>
                        <span className={emailVerified ? 'text-green-600' : 'text-yellow-600'}>
                          {emailVerified ? 'Verified' : 'Pending'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500 dark:text-gray-400">Payment:</span>
                        <span className={paymentCompleted ? 'text-green-600' : 'text-orange-600'}>
                          {paymentCompleted ? 'Active' : 'Pending'}
                        </span>
                      </div>
                    </div>
                    
                    {/* ENHANCED: Mobile auth error display */}
                    {authError && retryAuth && (
                      <div className="mt-2">
                        <div className="text-xs text-red-600 dark:text-red-400 mb-1">
                          {authError}
                        </div>
                        <button
                          onClick={retryAuth}
                          className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          Retry verification
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <Link
                    to="/dashboard"
                    className="block w-full text-left px-3 py-2 rounded-md text-sm font-medium bg-blue-600 text-white"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/settings"
                    className="block w-full text-left px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Settings
                  </Link>
                  <button
                    onClick={handleSignOut}
                    disabled={isSigningOut.current}
                    className={`block w-full text-left px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-gray-50 dark:text-red-400 dark:hover:bg-gray-800 ${
                      isSigningOut.current ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <div className="flex items-center">
                      <LogOut className="w-4 h-4 mr-2" />
                      {isSigningOut.current ? 'Signing out...' : 'Sign Out'}
                    </div>
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
    </nav>
  );
}
