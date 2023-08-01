const vue = require('@vitejs/plugin-vue')
const { defineConfig } = require('vite');
const { resolve } = require('path');
const { createHtmlPlugin } = require('vite-plugin-html')
const macrosPlugin = require('vite-plugin-babel-macros').default;
const root = resolve('src/renderer');
const outDir = resolve('dist/renderer');

// https://vitejs.dev/config/
module.exports = defineConfig({
  mode: process.env['rendererMode'] || 'production',
  root,
  base: './',
  build: {
    outDir,
    emptyOutDir: true,
    target: 'esnext',
    minify: 'esbuild'
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'esnext'
    }
  },
  resolve: {
    alias: {
      '@': resolve('src'),
      'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
    }
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith("webview"),
        },
      }
    }),
    macrosPlugin(),
    createHtmlPlugin({
      minify: true,
      entry: '/index.ts'
    })
  ]
});
