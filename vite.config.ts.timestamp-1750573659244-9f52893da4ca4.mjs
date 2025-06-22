// vite.config.ts
import { defineConfig } from "file:///home/project/node_modules/vite/dist/node/index.js";
import react from "file:///home/project/node_modules/@vitejs/plugin-react/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom"],
          "router": ["react-router-dom"],
          "ui-vendor": ["framer-motion", "lucide-react", "react-hot-toast"],
          "auth-vendor": ["@supabase/supabase-js"],
          "api-vendor": ["openai", "stripe"],
          "utils": ["zod"]
        }
      }
    },
    chunkSizeWarningLimit: 1e3,
    minify: "esbuild",
    // Changed from 'terser' to 'esbuild'
    sourcemap: false
  },
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-router-dom",
      "framer-motion",
      "lucide-react"
    ],
    exclude: [
      "@supabase/supabase-js",
      "openai",
      "stripe"
    ]
  },
  define: {
    __DEV__: false
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9wcm9qZWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9wcm9qZWN0L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3Byb2plY3Qvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtyZWFjdCgpXSxcbiAgXG4gIGJ1aWxkOiB7XG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIG1hbnVhbENodW5rczoge1xuICAgICAgICAgICdyZWFjdC12ZW5kb3InOiBbJ3JlYWN0JywgJ3JlYWN0LWRvbSddLFxuICAgICAgICAgICdyb3V0ZXInOiBbJ3JlYWN0LXJvdXRlci1kb20nXSxcbiAgICAgICAgICAndWktdmVuZG9yJzogWydmcmFtZXItbW90aW9uJywgJ2x1Y2lkZS1yZWFjdCcsICdyZWFjdC1ob3QtdG9hc3QnXSxcbiAgICAgICAgICAnYXV0aC12ZW5kb3InOiBbJ0BzdXBhYmFzZS9zdXBhYmFzZS1qcyddLFxuICAgICAgICAgICdhcGktdmVuZG9yJzogWydvcGVuYWknLCAnc3RyaXBlJ10sXG4gICAgICAgICAgJ3V0aWxzJzogWyd6b2QnXVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBcbiAgICBjaHVua1NpemVXYXJuaW5nTGltaXQ6IDEwMDAsXG4gICAgbWluaWZ5OiAnZXNidWlsZCcsIC8vIENoYW5nZWQgZnJvbSAndGVyc2VyJyB0byAnZXNidWlsZCdcbiAgICBzb3VyY2VtYXA6IGZhbHNlXG4gIH0sXG4gIFxuICBvcHRpbWl6ZURlcHM6IHtcbiAgICBpbmNsdWRlOiBbXG4gICAgICAncmVhY3QnLFxuICAgICAgJ3JlYWN0LWRvbScsXG4gICAgICAncmVhY3Qtcm91dGVyLWRvbScsXG4gICAgICAnZnJhbWVyLW1vdGlvbicsXG4gICAgICAnbHVjaWRlLXJlYWN0J1xuICAgIF0sXG4gICAgZXhjbHVkZTogW1xuICAgICAgJ0BzdXBhYmFzZS9zdXBhYmFzZS1qcycsXG4gICAgICAnb3BlbmFpJyxcbiAgICAgICdzdHJpcGUnXG4gICAgXVxuICB9LFxuICBcbiAgZGVmaW5lOiB7XG4gICAgX19ERVZfXzogZmFsc2VcbiAgfVxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXlOLFNBQVMsb0JBQW9CO0FBQ3RQLE9BQU8sV0FBVztBQUVsQixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsTUFBTSxDQUFDO0FBQUEsRUFFakIsT0FBTztBQUFBLElBQ0wsZUFBZTtBQUFBLE1BQ2IsUUFBUTtBQUFBLFFBQ04sY0FBYztBQUFBLFVBQ1osZ0JBQWdCLENBQUMsU0FBUyxXQUFXO0FBQUEsVUFDckMsVUFBVSxDQUFDLGtCQUFrQjtBQUFBLFVBQzdCLGFBQWEsQ0FBQyxpQkFBaUIsZ0JBQWdCLGlCQUFpQjtBQUFBLFVBQ2hFLGVBQWUsQ0FBQyx1QkFBdUI7QUFBQSxVQUN2QyxjQUFjLENBQUMsVUFBVSxRQUFRO0FBQUEsVUFDakMsU0FBUyxDQUFDLEtBQUs7QUFBQSxRQUNqQjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFFQSx1QkFBdUI7QUFBQSxJQUN2QixRQUFRO0FBQUE7QUFBQSxJQUNSLFdBQVc7QUFBQSxFQUNiO0FBQUEsRUFFQSxjQUFjO0FBQUEsSUFDWixTQUFTO0FBQUEsTUFDUDtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNGO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUDtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUVBLFFBQVE7QUFBQSxJQUNOLFNBQVM7QUFBQSxFQUNYO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
