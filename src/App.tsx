// Import the handleEmailConfirmation function at the top with other imports
import { getCurrentUser, handleEmailConfirmation } from './lib/supabase';

// Add this effect after your existing useEffect for checking current user
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