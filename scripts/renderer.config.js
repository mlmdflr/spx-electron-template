const { defineConfig } = require('vite');
const { resolve } = require('path');
const vue = require('@vitejs/plugin-vue')
const root = resolve('src/renderer');
const outDir = resolve('dist/renderer');


// https://vitejs.dev/config/
module.exports = defineConfig({
  mode: process.env['rendererMode'] || 'production',
  root,
  base: './',
  plugins: [
    vue(),
  ],
  build: {
    outDir,
    emptyOutDir: true,
    target: 'esnext',
    minify: 'esbuild'
  },
  resolve: {
    alias: {
      '@': resolve('src')
    }
  }
});
