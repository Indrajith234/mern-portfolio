import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
  build: {
    rollupOptions: {
      output: {
        // Split vendor libraries into separate chunks for better caching & load speed
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'icons-fa': ['react-icons/fa'],
          'icons-si': ['react-icons/si'],
          'icons-hi': ['react-icons/hi'],
          'ui': ['react-hot-toast', 'axios'],
        },
      },
    },
  },
})
