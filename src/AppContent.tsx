import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Import components
import { NavBar } from './NavBar';
import { HeroSection } from './HeroSection';
import { FeaturesSection } from './FeaturesSection';
import { ToolsSection } from './ToolsSection';
import { WritingTypesSection } from './WritingTypesSection';
import Footer from './Footer';
import { Dashboard } from './Dashboard';
import { AuthModal } from './AuthModal';
import { PlanningToolModal } from './PlanningToolModal';
import { EmailVerificationHandler } from './EmailVerificationHandler';
import { WritingAccessCheck } from './WritingAccessCheck';
import { PaymentSuccessPage } from './PaymentSuccessPage';
import { PricingPage } from './PricingPage';

// Writing components
import { EnhancedHeader } from './EnhancedHeader';
import { WritingArea } from './WritingArea';
import { CoachPanel } from './CoachPanel';
import { WritingStudio } from './WritingStudio';
import { ParaphrasePanel } from './ParaphrasePanel';

export const AppContent: React.FC = () => {
  const { user, loading, paymentCompleted, emailVerified, authSignOut } = useAuth();
  const [activePage, setActivePage] = useState("home");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<"signin" | "signup">("signin");

  // Navigation handler
  const handleNavigation = (page: string) => {
    if (page === "dashboard" && user) {
      if (!emailVerified) {
        setActivePage("dashboard");
      } else if (paymentCompleted) {
        setActivePage("writing");
      } else {
        setActivePage("pricing");
      }
    } else if (page === "paraphrase" || page === "brainstorm" || page === "learn" || page === "exam") {
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
        handleNavigation("dashboard");
      } else if (paymentCompleted) {
        handleNavigation("writing");
      } else {
        handleNavigation("pricing");
      }
    } else {
      setAuthModalMode("signup");
      setShowAuthModal(true);
    }
  };

  const handleStartExam = () => {
    setShowExamMode(true);
  };

  const handleSavePlan = (plan: any) => {
    console.log('Plan saved:', plan);
    setShowPlanningTool(false);
  };

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
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Routes>
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
        
        <Route path="/studio" element={
          <WritingAccessCheck>
            <WritingStudio onNavigate={handleNavigation} />
          </WritingAccessCheck>
        } />
        
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

      {showAuthModal && (
        <AuthModal
          isOpen={showAuthModal}
          initialMode={authModalMode}
          onClose={() => setShowAuthModal(false)}
          onSuccess={() => {
            setShowAuthModal(false);
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
  );
};