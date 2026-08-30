import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2020',
    sourcemap: false,
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-ui': ['lucide-react', 'framer-motion', 'react-hot-toast'],
          'vendor-charts': ['recharts'],
          'vendor-graph': ['three', 'react-force-graph-2d'],
        },
      },
    },
  },
  server: {
    port: 5173,
    host: true,
  },
});
