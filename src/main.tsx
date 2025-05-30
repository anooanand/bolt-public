import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import './darkmode.css'; // Add this line to import the dark mode CSS

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);