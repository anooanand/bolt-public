// FIXED: Enhanced handleForceSignOut function for AppContent.tsx
// Replace the existing handleForceSignOut function with this improved version:

const handleForceSignOut = async () => {
  try {
    console.log('AppContent: Force sign out initiated');
    
    // Call the auth context sign out method
    await authSignOut();
    
    // Reset local component state
    setActivePage('home');
    setShowAuthModal(false);
    setShowPaymentSuccess(false);
    setPendingPaymentPlan(null);
    
    // Clear any writing state
    setContent('');
    setTextType('');
    setAssistanceLevel('detailed');
    setTimerStarted(false);
    setSelectedText('');
    setActivePanel('coach');
    setShowExamMode(false);
    setShowHelpCenter(false);
    setShowPlanningTool(false);
    
    console.log('✅ AppContent: Sign out completed successfully');
    
  } catch (error) {
    console.error('AppContent: Error during sign out:', error);
    
    // Force reset even if sign out fails
    setActivePage('home');
    setShowAuthModal(false);
    setShowPaymentSuccess(false);
    setPendingPaymentPlan(null);
    
    // Clear localStorage as fallback
    localStorage.clear();
    
    console.log('⚠️ AppContent: Forced local state reset due to sign out error');
  }
};

