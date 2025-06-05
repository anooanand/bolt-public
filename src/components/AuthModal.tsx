import React, { useState } from 'react';
import { X } from 'lucide-react';
import { SimpleSignUp } from './SimpleSignUp';
import { SignInForm } from './SignInForm';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (user: any) => void;
  initialMode?: 'signin' | 'signup';
}

export function AuthModal({ isOpen, onClose, onSuccess, initialMode = 'signin' }: AuthModalProps) {
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);

  const handleSuccess = (user: any) => {
    console.log("Auth success handler called with user:", user);
    
    // Close the modal first
    onClose();
    
    // For signup, automatically redirect to pricing page
    if (mode === 'signup') {
      console.log("Signup successful - redirecting to pricing page");
      
      // Set a flag to indicate we should redirect to pricing
      localStorage.setItem('redirect_after_signup', 'pricing');
      
      // Small delay to ensure modal closes smoothly
      setTimeout(() => {
        // Force navigation to pricing page
        window.location.hash = '#pricing';
        window.location.reload(); // Ensure the page updates
      }, 200);
    } else {
      // For signin, call the parent success handler if provided
      if (onSuccess) {
        onSuccess(user);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          aria-label="Close"
        >
          <X className="h-6 w-6" />
        </button>
        
        {mode === 'signin' ? (
          <SignInForm 
            onSuccess={handleSuccess} 
            onSignUpClick={() => setMode('signup')} 
          />
        ) : (
          <SimpleSignUp 
            onSignUpSuccess={handleSuccess} 
            onSignInClick={() => setMode('signin')} 
          />
        )}
      </div>
    </div>
  );
}

