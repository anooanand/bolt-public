import React, { useState, useEffect } from 'react';
import { NavBar } from './components/NavBar';
import { HeroSection } from './components/HeroSection';
import { WritingModesSection } from './components/WritingModesSection';
import { WritingTypesSection } from './components/WritingTypesSection';
import { PricingPage } from './components/PricingPage';
import { AuthModal } from './components/AuthModal';
import { getCurrentUser, handleEmailConfirmation } from './lib/supabase';
import { User } from '@supabase/supabase-js';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'pricing'>('home');
  const [user, setUser] = useState<User | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    // Check for current user on mount
    getCurrentUser().then(setUser).catch(console.error);
  }, []);

  useEffect(() => {
    // Check if we have a confirmation token in the URL
    if (window.location.hash && window.location.hash.includes('access_token')) {
      handleEmailConfirmation()
        .then(() => {
          // Clear the URL hash
          window.history.replaceState(null, '', window.location.pathname);
          // Update user state
          getCurrentUser().then(setUser).catch(console.error);
          // Show success message
          alert('Email confirmed successfully! You can now sign in.');
        })
        .catch(error => {
          console.error('Error confirming email:', error);
          alert('Error confirming email. Please try again.');
        });
    }
  }, []);

  const handleNavigation = (page: string) => {
    if (page === 'pricing') {
      setCurrentPage('pricing');
    } else {
      setCurrentPage('home');
    }
  };

  const handleAuthSuccess = () => {
    getCurrentUser().then(setUser).catch(console.error);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <NavBar 
        onNavigate={handleNavigation} 
        activePage={currentPage}
        user={user}
        onSignInClick={() => setShowAuthModal(true)}
      />

      {currentPage === 'home' ? (
        <>
          <HeroSection 
            onStartWriting={() => user ? handleNavigation('writing') : setShowAuthModal(true)}
            onTryDemo={() => handleNavigation('demo')}
          />
          <WritingModesSection onSelectMode={(mode) => {
            if (!user) {
              setShowAuthModal(true);
              return;
            }
            // Handle mode selection
          }} />
          <WritingTypesSection onSelectType={(type) => {
            if (!user) {
              setShowAuthModal(true);
              return;
            }
            // Handle type selection
          }} />
        </>
      ) : currentPage === 'pricing' ? (
        <PricingPage />
      ) : null}

      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
}

export default App;