const { resolve } = require('path');
const { builtinModules } = require('module');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const alias = require('@rollup/plugin-alias');
const json = require('@rollup/plugin-json');
const image = require('@rollup/plugin-image');
const obfuscator = require('rollup-plugin-obfuscator').default;
const obfuscatorConfig = require('./obfuscator.js');
const { swc } = require('rollup-plugin-swc3');
const { dependencies } = require('../../package.json');

let external = [...builtinModules, 'electron'];

for (const i in dependencies) external.push(i);

let plugins = [
  nodeResolve({
    preferBuiltins: true,
    browser: false,
    extensions: ['.mjs', '.ts', '.js', '.json', '.node']
  }),
  commonjs({
    sourceMap: false
  }),
  json(),
  image(),
  alias({
    entries: [{ find: '@', replacement: resolve('src') }]
  }),
  swc({
    include: /\.[jt]s?$/,
    exclude: /node_modules/,
    minify: process.env['mainMode'] !== 'development'
  })
];

process.env['mainMode'] !== 'development' && plugins.push(obfuscator(obfuscatorConfig));

module.exports = { external, plugins };
