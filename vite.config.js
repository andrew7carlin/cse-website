import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Enable source maps for debugging (disable in production if needed)
    sourcemap: false,

    // Optimize chunk splitting
    rollupOptions: {
      output: {
        // Manual chunk splitting for better caching
        manualChunks: {
          // Vendor chunk for React core
          'react-vendor': ['react', 'react-dom'],
          // Router in separate chunk
          'router': ['react-router-dom'],
        },
        // Optimize chunk file names
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },

    // Target modern browsers for smaller bundle
    target: 'es2020',

    // Increase chunk size warning limit (images are heavy)
    chunkSizeWarningLimit: 1000,

    // Minification settings
    minify: 'esbuild',
  },

  // Optimize dev server
  server: {
    // Enable HMR
    hmr: true,
  },

  // Optimize dependency pre-bundling
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
})
