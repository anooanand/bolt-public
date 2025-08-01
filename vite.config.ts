import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react( )],
  server: {
    host: '0.0.0.0',
    // Remove proxy configuration for WebContainer environment
    // Netlify Functions are not available in local development
  }
});
