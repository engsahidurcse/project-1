import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,         // 🎯 Frontend running on port 3000
    open: true,
    allowedHosts: true, // Allows ngrok tunnel and all external hosts cleanly
    
    // 🚨 REMOVED INTERNALS: The old 'proxy' section is completely wiped out!
    // All API requests must now flow through the secure YARP API Gateway directly.
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          mui: ['@mui/material', '@mui/icons-material'],
          redux: ['@reduxjs/toolkit', 'react-redux'],
          router: ['react-router-dom'],
          charts: ['recharts'],
        },
      },
    },
  },
})