import React, { useEffect, useState } from 'react';
import { getCurrentUser, handleEmailConfirmation } from './lib/supabase';

function App() {
  const [user, setUser] = useState(null);

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

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Your app content here */}
    </div>
  );
}

export default App;