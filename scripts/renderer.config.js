const vue = require('@vitejs/plugin-vue')
const { defineConfig } = require('vite');
const { resolve } = require('path');
const { createHtmlPlugin } = require('vite-plugin-html')
const root = resolve('src/renderer');
const outDir = resolve('dist/renderer');


// https://vitejs.dev/config/
module.exports = defineConfig({
  mode: process.env['rendererMode'] || 'production',
  root,
  base: './',
  plugins: [
    vue(),
    createHtmlPlugin({
      minify: true,
      entry: '/index.ts'
    })
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
