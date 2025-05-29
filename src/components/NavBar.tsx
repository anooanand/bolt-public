import React, { useState } from 'react';

interface NavBarProps {
  onNavigate: (page: string) => void;
  activePage: string;
}

export function NavBar({ onNavigate, activePage }: NavBarProps) {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleNavigation = (page: string) => {
    onNavigate(page);
    setShowMobileMenu(false);
  };

  return (
    <nav className="bg-white shadow fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <i className="fas fa-pen-fancy text-indigo-600 mr-2 text-xl"></i>
              <span className="text-xl font-bold text-gray-800">InstaChatAI</span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <a 
                className={`nav-link ${activePage === 'home' ? 'active-tab' : ''} text-gray-700 hover:text-indigo-600 font-medium`} 
                href="#"
                onClick={(e) => { e.preventDefault(); handleNavigation('home'); }}
              >
                Home
              </a>
              <a 
                className={`nav-link ${activePage === 'writing' ? 'active-tab' : ''} text-gray-600 hover:text-indigo-600 font-medium`} 
                href="#"
                onClick={(e) => { e.preventDefault(); handleNavigation('writing'); }}
              >
                Writing Tools
              </a>
              <a 
                className={`nav-link ${activePage === 'resources' ? 'active-tab' : ''} text-gray-600 hover:text-indigo-600 font-medium`} 
                href="#"
                onClick={(e) => { e.preventDefault(); handleNavigation('resources'); }}
              >
                Resources
              </a>
              <a 
                className={`nav-link ${activePage === 'practice' ? 'active-tab' : ''} text-gray-600 hover:text-indigo-600 font-medium`} 
                href="#"
                onClick={(e) => { e.preventDefault(); handleNavigation('practice'); }}
              >
                Practice
              </a>
              <a 
                className={`nav-link ${activePage === 'about' ? 'active-tab' : ''} text-gray-600 hover:text-indigo-600 font-medium`} 
                href="#"
                onClick={(e) => { e.preventDefault(); handleNavigation('about'); }}
              >
                About
              </a>
            </div>
          </div>
          <div className="flex items-center">
            <div className="search-container mr-4">
              <i className="fas fa-search search-icon"></i>
              <input 
                className="border border-gray-300 rounded-lg py-2 px-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none" 
                placeholder="Search resources..." 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="btn-primary rounded-lg py-2 px-4 mr-2">Login</button>
            <button className="btn-secondary rounded-lg py-2 px-4">Sign Up</button>
            <div className="sm:hidden ml-4">
              <button 
                className="text-gray-500 hover:text-gray-700 focus:outline-none" 
                type="button"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
              >
                <i className="fas fa-bars text-xl"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {showMobileMenu && (
        <div className="sm:hidden bg-white border-t border-gray-200 py-2">
          <div className="px-4 space-y-2">
            <a 
              className={`block py-2 px-3 rounded-md ${activePage === 'home' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700'}`}
              href="#"
              onClick={(e) => { e.preventDefault(); handleNavigation('home'); }}
            >
              Home
            </a>
            <a 
              className={`block py-2 px-3 rounded-md ${activePage === 'writing' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700'}`}
              href="#"
              onClick={(e) => { e.preventDefault(); handleNavigation('writing'); }}
            >
              Writing Tools
            </a>
            <a 
              className={`block py-2 px-3 rounded-md ${activePage === 'resources' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700'}`}
              href="#"
              onClick={(e) => { e.preventDefault(); handleNavigation('resources'); }}
            >
              Resources
            </a>
            <a 
              className={`block py-2 px-3 rounded-md ${activePage === 'practice' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700'}`}
              href="#"
              onClick={(e) => { e.preventDefault(); handleNavigation('practice'); }}
            >
              Practice
            </a>
            <a 
              className={`block py-2 px-3 rounded-md ${activePage === 'about' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700'}`}
              href="#"
              onClick={(e) => { e.preventDefault(); handleNavigation('about'); }}
            >
              About
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
