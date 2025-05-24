import React, { useEffect } from 'react';

interface KeyboardAccessibilityProps {
  children: React.ReactNode;
}

export function KeyboardAccessibility({ children }: KeyboardAccessibilityProps) {
  // Add focus outline styles when using keyboard navigation
  useEffect(() => {
    const handleFirstTab = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        // Add a class to the body when keyboard navigation is detected
        document.body.classList.add('keyboard-user');
        
        // Remove the event listener after first tab
        window.removeEventListener('keydown', handleFirstTab);
        
        // Add listener to detect mouse use
        window.addEventListener('mousedown', handleMouseDown);
      }
    };
    
    const handleMouseDown = () => {
      // Remove the class when mouse is used
      document.body.classList.remove('keyboard-user');
    };
    
    // Add initial listener for first tab press
    window.addEventListener('keydown', handleFirstTab);
    
    // Cleanup
    return () => {
      window.removeEventListener('keydown', handleFirstTab);
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  // Add global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Alt+H to toggle help center
      if (e.altKey && e.key === 'h') {
        e.preventDefault();
        const helpButton = document.querySelector('.help-button') as HTMLButtonElement;
        if (helpButton) {
          helpButton.click();
        }
      }
      
      // Alt+C to switch to Coach panel
      if (e.altKey && e.key === 'c') {
        e.preventDefault();
        const coachTab = document.querySelector('[data-panel="coach"]') as HTMLButtonElement;
        if (coachTab) {
          coachTab.click();
        }
      }
      
      // Alt+P to switch to Paraphrase panel
      if (e.altKey && e.key === 'p') {
        e.preventDefault();
        const paraphraseTab = document.querySelector('[data-panel="paraphrase"]') as HTMLButtonElement;
        if (paraphraseTab) {
          paraphraseTab.click();
        }
      }
      
      // Alt+T to toggle timer
      if (e.altKey && e.key === 't') {
        e.preventDefault();
        const timerButton = document.querySelector('.timer-button') as HTMLButtonElement;
        if (timerButton) {
          timerButton.click();
        }
      }
      
      // Alt+W to focus writing area
      if (e.altKey && e.key === 'w') {
        e.preventDefault();
        const writingArea = document.querySelector('.writing-area textarea') as HTMLTextAreaElement;
        if (writingArea) {
          writingArea.focus();
        }
      }
      
      // Alt+L to switch to Learning mode
      if (e.altKey && e.key === 'l') {
        e.preventDefault();
        const learningTab = document.querySelector('[data-mode="learning"]') as HTMLButtonElement;
        if (learningTab) {
          learningTab.click();
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Add CSS for keyboard focus styles
  useEffect(() => {
    // Create a style element
    const styleElement = document.createElement('style');
    
    // Add CSS for keyboard focus styles
    styleElement.textContent = `
      /* Hide focus outline for mouse users */
      :focus {
        outline: none;
      }
      
      /* Show focus outline for keyboard users */
      body.keyboard-user :focus {
        outline: 2px solid #4f46e5;
        outline-offset: 2px;
      }
      
      /* Ensure all interactive elements have visible focus states */
      body.keyboard-user button:focus,
      body.keyboard-user [role="button"]:focus,
      body.keyboard-user a:focus,
      body.keyboard-user input:focus,
      body.keyboard-user select:focus,
      body.keyboard-user textarea:focus {
        outline: 2px solid #4f46e5;
        outline-offset: 2px;
      }
      
      /* Ensure all interactive elements have appropriate cursor */
      button, [role="button"], a, select, summary {
        cursor: pointer;
      }
      
      /* Add focus styles for custom components */
      body.keyboard-user .custom-select:focus-within,
      body.keyboard-user .custom-checkbox:focus-within,
      body.keyboard-user .custom-radio:focus-within {
        outline: 2px solid #4f46e5;
        outline-offset: 2px;
      }
    `;
    
    // Append to document head
    document.head.appendChild(styleElement);
    
    // Cleanup
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  // Add ARIA attributes to improve screen reader experience
  useEffect(() => {
    // Add role="application" to the main app container
    const appContainer = document.getElementById('root');
    if (appContainer) {
      appContainer.setAttribute('role', 'application');
      appContainer.setAttribute('aria-label', 'NSW Selective Essay Coach');
    }
    
    // Add appropriate ARIA labels to major sections
    const writingArea = document.querySelector('.writing-area');
    if (writingArea) {
      writingArea.setAttribute('aria-label', 'Writing Area');
      writingArea.setAttribute('role', 'region');
    }
    
    const coachPanel = document.querySelector('.coach-panel');
    if (coachPanel) {
      coachPanel.setAttribute('aria-label', 'Coach Panel');
      coachPanel.setAttribute('role', 'region');
    }
    
    const learningResources = document.querySelector('.learning-resources');
    if (learningResources) {
      learningResources.setAttribute('aria-label', 'Learning Resources');
      learningResources.setAttribute('role', 'region');
    }
  }, []);

  return <>{children}</>;
}
