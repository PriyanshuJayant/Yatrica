import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import viteCompression from 'vite-plugin-compression';

export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    
    // Brotli compression (best compression ratio)
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 1024, // Only compress files > 1KB
      algorithm: 'brotliCompress',
      ext: '.br',
      deleteOriginFile: false,
    }),
    
    // Gzip compression (fallback for older browsers)
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 1024,
      algorithm: 'gzip',
      ext: '.gz',
      deleteOriginFile: false,
    }),
  ],
  
  server: {
    hmr: {
      overlay: true,
    },
  },
  
  build: {
    // Target modern browsers for smaller bundles
    target: 'es2015',
    
    // Output directory
    outDir: 'dist',
    
    // Generate source maps for debugging (disable in production)
    sourcemap: false,
    
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000,
    
    // Minify with terser for better compression
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log in production
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
        passes: 2, // Multiple passes for better optimization
      },
      format: {
        comments: false, // Remove all comments
      },
    },
    
    // CSS code splitting
    cssCodeSplit: true,
    
    // CSS minifier
    cssMinify: 'lightningcss',
    
    rollupOptions: {
      output: {
        // Manual chunk splitting for better caching
        manualChunks: (id) => {
          // React core libraries - changes rarely, cache forever
          if (id.includes('node_modules/react/') || 
              id.includes('node_modules/react-dom/') ||
              id.includes('node_modules/scheduler/')) {
            return 'react-vendor';
          }
          
          // React Router - separate chunk for routing
          if (id.includes('node_modules/react-router') || 
              id.includes('node_modules/@remix-run/router')) {
            return 'router-vendor';
          }
          
          // Framer Motion - large animation library
          if (id.includes('node_modules/framer-motion')) {
            return 'framer-vendor';
          }
          
          // Dotted Map - map visualization
          if (id.includes('node_modules/dotted-map')) {
            return 'map-vendor';
          }
          
          // All other node_modules
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
        
        // Naming pattern for chunks
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    
    // Report compressed size
    reportCompressedSize: true,
    
    // Emit manifest for asset preloading
    manifest: true,
  },
  
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
    ],
  },
});