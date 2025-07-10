import React, { useState, useRef } from 'react';
import { LogOut, Menu, X } from 'lucide-react';

interface NavBarProps {
  onNavigate: (page: string) => void;
  onSignIn: () => void;
  onSignUp: () => void;
  onSignOut: () => void;
  user: any;
}

export const NavBar: React.FC<NavBarProps> = ({ onNavigate, onSignIn, onSignUp, onSignOut, user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  
  // Use ref to prevent multiple simultaneous sign out attempts
  const isSigningOut = useRef(false);

  const navigationItems = [
    { id: 'home', name: '🏠 Home' },
    { id: 'about', name: '🙋‍♀️ About Us' },
    { id: 'faq', name: '❓ FAQ' },
    { id: 'pricing', name: '💎 Pricing' }
  ];

  // BULLETPROOF: Enhanced Sign In handler with comprehensive debugging
  const handleSignInClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('🔑 [NavBar] Sign In button clicked!');
    console.log('🔑 [NavBar] onSignIn prop:', typeof onSignIn, onSignIn);
    
    if (typeof onSignIn === 'function') {
      console.log('🔑 [NavBar] Calling onSignIn function...');
      try {
        onSignIn();
        console.log('🔑 [NavBar] onSignIn called successfully');
      } catch (error) {
        console.error('🔑 [NavBar] Error calling onSignIn:', error);
      }
    } else {
      console.error('🔑 [NavBar] onSignIn is not a function:', onSignIn);
      alert('Sign In function not available. Please refresh the page.');
    }
  };

  // BULLETPROOF: Enhanced Sign Up handler
  const handleSignUpClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('📝 [NavBar] Sign Up button clicked!');
    console.log('📝 [NavBar] onSignUp prop:', typeof onSignUp, onSignUp);
    
    if (typeof onSignUp === 'function') {
      console.log('📝 [NavBar] Calling onSignUp function...');
      try {
        onSignUp();
        console.log('📝 [NavBar] onSignUp called successfully');
      } catch (error) {
        console.error('📝 [NavBar] Error calling onSignUp:', error);
      }
    } else {
      console.error('📝 [NavBar] onSignUp is not a function:', onSignUp);
      alert('Sign Up function not available. Please refresh the page.');
    }
  };

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
      
      // Call the sign out function
      await onSignOut();
      
    } catch (error) {
      console.error('Error during sign out:', error);
    } finally {
      // Reset the flag after a delay to prevent rapid clicks
      setTimeout(() => {
        isSigningOut.current = false;
      }, 2000);
    }
  };

  const handleNavigation = (page: string) => {
    console.log('🧭 [NavBar] Navigation to:', page);
    onNavigate(page);
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
  };

  // Debug props on component mount
  React.useEffect(() => {
    console.log('🔧 [NavBar] Component mounted with props:', {
      onNavigate: typeof onNavigate,
      onSignIn: typeof onSignIn,
      onSignUp: typeof onSignUp,
      onSignOut: typeof onSignOut,
      user: !!user
    });
  }, [onNavigate, onSignIn, onSignUp, onSignOut, user]);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50 dark:bg-gray-900/95 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button 
              onClick={() => handleNavigation('home')} 
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AI</span>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">InstaChat AI</span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className="flex items-center space-x-1 text-sm font-medium transition-colors text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
              >
                {item.name}
              </button>
            ))}

            {/* Writing Button for logged in users */}
            {user && (
              <button
                onClick={() => handleNavigation('writing')}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                ✍️ Start Writing
              </button>
            )}

            {user ? (
              <div className="flex items-center space-x-4 relative">
                <button
                  onClick={() => handleNavigation('dashboard')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  🏠 Dashboard
                </button>
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
                  >
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center dark:bg-gray-700">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {user.email?.charAt(0).toUpperCase() || 'U'}
                      </span>
                    </div>
                  </button>
                  
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 dark:bg-gray-800 dark:border-gray-700">
                      <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          Hi, {user.email?.split('@')[0] || 'User'}!
                        </p>
                      </div>
                      
                      <button
                        onClick={() => handleNavigation('dashboard')}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                      >
                        🏠 Dashboard
                      </button>
                      <button
                        onClick={() => handleNavigation('writing')}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                      >
                        ✍️ Writing Studio
                      </button>
                      <button
                        onClick={() => handleNavigation('learning')}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                      >
                        📚 Learning Hub
                      </button>
                      <button
                        onClick={() => handleNavigation('settings')}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                      >
                        ⚙️ Settings
                      </button>
                      <button
                        onClick={handleSignOut}
                        disabled={isSigningOut.current}
                        className={`block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:text-red-400 dark:hover:bg-gray-700 ${
                          isSigningOut.current ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      >
                        <div className="flex items-center">
                          <LogOut className="w-4 h-4 mr-2" />
                          {isSigningOut.current ? 'Signing out...' : '👋 Sign Out'}
                        </div>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                {/* BULLETPROOF: Sign In Button with enhanced debugging */}
                <button
                  onClick={handleSignInClick}
                  className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors dark:text-gray-300 dark:hover:text-blue-400"
                  data-testid="sign-in-button"
                >
                  🔑 Sign In
                </button>
                {/* BULLETPROOF: Sign Up Button with enhanced debugging */}
                <button
                  onClick={handleSignUpClick}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg"
                  data-testid="sign-up-button"
                >
                  🚀 Get Started
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            {user && (
              <button
                onClick={() => handleNavigation('writing')}
                className="px-3 py-1.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md text-sm hover:from-blue-700 hover:to-purple-700 transition-all"
              >
                ✍️ Write
              </button>
            )}
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
              <button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className="block w-full text-left px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-800"
              >
                {item.name}
              </button>
            ))}
            
            {/* Mobile Auth */}
            <div className="border-t border-gray-200 pt-2 mt-2 dark:border-gray-700">
              {user ? (
                <div className="space-y-2">
                  <div className="px-3 py-2">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      Hi, {user.email?.split("@")[0] || 'User'}!
                    </p>
                  </div>
                  
                  <button
                    onClick={() => handleNavigation('dashboard')}
                    className="block w-full text-left px-3 py-2 rounded-md text-sm font-medium bg-blue-600 text-white"
                  >
                    🏠 Dashboard
                  </button>
                  <button
                    onClick={() => handleNavigation('writing')}
                    className="block w-full text-left px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                  >
                    ✍️ Writing Studio
                  </button>
                  <button
                    onClick={() => handleNavigation('learning')}
                    className="block w-full text-left px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                  >
                    📚 Learning Hub
                  </button>
                  <button
                    onClick={() => handleNavigation('settings')}
                    className="block w-full text-left px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                  >
                    ⚙️ Settings
                  </button>
                  <button
                    onClick={handleSignOut}
                    disabled={isSigningOut.current}
                    className={`block w-full text-left px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-gray-50 dark:text-red-400 dark:hover:bg-gray-800 ${
                      isSigningOut.current ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <div className="flex items-center">
                      <LogOut className="w-4 h-4 mr-2" />
                      {isSigningOut.current ? 'Signing out...' : '👋 Sign Out'}
                    </div>
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  {/* BULLETPROOF: Mobile Sign In Button */}
                  <button
                    onClick={handleSignInClick}
                    className="block w-full text-left px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                  >
                    🔑 Sign In
                  </button>
                  {/* BULLETPROOF: Mobile Sign Up Button */}
                  <button
                    onClick={handleSignUpClick}
                    className="block w-full text-left px-3 py-2 rounded-md text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                  >
                    🚀 Get Started
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
