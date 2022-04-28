const fs = require('fs');

const runtime_dom = require.resolve('../resources/inside/runtime-dom.d.ts')
const vue_runtime_dom = require.resolve('../node_modules/@vue/runtime-dom/dist/runtime-dom.d.ts')

fs.writeFileSync(vue_runtime_dom, fs.readFileSync(runtime_dom, { encoding: 'utf-8' }), { encoding: 'utf8', flag: 'w' })

console.log('\x1B[32m[fix success] \x1B[0m');