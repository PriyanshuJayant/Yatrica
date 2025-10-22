#!/usr/bin/env node

/**
 * Bundle Analyzer Script
 * Analyzes the production build and generates a visual report
 * 
 * Usage: npm run build:analyze
 */

import { visualizer } from 'rollup-plugin-visualizer';
import { build } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import viteCompression from 'vite-plugin-compression';

console.log('🔍 Analyzing bundle...\n');

const config = {
  plugins: [
    react(),
    tailwindcss(),
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
    }),
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
    }),
    visualizer({
      filename: 'dist/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
      template: 'treemap', // Options: 'sunburst', 'treemap', 'network'
    }),
  ],
  build: {
    target: 'es2015',
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        passes: 2,
      },
    },
    cssCodeSplit: true,
    cssMinify: 'lightningcss',
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules/react/') || 
              id.includes('node_modules/react-dom/') ||
              id.includes('node_modules/scheduler/')) {
            return 'react-vendor';
          }
          if (id.includes('node_modules/react-router') || 
              id.includes('node_modules/@remix-run/router')) {
            return 'router-vendor';
          }
          if (id.includes('node_modules/framer-motion')) {
            return 'framer-vendor';
          }
          if (id.includes('node_modules/dotted-map')) {
            return 'map-vendor';
          }
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
  },
};

try {
  await build(config);
  console.log('\n✅ Build complete! Opening bundle analyzer...\n');
  console.log('📊 Interactive visualization will open in your browser');
  console.log('📁 Static report saved to: dist/stats.html\n');
} catch (error) {
  console.error('❌ Build failed:', error);
  process.exit(1);
}
