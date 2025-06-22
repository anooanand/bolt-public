import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'router': ['react-router-dom'],
          'ui-vendor': ['framer-motion', 'lucide-react', 'react-hot-toast'],
          'auth-vendor': ['@supabase/supabase-js'],
          'api-vendor': ['openai', 'stripe'],
          'utils': ['zod']
        }
      }
    },
    
    chunkSizeWarningLimit: 1000,
    minify: 'esbuild', // Changed from 'terser' to 'esbuild'
    sourcemap: false
  },
  
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
      'lucide-react'
    ],
    exclude: [
      '@supabase/supabase-js',
      'openai',
      'stripe'
    ]
  },
  
  define: {
    __DEV__: false
  }
});
