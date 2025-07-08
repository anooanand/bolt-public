import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { KidChatDemo } from './components/KidChatDemo';
import { AuthProvider } from './contexts/AuthContext';
import { AppProvider } from './contexts/AppContext';
import AppContent from './components/AppContent';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppProvider>
          <div>
            <KidChatDemo />
          </div>
        </AppProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
