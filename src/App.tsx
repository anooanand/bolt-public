import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AppProvider } from './contexts/AppContext';
import { useAuth } from './contexts/AuthContext';

// Import components
import { NavBar } from './components/NavBar';
import { HeroSection } from './components/HeroSection';
import { FeaturesSection } from './components/FeaturesSection';
import { ToolsSection } from './components/ToolsSection';
import { WritingTypesSection } from './components/WritingTypesSection';
import Footer from './components/Footer';
import { Dashboard } from './components/Dashboard';
import { AuthModal } from './components/AuthModal';
import { PlanningToolModal } from './components/PlanningToolModal';
import { WritingAccessCheck } from './components/WritingAccessCheck';
import { PaymentSuccessPage } from './components/PaymentSuccessPage';
import { PricingPage } from './components/PricingPage';

// Writing components
import { EnhancedHeader } from './components/EnhancedHeader';
import { WritingArea } from './components/WritingArea';
import { CoachPanel } from './components/CoachPanel';

function App() {
  const { user, loading, paymentCompleted, emailVerified, authSignOut, forceRefreshVerification } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup'>('signin');
  
  // Writing state
  const [content, setContent] = useState('');
  const [textType, setTextType] = useState('narrative');
  const [assistanceLevel, setAssistanceLevel] = useState('some');
  const [showExamMode, setShowExamMode] = useState(false);
  const [showPlanningTool, setShowPlanningTool] = useState(false);

  // Navigation handlers
  const handleGetStarted = () => {
    if (user) {
      window.location.href = '/dashboard';
    } else {
      setAuthModalMode('signup');
      setShowAuthModal(true);
    }
  };

  const handleStartWriting = () => {
    window.location.href = '/writing';
  };

  const handleStartExam = () => {
    setShowExamMode(true);
  };

  const handleSavePlan = (plan: any) => {
    console.log('Plan saved:', plan);
    setShowPlanningTool(false);
  };

  // Handle payment success from URL parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('session_id');
    
    if (sessionId && window.location.pathname === '/payment-success') {
      console.log('💳 Payment success detected');
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <Router>
      <ThemeProvider>
        <AppProvider>
          <div className="min-h-screen bg-white dark:bg-gray-900">
            <Routes>
              {/* Home route */}
              <Route path="/" element={
                <>
                  <NavBar 
                    onGetStarted={handleGetStarted}
                    onSignIn={() => {
                      setAuthModalMode('signin');
                      setShowAuthModal(true);
                    }}
                  />
                  <HeroSection onGetStarted={handleGetStarted} />
                  <FeaturesSection />
                  <ToolsSection />
                  <WritingTypesSection />
                  <Footer />
                </>
              } />
              
              {/* Other routes */}
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/payment-success" element={<PaymentSuccessPage />} />
              <Route path="/dashboard" element={
                user ? (
                  <Dashboard 
                    user={user} 
                    emailVerified={emailVerified}
                    paymentCompleted={paymentCompleted}
                  />
                ) : (
                  <Navigate to="/" />
                )
              } />
              
              {/* Writing routes */}
              <Route path="/writing" element={
                <WritingAccessCheck>
                  <div className="flex flex-col h-screen">
                    <EnhancedHeader 
                      textType={textType}
                      assistanceLevel={assistanceLevel}
                      onTextTypeChange={setTextType}
                      onAssistanceLevelChange={setAssistanceLevel}
                      onShowPlanningTool={() => setShowPlanningTool(true)}
                      onStartExam={handleStartExam}
                    />
                    
                    <div className="flex-1 flex">
                      <div className="flex-1">
                        <WritingArea
                          content={content}
                          onChange={setContent}
                          textType={textType}
                          onTimerStart={() => {}}
                          onSubmit={() => window.location.href = '/feedback'}
                        />
                      </div>
                      
                      <div className="w-80 border-l border-gray-200">
                        <CoachPanel
                          content={content}
                          textType={textType}
                          assistanceLevel={assistanceLevel}
                        />
                      </div>
                    </div>
                  </div>
                </WritingAccessCheck>
              } />
            </Routes>

            {/* Modals */}
            {showAuthModal && (
              <AuthModal
                mode={authModalMode}
                onClose={() => setShowAuthModal(false)}
                onSwitchMode={(mode) => setAuthModalMode(mode)}
              />
            )}
            
            {showPlanningTool && (
              <PlanningToolModal
                textType={textType}
                onClose={() => setShowPlanningTool(false)}
                onSave={handleSavePlan}
              />
            )}
          </div>
        </AppProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;

