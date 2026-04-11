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
        manualChunks(id) {
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/') || id.includes('node_modules/react-dom-client/')) {
            return 'react-vendor';
          }
          if (id.includes('node_modules/react-router-dom/') || id.includes('node_modules/react-router/') || id.includes('node_modules/@remix-run/')) {
            return 'router';
          }
          if (id.includes('node_modules/gsap/')) {
            return 'gsap';
          }
        },
        // Optimize chunk file names
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },

    // Target modern browsers for smaller bundle
    target: 'es2020',

    // Chunk size warning threshold
    chunkSizeWarningLimit: 500,

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
