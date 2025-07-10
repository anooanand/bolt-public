import React from 'react';
import ReactDOM from 'react-dom/client';
import AppWithModernInterface from './AppWithModernInterface';
import './index.css';
import './darkmode.css';
import './styles/kid-theme.css';
import './styles/modern-writing-interface.css';
import { AuthProvider } from './contexts/AuthContext';
import { LearningProvider } from './contexts/LearningContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <LearningProvider>
        <AppWithModernInterface />
      </LearningProvider>
    </AuthProvider>
  </React.StrictMode>
);
