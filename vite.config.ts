import path from 'node:path';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import 'dotenv/config';

export default defineConfig({
  base: process.env.VITE_BASE_URL || '/',
  plugins: [nodePolyfills(), vue()],
  clearScreen: false,
  server: {
    port: 1997,
    strictPort: true,
  },
  resolve: {
    alias: {
      '@': path.resolve('src'),
    },
  },
  build: {
    outDir: process.env.VITE_BUILD_DIR || 'dist',
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('.pnpm') || id.includes('node_modules')) {
            if (id.includes('@codemirror/lang-')) {
              return id.match(/@codemirror\/([\w\-]+)/)?.[1];
            }
            if (id.includes('@codemirror')) {
              return 'codemirror';
            }
            if (id.includes('@gausszhou')) {
              return id.match(/@gausszhou\/([\w\-]+)/)?.[1];
            }
            if (id.includes('sql-formatter')) {
              return 'sql-formatter';
            }
            if (id.includes('js-base64')) {
              return 'js-base64';
            }
            if (id.includes('/vue') || id.includes('/pinia')) {
              return 'core';
            }
          }
        },
      },
    },
  },
});
