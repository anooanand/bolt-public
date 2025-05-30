import React, { useContext } from 'react';
import { ThemeContext } from '../lib/ThemeContext';

interface NavBarProps {
  onNavigate: (page: string) => void;
  activePage: string;
}

export const NavBar: React.FC<NavBarProps> = ({ onNavigate, activePage }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); onNavigate('home'); }}
              className="flex-shrink-0 flex items-center"
            >
              <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">
                InstaChat AI Writing Mate
              </div>
            </a>
          </div>
          
          <div className="flex items-center space-x-4">
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
            
            {/* Navigation Links */}
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); onNavigate('about'); }}
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
              onClick={(e) => { e.preventDefault(); onNavigate('faq'); }}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                activePage === 'faq' 
                  ? 'text-indigo-600 dark:text-indigo-400' 
                  : 'text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400'
              }`}
            >
              FAQ
            </a>
            
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); onNavigate('pricing'); }}
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
              onClick={(e) => { e.preventDefault(); onNavigate('signup'); }}
              className="ml-2 px-4 py-2 rounded-md text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign up
            </a>
            
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); onNavigate('signin'); }}
              className="px-4 py-2 rounded-md text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 dark:text-indigo-400 dark:bg-gray-800 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
