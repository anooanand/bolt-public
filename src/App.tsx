import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { NavBar } from './components/NavBar';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { AboutPage } from './components/AboutPage';
import { PricingPage } from './components/PricingPage';
import { Dashboard } from './components/Dashboard';
import { PaymentSuccessPage } from './components/PaymentSuccessPage';
import { AuthModal } from './components/AuthModal';
import { AppContent } from './components/AppContent';
import { EmailVerificationHandler } from './components/EmailVerificationHandler';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-white flex flex-col">
          <NavBar />
          <main className="flex-1">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              
              {/* Payment Success Route */}
              <Route path="/payment-success" element={<PaymentSuccessPage />} />
              
              {/* Email Verification Route */}
              <Route path="/auth/callback" element={<EmailVerificationHandler />} />
              
              {/* Protected Routes */}
              <Route path="/dashboard" element={<Dashboard />} />
              
              {/* FIXED: Writing App Route - This was missing! */}
              <Route path="/app/*" element={<AppContent />} />
              
              {/* Redirect unknown routes to home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
          <AuthModal />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

