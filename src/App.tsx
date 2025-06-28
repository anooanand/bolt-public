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
import { EmailVerificationHandler } from './components/EmailVerificationHandler';
import { WritingAccessCheck } from './components/WritingAccessCheck';
import { PaymentSuccessPage } from './components/PaymentSuccessPage';
import { PricingPage } from './components/PricingPage';

// Writing components
import { EnhancedHeader } from './components/EnhancedHeader';
import { WritingArea } from './components/WritingArea';
import { CoachPanel } from './components/CoachPanel';
import { WritingStudio } from './components/WritingStudio';
import { ParaphrasePanel } from './components/ParaphrasePanel';

function App() {
  const { user, loading, paymentCompleted, emailVerified, authSignOut, forceRefreshVerification } = useAuth();
  const [activePage, setActivePage] = useState("home");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<"signin" | "signup">("signin");

  // Navigation handler
  const handleNavigation = (page: string) => {
    if (page === "dashboard" && user) {
      if (!emailVerified) {
        setActivePage("dashboard"); // Show email verification reminder
      } else if (paymentCompleted) {
        setActivePage("writing"); // Full access
      } else {
        setActivePage("pricing"); // Need to complete payment
      }
    } else if (page === "paraphrase" || page === "brainstorm" || page === "learn" || page === "exam") {
      // Handle writing tool navigation
      if (user && emailVerified && paymentCompleted) {
        setActivePage(page);
      } else {
        setActivePage("pricing");
      }
    } else {
      setActivePage(page);
    }
    setShowAuthModal(false);
  };
  
  // Writing state
  const [content, setContent] = useState('');
  const [textType, setTextType] = useState('narrative');
  const [assistanceLevel, setAssistanceLevel] = useState('some');
  const [showExamMode, setShowExamMode] = useState(false);
  const [showPlanningTool, setShowPlanningTool] = useState(false);

  const handleGetStarted = () => {
    if (user) {
      if (!emailVerified) {
        handleNavigation("dashboard"); // Show email verification reminder
      } else if (paymentCompleted) {
        handleNavigation("writing"); // Full access
      } else {
        handleNavigation("pricing"); // Need to complete payment
      }
    } else {
      setAuthModalMode("signup");
      setShowAuthModal(true);
    }
  };

  const handleStartWriting = () => {
    handleNavigation("writing");
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
                    activePage={activePage}
                    onNavigate={handleNavigation}
                    user={user}
                    onSignInClick={() => {
                      setAuthModalMode("signin");
                      setShowAuthModal(true);
                    }}
                    onSignUpClick={() => {
                      setAuthModalMode("signup");
                      setShowAuthModal(true);
                    }}
                    onForceSignOut={authSignOut}
                  />
                  <HeroSection onGetStarted={handleGetStarted} />
                  <FeaturesSection />
                  <ToolsSection onOpenTool={handleNavigation} />
                  <WritingTypesSection />
                  <Footer />
                </>
              } />
              
              {/* Other routes */}
              <Route path="/auth/callback" element={<EmailVerificationHandler />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/payment-success" element={<PaymentSuccessPage />} />
              <Route path="/dashboard" element={
                user ? (
                  <Dashboard 
                    user={user} 
                    onNavigate={handleNavigation} 
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
              
              {/* Writing Studio route */}
              <Route path="/studio" element={
                <WritingAccessCheck>
                  <WritingStudio onNavigate={handleNavigation} />
                </WritingAccessCheck>
              } />
              
              {/* Paraphrase tool route */}
              <Route path="/paraphrase" element={
                <WritingAccessCheck>
                  <div className="min-h-screen bg-gray-50 p-8">
                    <div className="max-w-4xl mx-auto">
                      <h1 className="text-2xl font-bold text-gray-900 mb-6">Paraphrase Tool</h1>
                      <ParaphrasePanel selectedText="" onNavigate={handleNavigation} />
                    </div>
                  </div>
                </WritingAccessCheck>
              } />
              
              {/* Brainstorm tool route */}
              <Route path="/brainstorm" element={
                <WritingAccessCheck>
                  <div className="min-h-screen bg-gray-50 p-8">
                    <div className="max-w-4xl mx-auto">
                      <h1 className="text-2xl font-bold text-gray-900 mb-6">Brainstorm Ideas</h1>
                      <div className="bg-white rounded-lg shadow-sm p-6">
                        <p className="text-gray-600">Brainstorming tool coming soon...</p>
                      </div>
                    </div>
                  </div>
                </WritingAccessCheck>
              } />
              
              {/* Learn route */}
              <Route path="/learn" element={
                <WritingAccessCheck>
                  <div className="min-h-screen bg-gray-50 p-8">
                    <div className="max-w-4xl mx-auto">
                      <h1 className="text-2xl font-bold text-gray-900 mb-6">Writing Tutorials</h1>
                      <div className="bg-white rounded-lg shadow-sm p-6">
                        <p className="text-gray-600">Writing tutorials coming soon...</p>
                      </div>
                    </div>
                  </div>
                </WritingAccessCheck>
              } />
              
              {/* Exam practice route */}
              <Route path="/exam" element={
                <WritingAccessCheck>
                  <div className="min-h-screen bg-gray-50 p-8">
                    <div className="max-w-4xl mx-auto">
                      <h1 className="text-2xl font-bold text-gray-900 mb-6">Exam Practice</h1>
                      <div className="bg-white rounded-lg shadow-sm p-6">
                        <p className="text-gray-600">Exam practice coming soon...</p>
                      </div>
                    </div>
                  </div>
                </WritingAccessCheck>
              } />
            </Routes>

            {/* Modals */}
            {showAuthModal && (
              <AuthModal
                isOpen={showAuthModal}
                initialMode={authModalMode}
                onClose={() => setShowAuthModal(false)}
                onSuccess={(user) => {
                  setShowAuthModal(false);
                  // Handle successful authentication
                }}
                onNavigate={handleNavigation}
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

