import React, { useState } from 'react';
import { X } from 'lucide-react';
import { SimpleSignUp } from './SimpleSignUp';
import { SignInForm } from './SignInForm';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'signin' | 'signup';
}

export function AuthModal({ isOpen, onClose, initialMode = 'signin' }: AuthModalProps) {
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);

  const handleSuccess = (user: any) => {
    console.log("Auth success handler called with user:", user);
    
    // Check for redirect flag
    const redirectTarget = localStorage.getItem('redirect_after_signup');
    
    // Close the modal
    onClose();
    
    // Handle redirect if needed
    if (redirectTarget === 'pricing') {
      window.location.href = '/pricing';
    } else if (redirectTarget) {
      window.location.href = `/${redirectTarget}`;
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
