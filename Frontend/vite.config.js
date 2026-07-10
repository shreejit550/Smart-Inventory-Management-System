// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    esbuildOptions: {
      target: 'esnext' // 🔥 Allows top-level await
    }
  },
  build: {
    target: 'esnext' // 🔥 Required for production builds
  }
});
// minor update 4218
