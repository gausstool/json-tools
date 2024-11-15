import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { nodePolyfills } from 'vite-plugin-node-polyfills';
// https://vitejs.dev/config/
export default defineConfig(async () => ({
  base: "/json-tools/",
  plugins: [
    nodePolyfills(),
    vue()
  ],
  clearScreen: false,
  server: {
    port: 1420,
    strictPort: true,
  },
  build: {
    outDir: './dist/json-tools/'
  }
}));
