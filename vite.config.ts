/**
 * Vite Bundler Configuration.
 * Configures the development server, build settings, and static asset handling.
 * Communicates with: package.json and index.html.
 */

import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    minify: 'esbuild',
    target: 'esnext'
  },
  server: {
    port: 3000,
    open: false,
    host: true
  }
});
