// COMPLETE FILE: src/App.tsx
// Copy-paste this entire file into bolt.new (REPLACE existing)

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { FeaturesPage } from './components/FeaturesPage';
import { AboutPage } from './components/AboutPage';
import { FAQPage } from './components/FAQPage';
import { PricingPage } from './components/PricingPage';
import { LearningPage } from './components/LearningPage';
import { Dashboard } from './components/Dashboard';
import { PaymentSuccessPage } from './components/PaymentSuccessPage';
import { AuthModal } from './components/AuthModal';
import { AppContent } from './components/AppContent';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-white flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/features" element={<FeaturesPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/learning" element={<LearningPage />} />
              
              {/* Payment Success Route - NEW */}
              <Route path="/payment-success" element={<PaymentSuccessPage />} />
              
              {/* Protected Routes */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/app" element={<AppContent />} />
              
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

