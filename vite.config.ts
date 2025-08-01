import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react( )],
  server: {
    host: '0.0.0.0',
    proxy: {
      '/auth/v1': {
        target: 'https://rvlotczavccreigdzczo.supabase.co',
        changeOrigin: true,
        secure: true
      },
      '/rest/v1': {
        target: 'https://rvlotczavccreigdzczo.supabase.co',
        changeOrigin: true,
        secure: true
      }
    }
  }
});
