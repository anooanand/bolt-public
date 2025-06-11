import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import './darkmode.css'; // Add this line to import the dark mode CSS
import { AuthProvider } from './contexts/AuthContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);