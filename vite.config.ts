import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '', // Empty string to prevent adding "/"
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    headers: {
      "Content-Security-Policy": "script-src 'self' 'unsafe-inline' http://localhost:5173;",
    },
  },
});
