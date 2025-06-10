import React, { useState, useEffect } from 'react';
import { ThemeContext } from '../lib/ThemeContext';
import { signOut, getCurrentUser } from '../lib/supabase';
import { User } from '@supabase/supabase-js';

interface NavBarProps {
  onNavigate: (page: string) => void;
  activePage: string;
  user: User | null;
  onSignInClick: () => void;
  onSignUpClick: () => void;
  onForceSignOut?: () => void;
}

export const NavBar: React.FC<NavBarProps> = ({ 
  onNavigate, 
  activePage, 
  user, 
  onSignInClick,
  onSignUpClick,
  onForceSignOut
}) => {
  const { theme, toggleTheme } = React.useContext(ThemeContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      if (onForceSignOut) {
        onForceSignOut();
      } else {
        await signOut();
        window.location.reload(); // Refresh the page to reset the app state
      }
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, page: string) => {
    e.preventDefault();
    onNavigate(page);
    setMobileMenuOpen(false); // Close mobile menu when navigating
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <a 
              href="#" 
              onClick={(e) => handleNavigation(e, 'home')}
              className="flex-shrink-0 flex items-center"
            >
              <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">
                Bolt Writing Assistant
              </div>
            </a>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <span className="sr-only">{mobileMenuOpen ? 'Close menu' : 'Open menu'}</span>
              {/* Icon when menu is closed */}
              <svg
                className={`${mobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              {/* Icon when menu is open */}
              <svg
                className={`${mobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            {/* Navigation Links */}
            <a 
              href="#" 
              onClick={(e) => handleNavigation(e, 'home')}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                activePage === 'home' 
                  ? 'text-indigo-600 dark:text-indigo-400' 
                  : 'text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400'
              }`}
            >
              Home
            </a>
            
            <a 
              href="#" 
              onClick={(e) => handleNavigation(e, 'features')}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                activePage === 'features' 
                  ? 'text-indigo-600 dark:text-indigo-400' 
                  : 'text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400'
              }`}
            >
              Features
            </a>
            
            <a 
              href="#" 
              onClick={(e) => handleNavigation(e, 'about')}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                activePage === 'about' 
                  ? 'text-indigo-600 dark:text-indigo-400' 
                  : 'text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400'
              }`}
            >
              About
            </a>
            
            <a 
              href="#" 
              onClick={(e) => handleNavigation(e, 'pricing')}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                activePage === 'pricing' 
                  ? 'text-indigo-600 dark:text-indigo-400' 
                  : 'text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400'
              }`}
            >
              Pricing
            </a>
            
            <a 
              href="#" 
              onClick={(e) => handleNavigation(e, 'faq')}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                activePage === 'faq' 
                  ? 'text-indigo-600 dark:text-indigo-400' 
                  : 'text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400'
              }`}
            >
              FAQ
            </a>
            
            {user && (
              <a 
                href="#" 
                onClick={(e) => handleNavigation(e, 'dashboard')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activePage === 'dashboard' 
                    ? 'text-indigo-600 dark:text-indigo-400' 
                    : 'text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400'
                }`}
              >
                Dashboard
              </a>
            )}
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            {/* Dark/Light Mode Toggle */}
            <button 
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none"
            >
              {theme === 'light' ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd"></path>
                </svg>
              )}
            </button>
            
            {user ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-700 dark:text-gray-300 hidden md:inline-block">
                  {user.email}
                </span>
                <button 
                  onClick={handleSignOut}
                  className="px-4 py-2 rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <button 
                  onClick={onSignInClick}
                  className="px-4 py-2 rounded-md text-sm font-medium text-indigo-600 dark:text-indigo-400 border border-indigo-600 dark:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign In
                </button>
                <button 
                  onClick={onSignUpClick}
                  className="px-4 py-2 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile menu - shown/hidden with state */}
      <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a 
            href="#" 
            onClick={(e) => handleNavigation(e, 'home')}
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              activePage === 'home' 
                ? 'text-indigo-600 dark:text-indigo-400' 
                : 'text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400'
            }`}
          >
            Home
          </a>
          
          <a 
            href="#" 
            onClick={(e) => handleNavigation(e, 'features')}
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              activePage === 'features' 
                ? 'text-indigo-600 dark:text-indigo-400' 
                : 'text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400'
            }`}
          >
            Features
          </a>
          
          <a 
            href="#" 
            onClick={(e) => handleNavigation(e, 'about')}
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              activePage === 'about' 
                ? 'text-indigo-600 dark:text-indigo-400' 
                : 'text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400'
            }`}
          >
            About
          </a>
          
          <a 
            href="#" 
            onClick={(e) => handleNavigation(e, 'pricing')}
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              activePage === 'pricing' 
                ? 'text-indigo-600 dark:text-indigo-400' 
                : 'text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400'
            }`}
          >
            Pricing
          </a>
          
          <a 
            href="#" 
            onClick={(e) => handleNavigation(e, 'faq')}
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              activePage === 'faq' 
                ? 'text-indigo-600 dark:text-indigo-400' 
                : 'text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400'
            }`}
          >
            FAQ
          </a>
          
          {user && (
            <a 
              href="#" 
              onClick={(e) => handleNavigation(e, 'dashboard')}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                activePage === 'dashboard' 
                  ? 'text-indigo-600 dark:text-indigo-400' 
                  : 'text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400'
              }`}
            >
              Dashboard
            </a>
          )}
          
          {/* Mobile auth buttons */}
          <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
            {user ? (
              <div className="flex items-center px-3">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                    <span className="text-indigo-600 dark:text-indigo-300 font-medium">
                      {user.email?.charAt(0).toUpperCase() || 'U'}
                    </span>
                  </div>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800 dark:text-white truncate max-w-[200px]">
                    {user.email}
                  </div>
                  <button 
                    onClick={handleSignOut}
                    className="mt-2 px-4 py-2 rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <div className="px-3 space-y-2">
                <button 
                  onClick={() => {
                    onSignInClick();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full px-4 py-2 rounded-md text-sm font-medium text-indigo-600 dark:text-indigo-400 border border-indigo-600 dark:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign In
                </button>
                <button 
                  onClick={() => {
                    onSignUpClick();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full px-4 py-2 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
