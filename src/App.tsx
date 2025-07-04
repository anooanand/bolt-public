import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { AppProvider } from './contexts/AppContext';
import AppContent from './components/AppContent'; // Corrected import

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppProvider>
          <Router>
            <AppContent />
          </Router>
        </AppProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

