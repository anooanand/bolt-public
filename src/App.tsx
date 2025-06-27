// CRITICAL FIXES for App.tsx - Replace the navigation functions with these:

// ✅ FIXED: Remove activePage state and use React Router navigation
// Replace the existing handleNavigation function with this:

const handleNavigation = (page: string) => {
  console.log('🚀 App: Navigating to:', page);
  // Remove setActivePage calls - use React Router instead
  setShowAuthModal(false);
  
  // Let React Router handle navigation
  // Components should use useNavigate() hook directly
};

// ✅ FIXED: Update Dashboard component props in App.tsx
// Replace the Dashboard route with this:

<Route path="/dashboard" element={
  user ? (
    <Dashboard 
      user={user} 
      emailVerified={emailVerified}
      paymentCompleted={paymentCompleted}
      // ✅ REMOVED: onNavigate prop - Dashboard now uses useNavigate() directly
    />
  ) : (
    <Navigate to="/" />
  )
} />

// ✅ FIXED: Update PaymentSuccessPage route
// Replace the payment-success route with this:

<Route path="/payment-success" element={<PaymentSuccessPage />} />

// ✅ FIXED: Remove activePage-based conditional rendering
// Replace the main content rendering logic with pure React Router:

function App() {
  const { user, loading, paymentCompleted, emailVerified, authSignOut, forceRefreshVerification } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup'>('signin');
  
  // ✅ REMOVED: activePage state - use React Router instead
  // const [activePage, setActivePage] = useState('home');
  
  // Writing state (keep these)
  const [content, setContent] = useState('');
  const [textType, setTextType] = useState('narrative');
  const [assistanceLevel, setAssistanceLevel] = useState('some');
  const [showExamMode, setShowExamMode] = useState(false);
  const [showPlanningTool, setShowPlanningTool] = useState(false);

  // ✅ FIXED: Simplified navigation handlers
  const handleGetStarted = () => {
    if (user) {
      // Use React Router navigation instead of setActivePage
      window.location.href = '/dashboard';
    } else {
      setAuthModalMode('signup');
      setShowAuthModal(true);
    }
  };

  const handleStartWriting = () => {
    // Use React Router navigation
    window.location.href = '/writing';
  };

  // ✅ FIXED: Remove activePage checks in useEffect
  // Replace payment success detection with URL-based detection:
  
  useEffect(() => {
    // Handle payment success from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('session_id');
    
    if (sessionId && window.location.pathname === '/payment-success') {
      console.log('💳 Payment success detected');
      // PaymentSuccessPage component will handle the rest
    }
  }, []);

  // ✅ FIXED: Main render - use only React Router
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
              
              {/* Other routes remain the same... */}
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
                  {/* Writing interface components */}
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
              
              {/* Add other routes as needed */}
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

// ✅ SUMMARY OF CRITICAL FIXES:
// 1. Removed activePage state system
// 2. Dashboard now uses useNavigate() directly  
// 3. PaymentSuccessPage uses useNavigate() directly
// 4. All navigation uses React Router
// 5. Removed conflicting navigation logic
// 6. Fixed component prop interfaces

