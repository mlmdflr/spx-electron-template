const { resolve } = require('path');
const { external, plugins } = require('./base');

module.exports = [
  {
    input: resolve('src/preload/route/index.ts'),
    output: {
      file: resolve('dist/preload/index.route.js'),
      format: 'cjs',
      sourcemap: false
    },
    external,
    plugins
  },
  {
    input: resolve('src/preload/url/index.ts'),
    output: {
      file: resolve('dist/preload/index.url.js'),
      format: 'cjs',
      sourcemap: false
    },
    external,
    plugins
  }
]
